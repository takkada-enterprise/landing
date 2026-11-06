# Claims sheet: Manufacturing (`manufacturing`) feature page

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). App paths are under takkada `lib/` on origin/main. Migrations are supabase-functions `origin/main` (b08b6fab) `supabase/migrations/`. Loader refs are tally-database-loader `origin/master` (c451dbfa, 1.0.138, the build customers auto-update to). Everything below is on origin/main and its backend functions exist on prod; nothing here depends on `origin/stage`.

- Prod entitlement: `manufacturing` **3 active**, 26 inactive. Never quote.
- Prod use, for us only and never to be quoted: 6 app-made BOMs in 3 companies (and 625 BOMs synced in from Tally); 7 production runs in 3 companies (3 in Tally, 2 recorded, 2 cancelled); 7 production orders (5 open). Tally jobs: 4 BOM updates COMPLETED, 3 Manufacturing Journals COMPLETED and 1 DEAD (last 2026-11-02). **Job work: 1 Job Work Out Order with 3 challans, all in a company whose Tally writes are suppressed (demo). No job-work order or challan has reached a customer's Tally on prod yet.** So BOM → run → Manufacturing Journal in Tally has run on prod; job work to Tally has not.
- prod `feature_definitions.metadata.single_customer = true` today (the migration created it `false`, `20261047000500_manufacturing_addon.sql:10-15`). Do not claim trials get it.

## Gating

- Paid add-on, key `manufacturing`, in no plan tier; an operator switches it on (`models/company_feature_access.dart:195-199`; `20261047000500_manufacturing_addon.sql:5-15`). Add-on pitch: "Set up bills of materials, record what you made and the material you sent to job workers from your phone or computer — Tally gets every manufacturing journal and challan without retyping." (`config/addon_catalog.dart:234-239`).
- When off: everything is hidden, never a locked teaser. Home tile "Production" hidden (`utils/home_quick_action_catalog.dart:227-233`, `:354`, `:386-393`); desktop Production group hidden (`desktop/shell/desktop_shell.dart:748-768`); item BOM tab and party Job work stock tab hidden (`screens/stock_item_detail_screen.dart:1073-1082`; `screens/party_details_screen.dart:1297-1304`). Fail-closed: a failed check counts as off (`services/manufacturing_access_service.dart:7-14`, `:47-53`). A direct link to BOM / run / job-work pages lands on the item list or item; a production-order link lands on Not authorized (`config/app_router.dart:7725-7748`, `:7776-7790`). No user-facing "turn it on" message exists.
- Rights inside a company: BOMs, runs and job work need the Stock surface and Stock Journal view (create = Stock Journal create) (`config/app_router.dart:7728-7735`, `:7750-7754`; `desktop/shell/desktop_shell.dart:748-759`). Production orders need only the add-on: any member can raise a request (`config/app_router.dart:7770-7790`; `20261050099100_production_requests.sql:1-15`).

## Can say

**Where it lives**
- Phone Home tile **Production** opens Production orders (`utils/home_quick_action_catalog.dart:231-233`, `:393`). The runs list (**Runs**) has **Orders**, **Job work** and **New run** (`screens/manufacturing/production_run_list_screen.dart:68-90`). The + Create sheet has **Production Run** (`widgets/create_sheet.dart:219`).
- Desktop sidebar group **Production**: Production, Production orders, New production run, Job work (`desktop/shell/desktop_nav_catalog.dart:798-840`). Desktop pages exist for every phone screen (`lib/desktop/manufacturing/*`; routes split phone/desktop `config/app_router.dart:4838-5080`).
- Every manufacturing screen has a phone version: BOM editor, run, production order, job-work order, Material Out / In (`config/app_router.dart:4820-5080`, `phone:` builders).

**Bills of materials** (`widgets/manufacturing/bom/*`, `models/manufacturing/bom.dart`)
- On an item's **BOM** tab ("Bill of materials"): **Add BOM** / **Add another BOM**; one marked **Default** (`screens/stock_item_detail_screen.dart:1399-1400`, `:1728-1730`; `widgets/manufacturing/bom/item_boms_section.dart:87-125`). Several BOMs per item.
- Editor fields: **BOM name**, **Makes** (base quantity), **Use by default**, **Made** **In house** / **At a job worker** with **Choose job worker**, **Add line**, **Save BOM** (`bom_editor.dart:515-604`; `bom_route_picker.dart:27-52`).
- Each line: item, **Quantity**, godown (**Any godown**), line kind **Component** / **By-product** / **Co-product**, **Scrap %** (0-100) and **Scrap goes to** (another item in the same unit) (`bom_line_row.dart:90-92`, `:189-253`; `bom_editor.dart:222-232`, `:296`).
- Multi-level: a component with its own BOM shows "Made from its own BOM" / **Edit its BOM** (`bom_editor.dart:429`, `:468`). **Explosion**: enter **To make** and see raw materials for that quantity with an **Estimated cost** "At current item rates. Tally works out the real cost" (`bom_explosion_view.dart:152-282`).
- BOMs already in Tally come into the app; an app edit is written back to the item's BOM in Tally (job `UPDATE_STOCK_ITEM_BOM`, an Alter carrying the item's full component list) (`20261047000000_tally_job_type_manufacturing_update_stock_item_bom.sql:1-4`; `20261047000110_bom_enqueue.sql:1-15`; loader `src/TallyFunctions/xml/builders/stock-item-builder.mts:237-286`). If someone edits it in Tally while the editor is open: "Changed in Tally … Load Tally's" (`bom_editor.dart:491-498`).
- Scrap %, default, and in-house/job-worker route are app-only; Tally gets the net quantity (`20261050099300_bom_line_scrap_pct.sql:21-22`; `20261047000110_bom_enqueue.sql:13-15`; `models/manufacturing/bom.dart:16`).

**Production runs** (record what you made; `widgets/manufacturing/run/*`)
- **New production run**: "What are you making?", BOM ("The materials used to make this item", **New BOM** if none), **How many to make**, **Show steps**, **Save run** (`screens/manufacturing/create_production_run_screen.dart:96`; `run_entry.dart:451`, `:848-925`, `:1020`).
- Multi-level: each BOM level is a step; components show **On hand** and **Short · only N in stock** (`run_level_card.dart:51-53`; `run_component_row.dart:160-161`). Per step: **Make exactly**, **Output batch (new or existing)**, **Output godown**, by-products, scrap, and cost legs "Labour, power or overhead" to a ledger as **Use an amount** / **Use a percentage** (`run_level_card.dart:281-449`).
- Whose stock: **Own stock** or a principal's (`run_component_row.dart:28`, `:58`).
- Each in-house step posts one **Manufacturing Journal** to Tally: consumed components out; finished item, by-/co-products and scrap in; cost legs added. Tally values the finished item itself (`20261047000230_production_run_rpcs.sql:21-31`). Steps go to Tally in order and stop at the first failure (`20261047000200_production_run_tables.sql:10-15`).
- Status per step: Recorded, Sending to Tally, **In Tally · <number>**, Waiting for your Tally computer, Failed (`run_status_strip.dart:47-61`); **Retry step N** (`production_run_detail.dart:26`).
- With voucher approvals on, a maker gets **Submit for approval**: "Run sent for approval. Nothing is made or sent to Tally until an approver saves it." (`run_entry.dart:1017`; `flows/production_run_create_flow.dart:51-52`; `services/manufacturing/manufacturing_approval.dart:1-14`).
- Offline: "This needs a connection. Your run is kept on this device…" (`run_entry.dart:55-56`).

**Production orders** (plan the work; stay in Takkada)
- **Production orders** list (members without the view right see **My requests**), **Open orders** / **Closed**, **Overdue** filter, **New order** / **Request production** (`screens/manufacturing/production_order_list_screen.dart:65-68`, `:210`, `:238`, `:258`).
- Form: "What should be made?", **How many to make**, **Pick a due date**, **Customer (optional)**, BOM or **Needs BOM**, **Save order** (`widgets/manufacturing/order/production_order_form.dart:445-795`).
- Status: Waiting for approval, Sent back, Waiting for floor, Planned, Processing, Ready to receive, Done, Short-closed, Cancelled (`order_status_strip.dart:8-30`).
- **Report work**: good pieces, rejected with a reason (Cutting mistake, Stitching defect, Damaged), "Work on this order is finished" (`processing_entry_form.dart:24-26`, `:130-207`).
- **Receive into stock** turns the order into a production run (that is what reaches Tally) (`production_order_detail.dart:312`; `20261049500020_production_order_tables.sql:12-14`).
- **Set BOM** on an order raised without one; a receive needs a BOM ("Pick or make a BOM for this item") (`production_order_detail.dart:324`; `run_entry.dart:52`; `20261050099200_production_order_bom_at_receive.sql:1-17`).
- **Close short**: "The order ends here. Nothing is sent to Tally…" (`order_close_dialog.dart:54-61`).

**Job work out (to a job worker)** (`widgets/manufacturing/job_work/*`)
- **Job work** list, **New order** (`screens/manufacturing/job_work_order_list_screen.dart:73`, `:111`). Order form: **Choose job worker**, **Items to receive** with **Charges / unit**, **Components to send** (**From BOM**), **Due date**, **Save order** (`job_work_order_form.dart:198`, `:517-641`).
- From the order: **Send material** (Material Out), **Record receipt** (Material In: **Received**, **Used at the job worker**, **Scrap**, **Returned unused**), **Record charges bill** / **Link a charges bill** (a purchase invoice from that job worker), **Challans** (`job_work_order_detail.dart:241-625`; `job_work_material_form.dart:946-1030`; `20261047000600_job_work_charges_bills.sql:1-6`).
- Can't return more than the job worker holds ("Returned is more than the job worker holds") (`job_work_material_form.dart:585`).
- To Tally: **Job Work Out Order**, **Material Out**, **Material In**, and, when components were used up, a Manufacturing Journal at the job worker's godown, in that order (loader `job-work-order-processor.ts:48`; `20261047000310_job_work_rpcs.sql:25-31`, `:56-68`; `20261047000320_job_work_enqueue.sql:13-23`).
- A BOM step marked **At a job worker** inside a run raises its own job-work order and Material Out; the run waits: "Waits for the job worker: goes to Tally after the job worker's Material In is recorded." (`run_level_card.dart:146-150`, `:162`; `20261047000310_job_work_rpcs.sql:48-54`).
- Party page **Job work stock** tab: what each job worker holds of ours (Sent, Consumed, Returned, **Balance**, **Opening balance**) (`screens/party_details_screen.dart:2068`; `custody_table.dart:155`, `:260-264`, `:346`, `:360`).
- Challan PDF: **JOB WORK DELIVERY CHALLAN** / **JOB WORK RECEIPT CHALLAN**, "under Section 143 of the CGST Act, 2017", "Not a supply: no GST is charged…", "Value for transport only" (`services/pdf/generators/job_work_challan_generator.dart:30`, `:70-76`, `:121`). The challan screen offers an e-way bill on the consignment value (`screens/stock_journal_detail_screen.dart:76-78`).

## Cannot say / do not claim

- **Job work for a principal does not reach Tally.** The app lets you make a Job Work In Order and principal Material In / Out (`job_work_order_list_screen.dart:81-102`), but the connector refuses them: "a Job Work In Order", "job work for a principal" (loader `job-work-order-processor.ts:124`; `stock-journal-processor.ts:1058`; `godown-processor.ts:53-56`). Pitch job work *out* only.
- No job-work order or challan has reached a customer's Tally on prod yet. Don't say "customers already send job work to Tally".
- A Job Work Out Order to Tally must have **one finished item**, at least one component, and a rate on every line ("a job work order of several items", "no components", "no rate") (loader `job-work-order-processor.ts:146-149`; `stock-journal-processor.ts:1125`).
- **No edits after Tally**: a change to a posted job-work order, challan or Manufacturing Journal is refused (loader `job-work-order-processor.ts:125`; `stock-journal-processor.ts:617-624`). Cancelling a run in Tally is not proven: "open each of its journals in Tally and cancel it there" (`widgets/manufacturing/run/run_cancel_dialog.dart:12-15`).
- A Manufacturing Journal entered from the plain Stock Journal screen (outside a run) is not sent ("a Manufacturing Journal outside a production run") (loader `stock-journal-processor.ts:923`). A run step without a BOM is not sent (`:941-944`).
- Takkada does not create the Manufacturing Journal voucher type; the company needs one in Tally (loader `voucher-type-builder.mts:80` refuses "Use as Manufacturing Journal"; run journals use the book's flagged type, `20261047000230...sql:24`).
- Removing an item's last BOM, or a BOM line with a cost allocation % in Tally, is not written to Tally (loader `stock-item-bom-processor.ts:198-200`, `:219`).
- Production orders, report-work entries, rejects, Scrap % and BOM routes are not Tally vouchers (`order_close_dialog.dart:61`; `20261050099300...sql:21`). Don't say "production orders sync to Tally".
- The estimated cost is not Tally's cost (`bom_explosion_view.dart:280`; `models/manufacturing/bom.dart:234`).
- "On the computer" means the paid Desktop module layout. The phone does everything on its own; don't sell the desktop as included.
- No unit or decimal handling claims (a loader fix for unit decimals was still owed on 11-04).
- Don't say it is in a plan, free, or in trials.

## Capture (demo / stage book only, never a customer book)

- `manufacturing-bom`: phone **Bill of materials** editor for one item. **BOM name**, **Makes** qty, **Use by default** on, **Made: In house**, three lines: two **Component** lines (one with **Scrap %** and **Scrap goes to**) and one **By-product**, **Save BOM** visible. Optional second frame: **Explosion** with **To make** and **Estimated cost**.
- `manufacturing-production-run`: phone **New production run**. Item picked, BOM shown, **How many to make** filled, **Show steps** open with a step card showing **On hand** per component, one **Short · only N in stock** line, **Save run**. Optional detail frame: **Production run** with a step reading **In Tally · <number>**.
- `manufacturing-job-work`: phone **Job work order** detail for a Job Work Out Order: job worker, **Items to receive** with **Charges / unit**, **Components**, **Challans** with one Material Out, buttons **Send material** / **Record receipt** / **Record charges bill**. Never a Job Work In (principal) order.

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada (new on the page)**
- Record receipt (Material In) starts with each open order line's pending quantity, and the components used are pre-filled in proportion to what was received; the first Material Out starts with the order's components (`widgets/manufacturing/job_work/job_work_material_form.dart:51-55`, `:316-372` `_prefillFromOrder`). Page: "Send material starts from the order's components, and Record receipt starts from what is still due, with the components used worked out in proportion."
- Receive into stock opens the run with the order's item, its BOM and the quantity still to receive (`widgets/manufacturing/run/run_entry.dart:336-372`, `_qty.text = runQtyText(order.totals.stillToReceive)` at `:364`). Page: "A run received from a production order opens with its item, BOM and the quantity still to receive already filled."
- The hero screen is the step's journal on the Stock Journal screen, which prints `Sync: ${journal.syncStatus}` (`screens/stock_journal_detail_screen.dart:756`), so a just-saved step reads "Sync: pending". The run's own strip reads "In Tally · <number>" only once the step lands (`run_status_strip.dart:47-61`). Step 3 now says both: SJ-38 "reading Sync: pending until your Tally computer takes it in; the run then marks the step In Tally with its number". This fixes the old step, which said "In Tally" beside a screen showing pending.
- One run posts one Manufacturing Journal per in-house level, in order, stopping at the first failure (sheet above, `20261047000200...sql:10-15`).
- Dropped from the brief: "production from a sales order". Production orders carry an optional customer, but no code links a sales order to a production order on origin/main, so the page says "production order" only. Scrap is not pitched as an advantage: Tally Prime's own BOM carries scrap, and Takkada's Scrap % is app-only.

**Tally alone (basis)**
- Production is entered in Tally Prime as a Manufacturing Journal (a Stock Journal type with Use as Manufacturing Journal), at a computer running Tally; the BOM is set on the stock item and fills the components when the journal is keyed. The page credits Tally with the BOM ("Set on the stock item at the Tally computer") and claims no advantage on it.
- A product made in levels (sub-assembly, then the finished item) is one Manufacturing Journal per level in Tally. The page softens this to "usually means".
- Job work in Tally Prime (job order processing switched on) is a Job Work Out Order, a Material Out and a Material In, each a voucher keyed with its items.
- Slip from the floor, a call to the godown, planning on a whiteboard or sheet: the reader's day, not a statement about Tally.


## Who it's for, and table rows rewritten (2026-11-06)
Ronak asked that every page make the gain over Tally and the use cases plain. Each page now carries three situations (today against with Takkada) and a "Work you stop doing" list. Every Takkada-side sentence there restates a claim already sourced above on this sheet (walkthrough, table or FAQ); the "today" sentences describe the reader's day, as the Tally-alone column does. No new Tally capability claims: Tally licences, duplicate prevention and multi-voucher e-mail are still not described. Live Tracking's table now compares against phone calls and WhatsApp location, since Tally does not record location.
