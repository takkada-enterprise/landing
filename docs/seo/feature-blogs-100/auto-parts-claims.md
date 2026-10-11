# Claims sheet: `auto-parts` batch (plan 2026-10-11-001, Task 9)

Checked 2026-10-12 against prod and takkada `origin/main` (e80468be, the live release). App paths are under `/Users/ronak/Desktop/PaySaathi/takkada/takkada`, read with `git show origin/main:<path>`; line numbers from `git show … | grep -n`. Backend paths are supabase-functions `origin/main` (4874843a). Tally-side: tally-database-loader `origin/master` (aa79b043) has no `autoparts` reference anywhere in `src`.

- Prod entitlement: `select status, count(*) from company_feature_entitlements where feature_key='autoparts_billing' group by status;` returned **10 active** (51 inactive), all 10 with no end date passed. Above 0, so the batch proceeds. Never quoted in copy.
- Prod config: `autoparts_company_config` 2 rows (both with a second-level markup), `autoparts_stock_group_config` 61 rows (43 with a preferred supplier), `autoparts_stock_item_config` 13 rows (0 excluded), `paysathi_autoparts_item_cost_basis` 107,222 rows, `paysathi_autoparts_item_cost_movements` 7,900 new_purchase + 1,037 voucher_revised + 69 convergence + 593 supplier_changed rows. `autoparts_party_price_level` 0 rows. Sales invoice and sales order lines carrying an AutoParts cost date: 0 on prod so far. Counts never quoted in copy.
- Prod functions: live `project_autoparts_item_cost_basis` matches the unit with `lower(rtrim(btrim(uom), '.'))` on both sides and ranks the effective preferred supplier first; live catalogue RPCs (`search_stock_items_base_20260707`, `search_stock_items_by_stock_category_base_20260707`, `autoparts_item_prices_by_ids`) compute `round(apc.cost_basis * (1 + apm.cost_markup_percent * 0.01), 2)` and the same with `cost_markup_percent_2`; live `autoparts_get_cost_movements` lists `change_kind in ('new_purchase', 'voucher_revised')` since now() − 90 days.
- No exclusivity: `guard_exclusive_billing_addons` (prod) covers only `billing_module` and `ladder_discount`. Posts do not discuss combining AutoParts with either.

## Can say

**What the cost is**
- The cost is the money paid per unit on the item's most recent qualifying purchase bill: line amount minus the trade discount on the line, before GST, per the item's own (base) unit, rounded to 2 decimals (`20261024100000_autoparts_cost_basis_table_and_projector.sql:1–28`, column comment `:158–159`; `lib/models/autoparts_line_provenance.dart:37`).
- If the same part sits on several lines of one bill (one container at two rates), the cost is the quantity-weighted average of those lines: round(sum net ÷ sum quantity, 2) (`…projector.sql:43–48, per_voucher` `:415–437`).
- Purchase bills come from the purchase invoices the app holds from Tally (`paysathi_purchase_invoices`/`_lines`); cancelled and superseded bills are skipped (`…projector.sql:373–388`).
- Skipped lines: zero quantity, a free or fully discounted line (falls back to the previous real purchase), and a line booked in a different unit from the item's own unit (`…projector.sql:367–404`; live prod body for the dot-tolerant unit match).
- When no purchase gives a usable cost, the Stock Summary card says **Never purchased** or **No usable cost**, or **Prices are being prepared** before the first calculation finishes (`lib/utils/autoparts_stock_display.dart:34–36`; `lib/models/autoparts_config.dart:26–40`). With no AutoParts price, the item bills at its normal price ("No markup — billed at the normal price", `lib/screens/autoparts_items_screen.dart:85`; the ladder falls through, `lib/utils/invoice_price_level_resolver.dart:151–163`).
- Preferred supplier (per group or per item): the cost comes from that supplier's latest qualifying purchase; if that supplier has none, from the latest purchase from anyone (live projector ordering; `autoparts_groups_screen.dart:771, 1259–1260`; "Latest purchase (any)" `:127`). After changing it: "Costs will update in a few minutes." (`:130–131`).
- The cost follows the item line on the purchase bill. Freight, clearing or duty booked as separate ledger lines on the bill are not spread into it (the projector reads only item lines: net = amount − discount on `paysathi_purchase_invoice_lines`).

**The formula and rounding**
- Selling price = cost × (1 + markup ÷ 100), rounded to 2 decimals, before GST. It is a markup on cost, not a margin on price (`lib/models/autoparts_config.dart:11–18`; live catalogue RPCs). Helper text: "Selling price = purchase cost + this %" (`autoparts_groups_screen.dart:79`).
- Code's own example: cost 250.24 at 40% sells at 350.34; a 40% margin would be 417.07 (`autoparts_config.dart:15`).
- The AutoParts price carries no discount of its own (`invoice_price_level_resolver.dart:142–143`) and outranks the item's other sales rates (`:10–14, 118–120`).
- GST is charged on top of the AutoParts price on the bill like any line.
- Worked examples (Python twin in the Task 9 report; 18% GST intra-state, CGST and SGST each rounded):
  - Pillar/Hinglish: cost 250.24 (₹50,048 net for 200 pcs) at 40% → **350.34**; at 25% → 312.80. 10 pcs: taxable 3,503.40, CGST 315.31 + SGST 315.31, total **4,134.02**.
  - Importer: one bill, 300 pcs at list 600 less 58% (net 75,600) + 100 pcs net 27,000 → cost **256.50**; previous cost 240.00 → **+6.88%**; at 35%: 324.00 → **346.28**. Second item 80.00 → 92.00 = **+15%** (flagged Over 10%); at 35%: 108.00 → 124.20.
  - Two-wheeler: 142.60 at 30% → 185.38 (20 sets: 3,707.60 + 333.68 + 333.68 = 4,374.96); 318.45 at 28% → 407.62 (10: 4,076.20 + 366.86 + 366.86 = 4,809.92).
  - Tractor: 4,850.00 at 18% → 5,723.00 (2: 11,446.00 + 1,030.14 + 1,030.14 = 13,506.28); 96.50 at 32% → 127.38 (12: 1,528.56 + 137.57 + 137.57 = 1,803.70).
  - CV: 1,240.00 at SP1 30% → 1,612.00 and SP2 20% → 1,488.00 (6 each: 9,672.00 → 11,412.96 and 8,928.00 → 10,535.04 with GST).
  - Lubricant/battery: 312.50 at 15% → 359.38 (24: 8,625.12 + 776.26 + 776.26 = 10,177.64); 4,210.00 at 12% → 4,715.20 (4: 18,860.80 + 1,697.47 + 1,697.47 = 22,255.74).
  - Group post: 180.00 at 40% → 252.00; 42.80 at 55% → 66.34; 180.00 at company 30% → 234.00; 615.00 item 25% → 768.75 (group 40% would give 861.00).
  - How-to: 250.24 at 0% → 250.24; 30% → 325.31; 40% → 350.34; 45% → 362.85.
  - Compare: price list at 35% on old cost 240.00 = 324.00; on new cost 256.50 = 346.28; gap 22.28 per unit, 1,114.00 on 50 units before GST.
  - Hinglish: 118.75 at 30% → 154.38 (12: 1,852.56 + 166.73 + 166.73 = 2,186.02).

**Where it is set, and who can set it**
- Settings → Invoices → **AutoParts billing**, subtitle "Selling price = purchase cost + markup %" (`lib/screens/settings/invoices_settings_screen.dart:2182–2183`). Hidden entirely when the add-on is off (`:2174–2178`).
- Three levels: **Company default markup** ("Used for every item whose group has no markup of its own.", `autoparts_groups_screen.dart:1094–1099`), one row per **Stock groups** entry (`:1391`; "Items with their own markup keep it.", `:1190`), and per item ("Markup for this item", "Use group markup", `autoparts_items_screen.dart:292–297`).
- Precedence: item, else group, else company ("An item's own markup comes first, then its group's, then the company default.", `autoparts_groups_screen.dart:100–103`; `20261024100500_autoparts_config_tables_and_rpcs.sql:399–410`). Item rows show "· from item", "· from group", "· company default" (`autoparts_items_screen.dart:80–85`).
- The group is the stock group the item sits in directly in Tally (resolver joins on the item's own `group_name`, `…config_tables_and_rpcs.sql:430–432`; prod: `group_name` equals Tally `parent` on 56,488 of 56,488 items at AutoParts companies). Groups match ignoring case and extra spaces (`autoparts_config.dart:328–330`). Items with no group appear as **Ungrouped items** (`autoparts_groups_screen.dart:1039`).
- Group row shows "N items · N set individually · N excluded" (`:1683–1686`).
- An item can be excluded: "Exclude from AutoParts billing"; it then reads "Excluded — billed at the normal price" (`autoparts_items_screen.dart:666, 80`).
- 0% is allowed (sell at cost); negative is refused: "Markup can't be negative. Enter 0 or more." (`autoparts_groups_screen.dart:245`; column comment `…config_tables_and_rpcs.sql:231`).
- Above 100% on more than 100 items, the app asks "Set N% on N items?" before saving (`autoparts_groups_screen.dart:62–65, 1062–1075`).
- Only the business admin can change markups: "Only the business admin can change markups. You can view them here." (`:81–82`); the server refuses others (`:120–121`).
- Two price levels, default names SP1 and SP2, renamable ("Name the two price levels", up to 24 characters; `autoparts_config.dart:231–232`; `autoparts_groups_screen.dart:90–94`; `lib/services/autoparts_config_service.dart:105`). Each level has its own markup at each of the three levels; "Leave blank for no SP2 price" (`autoparts_groups_screen.dart:481`) means no level-2 figure at that level: level 2 falls through item → group → company like level 1 (`20261031200000_autoparts_price_level_two.sql:285–291`), and only an item with no level-2 markup at any of the three has no level-2 price.
- A party is put on a level from the party's edit sheet: "AutoParts price level", "Which selling price this party is billed at." (business admin only; `lib/widgets/edit_party_bottom_sheet.dart:32–36, 156–179`). A level-2 party gets the level-2 price; if the item has no level-2 price it bills at the normal price (`lib/utils/invoice_line_factory.dart:190–196`).
- Cost and markup are withheld by the server from members who may not see purchase costs; they see only the selling price (`autoparts_line_provenance.dart:16–18`; `autoparts_stock_display.dart:54–56, 207–209`; `autoparts_groups_screen.dart:86–87, 187–199`).

**On the bill**
- AutoParts prices sales invoices, quotations and sales orders (`lib/screens/add_invoice_items_screen.dart:760–770`) and delivery challan lines (`lib/screens/create_delivery_challan_screen.dart:586–603`); not credit notes or purchases.
- The line stores the cost, markup and purchase date it was priced from (`autoparts_line_provenance.dart:27–44`); reopening a saved bill does not re-price it (`add_invoice_items_screen.dart:2141–2158`); an order converted to a bill keeps it (`lib/models/invoice_line_item.dart:895–897`).
- If the person billing types a different rate, the line keeps that rate and stops counting as an AutoParts price (`invoice_line_item.dart:239–241`).
- Tally receives the line's rate like any sales line; cost and markup stay in the app (loader `src` has no AutoParts code; provenance columns are app-only).
- Stock Summary card: "Cost as of dd/mm/yyyy · ₹ cost", "M1 25%", "SP1 ₹ …", "M2 …", "SP2 ₹ …" (cost and markup only for members allowed) (`autoparts_stock_display.dart:159–214`; `lib/widgets/inventory/inventory_item_card.dart:95`).

**Price changes screen**
- Only purchase bills that moved a cost get a card (`20261024100400_autoparts_cost_movements.sql:36–40`; RPC lists rows whose cost changed). A part on a bill keeps its old cost if a preferred supplier, a later-dated bill, another unit or a free line keeps that bill from winning.
- **Price changes** button on the AutoParts billing screen (`autoparts_groups_screen.dart:1327–1333`) opens **Purchase price changes** (`autoparts_cost_movements_screen.dart:121`).
- One card per purchase bill: bill number · date, supplier, "N items · N moved more than 10%" (`:220–229`). Each item: "Cost old → new", signed % change, and the selling price old → new; a move above 10% is highlighted "Over 10%" (`:33, 298–383`; `autoparts_config.dart:596–599`).
- "Last 90 days. Selling prices are worked out with today's markup." (`autoparts_cost_movements_screen.dart:29–30, 181`). Lists new purchases and edited purchase bills that changed a cost (live RPC). A part's first-ever cost is not listed (`20261024100400_autoparts_cost_movements.sql:36–40`).
- Empty state: "No purchase price changes in the last 90 days" (`:27–28`).

## Must not say

- "Landed cost includes freight, duty, clearing or insurance." Only the item line (amount less discount) counts.
- "Average cost", "weighted average of all purchases", "FIFO". It is the latest qualifying bill only (weighted only across that one bill's lines).
- "Cost always resolves" / "every part gets a price". Never purchased, No usable cost, Prices are being prepared all exist.
- "The price updates instantly / the moment you book the purchase." It updates after the purchase reaches the app; timing not promised.
- "A parent group's markup flows to its sub-groups." Grouping is by the item's own stock group.
- "Staff cannot change the rate" / "the price is locked" as a rule. The rate can be typed over, unless the owner has switched on the Ladder discount staff lock (Lock rate and first discount for staff), which makes the Rate box read-only for staff. Say "unless the owner has locked rates for staff"; never "anyone can type over the rate" bare.
- "Margin" as the app's meaning. It is markup on cost (Hinglish post explains the difference).
- Anything about AutoParts combining with FMCG billing (MRP) or ladder discount.
- That credit notes, purchases or debit notes use the AutoParts price.
- That the Price changes screen shows the selling price that was charged then (it uses today's markup).
- That cost or markup reaches Tally, or that Tally's price levels are updated.
- Adoption, customer names, counts, prices of the add-on.
- Specific GST slabs for batteries or particular parts as fact; 18% is used as an illustrative rate.
