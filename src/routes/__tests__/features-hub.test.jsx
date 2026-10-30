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
import { FEATURE_PAGES, featurePagePath, getFeaturePage, heroShot } from '../../data/featurePages';
import { FEATURE_BLURBS, FEATURE_GROUPS, RETIRED_GROUP_ANCHORS } from '../../data/featureGroups';
import { PhoneModalProvider } from '../../context/PhoneModalContext';
import { routeMetadata } from '../../data/siteMetadata';
import { BUDGETS } from '../../../scripts/checkImageBudgets.mjs';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';
import { gridCols } from '../../ui/CardGrid';

afterEach(cleanup);

function renderHub() {
  const { container } = render(
    <MemoryRouter initialEntries={['/features']}>
      <PhoneModalProvider>
        <Features />
      </PhoneModalProvider>
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
  it('starts the hero copy with a breadcrumb back to Home', () => {
    const { container } = renderHub();
    const home = container.querySelector('section.ui-band--band nav[aria-label="Breadcrumb"] a');
    expect(home.textContent).toBe('Home');
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

// ── The Campfire hub (plan 2026-10-30-003, Task 6) ──
//
// One band per group, in FEATURE_GROUPS order, each a grid of picture cards:
// the page's name, its directory line and the screen the page opens with. The
// lead tier and the journey stamps went with the homepage story they echoed.
describe('hub on the Campfire template', () => {
  const groupedPages = () =>
    FEATURE_GROUPS.flatMap((g) => g.slugs.map((slug) => getFeaturePage(slug)).filter(Boolean));

  it('opens on the dark band with the hub headline', () => {
    const { container } = renderHub();
    const hero = container.querySelector('section.ui-band--band');
    expect(hero).not.toBeNull();
    expect(hero.querySelector('h1.ui-hero-title').textContent).toBe(
      'Everything Tally does, on your phone.'
    );
    expect(hero.querySelector('p.ui-hero-lead').textContent.length).toBeGreaterThan(0);
  });

  it('renders one a.ui-card.features-hub-card per grouped page, in group order', () => {
    const { container } = renderHub();
    const hrefs = [...container.querySelectorAll('a.ui-card.features-hub-card')].map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toEqual(groupedPages().map((p) => `/${p.slug}`));
  });

  it('gives each group its own band with its title as the section head, in order', () => {
    const { container } = renderHub();
    const bands = FEATURE_GROUPS.map((g) => container.querySelector(`section[id="${g.id}"]`));
    bands.forEach((band, i) => {
      const group = FEATURE_GROUPS[i];
      expect(band, group.id).not.toBeNull();
      expect(band.querySelector('.ui-section-title').textContent).toBe(group.title);
      expect(
        [...band.querySelectorAll('a.features-hub-card')].map((a) => a.getAttribute('href'))
      ).toEqual(group.slugs.map((slug) => `/${slug}`));
    });
    const order = [...container.querySelectorAll('section')].map((el) => el.id);
    expect(order.filter((id) => FEATURE_GROUPS.some((g) => g.id === id))).toEqual(
      FEATURE_GROUPS.map((g) => g.id)
    );
  });

  it("gives every card the page's title, its directory line and its hero screen", () => {
    const { container } = renderHub();
    for (const page of FEATURE_PAGES) {
      const card = container.querySelector(`a.features-hub-card[href="${featurePagePath(page)}"]`);
      expect(card.querySelector('h3.ui-card-title').textContent).toBe(page.llms.title);
      expect(card.querySelector('p.ui-card-line').textContent).toBe(FEATURE_BLURBS[page.slug]);
      const img = card.querySelector('.ui-card-media img.ui-shot');
      const shot = heroShot(page);
      expect(img, page.slug).not.toBeNull();
      expect(img.getAttribute('src')).toBe(shot.src);
      expect(img.getAttribute('alt')).toBe(shot.alt);
      expect(img.getAttribute('loading')).toBe('lazy');
    }
  });

  it('derives each group grid from its page count', () => {
    const { container } = renderHub();
    for (const group of FEATURE_GROUPS) {
      const grid = container.querySelector(`section[id="${group.id}"] .ui-grid`);
      expect(grid.classList.contains(`ui-grid--${gridCols(group.slugs.filter(getFeaturePage).length)}`), group.id).toBe(true);
    }
  });

  it('closes on the dark close band', () => {
    const { container } = renderHub();
    expect(container.querySelector('.ui-close .ui-pill')).not.toBeNull();
  });

  it('carries no overline or eyebrow', () => {
    const { container } = renderHub();
    expect(container.querySelector('[class*="overline"], [class*="eyebrow"], [class*="section-label"]')).toBeNull();
  });

  it('resolves every group id to exactly one element on the page', () => {
    const { container } = renderHub();
    for (const group of FEATURE_GROUPS) {
      expect(container.querySelectorAll(`[id="${group.id}"]`), group.id).toHaveLength(1);
    }
  });

  // Every card picture is a page's own LCP image, so the budget guard covers it.
  it('puts every hub image under the byte budget guard', () => {
    const { container } = renderHub();
    const budgeted = new Set(BUDGETS.map(([path]) => path.replace(/^public/, '')));
    const unbudgeted = [...container.querySelectorAll('a.features-hub-card img')]
      .map((img) => img.getAttribute('src'))
      .filter((src) => !budgeted.has(src));
    expect(unbudgeted).toEqual([]);
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
