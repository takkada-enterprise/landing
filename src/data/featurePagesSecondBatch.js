// Feature landing pages, second batch (plan Phase 4). Same contract and same
// engine as the first batch; this file exists only so neither module grows past
// the point where a page is hard to find. src/data/featurePages.js concatenates
// the two arrays and everything downstream (routes, sitemap, footer, llms.txt)
// reads the combined list.
//
// Read the header of src/data/featurePages.js before editing: the JSX-free
// constraint, the claims discipline and the reason relatedPosts carries a
// duplicated title all apply here unchanged.
//
// Batch order. The plan asked for the order to come from Search Console
// impressions on the Phase 3 pages. Those pages merged on 2026-08-08 and have
// not been crawled yet, so there is no impression data to order by. The order
// below comes from the two demand signals that do exist: the blog cluster
// already pulling entries for a topic, and how many prod companies actually run
// the underlying feature. Re-order the remainder once Search Console has a few
// weeks on the Phase 3 URLs.
//
// Prod company_feature_entitlements, active and unexpired, read 2026-08-08:
//   payment_reminders 87 · payment_links 87 · invoice_created_whatsapp 87
//   team_access_controls 84 · voucher_creation_mobile 79 · upi_collections 77
//   einvoice_ewaybill_mobile 77 · bank_statement_import 71 · reports_plus 56
//   auto_invoice_dispatch 47 · purchase_import 35 · sales_order_import 34
//   team_sales 18 · payment_collection 10 · billing_module 6 · field_visits 6
//   bulk_delivery_challan 4 · pending_order 3
// Two of those are low enough that these pages carry a capability claim and no
// adoption claim: bulk_delivery_challan (4) and pending_order (3). CLAUDE.md §3
// bans an adoption number for Pending Orders outright.
//
// Screenshot gap, carried deliberately. Four pages in this batch describe
// screens the published library has no safe capture of: bank statement import
// (bankbook.png shows a real customer's bank balances), stock and godown
// (inventory-supplier.png names a real supplier), credit and debit notes, and
// the handwritten order. Those pages follow the precedent /import-purchase-from-pdf
// set in Phase 3: lead with a real adjacent screen and write alt text that
// describes only what is actually in the frame. Worth a capture pass to swap in.

/** @type {import('./featurePages').FeaturePage[]} */
export const SECOND_BATCH = [
  {
    slug: 'outstanding-receivables-on-mobile',
    searchPhrase: 'Outstanding receivables on mobile',
    overline: 'RECEIVABLES',
    headline: 'Outstanding receivables on mobile, party by party.',
    subheadline:
      'You know the total. What you cannot see standing in the market is which retailer is sixty days late and which one paid this morning.',
    answer:
      'Takkada puts your outstanding receivables on mobile, read straight from your Tally. Every party carries its own balance, its overdue invoices and the age of each one. You send a statement or a payment link from the same screen, and the receipt reconciles itself against the right invoice once the retailer pays.',
    waContext: 'feature-outstanding-receivables-on-mobile',
    waMessage:
      'Hi, I want to see my party-wise outstanding from Tally on my phone, with the ageing and the overdue invoices. Can you show me how Takkada does it?',
    seo: {
      title: 'Outstanding Receivables on Mobile, From Tally | Takkada',
      description:
        'Party-wise outstanding receivables on mobile, read live from Tally. Overdue invoices with their ageing, statements on WhatsApp, receipts that match themselves.',
    },
    llms: {
      section: 'Features',
      title: 'Outstanding receivables on mobile',
      summary:
        'Party-wise outstanding read live from Tally on a phone: balance per party, overdue invoices with the age of each, statement and payment link from the same screen, and receipts that reconcile against the invoice they settle.',
    },
    footerLabel: 'Outstanding receivables',
    hero: {
      image: '/assets/screenshots/party-ledger-mockup.webp',
      alt: 'Party ledger on a phone showing outstanding invoices with the amount due against each',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From the total to the party who owes it',
    walkthrough: [
      {
        icon: 'Wallet',
        title: 'Every party carries its own balance',
        body:
          'Open a retailer and the outstanding is already there, read from your Tally rather than typed by anyone. The invoices behind the number are listed under it, so the figure can be argued with on evidence.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Clock',
        title: 'Overdue sorted by how old it is',
        body:
          'The thirty-day party and the ninety-day party stop looking alike. You work the list from the oldest down, which is the order that actually gets money in.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing outstanding invoices with their ages',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'The statement goes out from the same screen',
        body:
          'Send the ledger or a single invoice on WhatsApp while you are standing in front of the shop. The retailer gets the PDF and a pay-now link together, so there is nothing left to ask him for.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice PDF and a pay-now link delivered to a customer on WhatsApp',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'The receipt finds its own invoice',
        body:
          'When he pays, the receipt posts into Tally against the invoice it settles. The evening spent matching credits to bills stops being part of your day.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'Settled collections list showing invoices that have been paid',
        width: 391,
        height: 790,
      },
      {
        icon: 'BarChart3',
        title: 'The whole book in one view',
        body:
          'Sales, receipts, purchase and payments for the financial year, so you can see whether collections are keeping pace with billing or quietly falling behind it.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
    ],
    comparison: {
      heading: 'What you can do with the number once you can see it',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Where the outstanding comes from',
          takkada: 'Read live from your Tally, bill by bill',
          others: 'Also read from Tally, though often on a slower refresh',
        },
        {
          feature: 'Collecting against the invoice you are looking at',
          takkada: 'UPI link on the same screen at 0% MDR, no transaction cap, no monthly fee',
          others: 'Reminders, without a zero-MDR collection option',
        },
        {
          feature: 'Sending the party its own ledger',
          takkada: 'PDF on WhatsApp for any period, from the party screen',
          others: 'Usually available, though the period is often fixed',
        },
        {
          feature: 'What happens after the retailer pays',
          takkada: 'Receipt posts into Tally against the invoice it settles',
          others: 'Payment recorded, matching left to you',
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
      plan: 'Clarity',
      note: 'Reading receivables on mobile is in the entry plan. Voucher creation and UPI collection sit above it.',
    },
    faqs: [
      {
        q: 'How do I see party-wise outstanding from Tally on my phone?',
        a: 'A connector on the machine running Tally syncs your books with the app, and the app shows each party with its closing balance and the invoices making it up. You open a retailer and see what he owes, which bills are overdue and how old each one is, without opening Tally or asking anyone in the office to read it out to you.',
      },
      {
        q: 'Does the outstanding update on its own, or do I refresh it?',
        a: 'It updates as your Tally changes. When a voucher is passed on the desktop, the sync picks it up and the party balance on the phone moves with it. You are reading the same book your accountant is working in, so there is no second version of the number to reconcile against the first.',
      },
      {
        q: 'Can I send a party its own statement from the app?',
        a: 'Yes. From the party screen you can send the ledger for a period, or a single invoice, as a PDF on WhatsApp. If payment collection is switched on, a pay-now link goes with it, so the retailer can settle straight from the message instead of promising to transfer later.',
      },
      {
        q: 'Will my salesman see every party I deal with?',
        a: 'Only if you let him. View and create rights are set per register and per person, and you can restrict which ledgers a user sees. A salesman can be given his own parties and nothing else, so he can work his route without your whole receivables book being open to him.',
      },
      {
        q: 'Does this change anything inside my Tally?',
        a: 'Reading does not. Your Tally stays the system of record and nothing is rewritten to show you a balance. When you create a receipt or an invoice from the app, that voucher is written into Tally the way you would have entered it on the desktop, against the same party and the same bill.',
      },
    ],
    relatedPosts: [
      {
        slug: 'how-to-check-party-outstanding-tally-mobile',
        title: 'How to Check Party Outstanding in Tally on Mobile',
      },
      {
        slug: 'outstanding-receivables-report-tally',
        title: 'Outstanding Receivables Report for Distributors (Mobile)',
      },
      {
        slug: 'sundry-debtors-tally-mobile',
        title: 'Sundry Debtors in Tally: See Who Owes You on Mobile',
      },
      {
        slug: 'partywise-outstanding-statement-tally',
        title:
          'Partywise Outstanding Statement in Tally: Format, WhatsApp Dispatch, Auto-Reminders',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'share-ledger-statement-whatsapp',
    // The phrase people actually type is the object, not the imperative, so the
    // page targets 'ledger statement on WhatsApp' and the h1 wraps it in a
    // sentence a distributor would say.
    searchPhrase: 'ledger statement on WhatsApp',
    overline: 'LEDGER SHARE',
    headline: 'Share a ledger statement on WhatsApp, straight from Tally.',
    subheadline:
      'The retailer says his books show something else. Until he has your statement in his hand, that argument runs for another week.',
    answer:
      'Takkada lets you share a ledger statement on WhatsApp for any party and any period, generated from your Tally. Pick the party, pick the dates, and the PDF goes out from your phone with a payment link attached. The retailer can check every entry against his own book and settle from the same message.',
    waContext: 'feature-share-ledger-statement-whatsapp',
    waMessage:
      'Hi, I want to send party ledger statements from my Tally on WhatsApp for any date range. Can you show me how Takkada does it?',
    seo: {
      title: 'Share a Ledger Statement on WhatsApp | Takkada',
      description:
        'Send a party ledger statement on WhatsApp for any period, generated from Tally, with a payment link attached. Settle balance disputes from the market.',
    },
    llms: {
      section: 'Features',
      title: 'Share ledger statement on WhatsApp',
      summary:
        'Send any party a ledger statement for any date range as a PDF on WhatsApp, generated from Tally, with a payment link attached so the retailer can check the entries and settle from the same message.',
    },
    footerLabel: 'Ledger on WhatsApp',
    hero: {
      image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
      alt: 'A statement PDF and a pay-now link delivered to a retailer on WhatsApp',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From a disputed balance to a settled one',
    walkthrough: [
      {
        icon: 'BookOpen',
        title: 'Open the party, see the entries',
        body:
          'Every invoice, receipt and note against that retailer, in order, read from your Tally. This is the same ledger your accountant is looking at on the desktop.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing receipts matched against the invoices they settle',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CalendarClock',
        title: 'Choose the period he is arguing about',
        body:
          'Any date range, not just the current year. When a retailer disputes an entry from two seasons ago, you send that window rather than the whole book.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and their due dates',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Share2',
        title: 'The PDF goes out on WhatsApp',
        body:
          'It reaches the number he actually reads, with your business name on it. He can open it in the shop, on the road, at ten at night, and check it against his own book.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Invoice PDF and payment link delivered to a retailer on WhatsApp',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Link2',
        title: 'A payment link rides along with it',
        body:
          'Once he agrees the balance, there is nothing left to arrange. He pays from the same message by UPI, at 0% MDR, with no transaction cap and no monthly fee.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice summary in Takkada with the amount due and a payment link on the same screen',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'The receipt lands against the right bill',
        body:
          'His payment posts into your Tally against the invoices it settles, so the statement you send next month already reflects it.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'List of settled collections with the amount and date of each',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'What a statement is worth depends on what rides with it',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Period you can send',
          takkada: 'Any date range, including closed years',
          others: 'Often the current period only',
        },
        {
          feature: 'Where the PDF is generated',
          takkada: 'From your Tally ledger, on demand',
          others: 'Also from Tally, though sometimes from a cached copy',
        },
        {
          feature: 'Collecting on the statement you just sent',
          takkada: 'Payment link on the same message at 0% MDR, no transaction cap, no monthly fee',
          others: 'Statement only, collection arranged separately',
        },
        {
          feature: 'Letting the buyer pick which bills to clear',
          takkada: 'He selects the invoices and the receipt splits across them',
          others: 'A single lump payment you match by hand',
        },
        {
          feature: 'Sending from your own WhatsApp Business number',
          takkada: 'Available as an early-access add-on',
          others: 'Usually a shared sender',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note: 'Ledger and invoice share is in the entry plan. Payment collection is an add-on available on every plan.',
    },
    faqs: [
      {
        q: 'How do I send a ledger statement from Tally on WhatsApp?',
        a: 'Open the party in the app, choose the period you want, and send. The statement is generated from your Tally ledger as a PDF and goes out on WhatsApp to the number saved against that party. You do not need to be at the office or have anyone export it for you, so a balance question raised in the market gets answered in the market.',
      },
      {
        q: 'Can I send a statement for a period that is already closed?',
        a: 'Yes. You pick the date range, including windows from earlier financial years, as long as that data is in the Tally company you are connected to. This is the version distributors use most, because the entry a retailer disputes is usually an old one rather than something from this month.',
      },
      {
        q: 'Can the retailer pay from the statement I send?',
        a: 'If payment collection is switched on for your business, a pay-now link goes with the statement. He settles by UPI from the same message, and you receive it at zero MDR with no transaction cap and no monthly fee. The receipt then posts into your Tally against the invoices it clears.',
      },
      {
        q: 'Does the statement go from my own WhatsApp number?',
        a: 'By default it goes from the platform sender with your business name on the message. Sending from your own WhatsApp Business number is available as an early-access add-on. Distributors ask for it because a message from a number the retailer already has saved gets opened, and an unknown sender often does not.',
      },
      {
        q: 'Does sending a statement change anything in my Tally?',
        a: 'No. Generating and sending a ledger is a read. Nothing is written back, no voucher is created and no balance is touched. The only entries the app writes into your Tally are the ones you deliberately create, such as a receipt when the retailer pays or an invoice when you raise one.',
      },
    ],
    relatedPosts: [
      {
        slug: 'how-to-share-ledger-statement-whatsapp-tally',
        title: 'How to Share a Ledger Statement on WhatsApp From Tally',
      },
      {
        slug: 'online-balance-confirmation-ledger',
        title: 'Ledger Balance Confirmation Online: Do It Quarterly, Not at Year End',
      },
      {
        slug: 'ledger-reconciliation-tally-distributor',
        title: "Ledger Reconciliation in Tally: Match Your Books to the Party's",
      },
      {
        slug: 'let-buyers-choose-invoices-to-pay',
        title: 'Let Buyers Choose Which Invoices to Pay: The Bill by Bill Payment Link',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'debtor-ageing-report-on-phone',
    searchPhrase: 'Debtor ageing report on phone',
    overline: 'AGEING',
    headline: 'Debtor ageing report on phone, from your own Tally.',
    subheadline:
      'Everyone owes you something. The question worth answering before you start dialling is who has been owing it the longest.',
    answer:
      'Takkada gives you a debtor ageing report on phone, built from your Tally bill by bill. Every party falls into a slab by how old its overdue invoices are, so the ninety-day retailer stops hiding behind the thirty-day one. You can call, send the ledger or attach a payment link from the same list.',
    waContext: 'feature-debtor-ageing-report-on-phone',
    waMessage:
      'Hi, I want a debtor ageing report from my Tally on my phone, with the slabs and the party-wise overdue. Can you show me how Takkada does it?',
    seo: {
      title: 'Debtor Ageing Report on Phone, From Tally | Takkada',
      description:
        'Read a bill-by-bill debtor ageing report on phone, built from Tally. Slabs by age, party-wise overdue, and a ledger or payment link sent from the same list.',
    },
    llms: {
      section: 'Features',
      title: 'Debtor ageing report on phone',
      summary:
        'Bill-by-bill receivables ageing built from Tally and read on a phone: parties grouped into age slabs, the overdue invoices behind each one, and the ledger or a payment link sent from the same screen.',
    },
    footerLabel: 'Debtor ageing',
    hero: {
      image: '/assets/screenshots/party-ledger-mockup.webp',
      alt: 'Party ledger on a phone showing outstanding invoices with the age of each',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Working the list from the oldest down',
    walkthrough: [
      {
        icon: 'Clock',
        title: 'Overdue grouped by age',
        body:
          'Parties fall into slabs by how long their bills have been outstanding. The list you should be working today separates itself from the list that can wait.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing outstanding invoices with their ages',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'The bills behind every number',
        body:
          'Ageing computed bill by bill rather than on a closing balance, so a part-paid invoice ages on what is still open against it rather than dropping out of the report.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'Act on the party without leaving the report',
        body:
          'Send the ledger, send the invoice, attach a payment link. The report stops being something you read and becomes the thing you collect from.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice PDF and a pay-now link delivered to a customer on WhatsApp',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CalendarClock',
        title: 'Reminders take over the routine chasing',
        body:
          'Schedules run before and after the due date, with caps per party so nobody is messaged into ignoring you. Your calls go to the parties that need a human.',
        image: '/assets/screenshots/smart-reminders-mockup.webp',
        alt: 'Reminder schedule showing pre-due and post-due steps for an invoice',
        width: 391,
        height: 790,
      },
      {
        icon: 'BarChart3',
        title: 'Watch whether the ageing is improving',
        body:
          'Collections against billing across the year, so you can tell whether the oldest slab is actually shrinking or just being replaced by new arrivals.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
    ],
    comparison: {
      heading: 'What separates an ageing report you can act on',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'How the ageing is computed',
          takkada: 'Bill by bill, against each open invoice',
          others: 'Sometimes on the party closing balance alone',
        },
        {
          feature: 'Choosing your own slabs',
          takkada: 'Boundaries you set, carried through the report and the export',
          others: 'Usually fixed buckets',
        },
        {
          feature: 'Collecting from inside the report',
          takkada: 'Payment link at 0% MDR, no transaction cap, no monthly fee',
          others: 'Read-only, collection arranged elsewhere',
        },
        {
          feature: 'Chasing the routine cases automatically',
          takkada: 'Scheduled reminders before and after due date, capped per party',
          others: 'Manual sends, or a single blanket reminder',
        },
        {
          feature: 'Taking it to your CA',
          takkada: 'Excel export that keeps the party detail under each slab',
          others: 'Often a totals-only export',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note: 'Receivables and the 20+ reports are in the entry plan. Payment collection is an add-on on every plan.',
    },
    faqs: [
      {
        q: 'What is a debtor ageing report, and why does the slab matter?',
        a: 'It groups what your retailers owe by how long it has been outstanding, so money that is thirty days late is separated from money that is ninety days late. The slab matters because recovery odds fall as a bill ages. Working the oldest slab first is what stops a slow-paying party quietly turning into a written-off one.',
      },
      {
        q: 'Is the ageing worked out on the balance or on each bill?',
        a: 'On each bill. A party that has paid part of an old invoice keeps ageing on the amount still open against it, rather than dropping out of the report because his overall balance looks healthy. This is the difference between an ageing report that finds your real problems and one that flatters them.',
      },
      {
        q: 'Can I set my own ageing slabs?',
        a: 'Yes. You set the boundaries that match your credit terms rather than accepting fixed buckets, and the report and the Excel export both carry them. A distributor on sixty-day terms and one on thirty-day terms are asking different questions of the same data, so the same slabs would mislead one of them.',
      },
      {
        q: 'Can I give this report to my accountant or CA?',
        a: 'Yes. The report exports to Excel with the party detail sitting under each slab rather than the totals alone, so whoever receives it can see which retailers make up a bucket. That detail is usually the first thing a CA asks for after seeing an ageing summary.',
      },
      {
        q: 'Do I have to chase every party on the list myself?',
        a: 'No. Scheduled reminders handle the routine cases before and after the due date, with a cap on how often any one party is messaged. That leaves your own calls for the parties where a conversation is actually needed, which is usually the oldest slab rather than the whole book.',
      },
    ],
    relatedPosts: [
      {
        slug: 'aging-report-tally',
        title: 'Aging Report in Tally: How Distributors Read It and Act On It',
      },
      {
        slug: 'days-sales-outstanding-distributor-india',
        title: 'Days Sales Outstanding for Indian Distributors: What It Is and How to Cut It',
      },
      {
        slug: 'clean-up-old-receivables-tally',
        title: 'How to Clean Up Old Receivables Sitting in Your Tally',
      },
      {
        slug: 'creditors-vs-debtors-tally',
        title: "Creditors vs Debtors in Tally: A Distributor's Cheat Sheet",
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'tally-on-mobile-without-remote-access',
    searchPhrase: 'Tally on mobile without remote access',
    overline: 'NO REMOTE DESKTOP',
    headline: 'Tally on mobile without remote access or TeamViewer.',
    subheadline:
      'Pinching at a desktop screen on a phone, waiting for the office machine to wake up, is how most distributors have been reading their books from the road.',
    answer:
      'You can run Tally on mobile without remote access by syncing your books to an app built for a phone. Takkada reads your Tally through a connector on the same machine, so there is no desktop to log into, no screen to pinch at, and no need for the office computer to stay switched on for you.',
    waContext: 'feature-tally-on-mobile-without-remote-access',
    waMessage:
      'Hi, I am using TeamViewer or remote desktop to see my Tally from outside the office and it is painful. Can you show me how Takkada works instead?',
    seo: {
      title: 'Tally on Mobile Without Remote Access | Takkada',
      description:
        'Read and work your Tally books on a phone without TeamViewer, AnyDesk or remote desktop. A mobile app synced from your own Tally, with no screen to pinch at.',
    },
    llms: {
      section: 'Features',
      title: 'Tally on mobile without remote access',
      summary:
        'An alternative to TeamViewer, AnyDesk and remote desktop for reading Tally from outside the office: a connector syncs the books to a phone app built for a phone, so no desktop session is involved.',
    },
    footerLabel: 'Without remote access',
    hero: {
      image: '/assets/screenshots/home-screen-framed.webp',
      alt: 'The Takkada home screen on a phone, showing the business registers at a glance',
      width: 800,
      height: 1624,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'What replaces the remote desktop session',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Screens built for a phone',
        body:
          'Registers, parties and reports laid out for a thumb rather than a mouse. Nothing to zoom into, and nothing that needs a keyboard you do not have with you.',
        image: '/assets/screenshots/home-screen-framed.webp',
        alt: 'Takkada home screen with the business registers listed',
        width: 800,
        height: 1624,
      },
      {
        icon: 'Wallet',
        title: 'The books, not a picture of the books',
        body:
          'Party balances and outstanding invoices you can search and tap through. A remote session shows you the desktop; this gives you the data underneath it.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'BarChart3',
        title: 'Reports that open on a 4G signal',
        body:
          'A summary of sales, receipts, purchase and payments loads over an ordinary mobile connection, in a market street where a remote desktop session would time out.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
      {
        icon: 'ShieldCheck',
        title: 'Nobody is handed your desktop',
        body:
          'Remote tools give whoever holds the credentials your entire machine. Here each person gets an account with rights set per register, and the ledgers and stock groups they can see are set by you.',
        image: '/assets/screenshots/rbac.webp',
        alt: 'Role-based access settings controlling what each user can see and do',
        width: 904,
        height: 1874,
      },
      {
        icon: 'Send',
        title: 'Act from the road, not just look',
        body:
          'Send a statement, raise an invoice, take a UPI payment. The trip back to the office to do the thing you just decided to do stops being part of the job.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice PDF and a pay-now link delivered to a customer on WhatsApp',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'A remote desktop session against a mobile app',
      othersLabel: 'Remote desktop and screen-sharing tools',
      rows: [
        {
          feature: 'What you are looking at',
          takkada: 'Screens designed for a phone',
          others: 'A desktop screen shrunk onto a phone',
        },
        {
          feature: 'The office machine',
          takkada: 'Syncs when it is on, and the app keeps working when it is not',
          others: 'Must stay powered on and connected for you to see anything',
        },
        {
          feature: 'Behaviour on a weak mobile signal',
          takkada: 'Loads over ordinary 4G',
          others: 'Sessions lag or drop',
        },
        {
          feature: 'What a second person gets access to',
          takkada: 'An account limited to the registers, ledgers and stock groups you allow',
          others: 'The whole machine, and everything on it',
        },
        {
          feature: 'Doing the work rather than viewing it',
          takkada: 'Invoice, receipt, statement and UPI collection from the phone',
          others: 'Whatever you can drive through the remote screen',
        },
      ],
      disclaimer:
        'Compared against the remote desktop and screen-sharing tools distributors most often use to reach Tally from outside the office, as of 8 August 2026.',
    },
    planPointer: {
      plan: 'Clarity',
      note: 'Reading the books on mobile is in the entry plan. Creating vouchers from the phone sits above it.',
    },
    faqs: [
      {
        q: 'Can I see Tally on my phone without TeamViewer or AnyDesk?',
        a: 'Yes. Instead of driving the desktop screen remotely, a connector on the machine running Tally syncs your books with a mobile app. You get party balances, outstanding, registers and reports laid out for a phone. There is no session to establish, nothing to zoom into, and no remote-control software sitting on your office machine.',
      },
      {
        q: 'Does my office computer have to stay switched on?',
        a: 'It has to be on for the sync to pick up new vouchers, the same as it would be during your working day. It does not need to stay on for you to read your books. Once your data has synced you can open the app on a Sunday with the office shut and still see where every party stands.',
      },
      {
        q: 'Is this safer than giving someone remote access?',
        a: 'It is a narrower grant. A remote tool hands over the whole machine to whoever has the credentials, including files that have nothing to do with Tally. Here each person gets their own account, with view and create rights set per register, and you decide which ledgers and stock groups they can see at all.',
      },
      {
        q: 'Does it work where the mobile signal is weak?',
        a: 'It loads over an ordinary 4G connection, which is where remote desktop sessions usually become unusable. It does need a working data connection, because there is no offline mode. In a dead-signal pocket you will have to move to where there is signal before a screen loads or an entry goes through.',
      },
      {
        q: 'Does my Tally data leave my machine?',
        a: 'Your Tally installation stays where it is and stays the system of record. The connector syncs the company data you point it at so the app can show it to you, in the same way any mobile app for Tally has to. Nothing is rewritten in your books except the vouchers you deliberately create from the app.',
      },
    ],
    relatedPosts: [
      {
        slug: 'tally-remote-access-vs-mobile-app',
        title: 'Tally Remote Access vs a Mobile App for Distributors',
      },
      {
        slug: 'tally-cloud',
        title: 'Tally Cloud: What It Actually Means for Indian Distributors in 2026',
      },
      {
        slug: 'is-it-safe-to-connect-app-to-tally',
        title: 'Is It Safe to Connect a Third-Party App to Tally?',
      },
      {
        slug: 'tally-data-on-your-own-server',
        title: 'Can My Tally Data Stay on My Own Server?',
      },
    ],
    priority: 0.9,
  },

  // Deliberate overlap with /payment-reminder-tally, and worth watching. That
  // page answers a Tally-qualified query ("payment reminder tally"); this one
  // answers the problem phrase someone types before they know a Tally app
  // exists. The copy, the FAQs and the framing are written apart so this is a
  // second answer rather than a second copy. If Search Console shows the two
  // trading places on the same queries, merge them rather than letting both
  // rank thinly.
  {
    slug: 'send-payment-reminders-automatically',
    searchPhrase: 'send payment reminders automatically',
    overline: 'REMINDERS',
    headline: 'Send payment reminders automatically, from your own books.',
    subheadline:
      'Ringing thirty retailers to ask for money is a full morning. Most of them would have paid on a message, and the rest are the ones worth calling.',
    answer:
      'Takkada can send payment reminders automatically against every open invoice in your Tally. You set the schedule once, before the due date and after it, and each message carries the invoice and a payment link. Caps per party stop a retailer being messaged into ignoring you, and paid bills drop out on their own.',
    waContext: 'feature-send-payment-reminders-automatically',
    waMessage:
      'Hi, I want payment reminders going out to my parties automatically instead of me calling everyone. Can you show me how Takkada sets that up?',
    seo: {
      title: 'Send Payment Reminders Automatically | Takkada',
      description:
        'Set a reminder schedule once and let it run. Pre-due and post-due WhatsApp reminders built from your Tally invoices, capped per party, each with a payment link.',
    },
    llms: {
      section: 'Features',
      title: 'Send payment reminders automatically',
      summary:
        'Scheduled WhatsApp reminders built from open Tally invoices: steps before and after the due date, a cap on how often any party is messaged, a payment link on every message, and paid bills dropping out of the schedule on their own.',
    },
    footerLabel: 'Automatic reminders',
    hero: {
      image: '/assets/screenshots/smart-reminders-mockup.webp',
      alt: 'Reminder schedule showing the pre-due and post-due steps set against an invoice',
      width: 391,
      height: 790,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Set it once, then stop dialling',
    walkthrough: [
      {
        icon: 'CalendarClock',
        title: 'A schedule, not a blast',
        body:
          'Steps that run before the due date as a nudge and after it as a follow-up. The retailer hears from you at the moment it changes what he does, rather than on the day you happened to remember him.',
        image: '/assets/screenshots/smart-reminders-mockup.webp',
        alt: 'Reminder schedule showing pre-due and post-due steps for an invoice',
        width: 391,
        height: 790,
      },
      {
        icon: 'MessageCircle',
        title: 'The message carries the bill',
        body:
          'Each reminder goes out on WhatsApp with the invoice attached, so there is no reply asking which bill you mean and no screenshot to hunt for.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'A WhatsApp reminder carrying the invoice PDF and a payment link',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Link2',
        title: 'He can pay from the reminder',
        body:
          'A pay-now link sits in the message at 0% MDR, with no transaction cap and no monthly fee. The gap between deciding to pay and actually paying is where most collections are lost.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice summary in Takkada with the amount due and a payment link on the same screen',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ShieldCheck',
        title: 'Caps keep the relationship intact',
        body:
          'You set how often any one party can be messaged. A retailer who is chased daily stops reading you altogether, which costs more than the bill you were chasing.',
        image: '/assets/screenshots/payment-reminders.webp',
        alt: 'Reminder settings controlling how often a party is messaged',
        width: 820,
        height: 1698,
      },
      {
        icon: 'CheckCheck',
        title: 'Paid bills leave the queue by themselves',
        body:
          'When the receipt lands in your Tally, the invoice drops out of the schedule. Nobody gets chased for money they have already sent, which is the mistake that ends the goodwill fastest.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'Settled collections list showing invoices that have been paid',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'What makes a reminder run collect instead of annoy',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'When reminders go out',
          takkada: 'Scheduled steps before and after the due date',
          others: 'Often a single manual send',
        },
        {
          feature: 'What the message carries',
          takkada: 'The invoice PDF and a payment link',
          others: 'Usually text and an amount',
        },
        {
          feature: 'Protecting the party from over-messaging',
          takkada: 'A cap per party that you set',
          others: 'Rarely capped',
        },
        {
          feature: 'Stopping reminders on paid bills',
          takkada: 'Drops out automatically once the receipt is in Tally',
          others: 'Depends on you updating the list',
        },
        {
          feature: 'Who the message appears to come from',
          takkada: 'Platform sender by default, your own WhatsApp Business number as an early-access add-on',
          others: 'Usually a shared sender only',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Clarity',
      note: 'Automated WhatsApp reminders are in the entry plan. Payment collection is an add-on available on every plan.',
    },
    faqs: [
      {
        q: 'How do I stop chasing customers for payment by phone every day?',
        a: 'Put the routine chasing on a schedule and keep your calls for the parties that need one. Reminders go out from your open Tally invoices before and after the due date, each carrying the bill and a way to pay. Most retailers settle on a message, so the calling list shrinks to the genuinely difficult accounts.',
      },
      {
        q: 'Where do the reminders get their list from?',
        a: 'From the open invoices in your own Tally, not a list you maintain separately. When a bill is raised it enters the schedule, and when the receipt is recorded it leaves. That is what keeps a retailer who paid last week from being chased this week, which is the failure that makes people switch reminders off.',
      },
      {
        q: 'Will my parties get annoyed at being messaged?',
        a: 'You control the frequency. Each party has a cap on how often it can be messaged, and the schedule is built around the due date rather than firing at everyone at once. A reminder that arrives twice with the bill attached reads as a business following up. One that arrives daily reads as harassment and gets muted.',
      },
      {
        q: 'Can the customer pay straight from the reminder?',
        a: 'Yes, if payment collection is switched on for your business. The message carries a UPI pay-now link, and you receive the money at zero MDR with no transaction cap and no monthly fee. The receipt then posts into your Tally against the invoices it settles, so the ledger closes itself.',
      },
      {
        q: 'Can reminders come from my own WhatsApp number?',
        a: 'Sending from your own WhatsApp Business number is available as an early-access add-on. It matters more than it sounds, because a retailer opens a message from a number he already has saved and often ignores an unknown sender. By default reminders go from the platform sender with your business name on them.',
      },
    ],
    relatedPosts: [
      {
        slug: 'outstanding-payment-reminder-app-india',
        title: 'Outstanding Payment Reminder: How the Best Distributors Run It in 2026',
      },
      {
        slug: 'send-reminders-from-your-own-whatsapp-number',
        title:
          'Payment Reminder From Your Own WhatsApp Number: Why the Sender Decides If It Gets Read',
      },
      {
        slug: 'payment-due-date-tracking-tally',
        title: 'Payment Due-Date Tracking in Tally So Nothing Slips',
      },
      {
        slug: 'udhar-vasuli-kaise-kare-distributor',
        title: 'Udhar Vasuli Kaise Kare: A Working Playbook for Indian Distributors in 2026',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'bank-statement-import-tally',
    searchPhrase: 'Bank statement import',
    overline: 'RECONCILIATION',
    headline: 'Bank statement import into Tally, from the file your bank already gives you.',
    subheadline:
      'Forty credits landed this week. Somebody has to work out which retailer sent each one and which bills it clears, and that somebody is usually you at nine at night.',
    answer:
      'Bank statement import takes the file your bank already gives you and turns each credit into a Tally entry. Takkada reads the narration and the UTR, suggests the party and the invoices the amount settles, and you approve before anything posts. The evening spent matching credits to bills stops being manual.',
    waContext: 'feature-bank-statement-import-tally',
    waMessage:
      'Hi, I want to import my bank statement and get the credits posted into Tally against the right parties and invoices. Can you show me how Takkada does it?',
    seo: {
      title: 'Bank Statement Import Into Tally | Takkada',
      description:
        'Import a bank statement and turn each credit into a Tally receipt matched to the right party and invoices. Read the UTR, check the suggestion, then post.',
    },
    llms: {
      section: 'Features',
      title: 'Bank statement import',
      summary:
        'Upload a bank statement and have each credit turned into a Tally entry: the narration and UTR are read, the party and the invoices the amount settles are suggested, and nothing posts into the books until it is approved.',
    },
    footerLabel: 'Bank statement import',
    hero: {
      image: '/assets/screenshots/settlements-mockup.webp',
      alt: 'Collections listed in the app with the amount and date of each',
      width: 391,
      height: 790,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From a bank file to a closed ledger',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'Bring in the statement you already download',
        body:
          'The file your bank gives you, without anyone retyping a line of it. This is the same statement your accountant has been working through by eye.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'List of settled collections with the amount and date of each',
        width: 391,
        height: 790,
      },
      {
        icon: 'ListChecks',
        title: 'Each credit is read, not guessed at',
        body:
          'The narration and the UTR are used to work out who sent the money. A credit with a reference in it is matched on that reference rather than on the amount alone.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing receipts matched against the invoices they settle',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'The bills it clears are proposed for you',
        body:
          'One payment covering three invoices is split across them rather than sitting on account. You see the proposed allocation before it becomes an entry.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice summary showing the amount due against a bill',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ShieldCheck',
        title: 'Nothing posts until you say so',
        body:
          'You approve the batch, and only then are the receipts written into Tally. A credit that cannot be attributed waits for you rather than being forced onto the nearest party.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing the entries recorded against it',
        width: 600,
        height: 1243,
      },
      {
        icon: 'BarChart3',
        title: 'The bank position stops being a mystery',
        body:
          'Receipts and payments for the year in one view, so the gap between what the bank shows and what the books show is something you can look at rather than something you dread.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
    ],
    comparison: {
      heading: 'What separates an import from a pile of entries',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Working out who sent the money',
          takkada: 'Narration and UTR read, party suggested',
          others: 'Matched by amount, or left to you',
        },
        {
          feature: 'One payment against several bills',
          takkada: 'Split across the invoices it settles',
          others: 'Posted on account, allocated later by hand',
        },
        {
          feature: 'Before it reaches your books',
          takkada: 'You approve the batch first',
          others: 'Varies, and some post directly',
        },
        {
          feature: 'A credit nobody can attribute',
          takkada: 'Held for you rather than forced onto a party',
          others: 'Often dumped into a suspense entry',
        },
        {
          feature: 'Where the entry ends up',
          takkada: 'A receipt in your Tally against the right bill',
          others: 'Sometimes only inside the app',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Copilot',
      note: 'Bank statement import is part of the Copilot plan. It is no longer sold as a separate add-on.',
    },
    faqs: [
      {
        q: 'How do I import a bank statement into Tally?',
        a: 'Upload the statement file your bank already provides, and each credit is read and turned into a proposed receipt against a party and the invoices it settles. You review the batch and approve it, and the entries are then written into your Tally. Nothing is typed twice and nothing posts without you agreeing to it.',
      },
      {
        q: 'How does it know which retailer sent a payment?',
        a: 'It reads the narration and the UTR on the credit rather than matching on the amount alone, which is what makes two retailers sending the same figure on the same day distinguishable. Where the reference is genuinely missing, the credit is held for you to attribute instead of being attached to whichever party looks closest.',
      },
      {
        q: 'What happens when one payment covers several invoices?',
        a: 'It is split across the bills it settles rather than sitting on account against the party. This is the difference that matters at ageing time, because an unallocated credit leaves old invoices looking open when they have actually been paid, and your oldest slab reads worse than the truth.',
      },
      {
        q: 'Can it post entries into my Tally without me checking them?',
        a: 'No. The batch waits for your approval, and only the entries you approve are written into your books. This is deliberate. A reconciliation tool that posts on its own is one bad match away from a ledger you have to unpick by hand, which costs more than the reconciliation ever saved.',
      },
      {
        q: 'Do I still need my accountant for reconciliation?',
        a: 'You still want the review, but the typing goes away. What used to be an evening of reading a statement line by line becomes a batch your accountant checks and approves. The exceptions, meaning the credits nobody can attribute, are surfaced separately so the work is spent where the judgement is actually needed.',
      },
    ],
    relatedPosts: [
      {
        slug: 'how-to-reconcile-bank-statement-tally-mobile',
        title: 'How to Reconcile a Bank Statement With Tally on Mobile',
      },
      {
        slug: 'what-is-utr-number-tally-payment',
        title: 'What Is a UTR Number, and How It Matches a Tally Payment',
      },
      {
        slug: 'which-invoice-did-customer-pay-upi',
        title: 'UPI Payment Against Which Invoice? How to Identify a Credit With No Reference',
      },
      {
        slug: 'cash-bank-report-tally-mobile',
        title: 'Cash and Bank Position Report from Tally',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'godown-wise-stock-on-mobile',
    searchPhrase: 'Godown wise stock on mobile',
    overline: 'STOCK AND GODOWNS',
    headline: 'Godown wise stock on mobile, for every location you run.',
    subheadline:
      'The main godown says the item is there. The branch says it is not. Somebody drives across town to find out which one is right.',
    answer:
      'Godown wise stock on mobile shows what is lying in each of your locations, read from your Tally. Item balances per godown, transfers recorded between them, and the godown stamped on the invoice or challan you raise. Staff can be limited to the warehouse they actually work in.',
    waContext: 'feature-godown-wise-stock-on-mobile',
    waMessage:
      'Hi, I run stock across more than one godown and want to see and move it from my phone, with it going into Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Godown Wise Stock on Mobile, From Tally | Takkada',
      description:
        'See stock godown by godown from Tally on your phone. Balances per location, transfers between godowns, and staff limited to the warehouse they work in.',
    },
    llms: {
      section: 'Features',
      title: 'Godown wise stock on mobile',
      summary:
        'Stock read per location from Tally on a phone: item balances godown by godown, stock transfers between them written back as vouchers, the godown carried on invoices and delivery challans, and per-user limits on which warehouses a member can see.',
    },
    footerLabel: 'Godown wise stock',
    hero: {
      image: '/assets/screenshots/add-items-mockup.webp',
      alt: 'Item lines on a phone showing live stock, quantity and rate',
      width: 600,
      height: 1242,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Knowing what is where, without driving there',
    walkthrough: [
      {
        icon: 'PackageCheck',
        title: 'Stock read location by location',
        body:
          'Item balances per godown rather than one company total. The question of whether the branch can serve an order stops needing a phone call to answer.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Voucher item lines with live stock, quantity and rate on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'Truck',
        title: 'Move stock between godowns from the phone',
        body:
          'A transfer recorded on the spot becomes a stock journal in your Tally, so the books do not wait for someone to enter it when they next sit at the desktop.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Dispatch documents listed in the app with their details',
        width: 600,
        height: 1218,
      },
      {
        icon: 'FileCheck2',
        title: 'The godown travels with the document',
        body:
          'Invoices and delivery challans carry the location the goods actually left from, which is what keeps the stock in the books matching the stock on the floor.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice detail in the app carrying the dispatch document actions',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Lock',
        title: 'Each person sees their own warehouse',
        body:
          'Stock group and location visibility is set per member, independently of ledger access. Your branch staff work their own stock without the rest of the network being open to them.',
        image: '/assets/screenshots/rbac.webp',
        alt: 'Role-based access settings controlling what each user can see and do',
        width: 904,
        height: 1874,
      },
      {
        icon: 'BarChart3',
        title: 'The movement behind the balance',
        body:
          'What sold, what came in and what moved, so a location running dry is something you notice before the orders start bouncing.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
    ],
    comparison: {
      heading: 'What multi-location actually has to handle',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Stock shown per location',
          takkada: 'Balances godown by godown',
          others: 'Often a single company-wide figure',
        },
        {
          feature: 'Recording a transfer between godowns',
          takkada: 'Stock journal written into Tally from the phone',
          others: 'Usually back at the desktop',
        },
        {
          feature: 'Godown on the invoice and the challan',
          takkada: 'Carried on the document',
          others: 'Frequently dropped',
        },
        {
          feature: 'Limiting a member to one warehouse',
          takkada: 'Stock group scope set per member, separate from ledger access',
          others: 'Ledger-level access only, if any',
        },
        {
          feature: 'Creating a godown without the desktop',
          takkada: 'From the app, written back into Tally',
          others: 'Desktop only',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Reading stock is in the entry plan. Recording transfers and raising challans from the phone starts here.',
    },
    faqs: [
      {
        q: 'How do I see godown-wise stock from Tally on my phone?',
        a: 'The app reads the godowns configured in your Tally and shows item balances against each one rather than a single company total. You open an item and see where it is lying, or open a location and see what it holds. Nobody has to ring the branch to find out whether an order can be served from there.',
      },
      {
        q: 'Can I transfer stock between godowns from the app?',
        a: 'Yes. A transfer recorded on the phone is written into your Tally as a stock journal against both locations, so the books reflect the movement at the time it happened. This is what stops the familiar gap where goods physically moved on Monday and the entry was passed on Friday, if anyone remembered.',
      },
      {
        q: 'Does the godown carry through to the invoice and delivery challan?',
        a: 'Yes. The location the goods left from is recorded on the document rather than being lost between the dispatch and the books. Without it the company stock total can look correct while both individual godowns are wrong, which is the version of the problem that only surfaces at physical verification.',
      },
      {
        q: 'Can I stop a branch person from seeing stock at other locations?',
        a: 'Yes. Stock group visibility is set per member and works independently of ledger access, so someone can be given the stock they handle without being given your parties, or the other way round. Branch staff work their own warehouse and the rest of the network stays out of view.',
      },
      {
        q: 'Can I create a new godown without going to the desktop?',
        a: 'Yes. Godowns can be created and managed from the app and are written back into your Tally, so a new location opening does not have to wait for someone to be at the office machine. The masters stay in Tally, which remains the system of record for all of it.',
      },
    ],
    relatedPosts: [
      {
        slug: 'godown-wise-stock-report-tally-mobile',
        title: 'Godown-Wise Stock Report from Tally on Your Phone',
      },
      {
        slug: 'stock-transfer-between-godowns-tally-mobile',
        title: 'Stock Transfer Between Godowns from Mobile',
      },
      {
        slug: 'create-godown-in-tally-from-mobile',
        title: 'Create and Manage Godowns in Tally from Your Phone',
      },
      {
        slug: 'restrict-staff-warehouse-access-tally',
        title: 'Restrict Staff to Their Own Warehouse in Tally',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'multi-company-tally-reports',
    searchPhrase: 'Multi-company Tally reports',
    overline: 'MULTI-COMPANY',
    headline: 'Multi-company Tally reports, every business on one phone.',
    subheadline:
      'Two firms, sometimes three. Checking where each one stands means opening each one in turn, and most owners only ever get round to the biggest.',
    answer:
      'Multi-company Tally reports let you hold every business you run in one app and switch between them without logging out. Each company keeps its own books, its own parties and its own reports, read from your Tally. You see sales, receipts, purchase and outstanding for whichever one you are standing in.',
    waContext: 'feature-multi-company-tally-reports',
    waMessage:
      'Hi, I run more than one company in Tally and want to see all of them from one app on my phone. Can you show me how Takkada handles that?',
    seo: {
      title: 'Multi-Company Tally Reports on Mobile | Takkada',
      description:
        'Run every business you own from one app. Switch companies without logging out and read sales, receipts and outstanding for each, straight from your Tally.',
    },
    llms: {
      section: 'Features',
      title: 'Multi-company Tally reports',
      summary:
        'Several Tally companies held in one mobile app: switch between businesses without logging out, each keeping its own books, parties, reports and user permissions, with sales, receipts, purchase and outstanding read live for whichever is open.',
    },
    footerLabel: 'Multi-company',
    hero: {
      image: '/assets/screenshots/reports-screen.webp',
      alt: 'Financial year summary of sales, receipts, purchase and payments for a company',
      width: 820,
      height: 1698,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Every firm you own, in one place',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Switch business without switching app',
        body:
          'Your companies sit behind one login. Checking the second firm stops being a job you postpone until the accountant sends something.',
        image: '/assets/screenshots/home-screen-framed.webp',
        alt: 'Takkada home screen with the business registers listed',
        width: 800,
        height: 1624,
      },
      {
        icon: 'BarChart3',
        title: 'The same reports for each of them',
        body:
          'Sales, receipts, purchase and payments for the financial year, read from that company’s own Tally rather than from a summary someone prepared.',
        image: '/assets/screenshots/reports-screen.webp',
        alt: 'Financial year summary of sales, receipts, purchase and payments in the app',
        width: 820,
        height: 1698,
      },
      {
        icon: 'Wallet',
        title: 'Outstanding kept where it belongs',
        body:
          'Each company carries its own parties and its own receivables. A retailer who buys from two of your firms shows the right balance under each, instead of one merged figure that is true for neither.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Activity',
        title: 'Compare the month across firms',
        body:
          'The sales register by month for each business, so a quiet quarter in the smaller firm is visible while there is still time to do something about it.',
        image: '/assets/screenshots/monthly-sales.webp',
        alt: 'Sale invoices register grouped by month with totals and invoice counts',
        width: 904,
        height: 1874,
      },
      {
        icon: 'Lock',
        title: 'Access set per company',
        body:
          'A person who works in one firm sees only that firm. Your accountant can hold several while a branch manager holds one, without anybody sharing a login.',
        image: '/assets/screenshots/rbac.webp',
        alt: 'Role-based access settings controlling what each user can see and do',
        width: 904,
        height: 1874,
      },
    ],
    comparison: {
      heading: 'What running several firms from a phone demands',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'How many companies you can hold',
          takkada: 'Unlimited companies, from the entry plan up',
          others: 'Often limited, or charged per company',
        },
        {
          feature: 'Switching between them',
          takkada: 'Without logging out',
          others: 'Sometimes a separate login each',
        },
        {
          feature: 'Party balances across firms',
          takkada: 'Kept separate under each company',
          others: 'Occasionally merged, which suits neither',
        },
        {
          feature: 'Who can see which business',
          takkada: 'Access set per company, per person',
          others: 'Usually all or nothing',
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
      plan: 'Clarity',
      note: 'Unlimited companies are included from the entry plan. Extra users are priced separately.',
    },
    faqs: [
      {
        q: 'Can I run more than one Tally company in the same app?',
        a: 'Yes, and there is no cap on how many. Each company you connect keeps its own books, parties, stock and reports, and you switch between them without logging out. For an owner running two or three firms this is usually the difference between checking all of them weekly and checking only the largest.',
      },
      {
        q: 'Do the companies share party balances or stock?',
        a: 'No. Each stays its own set of books, the way it is in Tally. A retailer who buys from two of your firms carries a separate balance under each, because merging them would produce a number that is not true in either company and could not be reconciled against either ledger.',
      },
      {
        q: 'Can I give my accountant access to all firms but staff to one?',
        a: 'Yes. Access is granted per company and per person, so an accountant can hold several businesses while a branch manager holds only the one he works in. Nobody needs to share a login to make that work, which is what usually happens when access is all or nothing.',
      },
      {
        q: 'Is there a consolidated view across all my companies?',
        a: 'Reports run per company, matching how the books are kept in Tally. You move between firms to read each one rather than seeing a single merged total. This is deliberate, because a consolidated figure across separate legal entities is not a number you could take to your CA or defend in an assessment.',
      },
      {
        q: 'Does each company need its own connector?',
        a: 'The connector runs on the machine where Tally is installed and syncs the companies you point it at. If all your firms are kept in one Tally installation, one setup covers them. If they sit on different machines, each machine runs its own, and both appear together in the app.',
      },
    ],
    relatedPosts: [
      {
        slug: 'multi-business-tally-mobile-app',
        title: 'Multi-Business Tally Mobile App: One Phone, Multiple Companies, One Dashboard',
      },
      {
        slug: 'manage-multiple-branches-tally-godowns',
        title: 'How to Manage Multiple Branches in Tally with Godowns',
      },
      {
        slug: 'branch-stock-visibility-for-distributors',
        title: 'Branch Stock Visibility for Distributors',
      },
      {
        slug: 'view-tally-reports-on-mobile',
        title: 'The Five Reports an Owner Actually Opens on a Phone',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'sales-order-on-mobile',
    searchPhrase: 'Sales order on mobile',
    overline: 'ORDERS',
    headline: 'Sales order on mobile, booked against live stock.',
    subheadline:
      'He promised the retailer forty cases. The godown had eleven. That conversation happens after the order is already written in the book.',
    answer:
      'A sales order on mobile is booked at the shop against live stock and lands in your Tally as a voucher. Your salesman sees what the godown actually has before he promises it, the pending quantity stays tracked until it ships, and nobody types the order a second time in the evening.',
    waContext: 'feature-sales-order-on-mobile',
    waMessage:
      'Hi, I want my team booking sales orders on the phone against live stock, going straight into Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Sales Order on Mobile, Into Tally | Takkada',
      description:
        'Book a sales order on the phone against live stock and track the pending quantity until it ships. The order becomes a Tally voucher with no re-entry.',
    },
    llms: {
      section: 'Features',
      title: 'Sales order on mobile',
      summary:
        'Sales orders booked from a phone against live stock and written into Tally as vouchers, with the pending quantity tracked against each line until it is dispatched and converted into an invoice.',
    },
    footerLabel: 'Sales orders',
    hero: {
      image: '/assets/screenshots/pending-orders-mockup.webp',
      alt: 'Sales order screen showing pending quantities against each item',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From the counter to the dispatch',
    walkthrough: [
      {
        icon: 'PackageCheck',
        title: 'Live stock sits next to every item',
        body:
          'What the godown holds is on screen while the order is being written, so nobody commits to quantities that were sold last week.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Voucher item lines with live stock, quantity and rate on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'ListChecks',
        title: 'The order becomes a Tally voucher',
        body:
          'It lands against the right party and the right items without anyone re-entering it. The evening spent typing up the day is what this removes.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Sales order screen showing pending quantities against each item',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Clock',
        title: 'Pending quantity is tracked until it ships',
        body:
          'Part-dispatched lines keep showing what is still owed to the retailer, so an order half-served does not quietly become an order forgotten.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Pending quantities remaining against an order after part dispatch',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Truck',
        title: 'Convert it when the goods move',
        body:
          'The order becomes a delivery challan or an invoice without being rewritten, carrying the same items, rates and party across.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Delivery challans listed in the app with their dispatch details',
        width: 600,
        height: 1218,
      },
      {
        icon: 'Send',
        title: 'The invoice reaches him with a way to pay',
        body:
          'PDF and payment link on WhatsApp when it is billed, so the order that started at the counter finishes as money in the bank rather than another line in the receivables.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Invoice PDF and payment link delivered to a retailer on WhatsApp',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What an order needs to survive the trip to the godown',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Stock visible while the order is written',
          takkada: 'Live balance beside every item',
          others: 'Often a stock list refreshed on a schedule',
        },
        {
          feature: 'Where the order lands',
          takkada: 'A sales order voucher in your Tally',
          others: 'Sometimes only inside the app, exported later',
        },
        {
          feature: 'Part-dispatched lines',
          takkada: 'Pending quantity tracked against each line',
          others: 'Frequently closed on first dispatch',
        },
        {
          feature: 'Turning it into a challan or invoice',
          takkada: 'Converted without re-entry',
          others: 'Usually re-keyed at the desktop',
        },
        {
          feature: 'Who is allowed to book one',
          takkada: 'Create rights set per register, per person',
          others: 'Usually all or nothing',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Sales orders and delivery challans start at this plan, alongside voucher creation from mobile and web.',
    },
    faqs: [
      {
        q: 'How does a sales order booked on a phone reach Tally?',
        a: 'It is written into your Tally as a sales order voucher against the same party and items your salesman selected, through the connector on the machine running Tally. Nobody retypes it at the desktop, which removes both the evening data-entry session and the transcription mistakes that come with it.',
      },
      {
        q: 'Can the salesman see stock while he is taking the order?',
        a: 'Yes. The live balance sits next to each item as the order is being written, so he knows what the godown can actually serve before he commits to a quantity. The conversation where a retailer is told days later that half his order is unavailable is the one this is meant to prevent.',
      },
      {
        q: 'What happens when only part of an order is dispatched?',
        a: 'The pending quantity stays tracked against the line rather than the order being closed on first dispatch. You can see what is still owed to each retailer across all open orders, which is what stops a part-served order from being quietly forgotten until the customer rings to ask about it.',
      },
      {
        q: 'Does the order have to be retyped to become an invoice?',
        a: 'No. It converts into a delivery challan or a sales invoice carrying the same party, items and rates across. The invoice then goes out on WhatsApp with a payment link if collection is switched on, so the order that began at the shop counter can finish as a settled receipt.',
      },
      {
        q: 'Can I control who is allowed to book orders?',
        a: 'Yes. Create rights are set per register and per person, so a salesman can be allowed to raise orders without being able to raise invoices or credit notes. You can also restrict which parties and stock groups he sees at all, which keeps the field team working inside their own patch.',
      },
    ],
    relatedPosts: [
      {
        slug: 'field-order-collection-app-tally',
        title: 'Field Order Collection App for Tally: What Salesmen Need on the Phone',
      },
      {
        slug: 'salesman-order-to-tally-without-reentry',
        title: 'Salesman Order Taking Without Re-Entry: Punch It Once, Into Tally',
      },
      {
        slug: 'stock-summary-report-tally-mobile',
        title: 'Stock Summary Report from Tally on Mobile',
      },
      {
        slug: 'multi-location-inventory-app-tally-distributors',
        title: 'Multi-Location Inventory App for Tally Distributors: What to Look For',
      },
    ],
    priority: 0.9,
  },

  // The four pages below carry a capability claim and no adoption claim. Bulk
  // delivery challan runs on 4 prod companies and the custom invoice template
  // on 6, which is enough to say the feature exists and works and nowhere near
  // enough to say distributors have adopted it.
  {
    slug: 'delivery-challan-from-mobile',
    searchPhrase: 'Delivery challan from mobile',
    overline: 'DISPATCH',
    headline: 'Delivery challan from mobile, before the truck leaves.',
    subheadline:
      'The goods are loaded and the driver is waiting. The paperwork is on a desktop three kilometres away, and so is the person who can raise it.',
    answer:
      'A delivery challan from mobile is raised at the loading point and written into your Tally as a voucher. The godown the goods left from is recorded on it, and a full dispatch round can be raised in bulk rather than one at a time. It converts to an invoice without being rewritten.',
    waContext: 'feature-delivery-challan-from-mobile',
    waMessage:
      'Hi, I want to raise delivery challans from the phone at the loading point, including in bulk, going into Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Delivery Challan From Mobile, Into Tally | Takkada',
      description:
        'Raise a delivery challan on the phone and have it written into Tally. Bulk challans for a full dispatch round, with the godown carried on each one.',
    },
    llms: {
      section: 'Features',
      title: 'Delivery challan from mobile',
      summary:
        'Delivery challans raised from a phone at the loading point and written into Tally as vouchers, carrying the godown the goods left from, raisable in bulk for a whole dispatch round, and convertible into an invoice without re-entry.',
    },
    footerLabel: 'Delivery challans',
    hero: {
      image: '/assets/screenshots/delivery-challans-mockup.webp',
      alt: 'Delivery challan screen in Takkada listing dispatches ready to move',
      width: 600,
      height: 1218,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Paperwork that keeps up with the loading',
    walkthrough: [
      {
        icon: 'Truck',
        title: 'Raise it where the goods are',
        body:
          'At the godown door, on the phone, while the vehicle is being loaded. The challan does not wait for someone to be free at the desktop.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Delivery challans listed in the app with their dispatch details',
        width: 600,
        height: 1218,
      },
      {
        icon: 'PackageCheck',
        title: 'The godown is recorded on it',
        body:
          'The location the stock actually left from travels with the document, which is what keeps each godown balance honest rather than only the company total.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Item lines with quantity and value on the dispatch document',
        width: 600,
        height: 1242,
      },
      {
        icon: 'ListChecks',
        title: 'A whole round in one go',
        body:
          'When twenty deliveries leave together, the challans can be raised as a batch instead of one at a time. Dispatch day stops being a queue at one screen.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Order lines listed with the quantities to be dispatched',
        width: 600,
        height: 1243,
      },
      {
        icon: 'FileCheck2',
        title: 'It becomes the invoice later',
        body:
          'The same items and rates carry into the sales invoice without anyone rewriting them, so what was delivered and what was billed cannot drift apart.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice detail in the app carrying the dispatch document actions',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'The retailer gets his copy',
        body:
          'The document goes out on WhatsApp, so the shop has it before the vehicle arrives and nobody is arguing at the gate about what was sent.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'Dispatch documents sent on WhatsApp from the app',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What dispatch paperwork has to keep up with',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Raising a challan away from the desktop',
          takkada: 'From the phone, written into Tally',
          others: 'Often desktop only',
        },
        {
          feature: 'A full round at once',
          takkada: 'Challans raised in bulk',
          others: 'One at a time',
        },
        {
          feature: 'Godown on the document',
          takkada: 'Carried through to Tally',
          others: 'Frequently dropped',
        },
        {
          feature: 'Turning it into an invoice',
          takkada: 'Converted without re-entry',
          others: 'Usually re-keyed',
        },
        {
          feature: 'Getting it to the retailer',
          takkada: 'Sent on WhatsApp from the app',
          others: 'Printed, or sent separately',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Delivery challans and sales orders start at this plan, alongside voucher creation from mobile and web.',
    },
    faqs: [
      {
        q: 'Can I raise a delivery challan from my phone?',
        a: 'Yes, and it is written into your Tally as a voucher rather than living only in the app. The point of raising it on the phone is that the person standing at the loading bay is usually not the person sitting at the desktop, so the paperwork can be created at the moment the goods actually move.',
      },
      {
        q: 'Can I raise several challans at once for a dispatch round?',
        a: 'Yes. When a batch of deliveries goes out together, the challans can be raised in bulk instead of one at a time. On a heavy dispatch day this is the difference between the paperwork keeping pace with the loading and a queue forming at whichever screen can produce the documents.',
      },
      {
        q: 'Does the challan record which godown the goods left from?',
        a: 'Yes. The location travels with the document into Tally. Without it the company-wide stock figure can look correct while both individual godowns are wrong, and that mismatch usually stays invisible until someone does a physical count and cannot explain the difference.',
      },
      {
        q: 'Does the challan become the invoice, or do I raise that separately?',
        a: 'It converts, carrying the same party, items and rates across without anyone retyping them. That matters beyond the time saved, because a re-keyed invoice is where quantities and rates quietly stop matching what was actually delivered, and the retailer is the one who spots it.',
      },
      {
        q: 'Can I control who is allowed to raise a challan?',
        a: 'Yes. Create rights are set per register and per person, so a godown supervisor can be allowed to raise challans without being able to raise invoices or credit notes. You can also restrict which stock groups and locations he sees at all, so his access matches the warehouse he works in.',
      },
    ],
    relatedPosts: [
      {
        slug: 'godown-on-sales-invoice-delivery-challan',
        title: 'Godown on Sales Invoices and Delivery Challans from Mobile',
      },
      {
        slug: 'stock-transfer-between-godowns-tally-mobile',
        title: 'Stock Transfer Between Godowns from Mobile',
      },
      {
        slug: 'branch-stock-visibility-for-distributors',
        title: 'Branch Stock Visibility for Distributors',
      },
      {
        slug: 'e-way-bill-on-phone',
        title: 'E-Way Bill on Phone: How Distributors Clear ₹50,000+ Shipments Without the Office',
      },
    ],
    priority: 0.8,
  },

  {
    slug: 'credit-note-from-phone',
    searchPhrase: 'Credit note from phone',
    overline: 'NOTES',
    headline: 'Credit note from phone, and debit notes too, into Tally.',
    subheadline:
      'The retailer hands back six damaged cases. Everyone agrees what is owed. The entry still sits in someone’s head until they next open Tally.',
    answer:
      'A credit note from phone is raised against the original invoice and written into your Tally as a voucher. Goods returned at the shop, a rate difference agreed on the road, or a scheme payout owed to a retailer stops waiting for someone to reach the desktop. Debit notes work the same way.',
    waContext: 'feature-credit-note-from-phone',
    waMessage:
      'Hi, I want my team raising credit and debit notes from the phone against the original invoice, going into Tally. Can you show me how Takkada does it?',
    seo: {
      title: 'Credit Note From Phone, Into Tally | Takkada',
      description:
        'Raise credit and debit notes on the phone against the original invoice. Returns, rate differences and scheme payouts recorded in Tally the day they happen.',
    },
    llms: {
      section: 'Features',
      title: 'Credit note from phone',
      summary:
        'Credit and debit notes raised on a phone against the original invoice and written into Tally as vouchers, covering goods returns, rate differences and scheme payouts, with the party ledger and receivables moving at the same time.',
    },
    footerLabel: 'Credit and debit notes',
    hero: {
      image: '/assets/screenshots/invoice-summary-mockup.webp',
      alt: 'Voucher summary on a phone showing the party, the items and the total',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Settling the adjustment where it was agreed',
    walkthrough: [
      {
        icon: 'BookOpen',
        title: 'Start from the invoice it adjusts',
        body:
          'The note is raised against the original bill rather than as a loose entry, so the party ledger shows what was reduced and which invoice it belonged to.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger showing the invoice entries recorded against a retailer',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'Item lines, with the tax worked out',
        body:
          'Quantities and rates are entered the way they were on the invoice and the GST follows them, so a return does not become a tax question at filing time.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Voucher item lines with quantity, rate and GST being entered on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'FileCheck2',
        title: 'It lands in Tally as a voucher',
        body:
          'The note is written into your books against the same party, so the receivable moves the day the adjustment was agreed rather than whenever someone gets to the desktop.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Draft voucher summary showing the party, the items and the total',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Wallet',
        title: 'The outstanding reflects it straight away',
        body:
          'What the retailer owes drops by what you have agreed to credit. Nobody chases him for an amount that both of you already know is not payable.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Party ledger with outstanding invoices and the amount due',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Lock',
        title: 'Not everyone should be able to raise one',
        body:
          'A credit note reduces what you are owed, so create rights for it are set per person like any other register. Your salesman can book orders without being able to write off a bill.',
        image: '/assets/screenshots/rbac.webp',
        alt: 'Role-based access settings controlling what each user can see and do',
        width: 904,
        height: 1874,
      },
    ],
    comparison: {
      heading: 'What an adjustment has to do to be worth raising on the spot',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Note types you can raise from the phone',
          takkada: 'Credit and debit notes, among 13 voucher types',
          others: 'A narrower set, usually built around sales',
        },
        {
          feature: 'Linking it to the original invoice',
          takkada: 'Raised against the bill it adjusts',
          others: 'Sometimes a standalone entry',
        },
        {
          feature: 'GST on the adjustment',
          takkada: 'Worked out on the item lines',
          others: 'Varies, and often entered by hand',
        },
        {
          feature: 'Effect on the receivable',
          takkada: 'Outstanding moves as soon as the note posts',
          others: 'Depends when the entry reaches Tally',
        },
        {
          feature: 'Who is allowed to raise one',
          takkada: 'Create rights set per register, per person',
          others: 'Usually all or nothing',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Creating and editing vouchers from mobile and web, including credit and debit notes, starts at this plan.',
    },
    faqs: [
      {
        q: 'Can I raise a credit note in Tally from my phone?',
        a: 'Yes. The note is raised against the original invoice and written into your Tally as a voucher, with the item lines and the GST on them. Sales returns, rate differences and scheme payouts get recorded the day they are agreed rather than accumulating as notes on paper for someone to enter later.',
      },
      {
        q: 'What is the difference between a credit note and a debit note here?',
        a: 'A credit note reduces what a customer owes you, typically for a return or an agreed rate difference. A debit note raises what you are owed, or records an amount you are charging back to a supplier. Both are raised the same way from the app and both are written into your Tally against the right party.',
      },
      {
        q: 'Does the credit note affect the outstanding straight away?',
        a: 'Yes. Once it posts, the party balance and the receivables reports move with it. This is what stops a retailer being chased for an amount you have already agreed to credit him, which is one of the fastest ways to lose the goodwill that makes the next collection easy.',
      },
      {
        q: 'Is the GST on a return handled correctly?',
        a: 'The tax follows the item lines you enter, the same way it does on the original invoice, so the note carries the right tax treatment into your books. Scheme payouts are worth taking advice on separately, because whether a payout reduces tax or only moves money depends on how the scheme is structured.',
      },
      {
        q: 'Can I stop my salesman from raising credit notes?',
        a: 'Yes, and most distributors do. Create rights are set per register and per person, so someone can be allowed to book orders and raise invoices without being able to issue a credit note. Since a credit note reduces what you are owed, it is usually kept with the people who own the collection decision.',
      },
    ],
    relatedPosts: [
      {
        slug: 'scheme-credit-note-gst-distributors',
        title:
          'Scheme Credit Note GST Treatment: When a Payout Reduces Tax and When It Only Moves Money',
      },
      {
        slug: 'quantity-discount-vs-cash-discount-gst',
        title:
          'Quantity Discount vs Cash Discount: What Changes in the Books and Under GST',
      },
      {
        slug: 'bad-debt-write-off-tally',
        title: 'Bad Debt Write Off in Tally: When and How Distributors Should Do It',
      },
      {
        slug: 'dealer-scheme-management-tally',
        title: 'Dealer Scheme Management in Tally: Why the Season Never Settles Cleanly',
      },
    ],
    priority: 0.8,
  },

  {
    slug: 'custom-invoice-template-tally',
    searchPhrase: 'Custom invoice template',
    overline: 'YOUR FORMAT',
    headline: 'Custom invoice template, your own format on every bill.',
    subheadline:
      'The bill that reaches your retailer is the one piece of your business he looks at every week. It should look like you sent it.',
    answer:
      'A custom invoice template puts your own format on every bill the app sends. Your logo, your terms, your bank and UPI details, laid out the way your business already prints them. The retailer gets that PDF on WhatsApp within seconds of the invoice being saved in your Tally.',
    waContext: 'feature-custom-invoice-template-tally',
    waMessage:
      'Hi, I want the invoice PDF going out to my customers to use my own format and logo. Can you show me how Takkada handles the invoice template?',
    seo: {
      title: 'Custom Invoice Template for Tally | Takkada',
      description:
        'Send invoices in your own format, with your logo, terms and bank details. The PDF the retailer opens on WhatsApp looks like your business, not a generic app.',
    },
    llms: {
      section: 'Features',
      title: 'Custom invoice template',
      summary:
        'Invoice PDFs sent in the distributor’s own format: logo, terms, bank and UPI details laid out to match what the business already prints, delivered on WhatsApp as soon as the invoice is saved in Tally.',
    },
    footerLabel: 'Invoice template',
    hero: {
      image: '/assets/screenshots/invoice-summary-mockup.webp',
      alt: 'Invoice summary in Takkada with the amount due and a payment link on the same screen',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'The bill that arrives looks like your business',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'Your format, not a default one',
        body:
          'Logo, business details, terms and the layout your customers already recognise from the bills you print in the office.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice summary showing the amount due against a bill',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'The lines as you enter them',
        body:
          'Items, quantities, rates and GST come from the voucher in your Tally, so the PDF and your books say the same thing.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Invoice item lines with quantity, rate and GST being entered on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'QrCode',
        title: 'Your bank and UPI details on the bill',
        body:
          'The retailer does not have to ask where to send money. Where payment collection is on, a pay-now link goes with the PDF as well.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Invoice detail screen showing the payment options against the bill',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'It reaches him on WhatsApp',
        body:
          'Within seconds of the invoice being saved, on the number he actually reads. Auto dispatch can send every invoice this way without anyone pressing send.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice PDF and a pay-now link delivered to a customer on WhatsApp',
        width: 600,
        height: 1243,
      },
      {
        icon: 'BarChart3',
        title: 'What went out, and when',
        body:
          'The sales register by month with totals and counts, so you can see the billing that actually left the building rather than what you assume did.',
        image: '/assets/screenshots/monthly-sales.webp',
        alt: 'Sale invoices register grouped by month, with the total and invoice count for each',
        width: 904,
        height: 1874,
      },
    ],
    comparison: {
      heading: 'What the customer copy has to carry',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'The format the customer receives',
          takkada: 'Your own template, with your logo and terms',
          others: 'Often a fixed app format',
        },
        {
          feature: 'Bank and UPI details on the bill',
          takkada: 'On the PDF, with a pay-now link where collection is on',
          others: 'Usually static text, if present',
        },
        {
          feature: 'How it reaches the retailer',
          takkada: 'WhatsApp, within seconds of the invoice being saved',
          others: 'Manual share, or email',
        },
        {
          feature: 'Sending every invoice without pressing send',
          takkada: 'Auto dispatch on save',
          others: 'Usually manual',
        },
        {
          feature: 'Where the numbers come from',
          takkada: 'The voucher in your Tally',
          others: 'Sometimes a copy held in the app',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'The custom invoice PDF template starts at this plan. Auto invoice dispatch sits in the top plan.',
    },
    faqs: [
      {
        q: 'Can the invoice PDF use my own format instead of a standard one?',
        a: 'Yes. The template carries your logo, business details, terms and the layout your customers already know from the bills you print. The bill that lands on a retailer phone is often the only thing he sees from you in a week, so it reading as your business rather than as a generic app matters more than it sounds.',
      },
      {
        q: 'Do my bank and UPI details appear on the invoice?',
        a: 'Yes, they sit on the template, so the retailer never has to ask where to send the money. If payment collection is switched on for your business, a pay-now link goes with the PDF as well, and the receipt then posts into your Tally against the invoices it settles.',
      },
      {
        q: 'Does the PDF match what is in my Tally?',
        a: 'The items, quantities, rates and tax come from the voucher in your Tally, so the customer copy and your books cannot drift apart. This is the failure worth avoiding, because a PDF built from a separate copy held inside an app is how a retailer ends up holding a bill your ledger does not recognise.',
      },
      {
        q: 'Can every invoice go out automatically in this format?',
        a: 'Yes, with auto invoice dispatch switched on. Each invoice is sent to the party on WhatsApp as it is saved, without anyone pressing send. Without it you still send from the app in a tap, which most distributors start with before turning the automatic dispatch on for the whole book.',
      },
      {
        q: 'How much can the template be changed?',
        a: 'The template is set up for your business rather than edited by you screen by screen, so tell us the format you print today and it gets matched. Distributors usually want their letterhead, their terms and their bank block in the places their customers are used to, and that is what the setup covers.',
      },
    ],
    relatedPosts: [
      {
        slug: 'whatsapp-invoice-format-tally',
        title:
          'WhatsApp Invoice Format for Tally: How Distributors Send Invoices That Actually Get Paid',
      },
      {
        slug: 'auto-invoice-dispatch-tally',
        title: 'Auto Invoice Dispatch: Every Tally Invoice on WhatsApp, Automatically',
      },
      {
        slug: 'is-takkada-customisable',
        title: 'Can Takkada Be Customised for My Business?',
      },
      {
        slug: 'tally-whatsapp-invoice-dispatch',
        title:
          'Auto-Dispatching Invoices on WhatsApp from Tally: What It Is and What It Changes',
      },
    ],
    priority: 0.8,
  },

  {
    slug: 'handwritten-order-to-tally',
    searchPhrase: 'Handwritten order to Tally',
    overline: 'FROM A PHOTO',
    headline: 'Handwritten order to Tally, from a photo of the order book.',
    subheadline:
      'The order book comes back at seven in the evening with thirty pages in it. Somebody types every line, and the mistakes only surface when the goods reach the wrong shop.',
    answer:
      'A handwritten order to Tally starts with a photograph of the page. The items, quantities and rates are read off it and laid out as voucher lines for you to check, and only what you approve is written into your books. The order book in the salesman’s bag stops needing a typing session.',
    waContext: 'feature-handwritten-order-to-tally',
    waMessage:
      'Hi, my team writes orders on paper and someone types them into Tally every night. Can you show me how Takkada turns a photo of the order into an entry?',
    seo: {
      title: 'Handwritten Order to Tally From a Photo | Takkada',
      description:
        'Photograph a handwritten order and check the lines before they post. Items, quantities and rates read off the page and turned into a Tally voucher.',
    },
    llms: {
      section: 'Features',
      title: 'Handwritten order to Tally',
      summary:
        'A photograph of a handwritten order book page turned into draft voucher lines: items, quantities and rates read off the page, matched against the item masters, checked by a person, and only then written into Tally.',
    },
    footerLabel: 'Order from a photo',
    hero: {
      image: '/assets/screenshots/add-items-mockup.webp',
      alt: 'Item lines with quantity, rate and GST shown for checking before the entry is saved',
      width: 600,
      height: 1242,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From the page to the voucher',
    walkthrough: [
      {
        icon: 'Camera',
        title: 'Photograph the page',
        body:
          'The order book as it is, written in the market. No format to follow and nothing for the salesman to fill in twice.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Item lines with quantity, rate and GST filled in on a phone',
        width: 600,
        height: 1242,
      },
      {
        icon: 'ListChecks',
        title: 'The lines come back as a draft',
        body:
          'Items, quantities and rates are read off the page and matched against your item masters, so what you are checking is a voucher rather than a picture.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Voucher item lines with quantity, rate and GST shown for checking before the entry is saved',
        width: 600,
        height: 1242,
      },
      {
        icon: 'ShieldCheck',
        title: 'A person checks it before it posts',
        body:
          'You correct anything that came back wrong and approve the rest. Nothing reaches your books that somebody has not looked at.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'Draft voucher summary showing the party, the items and the total',
        width: 600,
        height: 1243,
      },
      {
        icon: 'PackageCheck',
        title: 'It becomes an order in Tally',
        body:
          'The approved draft is written in as a sales order against the right party, with the pending quantity tracked until it ships.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Sales order screen showing pending quantities against each item',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Truck',
        title: 'Then it moves like any other order',
        body:
          'Converted to a challan or an invoice without being rewritten, and sent to the retailer with a payment link where collection is on.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Delivery challans listed in the app with their dispatch details',
        width: 600,
        height: 1218,
      },
    ],
    comparison: {
      heading: 'What turning paper into an entry has to get right',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Entering an order written on paper',
          takkada: 'Photograph it and check the lines before it posts',
          others: 'Not offered',
        },
        {
          feature: 'Matching what is written to your item masters',
          takkada: 'Lines matched against your own items',
          others: 'Typed by hand at the desktop',
        },
        {
          feature: 'Before it reaches your books',
          takkada: 'A person approves the draft',
          others: 'Manual entry throughout',
        },
        {
          feature: 'Where the approved order lands',
          takkada: 'A sales order voucher in your Tally',
          others: 'Wherever it was typed',
        },
        {
          feature: 'What happens next',
          takkada: 'Converts to a challan or invoice without re-entry',
          others: 'Re-keyed again at each step',
        },
      ],
      disclaimer:
        'Checked on 8 August 2026 against the two Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Copilot',
      note: 'Reading an order or a supplier bill from a photo or PDF is part of the Copilot plan.',
    },
    faqs: [
      {
        q: 'Can a handwritten order be turned into a Tally entry from a photo?',
        a: 'Yes. You photograph the order book page and the items, quantities and rates are read off it and matched against your item masters, coming back as draft voucher lines. You check and correct them, and the approved draft is written into your Tally as a sales order against the right party.',
      },
      {
        q: 'What happens if the handwriting is read wrongly?',
        a: 'You see the draft before anything posts, and you correct it there. This is why the review step exists rather than the entry going straight through. A wrong quantity that reaches your books unchecked costs far more to unpick than the few seconds it takes to look at the lines first.',
      },
      {
        q: 'Does anything post into my Tally without me approving it?',
        a: 'No. The draft waits for a person, and only what is approved is written in. Everything the app puts into your books is something someone deliberately confirmed, which is the same rule that governs the bank statement import and the supplier bill import.',
      },
      {
        q: 'Does this work for supplier bills as well as orders?',
        a: 'Yes. The same approach reads a purchase bill from a photo or a PDF and returns the line items for checking before the purchase voucher is created. Distributors usually start there, because supplier bills arrive in a format nobody controls and are the most tedious thing to key in.',
      },
      {
        q: 'Do my salesmen have to stop using their order books?',
        a: 'No, and that is the point. Booking the order in the app against live stock is better where the team will do it, but the ones who have written orders on paper for twenty years keep their book, and the page gets photographed instead of typed up at night.',
      },
    ],
    relatedPosts: [
      {
        slug: 'import-purchase-from-pdf-tally',
        title: 'Turn Supplier PDFs into Tally Purchase Entries Automatically',
      },
      {
        slug: 'salesman-order-to-tally-without-reentry',
        title: 'Salesman Order Taking Without Re-Entry: Punch It Once, Into Tally',
      },
      {
        slug: 'tally-autopilot-vs-manual-entry',
        title: 'Tally on Autopilot vs Typing Every Voucher: The Time Math',
      },
      {
        slug: 'field-order-collection-app-tally',
        title: 'Field Order Collection App for Tally: What Salesmen Need on the Phone',
      },
    ],
    priority: 0.8,
  },

  // ── Customer ordering link ────────────────────────────────────────────────
  // HELD. This page describes Order Link v2, which is live on stage and NOT on
  // prod: prod's customer_order_links still has the v1 shape (no pricing_mode,
  // no party_ledger_id, no price_level_name, no include_out_of_stock_items) and
  // carries zero rows, and the five 20260809-18xxxx customer_order_v2_*
  // migrations are absent from supabase-functions origin/main. Verified against
  // both live databases on 2026-08-11. The PR carrying this object stays a
  // draft until that is no longer true — see the checklist in its body.
  //
  // Every claim below was exercised on stage on 2026-08-11 against company 112
  // "Shreeji Distributors (Demo)", not read off a spec: a personal link was
  // created through customer_order_create_link, opened at
  // stage.takkada.com/order/, and an order was placed end to end. Two things
  // that run were deliberately left unclaimed because nobody has watched them
  // finish on prod: the approved order landing in Tally as a sales order, and
  // the GST lookup's live GSTN round trip.
  //
  // The screenshots come from that demo company. Its item and party names are
  // invented for the demo. Captures were NOT taken from company 418 Sri Balaji
  // Distributors, whose stage catalogue is a real customer's.
  {
    slug: 'order-booking-app-tally',
    searchPhrase: 'Order booking app for Tally',
    overline: 'CUSTOMER ORDERS',
    headline: 'Order booking app for Tally, and your retailer installs nothing.',
    // The distributor's evening, not the product (CLAUDE.md craft rule 11).
    // The answer block below is where the capability list belongs.
    subheadline:
      'The order reaches you at nine at night. A voice note, a photo of a diary page, and somebody types it into Tally in the morning and hopes the rates were right.',
    // Front-loaded answer, 50 words. Entity-first because this is the passage
    // an AI-search engine lifts, and it opens with the search phrase verbatim
    // because src/data/__tests__/feature-pages.test.js asserts exactly that.
    answer:
      'Takkada is an order booking app for Tally where your retailer needs nothing installed. You send him a link on WhatsApp. He opens your catalogue at your rates, puts in quantities, and sends the order. You approve it with one tap and it becomes a sales order in your Tally.',
    waContext: 'feature-order-booking-app-tally',
    waMessage:
      'Hi, I want my retailers ordering from a link instead of sending voice notes at night. Can you show me how the Takkada ordering link works?',
    seo: {
      title: 'Order Booking App for Tally | No App for Buyers | Takkada',
      description:
        'Order booking app for Tally: send retailers a link, they order from your catalogue at your rates, and you approve each order into Tally as a sales order.',
    },
    llms: {
      section: 'Features',
      title: 'Order booking app for Tally',
      summary:
        'Customer ordering link for distributors on Tally: the retailer opens a WhatsApp link, browses the priced catalogue and places an order without installing an app or logging in. Prices are resolved from the merchant’s own books, per-buyer links carry that party’s rates, and the merchant approves each order into Tally as a sales order.',
    },
    footerLabel: 'Customer order link',
    // The hero is this page's LCP element, so it is budgeted in
    // scripts/checkImageBudgets.mjs and rendered eagerly. Showing the buyer's
    // real screen with the running total does more than a diagram of the flow.
    hero: {
      image: '/assets/screenshots/order-link-buyer-mockup.webp',
      alt: 'A distributor’s ordering link open on a phone, showing priced items, quantity steppers and a running order total',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-11',
    updated: '2026-08-11',
    walkthroughHeading: 'One order, from his phone into your Tally',
    walkthrough: [
      {
        icon: 'Link2',
        title: 'You send him a link, once',
        body:
          'He opens it and your catalogue is already there, at the rates you decided. Nothing to download, no account to make, no password for him to forget and ring you about.',
        image: '/assets/screenshots/order-link-catalog-mockup.webp',
        alt: 'Ordering link showing a distributor’s item list with prices and a search box',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'He puts in quantities and watches the total',
        body:
          'Search by a few letters, set the quantity in the unit you actually sell in, and the running total sits at the bottom of the screen. Rates come from your books, so nothing is negotiated in his browser.',
        image: '/assets/screenshots/order-link-cart-mockup.webp',
        alt: 'Order review screen listing each item, its rate and the total before GST',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Send',
        title: 'He sends it with his mobile number and nothing else',
        body:
          'No login and no OTP. He types his mobile number, adds a line about delivery if he wants, and the order goes. He gets a reference number back, and on a personal link his shop name is already on the order.',
        image: '/assets/screenshots/order-link-sent-mockup.webp',
        alt: 'Order confirmation screen showing the order reference, the item lines and the total before GST',
        width: 600,
        height: 1243,
      },
      {
        // PLACEHOLDER ASSET. Listed in PENDING_OPERATOR_ASSETS in
        // src/data/__tests__/feature-pages.test.js, which fails while it is
        // still here. Operator is supplying the real mockup.
        icon: 'CheckCheck',
        title: 'It lands with you, and you decide',
        body:
          'The order arrives in your inbox with the party already matched against your books. Approve it and it becomes a sales order in your Tally. Nobody retypes the lines, and the rates were yours the whole way.',
        image: '/assets/screenshots/order-link-inbox-mockup.webp',
        alt: 'Merchant order inbox showing an incoming customer order ready to approve into Tally',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What your retailer has to do before he can order',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'What the retailer installs',
          takkada: 'Nothing. He opens a link in whatever browser his phone already has',
          others: 'A buyer app, or an account on a portal',
        },
        {
          feature: 'How he signs in',
          takkada: 'He does not. He confirms his mobile number when he sends the order',
          others: 'Registration, then a password or an OTP each time',
        },
        {
          feature: 'What price he sees',
          takkada:
            'Your Tally rates, a price level, rates you set on the link, or no prices at all',
          others: 'Usually one list, the same for every buyer',
        },
        {
          feature: 'Rates for a particular party',
          takkada: 'A personal link carries that party’s own rates and names him on arrival',
          others: 'Not offered on a public catalogue',
        },
        {
          feature: 'Where the price is decided',
          takkada: 'On the server, from your books, at browse and again at submit',
          others: 'Varies, and a browser-side price can be edited',
        },
        {
          feature: 'What the order becomes',
          takkada: 'A sales order in your Tally once you approve it',
          others: 'A record in the app, often re-entered by hand',
        },
      ],
      disclaimer:
        'Checked on 11 August 2026 against the Tally mobile apps distributors most often weigh against Takkada. We re-check this every fortnight, because their products move.',
    },
    planPointer: {
      plan: 'Momentum',
      // R7: the ordering link carries no rate-card row and no price of its own.
      // Naming the plan the resulting voucher needs is the honest pointer.
      note:
        'An approved order becomes a sales order in your Tally, and sales orders start at this plan. The ordering link itself is switched on per business rather than sold as a rate-card row, so ask for it when you set up.',
    },
    faqs: [
      {
        q: 'What is an order booking app for Tally?',
        a: 'It is a way for your customers to place orders that land in your Tally without anybody retyping them. With Takkada the customer does not get an app at all. You send a link on WhatsApp, he opens your catalogue at your rates, picks quantities and sends the order, and you approve it into your books as a sales order.',
      },
      {
        q: 'Does my retailer have to install anything or make an account?',
        a: 'No. The link opens in whatever browser is already on his phone, and there is no download, no registration and no password. When he sends the order he confirms his mobile number, which is the only thing he types about himself. That is deliberate, because a retailer who has to make an account will simply send a voice note instead.',
      },
      {
        q: 'Which prices does the customer see on the link?',
        a: 'You choose per link. It can show the rates sitting in your Tally, the rates from a price level you already maintain, rates you set on the link itself, or no prices at all if you would rather confirm them yourself. Whichever you pick, the price is worked out on the server from your books, both while he browses and again when he sends the order.',
      },
      {
        q: 'Can a particular retailer see his own rates?',
        a: 'Yes. A link can be tied to one party in your books, and that link carries that party’s rates and arrives already named as him, so he never fills in who he is. Your other customers get a different link, and neither one can see what the other pays.',
      },
      {
        q: 'What happens if somebody I do not know opens the link?',
        a: 'He can identify himself with his GSTIN and the registered name fills itself in, so you get a usable name rather than whatever he felt like typing. If that GSTIN already belongs to a party in your books, the order arrives flagged as a match to that party instead of creating a second version of the same customer.',
      },
      {
        q: 'Does the order go into Tally automatically?',
        a: 'Only after you approve it. Every order sits in your inbox first, with the items, the quantities and the party it matched to. Nothing reaches your books until you accept it, so a stray or duplicate order stays out of Tally rather than being something you have to go and delete.',
      },
      {
        q: 'Can I hide items that are out of stock?',
        a: 'Yes, that is a setting on the link. You can leave out-of-stock items off the catalogue entirely, or leave them showing so a retailer can still order against a shipment that is on its way. Either way the buyer never sees your stock counts, only whether an item is there to order.',
      },
    ],
    relatedPosts: [
      {
        slug: 'salesman-order-to-tally-without-reentry',
        title: 'Salesman Order Taking Without Re-Entry: Punch It Once, Into Tally',
      },
      {
        slug: 'field-order-collection-app-tally',
        title: 'Field Order Collection App for Tally: What Salesmen Need on the Phone',
      },
      {
        slug: 'credit-limit-for-retailers',
        title: 'Credit Limit for Retailers: How Distributors Set, Enforce and Adjust It',
      },
      {
        slug: 'tally-whatsapp-invoice-dispatch',
        title: 'Auto-Dispatching Invoices on WhatsApp from Tally: What It Is and What It Changes',
      },
    ],
    priority: 0.9,
  },
];
