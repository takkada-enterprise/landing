// Persona landing pages (plan Phase 5). Same engine and same contract as the
// feature batches; read the header of src/data/featurePages.js first.
//
// These three exist because a distributor searches his trade before he searches
// the category. "Tally app for pharma distributors" is a different query, and a
// different state of mind, from "payment reminder tally": the first wants proof
// you have seen his business, the second already knows what he wants to buy.
// The feature pages answer the second. These answer the first, and hand off.
//
// Two things they must not become.
//
// They are not the zero-MDR persona blog posts with a new coat of paint.
// content/blog/zero-mdr-upi-for-fmcg-distributors.md and its pharma sibling own
// the "what does 0% MDR mean for my trade" query and are already indexed. These
// pages take the broader "app for my trade" query, cover the whole workflow
// rather than the collection economics, and link down to those posts. If Search
// Console ever shows a page and its post trading places on the same query,
// merge them rather than letting both rank thinly. That watch item is the same
// one Phase 4 opened for /send-payment-reminders-automatically.
//
// They are not customer case studies. Real customers exist in all three trades
// and none of them has given permission to be named, so no company name, no
// town-plus-trade combination specific enough to identify one, and no adoption
// counts. What is allowed is the shape of the trade, which is what proves we
// have been in the room (CLAUDE.md craft rule 4).
//
// Every capability sentence traces to features live on prod for real customers
// as of 2026-08-08, the same entitlements read the Phase 4 batch used.

/** @type {import('./featurePages').FeaturePage[]} */
export const PERSONAS = [
  {
    slug: 'tally-app-for-fmcg-distributors',
    searchPhrase: 'Tally app for FMCG distributors',
    overline: 'FMCG DISTRIBUTION',
    headline: 'Tally app for FMCG distributors. Two hundred shops, one phone.',
    subheadline:
      'Your beat covers more kirana counters in a day than most businesses invoice in a month. Every one of them is a small bill, a small payment, and a line in a ledger somebody has to key in tonight.',
    // 55 words.
    answer:
      'A Tally app for FMCG distributors has to survive volume. Takkada books the order at the counter against live stock, raises the invoice, and takes payment on UPI at zero MDR, so a two-hundred-shop beat does not become a two-hundred-line data-entry job. Receipts post themselves into Tally against the right bill.',
    waContext: 'feature-tally-app-for-fmcg-distributors',
    waMessage:
      'Hi, we are an FMCG distributor and our beat covers a couple of hundred kirana shops. Can you show me how Takkada handles orders and collections at that volume?',
    seo: {
      title: 'Tally App for FMCG Distributors | Takkada',
      description:
        'Tally app for FMCG beat volume: orders on live stock at the counter, invoices from the phone, zero-MDR UPI collection, receipts posted into Tally on their own.',
    },
    llms: {
      section: 'Key pages',
      title: 'Tally app for FMCG distributors',
      summary:
        'Takkada for FMCG distributors running high-volume, low-ticket beats on Tally: salesman check-in with geo-tagged photo proof, orders booked against live stock, invoices raised at the counter, UPI collection at zero MDR with no per-receipt fee, and receipts reconciled into Tally automatically. Built for the case where a hundred small payments a day is normal.',
    },
    footerLabel: 'FMCG distributors',
    hero: {
      image: '/assets/screenshots/party-ledger-mockup.webp',
      alt: 'A retailer ledger on the phone showing the outstanding bills against one kirana counter',
      width: 600,
      height: 1243,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'A beat day, from the first shutter to the night close',
    walkthrough: [
      {
        icon: 'MapPin',
        title: 'He checks in at the shop, and you know he was there',
        body:
          'One tap marks the visit with the time and the place, and the photo carries the coordinates on it. On a beat of forty counters, the difference between a route plan and a route that happened stops being a matter of trust.',
        image: '/assets/screenshots/field-visit-photo-mockup.webp',
        alt: 'A geo-tagged, time-stamped photo of a retailer shopfront taken during a beat visit',
        width: 600,
        height: 1243,
      },
      {
        icon: 'PackageCheck',
        title: 'The order is booked against stock that actually exists',
        body:
          'He sees live quantities as he takes the order, so the case of biscuits he promises is a case you can send. Pending quantities carry forward on their own, which is where a fast-moving line usually goes wrong.',
        image: '/assets/screenshots/pending-orders-mockup.webp',
        alt: 'Sales orders with pending quantities tracked against each retailer',
        width: 600,
        height: 1243,
      },
      {
        icon: 'Wallet',
        title: 'Small payments stop costing you a percentage',
        body:
          'The invoice goes out on WhatsApp with a UPI link on it and the retailer pays from the counter. Zero MDR on UPI collections, no transaction cap, no monthly fee. On low-ticket, high-frequency trade that is the whole economics of the thing.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice sent to a retailer on WhatsApp carrying a UPI payment link',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'Nobody keys in a hundred receipts at night',
        body:
          'Each payment posts into Tally against the bill it belongs to, including the ones that cover three invoices at once and the ones that arrive with no reference. The evening spent matching a bank statement to a ledger goes away.',
        image: '/assets/screenshots/settlement.webp',
        alt: 'A collection matched against its outstanding invoice and posted into Tally as a receipt',
        width: 904,
        height: 1874,
      },
      {
        icon: 'Target',
        title: 'Targets and beat coverage read themselves',
        body:
          'Per-salesman targets, achievement and collections sit in one screen, so the Monday review is a scroll instead of four phone calls. Access is set per person, so each man sees his own outlets and nothing else.',
        image: '/assets/screenshots/sales-target-mockup.webp',
        alt: 'Per-salesman targets and achievement for a field team',
        width: 600,
        height: 1243,
      },
    ],
    comparison: {
      heading: 'What FMCG volume needs that a general Tally viewer misses',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Order booked against live stock at the counter',
          takkada: 'Yes, with pending quantities carried forward',
          others: 'Order entry is common. Live stock at the point of order is not.',
        },
        {
          feature: 'Cost of collecting a small-ticket payment',
          takkada: 'Zero MDR on UPI, no cap, no monthly fee',
          others: 'Usually a gateway percentage, or no collection at all',
        },
        {
          feature: 'Receipt reconciled into Tally without typing',
          takkada: 'Yes, including partial and unreferenced payments',
          others: 'Rarely offered',
        },
        {
          feature: 'Proof that a beat visit happened',
          takkada: 'Geo-tagged, time-stamped photo per visit',
          others: 'Check-in and check-out, without photo proof',
        },
        {
          feature: 'Access limited to a salesman’s own outlets',
          takkada: 'Yes, down to the warehouse his stock movements touch',
          others: 'Usually all-or-nothing per device',
        },
      ],
      disclaimer:
        'Compared against the general category of Tally mobile apps on 8 August 2026. Individual products differ, so check the one you are weighing us against.',
    },
    planPointer: {
      plan: 'Copilot',
      note:
        'The salesman module, order booking and collection sit together here. Payment collection is an add-on available on every plan if the field team comes later.',
    },
    faqs: [
      {
        q: 'We run a beat of two hundred outlets. Will this hold up?',
        a: 'Volume is the case this was built for. Orders, invoices and receipts are created on the phone and written into your Tally as vouchers, so the load sits on the sync rather than on a person typing at night. The part that usually breaks at that scale is collection, because a hundred small payments a day means a hundred manual receipt entries, and that is exactly the step the reconciliation removes.',
      },
      {
        q: 'Does the salesman need a signal in the market?',
        a: 'Yes. The app needs a connection to read live stock and to write the order back, so a genuinely dead zone is a real limitation and we would rather say so than find out on your beat. In normal 2G and 3G coverage it works, and the payment link the retailer taps opens on his own phone and his own network, which is usually the better of the two.',
      },
      {
        q: 'How does zero MDR work when the ticket sizes are small?',
        a: 'Zero MDR on UPI collections, no transaction cap, no monthly fee. On FMCG the percentage matters less than the per-receipt fee, because a flat few rupees taken from a three-thousand-rupee payment is a much bigger bite than the same fee on a large invoice. Nothing is taken from any individual receipt here. The payment collection capability is a paid add-on on the annual plan.',
      },
      {
        q: 'Can I stop a salesman from seeing my margins?',
        a: 'Yes. Access is set per person and can be limited to his own parties, his own targets and his own collections, and stock permissions can be scoped down to a specific warehouse. Purchase rates, other territories and the company-level reports stay out of his app. This is set from the admin side, so it does not depend on the salesman leaving anything alone.',
      },
    ],
    relatedPosts: [
      {
        slug: 'zero-mdr-upi-for-fmcg-distributors',
        title: 'Zero MDR UPI for FMCG Distributors in India',
      },
      {
        slug: 'how-indian-distributors-manage-collections',
        title: 'How Indian Distributors Manage Collections in 2026: The Market Reality',
      },
      {
        slug: 'multi-location-inventory-app-tally-distributors',
        title: 'Multi-Location Inventory App for Tally Distributors: What to Look For',
      },
      {
        slug: 'mis-reports-for-distributors-tally',
        title: 'MIS Reports for Distributors: The Numbers to Check Daily',
      },
    ],
    priority: 0.8,
  },

  {
    slug: 'tally-app-for-pharma-distributors',
    searchPhrase: 'Tally app for pharma distributors',
    overline: 'PHARMA DISTRIBUTION',
    headline: 'Tally app for pharma distributors. Thin margins, long credit.',
    subheadline:
      'You work on a few points of margin and wait two months for the chemist to pay. Anything that takes a percentage out of the payment, or an hour out of your evening, is coming straight off that margin.',
    // 54 words.
    answer:
      'A Tally app for pharma distributors has to protect the margin, not just show it. Takkada raises the GST invoice with its IRN from the phone, sends it to the chemist on WhatsApp with a zero-MDR UPI link, and posts the receipt into Tally itself. Reminders run on the credit terms you set.',
    waContext: 'feature-tally-app-for-pharma-distributors',
    waMessage:
      'Hi, we distribute pharma and our chemist receivables run 60 to 75 days. Can you show me how Takkada handles reminders, collection and the GST side from the phone?',
    seo: {
      title: 'Tally App for Pharma Distributors | Takkada',
      description:
        'Tally app for pharma distributors: e-invoice with IRN from the phone, reminders on chemist credit terms, zero-MDR UPI collection, receipts posted into Tally.',
    },
    llms: {
      section: 'Key pages',
      title: 'Tally app for pharma distributors',
      summary:
        'Takkada for pharma distributors on Tally, where margins are thin and chemist credit runs 60 to 90 days: e-invoice with IRN and e-way bill raised and cancelled from the phone, pre-due and post-due WhatsApp reminder schedules with per-party caps, ledger statements shared on demand, UPI collection at zero MDR, and receipts reconciled into Tally automatically.',
    },
    footerLabel: 'Pharma distributors',
    hero: {
      image: '/assets/screenshots/payment-reminders.webp',
      alt: 'Scheduled payment reminders queued against outstanding bills on a phone',
      width: 820,
      height: 1698,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'From the invoice to the money, on a sixty-day cycle',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'The GST document is done before the box leaves',
        body:
          'Raise the invoice with its IRN and QR from the phone, and the e-way bill against the same voucher. If the order is called off an hour later, cancel the e-invoice or the e-way bill from the same screen with the reason code the portal asks for.',
        image: '/assets/screenshots/invoice-summary-mockup.webp',
        alt: 'A GST invoice on the phone showing its IRN and e-way bill status against the voucher',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CalendarClock',
        title: 'The chasing runs on a schedule, not on your memory',
        body:
          'Reminders go out before the due date and after it, on the terms you set per party, with a cap so a good chemist is never pestered. The ledger goes with the message, so the reply is about paying rather than about which bill you mean.',
        image: '/assets/screenshots/payment-reminders.webp',
        alt: 'Reminder schedules set per party with pre-due and post-due steps',
        width: 820,
        height: 1698,
      },
      {
        icon: 'Wallet',
        title: 'The payment does not cost you a slice of the margin',
        body:
          'Zero MDR on UPI collections, no transaction cap, no monthly fee. On a business running at a few points of margin, a percentage taken from every receipt is a share of the profit rather than a cost of doing business.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'UPI collections arriving against outstanding bills through the day',
        width: 391,
        height: 790,
      },
      {
        icon: 'BarChart3',
        title: 'You can see the ageing before it becomes a problem',
        body:
          'Debtor ageing on your own slabs, party by party, on the phone. On a sixty to ninety day cycle the bill that quietly crossed a hundred days is the one that turns into a fight, and it is visible here long before that.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'A party ledger showing outstanding bills and how long each has been open',
        width: 600,
        height: 1243,
      },
      {
        icon: 'BookOpen',
        title: 'The purchase side comes in from the bill itself',
        body:
          'Photograph the supplier invoice or drop the PDF in and the purchase voucher is built with its item lines ready to check. Bank statements import and match the same way, which is the hour at the end of the day nobody wants.',
        image: '/assets/screenshots/add-items-mockup.webp',
        alt: 'Purchase item lines built from a supplier bill and ready to check before saving',
        width: 600,
        height: 1242,
      },
    ],
    comparison: {
      heading: 'What a long-credit, thin-margin trade needs',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Cost of receiving a payment',
          takkada: 'Zero MDR on UPI, no cap, no monthly fee',
          others: 'Usually a gateway percentage, or no collection at all',
        },
        {
          feature: 'Reminder control per party',
          takkada: 'Pre-due and post-due schedules with a per-party cap',
          others: 'Reminders exist. Schedules and caps usually do not.',
        },
        {
          feature: 'Cancel an e-invoice or e-way bill from the phone',
          takkada: 'Yes, with the portal reason codes',
          others: 'Generation is common. Cancellation is not offered.',
        },
        {
          feature: 'Debtor ageing on your own slabs',
          takkada: 'Yes, on the phone, party by party',
          others: 'Fixed slabs, or desktop only',
        },
        {
          feature: 'Receipt reconciled into Tally without typing',
          takkada: 'Yes, including partial and unreferenced payments',
          others: 'Rarely offered',
        },
      ],
      disclaimer:
        'Compared against the general category of Tally mobile apps on 8 August 2026. Individual products differ, so check the one you are weighing us against.',
    },
    planPointer: {
      plan: 'Assurance',
      note:
        'E-invoice and e-way bill from the phone come in at this plan. Payment collection is an add-on that works on any of them.',
    },
    faqs: [
      {
        q: 'Our chemists take 60 to 75 days. Does an app change that?',
        a: 'It changes the part you control. The reminder going out three days before the due date, every time, without anyone remembering to send it, is what moves a payment from the sixth week to the fourth. The ledger attached to the message removes the usual round of "which bill is this". None of that forces a slow payer to pay, and we would not claim otherwise, but the days lost to nobody having asked yet do come back.',
      },
      {
        q: 'Can I cancel an e-invoice from the phone if the order is called off?',
        a: 'Yes. Cancelling the IRN and cancelling the e-way bill both work from the invoice screen, with the reason codes the portal requires and a check that the document is still inside the window the portal allows. The cancelled status is written back against the same voucher in Tally, so your books and the portal do not drift apart. This is the piece the rest of the category does not currently offer.',
      },
      {
        q: 'How much does the zero-MDR collection actually save on our numbers?',
        a: 'It depends on how much of your turnover moves through the collection. A percentage-based charge on a business running at four or five points of margin takes a visible share of the profit rather than a rounding error off the top line. Bring your annual collected value to the demo and we will work the arithmetic on your own figures instead of quoting a saving we cannot verify.',
      },
      {
        q: 'Does this handle batch and expiry the way pharma needs?',
        a: 'Batch-wise entry works where your Tally already tracks it, because the vouchers written back are ordinary Tally vouchers against your existing stock items and batches. What the app does not do is manage expiry or near-expiry returns as a workflow of its own. If that is the deciding requirement, say so on the call and we will tell you plainly where the line is.',
      },
    ],
    relatedPosts: [
      {
        slug: 'zero-mdr-upi-for-pharma-distributors',
        title: 'Zero MDR UPI for Pharma Distributors in India',
      },
      {
        slug: 'dso-for-distributors',
        title: 'DSO for Distributors: How to Calculate and Reduce Days Sales Outstanding',
      },
      {
        slug: 'gst-compliance-on-mobile-for-distributors',
        title:
          "GST Compliance on Mobile for Distributors: What's Possible, What's Not, and Where Phones Beat Desktops",
      },
      {
        slug: 'ledger-reconciliation-tally-distributor',
        title: "Ledger Reconciliation in Tally: Match Your Books to the Party's",
      },
    ],
    priority: 0.8,
  },

  {
    slug: 'tally-app-for-agri-input-distributors',
    searchPhrase: 'Tally app for agri-input distributors',
    overline: 'AGRI INPUT DISTRIBUTION',
    headline: 'Tally app for agri-input distributors. Paid on the harvest, not the calendar.',
    subheadline:
      'You send the stock out before sowing and the money comes back after the crop is sold. A thirty-day ageing report tells you almost nothing about a receivable that was always going to take a season.',
    // 54 words.
    answer:
      'A Tally app for agri-input distributors has to follow the crop cycle. Takkada shows debtor ageing on slabs you set, so a season-long receivable reads correctly instead of looking overdue from week five. Orders, invoices and scheme credit notes go in from the phone, and UPI collection posts into Tally at zero MDR.',
    waContext: 'feature-tally-app-for-agri-input-distributors',
    waMessage:
      'Hi, we distribute seed and fertiliser and our krishi kendra receivables run across a crop cycle. Can you show me how Takkada handles ageing, schemes and collections?',
    seo: {
      title: 'Tally App for Agri-Input Distributors | Takkada',
      description:
        'Tally app for agri-input distributors: debtor ageing on crop-cycle slabs, scheme credit notes from the phone, zero-MDR UPI collection, receipts into Tally.',
    },
    llms: {
      section: 'Key pages',
      title: 'Tally app for agri-input distributors',
      summary:
        'Takkada for fertiliser, seed and crop-protection distributors on Tally, whose dealer receivables run across a sowing-to-harvest cycle rather than a 30 or 60 day calendar: debtor ageing on custom slabs, scheme and discount credit notes raised from the phone, godown-wise stock across branches, reminders timed to the season, and UPI collection at zero MDR reconciled into Tally.',
    },
    footerLabel: 'Agri-input distributors',
    hero: {
      image: '/assets/screenshots/monthly-sales.webp',
      alt: 'Sales and outstanding for a season read from the phone, month by month',
      width: 904,
      height: 1874,
    },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'One season, from the pre-sowing dispatch to the settlement',
    walkthrough: [
      {
        icon: 'Truck',
        title: 'The stock goes out before the season, from wherever it is lying',
        body:
          'Challans and invoices raised from the phone, against the godown the material is actually in. Branch and warehouse stock read separately, so the depot near the mandi is not confused with the main store when a dealer asks what you can send.',
        image: '/assets/screenshots/delivery-challans-mockup.webp',
        alt: 'Delivery challans raised against a specific godown for dispatch to a dealer',
        width: 600,
        height: 1218,
      },
      {
        icon: 'Clock',
        title: 'The ageing report speaks in seasons',
        body:
          'Set the slabs to the cycle you actually sell on instead of thirty, sixty and ninety days. A receivable that always had to wait for the harvest stops reading as overdue, and the one that has genuinely slipped past the crop stands out.',
        image: '/assets/screenshots/party-ledger-mockup.webp',
        alt: 'Outstanding bills against a dealer with how long each has been open',
        width: 600,
        height: 1243,
      },
      {
        icon: 'ListChecks',
        title: 'The season settlement is a credit note, not an argument',
        body:
          'Scheme and quantity discounts are worked out and raised as credit notes from the app, written back into Tally against the dealer. The conversation at the end of the season starts from the same number on both sides.',
        image: '/assets/screenshots/settlement.webp',
        alt: 'A settlement worked out against a dealer account and posted into Tally',
        width: 904,
        height: 1874,
      },
      {
        icon: 'MessageCircle',
        title: 'Reminders that arrive when the money exists',
        body:
          'Schedules are set per party, so a dealer waiting on the mandi is not chased every week from the day of dispatch. When the season turns, the reminder goes out with the ledger attached and the payment link on it.',
        image: '/assets/screenshots/smart-reminders-mockup.webp',
        alt: 'Reminder schedule set per party with the ledger attached to the message',
        width: 391,
        height: 790,
      },
      {
        icon: 'Wallet',
        title: 'The payment lands and books itself',
        body:
          'Zero MDR on UPI collections, no transaction cap, no monthly fee. The receipt posts into Tally against the right bills on its own, including a single large settlement clearing a season of invoices at once.',
        image: '/assets/screenshots/settlements-mockup.webp',
        alt: 'Collections arriving and settling against outstanding bills',
        width: 391,
        height: 790,
      },
    ],
    comparison: {
      heading: 'What a crop-cycle receivable needs that a calendar report misses',
      othersLabel: 'Other Tally mobile apps',
      rows: [
        {
          feature: 'Debtor ageing slabs',
          takkada: 'Set to your own cycle, carried into the exports',
          others: 'Usually fixed at 30, 60 and 90 days',
        },
        {
          feature: 'Scheme and discount credit notes from mobile',
          takkada: 'Yes, written back against the dealer in Tally',
          others: 'Credit notes are commonly missing from mobile entry',
        },
        {
          feature: 'Godown-wise stock and dispatch',
          takkada: 'Yes, per warehouse, with access scoped per person',
          others: 'Company-level stock, rarely per godown',
        },
        {
          feature: 'Reminder timing per party',
          takkada: 'Schedules and caps you set for each dealer',
          others: 'One schedule for everybody, or manual sends',
        },
        {
          feature: 'Cost of receiving a season settlement',
          takkada: 'Zero MDR on UPI, no cap, no monthly fee',
          others: 'Usually a gateway percentage, or no collection at all',
        },
      ],
      disclaimer:
        'Compared against the general category of Tally mobile apps on 8 August 2026. Individual products differ, so check the one you are weighing us against.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Voucher creation, challans and credit notes from mobile start here. Payment collection is an add-on available on every plan.',
    },
    faqs: [
      {
        q: 'Our dealers pay after the harvest. Can the ageing report reflect that?',
        a: 'Yes. The slabs are yours to set rather than fixed at thirty, sixty and ninety days, and the boundaries you choose carry through to the exported report as well as the screen. That matters because on a crop cycle a standard ageing report marks almost your entire book as overdue, which makes it useless for spotting the dealer who has actually slipped.',
      },
      {
        q: 'Can we raise the season scheme settlement from the app?',
        a: 'Scheme and quantity discount payouts can be calculated and raised as credit notes from the app, and they are written back into Tally against the dealer like any other voucher. The value of doing it there rather than on a spreadsheet is that both sides end the season looking at the same figure in the same ledger, which is where most of the argument usually comes from.',
      },
      {
        q: 'We stock at several depots. Does it handle godown-wise?',
        a: 'Yes. Stock reads per godown rather than only at company level, dispatch happens against the godown the material is really in, and a team member can be limited to the warehouses he is allowed to move stock from. Note that the warehouse restriction applies to stock movements such as journals and challans, and does not restrict which invoices he can see.',
      },
      {
        q: 'The season is three months of the year. Is the app worth it for the rest?',
        a: 'The collection and reminder side earns its keep in the settlement window, which is short and intense. The rest of the year the value is in the ordinary work: purchase bills coming in from a photo, bank statements matching themselves, stock across depots being visible without a call to the godown. Whether that adds up for your business is a fair question to put to us on the demo with your own numbers.',
      },
    ],
    relatedPosts: [
      {
        slug: 'receivables-app-for-agri-input-distributors',
        title: 'Receivables App for Agri-Input Distributors',
      },
      {
        slug: 'season-scheme-settlement-agri-input',
        title:
          'Season Scheme Calculation for Dealers: Settling Kharif and Rabi Without a Fight',
      },
      {
        slug: 'scheme-credit-note-gst-distributors',
        title:
          'Scheme Credit Note GST Treatment: When a Payout Reduces Tax and When It Only Moves Money',
      },
      {
        slug: 'branch-stock-visibility-for-distributors',
        title: 'Branch Stock Visibility for Distributors',
      },
    ],
    priority: 0.8,
  },
];
