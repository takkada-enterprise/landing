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
  leadFeaturePages,
  secondaryFeatureGroups,
  sectionFeatureGroups,
} from '../../data/featureGroups';
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

  it('splits the cards across the three tiers in the proportions the data gives', () => {
    const { container } = renderHub();
    const sectionCount = sectionFeatureGroups(FEATURE_PAGES).reduce(
      (n, g) => n + g.pages.length,
      0
    );
    const indexCount = secondaryFeatureGroups(FEATURE_PAGES).reduce((n, g) => n + g.pages.length, 0);

    expect(inTier(container, 'lead')).toHaveLength(LEAD_FEATURE_SLUGS.length);
    expect(inTier(container, 'text')).toHaveLength(sectionCount);
    expect(inTier(container, 'index')).toHaveLength(indexCount);
    // And the three together are the whole set — no card outside a tier.
    expect(cardLinks(container)).toHaveLength(FEATURE_PAGES.length);
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

  it('keeps the compact index title-only, so it stays scannable', () => {
    const { container } = renderHub();
    for (const link of inTier(container, 'index')) {
      expect(link.querySelector('img')).toBeNull();
      expect(link.querySelector('p')).toBeNull();
    }
  });

  // Every group id has been a linkable #anchor since the hub shipped. Both GST
  // pages are lead cards now, so that group heads nothing — its id has to be
  // re-homed onto the tier that swallowed it rather than quietly disappear.
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
