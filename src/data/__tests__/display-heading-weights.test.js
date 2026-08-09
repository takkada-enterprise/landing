import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// CLAUDE.md §7: a heading gets its weight from the ":root"-prefixed Display
// headings block in styles.css. premium.css restyles the same headings but sets
// font-weight: 600, and its selectors are unprefixed (0,1,0). A class listed in
// premium's block but missing from the styles.css block therefore ships one
// weight lighter than every other heading on the site, and it does so silently:
// nothing renders wrong, it just reads as body text.
//
// That is exactly what happened to .features-hub-group-title when the /features
// hub shipped. This test is the reason it cannot happen to the next one.

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (f) => readFileSync(resolve(repoRoot, 'src', f), 'utf-8');

// The selector list of the rule containing a `font-weight: <decl>` declaration:
// everything between the previous rule's closing brace and this rule's opening
// one. Stopping at the `{` matters, or values like `-0.025em` in an earlier
// declaration parse as a class named `.025em`.
function classesWeightedBy(css, declaration) {
  const upToRule = css.split(declaration)[0];
  const afterPreviousRule = upToRule.slice(upToRule.lastIndexOf('}') + 1);
  const selectors = afterPreviousRule.slice(0, afterPreviousRule.indexOf('{'));
  return new Set(selectors.match(/\.[a-zA-Z][a-zA-Z0-9_-]*/g) ?? []);
}

describe('display heading weights (CLAUDE.md §7)', () => {
  const premium = read('premium.css');
  const styles = read('styles.css');

  const restyled = classesWeightedBy(premium, 'font-weight: 600;');
  const weighted = new Set([
    ...classesWeightedBy(styles, 'font-weight: var(--weight-display);'),
    ...classesWeightedBy(styles, 'font-weight: var(--weight-display-hero);'),
  ]);

  it('finds both blocks, so the test cannot pass by parsing nothing', () => {
    expect(restyled.size).toBeGreaterThan(5);
    expect(weighted.size).toBeGreaterThan(5);
  });

  it('registers every premium-restyled heading class in the styles.css weight block', () => {
    // .hero-title-accent and .text-accent are gradient fills, not headings.
    const exempt = new Set(['.hero-title-accent', '.text-accent']);
    const unregistered = [...restyled].filter((c) => !exempt.has(c) && !weighted.has(c));
    expect(
      unregistered,
      `These classes are restyled in premium.css but carry no weight in the styles.css ` +
        `Display-headings block, so they render at 600 instead of 700/800. Add them there.`
    ).toEqual([]);
  });
});
