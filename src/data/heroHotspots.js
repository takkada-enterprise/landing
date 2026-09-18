// The playable phone in the hero: the real home screen with tappable areas over
// the tiles a visitor would tap first. JSX-free so tests and scripts load it.
//
// The boxes are percentages of the whole home screen asset (public/assets/
// screens/home-720.webp, 720 x 1491 including the phone frame), so they survive
// any resize of that same file and nothing needs re-measuring when the hero
// changes size. They were measured off the pixels, not eyeballed: the file was
// converted to BMP with `sips`, and the card rectangles were read as runs of
// non-background pixels. The quick action cards land at x 58-250 / 264-456 /
// 472-665 and y 696-843 / 862-1008 / 1032-1172; the five bottom nav items
// centre on 14.0% / 31.9% / 50.0% / 68.0% / 86.0% of the width across
// y 1333-1406. journey.test.js keeps every box inside the phone and stops two
// boxes from overlapping, so one tap can only mean one thing.
//
// The grid on the screen is, row by row: Daybook / Import / Reminders, then
// Stock / Team / Pending, then Dispatch / Tally Sync / Notices. Daybook, Tally
// Sync and Notices are deliberately not hotspots: there is no screenshot behind
// them, and a dot that opens nothing is worse than no dot.
//
// Copy rule: every headline here is true of the screen it opens. The Team
// leaderboard is a month-to-date board against target, the Settlements tab
// never says UPI (it filters by mode of payment), and the party list colours
// overdue red and the rest blue. The copy says exactly that.
//
// Second copy rule: a hotspot and a journey stop can cover the same feature, but
// the hero and the story render on the same page, so they may not use the same
// sentences. The Reminders hotspot therefore describes what its screen shows
// (who was reminded, sent or failed, and when) while the Remind stop keeps the
// promise ("the reminder goes out, you don't make the call"). The Dispatch
// hotspot stops at the challans for the same reason the Load stop does: in the
// story the invoices were already made, with their IRN, back at Bill.
export const HERO_HOME = {
  overline: 'Tap any tile on the phone',
  headline: 'Your Tally, in your pocket. Go on, use it.',
  body: 'This is the real home screen. Tap a tile with a yellow dot and the app opens that screen, the way it will on your phone.',
};

const tile = (col, row) => ({
  left: ['8.1%', '36.7%', '65.6%'][col],
  top: ['46.7%', '57.8%', '69.2%'][row],
  width: '26.7%',
  height: '9.9%',
});
const nav = (left) => ({ left, top: '88%', width: '16%', height: '7.5%' });

export const HOTSPOTS = [
  {
    key: 'import',
    label: 'Import',
    screen: 'document-import',
    box: tile(1, 0),
    href: '/import-purchase-from-pdf',
    overline: 'Bill · Import',
    headline: 'Photo of a bill in. Invoice out.',
    body: "Share a supplier PDF or a photo from WhatsApp. Takkada reads the party, items and tax, checks the bill's own maths, and you approve it into Tally.",
  },
  {
    key: 'reminders',
    label: 'Reminders',
    screen: 'reminders',
    box: tile(2, 0),
    href: '/send-payment-reminders-automatically',
    overline: 'Collect · Reminders',
    headline: 'Who was reminded, and who the reminder missed.',
    body: "Each party's last WhatsApp reminder, marked sent or failed, with the time it went out.",
  },
  {
    key: 'stock',
    label: 'Stock',
    screen: 'godown-stock',
    box: tile(0, 1),
    href: '/godown-wise-stock-on-mobile',
    overline: 'Stock · Godown wise',
    headline: 'Know what is in which godown before you promise it.',
    body: "Live stock from Tally, split by godown, so nobody books what you don't have.",
  },
  {
    key: 'team',
    label: 'Team',
    screen: 'salesman-summary',
    box: tile(1, 1),
    href: '/salesman-app-tally',
    overline: 'Team · Salesmen',
    headline: 'See what each salesman sold and collected this month.',
    body: 'Each salesman sees only his own parties. You see all of them, side by side.',
  },
  {
    key: 'pending',
    label: 'Pending',
    screen: 'pending-orders',
    box: tile(2, 1),
    href: '/order-booking-app-tally',
    overline: 'Sell · Pending orders',
    headline: 'Orders taken at the counter, waiting to be billed.',
    body: 'Every pending order by party, with one tap to make the invoice.',
  },
  {
    key: 'dispatch',
    label: 'Dispatch',
    screen: 'van-loading',
    box: tile(0, 2),
    href: '/delivery-challan-from-mobile',
    overline: 'Dispatch · Van loading',
    headline: 'Load the van from a sheet, drop by drop.',
    body: 'Tick the orders, pick the van, print the loading sheet, and make the delivery challans together.',
  },
  {
    key: 'parties',
    label: 'Parties',
    screen: 'party-list',
    box: nav('24%'),
    href: '/outstanding-receivables-on-mobile',
    overline: 'Parties',
    headline: 'Red is overdue. Blue is due but not late.',
    body: 'Every party colour coded, so you know who to chase without opening a ledger.',
  },
  {
    key: 'collect',
    label: 'Collect',
    screen: 'settlements',
    box: nav('60%'),
    href: '/payment-collection-tally',
    overline: 'Collect · Settlements',
    headline: 'Money in, matched to the right invoice.',
    body: 'Each payment settles to your bank and lands in Tally against the correct bill.',
  },
  {
    key: 'reports',
    label: 'Reports',
    screen: 'sales-analytics',
    box: nav('78%'),
    href: '/tally-reports-on-mobile',
    overline: 'Reports',
    headline: '20+ reports, without walking to the Tally PC.',
    body: 'Sales, purchases, items and parties, for any period, on your phone.',
  },
];

export const JOBS = [
  { key: 'reminders', label: 'Collect', hint: 'Reminders with pay links' },
  { key: 'import', label: 'Bill', hint: 'A bill photo becomes an invoice' },
  { key: 'dispatch', label: 'Dispatch', hint: 'Load the van' },
  { key: 'stock', label: 'Stock', hint: 'Godown wise' },
  { key: 'team', label: 'Team', hint: 'Salesman summary' },
  { key: 'reports', label: 'Reports', hint: 'Sales analytics' },
];
