import { describe, expect, it } from 'vitest';

import { snapshot } from '../../scripts/checkRateCardDrift.mjs';
import { PRICING_TERMS, planPricing, pricing } from './siteContent.js';

// The 3-year term is DERIVED on both surfaces from the same 25% constant —
// the dashboard's lib/rate-card/catalog.ts pins the same figures from its
// side (full_access 9000 → ₹6,750/year, ₹20,250 billed once). If either
// constant moves alone, one of the two suites goes red.
describe('rateCardSnapshot term math', () => {
  it('matches the site term table to the snapshot constants', () => {
    const threeYear = PRICING_TERMS.find((t) => t.id === '3y');
    expect(threeYear?.discount).toBe(snapshot.termDiscount);
    expect(threeYear?.years).toBe(snapshot.termYears);
  });

  it('reproduces the cross-repo Copilot figures from the snapshot', () => {
    const copilot = pricing.plans.find(
      (p) => p.plan === snapshot.plans.full_access.publicName,
    );
    const quote = planPricing(copilot, '3y');
    expect(copilot.annualPrice).toBe(snapshot.plans.full_access.annualInr);
    expect(quote.perYear).toBe(9000 * (1 - snapshot.termDiscount));
    expect(quote.perYear).toBe(6750);
    expect(quote.total).toBe(20250);
  });

  it('reproduces the Enterprise figures and keeps Clarity and add-on prices off the site', () => {
    const enterprise = pricing.plans.find(
      (p) => p.plan === snapshot.plans.enterprise.publicName,
    );
    expect(enterprise.annualPrice).toBe(24000);
    const quote = planPricing(enterprise, '3y');
    expect(quote.perYear).toBe(18000);
    expect(quote.total).toBe(54000);
    expect(Object.values(snapshot.plans).map((p) => p.publicName)).not.toContain('Clarity');
    expect(snapshot.addons).toEqual({});
    expect(snapshot.dashboardOnlyKeys).toEqual(
      expect.arrayContaining(['view_only', 'payment_collection', 'customer_order_link']),
    );
  });
});
