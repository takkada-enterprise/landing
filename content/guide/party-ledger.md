---
slug: party-ledger
title: How to open a party ledger and share a statement
meta_title: How to open a party ledger and share a statement in Takkada
meta_description: Find a customer or supplier, read the opening and closing balance for a period, set the statement period and share the statement, and understand why you may only see some parties.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Parties
  - Customers
  - Suppliers
  - To collect
  - To pay
  - Statement period
  - Choose the ledger range to view and share.
  - Opening balance
  - Share Statement
  - All transactions
  - Load older transactions
  - Show Cancelled
  - Statements
  - Ledger Account
  - Pending Bills
  - Include details
  - Only the business owner can change this setting.
  - All parties
  - Only some
  - No transactions found
quoteSources:
  Parties:
    - lib/screens/parties_screen.dart
  Customers:
    - lib/widgets/parties/parties_list_header.dart
  Suppliers:
    - lib/widgets/parties/parties_list_header.dart
  To collect:
    - lib/screens/parties_screen.dart
  To pay:
    - lib/screens/parties_screen.dart
  Statement period:
    - lib/screens/party_details_screen.dart
  Choose the ledger range to view and share.:
    - lib/screens/party_details_screen.dart
  Opening balance:
    - lib/screens/party_details_screen.dart
  Share Statement:
    - lib/screens/party_details_screen.dart
  All transactions:
    - lib/screens/party_details_screen.dart
  Load older transactions:
    - lib/screens/party_details_screen.dart
  Show Cancelled:
    - lib/screens/party_details_screen.dart
  Statements:
    - lib/screens/settings/statements_settings_screen.dart
  Ledger Account:
    - lib/screens/settings/statements_settings_screen.dart
  Pending Bills:
    - lib/screens/settings/statements_settings_screen.dart
  Include details:
    - lib/screens/settings/statements_settings_screen.dart
  Only the business owner can change this setting.:
    - lib/screens/settings/statements_settings_screen.dart
  All parties:
    - lib/widgets/member_permissions/ledger_scope_section.dart
  Only some:
    - lib/widgets/member_permissions/ledger_scope_section.dart
  No transactions found:
    - lib/screens/party_details_screen.dart
relatedGuides:
  - bills-and-outstanding
  - record-receipt
  - team-access
  - whatsapp-reminders
sections:
  - id: find-a-party
    featureKeys: []
    settings: {}
    permission: party-view
  - id: statement-period
    featureKeys: []
    settings: {}
    permission: party-view
  - id: share-a-statement
    featureKeys: []
    settings: {statementDocument: ledger_or_pending_bills, includeDetails: bool}
    permission: party-view
  - id: party-scope
    featureKeys: []
    settings: {}
    permission: party-view
images: []
---

A party ledger is the full history of one customer or one supplier: every bill,
every receipt or payment, and the balance those add up to. In Takkada you open
it from the "Parties" list, choose the period you want, and share the same view
as a statement. This guide covers finding the party, reading the balances,
setting the period and sending it out.

## Before you start

- The business must be connected and synced. The ledger is your Tally history,
  not a second set of books kept in the app.
- You need permission to see parties on this business. Your admin may have
  limited you to some parties only — see the last section.
- Sharing a statement uses the document your business has chosen in settings.
  Only the business owner can change that choice.
- Opening a ledger changes nothing. Reading, filtering and sharing are all
  safe.

## Find the party

1. Open "Parties" from the main navigation.
2. Pick the tab you need. "Customers" shows the people who buy from you,
   "Suppliers" the people you buy from, and a third tab holds everyone else.
3. The header shows the running total for that tab — "To collect" on the
   customers side and "To pay" on the suppliers side.
4. Search by name, or sort by amount or by most recently updated.
5. Tap the party to open its page.

## Read the ledger

The party page opens on the party's full history.

- The transactions list shows sales, purchases, receipts, payments and
  adjustments in date order, newest first.
- "Load older transactions" pulls in earlier entries as you scroll back.
- The tabs above the list let you narrow to "All transactions" or to invoices
  only.
- "Show Cancelled" brings cancelled entries into view; leave it off and they
  stay hidden.

### Opening and closing balance

Set a period and the page shows an "Opening balance" — what the party owed, or
was owed, on the first day of that period. Every entry inside the period then
moves the balance up or down, and the figure you end on is the closing balance
for that period. The two together are what makes a statement readable: your
customer can see where the account started, what happened, and where it ended.

With no period set, you are looking at the whole history, so the closing figure
is the party's balance today.

## Set the statement period

1. On the party page, open the date filter.
2. "Statement period" opens the range picker with the line
   "Choose the ledger range to view and share."
3. Pick the from and to dates and apply.
4. The transactions list, the opening balance and any statement you share now
   all follow that range.
5. Clear the filter to go back to the full history.

Set the period *before* you share. The statement is built from what is on your
screen, so a wrong range produces a wrong statement rather than an error.

## Share a statement

1. Set the period you want.
2. Tap "Share Statement".
3. Wait for the document to be prepared, then choose how to send it — WhatsApp,
   email or anything else on your device.

Which document you get is a business-wide setting, not a per-send choice. Under
Settings, "Statements" offers "Ledger Account" — the full account with all
transactions — or "Pending Bills", which is only the bills awaiting payment.
"Include details" adds item lines and narration under each entry. If you cannot
change these, you will see "Only the business owner can change this setting."
That is by design, so every statement your business sends looks the same.

## Some people can only see some parties

Being able to open Parties is not the same as being able to open every party.
When your admin sets up your access, the party scope is either "All parties" or
"Only some". On "Only some", the admin ticks which parties or ledger groups you
may see, and everything else is simply not in your list.

Two things follow from this that surprise people:

- A party your colleague can see may not appear in your search at all. It is not
  missing; it is not yours to see.
- Parties created later are not added to your list automatically. Someone with
  a restricted scope has to be given the new party by an admin.

If you need a party you cannot see, ask an admin to widen your scope. There is
no way to unlock it from your own side.

## When it does not look right

**The party page says "No transactions found".** Either the party genuinely has
no entries, or your period excludes them all. Clear the date filter first and
look again.

**The balance does not match Tally.** Check the period on both sides. A Takkada
statement for one range will not match a Tally report for another. If the
ranges agree, check that the business has finished syncing — a ledger is only as
current as the last sync.

**A recent bill is missing.** It has not reached the app yet. Bills flow in from
Tally, and app-made bills flow out to Tally; either direction takes a sync.

**"Share Statement" fails or hangs.** The statement is prepared for you and then
handed to your device to send. Try a narrower period, and check you are online.

**You want the statement to look different.** Item lines, narration and the
choice between the full ledger and pending bills are all in the business's
statement settings, and only the owner can change them.
