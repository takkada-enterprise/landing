import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Display weights on the Campfire pattern (plan 2026-10-30-003, Global
// Constraints): hero and section heads at 500, card titles at 600, set once
// in src/ui/ui.css. styles.css loads after ui.css, so a rule there that
// names one of these classes would win on equal specificity; none may.

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const read = (f) => readFileSync(resolve(repoRoot, 'src', f), 'utf-8').replace(/\/\*[\s\S]*?\*\//g, '');

// The font-weight of the top-level rule whose selector is exactly `selector`.
function weightOf(css, selector) {
  const rule = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].find(
    (m) => m[1].trim() === selector
  );
  return rule?.[2].match(/font-weight:\s*(\d+)/)?.[1];
}

describe('display heading weights (plan 2026-10-30-003)', () => {
  const ui = read('ui/ui.css');

  it.each([
    ['.ui-hero-title', '500'],
    ['.ui-section-title', '500'],
    ['.ui-card-title', '600'],
  ])('%s is weight %s in ui.css', (selector, weight) => {
    expect(weightOf(ui, selector)).toBe(weight);
  });

  it('styles.css never restyles a ui- heading', () => {
    expect(read('styles.css')).not.toMatch(/\.ui-(hero|section|card|close)-title\b/);
  });
});
