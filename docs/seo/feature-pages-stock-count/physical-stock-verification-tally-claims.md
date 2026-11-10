# Claims sheet: `/physical-stock-verification-tally/` (Physical Stock Count pages, 2026-11-10)

Page: Physical stock verification for Tally (the hub). Copy lives in `src/data/featurePagesStockCount.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `physical_stock_count` (the Physical Stock Count add-on), default inactive, switched on by hand per company. It is a single-customer entitlement, so trials and demo company 143 do **not** get it. Capability claims only, never adoption claims (prod on 2026-11-10: 2 active companies, 2 counts at one company).
- Live in the prod app since 2.1.321 (2026-11-04), in takkada `origin/main` 73ac89bbd (2.1.326+351); backend RPCs and tables present on prod. iOS 2.1.326 was in App Review on 2026-11-10, so the page says "phone" and never names iPhone (S29).
- **Tally (S22 CAVEAT):** no stock-count journal has reached a real Tally yet. The one prod approval (co339, count of 24 items) made two `CREATE_STOCK_JOURNAL` jobs that are DEAD, and there is no LAN proof. Every Tally sentence says the stock journal is "made for Tally" and "sent through Takkada's Tally connector". Re-run the claims table's publish-day check 1 before this page merges to `main`.
- "Accept all" and one stock journal per count are stage only. Prod makes up to two journals, so the page never counts journals and says "the stock journal".
- Price not decided. The page prints no price; `planPointer` names Momentum and the note sends the reader to a partner or to WhatsApp. No "free trial": trials and the demo do not include the add-on.
- Screens are drawn from the app's own prod wording (`lib/screens/stock_count/*`), not app captures, under an operator exception (the add-on is not on demo co143, and app captures are night-only). A stage co7088 capture replaces them.

Source: stock count claims table compiled 2026-11-10 (`scratchpad/stockcount-seo/claims.md`, rows S1-S30). Evidence paths are in that table, under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main` and `supabase-functions` migrations 20261050110100-111500.

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| S1 | One stock group or subgroup, one godown, one person, assigned as a count. (Answer points, walkthrough 1, comparison "Who counts", use case 1.) | LIVE |
| S2 | Every item in the group goes on the list, zero-stock items too, so the list gives nothing away. (Walkthrough 1.) | LIVE |
| S3, S4 | Up to 500 items in a count; the same item cannot be on two open counts in the same godown. (Walkthrough 1, use case 2, FAQ 6.) | LIVE |
| S5 | The counter is another team member on their own Takkada login; you cannot assign a count to yourself. (Walkthrough 1, comparison.) | LIVE |
| S8 | The counter sees item names and units and types what is on the shelf, never the book stock. (Headline, answer, walkthrough 2, FAQ 1.) | LIVE |
| S9 | While the count is open, the stock of those items is hidden from the counter across Takkada: item page, stock reports, billing picker show Being counted. Always said "in Takkada", and FAQ 1 says Takkada cannot hide stock inside Tally. (Walkthrough 3, FAQ 1.) | CAVEAT wording |
| S10 | Items can still be billed during the count; only the quantity is hidden. (Walkthrough 3, FAQ 2.) | LIVE |
| S11, S12 | Save as you go, items left shown, a note for anything not on the list. (Walkthrough 2.) | LIVE |
| S13, S15 | Book stock frozen at submit; items sold, bought or moved afterwards marked Moved after count. (Walkthrough 4, comparison, FAQ 2.) | LIVE |
| S14 | Book stock, counted, difference and rate side by side. (Answer points, walkthrough 4.) | LIVE |
| S16, S17 | Accept a difference or send one item back; the recount shows only the items sent back with empty boxes. (Walkthrough 5, comparison.) | LIVE |
| S18 | The person who counted cannot review or approve their own count. (Walkthrough 5, use case 3.) | LIVE |
| S19 | Valued at cost: the godown's FIFO cost, else Tally's closing rate, else a rate you type; rates editable before approval. (Comparison, FAQ 3.) | LIVE |
| S20 | Review as a table on a computer with A and R keys, said only "with the Desktop entry add-on". (FAQ 7.) | CAVEAT wording |
| S22 | Approval makes the stock journal for Tally, shortages out of the godown and extra stock in, at the rates you approved, sent through Takkada's Tally connector. (Answer, walkthrough 6, comparison, disclaimer.) | CAVEAT wording |
| S23 | Before approval the app shows the shortage and excess value. Never "Shortage journal" / "Excess journal" counts. (Walkthrough 6, FAQ 3.) | LIVE |
| S26 | "Batch-wise items are counted but left out of the journal; adjust those in Tally by batch." On the page in walkthrough 6, the comparison disclaimer and FAQ 5, beside every full S22 sentence. | CAVEAT, required |
| S27 | Takkada makes a Stock Journal, not Tally's Physical Stock voucher. "Physical Stock voucher" appears only as the reader's alternative. (Comparison row and disclaimer, FAQ 4.) | CAVEAT wording |
| S28 | Count on the phone; review on the phone or the Takkada web app. (FAQ 7.) | LIVE |
| S30 | Switched on per company; ask your partner or message us. (FAQ 8, planPointer.) | LIVE |
| Tally side | Tally Prime's Physical Stock voucher records the counted quantity and Tally books the difference itself (help.tallysolutions.com, Physical Stock voucher). Described as the reader's alternative, never as a fault. | Basis |

## Cannot say

- "Accept all", approve every difference in one tap, "one journal per count", or any number of journals (stage only).
- "Posted in Tally", "posted to Tally", "synced to Tally", "Tally updated automatically", "corrects/fixes your Tally stock" (S22 CAVEAT: no stock-count journal proven in a real Tally).
- That Takkada posts Tally's Physical Stock voucher (S27).
- "100% blind", "tamper-proof", "theft-proof", "impossible to find out" (S9: Tally itself and two binary hints still reveal stock).
- Barcode counting, batch-wise or serial counting, several godowns or groups in one count, adding new items from the count, offline counting, any alert or notification to the counter, cycle-count schedules or reminders, "AI".
- Any price, "free", "included in your plan", usage numbers, testimonials, competitor names, "the only app", and the internal name "Paysaathi".
- iPhone (S29) until the App Store build with stock count is live.
- Reorder claims: those live on `/stock-control-tally/`; this page does not repeat them.
