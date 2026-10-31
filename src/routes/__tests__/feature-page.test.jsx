// The feature-page template on the Campfire pattern (plan 2026-10-30-003,
// Task 5): one template for all 35 FEATURE_PAGES entries. The hero, answer,
// how-it-works cards and rows, the optional listen/gallery/sheet/detail
// blocks, the page's own comparison table, the plan pointer, FAQ, related
// links and the close band.
import { readFileSync } from 'node:fs';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import FeaturePage from '../../components/FeaturePage';
import { FEATURE_PAGES, featurePagePath, stepShot } from '../../data/featurePages';
import { SCREENS, screen } from '../../data/screens';
import { routeMetadata } from '../../data/siteMetadata';
import { routes } from '../index';
import { pricing, planPricing, DEFAULT_PRICING_TERM, appLinks } from '../../data/siteContent';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));
const REGISTRY_SRCS = new Set(Object.values(SCREENS).map((s) => s.src));

function renderPage(page) {
  const { container } = render(
    <MemoryRouter>
      <PhoneModalProvider>
        <FeaturePage page={page} />
      </PhoneModalProvider>
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

const byType = (schemas, type) => schemas.find((s) => s['@type'] === type);
const stepsOf = (page) => page.walkthrough ?? page.tour.stations;
const OPTIONAL = ['sheet', 'listen', 'gallery', 'detail'];

const CASES = FEATURE_PAGES.map((page) => [page.slug, page]);

// Review Focus 1: the page with the fewest steps and no optional block.
const SHORTEST = FEATURE_PAGES.filter((p) => p.walkthrough && OPTIONAL.every((k) => !p[k])).sort(
  (a, b) => a.walkthrough.length - b.walkthrough.length
)[0];
// FEATURE_PAGES[0] is the tour page today; the Set keeps the picks distinct.
const PICKS = [
  ...new Set([FEATURE_PAGES[0], FEATURE_PAGES.find((p) => p.slug === 'salesman-app-tally'), SHORTEST]),
].map((p) => [p.slug, p]);

// Text cards that carry no picture by design.
const TEXT_CARDS = ['ui-compare-card', 'ui-plan', 'ui-detail', 'ui-listen'];

describe('the template picks', () => {
  it('found a shortest page with no optional block and at most three steps', () => {
    expect(SHORTEST).toBeDefined();
    expect(SHORTEST.walkthrough.length).toBeLessThanOrEqual(3);
    expect(PICKS.map(([slug]) => slug)).toContain('salesman-app-tally');
  });
});

describe.each(PICKS)('%s renders on the Campfire template', (_slug, page) => {
  it('hero: the h1 headline and the page hero picture, eager and high priority', () => {
    const { container } = renderPage(page);
    const h1s = container.querySelectorAll('h1');
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveClass('ui-hero-title');
    expect(h1s[0].textContent).toBe(page.headline);
    expect(container.querySelector('#hero.ui-band--band')).not.toBeNull();
    const img = container.querySelector(`.ui-hero-stage img.ui-shot[data-screen="${page.hero.screen}"]`);
    expect(img).not.toBeNull();
    expect(img.getAttribute('loading')).toBe('eager');
    expect(img.getAttribute('fetchpriority')).toBe('high');
    expect(img.getAttribute('src')).toBe(screen(page.hero.screen).src);
    expect(container.querySelector('#hero .ui-breadcrumb')).not.toBeNull();
    expect(container.querySelector('#hero .ui-hero-lead').textContent).toBe(page.subheadline);
    expect(container.querySelector('#hero .ui-pill--accent').textContent).toContain('Try the demo');
  });

  it('answer sits under the hero and ahead of how it works', () => {
    const { container } = renderPage(page);
    const answer = container.querySelector('p.ui-answer');
    expect(answer.textContent).toBe(page.answer);
    expect(answer.compareDocumentPosition(container.querySelector('#how-it-works')) & 4).toBeTruthy();
  });

  it('how it works: two cards, then one row per remaining step', () => {
    const { container } = renderPage(page);
    const steps = stepsOf(page);
    const how = container.querySelector('#how-it-works');
    const cards = how.querySelectorAll('.ui-card');
    const rows = how.querySelectorAll('.ui-altrow');
    expect(cards).toHaveLength(Math.min(2, steps.length));
    expect(rows).toHaveLength(Math.max(0, steps.length - 2));
    rows.forEach((row, i) => expect(row.classList.contains('ui-altrow--flip')).toBe(i % 2 === 1));
    const titled = [...cards, ...rows].map((n) => n.querySelector('.ui-card-title').textContent);
    expect(titled).toEqual(steps.map((s) => s.title));
    [...cards, ...rows].forEach((n, i) => {
      const img = n.querySelector('img');
      expect(img.getAttribute('src')).toBe(stepShot(steps[i]).src);
      expect(img.getAttribute('alt')).toBe(stepShot(steps[i]).alt);
      // Only a registry picture wears ui-shot; a legacy image stays a plain img.
      expect(img.classList.contains('ui-shot')).toBe(Boolean(steps[i].screen));
    });
  });

  it('every ui-shot is a registry picture and every picture card has its picture', () => {
    const { container } = renderPage(page);
    for (const img of container.querySelectorAll('img.ui-shot')) {
      expect(REGISTRY_SRCS.has(img.getAttribute('src'))).toBe(true);
    }
    for (const card of container.querySelectorAll('.ui-card')) {
      if (TEXT_CARDS.some((c) => card.classList.contains(c))) continue;
      expect(card.querySelector('img'), card.textContent.slice(0, 60)).not.toBeNull();
    }
  });

  it('no section head stands over an empty block', () => {
    const { container } = renderPage(page);
    for (const title of container.querySelectorAll('.ui-section-title')) {
      const next = title.closest('.ui-section-head').nextElementSibling;
      expect(next, title.textContent).not.toBeNull();
      expect(next.textContent.trim().length + next.querySelectorAll('img').length).toBeGreaterThan(0);
    }
  });

  it('the comparison is the page own table, never the named-competitor grid', () => {
    const { container } = renderPage(page);
    const table = container.querySelector('.ui-compare-card table.ui-compare');
    expect(table).not.toBeNull();
    const head = [...table.querySelectorAll('thead th')].map((n) => n.textContent);
    expect(head).toEqual(['What you need', 'Takkada', page.comparison.othersLabel]);
    const rows = table.querySelectorAll('tbody tr');
    expect(rows).toHaveLength(page.comparison.rows.length);
    page.comparison.rows.forEach((row, i) => {
      const cells = rows[i].querySelectorAll('th, td');
      expect([...cells].map((c) => c.textContent)).toEqual([row.feature, row.takkada, row.others]);
    });
    expect(container.querySelector('.ui-compare-card').textContent).toContain(page.comparison.heading);
    expect(container.textContent).toContain(page.comparison.disclaimer);
    expect(container.textContent).not.toMatch(/Biz Analyst|Livekeeping/);
  });

  it('the plan pointer price comes from the rate card', () => {
    const { container } = renderPage(page);
    const plan = pricing.plans.find((p) => p.plan === page.planPointer.plan);
    const card = container.querySelector('.ui-card.ui-plan');
    expect(card.querySelector('.ui-card-title').textContent).toBe(plan.plan);
    expect(card.querySelector('.ui-plan-price.tabular-nums').textContent).toBe(
      planPricing(plan, DEFAULT_PRICING_TERM).price
    );
    expect(card.textContent).toContain(page.planPointer.note);
  });

  it('FAQ, related links, the close band and no overline anywhere', () => {
    const { container } = renderPage(page);
    expect(container.querySelectorAll('#faq .faq-item')).toHaveLength(page.faqs.length);
    const links = [...container.querySelectorAll('#related a')];
    expect(links).toHaveLength(page.relatedPosts.length);
    page.relatedPosts.forEach((post, i) => {
      expect(links[i].getAttribute('href')).toBe(`/blog/${post.slug}`);
      expect(links[i].textContent).toContain(post.title);
    });
    if (page.relatedPosts.length === 0) expect(container.querySelector('#related')).toBeNull();
    const close = container.querySelector('.ui-close');
    expect(close).not.toBeNull();
    expect(close.querySelector('.ui-pill').textContent).toContain('Try the demo');
    // Owner ruling 2026-10-30: every feature page keeps a booking path.
    const book = close.querySelector('a.ui-textlink');
    expect(book).not.toBeNull();
    expect(book.textContent).toContain('Book a 15-min demo');
    expect(book.getAttribute('href')).toBe(appLinks.bookDemo);
    expect(container.querySelector('[class*="overline"], [class*="eyebrow"], [class*="section-label"]')).toBeNull();
  });
});

// The structural rules above, across all 35 pages: a template, not three pages.
describe.each(CASES)('%s fits the template', (_slug, page) => {
  it('steps, pictures, comparison and plan price', () => {
    const { container } = renderPage(page);
    const steps = stepsOf(page);
    const how = container.querySelector('#how-it-works');
    expect(how.querySelectorAll('.ui-card')).toHaveLength(Math.min(2, steps.length));
    expect(how.querySelectorAll('.ui-altrow')).toHaveLength(Math.max(0, steps.length - 2));
    for (const img of container.querySelectorAll('img.ui-shot')) {
      expect(REGISTRY_SRCS.has(img.getAttribute('src'))).toBe(true);
    }
    for (const card of container.querySelectorAll('.ui-card')) {
      if (TEXT_CARDS.some((c) => card.classList.contains(c))) continue;
      expect(card.querySelector('img')).not.toBeNull();
    }
    expect(container.querySelectorAll('table.ui-compare tbody tr')).toHaveLength(page.comparison.rows.length);
    // A named competitor appears only where the page's own data names it.
    for (const name of ['Biz Analyst', 'Livekeeping']) {
      if (!JSON.stringify(page).includes(name)) expect(container.textContent).not.toContain(name);
    }
    const plan = pricing.plans.find((p) => p.plan === page.planPointer.plan);
    expect(container.querySelector('.ui-plan-price').textContent).toBe(planPricing(plan).price);
    expect(container.querySelector('[class*="overline"], [class*="eyebrow"], [class*="section-label"]')).toBeNull();
  });
});

describe('optional blocks', () => {
  it.each(FEATURE_PAGES.filter((p) => p.listen).map((p) => [p.slug, p]))(
    '%s: the call player sits in a card directly under the answer, paused and unfetched',
    (_slug, page) => {
      const { container } = renderPage(page);
      const card = container.querySelector('#listen .ui-card.ui-listen');
      expect(card).not.toBeNull();
      expect(card.querySelector('.ui-card-title').textContent).toBe(page.listen.heading);
      const audio = card.querySelector('.call-player audio');
      expect(audio.getAttribute('src')).toBe(page.listen.src);
      expect(audio.getAttribute('preload')).toBe('none');
      expect(audio.hasAttribute('autoplay')).toBe(false);
      expect(card.querySelectorAll('.call-player-bar')).toHaveLength(page.listen.peaks.length * 2);
      const answer = container.querySelector('p.ui-answer');
      expect(answer.compareDocumentPosition(card) & 4).toBeTruthy();
      expect(card.compareDocumentPosition(container.querySelector('#how-it-works')) & 4).toBeTruthy();
    }
  );

  it.each(FEATURE_PAGES.filter((p) => p.gallery).map((p) => [p.slug, p]))(
    '%s: one picture card per gallery item',
    (_slug, page) => {
      const { container } = renderPage(page);
      const cards = container.querySelectorAll('#gallery .ui-card');
      expect(cards).toHaveLength(page.gallery.items.length);
      page.gallery.items.forEach((item, i) => {
        expect(cards[i].querySelector(`img.ui-shot[data-screen="${item.screen}"]`)).not.toBeNull();
        expect(cards[i].querySelector('.ui-card-title').textContent).toBe(item.title);
        expect(cards[i].querySelector('.ui-card-line').textContent).toBe(item.body);
      });
    }
  );

  it.each(FEATURE_PAGES.filter((p) => p.sheet).map((p) => [p.slug, p]))(
    '%s: the exported sheet, whole, in its own card',
    (_slug, page) => {
      const { container } = renderPage(page);
      const card = container.querySelector('#sheet .ui-card');
      expect(card.querySelector('.ui-card-title').textContent).toBe(page.sheet.heading);
      expect(card.querySelector(`img.ui-shot[data-screen="${page.sheet.screen}"]`)).not.toBeNull();
    }
  );

  it.each(FEATURE_PAGES.filter((p) => p.detail).map((p) => [p.slug, p]))(
    '%s: one text card per detail topic and the guide link',
    (_slug, page) => {
      const { container } = renderPage(page);
      const cards = container.querySelectorAll('#detail .ui-card.ui-detail');
      expect(cards).toHaveLength(page.detail.groups.length);
      page.detail.groups.forEach((group, i) => {
        expect(cards[i].querySelector('.ui-card-title').textContent).toBe(group.title);
        const items = cards[i].querySelectorAll('li');
        expect([...items].map((li) => li.textContent)).toEqual(
          group.points.map((p) => `${p.lead}. ${p.text}`)
        );
      });
      expect(container.querySelector('#detail .ui-detail-more a').getAttribute('href')).toBe(
        `/guide/${page.detail.guide.slug}`
      );
    }
  );

  it('the shortest page renders none of them', () => {
    const { container } = renderPage(SHORTEST);
    for (const id of ['listen', 'gallery', 'sheet', 'detail']) {
      expect(container.querySelector(`#${id}`), id).toBeNull();
    }
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
    expect(app.publisher).toEqual({
      '@id': 'https://takkada.com/#organization',
    });
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

describe('the router picks feature pages up without a per-page edit', () => {
  it('registers a child route for every feature page', () => {
    const children = routes[0].children.map((c) => (c.index ? '/' : `/${c.path}`));
    for (const page of FEATURE_PAGES) {
      expect(children).toContain(featurePagePath(page));
    }
  });
});

// feature.css loads ahead of styles.css (FeaturePage imports it), so every
// rule is prefixed with the page root .ui-feature, and it keeps ui.css's
// motion contract.
describe('feature.css', () => {
  const read = () => readFileSync('src/ui/feature.css', 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const heads = (css) =>
    [...css.matchAll(/([^{}]+)\{[^{}]*\}/g)]
      .map((m) => m[1].trim())
      .filter((h) => h && !h.startsWith('@'))
      .flatMap((h) => h.split(',').map((s) => s.trim()));

  it('prefixes every selector with .ui-feature', () => {
    const all = heads(read());
    expect(all.length).toBeGreaterThan(5);
    expect(all.filter((h) => !h.startsWith('.ui-feature'))).toEqual([]);
  });
  it('has no keyframes and no transition: all', () => {
    const css = read();
    expect(css).not.toMatch(/@keyframes/);
    expect(css).not.toMatch(/transition:\s*all/);
  });
  it('is no longer the old stylesheet', () => {
    expect(readFileSync('src/main.jsx', 'utf8')).not.toMatch(/feature-page\.css/);
  });
});
