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

  it('shows every add-on inside the table, not as a block below it', () => {
    const container = renderHome();
    const addons = container.querySelector('.rate-addons');
    expect(addons).toBeTruthy();
    for (const addon of pricing.addons) {
      expect(addons.textContent).toContain(addon.label);
      expect(addons.textContent).toContain(addon.note);
    }
  });

  it('lists every module as an add-on with no price — partners quote them (ruled 2026-10-04)', () => {
    const container = renderHome();
    expect(pricing.addons.map((a) => a.label)).toEqual([
      'FMCG billing', 'Auto parts billing', 'Schemes', 'Ladder discount', 'Recovery dashboard',
      'Customer order link', 'Personal party links', 'AI calling', 'Your own WhatsApp number',
      'WhatsApp 8,000-message pack', 'Payment Collection', 'Extra user',
    ]);
    expect(container.querySelector('.rate-addons').textContent).not.toMatch(/₹/);
    expect(screen.getAllByText('Ask your partner for pricing').length).toBeGreaterThan(0);
    const cta = container.querySelector('.rate-addons a[href*="wa.me"]');
    expect(cta, 'the add-on strip has no contact CTA').toBeTruthy();
  });

  it('never claims Enterprise carries every module (final review 2026-10-04)', () => {
    // Enterprise leaves out Payment Collection, the own WhatsApp number, the
    // message pack, extra users and two of the three billing engines, so
    // "every module" and "Add to any plan" (AI calling is included in
    // Enterprise) overstate it.
    const container = renderHome();
    expect(container.textContent).not.toMatch(/every module|all modules/i);
    expect(container.querySelector('.rate-addons-title').textContent).toBe('Add-ons');
    expect(pricing.matrix.map((g) => g.group)).toContain('Modules switched on');
    expect(pricing.plans.find((p) => p.plan === 'Enterprise').description).toMatch(
      /one billing engine/
    );
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
    expect(pricing.plans).toHaveLength(4);
    expect(container.querySelectorAll('.rate-plan--hero')).toHaveLength(1);
    expect(container.querySelector('.rate-plan--hero').textContent).toContain('Copilot');
    const enterprise = pricing.plans.find((p) => p.plan === 'Enterprise');
    expect(enterprise).toMatchObject({ annualPrice: 24000, badge: 'Most complete' });
    expect(enterprise.highlighted).toBeFalsy();
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
    expect(pricing.matrix).toHaveLength(5);
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
