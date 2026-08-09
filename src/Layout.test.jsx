import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

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
