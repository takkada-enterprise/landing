# Claims sheet: `fmcg-billing` batch (plan 2026-10-11-001, Task 3)

Checked 2026-10-11 against prod and takkada `origin/main` (e80468be, the release that is live). Paths below are under `/Users/ronak/Desktop/PaySaathi/takkada/takkada`, read with `git show origin/main:<path>`.

- Prod entitlement: `select status, count(*) from company_feature_entitlements where feature_key='billing_module' group by status;` returned **18 active** (185 inactive). Above 0, so the batch proceeds. The count is never quoted in copy.
- Prod data: `stock_item_billing_config` holds rows with MRP, retail margin and Discount 1 set (the MRP column is live on prod). Counts are never quoted in copy.
- Feature key `billing_module` (`lib/models/company_feature_access.dart:9`), shown to admins as "FMCG billing" (`lib/widgets/admin/plan_management_editor_sheet.dart:21`) and in the app's settings as **Billing Module**.

## Can say

**Where the owner sets it up**
- Settings → Invoices → **Billing Module** opens `/billing-config` (`lib/screens/settings/invoices_settings_screen.dart:2155–2172`). Without the add-on the row shows an add-on marker and leads to the add-ons page.
- The Billing Module screen lists your Tally stock groups with a search box ("Search stock groups..."), plus "Ungrouped Items". Each group row reads like "48 items · 12 configured" (`lib/screens/billing_stock_groups_screen.dart:152, 269, 448–451`).
- Inside a group, every item is listed with chips for what is set: MRP, M (margin), D1, D2, C (commission), and the header shows "12/48 configured". Tap an item to edit it in place (`lib/screens/billing_stock_items_screen.dart:140–150, 503–540, 630–690`).
- The same values can be set from the item itself: the stock item's page shows a **Billing Configuration** card with an edit button (`lib/widgets/billing_config_section.dart:39, 77`; `lib/screens/stock_item_detail_screen.dart:1301`).
- Five boxes per item: **MRP (incl. GST)**, **Retail Margin %**, **Discount 1 %**, **Discount 2 %**, **Salesman commission %** (`billing_config_section.dart:433–462`; `billing_stock_items_screen.dart:639–672`). Helper text: "Retail margin is applied first using divisor logic, then Discount 1 and Discount 2 are applied one after another."
- Retail Margin is the one required box ("Retail margin is required"; 0 is allowed). Percent boxes take 0–100. MRP is optional, must be more than 0 when typed, and a blank box clears it (`lib/widgets/billing/billing_config_fields.dart:48–75`).
- Only the business admin (owner) login can open the Billing Module or edit an item's billing card ("Only business admins can access Billing Module.", `billing_stock_groups_screen.dart:86`; `stock_item_detail_screen.dart:555–556` `role == 'businessadmin'`).
- The MRP typed here is GST-inclusive, as printed on the pack (`lib/models/stock_item_billing_config.dart:17–19`).

**How the rate is worked out on a bill**
- When an item with a retail margin above 0 is added to a **new sales invoice or sales order**, the margin is applied by itself; nobody opens a discount sheet (`lib/screens/add_invoice_items_screen.dart:6230–6258`, `lib/utils/invoice_line_factory.dart:709–762`).
- The line's **Rate stays the MRP**. The margin is shown as the line's discount %, so the bill reads MRP, one discount, net (`invoice_line_factory.dart:624–640`).
- The margin is a divisor, not a subtraction: the retailer's price is MRP ÷ (1 + margin%). As a discount: discount % = (1 − 1/(1 + margin%)) × 100, rounded to 2 decimals (`lib/utils/billing_break_even_calculator.dart:58–75, 104–106`). 20% margin = 16.67%; 10% = 9.09%; 15% = 13.04%; 25% = 20%.
- With D1 and D2 the combined discount is (1 − 1/(1 + margin%) × (1 − D1%) × (1 − D2%)) × 100, rounded to 2 decimals (same file). 20% margin + D1 2% = 18.33%.
- Where the MRP comes from: the MRP typed in the Billing Module outranks every Tally-derived rate (standard price, price list, last billed rate) (`lib/utils/invoice_price_level_resolver.dart:13–20, 112–124`). On an Incl. GST invoice the typed MRP lands in the Rate box exactly as typed (`invoice_price_level_resolver.dart:298–302`). With no MRP typed, the rate the app would normally quote is treated as the MRP and the margin comes off it (`invoice_line_factory.dart:635–637`).
- Rounding follows Tally's line rule: rate without GST to the paisa first, then quantity, then the discount %, each rounded; CGST and SGST rounded separately (`lib/utils/gst_calculator.dart` `computeTallyLine`; `lib/utils/money.dart:63` rounds half up).
- **Worked example (Incl. GST invoice, 5% GST):** biscuit pack MRP ₹10, retail margin 20%, 120 packs. Rate ₹10; discount 16.67%; rate without GST ₹9.52; gross ₹1,142.40; discount ₹190.44; taxable ₹951.96; CGST ₹23.80 + SGST ₹23.80; line total **₹999.56** (not the round ₹1,000 a calculator gives for 120 × (₹10 ÷ 1.20), because of the paisa rounding above; 120 × ₹8.33 rounded first is ₹999.60). Same item with the salesman's D1 2%: discount 18.33%, discount ₹209.40, taxable ₹933.00, line total ₹979.66. (Computed with the app's formula; script in the Task 3 report.)
- **What the screen shows for that line:** the cart chip reads "Discount 16.7%" (`lib/widgets/invoice/cart_sheet.dart:1237–1258`, one decimal). The invoice summary line reads "Qty: 120 | Rate: ₹ 10 / item", "Disc: 16.7% (-₹ 190.44)", "Retail Margin: 20%", and the line amount ₹ 999.56 (`lib/screens/invoice_summary_screen.dart:5510–5590`). The discount itself is stored and used to 2 decimals (16.67%); only the label rounds to one. D1 and D2 lines show under it when the item has them configured.
- The margin is never applied twice: a line already margin-applied, or one priced or discounted by hand, is left alone (`invoice_line_factory.dart:733–738`).
- Not applied on: an invoice made from a sales order (keeps the rate the customer was quoted, `invoice_line_factory.dart:739–745`), editing an existing bill, credit notes and purchase documents (`add_invoice_items_screen.dart:6248–6258`).

**What the salesman can and cannot change**
- Tapping the line's discount opens the **Item Discount** sheet: "Retailer margin is applied first, then Discount 1 and Discount 2 are applied one after another. The combined discount is auto-calculated and shown on the invoice." Boxes: Retailer margin, Discount 1 (D1), Discount 2 (D2) (`add_invoice_items_screen.dart:6960–7060`).
- The Retailer margin box is disabled for anyone but the business admin (`enabled: widget.isBossEditor`). The margin on the line is always the item's configured margin (`invoice_line_factory.dart:212–247` `resolveBillingConfig`).
- D1 and D2 set on the item are **ceilings**, not automatic discounts. The sheet shows "Max Discount 1: 3% · Max Discount 2: 1%" style limits and blocks a higher figure with "Cannot exceed 3%"; a value above the ceiling is clamped down (`lib/utils/billing_discount_form.dart:124–165`; `invoice_line_factory.dart:220–228`). The automatic pass applies the margin only, D1 and D2 at 0 (`invoice_line_factory.dart:752–760`).
- A blank D1 or D2 box on a fresh line means 0 (`billing_discount_form.dart:76–78, 251–256`).
- The limits apply to the Item Discount sheet only. The cart's Rate box stays editable for staff (`add_invoice_items_screen.dart` `_updateItemRate` blocks only under the Ladder discount lock `_lockRateAndStep1`). A typed rate replaces the MRP on that line and marks it manualOverride, so the margin is not added on top. Say this when a post asks whether a salesman can give more.

**What reaches Tally**
- An invoice syncs to Tally as a sales voucher and a sales order as a sales order; each item line carries its discount % in Tally's discount field (tally-database-loader `origin/master` `src/TallyFunctions/xml/builders/voucher-builder/sales-purchase.mts:393–394` and `sales-order.mts:94`, `<DISCOUNT>`).
- The MRP stays in Takkada. Sales lines do not write MRP to Tally and the module does not change Tally's item master (same file, `mrpTag` is purchase-only, lines 395–402).

**Commission (secondary)**
- Salesman commission % per item is applied to the line value without GST after discount and replaces the member's flat Team Sales % for that line; it needs Team Sales (`stock_item_billing_config.dart:21–24`; `lib/screens/team_sales_screen.dart:1578–1599`).

## Must not say

- Any price for the add-on or a plan. No ₹ figure in the same sentence as "FMCG billing" or "add-on" (`scripts/__tests__/blog-prices.test.mjs`).
- That D1 and D2 come off every bill automatically. The automatic pass applies the margin only; D1/D2 are maximums the salesman may give on the Item Discount sheet. (The `fmcg-module-tally` feature page says otherwise; the posts follow the code.)
- Break-even warnings, "headroom", or a line "flagged before save". No such text was found on the phone's Item Discount sheet on `origin/main`; the only limits shown are the Max D1/D2 ceilings and "Cannot exceed X%".
- That the margin can be set once for a whole stock group in one go. Items are listed group by group and edited one at a time.
- Schemes, free goods, buy-X-get-Y or slab discounts. They are a separate add-on and stay out of this batch.
- The Desktop Entry screens. Not covered here.
- That the MRP shows as the rate inside Tally, or that MRP is written to Tally. Only the discount field on the line is proven.
- That the margin applies to purchase bills, credit notes, edits of old bills, or invoices converted from a sales order.
- That staff (non-admin logins) can set or change the margin.
- That a salesman cannot bill below your rate, or "cannot give away more than you allowed". Only the Item Discount sheet is capped; the Rate box stays editable.
- That a sales order reaches Tally as a sales voucher.
- "Every bill", "every line", "har bill", "always" without the qualifiers above (new sales invoice or sales order, item set up with a margin above 0, line not priced by hand, invoice not made from a sales order).
- Customer names, testimonials, adoption counts, "N distributors use this", the entitlement count.
- Primary keywords already owned: `zero mdr upi for fmcg distributors`, `AI collection calls for FMCG distributors`, `godown wise billing tally`, `quantity discount vs cash discount`.
