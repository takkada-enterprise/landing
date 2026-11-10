# Claims sheet: `/party-wise-item-wise-sales-report-tally/` (new reports pages, 2026-11-10)

Page: Party-wise item-wise sales report for Tally (spoke of `/tally-reports-on-mobile/`). Copy lives in `src/data/featurePagesReports.js`. Every capability sentence maps to a row below; anything else stays off.

## Gating

- Sales by Item and Purchases by Item are on every plan (R9). Item reports open for owners and full-access members only; the page says "Owners and full-access team members see item-wise sales and profit; you choose who else sees reports." (rule 3).
- In the prod app since 2026-09-14; grouping 10-29 and 11-06; quantity per unit 11-07. Nothing stage-only.
- Screens: `sales-by-item-grouped`, `sales-by-item-customers` drawn from the app's wording with made-up data; `sales-by-item`, `purchases-by-item`, `report-export` are real demo-company captures.

Source: new-reports claims table compiled 2026-11-10 (`scratchpad/reports-seo/claims.md`, rows R1-R35, M1-M21), against takkada `origin/main` 73ac89bbd (2.1.326+351) and prod (SELECT only). Tally keys checked 2026-11-10 against TallyHelp (Stock Summary: F7 Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing Analysis via Alt+G) and Tally's business guide "Profitability analysis in TallyPrime" (Sales Register, a month, F7 Show Profit; Ledger Movement Analysis).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| R1 | Quantity, net amount, average price and the change against the previous month, quarter or financial year. (Answer points, walkthrough 1, comparison.) | LIVE |
| R2 | Net amount after line discount and before GST. (Walkthrough 1, llms.) | LIVE |
| R3 | Group by Item, Group, Customer or Month; Category, Area, Voucher Type, Cost Centre when your Tally uses them. (Answer, walkthrough 2, FAQ 5.) | LIVE |
| R4 | Tap an item for its customers at their average price, then a customer for the invoices. (Answer, walkthrough 3, FAQ 2.) | LIVE |
| R5 | Grouped rows show quantity in each unit, never one added-up figure. (Walkthrough 2, FAQ 4.) | LIVE |
| R6 | Purchases by Item: what each item cost, average rate, gap against selling price, supplier by supplier. (Walkthrough 4, use case 3.) | LIVE |
| R7 | Export to Excel or PDF, sent from the phone's share sheet. (Walkthrough 5.) | LIVE |
| R8 | Sales by Item takes customer returns (credit notes) off and shows them in a Returns column; Purchases by Item does the same with debit notes (app main 73ac89bbd, plan 2026-10-29-005; claims R8 corrected 2026-11-10). (Walkthroughs 3-4, disclaimer, FAQ 3.) | LIVE, required |
| R9, rule 3 | On every plan; owners and full-access members see item-wise sales. (planPointer, FAQ 6.) | LIVE |
| Tally | Stock Summary and the party ledger / Ledger Movement Analysis one side at a time; Alt+C New Column. | Checked 2026-11-10 |

## Cannot say

- "Real-time", "live Tally data", "close to live", "to the rupee with Tally", "identical to Tally" (rule 5: say "from your Tally, as of the last sync").
- "AI-powered", "predicts", "100%", "automatic reorder", "auto-dispatch", "bulk WhatsApp", "to all customers", "the only".
- Cost as FIFO, batch cost, landed cost, after freight or after GST (R20, R13).
- "Every salesman sees margins" (rule 3).
- State-wise, crop-wise, dealer grades, NRV, product cost reports (C4).
- Any price, "free trial includes", usage or customer counts, customer names, testimonials, competitor names, "Paysaathi".
- "MIS Reports" as a tile name (it is "Monthly P&L & Balance Sheet").
- Any rupee figure on the page (test-enforced); examples are quantities and percents.
- "Boxes and pieces added together in Tally" as a Tally limitation (not verified; the comparison row was dropped).
- "Credit notes are not taken off Sales by Item": out of date since app plan 2026-10-29-005 (single company nets returns into a Returns column; only company-group mode shows the old note).
