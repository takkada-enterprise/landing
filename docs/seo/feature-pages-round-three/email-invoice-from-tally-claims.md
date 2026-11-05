# Claims sheet: Email invoices & reminders (`email_dispatch`)

Checked 2026-11-05 against takkada origin/main 7d9784c7f and prod (SELECT only). The sending runs server-side, read from supabase-functions origin/main b08b6fab (`supabase/functions/process-reminder-queue/email-leg.ts`, `supabase/functions/_shared/email/*`, `supabase/functions/process-reminder-queue/index.ts`). App refs are `git show origin/main:<path> | grep -n`, paths under `lib/`. No email file differs between origin/main and origin/stage in either repo, so everything below is live.

## Gating

- One paid add-on, key `email_dispatch`, in no plan tier, operator-granted (`models/company_feature_access.dart:183-186`; supabase-functions `20261036100000_email_dispatch_addon.sql:1-14`).
- Checked on every send, fail-closed, first: no add-on means no email (`email-leg.ts:14`, `:88`). Demo companies never email (`:89`).
- Add-on pitch: "Email every invoice and payment reminder to customers who work from their inbox, with the PDF attached." (`config/addon_catalog.dart:118-123`).
- App: the **Email** settings row, "Invoice and reminder emails to your customers", shows only with the add-on (`config/settings_catalog.dart:155-166`; route guard `config/app_router.dart:1727-1730`). Without it the screen says "Email add-on isn't active" (`screens/settings/email_settings_screen.dart:107`).
- **It rides on the WhatsApp sends.** The email is the second leg of an item in the automatic WhatsApp send queue, so it goes only for sends that queue makes: Auto Invoice Dispatch (`invoice_created`), the automatic due / overdue reminders, and statement shares sent through the queue (`email-leg.ts:1-5`; `process-reminder-queue/index.ts:330-336`, `:1364-1381`, `:1947-1962`).
- Prod, 2026-11-05: `email_dispatch` active on **2** companies (59 inactive). Both also have Auto Invoice Dispatch on. **One email has ever gone out on prod** (a statement, 2026-10-03, PDF attached). No invoice email or reminder email has gone yet; neither company has queued a WhatsApp send in the last 30 days. Capability claim only.

## Can say

**What gets emailed**
- The invoice email when an invoice is created (the Auto Invoice Dispatch twin). Subject "Invoice <no.> from <Company>", body "<Company> has created an invoice for you. Amount: ₹X. Due Date: …", PDF attached (`_shared/email/reminder-email-content.ts:24-35`; `email-leg.ts:112-117`).
- Payment due reminders, "Payment due: ₹X to <Company>", and overdue reminders, "Payment overdue: ₹X to <Company>" with "Overdue By: N days" (`reminder-email-content.ts:38-62`).
- Statement of account, "Statement of account from <Company>: ₹X pending", statement attached (`reminder-email-content.ts:66-76`). This is the one kind proven on prod.
- The same words as the WhatsApp message, so the customer reads one message on either channel (`reminder-email-content.ts:1-10`). When the WhatsApp message carries a pay link, the email carries "Pay now: <link>", the same pay page (`reminder-email-content.ts:8`; `email-leg.ts:222-225`).
- The email still goes when WhatsApp was refused or failed for good, so the customer gets the reminder anyway. It is never sent twice for one item (`process-reminder-queue/index.ts:1533-1543`; `email-leg.ts:1-9`).

**Who it goes to**
- The party's email from Tally (the ledger's email field, synced) (`_shared/email/recipient.ts:1-3`, `:23-38`). If the field holds several addresses or junk, the first well-formed one is used; no valid address means that party is skipped silently (`recipient.ts:1-14`).
- The email can be added or changed in the app on the party page: **Email** card, "No email saved. Add one to email invoices and reminders.", **Add** / **Edit**, "Email address", "Enter a valid email address", **Remove** (`widgets/party_email_card.dart:8-10`, `:144-151`, `:170`, `:207-230`; shown on `screens/party_details_screen.dart:2186`, `:2310`). It saves on the ledger and is sent back to Tally like an app-edited mobile number, and a Tally re-sync does not wipe it (`services/party_email_service.dart:3-9`). Note: this card shows for every company, with or without the add-on.

**How it looks**
- From: "<Company name> via Takkada" <noreply@takkada.com> (`email-leg.ts:137-138`; `_shared/email/ses-send.ts:23-24`). Settings explains "Emails go out from Takkada's address so they reach the inbox reliably." (`email_settings_screen.dart:128-142`).
- Reply-To and a CC copy go to the business email on the invoice seller details, so the business gets a copy of every email and customers can reply to them (`email-leg.ts:94-99`, `:141`, `:251-257`; `email_settings_screen.dart:150-179`, Edit opens seller details).
- The PDF is the same file WhatsApp sent (`email-leg.ts:4-5`). If the PDF cannot be fetched (or is over 7 MB) the email goes without it and says "Your invoice could not be attached; reply to this email for a copy." (`email-leg.ts:72-74`, `:104-108`, `:244`; `reminder-email-content.ts:121-122`).

**Settings → Email** (read-only, `screens/settings/email_settings_screen.dart`)
- Sections: **Sent as**, **Copies and replies go to**, **Customers with email** ("N of M customers have an email"), **Recent emails** with Invoice / Reminder / Email and Sent / Failed per row, empty "No emails sent yet." (`:128`, `:150`, `:186-195`, `:198-204`, `:250-254`, `:298`).

**Automatic, not by hand**
- Every email is logged as automated (`email-leg.ts:160`). The customer does nothing extra: if the company sends invoices or reminders automatically and the party has an email, the email goes beside it.

**Tally**
- Nothing is posted. Email sends no voucher. The only Tally effect is an email typed on the party page, written back to the ledger (`party_email_service.dart:5-9`).

## Cannot say / do not claim

- **No adoption.** One email ever on prod. No "customers get invoices by email every day".
- **Receipts and credit notes are not emailed.** Templates exist (`reminder-email-content.ts:80-92`), but those WhatsApp sends go through a separate path (`_shared/receipt-whatsapp-delivery.ts`, `_shared/credit-note-whatsapp-delivery.ts`) with no email leg.
- **No email button.** There is no "email this invoice" or "send by email" in the app, and WhatsApp shares made by hand from the app do not email. It is only the automatic queue.
- **No email without the WhatsApp send.** A party with an email but no valid mobile number gets no email: the queue item stops on the phone number before either leg (`process-reminder-queue/index.ts:721-724`). Do not say "email instead of WhatsApp" or "email-only customers".
- **Invoice emails need Auto Invoice Dispatch; reminder emails need automatic reminders.** Email does not create its own schedule.
- **Not from the customer's own email address or domain.** Always noreply@takkada.com with the business name; replies go to the business email.
- **No open or read tracking, no bulk email campaigns, no custom email templates.**
- **The settings screen does not change anything**; the business email is edited on seller details (`email_settings_screen.dart:14-17`).
- Contradiction with feature_definitions: "Goes out alongside WhatsApp whenever the customer has an email in Tally" also needs the party to have a valid mobile number and the send to be automatic. "Every invoice" holds only with Auto Invoice Dispatch on. The email can also come from the app, not only Tally.

## Screen captures

- `email-invoices`: Settings → Email (`email_settings_screen.dart`) on a demo company: "Sent as <Company> via Takkada <noreply@takkada.com>", "Copies and replies go to" with a business email, "N of M customers have an email", and Recent emails with an Invoice row marked Sent. Prod has no invoice email to capture, so this needs a staged demo send. Second choice: the party page Email card with an address saved.

## Tally alone vs with Takkada (copy rewrite, 2026-11-05)

Ronak asked for every page to show what the job takes in Tally alone and what is left with Takkada. Takkada-side sentences were re-checked against takkada origin/main 7d9784c7f and supabase-functions origin/main b08b6fab (unchanged since the sheet above). Tally-side sentences describe Tally Prime as it ships, or the reader's day around it; where we were not sure how far Tally goes, the page says less. The comparison table's columns are labelled "Tally with Takkada" and "Tally alone" (`comparison.takkadaLabel`, rendered by `src/components/FeaturePage.jsx`).

**With Takkada**: unchanged facts above (rides on Auto Invoice Dispatch and the automatic reminders; address from the ledger, app-added address written back; Reply-To and copy to the business email).

**Tally alone (basis)**: Tally Prime can e-mail a voucher or report once e-mail is set up on the Tally computer; somebody at that computer sends it. The page no longer says "one voucher at a time" or that Tally cannot send reminders: we did not verify Tally's multi-voucher or reminder-letter e-mail, so the table says only "Sent by hand from the office".
