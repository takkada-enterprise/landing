// Anchor contract (CLAUDE.md §11.6): every #id here must exist as an element
// id on the rendered Home page. "How It Works" left with the section it
// pointed at (Home v3, 2026-08-03); the setup story lives in the FAQ now.
export const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
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
  titleLead: 'Your Tally, on every phone in the business.',
  titleAccent: 'Get paid without chasing.',
  subtitle:
    'Invoices reach customers on WhatsApp the moment they post in Tally. UPI money lands and matches itself back into your books. Your salesmen book orders from the market.',
  // The two founder-confirmed public figures (CLAUDE.md \u00A75); numeric parts
  // split out so the hero can count them up on load.
  stats: [
    { value: 100, prefix: '', suffix: '+', label: 'Businesses' },
    { value: 17, prefix: '\u20B9', suffix: 'Cr+', label: 'Collected monthly' },
  ],
};

// Story 1: the order-to-cash road (2026-08-04 roadmap redesign). One
// continuous journey from the order landing to the payment matched in Tally.
// Every station is a live feature; screenshots are operator-framed mockups.
// The section keeps the #digital-collection anchor the nav/footer point at.
export const storyOrderToCash = {
  id: 'digital-collection',
  overline: 'Order to Cash',
  heading: 'The order goes out. The money finds its way back to Tally.',
  intro:
    'You know this road. The order sits on a pad, the challan is handwritten, the invoice waits for the evening, and the payment comes whenever it comes. Here is the same road with Takkada under it. Every station below is live in the product today.',
  stations: [
    {
      title: 'The order is booked',
      body:
        'Your salesman books it in the market, or you take it at the counter. Live stock sits next to every item, so nobody promises what the godown does not have.',
      screenshot: '/assets/screenshots/add-items-mockup.webp',
      screenshotAlt: 'Building an order in Takkada with live stock on hand next to every item',
    },
    {
      title: 'Goods leave on a challan',
      body:
        'Raise the delivery challan from the phone as the truck loads. Stock moves now, billing follows when you are ready.',
      screenshot: '/assets/screenshots/delivery-challans-mockup.webp',
      screenshotAlt: 'Delivery challan register in Takkada with open challans by customer',
    },
    {
      title: 'What could not ship stays pending',
      body:
        'Low stock cuts an item short, and the shortfall stays live on the order. When stock arrives, it becomes the next invoice in a tap.',
      screenshot: '/assets/screenshots/pending-orders-mockup.webp',
      screenshotAlt: 'Pending order items in Takkada, each with a Make Invoice action',
    },
    {
      title: 'The invoice posts',
      body:
        'Items, GST, and your Tally number series, straight from the phone. Paid or pending shows right on top.',
      screenshot: '/assets/screenshots/invoice-summary-mockup.webp',
      screenshotAlt: 'Invoice in Takkada with item lines, GST, and share actions',
    },
    {
      title: 'IRN and E-Way Bill clear from the same screen',
      body:
        'The e-invoice with QR and the e-way bill generate from the phone and write back into Tally against the same voucher.',
      screenshot: '/assets/screenshots/einvoice-eway.webp',
      screenshotAlt: 'Invoice in Takkada with E-Invoice and E-Way Bill actions',
    },
    {
      title: 'The customer already has it on WhatsApp',
      body:
        'The PDF and a Pay now link reach the customer the moment the invoice posts. You do not type, copy, or attach anything.',
      screenshot: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
      screenshotAlt: 'WhatsApp chat with a Takkada invoice PDF and a Pay now link',
    },
    {
      title: 'Reminders follow up so you do not have to',
      body:
        'Pre-due nudges and post-due follow-ups go out automatically on the schedule you set once. Receipts can go out the same way.',
      screenshot: '/assets/screenshots/smart-reminders-mockup.webp',
      screenshotAlt: 'Smart Reminders schedule settings in Takkada',
    },
    {
      title: 'UPI money lands with zero charges',
      body:
        'UPI is fully pass-through. Card and netbanking MDR is borne by you. Customers pay the link, the money lands in your bank.',
      screenshot: '/assets/screenshots/settlements-mockup.webp',
      screenshotAlt: 'Takkada settlements list showing payments landing in the bank',
    },
    {
      title: 'The payment matches itself in Tally',
      body:
        'Takkada matches the payment to the invoice and posts the accounting entry in Tally. The 9 PM reconciliation ritual disappears.',
      screenshot: '/assets/screenshots/party-ledger-mockup.webp',
      screenshotAlt: 'Party ledger in Takkada with sales, receipts, and the amount left to collect',
    },
  ],
  ctaLine: 'See the whole road on a call with us.',
  // Own-number sending is built but has zero enabled customers (2026-08-03).
  // "Early access" is the operator-confirmed wording; never call it live.
  footnote: 'Want reminders to go from your own WhatsApp Business number? Early access is open, ask us.',
};

// Story 2: the field sales day. Claims discipline: check-in/check-out and
// geo-tagged photo stamps are live on prod (2026-08-03 verification); the
// order/invoice basis toggle is live. Screenshots are operator-framed
// mockups (2026-08-04 set). Step 3's shop photo is an Unsplash-licensed
// storefront (photo bAKYjjvAQIE, cropped to exclude faces, the real shop's
// name, and brand logos) composited into the operator's geotagged template.
export const storyTeamSales = {
  id: 'team-sales',
  overline: 'Team Sales',
  heading: 'Your salesmen in the market. Their day on your phone.',
  intro:
    'A salesman visits eight shops before lunch. Until now you learned what happened at dinner, from memory. Now the trail writes itself as he walks.',
  steps: [
    {
      title: 'He checks in at the shop',
      body:
        'One tap marks the visit with time and place. You see who is where without a single phone call.',
      screenshot: '/assets/screenshots/field-visits-feed-mockup.webp',
      screenshotAlt: 'Field visit feed in Takkada showing salesmen checked in at dealers',
    },
    {
      title: 'The visit proves itself',
      body:
        'Every visit carries a geo-tagged, time-stamped photo. No "shop band tha" stories, no fake visits.',
      screenshot: '/assets/screenshots/field-visit-photo-mockup.webp',
      screenshotAlt: 'Geo-tagged, time-stamped field visit photo of a dealer shop in Takkada',
    },
    {
      title: 'You watch the day live',
      body:
        'Visits, orders, and collections per salesman, as they happen. Role-based access decides what each person can see and do.',
      screenshot: '/assets/screenshots/field-visit-outcomes-mockup.webp',
      screenshotAlt: 'Field visit outcomes in Takkada: visits, payments received, and overdue per salesman',
    },
    {
      title: 'Targets and commission settle themselves',
      body:
        'Monthly targets, live progress, and commission worked out per salesman. The month-end argument is over before it starts.',
      screenshot: '/assets/screenshots/sales-target-mockup.webp',
      screenshotAlt: 'Team Sales leaderboard in Takkada with targets, progress, and commission per salesman',
    },
  ],
  ctaLine: 'Run a field team? Ask us about the salesman module.',
};

// The AI showcase band (2026-08-04, operator direction): the three places
// the AI does the typing. All three verified live on prod — photo/PDF
// purchase + sales-order import promoted 2026-07-26 (sf #273, takkada
// #306); bank statement import live on 90 companies (2026-07-25 count).
// The section carries the #pdf-import anchor the footer points at.
export const aiImport = {
  id: 'pdf-import',
  overline: 'AI Inside',
  heading: 'Photograph it. The entry types itself.',
  intro:
    'Three places where someone used to type line by line. Now the AI reads the paper, fills the entry, and waits for your approval before anything posts.',
  cards: [
    {
      icon: 'camera',
      title: 'Purchase bills, from a photo or PDF',
      body:
        'Click a photo of the supplier bill or drop the PDF. The AI reads the items, GST, and totals into a purchase voucher, matched to your own item names.',
    },
    {
      icon: 'clipboard',
      title: 'Sales orders, straight off paper',
      body:
        'A retailer’s handwritten order becomes a sales order the same way. Photograph it, check the lines, and it is ready to bill.',
    },
    {
      icon: 'building',
      title: 'Bank statements, matched to parties',
      body:
        'Import the statement and the AI matches receipts and payments to the right parties. The books stay current without an evening of entry.',
    },
  ],
};

// The compact grid for everything that is not a headline story. Capability
// claims only; adoption numbers stay off this list. Pending Orders and bulk
// challans are entitlement-gated add-ons ("available", not "everyone has it").
// PDF/photo import and bank import moved up into the aiImport band.
export const featureGridV3 = [
  { id: 'e-invoicing', title: 'E-Invoice & E-Way Bill', description: 'IRN, QR, and e-way bills from the phone, written back into Tally.', icon: 'fileCheck' },
  { id: 'smart-reminders', title: 'Smart Reminders', description: 'Pre-due and post-due WhatsApp follow-ups on your schedule.', icon: 'bell' },
  { id: 'rbac', title: 'Role-Based Access', description: 'Decide what each salesman and accountant can see and do.', icon: 'shield' },
  { id: 'pending-orders', title: 'Pending Orders', description: 'Take orders now, bill later, and watch what is still open.', icon: 'clock' },
  { id: 'bulk-challan', title: 'Bulk Delivery Challans', description: 'Raise a day of challans in one go, available on request.', icon: 'truck' },
  { id: 'reports', title: '20+ Reports', description: 'Outstanding by age, customer analytics, the whole year at a glance.', icon: 'chart' },
  { id: 'share-pdfs', title: 'Share Ledgers & PDFs', description: 'Ledgers, invoices, and credit notes reach any party in a tap.', icon: 'share' },
  { id: 'vouchers', title: 'Vouchers From Anywhere', description: 'Sales, purchase, receipt, and payment entries from mobile or web.', icon: 'fileText' },
];

// Compressed Tally-trust block: the connector story in three specific
// behaviors plus the download. The deep safety story lives in #data-safety.
export const tallyTrust = {
  overline: 'The Tally Connector',
  heading: 'Your Tally. Now on your phone.',
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
    answer:
      'Yes. Every plan includes one user. Extra users are \u20B93,000 per year each, and an extra device on the same user is \u20B93,000 per year.',
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
    name: 'Priya Agarwal',
    role: 'FMCG Distributor, Pune',
  },
];

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
        'Takkada is listed on the Play Store and App Store under Pay Saathi Innovation LLP, registered in Guwahati. No APK from a forwarded link, no sideloading.',
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
  plans: [
    {
      plan: 'Clarity',
      annualPrice: 2900,
      price: '\u20B92,900',
      period: '/year + GST',
      description: 'Every number Tally holds, in your pocket.',
    },
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
      annualPrice: 8500,
      price: '\u20B98,500',
      period: '/year + GST',
      description: 'The evening data-entry shift, handled.',
      badge: 'Most Popular',
      highlighted: true,
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
        { label: 'Vouchers from mobile and web', from: 1 },
        { label: 'Edit vouchers from anywhere', from: 1 },
        { label: 'Delivery challans and sales orders', from: 1 },
        { label: 'Your own invoice PDF template', from: 1 },
      ],
    },
    {
      group: 'Clear the paperwork',
      rows: [
        { label: 'E-Invoice with IRN and QR from your phone', from: 2 },
        { label: 'E-Way Bill in one tap, no portal login', from: 2 },
        { label: 'Both write back into Tally', from: 2 },
      ],
    },
    {
      group: 'Hand over the typing',
      rows: [
        { label: 'Import from PDF for supplier bills', from: 3 },
        { label: 'Bank statement import with auto-matching', from: 3 },
        { label: 'Auto Invoice Dispatch on every Tally invoice', from: 3 },
        { label: 'Reports + advanced reporting', from: 3 },
        { label: 'Role-based access for salesman teams', from: 3 },
      ],
    },
  ],
  addons: [
    {
      label: 'Payment Collection',
      price: '\u20B91,500 / year',
      note: 'UPI links on every invoice, zero MDR. Auto-reconciles into Tally. Available on every plan.',
    },
    { label: 'Extra user', price: '\u20B93,000 / user / year' },
    { label: 'Extra device', price: '\u20B93,000 / device / year' },
    { label: 'Extra business', price: '\u20B91,000 / business / year' },
    { label: 'WhatsApp 8,000-message pack', price: '\u20B92,000 / year' },
  ],
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

export const footerColumns = [
  {
    title: 'Product',
    links: [
      { label: 'Import from PDF', href: '#pdf-import' },
      { label: 'Tally Connector', href: '#tally' },
      { label: 'Payment Collection', href: '#digital-collection' },
      { label: 'Smart Reminders', href: '#smart-reminders' },
      { label: 'E-Invoicing', href: '#e-invoicing' },
      { label: 'RBAC', href: '#rbac' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', page: 'about-us' },
      { label: 'Contact Us', page: 'contact-us' },
      { label: 'Partners', page: 'partners' },
      { label: 'Blog', page: 'blog' },
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
export const demoVideo = null;

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
  tallyConnector: 'https://paysaathi-desktop-autoupdate.s3.ap-south-1.amazonaws.com/releases/takkada-setup.exe',
  bookDemo: 'https://calendar.notion.so/meet/ronakmalu/takkada',
  // WhatsApp Business number behind every wa.me CTA (digits only, country
  // code included). Currently the founder's number from CLAUDE.md §13; swap
  // here when a dedicated business number exists. Empty string disables the
  // WhatsApp CTAs site-wide (they fall back to the calendar link).
  whatsappNumber: '919435977777',
  // The app's anonymous instant demo entry (takkada PR #270, /demo route).
  demoApp: 'https://app.takkada.com/demo',
};

// Flip to true ONLY after the app's anonymous demo entry is live in prod
// (takkada /demo route merged + Supabase anonymous sign-ins enabled and the
// full site→app walk verified on a phone). While false, /demo/ and the hero
// keep WhatsApp as the primary action and never render a dead app link.
export const demoEntryLive = false;

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
      feature: 'E-invoice + e-way bill from mobile',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: true,
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
      feature: 'PDF/OCR — scan purchase invoices into Tally',
      Takkada: true,
      'Biz Analyst': false,
      Livekeeping: false,
    },
  ],
  disclaimer:
    'Feature details for Biz Analyst and Livekeeping are based on the pricing pages reviewed on April 26, 2026. Verify on their product pages before using this in sales materials.',
};

export const contactInfo = {
  company: 'Pay Saathi Innovations LLP',
  phone: '+91 94359 77777',
  email: 'admin@paysaathi.com',
  website: 'www.takkada.com',
};
