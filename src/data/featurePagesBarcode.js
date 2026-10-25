// Barcode labels page (2026-10-25). Same engine and same contract as the
// other batches; read the header of src/data/featurePages.js first.
//
// The search phrase is the one Google India autocompletes first for every
// barcode-plus-Tally seed on 2026-10-25 ("barcode in tally prime"), and the
// FAQs are the questions it completes most: can we use barcode in Tally, how
// to print barcode labels from Tally Prime, how to use a barcode scanner in
// Tally Prime, and the barcode TDL.
//
// Copy is grounded in the app (takkada origin/main, live on the web and in the
// 2026-10-21 store builds):
//   label code and quantity    lib/models/barcode_label.dart
//   sheet and roll sizes       lib/models/barcode_label_layout.dart
//   the printed sticker        lib/services/pdf/generators/barcode_label_sheet_generator.dart
//   scanning, batches, links   lib/widgets/barcode_labels/, lib/services/barcode_link_service.dart
//   the one-line help copy     lib/help/help_catalog.dart (topic barcode-labels)
//
// Claims discipline: Barcode labels is a paid add-on (feature key
// barcode_labels) on every plan, operator-confirmed 2026-10-25, and add-on
// prices never print on the site, so planPointer names the entry plan and the
// note sends the reader to a partner.
//
// The screens are NOT demo-company-143 captures. They were taken on stage demo
// companies, several are composites, and they ship on the operator's direction;
// each carries an honest unproven-backlog record in content/image-provenance.json.

/** @type {import('./featurePages').FeaturePage[]} */
export const BARCODE = [
  {
    slug: 'barcode-in-tally-prime',
    searchPhrase: 'barcode in Tally Prime',
    overline: 'BARCODE LABELS',
    headline: 'Barcode in Tally Prime, with the box quantity printed into every sticker.',
    subheadline:
      'Print stickers for what just came in, stick one on each box, and bill by scanning. One scan of a 6-carton box puts 6 cartons on the bill, and the bill reaches Tally like any other.',
    // 52 words.
    answer:
      'Barcode in Tally Prime works through Takkada without a TDL: print stickers from a purchase bill or an item, each carrying the item and the quantity in that box. Scan them into a sales bill, challan, GRN or stock journal with the phone camera, a Bluetooth gun or a USB gun. The voucher reaches Tally as usual.',
    waContext: 'feature-barcode-in-tally-prime',
    waMessage:
      'Hi, my staff type every item and quantity into Tally by hand. Can you show me how Takkada prints barcode stickers with the box quantity and bills by scanning?',
    seo: {
      title: 'Barcode in Tally Prime: Print Stickers, Scan to Bill',
      description:
        'Print barcode stickers with the box quantity from a purchase bill, then scan boxes into Tally bills with the phone camera or a barcode gun. No TDL to install.',
    },
    llms: {
      section: 'Features',
      title: 'Barcode labels on Tally',
      summary:
        'Barcode stickers for Tally Prime businesses, printed from a purchase bill, an item or a picked list of items, each encoding the item and the quantity in that box. Scanned into sales invoices, purchases, delivery challans, GRNs and stock journals with a phone camera, a Bluetooth scanner or a USB gun; batch, MRP and expiry can print on the label; a maker barcode can be linked to an item. Bills reach Tally as normal vouchers.',
    },
    footerLabel: 'Barcode labels',
    hero: { screen: 'barcode-scan-bill' },
    author: 'founder',
    datePublished: '2026-10-25',
    updated: '2026-10-25',
    walkthroughHeading: 'From the purchase bill to the box to the bill',
    walkthrough: [
      {
        icon: 'QrCode',
        title: 'Print from the purchase bill',
        body:
          'Open the purchase that just arrived and tap Print labels. Each line asks how many pieces go on one sticker and works out the count: 33 cartons at 6 a sticker is 6 stickers, with the last one saying 3. Print from one item, or tick several in the item list.',
        screen: 'barcode-purchase-print',
      },
      {
        icon: 'ListChecks',
        title: 'Batch, MRP and expiry on the label',
        body:
          'For an item kept batch-wise, each batch gets its own row and its own barcode. Switch on Show MRP, Show batch and Show dates, and the sticker carries the MRP, the batch number and the Mfg and expiry month, so the godown picks the right box.',
        screen: 'barcode-batch-options',
      },
      {
        icon: 'Camera',
        title: 'Scan the box, the quantity lands',
        body:
          'Tap the scan icon on a sales bill, challan, GRN or stock journal and point the phone camera, or use a Bluetooth gun. On the computer, a USB gun does the same job. Scan past what a batch holds and the app says how many are left.',
        screen: 'barcode-overstock',
      },
      {
        icon: 'Link2',
        title: "The maker's barcode works too",
        body:
          'A box that already carries a company EAN does not need a second sticker. Scan it once, tap Link to an item, pick the item and the quantity in that pack, and every later scan of that barcode adds it. Only a business admin can link a code.',
        screen: 'barcode-link-maker-code',
      },
      {
        icon: 'PackageCheck',
        title: 'Receive against the order by scanning',
        body:
          "Make the GRN from the purchase order and scan the boxes as they come off the truck. Each scan fills the received quantity, and the app tells you which ordered lines nobody scanned, so a short supply is caught at the gate, not at the supplier's next bill.",
        screen: 'barcode-grn-po',
      },
    ],
    sheet: {
      screen: 'barcode-sticker-sheet',
      overline: 'THE STICKER',
      heading: 'What prints on the sticker',
      body:
        'The item name, the quantity in that box, and a barcode that carries both. MRP, batch and dates when you switch them on, and the Tally part number above the bars when the item has one. A4 sheets of 10, 12, 24, 40 or 65 stickers, a thermal roll, or a custom size, from any printer your computer or phone can print to.',
    },
    comparison: {
      heading: 'Barcodes on top of Tally, against barcodes inside it',
      othersLabel: 'Tally Prime on its own',
      rows: [
        {
          feature: 'Printing barcode stickers',
          takkada: 'From a purchase bill, an item or a picked list, on A4 sheets or a thermal roll.',
          others: 'A barcode can sit in the item alias; the stickers come from a separate tool or a TDL.',
        },
        {
          feature: 'Quantity in one scan',
          takkada: 'The sticker carries the box quantity, so one scan adds the whole box.',
          others: 'A scan finds the item; the quantity is typed.',
        },
        {
          feature: 'Where the scanning happens',
          takkada: 'Phone camera, Bluetooth gun, or a USB gun on the computer.',
          others: 'A USB gun at the desk running Tally.',
        },
        {
          feature: 'Batch, MRP and expiry',
          takkada: 'Printed on the sticker, and the scan books the batch on the line.',
          others: 'Picked from the batch list on every line.',
        },
      ],
      disclaimer:
        'Comparison describes Tally Prime without a barcode add-on. A TDL or partner customisation may add some of this to your Tally.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Barcode labels is an add-on on every plan, starting here. Ask your partner for the add-on price.',
    },
    faqs: [
      {
        q: 'Can we use barcode in Tally?',
        a: 'Yes. Tally Prime can keep a barcode in the stock item alias and a USB scanner can type it into a voucher. What it does not do on its own is print sticker sheets or put the box quantity in the code. Takkada adds both on top of your Tally, and the bill still lands in Tally as a normal voucher.',
      },
      {
        q: 'How do I print barcode labels for Tally Prime items?',
        a: 'Open a purchase bill, an item, or tick several items in the item list, and tap Print labels. Set the pieces per sticker, pick the sheet size and the sticker to start from, so a half-used sheet is not wasted, and print. The phone app opens the print dialog, and on the computer it goes to your printer.',
      },
      {
        q: 'How do I use a barcode scanner with Tally Prime?',
        a: 'Any USB barcode gun that types like a keyboard works on the computer: scan into the bill and the line appears with its quantity. On the phone, pair a Bluetooth scanner or use the camera from the scan icon on the bill. Nothing needs to be installed in Tally for either.',
      },
      {
        q: 'Do I need a barcode TDL in Tally?',
        a: 'No. Nothing is installed inside Tally. Takkada keeps its own copy of your items and stock in step with Tally, prints the stickers from that, and writes the bills you scan back into Tally as ordinary vouchers. Your Tally setup, your TDLs and your partner customisations stay as they are.',
      },
      {
        q: 'Which printer and sticker paper do I need?',
        a: 'Any printer your computer or phone can print to. Pick A4 sticker sheets of 10, 12, 24, 40 or 65 labels, a thermal roll with its own label size, or type a custom size. The stickers are laid out to that sheet, so the barcode sits inside each label when it prints.',
      },
      {
        q: 'Can I scan the barcode already printed on the product?',
        a: "Yes, once it is linked. Scan the maker's barcode, tap Link to an item, and choose the item and how many pieces that pack holds. After that, every scan of that barcode adds that quantity. Linking is kept to the business admin, so a salesman cannot point a code at the wrong item.",
      },
    ],
    relatedPosts: [],
    priority: 0.8,
  },
];
