// checkScreenshotProvenance — an application screenshot ships because somebody
// captured it from the demo company and reviewed the bytes, not because its
// filename happened to be missing from a list.
//
// What this replaces
// ------------------
// Until now the only thing standing between a real customer's ledger and the
// public site was `UNSAFE_CAPTURES` in src/data/__tests__/feature-pages.test.js:
// six filenames, checked against feature-page hero/walk-through/tour images
// only. That rule caught exactly one class of mistake — someone re-using one of
// six known files, under one of its known names, on one of three surfaces — and
// was blind to all of:
//
//   * the same bytes committed under a seventh filename;
//   * a crop or re-encode of a real capture, which has new bytes and a new name;
//   * a brand-new capture taken from a live customer's company this afternoon;
//   * every surface that is not a feature page. settlement.webp — a capture with
//     a named individual and two real bank UTRs, and one of the six — has been
//     shipping in the JSON-LD `screenshot` list out of src/data/schema.js the
//     whole time, on every page of the site, and the name rule never looked
//     there.
//
// The rule now is evidence. Every application screenshot the site references
// must resolve, by the SHA-256 of its actual bytes, to a record in
// content/image-provenance.json that says which demo company it came from, at
// which app revision, on which route template, under which capture record, and
// that a human reviewed it. Because the record is keyed by content hash:
//
//   * renaming a file changes nothing — the bytes still resolve to their record,
//     and the record's declared path no longer matches, which is an error;
//   * swapping the artwork under a reviewed filename changes the hash, so the
//     review no longer applies to anything and the build fails;
//   * a crop is new bytes, so it needs its own record, and that record has to
//     name the original it came from — a crop cannot mint demo origin for itself
//     by picking a new filename.
//
// Provenance is an audited capture process, not proof that nobody lied in a JSON
// file. `scripts/capture-guide-evidence.mjs` is what writes these records, and
// it records a contemporaneous demo identity check alongside the bytes. A
// hand-typed `companyId: 143` is not capture evidence and must never be treated
// as such.
//
// The migration backlog
// --------------------
// The screenshots already on the production site pre-date all of this. Nobody
// watched them being captured, so nobody can honestly write a capture record for
// them now. Rather than fabricate evidence or delete published artwork, they are
// listed in `unprovenAllowlist`, keyed by content hash and dated. Those are
// REPORTED, not failed. That allowlist is a backlog, not an exemption, and it is
// deliberately asymmetric:
//
//   * anything referenced by a content/guide/*.md page needs full evidence, full
//     stop — the manual does not get to inherit the backlog;
//   * any image not already in the manifest fails, wherever it appears;
//   * a known-sensitive capture on a feature page fails, which is the old
//     six-name rule preserved and generalised;
//   * changing the bytes of an allowlisted image drops it out of the allowlist,
//     because the allowlist key is the hash.
//
// `--strict` turns every report into a failure. That is the mode to run once the
// backlog is recaptured or removed; it is what "the backlog is finished" looks
// like mechanically.

import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '..');

/** The demo company. Nothing else may be photographed for the public site. */
export const DEMO_COMPANY_ID = 143;

/** Site URL prefixes that resolve to a local asset rather than a third party. */
const OWN_ORIGINS = ['https://takkada.com', 'http://takkada.com', 'https://www.takkada.com'];

const IMAGE_EXT = /\.(webp|png|jpe?g|svg|gif|avif)$/i;

// Directories whose contents are application screenshots by construction. A
// class rule may not cover them: that is the hole through which a screenshot
// would otherwise be waved through as "an illustration".
const SCREENSHOT_DIRECTORIES = ['/assets/screenshots/', '/assets/guide/'];

// Surfaces where the site presents an image AS a picture of the application.
// A non-appScreenshot classification on one of these is a lie about the artwork,
// so it fails even though the same file is fine in a blog hero.
const SCREENSHOT_SURFACES = new Set([
  'featurePage:hero',
  'featurePage:walkthrough',
  'featurePage:tour',
  'featurePage:image',
  'guide:images',
  'guide:markdown',
  'guide:html',
  'schema:screenshot',
  'dist:jsonld-screenshot',
]);

export function isScreenshotSurface(surface) {
  return SCREENSHOT_SURFACES.has(surface);
}

const isGuideSurface = (surface) => String(surface).startsWith('guide:');
const isFeaturePageSurface = (surface) => String(surface).startsWith('featurePage:');

// ---------------------------------------------------------------------------
// Evidence
// ---------------------------------------------------------------------------

const filled = (value) => typeof value === 'string' && value.trim().length > 0;

/**
 * A route template says which screen was photographed. It must not carry the
 * values that identify who was on it: no query string (tokens and company ids
 * live there), and no long digit run (a party id, an invoice number, a phone).
 */
export function isSafeRouteTemplate(route) {
  if (!filled(route)) return false;
  if (!/^\/[A-Za-z0-9\-_/:.]*$/.test(route)) return false;
  if (/\d{3,}/.test(route)) return false;
  return true;
}

/** Field-level checks, shared by an image and by the original it was cut from. */
function evidenceFieldErrors(evidence, label) {
  const errors = [];
  if (evidence.kind !== 'appScreenshot') errors.push(`${label}not classified as app screenshot`);
  if (evidence.companyId !== DEMO_COMPANY_ID) {
    errors.push(`${label}screenshot is not from demo company`);
  }
  if (
    !filled(evidence.captureRecord) ||
    !filled(evidence.capturedAt) ||
    !filled(evidence.appRevision) ||
    !filled(evidence.route) ||
    evidence.reviewed !== true
  ) {
    errors.push(`${label}incomplete capture evidence`);
  }
  if (!isSafeRouteTemplate(evidence.route)) {
    errors.push(`${label}route is not a safe template (no query values, no record ids)`);
  }
  return errors;
}

/**
 * The gate itself.
 *
 * @param {{bytes: Buffer|Uint8Array|null, evidence: object|null, parentEvidence?: object|null}} input
 * @returns {string[]} every reason this image may not ship; empty means it may
 */
export function validateScreenshot({ bytes, evidence, parentEvidence = null } = {}) {
  if (!evidence) return ['missing screenshot provenance'];

  const errors = evidenceFieldErrors(evidence, '');

  const actual = createHash('sha256')
    .update(bytes ?? Buffer.alloc(0))
    .digest('hex');
  if (actual !== evidence.sha256) errors.push('screenshot hash changed after review');

  // A derivative — a crop, a redaction, a re-encode — is new bytes, so it needs
  // its own record. What it may not do is claim demo origin on its own say-so:
  // it must name the original it came from, that original must itself be a valid
  // reviewed demo capture, and the chain is checked here rather than trusted.
  if (evidence.derivedFrom) {
    if (!filled(evidence.derivation)) {
      errors.push('derivative does not record how it was derived from the original');
    }
    if (!parentEvidence) {
      errors.push('derivative names an original that is not in the manifest');
    } else {
      if (parentEvidence.sha256 !== evidence.derivedFrom) {
        errors.push('derivative parent hash does not match the recorded original');
      }
      errors.push(...evidenceFieldErrors(parentEvidence, 'original of this derivative: '));
      if (parentEvidence.derivedFrom === evidence.sha256) {
        errors.push('derivative chain is circular');
      }
    }
  }

  return errors;
}

/**
 * Non-screenshot artwork still carries an explicit classification and a review,
 * so "it is only an illustration" is a claim somebody made and signed, not a
 * default that anything unlabelled falls into.
 */
export function validateClassifiedImage(record) {
  const errors = [];
  const kinds = ['illustration', 'logo', 'photograph'];
  if (!kinds.includes(record.kind)) errors.push(`unknown image kind "${record.kind}"`);
  if (record.reviewed !== true) errors.push('classification is not reviewed');
  if (!filled(record.reviewedOn)) errors.push('classification records no review date');
  if (!filled(record.reviewedBy)) errors.push('classification records no reviewer');
  if (!filled(record.origin)) errors.push('classification records no origin for the artwork');
  return errors;
}

// ---------------------------------------------------------------------------
// Nothing private may ride along in public metadata
// ---------------------------------------------------------------------------

const LEAK_PATTERNS = [
  [/\beyJ[A-Za-z0-9_-]{5,}/, 'looks like a JWT'],
  [/bearer\s+\S+/i, 'carries a bearer credential'],
  [/authorization/i, 'names an Authorization header'],
  [/set-cookie|\bcookie\b/i, 'names a cookie'],
  [/\b(session|access|refresh|api|auth)[_-]?(token|key)\b/i, 'names a session or API credential'],
  [/\bpasswords?\b/i, 'names a password'],
  [/\bsecret\b/i, 'names a secret'],
  [/\+\d{2}[\s-]?\d{4,5}[\s-]?\d{5}/, 'carries a phone number'],
  [/[\w.+-]+@[\w-]+\.[\w.]{2,}/, 'carries an email address'],
  [/\bGSTIN?\b\s*[:=]?\s*\d{2}[A-Z]{5}/i, 'carries a GSTIN'],
];

/**
 * The manifest is committed and served from a public repository, so it is a
 * publication surface in its own right. A capture trace with a session token or
 * a customer's phone number in it would be published by the act of recording it.
 */
export function findMetadataLeaks(record) {
  const text = JSON.stringify(record ?? {});
  const found = [];
  for (const [pattern, why] of LEAK_PATTERNS) {
    if (pattern.test(text)) found.push(`public capture metadata ${why}`);
  }
  for (const url of text.match(/https?:\/\/[^"'\s\\]+/g) ?? []) {
    const host = url.replace(/^https?:\/\//, '').split('/')[0].toLowerCase();
    if (host !== 'takkada.com' && host !== 'www.takkada.com') {
      found.push(`public capture metadata carries a non-public URL (${host})`);
    }
  }
  return found;
}

// ---------------------------------------------------------------------------
// Reference collection
// ---------------------------------------------------------------------------

/**
 * Reduce whatever a page wrote to a comparable site-absolute path.
 *
 * Returns `null` when the reference cannot be resolved to a site asset at all
 * (path traversal, a protocol-relative host we do not control the shape of), a
 * `data:<mime>` marker for inline images, the original URL for a remote host, and
 * a `/assets/...` path otherwise.
 */
export function normalizeAssetPath(src) {
  if (typeof src !== 'string') return null;
  const raw = src.trim().replace(/[?#].*$/, '');
  if (!raw) return null;
  if (raw.startsWith('data:')) return `data:${raw.slice(5).split(';')[0].split(',')[0]}`;

  let path = raw;
  for (const origin of OWN_ORIGINS) {
    if (path.startsWith(`${origin}/`)) path = path.slice(origin.length);
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(path) || path.startsWith('//')) return raw;
  if (!path.startsWith('/')) return null;
  // Traversal, or anything that does not stay inside the asset tree, is not a
  // path this guard is willing to reason about.
  if (path.includes('..')) return null;
  if (!path.startsWith('/assets/')) return null;
  return path;
}

export const isRemoteReference = (path) =>
  typeof path === 'string' && /^[a-z][a-z0-9+.-]*:\/\//i.test(path) && !path.startsWith('data:');

/** Strip // and /* *\/ comments without eating the contents of string literals. */
export function stripJsComments(source) {
  let out = '';
  let i = 0;
  let quote = null;
  while (i < source.length) {
    const ch = source[i];
    const next = source[i + 1];
    if (quote) {
      out += ch;
      if (ch === '\\') {
        out += next ?? '';
        i += 2;
        continue;
      }
      if (ch === quote) quote = null;
      i += 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`') {
      quote = ch;
      out += ch;
      i += 1;
      continue;
    }
    if (ch === '/' && next === '/') {
      while (i < source.length && source[i] !== '\n') i += 1;
      continue;
    }
    if (ch === '/' && next === '*') {
      i += 2;
      while (i < source.length && !(source[i] === '*' && source[i + 1] === '/')) i += 1;
      i += 2;
      continue;
    }
    out += ch;
    i += 1;
  }
  return out;
}

const dedupe = (values) => [...new Set(values.filter(Boolean))];

/**
 * Asset paths written as string literals in JS/JSX. Comment-strip first.
 *
 * `{}` are excluded from the path so an interpolated template — `src/lib/blogPosts.js`
 * derives every blog hero as `/assets/blog/${slug}.png` — is not mistaken for a
 * literal file. Those references are real, but they only become concrete paths in
 * the rendered HTML, which is where this guard picks them up.
 */
export function collectSourceImageReferences(source) {
  const matches = source.matchAll(
    /['"`](\/assets\/[^'"`\s(){}]+\.(?:webp|png|jpe?g|svg|gif|avif))['"`]/gi
  );
  return dedupe([...matches].map((m) => m[1]));
}

export function collectMarkdownImageReferences(text) {
  return dedupe([...text.matchAll(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/g)].map((m) => m[1]));
}

export function collectHtmlImageReferences(html) {
  const found = [];
  for (const m of html.matchAll(/<img\b[^>]*?\ssrc=["']([^"']+)["']/gi)) found.push(m[1]);
  for (const m of html.matchAll(/<source\b[^>]*?\ssrcset=["']([^"']+)["']/gi)) {
    for (const candidate of m[1].split(',')) found.push(candidate.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/<img\b[^>]*?\ssrcset=["']([^"']+)["']/gi)) {
    for (const candidate of m[1].split(',')) found.push(candidate.trim().split(/\s+/)[0]);
  }
  for (const m of html.matchAll(/<link\b[^>]*?\bas=["']image["'][^>]*?>/gi)) {
    const href = m[0].match(/\shref=["']([^"']+)["']/i);
    if (href) found.push(href[1]);
  }
  return dedupe(found);
}

export function collectCssImageReferences(css) {
  const found = [];
  for (const m of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/gi)) {
    if (IMAGE_EXT.test(m[1])) found.push(m[1].trim());
  }
  return dedupe(found);
}

/** og:image and JSON-LD image/screenshot values out of a rendered page. */
export function collectRenderedMetaImageReferences(html) {
  const generic = [];
  const screenshots = [];
  for (const m of html.matchAll(
    /<meta\b[^>]*?\b(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*?>/gi
  )) {
    const content = m[0].match(/\scontent=["']([^"']+)["']/i);
    if (content) generic.push(content[1]);
  }
  for (const block of html.matchAll(
    /<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi
  )) {
    const json = block[1];
    for (const m of json.matchAll(/"screenshot"\s*:\s*(\[[^\]]*\]|"[^"]*")/g)) {
      for (const url of m[1].matchAll(/"([^"]+)"/g)) screenshots.push(url[1]);
    }
    for (const m of json.matchAll(/"(?:image|logo|thumbnailUrl)"\s*:\s*"([^"]+)"/g)) {
      generic.push(m[1]);
    }
  }
  return { generic: dedupe(generic), screenshots: dedupe(screenshots) };
}

// ---------------------------------------------------------------------------
// The manifest
// ---------------------------------------------------------------------------

/** `public/assets/x.webp`, `/assets/x.webp` and `assets/x.webp` all mean one path. */
export function canonicalManifestPath(path) {
  if (typeof path !== 'string') return null;
  let out = path.trim().replace(/^\.?\//, '/');
  if (out.startsWith('public/')) out = out.slice('public'.length);
  if (out.startsWith('dist/')) out = out.slice('dist'.length);
  if (!out.startsWith('/')) out = `/${out}`;
  return out;
}

export function loadManifest(root = repoRoot) {
  const file = resolve(root, 'content/image-provenance.json');
  if (!existsSync(file)) {
    throw new Error(`checkScreenshotProvenance: content/image-provenance.json is missing (${file})`);
  }
  return JSON.parse(readFileSync(file, 'utf-8'));
}

/** Structural problems with the manifest itself, independent of any reference. */
export function validateManifest(manifest) {
  const errors = [];
  const images = manifest.images ?? {};
  const allowlist = manifest.unprovenAllowlist ?? {};
  const claimed = new Map();

  for (const [key, record] of Object.entries(images)) {
    if (record.sha256 !== key) errors.push(`manifest: images["${key}"] carries sha256 ${record.sha256}`);
    const path = canonicalManifestPath(record.path);
    if (!path) errors.push(`manifest: images["${key}"] has no path`);
    else if (claimed.has(path)) errors.push(`manifest: two records claim ${path}`);
    else claimed.set(path, key);
    errors.push(...findMetadataLeaks(record).map((leak) => `manifest ${path}: ${leak}`));
  }

  for (const [key, record] of Object.entries(allowlist)) {
    const path = canonicalManifestPath(record.path);
    if (!path) errors.push(`manifest: unprovenAllowlist["${key}"] has no path`);
    else if (claimed.has(path)) errors.push(`manifest: two records claim ${path}`);
    else claimed.set(path, key);
    if (!filled(record.allowlistedOn)) {
      errors.push(`manifest: unprovenAllowlist["${key}"] is undated; the backlog must be dated`);
    }
    if (!filled(record.reason)) {
      errors.push(`manifest: unprovenAllowlist["${key}"] gives no reason`);
    }
    if (key in images) errors.push(`manifest: ${path} is both proven and allowlisted`);
    errors.push(...findMetadataLeaks(record).map((leak) => `manifest ${path}: ${leak}`));
  }

  for (const rule of manifest.classes ?? []) {
    const prefix = canonicalManifestPath(rule.pathPrefix);
    if (!prefix) errors.push('manifest: a class rule has no pathPrefix');
    else if (SCREENSHOT_DIRECTORIES.some((dir) => prefix.startsWith(dir) || dir.startsWith(prefix))) {
      errors.push(
        `manifest: class rule "${prefix}" overlaps the screenshot library; ` +
          'application screenshots are recorded one at a time, never blanket-classified'
      );
    }
    errors.push(...validateClassifiedImage({ ...rule, reviewed: true }).map((e) => `manifest class "${prefix}": ${e}`));
  }

  return errors;
}

// ---------------------------------------------------------------------------
// The sweep
// ---------------------------------------------------------------------------

/**
 * Resolve one referenced path to a provenance verdict, once, regardless of how
 * many surfaces point at it.
 */
function resolveReferencePath(path, manifest, readBytes) {
  if (typeof path === 'string' && path.startsWith('data:')) return { status: 'inline' };
  if (isRemoteReference(path)) return { status: 'remote' };

  const canonical = canonicalManifestPath(path);
  const bytes = readBytes(`public${canonical}`) ?? readBytes(`dist${canonical}`);
  if (!bytes) return { status: 'missing' };

  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const images = manifest.images ?? {};
  const allowlist = manifest.unprovenAllowlist ?? {};

  const record = images[sha256];
  if (record) {
    const declared = canonicalManifestPath(record.path);
    if (declared !== canonical) {
      return {
        status: 'pathMismatch',
        sha256,
        errors: [
          `these bytes are recorded as ${declared}. The same capture under a second ` +
            'filename needs its own record, or the reference needs to use the recorded path.',
        ],
      };
    }
    if (record.kind === 'appScreenshot') {
      const parent = record.derivedFrom ? images[record.derivedFrom] ?? null : null;
      const errors = [
        ...validateScreenshot({ bytes, evidence: record, parentEvidence: parent }),
        ...findMetadataLeaks(record),
      ];
      return errors.length
        ? { status: 'badEvidence', sha256, errors, record }
        : { status: 'proven', sha256, record };
    }
    const errors = [...validateClassifiedImage(record), ...findMetadataLeaks(record)];
    return errors.length
      ? { status: 'badEvidence', sha256, errors, record }
      : { status: 'classified', sha256, record, kind: record.kind };
  }

  const stale = allowlist[sha256];
  if (stale) {
    const declared = canonicalManifestPath(stale.path);
    if (declared !== canonical) {
      return {
        status: 'pathMismatch',
        sha256,
        errors: [
          `these bytes are on the unproven backlog as ${declared}. Republishing them ` +
            'under a new filename is a new publication and needs real capture evidence.',
        ],
      };
    }
    return { status: 'unproven', sha256, record: stale };
  }

  for (const rule of manifest.classes ?? []) {
    const prefix = canonicalManifestPath(rule.pathPrefix);
    if (!prefix || !canonical.startsWith(prefix)) continue;
    if (SCREENSHOT_DIRECTORIES.some((dir) => prefix.startsWith(dir) || dir.startsWith(prefix))) {
      return {
        status: 'badClassRule',
        sha256,
        errors: [
          `class rule "${prefix}" tries to cover the screenshot library. ` +
            'Application screenshots are recorded one at a time.',
        ],
      };
    }
    const errors = validateClassifiedImage({ ...rule, reviewed: true });
    return errors.length
      ? { status: 'badClassRule', sha256, errors: errors.map((e) => `class rule "${prefix}": ${e}`) }
      : { status: 'classified', sha256, kind: rule.kind, rule };
  }

  return { status: 'unmanifested', sha256 };
}

/**
 * @param {{references: Array<{path: string, surface: string, origin: string}>,
 *          manifest: object, readBytes: (p: string) => (Buffer|null), strict?: boolean}} input
 * @returns {{errors: string[], reports: string[], escalations: string[],
 *            unproven: Array<object>, checked: number}}
 */
export function checkReferences({ references, manifest, readBytes, strict = false }) {
  // Findings are keyed by image and reason, not by reference site: one sensitive
  // capture in the site-wide JSON-LD appears on 299 built pages, and 299
  // identical paragraphs is a way of not being read. The sites are kept and a
  // few are named, so the message still says where to go and look.
  const failures = new Map();
  const fail = ({ path, surface, origin }, message) => {
    const key = `${path}\u0000${message}`;
    const entry = failures.get(key) ?? { path, message, sites: [] };
    entry.sites.push(`${surface} <- ${origin}`);
    failures.set(key, entry);
  };
  const reportsByImage = new Map();
  const escalationsByImage = new Map();
  const unprovenByPath = new Map();
  const once = (map, key, line) => {
    if (!map.has(key)) map.set(key, line);
  };

  const resolved = new Map();
  const resolveOnce = (path) => {
    const key = canonicalManifestPath(path) ?? path;
    if (!resolved.has(key)) resolved.set(key, resolveReferencePath(path, manifest, readBytes));
    return resolved.get(key);
  };

  for (const reference of references) {
    const { path, surface, origin } = reference;

    if (path === null || path === undefined) {
      fail(
        { path: String(path), surface, origin },
        'an image reference could not be resolved to a site asset'
      );
      continue;
    }

    const verdict = resolveOnce(path);

    switch (verdict.status) {
      case 'inline':
        if (isScreenshotSurface(surface)) {
          fail(reference, 'an inline data: image cannot carry capture provenance');
        }
        break;

      case 'remote':
        if (isScreenshotSurface(surface)) {
          fail(
            reference,
            'an application screenshot may not be loaded from a remote host; the bytes ' +
              'have to be in the repository to be hashed and reviewed'
          );
        } else {
          once(reportsByImage, path, `${path}: remote image, outside this guard's reach`);
        }
        break;

      case 'missing':
        fail(reference, 'referenced image is not on disk');
        break;

      case 'pathMismatch':
      case 'badEvidence':
      case 'badClassRule':
        for (const error of verdict.errors) fail(reference, error);
        break;

      case 'proven':
        break;

      case 'classified':
        if (isScreenshotSurface(surface)) {
          fail(
            reference,
            `classified as ${verdict.kind}, not an app screenshot, but it is published as ` +
              'a picture of the application. Reclassify it with real capture evidence, or ' +
              'take it off this surface.'
          );
        }
        break;

      case 'unproven': {
        const record = verdict.record;
        const line =
          'no capture evidence exists for this image (unproven backlog, allowlisted ' +
          `${record.allowlistedOn}: ${record.reason})`;

        if (isGuideSurface(surface)) {
          fail(
            reference,
            `${line}. A guide page may not carry an image from the backlog — ` +
              'recapture it from the demo company or drop the image.'
          );
        } else if (record.knownSensitive && isFeaturePageSurface(surface)) {
          fail(
            reference,
            `${line}. This capture is known to carry real customer detail and must not ` +
              'appear on a feature page.'
          );
        } else if (strict) {
          fail(reference, `${line}. --strict: the backlog is being treated as empty.`);
        } else if (record.knownSensitive) {
          once(
            escalationsByImage,
            path,
            `${path}: KNOWN-SENSITIVE CAPTURE, PUBLISHED (${record.reason}) ` +
              'Owner decision required: recapture from the demo company, or remove the reference.'
          );
        }
        // A plain unproven image needs no separate note line: it is listed once,
        // by image, in the backlog block below.

        const key = canonicalManifestPath(path);
        const entry = unprovenByPath.get(key) ?? {
          path: key,
          sha256: verdict.sha256,
          knownSensitive: Boolean(record.knownSensitive),
          allowlistedOn: record.allowlistedOn,
          reason: record.reason,
          surfaces: new Set(),
        };
        entry.surfaces.add(`${surface} <- ${origin}`);
        unprovenByPath.set(key, entry);
        break;
      }

      case 'unmanifested':
      default:
        fail(
          reference,
          'no provenance record. Every image the site publishes has to be classified in ' +
            'content/image-provenance.json; an application screenshot needs a capture ' +
            'record written by scripts/capture-guide-evidence.mjs. ' +
            `Bytes hash to ${verdict.sha256}.`
        );
        break;
    }
  }

  return {
    errors: [...failures.values()]
      .sort((a, b) => a.path.localeCompare(b.path) || a.message.localeCompare(b.message))
      .map(({ path, message, sites }) => {
        const distinct = [...new Set(sites)].sort();
        const shown = distinct.slice(0, 3).join('; ');
        const more = distinct.length > 3 ? `; and ${distinct.length - 3} more` : '';
        return `${path} [${shown}${more}]: ${message}`;
      }),
    reports: [...reportsByImage.values()].sort(),
    escalations: [...escalationsByImage.values()].sort(),
    unproven: [...unprovenByPath.values()].map((entry) => ({
      ...entry,
      surfaces: [...entry.surfaces].sort(),
    })),
    checked: resolved.size,
  };
}

// ---------------------------------------------------------------------------
// CLI — collect what the site actually references, then check it
// ---------------------------------------------------------------------------

const walk = (dir, filter, out = []) => {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, filter, out);
    else if (filter(full)) out.push(full);
  }
  return out;
};

const isTestFile = (file) => /__tests__|\.test\.(js|jsx|mjs)$/.test(file);

const push = (list, sources, surface, origin) => {
  for (const src of sources) {
    const path = normalizeAssetPath(src);
    if (path === null) continue;
    if (!path.startsWith('data:') && !isRemoteReference(path) && !IMAGE_EXT.test(path)) continue;
    list.push({ path, surface, origin });
  }
};

/** Every image reference the site makes, with the surface that makes it. */
export function collectSiteReferences(root = repoRoot) {
  const references = [];
  const rel = (file) => file.slice(root.length + 1);

  // 1. The manual. Frontmatter images, markdown images and any raw <img> in a body.
  const guideDir = resolve(root, 'content/guide');
  if (existsSync(guideDir)) {
    for (const file of readdirSync(guideDir).filter((f) => f.endsWith('.md'))) {
      const raw = readFileSync(resolve(guideDir, file), 'utf-8');
      const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/);
      if (frontmatter) {
        const block = frontmatter[1].match(/^images:\s*(\[[^\]]*\]|(?:\n[ \t]+.*)*)/m);
        if (block) {
          push(
            references,
            [...block[0].matchAll(/['"]?(\/assets\/[^'"\s,\]]+)['"]?/g)].map((m) => m[1]),
            'guide:images',
            `content/guide/${file}`
          );
        }
      }
      const body = raw.replace(/^---\n[\s\S]*?\n---\n/, '');
      push(references, collectMarkdownImageReferences(body), 'guide:markdown', `content/guide/${file}`);
      push(references, collectHtmlImageReferences(body), 'guide:html', `content/guide/${file}`);
    }
  }

  // 2. Feature-page data. `image:` and `screenshot:` keys in these four files are
  //    hero, walk-through and tour artwork — the exact surface the old six-name
  //    rule policed, and the one that matters most.
  for (const file of walk(resolve(root, 'src/data'), (f) => /^featurePages.*\.js$/.test(f.split('/').pop()))) {
    if (isTestFile(file)) continue;
    const source = stripJsComments(readFileSync(file, 'utf-8'));
    const keyed = [...source.matchAll(/\b(?:image|screenshot)\s*:\s*['"]([^'"]+)['"]/g)].map((m) => m[1]);
    push(references, keyed, 'featurePage:image', rel(file));
    const rest = collectSourceImageReferences(source).filter((p) => !keyed.includes(p));
    push(references, rest, 'source:generic', rel(file));
  }

  // 3. The JSON-LD `screenshot` array. This is the surface the name rule never
  //    looked at, and it is on every page of the site.
  const schemaFile = resolve(root, 'src/data/schema.js');
  if (existsSync(schemaFile)) {
    const source = stripJsComments(readFileSync(schemaFile, 'utf-8'));
    const block = source.match(/\bscreenshot\s*:\s*\[([\s\S]*?)\]/);
    const declared = block
      ? [...block[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1])
      : [];
    push(references, declared, 'schema:screenshot', 'src/data/schema.js');
    push(
      references,
      collectSourceImageReferences(source).filter((p) => !declared.includes(p)),
      'source:generic',
      'src/data/schema.js'
    );
  }

  // 4. Everything else the source tree writes down, comments excluded so a path
  //    that is only discussed is not mistaken for a path that ships.
  const sourceFiles = walk(
    resolve(root, 'src'),
    (f) => /\.(jsx?|mjs)$/.test(f) && !isTestFile(f)
  ).filter((f) => !/featurePages.*\.js$|data\/schema\.js$/.test(f));
  for (const file of sourceFiles) {
    push(
      references,
      collectSourceImageReferences(stripJsComments(readFileSync(file, 'utf-8'))),
      'source:generic',
      rel(file)
    );
  }
  for (const file of walk(resolve(root, 'src'), (f) => f.endsWith('.css'))) {
    push(references, collectCssImageReferences(readFileSync(file, 'utf-8')), 'css:url', rel(file));
  }
  const indexHtml = resolve(root, 'index.html');
  if (existsSync(indexHtml)) {
    const html = readFileSync(indexHtml, 'utf-8');
    push(references, collectHtmlImageReferences(html), 'source:generic', 'index.html');
    push(
      references,
      [...html.matchAll(/\shref=["'](\/assets\/[^"']+)["']/g)].map((m) => m[1]),
      'source:generic',
      'index.html'
    );
  }

  // 5. The built pages, which is the only place derived references (blog heroes,
  //    og:image, rendered JSON-LD) actually become visible.
  const dist = resolve(root, 'dist');
  const built = walk(dist, (f) => f.endsWith('.html'));
  for (const file of built) {
    const html = readFileSync(file, 'utf-8');
    push(references, collectHtmlImageReferences(html), 'dist:img', rel(file));
    const meta = collectRenderedMetaImageReferences(html);
    push(references, meta.generic, 'dist:meta', rel(file));
    push(references, meta.screenshots, 'dist:jsonld-screenshot', rel(file));
  }

  return { references, builtPages: built.length };
}

function readBytesFrom(root) {
  return (relativePath) => {
    const full = resolve(root, relativePath.replace(/^\//, ''));
    if (!full.startsWith(root)) return null;
    return existsSync(full) && statSync(full).isFile() ? readFileSync(full) : null;
  };
}

/** Files sitting in the published screenshot library that nothing has classified. */
function unclassifiedLibraryFiles(root, manifest) {
  const dir = resolve(root, 'public/assets/screenshots');
  if (!existsSync(dir)) return [];
  const known = new Set(
    [
      ...Object.values(manifest.images ?? {}),
      ...Object.values(manifest.unprovenAllowlist ?? {}),
    ].map((record) => canonicalManifestPath(record.path))
  );
  return readdirSync(dir)
    .filter((f) => IMAGE_EXT.test(f))
    .map((f) => `/assets/screenshots/${f}`)
    .filter((p) => !known.has(p))
    .sort();
}

async function main() {
  const strict = process.argv.includes('--strict');
  const manifest = loadManifest(repoRoot);

  const manifestErrors = validateManifest(manifest);
  const { references, builtPages } = collectSiteReferences(repoRoot);
  const result = checkReferences({
    references,
    manifest,
    readBytes: readBytesFrom(repoRoot),
    strict,
  });

  const errors = [...manifestErrors, ...result.errors];

  console.log(
    `checkScreenshotProvenance: ${references.length} reference(s) across ` +
      `${result.checked} distinct image(s); ${builtPages} built page(s) scanned` +
      `${builtPages === 0 ? ' (no dist/ yet — run again after the build)' : ''}` +
      `${strict ? ' [--strict]' : ''}`
  );

  if (result.escalations.length) {
    console.log('\n  PUBLISHED CAPTURES THAT NEED AN OWNER DECISION');
    for (const line of result.escalations) console.log(`    ! ${line}`);
  }

  if (result.unproven.length) {
    console.log(
      `\n  UNPROVEN BACKLOG (${result.unproven.length} image(s) shipped before this gate existed).`
    );
    console.log('  Not an exemption. Each one is recapture-from-demo or remove.');
    for (const entry of [...result.unproven].sort((a, b) => a.path.localeCompare(b.path))) {
      const kinds = [...new Set(entry.surfaces.map((s) => s.split(' <- ')[0]))].sort().join(', ');
      console.log(
        `    - ${entry.path}${entry.knownSensitive ? '  [KNOWN-SENSITIVE]' : ''}\n` +
          `        ${entry.surfaces.length} reference site(s) via ${kinds}`
      );
    }
  }

  const library = unclassifiedLibraryFiles(repoRoot, manifest);
  if (library.length) {
    console.log(
      `\n  ${library.length} file(s) sit in public/assets/screenshots/ with no classification.`
    );
    console.log('  Nothing links them, but everything under public/ is fetchable by URL.');
    for (const path of library) console.log(`    - ${path}`);
  }

  for (const line of result.reports) console.log(`  note: ${line}`);

  if (errors.length) {
    console.error(`\ncheckScreenshotProvenance: ${errors.length} failure(s).\n`);
    for (const error of errors) console.error(`  ✗ ${error}`);
    console.error(
      '\nAn application screenshot ships only with a reviewed capture record from demo ' +
        `company ${DEMO_COMPANY_ID}. Record one with:\n` +
        '  node scripts/capture-guide-evidence.mjs record --help\n'
    );
    process.exit(1);
  }

  console.log('\ncheckScreenshotProvenance: OK');
}

// Import-safe: the unit tests import validateScreenshot without running a scan.
if (process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url))) {
  await main();
}
