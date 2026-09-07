// generate-guide-manifest — the contract the Flutter app is allowed to trust.
//
// The app's release tool fetches https://takkada.com/guide-manifest.json, and
// for every entry it finds there it writes a slug into
// lib/help/published_guides.g.dart. From that moment a customer who taps "Read
// the full guide" inside the app is sent to that URL. So this file decides what
// the app promises, and the failure mode it exists to prevent is not a broken
// build — it is a shipped app version linking to a page the website never
// published, on a phone that cannot be fixed for weeks.
//
// Three properties follow from that, and each one is enforced below rather than
// remembered:
//
//   1. The manifest is written from the BUILD, not from the repository. It is
//      generated after vite-react-ssg has run and after every content,
//      prerender, hub and provenance gate has passed, and it refuses to name a
//      guide whose page is absent from dist/ or prerendered as an empty shell.
//      A topic somebody added to topics.json this morning is prospective, not
//      deployed, and must never reach the app as though it were live.
//
//   2. It is deterministic for identical source refs and content. Every field
//      is derived from the markdown itself — `contentSha256` is the SHA-256 of
//      the guide's original UTF-8 bytes — and nothing reads a file mtime. Two
//      builds of the same commit produce byte-identical manifests, which is
//      what lets the app diff one deploy against the next and see only real
//      editorial change.
//
//   3. `checkedAgainstAppOn` is copied, never computed. The build knows the app
//      revision it validated against, and it would be trivial to stamp today's
//      date on every guide whenever that revision moves. That would turn the
//      site's one freshness claim into a lie that renews itself nightly. The
//      date is editorial evidence: a person opened the app and followed the
//      steps. Only that person may move it, by editing the frontmatter.
//
// A committed copy is kept at public/guide-manifest.json so the app-side
// integration can be reviewed in a diff before anything is deployed. It is a
// snapshot, not the contract: `siteRevision` in it is necessarily the revision
// BEFORE the commit that contains it, and the deployed copy is overwritten from
// the real build every time. That asymmetry is deliberate — a stale committed
// file can never advertise a page that is missing from dist/, because the
// deployed bytes are the ones this script just wrote from that dist/.
//
// Usage:
//   TAKKADA_APP_ROOT=/path/to/takkada node scripts/generate-guide-manifest.mjs

import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { INTERNAL_TOPIC_IDS, readGuides, readTopics, toIsoDateString } from './lib/guideContract.mjs';
import { canonicalFor, hasEmptyRoot } from './checkGuidePrerender.mjs';
import { readAppRevision, resolveAppRoot } from './checkGuideContract.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/** Bumped only when the shape below changes in a way the app must notice. */
export const SCHEMA_VERSION = 1;

export const MANIFEST_FILE = 'guide-manifest.json';

/** SHA-256 of a guide's original bytes: content identity, never an mtime. */
export function contentSha256(raw) {
  return createHash('sha256').update(Buffer.from(raw ?? '', 'utf-8')).digest('hex');
}

/**
 * Topics that may become public URLs. KD-7's "Entries waiting for approval" is
 * explained inside the app and has no public page, so it is filtered here — the
 * same list the hub, the prerender guard and the contract all filter on.
 */
export function publishableTopics(topics) {
  return (topics ?? []).filter((topic) => !INTERNAL_TOPIC_IDS.has(topic?.id));
}

/**
 * @param {object} input
 * @param {Array} input.topics       content/guide/topics.json records
 * @param {Array} input.guides       GuideDocument[] from readGuides
 * @param {string} input.appRevision the paired app checkout the guides were validated against
 * @param {string} input.siteRevision this website checkout's git HEAD
 * @returns {{manifest: object, errors: string[]}}
 */
export function buildGuideManifest({ topics, guides, appRevision, siteRevision } = {}) {
  const errors = [];
  const publishable = publishableTopics(topics);
  const publishableSlugs = new Set(publishable.map((topic) => topic.slug));
  const bySlug = new Map((guides ?? []).map((guide) => [guide.slug, guide]));

  if (typeof appRevision !== 'string' || appRevision.trim() === '') {
    errors.push('appRevision: the app revision the guides were validated against is missing');
  }
  if (typeof siteRevision !== 'string' || siteRevision.trim() === '') {
    errors.push('siteRevision: the website revision being built is missing');
  }

  const entries = [];
  for (const topic of publishable) {
    const guide = bySlug.get(topic.slug);
    if (!guide) {
      errors.push(`topic ${topic.slug}: no guide markdown, so it cannot be published`);
      continue;
    }
    entries.push({
      id: topic.id,
      slug: guide.slug,
      path: `/guide/${guide.slug}`,
      featureKey: guide.featureKey ?? null,
      // Copied from the author's frontmatter. See the header: a newer app
      // revision in this build does not advance it.
      checkedAgainstAppOn: toIsoDateString(guide.checkedAgainstAppOn),
      contentSha256: contentSha256(guide.raw),
    });
  }

  for (const guide of guides ?? []) {
    if (INTERNAL_TOPIC_IDS.has(guide.slug)) {
      errors.push(`guide ${guide.slug}: internal-only, it must not reach the manifest`);
    } else if (!publishableSlugs.has(guide.slug)) {
      errors.push(`guide ${guide.slug}: no topic record, so it is not a publishable page`);
    }
  }

  entries.sort((a, b) => a.slug.localeCompare(b.slug));

  return {
    manifest: {
      schemaVersion: SCHEMA_VERSION,
      appRevision: appRevision ?? null,
      siteRevision: siteRevision ?? null,
      guides: entries,
    },
    errors,
  };
}

/** dist path for a route, matching vite-react-ssg's nested dirStyle. */
export const builtPageFor = (path) => `dist${path}/index.html`;

/**
 * The manifest may only name pages this build actually produced.
 *
 * @param {object} input
 * @param {object} input.manifest
 * @param {(relativePath: string) => (string|null)} input.readPage
 * @returns {string[]} every reason this manifest must not be published
 */
export function verifyBuiltPages({ manifest, readPage } = {}) {
  const errors = [];

  const hub = readPage('dist/guide/index.html');
  if (hub === null) {
    errors.push('the hub /guide was not prerendered, so no guide may be advertised');
  } else if (hasEmptyRoot(hub)) {
    errors.push('the hub /guide prerendered as an empty shell');
  }

  for (const guide of manifest?.guides ?? []) {
    const file = builtPageFor(guide.path);
    const html = readPage(file);
    if (html === null) {
      errors.push(
        `guide ${guide.slug}: ${guide.path} was not prerendered, so the manifest may not advertise it`
      );
      continue;
    }
    if (hasEmptyRoot(html)) {
      errors.push(`guide ${guide.slug}: ${guide.path} prerendered as an empty shell`);
      continue;
    }
    const marker = html.match(/data-guide-slug="([^"]*)"/);
    if (!marker || marker[1] !== guide.slug) {
      errors.push(
        `guide ${guide.slug}: ${file} renders data-guide-slug ` +
          `${JSON.stringify(marker ? marker[1] : null)}, so the manifest names the wrong page`
      );
    }
    const canonical = (html.match(/<link[^>]*\brel="canonical"[^>]*>/) ?? [''])[0].match(
      /\bhref="([^"]*)"/
    );
    const wanted = canonicalFor(guide.path);
    if (!canonical || canonical[1] !== wanted) {
      errors.push(
        `guide ${guide.slug}: canonical is ${JSON.stringify(canonical ? canonical[1] : null)}, ` +
          `expected ${JSON.stringify(wanted)}`
      );
    }
  }

  return errors;
}

/** Exactly what gets written, so the test can compare bytes with the file. */
export function serializeManifest(manifest) {
  return `${JSON.stringify(manifest, null, 2)}\n`;
}

export function readSiteRevision(root = repoRoot) {
  try {
    return execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], {
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (error) {
    throw new Error(
      `generate-guide-manifest: could not read the website revision from ${root}: ` +
        `${error.message}. The manifest records which site build the app is linking to, ` +
        'so an unversioned directory cannot publish one.'
    );
  }
}

function main() {
  const appRoot = resolveAppRoot();
  const appRevision = readAppRevision(appRoot);
  const siteRevision = readSiteRevision(repoRoot);

  const topics = readTopics(repoRoot);
  const guides = readGuides(repoRoot);

  const { manifest, errors } = buildGuideManifest({ topics, guides, appRevision, siteRevision });

  const readPage = (relativePath) => {
    const file = resolve(repoRoot, relativePath);
    return existsSync(file) ? readFileSync(file, 'utf-8') : null;
  };

  if (!existsSync(resolve(repoRoot, 'dist'))) {
    process.stderr.write(
      'generate-guide-manifest: dist/ not found. The manifest is generated from a ' +
        'successful build, never from the repository alone.\n'
    );
    process.exit(1);
  }

  const buildErrors = errors.length > 0 ? errors : verifyBuiltPages({ manifest, readPage });

  if (buildErrors.length > 0) {
    process.stderr.write(
      `generate-guide-manifest: ${buildErrors.length} problem(s); no manifest written.\n` +
        `${buildErrors.map((error) => `  - ${error}`).join('\n')}\n`
    );
    process.exit(1);
  }

  const serialized = serializeManifest(manifest);
  writeFileSync(resolve(repoRoot, 'dist', MANIFEST_FILE), serialized);
  writeFileSync(resolve(repoRoot, 'public', MANIFEST_FILE), serialized);

  process.stdout.write(
    `generate-guide-manifest: wrote dist/${MANIFEST_FILE} and public/${MANIFEST_FILE} ` +
      `(${manifest.guides.length} guides, site ${siteRevision.slice(0, 12)}, ` +
      `app ${appRevision.slice(0, 12)})\n`
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
