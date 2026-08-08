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
  // Re-encoded 2026-08-08 from the PNG source at q68 (83,320 -> 53,584 bytes):
  //   cwebp -q 68 -m 6 -alpha_q 100 -sharp_yuv \
  //     public/assets/screenshots/field-visit-photo-mockup.png \
  //     -o public/assets/screenshots/field-visit-photo-mockup.webp
  ['public/assets/screenshots/field-visit-photo-mockup.webp', 60_000, 'LCP element on /salesman-app-tally'],
  // One hero per feature landing page. Each is that page's LCP element, so it
  // is budgeted for the same reason the homepage hero is: a re-export from a
  // design tool must not quietly double the bytes on the critical path. The
  // feature-page data test asserts every hero has an entry here.
  ['public/assets/screenshots/invoice-summary-mockup.webp', 52_000, 'LCP element on /e-invoice-from-phone'],
  ['public/assets/screenshots/payment-reminders.webp', 62_000, 'LCP element on /payment-reminder-tally'],
  ['public/assets/screenshots/whatsapp-dispatch-mockup.webp', 64_000, 'LCP element on /payment-collection-tally'],
  ['public/assets/screenshots/delivery-challans-mockup.webp', 56_000, 'LCP element on /e-way-bill-from-phone'],
  ['public/assets/screenshots/monthly-sales.webp', 56_000, 'LCP element on /tally-reports-on-mobile'],
  ['public/assets/screenshots/add-items-mockup.webp', 48_000, 'LCP element on /import-purchase-from-pdf'],
  // Second batch of feature pages (plan Phase 4). Several of these heroes are
  // shared across pages, which is fine: the budget is a property of the file on
  // the critical path, not of the page pointing at it.
  ['public/assets/screenshots/party-ledger-mockup.webp', 48_000, 'LCP element on /outstanding-receivables-on-mobile'],
  ['public/assets/screenshots/reports-screen.webp', 52_000, 'LCP element on /multi-company-tally-reports'],
  ['public/assets/screenshots/pending-orders-mockup.webp', 46_000, 'LCP element on /sales-orders-on-mobile'],
  ['public/assets/screenshots/settlements-mockup.webp', 28_000, 'LCP element on /bank-statement-import-tally'],
  ['public/assets/screenshots/smart-reminders-mockup.webp', 26_000, 'LCP element on /send-payment-reminders-automatically'],
  // Phase 5 reuses heroes that are already budgeted above. settlement.webp was
  // briefly promoted to the /biz-analyst-alternative hero and pulled back the
  // same day: it is a real capture carrying a named individual and two real
  // bank UTRs, and it is not in the sanitised set. settlements-mockup.webp is
  // the demo capture of the same screen and is what ships.
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
