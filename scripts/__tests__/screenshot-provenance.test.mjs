// Mutation tests for the screenshot provenance gate.
//
// The rule this replaces was a list of six filenames. It worked exactly once —
// on the day somebody typed one of those six names — and it could never have
// caught the same bytes under a seventh name, a crop of a real capture, or a
// capture that was simply new. What ships now is evidence: an image is allowed
// onto the site because somebody recorded a capture session against the demo
// company and reviewed the bytes that came out of it, and the recorded hash
// pins the file so the review cannot be quietly detached from the artwork.
//
// These tests are the proof that the gate bites. Each one is a mutation a
// reviewer would plausibly miss.

import { describe, it, expect } from 'vitest';
import { createHash } from 'node:crypto';

import {
  DEMO_COMPANY_ID,
  validateScreenshot,
  checkReferences,
  normalizeAssetPath,
  stripJsComments,
  collectSourceImageReferences,
  collectMarkdownImageReferences,
  collectHtmlImageReferences,
  collectCssImageReferences,
  isScreenshotSurface,
  findMetadataLeaks,
} from '../checkScreenshotProvenance.mjs';

const sha = (buffer) => createHash('sha256').update(buffer).digest('hex');

const bytes = Buffer.from('fixture-image');
const sha256 = sha(bytes);
const evidence = {
  kind: 'appScreenshot',
  companyId: 143,
  sha256,
  capturedAt: '2026-09-07T00:00:00Z',
  appRevision: '523b5637',
  route: '/dispatch',
  captureRecord: 'demo-dispatch-001',
  reviewed: true,
};

// ---------------------------------------------------------------------------
// The three cases the plan names.
// ---------------------------------------------------------------------------

describe('demo image evidence', () => {
  it('rejects an image without provenance', () => {
    expect(validateScreenshot({ bytes, evidence: null }).length).toBeGreaterThan(0);
  });

  it('rejects a customer screenshot even if renamed', () => {
    expect(
      validateScreenshot({ bytes, evidence: { ...evidence, companyId: 70 } }).length
    ).toBeGreaterThan(0);
  });

  it('rejects image replacement after review', () => {
    expect(
      validateScreenshot({ bytes: Buffer.from('changed'), evidence }).length
    ).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// The rest of the evidence contract.
// ---------------------------------------------------------------------------

describe('capture evidence must be complete', () => {
  it('accepts a complete record', () => {
    expect(validateScreenshot({ bytes, evidence })).toEqual([]);
    expect(DEMO_COMPANY_ID).toBe(143);
  });

  it.each(['captureRecord', 'capturedAt', 'appRevision', 'route'])(
    'rejects a record missing %s',
    (field) => {
      const partial = { ...evidence };
      delete partial[field];
      expect(validateScreenshot({ bytes, evidence: partial }).length).toBeGreaterThan(0);
    }
  );

  it('rejects an unreviewed record', () => {
    expect(
      validateScreenshot({ bytes, evidence: { ...evidence, reviewed: false } }).length
    ).toBeGreaterThan(0);
  });

  it('rejects a record that is not classified as an app screenshot', () => {
    expect(
      validateScreenshot({ bytes, evidence: { ...evidence, kind: 'illustration' } })
    ).toContain('not classified as app screenshot');
  });

  it('rejects a route carrying a customer id or query values', () => {
    expect(
      validateScreenshot({ bytes, evidence: { ...evidence, route: '/party/40213' } }).length
    ).toBeGreaterThan(0);
    expect(
      validateScreenshot({
        bytes,
        evidence: { ...evidence, route: '/dispatch?company=143&token=abc' },
      }).length
    ).toBeGreaterThan(0);
  });
});

describe('a derivative cannot mint its own origin', () => {
  const cropBytes = Buffer.from('fixture-image-cropped');
  const cropSha = sha(cropBytes);
  const crop = {
    kind: 'appScreenshot',
    companyId: 143,
    sha256: cropSha,
    capturedAt: '2026-09-07T00:00:00Z',
    appRevision: '523b5637',
    route: '/dispatch',
    captureRecord: 'demo-dispatch-001',
    reviewed: true,
    derivedFrom: sha256,
    derivation: 'cropped to the van bar',
  };

  it('accepts a derivative whose parent is the recorded original', () => {
    expect(validateScreenshot({ bytes: cropBytes, evidence: crop, parentEvidence: evidence }))
      .toEqual([]);
  });

  it('rejects a derivative whose recorded parent was not supplied', () => {
    expect(
      validateScreenshot({ bytes: cropBytes, evidence: crop, parentEvidence: null }).length
    ).toBeGreaterThan(0);
  });

  it('rejects a derivative pointing at a parent with different bytes', () => {
    const wrongParent = { ...evidence, sha256: sha(Buffer.from('someone else')) };
    expect(
      validateScreenshot({ bytes: cropBytes, evidence: crop, parentEvidence: wrongParent }).length
    ).toBeGreaterThan(0);
  });

  it('rejects a derivative whose parent is itself unproven', () => {
    const unprovenParent = { ...evidence, reviewed: false };
    expect(
      validateScreenshot({
        bytes: cropBytes,
        evidence: crop,
        parentEvidence: unprovenParent,
      }).length
    ).toBeGreaterThan(0);
  });

  it('rejects a derivative that declares no derivation', () => {
    const { derivation, ...noDerivation } = crop;
    expect(
      validateScreenshot({ bytes: cropBytes, evidence: noDerivation, parentEvidence: evidence })
        .length
    ).toBeGreaterThan(0);
  });
});

describe('public metadata carries no session or customer detail', () => {
  it('names a leaked token, cookie or trace URL', () => {
    expect(findMetadataLeaks({ ...evidence, sessionToken: 'eyJhbGciOi' }).length)
      .toBeGreaterThan(0);
    expect(findMetadataLeaks({ ...evidence, note: 'Authorization: Bearer abc123' }).length)
      .toBeGreaterThan(0);
    expect(findMetadataLeaks({ ...evidence, trace: 'https://trace.internal/run/9' }).length)
      .toBeGreaterThan(0);
    expect(findMetadataLeaks({ ...evidence, note: 'called +91 98200 12345' }).length)
      .toBeGreaterThan(0);
    expect(findMetadataLeaks(evidence)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Reference collection: what the site actually puts in front of a reader.
// ---------------------------------------------------------------------------

describe('reference collection', () => {
  it('normalises site-absolute asset paths and rejects remote ones', () => {
    expect(normalizeAssetPath('/assets/screenshots/a.webp')).toBe('/assets/screenshots/a.webp');
    expect(normalizeAssetPath('https://takkada.com/assets/screenshots/a.webp')).toBe(
      '/assets/screenshots/a.webp'
    );
    expect(normalizeAssetPath('/assets/../../etc/passwd')).toBeNull();
    expect(normalizeAssetPath('https://cdn.example.com/a.webp')).toBe(
      'https://cdn.example.com/a.webp'
    );
    expect(normalizeAssetPath('data:image/png;base64,AAAA')).toBe('data:image/png');
  });

  it('does not treat a path inside a code comment as a reference', () => {
    const source = `
      // poster: '/assets/video/never-shipped.png'
      /* '/assets/screenshots/also-not.webp' */
      export const hero = '/assets/screenshots/real.webp';
    `;
    expect(collectSourceImageReferences(stripJsComments(source))).toEqual([
      '/assets/screenshots/real.webp',
    ]);
  });

  it('collects markdown, html and css references', () => {
    expect(collectMarkdownImageReferences('![van](/assets/guide/van.webp)')).toEqual([
      '/assets/guide/van.webp',
    ]);
    expect(
      collectHtmlImageReferences(
        '<picture><source srcset="/assets/guide/a.webp"><img src="/assets/guide/b.png"></picture>'
      ).sort()
    ).toEqual(['/assets/guide/a.webp', '/assets/guide/b.png']);
    expect(collectCssImageReferences(".x{background:url('/assets/screenshots/c.webp')}")).toEqual([
      '/assets/screenshots/c.webp',
    ]);
  });

  it('knows which surfaces are screenshot surfaces', () => {
    expect(isScreenshotSurface('featurePage:hero')).toBe(true);
    expect(isScreenshotSurface('guide:images')).toBe(true);
    expect(isScreenshotSurface('schema:screenshot')).toBe(true);
    expect(isScreenshotSurface('dist:img')).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// The site-wide sweep, driven off an in-memory manifest and byte source.
// ---------------------------------------------------------------------------

const provenPath = '/assets/guide/dispatch-van.webp';
const unprovenPath = '/assets/screenshots/home-screen-framed.webp';
const sensitivePath = '/assets/screenshots/settlement.webp';

const unprovenBytes = Buffer.from('pre-existing screenshot');
const sensitiveBytes = Buffer.from('a real customer capture');
const illustrationBytes = Buffer.from('a drawn illustration');

const manifest = () => ({
  demoCompanyId: 143,
  images: {
    [sha256]: { ...evidence, path: `public${provenPath}` },
    [sha(illustrationBytes)]: {
      kind: 'illustration',
      sha256: sha(illustrationBytes),
      path: '/assets/blog/drawn.png',
      reviewed: true,
      reviewedOn: '2026-09-07',
      reviewedBy: 'operator',
      origin: 'generated by scripts/generate-blog-images.py from the post title',
    },
  },
  unprovenAllowlist: {
    [sha(unprovenBytes)]: {
      path: `public${unprovenPath}`,
      kind: 'appScreenshot',
      allowlistedOn: '2026-09-07',
      knownSensitive: false,
      reason: 'shipped before the provenance gate existed',
    },
    [sha(sensitiveBytes)]: {
      path: `public${sensitivePath}`,
      kind: 'appScreenshot',
      allowlistedOn: '2026-09-07',
      knownSensitive: true,
      reason: 'named individual and two real bank UTRs',
    },
  },
  classes: [],
});

const readBytes = (path) =>
  ({
    [`public${provenPath}`]: bytes,
    [`public${unprovenPath}`]: unprovenBytes,
    [`public${sensitivePath}`]: sensitiveBytes,
    'public/assets/blog/drawn.png': illustrationBytes,
  })[path] ?? null;

const sweep = (references, options = {}) =>
  checkReferences({ references, manifest: manifest(), readBytes, ...options });

describe('site-wide provenance sweep', () => {
  it('passes an image with complete evidence', () => {
    const result = sweep([{ path: provenPath, surface: 'guide:images', origin: 'dispatch.md' }]);
    expect(result.errors).toEqual([]);
  });

  it('fails a new, unmanifested image referenced from a guide', () => {
    const result = sweep([
      { path: '/assets/guide/brand-new.webp', surface: 'guide:images', origin: 'dispatch.md' },
    ]);
    expect(result.errors.join('\n')).toContain('brand-new.webp');
  });

  it('fails an unmanifested image wherever it appears, not only in guides', () => {
    const result = sweep([
      {
        path: '/assets/screenshots/brand-new.webp',
        surface: 'featurePage:hero',
        origin: 'featurePages.js',
      },
    ]);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('refuses to grandfather an unproven image forward into a guide', () => {
    const result = sweep([
      { path: unprovenPath, surface: 'guide:images', origin: 'home.md' },
    ]);
    expect(result.errors.join('\n')).toContain(unprovenPath);
    expect(result.errors.join('\n')).toMatch(/guide/i);
  });

  it('reports, rather than fails, the pre-existing unproven set', () => {
    const result = sweep([
      { path: unprovenPath, surface: 'featurePage:hero', origin: 'featurePages.js' },
    ]);
    expect(result.errors).toEqual([]);
    expect(result.unproven.map((u) => u.path)).toContain(unprovenPath);
  });

  it('still hard-fails a known-sensitive capture on a feature page, as the old name rule did', () => {
    const result = sweep([
      { path: sensitivePath, surface: 'featurePage:hero', origin: 'featurePages.js' },
    ]);
    expect(result.errors.join('\n')).toContain('settlement');
  });

  it('escalates a known-sensitive capture that ships on any other surface', () => {
    const result = sweep([
      { path: sensitivePath, surface: 'schema:screenshot', origin: 'schema.js' },
    ]);
    expect(result.escalations.join('\n')).toContain('settlement');
  });

  it('fails every allowlisted image once its bytes change', () => {
    const changed = (path) => (path.endsWith('settlement.webp') ? Buffer.from('swapped') : readBytes(path));
    const result = checkReferences({
      references: [{ path: sensitivePath, surface: 'featurePage:hero', origin: 'featurePages.js' }],
      manifest: manifest(),
      readBytes: changed,
    });
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('fails the same bytes presented under a different filename', () => {
    const renamed = (path) =>
      path === 'public/assets/screenshots/settlement-v2.webp' ? sensitiveBytes : readBytes(path);
    const result = checkReferences({
      references: [
        {
          path: '/assets/screenshots/settlement-v2.webp',
          surface: 'featurePage:hero',
          origin: 'featurePages.js',
        },
      ],
      manifest: manifest(),
      readBytes: renamed,
    });
    expect(result.errors.join('\n')).toContain('settlement-v2.webp');
  });

  it('will not let a screenshot pass by being relabelled an illustration', () => {
    const result = sweep([
      { path: '/assets/blog/drawn.png', surface: 'featurePage:hero', origin: 'featurePages.js' },
    ]);
    expect(result.errors.join('\n')).toMatch(/illustration|classif/i);
  });

  it('accepts a class-rule illustration on an ordinary surface but not on a screenshot surface', () => {
    const withClass = manifest();
    withClass.classes = [
      {
        pathPrefix: 'public/assets/blog/',
        kind: 'illustration',
        reviewedOn: '2026-09-07',
        reviewedBy: 'operator',
        origin: 'scripts/generate-blog-images.py renders the post title onto a card',
      },
    ];
    const args = { manifest: withClass, readBytes: () => Buffer.from('anything') };
    expect(
      checkReferences({
        references: [{ path: '/assets/blog/post.png', surface: 'dist:img', origin: 'dist' }],
        ...args,
      }).errors
    ).toEqual([]);
    expect(
      checkReferences({
        references: [
          { path: '/assets/blog/post.png', surface: 'featurePage:hero', origin: 'featurePages.js' },
        ],
        ...args,
      }).errors.length
    ).toBeGreaterThan(0);
  });

  it('refuses a class rule that tries to cover the screenshot library', () => {
    const withClass = manifest();
    withClass.classes = [
      {
        pathPrefix: 'public/assets/screenshots/',
        kind: 'illustration',
        reviewedOn: '2026-09-07',
        reviewedBy: 'operator',
        origin: 'nice try',
      },
    ];
    const result = checkReferences({
      references: [
        { path: '/assets/screenshots/anything.webp', surface: 'dist:img', origin: 'dist' },
      ],
      manifest: withClass,
      readBytes: () => Buffer.from('anything'),
    });
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('fails a remote application screenshot outright', () => {
    const result = sweep([
      {
        path: 'https://cdn.example.com/screen.webp',
        surface: 'guide:images',
        origin: 'dispatch.md',
      },
    ]);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('fails a referenced file that is not on disk', () => {
    const result = sweep([
      { path: '/assets/guide/gone.webp', surface: 'guide:images', origin: 'dispatch.md' },
    ]);
    expect(result.errors.join('\n')).toMatch(/gone\.webp/);
  });

  it('turns every report into a failure under --strict', () => {
    const result = sweep(
      [{ path: unprovenPath, surface: 'featurePage:hero', origin: 'featurePages.js' }],
      { strict: true }
    );
    expect(result.errors.length).toBeGreaterThan(0);
  });
});
