// Feature landing pages — the content layer behind src/components/FeaturePage.jsx.
//
// One object in FEATURE_PAGES is one live page. Adding an object registers the
// route, the sitemap entry, the llms.txt line and the footer "Features" link,
// because src/data/siteMetadata.js spreads `featureRouteMetadata` and
// src/routes/index.jsx builds its elements from this same array. The only
// follow-up is `node scripts/generate-llms-txt.mjs` to refresh the committed
// public/llms.txt, which a test enforces.
//
// This file must stay JSX-free and import-free of React. The sitemap and
// llms.txt generators load it through Node ESM (same constraint that governs
// siteMetadata.js). Icons are therefore named as strings and resolved to
// lucide components inside FeaturePage.jsx.
//
// Claims discipline: every capability sentence here traces to the operator-
// approved product deck (pitch-deck/takkada-product-deck-2026-08.html) or to
// the verified competitor grid (pitch-deck/competitor-analysis-2026-08.md).
// Rupee figures are never written here. `planPointer.plan` names a plan and
// FeaturePage derives the price through planPricing() so the rate card cannot
// drift out of a landing page (CLAUDE.md §3).

/**
 * @typedef {object} FeaturePage
 * @property {string} slug                     URL path without the leading slash
 * @property {string} searchPhrase             the exact query the page targets; must appear in h1 and title
 * @property {string} overline                 small uppercase label above the h1
 * @property {string} headline                 the h1. Must contain searchPhrase verbatim.
 * @property {string} subheadline              one distributor-framed sentence under the h1
 * @property {string} answer                   the front-loaded answer block, 40-60 words
 * @property {string} waContext                analytics context passed to the WhatsApp/calendar CTAs
 * @property {string} waMessage                pre-filled WhatsApp message for that context
 * @property {{title: string, description: string}} seo
 * @property {{section: string, title: string, summary: string}} llms
 * @property {string} footerLabel              link text in the footer Features column
 * @property {{image: string, alt: string, width: number, height: number}} hero  the hero mockup; this page's LCP element
 * @property {string} author                   key into src/data/authors.js
 * @property {string} datePublished            ISO date
 * @property {string} updated                  ISO date; bump on a real edit (recency is a citation signal)
 * @property {string} walkthroughHeading
 * @property {Array<{icon: string, title: string, body: string, image?: string, alt?: string, width?: number, height?: number}>} walkthrough
 * @property {{heading: string, othersLabel: string, rows: Array<{feature: string, takkada: string, others: string}>, disclaimer: string}} comparison
 * @property {{plan: string, note: string}} planPointer
 * @property {Array<{q: string, a: string}>} faqs
 * @property {Array<{slug: string, title: string}>} relatedPosts
 * @property {number} priority                 sitemap priority
 */

// Why relatedPosts carries the title instead of looking it up: src/lib/blogPosts.js
// uses an eager import.meta.glob over content/blog/*.md, so importing it here
// would compile all 170 posts into the feature-page chunk and undo the bundle
// split that took homepage LCP from 3.1s to 2.4s. The titles are duplicated on
// purpose and pinned by src/data/__tests__/feature-pages.test.js, which reads
// the real frontmatter off disk and fails on a drifted title or a dead slug.

/** @type {FeaturePage[]} */
export const FEATURE_PAGES = [
  {
    slug: 'salesman-app-tally',
    searchPhrase: 'Salesman app for Tally',
    overline: 'TEAM SALES',
    headline: 'Salesman app for Tally. Your team’s day, on your phone.',
    // Frames the distributor's day, not the product. The capability list is the
    // answer block's job, and saying it twice made the hero read as filler.
    subheadline:
      'You know he left at nine in the morning. Which shops he reached, what he booked, and how much he collected, you find out when he tells you at night.',
    // Front-loaded answer, 55 words. This is the passage an AI-search engine
    // lifts, so it is entity-first by design and answers the query in the
    // opening sentence. The hero copy above it stays distributor-first
    // (CLAUDE.md §11).
    answer:
      'Takkada is a salesman app for Tally. Your field team checks in at a shop, books the order against live stock, raises the invoice, and collects by UPI, all from a phone. Every visit carries a geo-tagged photo. Orders and receipts land in your Tally as vouchers, with targets and commission worked out per salesman.',
    waContext: 'feature-salesman-app-tally',
    waMessage:
      'Hi, I have salesmen in the market and want their visits, orders and collections coming into my Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Salesman App for Tally | Field Sales on Mobile | Takkada',
      description:
        'Salesman app for Tally: geo-tagged visit proof, orders on live stock, invoices and UPI collection from the shop counter. Targets and commission per salesman.',
    },
    llms: {
      section: 'Features',
      title: 'Salesman app for Tally',
      summary:
        'Field-sales module for distributors on Tally: one-tap check-in, geo-tagged photo proof of every visit, orders against live stock, invoicing and UPI collection from the shop, plus targets, commission and role-based access per salesman.',
    },
    footerLabel: 'Salesman app',
    // The hero mockup is this page's LCP element, so it renders eagerly at high
    // fetch priority and its bytes are pinned in scripts/checkImageBudgets.mjs.
    // A real Guwahati storefront with the coordinates and timestamp on it does
    // more for trust than any diagram of the feature (CLAUDE.md craft rule 4).
    hero: {
      image: '/assets/screenshots/field-visit-photo-mockup.webp',
      alt: 'Takkada visit proof: a geo-tagged, time-stamped photo of a retailer shopfront in Guwahati',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'One shop visit, start to finish',
    walkthrough: [
      {
        icon: 'MapPin',
        title: 'He checks in when he reaches the shop',
        body:
          'One tap marks the visit with the time and the place. You see who is standing at which retailer without ringing anyone to ask.',
        image: '/assets/screenshots/field-visits-feed-mockup.webp',
        alt: 'Field visit feed showing salesman check-ins with time and location',
        width: 600,
        height: 1242,
      },
      {
        icon: 'Camera',
        title: 'The visit proves itself',
        body:
          'Every visit carries a geo-tagged, time-stamped photo. The shop front, the shelf, the stock lying in the corner. Nothing to argue about at month end.',
        image: '/assets/screenshots/field-visit-photo-mockup.webp',
        alt: 'Geo-tagged and time-stamped photo captured on a field visit',
        width: 600,
        height: 1243,
      },
      {
        icon: 'PackageCheck',
        title: 'The order is booked against live stock',
        body:
          'Live stock sits next to every item, so nobody promises what the godown does not have. The order becomes a sales order in your Tally, and the pending quantity is tracked until it ships.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Sales order screen showing pending quantities against each item',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Activity',
        title: 'You watch the day while it happens',
        body:
          'Visits, orders and collections per salesman, as they land. The evening call asking everyone what they did stops being necessary.',
        image: '/assets/screenshots/field-visit-outcomes-mockup.webp',
        alt: 'Live view of visit outcomes, orders and collections per salesman',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Target',
        title: 'Targets and commission settle themselves',
        body:
          'Monthly targets with live progress, and commission worked out per salesman from what actually got billed and collected.',
        image: '/assets/screenshots/sales-target-mockup.webp',
        alt: 'Monthly sales target with live progress for a salesman',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Lock',
        title: 'Each person sees only their part',
        body:
          'View and create rights are set per register, per person. You can restrict which ledgers and which stock groups a salesman sees, so the field team works without your whole book being open to them.',
        image: '/assets/screenshots/rbac.webp',
        alt: 'Role-based access settings controlling what each user can see and do',
        width: 904,
        height: 1874,
      },
    ],
    comparison: {
      heading: 'What changes once the order leaves the shop',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Voucher types your team can raise from the phone',
          takkada: '13, including credit and debit notes, contra and stock journal',
          others: 'A narrower set, typically built around sales and orders',
        },
        {
          feature: 'Collecting the money on the same visit',
          takkada: 'UPI link on every invoice at 0% MDR, no transaction cap, no monthly fee',
          others: 'Reminders, without a zero-MDR collection option',
        },
        {
          // "close" was here and it was wrong. The e-way bill closure facility
          // is not in force: GSTN Advisory No. 668 of 29 July 2026 put it in
          // abeyance until further notice, so no app can offer it, ours
          // included. Our own content/blog/e-way-bill-closure-rule-2026.md has
          // said so since 2026-08-04. Cancellation is real and code-verified
          // (cancel-gst-compliance Edge Function, gated by
          // einvoice_ewaybill_mobile), so that is what we claim.
          feature: 'E-invoice and e-way bill from the phone',
          takkada: 'Generate and cancel, both written back into Tally',
          others: 'Generate only',
        },
        {
          feature: 'Entering a purchase bill or a handwritten order from a photo',
          takkada: 'Photograph it and check the lines before it posts',
          others: 'Not offered',
        },
        {
          feature: 'How the licence is counted',
          takkada: 'Per business',
          others: 'Often per device, so every extra phone costs again',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Copilot',
      note: 'Role-based salesman access is part of the Copilot plan. It is no longer sold as a separate add-on.',
    },
    faqs: [
      {
        q: 'What does a salesman app for Tally actually do?',
        a: 'It gives your field team the parts of Tally they need in the market and writes their work back into your books. A salesman checks in at a shop, sees the party ledger and live stock, books an order or raises an invoice, takes a UPI payment, and captures a geo-tagged photo of the visit. Each of those becomes a voucher in your Tally, so nobody re-enters the day in the evening.',
      },
      {
        q: 'Does the salesman need Tally installed on his phone?',
        a: 'No. Tally stays on your machine in the office and stays the system of record. A connector on that machine syncs with the Takkada app, so your salesman carries only the app on an ordinary Android or iPhone. He never opens Tally, and he never gets a Tally licence of his own.',
      },
      {
        q: 'Can I stop a salesman from seeing my whole ledger?',
        a: 'Yes. View and create rights are set per register and per person, and you can restrict which ledgers and which stock groups a user sees. A salesman can be given his own parties and the registers he needs to work, while purchase costs, other salesmen’s parties and the rest of the book stay out of his view.',
      },
      {
        q: 'What happens to the order the salesman books at the shop?',
        a: 'It becomes a sales order in your Tally against the right party and the right items, with the pending quantity tracked until it ships. When you convert it to an invoice, the retailer gets the PDF and a payment link on WhatsApp, and the receipt reconciles itself against that invoice once they pay.',
      },
      {
        q: 'Does it work when the shop has no network?',
        a: 'It needs a working data connection. Takkada does not have an offline mode, so in a dead-signal pocket your salesman will have to move to where there is signal before the entry goes through. On ordinary 4G in a market street it works normally.',
      },
      {
        q: 'How does commission get calculated?',
        a: 'Each salesman carries a monthly target, and progress updates as invoices and collections come in against his name. Commission is worked out per salesman from that same data, so the figure you pay comes from what was actually billed and collected rather than from a separate spreadsheet someone maintains.',
      },
    ],
    relatedPosts: [
      {
        slug: 'salesman-app-tally-india',
        title: 'Salesman App for Tally in India: What Field Teams Actually Need',
      },
      {
        slug: 'salesman-visit-tracking-photo-proof',
        title: 'Salesman Visit Tracking App: What Actually Proves He Went',
      },
      {
        slug: 'restrict-salesman-access-tally',
        title: 'How to Restrict Salesman Access in Tally Without Locking Him Out of His Job',
      },
      {
        slug: 'salesman-order-to-tally-without-reentry',
        title: 'Salesman Order Taking Without Re-Entry: Punch It Once, Into Tally',
      },
    ],
    priority: 0.9,
  },
];

/** Path with the leading slash, e.g. '/salesman-app-tally'. */
export function featurePagePath(page) {
  return `/${page.slug}`;
}

/** Look one page up by slug. Returns undefined when the slug is unknown. */
export function getFeaturePage(slug) {
  return FEATURE_PAGES.find((p) => p.slug === slug);
}

// Spread into routeMetadata by src/data/siteMetadata.js. `sourceFile` points at
// this file so the sitemap's <lastmod> moves whenever a page's content is
// edited, which is the honest signal (the template component barely changes).
export const featureRouteMetadata = FEATURE_PAGES.map((page) => ({
  path: featurePagePath(page),
  llms: page.llms,
  sourceFile: 'src/data/featurePages.js',
  changefreq: 'monthly',
  priority: page.priority,
}));

// Consumed by the footer "Features" column in src/data/siteContent.js.
export const featureFooterLinks = FEATURE_PAGES.map((page) => ({
  label: page.footerLabel,
  page: page.slug,
}));
