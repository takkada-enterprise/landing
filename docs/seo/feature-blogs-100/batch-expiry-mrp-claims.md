# Claims sheet: `batch-expiry-mrp` batch (plan 2026-10-11-001, Task 10)

Checked 2026-10-12 against prod and takkada `origin/main` (e80468be, the live release 2.1.288). App paths are under `/Users/ronak/Desktop/PaySaathi/takkada/takkada`, read with `git show origin/main:<path>`; line numbers from `git show … | cat -n` (blank lines kept). Backend paths are supabase-functions `origin/main` (4874843a). Tally-writer paths are tally-database-loader `origin/master` (aa79b043, 1.0.127, the auto-updating build).

- B1 SQL (prod, read-only): `select count(distinct company_id) from trn_batch where expiry_on is not null or mrp_rate > 0;` returned **13**. Above 0, so the batch proceeds. Never quoted in copy.
- The setting is a company switch, not an entitlement. Prod `invoice_config`: `price_by_batch_in_invoice` true on **0** companies, `show_batch_in_invoice` true on 12 (2026-10-12). The switch, the picker and the PDF line are on `origin/main` and the prod RPC is live, so this is a capability that ships today and nobody has switched on yet. No adoption language anywhere; never imply anyone uses it.
- Prod `get_item_batch_stock` returns `TABLE(batch_name, quantity, mrp, last_sold_rate, purchase_rate, manufactured_on, expiry_on)`; the live body contains `nullif(tb.mrp_rate, 0)`, the sales-only last-sold filter, `qty > 0` and `order by b.bname` (matches `20261036750700_get_item_batch_stock_pricing.sql`).
- Prod: 0 sales-invoice lines (app or Tally) carry Mfg/Exp in `batch_allocations` today, consistent with 0 companies on the switch.

## Can say

**The switch**
- Settings, Invoices has a switch **Price by batch**, subtitle "One batch per line with its own rate (MRP, else last sold, else item rate). Mfg and Exp print on the bill." (`lib/screens/settings/invoices_settings_screen.dart:1696–1701`).
- It sits under **Batch numbers on invoices** ("Show the per-item Batch field during invoice creation.", `:1677–1681`). Turning Price by batch on turns Batch numbers on first; turning Batch numbers off turns Price by batch off (`:453–484`).
- Only business admins change invoice settings (`lib/services/invoice_config_service.dart:1253`; switch disabled when `canChangeInvoiceFields` is false, `:1705–1713`). Off by default and off on a failed read (`invoice_config_service.dart:1247–1251`).

**Where the batches come from**
- Batches, their stock, MRP, Mfg and Exp come from Tally: the batch rows on your Tally vouchers plus opening batch allocations (`20261036750700…pricing.sql:1–7, 137–167`). Batch facts prefer the inward (purchase) row that defined the batch (`:21–23`).
- The list shows only batches with stock left in the line's godown, counted as Tally counts it less this company's app invoices not yet in Tally (`:245–259`; `lib/services/godown_service.dart:301–302`).
- MRP = the latest inward row's MRP; a blank (0) MRP is treated as no MRP (`…pricing.sql:13–14, 141`). Last sold rate = the batch's latest sales-voucher line, amount ÷ quantity, free lines skipped (`:15–18, 178–179`). Purchase rate likewise from purchases (`:180–181`).
- The list is in batch-name order from the server, with expired batches moved to the bottom (`…pricing.sql:260`; `lib/utils/batch_pick.dart:302–310`).

**The picker (Price by batch on, sales invoice)**
- Tapping the Batch box on a sales-invoice line lists the batches. Each row: batch name, "N left", the rate the line would get, and a facts line `MRP ₹120 · Bought ₹90 · Mfg 01-Sep-2026 · Exp 31-Jan-2028`, each part only when known (`lib/widgets/invoice/priced_batch_row.dart:32–44`; `batch_pick.dart:289–300`).
- An expired batch (expiry before today) carries a red **Expired** label and sits at the bottom. It can still be picked; the app does not block it (`priced_batch_row.dart:45–52`; `batch_pick.dart:302–303` "still pickable"; `item_committed_map.dart:454–457`).
- Picking a batch on a line with no batch puts that batch and its rate on the line. Picking a second batch on a line that already has one adds a new line below for the same item, qty 1, at the new batch's rate; the first line keeps its rate and qty (`lib/screens/add_invoice_items_screen.dart:4809–4852`; `batch_pick.dart:347–371`).
- Typing two batch names on one priced line is refused: "One batch per line when pricing by batch" (`batch_pick.dart:392–401`).
- A scheme free line takes the batch only, keeping its rate and qty (`add_invoice_items_screen.dart:4818–4826`).
- After a pick you can type over the rate and the typed rate stays (manual override) (`add_invoice_items_screen.dart:4860–4863`), **except** when the ladder-discount rate lock is on: `cart_sheet.dart:637–638` returns early when `rateLocked`, fed by `_lockRateAndStep1` / setting `ladder_lock_rate_and_step1` (`add_invoice_items_screen.dart:5922`). Copy says "type your rate over it" and adds the ladder-lock caveat; never "stays open/editable".

**The rate ladder** (`batch_pick.dart:312–345`)
1. The batch MRP. Treated as GST-inclusive: used as-is in Incl. GST (and no-GST) mode; in Excl. GST mode GST is taken out, rounded to 2 decimals (`lib/utils/gst_calculator.dart:50–53`). Example: MRP ₹105 at 5% in Excl. mode → ₹100.00.
2. Else the batch's last sold rate (ex-GST), with GST added in Incl. GST mode (`lib/utils/invoice_price_level_resolver.dart:350–361`).
3. Else the line's current rate (`batch_pick.dart:320, 344`): whatever is on the line at the pick, which may be the item rate, a price-level rate or a rate the clerk typed. Copy says "the rate already on the line", never "the item's usual rate".
- A zero or missing figure falls through to the next rung (`batch_pick.dart:322–323`).

**On the bill and in Tally**
- The PDF and the saved-invoice screen print a sub-line under the item: `BATCH · Mfg 01-Sep-2026 · Exp 31-Jan-2028`, each date only when known (`batch_pick.dart:39–52`; edge twin `supabase/functions/generate-invoice-pdf/data-adapters.ts:298–337`). Dates are attached by a priced pick (`batch_pick.dart:378–390`).
- The batch's MRP reaches the bill as the line's rate (rung 1). There is no separate batch-MRP column (see Must not say).
- The bill goes to Tally with each line's batch name and, when known, Mfg (`MFDON`) and expiry (`EXPIRYPERIOD`) inside the batch allocation (tally-database-loader `src/TallyFunctions/xml/builders/voucher-builder/sales-purchase.mts:151`; `delivery-note-tracking.mts:68–83`; `src/main/queue/job-adapters/shared/line-items.ts:61–62`; the app saves `mfd`/`expiry` in `batch_allocations`, `lib/models/batch_allocation.dart:65–72`). Each line keeps its own rate. Dates are sent only when the line carries them (`buildBatchDatesXml`), so copy says "with its dates when known".

**With Price by batch off**
- With only Batch numbers on, the sales-invoice Batch box still lists in-stock batches with "N left" (no rate, no facts line, no Expired label), allows several batches with quantities on one line, and does not change the rate (`cart_sheet.dart:578–579, 1059–1075`; `add_invoice_items_screen.dart:4783–4806`).

**Elsewhere**
- The item page lists batches under each godown with quantity and the same facts line (MRP, Bought, Mfg, Exp) where known, whatever the switch (`lib/widgets/godown/item_godown_breakdown.dart:293–333`; `lib/screens/stock_item_detail_screen.dart:401`).

**Flows**
- Price by batch and the batch list apply to the **sales invoice** only (`add_invoice_items_screen.dart:397–399, 747–755, 5924–5929`). The desktop entry screen's sales invoice uses the same rules (`lib/desktop/entry/desktop_entry_page.dart:574–576, 4152–4175`), but desktop is a paid module; posts stay on the phone.

## Must not say

- That anyone uses it, or any count of companies (0 have it on; never adoption language).
- That the list is sorted by expiry, nearest expiry first, FEFO/FIFO, or that the app picks a batch for you. The order is batch name, expired last, and the clerk picks.
- That the app blocks billing an expired batch, warns at save, or alerts on near-expiry. Only the red Expired label in the picker. No expiry report, no near-expiry list, no reminders.
- That batches, Mfg or Exp are created or edited in the app. They come from Tally. (A typed new name is possible in the box, but carries no dates or rate; do not promote it.)
- That the PDF prints the batch MRP in its own column. The MRP/Marginal column (Incl. GST companies, lines that carry an MRP) reads the line's own MRP field, which the batch pick does not fill (`generate-invoice-pdf/index.ts:567–578`; `invoice_line_item.dart:243–246`).
- That Mfg/Exp print when Price by batch is off, or on invoices billed from Tally. Dates come with a priced pick.
- That Price by batch works on quotations, sales orders, delivery challans, credit notes / sales returns or purchase bills. Sales orders and credit notes go to Tally with the default batch only (`sales-order.mts:102`, `credit-note.mts:104`).
- That the rate is locked to MRP, or that it is always editable (ladder rate lock blocks typing). The MRP default sits above what most distributors charge a retailer, which the posts say plainly.
- That purchase import reads batch or expiry (consistent with `import-automation-claims.md`), or that the van / loading sheet shows batch or expiry (consistent with `dispatch-load-claims.md`).
- Pharma or other GST examples at 12% (slab folded into 5%/18% in Sept 2025). Prefer Incl. GST examples where the MRP is the rate; the one Excl. example is MRP ₹105 at 5% → ₹100.00.
- Absolutes ("every invoice", "always", "har bill") about the dates or MRP: they appear only when Tally holds them.
- Batch tracking by godown transfer, stock journals, or any stock movement other than the sales invoice.
