// Single registry of app screens used by the hero, the journey, the hub and
// feature pages. JSX-free so Node can load it from tests and scripts.
// Regenerate the files with: node scripts/exportScreens.mjs
//
// The alt text here is what somebody saw when they opened the source PNG, not
// what its filename claimed: the operator's names do not always match the screen
// (`Team Sales.png` is the "Review invoices" screen). scripts/screens.manifest.json
// records the same check next to the source it was made against, and the test
// pins the two together.
//
// The sizes are the intrinsic size of the exported file, read back off disk, so
// the browser reserves the right box and the page does not jump when the image
// lands. Every phone source is 2092x4331, which is 360x746 at the 360w export,
// so one height is honest for all of them; the two sheets carry their own.
const phone = (slug, alt) => ({
  slug,
  alt,
  width: 360,
  height: 746,
  src: `/assets/screens/${slug}-360.webp`,
  srcSet: `/assets/screens/${slug}-360.webp 360w, /assets/screens/${slug}-720.webp 720w`,
});
const sheet = (slug, alt, width, height) => ({
  slug,
  alt,
  width,
  height,
  src: `/assets/screens/${slug}-720.webp`,
  srcSet: `/assets/screens/${slug}-720.webp 720w, /assets/screens/${slug}-1440.webp 1440w`,
});

export const SCREENS = {
  home: phone('home', 'Takkada home screen showing total receivable and quick action tiles'),
  'pending-orders': phone(
    'pending-orders',
    'Pending orders listed by party with a Make Invoice action'
  ),
  'review-invoices': phone('review-invoices', 'Review screen creating seven invoices in one go'),
  // einvoice-eway and van-loading were here until 2026-09-20. Both printed a
  // real number on a public page: "Invoice will be sent to 9573440784", and
  // "ronak / 919435977777". Deleted, not just unreferenced, because public/ is
  // copied into dist verbatim and an unreferenced file there is still a URL.
  // src/data/__tests__/journey.test.js holds the tombstone.
  reminders: phone(
    'reminders',
    "Reminders tab listing each party's last WhatsApp reminder as sent or failed"
  ),
  'reminder-schedule': phone(
    'reminder-schedule',
    'Smart Reminders settings: three days before due, on the due date, then three, seven and fourteen days after'
  ),
  'followup-log': phone('followup-log', 'Follow-up log with call outcome and promise to pay'),
  'recovery-team': phone(
    'recovery-team',
    'Recovery board showing amount recovered per team member'
  ),
  settlements: phone('settlements', 'Payment settlements listed by party as pending or settled'),
  'party-list': phone('party-list', 'Party list colour coded by due and overdue'),
  'document-import': phone(
    'document-import',
    'Imports list with supplier bills and bank statements queued for review'
  ),
  'godown-stock': phone(
    'godown-stock',
    'Adding items with a godown picked per line and the stock available in that godown'
  ),
  'salesman-summary': phone(
    'salesman-summary',
    'Team leaderboard ranking salesmen by amount billed against target, with commission earned'
  ),
  'sales-analytics': phone('sales-analytics', 'Sales analytics with monthly trend'),
  'field-visits': phone(
    'field-visits',
    'Field visits feed listing each dealer call with who went, how long they stayed and the outcome'
  ),
  'receivables-report': phone(
    'receivables-report',
    "A party's receivables broken into ageing buckets with its open bills and a Share PDF action"
  ),
  // The filename says "Customer Analytics"; the screen is "Went Quiet".
  'customer-analytics': phone(
    'customer-analytics',
    'Customers who quietly stopped ordering, with the value at risk and how long each has been silent'
  ),
  'payment-behaviour': phone(
    'payment-behaviour',
    'Payment behaviour showing what was collected this financial year and how many days each customer takes'
  ),
  'maker-checker': phone(
    'maker-checker',
    "A team member's sales order waiting for review, with approve, send back and decline"
  ),
  'party-selection': phone(
    'party-selection',
    'Selecting a party while billing, each one showing its due amount and last invoice date'
  ),
  'total-fy': phone(
    'total-fy',
    "Reports screen with this financial year's total for each voucher type"
  ),
  'sales-by-item': phone(
    'sales-by-item',
    'Sales by item for a month with quantity, amount, average price and spread'
  ),
  'dispatch-beats': phone(
    'dispatch-beats',
    'Dispatch orders grouped by delivery beat, ready to add to a van'
  ),
  'statement-settings': phone(
    'statement-settings',
    'Statement options: a full ledger account or only pending bills, with item lines included'
  ),
  'invoice-summary': phone(
    'invoice-summary',
    'Invoice summary with the party, invoice number, date and payment terms'
  ),
  'invoice-summary-send': phone(
    'invoice-summary-send',
    'Invoice summary with the amount, GST mode and the WhatsApp and e-invoice switches'
  ),
  'party-detail': phone(
    'party-detail',
    "A party's ledger with the amount to collect and each invoice's due status"
  ),
  'van-loading': phone(
    'van-loading',
    'A van being loaded drop by drop, with the route order and item quantities'
  ),
  'add-items': phone(
    'add-items',
    'Adding items to a document with the godown picked at the top and a rate on every item'
  ),
  'invoice-settings': phone(
    'invoice-settings',
    'Invoice settings: GST mode, rounding, price level, reverse charge and batch numbers'
  ),
  'collections-outstanding': phone(
    'collections-outstanding',
    'Collections outstanding by ageing slab, party by party, with who is collecting'
  ),
  'beats': phone(
    'beats',
    'Beats listing each route with its salesman and dealer count'
  ),
  'credit-note': phone(
    'credit-note',
    'A credit note against a party with its amount, taxable value, narration and items'
  ),
  'credit-note-register': phone(
    'credit-note-register',
    'The credit notes register by month with a New Credit Note button'
  ),
  'purchase-review': phone(
    'purchase-review',
    'Reviewing an imported purchase voucher before it is saved'
  ),
  'godown-items': phone(
    'godown-items',
    "One godown's items with quantity and value"
  ),
  'godown-list': phone(
    'godown-list',
    'Stock by godown with item count, value and quantity'
  ),
  'import-picker': phone(
    'import-picker',
    'The create sheet with Import a document: scan with camera, choose a photo or a PDF'
  ),
  'import-detect': phone(
    'import-detect',
    'The app says what kind of document it read and asks you to confirm'
  ),
  'import-item-match': phone(
    'import-item-match',
    'Mapping an imported line to your own stock item, remembered for next time'
  ),
  'member-permissions': phone(
    'member-permissions',
    "A member's permissions: the approver switch and the access level"
  ),
  'member-permissions-registers': phone(
    'member-permissions-registers',
    'Per-register permission levels for one member'
  ),
  'member-permissions-scope': phone(
    'member-permissions-scope',
    'Which parties, groups and stock groups one member may see'
  ),
  'order-link-settings': phone(
    'order-link-settings',
    'Order link settings: business name, WhatsApp number and which prices customers see'
  ),
  'report-export': phone(
    'report-export',
    'Exporting a report to Excel or PDF from the phone'
  ),
  'bank-statement-review': phone(
    'bank-statement-review',
    'A bank statement read into the app, each line marked as a receipt'
  ),
  'bank-statement-resolve': phone(
    'bank-statement-resolve',
    'Resolving bank statement lines: pick the party, allocate to bills, then post'
  ),
  'sheet-loading': sheet('sheet-loading', 'Printed loading sheet with load list by item', 720, 335),
  'sheet-salesman': sheet('sheet-salesman', 'Exported team sales sheet by member', 720, 440),
};

export function screen(slug) {
  const s = SCREENS[slug];
  if (!s) {
    throw new Error(
      `Unknown screen "${slug}". Add it to scripts/screens.manifest.json and src/data/screens.js.`
    );
  }
  return s;
}
