// Themed grouping for the /features hub (src/routes/Features.jsx).
//
// The grouping lives here rather than as a field on each FeaturePage object
// because a theme is a property of the directory, not of the page: regrouping
// the hub should not mean editing 26 objects across four files. The trade-off
// is that a new feature page has to be named here as well as in
// featurePages.js, and src/routes/__tests__/features-hub.test.jsx fails loudly
// when it is not: it asserts the grouping covers FEATURE_PAGES exactly, in both
// directions. An unmapped page is simply absent from the hub, which is why that
// test is the thing standing between a missed entry and a page nobody links.
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
 * @property {string} [stop] the journey stop this group is, a `STOPS` id
 * @property {string} title  group heading
 * @property {string} intro  one line under the heading
 * @property {string[]} slugs  feature page slugs, in display order
 */

// ── Grouped by the invoice's journey (2026-09-18) ──
//
// The nine themes here used to be names invented for the directory alone:
// "Getting paid", "Entries without typing", "Billing, stock and godowns". They
// were honest, but they were a second taxonomy sitting beside the one the
// homepage tells, so a visitor who arrived having just followed one invoice
// through seven stops landed on a page that re-sorted the same product into
// words he had not seen. The first seven groups are now those stops, in that
// order, carrying `stop` so the hub can show each one's stamp and Task 10 can
// draw the strip on the feature pages themselves.
//
// The two groups after them have no stop on purpose. Comparing Takkada with
// Biz Analyst, or checking it was built for pharma, is not a moment in the
// invoice's life; it is the reading somebody does before any of this starts.
// Forcing them onto the story would have been the taxonomy problem again, in
// the other direction.

/** @type {FeatureGroup[]} */
export const FEATURE_GROUPS = [
  {
    id: 'order',
    stop: 'order',
    title: 'Taking the order',
    intro: "What your salesman does at the retailer's counter, and what you see of it.",
    slugs: [
      'salesman-app-tally',
      'sales-order-on-mobile',
      'handwritten-order-to-tally',
      'order-booking-app-tally',
    ],
  },
  {
    id: 'bill',
    stop: 'bill',
    title: 'Making the bill',
    intro: 'Invoices, e-invoice, e-way bill and entries that fill themselves in.',
    slugs: [
      'e-invoice-from-phone',
      'e-way-bill-from-phone',
      'credit-note-from-phone',
      'import-purchase-from-pdf',
      'bank-statement-import-tally',
    ],
  },
  {
    id: 'load',
    stop: 'load',
    title: 'Loading and stock',
    intro: 'Godowns, challans and what is actually on the shelf.',
    slugs: ['godown-wise-stock-on-mobile', 'delivery-challan-from-mobile'],
  },
  {
    id: 'send',
    stop: 'send',
    title: 'Sending it to the customer',
    intro: 'The invoice and the statement reach WhatsApp without anyone pressing send.',
    slugs: ['custom-invoice-template-tally', 'share-ledger-statement-whatsapp'],
  },
  {
    id: 'remind',
    stop: 'remind',
    title: 'Reminding and collecting',
    intro: 'Reminders on your schedule, with a pay link in every one.',
    slugs: [
      'payment-reminder-tally',
      'send-payment-reminders-automatically',
      'payment-collection-tally',
    ],
  },
  {
    id: 'recover',
    stop: 'recover',
    title: 'Recovering what is overdue',
    intro: 'Who owes you, for how long, and who in your team is chasing it.',
    slugs: ['outstanding-receivables-on-mobile', 'debtor-ageing-report-on-phone'],
  },
  {
    id: 'tally',
    stop: 'tally',
    title: 'Back in Tally',
    intro: 'Receipts matched, reports on your phone, nothing typed twice.',
    slugs: [
      'tally-on-mobile',
      'tally-on-mobile-without-remote-access',
      'tally-reports-on-mobile',
      'multi-company-tally-reports',
    ],
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
 * The seven group ids the journey regroup retired, each pointed at the group
 * that took the bulk of its pages.
 *
 * Every one of these has been a linkable `#anchor` on /features since the hub
 * shipped, and some are inside blog posts that are already published, so they
 * cannot simply stop existing: an id that no longer resolves does not 404, it
 * silently scrolls to the top of the page, which reads as the link being wrong
 * about the whole site. The hub renders each of these as a zero-height anchor
 * inside its target group, so an old link lands on the section that swallowed
 * what it used to point at.
 *
 * `billing-stock-godowns` is the one split three ways (the invoice format went
 * to Send, the credit note to Bill, the godown and challan pages to Load); it
 * points at Load because that is where most of it went and what its own name
 * led with after "Billing".
 *
 * Nothing may be deleted from this map. Adding to it is what a future regroup
 * does with the ids it retires.
 * @type {Record<string, string>}
 */
export const RETIRED_GROUP_ANCHORS = {
  'team-in-the-market': 'order',
  'gst-paperwork': 'bill',
  'entries-without-typing': 'bill',
  'billing-stock-godowns': 'load',
  'getting-paid': 'remind',
  'who-owes-you': 'recover',
  'tally-on-your-phone': 'tally',
};

/** The retired ids that point at `groupId`, in the map's own order. */
export function retiredAnchorsFor(groupId) {
  return Object.keys(RETIRED_GROUP_ANCHORS).filter((id) => RETIRED_GROUP_ANCHORS[id] === groupId);
}

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
    'Beats, geo-tagged visit proof, orders and UPI collection from the shop counter.',
  'sales-order-on-mobile':
    'Orders booked against live stock and written into Tally, with the pending quantity visible.',
  'handwritten-order-to-tally':
    'A photograph of the order book page turned into draft voucher lines you approve.',
  'order-booking-app-tally':
    'A link your retailer opens with nothing installed, ordering from your catalogue at your rates.',
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

// ── Hub tiers (2026-08-11) ──
//
// The hub used to render nine equal groups of equal text cards, which is a wall
// of uniform grey to anyone who does not already know what they are looking
// for. It now opens with a lead tier, then two labelled sections, then a
// compact index of everything else.
//
// The tiers are derived, not listed. Only the lead slugs and the two section
// ids are written down; every other page falls into the index by
// subtraction. A twenty-eighth page therefore joins the hub on the strength of
// its FEATURE_GROUPS entry alone, exactly as before, and nobody has to
// remember a second list. That property is what the partition invariants in
// src/data/__tests__/feature-pages.test.js exist to keep.

/**
 * The features the hub opens with, in the order the operator approved them
 * (2026-08-11). Order is meaningful: this is the reading order of the lead
 * grid, of the header disclosure panel, and of the footer column. Adding a
 * slug here promotes the page across all three surfaces and removes it from
 * the compact index, because the index is what these leave behind.
 * @type {string[]}
 */
export const LEAD_FEATURE_SLUGS = [
  'payment-collection-tally',
  'payment-reminder-tally',
  'tally-on-mobile',
  'tally-reports-on-mobile',
  'salesman-app-tally',
  // Promoted 2026-08-11 on the operator's read of the shipped page: it was a
  // plain name near the foot of the compact index, and a feature the site
  // actively sells cannot be the hardest one on the page to find. Sits beside
  // the salesman app because the two are the same story from opposite ends —
  // the order arriving from outside the office, brought in or sent in.
  'order-booking-app-tally',
  'e-invoice-from-phone',
  'e-way-bill-from-phone',
  'import-purchase-from-pdf',
];

/**
 * Groups that render as their own labelled section on the hub instead of as
 * rows of the compact index. Both hold pages a visitor arrives at in a
 * different frame of mind — comparing products, or checking the thing was
 * built for their line of trade — so burying them in an alphabet of feature
 * names would lose them.
 * @type {string[]}
 */
export const SECTION_GROUP_IDS = ['weighing-options', 'built-for-your-trade'];

const withBlurb = (page) => ({
  ...page,
  blurb: FEATURE_BLURBS[page.slug] ?? page.llms.summary,
});

/**
 * Fold FEATURE_PAGES into the groups above, preserving each group's slug order
 * and attaching each page's directory line as `blurb`.
 *
 * A page missing from FEATURE_GROUPS is simply absent from the result. There is
 * deliberately no catch-all group: the hub test asserts the grouping covers
 * FEATURE_PAGES exactly, so a missing entry is already a red test, and filing
 * the page under some unrelated group's heading would be a worse answer than
 * leaving it out.
 */
let lastPagesRef = null;
let cachedGrouped = null;
let cachedLead = null;
let cachedSections = null;
let cachedSecondary = null;
let cachedDrained = null;

function checkPagesCache(pages) {
  if (pages !== lastPagesRef) {
    lastPagesRef = pages;
    cachedGrouped = null;
    cachedLead = null;
    cachedSections = null;
    cachedSecondary = null;
    cachedDrained = null;
  }
}

export function groupFeaturePages(pages) {
  checkPagesCache(pages);
  if (cachedGrouped) return cachedGrouped;

  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  cachedGrouped = FEATURE_GROUPS.map((group) => ({
    ...group,
    pages: group.slugs.map((slug) => bySlug.get(slug)).filter(Boolean).map(withBlurb),
  }));
  return cachedGrouped;
}

/** The lead tier, in LEAD_FEATURE_SLUGS order. */
export function leadFeaturePages(pages) {
  checkPagesCache(pages);
  if (cachedLead) return cachedLead;

  const bySlug = new Map(pages.map((page) => [page.slug, page]));
  cachedLead = LEAD_FEATURE_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean).map(withBlurb);
  return cachedLead;
}

/** The groups that render as their own labelled section, in FEATURE_GROUPS order. */
export function sectionFeatureGroups(pages) {
  checkPagesCache(pages);
  if (cachedSections) return cachedSections;

  cachedSections = groupFeaturePages(pages).filter((group) => SECTION_GROUP_IDS.includes(group.id));
  return cachedSections;
}

/**
 * The compact index: every group that is not a section, minus the pages already
 * shown in the lead tier. A group left with nothing is dropped rather than
 * rendered as an empty heading — see drainedGroupIds for what happens to its
 * DOM anchor.
 */
export function secondaryFeatureGroups(pages) {
  checkPagesCache(pages);
  if (cachedSecondary) return cachedSecondary;

  const lead = new Set(LEAD_FEATURE_SLUGS);
  cachedSecondary = groupFeaturePages(pages)
    .filter((group) => !SECTION_GROUP_IDS.includes(group.id))
    .map((group) => ({ ...group, pages: group.pages.filter((page) => !lead.has(page.slug)) }))
    .filter((group) => group.pages.length > 0);
  return cachedSecondary;
}

/**
 * Group ids that no longer head a rendered section because every one of their
 * pages was promoted to the lead tier. Their ids are still anchor targets that
 * have been linkable since the hub shipped, so the hub re-attaches them to the
 * lead section rather than letting them scroll to the top of the page.
 *
 * Empty since the journey regroup (2026-09-18): every stop group keeps at least
 * one page outside the lead tier. It was exactly `['gst-paperwork']` before,
 * and the machinery stays because the next promotion can drain a group again.
 */
export function drainedGroupIds(pages) {
  checkPagesCache(pages);
  if (cachedDrained) return cachedDrained;

  const surviving = new Set(secondaryFeatureGroups(pages).map((group) => group.id));
  cachedDrained = FEATURE_GROUPS.filter(
    (group) => !SECTION_GROUP_IDS.includes(group.id) && !surviving.has(group.id)
  ).map((group) => group.id);
  return cachedDrained;
}
