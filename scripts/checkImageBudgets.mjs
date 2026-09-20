// checkImageBudgets — fail the build when a critical image grows past the size
// its position on the critical path can afford.
//
// A page's hero is its LCP element and roughly 70% of LCP is spent simply
// downloading it, so every hero on the critical path gets a budget here. The
// point of this guard is that a future re-export from a design tool cannot
// quietly put the bytes back.
//
// Since the 2026-09-18 revamp the HOMEPAGE hero is the playable phone, which
// serves public/assets/screens/home-720.webp (its row is further down). That
// one is regenerated with the rest of the screen set:
//   node scripts/exportScreens.mjs
//
// The older screenshot heroes are re-encoded by hand from their in-repo PNG
// source, e.g.:
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
  // Was the homepage hero until the 2026-09-18 revamp. It is still the LCP
  // element on two feature pages and still cited in schema:screenshot, so the
  // file stays and keeps its budget; only its job changed.
  [
    'public/assets/screenshots/home-screen-framed.webp',
    56_000,
    'LCP element on /tally-on-mobile and /tally-on-mobile-without-remote-access',
  ],
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
  // Encoded 2026-08-11 from the operator-supplied mockup at q68 (42,970
  // bytes), same recipe as the field-visit entry above.
  ['public/assets/screenshots/order-link-buyer-mockup.webp', 50_000, 'LCP element on /order-booking-app-tally'],
  // The revamped homepage's LCP element is the phone in the hero, which serves
  // the 720w export of this screen. Exported by scripts/exportScreens.mjs at
  // q80 (50,544 bytes); drop that row's quality if a re-export pushes it over.
  ['public/assets/screens/home-720.webp', 64_000, 'homepage LCP element (playable phone)'],
  // The heaviest export in the set: a dense screen of itemised invoice lines,
  // which WebP spends a lot of bits on. Carried by the journey and the features
  // hub, so it is on the critical path of more than one page. The manifest row
  // sets "q": 66 for this slug alone (80 gave 74,152 bytes, 74 gave 66,498);
  // at 66 it is 62,570 and the text is still crisp.
  ['public/assets/screens/review-invoices-720.webp', 66_000, 'heaviest export; on the journey and the hub'],
  // Feature-page heroes, since 2026-09-19. The hero is the LCP element on a
  // feature page and it now serves a registry screen, so each one is budgeted
  // by the file it actually serves. 360w is what a phone fetches and 720w is
  // the 2x candidate the desktop hero picks at sizes="300px"; both are on the
  // critical path of at least one page. The exports sit at 16-26 KB (360w) and
  // 40-52 KB (720w) at q80; 32_000 / 60_000 leaves room for a re-capture of the
  // same screen but not for a quality regression.
  ['public/assets/screens/field-visits-360.webp', 32_000, 'feature-page hero (field-visits)'],
  ['public/assets/screens/field-visits-720.webp', 60_000, 'feature-page hero (field-visits)'],
  ['public/assets/screens/settlements-360.webp', 32_000, 'feature-page hero (settlements)'],
  ['public/assets/screens/settlements-720.webp', 60_000, 'feature-page hero (settlements)'],
  ['public/assets/screens/reminders-360.webp', 32_000, 'feature-page hero (reminders)'],
  ['public/assets/screens/reminders-720.webp', 60_000, 'feature-page hero (reminders)'],
  ['public/assets/screens/total-fy-360.webp', 32_000, 'feature-page hero (total-fy)'],
  ['public/assets/screens/total-fy-720.webp', 60_000, 'feature-page hero (total-fy)'],
  ['public/assets/screens/document-import-360.webp', 32_000, 'feature-page hero (document-import)'],
  ['public/assets/screens/document-import-720.webp', 60_000, 'feature-page hero (document-import)'],
  ['public/assets/screens/home-360.webp', 32_000, 'feature-page hero (home)'],
  ['public/assets/screens/party-list-360.webp', 32_000, 'feature-page hero (party-list)'],
  ['public/assets/screens/party-list-720.webp', 60_000, 'feature-page hero (party-list)'],
  ['public/assets/screens/statement-settings-360.webp', 32_000, 'feature-page hero (statement-settings)'],
  ['public/assets/screens/statement-settings-720.webp', 60_000, 'feature-page hero (statement-settings)'],
  ['public/assets/screens/receivables-report-360.webp', 32_000, 'feature-page hero (receivables-report)'],
  ['public/assets/screens/receivables-report-720.webp', 60_000, 'feature-page hero (receivables-report)'],
  ['public/assets/screens/reminder-schedule-360.webp', 32_000, 'feature-page hero (reminder-schedule)'],
  ['public/assets/screens/reminder-schedule-720.webp', 60_000, 'feature-page hero (reminder-schedule)'],
  ['public/assets/screens/godown-stock-360.webp', 32_000, 'feature-page hero (godown-stock)'],
  ['public/assets/screens/godown-stock-720.webp', 60_000, 'feature-page hero (godown-stock)'],
  ['public/assets/screens/pending-orders-360.webp', 32_000, 'feature-page hero (pending-orders)'],
  // The densest of the phone screens after review-invoices: a list of order
  // lines, one rupee figure per row. 60,754 bytes at q80, so it gets its own
  // ceiling rather than a quality drop that would smudge the figures.
  ['public/assets/screens/pending-orders-720.webp', 64_000, 'feature-page hero (pending-orders)'],
  ['public/assets/screens/dispatch-beats-360.webp', 32_000, 'feature-page hero (dispatch-beats)'],
  ['public/assets/screens/dispatch-beats-720.webp', 60_000, 'feature-page hero (dispatch-beats)'],
  ['public/assets/screens/party-selection-360.webp', 32_000, 'feature-page hero (party-selection)'],
  ['public/assets/screens/party-selection-720.webp', 60_000, 'feature-page hero (party-selection)'],
  ['public/assets/screens/customer-analytics-360.webp', 32_000, 'feature-page hero (customer-analytics)'],
  ['public/assets/screens/customer-analytics-720.webp', 60_000, 'feature-page hero (customer-analytics)'],
  ['public/assets/screens/payment-behaviour-360.webp', 32_000, 'feature-page hero (payment-behaviour)'],
  ['public/assets/screens/payment-behaviour-720.webp', 60_000, 'feature-page hero (payment-behaviour)'],
  ['public/assets/screens/sales-by-item-360.webp', 32_000, 'feature-page hero (sales-by-item)'],
  ['public/assets/screens/sales-by-item-720.webp', 60_000, 'feature-page hero (sales-by-item)'],
  ['public/assets/screens/maker-checker-360.webp', 32_000, 'feature-page hero (maker-checker)'],
  ['public/assets/screens/maker-checker-720.webp', 60_000, 'feature-page hero (maker-checker)'],
  ['public/assets/screenshots/takkada-logo.webp', 16_000, 'loads on every page'],
  ['public/assets/screenshots/takkada-favicon.png', 20_000, 'loads on every page'],
  // The body face, and the heaviest font on the critical path by a wide margin:
  // one file answers all five weights (400–800) because it is a variable
  // subset, so a re-vendor that widens the unicode-range or loses the
  // subsetting shows up here first. 27,272 bytes today.
  ['public/assets/fonts/plus-jakarta-sans-latin.woff2', 30_000, 'body face: every page, weights 400-800'],
  ['public/assets/fonts/plus-jakarta-sans-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
  // IBM Plex Mono ships static cuts rather than one variable file, so each
  // weight is its own download and each one is budgeted on its own.
  ['public/assets/fonts/ibm-plex-mono-400-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
  ['public/assets/fonts/ibm-plex-mono-500-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
  ['public/assets/fonts/ibm-plex-mono-600-latin-ext.woff2', 6_000, 'subset to U+20B9 only'],
  ['public/assets/fonts/ibm-plex-mono-400-latin.woff2', 14_000, 'utility face: slip, time and stop labels'],
  ['public/assets/fonts/ibm-plex-mono-500-latin.woff2', 14_000, 'utility face: slip, time and stop labels'],
  ['public/assets/fonts/ibm-plex-mono-600-latin.woff2', 14_000, 'utility face: slip, time and stop labels'],
  ['public/assets/screens/invoice-summary-360.webp', 32_000, 'feature-page screen (invoice-summary)'],
  ['public/assets/screens/invoice-summary-720.webp', 60_000, 'feature-page screen (invoice-summary)'],
  ['public/assets/screens/invoice-summary-send-360.webp', 32_000, 'feature-page screen (invoice-summary-send)'],
  ['public/assets/screens/invoice-summary-send-720.webp', 60_000, 'feature-page screen (invoice-summary-send)'],
  ['public/assets/screens/party-detail-360.webp', 32_000, 'feature-page screen (party-detail)'],
  ['public/assets/screens/party-detail-720.webp', 60_000, 'feature-page screen (party-detail)'],
  ['public/assets/screens/van-loading-360.webp', 32_000, 'feature-page screen (van-loading)'],
  ['public/assets/screens/van-loading-720.webp', 60_000, 'feature-page screen (van-loading)'],
  ['public/assets/screens/add-items-360.webp', 32_000, 'feature-page screen (add-items)'],
  ['public/assets/screens/add-items-720.webp', 60_000, 'feature-page screen (add-items)'],
  ['public/assets/screens/invoice-settings-360.webp', 32_000, 'feature-page screen (invoice-settings)'],
  ['public/assets/screens/invoice-settings-720.webp', 60_000, 'feature-page screen (invoice-settings)'],
  ['public/assets/screens/collections-outstanding-360.webp', 32_000, 'feature-page screen (collections-outstanding)'],
  ['public/assets/screens/collections-outstanding-720.webp', 60_000, 'feature-page screen (collections-outstanding)'],
  ['public/assets/screens/sales-analytics-360.webp', 32_000, 'feature-page hero (tally-app-for-agri-input-distributors)'],
  ['public/assets/screens/sales-analytics-720.webp', 64_000, 'feature-page hero (tally-app-for-agri-input-distributors)'],
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
