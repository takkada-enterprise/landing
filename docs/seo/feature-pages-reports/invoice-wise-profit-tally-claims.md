# Claims sheet: `/invoice-wise-profit-tally/` (new reports pages, 2026-11-10)

Page: Invoice-wise profit for Tally (spoke of `/tally-reports-on-mobile/`). Copy lives in `src/data/featurePagesReports.js`.

## Gating

- No add-on gate: `lib/services/invoice_profit_read.dart` checks only that the viewer may see cost (`memberCanSeeCost`) and that the admin turned on "Show margin on invoice". So "on every plan; the owner turns them on in settings".
- In the prod app since 2026-11-02.
- Cost wording (R20 CAVEAT): "the item's cost for that financial year as your Tally values it". Supplier-deal credits lower it only for Schemes companies, so they are not mentioned.
- Margin % from `marginPercentText` (`lib/models/item_report.dart`): margin ÷ sale, one decimal, so "Margin % on the invoice is on selling price".
- Screens: `invoice-margin`, `invoice-add-cost`, `sales-by-item-customers` drawn from the app's wording with made-up data.

Source: new-reports claims table compiled 2026-11-10 (`scratchpad/reports-seo/claims.md`, rows R1-R35, M1-M21), against takkada `origin/main` 73ac89bbd (2.1.326+351) and prod (SELECT only). Tally keys checked 2026-11-10 against TallyHelp (Stock Summary: F7 Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing Analysis via Alt+G) and Tally's business guide "Profitability analysis in TallyPrime" (Sales Register, a month, F7 Show Profit; Ledger Movement Analysis).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| R18 | Cost, Margin and Margin % on each line of a saved sales invoice once the owner turns on Show margin on invoice. (Answer, walkthrough 1, use case 1.) | LIVE |
| R19 | Only people you allow to see profit see it. (Answer points, walkthrough 1, use case 3, FAQ 4.) | LIVE |
| R20 | Cost is the item's cost for that financial year as your Tally values it; a missing or wrong cost can be typed for one line, used for this invoice only, not sent to Tally. (Answer, walkthrough 1-2, FAQs 2, 5, 6.) | CAVEAT wording |
| G-margin | Margin % on the invoice is on selling price; 100 sold, 80 cost = 20%, which is 25% on cost. (Walkthrough 1, FAQ 3.) | LIVE |
| R4, R8 | Sales by Item → item → customers → invoice; Sales by Item shows customer returns (credit notes) in a Returns column (R8 corrected 2026-11-10). (Walkthrough 3, disclaimer.) | LIVE |
| Tally | Sales Register, a month, F7 (Show Profit): Transaction Value, Gross Revenue, Cost, Gross Profit; a loss shows a minus sign. | Checked 2026-11-10 |

## Cannot say

- "Real-time", "live Tally data", "close to live", "to the rupee with Tally", "identical to Tally" (rule 5: say "from your Tally, as of the last sync").
- "AI-powered", "predicts", "100%", "automatic reorder", "auto-dispatch", "bulk WhatsApp", "to all customers", "the only".
- Cost as FIFO, batch cost, landed cost, after freight or after GST (R20, R13).
- "Every salesman sees margins" (rule 3).
- State-wise, crop-wise, dealer grades, NRV, product cost reports (C4).
- Any price, "free trial includes", usage or customer counts, customer names, testimonials, competitor names, "Paysaathi".
- "MIS Reports" as a tile name (it is "Monthly P&L & Balance Sheet").
- Any rupee figure on the page (test-enforced); examples are quantities and percents.
- Supplier-deal credits in the cost (Schemes companies only).
- "Margin after GST" or on cost (it is on selling price).
