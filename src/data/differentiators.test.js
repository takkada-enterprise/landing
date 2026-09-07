import { describe, expect, it } from 'vitest';
import { differentiators, proofStrip, testimonials } from './siteContent';

// The claims contract for the "Where the others stop" band (2026-08-06 plan
// R4/R7). These tests encode marketing rules, not rendering: competitors
// stay unnamed, the locked pricing sentence ships verbatim, and nothing
// plan-ready-but-unbuilt gets claimed. Scoped to the new exports — the
// legacy comparisonSection (used with a disclaimer on the comparison route)
// names competitors deliberately and is not covered by this contract.
const serialized = JSON.stringify(differentiators);

describe('differentiator band claims contract', () => {
  it('never names a competitor', () => {
    expect(serialized).not.toMatch(/biz\s*analyst/i);
    expect(serialized).not.toMatch(/livekeeping/i);
    expect(serialized).not.toMatch(/khatabook|credflow|vyapar/i);
  });

  it('carries the locked zero-MDR sentence verbatim', () => {
    expect(serialized).toContain(
      '0% MDR on UPI collections, no transaction cap, no monthly fee'
    );
  });

  it('claims nothing from the unbuilt godown / RBAC / cost-centre work', () => {
    expect(serialized).not.toMatch(/godown/i);
    expect(serialized).not.toMatch(/rbac|role-based|\brole\b/i);
    expect(serialized).not.toMatch(/cost[\s-]?cent(re|er)/i);
  });

  it('never claims e-way bill CLOSE (cancel is built, close is not)', () => {
    expect(serialized).not.toMatch(/clos(e|ing|ed)/i);
  });

  it('has three or four rows, each with both sides of the story', () => {
    expect(differentiators.rows.length).toBeGreaterThanOrEqual(3);
    expect(differentiators.rows.length).toBeLessThanOrEqual(4);
    for (const row of differentiators.rows) {
      expect(row.others.length).toBeGreaterThan(20);
      expect(row.takkada.length).toBeGreaterThan(20);
    }
  });
});

describe('proof strip', () => {
  it('exists and anchors the testimonial id', () => {
    expect(proofStrip.id).toBe('testimonial');
  });

  it('has a real testimonial to show (never renders empty)', () => {
    expect(testimonials.length).toBeGreaterThan(0);
    expect(testimonials[0].quote.length).toBeGreaterThan(40);
  });
});
