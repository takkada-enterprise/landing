// Schemes and discount pages (2026-09-25). Same engine and same contract as
// the other batches; read the header of src/data/featurePages.js first.
//
// Four pages, one group on the hub and in the header menu ("Schemes and
// discount", src/data/featureGroups.js). Copy is grounded in the app:
//   fmcg-module-tally        lib/models/stock_item_billing_config.dart,
//                            lib/utils/billing_break_even_calculator.dart
//   autoparts-billing-tally  lib/models/autoparts_config.dart,
//                            lib/utils/autoparts_stock_display.dart
//   ladder-discount-tally    lib/utils/ladder_discount.dart
//   schemes-tally            lib/models/scheme_catalogue_models.dart,
//                            lib/services/scheme_catalogue_service.dart
//
// Claims discipline: every one of these is sold as a paid add-on and the
// add-on price is NOT on the public rate card, so no page names a figure and
// planPointer points at the lowest plan with voucher creation (Momentum).
// If any of the four is still stage-only on the day this merges, add its slug
// to HELD_PAGES in src/data/__tests__/feature-pages.test.js with the reason.
//
// Every screen named here is a demo-company capture exported through
// scripts/exportScreens.mjs from mockups/ (see handoff README). None carries a
// phone number, GSTIN or real party.

/** @type {import('./featurePages').FeaturePage[]} */
export const SCHEMES_DISCOUNT = [
  {
    slug: 'schemes-tally',
    searchPhrase: 'scheme management for Tally',
    overline: 'SCHEMES',
    headline:
      'Scheme management for Tally. Buy 10 get 1 free, written once, applied on every bill that qualifies.',
    subheadline:
      "The company's scheme letter lives in the app, not in the salesman's memory. When a party's bill crosses the line, the free quantity or the slab discount is added by itself, and the month-end report says what each scheme cost.",
    // 60 words.
    answer:
      'Scheme management for Tally in Takkada covers four kinds of billing-time offer: buy X get X free, buy X get Y free, quantity slab and invoice value discount. Each is set once with its items, parties and dates. The cart adds the free line or the slab percentage while the salesman bills, and a report totals what each scheme cost.',
    waContext: 'feature-schemes-tally',
    waMessage:
      'Hi, my companies run buy X get Y and slab schemes and my salesmen apply them by memory. Can you show me how schemes work in Takkada and how the free items reach Tally?',
    seo: {
      title: 'Scheme Management for Tally Distributors | Takkada',
      description:
        'Buy X get Y free, quantity slab and invoice value schemes set up once, applied by the app while the salesman bills, and reported by cost per scheme and party.',
    },
    llms: {
      section: 'Features',
      title: 'Schemes on Tally billing',
      summary:
        'Four kinds of billing-time scheme for distributors on Tally: buy X get X free, buy X get Y free, quantity slab discount and invoice value discount. Set up once with items, parties and dates; applied automatically in the cart; the free item reaches Tally as a zero-rate line; a Scheme cost report totals what each scheme gave away per party.',
    },
    footerLabel: 'Schemes',
    hero: { screen: 'scheme-free-noodles' },
    author: 'founder',
    datePublished: '2026-09-25',
    updated: '2026-09-25',
    walkthroughHeading: 'Write the scheme once, bill it a hundred times',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Four kinds, set up from Settings',
        body:
          'Buy X get X free. Buy X get Y free. Quantity slab discount. Invoice value discount. Name it, pick the items or a stock group, choose all parties, a party group or a picked list, and set the dates it runs. A switch turns it off without deleting it.',
        screen: 'scheme-list-kinds',
      },
      {
        icon: 'PackageCheck',
        title: 'The cart applies it while the salesman types',
        body:
          'Quantity crosses 10 and a read-only free line appears under the item, marked Free, Buy 10 get 1. Quantity crosses a slab and the line reads Scheme: Slab 4% with the benefit shown on the line. Tap the tag to remove the scheme from this one invoice.',
        screen: 'scheme-free-rice',
      },
      {
        icon: 'BarChart3',
        title: 'The Scheme cost report says what it cost',
        body:
          "One row per scheme per party for any period: invoices, free quantity and the value given away. The total at the bottom is the number to put against the company's scheme claim.",
        screen: 'scheme-slab-applied',
      },
    ],
    comparison: {
      heading: 'Schemes on the phone, against the scheme letter on the wall',
      othersLabel: 'Tally on the office desktop',
      rows: [
        {
          feature: 'Free goods on a qualifying bill',
          takkada: 'Added as a zero-rate line the moment the quantity qualifies.',
          others: 'The salesman remembers, or the retailer reminds him.',
        },
        {
          feature: 'Slab discounts by quantity or bill value',
          takkada: 'Slabs typed once; the right percentage lands on the line by itself.',
          others: 'A printed table and a discount typed by hand per line.',
        },
        {
          feature: 'Which parties get it',
          takkada: 'All parties, a Tally ledger group, or a picked list, per scheme.',
          others: 'Whoever asks for it.',
        },
        {
          feature: 'What the scheme cost this month',
          takkada: 'Scheme cost report, per scheme and party, with a total.',
          others: 'Free items hidden inside sales vouchers; a spreadsheet to find them.',
        },
      ],
      disclaimer:
        'Comparison describes a desktop-only Tally setup without a mobile companion. Your own workflow may differ.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Schemes is an add-on to any plan with invoice creation from the phone, which starts here. The add-on is priced on the demo call.',
    },
    faqs: [
      {
        q: 'How does the free item reach Tally?',
        a: 'As its own line on the sales voucher, with the free quantity and a rate of zero, so stock moves out in Tally the way it left the godown. The line description names the scheme, Free under Buy 10 get 1, so anyone reading the voucher later knows why it is there.',
      },
      {
        q: 'Can a salesman give a scheme to a party who does not qualify?',
        a: 'No. The scheme is worked out on the server from the party, the date and the lines; the phone only shows the answer. He can remove a scheme from an invoice, and he cannot add one. The save is checked again against the running schemes before the voucher is written.',
      },
      {
        q: 'What if two schemes apply to the same item?',
        a: 'The line shows both by name, for example Scheme: Diwali + Festival. For a buy X get Y free scheme, the value of one free item is set when the scheme is written, and it is used only to compare schemes when more than one could apply to the same line.',
      },
      {
        q: 'Do schemes apply on sales orders and credit notes?',
        a: 'Only on sales invoices. Orders and credit notes take no scheme pass, so a free quantity is never promised on an order that may be billed after the scheme ends, and a return never earns a free item or a slab discount of its own.',
      },
      {
        q: 'What happens to old bills when a scheme is archived?',
        a: 'Nothing. Archiving stops the scheme applying to new bills and takes it off the list. Bills already made keep their free lines and discounts, and the Scheme cost report still shows them for the period they were billed in.',
      },
    ],
    relatedPosts: [],
    priority: 0.8,
  },

  {
    slug: 'fmcg-module-tally',
    searchPhrase: 'MRP-based billing for Tally',
    overline: 'FMCG MODULE',
    headline:
      "MRP-based billing for Tally. From printed MRP to the retailer's rate, with a floor the salesman cannot cross.",
    subheadline:
      "Set MRP, the retailer's margin and two trade discounts once per item. Every bill prices itself from there, and the app says how much room is left before a line loses money.",
    // 58 words.
    answer:
      "MRP-based billing for Tally is what Takkada's FMCG module does: each stock item carries its printed MRP, the retailer's margin, two sequential trade discounts and an item-wise salesman commission. When a salesman bills, the rate comes down from MRP through the margin and both discounts. Any extra discount he types is checked against that line's break-even before saving.",
    waContext: 'feature-fmcg-module-tally',
    waMessage:
      'Hi, I distribute FMCG and my rates come from MRP, margin and trade discounts. Can you show me how the FMCG module prices a bill and stops a salesman going below break-even?',
    seo: {
      title: 'MRP-Based Billing for Tally Distributors | Takkada',
      description:
        "FMCG billing from the phone: MRP, retailer margin, D1 and D2 set once per item, the rate computed per line, and every extra discount checked against break-even.",
    },
    llms: {
      section: 'Features',
      title: 'FMCG module: MRP-based billing on Tally',
      summary:
        "MRP-driven billing for FMCG distributors on Tally. Each stock item carries printed MRP, retailer margin (a divisor), two sequential trade discounts (D1, D2) and an item-wise salesman commission. The rate is computed per line; any extra customer discount is checked against the line's break-even; Tally receives list rate and one discount percentage.",
    },
    footerLabel: 'FMCG module',
    hero: { screen: 'fmcg-margin-sheet' },
    author: 'founder',
    datePublished: '2026-09-25',
    updated: '2026-09-25',
    walkthroughHeading: 'One line on one bill, from the box to the book',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Set five numbers per item, once',
        body:
          "Printed MRP, retail margin, D1, D2 and the salesman's commission on that item. Set them by stock group in one screen, or on the item itself. The margin is the one the owner controls; the rest can be delegated.",
        screen: 'fmcg-config-bikaji',
      },
      {
        icon: 'Activity',
        title: 'The rate comes down on its own',
        body:
          "MRP divided by the margin gives the retailer's base rate. D1 and D2 come off after that, one after the other. The salesman adds the item and sees the billed rate without touching a calculator.",
        screen: 'fmcg-config-chocolates',
      },
      {
        icon: 'ShieldCheck',
        title: 'Extra discount is checked against break-even',
        body:
          'If the salesman offers something on top, the Item Discount sheet shows the maximum for that item and how much headroom is left. A line pushed past break-even is flagged before the bill is saved.',
        screen: 'fmcg-margin-sheet',
      },
    ],
    comparison: {
      heading: 'MRP-based billing on the phone, against Tally alone',
      othersLabel: 'Tally on the office desktop',
      rows: [
        {
          feature: 'Rate from MRP and margin',
          takkada: "Computed per line from the item's MRP, margin, D1 and D2.",
          others: 'A price list typed into a price level, redone when MRP changes.',
        },
        {
          feature: "A floor on the salesman's discount",
          takkada: 'Max % shown on the sheet; a line past break-even is flagged before save.',
          others: 'Found in the evening, when the bill is already with the retailer.',
        },
        {
          feature: 'Who may change the margin',
          takkada: 'Owner or admin only. Others see the field and its limit, disabled.',
          others: 'Whoever has the Tally machine open.',
        },
        {
          feature: 'Salesman commission on the line',
          takkada: 'Item-wise %, on the ex-GST value after discount, into Team Sales.',
          others: 'A month-end spreadsheet.',
        },
      ],
      disclaimer:
        'Comparison describes a desktop-only Tally setup without a mobile companion. Your own workflow may differ.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'The FMCG module is an add-on to any plan with invoice creation from the phone, which starts here. The add-on is priced on the demo call.',
    },
    faqs: [
      {
        q: 'Why is the margin divided and not subtracted?',
        a: "Because a retailer's margin is stated on his cost, not on MRP. A 20% margin means he sells at 100 what he bought at 83.33. Subtracting 20% would give him 80 and hand him 25%. The app uses the divisor so the number on the bill is the number you agreed.",
      },
      {
        q: 'What are D1 and D2?',
        a: 'Two trade discount stages applied one after the other, after the margin. Most FMCG structures have a scheme discount and a distributor discount; D1 and D2 hold those. Either can be left blank, and a blank stage is simply skipped when the rate is worked out.',
      },
      {
        q: 'What does the salesman see when he tries to give more?',
        a: 'The Item Discount sheet shows the maximum for the item as a hint and the headroom that remains after what he has typed. If his figure crosses break-even the line is marked, so the owner can see it on review before it posts to Tally.',
      },
      {
        q: 'Does the MRP go into Tally?',
        a: "The MRP is kept in Takkada against the stock item and is GST-inclusive, as printed on the pack. The voucher that reaches Tally carries the list rate and the discount percentage; Tally's own item master is not changed by the module.",
      },
    ],
    relatedPosts: [],
    priority: 0.8,
  },

  {
    slug: 'autoparts-billing-tally',
    searchPhrase: 'cost-plus pricing for Tally',
    overline: 'AUTOPARTS BILLING',
    headline:
      'Cost-plus pricing for Tally. The selling price follows the last purchase cost, plus your markup.',
    subheadline:
      'Parts have no MRP worth trusting and a cost that moves with every consignment. Price them from what they actually cost you, and let the bill update when the cost does.',
    // 59 words.
    answer:
      "Cost-plus pricing for Tally in Takkada's AutoParts billing reads each part's latest purchase cost from Tally, ex-GST and per base unit, and applies a markup set at the company, the stock group or the item, whichever is most specific. Two markups give two selling prices, one per price level, and the party's level decides which one the bill takes.",
    waContext: 'feature-autoparts-billing-tally',
    waMessage:
      'Hi, I sell auto parts and my selling price is cost plus a markup that differs by brand. Can you show me how AutoParts billing in Takkada handles price changes when a new consignment lands?',
    seo: {
      title: 'Cost-Plus Pricing for Tally: AutoParts Billing | Takkada',
      description:
        'Selling price from the last purchase cost in Tally plus a markup per company, group or item. Two price levels, and cost hidden from the counter.',
    },
    llms: {
      section: 'Features',
      title: 'AutoParts billing: cost-plus pricing on Tally',
      summary:
        "Cost-plus pricing for parts distributors on Tally. The latest purchase cost is read from Tally per base unit, ex-GST; a markup set at company, stock group or item level gives the selling price; a second markup gives a second price level. A Price Changes screen lists parts whose cost moved. Cost and markup are withheld from members without full access.",
    },
    footerLabel: 'AutoParts billing',
    hero: { screen: 'auto-inventory' },
    author: 'founder',
    datePublished: '2026-09-25',
    updated: '2026-09-25',
    walkthroughHeading: 'A consignment lands, the prices move, the bills follow',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Set the markup where it belongs',
        body:
          'One company default. A different figure on a stock group where the brand demands it. An override on the odd item. The most specific one wins, and an item can be excluded so the ordinary rate applies.',
        screen: 'auto-markup-setup',
      },
      {
        icon: 'Activity',
        title: 'Cost is read from the purchase, not typed',
        body:
          'The latest purchase voucher in Tally gives the per-unit cost, ex-GST. When a new consignment books at a new cost, the selling price recalculates and the Price Changes screen lists every part that moved and by how much.',
        screen: 'auto-price-changes',
      },
      {
        icon: 'Lock',
        title: 'Two levels, one per kind of customer',
        body:
          'A second markup gives a second selling price. Name the levels what you call them, assign each party to one, and the bill picks the right price without the salesman choosing. Cost and markup stay hidden from anyone without full access.',
        screen: 'auto-group-items',
      },
    ],
    comparison: {
      heading: 'Cost-plus on the phone, against the counter book',
      othersLabel: 'Tally on the office desktop',
      rows: [
        {
          feature: 'Selling price when cost changes',
          takkada: 'Recalculated from the new purchase; the change is listed part by part.',
          others: 'A price list edited by hand, usually a few consignments late.',
        },
        {
          feature: 'Different margins for different brands',
          takkada: 'Markup per stock group, with item overrides where needed.',
          others: "In the owner's head, or a separate price level per brand.",
        },
        {
          feature: 'Keeping cost away from the counter',
          takkada: 'Cost and markup withheld for anyone who is not full access.',
          others: 'Anyone at the Tally machine can open the purchase register.',
        },
        {
          feature: 'Why a bill was priced the way it was',
          takkada: 'Cost, markup and purchase date kept on the line, for the life of the invoice.',
          others: 'Reconstructed from memory when the customer asks.',
        },
      ],
      disclaimer:
        'Comparison describes a desktop-only Tally setup without a mobile companion. Your own workflow may differ.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'AutoParts billing is an add-on to any plan with invoice creation from the phone, which starts here. The add-on is priced on the demo call.',
    },
    faqs: [
      {
        q: 'Which purchase sets the cost?',
        a: "The most recent purchase voucher for that part in Tally, per base unit, ex-GST. If you buy the same part from several suppliers, a preferred supplier can be set so the cost follows that supplier's bills rather than whichever arrived last.",
      },
      {
        q: 'Can I keep some parts on a fixed rate?',
        a: 'Yes. An item can be excluded from AutoParts pricing, in which case it takes the ordinary rate from its Tally price level, whatever its stock group or the company default says. The exclusion is per item and can be lifted later.',
      },
      {
        q: 'Does an old invoice change when the cost changes?',
        a: "No. Each line stores the cost, markup and purchase date it was priced from. Reopening a saved invoice, sales order or challan shows the price it was billed at, not today's, so a customer's copy and yours always agree.",
      },
      {
        q: 'What does the salesman see?',
        a: "The selling price for the party's level, the unit and the GST basis. Cost and markup are withheld unless the member has full access; the app does not derive one from the other on the phone, so a screenshot of the cart gives nothing away.",
      },
    ],
    relatedPosts: [],
    priority: 0.8,
  },

  {
    slug: 'ladder-discount-tally',
    searchPhrase: 'ladder discount in Tally',
    overline: 'LADDER DISCOUNT',
    headline:
      'Ladder discount in Tally. 5% + 10% + 2% on the bill, 16.21% in the voucher, and both are right.',
    subheadline:
      'Your trade quotes discounts in steps. Tally takes one number. The ladder shows the steps to the customer and sends Tally the one number they add up to.',
    // 60 words.
    answer:
      'A ladder discount in Tally through Takkada is up to three named discount steps on an invoice line, applied one after the other. The app compounds them into a single aggregate percentage, rounded to two decimals, and that aggregate is the discount on the Tally voucher and the figure the taxable value is computed from. The PDF prints every step.',
    waContext: 'feature-ladder-discount-tally',
    waMessage:
      'Hi, my trade quotes discounts in steps like 10 + 5 + 2 and Tally takes one number. Can you show me how the ladder discount prints the steps and what reaches the voucher?',
    seo: {
      title: 'Ladder Discount in Tally from Mobile | Takkada',
      description:
        'Up to three discount steps on an invoice line, compounded into one aggregate that Tally takes, with each step and its price printed on the invoice PDF.',
    },
    llms: {
      section: 'Features',
      title: 'Ladder discount on Tally invoices',
      summary:
        'Stepped trade discounts for distributors on Tally. Up to three named discount steps per invoice line compound into a single aggregate percentage, rounded half-up to two decimals; the aggregate is what Tally receives and what the taxable value is computed from. The invoice PDF prints each step and the price after it. Works on sales orders too.',
    },
    footerLabel: 'Ladder discount',
    hero: { screen: 'ladder-cart' },
    author: 'founder',
    datePublished: '2026-09-25',
    updated: '2026-09-25',
    walkthroughHeading: 'Three steps on the line, one number in the book',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Type the steps as the trade says them',
        body:
          'Scheme 5%, then trade 10%, then cash 2%. Each step is its own field, 0 to 99.99, and a step you do not need stays blank. The line shows 5% + 10% + 2%, total 16.21%, as you type.',
        screen: 'ladder-sheet-filled',
      },
      {
        icon: 'CheckCheck',
        title: 'The aggregate owns the money',
        body:
          'The steps compound into one percentage, rounded half-up to two decimals. The taxable value, the GST and the total are all computed from that rounded aggregate, so the app, the database and Tally reach the same paisa.',
        screen: 'ladder-summary',
      },
      {
        icon: 'FileCheck2',
        title: 'The PDF shows the steps, Tally gets one cell',
        body:
          'The invoice PDF adds a column per step with the price after each, so the retailer can check it against the scheme letter. The voucher in Tally carries the list rate and 16.21 in the discount cell.',
        screen: 'ladder-step-names',
      },
    ],
    comparison: {
      heading: 'Stepped discounts on the phone, against Tally alone',
      othersLabel: 'Tally on the office desktop',
      rows: [
        {
          feature: 'Discount quoted in steps',
          takkada: 'Three fields on the line; the total is worked out and shown.',
          others: 'One discount column, so someone compounds on a calculator first.',
        },
        {
          feature: 'Rounding that matches Tally',
          takkada: 'Aggregate rounded half-up to two decimals in integer paise, as Tally does.',
          others: 'Correct in Tally; the spreadsheet beside it is often a paisa off.',
        },
        {
          feature: 'The retailer checking the bill',
          takkada: 'Each step and the price after it printed on the PDF.',
          others: 'A single percentage he has to trust or recompute.',
        },
        {
          feature: 'Reports and reconciliation',
          takkada: 'Read the aggregate, the same figure Tally holds.',
          others: 'Fine, once the compounded figure was typed correctly.',
        },
      ],
      disclaimer:
        'Comparison describes a desktop-only Tally setup without a mobile companion. Your own workflow may differ.',
    },
    planPointer: {
      plan: 'Momentum',
      note:
        'Ladder discount is an add-on to any plan with invoice creation from the phone, which starts here. The add-on is priced on the demo call.',
    },
    faqs: [
      {
        q: 'How many steps can a line have?',
        a: 'Up to three, each between 0 and 99.99%. Most trades use two. A blank step is skipped, and a line with no steps is an ordinary single-discount line, so the ladder costs nothing on items that do not need it.',
      },
      {
        q: 'Does Tally see three discounts?',
        a: "No. Tally's discount cell holds one two-decimal figure, and that is exactly what it receives. Sending three would need a customised Tally, and the aggregate reproduces the taxable value to the paisa without one.",
      },
      {
        q: 'What if my Excel gives a different total?',
        a: "On a half boundary, Excel's floating point often rounds down where Tally rounds up. 10% + 5% + 3% is the common case: Excel says 17.06, Tally and the app say 17.07. The app is built to agree with Tally, since that is where the voucher lives.",
      },
      {
        q: "Can the ladder be combined with the FMCG module's D1 and D2?",
        a: 'They solve different problems. The FMCG module sets the rate from MRP and margin per item; the ladder describes the discount on a line in steps. Which one a business uses depends on how its trade quotes prices, and the demo is the place to settle that for your setup.',
      },
    ],
    relatedPosts: [],
    priority: 0.8,
  },
];
