---
slug: bills-and-outstanding
title: How to read bills and outstanding
meta_title: How to read bills and outstanding in Takkada
meta_description: Read who owes you and who you owe, tell due apart from overdue, change the ageing periods, and see where reading a report ends and following up begins.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Bills Receivable
  - Bills Payable
  - Total Receivable
  - Total Payable
  - By group
  - By party
  - Overdue (oldest first)
  - Ageing periods
  - Export to Excel
  - Export to PDF
  - Open bills
  - Brought forward from earlier years
  - Mark followed up
  - Share PDF
  - Send on WhatsApp
  - Reports are turned off for you
  - Your admin decides who can see the business reports.
quoteSources:
  Bills Receivable:
    - lib/models/report_models.dart
  Bills Payable:
    - lib/models/report_models.dart
  Total Receivable:
    - lib/models/report_models.dart
  Total Payable:
    - lib/models/report_models.dart
  By group:
    - lib/screens/reports/bills_outstanding_screen.dart
  By party:
    - lib/screens/reports/bills_outstanding_screen.dart
  Overdue (oldest first):
    - lib/screens/reports/bills_outstanding_screen.dart
  Ageing periods:
    - lib/widgets/reports/ageing_slab_editor.dart
  Export to Excel:
    - lib/screens/reports/bills_outstanding_screen.dart
  Export to PDF:
    - lib/screens/reports/bills_outstanding_screen.dart
  Open bills:
    - lib/screens/reports/bills_party_page_screen.dart
  Brought forward from earlier years:
    - lib/screens/reports/bills_party_page_screen.dart
  Mark followed up:
    - lib/screens/reports/bills_outstanding_screen.dart
  Share PDF:
    - lib/screens/reports/bills_party_page_screen.dart
  Send on WhatsApp:
    - lib/screens/reports/bills_party_page_screen.dart
  Reports are turned off for you:
    - lib/screens/shell/reports_tab_body.dart
  Your admin decides who can see the business reports.:
    - lib/screens/shell/reports_tab_body.dart
relatedGuides:
  - party-ledger
  - whatsapp-reminders
  - record-receipt
  - home
sections:
  - id: receivable-and-payable
    featureKeys: []
    settings: {}
    permission: reports-view
  - id: ageing-and-filters
    featureKeys: []
    settings: {ageingPeriods: per-device}
    permission: reports-view
  - id: follow-up-actions
    featureKeys: [payment_reminders]
    settings: {}
    permission: reminders-use
images: []
---

Takkada keeps two bill lists for every business: the bills your customers have
not paid you, and the bills you have not paid your suppliers. Both lists are
built from the same open bills your Tally company already holds, grouped by
party and sorted by how long the money has been waiting. This guide explains how
to read them, how to change the age buckets, and where reading a report stops
and chasing money starts.

## Before you start

- Your business must be connected and synced, because these lists come from the
  bills in your Tally company.
- You need permission to see reports. If you do not have it, the Reports tab
  shows "Reports are turned off for you", with the line
  "Your admin decides who can see the business reports."
  Ask your admin; nothing on that screen is a buy button.
- Following up — sending a reminder, ticking bills, marking a party as chased —
  is a separate permission from reading the report. A person can be allowed to
  read the list and still not be allowed to send anything from it.
- Nothing on these screens changes a bill. You cannot edit, settle or delete a
  bill here. Money is recorded through a receipt or a payment.

## Receivable and payable are two views of the same idea

"Bills Receivable" is money customers owe you. "Bills Payable" is money you owe
suppliers. They are the same screen with the sides swapped, so once you can read
one you can read the other. The card at the top shows "Total Receivable" or
"Total Payable" — the whole open amount, counted as on today.

Follow-up actions live on the receivable side. On the payable side you get the
same reading, filtering and export, without the reminder actions, because the
app does not chase your own suppliers on your behalf.

## Read the list

1. Open the Reports tab and choose the bills list you want.
2. The list opens grouped. Use "By group" to keep Tally's groups, or "By party"
   for one flat row per party.
3. Each row shows the party's open amount split across age buckets, so you can
   see at a glance whether the money is fresh or old.
4. Tap a party to open its own page and see the individual bills behind that
   total.
5. On the party page, "Open bills" lists each unpaid bill with its own age.

### Due and overdue are not the same thing

A bill is **due** from the day it is raised. It becomes **overdue** only after
its credit period has passed. The party rows show both: an overdue amount and,
beside it, the part that is not due yet. A large total with nothing overdue is a
healthy customer inside their credit terms. A small total that is entirely
overdue is the one to call.

## Change the ageing periods

The age buckets are yours to set.

1. Open a bills list and tap the ageing periods control.
2. In "Ageing periods", add or remove dividers — each divider is a number of
   days.
3. Save. The columns, the sort and any export you take will all use the new
   buckets.

These periods are stored on the device you set them on. If you also use Takkada
on a phone and a laptop, set them in both places if you want the same grid.

## Sort and search

- Sorting offers largest outstanding first, smallest first, and
  "Overdue (oldest first)" when you want the most-delayed parties at the top.
- Search filters the list by party name. If nothing matches you get a clear
  empty state, not a blank screen.
- When there is genuinely nothing open, the screen says so rather than showing
  an empty table.

## Take the list away with you

1. Open the export control on the bills list.
2. Choose "Export to Excel" for a grid you can sort and filter yourself, or
   "Export to PDF" for a print-ready sheet.
3. The file carries the same view, sort and ageing periods that are on your
   screen, so the paper matches what you were looking at.

## Where reading ends and collecting begins

On the receivable side, opening a party gives you the follow-up actions. Which
ones you see depends on your permission and on what the party record holds.

1. Open the party from the receivable list.
2. Tick the bills you want to talk about, or leave them all.
3. Use "Share PDF" to send a statement yourself through any app, or
   "Send on WhatsApp" to send it through Takkada.
4. Use "Mark followed up" to record that you have chased this party, so it drops
   down your list for a few days.

Sending on WhatsApp uses your business's message credits and is covered in the
WhatsApp reminders guide. Marking a party as followed up is only a note to
yourself — it does not tell the customer anything.

## When it does not look right

**The Reports tab says reports are turned off for you.** You do not have the
reports permission on this business. Only an admin can change that.

**A party shows a big total but no bills you recognise.** Open the party page
and look for "Brought forward from earlier years". Older-year balances arrive as
one carried-forward figure rather than as individual bills, so the total can be
larger than the bills listed under it.

**The reminder buttons are missing or greyed out.** Three ordinary reasons: you
do not have the reminder permission, no bills are ticked, or the party has no
usable mobile number saved. The screen names the reason beside the button —
read it before assuming the app is broken.

**A bill you just settled is still showing.** The lists read your Tally
company. A receipt or payment has to reach Tally and come back before the bill
closes here. Check the sync screen if it has been a while.

**The totals do not match Tally.** Compare the as-on date first: this list is
always counted as on today, so it will not match a Tally report you ran for an
earlier date. If the dates agree and the numbers still differ, check that the business
has finished syncing.
