import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import FeaturePage from '../../components/FeaturePage';
import { FEATURE_PAGES, featurePagePath } from '../../data/featurePages';
import { routeMetadata } from '../../data/siteMetadata';
import { routes } from '../index';
import { pricing, planPricing } from '../../data/siteContent';

afterEach(cleanup);

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));

function renderPage(page) {
  const { container } = render(
    <MemoryRouter>
      <FeaturePage page={page} />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);

const CASES = FEATURE_PAGES.map((page) => [page.slug, page]);

describe.each(CASES)('%s renders the whole template', (_slug, page) => {
  it('puts the exact search phrase in the only h1', () => {
    const { container } = renderPage(page);
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0].textContent.toLowerCase()).toContain(page.searchPhrase.toLowerCase());
  });

  it('renders the answer block ahead of the walk-through', () => {
    const { container } = renderPage(page);
    const answer = container.querySelector('.feature-answer');
    expect(answer.textContent).toBe(page.answer);
    const walkthrough = container.querySelector('#walkthrough');
    // Node.DOCUMENT_POSITION_FOLLOWING: the walk-through comes after the answer.
    expect(answer.compareDocumentPosition(walkthrough) & 4).toBeTruthy();
  });

  it('renders every walk-through step with a dimensioned, lazy screenshot', () => {
    const { container } = renderPage(page);
    const steps = container.querySelectorAll('.feature-step');
    expect(steps).toHaveLength(page.walkthrough.length);
    page.walkthrough.forEach((step, i) => {
      const img = steps[i].querySelector('img');
      expect(img.getAttribute('src')).toBe(step.image);
      expect(img.getAttribute('alt')).toBe(step.alt);
      expect(img.getAttribute('width')).toBe(String(step.width));
      expect(img.getAttribute('height')).toBe(String(step.height));
      expect(img.getAttribute('loading')).toBe('lazy');
    });
  });

  it('renders the comparison as a real table with a row per claim', () => {
    const { container } = renderPage(page);
    const table = container.querySelector('table.feature-comparison-table');
    expect(table).not.toBeNull();
    const rows = table.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(page.comparison.rows.length);
    page.comparison.rows.forEach((row, i) => {
      const cells = rows[i].querySelectorAll('th, td');
      expect(cells[0].textContent).toBe(row.feature);
      expect(cells[1].textContent).toBe(row.takkada);
      expect(cells[2].textContent).toBe(row.others);
    });
    expect(container.textContent).toContain(page.comparison.disclaimer);
  });

  it('derives the plan price from the rate card rather than the page copy', () => {
    const { container } = renderPage(page);
    const plan = pricing.plans.find((p) => p.plan === page.planPointer.plan);
    const pointer = container.querySelector('.feature-plan-pointer');
    expect(pointer.textContent).toContain(planPricing(plan).price);
    expect(pointer.textContent).toContain(page.planPointer.note);
  });

  it('links every related post into the blog', () => {
    const { container } = renderPage(page);
    const links = [...container.querySelectorAll('.feature-related-list a')];
    expect(links).toHaveLength(page.relatedPosts.length);
    page.relatedPosts.forEach((post, i) => {
      expect(links[i].getAttribute('href')).toBe(`/blog/${post.slug}`);
      expect(links[i].textContent).toContain(post.title);
    });
  });
});

describe.each(CASES)('%s emits the AEO schema set', (_slug, page) => {
  const canonical = `https://takkada.com${featurePagePath(page)}/`;

  it('emits Article with a named Person author carrying a sameAs profile', () => {
    const { schemas } = renderPage(page);
    const article = byType(schemas, 'Article');
    expect(article).toBeDefined();
    expect(article.url).toBe(canonical);
    expect(article.mainEntityOfPage).toBe(canonical);
    expect(article.headline).toBe(page.searchPhrase);
    expect(article.datePublished).toBe(page.datePublished);
    expect(article.dateModified).toBe(page.updated);
    // Named author, not "Takkada Team" (plan Phase 2).
    expect(article.author['@type']).toBe('Person');
    expect(article.author.name).toBeTruthy();
    expect(article.author.sameAs?.[0]).toMatch(/linkedin\.com/);
  });

  it('emits a SoftwareApplication reference published by the organization', () => {
    const { schemas } = renderPage(page);
    const app = byType(schemas, 'SoftwareApplication');
    expect(app.publisher).toEqual({ '@id': 'https://takkada.com/#organization' });
  });

  it('emits a BreadcrumbList ending at the page canonical, on known routes', () => {
    const { schemas } = renderPage(page);
    const crumb = byType(schemas, 'BreadcrumbList');
    const last = crumb.itemListElement[crumb.itemListElement.length - 1];
    expect(last.item).toBe(canonical);
    for (const entry of crumb.itemListElement) {
      expect(entry.item.startsWith('https://takkada.com')).toBe(true);
      const path = '/' + entry.item.replace('https://takkada.com/', '').replace(/\/$/, '');
      expect(KNOWN_ROUTES.has(path === '/' ? '/' : path)).toBe(true);
    }
  });

  it('emits a FAQPage matching the questions actually on the page', () => {
    const { container, schemas } = renderPage(page);
    const faq = byType(schemas, 'FAQPage');
    const rendered = [...container.querySelectorAll('.faq-question')].map((n) => n.textContent);
    expect(faq.mainEntity).toHaveLength(rendered.length);
    for (const entry of faq.mainEntity) {
      expect(rendered).toContain(entry.name);
      expect(entry.acceptedAnswer.text.length).toBeGreaterThan(0);
    }
  });
});

describe('the router picks feature pages up without a per-page edit', () => {
  it('registers a child route for every feature page', () => {
    const children = routes[0].children.map((c) => (c.index ? '/' : `/${c.path}`));
    for (const page of FEATURE_PAGES) {
      expect(children).toContain(featurePagePath(page));
    }
  });
});
