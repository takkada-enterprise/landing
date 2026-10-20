---
slug: batches
title: How to enter batches, expiry dates and MRP
meta_title: Enter batches, expiry dates and batch MRP in Takkada
meta_description: Pick a batch on a sale, add a new batch with its Mfg date, expiry and MRP on a purchase, and see which batches are expired or running out.
featureKey: null
checkedAgainstAppOn: 2026-10-20
appRevision: 7e30d58b58b1265fc080d68cf56186226f6a162c
quotes:
  - Batch numbers on invoices
  - Price by batch
  - Batch
  - B1 or B1:1, B2:1
  - B-104, or B-104:6, B-105:4
  - New batch
  - Mfg date
  - Expiry
  - MRP (₹)
  - A batch with a different MRP goes on its own line
  - Expired
  - None left
  - Primary Batch
  - Give each batch a quantity, like B1:4, B2:6
  - Pick a batch for
  - left in batch
  - Check batches
  - Save anyway
  - Continue anyway
  - sell anyway?
quoteSources:
  Batch numbers on invoices:
    - lib/screens/settings/invoices_settings_screen.dart
  Price by batch:
    - lib/screens/settings/invoices_settings_screen.dart
  Batch:
    - lib/utils/batch_pick.dart
  B1 or B1:1, B2:1:
    - lib/utils/batch_pick.dart
  B-104, or B-104:6, B-105:4:
    - lib/utils/batch_pick.dart
  New batch:
    - lib/utils/batch_pick.dart
  Mfg date:
    - lib/utils/batch_pick.dart
  Expiry:
    - lib/utils/batch_pick.dart
  MRP (₹):
    - lib/utils/batch_pick.dart
  A batch with a different MRP goes on its own line:
    - lib/utils/batch_pick.dart
  Expired:
    - lib/utils/batch_pick.dart
  None left:
    - lib/utils/batch_pick.dart
  Primary Batch:
    - lib/utils/batch_pick.dart
  Give each batch a quantity, like B1:4, B2:6:
    - lib/utils/batch_pick.dart
  Pick a batch for:
    - lib/utils/batch_pick.dart
  left in batch:
    - lib/utils/batch_pick.dart
  Check batches:
    - lib/utils/batch_pick.dart
  Save anyway:
    - lib/utils/batch_pick.dart
  Continue anyway:
    - lib/screens/add_invoice_items_screen.dart
  sell anyway?:
    - lib/utils/batch_pick.dart
relatedGuides:
  - barcode-labels
  - sales-invoice
  - purchase-invoice
  - credit-and-debit-notes
sections:
  - id: when-the-batch-box-shows
    featureKeys: []
    settings: {}
    permission: none
  - id: pick-a-batch
    featureKeys: []
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: new-batch
    featureKeys: []
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: save-checks
    featureKeys: []
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: price-by-batch
    featureKeys: []
    settings: {invoice_price_by_batch: on}
    permission: company-admin
  - id: troubleshooting
    featureKeys: []
    settings: {}
    permission: none
images: []
---

Medicines, paints, lubricants and food come in batches, and each batch can have
its own manufacturing date, expiry and MRP. When an item is batch-wise in your
Tally books, Takkada asks for the batch on every bill that moves its stock, and
the batch travels to Tally with the entry.

## Before you start

- An item is batch-wise when it is set up with batches in Tally. Takkada reads
  that setting, together with whether the item uses manufacturing dates and
  expiry dates, from your Tally books.
- A company admin can also switch on "Batch numbers on invoices" in the
  invoice settings. The batch box then shows for every item, which suits a
  business that writes batch numbers on items Tally does not track by batch.
  Such a line goes to Tally under "Primary Batch".
- The batch box appears on sales and purchase invoices, goods receipts,
  delivery challans, credit and debit notes, and stock journals. Sales orders
  and quotations accept a batch but do not insist on one. Purchase orders have
  no batch.
- Stock per batch counts your Takkada entries straight away, before they have
  reached Tally, so a batch you just bought in can be sold at once.

## When the batch box shows

On the phone the line has a "Batch" box. On the computer the item grid gets a
Batch column, which you reach with Tab like any other column and fill by
typing.

To split one line across batches, type each batch with its quantity. The
phone shows the pattern as "B1 or B1:1, B2:1", and the computer as
"B-104, or B-104:6, B-105:4". If you split a line, every batch needs a
quantity; otherwise you see
"Give each batch a quantity, like B1:4, B2:6".

## Pick a batch on a sale

1. Add the item to the bill as usual.
2. Open its batch box. The list shows the item's batches in the godown you are
   billing from.
3. Each row shows how much is left, the batch MRP, and its Mfg and expiry
   dates. A batch with nothing left reads "None left"; a batch past its expiry
   carries an "Expired" tag.
4. Pick the batch, or type its name.

The list puts the batch that expires first at the top, so the oldest stock goes
out first. Expired batches are moved to the end.

## Add a new batch on a purchase

On a purchase invoice, a goods receipt, a credit note or an inward stock
journal, you can type a batch name that is not in stock yet. The app marks it
"New batch" and asks for its details:

1. Type the batch name from the supplier's bill or the pack.
2. Fill "Mfg date" and "Expiry" if they are shown. They appear only for items
   that use those dates in Tally.
3. Fill "MRP (₹)" from the pack.
4. Save the bill.

Takkada keeps one MRP per line. If two batches of the same item carry different
MRPs, the app tells you that
"A batch with a different MRP goes on its own line" and splits them when you
save.

## What happens when you save

Takkada checks the batches before anything is saved:

- A batch-wise item with no batch is refused with "Pick a batch for" that item.
- Selling more than a batch holds follows your business's stock rule. Where
  the rule refuses short stock, the save stops and names how much is
  "left in batch". Otherwise the app asks under "Check batches", and you choose
  Back or "Save anyway" ("Continue anyway" on the phone).
- An expired batch on a sale is allowed, but the app first asks whether to
  "sell anyway?".

## Price by batch

A company admin can switch on "Price by batch" in the invoice settings. Each
line then carries one batch and takes that batch's rate: its MRP, or the rate it
last sold at, or the item rate. The batch's Mfg and expiry dates print on the
bill.

## When batches look wrong

**The batch box does not show for an item.** The item is not batch-wise in
Tally, and "Batch numbers on invoices" is off. Turn on batches for the item in
Tally and let it sync, or ask your company admin to switch the setting on.

**A batch is missing from the pick list.** The list shows the batches of the
godown on this bill. Check the godown first. A batch bought in Tally appears
once that entry has synced.

**Mfg date or Expiry boxes are missing.** The item does not use manufacturing or
expiry dates in Tally. Turn them on for the item in Tally if you track them.
