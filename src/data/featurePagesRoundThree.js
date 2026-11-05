// Round three (2026-11-05): paid add-ons that are live on prod and had no page.
// Same engine and same contract as the other batches; read the header of
// src/data/featurePages.js first.
//
// Every capability sentence traces to a claims sheet under
// docs/seo/feature-pages-round-three/<slug>-claims.md, checked against takkada
// origin/main 7d9784c7f and prod (SELECT only) on 2026-11-05. Anything a sheet
// lists under "Cannot say" stays off these pages. Add-on prices never print, so
// each planPointer names a plan and the note sends the reader to a partner.
//
// Screens: none of these features has a published capture yet. The pages follow
// the precedent /import-purchase-from-pdf set: the hero is a real adjacent
// screen from the registry, whose alt text describes only what is in its frame.
// Walk-through steps carry no image until their capture lands; a step that is
// waiting names its capture in `pendingScreen`, and the page lists every
// capture it is owed in `pendingScreens`. feature-pages.test.js pins both, and
// goes red the day a pending slug is registered in screens.js, so the swap
// cannot be forgotten. Where each slug plugs in:
// docs/seo/feature-pages-round-three/SCREENS-TODO.md.

/** @type {import('./featurePages').FeaturePage[]} */
export const ROUND_THREE = [
  {
    slug: 'stock-control-tally',
    searchPhrase: 'Stock control for Tally',
    overline: 'STOCK CONTROL',
    headline: 'Know what to order, from whom, and by when.',
    subheadline:
      'A fast item runs out and the retailer buys elsewhere, while a slow one sits on the shelf because somebody ordered it to be safe. Stock Control reads your Tally sales, purchase orders and receipts and tells you each morning what to buy.',
    answerPoints: [
      'See which items run out before a fresh order can arrive',
      'Order quantities worked out from your own best month of sales',
      'Supplier delivery times measured from your own orders and receipts',
      'Turn the list into one purchase order per supplier',
    ],
    // 55 words.
    answer:
      "Stock control for Tally works through Takkada's Stock Control screen. It reads your synced Tally sales, purchase orders and receipts, lists the items that will run out before a fresh order lands, suggests a quantity from your best month, and turns the ticked items into one purchase order per supplier that goes back to Tally.",
    waContext: 'feature-stock-control-tally',
    waMessage:
      'Hi, we reorder from memory and still run out of the fast items. Can you show me what Takkada Stock Control says I should order this week?',
    seo: {
      title: 'Stock Control for Tally: Reorder, Lead Time, Season Plan',
      description:
        'Stock control for Tally: what to reorder today, real supplier lead times, a season plan with order-by dates, and one purchase order per supplier.',
    },
    llms: {
      section: 'Features',
      title: 'Stock control for Tally',
      summary:
        'Stock Control add-on for distributors on Tally: Reorder Now lists items that will run out before a fresh order arrives, with stock, quantity on order, supplier lead time and a suggested quantity (top-up to the best month of the last twelve, lifted by a company growth dial); a basket turns ticked items into one purchase order per supplier; Suppliers measures usual, 9-in-10 and worst delivery time and fill from the company\'s own purchase orders and receipts; Season Plan covers the items making up the top 80% of sales, baselined on the same window last year and corrected for stock-outs, with an order-by date; Lost Sales counts order lines lost to stock-outs. Any tab exports to Excel.',
    },
    footerLabel: 'Stock control',
    hero: { screen: 'godown-list' },
    pendingScreens: [
      'stock-control-reorder',
      'stock-control-basket',
      'stock-control-supplier-performance',
      'stock-control-season-plan',
    ],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: "From this morning's stock to the supplier's order",
    walkthrough: [
      {
        icon: 'Activity',
        title: 'Reorder Now, most overdue first',
        body:
          'The top band reads Order this week, Lead time, On order and Lost sales. Below it is every item that will run out before a fresh order can arrive, with its stock, what is already on the way, the supplier lead time and a suggested quantity.',
        pendingScreen: 'stock-control-reorder',
      },
      {
        icon: 'PackageCheck',
        title: 'Tick, check, create the order',
        body:
          'Tick items, or let one tap pick everything that is due. The basket groups them by supplier with the quantities open to change, and Create PO opens that supplier\'s purchase order filled in at the last purchase rate. Save it and it goes to Tally like any order.',
        pendingScreen: 'stock-control-basket',
      },
      {
        icon: 'Truck',
        title: 'Suppliers, judged on what they did',
        body:
          'For every supplier: the days an order usually takes, the days 9 in 10 orders arrive within, the worst case, how much of what you ordered actually came, and the orders past their promised date. Year by year it shows who is getting faster or slower.',
        pendingScreen: 'stock-control-supplier-performance',
      },
      {
        icon: 'CalendarClock',
        title: 'A season plan with an order-by date',
        body:
          'Pick a window, say November to February. The plan takes the items making up the top 80% of your sales, reads the same months last year, corrects for the days they were out of stock, and gives each one an order-by date. Dates already gone are flagged first.',
        pendingScreen: 'stock-control-season-plan',
      },
    ],
    comparison: {
      heading: 'Reordering from memory, against reordering from your own numbers',
      othersLabel: 'A reorder spreadsheet',
      rows: [
        {
          feature: 'How much to order',
          takkada:
            'Tops stock up to your best month of the last twelve, lifted by the growth dial, minus stock and what is on order.',
          others: 'Somebody counts the shelf and guesses.',
        },
        {
          feature: 'Supplier delivery time',
          takkada: 'Measured from your own purchase orders and receipts: usually, 9 in 10 within, worst.',
          others: 'The time the supplier promised.',
        },
        {
          feature: 'Stock already ordered',
          takkada: 'Counted in every suggestion, so the same item is not ordered twice.',
          others: 'Checked by calling the godown.',
        },
        {
          feature: 'Season stock',
          takkada: "Last year's same months, corrected for stock-outs, with an order-by date per item.",
          others: 'Bought once the rush has started.',
        },
        {
          feature: 'The purchase order',
          takkada: 'One per supplier, filled in from the basket and saved to Tally.',
          others: 'Typed into Tally line by line.',
        },
      ],
      disclaimer:
        'Tally Prime keeps a reorder level on a stock item if you type one in. It does not measure supplier lead time or plan a season, which is the part Stock Control adds.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Stock Control is an add-on, priced by your partner. Ask them for the add-on price.',
    },
    faqs: [
      {
        q: 'How does Stock Control decide how much to order?',
        a: "It finds each item's best month of sales in the last twelve full months and tops stock up to that level, lifted by the growth dial, after taking off what is in the godown and what is already on order. The quantity is rounded to a clean figure. An item with no such month falls back to its daily sales over the supplier's lead time.",
      },
      {
        q: 'Where does the supplier lead time come from?',
        a: 'From your own purchase orders and the goods receipts against them. For each supplier it shows the days an order usually takes, the days 9 in 10 orders arrive within, and the worst case. The more purchase orders you book, in Tally or in Takkada, the sharper those numbers get.',
      },
      {
        q: 'How is the reorder point worked out?',
        a: "From the item's average daily sales, adjusted for the season, carried over the supplier's usual delivery time plus a month for your order cycle and a buffer for the slow deliveries. An item whose stock and stock on the way fall below it shows up in Reorder Now.",
      },
      {
        q: 'What does the growth dial do?',
        a: 'It lifts every suggestion by the same percentage, in steps of five, from minus fifty to plus fifty. Expecting ten percent more business, set it to ten and every base level and order quantity moves with it. Only the company admin can turn it; everyone else sees the setting.',
      },
      {
        q: 'Can I see the sales I lost because stock ran out?',
        a: 'Yes, when orders are booked as sales orders. Lost Sales counts an order line as lost when the next consignment arrived, the customer was billed again, and the item still was not on that bill. Lines that can still be filled sit apart as awaiting stock, and the screen says what share of your sales goes through orders.',
      },
      {
        q: 'Does it work on the phone and on the web?',
        a: 'Yes. Stock Control is the same screen in the phone app and on the web. Any of its four tabs exports to Excel exactly as it is on screen, with a supplier summary sheet and the full list, and the purchase orders it creates reach Tally as ordinary purchase orders.',
      },
    ],
    relatedPosts: [
      {
        slug: 'stockout-control-for-distributors-india',
        title: 'Stockout Control for Distributors: A Method You Can Run From Tally Data',
      },
      {
        slug: 'reorder-point-formula-for-distributors',
        title: 'The Reorder Point Formula for Distributors (With a Worked Example)',
      },
      {
        slug: 'supplier-lead-time-tracking-for-distributors',
        title: 'Track Supplier Lead Time from Your Own Purchase Register',
      },
      {
        slug: 'seasonal-stock-planning-for-distributors',
        title: "Seasonal Stock Planning: Last Year's Sales Register Is Your Forecast",
      },
      {
        slug: 'lost-sales-due-to-stockout-how-to-measure',
        title: 'Lost Sales Due to Stockout: Why Your Invoices Cannot Show Them',
      },
      {
        slug: 'days-of-inventory-cover-distributor',
        title: 'Days of Cover: How Many Days Your Current Stock Lasts',
      },
    ],
    priority: 0.8,
  },
  {
    slug: 'proof-of-delivery-app-tally',
    searchPhrase: 'Proof of delivery app for Tally',
    overline: 'PROOF OF DELIVERY',
    headline: 'Know what reached each shop, and what came back on the van.',
    subheadline:
      'The van comes back at seven with cash in a bag, two cartons returned and a story about a closed shutter. Proof of Delivery gives your driver a login of his own, so every drop carries a photo, the returns and the money, and the office approves the cash into Tally.',
    answerPoints: [
      'A driver login that shows only his own trips',
      'A live camera photo with time and place at each drop',
      'Returns and missed drops recorded with a reason',
      'Cash, UPI and cheque approved by the office into Tally receipts',
    ],
    // 53 words.
    answer:
      "A proof of delivery app for Tally is what Takkada's Proof of Delivery add-on gives your driver: a login showing only his own trips. At each shop he marks the drop delivered with a camera photo carrying time and place, notes returns, and records cash, UPI or cheque. The office approves the money into Tally.",
    waContext: 'feature-proof-of-delivery-app-tally',
    waMessage:
      'Hi, my van comes back with cash and returns and nobody knows what reached which shop. Can you show me Takkada Proof of Delivery with a driver login?',
    seo: {
      title: 'Proof of Delivery App for Tally: Photo, Returns, Cash',
      description:
        'Proof of delivery app for Tally: a driver login, a live photo with time and place at each shop, returns with reasons, and van cash approved into Tally receipts.',
    },
    llms: {
      section: 'Features',
      title: 'Proof of delivery app for Tally',
      summary:
        'Proof of Delivery add-on on top of Dispatch Load: a Driver role that sees only its own delivery trips; shops in route order with call and navigate; Mark delivered needs a live camera photo that records time and location; returned quantities and missed drops carry a reason; cash, UPI and cheque recorded per drop, saved offline; the office approves driver cash into a Tally receipt against the chosen account. Returns are recorded but not posted to Tally.',
    },
    footerLabel: 'Proof of delivery',
    hero: { screen: 'van-loading' },
    pendingScreens: ['pod-driver-drops', 'pod-photo-proof', 'pod-office-approval'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'From the loaded van to the receipt in Tally',
    walkthrough: [
      {
        icon: 'Route',
        title: 'His trips, in driving order',
        body:
          'The driver logs in to My trips. A trip appears once the van is billed, with its shops in route order and Call and Navigate on each. Shops already pinned can be sorted nearest first from where he is standing.',
        pendingScreen: 'pod-driver-drops',
      },
      {
        icon: 'Camera',
        title: 'Delivered, with the photo to prove it',
        body:
          'Mark delivered needs a photo from the live camera, never the gallery, and it records the time and the place. Returned quantities take a reason such as damaged, wrong item or not ordered, and a shop he could not deliver to gets one too.',
        pendingScreen: 'pod-photo-proof',
      },
      {
        icon: 'Wallet',
        title: 'Cash, UPI or cheque on the van',
        body:
          'He records what the shop paid, against one bill or all of them oldest first. UPI and cheque need a photo of the screen or the cheque. The drop saves on the phone without signal and uploads when the van is back in range.',
      },
      {
        icon: 'CheckCheck',
        title: 'The office approves it into Tally',
        body:
          'Cash with drivers lists each collection by driver. Approve asks which account the money went into and makes a receipt in Tally; reject asks for a reason. The invoice carries a delivery proof card with the photo, the time and the map pin.',
        pendingScreen: 'pod-office-approval',
      },
    ],
    comparison: {
      heading: 'What the office knows when the van comes back',
      othersLabel: 'Paper delivery slips',
      rows: [
        {
          feature: 'Proof the goods reached the shop',
          takkada: 'A live camera photo with the time and the place on every drop.',
          others: 'A stamp or signature on a slip, if the slip comes back.',
        },
        {
          feature: 'Returns',
          takkada: 'Quantity and reason per item, recorded at the shop.',
          others: 'Told to the office in the evening.',
        },
        {
          feature: 'Cash collected on the van',
          takkada: 'Recorded per drop, then approved by the office into a Tally receipt.',
          others: 'Counted against a list, then typed into Tally.',
        },
        {
          feature: "The driver's access",
          takkada: 'His own trips only. No registers, party balances or reports.',
          others: "A printed copy of the day's bills.",
        },
      ],
      disclaimer:
        'Returns are recorded for the office and listed in a Returns report; they do not post a credit note or stock entry to Tally. Deliveries are recorded in the phone app.',
    },
    planPointer: {
      plan: 'Copilot',
      note:
        'Proof of Delivery is an add-on on top of Dispatch Load, which comes with Copilot. Ask your partner for the add-on price.',
    },
    faqs: [
      {
        q: 'Does the driver see my parties and reports?',
        a: 'No. The Driver role sees only his own delivery trips: the drops, the photos and the cash he collected. Registers, party balances and reports stay closed to him. A driver login uses a user seat like any other team member.',
      },
      {
        q: 'Can the driver use a photo from the gallery?',
        a: "No. Mark delivered opens the live camera, and the photo records the time and the location it was taken at. The first photo at a shop also pins that shop's location, so later trips can sort the drops nearest first.",
      },
      {
        q: 'How does the cash on the van reach Tally?',
        a: 'The office opens Cash with drivers, picks the account the money went into and approves. That makes a normal receipt in Tally, with a narration naming the driver and the trip. Until it is approved the cash is not in Tally, and a rejection has to carry a reason.',
      },
      {
        q: 'Do returns create a credit note in Tally?',
        a: 'No. Returned quantities and their reasons are recorded and listed in the Returns report, so the office knows what came back, but nothing is posted to Tally for them. The credit note or stock entry is made as its own step.',
      },
      {
        q: 'Does it work without network?',
        a: 'Yes. A drop, its photo and the payment are saved on the phone and uploaded when the signal returns. Recording deliveries is a phone-app job; the browser shows the delivery proof on the invoice but does not record drops.',
      },
      {
        q: 'Who can approve the driver cash?',
        a: 'Members with full access, or the approvers you have set when voucher approvals are on. Each approval names the account the money went into, and each rejection carries a reason, so the trail still reads cleanly at month end.',
      },
    ],
    relatedPosts: [
      {
        slug: 'mark-orders-delivered-without-touching-tally',
        title: 'Mark Orders Delivered Without Touching Tally',
      },
      {
        slug: 'dispatch-load-sheet-for-distributors',
        title: 'The Dispatch Load Sheet: What Goes Out Today, Beat by Beat',
      },
      {
        slug: 'paper-picking-list-vs-dispatch-load',
        title: 'Paper Picking List vs Dispatch Load: What Actually Left the Godown',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'manufacturing-in-tally-prime',
    searchPhrase: 'Manufacturing in Tally Prime',
    overline: 'MANUFACTURING',
    headline: 'Record production and job work where it happens, straight into Tally.',
    subheadline:
      'The supervisor knows what came off the line today, and Tally learns it days later when somebody keys a stock journal. Manufacturing keeps your bills of materials, production runs and job work in the app, and posts a Manufacturing Journal to Tally for each run.',
    answerPoints: [
      'Bills of materials with by-products, co-products and scrap',
      'Production runs that warn when a component is short',
      'A Manufacturing Journal in Tally for each in-house step',
      'Job work: material out to the worker and back again',
    ],
    // 52 words.
    answer:
      "Manufacturing in Tally Prime gets a phone and computer front end with Takkada's Manufacturing add-on. Keep bills of materials with by-products and scrap, record a production run and each in-house step posts a Manufacturing Journal to Tally. Send material to a job worker and record what came back, against a job-work order.",
    waContext: 'feature-manufacturing-in-tally-prime',
    waMessage:
      'Hi, our production is keyed into Tally days after it happens. Can you show me how Takkada records BOMs, production runs and job work into Tally?',
    seo: {
      title: 'Manufacturing in Tally Prime: BOM, Production, Job Work',
      description:
        'Manufacturing in Tally Prime from the phone: bills of materials with scrap, production runs posted as Manufacturing Journals, and job work out and back.',
    },
    llms: {
      section: 'Features',
      title: 'Manufacturing in Tally Prime',
      summary:
        'Manufacturing add-on for Tally Prime businesses: multi-level bills of materials per item with components, by-products, co-products, scrap percentage and godowns, written back to the item in Tally; an Explosion view of raw materials for any quantity; production runs that flag short components and post one Manufacturing Journal per in-house step; production orders with due dates and reported rejects; job work out with charges per unit, a Section 143 challan, Material Out and Material In. Needs a Manufacturing Journal voucher type in Tally. Job work for a principal is not sent to Tally.',
    },
    footerLabel: 'Manufacturing',
    hero: { screen: 'godown-items' },
    pendingScreens: ['manufacturing-bom', 'manufacturing-production-run', 'manufacturing-job-work'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'From the bill of materials to the journal in Tally',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'The bill of materials, set once',
        body:
          'An item can carry several BOMs, one of them the default, over as many levels as you make it in. A line is a component, a by-product or a co-product with its own godown, and a component can carry a scrap percentage. A BOM edited in the app is written back to the item in Tally.',
        pendingScreen: 'manufacturing-bom',
      },
      {
        icon: 'PackageCheck',
        title: 'A run that checks the godown first',
        body:
          'Pick what you are making and how many. Each component shows what is on hand and says Short when the godown cannot cover it. A step takes its output batch and godown, by-products, scrap, and labour or power as an amount or a percentage.',
        pendingScreen: 'manufacturing-production-run',
      },
      {
        icon: 'FileCheck2',
        title: 'Each step lands as a Manufacturing Journal',
        body:
          'Save the run and every in-house step posts one Manufacturing Journal to Tally: components out, the finished item, by-products and scrap in, costs added. The run shows each step as In Tally with its number, and Tally values the finished item itself.',
      },
      {
        icon: 'Truck',
        title: 'Job work, out and back',
        body:
          "Raise a job-work order with charges per unit, send material on a challan printed under Section 143 of the CGST Act, and record what came back: received, used, scrap and returned unused. The job worker's charges bill links to the order.",
        pendingScreen: 'manufacturing-job-work',
      },
    ],
    comparison: {
      heading: 'Production on the floor, against production keyed at the office',
      othersLabel: 'Tally Prime on its own',
      rows: [
        {
          feature: 'Where production is recorded',
          takkada: 'On the phone or computer, by whoever runs the line.',
          others: 'At the Tally machine, as a Manufacturing Journal.',
        },
        {
          feature: 'Short components',
          takkada: 'Flagged on the run before it is saved.',
          others: 'Found when the stock goes negative.',
        },
        {
          feature: 'Planning the work',
          takkada: 'Production orders with due dates, reported rejects and requests from the team.',
          others: 'Kept on paper or in a sheet.',
        },
        {
          feature: 'Job-work challan',
          takkada: 'Printed under Section 143, with an e-way bill offered on the consignment value.',
          others: 'A Material Out voucher keyed at the office.',
        },
      ],
      disclaimer:
        'Takkada posts into the Manufacturing Journal voucher type already in your Tally and does not create one. Job work you do for a principal is not sent to Tally.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Manufacturing is an add-on, priced by your partner. Its phone screens come with it; the wide computer layout is the separate Desktop Entry add-on.',
    },
    faqs: [
      {
        q: 'How do I record manufacturing in Tally Prime from a phone?',
        a: 'With the Manufacturing add-on on, open Production from the home screen and start a new run: pick the item, its BOM and how many to make. When you save, each in-house step goes to Tally as a Manufacturing Journal, the same voucher your accountant would have keyed at the office.',
      },
      {
        q: 'Do I need a Manufacturing Journal voucher type in Tally?',
        a: 'Yes. Takkada posts into the Manufacturing Journal voucher type your Tally already has and does not create one. If your company has never used it, your accountant or partner sets it up once in Tally before the first run.',
      },
      {
        q: 'Can a bill of materials carry scrap and by-products?',
        a: 'Yes. A BOM line can be a component, a by-product or a co-product, each with its own godown, and a component can carry a scrap percentage and name the item the scrap goes into. An item can have several BOMs, one of them the default.',
      },
      {
        q: 'Can I see the raw material needed before I start?',
        a: 'Yes. The Explosion view lists every raw material for any quantity you type, with an estimated cost at current item rates. Tally works out the real cost when the run is posted, so read the estimate as a planning number.',
      },
      {
        q: 'Does job work reach Tally?',
        a: 'Job work out does: the job-work order, the Material Out when material leaves and the Material In when it comes back go to Tally in that order. Job work you do for a principal is recorded in the app but is not sent to Tally.',
      },
      {
        q: 'Can I change a run after it is in Tally?',
        a: 'No. Once a run, a job-work order or a challan is in Tally, the app will not change it. If a run was wrong, cancel its journal in Tally and record the run again in the app, so both sides tell the same story.',
      },
    ],
    relatedPosts: [],
    priority: 0.7,
  },
  {
    slug: 'custom-voucher-type-tally',
    searchPhrase: 'Custom voucher type in Tally',
    overline: 'VOUCHER NAMES',
    headline: 'Bill as Proforma, Service Invoice or Vehicle Booking, each with its own numbers.',
    subheadline:
      'Your business raises more than one kind of bill, and your accountant keeps them apart in Tally by voucher type. Voucher names lets you create those types from the app, each with its own number series, and bill against the right one from the phone.',
    answerPoints: [
      'Create voucher types in Tally from the app',
      'A number prefix and series for each one',
      'Rename once, in the app and in Tally',
      'Pick the right type when you start a bill',
    ],
    // 52 words.
    answer:
      "A custom voucher type in Tally, such as Proforma or Service Invoice under Sales, is what Takkada's Voucher names add-on creates for you. Type the name and a number prefix, tap Create in Tally, and the type appears in Tally with manual numbering and duplicates blocked. Each name runs its own series.",
    waContext: 'feature-custom-voucher-type-tally',
    waMessage:
      'Hi, we keep separate voucher types in Tally for different bills. Can you show me how Takkada creates them with their own number series and bills against them?',
    seo: {
      title: 'Custom Voucher Type in Tally: Names and Number Series',
      description:
        'Create a custom voucher type in Tally from your phone: Proforma, Service Invoice or your own name, each with its own number prefix, renamed in app and Tally.',
    },
    llms: {
      section: 'Features',
      title: 'Custom voucher type in Tally (Voucher names)',
      summary:
        'Voucher names add-on: the company admin creates named voucher types for sales invoices, sales orders, quotations, delivery challans, purchase invoices, purchase orders, receipts, payments, credit notes and debit notes. Takkada creates each in Tally under the base type with manual numbering and duplicates prevented, gives it a unique number prefix that cannot clash with numbers already used this year, renames it in Tally when renamed in the app with the series running on, and asks which type to use when a document has several. Existing Tally voucher types can be brought in; nothing is deleted from Tally.',
    },
    footerLabel: 'Voucher names',
    hero: { screen: 'invoice-summary' },
    pendingScreens: ['voucher-names-list'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'From a new name to a numbered bill in Tally',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'Name it, give it a prefix',
        body:
          'In Settings, Custom voucher names, pick the document, type the name and a number prefix, and the screen shows what the first one will be numbered: VB-1 for Vehicle Booking. Sales and purchase names can carry their own ledger.',
        pendingScreen: 'voucher-names-list',
      },
      {
        icon: 'ShieldCheck',
        title: 'Created in Tally, under the right parent',
        body:
          'Create in Tally makes the voucher type under the base type for that document, even if you renamed the base in Tally. It is set to manual numbering with duplicates prevented and left switched on, so your staff can use it in Tally as well.',
      },
      {
        icon: 'ListChecks',
        title: 'Its own series, with no clashes',
        body:
          'A prefix has to be unique and cannot clash with numbers your Tally vouchers already use this year. Rename a type and the numbers keep running: VB-1, VB-2, then VB-3 under the new name.',
      },
      {
        icon: 'CheckCheck',
        title: 'Pick it when you bill',
        body:
          'With one name for a document it is used on its own. With several, a new sales invoice asks which one. Lists show each bill\'s type with filter chips, and the PDF keeps Tax Invoice as its title with the type name printed under it.',
      },
    ],
    comparison: {
      heading: 'Voucher types made from the app, against made at the Tally machine',
      othersLabel: 'Tally Prime on its own',
      rows: [
        {
          feature: 'Creating the type',
          takkada: 'From the app, by the company admin.',
          others: 'At the Tally machine, under Voucher Types.',
        },
        {
          feature: 'Number series',
          takkada: 'A prefix per name, checked against numbers already used this year.',
          others: 'Set inside the voucher type by whoever creates it.',
        },
        {
          feature: 'Renaming',
          takkada: 'Once, in the app. Tally follows and the numbers keep running.',
          others: 'Done in Tally, and the app has to be told separately.',
        },
        {
          feature: 'Choosing the type on a bill',
          takkada: 'Asked at the start of the bill on the phone or computer.',
          others: 'Picked in voucher entry at the office.',
        },
      ],
      disclaimer:
        'Tally Prime has always let you add voucher types. Voucher names creates them from the app and keeps the app and Tally on the same names and the same series.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Voucher names is an add-on, priced by your partner. Once it is enabled, the company admin switches it on in Settings.',
    },
    faqs: [
      {
        q: 'How do I create a custom voucher type in Tally?',
        a: 'In Tally you add one under Voucher Types and choose its parent. With Voucher names on, the company admin does it from Takkada instead: Settings, Custom voucher names, a name and a number prefix, then Create in Tally. The type appears in Tally under the base type for that document.',
      },
      {
        q: 'Which documents can have their own names?',
        a: 'Sales invoices, sales orders, quotations, delivery challans, purchase invoices, purchase orders, receipts, payments, credit notes and debit notes. Each can carry several names. Journals, contra, stock journals, goods receipts and expenses keep their usual voucher types.',
      },
      {
        q: 'Can I use a voucher type I already made in Tally?',
        a: 'Yes. Use a type already in your Tally brings it into the app, and Tally keeps its own numbering for it. Names created from the app get a prefix and a running number of their own instead, so the two never fight over a series.',
      },
      {
        q: 'What happens when I rename one or stop using it?',
        a: 'Renaming changes the name in the app and in Tally, and the numbers carry on, with old bills showing the new name. Hide from new bills takes it off the list for new entries. Nothing is deleted from Tally, and a created type stays in Tally.',
      },
      {
        q: 'Can I choose the starting number or a suffix?',
        a: 'No. Numbering is your prefix followed by a running number from 1, with no suffix. The prefix is checked so it cannot clash with the numbers your existing Tally vouchers already use this year, which keeps duplicate bill numbers out of the books.',
      },
    ],
    relatedPosts: [
      {
        slug: 'voucher-type-permissions-for-team-members-tally',
        title: 'Let a Salesman Raise Orders but Never an Invoice: Voucher-type Permissions',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'desktop-billing-tally',
    searchPhrase: 'Desktop billing for Tally',
    overline: 'DESKTOP ENTRY',
    headline: 'Bill on the computer the way your Tally operator already types.',
    subheadline:
      'Your billing staff think in Enter and the keyboard, not in taps. Desktop Entry puts a Tally-style form in the computer browser, so invoices, orders, receipts and payments go in at keyboard speed and reach Tally like every other entry.',
    answerPoints: [
      'One keyboard-first form for sales, purchase, stock and accounts entries',
      'Enter moves to the next field and Ctrl+A saves',
      'Pull what is pending from an order or challan into the bill',
      'Every save reaches Tally the same way a phone entry does',
    ],
    // 50 words.
    answer:
      "Desktop billing for Tally is what Takkada's Desktop Entry add-on does: a keyboard-first entry form in the computer browser at app.takkada.com. Type the party, Enter through item, quantity and rate, press Ctrl+A to save. Invoices, orders, challans, receipts, payments and journals post to Tally the same way phone entries do.",
    waContext: 'feature-desktop-billing-tally',
    waMessage:
      'Hi, my billing staff type fast in Tally and find the phone slow. Can you show me Takkada Desktop Entry with the keyboard on a computer?',
    seo: {
      title: 'Desktop Billing for Tally: Keyboard Entry in the Browser',
      description:
        'Desktop billing for Tally in the browser: a keyboard-first form for invoices, orders, receipts and journals. Enter to move, Ctrl+A to save, posted to Tally.',
    },
    llms: {
      section: 'Features',
      title: 'Desktop billing for Tally (Desktop Entry)',
      summary:
        'Desktop Entry add-on: a computer layout in the web browser at app.takkada.com with a sidebar, wide registers and one keyboard-first entry form for quotations, sales orders, delivery challans, sales invoices, credit notes, receipts, purchase orders, goods receipts, purchase invoices, debit notes, payments, stock journals, expenses, contra and journals. Enter moves on, Ctrl+A saves, F8/F9 pick sales or purchase vouchers, Alt+O pulls pending order or challan lines. Every save runs the same path to Tally as the phone app. Shown only for companies with the add-on, on a wide window with a mouse; never switched on by screen size.',
    },
    footerLabel: 'Desktop billing',
    hero: { screen: 'add-items' },
    pendingScreens: ['desktop-entry-invoice'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'One bill, typed the Tally way',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Type it the way Tally taught you',
        body:
          'F8 lists the sales vouchers and F9 the purchase ones, Option 8 and Option 9 on a MacBook. Enter moves to the next field, Shift+Tab goes back, Esc backs out. F2 changes the date, and Alt+C makes a new party or item without leaving the bill.',
        pendingScreen: 'desktop-entry-invoice',
      },
      {
        icon: 'Link2',
        title: 'Pull the order into the bill',
        body:
          "Alt+O brings in what is still pending on a sales order, challan, quotation, purchase order or goods receipt. Only the open quantity is offered and it is checked again at save, so nothing is billed twice. Alt+2 copies the party's last invoice.",
      },
      {
        icon: 'CheckCheck',
        title: 'Save, then the next step',
        body:
          'Ctrl+A saves. The form clears for the next bill and a strip shows the number just saved, with keys to view, print, send or cancel it, and a button for the next document, such as the delivery challan.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Into Tally like any other entry',
        body:
          'A desktop save runs the same save the phone runs, so numbering, approvals and the write into Tally behave the same. A half-typed bill survives a closed or crashed browser tab for seven days.',
      },
    ],
    comparison: {
      heading: 'The computer layout, against the phone screens in a browser',
      othersLabel: 'Web view on its own',
      rows: [
        {
          feature: 'What you see on a computer',
          takkada: 'A sidebar, wide registers and a Tally-style entry form.',
          others: 'The phone screens, in a browser window.',
        },
        {
          feature: 'Moving through a bill',
          takkada: 'Enter, Shift+Tab, arrows and Esc, with F8 and F9 for the voucher type.',
          others: 'Clicks, the way a phone is tapped.',
        },
        {
          feature: 'Who it suits',
          takkada: 'Billing staff who type all day.',
          others: 'An owner checking a figure from a laptop.',
        },
        {
          feature: 'Where entries go',
          takkada: 'Into Tally, through the same save as the phone.',
          others: 'Into Tally, through the same save as the phone.',
        },
      ],
      disclaimer:
        'Web view is the browser login that comes with Assurance. Desktop Entry is a separate add-on that brings the computer layout and opens the browser by itself.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Desktop Entry is an add-on, priced by your partner. A company without it keeps the phone-style screens on every screen size.',
    },
    faqs: [
      {
        q: 'Do I need to install anything on the computer?',
        a: 'No. Desktop Entry runs in the browser at app.takkada.com, in Chrome or Safari, on the computers your billing staff already use. Tally keeps running on the office machine with the connector, and that is where each saved entry is written.',
      },
      {
        q: 'Is Desktop Entry the same as Web view?',
        a: 'No. Web view lets you log in from a computer browser and shows the ordinary app screens. Desktop Entry is the computer layout itself: the sidebar, the wide registers and the keyboard entry form. A company with Desktop Entry does not need Web view switched on as well.',
      },
      {
        q: 'Which keys does it use?',
        a: 'Enter moves to the next field and accepts, Shift+Tab goes back, Esc backs out and Ctrl+A saves, Control+A on a Mac. F8 and F9 switch between the sales and purchase vouchers, F2 changes the date, Ctrl+I inserts a line and Alt+C creates a party or item.',
      },
      {
        q: 'Which entries can I make from the computer?',
        a: 'Quotations, sales orders, delivery challans, sales invoices, credit notes and receipts on the sales side; purchase orders, goods receipts, purchase invoices, debit notes and payments on the purchase side; and stock journals, expenses, contra and journal entries.',
      },
      {
        q: 'Does the phone app change?',
        a: 'No. The phone app keeps its own screens. The computer layout shows only on a wide window with a mouse or trackpad, and only for a company with the add-on, so a phone or a narrow window never switches into it.',
      },
    ],
    relatedPosts: [
      {
        slug: 'tally-autopilot-vs-manual-entry',
        title: 'Tally on Autopilot vs Typing Every Voucher: The Time Math',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'salesman-location-tracking-app',
    searchPhrase: 'Salesman location tracking app',
    overline: 'LIVE TRACKING',
    headline: 'See where your salesmen are during their working day.',
    subheadline:
      'The evening call asking where everyone went gets you an answer, never a route. Live Tracking records the salesman\'s location only between Start day and End day on his Android phone, and the Team Map shows who is out, where, and how far they have gone.',
    answerPoints: [
      'Location and battery recorded only during the working day',
      'A Team Map of who is on duty and who stopped reporting',
      'Kilometres travelled and the route for each day',
      'Android phones only; the iPhone app does not track',
    ],
    // 52 words.
    answer:
      "Takkada's Live Tracking works as a salesman location tracking app for distributors on Tally. On the salesman's Android phone, Start day begins recording location and battery every few minutes and End day stops it. The Team Map shows who is on duty, where they were last seen, battery and kilometres covered today.",
    waContext: 'feature-salesman-location-tracking-app',
    waMessage:
      'Hi, I want to see where my salesmen are during the day and how many km they covered. Can you show me Takkada Live Tracking on Android?',
    seo: {
      title: 'Salesman Location Tracking App for Tally Distributors',
      description:
        'Salesman location tracking during the working day only: Start day to End day on Android, a Team Map with last seen, battery and km covered. Nothing after hours.',
    },
    llms: {
      section: 'Features',
      title: 'Salesman location tracking app (Live Tracking)',
      summary:
        "Live Tracking add-on: a Start day / End day duty window on the salesman's Android phone records location and battery every 2, 5, 10 or 15 minutes (or every 200 m), with a notification showing the whole time and an automatic stop time. The Team Map shows who is on duty, last seen, battery, km today and who stopped reporting; a day view shows the route, gaps, check-in pins, orders and receipts. Offline points queue for 48 hours. Android only, never iPhone; the map also opens in a computer browser with Web view. Locations kept 90 days.",
    },
    footerLabel: 'Live tracking',
    hero: { screen: 'field-visits' },
    pendingScreens: ['live-tracking-map'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'One working day, from Start day to End day',
    walkthrough: [
      {
        icon: 'MapPin',
        title: 'He starts the day, tracking starts',
        body:
          'The home screen carries a Start your day card. The first time, he sees what is recorded and agrees to it. From Start day to End day the phone reports where it is, and a notification stays on the whole time, so nothing runs out of sight.',
      },
      {
        icon: 'LayoutGrid',
        title: 'The Team Map, refreshed every minute',
        body:
          'Pins for everyone on duty, and a line per person with when they were last seen, the battery left and the kilometres covered today. Anyone silent for twenty minutes reads Stopped reporting, and Day ended or Never started today covers the rest.',
        pendingScreen: 'live-tracking-map',
      },
      {
        icon: 'Route',
        title: 'His day, drawn out',
        body:
          'Tap a name for the day: the route on the map, the gaps where the phone went quiet, the check-in pins, and the orders and receipts he made. End day tells the salesman how many kilometres he covered.',
      },
      {
        icon: 'Clock',
        title: 'Rules you set',
        body:
          'The admin picks how often the phone reports, every 2, 5, 10 or 15 minutes, and the time tracking stops by itself if nobody ends the day. Below 15% battery the phone reports less often. Locations are kept for 90 days.',
      },
    ],
    comparison: {
      heading: 'A visit stamp, against the whole working day',
      othersLabel: 'Visit check-in on its own',
      rows: [
        {
          feature: 'What it records',
          takkada: 'Location every few minutes, from Start day to End day.',
          others: 'A photo, the location and the time at each shop check-in.',
        },
        {
          feature: 'The question it answers',
          takkada: 'Where is he now, and how far has he gone today.',
          others: 'Was he at this shop, and when.',
        },
        {
          feature: 'Battery and silence',
          takkada: 'Battery per person, and a flag when a phone stops reporting.',
          others: 'Not shown.',
        },
        {
          feature: 'Kilometres',
          takkada: 'Counted per day and shown at End day.',
          others: 'Not counted.',
        },
      ],
      disclaimer:
        'Visit check-in is part of Team Sales in Copilot and comes with Live Tracking too. Live Tracking records on Android only.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Live Tracking is an add-on, priced by your partner. It records on Android phones only; the Team Map also opens in a computer browser with Web view.',
    },
    faqs: [
      {
        q: 'Does it track my salesman after working hours?',
        a: 'No. Recording runs only between Start day and End day, and a notification stays on the phone the whole time. If he forgets to end the day, it stops by itself at the time the admin sets, eight in the evening unless changed. Owners and admins are not tracked.',
      },
      {
        q: 'Does it work on iPhone?',
        a: 'No. Live Tracking records on Android phones only, and the iPhone app does not show it at all. The Team Map can be opened on an Android phone, or in a computer browser when Web view is on for the company.',
      },
      {
        q: 'What happens when there is no network?',
        a: 'The phone keeps the location points and sends them when the signal returns, holding up to 48 hours of them. If the app is closed and opened again during the day, tracking picks up again on its own.',
      },
      {
        q: 'Who can see the Team Map?',
        a: 'Members with full access, and anyone you give the View team location permission. Everyone else on the team works without it. Locations are kept for 90 days and then removed, so the record covers about one quarter.',
      },
      {
        q: 'How is this different from a visit photo?',
        a: 'A visit check-in proves he stood at one shop: a camera photo, the location and the time on one record. Live Tracking answers a different question, where he is now and how far he went today, and its day view puts the check-in pins on the same route.',
      },
    ],
    relatedPosts: [
      {
        slug: 'geo-tagged-visit-photo-vs-all-day-gps-tracking',
        title: 'Geo-tagged Visit Photo vs All-day GPS Tracking for Salesmen',
      },
      {
        slug: 'gps-tracking-app-for-salesman-what-to-look-for',
        title: 'GPS Tracking App for Salesmen: What to Look For Before You Buy',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'email-invoice-from-tally',
    searchPhrase: 'Email invoices from Tally',
    overline: 'EMAIL INVOICES',
    headline: 'Reach the customers who work from their inbox.',
    subheadline:
      "Some buyers, the purchase desk of a chain or a company's accounts team, read email before WhatsApp. With Email on, the invoice PDF, the reminder and the statement reach their inbox too, from the same send.",
    answerPoints: [
      'Invoices emailed with the PDF attached',
      'Payment reminders and statements emailed with a Pay now link',
      "The address read from the party's Tally ledger",
      'Replies come back to your business email',
    ],
    // 49 words.
    answer:
      "Email invoices from Tally automatically with Takkada's Email add-on: every automatic invoice, payment reminder and statement that goes out on WhatsApp also goes by email. The PDF is attached, the address comes from the party's Tally ledger, and replies reach your own business email. Nobody has to press send.",
    waContext: 'feature-email-invoice-from-tally',
    waMessage:
      'Hi, some of my customers want invoices and reminders on email, not only WhatsApp. Can you show me how Takkada emails them from my Tally?',
    seo: {
      title: 'Email Invoices From Tally: PDF, Reminders, Statements',
      description:
        'Email invoices from Tally to customers who live in their inbox: the invoice PDF, payment reminders and statements, sent with WhatsApp, replies to your email.',
    },
    llms: {
      section: 'Features',
      title: 'Email invoices from Tally',
      summary:
        "Email add-on: each automatic invoice (with Auto Invoice Dispatch), due and overdue payment reminder and ledger statement that goes out on WhatsApp is also emailed, PDF attached, with the same words and a Pay now link. The address comes from the party's Tally ledger or is added in the app and written back to Tally. Sent as the company via Takkada; Reply-To and a copy go to the business email. Sent even when WhatsApp fails. No manual email button; receipts and credit notes are not emailed.",
    },
    footerLabel: 'Email invoices',
    hero: { screen: 'invoice-summary-send' },
    pendingScreens: ['email-invoices'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'One send, on WhatsApp and in the inbox',
    walkthrough: [
      {
        icon: 'Send',
        title: 'The invoice reaches the inbox',
        body:
          'When Auto Invoice Dispatch sends an invoice on WhatsApp, the same invoice goes by email with the PDF attached. It is sent as your company name via Takkada, and a copy goes to your business email.',
        pendingScreen: 'email-invoices',
      },
      {
        icon: 'CalendarClock',
        title: 'Reminders and statements, with Pay now',
        body:
          'Due and overdue reminders and ledger statements carry the same words as the WhatsApp message, plus a Pay now link. If the WhatsApp message fails or the number has blocked you, the email still goes.',
      },
      {
        icon: 'BookOpen',
        title: 'The address comes from Tally',
        body:
          "Takkada reads the email on the party ledger in Tally. If one is missing, add it on the party's Email card in the app; it is written back into Tally, so the next sync keeps it.",
      },
      {
        icon: 'ListChecks',
        title: 'See what went out',
        body:
          'Settings, Email shows the name it is sent as, where copies and replies go, how many of your customers have an email address, and the emails sent most recently.',
      },
    ],
    comparison: {
      heading: 'Email that rides with every send, against email by hand',
      othersLabel: 'Emailing from Tally by hand',
      rows: [
        {
          feature: 'Sending the invoice',
          takkada: 'Automatic, with the WhatsApp send.',
          others: "Tally Prime's E-mail option, one voucher at a time, after mail setup.",
        },
        {
          feature: 'Payment reminders',
          takkada: 'Each scheduled reminder, emailed with a Pay now link.',
          others: 'Written and sent by somebody at the office.',
        },
        {
          feature: 'Replies',
          takkada: 'Come back to your business email, which gets a copy of each one.',
          others: 'Come to whichever mailbox sent it.',
        },
        {
          feature: 'When WhatsApp fails',
          takkada: 'The email still goes.',
          others: 'Somebody notices, or nobody does.',
        },
      ],
      disclaimer:
        'Tally Prime can e-mail a voucher once mail is set up on the Tally machine. Takkada sends from its own mail server as your company, so nothing is set up in Tally.',
    },
    planPointer: {
      plan: 'Assurance',
      note:
        'Email is an add-on, priced by your partner. Invoice emails ride on Auto Invoice Dispatch, which comes with Assurance; reminder and statement emails go out with the reminders.',
    },
    faqs: [
      {
        q: 'Can Takkada email invoices automatically?',
        a: "Yes, with the Email add-on and Auto Invoice Dispatch both on. Each invoice that goes out on WhatsApp is also emailed, with the PDF attached, to the address on the party's Tally ledger. One send makes at most one email, so a retry never doubles it.",
      },
      {
        q: 'Which email address does it use?',
        a: "The email on the party ledger in Tally, the first valid one if there are several. You can also add one on the party's Email card in the app; it is written back into Tally and survives the next sync. A party without an email simply gets WhatsApp.",
      },
      {
        q: 'Who is the email from, and where do replies go?',
        a: "It is sent as your company name via Takkada, from a Takkada no-reply address. Reply-To is the business email in your seller details, and that address gets a copy of every email, so a customer's reply lands with you.",
      },
      {
        q: 'Can I email one invoice by hand?',
        a: 'Not today. Email goes out with the automatic sends: invoices through Auto Invoice Dispatch, and reminders and statements with their WhatsApp message. An invoice shared by hand on WhatsApp is not emailed, and receipts and credit notes are not emailed.',
      },
      {
        q: 'Does the customer need a WhatsApp number to get the email?',
        a: 'The email travels with the WhatsApp send, so the party needs a valid mobile number in Tally for anything to go out. If the WhatsApp message then fails or is blocked, the email still goes.',
      },
    ],
    relatedPosts: [
      {
        slug: 'auto-invoice-dispatch-tally',
        title: 'Auto Invoice Dispatch: Every Tally Invoice on WhatsApp, Automatically',
      },
      {
        slug: 'tally-whatsapp-invoice-dispatch',
        title: 'Auto-Dispatching Invoices on WhatsApp from Tally: What It Is and What It Changes',
      },
    ],
    priority: 0.7,
  },
  {
    slug: 'optional-voucher-tally-prime',
    searchPhrase: 'Optional voucher in Tally Prime',
    overline: 'TALLY DRAFTS',
    headline: 'Check what your accountant keyed in Tally before it reaches the books.',
    subheadline:
      'Your accountant marks a voucher optional in Tally when it is not ready to post, and it sits there until somebody opens Tally to look. Tally Drafts lists them on your phone, so you check each one and post it or set it aside from wherever you are.',
    answerPoints: [
      'See every optional voucher keyed in Tally, by type',
      'Check the party, amount and ledger lines on the phone',
      'Post it into the books in Tally with one tap',
      'Drafts never count in outstanding, ledgers or reminders',
    ],
    // 53 words.
    answer:
      "An optional voucher in Tally Prime is one your accountant has typed but not posted to the books. Takkada's Tally Drafts lists them on the phone and computer with party, amount and ledger lines. Approve one and the same voucher becomes a regular entry in Tally; reject it and Tally is left untouched.",
    waContext: 'feature-optional-voucher-tally-prime',
    waMessage:
      'Hi, my accountant keeps optional vouchers in Tally for me to check. Can you show me how Takkada lists them on the phone and posts them?',
    seo: {
      title: 'Optional Voucher in Tally Prime: Check and Post From Phone',
      description:
        'See the optional vouchers keyed in Tally Prime on your phone, check the party, amount and ledgers, and post each one into the books with one tap.',
    },
    llms: {
      section: 'Features',
      title: 'Optional voucher in Tally Prime (Tally Drafts)',
      summary:
        'Tally Drafts add-on: lists the optional (draft) vouchers keyed in Tally on the phone and computer, in Drafts, In progress, Posted and Rejected tabs filtered by voucher type, with party, amount, date, ledger lines and narration. Approve posts the same voucher as regular in Tally with no second copy; Reject is app-only and leaves Tally untouched. Follows team permissions and approvals. Drafts are kept out of outstanding, ledgers, reports and reminders. Item lines are not shown; post-dated drafts are not posted.',
    },
    footerLabel: 'Tally drafts',
    hero: { screen: 'maker-checker' },
    pendingScreens: ['tally-drafts'],
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-05',
    walkthroughHeading: 'From a draft in Tally to an entry in the books',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Every draft, in one list',
        body:
          'Tally Drafts opens on four tabs: Drafts, In progress, Posted and Rejected. Chips narrow it to sales, purchases, receipts, payments, notes, journals, contra, stock, challans, goods receipts or purchase orders, for this financial year unless you ask for older.',
        pendingScreen: 'tally-drafts',
      },
      {
        icon: 'FileCheck2',
        title: 'Check it where you are',
        body:
          'Each draft shows the voucher type, party, amount, date, the debit and credit ledger lines and the narration. If the accountant changes it in Tally after you looked, the post stops and the new figures are shown.',
      },
      {
        icon: 'CheckCheck',
        title: 'Post it, and Tally makes it regular',
        body:
          'Approve on the list posts it in one tap; Post to books on the detail asks first. The same voucher in Tally turns regular, with no second copy made. A posted draft cannot be undone from the app.',
      },
      {
        icon: 'ShieldCheck',
        title: 'Reject without touching Tally',
        body:
          'Reject only sets it aside in the app, with Undo offered, and Tally stays as it was. Posting follows your team permissions: a member sees only the voucher types they may view and posts only the ones they may create.',
      },
    ],
    comparison: {
      heading: 'Drafts checked on the phone, against drafts found at the office',
      othersLabel: 'Tally Prime on its own',
      rows: [
        {
          feature: 'Seeing pending drafts',
          takkada: 'A list on the phone, by voucher type and status.',
          others: "The optional vouchers report, at the Tally machine.",
        },
        {
          feature: 'Posting one',
          takkada: 'One tap. The same voucher turns regular in Tally.',
          others: 'Opened in Tally, marked regular and saved.',
        },
        {
          feature: 'Who can post',
          takkada: 'Set per voucher type, with approvals if you use them.',
          others: 'Whoever has the Tally login.',
        },
        {
          feature: 'Drafts in your numbers',
          takkada: 'Kept out of outstanding, ledgers, reports and reminders.',
          others: 'Kept out of the books until made regular.',
        },
      ],
      disclaimer:
        'Optional vouchers are a Tally Prime feature. Takkada reads them and posts them; it never creates or edits a draft, and item lines are not shown.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Tally Drafts is an add-on, priced by your partner. Posting needs your Tally machine and its sync running.',
    },
    faqs: [
      {
        q: 'What is an optional voucher in Tally Prime?',
        a: "A voucher marked optional is saved in Tally but kept out of the books: it changes no ledger balance or stock until somebody makes it regular. Accountants use it for entries waiting on a check, a bill or the owner's word. Takkada calls these drafts.",
      },
      {
        q: 'How do I convert an optional voucher to regular?',
        a: 'In Tally you open the voucher, mark it regular and save it. From Takkada you tap Approve on the draft, or Post to books on its detail, and the same voucher turns regular in Tally. Nothing is entered twice, and the entry then counts in the books like any other.',
      },
      {
        q: 'Does rejecting a draft delete it from Tally?',
        a: 'No. Reject only moves it to the Rejected tab in Takkada, with Undo offered. The voucher stays optional in Tally. If the accountant edits it there later, it comes back to the Drafts tab so it can be checked again.',
      },
      {
        q: 'Who on my team can post drafts?',
        a: 'It follows the permissions you already set. A member sees drafts only for the voucher types they are allowed to view, and posting needs permission to create that type, plus an approver if approvals are switched on for it.',
      },
      {
        q: 'Are there drafts it cannot post?',
        a: 'Yes. Post-dated drafts, and drafts of a voucher type Takkada has not been set up for, stay in Tally to be posted there. Item lines are not shown on the phone, so a stock draft points you to Tally for its items.',
      },
    ],
    relatedPosts: [],
    priority: 0.7,
  },
];
