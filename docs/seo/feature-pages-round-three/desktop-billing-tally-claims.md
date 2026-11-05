# Claims sheet: Desktop Entry (`desktop_entry`) feature page

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). Paths are under takkada `lib/` on origin/main (`git -C takkada/takkada show origin/main:lib/<path>`). Loader refs are tally-database-loader `origin/master`. Nothing below depends on `origin/stage`. The stage-only diff in this area is `desktop/shell/*` nav additions (other features), which are out of scope.

- Prod entitlement: `desktop_entry` 4 active / 64 inactive. Do not quote the count or any customer.
- Prod `feature_definitions.description` says "save with Ctrl+S". **That is wrong.** See "Cannot say".

## Gating

- One paid add-on, key `desktop_entry` ("Desktop Entry"). An operator grants it; there is no self-serve purchase, and it is in no plan tier (`models/company_feature_access.dart:160-168`).
- Add-on pitch: "The full computer layout — a sidebar, wide registers and keyboard billing. Enter invoices, orders and receipts Tally-style: type, tab, save." (`config/addon_catalog.dart:214-220`).
- The computer layout shows only when all four of these hold: the window is wide (840dp+), there is a mouse or trackpad, the company's `desktop_entry` is known to be on, and no company group is open. Without the add-on, a computer shows today's phone-style screens at every width. Screen size alone never switches it on (`widgets/responsive/desktop_entitlement_scope.dart:14-35`; `widgets/responsive/desktop_device_scope.dart` header).
- When the add-on is off, opening `/entry/<kind>` goes to the add-ons card (`/settings/add-ons?focus=desktop_entry`), not Home (`config/app_router.dart:7403-7440`).

**How it differs from Web view (`web_view`).**
- Web view only lets you log in at app.takkada.com from a computer browser. You get the ordinary (phone-style) screens (`models/company_feature_access.dart:170-174`; `config/addon_catalog.dart:221-225`; prod description "Log in from a computer browser at app.takkada.com").
- Desktop Entry is the computer layout itself. It also opens the browser: a company with `desktop_entry` needs no separate `web_view` switch (`utils/web_view_route_guard.dart:46-48`).

## Can say

**Where it runs**
- It runs in a computer's web browser at app.takkada.com. The repo has no Windows or macOS desktop app build: the workflows are build-android, build-ios and build-web only (`.github/workflows/`). The keyboard choices are written around Chrome and Safari (`desktop/keyboard/desktop_shortcuts.dart:11-35`).
- The phone app is unchanged. The layout gate runs on width, a pointing device and the add-on, so a phone never gets it (`desktop_entitlement_scope.dart:14-35`).

**One form, sixteen document kinds** (`desktop/entry/entry_document_kind.dart:29-56`; every kind has a saver, `entry_document_savers.dart:33-36`)
- Sales: Quotation, Sales Order, Delivery Challan, Sales Invoice, Credit Note, Receipt.
- Purchase: Purchase Order, Goods Receipt, Purchase Invoice, Debit Note, Payment.
- Stock: Stock Journal.
- Books: Expense, Contra, Journal.
- **F8** lists the sales family in the Type box and **F9** the purchase family. On a MacBook, where F8 is the media key, use **⌥8 / ⌥9** (`entry_bindings.dart:399-427`, comments at `:394-418`).

**Keyboard, Tally-style** (`desktop/entry/entry_bindings.dart:149-460`). The form's keys work inside text fields. They are Ctrl and Alt on Windows, and ⌃ and ⌥ on a Mac. ⌘ is never used (`:1-15`).
- **Enter** (main or numpad) goes to the next field and accepts it. **Shift+Tab** goes back a field. **Arrows** move between cells and rows. **Esc** backs out one layer (`:154-190`, `:22-28`).
- **Ctrl+A / ⌃A** saves (accepts), the same as Tally (`:195-198`). **F2** changes the date (`:263-266`).
- **Alt+C** creates a party or item without leaving the form (`:241-244`). **Ctrl+Enter** edits the selected master or the line details (`:249-258`). **Alt+M** opens more details (`:271-274`).
- **Ctrl+I** inserts a line above. **Ctrl+Delete** deletes the line (`:279-295`).
- **Alt+2** copies this party's last invoice. **Alt+Shift+2** copies the saved voucher into a new one (`:300-322`).
- **Alt+O** pulls pending lines from an order, challan or quotation (`:329-332`). **Alt+L** opens the linked document (`:340-343`).
- **Alt+N** raises a debit note from a purchase line (`:437-440`).
- The **?** sheet lists every key, built from the same table that binds them (`entry_bindings.dart:1-8`; `desktop/keyboard/desktop_shortcuts.dart:1-9`).
- Browser keys are deliberately left unbound: Ctrl+N/T/W/L/D/P/S, F5, F11, F12 and Alt+D/E/F (`entry_bindings.dart:477-491`).

**Getting around** (`desktop/keyboard/desktop_shortcuts.dart:255-430`). These use Alt on Windows and ⌃ on a Mac.
- **K** search everything. **N** new document. **D** Dashboard. **S** Sales. **U** Purchases. **M** Money. **R** Receipts. **P** Parties. **I** Items. **E** Reports. **G** GST. **,** Settings.
- With Shift: **Shift+C** Collect, **Shift+P** Smart Reminders, **Shift+I** Stock, **Shift+A** Approvals, **Shift+M** Imports.
- **Shift+P** prints. **?** shows actions. **Esc** goes back.
- These navigation letters stand down while you type in a field (`:50-58`).

**Making one document from another** (`desktop/entry/chain/entry_chain_source.dart:1-50`; `widgets/pull_source_list.dart:1-13`)
- **Alt+O** lists the party's open source documents, grouped as in "Sales orders waiting to be billed". Each row shows number, party, date and what is still open. Pick one with ↑ ↓ Enter (`pull_source_list.dart:1-13`).
- Sales edges: Order → Challan, Order → Invoice, Challan → Invoice, Quotation → Challan, Challan → Order. Purchase edges: PO → Goods Receipt, PO → Purchase Invoice, Goods Receipt → Purchase Invoice (`entry_chain_source.dart:9-16`, `:40-47`).
- The pull offers only what the server says is still open. At save time the server caps each quantity, so the same order cannot be billed twice (`entry_chain_source.dart:30-38`).

**After you save: the saved strip** (`desktop/entry/widgets/saved_strip.dart:1-12`; `saved/entry_saved_actions.dart`)
- The form clears for the next bill. A strip says, for example, "SALE-185 saved", and shows what that document is linked to (`saved_strip.dart:3-11`).
- **Alt+V** views, **Alt+P** prints, **Alt+S** sends and **Alt+X** cancels the saved voucher (`entry_bindings.dart:203-236`).
- The strip offers the same next steps as the document's record page, such as "Create Delivery Challan". Those open the desktop form already filled in from the saved document (`entry_saved_actions.dart:4-33`).
- E-invoice, E-way bill and Payment link appear on the strip only when the company has paid for those features (`entry_saved_actions.dart:427-458`).

**Same books as the phone**
- Each desktop save runs the phone's own create flow, with the same arguments the phone would send. It reaches Tally the same way a phone entry does (`desktop/entry/sales_invoice/sales_invoice_entry_wiring.dart:1-14`; `documents/receipt_entry_saver.dart:1-9`).
- A receipt's picked bills become the bill-wise (Agst Ref) rows. Anything left over is on account (`receipt_entry_saver.dart:4-9`).
- When the company has approvals switched on, a maker's save goes for approval (`desktop/entry/entry_approval.dart:1-20`).

**Safety nets**
- If the browser tab closes or crashes halfway through a new item-grid bill, the bill is kept in that browser for 7 days. It is offered back the next time that form opens (`desktop/entry/entry_draft.dart:1-10`, `:30`).
- This does not cover money vouchers, journals or stock journals, and it does not cover an edit, copy or pull (`entry_draft.dart:8-10`).

**Comes with the same key (the computer layout)**
- **Dashboard**: four bands, "Money", the chosen period, "Who to chase" and "Needs attention", each loading on its own (`desktop/dashboard/dashboard_screen.dart:1-8`; `bands/money_band.dart:347`, `bands/chase_band.dart:321`, `bands/attention_band.dart:223`).
- **Party page** tabs: Overview, Sales, Purchases, Ledger, Reminders, Visits, Job work stock, Details (`desktop/party/desktop_party_page.dart:789-797`).
- Sidebar shell, wide registers and record pages (`desktop_entitlement_scope.dart:17-19`).

## Cannot say / do not claim

- **"Save with Ctrl+S"** is wrong. Ctrl+S is deliberately never bound because it is the browser's "save page" (`entry_bindings.dart:491`). Save is **Ctrl+A** (⌃A on a Mac) (`:195-198`). The prod feature description needs correcting.
- Do not say Tab moves forward through fields. The bound forward key is **Enter**; Tab is ordinary browser focus. Say "Enter through quantity and rate".
- Do not call it a desktop app, an install or a Windows program. It is a browser layout. The only installed computer program is the Tally loader, which is a different thing.
- Do not say it works on tablets or foldables. It needs a mouse or trackpad and a wide window (`desktop_device_scope.dart` header).
- Do not say it works in company-group mode. Groups always get the reports-only group screens (`desktop_entitlement_scope.dart:24-26`).
- **Barcode-gun scanning ("scan anywhere", gun-burst detection) is NOT part of Desktop Entry.** It needs the separate `barcode_labels` add-on, and stays off without it (`desktop/entry/desktop_entry_page.dart:2507-2518`; `widgets/entry_grid.dart:337`, `:974`; `models/company_feature_access.dart:188-193`). Prod: 4 companies have it.
- Schemes, e-invoice, e-way bill and payment links are separate paid features, not part of this add-on.
- Do not claim Material In/Out, manufacturing or job work entry through this form. They are not among the 16 kinds.
- Do not claim a desktop draft is kept for receipts, payments, journals or stock journals.
- Do not claim it is "included in Web view", "included in Assurance", or "free".
- Do not claim it writes to Tally without the Tally loader running on the customer's PC.

## Capture

- `desktop-entry-invoice`: the desktop Sales Invoice form on a wide browser window (stage co7088). Show the party filled in, three item lines in the grid, the totals panel and the ? shortcut sheet or hint chips. Ideally take a second frame just after Ctrl+A, showing the saved strip ("SALE-… saved", View / Print / Send) above a blank form.

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: Alt+O lists the party's open source documents, so a sales order booked on the phone app is pulled into the bill (`desktop/entry/chain/entry_chain_source.dart:1-50`; `widgets/pull_source_list.dart:1-13`); same save as the phone, numbering and approvals unchanged (`sales_invoice_entry_wiring.dart:1-14`; `entry_approval.dart:1-20`); Chrome or Safari, wide window, mouse (`desktop_shortcuts.dart:11-35`; `desktop_device_scope.dart`). The disclaimer says the Tally computer and its connector must stay on.

**Tally alone (basis)**: billing in Tally Prime happens at a computer running Tally (or a remote session into one), with F8/F9, Enter, Ctrl+A and Alt+C; the page credits Tally with the same keys ("The same keys, at the Tally computer"). "Typed in again from the salesman's message or slip" describes a business without the phone app, which is what "Tally alone" means on this page. No claim about Tally licences or editions.
