import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render the JSON-LD <script>s inline into the test container instead of
// routing them through react-helmet-async's async document.head writes.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Features from '../Features';
import { FEATURE_PAGES, featurePagePath } from '../../data/featurePages';
import {
  FEATURE_BLURBS,
  FEATURE_GROUPS,
  LEAD_FEATURE_SLUGS,
  RETIRED_GROUP_ANCHORS,
  leadFeaturePages,
  sectionFeatureGroups,
} from '../../data/featureGroups';
import { STOPS } from '../../data/journey';
import { screen } from '../../data/screens';
import { routeMetadata } from '../../data/siteMetadata';
import { BUDGETS } from '../../../scripts/checkImageBudgets.mjs';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';

afterEach(cleanup);

function renderHub() {
  const { container } = render(
    <MemoryRouter initialEntries={['/features']}>
      <Features />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

// React 19 hoists <title>, <meta> and <link> out of the render tree into
// document.head, so the §9 head tags are asserted there rather than on the
// render container.
const head = () => document.head;

// Directory cards only. The breadcrumb and the CTA band also carry links, and
// counting those would make "one card per feature page" unfalsifiable.
const cardLinks = (container) => [...container.querySelectorAll('a.features-hub-card')];

describe('/features hub', () => {
  it('starts the navy hero copy with a Home link', () => {
    const { container } = renderHub();
    const copy = container.querySelector('.features-hub-hero .icp-hero-content');
    const home = copy.firstElementChild;

    expect(home).toHaveClass('back-home');
    expect(home).toHaveAccessibleName('Home');
    expect(home.getAttribute('href')).toBe('/');
  });

  it('renders exactly one card per FEATURE_PAGES entry', () => {
    const { container } = renderHub();
    const hrefs = cardLinks(container).map((a) => a.getAttribute('href'));
    // Derived from the array, never hardcoded: a new feature page moves this on
    // its own. Set-equality also covers the count and rules out a duplicate card.
    expect(hrefs.sort()).toEqual(FEATURE_PAGES.map(featurePagePath).sort());
  });

  it('points every rendered href at a registered route', () => {
    const { container } = renderHub();
    const known = new Set(routeMetadata.map((r) => r.path));
    const dead = [...container.querySelectorAll('a[href^="/"]')]
      .map((a) => a.getAttribute('href').replace(/\/$/, '') || '/')
      .filter((href) => !href.startsWith('/blog') && !known.has(href));
    expect(dead).toEqual([]);
  });

  it('is itself a registered, sitemapped route carrying an llms entry', () => {
    const entry = routeMetadata.find((r) => r.path === '/features');
    expect(entry).toBeDefined();
    // An absent `sitemap` key means included; only an explicit false opts out.
    expect(entry.sitemap).not.toBe(false);
    expect(entry.llms?.title).toBeTruthy();
  });

  it('meets the §9 title, description and canonical limits', () => {
    renderHub();
    const title = head().querySelector('title').textContent;
    const description = head()
      .querySelector('meta[name="description"]')
      .getAttribute('content');

    expect(title.length).toBeGreaterThan(0);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(head().querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://takkada.com/features/'
    );
    expect(head().querySelector('meta[property="og:title"]')).not.toBeNull();
    expect(head().querySelector('meta[property="og:image"]')).not.toBeNull();
    expect(head().querySelector('meta[name="twitter:card"]')).not.toBeNull();
  });

  it('does not reuse a feature page title or description', () => {
    renderHub();
    // The 26 feature pages are the nearest neighbours and the likeliest collision.
    const title = head().querySelector('title').textContent;
    const description = head().querySelector('meta[name="description"]').getAttribute('content');
    expect(FEATURE_PAGES.map((p) => p.seo.title)).not.toContain(title);
    expect(FEATURE_PAGES.map((p) => p.seo.description)).not.toContain(description);
  });

  it('emits CollectionPage and BreadcrumbList schema covering every page', () => {
    const { schemas } = renderHub();
    const collection = byType(schemas, 'CollectionPage');
    expect(collection).toBeDefined();
    expect(collection.mainEntity['@type']).toBe('ItemList');
    expect(collection.mainEntity.numberOfItems).toBe(FEATURE_PAGES.length);
    expect(collection.mainEntity.itemListElement).toHaveLength(FEATURE_PAGES.length);
    expect(collection.mainEntity.itemListElement[0].position).toBe(1);

    const crumbs = byType(schemas, 'BreadcrumbList');
    expect(crumbs).toBeDefined();
    expect(crumbs.itemListElement.at(-1).item).toBe('https://takkada.com/features/');
  });

  // The schema is the whole reason a crawler reads this page as a directory, so
  // every ListItem field is pinned. Asserting only @type and numberOfItems let a
  // relative url or a dropped description through with the suite green.
  it('gives every ListItem an absolute url, a name and a description', () => {
    const { schemas } = renderHub();
    const items = byType(schemas, 'CollectionPage').mainEntity.itemListElement;
    const bySlug = new Map(FEATURE_PAGES.map((p) => [featurePagePath(p), p]));

    items.forEach((item, i) => {
      expect(item.position, item.name).toBe(i + 1);
      expect(item.url, item.name).toMatch(/^https:\/\/takkada\.com\/[a-z0-9-]+\/$/);
      const page = bySlug.get(new URL(item.url).pathname.replace(/\/$/, ''));
      expect(page, `${item.url} is not a feature page`).toBeDefined();
      expect(item.name).toBe(page.llms.title);
      expect(item.description).toBe(FEATURE_BLURBS[page.slug]);
    });
  });

  // An unknown CTA context silently falls back to the generic message, costing
  // the founder the triage signal the whole map exists for. Only a console.warn
  // marks it, and the suite already ignores those.
  it('wires both CTAs to the hub WhatsApp context, not the default message', () => {
    const { container } = renderHub();
    const wa = [...container.querySelectorAll('a[href^="https://wa.me/"]')];
    expect(wa.length).toBeGreaterThan(0);
    for (const link of wa) {
      const text = decodeURIComponent(link.getAttribute('href').split('?text=')[1] ?? '');
      expect(text).toBe(WHATSAPP_MESSAGES['features-hub']);
      expect(text).not.toBe(WHATSAPP_MESSAGES.default);
    }
  });
});

// Rewritten 2026-08-11 with the re-tier. What these used to assert was that the
// hub rendered nine equal groups of nine identical cards, which is the layout
// the re-tier deliberately replaced: keeping them would have been keeping a
// test that encodes an abandoned strategy. What survives untouched is the part
// that is about coverage rather than shape — every page reachable, exactly
// once, under its own title — because that is the invariant the hub exists for
// and the one the SEO of twenty-seven pages hangs off. Per-tier counts derive
// from the featureGroups exports so a lead-list edit is still a one-line data
// change.
describe('feature grouping', () => {
  it('places every feature page in exactly one group', () => {
    const grouped = FEATURE_GROUPS.flatMap((g) => g.slugs);
    expect(new Set(grouped).size).toBe(grouped.length);
    expect(grouped.sort()).toEqual(FEATURE_PAGES.map((p) => p.slug).sort());
  });

  it('carries a directory line for every page', () => {
    const missing = FEATURE_PAGES.filter((p) => !FEATURE_BLURBS[p.slug]).map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it('renders each page under its own title, whichever tier it lands in', () => {
    const { container } = renderHub();
    for (const page of FEATURE_PAGES) {
      const card = container.querySelector(`a.features-hub-card[href="${featurePagePath(page)}"]`);
      expect(card, page.slug).not.toBeNull();
      expect(card.textContent).toContain(page.llms.title);
    }
  });
});

describe('hub tiers render', () => {
  const inTier = (container, modifier) => [
    ...container.querySelectorAll(`a.features-hub-card--${modifier}`),
  ];

  it('splits the cards across the two tiers in the proportions the data gives', () => {
    const { container } = renderHub();
    const sectionCount = sectionFeatureGroups(FEATURE_PAGES).reduce(
      (n, g) => n + g.pages.length,
      0
    );

    expect(inTier(container, 'lead')).toHaveLength(LEAD_FEATURE_SLUGS.length);
    expect(inTier(container, 'text')).toHaveLength(sectionCount);
    // And the two together are the whole set — no card outside a tier, and no
    // page linked twice, which is what the sections' lead subtraction buys.
    expect(cardLinks(container)).toHaveLength(FEATURE_PAGES.length);
    expect(inTier(container, 'index'), 'the compact index tier is gone').toHaveLength(0);
  });

  it('leads with the approved features in the approved order', () => {
    const { container } = renderHub();
    const hrefs = inTier(container, 'lead').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(leadFeaturePages(FEATURE_PAGES).map(featurePagePath));
  });

  it('gives every lead card a title, its directory line and its own hero image', () => {
    const { container } = renderHub();
    for (const page of leadFeaturePages(FEATURE_PAGES)) {
      const card = container.querySelector(
        `a.features-hub-card--lead[href="${featurePagePath(page)}"]`
      );
      expect(card, page.slug).not.toBeNull();
      expect(card.querySelector('h3').textContent).toBe(page.llms.title);
      expect(card.querySelector('p').textContent).toBe(FEATURE_BLURBS[page.slug]);

      // The card's visual is the page's own hero object, alt text and intrinsic
      // box included. A second asset mapping is the thing this avoids.
      const img = card.querySelector('img');
      expect(img, page.slug).not.toBeNull();
      expect(img.getAttribute('src')).toBe(page.hero.image);
      expect(img.getAttribute('alt')).toBe(page.hero.alt);
      expect(Number(img.getAttribute('width'))).toBe(page.hero.width);
      expect(Number(img.getAttribute('height'))).toBe(page.hero.height);
    }
  });

  it('gives every section card a title and its directory line', () => {
    const { container } = renderHub();
    for (const link of inTier(container, 'text')) {
      expect(link.querySelector('h3').textContent.length).toBeGreaterThan(0);
      expect(link.querySelector('p').textContent.length).toBeGreaterThan(0);
    }
  });

  // Every group id has been a linkable #anchor since the hub shipped, and the
  // sections are where they all live now.
  it('resolves every group id to exactly one element on the page', () => {
    const { container } = renderHub();
    for (const group of FEATURE_GROUPS) {
      expect(
        container.querySelectorAll(`[id="${group.id}"]`),
        `#${group.id} must exist exactly once on the hub`
      ).toHaveLength(1);
    }
  });

  it('fetches one hub image eagerly and lazy-loads the rest', () => {
    const { container } = renderHub();
    const imgs = [...container.querySelectorAll('.features-hub-lead-grid img')];
    const priority = imgs.filter((img) => img.getAttribute('fetchpriority') === 'high');
    expect(priority).toHaveLength(1);
    expect(priority[0].getAttribute('loading')).toBe('eager');
    for (const img of imgs.filter((i) => i !== priority[0])) {
      expect(img.getAttribute('loading'), img.getAttribute('src')).toBe('lazy');
    }
  });

  // Eight images is ~400KB on a page that had none. Every one of them is
  // already on the critical path of its own feature page, so the budget guard
  // already covers them — but only while that stays true.
  it('puts every hub image under the byte budget guard', () => {
    const { container } = renderHub();
    const budgeted = new Set(BUDGETS.map(([path]) => path.replace(/^public/, '')));
    const unbudgeted = [...container.querySelectorAll('.features-hub-lead-grid img')]
      .map((img) => img.getAttribute('src'))
      .filter((src) => !budgeted.has(src));
    expect(unbudgeted).toEqual([]);
  });
});

// ── Grouped by the invoice's journey (2026-09-18) ──
//
// The hub's themes used to be nine names invented for the directory alone
// ("Getting paid", "Entries without typing"). The homepage now tells one story
// in seven stops, and a visitor who arrives from it should find the same seven
// words in the same order here, so the grouping is the story rather than a
// second taxonomy beside it. These cases are what stops the two drifting.
describe('the hub is grouped by the invoice journey', () => {
  const stopGroups = () => FEATURE_GROUPS.filter((g) => g.stop);
  const stopOf = (group) => STOPS.find((s) => s.id === group.stop);
  const marker = (container, group) =>
    container.querySelector(`[id="${group.id}"] .features-hub-stop`);

  it('leads with one group per journey stop, in journey order', () => {
    expect(stopGroups().map((g) => g.stop)).toEqual(STOPS.map((s) => s.id));
    // The stop groups come first, so the directory reads front to back in the
    // order the invoice actually moves.
    expect(FEATURE_GROUPS.slice(0, STOPS.length).map((g) => g.id)).toEqual(
      STOPS.map((s) => s.id)
    );
  });

  // The homepage names three or four feature pages at each stop. If the hub
  // files one of those pages under a different stop, the strip Task 10 draws on
  // that page ("you are at Bill") contradicts the pill that sent the reader
  // there. One slug, two stops, and the story stops being one story.
  it('groups every page a stop links to under that same stop', () => {
    const groupOf = new Map(FEATURE_GROUPS.flatMap((g) => g.slugs.map((slug) => [slug, g])));
    const known = new Set(FEATURE_PAGES.map((p) => p.slug));

    const contradictions = STOPS.flatMap((stop) =>
      stop.features
        .filter((f) => known.has(f.slug))
        .map((f) => ({ slug: f.slug, pill: stop.id, group: groupOf.get(f.slug)?.stop }))
        .filter((row) => row.group !== row.pill)
        .map((row) => `${row.slug}: ${row.pill} pill, grouped under ${row.group}`)
    );
    expect(contradictions).toEqual([]);
  });

  it('names each stop group after the stop it belongs to', () => {
    for (const group of stopGroups()) {
      expect(group.id, 'the DOM anchor is the stop id').toBe(group.stop);
      expect(stopOf(group), group.stop).toBeDefined();
      expect(group.title.length).toBeGreaterThan(0);
      expect(group.intro.length).toBeGreaterThan(0);
    }
  });

  // The seven stops are the page's main body, not a footnote under it: each one
  // is a full section carrying the heading, the intro written for it and its
  // stamp. They were the small tier for one commit and the owner ruled against
  // it, because a directory whose spine is the story cannot render the story in
  // the quiet type and the two groups outside the story in the loud type.
  it('renders each stop as a full section with its title, intro and stamp', () => {
    const { container } = renderHub();
    for (const group of stopGroups()) {
      const header = container.querySelector(`[id="${group.id}"] .features-hub-group-header`);
      expect(header, `#${group.id} must head a full section`).not.toBeNull();
      expect(header.querySelector('.features-hub-group-title').textContent).toBe(group.title);
      expect(header.querySelector('.features-hub-group-intro').textContent).toBe(group.intro);
      expect(header.querySelector('.features-hub-stop'), group.id).not.toBeNull();
    }
  });

  it('keeps the spine complete and in journey order down the page', () => {
    const { container } = renderHub();
    const rendered = [...container.querySelectorAll('.features-hub-group')].map((el) => el.id);
    // The stops lead, in order, and nothing is missing from the middle.
    expect(rendered.slice(0, STOPS.length)).toEqual(STOPS.map((s) => s.id));
  });

  // Renders against today's journey data rather than a fixture, because the
  // failure this guards against is a stop whose data the hub cannot survive:
  // Send carries no screen at all, and reading screens[0] off it threw.
  it('renders every stop group with its stamp, on the live journey data', () => {
    const { container } = renderHub();
    for (const group of stopGroups()) {
      const stop = stopOf(group);
      const el = marker(container, group);
      expect(el, `#${group.id} must carry its stop marker`).not.toBeNull();
      const stamp = el.querySelector('.features-hub-stamp');
      expect(stamp, group.id).not.toBeNull();
      expect(stamp.textContent).toBe(stop.stamp.text);
      expect(stamp.className).toContain(`features-hub-stamp--${stop.stamp.tone}`);
      // Decoration: the stamp repeats the heading beside it in fewer words.
      expect(el.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('shows the stamp alone for a stop that has no screen', () => {
    const screenless = STOPS.filter((s) => s.screens.length === 0);
    expect(screenless.map((s) => s.id), 'Send has no capture of a delivered invoice').toContain(
      'send'
    );

    const { container } = renderHub();
    for (const stop of screenless) {
      const group = FEATURE_GROUPS.find((g) => g.stop === stop.id);
      const el = marker(container, group);
      expect(el.querySelector('.features-hub-stamp').textContent).toBe(stop.stamp.text);
      expect(el.querySelector('img'), `${stop.id} has no screen to show`).toBeNull();
    }
  });

  it('shows the stop screen as decoration where there is one', () => {
    const { container } = renderHub();
    for (const group of stopGroups().filter((g) => stopOf(g).screens.length > 0)) {
      const img = marker(container, group).querySelector('img');
      expect(img, group.id).not.toBeNull();
      expect(img.getAttribute('src')).toBe(screen(stopOf(group).screens[0]).src);
      // The heading names the group; a screenshot read out again is noise.
      expect(img.getAttribute('alt')).toBe('');
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });
});

// ── The seven retired group ids (2026-09-18) ──
//
// Every one of them has been a linkable #anchor since the hub shipped and some
// are inside published blog posts, so a regroup that renames the sections may
// not quietly turn them into a scroll to the top of the page.
describe('retired group anchors', () => {
  it('maps every retired id onto a group the hub still renders', () => {
    const current = new Set(FEATURE_GROUPS.map((g) => g.id));
    for (const [retired, target] of Object.entries(RETIRED_GROUP_ANCHORS)) {
      expect(current.has(retired), `${retired} is retired, so it may not also be current`).toBe(
        false
      );
      expect(current.has(target), `${retired} points at ${target}, which is not a group`).toBe(
        true
      );
    }
  });

  it('resolves every retired id to exactly one element on the page', () => {
    const { container } = renderHub();
    for (const retired of Object.keys(RETIRED_GROUP_ANCHORS)) {
      expect(
        container.querySelectorAll(`[id="${retired}"]`),
        `#${retired} must exist exactly once on the hub`
      ).toHaveLength(1);
    }
  });

  // The anchor is only worth keeping if it lands on the section that swallowed
  // the old group's pages, not merely somewhere on the page.
  it('lands each retired id inside the group it was mapped to', () => {
    const { container } = renderHub();
    for (const [retired, target] of Object.entries(RETIRED_GROUP_ANCHORS)) {
      const anchor = container.querySelector(`[id="${retired}"]`);
      expect(anchor.closest(`[id="${target}"]`), `#${retired} must sit inside #${target}`).not.toBeNull();
    }
  });

  // The real links, not the ones we remember writing. Anything in the source or
  // the published content that points at /features#<id> has to land.
  //
  // TAKE THIS AS A TRIP-WIRE, NOT AS EVIDENCE. Every real /features# link lives
  // outside the repo — published blog posts, other people's pages — which is
  // exactly why the retired ids above are kept; nothing in src/ or content/
  // writes one today. The three cases above it are what prove the anchors
  // resolve. What this adds is the day somebody does write one.
  //
  // The two guards below stop it passing on an empty walk or a matcher that
  // has quietly stopped matching. The sample string is itself inside src/, so
  // the sweep picks its two ids back up and the whole path — walk, match,
  // resolve against the rendered page — runs on real input rather than on
  // nothing at all.
  it('resolves every /features#<id> linked from src/ or content/', () => {
    // Vitest runs from the project root, which is where src/ and content/ sit.
    const root = process.cwd();
    const TEXT = new Set(['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.json', '.css', '.html']);
    const HASH = /\/features\/?#([a-z0-9-]+)/g;

    const files = [];
    const walk = (dir) => {
      for (const entry of readdirSync(dir)) {
        if (entry === 'node_modules' || entry.startsWith('.')) continue;
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path);
        else if (TEXT.has(path.slice(path.lastIndexOf('.')))) files.push(path);
      }
    };
    walk(resolve(root, 'src'));
    walk(resolve(root, 'content'));

    // Guard one: the walk really read the tree. A typo in a path, or a cwd that
    // is not the project root, would otherwise make this pass on zero files.
    expect(files.length, 'the sweep walked no files').toBeGreaterThan(200);
    // Guard two: the matcher still matches. Both spellings the site uses.
    const sample = 'a href="/features#getting-paid" and href="/features/#who-owes-you"';
    expect([...sample.matchAll(HASH)].map(([, id]) => id)).toEqual([
      'getting-paid',
      'who-owes-you',
    ]);

    const linked = new Map();
    for (const file of files) {
      for (const [, id] of readFileSync(file, 'utf-8').matchAll(HASH)) {
        if (!linked.has(id)) linked.set(id, file.slice(root.length));
      }
    }

    const { container } = renderHub();
    const dead = [...linked].filter(
      ([id]) => container.querySelectorAll(`[id="${id}"]`).length !== 1
    );
    expect(dead.map(([id, file]) => `${file} links /features#${id}`)).toEqual([]);
  });
});

// ── What jsdom cannot see (2026-09-18, review round 2) ──
//
// The hub's header and section grid are laid out by CSS that a jsdom render
// reports nothing about: every box is 0x0 here, so a mark painting over the
// cards, or a lone card stretched across the container, passes every DOM
// assertion in this file. Three flaws shipped that way in one commit. These
// read the stylesheet as text and pin the structural facts that make the
// layout right, which is the part a test can actually hold.
describe('hub layout rules (read off the stylesheet)', () => {
  // Innermost rules, with the at-rule they sit inside. Comments are stripped
  // first so a brace inside one cannot desynchronise the depth count.
  const cssRules = (css) => {
    const out = [];
    const stack = [];
    let buf = '';
    for (const ch of css.replace(/\/\*[\s\S]*?\*\//g, '')) {
      if (ch === '{') {
        stack.push(buf.trim().replace(/\s+/g, ' '));
        buf = '';
      } else if (ch === '}') {
        const prelude = stack.pop();
        if (prelude && !prelude.startsWith('@')) {
          out.push({ selector: prelude, body: buf, at: stack.find((p) => p.startsWith('@')) ?? null });
        }
        buf = '';
      } else {
        buf += ch;
      }
    }
    return out;
  };

  const read = (file) => readFileSync(resolve(process.cwd(), 'src', file), 'utf-8');
  const hub = cssRules(read('feature-page.css'));
  const shared = cssRules(read('styles.css'));
  const selects = (rule, selector) =>
    rule.selector.split(',').some((s) => s.trim() === selector);

  it('parses the stylesheet, so the cases below cannot pass on nothing', () => {
    expect(hub.length).toBeGreaterThan(50);
    expect(hub.some((r) => selects(r, '.features-hub-group-header'))).toBe(true);
  });

  // The mark was absolutely positioned inside a header that reserved a height
  // by hand, and 44px of the screenshot painted over the first row of cards.
  // Worse, the only `position: relative` sat in a `:has()` rule, so on a browser
  // without `:has()` all seven marks escaped to the top-right of the document.
  // In flow, in a grid column of its own, neither is reachable.
  it('keeps the stop mark in flow, in a header that is a grid', () => {
    const stopRules = hub.filter((r) => selects(r, '.features-hub-stop'));
    expect(stopRules.length).toBeGreaterThan(0);
    for (const rule of stopRules) {
      expect(rule.body, `.features-hub-stop inside ${rule.at ?? 'no at-rule'}`).not.toMatch(
        /position:\s*absolute/
      );
    }

    const header = hub.find((r) => selects(r, '.features-hub-group-header') && !r.at);
    expect(header, 'the header needs an unconditional rule').toBeDefined();
    expect(header.body).toMatch(/display:\s*grid/);
  });

  it('never depends on :has() for the layout of a section, header or mark', () => {
    const layout = hub.filter((r) => /features-hub-(group|stop|stamp)/.test(r.selector));
    expect(layout.length).toBeGreaterThan(5);
    expect(layout.filter((r) => r.selector.includes(':has(')).map((r) => r.selector)).toEqual([]);
  });

  // The shared .tally-grid is auto-fit with a 1fr max, which both collapses the
  // empty tracks and stretches what is left: a section with one card stretched
  // that card across the whole container. The hub scopes its own track sizing
  // with a CAPPED max, so one card and three cards are the same width and the
  // row starts at the left edge. The shared grid is what every other page wants.
  it('sizes the hub section grid so every card is the same width, lone or not', () => {
    const scoped = hub.find(
      (r) => r.selector.includes('features-hub-group') && r.selector.includes('tally-grid')
    );
    expect(scoped, 'the hub must scope its own section grid').toBeDefined();
    const columns = scoped.body.match(/grid-template-columns:\s*([^;]+);/)?.[1] ?? '';
    expect(columns, 'the hub grid must cap its track, not stretch to 1fr').toMatch(
      /minmax\(\s*\d+px\s*,\s*\d+px\s*\)/
    );
    expect(scoped.body, 'a capped track needs the row packed to the left').toMatch(
      /justify-content:\s*start/
    );

    const tallyGrid = shared.find((r) => selects(r, '.tally-grid') && !r.at);
    expect(tallyGrid, 'the shared grid must still exist').toBeDefined();
    expect(tallyGrid.body, 'the shared .tally-grid is not the hub\'s to change').toMatch(
      /auto-fit/
    );
  });

  // D11: the mark read as "a tiny phone in the far corner", and jumping to
  // /features#send put the section title under the fixed nav.
  it('gives the stop mark a screen big enough to see', () => {
    const shot = hub.find((r) => selects(r, '.features-hub-stop-shot') && !r.at);
    expect(shot, '.features-hub-stop-shot needs an unconditional rule').toBeDefined();
    const width = Number(shot.body.match(/width:\s*(\d+)px/)?.[1]);
    expect(width, `the stop screen is ${width}px wide, which reads as a smudge`).toBeGreaterThanOrEqual(120);
  });

  it('clears the fixed nav when a section is jumped to by id', () => {
    // The id is on .features-hub-group itself (id={group.id}), so that is the
    // element the browser scrolls to; .features-hub-anchor only covers the
    // retired ids that redirect onto it.
    const group = hub.find((r) => selects(r, '.features-hub-group') && !r.at);
    expect(group, '.features-hub-group needs an unconditional rule').toBeDefined();
    const margin = Number(group.body.match(/scroll-margin-top:\s*(\d+)px/)?.[1]);
    expect(margin, 'a jumped-to section lands under the fixed nav').toBeGreaterThanOrEqual(96);
  });
});
