// Serial number tracking (2026-11-10): the Custom Fields add-on, on prod since
// the 11-09 release (app 2.1.326, backend migrations 20261050360100-361000)
// and switched on per company. One hub page and two spokes, IMEI for phone
// trade and chassis numbers for the vehicle trade. Same engine and same
// contract as the other batches; read the header of src/data/featurePages.js
// first.
//
// Every capability sentence traces to a claims sheet under
// docs/seo/feature-pages-custom-fields/<slug>-claims.md, copied from the
// Custom Fields claims table compiled 2026-11-10 (rows C1-C35) against takkada
// origin/main 73ac89bbd and prod (SELECT only). Nobody has used the add-on on
// prod yet (0 field sets, 0 units, 0 claims on 2026-11-10), so these pages
// describe the shipped app, carry no usage, and say every Tally sentence in
// the C25 wording: the sale goes to Tally through Takkada with each Unit no as
// the batch and the details in the description lines. Purchases are never
// said to carry details to Tally (C10), and never-twice is always "in
// Takkada", with a sale typed straight into Tally "matched after Takkada
// syncs" (C15, C27). Production runs always name the Manufacturing add-on.
// The add-on price is not decided and never prints, so each planPointer names
// the entry plan and the note sends the reader to a partner or to us.
//
// Screens: drawn from the Takkada app's own wording, not app captures (see
// their manifest rows): no company on prod or stage has a custom-field unit
// yet and demo co143 has no batch-wise items. A night capture on stage co7088
// replaces them.
//
// Prose says "colour"; the app's chips say "Color: Red", so a quoted chip
// keeps the app's spelling.

const PLAN_POINTER = {
  plan: 'Momentum',
  note: 'Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company.',
};

const SHARED = {
  author: 'founder',
  datePublished: '2026-11-10',
  updated: '2026-11-10',
  planPointer: PLAN_POINTER,
  priority: 0.8,
};

const POST = {
  pillar: {
    slug: 'serial-number-in-tally-prime-batch-method',
    title: 'Serial Number in Tally Prime: Track Each Unit with One Batch per Unit',
  },
  tdl: {
    slug: 'serial-number-tdl-tally-prime-alternative',
    title: 'Serial Number TDL for Tally Prime, or an App Beside Tally? A Fair Comparison',
  },
  printOnInvoice: {
    slug: 'print-serial-details-on-tally-invoice',
    title: 'How to Add Description in a Tally Prime Invoice: Chassis No, IMEI and Colour',
  },
  hinglish: {
    slug: 'tally-prime-mein-serial-number-imei-kaise-daale',
    title: 'Tally Prime Mein Serial Number Aur IMEI Kaise Daale (Batch Se)',
  },
  byColour: {
    slug: 'units-sold-by-colour-report-tally',
    title: 'Batch Wise Sales Report in Tally, and Units Sold by Colour or Model',
  },
  evAssembler: {
    slug: 'ev-assembler-battery-chassis-numbers-tally',
    title: 'EV Assemblers on Tally: Battery, Motor and Chassis Numbers Through Production',
  },
};

/** @type {import('./featurePages').FeaturePage[]} */
export const CUSTOM_FIELDS_PAGES = [
  {
    ...SHARED,
    slug: 'serial-number-tracking-tally',
    searchPhrase: 'Serial number tracking for Tally',
    overline: 'SERIAL NUMBER TRACKING',
    headline: 'Every unit you sell keeps its own serial number and details, from the purchase bill to the sale bill.',
    subheadline:
      'Tally can hold each unit as a batch named by its serial number, but the engine number, colour or battery number have to live in a register, and the clerk has to remember which numbers are already sold. The Custom Fields add-on keeps those details with every unit, offers only units still in stock, and prints them under the item on the bill.',
    answerPoints: [
      'One Tally batch per unit, named by its Unit no',
      'Your own fields per stock group: chassis no, IMEI, colour, anything',
      'Bills pick from units still in stock; no unit sold twice in Takkada',
      'Details print under the item on the sale bill',
    ],
    answer:
      "Serial number tracking for Tally means knowing every unit you buy and sell by its own number. With Takkada's Custom Fields add-on, each unit is a Tally batch named by its Unit no, with details like chassis no, IMEI or colour kept beside it. Bills offer only units still in stock, and the details print on the sale bill.",
    waContext: 'feature-serial-number-tracking-tally',
    waMessage:
      'Hi, we sell numbered units and keep the serial numbers in a register next to Tally. Can you show me the Custom Fields add-on and switch it on for our company?',
    seo: {
      title: 'Serial Number Tracking for Tally: Each Unit and Its Details',
      description:
        'Serial number tracking for Tally: each unit is a Tally batch named by its number, with chassis no, IMEI or colour kept from the purchase to the sale bill.',
    },
    llms: {
      section: 'Features',
      title: 'Serial number tracking for Tally',
      summary:
        "Custom Fields add-on for businesses on Tally that sell numbered units: the owner or an admin adds fields to a stock group (text, number, date or pick from a list; Must be filled; Print on the bill) and subgroups inherit them; one field is the Unit no, the batch name in Tally, so Maintain in batches must be on for those items; the purchase invoice, goods receipt, stock journal inward and sales return give one row per unit, with paste for a column of numbers and a flag for a number entered twice; sales orders, challans, invoices, debit notes and stock journals pick from units still in stock in that godown, searchable by any detail; no unit is sold twice, built into two products or booked on two orders in Takkada, and the refusal names the bill that holds it, while a sale typed straight into Tally is matched after Takkada syncs; units carry through order, challan, invoice and return conversions; details print under the item on the sales invoice, order, challan and note PDFs, and the sale goes to Tally through Takkada with each Unit no as the batch and the details in the description lines; Units by detail counts units sold or in stock by any field; Unit history shows one unit's steps with date, bill and party.",
    },
    footerLabel: 'Serial number tracking',
    hero: { screen: 'custom-fields-unit-picker' },
    useCases: {
      heading: 'Made for businesses that sell one numbered unit at a time',
      cases: [
        {
          who: 'A two-wheeler or EV dealer',
          today: 'Chassis and motor numbers live in a register, and the clerk copies them under the item on every bill.',
          with: 'The vehicle is picked from those in stock, and its numbers print on the bill from its own details.',
        },
        {
          who: 'A mobile and electronics distributor',
          today: 'A carton of 20 phones means 20 IMEIs typed one by one into the purchase.',
          with: 'Paste the column of IMEIs on the purchase bill, and each phone gets its own row.',
        },
        {
          who: 'A battery, inverter or solar dealer',
          today: 'When a customer brings a unit back, finding the bill it went out on means turning pages.',
          with: 'Type its number and see who bought it, on which bill and when.',
        },
      ],
      stops: [
        'Keeping serial numbers in a register next to Tally',
        'Typing serial numbers under the item on every bill',
        'Checking old bills before selling a unit',
        'Counting colours by hand at month end',
      ],
    },
    walkthroughHeading: 'One unit, from the purchase bill to the sale bill',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Your fields on a stock group',
        body:
          'Pick a stock group and add the details you keep for every unit: chassis no, motor no, colour, battery no, IMEI, anything. Each field is text, a number, a date or a pick from a list, and you choose which must be filled and which print on the bill. One field is the Unit no, the batch name in Tally, so turn on "Maintain in batches" for those items in Tally; the app lists any item that is not.',
        screen: 'custom-fields-setup',
      },
      {
        icon: 'ListChecks',
        title: 'One row per unit on the purchase',
        body:
          'Buy 5 and you get 5 rows, one per unit, on the purchase invoice, goods receipt, stock journal inward or sales return. Paste a column of numbers to fill them at once. A number typed twice is flagged before you save, and a unit already in stock cannot be bought again.',
        screen: 'custom-fields-unit-rows',
      },
      {
        icon: 'PackageCheck',
        title: 'Pick from units still in stock',
        body:
          'On a sales order, delivery challan, sales invoice, debit note or stock journal, the list shows only the units still in stock in that godown, each with its details; search, or tap a detail like "Color: Red". The units you pick set the quantity and fill the description lines. No unit is sold twice, built into two products or booked on two orders in Takkada: the bill is refused, naming the bill that holds it.',
        screen: 'custom-fields-unit-picker',
      },
      {
        icon: 'FileCheck2',
        title: 'On the bill, through every step',
        body:
          "The details print under the item on the sales invoice, sales order, delivery challan, credit note and debit note. Units picked on a sales order are held for that customer, and they carry from order to challan to invoice. The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines.",
        screen: 'custom-fields-invoice-print',
      },
      {
        icon: 'BarChart3',
        title: 'Count units by any detail',
        body:
          'How many Red sold this month, how many 48V batteries are in stock: Units by detail counts units sold or in stock by any field, between the dates you pick. A battery that went out inside a sold scooter counts as sold too.',
        screen: 'custom-fields-units-by-detail',
      },
      {
        icon: 'Route',
        title: 'One number, its whole history',
        body:
          'Type a chassis no, battery no, IMEI or any detail and Unit history shows the unit, the vehicle it went into or the parts inside it, and every step with date, bill number and party. Units bought or made straight in Tally show up marked Details missing after Takkada syncs with Tally, so you can fill them in.',
        screen: 'custom-fields-unit-history',
      },
    ],
    comparison: {
      heading: 'Tracking units with Tally batches alone, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Tally batches alone',
      rows: [
        {
          feature: 'Details per unit',
          takkada: 'Your own fields per stock group, with the Unit no as the Tally batch.',
          others: 'The batch name only; the rest in a register or Excel.',
        },
        {
          feature: 'Entering 20 units',
          takkada: 'One row per unit; paste a column of numbers.',
          others: 'Each batch typed into the purchase voucher at the Tally computer.',
        },
        {
          feature: 'The same number twice',
          takkada: 'Refused in Takkada, naming the bill that holds it.',
          others: 'Up to the clerk to notice.',
        },
        {
          feature: 'Picking at the sale',
          takkada: 'Only units still in stock in that godown, searchable by any detail.',
          others: 'The batch list, with details looked up elsewhere.',
        },
        {
          feature: 'On the bill',
          takkada: 'The details print under the item.',
          others: 'Typed by hand into the item description.',
        },
        {
          feature: 'Parts in a finished unit',
          takkada: 'Linked in the production run, with the Manufacturing add-on.',
          others: 'Kept in a notebook.',
        },
        {
          feature: 'Reports',
          takkada: 'Units sold or in stock by any field, and one unit\'s history.',
          others: 'Batch Summary by batch name.',
        },
      ],
      disclaimer:
        'Turn on "Maintain in batches" in Tally for these items. Takkada keeps the details, and the Unit no goes to Tally as the batch through Takkada\'s Tally connector. A sale typed straight into Tally is matched after Takkada syncs, not blocked. Production runs need the Manufacturing add-on and cover in-house production, not job work.',
    },
    faqs: [
      {
        q: 'Does Tally Prime have serial number tracking for stock items?',
        a: "Tally Prime has no separate serial-number field on a stock item. Tally's own help keeps each unit as a batch named by its serial number or IMEI, with batches switched on for the item, and the Batch Summary report then shows which numbers are still in stock. That records the number only, so details like colour or engine number have to be kept somewhere else.",
      },
      {
        q: 'Do I need to install a TDL in Tally for this?',
        a: 'No. Takkada keeps the details, and the Unit no goes to Tally as the batch through Takkada\'s Tally connector, the same connector that sends your other bills. In Tally you only turn on "Maintain in batches" for the items in that stock group.',
      },
      {
        q: 'Can the same serial number be sold twice?',
        a: 'No unit is sold twice in Takkada. Every bill made in Takkada, on the phone, the web app or a van, is checked, and a unit already sold, built into another product or held on another order is refused with the bill that holds it named. A sale typed straight into Tally is matched after Takkada syncs, not blocked, and shows under Units needing attention for you to clear.',
      },
      {
        q: 'What details can I keep for each unit?',
        a: 'Any you choose, per stock group: text, a number, a date or a pick from a list, such as chassis no, motor no, colour, battery no or IMEI. Every item in the group and its subgroups asks for them, and a subgroup can have its own. Remove a field later and the details already saved stay.',
      },
      {
        q: 'Do the serial details print on the invoice?',
        a: "Yes. The fields you mark Print on the bill print under the item on the sales invoice, sales order, delivery challan, credit note and debit note, and you can still edit those lines before you save. The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines.",
      },
      {
        q: 'What about units I bought straight in Tally?',
        a: 'Units bought or made in Tally show up in Takkada marked Details missing after Takkada syncs with Tally, so you can fill in their details before you sell them. Turn on "Maintain in batches" in Tally first, so each unit comes through as its own batch.',
      },
      {
        q: 'Can I add custom fields to stock items in Tally Prime itself?',
        a: "Tally Prime's own invoice customisation adds fields to the company or the invoice as a whole, and fields on each stock item or unit need a TDL written for your Tally. The Custom Fields add-on keeps the fields in Takkada instead, per stock group, with the Unit no as the Tally batch, so nothing is installed in Tally.",
      },
      {
        q: 'Can I use it on a computer?',
        a: 'Yes. Set up fields, buy, sell and see the reports on the phone, or in a computer browser with Web view, which comes with the Assurance plan. With the Desktop entry add-on, Custom fields and Units by detail sit in the Stock menu of the computer layout.',
      },
      {
        q: 'How much does the Custom Fields add-on cost?',
        a: 'It is an add-on on top of a Takkada plan, priced by your partner, and it is switched on for each company separately. Ask your partner for the price, or message us on WhatsApp and we will switch it on for your company.',
      },
    ],
    relatedPosts: [POST.pillar, POST.tdl, POST.printOnInvoice],
  },

  {
    ...SHARED,
    slug: 'imei-tracking-tally',
    searchPhrase: 'IMEI tracking for Tally',
    overline: 'IMEI TRACKING',
    headline: 'Every phone in stock by its IMEI, and every bill picks from the phones you still have.',
    subheadline:
      'In Tally a phone can be a batch named by its IMEI, but typing twenty IMEIs into a purchase voucher is slow, and the colour and storage sit somewhere else. With the Custom Fields add-on, the IMEIs are pasted in on the purchase, each phone keeps its details, and the sale bill offers only phones still in that godown.',
    answerPoints: [
      'The IMEI is the Unit no, the batch name in Tally',
      'Paste a column of IMEIs on the purchase bill',
      'Pick from phones still in that godown',
      'No IMEI sold twice in Takkada',
    ],
    answer:
      "IMEI tracking for Tally means each phone is one Tally batch named by its IMEI, so you know exactly which handsets came in and went out. With Takkada's Custom Fields add-on you paste the IMEIs on the purchase bill, pick from phones still in stock when you sell, and no IMEI is sold twice in Takkada.",
    waContext: 'feature-imei-tracking-tally',
    waMessage:
      'Hi, we sell phones and keep IMEIs in a register next to Tally. Can you show me IMEI tracking with the Custom Fields add-on and switch it on for our company?',
    seo: {
      title: 'IMEI Tracking for Tally: Each Phone Billed by Its IMEI',
      description:
        'IMEI tracking for Tally: each phone is a Tally batch named by its IMEI. Paste IMEIs on the purchase, pick from phones in stock, none sold twice in Takkada.',
    },
    llms: {
      section: 'Features',
      title: 'IMEI tracking for Tally',
      summary:
        'IMEI tracking with the Custom Fields add-on for mobile and electronics shops and distributors on Tally: the IMEI is the Unit no and the batch name in Tally (Maintain in batches on for those items), with fields like colour or storage set per stock group; IMEIs are typed or pasted, one row per phone, on the purchase invoice, goods receipt or sales return, and an IMEI entered twice is flagged; sales orders, challans and invoices offer only phones still in stock in that godown, a phone picked on an order is held for that customer, and no IMEI is sold twice in Takkada (a sale typed straight into Tally is matched after Takkada syncs); the details print under the item on the bill; a credit note offers only the phones on that invoice; Units by detail counts phones sold or in stock by any field; Unit history finds the bill a phone went out on.',
    },
    footerLabel: 'IMEI tracking',
    hero: { screen: 'custom-fields-unit-rows' },
    useCases: {
      heading: 'Made for shops and distributors that sell phones one IMEI at a time',
      cases: [
        {
          who: 'A mobile shop with two counters',
          today: 'Both counters bill from the same box, and the same handset can end up on two bills.',
          with: 'Each counter picks from phones still in stock, and if both bill the same phone at the same moment, only one bill goes through.',
        },
        {
          who: 'A mobile distributor supplying 200 retailers',
          today: 'A retailer calls about a handset, and nobody knows which bill it went out on.',
          with: 'Type the IMEI and see the bill, the date and the retailer.',
        },
        {
          who: 'An electronics dealer who books phones on order',
          today: 'A booked phone gets sold off the shelf to a walk-in customer.',
          with: 'Phones picked on a sales order are held for that customer, and no other order or bill is offered them.',
        },
      ],
      stops: [
        'Typing IMEIs into the purchase voucher one by one',
        'Writing IMEIs in a register beside Tally',
        'Typing the IMEI under the item on every bill',
        'Searching old bills for one handset',
      ],
    },
    walkthroughHeading: "From the carton to the customer's bill",
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Paste the IMEIs on the purchase',
        body:
          'Set the IMEI as the Unit no for your phones\' stock group, with colour or storage beside it, and turn on "Maintain in batches" for those items in Tally. Buy 20 and you get 20 rows; paste the column of IMEIs from the supplier\'s list. An IMEI typed twice is flagged as Entered twice, and a phone already in stock cannot be bought again.',
        screen: 'custom-fields-unit-rows',
      },
      {
        icon: 'PackageCheck',
        title: 'Pick from phones in stock',
        body:
          'On the sales order, challan or invoice, the list shows only the phones still in stock in that godown, with their colour and details. Search by the last digits of the IMEI; the phones you pick set the quantity, and their IMEIs fill the description lines.',
        screen: 'custom-fields-imei-picker',
      },
      {
        icon: 'ShieldCheck',
        title: 'No IMEI sold twice in Takkada',
        body:
          'A phone already sold or held on another order is refused, naming the bill that holds it, and if two people bill the same phone at the same moment, only one bill goes through. Cancel a bill and its phones can be sold again. A sale typed straight into Tally is matched after Takkada syncs, not blocked.',
        screen: 'custom-fields-already-sold',
      },
      {
        icon: 'BarChart3',
        title: 'Phones counted by colour or model',
        body:
          'Units by detail counts phones sold or in stock by any field you set up, between any dates. Unit history finds one IMEI: the purchase it came in on, the bill it went out on, and the party.',
        screen: 'custom-fields-units-by-detail',
      },
    ],
    comparison: {
      heading: 'IMEIs in a register beside Tally, and in Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Register beside Tally',
      rows: [
        {
          feature: 'Entering 20 phones',
          takkada: 'Paste the column of IMEIs, one row per phone.',
          others: 'Each IMEI typed into the purchase voucher and the register.',
        },
        {
          feature: 'Colour, storage, model',
          takkada: 'Your own fields, kept with each IMEI.',
          others: 'Columns in the register.',
        },
        {
          feature: 'Billing a phone',
          takkada: 'Pick from phones still in stock in that godown; search by IMEI.',
          others: 'Read the IMEI off the box and type it.',
        },
        {
          feature: 'The same IMEI twice',
          takkada: 'Refused in Takkada, naming the bill that holds it.',
          others: 'Found when the customer comes back.',
        },
        {
          feature: 'A returned phone',
          takkada: 'The credit note offers only the phones on that invoice, and the phone is back in stock.',
          others: 'The register corrected by hand.',
        },
        {
          feature: 'Finding a phone later',
          takkada: 'Unit history: bill, date and party.',
          others: 'Register pages and old bills.',
        },
      ],
      disclaimer:
        'Turn on "Maintain in batches" in Tally for these items; each IMEI goes to Tally as the batch through Takkada\'s Tally connector. A sale typed straight into Tally is matched after Takkada syncs, not blocked.',
    },
    faqs: [
      {
        q: 'How do I add an IMEI number in Tally Prime?',
        a: "Tally Prime has no IMEI field of its own, so the usual way is to switch on batch-wise details, set the phone's stock item to Maintain in batches, and type each IMEI as a batch of quantity 1 on the purchase. With the Custom Fields add-on you paste the IMEIs on the purchase in Takkada instead, and each one goes to Tally as that phone's batch.",
      },
      {
        q: 'Do I have to print the IMEI on a GST invoice?',
        a: 'Rule 46 of the CGST Rules, which lists what a tax invoice must carry, does not name the IMEI, so printing it is your choice; confirm with your CA for your own case. Printed IMEIs help when a customer brings a phone back. In Takkada, the IMEI and any field marked Print on the bill print under the item.',
      },
      {
        q: 'Can two salesmen sell the same phone?',
        a: 'No IMEI is sold twice in Takkada. Each bill offers only phones still in stock in that godown, a phone already sold is refused with the bill that holds it named, and if two people bill the same phone at the same moment, only one bill goes through.',
      },
      {
        q: 'Can I see how many phones of each colour are in stock?',
        a: 'Yes. Units by detail counts phones sold or in stock by any field you set up, such as colour, storage or model, between the dates you pick. Filter by dates to see a month at a time.',
      },
      {
        q: 'What happens when a customer returns a phone?',
        a: 'Make a credit note against the invoice and it offers only the phones that were on that invoice. The returned phone is back in stock to sell again, with its IMEI and details as they were.',
      },
      {
        q: 'How much does IMEI tracking cost?',
        a: 'IMEI tracking is part of the Custom Fields add-on, priced by your partner and switched on for each company separately. Ask your partner for the price, or message us on WhatsApp and we will switch it on for your company.',
      },
    ],
    relatedPosts: [POST.pillar, POST.hinglish, POST.byColour],
  },

  {
    ...SHARED,
    slug: 'chassis-number-tracking-tally',
    searchPhrase: 'Chassis number tracking for Tally',
    overline: 'CHASSIS AND ENGINE NUMBERS',
    headline: 'Each vehicle billed by its chassis number, with its motor number, colour and battery numbers printed under it.',
    subheadline:
      'A two-wheeler or e-rickshaw bill carries the chassis number and the engine or motor number, and the clerk usually copies them from a register into the bill. With the Custom Fields add-on, each vehicle keeps its own numbers from the day it is bought or built, and picking it on the bill prints them.',
    answerPoints: [
      'Chassis no as the Unit no, the batch name in Tally',
      'Motor no, colour and battery no kept with each vehicle',
      'Picked from vehicles in stock and printed on the bill',
      'No chassis sold twice in Takkada',
    ],
    answer:
      "Chassis number tracking for Tally means each vehicle is one Tally batch named by its chassis number, with its engine or motor number, colour and battery numbers kept beside it. With Takkada's Custom Fields add-on you pick the vehicle from those in stock, its details print on the sale bill, and no chassis is sold twice in Takkada.",
    waContext: 'feature-chassis-number-tracking-tally',
    waMessage:
      'Hi, we sell two-wheelers and copy chassis and motor numbers onto every bill in Tally. Can you show me chassis number tracking with the Custom Fields add-on and switch it on for our company?',
    seo: {
      title: 'Chassis Number Tracking for Tally: Engine No on Every Bill',
      description:
        'Chassis number tracking for Tally: each vehicle is a Tally batch named by its chassis no, with motor no, colour and battery no printed on the sale bill.',
    },
    llms: {
      section: 'Features',
      title: 'Chassis number tracking for Tally',
      summary:
        'Chassis and engine number tracking with the Custom Fields add-on for two-wheeler, EV and e-rickshaw dealers and assemblers on Tally: the chassis no is the Unit no and the batch name in Tally (Maintain in batches on), with motor no, colour and battery no as fields; vehicles are picked from those still in stock in the godown on the sales order, challan or invoice, a vehicle picked on an order is held for that customer, and no chassis is sold twice in Takkada (a sale typed straight into Tally is matched after Takkada syncs); the details, with the numbers of the parts inside, print under the item on the sale bill; with the Manufacturing add-on a production run gives each finished vehicle its chassis no and links the batteries and charger that went into it (in-house production, not job work); Units by detail counts vehicles by colour; Unit history finds any chassis or battery number.',
    },
    footerLabel: 'Chassis number tracking',
    hero: { screen: 'custom-fields-invoice-print' },
    useCases: {
      heading: 'Made for vehicle dealers and assemblers on Tally',
      cases: [
        {
          who: 'A two-wheeler showroom',
          today: 'Chassis and engine numbers are copied from the register onto each bill, and one wrong digit means a corrected bill.',
          with: 'The vehicle is picked from stock, and its numbers print from its own details.',
        },
        {
          who: 'An e-rickshaw dealer taking bookings',
          today: 'A booked vehicle gets sold to a walk-in buyer.',
          with: 'A vehicle picked on the sales order is held for that customer; an order can also be saved without one, and the vehicle picked at the bill.',
        },
        {
          who: 'An EV assembler fitting bought-in batteries',
          today: 'Which batteries went into which scooter is written in a notebook on the shop floor.',
          with: 'With the Manufacturing add-on, each finished scooter gets its chassis no in the production run, and you pick the batteries and charger that go into it.',
        },
      ],
      stops: [
        'Copying chassis numbers from a register',
        'Typing engine and battery numbers under the item',
        'Checking the booking register before selling a vehicle',
        'Searching bills for one battery number',
      ],
    },
    walkthroughHeading: 'From the purchase or the production floor to the sale bill',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Chassis no, motor no, colour, battery no',
        body:
          'On the vehicles\' stock group, make the chassis no the Unit no and add motor no, colour and battery no, marking which must be filled and which print on the bill. Turn on "Maintain in batches" for those items in Tally. On the purchase or goods receipt, each vehicle gets its own row.',
        screen: 'custom-fields-setup',
      },
      {
        icon: 'PackageCheck',
        title: 'Pick the vehicle from stock',
        body:
          'The sales order, challan or invoice lists only the vehicles still in stock in that godown; tap "Color: Red" to narrow it. A vehicle picked on a sales order is held for that customer. No chassis is sold twice in Takkada: the bill is refused, naming the bill that holds it, and a sale typed straight into Tally is matched after Takkada syncs.',
        screen: 'custom-fields-unit-picker',
      },
      {
        icon: 'FileCheck2',
        title: 'Its numbers on the bill',
        body:
          "Chassis no, motor no, colour and the numbers of the parts inside, such as Battery no and Charger no, print under the item on the sales invoice and challan. The sale goes to Tally through Takkada with the chassis no as the batch and the details in the item's description lines.",
        screen: 'custom-fields-invoice-print',
      },
      {
        icon: 'Activity',
        title: 'Batteries inside, found later',
        body:
          'With the Manufacturing add-on, a production run gives each finished vehicle its chassis no and details, and you pick the parts that go into it, any number, like two batteries and a charger; a part used in one vehicle cannot go into another. This covers in-house production, not job work. Unit history then finds any battery or chassis no with every bill.',
        screen: 'custom-fields-unit-history',
      },
      {
        icon: 'BarChart3',
        title: 'Vehicles sold by colour',
        body:
          'Units by detail counts vehicles sold or in stock by colour or any field, and a battery that went out inside a sold scooter counts as sold too.',
        screen: 'custom-fields-units-by-detail',
      },
    ],
    comparison: {
      heading: 'Vehicle numbers in a register and a Tally bill, and in Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Register and Tally',
      rows: [
        {
          feature: 'Where the numbers are kept',
          takkada: 'With each vehicle in Takkada; the chassis no is the Tally batch.',
          others: 'A register or Excel, copied onto each bill.',
        },
        {
          feature: 'Billing a vehicle',
          takkada: 'Picked from vehicles still in stock in that godown.',
          others: 'Chassis no read off the register and typed.',
        },
        {
          feature: 'On the bill',
          takkada: 'Chassis no, motor no, colour and battery numbers print under the item.',
          others: 'Typed into the item description.',
        },
        {
          feature: 'A booked vehicle',
          takkada: 'Held for that customer when picked on the sales order.',
          others: 'A note in the booking register.',
        },
        {
          feature: 'Batteries in each vehicle',
          takkada: 'Linked in the production run, with the Manufacturing add-on.',
          others: 'A shop-floor notebook.',
        },
        {
          feature: 'The same chassis twice',
          takkada: 'Refused in Takkada, naming the bill that holds it.',
          others: 'Found later.',
        },
      ],
      disclaimer:
        'Turn on "Maintain in batches" in Tally for these items. Production runs need the Manufacturing add-on and cover in-house production, not job work. A sale typed straight into Tally is matched after Takkada syncs, not blocked.',
    },
    faqs: [
      {
        q: 'How do I add the chassis number and engine number on a Tally invoice?',
        a: 'In Tally Prime they usually go in the description lines under the vehicle, typed on every bill, or the chassis number is used as the batch name. With the Custom Fields add-on the chassis no is the batch, and picking the vehicle fills its engine or motor number, colour and battery numbers into the description lines for you.',
      },
      {
        q: 'Should the chassis number on the invoice match Form 21?',
        a: "The sale certificate in Form 21 asks for the vehicle's chassis number and its engine number, or motor number for a battery-operated vehicle. Keeping the same numbers on your invoice keeps the papers consistent; check the exact requirement with your RTO agent or CA. In Takkada the numbers print from the vehicle's own details, so they are not retyped.",
      },
      {
        q: 'Can one scooter carry two battery numbers?',
        a: "Yes, with the Manufacturing add-on. In a production run each finished scooter gets its chassis no, and you pick any number of parts for it, such as two batteries and a charger; when the scooter is sold, the parts' numbers print with it.",
      },
      {
        q: 'Can I hold a vehicle for a customer who has booked it?',
        a: 'Yes. Pick the vehicle on the sales order and it is held for that customer, so no other order or bill is offered it. You can also save the order without a vehicle and pick one at the challan or invoice.',
      },
      {
        q: 'Is this two-wheeler showroom software?',
        a: 'It is billing and stock on top of your Tally, with the Custom Fields add-on keeping each vehicle\'s numbers. It has no workshop, service job or registration module, so a showroom that needs those keeps its dealer system for them. Spares and accessories bill from the same app.',
      },
      {
        q: 'How much does chassis number tracking cost?',
        a: 'It is part of the Custom Fields add-on, priced by your partner and switched on for each company separately. Production runs also need the Manufacturing add-on. Ask your partner for the price, or message us on WhatsApp and we will switch it on for your company.',
      },
    ],
    relatedPosts: [POST.evAssembler, POST.printOnInvoice, POST.pillar],
  },
];
