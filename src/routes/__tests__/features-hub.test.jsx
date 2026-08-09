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
import { FEATURE_BLURBS, FEATURE_GROUPS } from '../../data/featureGroups';
import { routeMetadata } from '../../data/siteMetadata';

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
    // Count derived from the array, never hardcoded: a new feature page must
    // move this number on its own.
    expect(hrefs).toHaveLength(FEATURE_PAGES.length);
    expect(new Set(hrefs).size).toBe(FEATURE_PAGES.length);
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

  it('has a title and description no other route already uses', () => {
    renderHub();
    const title = head().querySelector('title').textContent;
    expect(title).not.toBe('');
    // The feature pages are the nearest neighbours and the likeliest collision.
    expect(FEATURE_PAGES.map((p) => p.seo.title)).not.toContain(title);
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
});

describe('feature grouping', () => {
  it('places every feature page in exactly one group', () => {
    const grouped = FEATURE_GROUPS.flatMap((g) => g.slugs);
    expect(new Set(grouped).size).toBe(grouped.length);
    expect(grouped.sort()).toEqual(FEATURE_PAGES.map((p) => p.slug).sort());
  });

  it('names only real feature pages', () => {
    const known = new Set(FEATURE_PAGES.map((p) => p.slug));
    const unknown = FEATURE_GROUPS.flatMap((g) => g.slugs).filter((s) => !known.has(s));
    expect(unknown).toEqual([]);
  });

  it('renders no empty group, and gives each a heading and an intro', () => {
    const { container } = renderHub();
    const groups = [...container.querySelectorAll('.features-hub-group')];
    expect(groups).toHaveLength(FEATURE_GROUPS.length);
    for (const group of groups) {
      expect(group.querySelectorAll('a.features-hub-card').length).toBeGreaterThan(0);
      expect(group.querySelector('.features-hub-group-title').textContent).not.toBe('');
      expect(group.querySelector('.features-hub-group-intro').textContent).not.toBe('');
    }
  });

  it('carries a directory line for every page', () => {
    const missing = FEATURE_PAGES.filter((p) => !FEATURE_BLURBS[p.slug]).map((p) => p.slug);
    expect(missing).toEqual([]);
  });

  it('renders each page under its own title and directory line', () => {
    const { container } = renderHub();
    for (const page of FEATURE_PAGES) {
      const card = container.querySelector(`a.features-hub-card[href="${featurePagePath(page)}"]`);
      expect(card, page.slug).not.toBeNull();
      expect(card.querySelector('h3').textContent).toBe(page.llms.title);
      expect(card.querySelector('p').textContent).toBe(FEATURE_BLURBS[page.slug]);
    }
  });
});
