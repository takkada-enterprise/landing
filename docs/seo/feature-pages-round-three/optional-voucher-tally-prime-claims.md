# Claims sheet: Tally Drafts (`tally_drafts`) feature page

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). App paths are under takkada `lib/` on origin/main. Migrations are supabase-functions `origin/main` (b08b6fab) `supabase/migrations/`. Loader refs are tally-database-loader `origin/master`. Every piece below is on origin/main; the drafts files have no origin/main vs origin/stage diff.

- Prod entitlement today: `tally_drafts` has **42 active** (37 migration grants, 3 trial, 1 paid add-on, 1 manual) and 27 inactive. The brief's "26 active" is stale. Never quote these counts.
- Prod use, for us only and never to be quoted: about 3,640 drafts are open as `draft` across about 25 companies. 248 drafts have been posted from the app, by payment, purchase invoice, sales invoice, journal, credit note, receipt and stock journal. The last post was 2026-11-05. 2 drafts are currently rejected. So the flow (draft in Tally → app → Post → regular voucher in Tally → synced back) runs on prod.

## Gating

- Paid add-on, key `tally_drafts` ("Tally drafts"). It is in no plan tier and an operator switches it on. Trials get it. Companies that used drafts before 2026-10-25 were granted it by migration (`models/company_feature_access.dart:201-206`; `20261043900300_tally_drafts_feature_switch.sql:8-18`).
- When it is off:
  - The Home tile, the desktop sidebar entry and the `/tally-drafts` routes stay hidden. A direct link goes to Home (`services/tally_drafts_access_service.dart:7-12`; `config/app_router.dart:7377-7400`).
  - The server returns no rows and refuses post and reject with "Tally drafts is not switched on for this company." (`20261043900300...sql:20-27`, `:238`, `:302`).
  - A post requested before the switch-off still finishes (`:29-34`).

## Can say

**What a draft is**
- The in-app wording: "An optional voucher is one your accountant has typed in Tally but not posted to the books yet." (`screens/tally_drafts_register_screen.dart:329-330`). The model calls it a voucher the accountant "parked in Tally that posts to no book yet" (`models/tally_draft.dart:1-2`).
- Drafts are kept apart from the real books. They sit in their own tables, and "no balance, register, report, reminder or automation can ever read them". Outstanding, ledgers, reports and reminders do not count a draft (`20261014013000_optional_voucher_mirror_lane.sql:21-23`, `:77`).

**Where it lives**
- On the phone (and in Web view), it is a **Tally Drafts** tile in the Home registers. The screen is titled **Tally Drafts** (`utils/home_register_catalog.dart:253-265`; `tally_drafts_register_screen.dart:276`).
- In the Desktop Entry layout, it is a sidebar entry. Both surfaces follow the same rule (`desktop/shell/desktop_nav_catalog.dart:148-149`, `:377-378`).
- Four tabs: **Drafts**, **In progress**, **Posted**, **Rejected** (`models/tally_draft.dart:95-116`).
- Filter chips: All, Sales, Purchases, Receipts, Payments, Credit Notes, Debit Notes, Journals, Contra, Stock, Challans, GRN, Purchase Orders, Other (`models/tally_draft.dart:178-193`).
- The list shows the current financial year by default. **Show older** widens it, and **This financial year only** narrows it back (`tally_drafts_register_screen.dart:47-48`, `:386`).

**What each row shows**
- Each tile shows the voucher type (the name used in Tally), party, amount, date, the ledger entries (Dr / Cr, ledger, amount), the narration and a status. The **Reject** and **Approve** buttons sit on the tile, so drafts can be cleared without opening each one (`tally_drafts_register_screen.dart:15-21`, `:423-424`, `:583-589`; `models/tally_draft.dart:237-238`, `:273`).
- The detail screen, **Tally Draft**, shows Type, Number, Date, Party, Amount, Narration and Entries. It is read-only: "the app never edits a draft's figures, it asks Tally to make this exact voucher regular" (`screens/tally_draft_detail_screen.dart:21-25`, `:212`, `:275-295`).

**Post (Approve)**
- **Approve** on a tile posts with one tap (`tally_drafts_register_screen.dart:218-229`).
- **Post to books** on the detail screen opens a sheet titled "Post to your Tally books?". It shows Voucher, Party, Amount and Date, then says "This records it in Tally as a regular sales invoice [receipt, payment …]. It can't be undone from the app." The button is **Post** (`widgets/tally_draft_post_confirm_sheet.dart:56-81`, `:102`; `models/tally_draft.dart:213-228`; detail `:339`).
- In Tally, the same voucher becomes a regular (posting) voucher. The loader alters the optional voucher itself and does not create a second voucher. It reads Tally before and after the write. If the voucher is already regular, it finishes with zero writes (tally-database-loader `src/main/queue/job-adapters/processors/post-optional-voucher-processor.ts:1-25`).
- "The draft you saw is the draft that gets posted." If the accountant changed it in Tally after you looked, the post stops. The app shows "This draft was changed in Tally. These are the new figures…" for a fresh decision (`tally_draft_detail_screen.dart:261`; `20261014030500_enqueue_post_optional_voucher_job.sql:100-106`).
- Status words: Draft · Posting to Tally… · Waiting for your Tally computer · Posted in Tally, will appear after sync · Posted · Needs your attention · Cancelled in Tally · Removed in Tally · Rejected (`models/tally_draft.dart:389-411`).
- Once a draft is posted, **Open <type>** opens the real voucher in the app (`models/tally_draft.dart:433-466`; detail `:316-331`).

**Reject**
- Reject sets the draft aside **in the app only**. Nothing is sent to Tally and the voucher stays an optional voucher there. **Undo** is offered right away, and **Undo reject** is on the Rejected tab (`tally_drafts_register_screen.dart:231-244`, `:570`; `models/tally_draft.dart:99-100`, `:317-320`; `20261036720000_tally_draft_reject_and_tile_lines.sql:4-5`).
- If the accountant edits a rejected draft in Tally, it comes back to Drafts for a fresh decision (`20261036720000...sql:6-8`).

**Who can do what**
- Seeing: a restricted member sees only drafts whose voucher family maps to a register they may view, limited further by their ledger scope. A member with no viewable register gets no tile (`utils/home_register_catalog.dart:258-263`, `:335-347`).
- Posting or rejecting needs permission to create that kind of voucher. Otherwise: "You don't have permission to create receipts." (`models/tally_draft.dart:476-478`; `20261043900300...sql:316-325`, `:464`).
- If approvals are on for that family, only an approver can post: "<Type> entries need approval in this company. Ask an approver to post it." (`models/tally_draft.dart:479-481`; `20261043900300...sql:328-329`).
- When Post is not allowed, the button stays visible but disabled, with the reason underneath (`tally_draft_detail_screen.dart:27-32`; `models/tally_draft.dart:419-429`).

## Cannot say / do not claim

- **"Reject … into the books"** (the prod description says "post or reject them into the books") is wrong. Reject never touches Tally and does not delete or cancel anything there. Say "set it aside in Takkada; it stays a draft in Tally".
- Do not say the app creates, edits or deletes optional vouchers. Drafts start only in Tally, and the app cannot change a draft's figures (`20261014013000...sql:29-30`; detail `:24-25`).
- Do not say a draft's item lines are shown. Only ledger (accounting) entries are mirrored. Stock journal and other inventory-only drafts say "Inventory entry — open Tally to see items" (`20261014013000...sql:1`, `:26-34`; detail `:447`; `models/tally_draft.dart:283-286`).
- Post-dated drafts cannot be posted from the app: "Post-dated voucher — post it from Tally." (`models/tally_draft.dart:490`).
- A voucher type Takkada has not classified cannot be posted by anyone: "This voucher type isn't set up in Takkada — contact support." (`models/tally_draft.dart:482-483`; `20261043900300...sql:316-317`).
- Tally sync must be on (`:484-485`). The customer's Tally PC and loader must be running before a post lands ("Waiting for your Tally computer"). An old loader must auto-update first (`models/tally_draft.dart:313-314`, `:400`).
- Posting cannot be undone from the app.
- Do not claim sales orders, purchase orders or quotations flow through Tally Drafts. The lane holds optional **non-order** vouchers (`20261014013000...sql:77`). Quotations are handled separately, as optional orders.
- Do not quote prod counts (companies, drafts posted).
- Do not say it is part of any plan. It is a separately switched paid add-on.

## Capture

- `tally-drafts`: the **Tally Drafts** register on the phone (stage co7088 or the demo book), on the Drafts tab with the "All" chip. Show two or three tiles, each with voucher type, party, amount, date, Dr/Cr ledger lines and the Reject / Approve buttons. A second frame is optional: the "Post to your Tally books?" sheet showing "This records it in Tally as a regular … It can't be undone from the app."

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: unchanged facts above (Approve makes the same voucher regular, no second copy; list shows party, amount, ledger lines and narration; reject is app-only).

**Tally alone (basis)**: in Tally Prime a voucher is marked optional in voucher entry and made regular by opening it, marking it regular and saving; pending ones are listed in the Optional Vouchers report. The phone call or photo to the owner is the reader's day.
