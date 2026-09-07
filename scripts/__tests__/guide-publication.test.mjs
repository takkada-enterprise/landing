// What the app is allowed to link to, and what the crawlers are told exists.
//
// Every other guard in this plan set protects a page. This one protects the
// PROMISE about the pages: the manifest the Flutter release tool reads, the
// sitemap Google reads and the llms.txt an assistant reads. Those three are the
// only artefacts that can be wrong while all 21 pages are perfectly fine, and
// the damage is asymmetric — a shipped app version whose "Read the full guide"
// button opens a 404 cannot be fixed on the customer's phone for weeks.
//
// So nothing here is a hard-coded list of slugs. `topics` comes from the real
// registry, `guides` from the real markdown, and `manifest`, `sitemap` and
// `llms` are produced by the real generator exports the build itself calls. A
// test that restated the 21 slugs would agree with a broken generator forever.
//
// The build output is a fixture rather than dist/: `npm test` has to be honest
// on a clean checkout, and the fixture is what lets the mutation tests below
// delete a page and prove the generator names the loss instead of publishing
// around it.

import { afterAll, describe, expect, it } from 'vitest';
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  INTERNAL_TOPIC_IDS,
  readGuides,
  readTopics,
  validateGuideContract,
} from '../lib/guideContract.mjs';
import {
  buildGuideManifest,
  builtPageFor,
  contentSha256,
  publishableTopics,
  serializeManifest,
  verifyBuiltPages,
  SCHEMA_VERSION,
} from '../generate-guide-manifest.mjs';
import { readReferencedSlugs } from '../checkGuideContract.mjs';
import { canonicalFor, expectationsFor, GUIDE_HUB } from '../checkGuidePrerender.mjs';
import { findDanglingRelated, inspectGuideHub } from '../checkGuideHub.mjs';
import { buildSitemapXml, guideSitemapEntries, loc, siteEntries } from '../generate-sitemap.mjs';
import { buildDoc, buildGuides, buildManual, url } from '../generate-llms-txt.mjs';
import { routeMetadata } from '../../src/data/siteMetadata.js';
import { pricing } from '../../src/data/siteContent.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

const TOPICS = readTopics(repoRoot);
const GUIDES = readGuides(repoRoot);
const PUBLISHABLE = publishableTopics(TOPICS);

const APP_REVISION = 'af582ef8fc0dd4f898ec8aae0d78546121ae81d2';
const SITE_REVISION = 'b2702547fdf8a1b2fcf3438e25149a0ac38ebd20';

const build = (overrides = {}) =>
  buildGuideManifest({
    topics: TOPICS,
    guides: GUIDES,
    appRevision: APP_REVISION,
    siteRevision: SITE_REVISION,
    ...overrides,
  });

const { manifest, errors: manifestErrors } = build();

// ── the fixture build ──────────────────────────────────────────────────────
//
// Shaped like what vite-react-ssg actually emits for these routes: a filled
// #root, one h1, the data-guide-slug marker GuidePost.jsx renders and the
// canonical react-helmet stamps. The page bodies come from expectationsFor(),
// so a reworded title moves the fixture with the corpus.

const fixturePage = (expected) =>
  '<!doctype html><html><head>' +
  `<title>${expected.title}</title>` +
  `<link data-rh="true" rel="canonical" href="${canonicalFor(expected.path)}"/>` +
  '</head><body><div id="root">' +
  `<main class="guide-page" data-guide-slug="${expected.slug}"><h1>${expected.h1}</h1></main>` +
  '</div></body></html>';

const fixtureHub = (paths) =>
  '<!doctype html><html><head>' +
  `<title>${GUIDE_HUB.title}</title>` +
  `<link data-rh="true" rel="canonical" href="${canonicalFor(GUIDE_HUB.path)}"/>` +
  '</head><body><div id="root">' +
  `<main class="guide-hub"><h1>${GUIDE_HUB.h1}</h1>` +
  paths.map((path) => `<a class="guide-hub-card" href="${path}">card</a>`).join('') +
  '</main></div></body></html>';

function fixtureBuild() {
  const pages = new Map();
  pages.set('dist/guide/index.html', fixtureHub(manifest.guides.map((guide) => guide.path)));
  for (const expected of expectationsFor(TOPICS, GUIDES)) {
    if (expected.missingContent || !expected.slug) continue;
    pages.set(expected.file, fixturePage(expected));
  }
  return pages;
}

const readerFor = (pages) => (relativePath) => pages.get(relativePath) ?? null;

// ── the artefacts, from the real generators ────────────────────────────────

const guideEntries = guideSitemapEntries(TOPICS, GUIDES);
const guideSitemap = buildSitemapXml(guideEntries);
const fullSitemap = buildSitemapXml(siteEntries(repoRoot));
const manual = buildManual(TOPICS, GUIDES);
const llms = buildDoc({
  priceData: pricing,
  routes: routeMetadata,
  guides: buildGuides(resolve(repoRoot, 'content/blog')),
  manual,
});

const occurrences = (haystack, needle) => haystack.split(needle).length - 1;

describe('the app manifest', () => {
  it('is generated from the real corpus without complaint', () => {
    expect(manifestErrors).toEqual([]);
    expect(manifest.schemaVersion).toBe(SCHEMA_VERSION);
    expect(manifest.appRevision).toBe(APP_REVISION);
    expect(manifest.siteRevision).toBe(SITE_REVISION);
  });

  it('has exactly one entry per publishable topic', () => {
    expect(manifest.guides.map((guide) => guide.slug).sort()).toEqual(
      PUBLISHABLE.map((topic) => topic.slug).sort()
    );
    expect(new Set(manifest.guides.map((guide) => guide.id)).size).toBe(manifest.guides.length);
  });

  it('carries exactly the fields the app verifies, and no private ones', () => {
    for (const guide of manifest.guides) {
      expect(Object.keys(guide).sort()).toEqual(
        ['checkedAgainstAppOn', 'contentSha256', 'featureKey', 'id', 'path', 'slug'].sort()
      );
      expect(guide.path).toBe(`/guide/${guide.slug}`);
      expect(guide.checkedAgainstAppOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.contentSha256).toMatch(/^[0-9a-f]{64}$/);
      expect(JSON.stringify(guide)).not.toMatch(/quoteSources|sourceFiles|TAKKADA_APP_ROOT|\/Users\//);
    }
  });

  it('is sorted by slug, so two builds of one commit diff as nothing', () => {
    const slugs = manifest.guides.map((guide) => guide.slug);
    expect(slugs).toEqual([...slugs].sort((a, b) => a.localeCompare(b)));
    expect(serializeManifest(build().manifest)).toBe(serializeManifest(manifest));
  });

  it('hashes the guide bytes, never a file mtime', () => {
    const dispatch = GUIDES.find((guide) => guide.slug === 'dispatch');
    const entry = manifest.guides.find((guide) => guide.slug === 'dispatch');
    expect(entry.contentSha256).toBe(
      createHash('sha256').update(Buffer.from(dispatch.raw, 'utf-8')).digest('hex')
    );
    const edited = GUIDES.map((guide) =>
      guide.slug === 'dispatch' ? { ...guide, raw: `${guide.raw}\n` } : guide
    );
    const moved = build({ guides: edited }).manifest.guides.find((g) => g.slug === 'dispatch');
    expect(moved.contentSha256).not.toBe(entry.contentSha256);
  });

  it('never advances a checked date because the app revision moved on', () => {
    const later = build({ appRevision: '0000000000000000000000000000000000000000' }).manifest;
    expect(later.guides.map((guide) => guide.checkedAgainstAppOn)).toEqual(
      manifest.guides.map((guide) => guide.checkedAgainstAppOn)
    );
    expect(later.guides.map((guide) => guide.contentSha256)).toEqual(
      manifest.guides.map((guide) => guide.contentSha256)
    );
  });

  it('excludes the internal-only topic, and refuses one that sneaks in', () => {
    expect([...INTERNAL_TOPIC_IDS]).toContain('entries-waiting-approval');
    expect(manifest.guides.find((guide) => guide.slug === 'entries-waiting-approval')).toBeUndefined();

    const smuggled = build({
      topics: [
        ...TOPICS,
        {
          id: 'entries-waiting-approval',
          slug: 'entries-waiting-approval',
          featureKey: null,
          title: 'Entries waiting for approval',
          sourceFiles: ['lib/screens/home_screen.dart'],
        },
      ],
      guides: [
        ...GUIDES,
        { slug: 'entries-waiting-approval', title: 'x', raw: 'x', checkedAgainstAppOn: '2026-09-07' },
      ],
    });
    expect(smuggled.manifest.guides.map((guide) => guide.slug)).not.toContain(
      'entries-waiting-approval'
    );
    expect(smuggled.errors).toContain(
      'guide entries-waiting-approval: internal-only, it must not reach the manifest'
    );
  });

  it('names a topic that has no markdown instead of publishing 20 of 21', () => {
    const { errors } = build({ guides: GUIDES.filter((guide) => guide.slug !== 'e-way-bill') });
    expect(errors).toContain('topic e-way-bill: no guide markdown, so it cannot be published');
  });
});

describe('the manifest may only advertise pages this build produced', () => {
  it('accepts the real corpus against a complete build', () => {
    expect(verifyBuiltPages({ manifest, readPage: readerFor(fixtureBuild()) })).toEqual([]);
  });

  it('names the guide whose page is missing from the build', () => {
    const pages = fixtureBuild();
    pages.delete(builtPageFor('/guide/dispatch'));
    expect(verifyBuiltPages({ manifest, readPage: readerFor(pages) })).toContain(
      'guide dispatch: /guide/dispatch was not prerendered, so the manifest may not advertise it'
    );
  });

  it('names the hub when the hub itself is missing', () => {
    const pages = fixtureBuild();
    pages.delete('dist/guide/index.html');
    expect(verifyBuiltPages({ manifest, readPage: readerFor(pages) })).toContain(
      'the hub /guide was not prerendered, so no guide may be advertised'
    );
  });

  it('rejects a page that shipped as a client-rendered shell', () => {
    const pages = fixtureBuild();
    pages.set(
      builtPageFor('/guide/record-receipt'),
      '<!doctype html><html><body><div id="root"></div></body></html>'
    );
    expect(verifyBuiltPages({ manifest, readPage: readerFor(pages) })).toContain(
      'guide record-receipt: /guide/record-receipt prerendered as an empty shell'
    );
  });

  it('rejects a built page that is a different guide than the manifest says', () => {
    const pages = fixtureBuild();
    pages.set(
      builtPageFor('/guide/ledger-mapping'),
      pages.get(builtPageFor('/guide/ledger-mapping')).replace(
        'data-guide-slug="ledger-mapping"',
        'data-guide-slug="connect-tally"'
      )
    );
    const failures = verifyBuiltPages({ manifest, readPage: readerFor(pages) });
    expect(failures.join('\n')).toContain('the manifest names the wrong page');
  });

  it('rejects a page whose canonical points somewhere else', () => {
    const pages = fixtureBuild();
    pages.set(
      builtPageFor('/guide/tally-sync'),
      pages
        .get(builtPageFor('/guide/tally-sync'))
        .replace(canonicalFor('/guide/tally-sync'), 'https://takkada.com/blog/tally-sync/')
    );
    const failures = verifyBuiltPages({ manifest, readPage: readerFor(pages) });
    expect(failures.join('\n')).toContain('guide tally-sync: canonical is');
  });

  // The one the app depends on most: a topic somebody added this morning is a
  // plan, not a deployed page, and it must never reach the app as though it
  // were live.
  it('refuses a prospective topic that has no built page', () => {
    const topics = [
      ...TOPICS,
      {
        id: 'stock-transfers',
        slug: 'stock-transfers',
        featureKey: null,
        title: 'How to move stock between godowns',
        sourceFiles: ['lib/screens/home_screen.dart'],
      },
    ];
    const guides = [
      ...GUIDES,
      {
        slug: 'stock-transfers',
        title: 'How to move stock between godowns',
        featureKey: null,
        checkedAgainstAppOn: '2026-09-07',
        raw: '---\nslug: stock-transfers\n---\nnot built yet',
      },
    ];
    const prospective = build({ topics, guides }).manifest;
    expect(prospective.guides.map((guide) => guide.slug)).toContain('stock-transfers');
    expect(verifyBuiltPages({ manifest: prospective, readPage: readerFor(fixtureBuild()) })).toContain(
      'guide stock-transfers: /guide/stock-transfers was not prerendered, ' +
        'so the manifest may not advertise it'
    );
  });
});

describe('the hub and the related links', () => {
  it('links every manifest entry exactly once', () => {
    const pages = fixtureBuild();
    const report = inspectGuideHub(
      pages.get('dist/guide/index.html'),
      manifest.guides.map((guide) => guide.path)
    );
    expect(report).toMatchObject({ emptyRoot: false, missing: [], duplicated: [], stray: [] });
  });

  it('every relatedGuides target in the corpus is a published slug', () => {
    expect(findDanglingRelated(GUIDES, manifest.guides.map((guide) => guide.slug))).toEqual([]);
  });

  it('names a relatedGuides target that does not exist', () => {
    const broken = GUIDES.map((guide) =>
      guide.slug === 'dispatch' ? { ...guide, relatedGuides: ['sales-ordres'] } : guide
    );
    expect(findDanglingRelated(broken, manifest.guides.map((guide) => guide.slug))).toContain(
      'dispatch -> sales-ordres'
    );
  });
});

describe('the sitemap', () => {
  it('has one URL for the hub and exactly one for each publishable topic', () => {
    expect(guideEntries.map((entry) => entry.path)).toEqual([
      '/guide',
      ...PUBLISHABLE.map((topic) => `/guide/${topic.slug}`),
    ]);
    for (const topic of PUBLISHABLE) {
      expect(occurrences(guideSitemap, `<loc>${loc(`/guide/${topic.slug}`)}</loc>`)).toBe(1);
    }
    expect(guideSitemap).toContain('https://takkada.com/guide/dispatch/');
  });

  it('reaches the whole-site sitemap without duplicating anything', () => {
    for (const topic of PUBLISHABLE) {
      expect(occurrences(fullSitemap, `<loc>${loc(`/guide/${topic.slug}`)}</loc>`)).toBe(1);
    }
    expect(occurrences(fullSitemap, `<loc>${loc('/guide')}</loc>`)).toBe(1);
  });

  it('uses the checked date as lastmod, not a file timestamp', () => {
    for (const guide of manifest.guides) {
      const entry = guideEntries.find((each) => each.path === guide.path);
      expect(entry.lastmod).toBe(guide.checkedAgainstAppOn);
    }
    // The hub is as fresh as the freshest guide on it.
    const newest = [...manifest.guides.map((guide) => guide.checkedAgainstAppOn)].sort().at(-1);
    expect(guideEntries[0].lastmod).toBe(newest);
  });

  it('carries no internal-only topic', () => {
    expect(fullSitemap).not.toContain('entries-waiting-approval');
  });
});

describe('llms.txt', () => {
  it('lists the hub and every publishable guide once', () => {
    expect(llms).toContain(`Index: ${url('/guide')}`);
    expect(llms).toContain('https://takkada.com/guide/dispatch');
    for (const topic of PUBLISHABLE) {
      expect(occurrences(llms, url(`/guide/${topic.slug}`))).toBe(1);
    }
    expect(manual.map((entry) => entry.url).sort()).toEqual(
      PUBLISHABLE.map((topic) => url(`/guide/${topic.slug}`)).sort()
    );
  });

  it('keeps the manual apart from the blog, and carries no internal topic', () => {
    expect(llms.indexOf('## Manual')).toBeGreaterThan(llms.indexOf('## Features'));
    expect(llms.indexOf('## Manual')).toBeLessThan(llms.indexOf('## Guides'));
    expect(llms).not.toContain('entries-waiting-approval');
  });

  it('is what the committed public/llms.txt says', () => {
    // The generator writes this file; hand-editing it is what this catches.
    expect(readFileSync(resolve(repoRoot, 'public/llms.txt'), 'utf-8')).toBe(llms);
  });
});

describe('the editorial boundary the contract defends', () => {
  const contractInput = (overrides = {}) => ({
    topics: TOPICS,
    guides: GUIDES,
    referencedSlugs: [],
    sourceByPath: {},
    publicFeatureKeys: new Set(
      TOPICS.map((topic) => topic.featureKey).filter((key) => key !== null)
    ),
    ...overrides,
  });

  it('fails a guide title already used by a commercial or curiosity page', () => {
    const stolen = TOPICS[0].title;
    const errors = validateGuideContract(contractInput({ existingPages: { titles: [stolen] } }));
    expect(errors).toContain(
      `topic ${TOPICS[0].id}: the title "${stolen}" is already used by a page on the site`
    );
  });

  it('fails a guide whose URL is already a page on the site', () => {
    const errors = validateGuideContract(
      contractInput({ existingPages: { paths: [`/guide/${TOPICS[0].slug}`] } })
    );
    expect(errors).toContain(`topic ${TOPICS[0].id}: /guide/${TOPICS[0].slug} is already a page on the site`);
  });

  it('fails a slug the app links to that has no guide page', () => {
    expect(validateGuideContract(contractInput({ referencedSlugs: ['e-way-bill-v2'] }))).toContain(
      'app slug e-way-bill-v2: no guide page'
    );
  });

  it('fails an app link to the internal-only topic', () => {
    expect(
      validateGuideContract(contractInput({ referencedSlugs: ['entries-waiting-approval'] }))
    ).toContain('app slug entries-waiting-approval: internal-only, it must not be linked publicly');
  });
});

// What the app is treated as linking to. The distinction below is the whole of
// KD-7: an in-app explanation of "Entries waiting for approval" is permitted,
// a public page for it is not, and the two live in different app files.
describe('the slugs the app points at', () => {
  const roots = [];
  const appRootWith = (files) => {
    const root = mkdtempSync(join(tmpdir(), 'takkada-app-'));
    roots.push(root);
    mkdirSync(join(root, 'tool/help'), { recursive: true });
    for (const [name, body] of Object.entries(files)) {
      writeFileSync(join(root, 'tool/help', name), JSON.stringify(body, null, 2));
    }
    return root;
  };

  afterAll(() => {
    for (const root of roots) rmSync(root, { recursive: true, force: true });
  });

  it('reads an ordinary placement topic id as a public slug', () => {
    const root = appRootWith({
      'placements.json': { placements: [{ topicId: 'dispatch' }, { topicId: 'nowhere-guide' }] },
    });
    expect(readReferencedSlugs(root).slugs).toEqual(['dispatch', 'nowhere-guide']);
    expect(
      validateGuideContract({
        topics: TOPICS,
        guides: GUIDES,
        referencedSlugs: readReferencedSlugs(root).slugs,
        sourceByPath: {},
        publicFeatureKeys: new Set(TOPICS.map((t) => t.featureKey).filter(Boolean)),
      })
    ).toContain('app slug nowhere-guide: no guide page');
  });

  it('treats an in-app placement for the internal topic as in-app only', () => {
    const root = appRootWith({
      'placements.json': { placements: [{ topicId: 'entries-waiting-approval' }] },
    });
    const { slugs, inAppOnly } = readReferencedSlugs(root);
    expect(slugs).toEqual([]);
    expect(inAppOnly).toEqual(['entries-waiting-approval']);
  });

  it('still refuses an explicit public claim on the internal topic', () => {
    const root = appRootWith({
      'placements.json': {
        placements: [
          { topicId: 'entries-waiting-approval', publicSlug: 'entries-waiting-approval' },
        ],
      },
    });
    expect(readReferencedSlugs(root).slugs).toEqual(['entries-waiting-approval']);
  });

  it('refuses the internal topic in published_guides.json, which is a real link', () => {
    const root = appRootWith({
      'published_guides.json': { slugs: ['dispatch', 'entries-waiting-approval'] },
    });
    expect(readReferencedSlugs(root).slugs).toContain('entries-waiting-approval');
  });
});

describe('the committed public/guide-manifest.json', () => {
  const file = resolve(repoRoot, 'public/guide-manifest.json');

  it('exists, so the app integration can be reviewed before anything deploys', () => {
    expect(existsSync(file)).toBe(true);
  });

  // Deliberately not byte-identity: `siteRevision` in the committed copy is
  // necessarily the revision BEFORE the commit that contains it, and the
  // deployed copy is overwritten from the real build every time. What must not
  // drift is the content contract.
  it('names the same guides, paths, dates and hashes as the corpus does now', () => {
    const committed = JSON.parse(readFileSync(file, 'utf-8'));
    expect(committed.schemaVersion).toBe(SCHEMA_VERSION);
    expect(committed.guides).toEqual(manifest.guides);
    expect(committed.appRevision).toMatch(/^[0-9a-f]{7,40}$/);
    expect(committed.siteRevision).toMatch(/^[0-9a-f]{7,40}$/);
  });

  it('hashes the guide bytes exactly as the generator does', () => {
    const committed = JSON.parse(readFileSync(file, 'utf-8'));
    for (const entry of committed.guides) {
      const guide = GUIDES.find((each) => each.slug === entry.slug);
      expect(entry.contentSha256).toBe(contentSha256(guide.raw));
    }
  });
});
