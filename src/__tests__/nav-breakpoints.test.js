import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// jsdom applies no media queries, so nothing in the component tests can see the
// width at which the header changes shape. These two numbers were measured
// against the built site in `npm run preview`, and getting either of them wrong
// ships a visibly broken bar that every jsdom test still calls green.

const css = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '..', 'styles.css'),
  'utf-8'
);

// The narrowest width at which the logo, four nav items and two pills fit
// inside .nav-inner without clipping. Re-measure before lowering anything here.
const MEASURED_HEADER_FIT_PX = 845;

function maxWidthGuarding(declaration) {
  const upTo = css.slice(0, css.indexOf(declaration));
  const queries = [...upTo.matchAll(/@media \(max-width: (\d+)px\)/g)];
  return Number(queries[queries.length - 1][1]);
}

describe('header breakpoints', () => {
  it('finds both rules, so neither assertion can pass by matching nothing', () => {
    expect(css).toContain('.desktop-only { display: none !important; }');
    expect(css).toContain('.nav-actions .nav-connector-link');
  });

  // Below this the bar clipped its WhatsApp pill off the right edge for every
  // width from 768 to 844 — iPad portrait included.
  it('hands over to the hamburger before the bar runs out of room', () => {
    const handover = maxWidthGuarding('.desktop-only { display: none !important; }');
    expect(handover).toBeGreaterThanOrEqual(MEASURED_HEADER_FIT_PX);
  });

  // The connector mark yields at the tightest desktop widths. If its gate ever
  // dropped below the hamburger handover it would have no band left to show in.
  it('leaves the connector mark a band of its own to appear in', () => {
    const markGate = maxWidthGuarding('.nav-actions .nav-connector-link');
    const handover = maxWidthGuarding('.desktop-only { display: none !important; }');
    expect(markGate).toBeGreaterThan(handover);
  });
});
