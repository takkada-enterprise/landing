# Claims sheet: `/tally-reports-on-mobile/` (hub, rebuilt 2026-11-10)

Page: Tally reports on mobile (hub of the new reports spokes). Copy lives in `src/data/featurePages.js` (FIRST_BATCH). The comparison table and its 2026-08-08 disclaimer are unchanged.

## Gating

- Reports are on every plan; the six doors everyone sees are Sales, Customers & orders, Purchase, Stock, Money and Accounts. "Today" exists only with MIS Insights and is named only beside the add-on sentence (R34, G-MIS).
- "Over twenty": the Reports tab shows 17 tiles to everyone on app main 73ac89bbd (Accounts 5, Sales 3, Customers & orders 3, Purchase 2, Stock 1, Money 3); the registers, Insights lists, godown stock and stock ledger take the count past twenty, so "Over thirty" was not used.
- Godown stock and the stock ledger open from the Stock button on the home screen for one company (the hub's Godown stock / Item book tiles are group-mode only).
- MIS Insights: "Part of the MIS Insights add-on. Ask us to switch it on for your business." verbatim, in FAQ 9 only. No price, no "free", no "trial".
- Screens: the twelve new gallery tiles and the walkthrough's new steps are drawn screens (group D); the hero `total-fy` and the older twelve tiles are real demo-company captures.

Source: new-reports claims table compiled 2026-11-10 (`scratchpad/reports-seo/claims.md`, rows R1-R35, M1-M21), against takkada `origin/main` 73ac89bbd (2.1.326+351) and prod (SELECT only). Tally keys checked 2026-11-10 against TallyHelp (Stock Summary: F7 Show Profit, Alt+C New Column; Stock Item Movement Analysis and Stock Ageing Analysis via Alt+G) and Tally's business guide "Profitability analysis in TallyPrime" (Sales Register, a month, F7 Show Profit; Ledger Movement Analysis).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| R34 | Reports grouped by the question, six doors, Find box on the phone. (Answer, walkthrough 1, FAQ 1, gallery 1.) | LIVE |
| R1, R3, R4, R8 | Sales by Item grouped in one tap, an item's customers at their average price; Sales by Item shows customer returns (credit notes) in a Returns column (R8 corrected 2026-11-10). (Walkthrough 2, FAQ 4.) | LIVE |
| R10, R12, R13, R15 | Insights cards; Vanished customers from your own WhatsApp. (Walkthrough 3, use cases 1-2, gallery 4-7.) | LIVE |
| R21, R23, R24 | Sales Comparison, biggest drop first, change in percent. (Walkthrough 4, gallery 8.) | LIVE |
| R18, R19, R20 | Cost and margin on each invoice line once the owner turns on Show margin on invoice; cost as your Tally values it. (Walkthrough 5, FAQ 5, gallery 9.) | LIVE / CAVEAT wording |
| R27 | Customers waiting: item by item, pending sales orders against stock. (Gallery 10, FAQ 2.) | LIVE |
| R29-R31 | Stock ledger: every voucher, opening and closing, all godowns or one, batches on the end date; PDF laid out like Tally's stock item register, or Excel. (Walkthrough 6, use case 3, gallery 11.) | LIVE |
| R32 | Godown stock by item, group or category. (FAQ 2, llms.) | LIVE |
| R33, R7 | Every register to Excel or PDF from the share sheet. (Walkthrough 7.) | LIVE |
| R35 | Monthly P&L & Balance Sheet, twelve months, each month's closing stock. (Gallery 12, FAQ 2.) | LIVE |
| rule 3, R19 | Owners and full-access team members see item-wise sales and profit; you choose who else sees reports. (FAQ 5.) | LIVE |
| rule 5 | "What you see is your Tally as of the last sync" (FAQ 3 replaces "close to live"). | LIVE |
| M-group | MIS Insights pages named (Customers to call, Stock health, Gross profit, Trend, Day view, Today door) with the add-on sentence. (FAQ 9.) | CAVEAT |

## Cannot say

- "Real-time", "live Tally data", "close to live", "to the rupee with Tally", "identical to Tally" (rule 5: say "from your Tally, as of the last sync").
- "AI-powered", "predicts", "100%", "automatic reorder", "auto-dispatch", "bulk WhatsApp", "to all customers", "the only".
- Cost as FIFO, batch cost, landed cost, after freight or after GST (R20, R13).
- "Every salesman sees margins" (rule 3).
- State-wise, crop-wise, dealer grades, NRV, product cost reports (C4).
- Any price, "free trial includes", usage or customer counts, customer names, testimonials, competitor names, "Paysaathi".
- "MIS Reports" as a tile name (it is "Monthly P&L & Balance Sheet").
- Any rupee figure on the page (test-enforced); examples are quantities and percents.
- "Today" door for everyone; any MIS page outside the add-on sentence; M20 schedule mail, M21 price lists, 360° overdue figures.
- "Reports+ is a paid add-on" (it is on for every company).
