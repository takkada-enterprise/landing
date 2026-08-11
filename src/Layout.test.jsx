import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

// Passthrough Head so global + page JSON-LD render inline into the container.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Layout from './Layout';
import Home from './routes/Home';
import { navLinks } from './data/siteContent';
import { FEATURE_PAGES, featurePagePath } from './data/featurePages';
import { leadFeaturePages } from './data/featureGroups';

afterEach(cleanup);

function renderWith(child) {
  const { container } = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={child} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
  return [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
}

const countType = (schemas, type) => schemas.filter((s) => s['@type'] === type).length;

describe('Layout global entity', () => {
  it('emits exactly one Organization and one WebSite node on a minimal route', () => {
    const schemas = renderWith(<div>minimal</div>);
    expect(countType(schemas, 'Organization')).toBe(1);
    expect(countType(schemas, 'WebSite')).toBe(1);
  });

  it('cross-links the WebSite publisher to the Organization @id', () => {
    const schemas = renderWith(<div>minimal</div>);
    const org = schemas.find((s) => s['@type'] === 'Organization');
    const site = schemas.find((s) => s['@type'] === 'WebSite');
    expect(site.publisher).toEqual({ '@id': org['@id'] });
  });

  it('does not duplicate Organization when the page also sets schema', () => {
    const schemas = renderWith(<Home />);
    // Home contributes SoftwareApplication + FAQPage; the Organization stays
    // single (global only) and WebSite stays single.
    expect(countType(schemas, 'Organization')).toBe(1);
    expect(countType(schemas, 'WebSite')).toBe(1);
    expect(countType(schemas, 'SoftwareApplication')).toBe(1);
    expect(countType(schemas, 'FAQPage')).toBe(1);
  });
});

describe('brand logo assets', () => {
  function renderLayout() {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    return container;
  }

  // The nav and footer logos render at ~107x38 and ~118x42 but were served the
  // 1172px, 133KB source PNG on every page, starving the hero image of the
  // throttled mobile pipe. They must stay on the 10KB WebP.
  it('serves the nav and footer logos as the small WebP, never the source PNG', () => {
    const logos = [...renderLayout().querySelectorAll('img[alt="Takkada"]')];
    expect(logos).toHaveLength(2);
    for (const img of logos) {
      expect(img.getAttribute('src')).toBe('/assets/screenshots/takkada-logo.webp');
    }
  });

  it('gives every logo an intrinsic width and height so its box is reserved', () => {
    const logos = [...renderLayout().querySelectorAll('img[alt="Takkada"]')];
    for (const img of logos) {
      expect(Number(img.getAttribute('width'))).toBeGreaterThan(0);
      expect(Number(img.getAttribute('height'))).toBeGreaterThan(0);
    }
  });

  it('keeps the logo aspect ratio the source image actually has', () => {
    // 1172x417 source. A wrong ratio here would squash the wordmark.
    const sourceRatio = 1172 / 417;
    for (const img of [...renderLayout().querySelectorAll('img[alt="Takkada"]')]) {
      const ratio = Number(img.getAttribute('width')) / Number(img.getAttribute('height'));
      expect(Math.abs(ratio - sourceRatio)).toBeLessThan(0.1);
    }
  });
});

// The nav "Features" slot used to scroll to the homepage #features section.
// Repointed to /features (the hub) so the 26 feature landing pages have a
// crawlable parent in the top menu instead of footer links alone. The homepage
// section still exists; it just no longer owns the menu slot.
describe('Features nav slot', () => {
  function renderLayout(at = '/') {
    const { container } = render(
      <MemoryRouter initialEntries={[at]}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
            <Route path="blog" element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    return container;
  }

  const featuresLinkIn = (container, selector) =>
    [...container.querySelectorAll(`${selector} a`)].find((a) => a.textContent === 'Features');

  it('renders Features as a link to /features in the desktop nav', () => {
    const link = featuresLinkIn(renderLayout(), '.nav-links');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/features');
  });

  it('renders the same link in the mobile menu', () => {
    const link = featuresLinkIn(renderLayout(), '.mobile-nav-links');
    expect(link).toBeDefined();
    expect(link.getAttribute('href')).toBe('/features');
  });

  it('reaches the hub from a non-home route too, not just the homepage', () => {
    const link = featuresLinkIn(renderLayout('/blog'), '.nav-links');
    expect(link.getAttribute('href')).toBe('/features');
  });

  it('leaves no navLinks entry pointing at a hash anchor named features', () => {
    const hashed = navLinks.filter((l) => l.href === '#features');
    expect(hashed).toEqual([]);
  });

  it('gives the footer Features column a way up to the hub', () => {
    const hrefs = [...renderLayout().querySelectorAll('.footer-col-links a')].map((a) =>
      a.getAttribute('href')
    );
    expect(hrefs).toContain('/features');
  });
});

// The header used to answer "what does this thing do?" with a "Product" item
// that scrolled to a homepage section — so from any other page it was a link
// home wearing the wrong label. It now answers with the features themselves.
describe('Features disclosure in the desktop header', () => {
  function renderLayout(at = '/blog') {
    const { container } = render(
      <MemoryRouter initialEntries={[at]}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
            <Route path="blog" element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    return {
      container,
      panel: () => container.querySelector('.nav-features-panel'),
      toggle: () => container.querySelector('.nav-features-toggle'),
      panelLinks: () =>
        [...container.querySelectorAll('.nav-features-panel a')].map((a) => a.getAttribute('href')),
    };
  }

  it('lists exactly the lead features plus a way to the hub', () => {
    const { panelLinks } = renderLayout();
    // Derived from the same export the hub and the footer read. A lead-list
    // edit must move all three together or none.
    expect(panelLinks()).toEqual([
      ...leadFeaturePages(FEATURE_PAGES).map(featurePagePath),
      '/features',
    ]);
  });

  // Reachable from any page without navigating away first — the whole point of
  // putting it in the header rather than only on the hub.
  it('carries the same links on a page that is not the homepage', () => {
    expect(renderLayout('/blog').panelLinks().length).toBe(
      leadFeaturePages(FEATURE_PAGES).length + 1
    );
  });

  it('starts closed, inert, and out of the tab order', () => {
    const { panel, toggle } = renderLayout();
    expect(panel().hasAttribute('inert')).toBe(true);
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(toggle().getAttribute('aria-controls')).toBe(panel().id);
  });

  it('opens on the chevron and tracks state on aria-expanded', () => {
    const { panel, toggle } = renderLayout();
    fireEvent.click(toggle());
    expect(panel().hasAttribute('inert')).toBe(false);
    expect(toggle().getAttribute('aria-expanded')).toBe('true');
  });

  it('closes on Escape and hands focus back to the chevron', () => {
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

  it('keeps Features a link to the hub, so touch and crawlers can still reach it', () => {
    const { container } = renderLayout();
    const link = container.querySelector('.nav-features-link');
    expect(link.getAttribute('href')).toBe('/features');
    expect(link.textContent).toBe('Features');
  });

  // The panel's links must never satisfy the hub's coverage guard: it counts
  // anchors carrying features-hub-card in raw HTML, and these are in raw HTML
  // on every page of the site.
  it('gives no panel link the hub card class', () => {
    const { container } = renderLayout();
    expect(container.querySelectorAll('.nav-features-panel a.features-hub-card')).toHaveLength(0);
  });
});

describe('header top level', () => {
  function renderLayout() {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    return container;
  }

  it('no longer offers Product as a top-level item', () => {
    expect(navLinks.filter((l) => l.href === '#product')).toEqual([]);
    expect(navLinks.map((l) => l.label)).not.toContain('Product');
  });

  it('leaves #pricing as the only homepage anchor in the top level', () => {
    // Documented exception: no standalone pricing page exists to point at.
    expect(navLinks.filter((l) => l.href.startsWith('#')).map((l) => l.href)).toEqual(['#pricing']);
  });

  // A Windows installer sitting beside "Book a Demo" read as a peer of it to
  // someone who had never heard of Takkada. It lives in the footer and the
  // mobile menu now, where the people who want it look.
  it('presents two primary actions and no download in the button row', () => {
    const actions = renderLayout().querySelector('.nav-actions');
    expect(actions.children).toHaveLength(2);
    expect(actions.querySelectorAll('[download]')).toHaveLength(0);
  });

  it('keeps the connector reachable from the mobile menu', () => {
    const mobile = renderLayout().querySelector('.mobile-nav-links');
    expect(mobile.querySelectorAll('a[download]').length).toBeGreaterThan(0);
  });

  // The data side of this is pinned in feature-pages.test.js; what is checked
  // here is that SiteFooter's plain-anchor branch passes the flag through at
  // all, and that it does not hand one to the mailto and social links that
  // share the branch.
  it('renders the footer connector as a download and nothing else in the footer', () => {
    const footer = renderLayout().querySelector('.footer');
    const downloads = [...footer.querySelectorAll('a[download]')];
    expect(downloads).toHaveLength(1);
    expect(downloads[0].getAttribute('href')).toMatch(/\.exe$/);
  });
});

// The open menu read as a rendering bug on a phone: page text showed straight
// through it. The paint half of that fix is CSS (the surface no longer fades),
// which jsdom cannot see, so what is asserted here is the contract the CSS and
// the assistive-technology tree both hang off: the open/inert/dialog state, and
// the navigation paths that must put the menu back.
describe('mobile menu overlay', () => {
  function renderLayout() {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
            <Route path="partners" element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    return {
      container,
      overlay: () => container.querySelector('.mobile-overlay'),
      toggle: () => container.querySelector('.mobile-menu-btn'),
    };
  }

  it('starts closed, inert, and out of the accessibility tree', () => {
    const { overlay, toggle } = renderLayout();
    expect(overlay().className).not.toContain('open');
    // The overlay is fixed at inset 0 on every viewport and is never
    // unmounted, so a closed menu that is merely transparent leaves its links
    // tabbable on desktop, where the menu cannot even be opened.
    expect(overlay().hasAttribute('inert')).toBe(true);
    expect(overlay().getAttribute('role')).toBeNull();
    expect(toggle().getAttribute('aria-expanded')).toBe('false');
    expect(toggle().getAttribute('aria-controls')).toBe(overlay().id);
  });

  it('opens as a labelled modal dialog with focus inside it', () => {
    const { overlay, toggle } = renderLayout();
    fireEvent.click(toggle());

    expect(overlay().className).toContain('open');
    expect(overlay().hasAttribute('inert')).toBe(false);
    expect(overlay().getAttribute('role')).toBe('dialog');
    expect(overlay().getAttribute('aria-modal')).toBe('true');
    expect(overlay().getAttribute('aria-label')).toBeTruthy();
    expect(toggle().getAttribute('aria-expanded')).toBe('true');
    expect(overlay().contains(document.activeElement)).toBe(true);
  });

  it('closes on Escape and hands focus back to the toggle', () => {
    const { overlay, toggle } = renderLayout();
    fireEvent.click(toggle());
    fireEvent.keyDown(window, { key: 'Escape' });

    expect(overlay().className).not.toContain('open');
    expect(overlay().hasAttribute('inert')).toBe(true);
    expect(document.activeElement).toBe(toggle());
  });

  it('locks body scroll only while the menu is open', () => {
    const { toggle } = renderLayout();
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
    fireEvent.click(toggle());
    expect(document.body.classList.contains('lock-scroll')).toBe(true);
    fireEvent.click(toggle());
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
  });

  // Back and forward are not link clicks, so the per-link closers never ran for
  // them: the overlay stayed open over the new page with the body still
  // scroll-locked, and nothing on screen said why.
  it('closes on a route change that did not come from one of its links', () => {
    let go;
    function Probe() {
      go = useNavigate();
      return null;
    }
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Probe />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<div />} />
            <Route path="partners" element={<div />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    const overlay = () => container.querySelector('.mobile-overlay');
    fireEvent.click(container.querySelector('.mobile-menu-btn'));
    expect(overlay().className).toContain('open');

    act(() => go('/partners'));

    expect(overlay().className).not.toContain('open');
    expect(document.body.classList.contains('lock-scroll')).toBe(false);
  });
});
