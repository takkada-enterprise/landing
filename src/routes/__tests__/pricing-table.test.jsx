import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import {
  pricing,
  planPricing,
  planPriceRange,
  formatInr,
  biggerSetups,
} from '../../data/siteContent';
import { WHATSAPP_MESSAGES } from '../../lib/whatsapp';
import { PhoneModalProvider } from '../../context/PhoneModalContext';

afterEach(cleanup);

// DemoTryCTA calls usePhoneModal(), which throws by design outside a
// provider -- and it throws BEFORE the `if (!demoEntryLive)` early return,
// so this render goes red at either flag value without the wrapper.
function renderHome() {
  const { container } = render(
    <MemoryRouter>
      <PhoneModalProvider>
        <Home />
      </PhoneModalProvider>
    </MemoryRouter>
  );
  return container;
}

const ROWS = pricing.matrix.flatMap((g) => g.rows);

describe('pricing comparison table', () => {
  it('renders one cell per plan per capability row', () => {
    const container = renderHome();
    expect(container.querySelectorAll('.rate-cell')).toHaveLength(
      ROWS.length * pricing.plans.length
    );
  });

  it('tags every column cell with its plan index', () => {
    // The narrow-viewport picker hides columns purely in CSS, keyed on these
    // `rate-col--N` classes. A template literal once emitted the pre-rename
    // `pricing-col--N` here, which silently left mobile with no visible plan
    // and no ticks, so the index class is pinned by test.
    const container = renderHome();
    for (let i = 0; i < pricing.plans.length; i += 1) {
      const cells = container.querySelectorAll(`.rate-cell.rate-col--${i}`);
      expect(cells, `no cells tagged for plan index ${i}`).toHaveLength(ROWS.length);
    }
    expect(container.querySelectorAll('[class*="pricing-col--"]')).toHaveLength(0);
  });

  it('fills ticks rightward from each row\'s first plan, so the ladder is cumulative', () => {
    const container = renderHome();
    for (let i = 0; i < pricing.plans.length; i += 1) {
      const expected = ROWS.filter((r) => r.from <= i).length;
      const ticks = container.querySelectorAll(`.rate-cell.rate-col--${i} .rate-tick`);
      expect(ticks, `wrong tick count for ${pricing.plans[i].plan}`).toHaveLength(expected);
    }
  });

  it('gives the top plan every capability and the entry plan strictly fewer', () => {
    const container = renderHome();
    const top = pricing.plans.length - 1;
    expect(container.querySelectorAll(`.rate-cell.rate-col--${top} .rate-tick`)).toHaveLength(
      ROWS.length
    );
    expect(
      container.querySelectorAll('.rate-cell.rate-col--0 .rate-tick').length
    ).toBeLessThan(ROWS.length);
  });

  it('opens on the discounted 3-year term', () => {
    const container = renderHome();
    const text = container.textContent;
    for (const plan of pricing.plans) {
      expect(text).toContain(planPricing(plan, '3y').price);
    }
  });

  it('does not render the multiple add-on strip in the pricing table', () => {
    const container = renderHome();
    const addons = container.querySelector('.rate-addons');
    expect(addons).toBeNull();
  });

  it('renders a banner below the table linking to Customised ERP', () => {
    const container = renderHome();
    const banner = container.querySelector('.rate-custom-erp-banner');
    expect(banner).toBeTruthy();
    expect(banner.textContent).toContain('For Customised ERP, follow the link');
    const link = banner.querySelector('a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/customised-erp/');
  });

  it('no longer offers Enterprise plan in the pricing ladder', () => {
    renderHome();
    expect(pricing.plans.map((p) => p.plan)).not.toContain('Enterprise');
  });

  it('no longer offers Clarity anywhere on the page', () => {
    renderHome();
    expect(pricing.plans.map((p) => p.plan)).not.toContain('Clarity');
    expect(document.body.textContent).not.toContain('2,900');
  });

  it('no longer sells an "Extra device" price anywhere on the page', () => {
    // Removed 2026-08-12: nothing in the product or the partner rate card
    // sells per-device pricing — the pill was drift, not an offer.
    const container = renderHome();
    // Case-insensitive on purpose: the FAQ once carried a lowercase
    // "extra device" price sentence that a .toContain('Extra device')
    // assertion sailed past.
    expect(container.textContent).not.toMatch(/extra device/i);
    expect(pricing.addons.map((a) => a.label)).not.toContain('Extra device');
  });

  it('derives the headline price range from the plan list, never a typed string', () => {
    const container = renderHome();
    const heading = container.querySelector('.rate-title');
    expect(heading).toBeTruthy();
    const min = Math.min(...pricing.plans.map((p) => p.annualPrice));
    const max = Math.max(...pricing.plans.map((p) => p.annualPrice));
    expect(planPriceRange()).toBe(`${formatInr(min)} to ${formatInr(max)}`);
    expect(heading.textContent).toContain(planPriceRange());
  });

  it('marks exactly one plan as the highlighted column', () => {
    const container = renderHome();
    expect(pricing.plans).toHaveLength(3);
    expect(container.querySelectorAll('.rate-plan--hero')).toHaveLength(1);
    expect(container.querySelector('.rate-plan--hero').textContent).toContain('Copilot');
    const copilot = pricing.plans.find((p) => p.plan === 'Copilot');
    expect(copilot).toMatchObject({ annualPrice: 9000, badge: 'Most Popular' });
    expect(copilot.highlighted).toBe(true);
    // Below 900px the picker opens on the highlighted plan, not the last one.
    expect(container.querySelector('.rate-table').getAttribute('data-active-plan')).toBe(
      String(pricing.plans.findIndex((p) => p.highlighted))
    );
    expect(container.querySelectorAll('.rate-cell--hero')).toHaveLength(ROWS.length);
  });

  it('labels both controls for assistive tech', () => {
    const container = renderHome();
    expect(container.querySelectorAll('.rate-term-option[aria-pressed]')).toHaveLength(
      pricing.terms.length
    );
    expect(container.querySelectorAll('.rate-picker-option[aria-pressed]')).toHaveLength(
      pricing.plans.length
    );
  });
});

describe('customised ERP pathway', () => {
  it('omits bigger setups card block from the homepage pricing table', () => {
    const container = renderHome();
    expect(container.querySelector('.rate-bigger')).toBeNull();
  });

  it('routes custom ERP interest to /customised-erp', () => {
    const container = renderHome();
    const link = container.querySelector('.rate-custom-erp-banner a');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/customised-erp/');
  });
});
