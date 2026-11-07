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
// Screens: every image here is a real capture of the feature itself, from demo
// company 143 (2026-11-05), except the four Tally drafts screens: demo co143 is
// a no-Tally company whose every draft reads "Tally sync is off", so those are
// stage captures of made-up drafts under an operator exception (see their
// manifest rows). Ronak rejected the adjacent stand-in screens these pages
// first carried, so a step with no capture of its own shows no image at all.
// A step that is waiting names its capture in `pendingScreen`, and the page
// lists every capture it is owed in `pendingScreens`. feature-pages.test.js
// pins both, and goes red the day a pending slug is registered in screens.js,
// so the swap cannot be forgotten. A step that will stay without a screen says
// so with `copyOnly: true`; that set is closed (empty since 2026-11-06) in the
// same test file.
// Where each slug plugs in: docs/seo/feature-pages-round-three/SCREENS-TODO.md.
//
// Copy angle (Ronak, 2026-11-05): the reader already runs this job in Tally.
// Each page says what the job takes in Tally alone today (who, where, how many
// entries, what is typed twice, what is checked by phone) and what is left with
// Takkada doing the legwork into the same Tally. Tally is the neighbour: the
// "Tally alone" column describes the reader's day, never a fault in Tally, and
// every Tally-side sentence is listed with its basis in the claims sheet.

/** @type {import('./featurePages').FeaturePage[]} */
export const ROUND_THREE = [
  {
    slug: 'stock-control-tally',
    searchPhrase: 'Stock control for Tally',
    overline: 'STOCK CONTROL',
    headline: "This week's purchase list, worked out before anyone walks to the godown.",
    subheadline:
      "The weekly order usually starts with the stock summary in Tally, a call to the godown and somebody's memory of which supplier takes twelve days, then each purchase order is keyed in line by line. Stock Control reads the same Tally books and hands you the list and the orders.",
    answerPoints: [
      'The items that will run out before a fresh order lands, without a godown call',
      'Quantities from your own best month, minus stock and what is already ordered',
      'Supplier delivery times measured from your own orders and receipts',
      'One purchase order per supplier, filled in and saved to Tally',
    ],
    // 59 words.
    answer:
      "Stock control for Tally means knowing what to reorder without counting shelves or retyping orders. Takkada's Stock Control reads your synced Tally sales, purchase orders and receipts, lists the items that will run out before a fresh order lands, suggests quantities from your best month, and turns ticked items into one purchase order per supplier, saved back to Tally.",
    waContext: 'feature-stock-control-tally',
    waMessage:
      'Hi, we reorder from memory and still run out of the fast items. Can you show me what Takkada Stock Control says I should order this week?',
    seo: {
      title: 'Stock Control for Tally: Reorder, Lead Time, Season Plan',
      description:
        'Stock control for Tally: what to reorder today, supplier lead times from your own receipts, a season plan, and purchase orders saved to Tally, no retyping.',
    },
    llms: {
      section: 'Features',
      title: 'Stock control for Tally',
      summary:
        'Stock Control add-on for distributors on Tally: Reorder Now lists items that will run out before a fresh order arrives, with stock, quantity on order, supplier lead time and a suggested quantity (top-up to the best month of the last twelve, lifted by a company growth dial); a basket turns ticked items into one purchase order per supplier; Suppliers measures usual, 9-in-10 and worst delivery time and fill from the company\'s own purchase orders and receipts; Season Plan covers the items making up the top 80% of sales, baselined on the same window last year and corrected for stock-outs, with an order-by date; Lost Sales counts order lines lost to stock-outs. Any tab exports to Excel.',
    },
    footerLabel: 'Stock control',
    hero: { screen: 'stock-control-reorder' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for whoever places the purchase orders",
      cases: [
        {
          who: "A distributor buying from a dozen suppliers",
          today: "The weekly order is built from the stock summary, a godown call and memory, and fast items still run out.",
          with: "Reorder Now lists what will run out before a fresh order lands, and the basket turns it into one purchase order per supplier.",
        },
        {
          who: "A business with a busy season",
          today: "Season stock is planned from last year's register by hand, often once the rush has started.",
          with: "Season Plan reads last year's same months, corrects for the days items were out of stock, and gives each item an order-by date.",
        },
        {
          who: "An owner tired of late suppliers",
          today: "Lead time is whatever the supplier promised on the phone.",
          with: "Suppliers shows the days 9 in 10 of their orders really took, and the orders already past their promised date.",
        },
      ],
      stops: [
        "Building the reorder list from the stock summary and a godown call",
        "Keying purchase orders into Tally line by line",
        "Planning around the lead time a supplier promised",
        "Reading last year's sales register by hand before the season",
      ],
    },
    walkthroughHeading: "From this morning's stock to the supplier's order",
    walkthrough: [
      {
        icon: 'Activity',
        title: 'The list nobody has to make',
        body:
          'The top band reads Order this week, Lead time, On order and Lost sales. Below it is every item that will run out before a fresh order can arrive, most overdue first, with its stock, what is already on the way, the supplier lead time and a quantity to order. Nobody counts a shelf to build it.',
        screen: 'stock-control-reorder-list',
      },
      {
        icon: 'PackageCheck',
        title: 'Tick, check, create the order',
        body:
          'Tick items, or let one tap pick everything that is due. The basket groups them by supplier with the quantities open to change, and Create PO opens that supplier\'s purchase order filled in at the last purchase rate. Save it and it goes to Tally like any order, so nobody keys it again at the Tally computer.',
        screen: 'stock-control-basket',
      },
      {
        icon: 'Truck',
        title: 'Suppliers, judged on what they did',
        body:
          'For every supplier: the days an order usually takes, the days 9 in 10 orders arrive within, the worst case, how much of what you ordered actually came, and the orders past their promised date. Year by year it shows who is getting faster or slower, measured from your own receipts.',
        screen: 'stock-control-supplier-performance',
      },
      {
        icon: 'CalendarClock',
        title: 'A season plan with an order-by date',
        body:
          'Pick a window, say November to February. The plan takes the items making up the top 80% of your sales, reads the same months last year, corrects for the days they were out of stock, and gives each one an order-by date. Dates already gone are flagged first.',
        screen: 'stock-control-season-plan',
      },
    ],
    comparison: {
      heading: 'The weekly order, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Which items to reorder',
          takkada: 'Listed each morning, most overdue first: the items that will run out before a fresh order arrives.',
          others: 'Read off the stock summary, then checked with a call to the godown.',
        },
        {
          feature: 'How much to order',
          takkada:
            'Topped up to your best month of the last twelve, lifted by the growth dial, minus stock and what is already on order.',
          others: 'Worked out by whoever places the order, against the reorder level on the item if somebody set one.',
        },
        {
          feature: 'Supplier delivery time',
          takkada: 'Measured from your own purchase orders and receipts: usually, 9 in 10 within, worst.',
          others: 'Remembered, or taken from what the supplier said on the phone.',
        },
        {
          feature: 'Season stock',
          takkada: "Last year's same months, corrected for the days items were out of stock, with an order-by date per item.",
          others: "Read off last year's sales register by hand, if there is time before the rush.",
        },
        {
          feature: 'The purchase order',
          takkada: 'One per supplier, filled in from the basket at the last purchase rate, then saved to Tally.',
          others: 'Keyed into Tally line by line at the office.',
        },
      ],
      disclaimer:
        "Tally Prime's Reorder Status report works from the reorder level and minimum order quantity set on each item. Stock Control reads the same books and adds measured supplier lead times, a season plan and the purchase orders themselves.",
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Stock Control is an add-on, priced by your partner. Ask them for the add-on price.',
    },
    faqs: [
      {
        q: 'Does somebody still type the purchase orders into Tally?',
        a: 'No. Create PO opens the purchase order already filled in with the supplier, the items, the quantities from the basket and the last purchase rate where there is one. Whoever saves it checks it once, and it reaches Tally as an ordinary purchase order.',
      },
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
    headline: 'When the van is back at seven, every drop is already on record: the photo, the returns and the cash.',
    subheadline:
      "Most evenings run on signed bill copies, a bag of cash counted against a list, and one receipt per shop keyed into Tally. Proof of Delivery puts the photo, the returns and the cash on record at each drop, and the office approves the money into a Tally receipt.",
    answerPoints: [
      'A live camera photo with time and place at every drop, in place of the signed copy',
      'Returns and missed drops recorded at the shop, with a reason',
      'Cash, UPI and cheque recorded by the driver against each bill',
      'One approval at the office makes the Tally receipt',
    ],
    // 59 words.
    answer:
      "A proof of delivery app for Tally replaces the signed slip and the evening cash count with a record made at the shop. With Takkada's Proof of Delivery, the driver marks each drop with a live camera photo carrying time and place, notes returns, and records cash, UPI or cheque. The office approves the money into a Tally receipt.",
    waContext: 'feature-proof-of-delivery-app-tally',
    waMessage:
      'Hi, my van comes back with cash and returns and nobody knows what reached which shop. Can you show me Takkada Proof of Delivery with a driver login?',
    seo: {
      title: 'Proof of Delivery App for Tally: Photo, Returns, Cash',
      description:
        'Proof of delivery app for Tally: a photo with time and place at each shop, returns with reasons, and van cash approved into Tally receipts nobody retypes.',
    },
    llms: {
      section: 'Features',
      title: 'Proof of delivery app for Tally',
      summary:
        'Proof of Delivery add-on on top of Dispatch Load: a Driver role that sees only its own delivery trips; shops in route order with call and navigate; Mark delivered needs a live camera photo that records time and location; returned quantities and missed drops carry a reason; cash, UPI and cheque recorded per drop, saved offline; the office approves driver cash into a Tally receipt against the chosen account. Returns are recorded but not posted to Tally.',
    },
    footerLabel: 'Proof of delivery',
    hero: { screen: 'pod-driver-drops' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for businesses that deliver on their own vans",
      cases: [
        {
          who: "A distributor with vans on shop-to-shop drops",
          today: "Signed bill copies come back in a bundle, some missing, and a dispute means hunting for one.",
          with: "Every drop carries a live camera photo with the time and place, shown on the invoice.",
        },
        {
          who: "A van that collects payment on delivery",
          today: "The cash is counted against a list at night, then one receipt per shop is keyed into Tally.",
          with: "The driver records cash, UPI or cheque against each bill, and one approval at the office makes the Tally receipt.",
        },
        {
          who: "An owner who wants drivers kept out of the books",
          today: "The driver carries printed bills and calls the office for anything else.",
          with: "The driver sees his own trips only, with no registers, party balances or reports.",
        },
      ],
      stops: [
        "Chasing signed bill copies",
        "Counting the van's cash against a list",
        "Keying one receipt per shop into Tally",
        "Hearing about returns and missed shops only in the evening",
      ],
    },
    walkthroughHeading: 'From the loaded van to the receipt in Tally',
    walkthrough: [
      {
        icon: 'Route',
        title: 'His trips, in driving order',
        body:
          'The driver logs in to My trips. A trip appears once the van is billed, with its shops in route order and Call and Navigate on each. Shops already pinned can be sorted nearest first from where he is standing.',
        screen: 'pod-driver-drops',
      },
      {
        icon: 'Camera',
        title: 'Delivered, with the photo to prove it',
        body:
          'Mark delivered needs a photo from the live camera, never the gallery, and it records the time and the place. Returned quantities take a reason such as damaged, wrong item or not ordered, and a shop he could not deliver to gets one too.',
        screen: 'pod-photo-proof',
      },
      {
        icon: 'Wallet',
        title: 'Cash, UPI or cheque on the van',
        body:
          'He records what the shop paid, against one bill or all of them oldest first. UPI and cheque need a photo of the screen or the cheque. The drop saves on the phone without signal and uploads when the van is back in range.',
        screen: 'pod-cash-on-van',
      },
      {
        icon: 'CheckCheck',
        title: 'The office approves it into Tally',
        body:
          'Cash with drivers lists each collection by driver, with the UPI screen or cheque photo beside it. Approve asks which account the money went into and makes the receipt in Tally against the bill, naming the driver and the trip, so nobody keys it. Reject asks for a reason. The invoice carries the photo, the time and the map pin.',
        screen: 'pod-office-approval',
      },
    ],
    comparison: {
      heading: 'The evening after the van comes back, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Proof the goods reached the shop',
          takkada: 'A live camera photo with the time and the place, shown on the invoice.',
          others: 'A signed or stamped copy of the bill, if it comes back with the driver.',
        },
        {
          feature: 'Cash collected on the van',
          takkada: 'Recorded per drop by the driver. One approval at the office makes the Tally receipt against the bill.',
          others: 'Counted against a list, then one receipt per shop keyed into Tally.',
        },
        {
          feature: 'Returns',
          takkada: 'Quantity and reason per item, recorded at the shop and listed in the Returns report. The office still makes the credit note.',
          others: 'Told to the office in the evening, then the credit note is keyed in Tally.',
        },
        {
          feature: 'A shop that was not delivered',
          takkada: "Couldn't deliver, with the reason: shop closed, customer refused, no money, or the shop was not found.",
          others: "Explained by the driver at the end of the day.",
        },
        {
          feature: "The driver's access",
          takkada: 'His own trips only. No registers, party balances or reports.',
          others: "A printed copy of the day's bills.",
        },
      ],
      disclaimer:
        'Returns are recorded for the office and listed in a Returns report; they do not post a credit note or stock entry to Tally. Deliveries are recorded in the phone app, and nothing reaches Tally until the office approves it.',
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
    headline: 'Record production on the floor, and Tally gets the journals without anyone keying them.',
    subheadline:
      "Today the output goes on a slip, the godown gets a call before each batch, and the accountant keys every Manufacturing Journal, Material Out and Material In at the Tally computer. Takkada works from the BOMs already in your Tally, checks stock before a run and posts those vouchers from the phone.",
    answerPoints: [
      'Components checked against the godown before a run, with shortages marked',
      'One run posts a Manufacturing Journal for each in-house level, in order',
      'A production order received into stock with its item, BOM and quantity filled in',
      'Job-work challans that start from the order, going out and coming back',
    ],
    // 57 words.
    answer:
      "Manufacturing in Tally Prime runs on Manufacturing Journals that someone keys at the Tally computer. With Takkada's Manufacturing add-on the floor records the run on a phone: it reads your Tally BOMs, flags short components, and posts one Manufacturing Journal per in-house step to Tally. Job work goes out and back on challans filled from the order.",
    waContext: 'feature-manufacturing-in-tally-prime',
    waMessage:
      'Hi, our production is keyed into Tally days after it happens. Can you show me how Takkada records BOMs, production runs and job work into Tally?',
    seo: {
      title: 'Manufacturing in Tally Prime: BOM, Production, Job Work',
      description:
        'Manufacturing in Tally Prime from the floor: stock checked before a run, Manufacturing Journals posted per level, and job-work challans filled from the order.',
    },
    llms: {
      section: 'Features',
      title: 'Manufacturing in Tally Prime',
      summary:
        'Manufacturing add-on for Tally Prime businesses: multi-level bills of materials per item with components, by-products, co-products, scrap percentage and godowns, written back to the item in Tally; an Explosion view of raw materials for any quantity; production runs that flag short components and post one Manufacturing Journal per in-house step; production orders with due dates and reported rejects; job work out with charges per unit, a Section 143 challan, Material Out and Material In. Needs a Manufacturing Journal voucher type in Tally. Job work for a principal is not sent to Tally.',
    },
    footerLabel: 'Manufacturing',
    hero: { screen: 'manufacturing-production-run' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for businesses that make what they sell",
      cases: [
        {
          who: "A small factory making to order",
          today: "Output goes on a slip, and the accountant keys each Manufacturing Journal at the Tally computer.",
          with: "Whoever runs the line records the run on the phone the day it is made, and the journals reach Tally.",
        },
        {
          who: "A product made in stages",
          today: "One Manufacturing Journal per level, keyed by hand in the right order.",
          with: "One run posts a Manufacturing Journal for each in-house level, in order.",
        },
        {
          who: "A business that sends work to job workers",
          today: "Job Work Out Order, Material Out and Material In are each keyed with their items.",
          with: "Material Out and Material In start filled from the job-work order, and the challan prints under Section 143.",
        },
      ],
      stops: [
        "Keying Manufacturing Journals from slips",
        "Calling the godown before every batch",
        "Keying job-work challans item by item",
        "Keeping a whiteboard of what to make next",
      ],
    },
    walkthroughHeading: 'From the BOM in your Tally to the journal in your Tally',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'The BOM your Tally already has',
        body:
          'BOMs already set on your items in Tally come into the app, and a BOM edited in the app is written back to the item in Tally, so the office and the floor read one recipe. An item can carry several BOMs over as many levels as you make it in, and a line is a component, by-product or co-product with its own godown.',
        screen: 'manufacturing-bom',
      },
      {
        icon: 'PackageCheck',
        title: 'Stock checked before the batch starts',
        body:
          'Pick what you are making and how many. Each component shows what is on hand and says Short when the godown cannot cover it, before anything is saved, so nobody calls the godown to ask. A run received from a production order opens with its item, BOM and the quantity still to receive already filled.',
        screen: 'manufacturing-run-short-check',
      },
      {
        icon: 'FileCheck2',
        title: 'Every level becomes its own Manufacturing Journal',
        body:
          'In Tally alone, a product made in three levels usually means three Manufacturing Journals, keyed in order. Save the run and each in-house level becomes one, components out and the finished item in. Here level 1 of run 2 is SJ-38, reading Sync: pending until your Tally computer takes it in; the run then marks the step In Tally with its number.',
        screen: 'manufacturing-production-run',
      },
      {
        icon: 'Truck',
        title: 'Job work out and back, nothing typed twice',
        body:
          "Send material starts from the order's components, and Record receipt starts from what is still due, with the components used worked out in proportion. The challan prints under Section 143 of the CGST Act. The Job Work Out Order, Material Out and Material In then reach Tally in that order.",
        screen: 'manufacturing-job-work',
      },
    ],
    comparison: {
      heading: 'A week of production, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Recording what was made',
          takkada: 'On the phone, by whoever runs the line, the day it is made.',
          others: 'Written on a slip, then keyed at the Tally computer as a Manufacturing Journal.',
        },
        {
          feature: 'A product made in levels',
          takkada: 'One run. A Manufacturing Journal per level goes to Tally in order, stopping at the first failure.',
          others: 'One Manufacturing Journal per level, keyed by hand in the right order.',
        },
        {
          feature: 'Enough components for the batch',
          takkada: 'Each component shows On hand, and Short when the godown cannot cover it, before the run is saved.',
          others: 'Checked with a call to the godown before the batch starts.',
        },
        {
          feature: 'Planning the work',
          takkada: 'Production orders with due dates, requests from the team and rejects reported. Receiving one opens the run already filled.',
          others: 'A whiteboard or a sheet kept beside Tally.',
        },
        {
          feature: 'Job work out and back',
          takkada: 'Material Out and Material In start filled from the job-work order, and the challan prints under Section 143.',
          others: 'Job Work Out Order, Material Out and Material In, each keyed with its items.',
        },
        {
          feature: 'The bill of materials',
          takkada: 'The same BOM, read from your Tally. An edit made in the app goes back to the item.',
          others: 'Set on the stock item at the Tally computer.',
        },
      ],
      disclaimer:
        'Takkada posts into the Manufacturing Journal voucher type your Tally already has and does not create one. Job work you do for a principal stays in the app and is not sent to Tally, and a journal or challan already in Tally is not changed from the app.',
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
        q: 'What does my accountant still do in Tally?',
        a: 'Set up the Manufacturing Journal voucher type once, keep the Tally computer and its connector running so the journals land, and cancel a journal in Tally if a run was wrong. The journals, job-work vouchers and BOM edits arrive from the app without anyone keying them.',
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
    headline: 'Proforma, service bills and bookings, each on its own number series in Tally, set up from your phone.',
    subheadline:
      'Today a new kind of bill means a session at the Tally computer: the voucher type, its parent, its numbering, its prefix, and a check that no number collides with one used this year. Voucher names does it from Settings on the phone, and asks your staff which type to use when they start a bill.',
    answerPoints: [
      'A new voucher type made in Tally without a visit to the Tally computer',
      'A prefix checked against the numbers your Tally already used this year',
      'Rename once, and Tally follows with the series running on',
      'Staff pick the type when they start the bill',
    ],
    // 58 words.
    answer:
      "A custom voucher type in Tally, such as Proforma or Service Invoice under Sales, is usually set up at the Tally computer. Takkada's Voucher names add-on does it from the app: type the name and a number prefix, tap Create in Tally, and the type appears in Tally with manual numbering, duplicates blocked and its own series.",
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
    hero: { screen: 'voucher-names-list' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for businesses with more than one kind of bill",
      cases: [
        {
          who: "A business that sends proforma invoices",
          today: "Proformas are typed outside Tally, or share a series with the real bills.",
          with: "Proforma Invoice gets its own name and number series in Tally, made from the phone.",
        },
        {
          who: "A business that bills goods and services",
          today: "A new series for service bills waits for a session at the Tally computer.",
          with: "Service Invoice gets its own prefix, checked against the numbers your Tally already used this year.",
        },
        {
          who: "An owner who is rarely at the Tally computer",
          today: "Every new kind of bill waits until the owner or the accountant sits at that computer.",
          with: "The admin creates it from Settings on the phone, and staff are asked which type to use when they start a bill.",
        },
      ],
      stops: [
        "Waiting for a session at the Tally computer to add a bill type",
        "Checking by hand that a new prefix has not been used this year",
        "Telling each staff member which series to use for which bill",
      ],
    },
    walkthroughHeading: 'From a new name to a numbered bill in Tally',
    walkthrough: [
      {
        icon: 'FileCheck2',
        title: 'Name it, give it a prefix',
        body:
          'In Settings, Custom voucher names, pick the document, type the name and a number prefix, and the screen shows what the first one will be numbered: VB-1 for Vehicle Booking. Sales and purchase names can carry their own ledger.',
        screen: 'voucher-names-list',
      },
      {
        icon: 'ShieldCheck',
        title: 'Created in Tally, under the right parent',
        body:
          'At the Tally computer this means Create, Voucher Type, then a parent, a numbering method and Prevent duplicates. Create in Tally does it for you under the base type for that document, even if you renamed the base, with manual numbering and duplicates prevented. The type stays switched on, so staff keying in Tally can use it too.',
        screen: 'voucher-names-create-in-tally',
      },
      {
        icon: 'ListChecks',
        title: 'Its own series, with no clashes',
        body:
          'A prefix has to be unique and cannot clash with numbers your Tally vouchers already use this year. Rename a type and the numbers keep running: VB-1, VB-2, then VB-3 under the new name.',
        screen: 'voucher-names-series',
      },
      {
        icon: 'CheckCheck',
        title: 'Pick it when you bill',
        body:
          'With one name for a document it is used on its own. With several, a new sales invoice asks which one. Lists show each bill\'s type with filter chips, and the PDF keeps Tax Invoice as its title with the type name printed under it.',
        screen: 'voucher-names-pick-at-billing',
      },
    ],
    comparison: {
      heading: 'A new kind of bill, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Who can set up a new bill type',
          takkada: 'The owner or admin, from Settings on the phone, wherever they are. Takkada creates it in Tally.',
          others: 'Someone at the Tally computer, under Create, Voucher Type, who knows its settings.',
        },
        {
          feature: 'Number series',
          takkada: 'A prefix per name, checked against the numbers your Tally vouchers already use this year.',
          others: 'Set inside the voucher type by whoever creates it, and checked for clashes by them.',
        },
        {
          feature: 'Renaming',
          takkada: 'Once, in the app. Tally follows, old bills show the new name and the numbers keep running.',
          others: 'Altered in the voucher type at the Tally computer.',
        },
        {
          feature: 'Staff using the right series',
          takkada: 'Asked which type when a bill is started, from the names you set up.',
          others: 'Told which type to pick, then picked in voucher entry at the Tally computer.',
        },
      ],
      disclaimer:
        'Tally Prime has always let you add voucher types. Voucher names creates them from the app and keeps the app and Tally on the same names and the same series. A type, once made, stays in Tally; it can be hidden from new bills, never deleted.',
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
    headline: 'Your billing staff type at Tally speed from any office computer with a browser.',
    subheadline:
      "Today billing waits for a seat at the computer that runs Tally, and an order a salesman took on his phone gets typed in again. Desktop Entry puts a Tally-style form in the browser, F8, Enter and Ctrl+A included, and each bill reaches your Tally through the same save the phone app uses.",
    answerPoints: [
      "Tally's keys in the browser: F8, F9, Enter, Ctrl+A and Alt+C",
      'A second billing desk without a second seat at the Tally computer',
      'Alt+O pulls what is still pending on an order or challan into the bill',
      'Every save reaches Tally the same way a phone entry does',
    ],
    // 57 words.
    answer:
      "Desktop billing for Tally is what Takkada's Desktop Entry add-on does: a keyboard-first entry form in the computer browser at app.takkada.com, so billing no longer waits for a seat at the Tally computer. Type the party, Enter through item, quantity and rate, press Ctrl+A to save. Each entry posts to Tally the same way phone entries do.",
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
    hero: { screen: 'desktop-entry-invoice' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for offices with more billing than one Tally computer can take",
      cases: [
        {
          who: "A billing desk that queues for the Tally computer",
          today: "Bills wait while the one computer running Tally is in use.",
          with: "A second person bills from any office computer with a browser, and every bill reaches your Tally.",
        },
        {
          who: "Salesmen who book orders on the phone",
          today: "The office types each order again into the bill.",
          with: "Alt+O pulls the quantity still open on the order straight into the bill.",
        },
        {
          who: "Billing staff trained on Tally's keys",
          today: "Their speed stays tied to the Tally computer.",
          with: "F8, F9, Enter, Ctrl+A and Alt+C work the same in the browser, so there is nothing new to learn.",
        },
      ],
      stops: [
        "Waiting for a turn at the Tally computer",
        "Retyping salesman orders into bills",
        "Training staff on a new billing screen",
      ],
    },
    walkthroughHeading: 'One bill, typed the Tally way',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Type it the way Tally taught you',
        body:
          'F8 lists the sales vouchers and F9 the purchase ones, Option 8 and Option 9 on a MacBook. Enter moves to the next field, Shift+Tab goes back, Esc backs out. F2 changes the date, and Alt+C makes a new party or item without leaving the bill.',
        screen: 'desktop-entry-invoice',
      },
      {
        icon: 'Link2',
        title: 'Pull the order into the bill',
        body:
          "Alt+O brings in what is still pending on a sales order, challan, quotation, purchase order or goods receipt, so an order a salesman booked on his phone is never typed again. Only the open quantity is offered and it is checked again at save, so nothing is billed twice. Alt+2 copies the party's last invoice.",
        screen: 'desktop-entry-pull-order',
      },
      {
        icon: 'CheckCheck',
        title: 'Save, then the next step',
        body:
          'Ctrl+A saves. The form clears for the next bill and a strip shows the number just saved, with keys to view, print, send or cancel it, and a button for the next document, such as the receipt.',
        screen: 'desktop-entry-saved-strip',
      },
      {
        icon: 'ShieldCheck',
        title: 'Into Tally like any other entry',
        body:
          'A desktop save runs the same save the phone runs, so numbering, approvals and the write into Tally behave the same. A half-typed bill survives a closed or crashed browser tab for seven days.',
        screen: 'desktop-entry-restored-draft',
      },
    ],
    comparison: {
      heading: 'A day at the billing desk, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Where billing happens',
          takkada: 'Any computer with Chrome or Safari, a wide window and a mouse, at app.takkada.com.',
          others: 'At a computer running Tally, or over a remote session into it.',
        },
        {
          feature: 'A second person billing',
          takkada: 'Bills at the same time from another computer, while Tally keeps running on its own.',
          others: 'Waits for the Tally computer, or works over a remote session into it.',
        },
        {
          feature: 'An order booked on the phone',
          takkada: 'Pulled into the bill with Alt+O, only the quantity still open, checked again at save.',
          others: 'Typed in again from the salesman\'s message or slip.',
        },
        {
          feature: 'Learning the screen',
          takkada: 'Nothing new: F8, F9, Enter, Esc, Ctrl+A and Alt+C work as they do in Tally.',
          others: 'Learned once, and usable only at the computer running Tally.',
        },
      ],
      disclaimer:
        'Desktop Entry runs in the browser and writes to the Tally on your office computer through its connector, so that computer stays on. Web view, which comes with Assurance, shows the phone screens in a browser; Desktop Entry brings the computer layout and opens the browser by itself.',
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
    headline: 'Where your salesmen went today, on one map, before the evening call.',
    subheadline:
      "Tally holds the orders and receipts your salesmen bring back; where they went and how far is whatever they say on the evening call. Live Tracking records location only between Start day and End day on the salesman's Android phone, and lays his route beside his orders and receipts.",
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
        'Salesman location tracking during the working day only: Start day to End day on Android, a Team Map with last seen, battery and km. Nothing after hours.',
    },
    llms: {
      section: 'Features',
      title: 'Salesman location tracking app (Live Tracking)',
      summary:
        "Live Tracking add-on: a Start day / End day duty window on the salesman's Android phone records location and battery every 2, 5, 10 or 15 minutes (or every 200 m), with a notification showing the whole time and an automatic stop time. The Team Map shows who is on duty, last seen, battery, km today and who stopped reporting; a day view shows the route, gaps, check-in pins, orders and receipts. Offline points queue for 48 hours. Android only, never iPhone; the map also opens in a computer browser with Web view. Locations kept 90 days.",
    },
    footerLabel: 'Live tracking',
    hero: { screen: 'live-tracking-map' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for businesses with salesmen in the field",
      cases: [
        {
          who: "A distributor with a team on beats",
          today: "Where they went is whatever they say on the evening call.",
          with: "The Team Map shows who is on duty, where each was last seen and his battery, refreshed every minute.",
        },
        {
          who: "A business that pays travel by the kilometre",
          today: "Kilometres come from the salesman's own claim.",
          with: "Kilometres are counted per day from his route, and shown to him at End day.",
        },
        {
          who: "An owner who wants orders matched to visits",
          today: "Orders reach Tally with nothing to say where they were taken.",
          with: "The day view lays his route, check-in pins, orders and receipts side by side.",
        },
      ],
      stops: [
        "Calling each salesman to ask where he is",
        "Paying travel claims with nothing to check them against",
        "Finding out a phone went quiet only when he does not pick up",
      ],
    },
    walkthroughHeading: 'One working day, from Start day to End day',
    walkthrough: [
      {
        icon: 'MapPin',
        title: 'He starts the day, tracking starts',
        body:
          'The home screen carries a Start your day card. The first time, he sees what is recorded and agrees to it. From Start day to End day the phone reports where it is, and a notification stays on the whole time, so nothing runs out of sight.',
        screen: 'live-tracking-start-day',
      },
      {
        icon: 'LayoutGrid',
        title: 'The Team Map, refreshed every minute',
        body:
          'Pins for everyone on duty, and a line per person with when they were last seen, the battery left and the kilometres covered today. Anyone silent for twenty minutes reads Stopped reporting, and Day ended or Never started today covers the rest.',
        screen: 'live-tracking-map',
      },
      {
        icon: 'Route',
        title: 'His day, drawn out',
        body:
          'Tap a name for the day: the route on the map, the gaps where the phone went quiet, the check-in pins, and the orders and receipts he made, including the ones keyed in Tally. End day tells the salesman how many kilometres he covered.',
        screen: 'live-tracking-day',
      },
      {
        icon: 'Clock',
        title: 'Rules you set',
        body:
          'The admin picks how often the phone reports, every 2, 5, 10 or 15 minutes, and the time tracking stops by itself if nobody ends the day. Below 15% battery the phone reports less often. Locations are kept for 90 days.',
        screen: 'live-tracking-rules',
      },
    ],
    comparison: {
      heading: "One salesman's day, by phone call and with Live Tracking",
      takkadaLabel: 'With Live Tracking',
      othersLabel: 'Calls and WhatsApp',
      rows: [
        {
          feature: 'Where he is now',
          takkada: 'A pin on the Team Map, refreshed every minute, with the battery left on his phone.',
          others: 'Asked on a phone call, or a WhatsApp location if he sends one.',
        },
        {
          feature: 'Kilometres covered',
          takkada: 'Counted per day, shown on the map and to him at End day.',
          others: 'Whatever he writes on his travel claim.',
        },
        {
          feature: 'His orders and receipts',
          takkada: 'On the same day view as his route and check-in pins, including entries keyed in Tally.',
          others: 'In Tally once keyed, with nothing to say where he was.',
        },
        {
          feature: 'When it records',
          takkada: 'Only between Start day and End day, with a notification on his phone the whole time.',
          others: 'Whenever he chooses to share.',
        },
        {
          feature: 'A phone that went quiet',
          takkada: 'Marked Stopped reporting after twenty minutes without a location.',
          others: 'Found out when he does not pick up.',
        },
      ],
      disclaimer:
        'Tally keeps the books and was never meant to record where a salesman went. Live Tracking records on Android phones only, includes visit check-in and check-out, writes nothing to Tally, and keeps locations for 90 days.',
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
    headline: 'Customers who ask for invoices by email get them with each automatic WhatsApp send.',
    subheadline:
      "The purchase desk of a chain reads email before WhatsApp, and today each invoice, reminder and statement it wants is e-mailed by hand from the Tally computer. With Email on, the invoice PDF, the reminder and the statement that go out on WhatsApp reach the inbox too, from the same automatic send.",
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
    hero: { screen: 'email-invoices' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for businesses whose customers read email",
      cases: [
        {
          who: "A distributor supplying chains and modern trade",
          today: "Their purchase desk wants invoices by email, sent by hand from the Tally computer.",
          with: "The invoice PDF goes by email with each automatic WhatsApp send, with nobody at the office.",
        },
        {
          who: "Customers who miss WhatsApp messages",
          today: "Reminders go unread and someone follows up by phone.",
          with: "Reminders and statements also reach their inbox with a Pay now link, and still go if the WhatsApp message fails.",
        },
        {
          who: "An owner who wants a record of what went out",
          today: "Sent mail sits in one mailbox on the Tally computer.",
          with: "Your business email gets a copy of each one, and replies come back to it.",
        },
      ],
      stops: [
        "Emailing invoices one by one from the Tally computer",
        "Sending reminders and statements by hand",
        "Typing a customer's email address into each mail",
      ],
    },
    walkthroughHeading: 'One send, on WhatsApp and in the inbox',
    walkthrough: [
      {
        icon: 'Send',
        title: 'The invoice reaches the inbox',
        body:
          'When Auto Invoice Dispatch sends an invoice on WhatsApp, the same invoice goes by email with the PDF attached. It is sent as your company name via Takkada, and a copy goes to your business email.',
        screen: 'email-inbox-invoice',
      },
      {
        icon: 'CalendarClock',
        title: 'Reminders and statements, with Pay now',
        body:
          'Due and overdue reminders and ledger statements carry the same words as the WhatsApp message, plus a Pay now link. If the WhatsApp message fails or the number has blocked you, the email still goes.',
        screen: 'email-inbox-reminder',
      },
      {
        icon: 'BookOpen',
        title: 'The address comes from Tally',
        body:
          "Takkada reads the email on the party ledger in Tally. If one is missing, add it on the party's Email card in the app; it is written back into Tally, so the next sync keeps it.",
        screen: 'email-party-card',
      },
      {
        icon: 'ListChecks',
        title: 'See what went out',
        body:
          'Settings, Email shows the name it is sent as, where copies and replies go, how many of your customers have an email address, and the emails sent most recently.',
        screen: 'email-invoices',
      },
    ],
    comparison: {
      heading: 'Email to customers, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Sending the invoice',
          takkada: 'Automatic, with the WhatsApp send from Auto Invoice Dispatch, PDF attached.',
          others: 'E-mailed from the voucher by somebody at the Tally computer, once mail is set up there.',
        },
        {
          feature: 'Reminders and statements',
          takkada: 'Each scheduled reminder and statement, emailed with a Pay now link.',
          others: 'Sent by hand from the office.',
        },
        {
          feature: 'Who has to be at the office',
          takkada: 'Nobody. The email goes with the automatic WhatsApp send.',
          others: 'Somebody at the Tally computer, for every email.',
        },
        {
          feature: 'A customer who misses WhatsApp',
          takkada: 'The email still goes, even if the WhatsApp message fails or the number has blocked you.',
          others: 'Followed up by phone once somebody notices.',
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
    headline: 'The vouchers your accountant parked for your word, checked and posted from your phone.',
    subheadline:
      'Today the accountant marks a voucher optional in Tally, reads it out to you on the phone, waits for your word, then opens it again and makes it regular. Tally Drafts lists those vouchers on your phone, and one tap turns the same voucher regular in Tally.',
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
    hero: { screen: 'tally-drafts' },
    author: 'founder',
    datePublished: '2026-11-05',
    updated: '2026-11-06',
    useCases: {
      heading: "Made for owners who sign off on vouchers",
      cases: [
        {
          who: "An owner who checks big entries before they count",
          today: "The accountant reads the voucher out on the phone and waits for a yes.",
          with: "You see the party, amount and ledger lines on the phone and post it with one tap.",
        },
        {
          who: "An accountant who parks doubtful entries as optional",
          today: "Optional vouchers wait in the Optional Vouchers report until someone is at the Tally computer.",
          with: "Every optional voucher shows on the phone by type, waiting for a decision.",
        },
        {
          who: "A business with several people keying vouchers",
          today: "Making a voucher regular needs a Tally login at the Tally computer.",
          with: "Who can post is set per voucher type, with approvals if you use them.",
        },
      ],
      stops: [
        "Reading vouchers out over the phone",
        "Opening each optional voucher again at the Tally computer to make it regular",
        "Chasing the owner for a yes",
      ],
    },
    walkthroughHeading: 'From a draft in Tally to an entry in the books',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Every draft, in one list',
        body:
          'Tally Drafts opens on four tabs: Drafts, In progress, Posted and Rejected. Chips narrow it to sales, purchases, receipts, payments, notes, journals, contra, stock, challans, goods receipts or purchase orders, for this financial year unless you ask for older.',
        screen: 'tally-drafts',
      },
      {
        icon: 'FileCheck2',
        title: 'Check it where you are',
        body:
          'Each draft shows the voucher type, party, amount, date, the debit and credit ledger lines and the narration. If the accountant changes it in Tally after you looked, the post stops and the new figures are shown.',
        screen: 'tally-drafts-detail',
      },
      {
        icon: 'CheckCheck',
        title: 'Post it, and Tally makes it regular',
        body:
          'Approve on the list posts it in one tap; Post to books on the detail asks first. The same voucher in Tally turns regular, with no second copy made, and nobody opens it again at the Tally computer. A posted draft cannot be undone from the app.',
        screen: 'tally-drafts-post',
      },
      {
        icon: 'ShieldCheck',
        title: 'Reject without touching Tally',
        body:
          'Reject only sets it aside in the app, with Undo offered, and Tally stays as it was. Posting follows your team permissions: a member sees only the voucher types they may view and posts only the ones they may create.',
        screen: 'tally-drafts-reject',
      },
    ],
    comparison: {
      heading: 'An optional voucher, in Tally alone and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally alone',
      rows: [
        {
          feature: 'Seeing pending drafts',
          takkada: 'A list on the phone, by voucher type and status.',
          others: 'The Optional Vouchers report at the Tally computer, or a call from the accountant.',
        },
        {
          feature: 'Checking one',
          takkada: 'Party, amount, ledger lines and narration, on the phone.',
          others: 'Opened in Tally, or read out over the phone.',
        },
        {
          feature: 'Posting one',
          takkada: 'One tap. The same voucher turns regular in Tally, with no second copy.',
          others: 'Opened in Tally again, marked regular and saved.',
        },
        {
          feature: 'Who can post',
          takkada: 'Set per voucher type, with approvals if you use them.',
          others: 'Whoever has the Tally login.',
        },
        {
          feature: 'Rejecting one',
          takkada: 'Set aside in the app with Undo, and nothing changes in Tally.',
          others: 'Deleted in Tally, or left sitting in the Optional Vouchers report.',
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
