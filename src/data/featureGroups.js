// Themed grouping for the /features hub (src/routes/Features.jsx).
//
// The grouping lives here rather than as a field on each FeaturePage object
// because a theme is a property of the directory, not of the page: regrouping
// the hub should not mean editing 26 objects across four files. The trade-off
// is that a new feature page has to be named here as well as in
// featurePages.js, and src/routes/__tests__/features-hub.test.jsx fails loudly
// when it is not. The hub itself is forgiving at runtime (an unmapped page
// falls into the last group) so a missed entry is a red test, never a page
// that quietly vanishes from the directory.
//
// Keep this file JSX-free and free of React imports, the same constraint that
// governs featurePages.js and siteMetadata.js. Node ESM loads this module
// directly through the hub test.
//
// `blurb` is the directory line, deliberately shorter than the page's own
// llms.summary. A hub is a place to scan, so each line names one concrete
// thing the page covers rather than repeating the SEO sentence (CLAUDE.md
// craft rules 1 and 3).

/**
 * @typedef {object} FeatureGroup
 * @property {string} id     stable key, also the section's DOM id
 * @property {string} title  group heading
 * @property {string} intro  one line under the heading
 * @property {string[]} slugs  feature page slugs, in display order
 */

/** @type {FeatureGroup[]} */
export const FEATURE_GROUPS = [
  {
    id: 'getting-paid',
    title: 'Getting paid',
    intro: 'Links, reminders and statements that go out without you asking anyone.',
    slugs: [
      'payment-collection-tally',
      'payment-reminder-tally',
      'send-payment-reminders-automatically',
      'share-ledger-statement-whatsapp',
    ],
  },
  {
    id: 'who-owes-you',
    title: 'Knowing who owes you',
    intro: 'The number you check before breakfast, and the list standing behind it.',
    slugs: ['outstanding-receivables-on-mobile', 'debtor-ageing-report-on-phone'],
  },
  {
    id: 'tally-on-your-phone',
    title: 'Tally on your phone',
    intro: 'Your books readable from wherever you happen to be standing.',
    slugs: [
      'tally-on-mobile',
      'tally-on-mobile-without-remote-access',
      'tally-reports-on-mobile',
      'multi-company-tally-reports',
    ],
  },
  {
    id: 'team-in-the-market',
    title: 'Your team in the market',
    intro: 'What your salesmen do between leaving at nine and reporting at night.',
    slugs: ['salesman-app-tally', 'sales-order-on-mobile', 'handwritten-order-to-tally'],
  },
  {
    id: 'gst-paperwork',
    title: 'GST paperwork',
    intro: 'The documents that hold up a loading, raised from where the goods are.',
    slugs: ['e-invoice-from-phone', 'e-way-bill-from-phone'],
  },
  {
    id: 'billing-stock-godowns',
    title: 'Billing, stock and godowns',
    intro: 'Vouchers and stock movement, raised at the counter instead of the desk.',
    slugs: [
      'custom-invoice-template-tally',
      'credit-note-from-phone',
      'delivery-challan-from-mobile',
      'godown-wise-stock-on-mobile',
    ],
  },
  {
    id: 'entries-without-typing',
    title: 'Entries without typing',
    intro: 'Paperwork that arrives as a PDF, a photo or a bank file, entered for you.',
    slugs: ['import-purchase-from-pdf', 'bank-statement-import-tally'],
  },
  {
    id: 'weighing-options',
    title: 'Weighing your options',
    intro: 'Honest comparisons with the other Tally mobile apps distributors look at.',
    slugs: ['biz-analyst-alternative', 'livekeeping-alternative'],
  },
  {
    id: 'built-for-your-trade',
    title: 'Built for your trade',
    intro: 'The same product, framed for the way your line of business actually runs.',
    slugs: [
      'tally-app-for-fmcg-distributors',
      'tally-app-for-pharma-distributors',
      'tally-app-for-agri-input-distributors',
    ],
  },
];

/**
 * The directory line for each page, keyed by slug. Kept beside the grouping so
 * both halves of the hub's copy are edited in one place.
 * @type {Record<string, string>}
 */
export const FEATURE_BLURBS = {
  'payment-collection-tally':
    'A UPI link on every invoice and inside every reminder, at 0% MDR on what lands.',
  'payment-reminder-tally':
    'WhatsApp reminders built from live Tally outstanding, so the follow-up stops slipping.',
  'send-payment-reminders-automatically':
    'Schedules that fire before and after the due date, with a cap on how often anyone is asked.',
  'share-ledger-statement-whatsapp':
    'Any party, any date range, as a PDF on WhatsApp with a payment link on the last page.',
  'outstanding-receivables-on-mobile':
    'Party-wise outstanding read live from Tally, with the overdue bills named one by one.',
  'debtor-ageing-report-on-phone':
    'Who is 30, 60 and 90 days late, bill by bill, before you start dialling anyone.',
  'tally-on-mobile':
    'What a distributor can actually do with Tally from a phone, and what it costs to get there.',
  'tally-on-mobile-without-remote-access':
    'Reading the books without TeamViewer, AnyDesk, or the office machine being awake.',
  'tally-reports-on-mobile':
    'Over twenty registers, from receivables ageing to item-wise and party-wise sales.',
  'multi-company-tally-reports':
    'Two firms or three inside one app, each keeping its own books and its own numbers.',
  'salesman-app-tally':
    'Check-in, geo-tagged visit proof, orders and UPI collection from the shop counter.',
  'sales-order-on-mobile':
    'Orders booked against live stock and written into Tally, with the pending quantity visible.',
  'handwritten-order-to-tally':
    'A photograph of the order book page turned into draft voucher lines you approve.',
  'e-invoice-from-phone':
    'IRN and signed QR raised without a portal login, written back onto the same Tally voucher.',
  'e-way-bill-from-phone':
    'Raised off the invoice at the loading point, before the driver has finished waiting.',
  'custom-invoice-template-tally':
    'The bill that reaches your retailer, carrying your logo, your terms and your UPI details.',
  'credit-note-from-phone':
    'Credit and debit notes raised against the original invoice while the retailer is standing there.',
  'delivery-challan-from-mobile':
    'Challans raised at the loading point, carrying the godown the goods actually left from.',
  'godown-wise-stock-on-mobile':
    'Item balances godown by godown, and transfers between them written into Tally.',
  'import-purchase-from-pdf':
    'Supplier bills read off a PDF or a phone photo, line items, rates and GST included.',
  'bank-statement-import-tally':
    'Each credit in the statement matched to a party and turned into a Tally entry.',
  'biz-analyst-alternative':
    'Takkada and Biz Analyst compared feature by feature, for distributors on Tally.',
  'livekeeping-alternative':
    'Takkada and Livekeeping compared feature by feature, for distributors on Tally.',
  'tally-app-for-fmcg-distributors':
    'High-volume kirana beats, where the salesman’s day is most of the business.',
  'tally-app-for-pharma-distributors':
    'Thin margins, and chemist credit that runs 60 to 90 days before the money comes back.',
  'tally-app-for-agri-input-distributors':
    'Dealer receivables stretched from sowing right through to after the crop is sold.',
};

/**
 * Fold FEATURE_PAGES into the groups above, preserving each group's slug order.
 * A page missing from FEATURE_GROUPS lands in the final group rather than
 * disappearing; the hub test is what makes that omission visible.
 */
export function groupFeaturePages(pages) {
  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  const placed = new Set(FEATURE_GROUPS.flatMap((g) => g.slugs));

  return FEATURE_GROUPS.map((group, i) => {
    const slugs =
      i === FEATURE_GROUPS.length - 1
        ? [...group.slugs, ...pages.filter((p) => !placed.has(p.slug)).map((p) => p.slug)]
        : group.slugs;
    return {
      ...group,
      pages: slugs.map((slug) => bySlug.get(slug)).filter(Boolean),
    };
  }).filter((group) => group.pages.length > 0);
}
