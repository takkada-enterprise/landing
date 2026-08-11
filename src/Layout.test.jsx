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
