import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Render Head children inline so JSON-LD can be asserted synchronously,
// mirroring tally-on-mobile.test.jsx.
vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import { appLinks, testimonials, trustSection } from '../../data/siteContent';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

// CLAUDE.md §12 banned tokens for new copy.
const BANNED_TOKENS = [
  'seamless',
  'world-class',
  'enterprise-grade',
  'revolutionary',
  'unleash',
  'game-changer',
  'bank-grade',
];

// DemoTryCTA calls usePhoneModal(), which throws by design outside a
// provider -- and it throws BEFORE the `if (!demoEntryLive)` early return,
// so this render goes red at either flag value without the wrapper.
function renderHome() {
  return render(
    <MemoryRouter>
      <PhoneModalProvider>
        <Home />
      </PhoneModalProvider>
    </MemoryRouter>
  );
}

describe('proof strip (the testimonial moved ahead of pricing, 2026-08-06)', () => {
  it('shows the lead quote, name, and role verbatim', () => {
    const { container } = renderHome();
    const section = container.querySelector('#testimonial');
    expect(section).not.toBeNull();
    expect(section.textContent).toContain(testimonials[0].quote);
    expect(section.textContent).toContain(testimonials[0].name);
    expect(section.textContent).toContain(testimonials[0].role);
  });

  it('renders proof and the differentiator band before the pricing table (R3/R4)', () => {
    const { container } = renderHome();
    const ids = [...container.querySelectorAll('section[id]')].map((s) => s.id);
    expect(ids.indexOf('testimonial')).toBeGreaterThan(-1);
    expect(ids.indexOf('why-takkada')).toBeGreaterThan(-1);
    expect(ids.indexOf('testimonial')).toBeLessThan(ids.indexOf('pricing'));
    expect(ids.indexOf('why-takkada')).toBeLessThan(ids.indexOf('pricing'));
  });

  it('never renders placeholder copy (real quotes only)', () => {
    const { container } = renderHome();
    expect(container.textContent).not.toContain('PLACEHOLDER');
    expect(container.textContent).not.toContain('Placeholder');
  });
});

describe('data-safety trust section', () => {
  it('renders the section with every trust point', () => {
    const { container } = renderHome();
    const section = container.querySelector('#data-safety');
    expect(section).not.toBeNull();
    expect(section.textContent).toContain(trustSection.heading);
    for (const point of trustSection.points) {
      expect(section.textContent).toContain(point.title);
      expect(section.textContent).toContain(point.body);
    }
  });

  it('links the real store listings with noopener', () => {
    const { container } = renderHome();
    const section = container.querySelector('#data-safety');
    const links = [...section.querySelectorAll('.trust-store-links a')];
    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(hrefs).toContain(appLinks.playStore);
    expect(hrefs).toContain(appLinks.appStore);
    for (const a of links) {
      expect(a.getAttribute('rel')).toContain('noopener');
    }
  });

  it('links the safety explainer article', () => {
    const { container } = renderHome();
    const article = container.querySelector('#data-safety .trust-article-link a');
    expect(article?.getAttribute('href')).toBe('/blog/is-it-safe-to-connect-app-to-tally/');
  });

  it('contains no banned superlatives in the trust copy', () => {
    const copy = JSON.stringify(trustSection).toLowerCase();
    for (const token of BANNED_TOKENS) {
      expect(copy).not.toContain(token);
    }
  });
});
