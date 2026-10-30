import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Passthrough Head so global + page JSON-LD render inline into the container.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

// The header branches on demoEntryLive. Mocking the module exercises both
// branches at whatever value the flag actually carries, so neither assertion
// is vacuous and neither waits for a flip day to start running.
const siteContentMock = vi.hoisted(() => ({ demoEntryLive: true }));

vi.mock('./data/siteContent', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    get demoEntryLive() {
      return siteContentMock.demoEntryLive;
    },
  };
});

import Layout from './Layout';
import Home from './routes/Home';
import { contactInfo, footerColumns, navLinks } from './data/siteContent';
import { FEATURE_PAGES, featurePagePath } from './data/featurePages';
import { FEATURE_GROUPS, menuFeatureGroups } from './data/featureGroups';

beforeEach(() => {
  siteContentMock.demoEntryLive = true;
});

afterEach(cleanup);

function renderLayout(at = '/', child = <div />) {
  let go;
  function Probe() {
    go = useNavigate();
    return null;
  }
  const { container } = render(
    <MemoryRouter initialEntries={[at]}>
      <Probe />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={child} />
          <Route path="blog" element={<div />} />
          <Route path="partners" element={<div />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  const header = container.querySelector('header.ui-nav');
  return {
    container,
    header,
    go: (to) => go(to),
    links: () => header.querySelector('nav.ui-nav-links'),
    actions: () => header.querySelector('.ui-nav-actions'),
    sheet: () => header.querySelector('.ui-nav-sheet'),
    burger: () => header.querySelector('button.ui-nav-burger'),
    panel: () => header.querySelector('.ui-nav-features-panel'),
    toggle: () => header.querySelector('.ui-nav-features-toggle'),
    footer: () => container.querySelector('footer.ui-footer'),
    byName: (root, name) =>
      [...root.querySelectorAll('button, a')].filter((el) => name.test(el.textContent)),
    whatsappHrefs: (root) =>
      [...root.querySelectorAll('a')]
        .map((a) => a.getAttribute('href') ?? '')
        .filter((h) => h.includes('wa.me')),
  };
}

const schemasIn = (container) =>
  [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
const countType = (schemas, type) => schemas.filter((s) => s['@type'] === type).length;

describe('Layout global entity', () => {
  it('emits exactly one Organization and one WebSite node on a minimal route', () => {
    const schemas = schemasIn(renderLayout().container);
    expect(countType(schemas, 'Organization')).toBe(1);
    expect(countType(schemas, 'WebSite')).toBe(1);
  });

  it('cross-links the WebSite publisher to the Organization @id', () => {
    const schemas = schemasIn(renderLayout().container);
    const org = schemas.find((s) => s['@type'] === 'Organization');
    const site = schemas.find((s) => s['@type'] === 'WebSite');
    expect(site.publisher).toEqual({ '@id': org['@id'] });
  });

  it('does not duplicate Organization when the page also sets schema', () => {
    const schemas = schemasIn(renderLayout('/', <Home />).container);
    expect(countType(schemas, 'Organization')).toBe(1);
    expect(countType(schemas, 'WebSite')).toBe(1);
    expect(countType(schemas, 'SoftwareApplication')).toBe(1);
    expect(countType(schemas, 'FAQPage')).toBe(1);
  });
});

describe('brand logo assets', () => {
  // The logos render at ~107x38 and ~118x42; the 1172px source PNG starved the
  // hero image of the throttled mobile pipe. They stay on the 10KB WebP.
  it('serves the nav and footer logos as the small WebP with a reserved box', () => {
    const { container, header, footer } = renderLayout();
    const logos = [...container.querySelectorAll('img[alt="Takkada"]')];
    expect(logos).toHaveLength(2);
    expect(header.querySelector('a.ui-nav-logo img')).toBe(logos[0]);
    expect(footer().contains(logos[1])).toBe(true);
    const sourceRatio = 1172 / 417;
    for (const img of logos) {
      expect(img.getAttribute('src')).toBe('/assets/screenshots/takkada-logo.webp');
      const w = Number(img.getAttribute('width'));
      const h = Number(img.getAttribute('height'));
      expect(w).toBeGreaterThan(0);
      expect(Math.abs(w / h - sourceRatio)).toBeLessThan(0.1);
    }
  });
});

describe('nav links', () => {
  it('renders the four links in order with their hrefs', () => {
    const { links } = renderLayout();
    const top = [...links().querySelectorAll(':scope > a, :scope > .ui-nav-features > a')];
    expect(top.map((a) => a.textContent)).toEqual(['Features', 'Pricing', 'Partners', 'Blog']);
    expect(top.map((a) => a.getAttribute('href'))).toEqual(['/features', '/#pricing', '/partners', '/blog']);
    expect(navLinks.map((l) => l.label)).toEqual(['Features', 'Pricing', 'Partners', 'Blog']);
  });

  it('reaches the hub from a non-home route too', () => {
    const link = renderLayout('/blog').header.querySelector('a.ui-nav-features-link');
    expect(link.getAttribute('href')).toBe('/features');
    expect(link.textContent).toBe('Features');
  });

  it('leaves #pricing as the only homepage anchor in the top level', () => {
    expect(navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href)).toEqual(['#pricing']);
  });
});

describe('Features panel', () => {
  const panelLinks = (panel) => [...panel.querySelectorAll('a')].map((a) => a.getAttribute('href'));

  it('lists every feature page, grouped, plus a way to the hub', () => {
    const { panel } = renderLayout('/blog');
    expect(panelLinks(panel())).toEqual([
      ...menuFeatureGroups(FEATURE_PAGES).flatMap((group) => group.pages.map(featurePagePath)),
      '/features',
    ]);
    expect([...panel().querySelectorAll('.ui-nav-features-group > h3')].map((h) => h.textContent)).toEqual(
      menuFeatureGroups(FEATURE_PAGES).map((group) => group.title)
    );
  });

  it('leaves the comparison pages out of the menu but not out of the hub', () => {
    const links = panelLinks(renderLayout().panel());
    expect(links).not.toContain('/biz-analyst-alternative');
    expect(links).not.toContain('/livekeeping-alternative');
    expect(FEATURE_GROUPS.find((g) => g.id === 'weighing-options').slugs).toEqual([
      'biz-analyst-alternative',
      'livekeeping-alternative',
    ]);
  });

  it('is inert until the toggle is clicked, and aria-expanded flips', () => {
    const { panel, toggle } = renderLayout();
    expect(panel().hasAttribute('inert')).toBe(true);
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(toggle().getAttribute('aria-controls')).toBe(panel().id);

    fireEvent.click(toggle());
    expect(panel().hasAttribute('inert')).toBe(false);
    expect(toggle().getAttribute('aria-expanded')).toBe('true');

    fireEvent.click(toggle());
    expect(panel().hasAttribute('inert')).toBe(true);
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
  });

  it('closes on Escape and hands focus back to the toggle', () => {
    const { panel, toggle } = renderLayout();
    fireEvent.click(toggle());
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(panel().hasAttribute('inert')).toBe(true);
    expect(document.activeElement).toBe(toggle());
  });

  it('closes on a pointerdown outside itself', () => {
    const { panel, toggle } = renderLayout();
    fireEvent.click(toggle());
    fireEvent.pointerDown(document.body);
    expect(panel().hasAttribute('inert')).toBe(true);
  });

  // The hub's build guard counts anchors carrying features-hub-card in raw
  // HTML; the panel is in the raw HTML of every page.
  it('gives no panel link the hub card class', () => {
    expect(renderLayout().panel().querySelectorAll('a.features-hub-card')).toHaveLength(0);
  });
});

describe('header actions', () => {
  it('carries exactly two pills, both the outline recipe', () => {
    const { actions } = renderLayout();
    const pills = [...actions().querySelectorAll('.ui-pill')];
    expect(pills.map((p) => p.textContent.trim())).toEqual(['Try the demo', 'Chat on WhatsApp']);
    expect(pills[0].classList.contains('ui-pill--ghost')).toBe(true);
    expect(pills[1].classList.contains('ui-pill--ghost')).toBe(true);
    expect(pills[1].getAttribute('href')).toContain('wa.me');
  });

  it('fills the phone sticky bar with the marigold primary', () => {
    const { container } = renderLayout();
    expect(container.querySelector('.ui-nav-sticky a.ui-pill').classList.contains('ui-pill--accent')).toBe(true);
  });

  it('renders exactly one WhatsApp link at either value of the flag', () => {
    for (const live of [true, false]) {
      siteContentMock.demoEntryLive = live;
      const { header, whatsappHrefs } = renderLayout();
      expect(whatsappHrefs(header), `demoEntryLive=${live}`).toHaveLength(1);
      cleanup();
    }
  });

  // A real button, not an anchor: an href would let a middle-click or a copied
  // link reach the demo with no number captured.
  it('opens the phone modal on "Try the demo" instead of navigating', () => {
    const { container, actions, byName } = renderLayout();
    const cta = byName(actions(), /try the demo/i)[0];
    expect(cta.tagName).toBe('BUTTON');

    fireEvent.click(cta);

    expect(container.textContent).toMatch(/open the live demo/i);
    expect(container.textContent).toMatch(/send code/i);
  });

  it('links "Try the demo" to /demo when the flag is off, with no modal', () => {
    siteContentMock.demoEntryLive = false;
    const { container, actions, byName } = renderLayout();
    const cta = byName(actions(), /try the demo/i)[0];
    expect(cta.tagName).toBe('A');
    expect(cta.getAttribute('href')).toBe('/demo');
    expect(container.textContent).not.toMatch(/open the live demo/i);
  });

  it('points no header link at the app, at either value of the flag', () => {
    const host = (href) => {
      try {
        return new URL(href, 'https://takkada.com').hostname;
      } catch {
        return '';
      }
    };
    for (const live of [true, false]) {
      siteContentMock.demoEntryLive = live;
      const { header } = renderLayout();
      const appHrefs = [...header.querySelectorAll('a')]
        .map((a) => a.getAttribute('href') ?? '')
        .filter((h) => host(h) === 'app.takkada.com');
      expect(appHrefs, `demoEntryLive=${live}`).toEqual([]);
      cleanup();
    }
  });
});

// The sheet is the phone menu: the same links and pills, behind the burger.
describe('burger sheet at phone width', () => {
  const realWidth = window.innerWidth;
  beforeEach(() => {
    window.innerWidth = 390;
    window.dispatchEvent(new Event('resize'));
  });
  afterEach(() => {
    window.innerWidth = realWidth;
    document.body.classList.remove('lock-scroll');
  });

  it('starts closed, with the burger pointing at the sheet', () => {
    const { header, burger, sheet } = renderLayout();
    expect(header.classList.contains('menu-open')).toBe(false);
    expect(sheet().getAttribute('role')).toBeNull();
    expect(burger().getAttribute('aria-expanded')).toBe('false');
    expect(burger().getAttribute('aria-controls')).toBe(sheet().id);
  });

  it('locks body scroll only while open, and opens as a labelled dialog', () => {
    const { header, burger, sheet } = renderLayout();
    expect(document.body.classList.contains('lock-scroll')).toBe(false);

    fireEvent.click(burger());
    expect(document.body.classList.contains('lock-scroll')).toBe(true);
    expect(header.classList.contains('menu-open')).toBe(true);
    expect(sheet().getAttribute('role')).toBe('dialog');
    expect(sheet().getAttribute('aria-modal')).toBe('true');
    expect(sheet().getAttribute('aria-label')).toBeTruthy();
    expect(burger().getAttribute('aria-expanded')).toBe('true');
    expect(sheet().contains(document.activeElement)).toBe(true);

    fireEvent.click(burger());
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
    expect(header.classList.contains('menu-open')).toBe(false);
  });

  it('holds the four links and both pills', () => {
    const { sheet, byName } = renderLayout();
    expect(byName(sheet(), /^features$/i)).toHaveLength(1);
    expect(byName(sheet(), /try the demo/i)).toHaveLength(1);
    expect(byName(sheet(), /chat on whatsapp/i)).toHaveLength(1);
  });

  it('closes on Escape and hands focus back to the burger', () => {
    const { header, burger } = renderLayout();
    fireEvent.click(burger());
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(header.classList.contains('menu-open')).toBe(false);
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
    expect(document.activeElement).toBe(burger());
  });

  it('closes the sheet before opening the modal, not behind it', () => {
    const { container, header, burger, sheet, byName } = renderLayout();
    fireEvent.click(burger());
    fireEvent.click(byName(sheet(), /try the demo/i)[0]);
    expect(header.classList.contains('menu-open')).toBe(false);
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
    expect(container.textContent).toMatch(/open the live demo/i);
  });

  // Back and forward are not link clicks, so a per-link closer never runs.
  it('closes on a route change that did not come from one of its links', () => {
    const { header, burger, go } = renderLayout();
    fireEvent.click(burger());
    act(() => go('/partners'));
    expect(header.classList.contains('menu-open')).toBe(false);
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
  });
});

describe('footer', () => {
  it('renders every footerColumns heading and link', () => {
    const footer = renderLayout().footer();
    const cols = [...footer.querySelectorAll('ul.ui-footer-col')];
    expect(cols).toHaveLength(footerColumns.length);
    expect([...footer.querySelectorAll('.ui-footer-title')].map((t) => t.textContent)).toEqual(
      footerColumns.map((c) => c.title)
    );
    footerColumns.forEach((col, i) => {
      const anchors = [...cols[i].querySelectorAll('a')];
      expect(anchors.map((a) => a.textContent)).toEqual(col.links.map((l) => l.label));
      col.links.forEach((link, j) => {
        const href = anchors[j].getAttribute('href');
        if (link.page) expect(href).toBe(`/${link.page}`);
        else if (link.href.startsWith('#')) expect(href).toBe(`/${link.href}`);
        else expect(href).toBe(link.href);
      });
    });
  });

  it('carries the connector download and nothing else as a download', () => {
    const downloads = [...renderLayout().footer().querySelectorAll('a[download]')];
    expect(downloads).toHaveLength(1);
    expect(downloads[0].getAttribute('href')).toMatch(/\.exe$/);
  });

  it('carries the phone and email from contactInfo as tel: and mailto: links', () => {
    const footer = renderLayout().footer();
    const tel = footer.querySelector('a[href^="tel:"]');
    expect(tel.getAttribute('href')).toBe(`tel:${contactInfo.phone.replace(/\s/g, '')}`);
    expect(tel.textContent).toBe(contactInfo.phone);
    const mail = [...footer.querySelectorAll('a[href^="mailto:"]')].find(
      (a) => a.textContent === contactInfo.email
    );
    expect(mail.getAttribute('href')).toBe(`mailto:${contactInfo.email}`);
  });

  it('prints the current year and the one legal name', () => {
    const footer = renderLayout().footer();
    expect(footer.textContent).toContain(`© ${new Date().getFullYear()} ${contactInfo.company}`);
    expect(contactInfo.company).toBe('Pay Saathi Innovation LLP');
  });

  it('sets no inline style anywhere in the footer', () => {
    expect(renderLayout().footer().querySelectorAll('[style]')).toHaveLength(0);
  });
});

// A hash jump moves the whole page, which is the largest motion the site makes.
describe('hash scrolling answers the motion preference', () => {
  const scrollIntoView = vi.fn();
  const realScrollIntoView = Element.prototype.scrollIntoView;
  const realMatchMedia = window.matchMedia;

  beforeEach(() => {
    scrollIntoView.mockClear();
    Element.prototype.scrollIntoView = scrollIntoView;
  });
  afterEach(() => {
    Element.prototype.scrollIntoView = realScrollIntoView;
    window.matchMedia = realMatchMedia;
  });

  const renderAtHash = () => renderLayout('/#pricing', <div id="pricing">prices</div>);

  it('glides to the anchor by default', () => {
    renderAtHash();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('cuts straight there when the visitor asked for less motion', () => {
    window.matchMedia = vi.fn((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addListener() {},
      removeListener() {},
      addEventListener() {},
      removeEventListener() {},
    }));
    renderAtHash();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'auto', block: 'start' });
  });

  it('still scrolls when matchMedia is missing entirely', () => {
    delete window.matchMedia;
    renderAtHash();
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });
});
