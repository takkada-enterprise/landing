# Claims sheet: Proof of delivery (`pod`)

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). Backend read from supabase-functions origin/main b08b6fab plus live prod function bodies. Line refs are `git -C /Users/ronak/Desktop/PaySaathi/takkada/takkada show origin/main:<path> | grep -n`, paths under `lib/`. No POD file differs between takkada origin/main and origin/stage, and no POD migration is stage-only, so everything below is live.

## Gating

- Two keys, both required: `dispatch_load` ("Dispatch", in Copilot) and `pod` (its own paid add-on, in no plan tier, operator-granted) (`models/company_feature_access.dart:176-181`; supabase-functions `20261050090100_pod_feature_switch.sql` header). Every POD server function checks both: live prod `_pod_assert_office` raises "Dispatch is not enabled for company %" / "Proof of delivery is not enabled for company %".
- A partner cannot sell POD to a company without Dispatch for the whole term (`20261050090300_partner_pod_needs_dispatch.sql` header).
- A van with no driver login needs no POD key: plain Dispatch keeps working without it (`20261050090100_pod_feature_switch.sql` header).
- The driver's home checks both add-ons on screen and fails closed, so a driver whose company loses one still has Sign out (`screens/pod/pod_trips_screen.dart:20-21`).
- The Driver choice in Invite only shows when POD is on (`widgets/invite_team_member_modal.dart:148`, `:590`).
- Add-on pitch: "Your driver records each delivery on his phone: a photo, what the shop took back and the cash he collected. You see the proof on the invoice." (`config/addon_catalog.dart:143-149`).
- Prod, 2026-11-05: `pod` active on **3** companies (6 inactive). `paysathi_pod_drops` and `paysathi_pod_payments` are **empty**, so no driver has recorded a drop on prod yet. Capability claims only, no adoption or "used by" language.

## Can say

**The driver's login**
- A team member can be invited with the **Driver** role: "Only their own delivery trips: drops, photos and cash collected. Uses a seat." (`models/member_access_presets.dart:24`, `:33-34`).
- A driver sees no registers, no parties and no reports. He reads and writes only his own trips, and the server forces that shape for the Driver label (`models/member_access_presets.dart:228-236`).
- The app sends a driver straight to **My trips** from every other route (`screens/pod/pod_trips_screen.dart:16-18`, `:129`; `config/app_router.dart:773-782`, `:7647-7663`). Buttons there: **Switch company** (a driver in two companies), **Refresh**, **Sign out** (`pod_trips_screen.dart:134`, `:141`, `:147`). Empty state: "No trips assigned today" (`:27`).
- Trips = today's, plus an earlier trip with a shop still not recorded (`pod_trips_screen.dart:16-17`).

**Linking a van to a driver (office)**
- On the van page the office picks a Driver-role member from chips; picking him links his login to the van, picking again unlinks (`screens/dispatch/van_page.dart:1877-1888`). The server copies his name into the driver text (`van_page.dart:268-270`).
- The trip shows on the driver's phone once the van is billed (`van_page.dart:268-270`; live prod `list_my_pod_trips` lists vans in status `billed`, `part_billed` or `went_out`).
- While the driver still has drops to record, the van says "The driver is still recording the drops on this van." (`help/dispatch_help.dart:175-177`; chip `models/dispatch_stage_words.dart:55-62`).

**One trip on the driver's phone** (`screens/pod/pod_trip_screen.dart`)
- The shops in the order to drive them, what to unload at each, and **Call** / **Navigate** per shop (`:15-16`, `:326`, `:338`).
- Shops show in dispatch order first; once the phone's position arrives, pinned shops reorder nearest-first from where he is. Shops with no pin sit after them in dispatch order, tagged **New shop**; done shops go last (`:18-20`, `:276`; `utils/pod_route_order.dart:5-12`).
- Each shop shows **Delivered**, **Couldn't deliver**, or "Saved on phone · uploads when there is signal" (`pod_trip_screen.dart:295-306`).

**One shop (the drop)** (`screens/pod/pod_drop_screen.dart`)
- Items grouped under each bill: "Bill <no.> · ₹X due" or "· Paid" (`:450-457`, `:455-459`).
- Per item, a **Returned** quantity, capped at what went on the van ("Max N") (`:487`, `:491`), with a reason: Damaged, Wrong item, Not ordered, No money, Other (`:16-23`).
- **Delivery photo** → **Take photo** / **Retake photo**. Live camera only (`:51`, `:294`, `:304`). When and where the photo was taken is captured with it (`:166-170`).
- **Mark delivered** stays off until there is a photo (`:148-154`, `:439`).
- **Couldn't deliver** asks "Why couldn't you deliver?" with Shop closed, Customer refused, No money, Could not find the shop (`:25-30`, `:429`, `:541`).
- **Payment**: No payment, Cash, UPI, Cheque (`:314-322`). With several unpaid bills on the trip he picks one, or **All bills** (applied oldest first on the server) (`:75-79`, `:340`, `:366`). The amount is pre-filled from the bill less any advance (`:70`, `:114`).
- UPI needs **Photo of payment screen**, cheque needs **Photo of cheque**; cash needs no photo ("A UPI payment needs a photo") (`:140-142`, `:391-402`).
- Save never waits for signal: it saves on the phone, says "Saved", and uploads when the phone is back in signal; pulling down on the trip sends what is waiting (`:35-36`, `:247`; `pod_trip_screen.dart:99-100`). A double tap or retry cannot create a second payment (`pod_drop_screen.dart:104-107`).
- The first delivery photo at a shop pins the shop's location by itself (`screens/pod/pod_pin_screen.dart:29-30`).

**The office**
- On the Dispatch screen, a menu offers **Cash with drivers** and **Returns** when POD is on (`screens/dispatch/dispatch_screen.dart:373-387`).
- **Cash with drivers**: every payment a driver recorded that the office has not decided, grouped by driver, with the payment photo (`screens/pod/pod_cash_screen.dart:10-13`, `:138`, `:195`). Rows read "All bills" or "Invoice <no.>" (`:211-213`). Empty: "No payments waiting for approval" (`:149`).
- **Approve** opens "Approve payment?", "This makes a receipt and sends it to Tally.", with **Money went into** (the company's cash and bank accounts) (`pod_cash_screen.dart:285`, `:296`, `:309`). The row then reads "Approved · Receipt <no.>" (`:82`).
- **Reject** asks "Why is it rejected?" and the row reads "Rejected · <reason>" (`:115`, `:366-370`).
- Only a full access member can approve, reject, see cash or returns (live prod `_pod_assert_office`: "Only a full access member can do this"). With voucher approvals switched on for receipts, only an approver can approve (live prod `approve_pod_payment`: "Only an approver can approve driver payments").
- **Returns** report: what shops sent back, by trip → customer → item, for a date range; goods from "Couldn't deliver" shops sit under their own **Not delivered** heading (`screens/pod/pod_returns_screen.dart:9-10`, `:80`, `:119-120`, `:136`). Empty: "Nothing came back in these dates" (`:108`).
- **Shop location** on a party (phone and desktop) lets the office set or move the map pin: "Tap the map where the shop is, then Save." or **Use where I am** (`screens/party_details_screen.dart:1898`; `desktop/party/desktop_party_page.dart:1189`; `pod_pin_screen.dart:27-30`, `:171`, `:178`, `:224`, `:235`).

**Proof on the invoice**
- A **Delivery proof** card on the sales invoice (phone and desktop): photo (pinch-zoom), time, map pin ("Where the photo was taken"), and accepted/returned per item, e.g. "7 accepted · 3 returned" (`widgets/pod/pod_proof_card.dart:10`, `:17-23`, `:83`, `:124`, `:169`, `:181-187`; `screens/sales_invoice_detail_screen.dart:2367`). For a failed drop: "Couldn't deliver · <reason>" (`:135-136`).

**What reaches Tally**
- Only an approved payment. Approve creates a normal receipt voucher through the same receipt path as the app's receipts (live prod `approve_pod_payment` calls `create_receipt_v2`), into the cash/bank account picked, against the bill(s), with narration "<Cash/UPI/Cheque> collected on delivery by <driver> (<trip>)". Created once, even on a retry.

## Cannot say / do not claim

- **No adoption.** Zero drops and zero payments on prod. No "drivers use it", no counts, no customer stories.
- **Returns do not post anything to Tally.** `record_pod_drop` writes only the drop and the shop pin (live prod body). No automatic credit note, no stock entry. The office makes a credit note by hand; a "Couldn't deliver" bill can be undone only within 15 minutes and before it reaches Tally (`20261049999983_pod_undo_couldnt_deliver_bill.sql:1-13`).
- **A driver's payment is not a receipt until the office approves it.** Do not say "cash collected goes straight into Tally".
- **No recording on the web.** The web build shows "Use the phone app to record deliveries" and the buttons are off (`pod_drop_screen.dart:54-55`, `:146`, `:280-284`). The office screens work anywhere.
- **No signature capture, no OTP, no customer-side confirmation.** The proof is the photo, time and location.
- **No gallery upload.** Live camera only (`pod_drop_screen.dart:51`).
- **No optimal route planning.** The order is nearest-next from where the driver stands (`utils/pod_route_order.dart:14-15`), and only for shops with a pin.
- **No live van tracking.** POD records where each photo was taken, not a moving van. That is Live Tracking, a separate add-on.
- **It does not work without Dispatch**, and a driver sees nothing until the van is billed.
- **A driver cannot make invoices, orders or receipts himself**, or see any party or report.
- The feature_definitions text "approved by the office into receipts" holds. "2 active prod companies" is stale: 3 active on 2026-11-05.

## Screen captures

- `pod-driver-drops`: the driver's trip screen (`pod_trip_screen.dart`): trip name in the app bar, shops in drive order, each with Call and Navigate, one shop marked Delivered, one "New shop", one "Saved on phone · uploads when there is signal".
- `pod-photo-proof`: the drop screen (`pod_drop_screen.dart`): bill heading with "₹X due", an item with Returned qty and a reason chip (Damaged), Delivery photo with the green tick, Payment chips with UPI picked, amount filled, "Photo of payment screen", and Mark delivered / Couldn't deliver at the bottom. Use a demo company; no real shop names.
- `pod-office-approval`: Cash with drivers (`pod_cash_screen.dart`) with the "Approve payment?" dialog open: "This makes a receipt and sends it to Tally." and the "Money went into" picker. Alternative: the invoice's Delivery proof card ("7 accepted · 3 returned", photo, map pin).
