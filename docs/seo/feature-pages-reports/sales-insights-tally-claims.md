# Claims sheet: `/sales-insights-tally/` (new reports pages, 2026-11-10)

Page: Sales insights from Tally (spoke of `/tally-reports-on-mobile/`). Copy lives in `src/data/featurePagesReports.js`.

## Gating

- Insights are part of Reports+, default active for every company (R17); the page says "included for every Takkada company", never names Reports+. Full-access members and owners see them.
- In the prod app since 2026-09-29.
- Cards are worked out when the tab opens: never "alerts", "notifies", "pushes", "predicts" (G-insights).
- Vanished customers opens the owner's own WhatsApp with a ready message, one customer at a time (R12).
- Screens: `insights-sales`, `insights-vanished`, `insights-below-cost`, `insights-purchase` drawn from `item_insights_tab.dart` wording with made-up data.

Source: new-reports claims table compiled 2026-11-10 (`scratchpad/reports-seo/claims.md`, rows R1-R35, M1-M21), against takkada `origin/main` 73ac89bbd (2.1.326+351) and prod (SELECT only). Tally keys checked 2026-11-10 against TallyHelp (Stock Summary: F7 Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing Analysis via Alt+G) and Tally's business guide "Profitability analysis in TallyPrime" (Sales Register, a month, F7 Show Profit; Ledger Movement Analysis).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| R10 | Sales cards: Slipping items, Vanished customers, Selling below cost, What's carrying me. (Answer, walkthrough 1.) | LIVE |
| R11 | Slipping items: how much less each item earned than the last period. (FAQ 5.) | LIVE |
| R12 | Vanished customers: bought an item last period, none this period, with what they spent; Send from my WhatsApp (own WhatsApp, one at a time) or Call. (Walkthrough 2, use case 1, FAQs 1, 4.) | LIVE |
| R13 | Selling below cost: items under purchase price and the amount given away; cost is the purchase price as Takkada reads it from your Tally. (Walkthrough 3, use case 2, FAQ 2.) | LIVE |
| R14 | What's carrying me: the few items that make 80% of sales; the top item's share only when it is 30% or more (`ItemConcentration.warns`). (FAQ 3.) | LIVE |
| R15 | Purchase cards: Cost creep, Over-buying, Supplier rate gap, Dead stock (no sale in 60 days or more, the biggest 25). (Walkthrough 4, FAQ 6.) | LIVE |
| R16 | Every card opens its full list for Excel or PDF. (Walkthrough 3, answer points.) | LIVE |
| R17 | Included for every Takkada company. (planPointer, FAQ 7.) | LIVE |
| R8 | Sales by Item shows customer returns (credit notes) in a Returns column; the Insights cards read sales before returns (R8 corrected 2026-11-10). (Disclaimer.) | LIVE |
| Tally | Sales Register F7 (Show Profit) minus signs; Stock Item Movement Analysis one item at a time; Stock Ageing Analysis needs batches turned on for the company and the items. | Checked 2026-11-10 |

## Cannot say

- "Real-time", "live Tally data", "close to live", "to the rupee with Tally", "identical to Tally" (rule 5: say "from your Tally, as of the last sync").
- "AI-powered", "predicts", "100%", "automatic reorder", "auto-dispatch", "bulk WhatsApp", "to all customers", "the only".
- Cost as FIFO, batch cost, landed cost, after freight or after GST (R20, R13).
- "Every salesman sees margins" (rule 3).
- State-wise, crop-wise, dealer grades, NRV, product cost reports (C4).
- Any price, "free trial includes", usage or customer counts, customer names, testimonials, competitor names, "Paysaathi".
- "MIS Reports" as a tile name (it is "Monthly P&L & Balance Sheet").
- Any rupee figure on the page (test-enforced); examples are quantities and percents.
- "Alerts you", "notifies", "sends" for any card; "messages all lost customers"; "automatic" WhatsApp.
- "All dead stock" (the card shows the biggest 25).
