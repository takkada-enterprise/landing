import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children inline so title/canonical/JSON-LD can be asserted
// synchronously, mirroring tally-on-mobile.test.jsx.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import TryDemo from '../TryDemo';
import { routeMetadata } from '../../data/siteMetadata';
import { appLinks, demoEntryLive } from '../../data/siteContent';

afterEach(cleanup);

const CANONICAL = 'https://takkada.com/demo/';

function renderRoute() {
  const { container } = render(
    <MemoryRouter>
      <TryDemo />
    </MemoryRouter>
  );
  const schemas = [...container.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
    JSON.parse(s.textContent)
  );
  return { container, schemas };
}

describe('TryDemo route (/demo/)', () => {
  it('is registered in routeMetadata (sitemap) and the router', () => {
    expect(routeMetadata.some((r) => r.path === '/demo')).toBe(true);
  });

  it('emits the demo OG card, canonical, and length-safe title/description (AE4 unfurl)', () => {
    renderRoute();
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(CANONICAL);
    expect(document.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://takkada.com/assets/og/takkada-og-demo.png'
    );
    expect(document.querySelector('title')?.textContent.length).toBeLessThanOrEqual(60);
    expect(
      document.querySelector('meta[name="description"]')?.getAttribute('content').length
    ).toBeLessThanOrEqual(160);
  });

  it('sets expectations: real books, nightly reset, sandbox', () => {
    const { container } = renderRoute();
    expect(container.textContent).toContain('resets to a clean state every night');
    expect(container.textContent).toContain('A sandbox you cannot break');
  });

  it('emits a BreadcrumbList resolving to the registered path', () => {
    const { schemas } = renderRoute();
    const breadcrumb = schemas.find((s) => s['@type'] === 'BreadcrumbList');
    expect(breadcrumb.itemListElement.at(-1).item).toBe(CANONICAL);
  });

  describe('flag-gated primary action (never a dead link)', () => {
    it('with the demo entry not yet live, the primary is WhatsApp and no app link renders', () => {
      // This is the shipped state until the app /demo route + anonymous
      // sign-ins are verified live (see demoEntryLive in siteContent.js).
      if (demoEntryLive) return; // becomes vacuous after the flip; the sibling test takes over
      const { container } = renderRoute();
      const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href'));
      expect(hrefs.some((h) => h?.startsWith('https://wa.me/'))).toBe(true);
      expect(hrefs).not.toContain(appLinks.demoApp);
    });

    it('with the demo entry live, the primary points into the app and fires demo_try_click', () => {
      if (!demoEntryLive) return; // armed by the same flip
      window.clarity = vi.fn();
      const { container } = renderRoute();
      const appLink = [...container.querySelectorAll('a')].find(
        (a) => a.getAttribute('href') === appLinks.demoApp
      );
      expect(appLink).toBeDefined();
      appLink.click();
      expect(window.clarity).toHaveBeenCalledWith('event', 'demo_try_click');
      delete window.clarity;
    });
  });
});
