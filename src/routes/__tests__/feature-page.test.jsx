import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import FeaturePage from '../../components/FeaturePage';
import { FEATURE_PAGES, featurePagePath, heroShot, stepShot } from '../../data/featurePages';
import { screen } from '../../data/screens';
import { routeMetadata } from '../../data/siteMetadata';
import { routes } from '../index';
import { pricing, planPricing } from '../../data/siteContent';
import { FEATURE_GROUPS } from '../../data/featureGroups';
import { STOPS } from '../../data/journey';

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
  it('starts the navy hero copy with a Home link', () => {
    const { container } = renderPage(page);
    const copy = container.querySelector('.feature-hero .icp-hero-content');
    const home = copy.firstElementChild;

    expect(home).toHaveClass('back-home');
    expect(home).toHaveAccessibleName('Home');
    expect(home.getAttribute('href')).toBe('/');
  });

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
    const shot = heroShot(page);
    expect(img.getAttribute('src')).toBe(shot.src);
    expect(img.getAttribute('alt')).toBe(shot.alt);
    expect(img.getAttribute('width')).toBe(String(shot.width));
    expect(img.getAttribute('height')).toBe(String(shot.height));
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
      expect(grid.querySelector('.feature-steps').getAttribute('data-steps')).toBe(
        String(page.walkthrough.length)
      );
      page.walkthrough.forEach((step, i) => {
        const shot = stepShot(step);
        // Media band first, then copy: the band's fixed height is what lines
        // the phones up across a row (feature-page.css).
        expect(steps[i].firstElementChild.className).toBe('feature-step-shot');
        const img = steps[i].querySelector('.feature-step-shot img');
        expect(img.getAttribute('src')).toBe(shot.src);
        expect(img.getAttribute('srcset')).toBe(shot.srcSet ?? null);
        expect(img.getAttribute('alt')).toBe(shot.alt);
        expect(img.getAttribute('width')).toBe(String(shot.width));
        expect(img.getAttribute('height')).toBe(String(shot.height));
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

// The journey strip is mounted here rather than inside the hero data so that a
// page joining a stop needs no page edit at all — the grouping already knows.
// These pin the mount point and the silence, per page, so a regrouping that
// drops a stop shows up as a failing page and not as a quietly missing strip.
describe('every feature page shows where it sits in the invoice journey', () => {
  const stopOf = (slug) => FEATURE_GROUPS.find((g) => g.slugs.includes(slug))?.stop;

  it.each(CASES)('%s marks its own stop, or carries no strip at all', (_slug, page) => {
    const { container } = renderPage(page);
    const copy = container.querySelector('.feature-hero .icp-hero-content');
    const strip = container.querySelector('.feature-hero .journey-strip');
    const stop = stopOf(page.slug);

    if (!stop) {
      expect(strip).toBeNull();
      return;
    }
    expect(strip).not.toBeNull();
    // Last child of the copy column: it closes the hero, under the CTAs.
    expect(copy.lastElementChild).toBe(strip);
    const marked = [...strip.querySelectorAll('li[aria-current="step"]')];
    expect(marked).toHaveLength(1);
    expect(marked[0].textContent).toBe(STOPS.find((s) => s.id === stop).label);
    expect(strip.querySelector('li[aria-current="step"] a').getAttribute('href')).toBe(
      `/#stop-${stop}`
    );
  });

  it('draws a strip on at least one page, so the assertions above are not vacuous', () => {
    const withStop = FEATURE_PAGES.filter((p) => stopOf(p.slug));
    expect(withStop.length).toBeGreaterThan(0);
  });
});

// Two things about the navy hero cannot be seen from the DOM, and both of them
// were nearly shipped wrong, so they are pinned against the stylesheets.
//
// Against ALL of them, not just feature-page.css: the cascade does not care
// which file a rule was typed into, and styles.css, premium.css and journey.css
// all carry hero rules already. A leak introduced in any file the app loads has
// to fail here, or this guard only protects the one place the mistake was not
// going to be made.

// Every stylesheet src/main.jsx imports, read out of main.jsx rather than kept
// by hand: a list typed here is a list that goes stale the first time an eighth
// stylesheet is added, and the leak it lets through is exactly the one this
// guard exists to catch.
const APP_STYLESHEETS = [
  ...readFileSync('src/main.jsx', 'utf8').matchAll(/^import\s+'(\.[^']+\.css)'/gm),
].map((m) => m[1].replace(/^\.\//, 'src/'));

const NAVY_SCOPE = /\.feature-hero\b|\.features-hub-hero\b/;

// A declaration that puts a dark ground down, or light ink on one. This is what
// makes the check a check on *going navy* rather than on naming .icp-hero —
// .icp-hero-title and friends are ordinary layout and must stay legal.
const GOES_NAVY =
  /(?:background(?:-color|-image)?\s*:[^;]*(?:--color-primary-dark|--color-navy|--color-dark\b|#0f1f3d|#1e3a6b))|(?:[^-]color\s*:\s*(?:#fff\b|#ffffff\b|white\b|rgba\(\s*255\s*,\s*255\s*,\s*255|var\(\s*--color-text-light))/i;

/** Innermost rules as [head, body]; at-rule wrappers are skipped, comments gone. */
function rulesOf(css) {
  const bare = css.replace(/\/\*[\s\S]*?\*\//g, '');
  return [...bare.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .map((m) => [m[1].trim(), m[2]])
    .filter(([head]) => head && !head.startsWith('@'))
    .flatMap(([head, body]) =>
      head
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
        .map((sel) => [sel, body])
    );
}

/** Heads that turn an .icp-hero page navy without naming one of the two heroes. */
function navyLeaks(css) {
  return rulesOf(css)
    .filter(
      ([sel, body]) => /\.icp-hero\b/.test(sel) && !NAVY_SCOPE.test(sel) && GOES_NAVY.test(body)
    )
    .map(([sel]) => sel);
}

/** Heads colouring EVERY paragraph in a navy hero, light cards included. */
function blanketHeroParagraphs(css) {
  return rulesOf(css)
    .filter(([sel, body]) => NAVY_SCOPE.test(sel) && /\sp$/.test(sel) && /[^-]color\s*:/.test(body))
    .map(([sel]) => sel);
}

describe('the navy hero stays on the two heroes it is for', () => {
  const sheets = APP_STYLESHEETS.map((path) => [path, readFileSync(path, 'utf8')]);

  // If the parse above ever comes back empty, every it.each below silently
  // stops running and the guard passes on nothing.
  it('found the app stylesheets in main.jsx', () => {
    expect(APP_STYLESHEETS.length).toBeGreaterThan(3);
    expect(APP_STYLESHEETS).toContain('src/styles.css');
    expect(APP_STYLESHEETS).toContain('src/feature-page.css');
    expect(APP_STYLESHEETS).toContain('src/journey.css');
  });

  // `hero icp-hero` is also worn by the four ICP pages, /partners, /demo and
  // the comparison page. A rule that grounds .icp-hero in navy takes all of
  // them with it.
  it.each(sheets)('never grounds an .icp-hero page in navy — %s', (_path, css) => {
    expect(navyLeaks(css)).toEqual([]);
  });

  // A blanket `.feature-hero p` is the rule that washes out the answer block —
  // a pale card standing on the navy whose ink has to stay dark. Same for any
  // future light-surface child of either hero.
  it.each(sheets)('never washes every paragraph in a navy hero — %s', (_path, css) => {
    expect(blanketHeroParagraphs(css)).toEqual([]);
  });

  // Both detectors, against a stylesheet written to break them. A fixture
  // rather than the real files, so proving the guard bites never means editing
  // a stylesheet the dev server is serving.
  it('catches both mistakes, and leaves ordinary .icp-hero layout alone', () => {
    const fixture = `
      /* a comment mentioning .icp-hero { background: var(--color-navy) } */
      .icp-hero { background: linear-gradient(180deg, var(--color-primary-dark), var(--color-navy)); }
      .hero.icp-hero .hero-title { color: #fff; }
      .feature-hero p { color: rgba(255, 255, 255, 0.74); }
      @media (min-width: 900px) {
        .features-hub-hero .container p { color: #ffffff; }
      }
      .icp-hero-title { font-size: clamp(26px, 3.6vw, 44px); }
      .icp-hero .container { display: block; }
      .feature-hero .hero-subtitle { color: rgba(255, 255, 255, 0.74); }
      .feature-hero .feature-answer { color: var(--color-on-container); }
    `;
    expect(navyLeaks(fixture)).toEqual(['.icp-hero', '.hero.icp-hero .hero-title']);
    expect(blanketHeroParagraphs(fixture)).toEqual([
      '.feature-hero p',
      '.features-hub-hero .container p',
    ]);
  });
});

describe('exported sheet section', () => {
  it.each(FEATURE_PAGES.filter((p) => p.sheet).map((p) => [p.slug, p]))(
    '%s: shows the whole registered sheet with its dimensions',
    (_slug, page) => {
      const { container } = renderPage(page);
      const section = container.querySelector('#sheet');
      expect(section).not.toBeNull();
      const shot = screen(page.sheet.screen);
      const img = section.querySelector('.feature-sheet-paper img');
      expect(img.getAttribute('src')).toBe(shot.src);
      expect(img.getAttribute('srcset')).toBe(shot.srcSet ?? null);
      expect(img.getAttribute('width')).toBe(String(shot.width));
      expect(img.getAttribute('height')).toBe(String(shot.height));
      expect(section.querySelector('h2').textContent).toBe(page.sheet.heading);
    },
  );
  it('the salesman page carries the Team Sales export and the challan page the loading sheet', () => {
    expect(FEATURE_PAGES.find((p) => p.slug === 'salesman-app-tally').sheet.screen).toBe('sheet-salesman');
    // Ronak, 2026-09-20 19:50: the printed loading sheet is the point of the
    // challan page and the page never showed it.
    expect(FEATURE_PAGES.find((p) => p.slug === 'delivery-challan-from-mobile').sheet.screen).toBe(
      'sheet-loading'
    );
    const page = FEATURE_PAGES.find((p) => !p.sheet);
    expect(renderPage(page).container.querySelector('#sheet')).toBeNull();
  });
});

describe('in-detail section', () => {
  it.each(FEATURE_PAGES.filter((p) => p.detail).map((p) => [p.slug, p]))(
    '%s: renders one card per topic and links the full guide',
    (_slug, page) => {
      const { container } = renderPage(page);
      const section = container.querySelector('#detail');
      expect(section).not.toBeNull();
      const cards = section.querySelectorAll('.feature-detail-card');
      expect(cards).toHaveLength(page.detail.groups.length);
      page.detail.groups.forEach((group, i) => {
        expect(cards[i].querySelector('h3').textContent).toBe(group.title);
        const items = cards[i].querySelectorAll('li');
        expect(items).toHaveLength(group.points.length);
        group.points.forEach((point, j) => {
          expect(items[j].querySelector('strong.feature-detail-lead').textContent).toBe(`${point.lead}.`);
          expect(items[j].textContent).toBe(`${point.lead}. ${point.text}`);
        });
      });
      const link = section.querySelector('.feature-detail-more a');
      expect(link.getAttribute('href')).toBe(`/guide/${page.detail.guide.slug}`);
    }
  );
  it('a page without detail data renders no detail section', () => {
    const page = FEATURE_PAGES.find((p) => !p.detail);
    const { container } = renderPage(page);
    expect(container.querySelector('#detail')).toBeNull();
  });
});

describe('report gallery', () => {
  it.each(FEATURE_PAGES.filter((p) => p.gallery).map((p) => [p.slug, p]))(
    '%s: renders one card per item, lazy, between the story and the comparison',
    (_slug, page) => {
      const { container } = renderPage(page);
      const section = container.querySelector('#gallery');
      expect(section).not.toBeNull();
      const cards = section.querySelectorAll('.feature-gallery-card');
      expect(cards).toHaveLength(page.gallery.items.length);
      page.gallery.items.forEach((item, i) => {
        const shot = screen(item.screen);
        const img = cards[i].querySelector('.feature-gallery-shot img');
        expect(img.getAttribute('src')).toBe(shot.src);
        expect(img.getAttribute('srcset')).toBe(shot.srcSet);
        expect(img.getAttribute('alt')).toBe(shot.alt);
        expect(img.getAttribute('width')).toBe(String(shot.width));
        expect(img.getAttribute('height')).toBe(String(shot.height));
        expect(img.getAttribute('loading')).toBe('lazy');
        expect(cards[i].querySelector('h3').textContent).toBe(item.title);
        expect(cards[i].querySelector('p').textContent).toBe(item.body);
      });
      const story = container.querySelector('#walkthrough') ?? container.querySelector('#tour');
      expect(story.compareDocumentPosition(section) & 4).toBeTruthy();
      expect(section.compareDocumentPosition(container.querySelector('#comparison')) & 4).toBeTruthy();
    }
  );
  it('a page without gallery data renders no gallery section', () => {
    const page = FEATURE_PAGES.find((p) => !p.gallery);
    expect(renderPage(page).container.querySelector('#gallery')).toBeNull();
  });
});

describe('walkthrough card CSS', () => {
  const css = readFileSync(resolve(__dirname, '../../feature-page.css'), 'utf8').replace(
    /\/\*[\s\S]*?\*\//g,
    ''
  );
  const block = (head) => {
    const i = css.indexOf(`${head} {`);
    return i < 0 ? '' : css.slice(i, css.indexOf('}', i));
  };
  it('the media band shows the whole phone at one width, so phones line up by construction', () => {
    expect(block('.feature-step-shot')).not.toMatch(/height:/);
    expect(block('.feature-step-shot')).not.toMatch(/max-height/);
    expect(block('.feature-step-shot img')).toMatch(/width:\s*\d+px/);
    expect(block('.feature-step-shot img')).toMatch(/height:\s*auto/);
  });
  it('the in-detail grid widens the remainder of its last row instead of orphaning a card', () => {
    expect(block('.feature-detail-grid')).toMatch(/repeat\(6, minmax\(0, 1fr\)\)/);
    expect(css).toMatch(/\.feature-detail-card:last-child:nth-child\(3n \+ 1\) \{\s*grid-column: span 6;/);
    expect(block('.feature-detail-card ul')).toMatch(/list-style: disc/);
  });
  it('4-step pages fill two rows and 5-step pages widen the last two cards', () => {
    expect(css).toMatch(
      /\.feature-steps\[data-steps='4'\] \.feature-step \{\s*grid-column: span 3;/
    );
    expect(css).toMatch(
      /\.feature-steps\[data-steps='5'\] \.feature-step:nth-child\(n \+ 4\) \{\s*grid-column: span 3;/
    );
  });
});

describe('call recording section', () => {
  it.each(FEATURE_PAGES.filter((p) => p.listen).map((p) => [p.slug, p]))(
    '%s: renders a paused player that fetches nothing until it is asked to',
    (_slug, page) => {
      const { container } = renderPage(page);
      const section = container.querySelector('#listen');
      expect(section).not.toBeNull();
      const audio = section.querySelector('audio');
      expect(audio.getAttribute('src')).toBe(page.listen.src);
      // 160 KB down every visitor's line for a clip most will never play.
      expect(audio.getAttribute('preload')).toBe('none');
      expect(audio.hasAttribute('autoplay')).toBe(false);
      expect(section.querySelector('.call-player-play').getAttribute('aria-pressed')).toBe('false');
      expect(section.querySelectorAll('.call-player-bar')).toHaveLength(page.listen.peaks.length * 2);
      // Directly under the hero, ahead of the story (Ronak, 2026-09-20): on a
      // page about a phone call, the call is the proof and it was four cards
      // past the fold.
      const story = container.querySelector('#walkthrough') ?? container.querySelector('#tour');
      expect(section.compareDocumentPosition(story) & 4).toBeTruthy();
      const seek = section.querySelector('[role="slider"]');
      expect(seek.getAttribute('aria-valuenow')).toBe('0');
      expect(seek.getAttribute('aria-valuemax')).toBe(String(Math.round(page.listen.duration)));
      expect(seek.getAttribute('tabindex')).toBe('0');
    }
  );
  it('a page without a recording renders no player', () => {
    const page = FEATURE_PAGES.find((p) => !p.listen);
    expect(renderPage(page).container.querySelector('#listen')).toBeNull();
  });
});

// The homepage story already carries the ruling "nothing dims on a phone: a
// station fills the screen on its own, so the dim would only read as a broken
// page". The feature-page tour never got it: on /salesman-app-tally at 390 the
// steps below the active one rendered at 40% and read as disabled copy
// (2026-09-21 phone walk).
describe('the feature tour does not dim its steps on a phone', () => {
  it('restores full opacity on .ftour-step button below 900px', () => {
    const css = readFileSync('src/feature-page.css', 'utf8');
    const at = css.indexOf('@media (max-width: 899px)');
    expect(at, 'no 899px block in feature-page.css').toBeGreaterThan(-1);
    expect(css.slice(at)).toMatch(/\.ftour-step button\s*\{\s*opacity:\s*1;?\s*\}/);
  });
});
