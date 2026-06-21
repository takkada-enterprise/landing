import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children (title, canonical, JSON-LD) inline so we can assert on
// them without react-helmet-async's async document.head writes.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import TallyOnMobile from '../TallyOnMobile';
import { routeMetadata } from '../../data/siteMetadata';

afterEach(cleanup);

const CANONICAL = 'https://takkada.com/tally-on-mobile/';

function renderRoute() {
  const { container } = render(
    <MemoryRouter>
      <TallyOnMobile />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

describe('TallyOnMobile route', () => {
  it('is registered in routeMetadata at the exact-match path', () => {
    expect(routeMetadata.some((r) => r.path === '/tally-on-mobile')).toBe(true);
  });

  it('targets the /tally-on-mobile canonical and the keyword title', () => {
    renderRoute();
    // React 19 hoists <title>/<link>/<meta> to document.head.
    const canonical = document.querySelector('link[rel="canonical"]');
    expect(canonical?.getAttribute('href')).toBe(CANONICAL);
    const ogUrl = document.querySelector('meta[property="og:url"]');
    expect(ogUrl?.getAttribute('content')).toBe(CANONICAL);
    const title = document.querySelector('title');
    expect(title?.textContent).toMatch(/Tally on Mobile/i);
    expect(title?.textContent.length).toBeLessThanOrEqual(60);
  });

  it('renders the full home body verbatim (same page content)', () => {
    const { container } = renderRoute();
    // Hero headline that only the home body carries.
    expect(container.textContent).toContain('Get paid without chasing');
    // Pricing band shared with the home page.
    expect(container.textContent).toContain('₹2,700 to ₹9,999 per year. GST extra.');
  });

  it('emits the same SoftwareApplication + FAQPage schema as the home page', () => {
    const { container, schemas } = renderRoute();
    const app = byType(schemas, 'SoftwareApplication');
    expect(app).toBeDefined();
    expect(app.publisher).toEqual({ '@id': 'https://takkada.com/#organization' });

    const faq = byType(schemas, 'FAQPage');
    expect(faq).toBeDefined();
    const visibleQuestions = container.querySelectorAll('.faq-question');
    expect(faq.mainEntity).toHaveLength(visibleQuestions.length);
    expect(faq.mainEntity.length).toBeGreaterThan(0);
  });
});
