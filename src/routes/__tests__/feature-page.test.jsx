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

  it('renders the hero mockup eagerly at high fetch priority', () => {
    const { container } = renderPage(page);
    const img = container.querySelector('.feature-hero-shot img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe(page.hero.image);
    expect(img.getAttribute('alt')).toBe(page.hero.alt);
    expect(img.getAttribute('width')).toBe(String(page.hero.width));
    expect(img.getAttribute('height')).toBe(String(page.hero.height));
    // The LCP element must not be lazy, and must ask for priority.
    expect(img.getAttribute('loading')).toBeNull();
    expect(img.getAttribute('fetchpriority')).toBe('high');
  });

  it('renders the answer block ahead of the story section', () => {
    const { container } = renderPage(page);
    const answer = container.querySelector('.feature-answer');
    expect(answer.textContent).toBe(page.answer);
    // The story is a walk-through grid or a tour, never both (2026-08-12).
    const story = container.querySelector('#walkthrough') ?? container.querySelector('#tour');
    expect(story).not.toBeNull();
    // Node.DOCUMENT_POSITION_FOLLOWING: the story comes after the answer.
    expect(answer.compareDocumentPosition(story) & 4).toBeTruthy();
  });

  it('renders exactly one story section, matching its data', () => {
    const { container } = renderPage(page);
    const grid = container.querySelector('#walkthrough');
    const tour = container.querySelector('#tour');
    expect(Boolean(grid) !== Boolean(tour)).toBe(true);
    if (grid) {
      expect(page.walkthrough.length).toBeGreaterThan(0);
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
    } else {
      expect(container.querySelectorAll('.feature-step')).toHaveLength(0);
      const stations = container.querySelectorAll('.ftour-step');
      expect(stations).toHaveLength(page.tour.stations.length);
      page.tour.stations.forEach((station, i) => {
        expect(stations[i].textContent).toContain(station.title);
        expect(stations[i].textContent).toContain(station.body);
      });
    }
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
    // The image used to come from walkthrough[0] alone, so a tour-only page
    // emitted Article with no image (2026-08-12). Assert the asset URL, not
    // just truthiness: absoluteUrl(undefined) defaults to the site root, which
    // is truthy and makes a toBeTruthy() check here vacuous.
    expect(article.image).toMatch(/^https:\/\/takkada\.com\/assets\/.+\.(webp|png|jpg)$/);
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
      // Compare the parsed origin rather than startsWith: a prefix test passes
      // for https://takkada.com.example.com, and CodeQL flags the pattern as
      // incomplete URL sanitization (js/incomplete-url-substring-sanitization).
      const url = new URL(entry.item);
      expect(url.origin).toBe('https://takkada.com');
      const path = url.pathname.replace(/\/$/, '');
      expect(KNOWN_ROUTES.has(path === '' ? '/' : path)).toBe(true);
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
