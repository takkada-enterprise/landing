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
const PLAN_TIER_TERMS = ['Clarity', 'Momentum', 'Assurance', 'Copilot'];
const COMMERCIAL_TERMS = [...PLAN_TIER_TERMS, '₹'];

// A rupee figure in a body is not by itself a promise about money. A guide has
// to be able to say that the app puts a button on screen above a threshold,
// which is a fact about the software and is written on this page as explicitly
// not a statement of law. Banning the character outright bought nothing and
// cost that sentence.
//
// What may never appear is pricing: an amount sold as a rate or a fee, or an
// amount standing next to the words a price is quoted in. So the guard is an
// amount within a line of pricing language, in either order, plus the tier
// names, which stay banned outright wherever they appear.
const PRICE_WORDS = String.raw`per month|per year|per user|a month|a year|\/mo\b|\/month\b|\/yr\b|\/year\b|\bplans?\b|\bpriced?\b|\bprices\b|\bpricing\b|\bcosts?\b|\bfees?\b|\bsubscriptions?\b|\bsubscribe\b|\bupgrade\b|\bbuy\b|\bpurchase the\b|\bfree trial\b|\bper credit\b`;
const RUPEE_AMOUNT = String.raw`₹\s*[\d,]+(?:\.\d+)?`;
const PRICING_LANGUAGE_RE = new RegExp(
  `(?:${RUPEE_AMOUNT})[^\n]{0,60}?(?:${PRICE_WORDS})` +
    `|(?:${PRICE_WORDS})[^\n]{0,60}?(?:${RUPEE_AMOUNT})`,
  'i'
);

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

// ───────────────────────────────────────────────────────────────────────────
// Search-result metadata.
//
// CLAUDE.md §9 asks every page for a unique title under 60 characters and a
// unique description under 160. `src/components/Seo.jsx` only warns when a
// page breaks that, and a warning in a build log that nobody reads is how
// thirteen of twenty-one guides ended up with titles Google truncates
// mid-word. The limits are asserted here instead, against the same strings
// the route hands to Seo — including the `title — Takkada` fallback a guide
// gets when it declares no meta_title of its own, because that fallback is
// what would actually be served.
// ───────────────────────────────────────────────────────────────────────────

const MAX_META_TITLE = 60;
const MAX_META_DESCRIPTION = 160;

/** Exactly what src/routes/GuidePost.jsx passes to <Seo title=…>. */
const servedTitle = (guide) => guide.metaTitle || `${guide.title} — Takkada`;

describe('guide search-result metadata', () => {
  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: has a title search engines will not truncate',
    (slug, guide) => {
      const title = servedTitle(guide);
      expect(
        title.length,
        `${slug}: meta_title is ${title.length} characters, over the ${MAX_META_TITLE}-` +
          `character limit: ${title}`
      ).toBeLessThanOrEqual(MAX_META_TITLE);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: has a description search engines will not truncate',
    (slug, guide) => {
      const description = String(guide.metaDescription ?? '');
      expect(description.trim(), `${slug}: no meta_description`).not.toBe('');
      expect(
        description.length,
        `${slug}: meta_description is ${description.length} characters, over the ` +
          `${MAX_META_DESCRIPTION}-character limit: ${description}`
      ).toBeLessThanOrEqual(MAX_META_DESCRIPTION);
    }
  );

  // Two guides sharing a title or a description is two pages competing for the
  // same result, which is the same damage as one page having none.
  it('gives every guide its own title and description', () => {
    for (const [label, values] of [
      ['title', GUIDES.map((guide) => [guide.slug, normalise(servedTitle(guide))])],
      ['description', GUIDES.map((guide) => [guide.slug, normalise(guide.metaDescription)])],
    ]) {
      const seen = new Map();
      const clashes = [];
      for (const [slug, value] of values) {
        if (seen.has(value)) clashes.push(`${seen.get(value)} and ${slug} share a ${label}`);
        else seen.set(value, slug);
      }
      expect(clashes, clashes.join('; ')).toEqual([]);
    }
  });
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
      for (const term of PLAN_TIER_TERMS) expect(guide.body).not.toContain(term);
      const priced = guide.body.match(PRICING_LANGUAGE_RE);
      expect(priced, `quotes a price: ${priced?.[0] ?? ''}`).toBeNull();
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

// ───────────────────────────────────────────────────────────────────────────
// W3 Step 1 — content acceptance.
//
// W1 above proves the catalog is whole and the labels are real. Nothing there
// can tell a finished procedure from a page of headings with a sentence under
// each, and that is the failure this block exists to stop: a manual that
// passes every structural gate, renders beautifully, and leaves the person
// who opened it still stuck in the app.
//
// So the rules here are about the reading, not the frontmatter. A guide has to
// have steps somebody can follow, say what access the reader needs before they
// start, admit at least one way the screen goes wrong, and not be the same
// generic paragraph as its neighbour with the nouns swapped.
// ───────────────────────────────────────────────────────────────────────────

/** Markdown minus fenced and inline code, so a code sample cannot be mistaken
 *  for prose or for a quoted app label. */
const withoutCode = (body) =>
  String(body ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ');

const headingsOf = (body) =>
  [...withoutCode(body).matchAll(/^#{2,6}\s+(.+?)\s*$/gm)].map((match) => match[1].trim());

const numberedStepsOf = (body) =>
  withoutCode(body)
    .split('\n')
    .map((line) => line.match(/^\s*\d+\.\s+(\S.*)$/))
    .filter(Boolean)
    .map((match) => match[1].trim());

/** Body prose with headings, list bullets, table pipes and markdown emphasis
 *  stripped. A page of headings with nothing under them collapses to nothing
 *  here, which is exactly how it gets caught. */
const proseOf = (body) =>
  withoutCode(body)
    .replace(/^#{1,6}\s+.*$/gm, ' ')
    .replace(/^\s*[-*+]\s+/gm, ' ')
    .replace(/^\s*\d+\.\s+/gm, ' ')
    .replace(/\|/g, ' ')
    .replace(/[*_>#]/g, ' ');

const wordsOf = (text) => text.trim().split(/\s+/).filter(Boolean);

// An app control label is marked by bolding it and putting it in double
// quotes: **"Van is loaded"**. Emphasis alone is not a claim about the app —
// authors bold ordinary words all the time — so the quotes inside the bold are
// what makes this enforceable rather than a guess about intent.
const BOLD_RE = /\*\*([\s\S]+?)\*\*/g;
const QUOTED_RE = /"([^"\n]{1,300})"|“([^”\n]{1,300})”/g;

function quotedAppLabels(body) {
  const labels = [];
  for (const [, bold] of withoutCode(body).matchAll(BOLD_RE)) {
    for (const [, straight, curly] of bold.matchAll(QUOTED_RE)) {
      labels.push((straight ?? curly).trim());
    }
  }
  return [...new Set(labels)];
}

/** Overlapping six-word runs. Two guides about different screens share almost
 *  none; a generic body pasted twice shares most of them. */
function shinglesOf(body) {
  const words = wordsOf(proseOf(body).toLowerCase().replace(/[^a-z0-9\s]/g, ' '));
  const shingles = new Set();
  for (let i = 0; i + 6 <= words.length; i += 1) shingles.add(words.slice(i, i + 6).join(' '));
  return shingles;
}

function overlap(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let shared = 0;
  for (const shingle of a) if (b.has(shingle)) shared += 1;
  return shared / Math.min(a.size, b.size);
}

// Broad on purpose. The requirement is that a guide admits at least one way
// the screen refuses, is empty, or does not say what the reader expected —
// not that it uses a particular word for it.
const STUCK_STATE_RE =
  /stuck|wrong|problem|trouble|missing|empty|not\b|no\b|cannot|can't|won't|will not|fail|error|instead|refus|disabled|does not|doesn't|didn't|why\b|if\b/i;

describe('guide bodies are procedures somebody can follow', () => {
  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: has a real body, not a page of headings',
    (_slug, guide) => {
      const prose = wordsOf(proseOf(guide.body));
      expect(headingsOf(guide.body).length).toBeGreaterThan(1);
      expect(
        prose.length,
        `only ${prose.length} words of prose outside its headings`
      ).toBeGreaterThan(200);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: has at least one numbered procedure with actionable steps',
    (_slug, guide) => {
      const steps = numberedStepsOf(guide.body);
      expect(steps.length, 'fewer than three numbered steps anywhere on the page').toBeGreaterThan(
        2
      );
      // A one-word line is a fragment, not an instruction. Beyond that the
      // rule is about the procedure as a whole: "Tap it." is a fine step when
      // it follows one that said what "it" is, and a page where most steps
      // read like that is a list of gestures with no screen attached.
      const stubs = steps.filter((step) => wordsOf(step).length < 2);
      expect(stubs, `steps too short to act on: ${stubs.join(' | ')}`).toEqual([]);
      const substantial = steps.filter((step) => wordsOf(step).length >= 5);
      expect(
        substantial.length,
        `only ${substantial.length} of ${steps.length} steps say what to do on which screen`
      ).toBeGreaterThanOrEqual(Math.ceil(steps.length / 2));
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: tells a stranger what access they need before they start',
    (_slug, guide) => {
      const before = headingsOf(guide.body).filter((heading) =>
        /before you start/i.test(heading)
      );
      expect(before, 'no "Before you start" section').toHaveLength(1);
      // And it has to say something. A heading with one line under it is not
      // a prerequisites section.
      const section = guide.body.split(/^#{2,6}\s+Before you start\s*$/im)[1] ?? '';
      const body = section.split(/^#{2,6}\s+/m)[0] ?? '';
      expect(wordsOf(proseOf(body)).length, 'the section is empty').toBeGreaterThan(40);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: covers at least one stuck state',
    (_slug, guide) => {
      const troubleshooting = headingsOf(guide.body).filter((heading) =>
        STUCK_STATE_RE.test(heading)
      );
      expect(
        troubleshooting.length,
        `no heading covers a stuck state. Headings: ${headingsOf(guide.body).join(' | ')}`
      ).toBeGreaterThan(0);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: carries the checked date and revision it was written against',
    (_slug, guide) => {
      expect(guide.checkedAgainstAppOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(guide.appRevision).toMatch(/^[0-9a-f]{7,40}$/);
    }
  );
});

describe('guide bodies are not one generic body repeated', () => {
  const pairs = GUIDES.flatMap((left, index) =>
    GUIDES.slice(index + 1).map((right) => [`${left.slug} vs ${right.slug}`, left, right])
  );

  it.runIf(pairs.length > 0).each(pairs)('%s: are different pages', (_name, left, right) => {
    expect(proseOf(left.body).trim()).not.toBe(proseOf(right.body).trim());
    const similarity = overlap(shinglesOf(left.body), shinglesOf(right.body));
    expect(
      Number(similarity.toFixed(3)),
      `${(similarity * 100).toFixed(0)}% of one body's six-word runs appear in the other`
    ).toBeLessThan(0.2);
  });
});

describe('quoted app labels are declared', () => {
  // The declaration is what the W1 contract then proves against real Dart. A
  // label quoted in the copy but left out of `quotes` is a button caption
  // nobody is checking, which is how a renamed control keeps being taught.
  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: every **"label"** in the body is in quotes',
    (_slug, guide) => {
      const declared = new Set(guide.quotes ?? []);
      // A full stop the author added to end their own sentence is not a
      // different button. The guard is about a label nobody declared and
      // therefore nobody is checking against the Dart; it is not a proofread
      // of trailing punctuation.
      const isDeclared = (label) =>
        declared.has(label) || declared.has(label.replace(/[.?!]+$/, ''));
      const undeclared = quotedAppLabels(guide.body).filter((label) => !isDeclared(label));
      expect(
        undeclared,
        `quoted in the body but not declared in quotes: ${undeclared
          .map((label) => JSON.stringify(label))
          .join(', ')}`
      ).toEqual([]);
    }
  );
});

describe('section visibility', () => {
  // A section is a chunk of public HTML. If the feature behind it is dark, the
  // section may not ship — and the gate has to say so by name rather than let
  // the section through because nothing looked at it.
  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: every section names a customer-visible feature',
    (_slug, guide) => {
      const dark = (guide.sections ?? []).flatMap((section) =>
        (section.featureKeys ?? [])
          .filter((key) => !PUBLIC_FEATURE_KEYS.has(key))
          .map((key) => `${section.id ?? '(unnamed)'} -> ${key}`)
      );
      expect(
        dark,
        `sections declaring a feature that is not customer-visible: ${dark.join(', ')}`
      ).toEqual([]);
    }
  );

  it.each(GUIDES.map((guide) => [guide.slug, guide]))(
    '%s: section ids are present and unique',
    (_slug, guide) => {
      const ids = (guide.sections ?? []).map((section) => section.id);
      expect(ids.every((id) => typeof id === 'string' && id.trim() !== '')).toBe(true);
      expect(new Set(ids).size).toBe(ids.length);
    }
  );
});

// ───────────────────────────────────────────────────────────────────────────
// Dispatch.
//
// The one topic whose public shape is decided by something outside the
// repository: `bulk_delivery_challan` is dark on production, so the whole
// order -> challans -> invoices branch has no customer who could follow it.
// The plan's rule is that the gate reports that branch explicitly instead of
// quietly leaving it out, because a silent omission is indistinguishable from
// an author who never noticed the lane existed.
// ───────────────────────────────────────────────────────────────────────────

const DARK_DISPATCH_FEATURE = 'bulk_delivery_challan';

describe('dispatch guide', () => {
  const dispatch = guideBySlug.get('dispatch');
  const reviewFile = resolve(repoRoot, 'content/guide-review/dispatch.json');

  it('is written', () => {
    expect(dispatch, 'content/guide/dispatch.md is not written yet').toBeTruthy();
  });

  it('names its three pick sources and its prerequisites', () => {
    expect(dispatch.body).toContain('Existing invoices');
    expect(dispatch.body).toContain('Existing challans');
    expect(dispatch.body).toContain('Before you start');
  });

  it('does not teach the retired Loading Sheet surface or a plan-shaped route', () => {
    expect(dispatch.body).not.toContain('Home → Loading Sheet');
    expect(dispatch.body).not.toContain('Buy Pending Orders');
    expect(dispatch.body).not.toContain('Buy Team Sales');
    expect(dispatch.body).not.toContain('Loading Sheet');
  });

  it('publishes no bulk-challan procedure', () => {
    // Not a wording preference. No customer's plan carries the entitlement, so
    // every step of that lane would be an instruction to press a button that
    // is disabled for the reader.
    expect(PUBLIC_FEATURE_KEYS.has(DARK_DISPATCH_FEATURE)).toBe(false);
    expect(dispatch.body).not.toMatch(/make challans/i);
    expect(dispatch.body).not.toContain(DARK_DISPATCH_FEATURE);
    expect(dispatch.body).not.toMatch(/challans from a van/i);
    expect(headingsOf(dispatch.body).filter((heading) => /challans?/i.test(heading))).toEqual([
      'Existing challans',
    ]);
    const declared = (dispatch.sections ?? []).flatMap((section) => section.featureKeys ?? []);
    expect(declared).not.toContain(DARK_DISPATCH_FEATURE);
  });

  it('reports the blocked branch explicitly instead of dropping it', () => {
    expect(existsSync(reviewFile), `${reviewFile} is missing`).toBe(true);
    const review = JSON.parse(readFileSync(reviewFile, 'utf-8'));
    const blocked = (review.visibilityBlocked ?? []).find(
      (entry) => entry.featureKey === DARK_DISPATCH_FEATURE
    );
    expect(
      blocked,
      `${DARK_DISPATCH_FEATURE} is dark but the review record does not say the branch was ` +
        'reviewed and held back'
    ).toBeTruthy();
    expect(blocked.isCustomerVisible).toBe(false);
    expect(String(blocked.evidence ?? '').trim()).not.toBe('');
    expect(String(blocked.decision ?? '').trim()).not.toBe('');
    // And it is recorded as blocked in the coverage table, never as published.
    const rows = review.matrixCoverage ?? [];
    expect(rows.length).toBeGreaterThan(10);
    const challanLane = rows.find((row) => /challans -> invoices/i.test(row.case ?? ''));
    expect(challanLane?.coverage).toBe('visibility-blocked');
    expect(challanLane?.sections ?? []).toEqual([]);
  });

  it('teaches the order lane in the app’s own words', () => {
    for (const label of [
      'Van is loaded',
      'Key back what went',
      'Save what went out',
      'Make invoices',
      'Van went out',
      'Building',
      'Loaded',
      'Keyed back',
      'Part billed',
      'Delivered',
    ]) {
      expect(dispatch.quotes, `${label} is not declared`).toContain(label);
      expect(dispatch.body, `${label} is never used`).toContain(`**"${label}"**`);
    }
  });

  it('says which stage reserves the quantity', () => {
    // The single most expensive thing to get wrong on this screen: a van at
    // Building holds nothing, and a loader who believes otherwise lets the
    // same order go out twice.
    expect(dispatch.body).toMatch(
      /The stage that matters for your stock and your pending lists is \*\*"Loaded"\*\*/
    );
    expect(dispatch.body).toMatch(/\*\*"Building"\*\* reserves nothing/);
  });

  it('explains the document-date floor as a setting, not an empty warehouse', () => {
    expect(dispatch.body).toContain('**"Offer documents dated from"**');
    expect(dispatch.body).toContain('**"Not set — nothing is offered until it is."**');
    expect(dispatch.body).toMatch(/deliberately empty|not an empty warehouse|That is a setting/i);
  });

  it('repeats the real permission reason and promises no upgrade', () => {
    expect(dispatch.body).toContain(
      'You can’t make invoices here. Ask your admin for the Sales Invoice right.'.replace(
        '’',
        "'"
      )
    );
    expect(dispatch.body).not.toMatch(/upgrade|add-on price|buy the plan/i);
  });

  it('promises no Print on To buy', () => {
    expect(dispatch.body).toMatch(/\*\*"To buy"\*\* has no print at all/i);
  });

  it('covers the stuck states the resolver can actually produce', () => {
    for (const reason of [
      'Put something on the van first.',
      'Already billed in Tally',
      'This van is finished — nothing comes off it now.',
      'Take the odd ones off so everything on it comes from the same place. Until then it cannot be sent, confirmed or marked delivered.',
    ]) {
      expect(dispatch.body, `${reason} is not repeated for the reader`).toContain(reason);
    }
    expect(dispatch.body).toContain('**"Take off changed lines"**');
    expect(dispatch.body).toContain('**"Take off the odd lines"**');
  });
});
