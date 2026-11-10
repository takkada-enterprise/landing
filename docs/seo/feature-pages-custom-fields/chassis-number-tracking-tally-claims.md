# Claims sheet: `/chassis-number-tracking-tally/` (Custom Fields pages, 2026-11-10)

Page: Chassis number tracking for Tally (spoke). Copy lives in `src/data/featurePagesCustomFields.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `custom_fields` (the Custom Fields add-on), default `inactive`, switched on per company (admin confirm). On prod 2026-11-10 (SELECT counts only): 2 companies with it active (demo co143 and one new trial), 0 field sets, 0 units, 0 claims. Nobody has used it yet, so capability claims only, never usage, customers or testimonials.
- Live in the prod app 2.1.326+351 (takkada `origin/main` 73ac89bbd, web live, Android production) with backend migrations 20261050360100-361000 and connector v1.0.139+. iOS 2.1.326 was in App Review on 2026-11-10, so the page says "phone" and never names iPhone (C34).
- Price not decided. The page prints no price; `planPointer` names Momentum and the note reads "Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or message us and we will switch it on for your company." No "free" and no trial wording: `custom_fields` is not fenced from trials today (open decision for Ronak), so the page says nothing either way.
- One Tally setup step, said on the page: "Maintain in batches" on for the items (C3).
- Screens are drawn from the app's own wording (operator exception in their manifest rows), not captures: 0 units on prod and stage, demo co143 has no batch-wise items. Night capture on stage co7088 replaces them.

Source: Custom Fields claims table compiled 2026-11-10 (`scratchpad/customfields-seo/claims.md`, rows C1-C35), evidence under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main`. Re-run its "Publish-day checks" before this page merges to `main`. Copy lives in `src/data/featurePagesCustomFields.js`; banned wording is pinned by the "Custom Fields pages stay inside their claims sheets" describe in `src/data/__tests__/feature-pages.test.js`.

Facts checked 2026-11-10: Form 21 (sale certificate, CMVR Rule 47) asks for the chassis number and the engine number, or motor number for battery-operated vehicles (Assam Transport Department Form 21 PDF as indexed; the PDF itself returned 404 on 2026-11-10, so the field names were confirmed from the gazette G.S.R. 336(E) of 29.05.2020, whose Form 22 under the same Rule 47 names "Chassis number" and "Engine number / Motor number (in case of battery operated vehicles)"). Ronak or a CA reads FAQ 2 before publishing. FAQ 1 names no Tally setting: the description-line setting name is verified in the blog post that explains it.

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| C1, C3, C4 | Chassis no as the Unit no, the batch name in Tally; motor no, colour, battery no as fields; Must be filled and Print on the bill; turn on "Maintain in batches". (Walkthrough 1, disclaimer.) | LIVE, must-say |
| C8 | Each vehicle gets its own row on the purchase or goods receipt. (Walkthrough 1.) | LIVE |
| C13, C14 | Vehicles picked from those still in stock in that godown on the sales order, challan or invoice; tap "Color: Red"; picking fills the description lines. (Walkthrough 2, FAQ 1, use case 1.) | LIVE |
| C15 | No chassis sold twice in Takkada; refused naming the bill. (Walkthrough 2, comparison.) | LIVE, "in Takkada" only |
| C17 | A vehicle picked on the sales order is held for that customer; an order can be saved without one. (Use case 2, FAQ 4.) | LIVE |
| C22 | With the Manufacturing add-on, a production run gives each finished vehicle its chassis no and you pick its parts, any number; a part used in one vehicle cannot go into another; in-house production, not job work. (Walkthrough 4, use case 3, FAQ 3, disclaimer.) | CAVEAT wording |
| C23, C24 | Chassis no, motor no, colour and the parts' numbers (Battery no, Charger no) print under the item on the sales invoice and challan. (Walkthrough 3, hero, FAQ 3.) | LIVE |
| C25 | The sale goes to Tally through Takkada with the chassis no as the batch and the details in the item's description lines. (Walkthrough 3.) | CAVEAT wording |
| C27 | A sale typed straight into Tally is matched after Takkada syncs, not blocked. (Walkthrough 2, disclaimer.) | CAVEAT wording |
| C28, C29 | Units by detail counts vehicles by colour or any field; a battery inside a sold scooter counts as sold. (Walkthrough 5.) | LIVE |
| C30 | Unit history finds any battery or chassis no with every bill. (Walkthrough 4.) | LIVE |
| C35 | Part of the Custom Fields add-on; production runs also need the Manufacturing add-on. (FAQ 6, plan note.) | LIVE |
| Scope | FAQ 5: billing and stock on top of Tally; no workshop, service job or registration module. A scope statement, not a feature claim. | n/a |

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
