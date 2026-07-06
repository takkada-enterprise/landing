import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children inline so title/canonical/JSON-LD can be asserted
// synchronously, mirroring tally-on-mobile.test.jsx.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import TallyMobileComparison from '../TallyMobileComparison';
import { routeMetadata } from '../../data/siteMetadata';
import { comparisonSection } from '../../data/siteContent';

afterEach(cleanup);

const CANONICAL = 'https://takkada.com/tally-mobile-app-comparison/';

function renderRoute() {
  const { container } = render(
    <MemoryRouter>
      <TallyMobileComparison />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

describe('TallyMobileComparison route', () => {
  it('is registered in routeMetadata (sitemap) at the comparison path', () => {
    expect(routeMetadata.some((r) => r.path === '/tally-mobile-app-comparison')).toBe(true);
  });

  it('targets the comparison canonical with length-safe title and description', () => {
    renderRoute();
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe(CANONICAL);

    const title = document.querySelector('title');
    expect(title?.textContent).toMatch(/comparison/i);
    expect(title?.textContent.length).toBeLessThanOrEqual(60);

    const description = document.querySelector('meta[name="description"]');
    expect(description?.getAttribute('content').length).toBeLessThanOrEqual(160);
  });

  it('renders the shared matrix with all three columns and the enriched rows', () => {
    const { container } = renderRoute();
    const table = container.querySelector('.comparison-table');
    expect(table).not.toBeNull();

    for (const col of ['Takkada', 'Biz Analyst', 'Livekeeping']) {
      expect(table.textContent).toContain(col);
    }
    // Enriched differentiator rows (single data source shared with home).
    expect(table.textContent).toContain('Zero-MDR UPI collection');
    expect(table.textContent).toContain('two-way Tally write-back');
    // One row per data entry — page and home render the same matrix.
    expect(container.querySelectorAll('.comparison-row')).toHaveLength(
      comparisonSection.rows.length
    );
  });

  it('keeps the dated fairness disclaimer', () => {
    const { container } = renderRoute();
    expect(container.querySelector('.comparison-disclaimer')?.textContent).toContain(
      comparisonSection.disclaimer
    );
  });

  it('emits a BreadcrumbList that resolves to the registered path', () => {
    const { schemas } = renderRoute();
    const breadcrumb = schemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumb).toBeDefined();
    const last = breadcrumb.itemListElement.at(-1);
    expect(last.item).toBe(CANONICAL);
    // The breadcrumb tail must be a registered route, not a dead path.
    expect(routeMetadata.some((r) => `https://takkada.com${r.path}/` === last.item)).toBe(true);
  });

  it('leads with the WhatsApp CTA and cross-links the five alternative posts', () => {
    const { container } = renderRoute();
    const waLinks = [...container.querySelectorAll('a[href^="https://wa.me/"]')];
    expect(waLinks.length).toBeGreaterThan(0);

    const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
    for (const slug of [
      '/blog/biz-analyst-alternative/',
      '/blog/livekeeping-alternative-for-distributors/',
      '/blog/credflow-alternative-tally-native/',
      '/blog/mybillbook-alternative-for-distributors/',
      '/blog/billbook-alternative-for-distributors/',
    ]) {
      expect(hrefs).toContain(slug);
    }
  });
});
