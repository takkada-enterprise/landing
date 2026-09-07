---
slug: whatsapp-invoice-delivery
title: How to send invoices to customers on WhatsApp
meta_title: How to send invoices to customers on WhatsApp in Takkada
meta_description: Send the invoice PDF to your customer automatically when you create it, or share it yourself, and understand the switched-off and out-of-credits states.
featureKey: auto_invoice_dispatch
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Auto-send invoice via WhatsApp
  - Invoices
  - Send invoice via WhatsApp
  - Checking WhatsApp credits...
  - Only full-access members can change this setting.
  - This feature is not enabled for this business right now.
  - Auto-send on WhatsApp stays off until credits are added.
  - WhatsApp credits are over for this business. Add a WhatsApp pack to continue automated WhatsApp messages.
  - Automated WhatsApp paused
  - Invoice created, but WhatsApp PDF failed
  - Share
  - Invoice PDF generated successfully
  - Reminder History
  - Auto Dispatch
  - Sent
  - Failed
  - Pending
  - Not tracked
  - Payment link is off for this party. Invoice will be sent without a payment link.
quoteSources:
  Auto-send invoice via WhatsApp:
    - lib/screens/settings/invoices_settings_screen.dart
  Invoices:
    - lib/screens/settings/invoices_settings_screen.dart
  Send invoice via WhatsApp:
    - lib/screens/invoice_summary_screen.dart
  Checking WhatsApp credits...:
    - lib/screens/invoice_summary_screen.dart
  Only full-access members can change this setting.:
    - lib/screens/settings/invoices_settings_screen.dart
  This feature is not enabled for this business right now.:
    - lib/screens/settings/invoices_settings_screen.dart
  Auto-send on WhatsApp stays off until credits are added.:
    - lib/screens/settings/invoices_settings_screen.dart
  WhatsApp credits are over for this business. Add a WhatsApp pack to continue automated WhatsApp messages.:
    - lib/services/whatsapp_service.dart
  Automated WhatsApp paused:
    - lib/widgets/automated_whatsapp_blocked_card.dart
  Invoice created, but WhatsApp PDF failed:
    - lib/screens/invoice_summary_screen.dart
  Share:
    - lib/screens/sales_invoice_detail_screen.dart
  Invoice PDF generated successfully:
    - lib/screens/sales_invoice_detail_screen.dart
  Reminder History:
    - lib/screens/reminder_history_screen.dart
  Auto Dispatch:
    - lib/screens/reminder_history_screen.dart
  Sent:
    - lib/models/party_reminder_rollup.dart
  Failed:
    - lib/models/party_reminder_rollup.dart
  Pending:
    - lib/models/reminder_history.dart
  Not tracked:
    - lib/models/party_reminder_rollup.dart
  Payment link is off for this party. Invoice will be sent without a payment link.:
    - lib/screens/invoice_summary_screen.dart
relatedGuides:
  - sales-invoice
  - whatsapp-reminders
  - party-ledger
  - e-invoice
sections:
  - id: automatic-sending
    featureKeys: [auto_invoice_dispatch]
    settings: {autoSendInvoiceOnCreation: bool}
    permission: full-access-member
  - id: per-invoice-switch
    featureKeys: [auto_invoice_dispatch]
    settings: {}
    permission: sales-invoice-create
  - id: manual-sharing
    featureKeys: []
    settings: {}
    permission: sales-invoice-view
images: []
---

Takkada can send the invoice PDF to your customer on WhatsApp the moment you
create it, so the bill reaches them before you have put the phone down. You can
also turn that off and share the PDF yourself. This guide covers both, and the
states in between.

## Before you start

- Automatic sending has to be available to your business. When it is not, the
  setting is on screen with the reason
  "This feature is not enabled for this business right now."
- Only a full-access member can change the business-wide setting. Everyone else
  sees "Only full-access members can change this setting."
- The customer needs a mobile number saved. No number, no automatic send — the
  switch is not even offered on that invoice.
- Each message costs a WhatsApp credit.
- Sharing the PDF yourself always works and costs no credits.

## Turn automatic sending on

1. Open Settings and tap "Invoices" to reach the invoice settings screen.
2. Find the "Auto-send invoice via WhatsApp" row and read the line under it. That
   line is where the screen says a reason if the switch cannot be moved.
3. Turn the switch on. It is saved for the whole business at once, so every sales
   invoice anyone creates from now on offers to go out by itself.

From then on, every sales invoice you create offers to go out by itself.

An imported invoice is never sent this way — your customer already has that
bill, so the app does not offer the switch rather than offering it and ignoring
it.

## Decide per invoice

The business setting is the default, not a command. On the last step of creating
an invoice you get a switch, "Send invoice via WhatsApp", with the customer's
number written under it. Leave it on to send, or turn it off for this one bill.

Two things you may see there:

- "Checking WhatsApp credits..." while the app confirms you have credits left.
- "Payment link is off for this party. Invoice will be sent without a payment link."
  The invoice still goes; it simply carries no pay link.

## Share an invoice yourself

1. Open the saved invoice from the sales register and let its detail screen load.
2. Tap "Share" at the foot of that screen. Takkada builds the PDF first, so there
   is a moment before anything else happens.
3. Wait for "Invoice PDF generated successfully", then pick where to send it —
   WhatsApp, email, anything on your phone.

This is a normal share from your own device. It uses no credits, and Takkada
learns nothing about what happens next, which matters when you go looking for
the result later.

## The switched-off and out-of-credits states

**Switched off for the business.** The row shows the reason instead of a
subtitle and the switch will not move. Nothing is sent automatically; sharing by
hand still works exactly as before.

**Not a full-access member.** The row says
"Only full-access members can change this setting." You can still send the
invoice by hand.

**Credits exhausted.** A card appears saying
"Automated WhatsApp paused", with
"WhatsApp credits are over for this business. Add a WhatsApp pack to continue automated WhatsApp messages."
and, on the invoice settings screen,
"Auto-send on WhatsApp stays off until credits are added."
The setting is left as you had it — it is paused, not reset — and resumes when
credits are added. Sharing by hand is unaffected.

## Queued, sent and failed

An automatic send is queued, not instant. Takkada makes the PDF, hands the
message to WhatsApp, and records the outcome. Open "Reminder History" to see
these alongside your reminders; an invoice sent this way carries an
"Auto Dispatch" mark.

The states mean:

- **"Pending"** — queued, no answer yet.
- **"Sent"** — WhatsApp accepted the message.
- **"Failed"** — WhatsApp refused it.
- **"Not tracked"** — you shared it yourself, from your own phone. Nothing comes
  back about those.

**"Sent" is not a delivery receipt.** It means the message was accepted for
sending. Whether it arrived on the customer's phone, and whether they opened it,
is not reported back to Takkada. If the invoice matters, confirm it with the
customer.

If the PDF step itself goes wrong you get
"Invoice created, but WhatsApp PDF failed". Read that carefully: your invoice was
created and is safe in your books. Only the sending failed. Open the invoice and
share it by hand.

## When it does not look right

**There is no send switch on the invoice.** The party has no mobile number
saved, or the invoice was imported rather than created here.

**The switch is on but nothing reached the customer.** Check the history first.
A "Failed" entry means WhatsApp refused it — usually a bad number. A "Sent"
entry means it was accepted, and the number is the next thing to check.

**Everything stopped at once.** Credits have run out. The screens say so.

**You cannot change the setting.** You are not a full-access member on this
business, or the feature is not on for it. The row names which.

**You shared the invoice by hand and the history shows nothing useful.** That is
expected. A manual share is marked "Not tracked" because nothing is reported
back from your own phone.
