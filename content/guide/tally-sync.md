---
slug: tally-sync
title: How to check and fix Tally sync
meta_title: "Check Tally sync in Takkada: what failed, what is waiting"
meta_description: Read the Tally Sync screen properly. What each section means, why an entry failed, what to do about it, and what "your PC has not connected" really tells you.
featureKey: tally_sync_dashboard
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Tally Sync"
  - "Last pulled from Tally"
  - "Tally has not connected yet"
  - "Set up"
  - "Needs attention"
  - "Nothing needs your attention."
  - "Waiting"
  - "Sent to Tally"
  - "No action needed"
  - "Nothing sent to Tally yet"
  - "Couldn't check the Tally sync"
  - "Try again"
  - "Show all"
  - "Technical details"
  - "Hide details"
  - "Queued — these will go across to Tally shortly."
  - "Your Tally PC hasn't connected yet. Turn it on and leave the takkada connector running, and these will go through."
  - "Waiting to go to Tally"
  - "Stuck — this has not reached Tally"
  - "Open Tally on your computer and leave the takkada connector running. If it is already on, contact takkada support."
  - "is not in Tally"
  - "so it matches Tally exactly"
  - "This entry was removed before it reached Tally"
  - "Tally would not accept this entry"
  - "Tally already had this record"
  - "Couldn't send this to Tally"
  - "Contact takkada support with this entry."
  - "Sync status unknown"
  - "Deleted here only — Tally was left untouched"
  - "Replaced by a corrected entry"
  - "Paused by takkada support"
quoteSources:
  "Tally Sync": [lib/screens/tally_sync_screen.dart]
  "Last pulled from Tally": [lib/screens/tally_sync_screen.dart]
  "Tally has not connected yet": [lib/screens/tally_sync_screen.dart]
  "Set up": [lib/screens/tally_sync_screen.dart]
  "Needs attention": [lib/screens/tally_sync_screen.dart]
  "Nothing needs your attention.": [lib/screens/tally_sync_screen.dart]
  "Waiting": [lib/screens/tally_sync_screen.dart]
  "Sent to Tally": [lib/screens/tally_sync_screen.dart]
  "No action needed": [lib/screens/tally_sync_screen.dart]
  "Nothing sent to Tally yet": [lib/screens/tally_sync_screen.dart]
  "Couldn't check the Tally sync": [lib/screens/tally_sync_screen.dart]
  "Try again": [lib/screens/tally_sync_screen.dart]
  "Show all": [lib/screens/tally_sync_screen.dart]
  "Technical details": [lib/widgets/tally_sync/tally_sync_row.dart]
  "Hide details": [lib/widgets/tally_sync/tally_sync_row.dart]
  "Queued — these will go across to Tally shortly.": [lib/models/tally_sync_activity.dart]
  "Your Tally PC hasn't connected yet. Turn it on and leave the takkada connector running, and these will go through.": [lib/models/tally_sync_activity.dart]
  "Waiting to go to Tally": [lib/utils/tally_sync_explanations.dart]
  "Stuck — this has not reached Tally": [lib/utils/tally_sync_explanations.dart]
  "Open Tally on your computer and leave the takkada connector running. If it is already on, contact takkada support.": [lib/utils/tally_sync_explanations.dart]
  "is not in Tally": [lib/utils/tally_sync_explanations.dart]
  "so it matches Tally exactly": [lib/utils/tally_sync_explanations.dart]
  "This entry was removed before it reached Tally": [lib/utils/tally_sync_explanations.dart]
  "Tally would not accept this entry": [lib/utils/tally_sync_explanations.dart]
  "Tally already had this record": [lib/utils/tally_sync_explanations.dart]
  "Couldn't send this to Tally": [lib/utils/tally_sync_explanations.dart]
  "Contact takkada support with this entry.": [lib/utils/tally_sync_explanations.dart]
  "Sync status unknown": [lib/utils/tally_sync_explanations.dart]
  "Deleted here only — Tally was left untouched": [lib/utils/tally_sync_explanations.dart]
  "Replaced by a corrected entry": [lib/utils/tally_sync_explanations.dart]
  "Paused by takkada support": [lib/utils/tally_sync_explanations.dart]
relatedGuides:
  - connect-tally
  - ledger-mapping
  - sales-invoice
  - record-receipt
  - purchase-invoice
sections:
  - id: before-you-start
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
  - id: check-your-sync
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
  - id: what-each-section-means
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
  - id: the-pull-clock
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
  - id: common-reasons-an-entry-failed
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
  - id: when-something-goes-wrong
    featureKeys: [tally_sync_dashboard]
    settings: {}
    permission: owner-or-full-access-member
images: []
---

Sync runs in two directions. Tally sends your books up to the app, and everything you create in the app — bills, receipts, payments, orders — is queued and sent down to Tally. The **"Tally Sync"** screen shows you both, on one page, in plain language.

This is the screen to open when someone says "I made the invoice but it is not in Tally". It will usually tell you exactly why.

## Before you start

- Your business needs the Tally sync screen switched on. If it is not, you will not see the tile.
- **The tile is for owners and full-access members.** A restricted staff member does not see it, because the queue shows every bill amount in the business.
- **A demo business has no tile.** There is no PC behind a demo, so there is nothing to queue.
- **The screen is read-only.** There is no retry button, and that is deliberate — sending a bill again that may have half-landed would put a second copy of the same voucher number into your Tally. Where a retry is genuinely safe, the entry retries itself. Where it is not, the screen tells you what to fix instead.

## Check your sync

1. Open the home screen.
2. Look at the **"Tally Sync"** tile. A red number on it is the count of entries that need you.
3. Tap it.
4. Read the small line at the very top. It is the clock for the other direction — see below.
5. Work down the sections. Anything under **"Needs attention"** comes first and is open by default.
6. Tap a row to expand it. You get a plain-language headline, and where there is genuinely something to do, one line telling you what.
7. If you are on the phone to support, tap **"Technical details"** on the row to reveal the original message, and **"Hide details"** to close it again.
8. Pull down on the list to refresh it.

If your business pushes several kinds of document, a row of chips appears above the sections. Tap a chip to see only that type, and **All** to go back to everything.

## What each section means

- **"Needs attention"** — these have failed, or have been sitting in the queue too long to be called normal. They are **not** in Tally. This is the only section that counts toward the red badge.
- **"Waiting"** — queued and travelling normally. Nothing is wrong. The subtitle tells you which: **"Queued — these will go across to Tally shortly."** when your PC is in touch, or a line naming your PC when it is not.
- **"Sent to Tally"** — the connector on your PC reported that it went across. Note the wording. It is "Sent", not "confirmed in your books" — for a small number of setups the app cannot prove the voucher is sitting in Tally, only that the send succeeded.
- **"No action needed"** — real events that are not failures, and are deliberately kept out of the red count. See the last part of the failure list below.

When there is nothing wrong at all, the red section is replaced with the single line **"Nothing needs your attention."**

If you have never created anything in the app, the whole screen reads **"Nothing sent to Tally yet"** and explains that anything you create will show up there on its way to Tally. That is a healthy new account, not a fault.

## The line at the top: what "offline" means here

The small line above the sections is the **pull** clock — when Tally last spoke to the app. It reads **"Last pulled from Tally"** followed by a date and time, or **"Tally has not connected yet"** if it never has.

If that clock is more than a day old, the line turns to a warning colour and a **"Set up"** link appears beside it, which takes you to the setup instructions for your PC.

"Offline" on this screen does not mean your phone has no internet. It means the computer running Tally is not in touch — switched off, Tally closed, the connector not running, or the machine off the network. Everything you do in the app still works and still queues. It simply cannot land in Tally until that PC comes back.

That is why a waiting entry sometimes carries this line instead of the ordinary one: **"Your Tally PC hasn't connected yet. Turn it on and leave the takkada connector running, and these will go through."** Nothing is broken. Turn the PC on.

## Common reasons an entry failed, and what to do

Tap the row to see which of these you have.

**A name is not in Tally.** The headline names the record and says it **"is not in Tally"** — a party, an item, a godown, a voucher type or a group. This is by far the commonest failure. Either create that exact name in Tally, or correct the name in the app **"so it matches Tally exactly"**. Spelling and spacing both count.

**"Stuck — this has not reached Tally"** (sometimes with how long it has been waiting). The entry has been queued far longer than a healthy connection takes. The advice on the row is the right one: **"Open Tally on your computer and leave the takkada connector running. If it is already on, contact takkada support."**

**"Waiting to go to Tally"** on a row in the Waiting section. Nothing to do. It is in the queue and moving.

**"This entry was removed before it reached Tally."** Somebody deleted it in the app while it was still queued. If you still need it in Tally, create it again from the app.

**"Tally would not accept this entry."** Something on the entry is not valid — most often the date or a missing detail. Open the entry, fix it, and save it again.

**"Tally already had this record."** Usually harmless. Check it in Tally and call support if it looks wrong.

**"Couldn't send this to Tally"** with **"Contact takkada support with this entry."** The app could not get a clear answer from Tally. Note the party and the number on the row before you call.

**"Sync status unknown."** The app got a state back it does not recognise. It is deliberately **not** treated as success — do not assume the entry is in your books.

**A message about a missing ledger for a tax.** That is your ledger mapping, not your connection. See [How to map your Tally ledgers](/guide/ledger-mapping).

### The three that look alarming but are fine

These live under "No action needed" and never count as failures.

- **"Deleted here only — Tally was left untouched"** — you deleted something in the app, and the app left your Tally alone on purpose. If you also want it gone from Tally, delete it there yourself.
- **"Replaced by a corrected entry"** — you edited the entry, and the corrected version was sent instead. The old attempt is kept only as a record.
- **"Paused by takkada support"** — support has held this one deliberately, usually while sorting something else out.

## What changes for different people and settings

- **Restricted members do not see this screen at all**, and there is no way to ask for it from a bill. If a staff member says an invoice is not in Tally, an owner or a full-access member has to look.
- **The tile's red badge counts only "Needs attention".** Waiting entries never make it red, however many there are.
- **The screen has no controls that change anything.** You cannot resend, cancel or delete from here. Everything you fix, you fix in the entry itself, in Tally, or by getting the PC back online.
- **Switching business re-reads everything.** The screen always uses the business currently selected in the app, so check the name at the top of home before you draw a conclusion.

## When something goes wrong

**"Couldn't check the Tally sync".** The app could not read the queue at all. This is different from an empty queue — it means the look failed, not that everything is fine. Tap **"Try again"**. If it keeps happening, check your phone's internet.

**A filter chip is on and the list looks empty.** The screen says so, and offers **"Show all"**. Tap it. An empty filter and a clean queue look the same otherwise.

**The badge says 3 but you see nothing red.** Pull down to refresh. The badge is read when the home screen loads.

**Everything says Waiting and nothing moves for days.** Look at the top line. If it says the PC has not connected, that is your answer — go and switch it on and leave the connector running. If the clock is fresh and entries still are not moving, contact support with one of the entry numbers.

**A bill is missing from Tally but not on this screen at all.** The screen shows what the app tried to send. If a bill never appears here, it was never queued — check that it was actually saved in the app.

## Related guides

- [How to connect your Tally company](/guide/connect-tally)
- [How to map your Tally ledgers](/guide/ledger-mapping)
- [How to make a sales invoice](/guide/sales-invoice)
- [How to record a receipt](/guide/record-receipt)
- [How to record a purchase invoice](/guide/purchase-invoice)
