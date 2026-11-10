# Claims sheet: `/sales-comparison-report-tally/` (new reports pages, 2026-11-10)

Page: Sales comparison report for Tally (spoke of `/tally-reports-on-mobile/`). Copy lives in `src/data/featurePagesReports.js`.

## Gating

- Sales Comparison is on every plan, same access as Sales by Item (R26). In the prod app since 2026-11-04.
- Rows are stock groups and their items only (G-compare). Percent changes in examples are whole numbers; the running period is "so far".
- Screens: `sales-comparison`, `sales-comparison-items`, `sales-by-item-customers` drawn from the app's wording with made-up data.

Source: new-reports claims table compiled 2026-11-10 (`scratchpad/reports-seo/claims.md`, rows R1-R35, M1-M21), against takkada `origin/main` 73ac89bbd (2.1.326+351) and prod (SELECT only). Tally keys checked 2026-11-10 against TallyHelp (Stock Summary: F7 Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing Analysis via Alt+G) and Tally's business guide "Profitability analysis in TallyPrime" (Sales Register, a month, F7 Show Profit; Ledger Movement Analysis).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| R21 | Stock groups side by side, month by month or by financial-year quarter (header like Q2 26-27), opening into items. (Answer, walkthrough 1-2, FAQ 6.) | LIVE |
| R22 | Rupees or quantity. (Answer points, walkthrough 2, FAQ 4.) | LIVE |
| R23 | Sort by Latest, Biggest drop or Biggest rise. (Answer points, walkthrough 1.) | LIVE |
| R24 | Change column in whole percent between the last two periods; "new" when the earlier period was nil. Example 410 → 352 tins = -14%. (Walkthrough 1, FAQ 5.) | LIVE |
| R25 | The running month is marked so far. (Answer points, use case 3, FAQ 2.) | LIVE |
| Model | Free goods stay in the quantity (`visibleRows` keeps rows with quantity and no amount, "so free goods stay", `lib/models/sales_period_compare.dart`). (Disclaimer.) | LIVE |
| R3, R4, R8 | For sales by customer, Sales by Item grouped by Customer; Sales by Item shows customer returns (credit notes) in a Returns column (R8 corrected 2026-11-10). (Walkthrough 3, FAQ 3, disclaimer.) | LIVE |
| Tally | Alt+C (New Column) adds a period beside the report; the change is left to work out. Alt+N (Auto Column) is not used: its monthly option was not confirmed on the help page read. | Checked 2026-11-10 |

## Cannot say

- "Real-time", "live Tally data", "close to live", "to the rupee with Tally", "identical to Tally" (rule 5: say "from your Tally, as of the last sync").
- "AI-powered", "predicts", "100%", "automatic reorder", "auto-dispatch", "bulk WhatsApp", "to all customers", "the only".
- Cost as FIFO, batch cost, landed cost, after freight or after GST (R20, R13).
- "Every salesman sees margins" (rule 3).
- State-wise, crop-wise, dealer grades, NRV, product cost reports (C4).
- Any price, "free trial includes", usage or customer counts, customer names, testimonials, competitor names, "Paysaathi".
- "MIS Reports" as a tile name (it is "Monthly P&L & Balance Sheet").
- Any rupee figure on the page (test-enforced); examples are quantities and percents.
- Comparison by customer, salesman or area (rows are stock groups and items only).
- Decimal percent changes in examples.
