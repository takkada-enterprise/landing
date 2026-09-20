// "Follow one invoice": the one story the homepage tells. The stops are a true
// sequence (an invoice really does pass through them in this order), which is
// why they are ordered and timed. JSX-free: tests and scripts load it in Node.
//
// Feature slugs point at existing feature pages. A slug with no page is dropped
// at render time by liveFeatures(), never rendered as a dead link. New pages
// arrive with Plan 2 (capabilities files) and light up their pill on their own.
//
// Shape of a stop:
//   { id, label, when, headline, body,
//     screens: string[],        // slugs in src/data/screens.js. MAY BE EMPTY.
//     sheet: string|null,       // a printed sheet, also a screens.js slug
//     stamp: { text, tone: 'blue'|'ink'|'green'|'red', size?: 'lg' },
//     status, features: [{ label, slug }],
//     message?: { from, lines: string[], attachment, cta },  // Send only
//     note?: string }
//
// Every `screens` entry has been opened: a stop never claims something its own
// screenshot contradicts, and the invoice is created exactly once in the story,
// at Bill, on `review-invoices`. A third capture of a van being keyed back,
// offering "Make invoices" and "Make challans", was registered for a while and
// never used: by Load the seven invoices already carry an IRN, so it
// contradicted this stop. It was removed from the registry on 2026-09-19
// rather than left lying in public/.
//
// Two more went the same way on 2026-09-20, and for a harder reason than
// contradiction. `einvoice-eway` printed "Invoice will be sent to 9573440784"
// under its WhatsApp toggle, and `van-loading` printed "ronak / 919435977777"
// in its header: a real number, and a real name beside a real number. Both were
// on the homepage, on the live branch, behind the front phone where a reader
// would not look but a screenshot would. Nothing publishable replaces the
// e-invoice toggle yet, so Bill shows one screen; Load takes `dispatch-beats`,
// which is the same moment with nobody's number on it. src/data/__tests__/
// journey.test.js pins the rule so a re-capture cannot walk back in unreviewed.
//
// Send has no app screen because no capture of a delivered invoice exists. It
// carries `message` instead, which Task 7 draws as an illustrative WhatsApp
// message. Its text and its attachment name are built from the slip below, so
// the paper, the phone and the message cannot drift apart. A renderer must
// handle `screens: []`.
//
// Send is also the one stop that must not tie itself to the clock. The invoice
// is created at Bill, 11:05 AM, on the screen whose "Send invoice via WhatsApp"
// toggle is on; the message at 1:31 PM is the dispatch, not the save. So the
// claim there is that nobody presses send, never that it goes out the second
// you save. The test keeps that phrasing out of every stop after Bill.
//
// The slip numbers are the ones on the Review invoices screenshot (INV/26-27/
// 0032 for Annapurna Kirana, ₹1,86,420.16), so the paper and the phone in the
// same section agree down to the paisa. The test pins the addition.
//
// TERM_DAYS is load-bearing, not decoration: it has to be shorter than the day
// the Remind stop fires on, or the party the story chases is not yet overdue and
// "Overdue parties get a WhatsApp reminder" is a lie. At 21 days, Day 28 is the
// +7 step of the Smart Reminders schedule shown at that stop, and the Day 30
// call is a real chase. The test pins terms < remind day.
const TERM_DAYS = 21;

/** Rupees the way the slip prints them: ₹1,86,420.16, lakh grouping, two paise. */
const inr = (n) =>
  `₹${new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n)}`;

export const INVOICE = {
  number: 'INV/26-27/0032',
  short: '0032',
  party: 'Annapurna Kirana',
  place: `Dibrugarh · ${TERM_DAYS} day terms`,
  lines: [
    { label: 'Groundnut Oil 15L × 36', amount: 73407.6 },
    { label: 'Sugar 50kg Bag × 29', amount: 63549.16 },
    { label: 'Besan 25kg Bag × 28', amount: 34515.6 },
    { label: '+ 4 more items', amount: 14947.8 },
  ],
  total: 186420.16,
};

export const STOPS = [
  {
    id: 'order',
    label: 'Order',
    when: "10:40 AM · At the retailer's counter",
    headline: 'Your salesman takes the order on his phone.',
    body: 'He sees only his own parties, live stock and the right price level. The order is in your pending list before he has left the shop.',
    screens: ['pending-orders'],
    sheet: null,
    stamp: { text: 'ORDER #118', tone: 'blue' },
    status: 'ORDER TAKEN AT THE SHOP',
    features: [
      { label: 'Salesman app', slug: 'salesman-app-tally' },
      { label: 'Order booking', slug: 'order-booking-app-tally' },
      { label: 'Visit tracking', slug: 'salesman-visit-tracking-photo-proof' },
      { label: 'Restrict what he sees', slug: 'restrict-salesman-access-tally' },
    ],
  },
  {
    id: 'bill',
    label: 'Bill',
    when: '11:05 AM · In the office',
    headline:
      'Seven orders become seven invoices in one go, each with its e-invoice and e-way bill.',
    body: 'Review the lot on one screen and create them together. The IRN and e-way bill number are written back against the same voucher in Tally.',
    screens: ['review-invoices'],
    sheet: null,
    stamp: { text: 'IRN + E-WAY ✓', tone: 'blue' },
    status: 'BILLED · IRN AND E-WAY GENERATED',
    features: [
      { label: 'E-invoice from the phone', slug: 'e-invoice-from-phone' },
      { label: 'E-way bill from the phone', slug: 'e-way-bill-from-phone' },
      { label: 'Import a bill from PDF', slug: 'import-purchase-from-pdf' },
      { label: 'Handwritten order to Tally', slug: 'handwritten-order-to-tally' },
    ],
  },
  {
    id: 'load',
    label: 'Load',
    when: '1:30 PM · At the godown',
    headline: 'The van is loaded from a printed sheet, godown by godown.',
    body: 'Tick the orders, pick the van, and print the loading sheet. What actually went is keyed back against each drop.',
    screens: ['dispatch-beats'],
    sheet: 'sheet-loading',
    stamp: { text: 'ON VAN 2', tone: 'ink' },
    status: 'LOADED ON VAN 2',
    features: [
      { label: 'Godown wise stock', slug: 'godown-wise-stock-on-mobile' },
      { label: 'Delivery challan', slug: 'delivery-challan-from-mobile' },
      { label: 'Godown on the invoice', slug: 'godown-on-sales-invoice-delivery-challan' },
    ],
  },
  {
    id: 'send',
    label: 'Send',
    when: "1:31 PM · On the retailer's phone",
    headline: 'The invoice reaches the customer on WhatsApp without anyone pressing send.',
    body: 'The PDF, the amount and a pay link go out in one message, on their own.',
    screens: [],
    message: {
      from: 'Shreeji Distributors',
      lines: [
        `${INVOICE.party}, your bill ${INVOICE.number} is attached.`,
        `Amount ${inr(INVOICE.total)}. Payable in ${TERM_DAYS} days.`,
        'Thank you for the order.',
      ],
      attachment: `${INVOICE.number.replace(/\//g, '-')}.pdf`,
      cta: 'Pay now',
    },
    sheet: null,
    stamp: { text: 'WHATSAPP ✓✓', tone: 'green' },
    status: 'DELIVERED ON WHATSAPP',
    features: [
      { label: 'Auto invoice dispatch', slug: 'auto-invoice-dispatch-tally' },
      { label: 'Your invoice format', slug: 'custom-invoice-template-tally' },
      { label: 'Share a ledger statement', slug: 'share-ledger-statement-whatsapp' },
    ],
  },
  {
    id: 'remind',
    label: 'Remind',
    when: 'Day 28 · 10:00 AM',
    headline: "The reminder goes out. You don't make the call.",
    body: 'Overdue parties get a WhatsApp reminder with the amount and a pay link, on the schedule you set.',
    screens: ['reminders', 'reminder-schedule'],
    sheet: null,
    stamp: { text: 'REMINDED', tone: 'ink' },
    status: 'REMINDED ON DAY 28',
    features: [
      { label: 'Automatic reminders', slug: 'send-payment-reminders-automatically' },
      { label: 'Reminder schedule', slug: 'scheduled-payment-reminders-tally' },
      { label: 'UPI collection, zero MDR', slug: 'nil-mdr-upi-collection-on-tally-invoices' },
    ],
  },
  {
    id: 'recover',
    label: 'Recover',
    when: 'Day 30 · 11:00 AM',
    headline: 'No reply to the reminder, so Takkada makes the call.',
    body: "An AI call in the party's own language asks for the payment and logs what they said. AI calling is charged on connected minutes. Your team's own follow-ups sit in the same log, and the recovery board shows who recovered what.",
    screens: ['followup-log', 'recovery-team'],
    sheet: null,
    stamp: { text: 'PAID', tone: 'red', size: 'lg' },
    status: 'PROMISED ON THE CALL · PAID BY UPI',
    features: [
      { label: 'Outstanding by age', slug: 'debtor-ageing-report-on-phone' },
      { label: 'Receivables on mobile', slug: 'outstanding-receivables-on-mobile' },
      { label: 'Payment collection', slug: 'payment-collection-tally' },
    ],
  },
  {
    id: 'tally',
    label: 'Tally',
    when: 'Day 31 · 9:00 PM',
    headline: 'The receipt is already in Tally. The 9 PM reconciliation is gone.',
    body: "The payment settles against the right invoice and shows in tonight's reports. Export the day's salesman sheet and share it as it is.",
    screens: ['settlements'],
    sheet: 'sheet-salesman',
    stamp: { text: 'IN TALLY ✓', tone: 'green' },
    status: 'RECEIPT POSTED IN TALLY · NOTHING RE-TYPED',
    features: [
      {
        label: 'Split one payment across invoices',
        slug: 'how-to-split-upi-payment-across-tally-invoices',
      },
      { label: 'Tally reports on mobile', slug: 'tally-reports-on-mobile' },
      { label: 'Daily sales report', slug: 'daily-sales-report-tally-mobile' },
    ],
  },
];

/** The pills of `stop` that have a real page in `pages`, in the stop's order. */
export function liveFeatures(stop, pages) {
  const known = new Set(pages.map((p) => p.slug));
  return stop.features.filter((f) => known.has(f.slug));
}
