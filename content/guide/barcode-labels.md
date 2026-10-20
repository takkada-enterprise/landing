---
slug: barcode-labels
title: How to print and scan barcode labels
meta_title: Print and scan box-quantity barcode labels in Takkada
meta_description: Print stickers that carry an item and its box quantity, then scan a whole box into a bill with the phone camera, a Bluetooth gun or a gun on the computer.
featureKey: barcode_labels
checkedAgainstAppOn: 2026-10-20
appRevision: 7e30d58b58b1265fc080d68cf56186226f6a162c
quotes:
  - Print labels
  - Pcs per sticker
  - Stickers
  - Start at sticker
  - Custom size…
  - On a roll
  - A4 · 2 × 5 (10 per sheet)
  - A4 · 3 × 8 (24 per sheet)
  - Make this the company default
  - Show MRP
  - Show batch
  - Show dates
  - Mfg and expiry, month and year
  - Any batch
  - stickers at a time
  - No item lines to label
  - Printing isn't available in this browser — the sheet was downloaded
  - These labels are too small for a readable barcode — pick a bigger size
  - These labels don't fit on the page — check the size, margins and gaps
  - Couldn't get the batch codes — check the connection and print again
  - Scan labels
  - Type a code
  - Scan with a gun, or type a code
  - Link to an item
  - Camera is off — allow it in Settings
  - Open settings
  - The camera could not start — scan with a gun, or type a code
  - Label not found in this company — reprint it
  - Could not look up this label — check the connection and scan again
  - Not a Takkada label
  - Batch on this label isn't known — pick one
  - Which batch of
  - No batch for now
  - Barcodes
  - Add code
  - Pcs per scan
  - That is already a Takkada label
  - Only members who can edit items can link codes
quoteSources:
  Print labels:
    - lib/widgets/barcode_labels/print_labels_sheet.dart
  Pcs per sticker:
    - lib/widgets/barcode_labels/print_labels_sheet.dart
  Stickers:
    - lib/widgets/barcode_labels/print_labels_sheet.dart
  Start at sticker:
    - lib/widgets/barcode_labels/label_options_section.dart
  Custom size…:
    - lib/widgets/barcode_labels/label_options_section.dart
  On a roll:
    - lib/widgets/barcode_labels/label_options_section.dart
  A4 · 2 × 5 (10 per sheet):
    - lib/models/barcode_label_layout.dart
  A4 · 3 × 8 (24 per sheet):
    - lib/models/barcode_label_layout.dart
  Make this the company default:
    - lib/widgets/barcode_labels/label_options_section.dart
  Show MRP:
    - lib/widgets/barcode_labels/label_options_section.dart
  Show batch:
    - lib/widgets/barcode_labels/label_options_section.dart
  Show dates:
    - lib/widgets/barcode_labels/label_print_text.dart
  Mfg and expiry, month and year:
    - lib/widgets/barcode_labels/label_print_text.dart
  Any batch:
    - lib/widgets/barcode_labels/label_print_text.dart
  stickers at a time:
    - lib/widgets/barcode_labels/label_print_text.dart
  No item lines to label:
    - lib/widgets/barcode_labels/label_print_text.dart
  Printing isn't available in this browser — the sheet was downloaded:
    - lib/services/barcode_labels_service.dart
  These labels are too small for a readable barcode — pick a bigger size:
    - lib/models/barcode_label_layout.dart
  These labels don't fit on the page — check the size, margins and gaps:
    - lib/models/barcode_label_layout.dart
  Couldn't get the batch codes — check the connection and print again:
    - lib/services/barcode_labels_service.dart
  Scan labels:
    - lib/widgets/barcode_labels/scan_labels_sheet.dart
  Type a code:
    - lib/widgets/barcode_labels/scan_labels_sheet.dart
  Scan with a gun, or type a code:
    - lib/widgets/barcode_labels/scan_labels_sheet.dart
  Link to an item:
    - lib/widgets/barcode_labels/scan_labels_sheet.dart
  Camera is off — allow it in Settings:
    - lib/utils/camera_access.dart
  Open settings:
    - lib/widgets/barcode_labels/scan_camera_view.dart
  The camera could not start — scan with a gun, or type a code:
    - lib/widgets/barcode_labels/scan_camera_view.dart
  Label not found in this company — reprint it:
    - lib/models/barcode_label.dart
  Could not look up this label — check the connection and scan again:
    - lib/models/barcode_label.dart
  Not a Takkada label:
    - lib/models/scan_resolution.dart
  Batch on this label isn't known — pick one:
    - lib/models/scan_resolution.dart
  Which batch of:
    - lib/widgets/barcode_labels/scan_batch_picker.dart
  No batch for now:
    - lib/widgets/barcode_labels/scan_batch_picker.dart
  Barcodes:
    - lib/widgets/barcode_labels/linked_codes_section.dart
  Add code:
    - lib/widgets/barcode_labels/linked_codes_section.dart
  Pcs per scan:
    - lib/widgets/barcode_labels/linked_codes_section.dart
  That is already a Takkada label:
    - lib/widgets/barcode_labels/linked_codes_section.dart
  Only members who can edit items can link codes:
    - lib/widgets/barcode_labels/linked_codes_section.dart
relatedGuides:
  - batches
  - sales-invoice
  - purchase-invoice
sections:
  - id: what-a-label-holds
    featureKeys: [barcode_labels]
    settings: {}
    permission: none
  - id: print
    featureKeys: [barcode_labels]
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: sheet-or-roll
    featureKeys: [barcode_labels]
    settings: {}
    permission: business-admin-for-the-company-default
  - id: scan-on-the-computer
    featureKeys: [barcode_labels]
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: scan-on-the-phone
    featureKeys: [barcode_labels]
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: old-labels-and-maker-codes
    featureKeys: [barcode_labels]
    settings: {}
    permission: business-admin
  - id: batches
    featureKeys: [barcode_labels]
    settings: {}
    permission: same-as-the-document-you-are-on
  - id: troubleshooting
    featureKeys: [barcode_labels]
    settings: {}
    permission: none
images: []
---

A Takkada barcode label names one item and the quantity packed with it. Stick
one on each box when the goods come in. When the box goes out, one scan puts the
whole box on the bill: the item and its quantity, with nothing typed.

Labels are part of the barcode labels add-on. When it is switched on for your
business, "Print labels" appears on items and on bills, and a scan button
appears on the screens where you add items.

## Before you start

- The add-on has to be on for this business. Without it there is no
  "Print labels" anywhere and no scan button, and a label typed into a bill is
  only a search.
- Any member who can open an item or a bill can print labels for it. Changing
  the business's default sticker size, and linking old codes to items, is for a
  business admin.
- Scanning on the computer needs a barcode gun that types the code and then
  presses Enter. Most USB guns do this out of the box.
- Scanning on the phone uses the camera, or a Bluetooth gun paired with the
  phone. The camera asks for permission the first time.
- A label only scans in the business that printed it. Labels from another of
  your businesses are refused.

## What a label holds

Each sticker carries the item name, its part number, a line such as
"Qty: 10 PCS" and the barcode. The barcode holds the item and that quantity in
the item's main unit, nothing more. You can also print the MRP, and on
batch-wise items the batch and its dates, as text on the sticker. The MRP is
never inside the barcode, so a price change does not make old labels wrong.

## Print labels

You can print from an item, from a bill that has items on it, or from the item
list.

1. Open the item, or a purchase invoice, goods receipt, sales invoice or
   delivery challan.
2. Choose "Print labels". On the phone it is in the top bar of an item or a
   goods receipt, and in the menu of the other bills. On the computer it is in
   the record's actions.
3. Check each row. Type the "Pcs per sticker" (the box size), and Takkada works
   out how many "Stickers" that line needs. Or set the sticker count, and the
   box size follows.
4. Pick the sticker sheet or roll (next section).
5. Print. The button says how many stickers and pages will come out.

To label many items at once, open the item list on the phone, select the items,
and print them together. On the computer, the Items register has the same
action for the items the list shows. One print is limited to 1000
stickers; above that the button says how many "stickers at a time" are allowed.

Takkada remembers the box size you used for each item, so the next print of the
same item starts from it.

## Choose the sticker sheet or roll

The sheet options are collapsed to one line. Open them to change the layout:

- five A4 sheets, from "A4 · 2 × 5 (10 per sheet)" to 65 per sheet, including
  "A4 · 3 × 8 (24 per sheet)";
- four label-printer rolls, from 38 × 25 mm to 100 × 50 mm;
- "Custom size…", where you enter the label size, columns, rows, margins and
  gaps, and turn on "On a roll" for a label printer.

On a part-used A4 sheet, set "Start at sticker" to the first empty position.
The positions before it are left blank. Each new print starts at 1 again.

The layout you last printed with on this device opens first. A business admin
can choose "Make this the company default", so every device that has not
printed yet starts on your real stationery.

"Show MRP" prints the MRP on items that have one. "Show batch" and
"Show dates" appear when a row has a batch or batch dates
("Mfg and expiry, month and year"). Show MRP and Show dates are remembered on
the device; Show batch is chosen on each print.

## Scan on the computer

On the computer, scan straight into the bill you are typing.

1. Open a new sales invoice, purchase invoice or other entry with items.
2. Point the gun at a label and pull the trigger.
3. The item lands as a new line with the label's quantity, and the cursor waits
   in the blank item box for the next scan.

You do not have to click into the item box first. A gun scan is caught anywhere
on the entry form, even while the cursor is in a quantity or in the narration;
the box you were in keeps its text. Scanning the same label again grows that
line instead of adding a second one. Typing a part number by hand and pressing
Enter is still an ordinary search.

## Scan on the phone

1. Open the screen where you add items: a sales invoice, sales order, purchase
   invoice, credit or debit note, delivery challan, goods receipt or stock
   journal.
2. Tap the scan icon in the top bar ("Scan labels").
3. Hold labels in front of the camera, or fire a paired Bluetooth gun. Both work
   at the same time, and the on-screen keyboard stays out of the way.
4. Each scan adds its quantity and shows a running total. The camera counts a
   code once while it stays in view. For boxes that carry the same label, move
   the phone off the label between boxes for a couple of seconds, or use the
   gun, which counts every pull of the trigger.
5. Tap Done to put the scanned lines on the bill.

The phone also reads ordinary maker barcodes, and a code that matches one
item's part number exactly. If the camera cannot be used, "Type a code" lets you
key a code in. On a phone browser the camera works the same way over the web
app.

## Old labels and maker barcodes

Boxes that already carry a supplier's barcode, or your old labels, can be linked
once and then scanned like a Takkada label.

- On the phone, scanning an unknown code offers "Link to an item" to a business
  admin. Pick the item and how many pieces one scan means, and the scan is
  added.
- On the item page, the "Barcodes" card lists the codes linked to that item. A
  business admin uses "Add code", types or scans the code, and sets
  "Pcs per scan".

A code belongs to one item in a business. Linking a code that is already on
another item asks before moving it. A Takkada label cannot be linked; the app
says "That is already a Takkada label". Members who are not business admins see
the linked codes but cannot change them.

## Batches on labels

For a batch-wise item, labels printed from a bill come out one row per batch,
and each label carries its batch. From the item page you get one row per batch
in stock, earliest expiry first, and an "Any batch" row for labels with no
batch on them.

When a batch label is scanned into a sales bill, the line gets that batch with
its MRP and dates. Two batches of the same item stay on two lines.

If a label has no batch, or the batch is unknown in this business, the bill
still needs one:

- on the phone, the app asks "Which batch of" the item, or you can tap
  "No batch for now" and pick it before saving;
- on the computer, the line is added and the cursor moves to its batch box;
- on a goods receipt or other inward entry, the line is added and saving asks
  for the batch.

Entering batches, expiry dates and MRP by hand is covered in the batches guide.

## When a label will not print or scan

**"Label not found in this company — reprint it".** The label was printed in
another business, or its item is no longer active here. Print a fresh label in
this business.

**"Batch on this label isn't known — pick one".** The item was found but not the
batch. Pick the batch from the list.

**"Not a Takkada label".** The code is not one of ours and is not linked to an
item yet. A business admin can link it.

**"Could not look up this label — check the connection and scan again".** The
phone or computer is offline. Nothing was added; scan the box again once you are
back online.

**"Camera is off — allow it in Settings".** Camera permission was refused. Use
"Open settings" on the phone to allow it. A gun and typed codes keep working
meanwhile. If the message is
"The camera could not start — scan with a gun, or type a code", another app may
be holding the camera.

**"These labels are too small for a readable barcode — pick a bigger size".**
The chosen sticker is too small for one of the codes in this print. Choose a
bigger layout. If the message is
"These labels don't fit on the page — check the size, margins and gaps", the
custom layout runs off the A4 page.

**"Couldn't get the batch codes — check the connection and print again".**
Printing batch labels needs the connection for a moment first. Nothing was
printed; try again online.

**"Printing isn't available in this browser — the sheet was downloaded".** A
phone browser cannot send the sheet to a printer, so the PDF was saved instead.
Open it and print from there.

**Print labels is greyed out.** The reason reads "No item lines to label": the
bill has only ledger or service lines, so there is nothing to put on a sticker.
