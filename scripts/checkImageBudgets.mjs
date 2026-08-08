// checkImageBudgets — fail the build when a critical image grows past the size
// its position on the critical path can afford.
//
// The hero is the LCP element on the homepage and roughly 70% of LCP is spent
// simply downloading it. It has been re-encoded from the in-repo PNG source
// with a modern encoder (see HERO below), and the point of this guard is that
// a future re-export from a design tool cannot quietly put the bytes back.
//
// Regenerate the hero from its PNG source with:
//   cwebp -q 75 -m 6 -alpha_q 100 -sharp_yuv \
//     public/assets/screenshots/home-screen-framed.png \
//     -o public/assets/screenshots/home-screen-framed.webp
//
// Budgets are deliberately a little above current size: they exist to catch a
// doubling, not to force a re-encode every time a pixel changes.

import { statSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

export const BUDGETS = [
  // path, max bytes, why
  ['public/assets/screenshots/home-screen-framed.webp', 56_000, 'homepage LCP element'],
  ['public/assets/screenshots/takkada-logo.webp', 16_000, 'loads on every page'],
  ['public/assets/screenshots/takkada-favicon.png', 20_000, 'loads on every page'],
  ['public/assets/fonts/fraunces-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
  ['public/assets/fonts/plus-jakarta-sans-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
];

export function overBudget(entries, sizeOf) {
  return entries
    .map(([path, max, why]) => ({ path, max, why, size: sizeOf(path) }))
    .filter((e) => e.size != null && e.size > e.max);
}

function main() {
  const sizeOf = (p) => {
    const abs = resolve(repoRoot, p);
    return existsSync(abs) ? statSync(abs).size : null;
  };

  const missing = BUDGETS.filter(([p]) => sizeOf(p) == null).map(([p]) => p);
  if (missing.length > 0) {
    process.stderr.write(`checkImageBudgets: missing ${missing.join(', ')}\n`);
    process.exit(1);
  }

  const bad = overBudget(BUDGETS, sizeOf);
  if (bad.length > 0) {
    process.stderr.write(
      'checkImageBudgets: asset(s) over budget on the critical path.\n' +
        bad
          .map((e) => `  - ${e.path}: ${e.size} bytes > ${e.max} (${e.why})`)
          .join('\n') +
        '\nRe-encode, or raise the budget deliberately with a reason.\n'
    );
    process.exit(1);
  }

  process.stdout.write(`checkImageBudgets: OK (${BUDGETS.length} assets within budget)\n`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
