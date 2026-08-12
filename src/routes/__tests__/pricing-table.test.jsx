import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
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

  it('shows every add-on inside the table, not as a block below it', () => {
    const container = renderHome();
    const addons = container.querySelector('.rate-addons');
    expect(addons).toBeTruthy();
    for (const addon of pricing.addons) {
      expect(addons.textContent).toContain(addon.label);
      expect(addons.textContent).toContain(addon.price);
    }
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
    expect(pricing.addons).toHaveLength(5);
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

// The self-hosting and multi-company lines are quoted per business, not per
// user, so they close the table as their own block instead of becoming a
// fifth plan column or a capability row. These guards pin that placement and
// pin both figures to formatInr, because the deck (slide 13) and the site
// have to keep saying the same number to the same prospect.
describe('bigger setups block', () => {
  it('renders inside the rate table, after the add-on strip', () => {
    const container = renderHome();
    const table = container.querySelector('.rate-table');
    const bigger = container.querySelector('.rate-bigger');
    expect(bigger, 'the bigger-setups block is missing').toBeTruthy();
    expect(table.contains(bigger), 'the block orphaned below the table').toBe(true);

    const addons = container.querySelector('.rate-addons');
    expect(
      addons.compareDocumentPosition(bigger) & Node.DOCUMENT_POSITION_FOLLOWING,
      'the block must come after the add-on strip'
    ).toBeTruthy();
  });

  it('carries both self-hosting figures, derived rather than typed', () => {
    const container = renderHome();
    const card = [...container.querySelectorAll('.rate-bigger-card')].find((el) =>
      /own server/i.test(el.textContent)
    );
    expect(card, 'no self-hosting card rendered').toBeTruthy();
    // Recomputed here, so a hand-typed rupee string in the component or the
    // data entry fails this instead of drifting silently from the deck.
    expect(card.textContent).toContain(formatInr(30000));
    expect(card.textContent).toContain(formatInr(15000));
    expect(card.textContent).toMatch(/one-time implementation/i);
    expect(card.textContent).toMatch(/from the second year/i);
  });

  it('sets every rupee figure in tabular figures', () => {
    const container = renderHome();
    const amounts = [...container.querySelectorAll('.rate-bigger-amount')];
    expect(amounts.length).toBeGreaterThan(0);
    for (const el of amounts) {
      if (!el.textContent.includes('₹')) continue;
      expect(
        el.classList.contains('tabular-nums'),
        `"${el.textContent}" is not in tabular figures`
      ).toBe(true);
    }
    // Every ₹ figure in the block lives in an amount span. A figure written
    // into the prose would escape the tabular-nums check above.
    const prose = [...container.querySelectorAll('.rate-bigger-card-body, .rate-bigger-note')];
    for (const el of prose) {
      expect(el.textContent, 'a rupee figure escaped into the prose').not.toContain('₹');
    }
  });

  it('quotes the multi-company line without a rupee figure', () => {
    const container = renderHome();
    const card = [...container.querySelectorAll('.rate-bigger-card')].find((el) =>
      /across companies/i.test(el.textContent)
    );
    expect(card, 'no multi-company card rendered').toBeTruthy();
    expect(card.textContent).toContain('Custom pricing');
    expect(card.textContent).not.toContain('₹');
  });

  it('did not become a plan column or a capability row', () => {
    expect(pricing.plans).toHaveLength(4);
    expect(pricing.matrix).toHaveLength(4);
    const labels = [
      ...pricing.plans.map((p) => p.plan),
      ...pricing.matrix.flatMap((g) => [g.group, ...g.rows.map((r) => r.label)]),
      ...pricing.addons.map((a) => a.label),
    ].join(' | ');
    expect(labels).not.toMatch(/self-host|own server|consolidated report/i);
  });

  it('sends the block CTA to its own WhatsApp context', () => {
    const container = renderHome();
    const cta = container.querySelector('.rate-bigger-foot a[href*="wa.me"]');
    expect(cta, 'the block has no WhatsApp CTA').toBeTruthy();
    expect(cta.getAttribute('href')).toContain(
      encodeURIComponent(WHATSAPP_MESSAGES['bigger-setups'])
    );
    expect(cta.getAttribute('href')).not.toContain(
      encodeURIComponent(WHATSAPP_MESSAGES.pricing)
    );
  });

  it('prices the Customer Order Link add-on from a number, not a typed string', () => {
    // Operator-set 2026-08-11. Recomputed here so a hand-edited figure in the
    // data file fails instead of quietly disagreeing with CLAUDE.md §3.
    const container = renderHome();
    const addon = pricing.addons.find((a) => a.label === 'Customer Order Link');
    expect(addon, 'the Customer Order Link add-on is missing').toBeTruthy();
    expect(addon.price).toBe(`${formatInr(3999)} / year`);

    const strip = container.querySelector('.rate-addons');
    expect(strip.textContent).toContain('Customer Order Link');
    expect(strip.textContent).toContain(formatInr(3999));

    // It is an add-on, never a plan column or a capability row.
    const rows = [
      ...pricing.plans.map((p) => p.plan),
      ...pricing.matrix.flatMap((g) => [g.group, ...g.rows.map((r) => r.label)]),
    ].join(' | ');
    expect(rows).not.toMatch(/order link/i);
  });

  it('keeps adoption language away from an option nobody has taken yet', () => {
    // Zero delivered self-hosted deployments as of 2026-08-11. A capability
    // claim is allowed here; a usage claim is not (CLAUDE.md §3, §5).
    const text = [
      biggerSetups.note,
      ...biggerSetups.items.flatMap((i) => [i.title, i.body]),
    ].join(' ');
    expect(text).not.toMatch(/customers (run|use|host)|used by|trusted by|\d+\s*(businesses|companies) (run|use)/i);
  });
});
