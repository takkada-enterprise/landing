import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
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
import { PhoneModalProvider, usePhoneModal } from '../../context/PhoneModalContext';

afterEach(cleanup);

const CANONICAL = 'https://takkada.com/demo/';

// DemoTryCTA calls usePhoneModal(), which throws by design outside a
// provider -- and it throws BEFORE the `if (!demoEntryLive)` early return,
// so this render goes red at either flag value without the wrapper.
// Shows what the phone modal would open with, so a test can see the click land.
function ModalProbe() {
  const { open, options } = usePhoneModal();
  return open ? <output data-testid="phone-modal">{options.destination}</output> : null;
}

function renderRoute() {
  const { container } = render(
    <MemoryRouter>
      <PhoneModalProvider>
        <TryDemo />
        <ModalProbe />
      </PhoneModalProvider>
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

  describe('on the Campfire template', () => {
    it('opens on the dark band whose first pill is the demo action', () => {
      const { container } = renderRoute();
      const hero = container.querySelector('section.ui-band--band');
      expect(hero.querySelector('h1.ui-hero-title')).not.toBeNull();
      const first = hero.querySelector('.ui-pill');
      expect(first.textContent).toMatch(/try the demo/i);
    });

    it('offers both store apps as pills that open in a new tab', () => {
      const { container } = renderRoute();
      for (const href of [appLinks.playStore, appLinks.appStore]) {
        const a = container.querySelector(`a.ui-pill[href="${href}"]`);
        expect(a, href).not.toBeNull();
        expect(a.getAttribute('rel')).toContain('noopener');
      }
    });

    it('holds the demo video in a card', () => {
      const { container } = renderRoute();
      expect(container.querySelector('.ui-card .video-embed')).not.toBeNull();
    });

    it('closes on the dark close band and carries no overline', () => {
      const { container } = renderRoute();
      expect(container.querySelector('.ui-close .ui-pill')).not.toBeNull();
      expect(container.querySelector('[class*="overline"], [class*="section-label"]')).toBeNull();
    });
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

    it('with the demo entry live, the primary opens the capture modal and fires demo_try_click', () => {
      if (!demoEntryLive) return; // armed by the same flip
      window.clarity = vi.fn();
      renderRoute();

      const cta = screen.getAllByRole('button', { name: /try the demo/i })[0];
      expect(cta).toBeDefined();
      fireEvent.click(cta);

      expect(window.clarity).toHaveBeenCalledWith('event', 'demo_try_click');
      expect(screen.getByTestId('phone-modal').textContent).toBe('demo');
      delete window.clarity;
    });

    // Unconditional on purpose. The flag pair above makes exactly one branch
    // run, so neither can hold a property that must be true at BOTH values.
    // An href into the app would let a middle-click or a copied link reach the
    // demo with no lead captured, which is the whole point of the modal.
    it('never renders an outbound app anchor, at either flag value', () => {
      const { container } = renderRoute();
      const hrefs = [...container.querySelectorAll('a')].map((a) => a.getAttribute('href') ?? '');
      expect(hrefs.filter((h) => h.includes('app.takkada.com'))).toEqual([]);
      expect(hrefs).not.toContain(appLinks.demoApp);
    });
  });
});
