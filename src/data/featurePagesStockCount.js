// Physical Stock Count (2026-11-10): the physical_stock_count add-on, live on
// prod since app 2.1.321 (2026-11-04) and switched on per company. One hub page
// for the Tally-side search and one spoke for the app-side search. Same engine
// and same contract as the other batches; read the header of
// src/data/featurePages.js first.
//
// Every capability sentence traces to a claims sheet under
// docs/seo/feature-pages-stock-count/<slug>-claims.md, copied from the stock
// count claims table compiled 2026-11-10 against takkada origin/main 73ac89bbd
// (2.1.326+351) and prod (SELECT only). Anything a sheet lists under "Cannot
// say" stays off these pages: no "Accept all" and no count of journals (both
// stage only), no barcode or batch counting, no offline counting, no alerts to
// the counter. No stock-count journal has been proven in a real Tally yet, so
// every Tally sentence says the stock journal is made for Tally and sent through
// Takkada's Tally connector, never that it is posted in Tally; wherever the full
// approve sentence appears, the batch-wise line appears on the same page. The
// add-on price is not decided and never prints, so each planPointer names the
// entry plan and the note sends the reader to a partner or to us.
//
// Screens: drawn from the Takkada app's own wording, not app captures, under an
// operator exception (see their manifest rows): trials and demo co143 do not get
// the add-on, and app captures are night-only. A stage co7088 capture replaces
// them later.
//
// Copy angle: /stock-control-tally/ is the reorder page and says "without
// counting shelves". These pages are the count itself, the check that the shelf
// and Tally agree, and do not repeat its claims.

const BATCH_SENTENCE =
  'Batch-wise items are counted but left out of the journal; adjust those in Tally by batch.';

const PLAN_POINTER = {
  plan: 'Momentum',
  note: 'Physical Stock Count is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company.',
};

const SHARED = {
  author: 'founder',
  datePublished: '2026-11-10',
  updated: '2026-11-10',
  planPointer: PLAN_POINTER,
  priority: 0.8,
};

const POST = {
  checklist: {
    slug: 'physical-stock-verification-checklist',
    title: 'Physical Stock Verification Checklist for Your Own Godown (2026)',
  },
  entry: {
    slug: 'physical-stock-entry-in-tally-prime',
    title: 'Physical Stock Entry in Tally Prime: Steps, Register and Stock Journal',
  },
  shortage: {
    slug: 'stock-shortage-excess-entry-in-tally',
    title: 'Stock Shortage and Excess Entry in Tally, with the GST Side',
  },
  format: {
    slug: 'physical-stock-verification-format',
    title: 'Physical Stock Verification Format: A Blind Count Sheet for Each Godown',
  },
  hinglish: {
    slug: 'tally-me-physical-stock-kaise-kare',
    title: 'Tally Me Physical Stock Kaise Kare: Entry, Register Aur Staff Se Ginti',
  },
};

/** @type {import('./featurePages').FeaturePage[]} */
export const STOCK_COUNT_PAGES = [
  {
    ...SHARED,
    slug: 'physical-stock-verification-tally',
    searchPhrase: 'Physical stock verification for Tally',
    overline: 'PHYSICAL STOCK COUNT',
    headline:
      'Your staff count the godown without seeing the book figure, and you check every difference before anything is sent to Tally.',
    subheadline:
      'Most counts happen with the stock summary in hand, so the counter writes what the book already says and the shortage stays hidden. The Physical Stock Count add-on gives each count to one person, keeps the book figure off their screen, and puts every gap in front of you to accept or send back.',
    answerPoints: [
      'One stock group in one godown, given to one person',
      'The counter sees item names and units, never the book stock',
      'Book stock, counted and difference side by side for your review',
      'Approve, and the stock journal for Tally is made at cost rate',
    ],
    answer:
      "Physical stock verification for Tally means counting what is really in each godown and correcting Tally's book stock where the two differ. With Takkada's Physical Stock Count add-on, one person counts a stock group on the phone without seeing the book figure, you review every difference, and approval makes the stock journal for Tally at cost rate.",
    waContext: 'feature-physical-stock-verification-tally',
    waMessage:
      'Hi, our godown count never matches Tally and the staff count with the stock summary in hand. Can you show me the Physical Stock Count add-on and switch it on for our company?',
    seo: {
      title: 'Physical Stock Verification for Tally: Blind Count on Phone',
      description:
        'Physical stock verification for Tally: staff count each godown on the phone without seeing book stock, you review the gaps, approval makes the stock journal.',
    },
    llms: {
      section: 'Features',
      title: 'Physical stock verification for Tally',
      summary:
        'Physical Stock Count add-on for businesses on Tally: assign one stock group or subgroup in one godown to one team member (up to 500 items, zero-stock items included); the counter sees item names and units but not book stock, which is hidden from them in Takkada while the count is open; book stock is frozen when they submit and items that move afterwards are marked Moved after count; the owner reviews book stock, counted, difference and rate, accepts each line or sends one item back for a blind recount; the person who counted cannot approve; approval makes the stock journal for Tally (shortages out, extra stock in) at cost rate; batch-wise items are counted but left out of the journal.',
    },
    footerLabel: 'Physical stock count',
    hero: { screen: 'stock-count-review' },
    useCases: {
      heading: 'Made for owners who want the shelf and Tally to agree',
      cases: [
        {
          who: 'A distributor with two godowns and a year-end count',
          today:
            'The stock summary is printed, the staff tick it off, and where a shelf is hard to reach they write the book figure.',
          with: 'Each group in each godown goes to one person who sees no book figure, and you see only the items that differ.',
        },
        {
          who: 'An auto parts trader with a thousand small items',
          today: 'One big count a year over a Sunday, and it never quite finishes.',
          with: 'One group at a time, up to 500 items in a count, spread through the year.',
        },
        {
          who: 'A wholesaler whose shortages never seem to show up',
          today: 'The person who handles the stock also counts it and also checks it.',
          with: 'Someone else counts, the person who counted cannot approve, and every difference is valued at cost before you approve it.',
        },
      ],
      stops: [
        'Printing the stock summary for the counter',
        'Comparing a paper sheet with Tally line by line',
        'Working out the value of each shortage on a calculator',
        'Typing the stock journal at the Tally computer',
      ],
    },
    walkthroughHeading: 'One count, from assigning it to the stock journal',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'One group, one godown, one person',
        body:
          'Pick a stock group or a subgroup, the godown and the person, and assign the count. Every item in the group goes on the list, zero-stock items too, so the list itself gives nothing away. A count holds up to 500 items, and you cannot assign one to yourself.',
        screen: 'stock-count-assign',
      },
      {
        icon: 'Lock',
        title: 'Counted blind on the phone',
        body:
          'The counter sees item names and units with a box for each and types what is on the shelf. They save as they go, the screen shows how many items are left, and anything not on the list goes in a note for you.',
        screen: 'stock-count-blind-entry',
      },
      {
        icon: 'ShieldCheck',
        title: 'Stock hidden from the counter in Takkada',
        body:
          'While the count is open, the stock of those items is hidden from the counter across Takkada: the item page, stock reports and the billing picker show Being counted. The items can still be billed; only the quantity is hidden.',
        screen: 'stock-count-being-counted',
      },
      {
        icon: 'CheckCheck',
        title: 'Every difference in front of you',
        body:
          'Book stock is frozen the moment the counter submits. You see book stock, counted, difference and the rate for each item, and anything sold, bought or moved after the count is marked Moved after count, so a sale is not read as a shortage.',
        screen: 'stock-count-review',
      },
      {
        icon: 'Activity',
        title: 'Send one item back for a recount',
        body:
          'Accept a difference, or send just that item back. The counter sees only the items sent back, with empty boxes, so the first number cannot steer the second. The person who counted cannot review or approve their own count.',
        screen: 'stock-count-recount',
      },
      {
        icon: 'FileCheck2',
        title: 'Approve, and the stock journal is made for Tally',
        body: `Before you approve, the app shows the shortage and excess value. Approval makes the stock journal for Tally, shortages out of the godown and extra stock in, at the rates you approved, and sends it through Takkada's Tally connector. ${BATCH_SENTENCE}`,
        screen: 'stock-count-approve',
      },
    ],
    comparison: {
      heading: 'A stock count with a printed sheet and Tally, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Printed sheet and Tally',
      rows: [
        {
          feature: 'Who counts',
          takkada: 'One person you pick, on their own Takkada login, for one group in one godown.',
          others: 'Whoever has the time, working from a printed stock summary.',
        },
        {
          feature: 'What the counter sees',
          takkada: 'Item names and units; the book figure stays off their screen in Takkada.',
          others: 'The book figure, printed next to each item.',
        },
        {
          feature: 'Stock that moves during the count',
          takkada: 'Book stock frozen at submit; items sold, bought or moved afterwards are marked Moved after count.',
          others: 'A sale made during counting looks like a shortage.',
        },
        {
          feature: 'A doubtful figure',
          takkada: 'That one item goes back to the counter with an empty box.',
          others: 'The whole shelf is counted again, or the figure is let through.',
        },
        {
          feature: 'Value of each difference',
          takkada: "At cost: the godown's FIFO cost, else Tally's closing rate, else a rate you type.",
          others: 'Worked out later by the accountant.',
        },
        {
          feature: 'The Tally entry',
          takkada: 'The stock journal made for Tally when you approve: shortages out, extra stock in.',
          others: 'A Physical Stock voucher or a journal typed in at the Tally computer.',
        },
      ],
      disclaimer: `Tally Prime's Physical Stock voucher records the counted quantity and Tally books the gap itself. Takkada makes a Stock Journal for the difference instead, at the rates you approved, and sends it to Tally through Takkada's Tally connector. ${BATCH_SENTENCE}`,
    },
    faqs: [
      {
        q: 'Can the person counting see the stock in the app?',
        a: 'No. While the count is open, the counter sees item names and units, and the stock of those items is hidden from them across Takkada, including the item page, stock reports and the billing picker. Takkada cannot hide stock inside Tally itself, so give the count to someone who does not work in Tally.',
      },
      {
        q: 'What happens if stock is sold while the count is going on?',
        a: 'The items stay on sale; only their quantity is hidden from the counter. Book stock is frozen when the counter submits, and any item sold, bought or moved in that godown after that is marked Moved after count on your review screen, so you can recount it before you approve.',
      },
      {
        q: 'How are the shortage and excess valued?',
        a: "At cost. Each difference takes the godown's FIFO cost, or Tally's closing rate where there is none, or a rate you type, and you can change any rate before you approve. The approve screen shows the total shortage and excess value first.",
      },
      {
        q: "Does it use Tally's Physical Stock voucher?",
        a: "No. Tally's Physical Stock voucher records the counted quantity; Takkada makes a Stock Journal for the difference instead, the entry accountants already use for stock adjustments, with shortages going out of the godown and extra stock coming in at the rates you approved.",
      },
      {
        q: 'What about batch-wise items?',
        a: 'Batch-wise items are counted but left out of the journal, and the review marks them Batch-wise: adjust in Tally. Correct those in Tally by batch. Items that are not batch-wise go through the full count, review and stock journal.',
      },
      {
        q: 'Can I count all my godowns in one go?',
        a: 'One count is one stock group or subgroup in one godown, up to 500 items, and the same item cannot be on two open counts in the same godown. For a full year-end count, make one count per group and godown and give them to different people.',
      },
      {
        q: 'Can I review the count on a computer?',
        a: 'Yes. You can review and approve on the phone or in the Takkada web app. With the Desktop entry add-on the review opens as a table, where A accepts the highlighted line and R sends it back for a recount.',
      },
      {
        q: 'How much does the Physical Stock Count add-on cost?',
        a: 'It is an add-on on top of a Takkada plan, priced by your partner, and it is switched on for each company separately. Ask your partner for the price, or message us on WhatsApp and we will switch it on for your company.',
      },
    ],
    relatedPosts: [POST.checklist, POST.entry, POST.shortage],
  },

  {
    ...SHARED,
    slug: 'stock-count-app',
    searchPhrase: 'Stock count app',
    overline: 'STOCK COUNT APP',
    headline: 'Hand the count to your staff on their phone, and keep the book figure for your own review.',
    subheadline:
      'A counter who can see what the books say tends to write it down. In Takkada the count is a list of item names and units with an empty box beside each, and the numbers meet the book stock only on your review screen.',
    answerPoints: [
      'Item names and units with an empty box, nothing else',
      'Save as you go, submit when every item has a number',
      'Anything not on the list goes in a note for you',
      'You review and approve; the counter cannot approve their own count',
    ],
    answer:
      'A stock count app lets your staff count the shelf on a phone while you check the result. In Takkada, the counter sees item names and units with an empty box for each, never the book stock. You see book stock, counted and difference side by side, send any item back for a fresh count, and approve the rest.',
    waContext: 'feature-stock-count-app',
    waMessage:
      'Hi, I want my staff to count the godown on their phones without seeing the stock figure. Can you show me the Takkada stock count and switch it on for our company?',
    seo: {
      title: 'Stock Count App for Staff: They Count Blind, You Approve',
      description:
        'Stock count app for businesses on Tally: staff see item names and units, never book stock. You review each difference, recount doubtful items and approve.',
    },
    llms: {
      section: 'Features',
      title: 'Stock count app for staff',
      summary:
        "The counter's side of the Physical Stock Count add-on for businesses on Tally: counts assigned to a team member on their own login and listed on a Stock count tile with open and closed tabs; a list of item names and units with an empty box for each and no book stock; save as you go and submit once every item has a number; a note for items not on the list; recounts that show only the items sent back, with empty boxes; review and approval by the owner or a full-access member, never the person who counted; the stock journal made for Tally at cost rate on approval; batch-wise items are counted but left out of the journal.",
    },
    footerLabel: 'Stock count app',
    hero: { screen: 'stock-count-blind-entry' },
    useCases: {
      heading: 'Made for owners who cannot count every shelf themselves',
      cases: [
        {
          who: 'A shop owner with two helpers in the godown',
          today: 'The helpers count from a printed list that already shows the book figure.',
          with: 'Each helper gets a list of item names and units with an empty box for every item.',
        },
        {
          who: 'A distributor whose salesman also helps in the godown',
          today: 'Counting means he either stops billing or sees every stock figure while he counts.',
          with: 'Only the items on his count are hidden from him, and he keeps billing.',
        },
        {
          who: 'An owner who checks the godown from another city',
          today: 'The count reaches you as a photo of a paper sheet a week later.',
          with: 'The submitted count waits on the Stock count tile, with book stock frozen at the minute it was submitted.',
        },
      ],
      stops: [
        'Printing count sheets',
        'Typing a paper count into Excel',
        'Recounting a whole shelf for one doubtful figure',
        'Checking a count against the stock summary by hand',
      ],
    },
    walkthroughHeading: 'What the counter sees, and what you see',
    walkthrough: [
      {
        icon: 'ListChecks',
        title: 'Assigned in three picks',
        body:
          'A stock group, a godown and a person. The count shows on the Stock count tile on their home screen, with Open and Closed tabs, and the tile shows how many counts are waiting for them.',
        screen: 'stock-count-assign',
      },
      {
        icon: 'Lock',
        title: 'Names, units and an empty box',
        body:
          'The counter types what is on the shelf for each item, zero included, saves as they go and submits once every item has a number. Anything on the shelf that is not on the list goes in a note for you; you add the item in Tally.',
        screen: 'stock-count-blind-entry',
      },
      {
        icon: 'ShieldCheck',
        title: 'Their stock stays hidden until the count closes',
        body:
          "While the count is open, those items' stock reads Being counted for the counter across Takkada. Cancel the count and nothing is posted, and the counter sees the stock again.",
        screen: 'stock-count-being-counted',
      },
      {
        icon: 'CheckCheck',
        title: 'You review; they cannot',
        body:
          'The owner or a full-access member sees book stock, counted, difference and rate for every item. The person who counted cannot review or approve their own count.',
        screen: 'stock-count-review',
      },
      {
        icon: 'Activity',
        title: 'A recount starts from an empty box',
        body: `Send one item back and the counter sees only that item, with an empty box, so the first number cannot steer the second. Approval then makes the stock journal for Tally at cost rate. ${BATCH_SENTENCE}`,
        screen: 'stock-count-recount',
      },
    ],
    comparison: {
      heading: 'Counting with a printed sheet, and with Takkada',
      takkadaLabel: 'Tally with Takkada',
      othersLabel: 'Printed count sheet',
      rows: [
        {
          feature: 'What the counter is given',
          takkada: 'Item names and units with an empty box each.',
          others: 'The stock summary, book figure included.',
        },
        {
          feature: 'Saving progress',
          takkada: 'Saved as they go; the screen shows how many items are left.',
          others: 'Pages on a clipboard.',
        },
        {
          feature: 'Items not on the list',
          takkada: 'Written in a note for you to add in Tally.',
          others: 'Scribbled in the margin.',
        },
        {
          feature: 'Who checks the count',
          takkada: 'You or a full-access member, never the person who counted.',
          others: 'Often the same person who counted.',
        },
        {
          feature: 'A doubtful figure',
          takkada: 'That one item goes back with an empty box.',
          others: 'Counted again with the first number in mind.',
        },
        {
          feature: 'After approval',
          takkada: 'The stock journal made for Tally, at cost rate.',
          others: 'Typed into Tally at the computer.',
        },
      ],
      disclaimer: `The counter needs a data connection while counting and their own Takkada login; each extra person is an Extra user on your plan. ${BATCH_SENTENCE}`,
    },
    faqs: [
      {
        q: 'Does the person counting need their own login?',
        a: 'Yes. The count is assigned to another member of your team on their own Takkada login, and you cannot assign a count to yourself. Each extra person is an Extra user on your plan.',
      },
      {
        q: 'Can the counter see the book stock anywhere?',
        a: 'Not in Takkada while the count is open: the items on their count read Being counted on the item page, in stock reports and in the billing picker. If they also have Tally on a computer, Takkada cannot hide it there, so pick a counter who does not.',
      },
      {
        q: 'What if an item on the shelf is not on the list?',
        a: 'The counter writes it in the note box at the bottom of the count, and you see it when you review. Takkada does not create the item; add it in Tally and it comes onto the next count.',
      },
      {
        q: 'How many items can one count have?',
        a: 'Up to 500. Pick a subgroup for a bigger group, and note that the same item cannot sit on two open counts in the same godown. Zero-stock items are included, so the list gives nothing away.',
      },
      {
        q: 'Can I cancel a count after assigning it?',
        a: 'Yes, at any time before you approve. Nothing is posted, and the counter can see the stock of those items again straight away. To count that group later, assign a fresh count to the same person or someone else.',
      },
      {
        q: 'How much does the stock count cost?',
        a: 'Stock count is part of the Physical Stock Count add-on, which is priced by your partner and switched on for each company separately. Ask your partner for the price, or message us on WhatsApp and we will switch it on for your company.',
      },
    ],
    relatedPosts: [POST.format, POST.checklist, POST.hinglish],
  },
];
