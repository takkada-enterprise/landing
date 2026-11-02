// Alternative landing pages (plan Phase 5). Same engine and same contract as
// the feature batches; read the header of src/data/featurePages.js first.
//
// These two pages are the only ones on the site that name a competitor inside
// the page engine, and they opt into it explicitly through `namesCompetitor`.
// The deck guardrail keeps competitors unnamed in sales material, but the site
// already names them on /tally-mobile-app-comparison and across the vs-blog
// cluster, and a page that will not say the name of the product someone is
// searching for an alternative to cannot answer the query. The guard in
// src/data/__tests__/feature-pages.test.js allows exactly one name per page and
// fails on any second one, so an alternative page cannot drift into a roundup.
//
// Every ✔/✘ below traces to pitch-deck/competitor-analysis-2026-08.md,
// re-verified 2026-08-08 under the fortnightly rule before this file shipped:
//
//   Livekeeping. App Store version history read through the latest entry. The
//   release notes cover creating an e-way bill or e-invoice with an editable
//   shipping address, editing HSN on creation, editing and cancelling Tally
//   vouchers, stock journal and physical stock, and WhatsApp reminders on
//   outstanding bills. No IRN cancellation, no e-way bill cancellation, no
//   Part-B or validity extension, and no payment collection of any kind. Public
//   pricing is around ₹3,000 a year with e-invoice and e-way bill sold as a
//   paid add-on (IndiaMART lists the one-year plan with those add-ons at
//   ₹6,000).
//
//   Biz Analyst. Their own site confirms per-device, per-Tally-licence billing
//   and lists the voucher types the app creates, which do not include credit or
//   debit notes. Their site, help manual and store listings still do not show
//   e-invoice or e-way bill generation; the capability is founder-confirmed
//   2026-08-06 and both pages here credit them with it. Do not write a row
//   saying they cannot generate.
//
// What neither page says: that Takkada can close an e-way bill. GSTN Advisory
// No. 668 of 29 July 2026 put the closure facility in abeyance, so nobody has
// it. Cancellation is the true claim and the true differentiator.
//
// Tone rule that matters more here than anywhere else on the site: no cheap
// shots (CLAUDE.md §5). Both products are credited with everything they do,
// including the things they do better than us. A comparison a reader can catch
// exaggerating loses the sale it was written to win.

/** @type {import('./featurePages').FeaturePage[]} */
export const ALTERNATIVES = [
  {
    slug: 'biz-analyst-alternative',
    namesCompetitor: 'Biz Analyst',
    searchPhrase: 'Biz Analyst alternative',
    overline: 'COMPARISON',
    headline: 'Biz Analyst alternative for distributors who run the whole day from the phone.',
    subheadline:
      'Reading your Tally on a phone stopped being the hard part a while ago. The hard part is everything after it: the bill at the counter, the van load, the salesman\'s visit, the reminder and the receipt, all landing back in the same books.',
    // 56 words. Entity-first, answers in sentence one, and concedes the two
    // real Biz Analyst strengths inside the citation-eligible passage rather
    // than burying them further down.
    answer:
      'Takkada is the Biz Analyst alternative for distributors who want the whole working day on the phone, not only the reports. Both apps read your Tally on a phone, create vouchers and send reminders. Takkada adds a browser version, e-invoice cancellation, credit and debit notes, a dispatch loading sheet, and UPI collection matched back into Tally.',
    waContext: 'feature-biz-analyst-alternative',
    waMessage:
      'Hi, I am on Biz Analyst right now. Can you show me what Takkada adds, from billing and dispatch to UPI collection back into Tally?',
    seo: {
      title: 'Biz Analyst Alternative for Distributors | Takkada',
      description:
        'Biz Analyst alternative for Tally distributors: billing, e-invoice cancel, credit notes, dispatch loading, salesmen and UPI collection, on mobile and web.',
    },
    llms: {
      section: 'Key pages',
      title: 'Biz Analyst alternative',
      summary:
        'Takkada compared with Biz Analyst for Indian distributors on Tally. Both read Tally on mobile, create vouchers and send reminders. Takkada adds a browser version, credit and debit notes, cancellation of an e-invoice or e-way bill from the phone, dispatch loading, and UPI collection matched back into Tally. Biz Analyst bills per device and is offline-capable, which Takkada is not.',
    },
    footerLabel: 'Biz Analyst alternative',
    hero: { screen: 'customer-analytics' },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'Where the two apps stop being the same',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'The compliance panic is handled from the phone',
        body:
          'Raise the IRN and the e-way bill at the counter, and when the buyer changes his mind an hour later, cancel the e-invoice or the e-way bill from the same screen with the reason code the portal wants. Cancellation is the part nobody else in the category has.',
        screen: 'invoice-summary-send',
      },
      {
        icon: 'Lock',
        title: 'Your salesman sees his parties, not your books',
        body:
          'Access is set per person, down to the warehouse his stock movements may touch. He sees his own retailers, his own targets and his own collections. Your margins and your other territories stay out of his phone.',
        screen: 'member-permissions-scope',
      },
      {
        icon: 'Wallet',
        title: 'The retailer pays from the invoice itself',
        body:
          'Every invoice and every reminder carries a UPI link. He taps it, pays from any UPI app, and it costs you zero MDR. No gateway percentage, and no per-receipt fee taken out of a four-thousand-rupee payment.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice going out on WhatsApp with a UPI payment link attached to it',
        width: 600,
        height: 1243,
      },
      {
        icon: 'CheckCheck',
        title: 'The receipt posts itself against the right bill',
        body:
          'When the money lands, the receipt entry goes into Tally against that invoice on its own. Partial payments, one payment covering three bills, and payments with no reference all get matched. The nine o\'clock reconciliation stops being a job.',
        screen: 'party-detail',
      },
      {
        icon: 'Activity',
        title: 'Billing follows the business, not the handset',
        body:
          'Biz Analyst charges per mobile device per Tally licence, so a fourth salesman is a fourth subscription. Takkada prices by plan with extra users added on top, which is the cheaper shape once a field team exists and the more expensive one for a single owner.',
        screen: 'salesman-summary',
      },
    ],
    comparison: {
      heading: 'Takkada and Biz Analyst, side by side',
      othersLabel: 'Biz Analyst',
      rows: [
        {
          feature: 'Tally data on a phone',
          takkada: 'Yes',
          others: 'Yes, and the app works offline. Takkada needs a connection.',
        },
        {
          feature: 'Automated WhatsApp and SMS reminders',
          takkada: 'Yes, from Takkada\'s number or your own (paid add-on), with per-party caps and pre-due schedules',
          others: 'Yes',
        },
        {
          feature: 'Voucher creation from mobile into Tally',
          takkada: 'Yes, 13 voucher types including credit and debit notes',
          others: 'Yes, around 8 types. Credit and debit notes not among them.',
        },
        {
          feature: 'Generate e-invoice and e-way bill from the phone',
          takkada: 'Yes',
          others: 'Yes, added recently',
        },
        {
          feature: 'Cancel an e-invoice or e-way bill from the phone',
          takkada: 'Yes, with the portal reason codes and eligibility check',
          others: 'Not offered',
        },
        {
          feature: 'UPI payment link on every invoice',
          takkada: 'Yes, at zero MDR with no cap and no monthly fee',
          others: 'Not offered',
        },
        {
          feature: 'Receipt posted into Tally automatically',
          takkada: 'Yes, including partial and unreferenced payments',
          others: 'Not offered',
        },
        {
          feature: 'Purchase bill photo or PDF into a Tally voucher',
          takkada: 'Yes',
          others: 'Not offered',
        },
        {
          feature: 'How it is billed',
          takkada: 'Per plan, with extra users and devices priced separately',
          others: 'Per mobile device, per Tally licence',
        },
      ],
      disclaimer:
        'Biz Analyst details compiled on 8 August 2026 from their website, help manual, store listings and pricing FAQ. Their published material does not yet reflect e-invoice and e-way bill generation, which they do have, so check their current pages before you decide on this table alone.',
    },
    planPointer: {
      plan: 'Copilot',
      note:
        'Collection, compliance and the salesman module sit together on one plan. If you only need the receivables view, the entry plan covers that. Automatic reminders go out from Takkada\'s number, or from your own WhatsApp number with a paid add-on.',
    },
    faqs: [
      {
        q: 'Is Takkada actually better than Biz Analyst?',
        a: 'It depends on what you are buying. Biz Analyst has a far larger user base, a mature Tally partner network, and an offline-capable app that keeps working in a weak-signal market, which Takkada cannot claim. If your problem is seeing the books and reminding parties, they solve it. Takkada is the better fit when you want more of the day on the phone: billing with e-invoice cancellation, a browser version, dispatch, and collection that matches back into Tally.',
      },
      {
        q: 'Can I keep my Tally exactly as it is if I switch?',
        a: 'Yes. Takkada sits on top of your existing Tally installation the same way Biz Analyst does, through a connector on the machine Tally already runs on. Your company data, your voucher numbering, your ledger groups and your existing entries stay where they are. Nothing is migrated and nothing is rewritten, so switching is a matter of pointing a second app at the same books.',
      },
      {
        q: 'What does Biz Analyst do that Takkada does not?',
        a: 'Two things worth knowing before you switch. Their app works offline, so a salesman in a village with no signal can still open it and record work, while Takkada needs a connection. And their reseller network is much larger, which means local support in more towns. If either of those is decisive for your team, say so on the demo call and we will tell you straight whether Takkada fits.',
      },
      {
        q: 'How does the per-device pricing difference actually work out?',
        a: 'Biz Analyst bills per mobile device per Tally licence, so each additional salesman phone is another full subscription. Takkada bills per plan for the business, with extra users priced as add-ons on top. For a single owner checking his books, the per-device model is usually cheaper. Once you put four or five people in the field, the plan-based shape normally wins. Bring your headcount to the demo and we will work out both numbers.',
      },
      {
        q: 'Does the UPI collection really cost nothing?',
        a: 'Zero MDR on UPI collections, no transaction cap, no monthly fee. The payment collection capability is a paid add-on on the annual plan, so there is a yearly cost for the feature itself, but no percentage is taken out of any individual receipt. On a business collecting a few crore a year in small ticket sizes, that difference is the whole argument for moving the collection into the app.',
      },
    ],
    relatedPosts: [
      {
        slug: 'takkada-vs-biz-analyst',
        title: 'Takkada vs Biz Analyst: Tally Mobile App Feature Comparison (2026)',
      },
      {
        slug: 'best-tally-add-on-apps-for-distributors-2026',
        title: 'Best Tally Mobile Add-On Apps for Distributors (2026)',
      },
      {
        slug: 'zero-mdr-upi-collection-for-distributors-india',
        title: 'Zero MDR UPI Collection for Indian Distributors: What 0% Actually Means',
      },
      {
        slug: 'payment-collection-app-for-distributors-india',
        title: 'Payment Collection App for Distributors India: The 2026 Reality',
      },
      {
        slug: 'tally-remote-access-vs-mobile-app',
        title: 'Tally Remote Access vs a Mobile App for Distributors',
      },
    ],
    priority: 0.9,
  },

  {
    slug: 'livekeeping-alternative',
    namesCompetitor: 'Livekeeping',
    searchPhrase: 'Livekeeping alternative',
    overline: 'COMPARISON',
    headline: 'Livekeeping alternative for distributors who need more than mobile invoicing.',
    subheadline:
      'You can raise the invoice from your phone, put the IRN on it and get it to the retailer in a minute. The rest of the day still runs off paper and the office desktop: the van load, the supplier bills, the reminders and the bank statement somebody matches by hand.',
    // 55 words.
    answer:
      'Takkada is the Livekeeping alternative for distributors who want the whole day on the phone, not only the invoice. Both apps create Tally vouchers from mobile and generate e-invoices and e-way bills. Takkada adds e-invoice cancellation, delivery challans, dispatch loading, purchase bills from PDF, and UPI collection matched back into Tally.',
    waContext: 'feature-livekeeping-alternative',
    waMessage:
      'Hi, we use Livekeeping for mobile invoicing and e-invoice. Can you show me what Takkada adds, from dispatch and purchase bills to UPI collection back into Tally?',
    seo: {
      title: 'Livekeeping Alternative for Distributors | Takkada',
      description:
        'Livekeeping alternative for Tally distributors: e-invoice cancel, delivery challans, dispatch loading, purchase bill import and UPI collection.',
    },
    llms: {
      section: 'Key pages',
      title: 'Livekeeping alternative',
      summary:
        'Takkada compared with Livekeeping for Indian distributors on Tally. Both create vouchers from mobile and generate e-invoices and e-way bills. Livekeeping sells e-invoice and e-way bill as a paid add-on tier. Takkada adds cancellation of an e-invoice or e-way bill from the phone, credit and debit notes, delivery challans, dispatch loading, purchase bill import, and UPI collection matched back into Tally.',
    },
    footerLabel: 'Livekeeping alternative',
    hero: { screen: 'payment-behaviour' },
    author: 'founder',
    datePublished: '2026-08-08',
    updated: '2026-08-08',
    walkthroughHeading: 'What the rest of the day looks like',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'The cancel button exists on this side',
        body:
          'Both apps raise the IRN and the e-way bill from the phone. When the buyer cancels the order or the truck never leaves, Takkada cancels the e-invoice or the e-way bill from the same screen, with the portal reason code, and writes the status back against the voucher.',
        screen: 'invoice-summary-send',
      },
      {
        icon: 'BookOpen',
        title: 'The purchase side comes in from a photo',
        body:
          'Photograph the supplier bill or drop the PDF in, and the purchase voucher is built with its item lines ready to check. Bank statements import and match the same way. It is the data-entry hour nobody wants at the end of the day.',
        screen: 'import-detect',
      },
      {
        icon: 'Send',
        title: 'The invoice leaves with a way to pay it',
        body:
          'The PDF reaches the retailer on WhatsApp within seconds of you saving the voucher, and the UPI link is on it. Getting the bill to him and getting him a way to pay it stop being two separate jobs.',
        image: '/assets/screenshots/whatsapp-dispatch-mockup.webp',
        alt: 'An invoice PDF dispatched to a retailer on WhatsApp with a payment link',
        width: 600,
        height: 1243,
      },
      {
        icon: 'QrCode',
        title: 'He pays on UPI and it costs you zero MDR',
        body:
          'Any UPI app, any amount, no transaction cap and no monthly fee. On low-ticket distribution where a hundred retailers each pay a few thousand rupees, the percentage a gateway takes is the difference the collection has to earn back.',
        screen: 'settlements',
      },
      {
        icon: 'CheckCheck',
        title: 'Tally gets the receipt without you typing it',
        body:
          'The receipt entry posts against the correct invoice on its own, including when one payment covers three bills or arrives with no reference at all. That is the work Livekeeping leaves on the desk, because it has no collection rail to reconcile from.',
        screen: 'party-detail',
      },
    ],
    comparison: {
      heading: 'Takkada and Livekeeping, side by side',
      othersLabel: 'Livekeeping',
      rows: [
        {
          feature: 'Tally data on a phone',
          takkada: 'Yes',
          others: 'Yes',
        },
        {
          feature: 'Voucher creation from mobile into Tally',
          takkada: 'Yes, 13 voucher types including credit and debit notes',
          others: 'Yes. Credit and debit notes not found in the release notes.',
        },
        {
          feature: 'Generate e-invoice and e-way bill from the phone',
          takkada: 'Yes, included from the compliance plan up',
          others: 'Yes, sold as a paid add-on tier',
        },
        {
          feature: 'Cancel an e-invoice or e-way bill from the phone',
          takkada: 'Yes, with the portal reason codes and eligibility check',
          others: 'Not offered. Voucher cancellation in Tally is a different thing.',
        },
        {
          feature: 'UPI payment link on every invoice',
          takkada: 'Yes, at zero MDR with no cap and no monthly fee',
          others: 'Not offered',
        },
        {
          feature: 'Receipt posted into Tally automatically',
          takkada: 'Yes, including partial and unreferenced payments',
          others: 'Not offered',
        },
        {
          feature: 'Invoice dispatched to the retailer automatically',
          takkada: 'Yes, as the voucher is saved, from Takkada\'s number or your own (paid add-on)',
          others: 'Reminders on outstanding bills, not dispatch on save',
        },
        {
          feature: 'Purchase bill photo or PDF into a Tally voucher',
          takkada: 'Yes, with bank statement import alongside it',
          others: 'Not offered',
        },
        {
          feature: 'Warehouse-level access control per team member',
          takkada: 'Yes',
          others: 'Not offered',
        },
      ],
      disclaimer:
        'Livekeeping details compiled on 8 August 2026 from their App Store version history, their pricing sheet and their marketplace listings. Their release notes are published frequently, so check the current version before you decide on this table alone.',
    },
    planPointer: {
      plan: 'Assurance',
      note:
        'E-invoice and e-way bill from the phone are part of the plan here rather than a separate compliance tier. Payment collection is an add-on available on every plan.',
    },
    faqs: [
      {
        q: 'What does Livekeeping not do that Takkada does?',
        a: 'Three things a distributor notices. Takkada cancels an e-invoice or e-way bill from the phone, where Livekeeping stops at generating them. It builds the van load and brings supplier bills in from a PDF. And it carries UPI collection with each receipt matched back into Tally, which Livekeeping does not offer.',
      },
      {
        q: 'Livekeeping sells e-invoicing as a separate tier. How is it priced here?',
        a: 'Livekeeping puts e-invoice and e-way bill generation in an upper add-on tier on top of its base subscription. Takkada includes generation and cancellation from the compliance plan upwards, with no separate compliance charge. Payment collection is the piece sold as an add-on here, and it is available on every plan rather than reserved for the top one. Exact figures for both are on the pricing section.',
      },
      {
        q: 'Do I have to change anything in my Tally to switch?',
        a: 'No. Both products work the same way, through a connector running on the machine that already has Tally on it, reading and writing against your existing company. Your voucher numbering, ledger groups, stock items and history stay exactly as they are. You can run both for a period if you want to compare them on the same books before deciding, which is what we normally suggest.',
      },
      {
        q: 'Can Takkada close an e-way bill from the phone?',
        a: 'No, and neither can anyone else. GSTN announced a voluntary e-way bill closure facility for 1 August 2026, then Advisory No. 668 of 29 July 2026 placed the whole set in abeyance and withdrew the advisories from the portal, telling everyone to make no production changes. Until GSTN revives it, closure does not exist to be offered. Cancelling the e-way bill and cancelling the IRN are separate facilities and both work today.',
      },
      {
        q: 'Is Livekeeping better at anything?',
        a: 'They ship updates frequently and have been polishing the mobile GST creation flow for well over a year, so that path is well worn. They also sit inside a much larger distribution network, which usually means an easier local support conversation. Neither of those is a feature you can put in a table, and both are real. If mobile invoicing with GST documents is genuinely all you need, they cover it.',
      },
    ],
    relatedPosts: [
      {
        slug: 'takkada-vs-livekeeping',
        title: 'Takkada vs Livekeeping: Tally Mobile App Feature Comparison (2026)',
      },
      {
        slug: 'gst-compliance-on-mobile-for-distributors',
        title:
          "GST Compliance on Mobile for Distributors: What's Possible, What's Not, and Where Phones Beat Desktops",
      },
      {
        slug: 'zero-mdr-upi-collection-for-distributors-india',
        title: 'Zero MDR UPI Collection for Indian Distributors: What 0% Actually Means',
      },
      {
        slug: 'ledger-reconciliation-tally-distributor',
        title: "Ledger Reconciliation in Tally: Match Your Books to the Party's",
      },
      {
        slug: 'best-tally-add-on-apps-for-distributors-2026',
        title: 'Best Tally Mobile Add-On Apps for Distributors (2026)',
      },
    ],
    priority: 0.9,
  },
];
