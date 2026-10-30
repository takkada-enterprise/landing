// Home page copy for the Campfire layout (plan 2026-10-30-003, Task 3).
// Every `screen` is a slug in src/data/screens.js and every `slug` a feature
// page in FEATURE_PAGES; src/data/__tests__/home.test.js pins both, and the
// claims guards in src/data/schema.test.js sweep this copy.

export const HOME_HERO = {
  headline: 'Your Tally, on your phone.',
  lead: 'Outstanding, reminders, invoices and your salesmen, from anywhere. Tally stays on your PC and stays in charge.',
  screen: 'home',
  // Cropped fragments, not whole screens (owner ruling 2026-10-30). Each card
  // hangs off one side of the phone and overlaps it by 40px at most.
  floats: [
    { id: 'F1', screen: 'hero-card-overdue', top: '8%', left: 'calc(100% - 40px)' },
    { id: 'F2', screen: 'hero-card-outstanding', top: '84%', right: 'calc(100% - 40px)' },
  ],
};

export const HOME_USED_FOR = [
  {
    id: 'outstanding',
    title: 'Outstanding, party by party',
    line: 'Who owes what, how many days overdue, which bills. Share the statement on WhatsApp from the same screen.',
    screen: 'receivables-report',
    slug: 'outstanding-receivables-on-mobile',
  },
  {
    id: 'reminders',
    title: 'Timed WhatsApp reminders',
    line: 'Before the due date, on the day and after it, each with a pay link.',
    screen: 'reminder-schedule',
    slug: 'send-payment-reminders-automatically',
  },
  {
    id: 'invoices',
    title: 'Invoices from the phone, into Tally',
    line: 'Make the sales invoice on the phone with e-invoice and e-way bill. It lands in Tally as the same voucher.',
    screen: 'invoice-summary',
    slug: 'e-invoice-from-phone',
  },
  {
    id: 'salesmen',
    title: "Every salesman's day",
    line: 'Check-ins, collections and target per salesman, for the month.',
    screen: 'salesman-summary',
    slug: 'salesman-app-tally',
  },
];

export const HOME_IN_CHARGE = [
  {
    title: 'Tally stays the book of record',
    line: 'Every voucher made on the phone lands in Tally as the same voucher. Nothing is kept outside it.',
    screen: 'review-invoices',
  },
  {
    title: 'E-invoice and e-way bill from the phone',
    line: 'IRN, QR and e-way bill generated on the phone, written back against the same voucher.',
    screen: 'invoice-summary-send',
  },
  {
    title: 'Invoices reach the customer on WhatsApp',
    line: 'The PDF goes out on save, with a pay link.',
    screen: 'party-detail',
  },
];

export const HOME_ROWS = [
  {
    title: 'Load the van by route',
    line: 'Orders grouped by beat, a loading sheet per vehicle.',
    screen: 'van-loading',
    slug: 'delivery-challan-from-mobile',
  },
  {
    title: "Schemes Tally doesn't have",
    line: 'Buy X get Y, slab discounts and invoice-value discounts, applied at billing.',
    screen: 'scheme-list-kinds',
    slug: 'schemes-tally',
  },
  {
    title: 'Reports the owner actually opens',
    line: 'Sales by item, customer analytics, payment behaviour, godown stock.',
    screen: 'sales-analytics',
    slug: 'tally-reports-on-mobile',
  },
];

export const HOME_CLOSE = {
  title: 'See your Tally on your phone.',
  cta: { to: '/demo', label: 'Try the demo' },
};
