// Feature landing pages — the content layer behind src/components/FeaturePage.jsx.
//
// One object in FEATURE_PAGES is one live page. Adding an object registers the
// route, the sitemap entry, the llms.txt line and the footer "Features" link,
// because src/data/siteMetadata.js spreads `featureRouteMetadata` and
// src/routes/index.jsx builds its elements from this same array.
//
// Two follow-ups, both test-enforced, so a new page is three edits and not one:
//   - `node scripts/generate-llms-txt.mjs` refreshes the committed
//     public/llms.txt.
//   - src/data/featureGroups.js needs the slug in a group and a one-line blurb,
//     or the page is absent from the /features hub. features-hub.test.jsx names
//     the omission; nothing else will.
// Folding `group` and `blurb` onto the page object would restore the
// one-object-registers-everything property. It was left out of the hub change
// because it means editing all 26 objects across four files, and the tests fail
// loudly enough in the meantime.
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

// The extension is load-bearing. siteMetadata.js and the sitemap / llms.txt
// generators load this module through Node ESM, which does not resolve
// extensionless specifiers.
import { SECOND_BATCH } from './featurePagesSecondBatch.js';
import { ALTERNATIVES } from './featurePagesAlternatives.js';
import { PERSONAS } from './featurePagesPersonas.js';

/** @type {FeaturePage[]} */
const FIRST_BATCH = [
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
    // 58 words. Beats and the dispatch load sheet joined the module on
    // 2026-08-11 (live on prod, both repos), so the answer carries them.
    answer:
      'Takkada is a salesman app for Tally. Your field team works fixed beats, checks in with geo-tagged photos, books orders against live stock, raises invoices, and collects by UPI, all from a phone. Orders total into a dispatch load sheet per route, and everything lands in your Tally as vouchers, with targets and commission worked out per salesman.',
    waContext: 'feature-salesman-app-tally',
    waMessage:
      'Hi, I have salesmen in the market and want their visits, orders and collections coming into my Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Salesman App for Tally | Field Sales on Mobile | Takkada',
      description:
        'Salesman app for Tally: beat routes, geo-tagged visit proof, orders on live stock, a dispatch load sheet per route, UPI collection, commission per salesman.',
    },
    llms: {
      section: 'Features',
      title: 'Salesman app for Tally',
      summary:
        'Field-sales module for distributors on Tally: dealers grouped into beats with a salesman on each, one-tap check-in, geo-tagged photo proof of every visit, orders against live stock, a dispatch load sheet per route with deliveries ticked off, invoicing and UPI collection from the shop, plus targets, commission and role-based access per salesman.',
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
    updated: '2026-08-12',
    // No `walkthrough` on this page, on purpose (2026-08-12). It used to carry
    // an 8-card grid AND the tour below, which narrated the same day twice and
    // read as two competing stories. The grid's bottom-cropped phones also sat
    // at eight different heights because each card cropped after a
    // variable-length paragraph. The tour is now the page's only story and it
    // runs the whole day in order. FeaturePage renders the grid section only
    // when `walkthrough` is non-empty, so the other 26 pages are untouched.
    //
    // Scroll-driven tour: one salesman's day, morning to night, six stations.
    // The reader's scroll advances the stations (no timer), and every
    // screenshot is an already-shipped sanitised mockup.
    tour: {
      overline: 'One day on a beat',
      heading: 'One day on a beat, from the first shop to the last rupee.',
      intro:
        'Follow one salesman through his day. Every screen here is what he sees in the market, and every entry lands in your Tally while he is still standing at the shop.',
      stations: [
        {
          title: 'Nine in the morning, he opens his beat',
          body:
            'Your dealers sit in beats, the fixed routes your market already runs on, with a salesman on each. He opens the app and today’s shops are already listed for him.',
          screenshot: '/assets/screenshots/beats-mockup.webp',
          screenshotAlt:
            'Beats screen in Takkada listing named routes, each with its salesman and dealer count',
        },
        {
          title: 'He checks in, and the visit proves itself',
          body:
            'One tap marks the visit with the time and the place, and it carries a geo-tagged, time-stamped photo. The shop front, the shelf, the stock lying in the corner. Nothing to argue about at month end.',
          screenshot: '/assets/screenshots/field-visits-feed-mockup.webp',
          screenshotAlt:
            'Field visit feed in Takkada showing salesman check-ins with the time and location of each',
        },
        {
          title: 'The order is booked against live stock',
          body:
            'Live stock sits next to every item, so nobody promises what the godown does not have. It lands in your Tally as a sales order the moment he saves it, with the pending quantity tracked until it ships.',
          screenshot: '/assets/screenshots/add-items-mockup.webp',
          screenshotAlt: 'Building an order in Takkada with live stock on hand next to every item',
        },
        {
          title: 'The godown loads the van from one sheet',
          body:
            'The orders booked on a route total themselves into one load sheet. So many bags, so many crates, then the same list dealer by dealer. As the van empties, deliveries get ticked off against each shop.',
          screenshot: '/assets/screenshots/beat-load-sheet-mockup.webp',
          screenshotAlt:
            'Dispatch load sheet in Takkada totalling the items to load for one route, with the per-dealer breakdown below',
        },
        {
          title: 'The invoice reaches the retailer on WhatsApp',
          body:
            'The invoice posts with items, GST and your Tally number series. The PDF and a Pay now link reach the retailer before your salesman leaves the shop, and the UPI receipt matches itself against that bill.',
          screenshot: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
          screenshotAlt: 'WhatsApp chat with a Takkada invoice PDF and a Pay now link',
        },
        {
          title: 'By night you already know how the day went',
          body:
            'Visits, orders and collections per salesman as they land, with monthly targets and commission worked out from what actually got billed and collected. The evening call asking everyone what they did stops being necessary.',
          screenshot: '/assets/screenshots/team-sales-hub-mockup.webp',
          screenshotAlt:
            'Team Sales screen in Takkada: who is out today, and the leaderboard with targets and commission per salesman',
        },
      ],
      // RBAC is not a station: it has no hour in the day, and dropping it into
      // the timeline is exactly the "everything at random" feel this refactor
      // removes. It keeps its FAQ answer and its comparison row.
      footnote:
        'View and create rights are set per register, per person. You can restrict which ledgers and which stock groups a salesman sees, so the field team works without your whole book being open to them.',
    },
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
        q: 'Can I set up beats or routes for my salesmen?',
        a: 'Yes. You group your dealers into beats, the fixed routes your market already runs on, and put a salesman on each. On the dispatch side, the orders booked on a route total into one load sheet for the godown, item by item and then dealer by dealer, and deliveries are ticked off as the van empties.',
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
        title: 'What Field Teams Actually Need From a Tally App in India',
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

  {
    slug: 'payment-collection-tally',
    searchPhrase: 'Payment collection on Tally',
    overline: 'PAYMENT COLLECTION',
    headline: 'Payment collection on Tally, from the invoice to the bank line.',
    subheadline:
      'The bill went out on the 3rd. It is the 27th, he says he has paid, and nobody can tell you which of the four invoices that money was meant for.',
    // 46 words. Carries the locked pricing sentence verbatim.
    answer:
      'Takkada adds payment collection on Tally without changing how you bill. Every invoice carries a UPI link at 0% MDR on UPI collections, no transaction cap, no monthly fee. The retailer pays from WhatsApp, and the receipt posts itself against the right invoice in your Tally.',
    waContext: 'feature-payment-collection-tally',
    waMessage:
      'Hi, I want to collect payments against my Tally invoices on UPI and have the receipts match themselves. Can you show me how the collection side works?',
    seo: {
      title: 'Payment Collection on Tally | 0% MDR UPI | Takkada',
      description:
        'Payment collection on Tally with a UPI link on every invoice at 0% MDR, no transaction cap and no monthly fee. Receipts match themselves back to the bill.',
    },
    llms: {
      section: 'Features',
      title: 'Payment collection on Tally',
      summary:
        'UPI collection for distributors running Tally: a payment link on every invoice and inside every reminder at 0% MDR with no transaction cap, money landing straight in the business bank account, and receipts auto-matched against the invoices they settle, including one payment split across several bills.',
    },
    footerLabel: 'Payment collection',
    hero: {
      image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
      alt: 'An invoice PDF and a pay-now link delivered to a customer on WhatsApp',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'One bill, paid and reconciled',
    walkthrough: [
      {
        icon: 'Link2',
        title: 'The pay link rides on the invoice',
        body:
          'Every invoice you raise carries its own UPI link for the exact amount. Nothing to generate on the side, nothing to paste into a chat.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice summary in Takkada with the amount due and a payment link on the same screen',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'It reaches him where he already reads',
        body:
          'The invoice PDF and the link go out on WhatsApp. He pays from the same message, on the UPI app already on his phone, without an account on anything of ours.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Invoice PDF and payment link delivered to a retailer on WhatsApp',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Wallet',
        title: 'The money goes to your bank, not a wallet',
        body:
          'Collections settle into your own current account. You are not withdrawing from a balance held somewhere else, and there is no cut taken out of the rupees on the way.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'List of settled collections with the amount and date of each',
        width: 391,
        height: 790,
      },
      {
        icon: 'BookOpen',
        title: 'The receipt finds its own invoice',
        body:
          'The entry posts into Tally against the bill it settles. When one payment covers three invoices it splits across all three, so the party ledger is right without anyone matching it in the evening.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing receipts matched against the invoices they settle',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What collecting actually costs you',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'What you pay on the money collected',
          takkada: '0% MDR on UPI collections, no transaction cap, no monthly fee',
          others: 'A percentage of every rupee, or a gateway plan on top of the app',
        },
        {
          feature: 'Where the payment link lives',
          takkada: 'On the invoice itself, and inside every reminder',
          others: 'A link you generate separately and paste into the chat',
        },
        {
          feature: 'Where the money lands',
          takkada: 'Your own current account',
          others: 'Often a held balance you withdraw from',
        },
        {
          feature: 'After the retailer pays',
          takkada: 'The receipt posts against that invoice in Tally on its own',
          others: 'You match it by hand at the end of the day',
        },
        {
          feature: 'One payment covering several bills',
          takkada: 'Splits across the invoices it settles',
          others: 'Lands as a single amount somebody has to allocate',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note:
        'Payment collection is an add-on that works on every plan, including the entry one. You do not have to move up a tier to start collecting.',
    },
    faqs: [
      {
        q: 'What does 0% MDR actually mean for a distributor?',
        a: 'It means the amount your retailer pays is the amount that reaches your bank. Card and gateway routes take a percentage of every transaction, which on a large receivable book adds up to real money over a year. UPI collection through Takkada carries 0% MDR on UPI collections, no transaction cap, and no monthly fee, so a large payment costs you the same as a small one.',
      },
      {
        q: 'Does the retailer need to install anything?',
        a: 'No. He gets a link on WhatsApp and pays from whichever UPI app is already on his phone. There is no account to create, no app to download, and no registration on our side. From his point of view it is the same two taps he already uses to pay anyone else.',
      },
      {
        q: 'How does a payment find the right invoice in Tally?',
        a: 'The link is raised against a specific bill, so the receipt already knows which invoice it belongs to and posts against it in Tally. When a retailer clears several bills with one transfer, the amount is split across the invoices it settles rather than sitting in the ledger as one unallocated lump for somebody to sort out later.',
      },
      {
        q: 'Where does the money actually go?',
        a: 'Straight into your own current account, the one your business already runs on. Takkada does not hold your collections in a balance that you then withdraw from, so there is no float sitting with anyone else and nothing extra to reconcile between a wallet and your bank.',
      },
      {
        q: 'What if a retailer pays by cash or a direct bank transfer instead?',
        a: 'That still works the way it always has. You record the receipt in the app or in Tally and it behaves like any other entry. The collection link is there for the retailers who would rather pay from their phone, and it does not force everyone onto one method.',
      },
    ],
    relatedPosts: [
      {
        slug: 'payment-collection-app-for-distributors-india',
        title: 'Payment Collection App for Distributors India: The 2026 Reality',
      },
      {
        slug: 'nil-mdr-upi-collection-on-tally-invoices',
        title: 'Nil MDR UPI Collection on Tally Invoices',
      },
      {
        slug: 'collect-payment-against-tally-invoice-whatsapp',
        title: 'Collect Payment Against Tally Invoice on WhatsApp',
      },
      {
        slug: 'how-to-split-upi-payment-across-tally-invoices',
        title: 'How to Split One UPI Payment Across Multiple Tally Invoices',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'payment-reminder-tally',
    searchPhrase: 'Payment reminder from Tally',
    overline: 'SMART REMINDERS',
    headline: 'Payment reminder from Tally, sent before you remember to ask.',
    subheadline:
      'Chasing is the part nobody wants to do. So it slips, and a bill that was thirty days old quietly becomes ninety.',
    // 46 words.
    answer:
      'A payment reminder from Tally goes out on WhatsApp on its own, on a schedule you set. Pre-due nudges before the date, firmer ones after it, each carrying the invoice and the ledger. Per-party caps stop the same retailer being messaged twice in one day.',
    waContext: 'feature-payment-reminder-tally',
    waMessage:
      'Hi, I want automatic WhatsApp payment reminders going out against my Tally outstanding. Can you show me how the schedules and the caps work?',
    seo: {
      title: 'Payment Reminder From Tally on WhatsApp | Takkada',
      description:
        'Automatic payment reminders from Tally on WhatsApp. Pre-due and post-due schedules, per-party caps, the invoice and ledger attached, and a pay link inside.',
    },
    llms: {
      section: 'Features',
      title: 'Payment reminders from Tally',
      summary:
        'Automated WhatsApp payment reminders driven by live Tally outstanding: schedules that fire before and after the due date, message caps per party so nobody is spammed, the invoice PDF and ledger statement attached, and a 0% MDR pay link inside the reminder itself.',
    },
    footerLabel: 'Payment reminders',
    hero: {
      image: '/assets/screenshots/payment-reminders.webp',
      alt: 'Smart Reminders settings in Takkada with the schedule, due days and payment link availability',
      width: 820,
      height: 1698,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Set it once, then stop chasing',
    walkthrough: [
      {
        icon: 'CalendarClock',
        title: 'You set the cadence, not the messages',
        body:
          'Decide how many days before the due date the first nudge goes, and how often one follows after. The app picks the wording for where that bill stands, so nobody is drafting anything.',
        image: '/assets/screenshots/smart-reminders-mockup.webp',
        alt: 'Reminder schedule showing pre-due and post-due steps for an invoice',
        width: 391,
        height: 790,
      },
      {
        icon: 'MessageCircle',
        title: 'It arrives on WhatsApp with the proof attached',
        body:
          'The retailer gets the invoice PDF and his ledger in the same message, so the reply is not "kaunsa bill". A payment link sits in it too, which turns the reminder into the place he pays.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'A WhatsApp reminder carrying the invoice PDF and a payment link',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ShieldCheck',
        title: 'Caps keep it from becoming spam',
        body:
          'A limit per party per day, and parties you can hold back entirely. Your biggest retailer does not get four messages because four of his bills came due together.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and their due dates',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'It stops on its own when he pays',
        body:
          'The reminder run reads live outstanding from your books, so a bill that got settled drops out of the next cycle. Nobody is chasing money that already came in.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'Settled collections list showing invoices that have been paid',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'What separates a reminder that collects',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'When reminders go out',
          takkada: 'Before the due date and after it, on a schedule you set',
          others: 'Usually only once a bill is already overdue',
        },
        {
          feature: 'What is in the message',
          takkada: 'Invoice PDF, ledger statement and a pay link',
          others: 'A text line with the amount',
        },
        {
          feature: 'Protection against over-messaging',
          takkada: 'A cap per party per day, and parties you can hold back',
          others: 'One message per open bill',
        },
        {
          feature: 'Paying from the reminder itself',
          takkada: 'Yes, at 0% MDR on UPI collections',
          others: 'No link, or a link with a cut taken from it',
        },
        {
          feature: 'Stopping once the bill is paid',
          takkada: 'Reads live outstanding, so a settled bill drops out',
          others: 'Depends on someone updating the list',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note:
        'Automatic WhatsApp reminders are in every plan, starting with the entry one. Nothing here needs a higher tier.',
    },
    faqs: [
      {
        q: 'Do reminders go from my own WhatsApp number?',
        a: 'By default they go from the Takkada business sender, which is what most distributors use. Sending from your own WhatsApp Business number is available as an early access add-on, so ask for it if the number your retailers already recognise matters to you. The reminder content and schedule are the same either way.',
      },
      {
        q: 'How do I stop a good customer from being pestered?',
        a: 'Two ways. A cap limits how many messages one party can receive in a day no matter how many of his bills came due together, and you can hold specific parties back from the automatic run entirely. For those you keep the manual send, which is two taps when you decide the moment is right.',
      },
      {
        q: 'What does the retailer actually receive?',
        a: 'A WhatsApp message naming the invoice and the amount, with the invoice PDF and his ledger statement attached, and a payment link he can pay from immediately. Having the ledger in the same message removes the usual round of him asking which bill you mean and you digging out a statement.',
      },
      {
        q: 'Will it keep chasing someone who has already paid?',
        a: 'No. Each run reads current outstanding from your books rather than a list somebody maintained by hand, so an invoice that has been settled is simply not in the next cycle. This is the failure that makes distributors switch reminders off, and it is the reason the schedule is driven off live balances.',
      },
      {
        q: 'Can I send a reminder myself instead of waiting for the schedule?',
        a: 'Yes. Open the party, tap send, and the same message goes out with the invoice and ledger attached. Distributors normally run the automatic schedule for the whole book and use the manual send for the handful of parties where they want to pick the timing themselves.',
      },
    ],
    relatedPosts: [
      {
        slug: 'automate-payment-reminders-tally',
        title: 'How to Automate Payment Reminders in Tally (Smart Reminders)',
      },
      {
        slug: 'how-to-send-payment-reminder-from-tally-whatsapp',
        title: 'How to Send a Payment Reminder From Tally on WhatsApp',
      },
      {
        slug: 'scheduled-payment-reminders-tally',
        title: 'Scheduled Payment Reminders That Send Themselves',
      },
      {
        slug: 'whatsapp-payment-reminder-for-distributors',
        title: 'WhatsApp Payment Reminder for Distributors: A Cadence That Actually Collects',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'e-invoice-from-phone',
    searchPhrase: 'E-invoice from the phone',
    overline: 'E-INVOICING',
    headline: 'E-invoice from the phone, IRN on the same Tally voucher.',
    subheadline:
      'The buyer wants the bill now. Your accountant with the portal login is an hour away from his desk.',
    // 49 words.
    answer:
      'You can raise an e-invoice from the phone and the IRN with its signed QR comes back onto the same Tally voucher. No portal login, no desktop, no second entry. Cancel it from the app inside the government window when a buyer changes his mind, and Tally stays in step.',
    waContext: 'feature-e-invoice-from-phone',
    waMessage:
      'Hi, I want to generate e-invoices with IRN from my phone and have them written back into Tally. Can you show me how that works?',
    seo: {
      title: 'E-Invoice From the Phone, IRN on Tally | Takkada',
      description:
        'Generate an e-invoice from the phone with IRN and signed QR, written back onto the same Tally voucher. No portal login, and cancel from the app in the window.',
    },
    llms: {
      section: 'Features',
      title: 'E-invoice from the phone',
      summary:
        'GST e-invoicing for Tally users from a mobile phone: IRN and signed QR generated without a portal login, written back onto the same Tally voucher rather than a duplicate, cancellation from the app inside the government window, and the finished invoice dispatched on WhatsApp.',
    },
    footerLabel: 'E-invoice from phone',
    // einvoice-eway.webp was the obvious hero and is deliberately not used:
    // it shows a real customer's party name and a real brand. Flagged for
    // removal from the homepage too, where it is currently live.
    hero: {
      image: '/assets/screenshots/invoice-summary-mockup.webp',
      alt: 'An invoice in Takkada with the E-Invoice action available on the same screen',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From the item lines to a signed IRN',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Raise the invoice where you are standing',
        body:
          'Party, items, quantity, rate and GST, in your own numbering series. It is a Tally voucher from the moment you save it, not a note you copy over later.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Invoice item lines with quantity, rate and GST being entered on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'QrCode',
        title: 'The IRN and QR come back onto that voucher',
        body:
          'One tap sends it for registration and the IRN with its signed QR lands against the same invoice. No portal login, and no separate document to reconcile against the one in your books.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice detail screen with the E-Invoice action on the same voucher',
        width: 600,
        height: 1243,
      },
      {
        icon: 'FileCheck2',
        title: 'Your Tally shows one invoice, not two',
        body:
          'The registration details write back against the existing voucher. Your numbering, your formats and your ledgers stay exactly as they were, which is the part that usually breaks when e-invoicing is bolted on.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing the single invoice entry the registration attached to',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'The buyer gets it before the truck moves',
        body:
          'The finished invoice goes out on WhatsApp with the QR on it, and a payment link alongside if you collect that way. He has the document while your salesman is still at the counter.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Registered invoice PDF delivered to a buyer on WhatsApp',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What happens after the IRN is generated',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Generating the IRN from a phone',
          takkada: 'Yes, without a portal login',
          others: 'Sometimes, and usually only generation',
        },
        {
          feature: 'Cancelling an e-invoice from the phone',
          takkada: 'Yes, inside the government window',
          others: 'Back to the portal on a desktop',
        },
        {
          feature: 'How it lands in Tally',
          takkada: 'Written back onto the same voucher',
          others: 'Often a second document to match up',
        },
        {
          feature: 'Your invoice numbering series',
          takkada: 'Kept as it is',
          others: 'Sometimes replaced by the app’s own series',
        },
        {
          feature: 'Sending the registered invoice on',
          takkada: 'WhatsApp dispatch with a pay link on the same message',
          others: 'Download and forward it yourself',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Assurance',
      note:
        'E-invoice with IRN and QR from the phone starts at the Assurance plan, together with e-way bills.',
    },
    faqs: [
      {
        q: 'Do I need the government portal login on my phone?',
        a: 'No. You register your credentials once during setup and after that the app talks to the invoice registration system for you. Your team raises the invoice and taps once, and nobody has to open the portal or remember a password that expires. The credentials stay with the business, not with whoever is holding the phone.',
      },
      {
        q: 'Does the IRN come back into Tally or do I re-enter it?',
        a: 'It writes back against the same voucher automatically. This matters more than it sounds, because the common failure with bolted-on e-invoicing is ending up with the registered document in one place and the accounting entry in another, and then someone reconciling the two at month end. Here there is only ever one invoice.',
      },
      {
        q: 'Can I cancel an e-invoice from the app?',
        a: 'Yes, within the window the government allows after generation, which is currently 24 hours for cancellation. You do it from the app rather than going back to a desktop and the portal, and the cancellation is reflected against the same voucher in Tally so your books and your filings do not drift apart.',
      },
      {
        q: 'Will it keep my own invoice numbering?',
        a: 'Yes. Your series, your prefixes and your formats stay exactly as they are in Tally, and the registration attaches to that invoice. Distributors who have been on the same numbering for years do not have to explain a new format to their buyers or their auditor.',
      },
      {
        q: 'What if my turnover has not crossed the e-invoicing threshold yet?',
        a: 'Then you simply do not use it, and everything else in the app works the same way. Distributors usually turn it on in the year they expect to cross the limit, so the workflow is already familiar to the team before it becomes mandatory rather than being learned in a hurry.',
      },
    ],
    relatedPosts: [
      {
        slug: 'e-invoice-on-phone-tally',
        title:
          'E-Invoice on Phone Tally: How Distributors Generate an IRN Without Going Back to the Office',
      },
      {
        slug: 'e-way-bill-with-e-invoice-auto-population',
        title: 'E-Way Bill Auto Generation With E-Invoice: What the IRN Actually Carries Across',
      },
      {
        slug: 'gst-compliance-on-mobile-for-distributors',
        title:
          "GST Compliance on Mobile for Distributors: What's Possible, What's Not, and Where Phones Beat Desktops",
      },
      {
        slug: 'tally-whatsapp-invoice-dispatch',
        title: 'Auto-Dispatching Invoices on WhatsApp from Tally: What It Is and What It Changes',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'e-way-bill-from-phone',
    searchPhrase: 'E-way bill from the phone',
    overline: 'E-WAY BILLS',
    headline: 'E-way bill from the phone, before the truck leaves the gate.',
    subheadline:
      'The loading is done and the driver is waiting. The only thing missing is a document somebody has to generate on a laptop in the office.',
    // 45 words.
    answer:
      'An e-way bill from the phone comes off the invoice you just raised, with no portal login and no desktop. Vehicle and distance details are prefilled, the number writes back into Tally against the same voucher, and you can cancel from the app inside the government window.',
    waContext: 'feature-e-way-bill-from-phone',
    waMessage:
      'Hi, I want to generate e-way bills from my phone against my Tally invoices instead of doing it on the portal. Can you show me?',
    seo: {
      title: 'E-Way Bill From the Phone, No Portal Login | Takkada',
      description:
        'Generate an e-way bill from the phone off the invoice you just raised. Distance prefilled, the number written back into Tally, cancellation from the app.',
    },
    llms: {
      section: 'Features',
      title: 'E-way bill from the phone',
      summary:
        'E-way bill generation for Tally users from a mobile phone: raised off the invoice with distance and vehicle details prefilled, no e-way bill portal login, the number written back onto the same Tally voucher, and cancellation from the app inside the government window.',
    },
    footerLabel: 'E-way bill from phone',
    hero: {
      image: '/assets/screenshots/delivery-challans-mockup.webp',
      alt: 'Delivery challan screen in Takkada listing dispatches ready to move',
      width: 600,
      height: 1218,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Gate pass to government document',
    walkthrough: [
      {
        icon: 'Truck',
        title: 'It starts from the dispatch you already made',
        body:
          'The invoice or the delivery challan is the source. Party, items and value are already there, so nobody is retyping a consignment into a second screen while a driver waits.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Delivery challans listed in the app with their dispatch details',
        width: 600,
        height: 1218,
      },
      {
        icon: 'MapPin',
        title: 'Distance and vehicle come prefilled',
        body:
          'The distance between the two pin codes is worked out for you and the vehicle number is the one thing left to type. That is the part that usually sends someone back to a desk.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Consignment item lines with quantity and value that the e-way bill is raised against',
        width: 600,
        height: 1242,
      },
      {
        icon: 'FileCheck2',
        title: 'The number writes back into Tally',
        body:
          'The e-way bill number lands against the same voucher, alongside the IRN if the invoice was registered too. One document trail, not a folder of PDFs somebody matches later.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice detail in the app carrying the dispatch document actions',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'The paperwork travels with the goods',
        body:
          'Send it to the driver and the buyer on WhatsApp from the same screen. If it has to be cancelled, that happens from the app inside the window the government allows.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Dispatch documents sent on WhatsApp from the app',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What you can do without opening the portal',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Generating the e-way bill from a phone',
          takkada: 'Yes, off the invoice or the challan',
          others: 'Sometimes, and usually generation only',
        },
        {
          feature: 'Cancelling one from the phone',
          takkada: 'Yes, inside the government window',
          others: 'Back to the portal on a desktop',
        },
        {
          feature: 'Distance between the pin codes',
          takkada: 'Worked out for you',
          others: 'Looked up and typed in',
        },
        {
          feature: 'Where the number ends up',
          takkada: 'On the same Tally voucher as the invoice',
          others: 'A separate record to match',
        },
        {
          feature: 'Raising it together with the e-invoice',
          takkada: 'Both off the same invoice, in one go',
          others: 'Two separate journeys',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Assurance',
      note:
        'E-way bills from the phone start at the Assurance plan, together with e-invoicing.',
    },
    faqs: [
      {
        q: 'Can I close an e-way bill from the app?',
        a: 'No, and today no software can, because the facility is not in force. GSTN Advisory No. 668 dated 29 July 2026 put the proposed e-way bill closure facility in abeyance until further notice, so the 1 August 2026 date that many tax sites still carry did not happen. Generation, cancellation and extension work as they always have.',
      },
      {
        q: 'Do I need the e-way bill portal login on the phone?',
        a: 'No. Credentials are registered once during setup and the app talks to the system for you after that. Your dispatch team taps to generate rather than logging in, which is what lets the document be raised at the gate instead of by whoever is sitting at the office computer.',
      },
      {
        q: 'What happens if the vehicle changes after the bill is generated?',
        a: 'You update the vehicle details against the existing e-way bill, which is what the rules allow when a consignment is transferred to a different vehicle mid-journey. You do not have to cancel and start again, and the change is reflected against the same voucher in your books.',
      },
      {
        q: 'Does the e-way bill number reach Tally, or do I note it down?',
        a: 'It writes back against the same voucher automatically, next to the IRN when the invoice was registered as well. Distributors who used to keep a separate register of e-way bill numbers to survive an audit stop maintaining it, because the number is already sitting on the invoice it belongs to.',
      },
      {
        q: 'Can I raise the e-invoice and the e-way bill together?',
        a: 'Yes, both come off the same invoice in one pass, which is the sequence the government system expects when an IRN is involved. The details that carry across from the e-invoice do not have to be entered twice, and both numbers land against the same voucher in Tally.',
      },
    ],
    relatedPosts: [
      {
        slug: 'e-way-bill-on-phone',
        title: 'E-Way Bill on Phone: How Distributors Clear ₹50,000+ Shipments Without the Office',
      },
      {
        slug: 'e-way-bill-closure-rule-2026',
        title: 'E Way Bill Closure: What Is Paused and What to Get Ready For',
      },
      {
        slug: 'e-way-bill-expiry-extension-penalty',
        title: 'E-Way Bill Expired Penalty: The Law, the 8-Hour Window and What to Do',
      },
      {
        slug: 'e-way-bill-180-day-rule',
        title: 'E Way Bill 180 Days Rule: The Two Deadlines That Stop a Late Dispatch',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'tally-reports-on-mobile',
    searchPhrase: 'Tally reports on mobile',
    overline: 'REPORTS',
    headline: 'Tally reports on mobile, the twenty you actually open.',
    subheadline:
      'You do not need all of Tally on a phone. You need the six numbers you check before breakfast and the register your CA asks for.',
    // 47 words.
    answer:
      'Tally reports on mobile means the registers you open every day, on your phone. Outstanding by age, party and item sales, purchase, stock, cash and bank, profit, trial balance, and the GST summaries your accountant asks for. Read them anywhere, and send any of them on WhatsApp.',
    waContext: 'feature-tally-reports-on-mobile',
    waMessage:
      'Hi, I want to read my Tally reports on my phone instead of waiting to get to the office. Can you show me which reports are covered?',
    seo: {
      title: 'Tally Reports on Mobile, 20+ Reports | Takkada',
      description:
        'Read Tally reports on mobile: outstanding by age, sales and purchase registers, stock, cash and bank, profit and trial balance. Share any on WhatsApp.',
    },
    llms: {
      section: 'Features',
      title: 'Tally reports on mobile',
      summary:
        'Over twenty Tally reports readable on a phone: receivables and payables by age, party-wise and item-wise sales, purchase register, stock summary, cash and bank book, profit, trial balance and GST summaries, each shareable as PDF or Excel on WhatsApp without opening a laptop.',
    },
    footerLabel: 'Reports on mobile',
    // reports-screen.webp is the more literal hero but its purchase, payments
    // and note tiles all read zero on that capture, which makes a page about
    // twenty reports look like an empty product. The sales register carries
    // real volume and no identifying name, so it leads instead and the summary
    // screen becomes the first walk-through step.
    hero: {
      image: '/assets/screenshots/monthly-sales.webp',
      alt: 'Sale invoices register grouped by month, with the total and invoice count for each',
      width: 904,
      height: 1874,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'The numbers, without the laptop',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'The year so far, on the first screen',
        body:
          'Sales, receipts, purchase, payments, credit and debit notes for the financial year, before you tap anything. It is the summary most owners open first thing and then close again.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
      {
        icon: 'BarChart3',
        title: 'Registers you can walk down',
        body:
          'Sales by month, by party and by item, with the purchase side alongside. Tap a month to get the invoices inside it, tap an invoice to get its lines.',
        image: '/assets/screenshots/monthly-sales.webp',
        alt: 'Sale invoices register grouped by month with totals and invoice counts',
        width: 904,
        height: 1874,
      },
      {
        icon: 'Clock',
        title: 'Outstanding sorted by how old it is',
        body:
          'Receivables and payables by age, so the ninety-day parties stand out from the ones who are merely late. From the same screen you can send a reminder or share the ledger.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing outstanding invoices with their ages',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Share2',
        title: 'Any report, to anyone, as PDF or Excel',
        body:
          'Send the register to your CA or the ledger to a retailer straight from the report. The month-end routine of exporting from the office machine and mailing it stops being a task.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'Settlements report listing collections by party, date and amount',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'What you can actually read on the phone',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'How many reports',
          takkada: 'Over twenty, including trial balance and profit',
          others: 'A shorter list built around outstanding',
        },
        {
          feature: 'Drilling from a total to the voucher',
          takkada: 'Month to invoice to line item',
          others: 'Usually a summary you cannot open further',
        },
        {
          feature: 'Reading them when the Tally machine is off',
          takkada: 'Yes, the last synced position stays readable',
          others: 'Often needs the office computer running',
        },
        {
          feature: 'Sending a report onward',
          takkada: 'PDF or Excel on WhatsApp from the report itself',
          others: 'Export from the desktop and mail it',
        },
        {
          feature: 'More than one company',
          takkada: 'Unlimited companies on every plan',
          others: 'Frequently one company per licence',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note:
        'Reports are in every plan, starting with the entry one, and unlimited companies come with it.',
    },
    faqs: [
      {
        q: 'Which Tally reports can I actually read on my phone?',
        a: 'Outstanding receivables and payables by age, party-wise and item-wise sales, the sales and purchase registers, stock summary and godown-wise stock, cash and bank book, profit, trial balance, and GST summaries for your accountant. Over twenty in total, chosen because they are the ones distributors open repeatedly rather than everything Tally can print.',
      },
      {
        q: 'Do the reports work when the office computer is switched off?',
        a: 'Yes. Your books sync from the machine running Tally, and the last synced position stays readable on your phone whether or not that machine is on right now. What you see is as current as the most recent sync, which for most distributors means Tally is open most of the working day and the view is close to live.',
      },
      {
        q: 'Can I open a total to see what is inside it?',
        a: 'Yes. A month in the sales register opens into the invoices raised that month, and an invoice opens into its item lines with quantity, rate and GST. The same holds on the party side, where an outstanding figure opens into the individual bills that make it up.',
      },
      {
        q: 'Can I send a report to my CA from the phone?',
        a: 'Yes, as PDF or Excel, from the report screen itself onto WhatsApp or email. Distributors mostly use this at month end for the registers their accountant asks for, and through the month for sending a party his ledger without going back to the office to export it.',
      },
      {
        q: 'Does it handle more than one company?',
        a: 'Yes, unlimited companies on every plan, and you switch between them inside the app. Family businesses that run three or four entities in Tally see each one separately rather than needing a different licence or a different login for each.',
      },
    ],
    relatedPosts: [
      {
        slug: 'view-tally-reports-on-mobile',
        title: 'The Five Reports an Owner Actually Opens on a Phone',
      },
      {
        slug: 'mis-reports-for-distributors-tally',
        title: 'MIS Reports for Distributors: The Numbers to Check Daily',
      },
      {
        slug: 'daily-sales-report-tally-mobile',
        title: 'Daily Sales Report from Tally on Your Phone',
      },
      {
        slug: 'receivables-ageing-on-mobile-tally',
        title: 'Receivables Ageing on Mobile: Catch the 60/90-Day Parties',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'import-purchase-from-pdf',
    searchPhrase: 'Import purchase from PDF',
    overline: 'AI ENTRY',
    headline: 'Import purchase from PDF into Tally, without typing the lines.',
    subheadline:
      'The supplier bills arrive as PDFs and photos. Somebody sits down at seven in the evening and types them in, one line at a time.',
    // 48 words.
    answer:
      'To import purchase from PDF into Tally, photograph the supplier bill or upload the file and the lines are read for you. Item, quantity, rate, GST and the supplier are matched against your existing masters. You check the draft on screen, and it posts as a purchase voucher.',
    waContext: 'feature-import-purchase-from-pdf',
    waMessage:
      'Hi, I want to stop typing supplier purchase bills into Tally by hand. Can you show me how the PDF and photo import works?',
    seo: {
      title: 'Import Purchase From PDF Into Tally | Takkada',
      description:
        'Import a purchase from PDF or a photo into Tally. Items, quantity, rate and GST are matched to your masters, then posted as a voucher after you review it.',
    },
    llms: {
      section: 'Features',
      title: 'Import purchase from PDF',
      summary:
        'Purchase bill entry for Tally from a PDF or a phone photo: line items, quantities, rates, GST and the supplier are read and matched against existing masters, unit-of-measure differences reconciled, and the entry posted as a purchase voucher only after a human reviews the draft.',
    },
    footerLabel: 'Import purchase from PDF',
    hero: {
      image: '/assets/screenshots/add-items-mockup.webp',
      alt: 'Voucher item lines with quantity, rate and GST shown for checking before the entry is saved',
      width: 600,
      height: 1242,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'A supplier bill, without the typing',
    walkthrough: [
      {
        icon: 'Camera',
        title: 'Send it the bill however it arrived',
        body:
          'A PDF from the supplier, or a photo of the paper copy taken at the godown. Both go in the same way, which matters because half of them still come as paper.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Item lines read off a supplier bill, with quantity, rate and GST filled in',
        width: 600,
        height: 1242,
      },
      {
        icon: 'ListChecks',
        title: 'The lines are matched to your own masters',
        body:
          'Items are matched to the stock items you already have, the supplier to the ledger you already use, and unit differences between his case and your piece are reconciled rather than creating a duplicate master.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Draft voucher summary showing the supplier, the items and the total',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ShieldCheck',
        title: 'Nothing posts until a person says so',
        body:
          'The draft is shown line by line with what it read and what it matched. You correct anything that looks wrong and approve it, so a misread rate never reaches your books quietly.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Supplier ledger showing the purchase entries recorded against it',
        width: 600,
        height: 1243,
      },
      {
        icon: 'BarChart3',
        title: 'The purchase side stays current',
        body:
          'Because the bills go in as they arrive rather than in a weekend batch, your payables and your purchase register are worth reading on a Tuesday afternoon.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Reports screen showing purchase and payments for the financial year',
        width: 820,
        height: 1698,
      },
    ],
    comparison: {
      heading: 'How the bill gets into the books',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Entering a purchase bill from a PDF or a photo',
          takkada: 'Read, matched and posted after review',
          others: 'Not offered, so it is typed',
        },
        {
          feature: 'Matching to your existing item and party masters',
          takkada: 'Matched to what you already have',
          others: 'Not applicable',
        },
        {
          feature: 'When his unit differs from yours',
          takkada: 'Case against piece reconciled on the line',
          others: 'Corrected by hand afterwards',
        },
        {
          feature: 'Review before anything posts',
          takkada: 'Line by line, approved by a person',
          others: 'Not applicable',
        },
        {
          feature: 'A handwritten order slip',
          takkada: 'Photographed and turned into a sales order the same way',
          others: 'Typed in',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Copilot',
      note:
        'Import from PDF is part of the Copilot plan, along with bank statement import. It is no longer sold as a separate add-on.',
    },
    faqs: [
      {
        q: 'What happens if it reads a rate or a quantity wrong?',
        a: 'You catch it before it matters, because nothing posts on its own. The draft is shown line by line with what was read off the bill and what it was matched to, and you approve or correct each line. The entry only becomes a purchase voucher in Tally after a person has said yes to it.',
      },
      {
        q: 'Will it create duplicate stock items for things I already have?',
        a: 'It matches against the masters already in your books rather than creating new ones, including when the supplier writes an item slightly differently from the way you have named it. Where his unit of measure differs from yours, a case against a piece for instance, that is reconciled on the line instead of becoming a second master.',
      },
      {
        q: 'Does it work on a photo, or does it have to be a proper PDF?',
        a: 'Both work. A PDF emailed by the supplier and a phone photo of the paper copy go in the same way, which matters because a large share of supplier bills in this trade still arrive as paper handed over with the goods. A reasonably flat, readable photo is enough.',
      },
      {
        q: 'Can the same thing be done with a handwritten order?',
        a: 'Yes. A retailer’s order written on a slip can be photographed and turned into a sales order against the right party and items, which saves the salesman punching it again in the evening. It goes through the same review step, so nothing reaches the books unchecked.',
      },
      {
        q: 'Where does the finished entry end up?',
        a: 'As a purchase voucher in your Tally against the supplier ledger you already use, exactly as though it had been typed there. Your payables, your purchase register and your stock all move with it, and there is no separate place where imported bills live.',
      },
    ],
    relatedPosts: [
      {
        slug: 'import-purchase-from-pdf-tally',
        title: 'Turn Supplier PDFs into Tally Purchase Entries Automatically',
      },
      {
        slug: 'purchase-report-tally-mobile',
        title: 'Purchase Report from Tally on Your Phone',
      },
      {
        slug: 'how-to-reconcile-bank-statement-tally-mobile',
        title: 'How to Reconcile a Bank Statement With Tally on Mobile',
      },
      {
        slug: 'accounts-payable-in-tally-for-distributors',
        title: 'Accounts Payable in Tally: How Distributors Track What They Owe',
      },
    ],
    priority: 0.9,
  },
  {
    // Was src/routes/TallyOnMobile.jsx, which rendered the entire home page
    // body under this canonical. That made it a near-duplicate of / and is the
    // likeliest reason a head term with its own exact-match URL pulled no
    // entries at all. Operator approved rebuilding it as its own page
    // 2026-08-08. This is the broadest of the feature pages by design: it is
    // the term someone searches before they know what the category is called,
    // so it answers "what can a phone actually do with Tally" and hands off to
    // the narrower pages from there.
    slug: 'tally-on-mobile',
    searchPhrase: 'Tally on mobile',
    overline: 'TALLY ON MOBILE',
    headline: 'Tally on mobile, for every hour you are not at that desk.',
    subheadline:
      'Tally runs on one machine in the office. The decisions do not wait for you to be sitting in front of it.',
    // 48 words.
    answer:
      'Takkada puts Tally on mobile for distributors: your live books on a phone, plus the work you would otherwise wait to do at the desk. Read outstanding and reports, raise an invoice, send it on WhatsApp, collect by UPI, and every entry lands back in your own Tally.',
    waContext: 'feature-tally-on-mobile',
    waMessage:
      'Hi, I want to use my Tally from my phone instead of being tied to the office machine. Can you show me what Takkada covers?',
    seo: {
      title: 'Tally on Mobile for Distributors | Takkada',
      description:
        'Run Tally on mobile: read outstanding and reports, raise invoices, send them on WhatsApp and collect by UPI. Every entry writes back into your own Tally.',
    },
    llms: {
      section: 'Features',
      title: 'Tally on mobile',
      summary:
        'What a distributor can actually do with Tally from a phone: read live outstanding and over twenty reports, raise invoices and other vouchers in the existing numbering series, dispatch them on WhatsApp, collect by UPI at 0% MDR, and have every entry write back into the same Tally company.',
    },
    footerLabel: 'Tally on mobile',
    hero: {
      image: '/assets/screenshots/home-screen-framed.webp',
      alt: 'The Takkada home screen on a phone, showing the business registers at a glance',
      width: 800,
      height: 1624,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'What the phone actually covers',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Your books open where you are standing',
        body:
          'Receivables, payables, sales, purchase and stock on the first screen, read from your own Tally. The last synced position stays readable even when the office machine is off.',
        image: '/assets/screenshots/home-screen-framed.webp',
        alt: 'Takkada home screen with the business registers listed',
        width: 800,
        height: 1624,
      },
      {
        icon: 'BookOpen',
        title: 'Any party, any bill, in two taps',
        body:
          'Open a retailer and see what he owes, how old it is, and which invoices make it up. Share his ledger on WhatsApp from the same screen instead of promising to send it later.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'Raise the entry, do not just look at it',
        body:
          'Invoices, delivery challans, sales orders, receipts, credit and debit notes, in your own numbering series and your own formats. It is a Tally voucher, not a note to copy across later.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Voucher item lines with live stock, quantity and rate on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'CalendarClock',
        title: 'The chasing runs while you do other things',
        body:
          'Reminders go out on WhatsApp on a schedule with the invoice and the ledger attached, and the pay link sits in the message. Receipts match themselves back to the bill they settle.',
        image: '/assets/screenshots/smart-reminders-mockup.webp',
        alt: 'Reminder schedule showing the pre-due and post-due steps for an invoice',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'How far the phone gets you',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Reading the books when the Tally machine is off',
          takkada: 'Yes, the last synced position stays readable',
          others: 'Often needs the office computer running',
        },
        {
          feature: 'Raising a voucher, not only viewing one',
          takkada: '13 voucher types, including credit and debit notes and stock journal',
          others: 'A narrower set, typically built around sales',
        },
        {
          feature: 'Getting paid from the same screen',
          takkada: '0% MDR on UPI collections, no transaction cap, no monthly fee',
          others: 'Reminders, without a zero-MDR collection option',
        },
        {
          feature: 'Your numbering and invoice format',
          takkada: 'Kept exactly as they are in Tally',
          others: "Sometimes replaced by the app's own series",
        },
        {
          feature: 'How the licence is counted',
          takkada: 'Per business, with unlimited companies',
          others: 'Often per device or per company, so each one costs again',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note:
        'Reading the books starts at the entry plan. Raising vouchers from the phone comes in one tier up, and collection is an add-on that works on either.',
    },
    faqs: [
      {
        q: 'Is there an official Tally mobile app?',
        a: 'Tally Solutions does not publish a full mobile app that lets you run your books from a phone. What exists are third-party apps that connect to your existing Tally installation, which is what Takkada is. Your Tally licence, your data and your company stay exactly where they are, and the phone becomes another way into them.',
      },
      {
        q: 'Does my Tally data leave my machine?',
        a: 'Your Tally stays the system of record on your own computer. A connector on that machine syncs with the app so your phone can read current balances and send entries back. You are not migrating to anything, and you can stop using the app without your books being affected.',
      },
      {
        q: 'Do I need my office computer switched on to use it?',
        a: 'Not to read. The last synced position stays readable on your phone whether or not the machine is running. Entries you raise while it is off are queued and land in Tally when it next opens, which for most distributors is the following morning at the latest.',
      },
      {
        q: 'How is this different from remote desktop or TeamViewer?',
        a: 'Remote access gives you the Tally screen on a small display, which means pinching around a keyboard-driven interface and needing the office machine awake and connected. This is a phone app built for a phone, with the registers a distributor actually opens, and it keeps working when that machine is off.',
      },
      {
        q: 'Will it change anything in my Tally?',
        a: 'It writes the vouchers you raise and nothing else. Your numbering series, your invoice formats, your ledger and item masters and your existing entries are untouched. Distributors who have run the same Tally setup for a decade do not have to change any of it to start using a phone alongside it.',
      },
    ],
    relatedPosts: [
      {
        slug: 'tally-on-mobile',
        title: 'The Four Bridges From Your Phone to Tally, and What Each One Costs',
      },
      {
        slug: 'how-to-access-tally-on-mobile-step-by-step',
        title: 'How to Access Tally on Mobile: A Step-by-Step Guide',
      },
      {
        slug: 'is-there-an-official-tally-mobile-app',
        title: 'Is There an Official Tally Mobile App? The Honest Answer',
      },
      {
        slug: 'tally-mobile-par-kaise-chalaye',
        title: 'Tally Mobile Par Kaise Chalaye: Step-by-Step Guide',
      },
    ],
    priority: 0.9,
  },
];

/**
 * Every live feature landing page, in the order they were shipped. The split
 * across two modules is only about file size; nothing downstream knows or cares
 * which batch a page came from.
 * @type {FeaturePage[]}
 */
export const FEATURE_PAGES = [...FIRST_BATCH, ...SECOND_BATCH, ...ALTERNATIVES, ...PERSONAS];

// Which module a page's copy lives in, so the sitemap's <lastmod> tracks the
// file that actually changes when the page is edited.
const SOURCE_FILES = new Map([
  ...FIRST_BATCH.map((page) => [page.slug, 'src/data/featurePages.js']),
  ...SECOND_BATCH.map((page) => [page.slug, 'src/data/featurePagesSecondBatch.js']),
  ...ALTERNATIVES.map((page) => [page.slug, 'src/data/featurePagesAlternatives.js']),
  ...PERSONAS.map((page) => [page.slug, 'src/data/featurePagesPersonas.js']),
]);

/** Path with the leading slash, e.g. '/salesman-app-tally'. */
export function featurePagePath(page) {
  return `/${page.slug}`;
}

const featurePageMap = new Map(FEATURE_PAGES.map((p) => [p.slug, p]));

/** Look one page up by slug. Returns undefined when the slug is unknown. */
export function getFeaturePage(slug) {
  return featurePageMap.get(slug);
}

// Spread into routeMetadata by src/data/siteMetadata.js. `sourceFile` points at
// this file so the sitemap's <lastmod> moves whenever a page's content is
// edited, which is the honest signal (the template component barely changes).
export const featureRouteMetadata = FEATURE_PAGES.map((page) => ({
  path: featurePagePath(page),
  llms: page.llms,
  sourceFile: SOURCE_FILES.get(page.slug),
  changefreq: 'monthly',
  priority: page.priority,
}));

// Consumed by the footer "Features" column in src/data/siteContent.js.
export const featureFooterLinks = FEATURE_PAGES.map((page) => ({
  label: page.footerLabel,
  page: page.slug,
}));
