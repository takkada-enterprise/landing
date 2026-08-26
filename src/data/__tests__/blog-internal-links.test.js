import { describe, expect, it } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_PAGES, featurePagePath } from '../featurePages';
import { routeMetadata } from '../siteMetadata';
import { extractLead } from '../../../scripts/checkLeadAnswer.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const blogDir = resolve(repoRoot, 'content/blog');

// Until 2026-08-08 no blog post linked to any feature landing page. The Clarity
// data says the blog is the only thing pulling search entries and the feature
// pages pull none, and missing internal links are a large part of why. These
// guards keep the links the salesman round established from rotting.

const POSTS = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ file: f, body: readFileSync(resolve(blogDir, f), 'utf-8') }));

// [text](/path) — internal links only, ignoring http(s) and anchors.
const LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function linksIn(body) {
  return [...body.matchAll(LINK_RE)].map(([, text, href]) => ({ text, href }));
}

const normalise = (href) => {
  const path = href.split('#')[0].split('?')[0].replace(/\/$/, '');
  return path === '' ? '/' : path;
};

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));

function inboundLinks(page) {
  const target = featurePagePath(page);
  return POSTS.filter(({ body }) => linksIn(body).some(({ href }) => normalise(href) === target));
}

// The link floor, per page. A brand-new feature landing page starts at
// DEFAULT_FLOOR and is expected to earn depth over time; a page listed here has
// already earned it, and the number is a ratchet against silent erosion.
//
// The rule for future rounds: after a blog round that links a feature page,
// re-run the count and raise that page's floor to what it actually reached. A
// page absent from this map is held at DEFAULT_FLOOR, which is what makes
// adding a 27th feature page cheap.
//
// Lowering a number here is allowed, but it should be a deliberate line in a
// diff someone reviews, which is the entire point of pinning it. The counts
// below are the state after the 2026-08-09 deepening sweep.
const DEFAULT_FLOOR = 1;

const LINK_FLOORS = {
  'salesman-app-tally': 9,
  'godown-wise-stock-on-mobile': 6,
  'e-invoice-from-phone': 5,
  'e-way-bill-from-phone': 5,
  'tally-on-mobile-without-remote-access': 5,
  'tally-reports-on-mobile': 5,
  'outstanding-receivables-on-mobile': 4,
  'payment-collection-tally': 4,
  'payment-reminder-tally': 4,
  'sales-order-on-mobile': 4,
  'send-payment-reminders-automatically': 4,
  'share-ledger-statement-whatsapp': 4,
  'biz-analyst-alternative': 3,
  'handwritten-order-to-tally': 3,
  'tally-app-for-fmcg-distributors': 3,
  'tally-app-for-pharma-distributors': 3,
  'tally-on-mobile': 3,
  'debtor-ageing-report-on-phone': 2,
};

const floorFor = (slug) => LINK_FLOORS[slug] ?? DEFAULT_FLOOR;

describe('blog internal links', () => {
  it('resolves every non-blog internal link to a registered route', () => {
    const dead = [];
    for (const { file, body } of POSTS) {
      for (const { href } of linksIn(body)) {
        const path = normalise(href);
        if (path.startsWith('/blog')) continue; // blog slugs are covered elsewhere
        if (!KNOWN_ROUTES.has(path)) dead.push(`${file} -> ${href}`);
      }
    }
    expect(dead).toEqual([]);
  });

  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: holds its inbound blog link floor',
    (slug, page) => {
      const floor = floorFor(slug);
      const linking = inboundLinks(page).map((p) => p.file);
      expect(
        linking.length,
        `/${slug} needs ${floor} inbound blog link(s), found ${linking.length}: ` +
          `${linking.join(', ') || 'none'}. Either restore the link, or lower this page's ` +
          'entry in LINK_FLOORS deliberately.'
      ).toBeGreaterThanOrEqual(floor);
    }
  );

  it('floors only real feature pages, so a renamed slug cannot go unwatched', () => {
    const known = new Set(FEATURE_PAGES.map((p) => p.slug));
    expect(Object.keys(LINK_FLOORS).filter((slug) => !known.has(slug))).toEqual([]);
  });

  // A page that has quietly earned depth should be ratcheted, not left at the
  // default where the depth can drain away unnoticed. This is the half of the
  // ratchet that fails upward; every other assertion here only fails downward.
  it('has a floor for every page that has outgrown the default', () => {
    const unratcheted = FEATURE_PAGES.filter(
      (page) => !(page.slug in LINK_FLOORS) && inboundLinks(page).length > DEFAULT_FLOOR
    ).map((page) => `${page.slug} (${inboundLinks(page).length} links)`);
    expect(
      unratcheted,
      'These pages now have more inbound links than the default floor protects. ' +
        'Add them to LINK_FLOORS at their current count so the depth cannot drain away.'
    ).toEqual([]);
  });

  // The cannibalisation guard. A post using a feature page's exact search
  // phrase as anchor text, pointed at some other URL, spends that page's
  // strongest internal signal on a competitor of its own. This is what the
  // corpus was doing: six posts used "salesman app for Tally" as the anchor for
  // /blog/salesman-app-tally-india/ while the landing page targeted the term.
  it.each(FEATURE_PAGES.map((p) => [p.slug, p]))(
    '%s: no post spends its search phrase as anchor text on another URL',
    (_slug, page) => {
      const target = featurePagePath(page);
      // "Salesman app for Tally" also matches "salesman app on Tally".
      const phrase = new RegExp(
        `^${page.searchPhrase.trim().replace(/\s+/g, '\\s+').replace(/\\s\+for\\s\+/, '\\s+(for|on)\\s+')}$`,
        'i'
      );
      const misdirected = [];
      for (const { file, body } of POSTS) {
        for (const { text, href } of linksIn(body)) {
          if (phrase.test(text.trim()) && normalise(href) !== target) {
            misdirected.push(`${file}: "${text}" -> ${href}`);
          }
        }
      }
      expect(misdirected).toEqual([]);
    }
  );
});

// Four posts chased the same head phrase as one of the feature landing pages,
// so the site bid against itself and the older blog post usually won. Three
// were retitled to narrower angles (URLs untouched, so the inbound equity
// survived); the fourth, the reminder how-to, kept its title because it already
// led with "How to Send a" rather than the head phrase, and only the leading
// position is the collision.
//
// The title half of this guard is now derived across the whole corpus above.
// What stays listed here is the link half: each of these four carries a link up
// to its feature page inside the lead answer, which is the passage a citation
// engine lifts. Only 4 of 104 relatedPosts pairs do that, so it is a narrow
// ratchet on the posts that were deliberately repositioned, not a general rule.
const RETITLED = [
  ['tally-on-mobile', 'tally-on-mobile'],
  ['view-tally-reports-on-mobile', 'tally-reports-on-mobile'],
  ['salesman-app-tally-india', 'salesman-app-tally'],
  ['how-to-send-payment-reminder-from-tally-whatsapp', 'payment-reminder-tally'],
];

const postNamed = (slug) => POSTS.find((p) => p.file === `${slug}.md`);
const pageNamed = (slug) => FEATURE_PAGES.find((p) => p.slug === slug);

describe('retitled posts stay off their feature page\'s head phrase', () => {
  it.each(RETITLED)('%s: exists and targets a real feature page', (postSlug, pageSlug) => {
    expect(postNamed(postSlug)).toBeDefined();
    expect(pageNamed(pageSlug)).toBeDefined();
  });

  // Derived, not listed. An allow-list would protect only the posts already
  // fixed and stay silent when next month's post leads with a head phrase,
  // which is how this cannibalisation started.
  it('no post title leads with any feature page search phrase', () => {
    const phrases = FEATURE_PAGES.map((p) => p.searchPhrase.toLowerCase());
    const colliding = [];
    for (const { file, body } of POSTS) {
      const title = (matter(body).data.title ?? '').toLowerCase();
      const hit = phrases.find((phrase) => title.startsWith(phrase));
      if (hit) colliding.push(`${file}: "${hit}..."`);
    }
    expect(
      colliding,
      'A post whose title leads with a feature page\'s exact search phrase competes ' +
        'with that page for its own head term. Narrow the post title.'
    ).toEqual([]);
  });

  // "The lead answer" is defined once, by the guard that owns the convention
  // (CLAUDE.md §5). Splitting on the first `##` here instead would be a second,
  // looser definition of the site's most load-bearing content rule, and a link
  // in a stray second paragraph would satisfy this test while the guard did not
  // consider it part of the lead at all.
  it.each(RETITLED)('%s: links up to its feature page from the lead answer', (postSlug, pageSlug) => {
    const lead = extractLead(postNamed(postSlug).body);
    expect(lead.kind).toBe('paragraph');
    const hrefs = linksIn(lead.text).map(({ href }) => normalise(href));
    expect(hrefs).toContain(featurePagePath(pageNamed(pageSlug)));
  });
});
