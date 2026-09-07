import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

// Render the JSON-LD <script>s inline into the test container instead of
// routing them through react-helmet-async's async document.head writes.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

// The reader and the hub are tested against a Markdown-shaped fixture rather
// than the real 21-page corpus. Two reasons, both load-bearing:
//
//   1. src/lib/guidePosts.js is an eager import.meta.glob. Pulling the real
//      corpus in here would make every assertion below depend on editorial
//      copy somebody is still editing, and a reworded sentence in a guide
//      would turn this suite red for no engineering reason.
//   2. The corpus itself is already asserted, in full, by
//      src/data/__tests__/guide-pages.test.js. This file is about the two
//      components: does the reader emit its slug marker, its checked line, its
//      canonical and guide-shaped (never blog-shaped) schema, and does the hub
//      link every guide it was handed exactly once.
//
// The fixture deliberately includes a related target that does not exist
// ('no-such-guide'), a guide outside every declared group ('stock-check'), and
// a table, because those are the three things the components have to handle
// and the real corpus cannot be relied on to keep providing.

const guide = (over) => ({
  slug: 'dispatch',
  title: 'How to load and dispatch goods',
  meta_title: 'How to load and dispatch goods in Takkada',
  meta_description:
    'Choose the dispatch flow that matches your company settings, load a van and record what went out.',
  featureKey: 'dispatch_load',
  checkedAgainstAppOn: '2026-09-07',
  appRevision: '8444b1e82e199f3b5767f74cb201c8ca8a8cff9b',
  relatedGuides: ['sales-orders', 'no-such-guide'],
  html:
    '<h2>Before you start</h2>\n<p>Open Dispatch for your company.</p>\n' +
    '<h2>Existing invoices</h2>\n<p>Tick the invoices you are sending.</p>\n' +
    '<table><thead><tr><th>Stage</th></tr></thead><tbody><tr><td>Loaded</td></tr></tbody></table>\n',
  ...over,
});

const GUIDES = [
  guide({}),
  guide({
    slug: 'sales-orders',
    title: 'How to take and track sales orders',
    meta_title: 'How to take and track sales orders in Takkada',
    meta_description: 'Take an order, watch what is still pending and send it on to dispatch.',
    featureKey: null,
    relatedGuides: ['dispatch'],
  }),
  guide({
    slug: 'tally-sync',
    title: 'How to check and fix Tally sync',
    meta_title: 'How to check and fix Tally sync in Takkada',
    meta_description: 'Read the sync screen, spot a stalled company and get it moving again.',
    featureKey: 'tally_sync_dashboard',
    relatedGuides: [],
  }),
  // Not named in any GUIDE_GROUPS entry, so the hub has to keep it anyway.
  guide({
    slug: 'stock-check',
    title: 'How to check stock',
    meta_title: 'How to check stock in Takkada',
    meta_description: 'Read what is on hand for an item.',
    featureKey: null,
    relatedGuides: [],
  }),
];

vi.mock('../../lib/guidePosts', () => ({
  getAllGuides: () => GUIDES,
  getGuideBySlug: (slug) => GUIDES.find((g) => g.slug === slug) ?? null,
  getGuideSlugs: () => GUIDES.map((g) => g.slug),
}));

import GuidePost from '../GuidePost';
import GuideIndex, { GUIDE_GROUPS, groupGuides } from '../GuideIndex';
import { GUIDE_HUB } from '../../../scripts/checkGuidePrerender.mjs';
import topics from '../../../content/guide/topics.json';

afterEach(cleanup);

function renderPost(slug) {
  const { container } = render(
    <MemoryRouter initialEntries={[`/guide/${slug}`]}>
      <Routes>
        <Route path="/guide/:slug" element={<GuidePost />} />
      </Routes>
    </MemoryRouter>
  );
  return { container, schemas: schemasIn(container) };
}

function renderHub() {
  const { container } = render(
    <MemoryRouter initialEntries={['/guide']}>
      <GuideIndex />
    </MemoryRouter>
  );
  return { container, schemas: schemasIn(container) };
}

const schemasIn = (container) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

// React 19 hoists <title>, <meta> and <link> into document.head.
const head = () => document.head;

describe('guide reader', () => {
  it('renders the guide title as the only h1', () => {
    const { container } = renderPost('dispatch');
    expect(
      screen.getByRole('heading', { level: 1, name: 'How to load and dispatch goods' })
    ).toBeInTheDocument();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
  });

  it('prints the checked-against-the-app line verbatim', () => {
    renderPost('dispatch');
    // checkGuidePrerender.mjs greps the built HTML for exactly this sentence.
    expect(screen.getByText('Checked against the app on 2026-09-07')).toBeInTheDocument();
  });

  it('links back to the hub under the words the guard looks for', () => {
    renderPost('dispatch');
    expect(screen.getByRole('link', { name: 'All guides' })).toHaveAttribute('href', '/guide');
  });

  it('marks the page with its slug so the prerender guard can identify it', () => {
    const { container } = renderPost('dispatch');
    expect(container.querySelector('[data-guide-slug]')).toHaveAttribute(
      'data-guide-slug',
      'dispatch'
    );
  });

  it('renders the repository-authored body', () => {
    renderPost('dispatch');
    expect(screen.getByRole('heading', { level: 2, name: 'Before you start' })).toBeInTheDocument();
    expect(screen.getByText('Open Dispatch for your company.')).toBeInTheDocument();
  });

  it('puts a body table inside its own horizontal scroll container', () => {
    const { container } = renderPost('dispatch');
    const table = container.querySelector('table');
    expect(table).not.toBeNull();
    expect(table.closest('.guide-table-wrap')).not.toBeNull();
  });

  it('labels the prerequisites section instead of leaving it as body prose', () => {
    const { container } = renderPost('dispatch');
    const prereq = container.querySelector('.guide-prereq');
    expect(prereq).not.toBeNull();
    expect(prereq.textContent).toContain('Open Dispatch for your company.');
    // The callout wraps the section in place; it must not swallow what follows.
    expect(prereq.textContent).not.toContain('Tick the invoices you are sending.');
  });

  it('links only the related guides that were declared and exist', () => {
    const { container } = renderPost('dispatch');
    const hrefs = [...container.querySelectorAll('.guide-related a')].map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toEqual(['/guide/sales-orders']);
  });

  it('does not pretend to know the visitor’s access with a role selector', () => {
    const { container } = renderPost('dispatch');
    expect(container.querySelector('select')).toBeNull();
    expect(container.querySelector('input[type="radio"]')).toBeNull();
  });

  it('names no price and promises no plan tier', () => {
    const { container } = renderPost('dispatch');
    expect(container.textContent).not.toMatch(/₹|\bRs\.?\s*\d|per month|pricing|upgrade to/i);
  });

  it('emits the guide canonical, title and description', () => {
    renderPost('dispatch');
    expect(head().querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://takkada.com/guide/dispatch/'
    );
    expect(head().querySelector('title').textContent).toBe(
      'How to load and dispatch goods in Takkada'
    );
    expect(head().querySelector('meta[name="description"]').getAttribute('content')).toBe(
      GUIDES[0].meta_description
    );
    expect(head().querySelector('meta[property="og:type"]').getAttribute('content')).toBe('article');
  });

  it('builds article and breadcrumb schema on guide URLs, never blog ones', () => {
    const { schemas } = renderPost('dispatch');
    const article = byType(schemas, 'Article');
    expect(article.url).toBe('https://takkada.com/guide/dispatch/');
    expect(article.mainEntityOfPage).toBe('https://takkada.com/guide/dispatch/');

    const crumbs = byType(schemas, 'BreadcrumbList');
    expect(crumbs.itemListElement.map((i) => i.item)).toEqual([
      'https://takkada.com/',
      'https://takkada.com/guide/',
      'https://takkada.com/guide/dispatch/',
    ]);

    // The reader was copied from BlogPost; a leftover /blog path in the
    // structured data would tell crawlers a guide is a blog post.
    expect(JSON.stringify(schemas)).not.toContain('/blog');
  });

  it('gives an unknown slug a useful not-found state with a way back', () => {
    const { container } = renderPost('no-such-guide');
    expect(screen.getByRole('heading', { level: 1, name: 'Guide not found' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All guides' })).toHaveAttribute('href', '/guide');
    expect(container.querySelector('[data-guide-slug]')).toBeNull();
  });
});

describe('guide hub', () => {
  it('renders exactly one card per guide', () => {
    const { container } = renderHub();
    const hrefs = [...container.querySelectorAll('a.guide-hub-card')].map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs.sort()).toEqual(GUIDES.map((g) => `/guide/${g.slug}`).sort());
  });

  it('gives every card its title and a short description', () => {
    const { container } = renderHub();
    for (const g of GUIDES) {
      const card = container.querySelector(`a.guide-hub-card[href="/guide/${g.slug}"]`);
      expect(card, g.slug).not.toBeNull();
      expect(card.textContent).toContain(g.title);
      expect(card.textContent).toContain(g.meta_description);
    }
  });

  it('groups the cards by task and heads each group that has cards', () => {
    const { container } = renderHub();
    const rendered = groupGuides(GUIDES);
    const headings = [...container.querySelectorAll('.guide-hub-group h2')].map(
      (h) => h.textContent
    );
    expect(headings).toEqual(rendered.map((group) => group.title));
    // Empty groups must not leave a bare heading behind.
    expect(rendered.every((group) => group.guides.length > 0)).toBe(true);
  });

  it('keeps a guide that no group claims rather than dropping it', () => {
    const claimed = new Set(groupGuides(GUIDES).flatMap((g) => g.guides.map((x) => x.slug)));
    expect(claimed.has('stock-check')).toBe(true);
  });

  it('renders the hub heading the prerender guard expects', () => {
    const { container } = renderHub();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('h1').textContent).toBe(GUIDE_HUB.h1);
  });

  it('meets the title, description and canonical limits', () => {
    renderHub();
    const title = head().querySelector('title').textContent;
    const description = head().querySelector('meta[name="description"]').getAttribute('content');
    expect(title).toBe(GUIDE_HUB.title);
    expect(title.length).toBeLessThanOrEqual(60);
    expect(description).toBe(GUIDE_HUB.description);
    expect(description.length).toBeLessThanOrEqual(160);
    expect(head().querySelector('link[rel="canonical"]').getAttribute('href')).toBe(
      'https://takkada.com/guide/'
    );
  });

  it('emits CollectionPage schema covering every guide it lists', () => {
    const { schemas } = renderHub();
    const collection = byType(schemas, 'CollectionPage');
    expect(collection.mainEntity['@type']).toBe('ItemList');
    expect(collection.mainEntity.numberOfItems).toBe(GUIDES.length);
    expect(collection.mainEntity.itemListElement.map((i) => i.url).sort()).toEqual(
      GUIDES.map((g) => `https://takkada.com/guide/${g.slug}/`).sort()
    );
  });
});

// The grouping table is site information architecture, so it lives beside the
// hub rather than in the content contract — but it still has to account for
// every published topic. A topic added to topics.json and forgotten here would
// silently fall into the catch-all group; a topic named in two groups would be
// listed twice on the hub. Both are caught below against the real registry.
describe('guide grouping covers the real catalog', () => {
  it('places every topic in exactly one declared group', () => {
    const grouped = GUIDE_GROUPS.flatMap((group) => group.slugs);
    expect(new Set(grouped).size, 'a slug is listed in two groups').toBe(grouped.length);
    expect(grouped.sort()).toEqual(topics.topics.map((t) => t.slug).sort());
  });
});
