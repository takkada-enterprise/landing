# Claims sheet: `/stock-count-app/` (Physical Stock Count pages, 2026-11-10)

Page: Stock count app (the spoke, the counter's side). Copy lives in `src/data/featurePagesStockCount.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `physical_stock_count` (the Physical Stock Count add-on), default inactive, switched on by hand per company. Single-customer entitlement, so trials and demo company 143 do **not** get it. Capability claims only, never adoption claims.
- Live in the prod app since 2.1.321 (2026-11-04), in takkada `origin/main` 73ac89bbd (2.1.326+351). The page says "phone" and never names iPhone (S29: iOS 2.1.326 in App Review on 2026-11-10).
- **Tally (S22 CAVEAT):** no stock-count journal has reached a real Tally yet (the prod pair for co339 is DEAD, no LAN proof). The page says the stock journal is "made for Tally", once, beside the batch-wise line. Re-run the claims table's publish-day check 1 before merging to `main`.
- "Accept all" and one stock journal per count are stage only; the page never counts journals.
- Price not decided. No price prints; `planPointer` names Momentum and the note sends the reader to a partner or to WhatsApp. No "free trial".
- Screens are drawn from the app's own prod wording, not captures, under an operator exception (add-on not on demo co143; captures are night-only).

Source: stock count claims table compiled 2026-11-10 (`scratchpad/stockcount-seo/claims.md`, rows S1-S30).

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| S1 | Assigned in three picks: a stock group, a godown and a person. (Walkthrough 1, use case 1.) | LIVE |
| S2, S3, S4 | Up to 500 items, pick a subgroup for a bigger group, the same item cannot sit on two open counts in one godown, zero-stock items included so the list gives nothing away. (FAQ 4.) | LIVE |
| S5 | The counter is another team member on their own Takkada login; you cannot assign a count to yourself; each extra person is an Extra user. (FAQ 1, disclaimer.) | LIVE |
| S6 | The owner or a full-access member reviews and approves. (Walkthrough 4, comparison.) | LIVE |
| S7 | The count shows on a Stock count tile on the home screen with Open and Closed tabs, and the tile shows how many counts are waiting. Never "the counter is notified". (Walkthrough 1, use case 3.) | LIVE |
| S8 | Item names and units with an empty box, never the book stock. (Headline, subheadline, answer, walkthrough 2, comparison.) | LIVE |
| S9 | Those items read Being counted for the counter across Takkada (item page, stock reports, billing picker); Takkada cannot hide stock in Tally on a computer. (Walkthrough 3, FAQ 2, use case 2.) | CAVEAT wording |
| S10 | The counter keeps billing; only the quantity of counted items is hidden. (Use case 2.) | LIVE |
| S11 | Save as you go, submit once every item has a number, items left shown. Needs a data connection. (Answer points, walkthrough 2, comparison, disclaimer.) | LIVE |
| S12 | A note for anything not on the list; Takkada does not create the item, you add it in Tally. (Answer points, walkthrough 2, comparison, FAQ 3.) | LIVE |
| S13 | Book stock frozen at the minute the count was submitted. (Use case 3.) | LIVE |
| S14 | Book stock, counted, difference and rate for every item. (Answer, walkthrough 4.) | LIVE |
| S16, S17 | Send one item back; the recount shows only that item with an empty box. (Answer, walkthrough 5, comparison.) | LIVE |
| S18 | The person who counted cannot review or approve their own count. (Answer points, walkthrough 4, comparison.) | LIVE |
| S21 | Cancel at any time before approval: nothing is posted and the counter sees the stock again. (Walkthrough 3, FAQ 5.) | LIVE |
| S22 | Approval makes the stock journal for Tally at cost rate. (Walkthrough 5, comparison.) | CAVEAT wording |
| S26 | "Batch-wise items are counted but left out of the journal; adjust those in Tally by batch." In walkthrough 5 and the comparison disclaimer. | CAVEAT, required |
| S30 | Switched on per company; ask your partner or message us. (FAQ 6, planPointer.) | LIVE |

## Cannot say

- "Accept all", "one journal per count", or any number of journals (stage only).
- "Posted in Tally", "synced to Tally", "Tally updated automatically", "corrects/fixes your Tally stock" (S22 CAVEAT).
- "100% blind", "tamper-proof", "theft-proof" (S9 caveat).
- Offline counting (S11: needs a connection), barcode scanning, batch-wise or serial counting, several godowns or groups in one count, adding items from the count, any push, WhatsApp or other alert to the counter, cycle-count schedules or reminders, "AI".
- Any price, "free", "included in your plan", usage numbers, testimonials, competitor names, "the only app", and the internal name "Paysaathi".
- iPhone (S29) until the App Store build with stock count is live.
