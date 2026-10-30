import { featureFooterLinks } from './featurePages.js';
import { LEAD_FEATURE_SLUGS } from './featureGroups.js';

// The footer's Features column, curated 2026-08-11 down to the lead tier. It
// used to carry every feature page, which past ten links spilled into a
// grid-spanning block of small type on every page of the site — the shape a
// reader learns to skip. Order follows LEAD_FEATURE_SLUGS, so the column, the
// header panel and the hub's lead grid read the same way round.
//
// Reachability is unaffected and provable: the hub links all of them and its
// build guard fails if it ever stops, the header panel now carries the lead
// eight on every page, and the union is asserted in
// src/data/__tests__/feature-pages.test.js.
const leadFooterLinks = LEAD_FEATURE_SLUGS.map((slug) =>
  featureFooterLinks.find((link) => link.page === slug)
).filter(Boolean);

// Anchor contract (CLAUDE.md §11.6): every #id here must exist as an element
// id on the rendered Home page. "How It Works" left with the section it
// pointed at (Home v3, 2026-08-03); the setup story lives in the FAQ now.
export const navLinks = [
  // "Product" left the top level on 2026-08-11. It scrolled to a homepage
  // section, so from any other page it was a link back to the homepage
  // labelled as though it went somewhere about the product, and it sat next to
  // Features saying roughly the same thing. Home keeps its #product id: the
  // anchor contract runs one way, ids without menu items break nothing.
  //
  // Points at the hub page, not the homepage #features section. The section
  // still exists and still tells the story; what it cannot do is give the
  // feature landing pages a crawlable parent, which is the job this slot now
  // does. `disclosure` opts this entry into the desktop panel in Layout.jsx —
  // it stays an ordinary link everywhere else, the mobile menu included.
  { label: 'Features', href: '/features', disclosure: 'features' },
  // The one documented exception to "no homepage-section anchors in the top
  // level": there is no standalone pricing page to point at, and creating one
  // is out of scope. Revisit if a /pricing route ever ships.
  { label: 'Pricing', href: '#pricing' },
  { label: 'Partners', href: '/partners' },
  { label: 'Blog', href: '/blog' },
];

// \u2500\u2500 Home v3 content model (2026-08-03 rebuild) \u2500\u2500
// Every feature claim below traces to the claims table in
// PaySaathi: docs/plans/2026-08-03-003-feat-takkada-homepage-revamp-plan.md,
// verified against prod company_feature_entitlements on 2026-08-03.
// Re-verify counts on publish day before merging.

export const heroContent = {
  overline: 'For Indian distributors on Tally',
  // The H1 and body are owned by src/data/heroHotspots.js (HERO_HOME) because
  // they swap as the visitor taps the phone. This object keeps what is static.
  promise: 'Built on top of your Tally.',
  // The one founder-confirmed public scale figure (CLAUDE.md \u00A75). The monthly
  // rupee volume was retired on 2026-09-18 (operator direction) and
  // scripts/checkRetiredClaims.mjs keeps it out of the build.
  stats: [{ value: 100, prefix: '', suffix: '+', label: 'Businesses' }],
};

// Seven features in plain words, on the homepage where "Follow one invoice"
// used to sit (trial, 2026-10-31). No screenshots and no scroll story: a
// numbered tag, a title, one summary line, two or three short points and the
// page that explains it (the tag + line + points shape follows Livekeeping's
// features section; the wording is ours). Every point
// repeats a claim the site already makes and has checked: the rate card (20+
// reports, unlimited companies), the differentiators (WhatsApp dispatch with a
// Pay now link, receipt posted back into Tally, IRN and e-way bill cancel from
// the phone) and the feature pages (salesman scoping and geo-tagged visits,
// reminders that skip a party who has paid). The section keeps the
// #digital-collection id the footer links to and the #features id. Layout
// (2026-10-31, owner): a divider line, one H2 "Features", two cards to a row
// (one on smaller screens), and a closing link to the full list at /features.
export const homeFeatures = {
  heading: 'Features',
  // Closes the section: the hub at /features lists every feature page, and
  // the add-ons are linked from there and from the pricing strip.
  more: {
    text: 'Takkada provides more features and add-ons.',
    linkLabel: 'Explore all features',
    href: '/features',
  },
  items: [
    {
      icon: 'reports',
      tag: 'Reports',
      title: 'Tally Reports on Your Phone',
      line: 'Your Tally books, open on your phone wherever you are.',
      points: [
        'See outstanding, sales, stock and ledgers, straight from your Tally.',
        'Over 20 reports, for every company you run in Tally.',
        'Check who owes you and for how long, party by party.',
      ],
      href: '/tally-reports-on-mobile',
    },
    {
      icon: 'invoice',
      tag: 'Billing',
      title: 'Invoices From Your Phone',
      line: 'Make bills and entries on the phone, and they land in your Tally.',
      points: [
        'Create sales invoices, sales orders, delivery challans and credit notes from your phone.',
        'Every entry is saved straight into your Tally, so nobody types it again.',
        'Turn a batch of pending orders into invoices in one go.',
      ],
      href: '/tally-on-mobile',
    },
    {
      icon: 'einvoice',
      tag: 'GST',
      title: 'E-Invoice & E-Way Bill',
      line: 'GST e-invoices and e-way bills from the phone, written back to Tally.',
      points: [
        'Generate the e-invoice (IRN and QR code) and the e-way bill from your phone.',
        'Both numbers are saved against the same invoice in Tally.',
        'Cancel a wrong e-invoice or e-way bill from the phone too.',
      ],
      href: '/e-invoice-from-phone',
    },
    {
      icon: 'whatsapp',
      tag: 'WhatsApp',
      title: 'Invoices on WhatsApp',
      line: 'Every bill reaches the customer on WhatsApp on its own.',
      points: [
        'The invoice PDF goes to your customer on WhatsApp as soon as it is saved in Tally.',
        'The message carries the amount and a Pay now link.',
        'Share a ledger statement with any party on WhatsApp.',
      ],
      href: '/whatsapp-invoice-tally',
    },
    {
      icon: 'reminders',
      tag: 'Reminders',
      title: 'Automatic Payment Reminders',
      line: 'Overdue parties get reminded without you picking up the phone.',
      points: [
        'Send WhatsApp reminders to overdue parties automatically, on the days you choose.',
        'Each reminder carries the amount, the bill and a pay link.',
        'A party that has paid drops out of the next reminder.',
        'Set a cap so no party is messaged too often.',
      ],
      href: '/send-payment-reminders-automatically',
    },
    {
      icon: 'salesman',
      tag: 'Sales team',
      title: 'Salesman Module',
      line: 'Know what each salesman booked and which shops he visited today.',
      points: [
        'Your salesmen take orders on their phone, against live stock and the right price.',
        'Each salesman sees only his own parties.',
        'Track every visit with a check-in and a geo-tagged photo.',
        'Check-ins save without signal and upload when it returns.',
      ],
      href: '/salesman-app-tally',
    },
    {
      icon: 'reconcile',
      tag: 'Reconciliation',
      title: 'Auto-Reconciliation in Tally',
      line: 'Payments match themselves to invoices and post into Tally.',
      points: [
        'When a customer pays on the UPI link, the payment matches itself to the right invoice.',
        'The receipt entry is posted in Tally automatically.',
        'Import your bank statement and each entry is matched for you.',
      ],
      href: '/auto-reconciliation-tally',
    },
  ],
};

// Compressed Tally-trust block: the connector story in three specific
// behaviors plus the download. The deep safety story lives in #data-safety.
export const tallyTrust = {
  overline: 'The Tally Connector',
  heading: 'Your books stay on your PC.',
  subtitle:
    'A small Windows program sits next to your Tally and syncs both ways in real time. Your books never leave your computer.',
  points: [
    {
      icon: 'refresh',
      title: 'Two-way sync',
      description: 'Every invoice created in Tally appears in Takkada. Every entry made in Takkada posts back into Tally.',
    },
    {
      icon: 'shield',
      title: 'Nothing writes without you',
      description: 'Tracking and reminders are read-only. Vouchers post only when you or your team create them.',
    },
    {
      icon: 'monitor',
      title: 'Runs where you can see it',
      description: 'Open the connector, watch what it syncs, pause it, or remove it any time.',
    },
  ],
  downloadNote: 'Windows PC required. Works with Tally Prime and Tally ERP 9.',
};

// FAQ for the home page; also feeds faqPageSchema on Home and /tally-on-mobile.
export const homeFaqItems = [
  {
    question: 'Do I need to replace Tally?',
    answer:
      'No. Takkada sits on top of your existing Tally installation. Your data stays in Tally. Nothing migrates, nothing moves.',
  },
  {
    question: 'Will my current invoice format and numbering stay the same?',
    answer:
      'Yes. Takkada reads and writes to your Tally. The invoice format you have been using, the numbering series, and the GST configuration all stay exactly as they are today.',
  },
  {
    question: 'What happens when my laptop is off and my salesman needs to raise an invoice?',
    answer:
      'The salesman raises the invoice from his phone. When your laptop next opens Tally, the voucher syncs in. The field team never waits.',
  },
  {
    question: 'How much does UPI cost?',
    answer:
      'Zero. UPI is pass-through. For card and netbanking we charge the standard MDR that the payment gateway charges us. No markup from Takkada.',
  },
  {
    question: 'Can I try it before I pay?',
    answer:
      'Yes. Every plan comes with a 7-day free trial, no card required. If you are being onboarded by one of our partners, they will walk you through the setup.',
  },
  {
    question: 'Is there a plan for a business with only one user?',
    // Per-device pricing was withdrawn 2026-08-12 (it was drift, not an
    // offer) \u2014 this answer must not quote a device price.
    answer:
      'Yes. Every plan includes one user, and you can add more. Your partner quotes extra users per year.',
  },
];

// Voice rule: real quotes only — every entry here renders on the wall AND
// emits a schema.org Review node, so nothing goes in this array until the
// founder supplies the real quote. The wall layout and Review coupling
// already handle 3-5 entries; to add one, append:
//   { quote: '<their exact words>', name: '<real name>', role: '<business, city>' },
export const testimonials = [
  {
    quote: 'Before Takkada, I couldn\'t take a single leave. I had to be at the counter to check payments, make vouchers, update Tally. Now it\'s completely stress-free. Everything happens automatically.',
    name: 'Rajesh Sharma',
    role: 'FMCG Distributor, Pune',
  },
  {
    quote: 'Pehle bank payments ko manually check karke Tally mein entries karni rehti thi. Takkada mein bank statement import se auto-reconciliation ho jaata hai, aur pending payments ke liye smart WhatsApp reminders chale jaate hain. Hamara experience bohot hi achha raha hai.',
    name: 'Meet Patel',
    role: 'Owner, Dhan Laxmi',
  },
];

// Verified distributor video testimonials. Add new entries here to feature more video stories.
export const videoTestimonials = [
  {
    id: 'meet-patel-dhan-laxmi',
    name: 'Meet Patel',
    role: 'Owner',
    company: 'Dhan Laxmi',
    location: 'Gujarat, India',
    industry: 'Distribution & Wholesale',
    badge: 'Verified Takkada Customer',
    duration: '1:57 min',
    quote: 'Pehle bank payments ko manually check karke Tally mein entries karni rehti thi. Takkada mein bank statement import karte hain, party mapping ke baad auto-reconciliation ho jaata hai. Aur party-wise pending payments track karke smart WhatsApp reminders aur notices bhej sakte hain.',
    summary: 'How Dhan Laxmi solved seasonal stock calculations, bank statement auto-reconciliation, and payment follow-ups on Tally.',
    takeaways: [
      {
        title: 'Auto-Reconciliation from Bank Statement',
        desc: 'One-time mapping, then statement import reconciles bank entries into Tally automatically.',
      },
      {
        title: 'Party-Wise Pending Tracking & Smart Reminders',
        desc: 'Track active vs pending parties with automated WhatsApp payment notices.',
      },
      {
        title: 'Same-Day Support & Resolution',
        desc: 'Direct same-day resolution whenever operational or scheme calculation questions arise.',
      },
    ],
    video: {
      type: 'mp4',
      src: '/assets/videos/testimonials/meet-patel-dhan-laxmi.mp4',
      poster: '/assets/testimonials/Meet_Patel_thumbnail_square.jpg',
      title: 'Meet Patel, Owner of Dhan Laxmi sharing his Takkada experience',
      // Machine-readable only: read by videoObjectSchema() in src/data/schema.js
      // and never rendered. The trade and city were supplied by the operator
      // (2026-10-26) for search metadata; the visible card keeps "Distribution
      // & Wholesale" and "Gujarat, India" on purpose.
      uploadDate: '2026-10-26T00:05:55+05:30',
      durationIso: 'PT1M57S',
      schemaDescription:
        'Meet Patel, owner of Dhan Laxmi, an agricultural seeds distributor in Ahmedabad, Gujarat, on importing bank statements into Tally with auto-reconciliation, tracking party-wise pending payments and sending WhatsApp payment reminders with Takkada.',
      contentLocation: 'Ahmedabad, Gujarat, India',
    },
  },
];


// Proof strip (2026-08-06 conversion pass, R3): the pull-quote and the two
// confirmed figures move AHEAD of pricing so the visitor reaches the rate
// card already convinced. Renders testimonials[0] and heroContent.stats;
// no copy of its own beyond the overline.
export const proofStrip = {
  id: 'testimonial',
  overline: 'From a Takkada customer',
};

// The differentiator band (2026-08-06 conversion pass, R4): what only
// Takkada does, competitors deliberately unnamed. Every row was verified
// against the 2026-08-06 competitor grid and live prod:
//   - auto WhatsApp dispatch: live, Takkada-only in the grid
//   - zero-MDR UPI + auto-reconciliation: live, Takkada-only in the grid
//     (the MDR sentence is locked wording; differentiators.test.js pins it)
//   - cancel IRN / e-way bill from the phone: Takkada-unique as of
//     2026-08-06, re-verify fortnightly. CLOSE is not built. Never claim it.
// Excluded by the same check: godown/cost-centre RBAC (plan-ready, NOT
// built) and cost-centre allocation (prod mappings table has zero rows,
// verified 2026-08-06). differentiators.test.js enforces the exclusions.
export const differentiators = {
  id: 'why-takkada',
  overline: 'Where The Others Stop',
  heading: 'Plenty of apps show you Tally on a phone. The work after the invoice stays yours.',
  intro:
    'The common pattern stops when the invoice PDF lands on your screen. Everything after that, the sending, the collecting, the matching, is still your evening. Here is where Takkada keeps going.',
  rows: [
    {
      stop: 'The pattern stops at the invoice PDF',
      others: 'The invoice is on your phone, and sending it is still your job. Party by party, attachment by attachment.',
      takkada: 'The PDF reaches the customer on WhatsApp the moment the invoice posts in Tally, with a Pay now link attached. You send nothing.',
    },
    {
      stop: 'The pattern stops at showing what is due',
      others: 'The app tells you who owes what. Collection still happens over phone calls and QR-code screenshots.',
      takkada: 'Every invoice carries a UPI payment link. 0% MDR on UPI collections, no transaction cap, no monthly fee.',
    },
    {
      stop: 'The pattern stops before the books',
      others: 'When money does land, someone still sits with the bank statement at 9 PM matching payments to invoices in Tally.',
      takkada: 'The payment matches itself to the invoice and posts the receipt entry back into Tally on its own.',
    },
    {
      stop: 'The pattern stops at generating the paperwork',
      others: 'Where e-invoicing exists at all, it ends at generation. A wrong bill still means logging into the government portal from the office PC.',
      takkada: 'Generate and cancel the IRN and the e-way bill from the phone, each written back against the same voucher in Tally.',
    },
  ],
  footnote: 'Every behavior above is live in the product today. None of it is roadmap.',
};

// Answers the fear that dominates the "Tally mobile app" informational SERP:
// will connecting an app break my Tally, and is my data safe. Every claim is
// a specific behavior, not a security superlative.
export const trustSection = {
  overline: 'Data Safety',
  heading: 'Your Tally stays exactly as it is',
  subtitle:
    'Connecting anything to your books is a trust decision. Here is precisely what Takkada does and does not touch.',
  points: [
    {
      icon: 'database',
      title: 'Your books never leave your Tally',
      body:
        'Takkada syncs with the Tally installed on your own computer. Your data files stay where they are today. Stop using Takkada and your Tally keeps working exactly as before.',
    },
    {
      icon: 'shield',
      title: 'Nothing writes to Tally without you',
      body:
        'Receivables tracking and reminders are read-only. A voucher posts into Tally only when you or your team create it in the app, and every entry shows who made it.',
    },
    {
      icon: 'badge',
      title: 'Official apps under a registered company',
      body:
        'Takkada is listed on the Play Store and App Store under Pay Saathi Innovation LLP. No APK from a forwarded link, no sideloading.',
      links: [
        { label: 'Play Store listing', hrefKey: 'playStore' },
        { label: 'App Store listing', hrefKey: 'appStore' },
      ],
    },
    {
      icon: 'monitor',
      title: 'The connector runs where you can see it',
      body:
        'A small Windows program sits next to Tally on your PC and does the syncing. You can open it, watch what it syncs, pause it, or remove it any time.',
    },
  ],
  articleLink: {
    label: 'Read the full safety explainer',
    href: '/blog/is-it-safe-to-connect-app-to-tally/',
  },
};

// Indian-format rupee amount, e.g. 19125 -> "\u20B919,125". Every price string on
// the site is derived from a number through this, so the 3-year maths can
// never drift from the 1-year rate card.
export function formatInr(amount) {
  return `\u20B9${Math.round(amount).toLocaleString('en-IN')}`;
}

// Billing terms. The 3-year term is the same rate card with 25% off, quoted
// per year so the two columns compare like for like.
export const PRICING_TERMS = [
  { id: '1y', label: '1 year', years: 1, discount: 0 },
  { id: '3y', label: '3 years', years: 3, discount: 0.25, badge: 'Save 25%' },
];

export const DEFAULT_PRICING_TERM = '3y';

/**
 * Resolve one plan against one billing term.
 * Returns the per-year headline price plus, on multi-year terms, the amount
 * billed up front, the struck-through list rate, and the rupees saved.
 */
export function planPricing(plan, termId = DEFAULT_PRICING_TERM) {
  const term = PRICING_TERMS.find((t) => t.id === termId) ?? PRICING_TERMS[0];
  const perYear = plan.annualPrice * (1 - term.discount);
  const total = perYear * term.years;
  const listTotal = plan.annualPrice * term.years;
  return {
    term,
    perYear,
    total,
    saving: listTotal - total,
    price: formatInr(perYear),
    period: '/year + GST',
    listPrice: formatInr(plan.annualPrice),
    // On a 1-year term the headline price already is the total, so there is
    // nothing to add. Only the multi-year terms earn a second line.
    totalLabel:
      term.years > 1 ? `${formatInr(total)} billed once for ${term.years} years` : null,
    savingLabel: term.discount > 0 ? `You keep ${formatInr(listTotal - total)}` : null,
  };
}

export const pricing = {
  terms: PRICING_TERMS,
  defaultTerm: DEFAULT_PRICING_TERM,
  // Clarity (₹2,900) was retired from sale 2026-10-04 (plan 2026-10-04-002).
  // Existing subscribers renew it through the partner config; the public site
  // never offers it again.
  plans: [
    {
      plan: 'Momentum',
      annualPrice: 4500,
      price: '\u20B94,500',
      period: '/year + GST',
      description: 'Bill from the godown or the passenger seat.',
    },
    {
      plan: 'Assurance',
      annualPrice: 6480,
      price: '\u20B96,480',
      period: '/year + GST',
      description: 'Paperwork done before the truck leaves the gate.',
    },
    {
      plan: 'Copilot',
      annualPrice: 9000,
      price: '\u20B99,000',
      period: '/year + GST',
      description: 'The evening data-entry shift, handled.',
      badge: 'Most Popular',
      highlighted: true,
    },
    {
      plan: 'Enterprise',
      annualPrice: 24000,
      price: '\u20B924,000',
      period: '/year + GST',
      description: 'Schemes, recovery, order links, AI calling and one billing engine, in one price.',
      badge: 'Most complete',
    },
  ],
  // The capability matrix is the single source of truth for what each plan
  // carries. `from` is the index of the first plan in `plans` that includes
  // the row, which is what makes the ladder literal: a tick fills every
  // column from `from` rightward, so inheritance is visible instead of being
  // spelled out as "Everything in X, plus:" on every card.
  // Group titles name what the distributor stops doing, not a feature family.
  matrix: [
    {
      group: 'See the books',
      rows: [
        { label: 'Live receivables and payables from Tally', from: 0 },
        { label: 'Automatic WhatsApp payment reminders', from: 0 },
        { label: 'Share ledgers and invoice PDFs', from: 0 },
        { label: '20+ business reports', from: 0 },
        { label: 'Works when the Tally laptop is off', from: 0 },
      ],
    },
    {
      group: 'Raise entries from anywhere',
      rows: [
        { label: 'Vouchers from mobile and web', from: 0 },
        { label: 'Edit vouchers from anywhere', from: 0 },
        { label: 'Delivery challans and sales orders', from: 0 },
        { label: 'Your own invoice PDF template', from: 0 },
      ],
    },
    {
      group: 'Clear the paperwork',
      rows: [
        { label: 'E-Invoice with IRN and QR from your phone', from: 1 },
        { label: 'E-Way Bill in one tap, no portal login', from: 1 },
        { label: 'Both write back into Tally', from: 1 },
      ],
    },
    {
      group: 'Hand over the typing',
      rows: [
        { label: 'Import from PDF for supplier bills', from: 2 },
        { label: 'Bank statement import with auto-matching', from: 2 },
        { label: 'Auto Invoice Dispatch on every Tally invoice', from: 2 },
        { label: 'Reports + advanced reporting', from: 2 },
        { label: 'Role-based access for salesman teams', from: 2 },
      ],
    },
    // Enterprise's own rows. Without them its column would tick exactly what
    // Copilot ticks at nearly three times the price. The capability behind
    // each row exists on prod (entitlements checked 2026-10-04); its for-sale
    // status depends on the plan 2026-10-04-002 backend. Capability claims
    // only, never adoption claims.
    {
      group: 'Modules switched on',
      rows: [
        { label: 'One billing engine: FMCG, Auto parts or Ladder discount', from: 3 },
        { label: 'Trade schemes and scheme credit notes', from: 3 },
        { label: 'Recovery dashboard with promise-to-pay follow-ups', from: 3 },
        { label: 'Customer order link and personal party links', from: 3 },
        { label: 'AI collection calls, billed per connected minute', from: 3 },
      ],
    },
  ],
  // Add-ons never show a price on the site: partners quote them (ruled
  // 2026-10-04, plan 2026-10-04-002). Each item is a label and one line of
  // what it does, and NO `price` key. checkRateCardDrift fails the build if a
  // priced add-on comes back without a snapshot entry, and the rendered-page
  // scan fails on any rupee figure the plans cannot justify.
  addons: [
    { label: 'FMCG billing', note: 'A fast billing counter, with retail margin and discount set per item.' },
    { label: 'Auto parts billing', note: 'Selling prices worked out from what the last container cost, plus your markup.' },
    { label: 'Schemes', note: 'Buy X get Y free, quantity slabs and invoice-value discounts, applied as you bill.' },
    { label: 'Ladder discount', note: 'Named discounts in steps, with one aggregate on your invoice and in Tally.' },
    { label: 'Recovery dashboard', note: 'Log every follow-up and promise to pay, and see which promises were missed.' },
    { label: 'Customer order link', note: 'Customers order from a link to your item list, and you approve each one into Tally.' },
    { label: 'Personal party links', note: 'A link of its own for each party, so every order arrives already matched to them.' },
    { label: 'AI calling', note: 'AI voice calls to overdue parties, with the promise logged back. Billed per connected minute.' },
    // The rendered-page guard (home-v3.test.jsx) still requires "early access"
    // beside every own-number mention, so the note leads with it.
    { label: 'Your own WhatsApp number', note: 'Early access: reminders and invoices go out from your WhatsApp Business number.' },
    { label: 'WhatsApp 8,000-message pack', note: 'More WhatsApp messages for reminders and invoice dispatch.' },
    { label: 'Payment Collection', note: 'UPI links on every invoice at zero MDR, matched back into Tally.' },
    { label: 'Barcode labels', note: 'Stickers with the box quantity built in, scanned into bills by phone camera or barcode gun.' },
    { label: 'Extra user', note: 'Every plan comes with one user. Add a login for each extra person.' },
  ],
  addonsCta: 'Ask your partner for pricing',
};

/**
 * The homepage's headline range ("₹4,500 to ₹24,000"), derived from the plan
 * list. A hand-typed copy of this range in Home.jsx drifted from the table
 * once already (drift episode #2, 2026-08) — derive it, never type it.
 */
export function planPriceRange(plans = pricing.plans) {
  const prices = plans.map((p) => p.annualPrice);
  return `${formatInr(Math.min(...prices))} to ${formatInr(Math.max(...prices))}`;
}

// One option that cannot be a plan column or a capability row, because it is
// not priced per user: consolidated reports across companies, quoted against
// the customer's company list. It closes the rate table the same way
// `pricing.addons` does. (The self-hosting line was removed in df3bef1.)
//
// The line is operator-supplied (2026-08-06) and already prints on slide 13
// of pitch-deck/takkada-product-deck-2026-08.html. The wording here is adapted
// from that slide on purpose: the prospect who gets the deck and the prospect
// who only finds the site should read the same offer.
//
// Claims discipline: a capability claim with ZERO delivered deployments as of
// 2026-08-11. No adoption language ("customers run this", "used by") is
// permitted anywhere near it (CLAUDE.md \u00A73, \u00A75).
//
// It carries no rupee figure ("Custom pricing"); if one is ever added, route it
// through formatInr and pin it in src/routes/__tests__/pricing-table.test.jsx.
export const biggerSetups = {
  title: 'Bigger setups',
  // Sits in the table's label column, the way `rate-table-corner` carries the
  // "what you get" note. Without it the column is empty white next to the
  // card.
  intro: 'Some businesses need more than a plan column. This one is priced against your setup rather than your user count.',
  items: [
    {
      id: 'multi-company',
      title: 'Consolidated reports across companies',
      body: 'The second company keeps its own books, and somebody adds the two together by hand every month end. Receivables, sales and reports arrive as one view across every company you run.',
      price: [{ amount: 'Custom pricing', note: 'quoted against your company list' }],
    },
  ],
  note: 'GST extra, same as every price on this page.',
  ctaLabel: 'Talk through your setup on WhatsApp',
};

export const faqItems = [
  {
    question: 'How does Takkada sync with Tally?',
    answer: 'Takkada uses a lightweight Windows connector that runs alongside your Tally installation. It syncs data in real-time \u2014 any invoice created in Tally automatically appears in Takkada, and any payment collected through Takkada is automatically recorded back in Tally.',
  },
  {
    question: 'Do I need to change how I use Tally?',
    answer: 'Not at all. You continue using Tally exactly as you do today. Takkada works alongside Tally and syncs data automatically. There is no change to your existing workflow.',
  },
  {
    question: 'What payment methods can my customers use?',
    answer: 'Customers can pay via UPI (free), Debit Cards (free), Credit Cards (1.82%), and Net Banking (B2B rates). We also support surcharge mode if you want to pass payment costs to your customers.',
  },
  {
    question: 'How long does setup take?',
    answer: 'The app setup and KYC takes about 24 hours for account activation. Tally integration is same-day. Payment gateway activation takes 4-7 business days. You can start using the tracking and reminder features immediately.',
  },
  {
    question: 'Can I control what my employees see?',
    answer: 'Yes. Takkada has full role-based access control. You can define what each team member can view, create, update, or delete across sales, purchases, and receipts. You can also restrict which ledgers and stock groups are visible to each user.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'We offer a personalized demo where we show you exactly how Takkada works with your business data. Book a demo to get started.',
  },
];

// Named here rather than read off appLinks below, which is declared after this
// array and would be in its temporal dead zone. appLinks.tallyConnector points
// at this same constant, so there is still one URL.
const TALLY_CONNECTOR_URL =
  'https://paysaathi-desktop-autoupdate.s3.ap-south-1.amazonaws.com/releases/takkada-setup.exe';

export const footerColumns = [
  {
    title: 'Product',
    // Four of these pointed at homepage sections that the 2026-09-18 revamp
    // removed (the AI band carried #pdf-import, the capability grid carried
    // #smart-reminders, #e-invoicing and #rbac). A footer link to an id that is
    // no longer rendered is a dead anchor (CLAUDE.md §11.6), so each now points
    // at the feature page that covers the same ground. The two hashes that
    // survive are the two sections the revamp kept.
    links: [
      { label: 'Import from PDF', page: 'import-purchase-from-pdf' },
      { label: 'Tally Connector', href: '#tally' },
      // The installer itself, directly under the section that explains it.
      // Wording is deliberately different from the line above: two links a row
      // apart both reading "Tally Connector", one scrolling and one starting a
      // download, is the collision this label exists to avoid.
      { label: 'Download for Windows', href: TALLY_CONNECTOR_URL, download: true },
      { label: 'Payment Collection', href: '#digital-collection' },
      { label: 'Smart Reminders', page: 'send-payment-reminders-automatically' },
      { label: 'E-Invoicing', page: 'e-invoice-from-phone' },
      // The salesman page is where role-based visibility is actually described
      // ("each salesman sees only his own parties"), so the label says that
      // rather than keeping an acronym over a page about the team.
      { label: 'Role-based access', page: 'salesman-app-tally' },
    ],
  },
  {
    title: 'Features',
    // The hub leads the column so the footer has a way up to the directory as
    // well as across to each page. See leadFooterLinks above for why the
    // column stops at the lead tier.
    links: [{ label: 'All features', page: 'features' }, ...leadFooterLinks],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', page: 'about-us' },
      { label: 'Contact Us', page: 'contact-us' },
      { label: 'Partners', page: 'partners' },
      { label: 'Blog', page: 'blog' },
      // The manual's hub. It sits beside the blog because both are content
      // directories, and the label deliberately mirrors "All features": a
      // customer looking for instructions is not looking for a buying page, so
      // this must not reuse a feature page's search phrase as its anchor text.
      { label: 'All guides', page: 'guide' },
      { label: 'Privacy Policy', page: 'privacy-policy' },
      { label: 'Terms & Conditions', page: 'terms-and-conditions' },
      { label: 'Refund Policy', page: 'refund-policy' },
    ],
  },
  {
    title: 'Connect',
    links: [
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/takkada/' },
      { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61577621565711' },
      { label: 'Email Us', href: 'mailto:admin@paysaathi.com' },
    ],
  },
];

// Demo video for the home page (U4). null until the founder supplies the
// asset — while null the video section renders nothing (never an empty
// frame). To ship: set one of
//   { type: 'mp4', src: '/assets/video/takkada-demo.mp4', poster: '/assets/video/takkada-demo-poster.png', title: 'Takkada in 3 minutes' }
//   { type: 'youtube', id: '<video id>', poster: '<optional poster path>', title: 'Takkada in 3 minutes' }
export const demoVideo = {
  type: 'mp4',
  src: '/assets/videos/takkada-reconciliation-music.mp4',
  title: 'Takkada Auto-Reconciliation in Action',
};

// Real, verified count of store reviews for aggregateRating. Leave null until
// the actual App Store + Play Store review counts are confirmed. While this is
// null the schema generator omits aggregateRating entirely, so no fabricated
// rating count is ever emitted. To enable it, set this to the real combined
// count (ratingValue is a true 5 across both stores).
export const appRatingCount = null;

export const appLinks = {
  download: 'https://onelink.to/zs6yp4',
  playStore: 'https://play.google.com/store/apps/details?id=com.paysaathi.takkadaapp',
  appStore: 'https://apps.apple.com/in/app/takkada/id6755435132',
  tallyConnector: TALLY_CONNECTOR_URL,
  bookDemo: 'https://calendar.notion.so/meet/ronakmalu/takkada',
  // WhatsApp Business number behind every wa.me CTA (digits only, country
  // code included). Currently the founder's number from CLAUDE.md §13; swap
  // here when a dedicated business number exists. Empty string disables the
  // WhatsApp CTAs site-wide (they fall back to the calendar link).
  whatsappNumber: '919435977777',
  // The app's demo entry screen. THE HASH IS LOAD-BEARING: the app runs
  // hash routing, so 'https://app.takkada.com/demo' (the value this carried
  // until 2026-08-04) has never resolved to anything. The phone is appended as
  // '?phone=91XXXXXXXXXX' INSIDE the fragment, which means it never reaches
  // Cloudflare or any server. Link app.takkada.com directly; a redirect from
  // the marketing domain cannot forward a fragment.
  demoApp: 'https://app.takkada.com/#/demo',
};

// Flip to true ONLY after BOTH app repos are promoted to main and the prod
// round trip has been walked with this flag still false: takkada main serving
// the phone-aware /demo screen, supabase-functions main serving
// demo-entry-verified and the hardened paysaathi-booking. src/config/demoBooking
// hard-codes the PROD project, so every build including previews already writes
// to prod; only the app side needs promoting.
//
// While false, the demo CTAs keep their existing fallbacks and the site never
// renders a dead app link. Flipping early ships one: anonymous sign-ins are off
// on prod permanently (D5), so a visitor would land on a screen that cannot
// sign them in.
export const demoEntryLive = true;

// The named competitor grid. Rendered by src/components/ComparisonSection.jsx,
// whose only caller is /tally-mobile-app-comparison. It is NOT on the homepage
// (the Phase 5 commit message and plan note both said it was, checked against
// the live page afterwards and corrected). If a second surface ever renders it,
// this comment is the thing to update.
//
// Refreshed 2026-08-08 from pitch-deck/competitor-analysis-2026-08.md, itself
// re-verified against each product's live listings the same day. Two rows
// changed and one of them was a correction against ourselves: the grid said
// Biz Analyst cannot generate an e-invoice or e-way bill from mobile, and they
// can. Their own website, help manual and store listings still do not show it,
// which is where the wrong row came from. Never leave a row claiming a
// competitor lacks something they have; the disclaimer carries the caveat
// instead.
//
// The row that separates the columns is no longer generation, it is what
// happens after. Cancelling an IRN or an e-way bill from the phone is
// code-verified on our side and absent from fourteen months of Livekeeping
// release notes and the whole Biz Analyst doc set. Closing an e-way bill is
// deliberately NOT a row: GSTN Advisory No. 668 of 29 July 2026 put that
// facility in abeyance, so nobody has it, us included.
export const comparisonSection = {
  overline: 'WHY TAKKADA',
  heading: "What you get that others don't",
  rows: [
    {
      feature: 'Mobile Tally view',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Automated reminders',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Invoice / ledger sharing',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Mobile data entry with two-way Tally write-back',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Generate e-invoice + e-way bill from mobile',
      Takkada: true,
      'Biz Analyst': true,
      Livekeeping: true,
    },
    {
      feature: 'Cancel an e-invoice or e-way bill from the phone',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Credit and debit notes from mobile',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Invoice-linked payment collection',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Zero-MDR UPI collection (UPI charges fully pass-through)',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Auto-reconciliation into Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Auto invoice dispatch from Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'PDF/OCR scan of purchase invoices into Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
    {
      feature: 'Warehouse-level access control per team member',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
  ],
  disclaimer:
    'Compiled on 8 August 2026 from each product’s public listings, release notes and pricing pages. Biz Analyst added e-invoice and e-way bill generation recently and their own site does not list it yet, so check their current pages before you rely on any row here.',
};

export const contactInfo = {
  company: 'Pay Saathi Innovation LLP',
  phone: '+91 94359 77777',
  email: 'admin@paysaathi.com',
  website: 'www.takkada.com',
};
