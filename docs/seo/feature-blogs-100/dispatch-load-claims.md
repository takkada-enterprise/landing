# Claims sheet: `dispatch-load` batch (plan 2026-10-11-001, Task 6)

Checked 2026-10-11 against prod (SELECT only) and takkada `origin/main` (e80468be, 2.1.288, the live release), plus live prod function bodies. Line refs are from `git -C /Users/ronak/Desktop/PaySaathi/takkada/takkada show origin/main:<path> | grep -n` (paths under `lib/`).

- Prod entitlement: `select status, count(*) from company_feature_entitlements where feature_key='dispatch_load' group by 1;` returned **70 active** (69 inactive). The batch proceeds. Never quoted.
- Use on prod (never quoted): `paysathi_dispatch_loads` by status: billed 15 (3 companies, last 2026-10-05), ready_to_bill 12, draft 10, sent 4, went_out 3, part_billed 1, challans_made 1; 12 vans in the last 30 days across 8 companies. 731 van lines (508 from sales orders, 223 from sales invoices), 76 lines invoiced. 29 invoices made from vans; their write-back jobs: 44 COMPLETED, 3 DEAD. Sales orders loaded on vans: 147 booked on the phone, 24 entered in Tally. So the whole flow (orders → van → key back → bill → Tally) has run on prod.
- Gating: one add-on, key `dispatch_load` ("Dispatch"); not in `models/plan_tier.dart`. "Dispatch is not enabled for this company. Contact your partner or Takkada support to enable." (`services/loading_sheet_access_service.dart:49–53`). Add-on pitch: "Build the day's loading sheet from pending orders, note what actually went out, and bill it — one record from godown to invoice." (`config/addon_catalog.dart:133–138`).

## Can say

**Getting there**
- The home quick action opens the Dispatch screen (`screens/home_screen.dart:688–694`, route `/dispatch`); also reachable from Team Sales (`screens/team_sales_screen.dart:1102–1104`). Screen title **Dispatch** (`screens/dispatch/dispatch_screen.dart:270`).
- Three tabs: the picking list (named **Orders**, **Challans** or **Invoices** after the setting), **Load/Dispatch** and **To buy** (`dispatch_screen.dart:207–209`, `:293–294`; `help/dispatch_help.dart:292–312`).

**Picking list (pending orders)** (`screens/dispatch/orders_tab.dart`)
- Lists sales orders that still have quantity to send (`help/dispatch_help.dart:62–63`), newest first, built on the server from the same pending-order arithmetic as Pending Orders (prod `get_dispatch_pick_list` delegates to `get_pending_orders`). Orders booked on the phone and orders entered in Tally both appear (prod: both kinds on vans).
- Grouped by shop, and by beat when the company uses beats ("No beat" for the rest) (`orders_tab.dart:375–410`). Tick documents, a shop heading or a beat heading, then **Add N to van** (`:44–46`, `:1226`, `:1245`). Nothing goes onto a van except by that press (`:45–46`).
- **Search shop or item** and date chips (`:1190`, `:1290–1291`).
- A document already on an open van stays visible, greyed, untickable and tagged with the van and salesman (`:54–57`, `:1144` "On a van"). Trying to add it anyway: "Already on another van … Nothing was added" (`:714`, `:728`). Wording: the same order line cannot sit on two open vans.
- **Print summary** prints an Order Summary of the ticked documents: shop, number, date, amount, with blank Received/Remarks columns; printing changes nothing (`:48–52`, `:1238`).
- **Transfer to PO** on a document's menu (`:1172`).
- Empty list: "Nothing left to load. Everything open has already gone on a van." (`:1304–1308`).

**The van** (`screens/dispatch/van_page.dart`)
- Header: **Vehicle number (optional)**, **Driver (optional)**, salesman ("Add a salesman") (`:1819`, `:1853`, `:1588`).
- **Route order — drag a drop to reorder**; each shop is "Drop N — <shop>" (`:1611`, `:1654`).
- Toolbar: **Print the sheet** (`:1322`). A line taken off the van (More menu) goes back on the picking list (`:645–649`).
- **Print the sheet** shows whenever the van has lines, at any stage (`van_page.dart:1319–1323`). **Export the sheet to Excel** and **Take lines off the van** live in the van page's **More** menu (`van_page.dart:1334`, `:1355–1363`), not beside Print.
- **Taking lines off**: lines come off while the van is Building or Loaded (app `models/dispatch_load.dart:452–453` `isEditable` = draft or sent, `:560–566` `canRemoveLines`; supabase-functions `20261003180500_dispatch_van_mutation_rpcs.sql:619` is the only definition of `remove_from_dispatch_load`, gate at `:685` `v_status not in ('draft', 'sent')`; after that only a line whose source order changed or was cancelled can come off, live prod message "This van is already past loading…").
- **Drops are per party**: "Drop N — <shop>" (`van_page.dart:1654`); drops are keyed by party, `drops.putIfAbsent(line.partyKey, …)` (`van_page.dart:1260–1262`); the sheet carries the same drop number (`loading_sheet_generator.dart:36–38`). Two orders for one party are one drop.
- **Adding to a van, chooser**: when vans are still being built, Add asks "N vans are being built. Which one is this going on?" with **Start a new van** (`orders_tab.dart:623–624`, `:640`); if the open-van list cannot be read, "Start a new van only if you are sure none is open" / **Not now** (`:685–699`).
- **Continuation drop slips**: a drop with more than 26 item lines is chunked into continuation slips, each repeating the shop's number and name (`loading_sheet_generator.dart:58–64`, `:595–598`).
- **Load grid second column group**: beyond 16 item columns per landscape page, the grid continues as a second column group repeating the drop rows (`loading_sheet_generator.dart:42–52`).
- Several vans can be open at once; the Load/Dispatch tab lists them and prints the open vans; "Vans are shared, so somebody else may move one while you are reading it." (`help/dispatch_help.dart:344–351`).
- Orders and other documents cannot share a van ("Take the odd ones off so everything on it comes from the same place.") (`models/dispatch_stage_words.dart:114–116`).

**Stages and buttons** (`models/dispatch_stage_words.dart:34–47`, `:63–71`; `help/dispatch_help.dart:148–173`)
- Chips: Building → Loaded → Keyed back → Part billed / Billed (document vans: Delivered).
- Buttons: **Van is loaded**, **Key back what went**, **Save what went out**, **Make invoices**, **Van went out**.
- Building: "nothing on it is reserved yet". Loaded: "what is on it has come out of everybody's pending list".

**The loading sheet** (`services/pdf/generators/loading_sheet_generator.dart`, `screens/dispatch/print_options_sheet.dart`)
- PDF titled LOADING SHEET, one per van (`:14–17`, `:97`). Header carries vehicle, driver and salesman only when filled (`:136–160`).
- Three blocks the business picks (`print_options_sheet.dart:119–139`): **Load list** "One row per item, for the warehouse" (item, UOM, load qty, tick box, drop numbers; generator `:21`, `:311–314`); **Load grid** (drops down the left, one column per item, totals) (`:22`, `:393`); **Drop slips** "One signed slip per shop, for the driver" (`:23`, `:568`). The choice is remembered (`print_options_sheet.dart:114`).
- First-use default: Load list and Drop slips on, Load grid off (`services/loading_sheet_print_preferences_service.dart:192`).
- The drop number is the same shop on the list, grid and slips (`:36–38`).
- Drop slip: Item, Sent, Received columns, "Short / returned: ____", "Received by: ____" (`:709–711`, `:735`, `:740`); the shop's address and phone print when its ledger carries them (`:677–690`).
- A **Dispatched** column with blank write-in boxes before key back; after key back the sheet prints the keyed quantities (`:27–31`, `:170`).

**Key back what went out** (`screens/dispatch/confirm_load_sheet.dart`)
- "These are the booked order lines going out. Key back what actually left — invoicing happens later, from the bill step." (`:295–297`).
- Lines are pre-filled with the ordered quantity, in drop order, so a full van saves with one press; change only the short lines; 0 is allowed (`:15–21`, `:32–33`).
- A short line asks **Why short?**: No stock, Vehicle full, Shop refused, Damaged, Other (Other asks "What happened?") (`:499`, `:510`, `:534`; `models/dispatch_load.dart:128–133`). Save stays off until each short line has a reason ("One short line still needs a reason.") (`:35–37`, `:378`).
- Shows the stock figure beside a line and "Stock as of <date>" when known (`:318`, `:432`).
- Banner only after the server accepts: "Confirmed — the sheet is keyed back." (`:25–29`, `:273`). Can be keyed back again while nothing is billed (`:17–19`); after billing it is read-only (`:333`).
- **What happens to the shortfall**: "What actually left on the van, which can be less than what was ordered. The rest stays pending for a later van." (`help/field_help_catalog.dart:32–35`). The van shows **Still owed from this load**; a shop's remainder can be written off with **Reason (required)** and **Write off permanently**, no undo (`screens/dispatch/owed_section.dart:8–27`, `:181`, `:333`, `:353`).

**Billing the van** (`screens/dispatch/bill_load_review_screen.dart`; prod `commit_dispatch_load_invoices`)
- **Make invoices** opens **Review invoices** (`:647`): one invoice per shop at the quantity keyed back (prod body bills `dispatched_qty` and records it against the sales order line through `record_sales_order_fulfilment`).
- "Untick a shop to leave it unbilled — it stays on the load for later." (`:777–778`); shown per shop: **Voucher type**, **Sales ledger** (`:807`, `:833`). Button **Create N invoices** (`:1081`). Part-billed van: "The shops left out stay on the load — bill them from here when you are ready." (`:1108`).
- Only a member with the Sales Invoice right can bill: "You do not have permission to create Sales Invoices." (`:666`; `dispatch_stage_words.dart:84–86`; prod comment "the warehouse never bills").
- "Creating them records them in the app; they reach Tally only when the sync runs on the office computer." (`help/dispatch_help.dart:396–397`). Voucher type is the company's sales voucher type (prod commit runs record `Sales` and custom sales types).
- If Tally has already invoiced every line of the van (the office billed it straight in Tally while the van stood, seen once that data has synced): **Already billed in Tally** (`models/dispatch_load.dart:381–385`); billing again "would put a second bill for one delivery in your books" (`dispatch_stage_words.dart:81`; `help/dispatch_help.dart:244–247`).
- A van invoice can be deleted on this screen and the shop goes back to unbilled; once it is in Tally: "Already in Tally — reversing it takes a credit note." (`:546–548`, `:1382`, `:1387`).
- When the business has e-invoicing and its GST portal login saved, the same screen offers **Generate e-invoice** / **Generate e-way bill** (`:1166`, `:1184`, `:1434`, `:1451`). Conditional only.

**Other sources and settings** (`screens/settings/dispatch_settings_screen.dart`; `models/dispatch_settings.dart`)
- Settings › Dispatch: **Load the van from** Sales orders, Delivery challans or Sales invoices (`:236–237`; model `:28–31`). For challans/invoices, **Offer documents dated from** must be set (`:294–297`; model `:101–102`).
- A van of challans or invoices is not keyed back or billed; **Van went out** marks it Delivered (`help/dispatch_help.dart:71–90`, `:57–60`).

**To buy** (`screens/dispatch/demand_tab.dart`)
- Shortfall by item: what customers still wait for against stock ("Short N") (`:447`). "The stock figure is Tally's. Tally only takes goods out of stock when the bill is made, so anything already on a load is still counted in it" (`:279–282`). Raise a purchase order where access allows (`help/dispatch_help.dart:355–360`).

## Must not say

- Vehicle tracking, GPS, live location of a van, route optimisation or suggested routes (route order is a manual drag), van capacity or weight/volume maths, auto-splitting orders across vans. None is on the Dispatch screens. "Vehicle full" is only a shortfall reason the person keys. No screen counts or totals shortfall reasons; each shows per van under Still owed, so do not say "the count of Vehicle full lines".
- Delivery challans made from a van ("Make challans", "Bill the van as Delivery challan"): the help file treats it as not customer-visible (`help/dispatch_help.dart:22–26`). Do not describe it.
- Batch numbers, expiry dates or FEFO picking on the van or sheet (no such field on van lines). Pharma post says only that the van and sheet do not show batch or expiry. Make no claim either way about batch details on invoices made from a van (prod `commit_dispatch_load_invoices` copies the order line's `batch_allocations`, untested against short quantities).
- Site addresses per order. The slip prints the shop ledger's address and phone only when the ledger carries them.
- Proof of delivery photos, e-signatures or OTP at the shop door. The slip has a paper "Received by" line.
- That keying back changes stock in Tally. Stock moves in Tally when the bill is made (`demand_tab.dart:279–282`).
- That invoices appear in Tally the moment you press Create. They reach Tally when the sync runs on the office computer.
- That anyone at the godown can bill. Billing needs the Sales Invoice right.
- That a short line can be saved without a reason (current app refuses), or that the shortfall disappears. It stays pending or is written off with a reason.
- Absolutes about the picking list ("every order", "all pending orders"): it lists sales orders that still have quantity to send that the member can see.
- Counts of companies, vans or invoices; customer names; testimonials; prices of the add-on or plans; plan names for Dispatch.
- Internal names (the DB, the app framework, the sync agent). Say "the sync on the office computer".
- Primary keyword owned: `dispatch load sheet` (`dispatch-load-sheet-for-distributors`, an older post describing the retired standalone sheet; not linked, see report).
