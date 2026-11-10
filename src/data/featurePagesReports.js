// New reports (2026-11-10): the report screens added to the Takkada app between
// September and November 2026 and live on prod, as four spokes beside the
// rebuilt /tally-reports-on-mobile/ hub (which stays in featurePages.js). Same
// engine and same contract as the other batches; read the header of
// src/data/featurePages.js first.
//
// Every capability sentence traces to a claims sheet under
// docs/seo/feature-pages-reports/<slug>-claims.md, copied from the new-reports
// claims table compiled 2026-11-10 against takkada origin/main 73ac89bbd
// (2.1.326+351) and prod (SELECT only). These reports are on for every company:
// Sales by Item, Purchases by Item and Sales Comparison on every plan, the
// Insights cards inside Reports+, which is on for every company. MIS Insights
// pages are an add-on and appear only beside the sentence "Part of the MIS
// Insights add-on. Ask us to switch it on for your business." (the hub FAQ).
// Gates the test pins: wherever Sales by Item is named, so is its Returns
// column (credit notes are taken off, plan 2026-10-29-005; the Insights cards
// read sales before returns); wherever margin is named, cost is Tally's own ("as your Tally
// values it" for the invoice, "as Takkada reads it from your Tally" for the
// Insights cards), never a method we work out. Sales Comparison rows are stock
// groups and items only. Insights cards are worked out when the tab opens, and
// a vanished customer is messaged from the owner's own WhatsApp, one at a time.
// No rupee figure on these pages: examples are quantities and percents.
//
// Tally keys were checked on 2026-11-10 against TallyHelp (Stock Summary: F7
// Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing
// Analysis through Alt+G) and Tally's business guide on profitability (Sales
// Register, a month, F7 Show Profit: Transaction Value, Gross Revenue, Cost,
// Gross Profit; Ledger Movement Analysis for a customer). A key that could not
// be confirmed is left out and the step is described without it.
//
// Screens: drawn from the Takkada app's own wording with made-up data, not app
// captures, under an operator exception (see their manifest rows): the only
// captures of these reports are of a stage book copied from a real business,
// and app captures are night-only. `sales-by-item`, `purchases-by-item` and
// `report-export` are real demo-company captures.

const ACCESS =
  'Owners and full-access team members see item-wise sales and profit; you choose who else sees reports.';

const SHARED = {
  author: 'founder',
  datePublished: '2026-11-10',
  updated: '2026-11-10',
  priority: 0.8,
};

const COMPARE_LABELS = { takkadaLabel: 'Tally with Takkada', othersLabel: 'Tally alone' };

const POST = {
  itemWiseSales: {
    slug: 'item-wise-sales-report-tally',
    title: 'Item-Wise / Product Sales Report from Tally',
  },
  partyWiseSales: {
    slug: 'party-wise-sales-report-tally',
    title: 'Party-Wise Sales Report in Tally on Mobile',
  },
  itemProfit: {
    slug: 'item-wise-profit-in-tally-prime',
    title: 'Item Wise Profit in Tally Prime: F7 Steps, the Gaps and a Faster Check',
  },
  supplierRate: {
    slug: 'supplier-rate-comparison-same-item',
    title: 'Supplier Rate Comparison for the Same Item: What Two Rates Cost You',
  },
  fastSlow: {
    slug: 'fast-moving-slow-moving-items-report-tally',
    title: 'Fast-Moving and Slow-Moving Items from Tally on Your Phone',
  },
  seasonal: {
    slug: 'seasonal-stock-planning-for-distributors',
    title: "Seasonal Stock Planning: Last Year's Sales Register Is Your Forecast",
  },
  monthWisePl: {
    slug: 'month-wise-profit-and-loss-tally-prime',
    title: 'Month Wise Profit and Loss in Tally Prime, and Why One Month Looks Like a Loss',
  },
  stoppedBuying: {
    slug: 'customers-who-stopped-buying-an-item',
    title: 'Customers Who Stopped Buying an Item: Find Them Before They Leave',
  },
  profitReport: {
    slug: 'profit-report-for-distributors-tally',
    title: 'Profitability Report for Distributors (Tally on Mobile)',
  },
  grossProfitBasis: {
    slug: 'gross-profit-on-cost-vs-selling-price',
    title: 'Gross Profit on Cost vs on Selling Price: Formula, Table and Which to Quote',
  },
  profitHinglish: {
    slug: 'tally-me-profit-kaise-dekhe',
    title: 'Tally Me Profit Kaise Dekhe: Item, Bill Aur Mahine Ka Profit',
  },
  deadStock: {
    slug: 'dead-stock-identification-tally-distributor',
    title: 'Finding Dead Stock in Tally Before Year-End',
  },
  crossSell: {
    slug: 'cross-sell-gap-report-distributors',
    title: 'The Cross-sell Gap Report: Items Your Customers Should Be Buying From You',
  },
};

/** @type {import('./featurePages').FeaturePage[]} */
export const REPORTS_PAGES = [
  {
    ...SHARED,
    slug: 'party-wise-item-wise-sales-report-tally',
    searchPhrase: 'Party-wise item-wise sales report for Tally',
    overline: 'ITEM AND PARTY SALES',
    headline: 'Which customer bought which item, how much and at what price, from your Tally books.',
    subheadline:
      "In Tally that means the item in Stock Summary on one side, the party's ledger on the other, and an export or a TDL to join them. Sales by Item puts the two together on the phone: group your sales by item, stock group, customer or month in one tap, then open any item to see who bought it and at what average price.",
    answerPoints: [
      'Quantity, net amount, average price and the change against last period',
      'Group by Item, Group, Customer or Month; Category, Area, Voucher Type or Cost Centre when your Tally uses them',
      'An item, then its customers at their average price, then the invoices',
      'Purchases by Item, supplier by supplier, with the gap to your selling price',
    ],
    answer:
      "A party-wise item-wise sales report for Tally shows which customer bought which item, how much and at what price. In Takkada, Sales by Item groups your Tally sales by item, stock group, customer or month in one tap; open an item to see its customers at their average price, then each customer's invoices.",
    waContext: 'feature-party-wise-item-wise-sales-report-tally',
    waMessage:
      'Hi, I want to see which customer bought which item and at what rate, from my Tally, without exporting to Excel. Can you show me Sales by Item in Takkada?',
    seo: {
      title: 'Party-wise Item-wise Sales Report for Tally, in One Tap',
      description:
        "Party-wise item-wise sales report for Tally: item sales grouped by customer, stock group or month, then each item's customers at their average price.",
    },
    llms: {
      section: 'Features',
      title: 'Party-wise item-wise sales report for Tally',
      summary:
        'Sales by Item and Purchases by Item for businesses on Tally, on every plan: per item quantity, net amount after line discount and before GST, average price and the change against the previous month, quarter or financial year; one-tap grouping by Item, Group (stock group), Customer or Month, plus Category, Area, Voucher Type and Cost Centre when the Tally books use them; grouped rows show quantity in each unit; tap an item for its customers at their average price, then a customer for the invoices; Purchases by Item shows each item\'s suppliers, average rate and the gap to the selling price; Excel and PDF export; Sales by Item takes customer returns (credit notes) off and shows them in a Returns column, and Purchases by Item does the same with debit notes; owners and full-access team members see item-wise sales.',
    },
    footerLabel: 'Party and item sales',
    hero: { screen: 'sales-by-item-grouped' },
    useCases: {
      heading: 'Made for owners who sell one item to many customers at different rates',
      cases: [
        {
          who: 'A paint and hardware distributor before a rate revision',
          today: 'Exports the sales register and builds a pivot to see what each customer paid for one item.',
          with: "Opens the item and reads each customer's quantity and average price for the month.",
        },
        {
          who: 'An FMCG stockist reviewing the month by brand group',
          today: 'Asks the accountant for party-wise sales, then item-wise, then tries to match the two.',
          with: 'Groups the same sales by stock group, then by customer, from one screen.',
        },
        {
          who: 'An auto parts trader who buys one part from two suppliers',
          today: 'Opens one item at a time to see who supplied it at what rate.',
          with: 'Reads Purchases by Item for each item\'s suppliers and the average rate paid to each.',
        },
      ],
      stops: [
        'Building pivots from an exported sales register',
        'Buying an add-on to join party and item sales',
        'Asking the accountant for the same report twice',
        'Adding boxes and pieces into one number',
      ],
    },
    walkthroughHeading: "From all items to one customer's invoices",
    walkthrough: [
      {
        icon: 'BarChart3',
        title: 'Every item for the month, quarter or year',
        body:
          'Quantity, net amount after line discount and before GST, average price and the change against the previous period. Use the arrows to step back a month or a quarter.',
        screen: 'sales-by-item',
      },
      {
        icon: 'LayoutGrid',
        title: 'One tap to group',
        body:
          'All items, or group by Item, Group, Customer or Month; Category, Area, Voucher Type and Cost Centre appear when your Tally uses them. Grouped rows show quantity in each unit, such as 120 Box and 40 Pcs, never one added-up figure.',
        screen: 'sales-by-item-grouped',
      },
      {
        icon: 'ListChecks',
        title: 'An item, its customers, their invoices',
        body:
          'Tap an item for the customers who bought it and their average price this period, then a customer for the invoices. Goods your customers returned (credit notes) are taken off and shown in a Returns column.',
        screen: 'sales-by-item-customers',
      },
      {
        icon: 'Truck',
        title: 'The purchase side, supplier by supplier',
        body:
          'Purchases by Item shows what each item cost you, the average rate and the gap against your selling price. Goods you returned to suppliers (debit notes) are taken off the same way.',
        screen: 'purchases-by-item',
      },
      {
        icon: 'Share2',
        title: 'Out to Excel or PDF',
        body: `Export either report and send it from the phone's share sheet. ${ACCESS}`,
        screen: 'report-export',
      },
    ],
    comparison: {
      heading: 'Item and party sales in Tally alone, and with Takkada',
      ...COMPARE_LABELS,
      rows: [
        {
          feature: 'Which customer bought an item',
          takkada: 'Tap the item: its customers with quantity and average price.',
          others: "Stock Summary for the item and each party's ledger, joined by hand or with an add-on.",
        },
        {
          feature: 'Grouping',
          takkada: 'Item, Group, Customer or Month in one tap; Category, Area, Voucher Type and Cost Centre when used.',
          others: 'One report per view.',
        },
        {
          feature: 'Change against last period',
          takkada: 'A vs previous figure on every row.',
          others: 'A second column added for the earlier period with Alt+C (New Column).',
        },
        {
          feature: 'Where you read it',
          takkada: 'Phone or web app, from your Tally as of the last sync.',
          others: 'The Tally computer.',
        },
      ],
      disclaimer: `Sales by Item takes customer returns (credit notes) off and shows them in a Returns column; Purchases by Item does the same with debit notes. ${ACCESS}`,
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Sales by Item and Purchases by Item are on every plan, starting with the entry one.',
    },
    faqs: [
      {
        q: 'How do I see party-wise item-wise sales in Tally Prime?',
        a: "Tally Prime shows one side at a time: Stock Summary for an item, and a party's ledger or Ledger Movement Analysis for what that party bought. Putting the two together usually takes an export to Excel or a TDL. In Takkada, open Sales by Item and group it by Customer, or tap an item to see its customers.",
      },
      {
        q: 'Can I see customer-wise sales of one item?',
        a: 'Yes. Tap the item in Sales by Item and you see every customer who bought it this period, with the quantity and their average price. Tap a customer to see the invoices behind that figure, for the month, the quarter or the financial year.',
      },
      {
        q: 'Are sales returns taken off these figures?',
        a: 'Yes. Sales by Item takes goods your customers returned on credit notes off each item and shows them in a Returns column, and Purchases by Item does the same with debit notes. The Insights cards read sales and purchases before returns.',
      },
      {
        q: 'Can I see quantity in boxes and pieces separately?',
        a: 'Yes. When you group sales by stock group, customer or month, each row shows the quantity in each unit, for example 120 Box and 40 Pcs. Takkada does not add different units into one figure, so a group that sells in two units reads correctly.',
      },
      {
        q: 'Can I group item sales by stock group or category?',
        a: 'Yes. One tap groups the same sales by Item, Group (your Tally stock group), Customer or Month. Category, Area, Voucher Type and Cost Centre appear as choices only when your Tally books use them, so an unused option never shows an empty list.',
      },
      {
        q: 'Who in my team can see Sales by Item?',
        a: 'Owners and full-access team members see item-wise sales and profit. Other team members see the reports you give them through the Reports permission, so a salesman can read his own work without seeing what every item earns across the business.',
      },
    ],
    relatedPosts: [POST.itemWiseSales, POST.partyWiseSales, POST.itemProfit, POST.supplierRate],
  },

  {
    ...SHARED,
    slug: 'sales-comparison-report-tally',
    searchPhrase: 'Sales comparison report for Tally',
    overline: 'SALES COMPARISON',
    headline: 'See which stock groups are falling, month against month, biggest drop first.',
    subheadline:
      'Tally can repeat a report period by period in columns, but it leaves the change for you to work out and keeps its own row order. Sales Comparison puts each stock group\'s sales side by side by month or quarter, shows the change in percent, sorts by the biggest drop or rise, and opens any group into its items.',
    answerPoints: [
      'Stock groups side by side, by month or by financial-year quarter',
      'Rupees or quantity',
      'Sort by Latest, Biggest drop or Biggest rise',
      'The running month marked so far',
    ],
    answer:
      "A sales comparison report for Tally puts the same sales side by side for two or more periods. In Takkada, Sales Comparison shows each stock group's sales by month or quarter with the change in percent, sorted by biggest drop or rise. Open a group to compare its items; the running month is marked so far.",
    waContext: 'feature-sales-comparison-report-tally',
    waMessage:
      "Hi, I want to compare this month's sales with last month by stock group and see what dropped, from my Tally. Can you show me Sales Comparison in Takkada?",
    seo: {
      title: 'Sales Comparison Report for Tally: Month vs Month by Group',
      description:
        'Sales comparison report for Tally: stock groups side by side by month or quarter, sorted by biggest drop or rise, with the change in percent.',
    },
    llms: {
      section: 'Features',
      title: 'Sales comparison report for Tally',
      summary:
        'Sales Comparison for businesses on Tally, on every plan: net sales per stock group side by side for a run of months or financial-year quarters, opening each group into its items; switch between rupees and quantity; sort by Latest, Biggest drop or Biggest rise; a Change column with the whole-percent change between the last two periods, or new when the earlier period was nil; the running month marked so far; rows are stock groups and items only, so sales by customer are read in Sales by Item grouped by Customer.',
    },
    footerLabel: 'Sales comparison',
    hero: { screen: 'sales-comparison' },
    useCases: {
      heading: 'Made for the month-end sales review',
      cases: [
        {
          who: "A distributor before the monthly meeting with a company's area manager",
          today: 'Exports two months of the sales register and subtracts them in Excel.',
          with: 'Sorts by Biggest drop and opens the group at the top into its items.',
        },
        {
          who: 'A stockist who ran a festival scheme on one group',
          today: 'Cannot tell whether the scheme lifted the group or only moved sales between months.',
          with: 'Reads the group in quantity, month by month, with the change against the month before.',
        },
        {
          who: 'An owner checking sales on the 15th',
          today: 'Reads half a month as a fall.',
          with: 'Sees the running month marked so far.',
        },
      ],
      stops: [
        'Subtracting two exports in Excel',
        'Working out percent change by hand',
        'Reading a half month as a fall',
        'Scrolling every group to find the ones that dropped',
      ],
    },
    walkthroughHeading: 'From all groups to the item that fell',
    walkthrough: [
      {
        icon: 'LayoutGrid',
        title: 'Stock groups side by side, biggest drop first',
        body:
          'Months or quarters as columns, each stock group\'s net sales in a row. Sort by Latest, Biggest drop or Biggest rise; a group that sold nothing before shows new, and the current month is marked so far. Paints sold 14% less in September than in August, so its Change reads -14%.',
        screen: 'sales-comparison',
      },
      {
        icon: 'BarChart3',
        title: 'Open a group into its items, in rupees or quantity',
        body:
          "The group's items in the same columns, so the item that fell stands out. Switch to quantity to see whether fewer units went out or the same units went at a lower rate.",
        screen: 'sales-comparison-items',
      },
      {
        icon: 'ListChecks',
        title: 'Then see who stopped buying it',
        body:
          'Rows here are stock groups and items, so open the item in Sales by Item for its customers at their average price. Sales by Item takes customer returns (credit notes) off and shows them in a Returns column.',
        screen: 'sales-by-item-customers',
      },
    ],
    comparison: {
      heading: 'Comparing months in Tally alone, and with Takkada',
      ...COMPARE_LABELS,
      rows: [
        {
          feature: 'Periods side by side',
          takkada: 'Months or financial-year quarters, chosen in one control.',
          others: 'A column added for each period with Alt+C (New Column).',
        },
        {
          feature: 'The change',
          takkada: 'A Change column in whole percent; new when the earlier period was nil.',
          others: 'Worked out in Excel.',
        },
        {
          feature: 'Order',
          takkada: 'Latest, Biggest drop or Biggest rise.',
          others: "The report's own order.",
        },
        {
          feature: 'Rows',
          takkada: 'Stock groups, opening into their items.',
          others: 'The rows of the report you opened.',
        },
        {
          feature: 'A half month',
          takkada: 'Marked so far.',
          others: 'Read like a full month.',
        },
      ],
      disclaimer:
        'Rows are stock groups and their items. For sales by customer, use Sales by Item grouped by Customer, which shows customer returns (credit notes) in a Returns column. Free goods stay in the quantity.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Sales Comparison is on every plan, with the same access as Sales by Item.',
    },
    faqs: [
      {
        q: 'How do I compare two months of sales in Tally Prime?',
        a: 'In Tally Prime, open the report for the first month and press Alt+C (New Column) to add the second period beside it. Tally shows the two columns but leaves the change for you to work out. In Takkada, Sales Comparison shows each stock group by month with the change in percent.',
      },
      {
        q: 'Why does this month look lower than the others?',
        a: 'Because it is not over yet. The running month is marked so far in Sales Comparison, so fifteen days of sales are not read as a fall against a full month. Compare it again once the month closes, or read the last two full months.',
      },
      {
        q: 'Can I compare sales by customer or by salesman?',
        a: 'No. Rows in Sales Comparison are stock groups and their items. To see sales by customer, open Sales by Item and group it by Customer, which shows each customer with the change against the previous period.',
      },
      {
        q: 'Can I compare quantity instead of value?',
        a: 'Yes. Switch between rupees and quantity at the top of Sales Comparison. Quantity shows whether fewer units went out, which tells a real drop in demand apart from the same units sold at a lower rate.',
      },
      {
        q: 'What does new mean in the Change column?',
        a: 'It means the group or item sold nothing in the earlier period and something in the later one, so there is no percent to show. Every other row shows the change between the last two periods in whole percent, such as -14% or +15%.',
      },
      {
        q: 'Can I compare quarters instead of months?',
        a: 'Yes. Choose quarters and the columns become financial-year quarters, headed like Q2 26-27, with the same Change column and the same sorting. Quarters suit a business whose months swing with festivals or with company schemes.',
      },
    ],
    relatedPosts: [POST.fastSlow, POST.seasonal, POST.monthWisePl, POST.stoppedBuying],
  },

  {
    ...SHARED,
    slug: 'invoice-wise-profit-tally',
    searchPhrase: 'Invoice-wise profit for Tally',
    overline: 'PROFIT ON EACH INVOICE',
    headline: 'Open a sales invoice and see what you made on every line.',
    subheadline:
      'Tally shows profit per invoice once you turn it on in the Sales Register. Takkada puts cost and margin on the invoice itself, line by line, for the people you allow, using each item\'s cost for that financial year as your Tally values it.',
    answerPoints: [
      'Cost, Margin and Margin % on each line of a saved sales invoice',
      'Margin % on the invoice is on selling price',
      'The owner turns on Show margin on invoice; you choose who sees profit',
      'A missing cost can be typed for that invoice only, never sent to Tally',
    ],
    answer:
      "Invoice-wise profit for Tally means what each sales invoice left after the cost of the goods. In Takkada, open any saved sales invoice to see cost and margin on each line, once the owner turns on Show margin on invoice. Cost is the item's cost for that financial year as your Tally values it.",
    waContext: 'feature-invoice-wise-profit-tally',
    waMessage:
      'Hi, I want to see the margin on each sales invoice from my Tally on the phone, and keep it hidden from my salesmen. Can you show me how it works in Takkada?',
    seo: {
      title: 'Invoice-wise Profit for Tally: Margin on Every Bill Line',
      description:
        "Invoice-wise profit for Tally: open any sales invoice on the phone to see cost and margin on each line, at each item's cost as your Tally values it.",
    },
    llms: {
      section: 'Features',
      title: 'Invoice-wise profit for Tally',
      summary:
        "Cost and margin on each line of a saved sales invoice for businesses on Tally: shown once the owner turns on Show margin on invoice, and only to people allowed to see profit; Margin and Margin % per line, with Margin % on the selling price; cost is the item's cost for that financial year as the company's Tally values it; a missing or wrong cost can be typed for one line, used for that invoice only and not sent to Tally; reached from the invoice or from Sales by Item, item, customer, invoice; Sales by Item shows customer returns (credit notes) in a Returns column.",
    },
    footerLabel: 'Profit on each invoice',
    hero: { screen: 'invoice-margin' },
    useCases: {
      heading: 'Made for owners who agree rates over the phone',
      cases: [
        {
          who: 'An owner who allowed a special rate on a big order',
          today: 'Asks the accountant to check the margin after the bill is made.',
          with: 'Opens the saved invoice and reads the margin on each line.',
        },
        {
          who: 'A distributor with a new item whose cost is not in Tally yet',
          today: 'Sees no profit for that line at all.',
          with: 'Types the cost for that line, used for this invoice only and not sent to Tally.',
        },
        {
          who: 'A business whose salesmen should not see margins',
          today: 'Keeps every profit report off the phone.',
          with: 'Shows margin only to the people allowed to see profit.',
        },
      ],
      stops: [
        "Asking the accountant for one bill's margin",
        "Opening the Sales Register for one invoice's profit",
        'Working out margin percent on a calculator',
        'Hiding the whole Reports tab to hide profit',
      ],
    },
    walkthroughHeading: 'From the invoice to the line that made the least',
    walkthrough: [
      {
        icon: 'Wallet',
        title: 'Cost and margin on each line, for the people you allow',
        body:
          "Cost, Margin and Margin % on each line of a saved sales invoice. Margin % on the invoice is on selling price, so a line sold for 100 that cost 80 shows 20%. Cost is the item's cost for that financial year as your Tally values it. The owner turns on Show margin on invoice, and only members allowed to see profit see it.",
        screen: 'invoice-margin',
      },
      {
        icon: 'ListChecks',
        title: 'A cost that is missing or wrong',
        body:
          'Tap Add cost on the line and type the cost per unit. It is used for this invoice only and not sent to Tally; to change the item\'s cost everywhere, correct it in Tally.',
        screen: 'invoice-add-cost',
      },
      {
        icon: 'BarChart3',
        title: 'From an item to the invoice',
        body:
          'Sales by Item, an item, its customers at their average price, then the invoice with its margin. Sales by Item takes customer returns (credit notes) off and shows them in a Returns column.',
        screen: 'sales-by-item-customers',
      },
    ],
    comparison: {
      heading: 'Invoice profit in Tally alone, and with Takkada',
      ...COMPARE_LABELS,
      rows: [
        {
          feature: 'Where the profit shows',
          takkada: 'On the saved invoice, line by line.',
          others: 'The Sales Register, a month opened and F7 (Show Profit) pressed, one row per invoice.',
        },
        {
          feature: 'Margin percent',
          takkada: 'Margin % on each line, on selling price.',
          others: 'Worked out by hand from the Gross Profit column.',
        },
        {
          feature: 'Who sees it',
          takkada: 'Only people you allow to see profit, after the owner turns it on.',
          others: 'Anyone who can open the Sales Register in Tally.',
        },
        {
          feature: 'A missing cost',
          takkada: 'Typed for that invoice only, not sent to Tally.',
          others: "Fixed in the item's cost in Tally.",
        },
        {
          feature: 'Where you read it',
          takkada: 'Phone or web app, from your Tally as of the last sync.',
          others: 'The Tally computer.',
        },
      ],
      disclaimer:
        "Cost is the item's cost for that financial year as your Tally values it. Margin % on the invoice is on selling price. Sales by Item shows customer returns (credit notes) in a Returns column.",
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Cost and margin on the invoice are on every plan; the owner turns them on in settings.',
    },
    faqs: [
      {
        q: 'How do I check invoice-wise profit in Tally Prime?',
        a: 'Open the Sales Register, go into a month and press F7 (Show Profit). Each invoice then shows Transaction Value, Gross Revenue, Cost and Gross Profit, and a loss shows with a minus sign. In Takkada, open the saved sales invoice itself to see cost and margin line by line.',
      },
      {
        q: 'What cost does Takkada use for the margin?',
        a: "The item's cost for that financial year as your Tally values it. It is not a cost Takkada works out on its own, so if the margin looks wrong, the item's cost in Tally is the place to check first.",
      },
      {
        q: 'Is the margin percent on cost or on selling price?',
        a: 'Margin % on the invoice is on selling price. A line sold for 100 that cost 80 shows 20%, which is 25% on cost. Quote the same basis to your salesmen and your accountant so the two numbers agree.',
      },
      {
        q: 'Can my salesmen see the margin on invoices?',
        a: 'Only if you allow them to see profit. The owner first turns on Show margin on invoice, and then cost and margin show only to members allowed to see profit. Everyone else opens the same invoice without the cost and margin section.',
      },
      {
        q: "What if an item's cost is wrong on one invoice?",
        a: 'Tap Add cost on that line and type the cost per unit. It is used for that invoice only and is not sent to Tally, so the margin on that bill reads right while the item itself stays as it is in your books.',
      },
      {
        q: 'Does a cost I type change anything in Tally?',
        a: "No. A cost typed on a line is used for that invoice only and is not sent to Tally. To change the item's cost everywhere, correct it in Tally, and the next sync brings it into Takkada.",
      },
    ],
    relatedPosts: [POST.profitReport, POST.itemProfit, POST.grossProfitBasis, POST.profitHinglish],
  },

  {
    ...SHARED,
    slug: 'sales-insights-tally',
    searchPhrase: 'Sales insights from Tally',
    overline: 'INSIGHTS',
    headline: 'Eight questions your Tally sales and purchases can answer before you open a table.',
    subheadline:
      'Which items are slipping, which customers stopped buying something, what went out below cost, which few items carry the business. On the buying side, what costs more than last time, what you bought beyond what sold, where two suppliers charge different rates, and what has not sold in 60 days. The Insights tab answers each on one card.',
    answerPoints: [
      "Sales: Slipping items, Vanished customers, Selling below cost, What's carrying me",
      'Purchase: Cost creep, Over-buying, Supplier rate gap, Dead stock',
      'Every card opens its full list, to Excel or PDF',
      'Message a vanished customer from your own WhatsApp, one at a time',
    ],
    answer:
      "Sales insights from Tally are the answers sitting in your sales and purchase registers. In Takkada, the Insights tab inside Sales by Item and Purchases by Item shows eight cards: slipping items, vanished customers, selling below cost, what's carrying me, cost creep, over-buying, supplier rate gap and dead stock, each opening its full list.",
    waContext: 'feature-sales-insights-tally',
    waMessage:
      'Hi, I want to see which items are slipping and which customers stopped buying, from my Tally, without building reports. Can you show me the Insights tab in Takkada?',
    seo: {
      title: 'Sales Insights from Tally: 8 Questions Your Books Answer',
      description:
        'Sales insights from Tally: slipping items, customers who stopped buying an item, sales below cost, cost creep, over-buying and dead stock, one card each.',
    },
    llms: {
      section: 'Features',
      title: 'Sales insights from Tally',
      summary:
        "The Insights tab inside Sales by Item and Purchases by Item for businesses on Tally, included for every company: Slipping items (rupees less than the last period, per item and in total), Vanished customers (bought an item last period and none of it this period, with a ready message to send from your own WhatsApp one customer at a time, or a call), Selling below cost (items sold under purchase price and the amount given away), What's carrying me (the few items that make 80% of sales, and the top item's share when it is 30% or more); Cost creep, Over-buying (bought beyond what sold), Supplier rate gap (one item from two suppliers at different rates) and Dead stock (the biggest 25 items with no sale in 60 days or more); each card opens a full list for Excel or PDF; cards are worked out when the tab opens, not sent as alerts; cost is the purchase price as Takkada reads it from the company's Tally; the cards read sales before returns, while the Sales by Item list shows customer returns (credit notes) in a Returns column.",
    },
    footerLabel: 'Sales insights',
    hero: { screen: 'insights-sales' },
    useCases: {
      heading: 'Made for owners with five minutes, not an afternoon',
      cases: [
        {
          who: 'A distributor whose regular customer quietly moved one item to another supplier',
          today: 'Finds out at the year-end ledger review.',
          with: 'Sees the customer under Vanished customers the month it happens, and sends a ready message from their own WhatsApp.',
        },
        {
          who: 'An owner whose salesmen agree rates at the counter',
          today: "Learns of a below-cost sale when the month's margin falls.",
          with: 'Reads Selling below cost for the items sold under purchase price and the amount given away.',
        },
        {
          who: 'A buyer placing the monthly purchase order',
          today: 'Reorders what sold the same month last year.',
          with: 'Checks Over-buying and Dead stock before the order goes out.',
        },
      ],
      stops: [
        'Scanning profit columns for minus signs',
        'Opening customer ledgers one by one to see who stopped',
        'Comparing supplier bills for the same item by hand',
        'Exporting registers to sort them in Excel',
      ],
    },
    walkthroughHeading: 'Four questions on sales, four on buying',
    walkthrough: [
      {
        icon: 'Target',
        title: 'Four sales questions on one screen',
        body:
          "Slipping items, Vanished customers, Selling below cost and What's carrying me. Each card answers its question in one line before you read a table, for the period you pick.",
        screen: 'insights-sales',
      },
      {
        icon: 'MessageCircle',
        title: 'Customers who stopped buying an item',
        body:
          'Who bought an item last period and none of it this period, with what they spent. Send from my WhatsApp opens your own WhatsApp with a ready message, one customer at a time, or tap Call.',
        screen: 'insights-vanished',
      },
      {
        icon: 'ShieldCheck',
        title: 'What went out below cost',
        body:
          'Items sold under their purchase price this period, and how much was given away. Cost is the purchase price as Takkada reads it from your Tally. Every card opens its full list for Excel or PDF.',
        screen: 'insights-below-cost',
      },
      {
        icon: 'Truck',
        title: 'Four buying questions',
        body:
          'Cost creep, Over-buying, Supplier rate gap and Dead stock, which lists the biggest 25 items with no sale in 60 days or more. Read them before the next purchase order goes out.',
        screen: 'insights-purchase',
      },
    ],
    comparison: {
      heading: 'Finding these answers in Tally alone, and with Takkada',
      ...COMPARE_LABELS,
      rows: [
        {
          feature: 'Items sold below cost',
          takkada: 'One list with the amount given away.',
          others: 'The Sales Register with F7 (Show Profit), scanned for minus signs invoice by invoice.',
        },
        {
          feature: 'Customers who stopped buying an item',
          takkada: 'Vanished customers, with a ready message to send from your own WhatsApp.',
          others: 'No built-in list; customer ledgers read one by one.',
        },
        {
          feature: 'The same item from two suppliers',
          takkada: 'Supplier rate gap, across every item.',
          others: 'Stock Item Movement Analysis, one item at a time.',
        },
        {
          feature: 'Stock with no sale in 60 days',
          takkada: 'Dead stock, the biggest 25 by value.',
          others: 'Stock Ageing Analysis, which needs batches turned on for the company and the items.',
        },
        {
          feature: 'Items that make most of your sales',
          takkada: "What's carrying me: the items that make 80%.",
          others: 'Sorted and added up in Excel.',
        },
      ],
      disclaimer:
        'Cards are worked out when you open the tab; they are not alerts. Cost is the purchase price as Takkada reads it from your Tally. The cards read sales before returns; the Sales by Item list shows customer returns (credit notes) in a Returns column.',
    },
    planPointer: {
      plan: 'Momentum',
      note: 'Insights are included for every Takkada company, inside Sales by Item and Purchases by Item.',
    },
    faqs: [
      {
        q: 'How do I find customers who stopped buying an item?',
        a: 'Open the Insights tab in Sales by Item and tap Vanished customers. It lists everyone who bought an item last period and none of it this period, with what they spent. From a row, send a ready message from your own WhatsApp, one customer at a time, or call.',
      },
      {
        q: 'How do I find items sold below cost in Tally?',
        a: 'In Tally Prime, open the Sales Register, go into a month and press F7 (Show Profit); a loss shows as a minus sign, invoice by invoice. In Takkada, the Selling below cost card lists the items sold under purchase price this period and how much was given away.',
      },
      {
        q: "What does What's carrying me show?",
        a: 'The few items that make 80% of your sales for the period, for example 5 items make 80% of your sales. When one item is 30% or more of the total, the card names it and its share. Those are the items never to run out of.',
      },
      {
        q: 'Does Takkada message these customers for me?',
        a: 'No. Send from my WhatsApp opens your own WhatsApp with a ready message for one customer, and you press send. You can also call from the same row, and then move on to the next customer on the list.',
      },
      {
        q: 'Will I get an alert when an item starts slipping?',
        a: 'No. The cards are worked out each time you open the Insights tab, for the period you pick. Open it once a week or at month end, and the Slipping items card shows how much less each item earned than in the last period.',
      },
      {
        q: 'What counts as dead stock here?',
        a: 'An item with stock and no sale in 60 days or more. The Dead stock card lists the biggest 25 such items by value, so the money stuck longest in the godown is at the top, and the full list goes to Excel or PDF.',
      },
      {
        q: 'Are Insights part of my plan?',
        a: `Yes. Insights are included for every Takkada company, inside Sales by Item and Purchases by Item, with nothing to switch on. ${ACCESS}`,
      },
    ],
    relatedPosts: [POST.stoppedBuying, POST.supplierRate, POST.deadStock, POST.crossSell],
  },
];
