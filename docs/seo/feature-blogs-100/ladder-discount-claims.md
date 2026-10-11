# Claims sheet: `ladder-discount` batch (plan 2026-10-11-001, Task 8)

Checked 2026-10-11 against prod and takkada `origin/main` (e80468be, the release that is live). App paths below are under `/Users/ronak/Desktop/PaySaathi/takkada/takkada`, read with `git show origin/main:<path>`. Backend paths are supabase-functions `origin/main` (4874843a); Tally-side paths are tally-database-loader `origin/master` (aa79b043, 1.0.127).

- Prod entitlement: `select status, count(*) from company_feature_entitlements where feature_key='ladder_discount' group by status;` returned **2 active** (53 inactive). Above 0, so the batch proceeds. The count is never quoted in copy.
- Prod data: sales invoice lines and sales order lines with a second or third step exist on prod (`ladder_step2_percent`/`ladder_step3_percent` not null). One company has set its own step names. Nobody has the staff lock switched on yet (`invoice_config.ladder_lock_rate_and_step1` true: 0 rows), but the column, the switch and the server check are live. Counts never quoted in copy.
- Prod functions: `validate_ladder_discount_line` exists and fires on `paysathi_sales_invoice_lines` and `paysathi_sales_order_lines`; its live body carries both the aggregate check and the lock check. `guard_exclusive_billing_addons` trigger is live on `company_feature_entitlements`.
- Feature key `ladder_discount`, display name "Ladder discount" (supabase `20261024110500_ladder_discount_feature_key.sql`).

## Can say

**The math (worked with the app's own code)**
- A line has up to three steps. Each step is 0 to 99.99 with at most two decimals (`lib/utils/ladder_discount.dart:10–18`; server `ladder_total_discount_percent`, `20261024110000_ladder_discount_columns.sql`). The phone shows "<name> must be between 0 and 99.99" (`lib/utils/billing_discount_form.dart:182–187`).
- The steps compound: total = 100 − (100 − s1)(100 − s2)(100 − s3)/10,000, rounded half up to 2 decimals, done in integers (`ladder_discount.dart:22–30`; `lib/utils/money.dart:63–69`). The server recomputes it and refuses a line whose stored discount differs: "Discount aggregate does not match the ladder steps" (`20261024110200_ladder_discount_invoice_writers.sql:15–27`).
- The order of the steps does not change the total (multiplication). 10 + 5 + 2 and 5 + 10 + 2 are both 16.21%.
- The rounded total is the line's discount; the line's money is computed from it with the Tally line rule: rate without GST to the paisa, gross, then the total discount, then CGST and SGST each rounded (`lib/models/invoice_line_item.dart:692–701`; `lib/utils/gst_calculator.dart:170–234`).
- The discount comes off the price before GST, and GST is charged on what is left. On an Incl. GST invoice the app first takes GST out of the rate (to the paisa), then applies the total discount (`gst_calculator.dart:200–209`).
- **Worked examples** (rates before GST, intra-state; computed with a Python twin of the Dart code, script in the Task 8 report):
  - Pillar: 100 units at ₹100 = ₹10,000. 10% + 5% + 2% → **16.21%**. Discount ₹1,621.00, taxable **₹8,379.00**; 18% GST: CGST ₹754.11 + SGST ₹754.11; line total ₹9,887.22. Price chain per unit 100.00 → 90.00 → 85.50 → 83.79. A calculator gives the same ₹8,379.00 here because 16.21 is exact.
  - Rounding case: ₹10,000 at 10% + 5% + 3%. Exact compound is 17.065%; the app rounds half up to **17.07%**. Taxable **₹8,293.00**; a calculator chain gives ₹8,293.50. 18% GST: CGST ₹746.37 + SGST ₹746.37; total ₹9,785.74.
  - FMCG: 120 cases at ₹250 = ₹30,000. 8% + 2% + 1% → **10.74%**. Taxable **₹26,778.00** (calculator chain ₹26,777.52). 18% GST: ₹2,410.02 + ₹2,410.02; total ₹31,598.04.
  - Tiles: 40 boxes at ₹1,250 = ₹50,000. 10% + 5% → **14.5%**. Taxable **₹42,750.00**. 18%: ₹3,847.50 + ₹3,847.50; total ₹50,445.00. Chain 1250.00 → 1125.00 → 1068.75.
  - Paint: 12 tins at ₹2,400 = ₹28,800. 20% + 3% → **22.4%**. Taxable **₹22,348.80**. 18%: ₹2,011.39 + ₹2,011.39; total ₹26,371.58. Chain 2400.00 → 1920.00 → 1862.40.
  - Electrical: 50 pieces at ₹480 = ₹24,000. 30% + 5% + 2% → **34.83%**. Taxable **₹15,640.80**. 18%: ₹1,407.67 + ₹1,407.67; total ₹18,456.14. Chain 480.00 → 336.00 → 319.20 → 312.82.
  - Pharma: 200 strips at ₹85 = ₹17,000. 10% + 2% → **11.8%**. Taxable **₹14,994.00**. 12%: ₹899.64 + ₹899.64; total ₹16,793.28. (At 5%: ₹374.85 + ₹374.85; total ₹15,743.70.) Chain 85.00 → 76.50 → 74.97.
  - Auto parts: 10 pieces at ₹1,800 = ₹18,000. 25% + 5% → **28.75%**. Taxable **₹12,825.00**. 18%: ₹1,154.25 + ₹1,154.25; total ₹15,133.50. Chain 1800.00 → 1350.00 → 1282.50.

**Where the steps are set up, and by whom**
- Step names are company-wide: Settings → Invoices → **Discount step names**, subtitle "Your names for the two extra discounts: Disc 2, Disc 3" (`lib/screens/settings/invoices_settings_screen.dart:2100–2122`). The dialog: "These names appear on the discount box and as the column headings on your invoice.", boxes **Second discount** and **Third discount** (`:981–1003`). Defaults "Disc 2" and "Disc 3"; up to 16 characters; a blank name falls back to the default (`lib/services/invoice_config_service.dart:151–172`; `lib/services/pdf/pdf_widgets/ladder_column_spec.dart:20–28`; DB check `20261024110600_ladder_discount_labels.sql`).
- Only steps 2 and 3 take a custom name. Step 1 is the line's ordinary **Discount %** box on the phone and the **Disc.** column on the PDF (`lib/screens/add_invoice_items_screen.dart:6936`; `items_table_widget.dart:214, 594–605`).
- The tile is shown only when the company has the Ladder discount add-on; members without full access see the names but cannot change them; `invoice_config` writes are owner-only on the server (`invoices_settings_screen.dart:2114–2121`; `20261035510000_ladder_lock_rate_first_discount_flag.sql` header).
- The step percentages themselves are typed on each line, on the bill. They are not set per party.
- Per item, the owner can set a **First discount %**: Settings → Invoices → **First discount by item** ("Set the first discount for each item", `invoices_settings_screen.dart:2146–2155`) opens the stock group list in first-discount mode (`lib/screens/billing_stock_groups_screen.dart:88–95, 216`); the item's own page has the same "First discount" card, helper "The first discount on every sale of this item. Leave it empty for 0%." (`lib/widgets/billing_config_section.dart:39, 408–420`). Business admin (owner) login only (`billing_stock_groups_screen.dart:86–88`; `stock_item_detail_screen.dart:554–556`).
- That per-item first discount fills a line only for staff while the lock (below) is on (`add_invoice_items_screen.dart:1802–1804`, `_lockedStep1For` returns null when not locked). With the lock off, step 1 is whatever is typed or what a price-list rule already put in the Discount box.

**On the bill (phone)**
- Tap the line's discount ("+ Discount" or the discount chip) to open **Item Discount** (`lib/widgets/invoice/cart_sheet.dart:1226–1240`; `add_invoice_items_screen.dart:6899`). With the add-on on, under Discount % sit two more boxes named with the company's step names (`:6947–6951`).
- As steps are typed the sheet shows the per-unit price after each step and the total, for example "100.00 → 90.00 → 85.50 → 83.79 · total 16.21%" (`:6954`; `ladder_discount.dart:44–64`).
- A ladder forms only when step 2 or step 3 is filled; with only Discount % typed, the line is an ordinary single-discount line (`billing_discount_form.dart:200–219`).
- The cart chip and the invoice summary line read "10% + 5% + 2% · total 16.21%" (`ladder_discount.dart:37–42`; `cart_sheet.dart:1234–1238`; `lib/screens/invoice_summary_screen.dart:5513`). The saved invoice's detail screen shows the same text (`lib/screens/sales_invoice_detail_screen.dart:493`).
- Steps appear on sales flows only: the boxes are not loaded for purchase documents or for the credit-note picker (`add_invoice_items_screen.dart:1743–1745`; credit note passes `onItemsSelected`, `lib/screens/create_credit_note_screen.dart:692–703`). Steps are stored on sales invoice lines and sales order lines only (`20261024110000_ladder_discount_columns.sql`). Quotations are sales orders marked optional (`lib/services/sales_order_service.dart:489–494`).

**On the PDF**
- Sales invoice and sales order PDFs (`lib/services/pdf/pdf_service.dart:784, 901, 1315`; generators pass the labels). The table keeps **Disc.** for step 1 and adds one column per extra step, headed with the company's step names, plus **Total Disc.** (`lib/services/pdf/pdf_widgets/items_table_widget.dart:214–233, 594–621`).
- A step column prints when any line on that document uses that step; a document with no laddered line prints exactly as before (`ladder_column_spec.dart:35–71`). A line without that step shows a blank cell.
- The PDF prints percentages per step and the Total Disc.; the per-step prices are on the phone sheet, not the PDF (`priceChain` is used only at `add_invoice_items_screen.dart:6954`).

**What reaches Tally**
- Only the rounded total. It is stored as the line's `discount_percent`; the steps are stored beside it as provenance (`20261024110000_ladder_discount_columns.sql:1`; `invoice_line_item.dart:1005–1008`).
- The Tally sync puts that one figure in the item line's discount field, `<DISCOUNT>16.21</DISCOUNT>`, next to the rate (tally-database-loader `src/main/queue/job-adapters/shared/line-items.ts:323–333`; `src/TallyFunctions/xml/builders/voucher-builder/sales-purchase.mts:393–394, 438–440`; sales orders `sales-order.mts:94`). Nothing on the Tally side reads the step columns (`git grep ladder_step origin/master -- src` returns nothing).
- An invoice reaches Tally as a sales voucher, a sales order as a sales order (from the FMCG claims sheet, same builders).
- The server stops its usual re-derivation of discount % from amounts on laddered lines, so the stored 16.21 is not nudged a paisa away (`20261024110100_ladder_discount_trigger_fence.sql`).

**Orders, edits, conversions, returns**
- A sales order's steps carry into the invoice made from it (`lib/utils/sales_order_lines.dart:39–41, 95–97`), including through a delivery challan (`lib/utils/challan_to_invoice_lines.dart:115–120`) and van-load billing (`20261035510100_ladder_lock_step1_fence.sql` header; `lib/screens/dispatch/bill_load_review_screen.dart:992`).
- Editing a saved invoice reopens its lines with their steps (`lib/utils/saved_invoice_edit_lines.dart:57–59`).
- Credit notes (returns) take a plain discount; the ladder boxes are not offered there (see above).

**The staff lock (only when the owner turns it on)**
- Settings → Invoices → **Lock rate and first discount for staff**, subtitle "Staff can change only <step 2 name> and <step 3 name>". Off by default. Shown only with the add-on; the owner's login changes it (`invoices_settings_screen.dart:2123–2143`; `invoice_config_service.dart:174–186`; server default false).
- It applies when all hold: the company has Ladder discount, the switch is on, and the person is not the business admin (`lib/services/ladder_rate_lock.dart:9–39`). The owner is never locked.
- It covers sales invoices, sales orders and quotations, with their edits and approvals; not credit notes (`add_invoice_items_screen.dart:1759–1764`).
- For a locked staff member: the Rate box is read-only (`:4690–4693`, `:5922`), the price level is shown as "<level> (set by owner)" and cannot be changed (`:5005–5015`), the Discount % box is read-only with "Set by owner" (`:6920, 6938`), and each new line's first discount is the item's First discount % (0% if none set) (`:1802–1804, 2258`). Steps 2 and 3 stay open.
- An invoice made from an order by locked staff takes the item's current first discount; editing a saved invoice keeps the line's own (`:1780–1786`).
- The server also refuses a staff line whose first discount differs from the owner's: "First discount is set by the owner: X%" (`20261035510100_ladder_lock_step1_fence.sql`). It skips unchanged old lines and van-load billing. The server does not check the rate; the rate lock is on the app screen.

**Relation to the FMCG Billing Module**
- The two add-ons are mutually exclusive; the server refuses to enable one while the other is on ("Disable billing_module before enabling ladder_discount", `20261024110500_ladder_discount_feature_key.sql`; trigger live on prod). The ladder boxes do not show on an item set up in the Billing Module (`add_invoice_items_screen.dart:6128–6130, 6947`).

## Must not say

- Any price for the add-on. No ₹ figure next to "add-on" or "plan".
- That Tally receives three discounts or the step names. Tally gets one percentage per line.
- That the PDF prints the price after each step (the feature page says so; the code prints step percentages and Total Disc. only). The price chain is on the phone's Item Discount sheet.
- That step 1 can be renamed, or that more than three steps exist.
- That steps are set per party or saved per customer, or applied automatically to every bill. They are typed per line; only locked staff get the item's first discount filled in.
- That the owner's per-item first discount fills lines when the lock is off.
- That credit notes, purchase bills or debit notes carry ladder steps.
- That a salesman can never change the rate, unless the lock is on, and then only for non-owner logins on sales invoices, orders and quotations.
- That the server blocks rate changes (only the first discount is checked on the server).
- That the ladder runs together with the FMCG Billing Module or its MRP/margin/D1/D2.
- "Excel gets it wrong" style claims (Python's float rounds 10+5+3 to 17.07 too; spreadsheet behaviour was not tested). Compare against a calculator chain instead.
- "Every bill", "always", "har bill", "sabhi" without the qualifiers above.
- The Desktop Entry screens (paid separate module, not covered).
- Customer names, testimonials, adoption counts, the entitlement count.
- Primary keywords already owned (checked `grep -rih "^primary_keyword:" content/blog/`): `quantity discount vs cash discount`, `retailer margin and discount per stock item`, `FMCG billing software for Tally`, `dealer scheme management in tally`.
