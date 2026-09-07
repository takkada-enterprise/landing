import { describe, expect, it } from 'vitest';
import { comparisonSection } from '../siteContent';

// The named competitor grid had no guard until 2026-08-08, and it spent months
// carrying a row that said Biz Analyst cannot generate an e-invoice or e-way
// bill from mobile. They can. Nothing failed, because nothing checked.
//
// This file pins the two things a grid like that can get wrong: a row that
// understates a competitor (the unfair direction, and a claim we cannot
// defend), and a row that overstates us. It deliberately does not pin every
// cell. Competitors ship, and a test that has to be edited on every release
// stops being read.

const COMPETITORS = ['Biz Analyst', 'Livekeeping'];
const row = (feature) => comparisonSection.rows.find((r) => r.feature === feature);

describe('the named competitor grid', () => {
  it('gives every row a verdict for every column', () => {
    for (const r of comparisonSection.rows) {
      for (const col of ['Takkada', ...COMPETITORS]) {
        expect(typeof r[col], `${r.feature} / ${col}`).toBe('boolean');
      }
    }
  });

  // Verified 2026-08-08 against each product's live listings and release notes.
  // Biz Analyst's own website, help manual and store listings still do not
  // show e-invoice generation; the capability is founder-confirmed. Do not
  // "correct" this back to false from their site. Their site lags.
  it('credits both competitors with e-invoice and e-way bill generation', () => {
    const generation = row('Generate e-invoice + e-way bill from mobile');
    expect(generation).toBeDefined();
    for (const col of COMPETITORS) {
      expect(generation[col], `${col} generates e-invoices; do not mark it false`).toBe(true);
    }
  });

  // The row that actually separates the columns. Absent from fourteen months
  // of Livekeeping release notes and from the whole Biz Analyst doc set,
  // re-verified 2026-08-08. Code-verified on our side (cancel-gst-compliance).
  it('keeps the lifecycle row as the differentiator, on cancellation only', () => {
    const cancel = row('Cancel an e-invoice or e-way bill from the phone');
    expect(cancel).toBeDefined();
    expect(cancel.Takkada).toBe(true);
    for (const col of COMPETITORS) expect(cancel[col]).toBe(false);
  });

  // GSTN Advisory No. 668 of 29 July 2026 put e-way bill closure in abeyance,
  // so nobody offers it, us included. A closure row would be a false claim
  // whichever way its ticks fell.
  it('has no e-way bill closure row', () => {
    const closure = /clos(e|ing|ure)/i;
    for (const r of comparisonSection.rows) {
      if (/e-?way/i.test(r.feature)) expect(r.feature).not.toMatch(closure);
    }
  });

  // A grid of competitor claims is only defensible with a date on it. The old
  // disclaimer still said April 26, 2026 after the facts had moved twice.
  it('dates itself and carries the Biz Analyst caveat', () => {
    expect(comparisonSection.disclaimer).toMatch(/8 August 2026/);
    expect(comparisonSection.disclaimer).toMatch(/Biz Analyst/);
  });
});
