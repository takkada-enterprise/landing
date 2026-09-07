---
slug: whatsapp-reminders
title: How to send payment reminders on WhatsApp
meta_title: How to send payment reminders on WhatsApp in Takkada
meta_description: Set a reminder schedule, choose which customers get chased, send a reminder straight away, and read what the history actually tells you about delivery.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Smart Reminders
  - Automatically send payment follow-ups for this business
  - Automatic payment follow-ups are off
  - Your reminder schedule
  - Bills fall due after
  - Remind every
  - Save Settings
  - Who gets reminders
  - Enable All
  - Disable All
  - Reset All to Company Defaults
  - Save All
  - Discard
  - Party reminders saved
  - Manage reminders by group
  - No mobile number
  - Attach ledger statement
  - Only remind on or after the due date
  - Send reminders now
  - Chase selected customers straight away
  - No overdue parties
  - Reminders off
  - Reminded today
  - No mobile number saved
  - Send now
  - Smart Reminders paused
  - Smart Reminders are disabled until credits are added.
  - Reminders cannot be sent until credits are added.
  - Reminder History
  - Total Sent
  - Success Rate
  - Sent
  - Failed
  - Pending
  - Not tracked
  - Turn on Smart Reminders to choose which parties get reminded.
quoteSources:
  Smart Reminders:
    - lib/screens/payment_reminders_settings_screen.dart
  Automatically send payment follow-ups for this business:
    - lib/screens/payment_reminders_settings_screen.dart
  Automatic payment follow-ups are off:
    - lib/screens/payment_reminders_settings_screen.dart
  Your reminder schedule:
    - lib/screens/payment_reminders_settings_screen.dart
  Bills fall due after:
    - lib/screens/payment_reminders_settings_screen.dart
  Remind every:
    - lib/screens/payment_reminders_settings_screen.dart
  Save Settings:
    - lib/screens/payment_reminders_settings_screen.dart
  Who gets reminders:
    - lib/screens/reminder_parties_screen.dart
  Enable All:
    - lib/screens/reminder_parties_screen.dart
  Disable All:
    - lib/screens/reminder_parties_screen.dart
  Reset All to Company Defaults:
    - lib/screens/reminder_parties_screen.dart
  Save All:
    - lib/screens/reminder_parties_screen.dart
  Discard:
    - lib/screens/reminder_parties_screen.dart
  Party reminders saved:
    - lib/screens/reminder_parties_screen.dart
  Manage reminders by group:
    - lib/screens/reminder_parties_screen.dart
  No mobile number:
    - lib/screens/reminder_parties_screen.dart
  Attach ledger statement:
    - lib/screens/payment_reminders_settings_screen.dart
  Only remind on or after the due date:
    - lib/screens/payment_reminders_settings_screen.dart
  Send reminders now:
    - lib/screens/send_reminders_now_screen.dart
  Chase selected customers straight away:
    - lib/screens/payment_reminders_settings_screen.dart
  No overdue parties:
    - lib/screens/send_reminders_now_screen.dart
  Reminders off:
    - lib/screens/send_reminders_now_screen.dart
  Reminded today:
    - lib/screens/send_reminders_now_screen.dart
  No mobile number saved:
    - lib/screens/send_reminders_now_screen.dart
  Send now:
    - lib/screens/send_reminders_now_screen.dart
  Smart Reminders paused:
    - lib/screens/payment_reminders_settings_screen.dart
  Smart Reminders are disabled until credits are added.:
    - lib/screens/payment_reminders_settings_screen.dart
  Reminders cannot be sent until credits are added.:
    - lib/screens/send_reminders_now_screen.dart
  Reminder History:
    - lib/screens/reminder_history_screen.dart
  Total Sent:
    - lib/screens/reminder_history_screen.dart
  Success Rate:
    - lib/screens/reminder_history_screen.dart
  Sent:
    - lib/models/party_reminder_rollup.dart
  Failed:
    - lib/models/party_reminder_rollup.dart
  Pending:
    - lib/models/reminder_history.dart
  Not tracked:
    - lib/models/party_reminder_rollup.dart
  Turn on Smart Reminders to choose which parties get reminded.:
    - lib/screens/reminder_parties_screen.dart
relatedGuides:
  - bills-and-outstanding
  - party-ledger
  - whatsapp-invoice-delivery
  - record-receipt
sections:
  - id: set-the-schedule
    featureKeys: []
    settings: {smartReminders: bool, defaultInvoiceDueDays: int, frequency: preset_or_custom}
    permission: company-admin
  - id: choose-who
    featureKeys: []
    settings: {reminderDefault: on_or_off}
    permission: reminders-use
  - id: send-on-whatsapp
    featureKeys: [payment_reminders_whatsapp]
    settings: {}
    permission: reminders-use
  - id: read-the-history
    featureKeys: [payment_reminders_whatsapp]
    settings: {}
    permission: reminders-use
images: []
---

Takkada can chase your customers for you. You set how often a customer should be
reminded about an unpaid bill, choose who is in and who is out, and the
reminders go out on WhatsApp from your business's number. You can also send one
straight away without waiting for the schedule.

## Before you start

- You need permission to use reminders on this business. Without it the screens
  are not yours to open.
- Changing the schedule and the defaults is admin work; sending is not.
- Every WhatsApp message uses a message credit. When credits run out, sending
  stops.
- A customer with no mobile number saved cannot be reminded. Fix the number on
  the party first.
- **A send result is not a delivery receipt.** See the last section — this is
  the single most misread thing on these screens.

## Set the schedule

1. Open "Smart Reminders" from Settings.
2. Turn on the main switch —
   "Automatically send payment follow-ups for this business". While it is off,
   the screen says "Automatic payment follow-ups are off" and nothing goes out
   by itself.
3. Set "Bills fall due after" — the number of days you normally give a customer.
   This is used as the due date when an invoice does not carry one of its own,
   and it anchors everything else. It must be at least 1, and reminders cannot
   be turned on without it.
4. Under "Your reminder schedule", pick how often to chase. The presets run from
   a daily nudge to a light weekly touch. Choose Custom and set
   "Remind every" so many days — anything from 1 to 90 — if none of them fits.
5. Tap "Save Settings".

Two extras sit under the schedule:

- "Attach ledger statement" sends each party's statement with the automatic
  reminder, so they can see the bills you mean.
- "Only remind on or after the due date" holds the automatic reminders back
  until a bill is actually due. It changes automatic sending only; anything you
  send by hand is unaffected.

## Choose who gets reminded

1. Open "Who gets reminders".
2. The screen tells you what the default is for new parties — reminded, or not
   reminded — and you make exceptions to it.
3. Turn individual parties on or off, or use "Enable All" and "Disable All" for
   the whole list.
4. "Manage reminders by group" does the same for every party in a ledger group
   at once.
5. "Reset All to Company Defaults" clears your exceptions and puts everyone back
   on the business default.
6. Tap "Save All" in the bar that appears along the bottom counting your unsaved
   changes. "Discard" beside it throws them away instead. A saved change reads
   back as "Party reminders saved", and it applies to the business, not to you.

A party marked "No mobile number" cannot receive anything. Add the number on
that row, or from the party's own page, before expecting a reminder to go.

If reminders are switched off for the business, this screen says so and offers
to take you back:
"Turn on Smart Reminders to choose which parties get reminded."

## Send a reminder right now

1. Open "Send reminders now" — described on the settings screen as
   "Chase selected customers straight away".
2. The list shows customers who currently owe overdue money. Search if it is
   long.
3. Select the customers you want to chase. Rows that cannot be sent explain
   themselves: "No mobile number saved", "Reminders off" for a party you have
   excluded, and "Reminded today" for one already chased today.
4. Tap "Send now".
5. The messages are queued and go out from your business number shortly.

If nobody is overdue you get "No overdue parties" rather than an empty list.

## Credits

WhatsApp messages are paid for in credits. When they run out:

- The settings screen shows "Smart Reminders paused" and
  "Smart Reminders are disabled until credits are added."
- The send-now screen says
  "Reminders cannot be sent until credits are added."

Nothing is lost. Your schedule, your party choices and your history stay exactly
as they were, and sending resumes when credits are added. Reminders that were
already queued are not silently discarded.

## Read the history — and what it does not tell you

Open "Reminder History" to see what has gone out. It shows recent activity,
"Total Sent" and a "Success Rate", and you can filter by date and search by
party.

Each entry carries a state, and the difference between them matters:

- **"Sent"** — Takkada handed the message to WhatsApp and WhatsApp accepted it.
- **"Failed"** — WhatsApp refused it.
- **"Pending"** — it is on its way and has not been answered for yet.
- **"Not tracked"** — you shared this one yourself, from your own phone. Nothing
  ever comes back about it.

**"Sent" is not the same as delivered, and it is certainly not the same as
read.** It means the
message was accepted for sending. Whether the customer's phone received it, and
whether they looked at it, is not something Takkada is told. Treat the history
as a record of what you did, not as proof of what your customer saw. If a
payment matters, phone them.

## When it does not look right

**The main switch will not turn on.** Set "Bills fall due after" to at least 1
first. The screen refuses until that is done, because without it there is no due
date to schedule from.

**A customer is not being reminded.** Check three things, in order: are they
turned on under "Who gets reminders"; do they have a mobile number; and is
anything actually overdue for them.

**Nothing has gone out at all.** Check whether the business switch is on, and
whether credits have run out. Both stop everything, and both say so on the
screen.

**Reminders started going out later than expected.** "Only remind on or after
the due date" is on, so nothing goes before a bill is due.

**The history shows Sent but the customer says they got nothing.** Sent means
accepted for sending. Check the mobile number on the party record — a wrong but
valid number accepts perfectly well and reaches somebody else.

**An entry says Not tracked.** That message was shared from your own phone
rather than sent by Takkada, so there is no result to report.
