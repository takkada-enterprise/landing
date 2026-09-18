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
  'einvoice-eway': phone(
    'einvoice-eway',
    'Invoice summary with e-invoice generation switched on before the invoice is created'
  ),
  'van-loading': phone('van-loading', 'Van loading screen with drops in route order'),
  'invoice-sent': phone(
    'invoice-sent',
    'Challans and invoices being made for a van that has been keyed back'
  ),
  reminders: phone(
    'reminders',
    'Smart Reminders settings with the follow-up schedule and repeat cadence'
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
    'Field visit outcomes per team member with orders booked and overdue outstanding'
  ),
  'sales-analytics': phone('sales-analytics', 'Sales analytics with monthly trend'),
  'sheet-loading': sheet(
    'sheet-loading',
    'Printed loading sheet with load list by item',
    720,
    335
  ),
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
