import { describe, expect, it } from 'vitest';

import snapshot from './rateCardSnapshot.json' with { type: 'json' };
import { PRICING_TERMS, planPricing, pricing } from './siteContent.js';

// The 3-year term is DERIVED on both surfaces from the same 25% constant —
// the dashboard's lib/rate-card/catalog.ts pins the same figures from its
// side (full_access 8500 → ₹6,375/year, ₹19,125 billed once). If either
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
    expect(quote.perYear).toBe(8500 * (1 - snapshot.termDiscount));
    expect(quote.perYear).toBe(6375);
    expect(quote.total).toBe(19125);
  });
});
