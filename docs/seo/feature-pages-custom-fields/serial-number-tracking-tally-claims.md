# Claims sheet: `/serial-number-tracking-tally/` (Custom Fields pages, 2026-11-10)

Page: Serial number tracking for Tally (hub). Copy lives in `src/data/featurePagesCustomFields.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `custom_fields` (the Custom Fields add-on), default `inactive`, switched on per company (admin confirm). On prod 2026-11-10 (SELECT counts only): 2 companies with it active (demo co143 and one new trial), 0 field sets, 0 units, 0 claims. Nobody has used it yet, so capability claims only, never usage, customers or testimonials.
- Live in the prod app 2.1.326+351 (takkada `origin/main` 73ac89bbd, web live, Android production) with backend migrations 20261050360100-361000 and connector v1.0.139+. iOS 2.1.326 was in App Review on 2026-11-10, so the page says "phone" and never names iPhone (C34).
- Price not decided. The page prints no price; `planPointer` names Momentum and the note reads "Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company." No "free" and no trial wording: `custom_fields` is not fenced from trials today (open decision for Ronak), so the page says nothing either way.
- One Tally setup step, said on the page: "Maintain in batches" on for the items (C3).
- Screens are drawn from the app's own wording (operator exception in their manifest rows), not captures: 0 units on prod and stage, demo co143 has no batch-wise items. Night capture on stage co7088 replaces them.

Source: Custom Fields claims table compiled 2026-11-10 (`scratchpad/customfields-seo/claims.md`, rows C1-C35), evidence under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main`. Re-run its "Publish-day checks" before this page merges to `main`. Copy lives in `src/data/featurePagesCustomFields.js`; banned wording is pinned by the "Custom Fields pages stay inside their claims sheets" describe in `src/data/__tests__/feature-pages.test.js`.

Tally facts on this page were checked 2026-11-10 against primary sources: Tally help "Identify Unsold Goods using Batch-wise Details" (F11 "Maintain batch-wise details", item "Maintain in batches", the IMEI as the batch number for a single unit, Display > Inventory Books > Batch shows unsold units; FAQ 1) and tallysolutions.com "Personalise invoice templates in TallyPrime" (F7 custom fields are company-level and invoice-level, none at item level; FAQ 7).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| C1, C2, C4, C6 | Fields per stock group (text, number, date, pick from a list), subgroups inherit, Must be filled, Print on the bill. (Walkthrough 1, FAQ 4, llms.) | LIVE |
| C3 | One field is the Unit no, the batch name in Tally; turn on "Maintain in batches"; the app lists any item that is not. (Walkthrough 1, FAQ 2, FAQ 6, disclaimer.) | LIVE, must-say |
| C5 | Remove a field and the details already saved stay. (FAQ 4.) | LIVE |
| C7 | No TDL to install; the Unit no goes to Tally as the batch through Takkada's Tally connector. (FAQ 2, FAQ 7, disclaimer.) | LIVE |
| C8, C9, C11, C12 | One row per unit on purchase invoice, goods receipt, stock journal inward, sales return; paste a column; a number typed twice is flagged; a unit in stock cannot be bought again. (Walkthrough 2, use case 2.) | LIVE |
| C13, C14 | Pick from units still in stock in that godown on sales order, challan, invoice, debit note, stock journal; search or tap "Color: Red"; picks set the quantity and fill the description lines. (Walkthrough 3, answer, use case 1.) | LIVE |
| C15, C16 | No unit sold twice, built into two products or booked on two orders in Takkada; the refusal names the bill. (Walkthrough 3, FAQ 3, comparison.) | LIVE, "in Takkada" only |
| C17, C18 | Units picked on a sales order are held for that customer and carry order to challan to invoice. (Walkthrough 4.) | LIVE |
| C22 | Parts linked in the production run, with the Manufacturing add-on; in-house production, not job work. (Comparison, disclaimer.) | CAVEAT wording |
| C24 | Details print under the item on sales invoice, sales order, delivery challan, credit note, debit note. (Walkthrough 4, FAQ 5.) | LIVE |
| C25 | The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. (Walkthrough 4, FAQ 5.) | CAVEAT wording |
| C26, C27 | Units bought or made in Tally show as Details missing after Takkada syncs with Tally; a sale typed straight into Tally is matched after Takkada syncs, not blocked, and shows under Units needing attention. (Walkthrough 6, FAQ 3, FAQ 6, disclaimer.) | CAVEAT wording |
| C28, C29 | Units by detail counts units sold or in stock by any field between dates; a part inside a sold unit counts as sold. (Walkthrough 5.) | LIVE |
| C30, C31 | Unit history: type any detail, see the unit, the vehicle it went into or its parts, and every step with date, bill and party. (Walkthrough 6, use case 3.) | LIVE |
| C32, C33 | Phone, or a computer browser with Web view (Assurance plan, per the rate card); Custom fields and Units by detail in the Stock menu with the Desktop entry add-on. (FAQ 8.) | LIVE / CAVEAT wording |
| C35 | Switched on per company; ask your partner or us. (FAQ 9, plan note.) | LIVE |

Every Custom Fields page says "Maintain in batches" (C3), keeps never-twice "in Takkada" (C15) and, on the same page, says a sale typed straight into Tally is "matched after Takkada syncs" (C27).

## Cannot say

- Purchase-side details reaching Tally (C10, NOT LIVE for pages): never "the purchase in Tally shows the chassis no". The only Tally sentence is C25 for the sale.
- "Saved / posted / stored / kept in Tally", "inside Tally", "custom fields in Tally", "Tally fields", "UDF", "two-way sync" (C7, C25, C27). Takkada keeps the details; the Unit no goes to Tally as the batch through Takkada's Tally connector.
- Never-twice outside Takkada: "impossible", "fraud-proof", "100%", "blocks it in Tally" (C15). Always "in Takkada", and the same page says a sale typed straight into Tally is matched after Takkada syncs, not blocked (C27).
- Scanning, camera, barcode or label printing per unit; warranty tracking, warranty or AMC reminders, warranty expiry. "warrant" is banned on feature pages entirely; the warranty-claim lookup angle lives in a blog post only.
- Purchase orders carrying units, purchase-bill import filling unit numbers, customer self-orders or salesman orders picking units (they save without units, C17), a visible edit log of detail changes, "AI".
- Any price, "free", "included in your plan", "in the free trial", trials including the add-on (C35, flag 2).
- Usage numbers, customer names, testimonials, industries "using it", competitor names (any billing app, DMS vendor or Tally add-on maker), "the only", "Paysaathi", "iPhone" (C34 until the App Store build is approved).
- IMEI or chassis number being "mandatory" on a GST invoice, "CA approved", "RTO approved". Rule 46 and Form 21 lines are facts with "confirm with your CA" / "check with your RTO agent", never a feature claim.
- Production runs without the Manufacturing add-on, or for job work (C22).
- A computer layout except "with the Desktop entry add-on" (C33).
