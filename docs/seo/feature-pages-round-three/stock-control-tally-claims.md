# Claims sheet: `/stock-control-tally` (feature pages round three)

Checked 2026-11-05 against takkada `origin/main` 7d9784c7f (2.1.322, live on prod web) and prod (SELECT only, live function bodies). Line refs are `git -C /Users/ronak/Desktop/PaySaathi/takkada/takkada show origin/main:<path> | grep -n`, paths under `lib/`. Prod function line numbers are `pg_get_functiondef` line numbers on 2026-11-05.

## Gating

- Feature key `stockout_control`, or the legacy `reorder_list` key, checked server-side in `get_reorder_now_items__unmasked` (prod, lines 28-29) and in the app (`models/company_feature_access.dart:41`, `services/stockout_control_access_service.dart`).
- Off message: "Stockout control is not enabled for this company. Contact your partner or Takkada support to enable." (`services/stockout_control_access_service.dart:41-43`); screen title "Stock Control is not enabled" (`screens/reports/stock_control_screen.dart:1157`).
- Prod entitlement 2026-11-05: `stockout_control` 1 active company. Capability claim only, never an adoption claim.
- **Flag for Ronak:** the prod `feature_definitions.description` for `stockout_control` still reads "Dark-launch key: granted one company at a time by direct SQL. Not for sale." Ronak is selling it (task brief, 2026-11-05), so the page goes ahead as a paid add-on with no price; the description row is stale and is the operator's to update.
- Not on `pricing.addons` before this change; added as "Stock Control" (label + one line, no price).

## Can say

**One screen, four tabs**
- Screen title **Stock Control** (`screens/reports/stock_control_screen.dart:1124`).
- Tabs: **Reorder Now, Suppliers, Season Plan, Lost Sales** (`stock_control_screen.dart:1304-1307`; class doc `:61-62`).
- Top band ("command deck"): **Order this week** (items to order, with "N already passed"), **Lead time** (p90 days with trend), **On order** (open PO lines, with "N late"), **Lost sales** (`stock_control_screen.dart:1500-1594`). Each tile opens its tab.
- The deck is computed from the same calls as the tabs, "so the headline can never disagree with the list below it" (`stock_control_screen.dart:63-66`).
- Header actions: **Import PO** (`:117`, route `/purchase-orders/import/upload`), **Export** (`:118`), **Alerts** (`:120`).
- Works in the phone app and on the web (same screen, `desktopAwareAppBar` at `:1121`).

**Reorder Now**
- Columns: Item, Group, Stock, Overdue, Base, Order, On way, Lead time, Best month, Last rate (`screens/reports/stockout_reorder_screen.dart:1262-1320`).
- Default order **Most overdue first** (`stockout_reorder_screen.dart:1406`).
- Search matches item name, part number, alias, size, group and supplier (`stockout_reorder_screen.dart:592-603`). Group / party tiles filter the list (`:524-565`).
- Stock already on order is counted: inventory position = closing stock + expected on-order quantity (prod `_reorder_now_rows` lines 634-635, 672, 690). "On the way · <item>" lists the open purchase orders behind it (`stockout_reorder_screen.dart:1026-1035`).
- **Order quantity**: when the item sold in one of the last twelve full months, Order tops stock up to that best month ("base stock"), lifted by the growth %, minus stock and what is on order, rounded to a clean number (>=200 to the next 50, 20-199 to the next 10) (prod `_reorder_now_rows` 650-676). Items with no such month fall back to the lead-time quantity (677-695).
- **Reorder point** = season-adjusted average daily demand x (supplier's planning lead time + a 30-day order cycle + a buffer equal to the gap between the usual and the 9-in-10 delivery time) (prod `_reorder_now_rows` 639-649, 359-370).
- Lead time is measured from the company's own purchase orders and receipts: median and 90th percentile of lead days per item/supplier (prod `_reorder_now_rows` 257-260; `open_purchase_order_arrivals`).
- Days of cover = stock / average daily demand (prod 636-638).

**Growth dial**
- Title "Growth", "Lifts every item's base stock." (`widgets/reports/growth_dial.dart:61-62`). Steps of 5 between -50% and +50% (`growth_dial.dart:55-59`; `services/invoice_config_service.dart:1162-1163`). Company-wide setting.
- Only the company admin can turn it; others see "set by your company admin" (`growth_dial.dart:19-21, 63`).

**Basket to purchase orders**
- Rows with a known supplier can be ticked; one tap ticks every row the app calls due (`stockout_reorder_screen.dart:49-57`).
- The basket ("Check quantities", `widgets/reports/reorder_basket_sheet.dart:56`) holds editable quantities, one **Create PO · <supplier>** per supplier (`reorder_basket_sheet.dart:265`).
- One draft per supplier, largest first; rate = the supplier's last purchase rate (blank when unknown, the PO form asks for it); no GST on an order (`services/reorder_po_draft_builder.dart` header).
- The draft opens the normal purchase order screen; "numbering, maker-checker and the Tally push are inherited" (`stockout_reorder_screen.dart:49-52`). So the saved PO goes to Tally like any app PO.

**Suppliers tab**
- Title "Supplier performance" (`screens/reports/supplier_performance_screen.dart:853, 880`), built from the company's own POs and receipts ("No supply history yet" until supply lines exist, `:904-906`).
- Columns: Supplier, **Usually**, **9 in 10 within**, **Worst**, **Arrived** (ordered quantity that arrived), **Trend**, **Past promise**, **Worst late** (`supplier_performance_screen.dart:940-968`).
- Trend: "Getting slower" / "Getting faster" with "Days to arrive, by year" (`:1838-1879`).
- Supplier detail lists **Orders past promise** with Promised, Expected, Open qty, Late (d) (`:716-748, 1269`).

**Season Plan**
- "The season plan covers the items making up the top 80% of sales" (`screens/reports/season_plan_screen.dart:559`).
- "Plan any window. The baseline is the same window a year earlier." Start month and length are picked (`season_plan_screen.dart:1297-1330`).
- Per item: Last season, Out of stock, **True demand** (last season corrected for days out of stock), forecast with growth, **Order by** date (`season_plan_screen.dart:32-35, 436, 460, 641, 1123-1146`).
- Passed dates flagged: "N order-by dates have already passed. Ordering today is already late for these items." (`season_plan_screen.dart:935-944`).

**Lost Sales**
- Order-line value that was almost certainly lost: the next consignment of the item arrived, the customer was invoiced again, and the ordered item was still not on that invoice; lines still fulfilable sit in "Awaiting stock" (`screens/reports/lost_sales_screen.dart:26-36`). Needs sales orders: "book orders in Tally to see this" (`stock_control_screen.dart` Lost sales hint).
- Shows what share of sales passes through a sales order ("covers N% of sales") so the number is read with that caveat (`lost_sales_screen.dart:33-36`; `stock_control_screen.dart` "covers ${coverage}% of sales").

**Export**
- **Export** writes the tab on screen to an Excel `.xlsx` with two sheets, Summary (per supplier) and Rows, titled with the tab, company, growth and date; it writes exactly what is on screen (`services/export/stock_control_workbook_exporter.dart:8-15`; `services/export/stock_control_export_snapshot.dart:1-9`). Available on all four tabs (`services/export/stock_control_export_specs.dart` tabTitle Reorder Now / Suppliers / Season Plan / Lost Sales).

## Cannot say / corrected

- **"Export all four tabs to one Excel file"** (task brief, Ronak's explainer "Download all four views as one Excel file"): wrong on origin/main. Export is one tab at a time. Page says "export any tab to Excel".
- **"Four tabs: Reorder now, On the way, Season plan, Supplier performance"** (brief/explainer): the tabs are Reorder Now, Suppliers, Season Plan, Lost Sales. "On the way" is a column and a per-item drill-down, not a tab.
- **"Reorder point = peak daily demand x supplier's measured lead time"** (brief) and "from your busiest selling days" (explainer): wrong. The live function says explicitly it is *not* max-day x max-lead. Page uses average daily sales over the real delivery time plus a month's cycle, and the best-month top-up for the order quantity.
- No automatic purchase orders: a PO is created only when the user presses Create PO and saves.
- No adoption numbers. No price (add-on prices never print).
- Alerts sheet (low-stock and late-order thresholds per A/B/C class) exists (`widgets/reports/stock_alert_settings_sheet.dart:7-11`), but the delivery channel was not verified, so the page does not mention alerts.

## Screens to slot in

| Slug | Should show (per code) | Slot |
|---|---|---|
| `stock-control-reorder` | Stock Control open on Reorder Now: the four deck tiles, growth dial, rows with Stock / Order / On way / Lead time | walkthrough step 1 (and hero once registered) |
| `stock-control-basket` | Basket sheet "Check quantities" with Create PO · supplier buttons | walkthrough step 2 |
| `stock-control-supplier-performance` | Suppliers tab: Usually / 9 in 10 within / Arrived / Trend / Past promise | walkthrough step 3 |
| `stock-control-season-plan` | Season Plan: True demand, Order by, the "already late" line | walkthrough step 4 |

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: unchanged facts from the sheet above, reframed: the list is built from synced sales, POs and receipts; Create PO opens the supplier's PO filled from the basket at the last purchase rate where one exists, and the saved PO goes to Tally like any app PO (`services/reorder_po_draft_builder.dart` header; `stockout_reorder_screen.dart:49-52`). New FAQ "Does somebody still type the purchase orders into Tally?" rests on those two refs.

**Tally alone (basis)**
- Tally Prime's Reorder Status report works from the reorder level and minimum order quantity set on each stock item (disclaimer). The page does not say Tally ignores stock on order or cannot compute a level; it says the quantity is "worked out by whoever places the order, against the reorder level on the item if somebody set one".
- Purchase orders in Tally are keyed at the Tally computer, line by line. Lead times "remembered, or taken from what the supplier said" and the godown call are the reader's day.
