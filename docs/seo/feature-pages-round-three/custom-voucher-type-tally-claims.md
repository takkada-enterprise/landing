# Claims sheet: Custom voucher names (`custom_voucher_names`) feature page

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). App paths are under takkada `lib/` on origin/main. Migrations are supabase-functions `origin/main` (b08b6fab) `supabase/migrations/`. Loader refs are tally-database-loader `origin/master` (c451dbfa, 1.0.138). Everything below is on origin/main and its backend functions exist on prod (`create_custom_voucher_type`, `rename_custom_voucher_type`, `set_custom_voucher_type_hidden`, `custom_voucher_names_entitled`); nothing depends on `origin/stage`.

- Prod entitlement: `custom_voucher_names` **4 active**, 9 inactive. The brief's "3 active" is one behind. Never quote.
- Prod use, for us only and never to be quoted: 1 company has 3 named types, all created by Takkada and confirmed in its Tally (2 under Sales Order, 1 under Sales). **No rename has run on prod yet** (0 `RENAME_VOUCHER_TYPE` jobs). Rename was proven on the LAN test Tally (`20261049860400_custom_voucher_type_retired_names.sql:3-4`), so it is a capability claim, not a usage claim.

## Gating

- Paid add-on, key `custom_voucher_names`, in no plan tier, switched on by an operator from the Features list; no price yet (`models/company_feature_access.dart:221-223`; `20261049880100_custom_voucher_names_feature_switch.sql:1-19`).
- Two switches: the add-on, then the owner's own **Custom voucher names** switch on the settings screen. Writes before the switch: "Turn on Custom voucher names in Settings first." (`20261049860100_custom_voucher_type_names.sql:39-43`, `:233`; `screens/settings/custom_voucher_names_settings_screen.dart:551-566`).
- When the add-on is off: the settings row is hidden, never a teaser (`config/settings_catalog.dart:217-229`; `screens/settings/invoices_settings_screen.dart:1887-1890`); the route needs company admin plus the key (`config/app_router.dart:1472-1474`, `:7849-7860`). If the screen is reached anyway: "Custom voucher names is an add-on … Contact Takkada to add it for your business." (`custom_voucher_names_settings_screen.dart:532-536`). The owner's setup is kept and comes back when the add-on returns (`20261049880100...sql:13-16`).
- Operator pause: "Custom voucher names are temporarily unavailable … Nothing has changed in your Tally." (`custom_voucher_names_settings_screen.dart:512-515`).
- Switched off, every label, menu and type choice is exactly as before (`services/voucher_type_label_service.dart:9-13`; `20261049860200_custom_voucher_type_machinery.sql:32-34`).
- **Admin only.** Desktop sidebar entry needs admin and the key (`desktop/shell/desktop_shell.dart:707-716`). The server refuses others: "Only a company admin can change Tally voucher types" (`20261049860100...sql:208-209`).

## Can say

**Where it is set**
- Phone: Settings → **Custom voucher names**, "Your own names for bills, like Vehicle Booking or Proforma" (`config/settings_catalog.dart:221-228`). Desktop: the same screen from the sidebar (`desktop/shell/desktop_nav_catalog.dart:169`, `:1039`).
- Screen copy: "Use your own names for bills, like Vehicle Booking or Proforma. Each name is created in your Tally too." (`custom_voucher_names_settings_screen.dart:551-554`).

**Which documents**
- Ten families, each its own section: Sales Invoice, Sales Order, Quotation, Delivery Challan, Purchase Invoice, Purchase Order, Receipt, Payment, Credit Note, Debit Note (`services/voucher_type_label_service.dart:14-25`, `:33-44`; `20261049860100...sql:118`; screen `:588`).
- Several names per family: **Add a Sales Invoice type** / **Add another Sales Invoice type** (`custom_voucher_names_settings_screen.dart:619`).

**Adding a name**
- Sheet **New <family> type**: **Name** ("For example Vehicle Booking"), **Number prefix** ("Shown before the number, for example VB-"), preview "The first one will be numbered VB-1.", **Ledger (optional)** for Sales / Purchase only, button **Create in Tally** (`custom_voucher_names_settings_screen.dart:53`, `:763`, `:861-927`).
- Name rule: 2-50 characters; letters, digits, spaces and `. - & ( ) /`. Refused: Tally's own base names, a name already in the company's Tally or already set up (`20261049860100...sql:45-49`).
- Prefix rule: required, up to 10 characters, must not end in a digit, can't be shared with another type, and can't clash with numbers the company's own Tally vouchers already use this year (`20261049860100...sql:659-681`). So each name has its own series that can't collide.
- Takkada creates the type in Tally under the family's base type (for example under Sales), also when the customer renamed that base type; it never makes a second base type (`20261049860100...sql:634-640`; `20261005010000_app_owned_voucher_types.sql:225-232`). Created with Manual numbering and duplicate prevention (`20261049860100...sql:600-603`; loader `voucher-type-builder.mts:91-96`), and switched on in Tally so staff can also pick it for manual entry there (`20261049860500_custom_voucher_type_active_in_tally.sql:3-10`).
- Each row shows its state: **Ready**, Checking, Waiting for Tally, Refused (with **Retry**), Needs attention, Not found in Tally; plus "Next number …", the ledger, and "Hidden from new bills" (`custom_voucher_names_settings_screen.dart:470-475`, `:687-718`). The screen refreshes itself while a type is settling (`:180`).
- Warning on the screen: "We cannot remove voucher types from your Tally afterwards, but you can hide a name so it is no longer offered for new bills." (`:582-583`).

**Using an existing Tally type**
- **Use a type already in your Tally**: "Pick a … type you already have in Tally. Tally keeps numbering it." The row reads "Tally numbers this type" (`custom_voucher_names_settings_screen.dart:345-346`, `:630`, `:687`; `20261049860200...sql:16-19`).

**Rename, hide, ledger** (tap a row)
- **Rename**: "The new name is changed in your Tally too" (only once it shows Ready); rename dialog "It is renamed in your Tally too. Old bills show the new name." (`custom_voucher_names_settings_screen.dart:385-389`, `:982-996`; loader `voucher-type-processor.ts:429`).
- A rename keeps the number series running: VB-1, VB-2, rename, VB-3 (`20261049860200...sql:20-26`). Old bills keep their type and show the new name (`:27-29`).
- **Hide from new bills** / **Show in new bills**: "Old bills keep this name. Nothing is deleted from Tally." (`custom_voucher_names_settings_screen.dart:412-415`).
- **Change ledger** (Sales / Purchase): new bills of that type start with that ledger (`:398-400`, `:1075-1086`).

**Billing with a name**
- One usable name in a family: the create button carries that name and uses it, no extra tap. Several: a chooser "New Sales Invoice — which one?" (`utils/voucher_create_dispatch.dart:102-127`, `:209`; `services/voucher_type_label_service.dart:570`, `:642`).
- Works on the phone for sales invoice, purchase invoice, sales order, credit note, debit note, purchase order, receipt, payment and delivery challan (`utils/voucher_create_dispatch.dart:73-86`); credit note, debit note and purchase order get a **Voucher Type** picker (`widgets/custom_voucher_type_dropdown.dart:12-19`, `:64`). Approval requests carry the picked name (`20261049860300_custom_voucher_type_surfaces.sql:1-4`, `:23-24`).
- Lists label each row with its own type name, and once a family has two or more names, chips filter by name (`services/voucher_type_label_service.dart:508-523`).
- The sales invoice PDF keeps the **Tax Invoice** title and prints the type name under it (`voucher_type_label_service.dart:27-29`; `services/pdf/generators/sales_invoice_generator.dart:198-218`).

## Cannot say / do not claim

- Not for journals, contra, stock journals, GRNs or expenses (`services/voucher_type_label_service.dart:31-44`; refusal "Custom names are not available for … vouchers." `20261049860100...sql:216-217`).
- No delete: a created type stays in Tally for good; it can only be hidden (`custom_voucher_names_settings_screen.dart:905-906`).
- No numbering method other than a prefix plus a running number from 1; no suffix, no custom start number, no per-year reset claims (`20261049860100...sql:659-681`; preview `screen:888`).
- A Tally type you bring in keeps Tally's own numbering; don't promise Takkada's series for it (`20261049860200...sql:16-19`).
- Rename is refused while a bill of that type is still going to Tally, and only once the type shows Ready (`20261049860200...sql:30-31`; `20261049860100...sql:812`, `:830`). A name used before a rename can't be given to another type (`20261049860400...sql:6-11`).
- Rename has not run on prod yet. Don't say "customers rename…".
- Takkada's own fixed "Takkada <family>" types are a different screen (Tally voucher types) and are never on this page (`custom_voucher_names_settings_screen.dart:34-35`).
- Quotation create on the phone doesn't offer a choice between several names (that form doesn't carry the type, so the button uses the first) (`utils/voucher_create_dispatch.dart:76-86`; `services/voucher_type_label_service.dart:626-631`). Don't say "pick the name on every document".
- Needs the Tally PC connector to be up to date; an old one reads "Update the Takkada connector on your Tally PC" (`20261049860000_add_rename_voucher_type_job_type.sql:11-13`).
- Members other than admins can't set it up. Don't say "anyone can".
- No price on the site; partners quote it.

## Capture (demo / stage book only, never a customer book)

- `voucher-names-list`: phone **Custom voucher names** screen with the switch on and the hide warning under it. A **Sales Invoice** section with two rows (for example "Vehicle Booking" and "Service Invoice"), each reading **Ready** and "Next number VB-3" style text, one with "Ledger: …"; the **Add another Sales Invoice type** button and **Use a type already in your Tally**; a **Sales Order** section with one row below it.

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: unchanged facts above (create in Tally under the base type with manual numbering and duplicates prevented; prefix checked against this year's numbers; rename follows in Tally; chooser when a family has several names). The type staying switched on in Tally is `20261049860500_custom_voucher_type_active_in_tally.sql:3-10`. The disclaimer now adds that a created type stays in Tally and can only be hidden (`custom_voucher_names_settings_screen.dart:582-583`, `:905-906`).

**Tally alone (basis)**: in Tally Prime a voucher type is made under Create, Voucher Type, choosing its parent (type of voucher), method of numbering, Prevent duplicates and prefix details; renaming is an Alter of the voucher type; voucher entry offers the list of types under a parent. Removed from the old table: "the app has to be told separately" (not verified).


## Who it's for, and table rows rewritten (2026-11-06)
Ronak asked that every page make the gain over Tally and the use cases plain. Each page now carries three situations (today against with Takkada) and a "Work you stop doing" list. Every Takkada-side sentence there restates a claim already sourced above on this sheet (walkthrough, table or FAQ); the "today" sentences describe the reader's day, as the Tally-alone column does. No new Tally capability claims: Tally licences, duplicate prevention and multi-voucher e-mail are still not described. Live Tracking's table now compares against phone calls and WhatsApp location, since Tally does not record location.
