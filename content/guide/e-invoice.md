---
slug: e-invoice
title: How to generate an e-invoice
meta_title: How to generate an e-invoice in Takkada
meta_description: "Enter your GST portal credentials, generate an IRN and signed QR for a sales invoice, read the result, and cancel the GST document but keep the invoice."
featureKey: einvoice_ewaybill_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - E-Invoice
  - Generate E-Invoice
  - Enter your GST portal credentials to generate e-invoice
  - Username
  - Password
  - Save credentials securely for future use
  - Use securely saved username and password
  - Need help getting your credentials?
  - View e-Invoicing Guide
  - Please enter username and password
  - E-invoice generated successfully
  - Failed to generate e-invoice
  - Waiting for Tally to record this invoice
  - Pending Tally
  - E-Invoice Details
  - Invoice Reference Number (IRN)
  - Ack No.
  - Ack Date
  - Signed QR Code
  - This QR code is digitally signed by the GST portal and should be printed on the invoice.
  - Copy QR Data
  - Cancel GST doc
  - Cancel GST document
  - The invoice stays in your books and is NOT cancelled.
  - Select a reason
  - Remarks
  - Cancel document
  - Cancel both documents
  - Keep documents
  - GST document cancelled. The invoice was not cancelled.
  - Invoices with e-invoice or e-way bill cannot be cancelled here.
quoteSources:
  E-Invoice:
    - lib/screens/sales_invoice_detail_screen.dart
  Generate E-Invoice:
    - lib/screens/generate_e_invoice_screen.dart
  Enter your GST portal credentials to generate e-invoice:
    - lib/screens/generate_e_invoice_screen.dart
  Username:
    - lib/widgets/credentials/whitebooks_credentials_form.dart
  Password:
    - lib/widgets/credentials/whitebooks_credentials_form.dart
  Save credentials securely for future use:
    - lib/widgets/credentials/whitebooks_credentials_form.dart
  Use securely saved username and password:
    - lib/widgets/credentials/whitebooks_credentials_form.dart
  Need help getting your credentials?:
    - lib/screens/generate_e_invoice_screen.dart
  View e-Invoicing Guide:
    - lib/screens/generate_e_invoice_screen.dart
  Please enter username and password:
    - lib/screens/generate_e_invoice_screen.dart
  E-invoice generated successfully:
    - lib/screens/generate_e_invoice_screen.dart
  Failed to generate e-invoice:
    - lib/screens/generate_e_invoice_screen.dart
  Waiting for Tally to record this invoice:
    - lib/utils/gst_compliance_action_gates.dart
  Pending Tally:
    - lib/utils/gst_compliance_action_gates.dart
  E-Invoice Details:
    - lib/screens/einvoice_details_screen.dart
  Invoice Reference Number (IRN):
    - lib/screens/einvoice_details_screen.dart
  Ack No.:
    - lib/screens/einvoice_details_screen.dart
  Ack Date:
    - lib/screens/einvoice_details_screen.dart
  Signed QR Code:
    - lib/screens/einvoice_details_screen.dart
  This QR code is digitally signed by the GST portal and should be printed on the invoice.:
    - lib/screens/einvoice_details_screen.dart
  Copy QR Data:
    - lib/screens/einvoice_details_screen.dart
  Cancel GST doc:
    - lib/screens/sales_invoice_detail_screen.dart
  Cancel GST document:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  The invoice stays in your books and is NOT cancelled.:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Select a reason:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Remarks:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Cancel document:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Cancel both documents:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  Keep documents:
    - lib/widgets/gst_compliance_cancellation_sheet.dart
  GST document cancelled. The invoice was not cancelled.:
    - lib/screens/sales_invoice_detail_screen.dart
  Invoices with e-invoice or e-way bill cannot be cancelled here.:
    - lib/screens/sales_invoice_detail_screen.dart
relatedGuides:
  - e-way-bill
  - sales-invoice
  - tally-sync
  - gst-on-the-bill
sections:
  - id: credentials
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
  - id: generate
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
  - id: cancel
    featureKeys: [einvoice_ewaybill_mobile]
    settings: {}
    permission: sales-invoice-view
images: []
---

An e-invoice is a sales invoice that has been registered with the government's
invoice registration portal. The portal gives it a unique number — the IRN — and
a signed QR code, which you print on the bill. Takkada does that registration
for you from a saved invoice, and keeps the result on the invoice for you to
print and share.

This guide is about what the app does. **Whether your business has to register
its invoices at all, and from which date, is a matter of law, not of this
software.** Takkada does not decide that for you and this page does not tell you
the answer. Ask your accountant or check the official portal.

## Before you start

- The e-invoice and e-way bill feature has to be on for your business. If it is
  not, the buttons are not on the invoice at all.
- You need your own login for the government e-invoicing portal. Takkada does
  not issue those and cannot create one for you. The screen shows
  "Need help getting your credentials?" with "View e-Invoicing Guide" if you do
  not have them yet.
- The invoice must already be saved. You cannot register a bill that does not
  exist.
- The buyer's GST details have to be right on the invoice. The portal checks
  them, and rejects the invoice if they are wrong.
- Nothing here is reversible in the ordinary sense. A registered invoice can be
  cancelled on the portal, but only within the portal's own window and only with
  a reason.

## Generate the e-invoice

1. Open the saved sales invoice.
2. Tap "E-Invoice".
3. The screen "Generate E-Invoice" opens with
   "Enter your GST portal credentials to generate e-invoice".
4. Enter your "Username" and "Password" for the portal. Tick
   "Save credentials securely for future use" if you do not want to type them
   every time; next time the screen offers
   "Use securely saved username and password" instead.
5. Tap Generate E-Invoice and wait. Do not close the screen while it works.
6. On success you get "E-invoice generated successfully" and go back to the
   invoice, which now carries its IRN.

If you leave a field empty you get "Please enter username and password" and
nothing is sent.

## Read the result

Open the compliance details from the invoice to see "E-Invoice Details":

- **"Invoice Reference Number (IRN)"** — the unique reference the portal gave
  this invoice. This is the thing that proves it was registered.
- **"Ack No."** and **"Ack Date"** — the portal's acknowledgement number and the
  moment it accepted the invoice.
- **"Signed QR Code"** — the block your printed bill must carry. The screen says
  it plainly:
  "This QR code is digitally signed by the GST portal and should be printed on the invoice."
- "Copy QR Data" puts the signed data on your clipboard if you need it
  elsewhere.

The invoice PDF Takkada produces carries these for you, so in ordinary use you
do not have to copy anything by hand.

## Retrying and the Tally wait

Not every unsuccessful attempt is a failure.

- **The portal rejected it.** You get the portal's own reason back. Read it: it
  usually names the field that is wrong, most often something about the buyer's
  GSTIN or address. Fix the invoice, then generate again.
- **The button is visible but will not press, with the words
  "Waiting for Tally to record this invoice" underneath.** Nothing is wrong.
  Some businesses are set up so an invoice must reach their Tally before it can
  be registered. It resolves by itself once the sync catches up; the invoice may
  also carry a "Pending Tally" tag while it waits. Wait a minute and try again.
- **It says "Failed to generate e-invoice" with something vague.** Check that
  you are online, then check the credentials, then read the message again —
  a long message from the portal is usually about the invoice, not your login.

An invoice that already carries an IRN is never offered another one. The button
disappears rather than sitting there disabled, because a second registration for
the same bill is not a thing you want.

## Cancel the GST document

Cancelling the registration is not the same as cancelling the invoice.

1. Open the invoice.
2. Tap "Cancel GST doc".
3. The sheet is headed "Cancel GST document" and states
   "The invoice stays in your books and is NOT cancelled."
4. Use "Select a reason" to pick why, and add "Remarks" if you want to explain.
5. Tap "Cancel document" to send the cancellation — it reads "Cancel both documents"
   when the invoice carries an e-way bill as well. "Keep documents" backs out and
   changes nothing on the portal.

On success you get
"GST document cancelled. The invoice was not cancelled." — which is exactly
what happened. Your books are unchanged. If the invoice also had an e-way bill,
both are offered together.

The portal has its own time limit for cancelling a registration. Takkada passes
your request on; it cannot extend that window.

## When it does not look right

**There is no e-invoice button on the invoice.** Either the feature is not on
for your business, or the invoice already has an IRN. Check the compliance
details before assuming the first.

**You cannot cancel the invoice itself.** Once an invoice carries a GST
document, the app says
"Invoices with e-invoice or e-way bill cannot be cancelled here." Cancel the GST
document first, or issue a credit note instead. Several fields — due date,
voucher number, payment status — lock for the same reason.

**The portal keeps rejecting the same invoice.** Read the message rather than
retrying. If it names the buyer, fix the party's GST details and generate again.
Retrying an unchanged invoice gets the same answer.

**The e-invoice worked but the invoice looks wrong in Tally.** Registering with
the portal and syncing to Tally are two different journeys. A successful IRN is
not evidence that Tally has the invoice. See the Tally sync guide.
