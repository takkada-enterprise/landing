// The playable phone in the hero: the real home screen with linked areas over
// the tiles a visitor would tap first. A hotspot is { key, label, box, href }.
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
export const HERO_HOME = {
  headline: 'Your Tally, in your pocket.',
  body: 'This is the real home screen. Tap any tile with a yellow dot to see how that part works, then come back here.',
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
    box: tile(1, 0),
    href: '/import-purchase-from-pdf',
  },
  {
    key: 'reminders',
    label: 'Reminders',
    box: tile(2, 0),
    href: '/send-payment-reminders-automatically',
  },
  {
    key: 'stock',
    label: 'Stock',
    box: tile(0, 1),
    href: '/godown-wise-stock-on-mobile',
  },
  {
    key: 'team',
    label: 'Team',
    box: tile(1, 1),
    href: '/salesman-app-tally',
  },
  {
    key: 'pending',
    label: 'Pending',
    box: tile(2, 1),
    href: '/order-booking-app-tally',
  },
  {
    key: 'dispatch',
    label: 'Dispatch',
    box: tile(0, 2),
    href: '/delivery-challan-from-mobile',
  },
  {
    key: 'parties',
    label: 'Parties',
    box: nav('24%'),
    href: '/outstanding-receivables-on-mobile',
  },
  {
    key: 'collect',
    label: 'Collect',
    box: nav('60%'),
    href: '/payment-collection-tally',
  },
  {
    key: 'reports',
    label: 'Reports',
    box: nav('78%'),
    href: '/tally-reports-on-mobile',
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
