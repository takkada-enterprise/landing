# Claims sheet: `order-links` batch (plan 2026-10-11-001, Task 7)

Checked 2026-10-11 against prod (SELECT only) and takkada `origin/main` (e80468be, 2.1.288, the live release), plus live prod function bodies. App line refs are from `git -C /Users/ronak/Desktop/PaySaathi/takkada/takkada show origin/main:<path> | grep -n` (Dart paths under `lib/`; the buyer page is `web/order/index.html`).

- Prod entitlements: `select feature_key, status, count(*) from company_feature_entitlements where feature_key in ('personal_order_links','public_customer_ordering') group by 1,2;` returned **public_customer_ordering 35 active** (128 inactive) and **personal_order_links 3 active** (7 inactive). Both above zero, the batch proceeds. Never quoted.
- Use on prod (never quoted): `customer_order_links` = 5 active company-wide links (pricing: 3 last billed rate, 1 own prices, 1 hidden), **0 personal links created**. `customer_order_requests` = 18 across 5 companies (12 pending, 5 converted to order, 1 contacted). Write-back jobs for the converted sales orders: 4 `paysathi_sales_orders` jobs COMPLETED. So buyer submit → inbox → Sales Order → Tally has run on prod. Personal links: capability claims only, no adoption claims of any kind.
- Gating (two keys):
  - `public_customer_ordering` ("Order Link"): the add-on. Gates the Settings row, the home **Orders** tile, the inbox and the party page entry (`services/customer_order_access_service.dart:8–25`, `:54–58`; `models/company_feature_access.dart:113–119`). Server: `customer_order_resolve_link` and `customer_order_submit_request` both refuse unless `customer_order_public_feature_enabled` (prod bodies), and `customer_order_create_link` refuses "Public ordering is not enabled for this company".
  - `personal_order_links` ("Personal party links"): needs the Order Link add-on too (`models/company_feature_access.dart:121–126`). Server: `customer_order_create_link` returns `personal_order_links_not_enabled` for a party link without it (prod body). App: with Order Link on but this off, the party page's **Share order link** shows locked and opens the upsell "Send each party their own order link — they never type your business details." (`screens/party_details_screen.dart:1499–1516`, `:3157–3166`).
- Add-on pitch: "Send customers a link to your item list. They place the order themselves and you approve it into Tally in one tap." (`config/addon_catalog.dart:139–143`). Help topic: "Anyone with the link can send an order, and nothing becomes a sales order until you accept it." (`help/help_catalog.dart:380–395`).

## Can say

**Setting up the company-wide (public) link** (`screens/settings/customer_order_link_settings_screen.dart`)
- Settings › Order link: "Share one link with all your customers. They pick items and send you an order, which you approve in the app." (`:665`, `:683–684`).
- Fields: **Public business name**, **Merchant WhatsApp number** (`:707`, `:718`). Both required by the server to create a link (prod `customer_order_create_link`).
- **Prices customers see**, five choices (`:783`; `models/customer_order_link.dart:10–33`): **Tally rates** "Customers see the selling rate on each item in Tally."; **Last billed rate** "the rate from your most recent bill for each item. Items you have never billed fall back to your Tally price list."; **Price level** "rates from one of your Tally price levels"; **My own prices** "You type the price for each item on this link."; **Don't show prices** "Customers only choose items. You quote the price afterwards."
- A new link with no choice made is **Don't show prices** (prod `customer_order_create_link`: `coalesce(... p_pricing_mode ..., 'hidden')`; app model default `:131`).
- **Show items that are out of stock** switch, on by default: "Keep this on unless your stock quantities in Tally are accurate. Turning it off hides every item Tally shows as zero or less." (`:830–833`; model `:105–107`). The server applies the same filter at submit (prod `customer_order_submit_request`).
- **Items on this link**: the link starts with all the company's stock items (prod create body auto-seeds `paysathi_stock_items`); **Search items to publish** lets the merchant switch items on or off (`widgets/customer_order/customer_order_catalog_picker.dart:43`). In My own prices mode, "Tap the price next to an item to set what this link charges for it. Prices are before GST." (`:754–755`).
- **Create link**, then copy or share it; snack "Order link copied" (`widgets/customer_order/customer_order_link_share_card.dart:81`; settings `:592`).
- **Rotate**: "Old customer links will stop accepting order requests." (`:310–311`). **Disable**: "Customers using this URL will no longer be able to submit orders." (`:334–336`). One active company-wide link at a time (prod create body).

**What the buyer sees** (`web/order/index.html`, a plain web page at `<host>/order/?token=…`; `utils/customer_order_public_url.dart:21–24`)
- Opens in the phone's browser; no app, no login, no OTP (page has no auth step; the RPCs are anon). Page shows the merchant's public business name (`:219`, `:1224`).
- **Search for an item** / "Type a few letters of the name" (`:223–224`); category chips with an **All** chip when there are two or more categories (`:720–723`); **Show more items** (`:228`). Each item shows its name and "Sold in <unit>" (`:796`, `:801`).
- Prices on the page follow the link's choice: with prices on, "₹<rate>" and "Prices are before GST. The seller confirms your order before it is billed." (`:416–419`, `:1227–1228`); an item with no rate reads **On request** (`:418`); with **Don't show prices**, no rates and "Add what you need. The seller will confirm the prices with you." (`:1229`).
- The buyer never sends a price. "The page NEVER sends a price. It sends quantities; the server resolves and snapshots every rate." (`:31–32`, `:361–364`, `:1103–1104`). Prod `customer_order_submit_request`: only `publicItemRef`, `quantity` and `note` are read off a line.
- Stock counts are never shown: the catalogue RPC returns `publicItemRef, name, unit, price, group, offer` only (prod `customer_order_search_catalog`).
- Cart: **Your order**, Total with "Before GST. The final bill is confirmed by the seller." when prices show (`:237–241`).
- Details step (company-wide link): **Your name or business name**, **Your mobile number** (10 digits), **GST number (optional)** with **Get my business name**, **Anything to tell the seller? (optional)** "Delivery date, address, anything", then **Place order** (`:253–271`). A failed GST lookup never blocks: "your order will still go through." (`:1045`).
- Done: **Order sent**, "Your order <number> has gone to <seller>. They will confirm the prices and delivery with you." and a **Tell the seller on WhatsApp** button that opens WhatsApp to the merchant's number with a prefilled message (`:279–282`, `:1136–1137`, `:1176–1187`). Order numbers look like `CO-…` (prod submit body).
- Server limit: 1 to 50 lines per order (prod submit body).

**Personal link (one party)** (`screens/party_details_screen.dart`; `widgets/customer_order/personal_order_link_settings_sheet.dart`)
- Made from the party's page with **Share order link** (`:1515`). Needs the company-wide link set up first: "Set up your order link first in Settings > Order link, then share it with this customer." (`:3077–3078`).
- A new personal link copies the company-wide link's business name, WhatsApp number, price choice, price level and out-of-stock setting (`:3092–3101`).
- Sharing hands the link to WhatsApp on the party's number, falling back to the phone's share sheet; message "Hi <party>, you can place your order with <business> here: <url> Choose your items and send the order. We will confirm it." (`:3169–3206`).
- The address cannot be shown again; sharing again makes a fresh link and the old one stops working ("Send a fresh order link?" `:3003–3007`).
- What it pre-fills on the buyer page: header "Ordering for <party name>" (`web/order/index.html:1225–1226`); the name field and the GST step are hidden and the party's name is used (`:1234–1240`); the step heading becomes **Confirm your number**, and the mobile number is still asked for (`:1232–1235`). The order arrives already matched to that party (prod submit body: "A personal link's own party outranks a GSTIN guess").
- **Order link settings** on the party page (only when both keys are on, `:1523–1537`): **Show schemes on this link** (needs the Schemes module), **Link discount %** "Applies to every item. If a scheme gives more, the scheme wins.", **Requests become** Order / Invoice (`personal_order_link_settings_sheet.dart:152–203`). Schemes are personal-link only (prod create body `schemes_need_personal_link`).

**The merchant side** (`screens/customer_order_inbox_screen.dart`, `screens/customer_order_detail_screen.dart`)
- New order notification: prod `customer_order_submit_request` enqueues `order_placed`, catalogue title "New order received", body "Order {{orderNo}} from {{partyName}}.", audience full-access members, switch-off-able (`notification_type_catalog`, `is_toggleable` true). Tapping opens the order (`services/notification_navigation_service.dart:52–68`). Phrase as "members with full access get a New order received notification, unless they have switched it off".
- Home **Orders** tile opens **Customer orders** (`utils/home_quick_action_catalog.dart:160–164`; inbox `:123`). Filters **All, New, Contacted, Order created, Rejected** (`models/customer_order_request.dart:425–431`). Each row: buyer name, item count, value "excl. GST" when priced, "Matches <party>" (`inbox:253–267`). Empty: "Orders your customers place through your order link will show up here." (`:183–186`).
- Detail: **Customer in your books**, "This looks like <party>. Confirm before approving." / **Yes, that is them** / **No, pick another**, or "Pick who this order is for before approving." (`:991`, `:1019–1043`). Approval stays blocked until the customer is confirmed (`:423`).
- Each line has **Quantity**, **Rate (excl. GST)**, **Disc %** fields (`widgets/customer_order/customer_order_line_card.dart:193`, `:221`, `:255`). Rate and discount can show "Set by owner" for a member under the owner's lock (`:227`, `:259`). Phrase as "you can change quantities and rates before you approve".
- Every line needs a quantity and a rate above zero before Create order or Create invoice works ("Enter a rate for <item>." `:442–445`). This is how a Don't-show-prices order gets priced.
- **Sales ledger** choice (`customer_order_sales_ledger_field.dart:75–79`). Tax note "CGST + SGST will be added on top of these rates." / "IGST will be added on top of these rates." (`:919–920`).
- Buttons **Create order**, **Create invoice**, **Reject** (`:1102`, `:1115`, `:1124`). Create order makes a Sales Order: snack "Sales Order <no> created" (`:594`). Create invoice opens the invoice screen pre-filled with the party and lines (`:627–666`); the invoice is saved there.
- **Reject**: "The customer will not get an order. Nothing is sent to Tally." (`:688–690`).
- Statuses shown: New, Contacted, Accepted, Order created, Invoiced, Needs retry, Rejected, Duplicate (`models/customer_order_request.dart:410–420`).
- What reaches Tally: the Sales Order (or the invoice) the merchant creates, through the normal write-back when the sync runs on the office computer (prod: 4 converted sales orders, write-back jobs COMPLETED). Nothing from the link reaches Tally before Create order / Create invoice (help `:393–394`; claim/finalize bodies need the merchant).
- One order, one voucher: the server refuses a second Sales Order for the same request (prod `customer_order_claim_conversion` "already_converted").

## Must not say

- Buyer sets or sees a negotiated price, or "the buyer sends a price". The page sends quantities only.
- Buyers see stock quantities or "live stock". Only the out-of-stock filter exists.
- "Personal link shows that party's own rates / special rates". The price helper takes no party (prod `customer_order_display_price(company, item, mode, level, custom_price)`); a personal link copies the company-wide price choice. Last billed rate is the company's latest bill for the item, not that party's. Per-party difference is schemes and Link discount % only.
- Personal link skips the mobile number. It still asks; only the name and GST step are skipped.
- Orders go straight into Tally, or auto-approve / auto-convert. The merchant always presses Create order or Create invoice.
- OTP or login for buyers; a buyer app; order tracking or status updates sent back to the buyer; payment at checkout. None exists on the page.
- Free goods on Sales Orders: "Free goods are not added to orders yet. Add them when you bill this order." (`detail:848–849`). Do not describe scheme free goods reaching an order.
- WhatsApp Business API / automatic sending of the link. The party-page share opens WhatsApp for the merchant to send; the company-wide link is copied or shared by hand.
- Any count of companies, links or orders. Any price for the add-on or the module.
- Marking an order Contacted from the detail screen (only a filter is visible; no button found). Do not describe the button.
