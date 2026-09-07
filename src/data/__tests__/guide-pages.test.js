import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { readGuides, readTopics, SLUG_RE } from '../../../scripts/lib/guideContract.mjs';
import { FEATURE_PAGES, featurePagePath } from '../featurePages';
import { routeMetadata } from '../siteMetadata';

// The content side of the guide contract: the catalog, the copy and the
// manifest. scripts/__tests__/guide-contract.test.mjs proves the validator
// catches damage; this file asserts the real corpus in this repository is
// whole.
//
// It is red on purpose until every page is written. That is the point — a
// half-finished manual with a green suite is how twenty of twenty-one topics
// end up as a hub full of links to nothing. The failure below names the exact
// files still missing, so progress is legible without weakening anything.
//
// The visibility evidence is read from the paired app checkout rather than a
// copy committed here. A copy would rot, and a rotted copy is worse than none:
// it would keep asserting that a feature is customer-visible long after it was
// pulled back, and the manual would keep advertising it.

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

const appRoot = process.env.TAKKADA_APP_ROOT?.trim();
const evidenceFile = appRoot ? resolve(appRoot, 'tool/help/visibility-evidence.json') : null;
const evidence =
  evidenceFile && existsSync(evidenceFile)
    ? JSON.parse(readFileSync(evidenceFile, 'utf-8'))
    : null;
const PUBLIC_FEATURE_KEYS = new Set(
  Object.entries(evidence?.features ?? {})
    .filter(([, visible]) => visible === true)
    .map(([key]) => key)
);

const TOPICS = readTopics(repoRoot);
const GUIDES = readGuides(repoRoot);
const guideBySlug = new Map(GUIDES.map((guide) => [guide.slug, guide]));

// The release inventory agreed in the coordinating plan. A twenty-second topic
// is a product decision, not a content decision, so the count is pinned.
const EXPECTED_TOPIC_COUNT = 21;

// KD-7's in-app-only exception. It has a topic id inside the app and no public
// page anywhere, ever.
const INTERNAL_ONLY = 'entries-waiting-approval';

const BANNED_WORDS = [
  'seamless',
  'world-class',
  'enterprise-grade',
  'revolutionary',
  'unleash',
  'game-changer',
];

// Naming a plan is naming a price. A guide describes what a screen does for
// whoever can already open it; effective access comes from the app, never from
// a tier a reader matches themselves against.
const COMMERCIAL_TERMS = ['Clarity', 'Momentum', 'Assurance', 'Copilot', '₹'];

const normalise = (value) => String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase();

describe('guide catalog', () => {
  // Without the paired checkout there is no way to know which features are
  // customer-visible, and guessing is the exact failure the gate exists to
  // stop. Fail loudly rather than skipping the visibility assertions.
  it('has the paired app checkout supplying live visibility evidence', () => {
    expect(
      appRoot,
      'TAKKADA_APP_ROOT is not set. Export the takkada checkout so the guide ' +
        'catalog can be checked against live feature visibility.'
    ).toBeTruthy();
    expect(evidence, `visibility evidence not found at ${evidenceFile}`).toBeTruthy();
    expect(PUBLIC_FEATURE_KEYS.size).toBeGreaterThan(0);
  });

  it('ships exactly the agreed release inventory', () => {
    const manifest = JSON.parse(
      readFileSync(resolve(repoRoot, 'content/guide/topics.json'), 'utf-8')
    );
    expect(manifest.schemaVersion).toBe(1);
    expect(TOPICS).toHaveLength(EXPECTED_TOPIC_COUNT);
  });

  it.each(TOPICS.map((topic) => [topic.slug, topic]))(
    '%s: id and slug are unique and url-safe',
    (slug, topic) => {
      expect(slug).toMatch(SLUG_RE);
      expect(topic.id).toMatch(SLUG_RE);
      expect(TOPICS.filter((each) => each.slug === slug)).toHaveLength(1);
      expect(TOPICS.filter((each) => each.id === topic.id)).toHaveLength(1);
    }
  );

  it('keeps the internal approvals topic out of the public catalog', () => {
    expect(TOPICS.map((topic) => topic.id)).not.toContain(INTERNAL_ONLY);
    expect(TOPICS.map((topic) => topic.slug)).not.toContain(INTERNAL_ONLY);
  });

  it.each(TOPICS.filter((topic) => topic.featureKey).map((topic) => [topic.slug, topic.featureKey]))(
    '%s: %s is customer-visible in the live evidence',
    (_slug, featureKey) => {
      expect(PUBLIC_FEATURE_KEYS.has(featureKey)).toBe(true);
    }
  );

  it.each(TOPICS.map((topic) => [topic.slug, topic]))(
    '%s: names app source files that exist in the checkout',
    (_slug, topic) => {
      expect(Array.isArray(topic.sourceFiles) && topic.sourceFiles.length > 0).toBe(true);
      if (!appRoot) return;
      const missing = topic.sourceFiles.filter((path) => !existsSync(resolve(appRoot, path)));
      expect(missing, `not in the app checkout: ${missing.join(', ')}`).toEqual([]);
    }
  );
});

describe('guide titles', () => {
  const siteTitles = new Set([
    ...FEATURE_PAGES.flatMap((page) => [page.seo?.title, page.headline]),
    ...routeMetadata.map((route) => route.llms?.title),
  ]
    .filter(Boolean)
    .map(normalise));

  const sitePaths = new Set([
    ...FEATURE_PAGES.map(featurePagePath),
    ...routeMetadata.map((route) => route.path),
  ]);

  it.each(TOPICS.map((topic) => [topic.slug, topic]))(
    '%s: has a task-shaped title nobody else on the site uses',
    (slug, topic) => {
      expect(topic.title.trim()).not.toBe('');
      expect(siteTitles.has(normalise(topic.title))).toBe(false);
      expect(sitePaths.has(`/guide/${slug}`)).toBe(false);
      expect(TOPICS.filter((each) => normalise(each.title) === normalise(topic.title))).toHaveLength(
        1
      );
    }
  );

  it.each(TOPICS.map((topic) => [topic.slug, topic.title]))(
    '%s: title carries no stock-SaaS filler and no price',
    (_slug, title) => {
      for (const word of BANNED_WORDS) expect(title.toLowerCase()).not.toContain(word);
      for (const term of COMMERCIAL_TERMS) expect(title).not.toContain(term);
    }
  );
});

describe('guide pages', () => {
  // W3 writes these. Until it finishes, this names what is still missing
  // rather than reporting a green manual with nothing in it.
  it('has a written page for every topic', () => {
    const missing = TOPICS.filter((topic) => !guideBySlug.has(topic.slug)).map(
      (topic) => `content/guide/${topic.slug}.md`
    );
    expect(
      missing,
      missing.length === 0
        ? ''
        : `${missing.length} of ${TOPICS.length} guide pages are not written yet:\n  ${missing.join(
            '\n  '
          )}`
    ).toEqual([]);
  });

  it('has no page without a topic record', () => {
    const slugs = new Set(TOPICS.map((topic) => topic.slug));
    const orphans = GUIDES.filter((guide) => !slugs.has(guide.slug)).map((guide) => guide.file);
    expect(orphans, `content/guide files with no topic: ${orphans.join(', ')}`).toEqual([]);
  });

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: filename, slug and title agree with the catalog',
    (slug, guide) => {
      const topic = TOPICS.find((each) => each.slug === slug);
      expect(guide.file).toBe(`${slug}.md`);
      expect(normalise(guide.title)).toBe(normalise(topic?.title));
      expect(guide.featureKey ?? null).toBe(topic?.featureKey ?? null);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: carries its checked-against evidence',
    (_slug, guide) => {
      expect(guide.checkedAgainstAppOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.appRevision).toMatch(/^[0-9a-f]{7,40}$/);
      expect(Array.isArray(guide.quotes) && guide.quotes.length > 0).toBe(true);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: is a real procedure with prerequisites',
    (_slug, guide) => {
      expect(guide.body).toContain('Before you start');
      expect(guide.body).toMatch(/^\s*1\.\s+\S/m);
      expect(guide.body.trim().split(/\s+/).length).toBeGreaterThan(150);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: promises no price, plan or dark feature',
    (_slug, guide) => {
      for (const term of COMMERCIAL_TERMS) expect(guide.body).not.toContain(term);
      for (const word of BANNED_WORDS) expect(guide.body.toLowerCase()).not.toContain(word);
      for (const section of guide.sections ?? []) {
        for (const key of section.featureKeys ?? []) {
          expect(PUBLIC_FEATURE_KEYS.has(key), `${key} is not customer-visible`).toBe(true);
        }
      }
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: only links related guides that exist',
    (_slug, guide) => {
      const slugs = new Set(TOPICS.map((topic) => topic.slug));
      for (const related of guide.relatedGuides ?? []) expect(slugs.has(related)).toBe(true);
    }
  );
});

// W5 generates public/guide-manifest.json from a successful build. It is not
// present yet; when it appears it must describe this catalog and nothing else,
// because the Flutter release tool turns it into the app's link whitelist.
describe('guide manifest', () => {
  const manifestFile = resolve(repoRoot, 'public/guide-manifest.json');

  it.runIf(existsSync(manifestFile))('lists exactly the public topics', () => {
    const manifest = JSON.parse(readFileSync(manifestFile, 'utf-8'));
    expect(manifest.schemaVersion).toBe(1);
    expect(manifest.guides.map((guide) => guide.slug).sort()).toEqual(
      TOPICS.map((topic) => topic.slug).sort()
    );
    expect(manifest.guides.every((guide) => guide.path === `/guide/${guide.slug}`)).toBe(true);
    expect(manifest.guides.find((guide) => guide.slug === INTERNAL_ONLY)).toBeUndefined();
  });
});
