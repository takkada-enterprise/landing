import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import Home from '../Home';
import { pricing, planPricing } from '../../data/siteContent';

afterEach(cleanup);

function renderHome() {
  const { container } = render(
    <MemoryRouter>
      <Home />
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

  it('shows every add-on inside the table, not as a block below it', () => {
    const container = renderHome();
    const addons = container.querySelector('.rate-addons');
    expect(addons).toBeTruthy();
    for (const addon of pricing.addons) {
      expect(addons.textContent).toContain(addon.label);
      expect(addons.textContent).toContain(addon.price);
    }
  });

  it('marks exactly one plan as the highlighted column', () => {
    const container = renderHome();
    expect(container.querySelectorAll('.rate-plan--hero')).toHaveLength(1);
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
