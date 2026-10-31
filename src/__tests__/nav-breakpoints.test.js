import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// jsdom applies no media queries, so nothing in the component tests can see the
// width at which the header changes shape. Getting the handover wrong ships a
// visibly broken bar that every jsdom test still calls green.

const css = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), '..', 'ui', 'nav.css'),
  'utf-8'
);

// The narrowest width at which the old bar (logo, four nav items, two pills)
// fitted without clipping. The Campfire bar carries the same items, so the
// handover may not drop below it. Re-measure before lowering anything here.
const MEASURED_HEADER_FIT_PX = 845;

const BURGER_SHOWN = '.ui-nav-burger { display: inline-flex; }';
const SHEET_RULE = '.ui-nav-sheet {\n    position: fixed;';

function maxWidthGuarding(declaration) {
  const upTo = css.slice(0, css.indexOf(declaration));
  const queries = [...upTo.matchAll(/@media \(max-width: (\d+)px\)/g)];
  return Number(queries[queries.length - 1][1]);
}

describe('header breakpoints', () => {
  it('finds both rules, so neither assertion can pass by matching nothing', () => {
    expect(css).toContain(BURGER_SHOWN);
    expect(css).toContain(SHEET_RULE);
  });

  it('hands over to the burger before the bar runs out of room', () => {
    expect(maxWidthGuarding(BURGER_SHOWN)).toBeGreaterThanOrEqual(MEASURED_HEADER_FIT_PX);
  });

  it('turns the links into the sheet at the same width the burger appears', () => {
    expect(maxWidthGuarding(SHEET_RULE)).toBe(maxWidthGuarding(BURGER_SHOWN));
  });

  // Review Focus 2: a phone with the Features panel open must be able to
  // scroll the sheet, and the page under it must not scroll.
  it('lets the sheet scroll on its own and locks the page body', () => {
    const sheet = css.slice(css.indexOf(SHEET_RULE), css.indexOf('}', css.indexOf(SHEET_RULE)));
    expect(sheet).toMatch(/overflow-y: auto;/);
    expect(css).toMatch(/body\.lock-scroll \{\s*overflow: hidden;\s*\}/);
  });
});
