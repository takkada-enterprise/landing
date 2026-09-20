import { describe, expect, it } from 'vitest';

import {
  allowedFigures,
  extractFigures,
  inspectData,
  inspectPage,
  snapshot,
  stripNotAPrice,
} from './checkRateCardDrift.mjs';
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

  it('sees through React comment splits and spaces — the prerendered shape', () => {
    // Prerendered React can split a rupee figure as "₹<!-- -->9,999<!-- -->".
    expect(extractFigures('<span>₹<!-- -->9,999<!-- --> typed</span>')).toEqual([9999]);
    expect(extractFigures('<h2>₹ 9,999 per year</h2>')).toEqual([9999]);
  });

  it('skips scale figures (₹12 crore, ₹2 lakh), which are article figures rather than prices', () => {
    expect(extractFigures('<span>₹<!-- -->12<!-- -->crore</span>')).toEqual([]);
    expect(extractFigures('<p>₹2 lakh collected and ₹8,500 charged</p>')).toEqual([8500]);
  });

  it('rounds derived figures the way formatInr rounds (non-multiple-of-4 plan)', () => {
    const drifted = clone(snapshot);
    drifted.plans.view_only.annualInr = 2990; // 2990 × 0.75 = 2242.5 → ₹2,243
    const allowed = allowedFigures(drifted);
    expect(allowed.has(2990)).toBe(true);
    expect(allowed.has(2243)).toBe(true);
    expect(allowed.has(6728)).toBe(true); // 2990 × 2.25 = 6727.5 → ₹6,728
  });

  it('catches the duplicated plan.price literal drifting from annualPrice', () => {
    const sitePricing = clone(pricing);
    sitePricing.plans[0].price = '₹8,500'; // Clarity quoting Copilot's rate
    const problems = inspectData(sitePricing, snapshot);
    expect(problems.some((p) => p.includes('price string'))).toBe(true);
  });

  it('accepts every figure the snapshot derives (annual, per-year, billed-once, addons, exemptions)', () => {
    const html =
      '<p>₹8,500 ₹6,375 ₹19,125 ₹2,900 ₹2,175 ₹6,525 ₹1,500 ₹3,999</p>';
    expect(inspectPage(html, allowed)).toEqual({ total: 8, unknown: [] });
  });

  it('does not allow the never-rendered 3-year list total (₹25,500) — the allow-list stays as narrow as the page', () => {
    expect(inspectPage('<p>₹25,500</p>', allowed).unknown).toEqual([25500]);
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

// The homepage story prints a retailer's own invoice — ₹1,86,420.16 on the
// paper slip and again in the WhatsApp card — which is an illustration, not an
// offer. It is exempted by marking the illustration in the markup rather than
// by adding 186420 to the rate-card snapshot: the snapshot is the list of
// things Takkada charges for, and a number that is not a price does not belong
// in it at any price.
describe('checkRateCardDrift — data-not-a-price illustrations', () => {
  const allowed = allowedFigures(snapshot);
  const SLIP =
    '<div class="slip" data-not-a-price><div class="slip-line"><span>Item</span>' +
    '<span>52,000.00</span></div><div class="slip-total"><span>TOTAL</span>' +
    '<span>₹1,86,420.16</span></div></div>';

  it('ignores a figure inside a marked element, nested tags and all', () => {
    expect(inspectPage(`<main>${SLIP}<p>₹8,500</p></main>`, allowed)).toEqual({
      total: 1,
      unknown: [],
    });
  });

  it('still fails on the very same figure outside a marked element', () => {
    expect(inspectPage('<p>₹1,86,420.16</p>', allowed).unknown).toEqual([186420]);
  });

  // The attribute must not become a way to lose sight of a real price that
  // happens to sit beside one, which is the only way this exemption could hide
  // the drift the guard exists to catch.
  it('keeps checking a real price that sits next to a marked block', () => {
    const html = `<section>${SLIP}<p>Copilot is ₹9,999 a year</p></section>`;
    expect(inspectPage(html, allowed).unknown).toEqual([9999]);
  });

  it('closes the marked element at ITS end, not at the first inner close tag', () => {
    // A lazy `<div ...>...</div>` match would stop at the inner </div> and
    // leave the total behind; a greedy one would eat the price after it.
    const out = stripNotAPrice(`<div data-not-a-price><div>a</div>₹5</div><p>₹8,500</p>`);
    expect(out).toBe('<p>₹8,500</p>');
  });

  it('strips nothing at all from a page that carries no marked element', () => {
    const html = '<main><p>₹8,500</p></main>';
    expect(stripNotAPrice(html)).toBe(html);
  });

  // A void or self-closed element carrying the attribute opens no subtree, so
  // it must not swallow the rest of the page behind it.
  it('drops a childless marked element without taking its siblings', () => {
    expect(stripNotAPrice('<img data-not-a-price alt="₹99"/><p>₹8,500</p>')).toBe('<p>₹8,500</p>');
  });

  // The exemption cannot be allowed to empty a page: the zero-figures check is
  // what stops this guard from passing by seeing nothing at all.
  it('leaves a page of nothing but illustrations reading as vacuous', () => {
    expect(inspectPage(SLIP, allowed).total).toBe(0);
  });
});
