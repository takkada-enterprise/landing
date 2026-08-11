import { describe, expect, it } from 'vitest';

import {
  allowedFigures,
  extractFigures,
  inspectData,
  inspectPage,
} from './checkRateCardDrift.mjs';
import snapshot from '../src/data/rateCardSnapshot.json' with { type: 'json' };
import { pricing } from '../src/data/siteContent.js';

// Each case is a way the two surfaces can drift; each must stay red. The
// guard was written failure-first (repo lesson: a guard that cannot fail
// reads as coverage).

const clone = (v) => JSON.parse(JSON.stringify(v));

describe('checkRateCardDrift — data layer (AE2/AE3)', () => {
  it('passes on the live site data against the live snapshot', () => {
    expect(inspectData(pricing, snapshot)).toEqual([]);
  });

  it('fails when a snapshot price is altered (AE2)', () => {
    const drifted = clone(snapshot);
    drifted.plans.full_access.annualInr = 8499;
    const problems = inspectData(pricing, drifted);
    expect(problems.some((p) => p.includes('Copilot'))).toBe(true);
  });

  it('fails when the site gains a priced pill the snapshot lacks (AE3 — absence is failure)', () => {
    const sitePricing = clone(pricing);
    sitePricing.addons.push({ label: 'Extra device', price: '₹3,000 / device / year' });
    const problems = inspectData(sitePricing, snapshot);
    expect(problems.some((p) => p.includes('Extra device'))).toBe(true);
  });

  it('fails when the site drops an offer the snapshot still carries', () => {
    const sitePricing = clone(pricing);
    sitePricing.addons = sitePricing.addons.filter((a) => a.label !== 'Customer Order Link');
    const problems = inspectData(sitePricing, snapshot);
    expect(problems.some((p) => p.includes('Customer Order Link'))).toBe(true);
  });
});

describe('checkRateCardDrift — rendered-HTML layer', () => {
  const allowed = allowedFigures(snapshot);

  it('extracts figures and ignores a bare ₹ symbol', () => {
    expect(extractFigures('<p>₹8,500 and ₹ and ₹19,125</p>')).toEqual([8500, 19125]);
  });

  it('accepts every figure the snapshot derives (annual, per-year, billed-once, addons, exemptions)', () => {
    const html =
      '<p>₹8,500 ₹6,375 ₹19,125 ₹25,500 ₹2,900 ₹2,175 ₹6,525 ₹1,500 ₹3,999 ₹30,000 ₹15,000</p>';
    expect(inspectPage(html, allowed)).toEqual({ total: 11, unknown: [] });
  });

  it('catches a hand-typed price in a component (the June failure mode)', () => {
    const { unknown } = inspectPage('<h2>₹2,900 to ₹9,999 per year</h2>', allowed);
    expect(unknown).toEqual([9999]);
  });

  it('catches the superseded ₹8,499 if it ever comes back', () => {
    expect(inspectPage('<p>₹8,499</p>', allowed).unknown).toEqual([8499]);
  });

  it('reports a page with zero rupee figures so the scan cannot go vacuous', () => {
    expect(inspectPage('<div id="root"></div>', allowed).total).toBe(0);
  });
});
