# Claims sheet: `/imei-tracking-tally/` (Custom Fields pages, 2026-11-10)

Page: IMEI tracking for Tally (spoke). Copy lives in `src/data/featurePagesCustomFields.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `custom_fields` (the Custom Fields add-on), default `inactive`, switched on per company (admin confirm). On prod 2026-11-10 (SELECT counts only): 2 companies with it active (demo co143 and one new trial), 0 field sets, 0 units, 0 claims. Nobody has used it yet, so capability claims only, never usage, customers or testimonials.
- Live in the prod app 2.1.326+351 (takkada `origin/main` 73ac89bbd, web live, Android production) with backend migrations 20261050360100-361000 and connector v1.0.139+. iOS 2.1.326 was in App Review on 2026-11-10, so the page says "phone" and never names iPhone (C34).
- Price not decided. The page prints no price; `planPointer` names Momentum and the note reads "Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company." No "free" and no trial wording: `custom_fields` is not fenced from trials today (open decision for Ronak), so the page says nothing either way.
- One Tally setup step, said on the page: "Maintain in batches" on for the items (C3).
- Screens are drawn from the app's own wording (operator exception in their manifest rows), not captures: 0 units on prod and stage, demo co143 has no batch-wise items. Night capture on stage co7088 replaces them.

Source: Custom Fields claims table compiled 2026-11-10 (`scratchpad/customfields-seo/claims.md`, rows C1-C35), evidence under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main`. Re-run its "Publish-day checks" before this page merges to `main`. Copy lives in `src/data/featurePagesCustomFields.js`; banned wording is pinned by the "Custom Fields pages stay inside their claims sheets" describe in `src/data/__tests__/feature-pages.test.js`.

Facts checked 2026-11-10 against primary sources: Tally help "Identify Unsold Goods using Batch-wise Details" (F11 "Maintain batch-wise details", item "Maintain in batches", "use the IMEI number as the batch number for a single unit"; FAQ 1) and CGST Rule 46 on taxinformation.cbic.gov.in (lists the invoice particulars, "description of goods", no IMEI, serial or chassis particular; FAQ 2). FAQ 4 does not say a count opens the phones behind it: the Units by detail screen has no tap-through (`custom_units_report_screen.dart`).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| C1, C3 | The IMEI is the Unit no, the batch name in Tally, with colour or storage as fields; turn on "Maintain in batches". (Walkthrough 1, answer points, disclaimer.) | LIVE, must-say |
| C8, C9, C11 | One row per phone on the purchase invoice, goods receipt or sales return; paste the column of IMEIs; an IMEI typed twice is flagged as Entered twice; a phone in stock cannot be bought again. (Walkthrough 1, hero.) | LIVE |
| C13, C14 | Sales order, challan and invoice offer only phones still in stock in that godown; search by the last digits; picks set the quantity and fill the description lines. (Walkthrough 2, use case 1.) | LIVE |
| C15, C16 | No IMEI sold twice in Takkada; refused naming the bill; if two people bill the same phone at the same moment only one bill goes through. (Walkthrough 3, FAQ 3, use case 1.) | LIVE, "in Takkada" only |
| C17 | Phones picked on a sales order are held for that customer. (Use case 3.) | LIVE |
| C20 | Cancel a bill and its phones can be sold again. (Walkthrough 3.) | LIVE |
| C21 | The credit note offers only the phones on that invoice; the returned phone is back in stock. (FAQ 5, comparison.) | LIVE |
| C24 | The IMEI and fields marked Print on the bill print under the item. (FAQ 2, llms.) | LIVE |
| C25 | Each IMEI goes to Tally as the batch through Takkada's Tally connector. (FAQ 1, disclaimer.) | CAVEAT wording |
| C27 | A sale typed straight into Tally is matched after Takkada syncs, not blocked. (Walkthrough 3, disclaimer.) | CAVEAT wording |
| C28 | Units by detail counts phones sold or in stock by any field between dates. (Walkthrough 4, FAQ 4.) | LIVE |
| C30 | Unit history finds one IMEI: the purchase, the bill it went out on, the party. (Walkthrough 4, use case 2.) | LIVE |
| C35 | Part of the Custom Fields add-on, switched on per company. (FAQ 6, plan note.) | LIVE |

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
