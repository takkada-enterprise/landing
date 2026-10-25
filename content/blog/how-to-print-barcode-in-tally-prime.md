---
title: "How to Create and Print Barcode in Tally Prime: Alias, Scanner and Sticker"
meta_title: "How to Create and Print Barcode in Tally Prime | Takkada"
slug: "how-to-print-barcode-in-tally-prime"
meta_description: "Create and print barcode in Tally Prime: save the code in the stock item alias, scan it into a voucher, and get the stickers printed outside Tally."
primary_keyword: "create and print barcode in Tally Prime"
date: "2026-10-25"
updated: "2026-10-25"
author: "harsh"
category: "How-To"
excerpt: "Tally Prime reads a barcode from the stock item alias, and its own help says it does not print labels. Here is the full route, from the code to the sticker on the box."
---

To create and print barcode in Tally Prime, save the barcode number in the stock item's alias, then scan it at Name of Item in a voucher with a USB scanner. Tally picks the item whose alias matches, and your staff type the quantity as they do today. The printing half is where most people get stuck. Tally's own help says Tally Prime does not print barcode labels, so the stickers have to come from somewhere else. A product that already carries the maker's EAN needs no sticker at all: save that number as the alias and scan the pack. Loose stock, repacked cartons and items with no code need your own stickers, printed from a label tool, a TDL your Tally partner sets up, or an app that works next to Tally. The steps below cover the code, the alias, the scan and the sticker, and the mistakes that make a scan pick the wrong item.

## Step 1: Decide one code per item

Look at the pack first. Biscuits, soap, paint tins and most branded goods carry a 13-digit EAN from the maker, and that number is already unique. Use it.

For items with no code, such as a sack of loose washers or a carton you repack in the godown, make up your own. Keep it short, keep it to letters and digits, and never give two items the same code. A scan that matches two items cannot guess which one you meant.

## Step 2: Save the code in the stock item alias

Open the stock item in alter mode and put the code in the alias field. You can scan it straight in with the gun or type it. Save with Ctrl+A. Do this once per item, and do it for the fast movers first, because those are the lines your staff type most.

## Step 3: Scan into the voucher

Open a sales voucher, put the cursor on Name of Item and scan. The scanner types the code like a keyboard and presses Enter, and Tally selects the matching item. Then type the quantity and rate as usual.

If you want the code to show on the printed invoice, enable Name (Alias) under the display name setting for stock items in the invoice print configuration. Our post on [using a barcode scanner in Tally Prime](/blog/barcode-scanner-in-tally-prime) covers the gun itself.

## Step 4: Get the stickers printed

Since Tally does not print the labels, pick one of these routes.

| Route | Where the code comes from | Watch out for |
|---|---|---|
| Maker's EAN already on the pack | The brand owner | Loose and repacked stock has no code |
| Label software on the PC | You type or import codes | Codes and items kept in two places |
| TDL from your Tally partner | Your Tally item list | Check it on your Tally release first |
| An app next to Tally | Your Tally item list | It must write bills back as normal vouchers |

Sticker size matters more than people expect. A label that is too small prints bars a cheap gun cannot read. The [barcode sticker size list in mm](/blog/barcode-sticker-size-list-in-mm) has the common sheet and roll sizes.

## Mistakes that make a scan go wrong

- **Cursor in the wrong field.** A scan into the quantity or rate box types a long number there.
- **One code on two items.** Fix the alias on one of them before anyone bills.
- **Expecting the scan to carry the quantity.** One scan finds one item. For a carton of 24, someone still types 24.

That last one is why many distributors move the quantity into the sticker itself. With [barcode labels on top of Tally Prime](/barcode-in-tally-prime), Takkada prints stickers from a purchase bill or an item with the box quantity inside the code, so one scan on the phone or a USB gun puts the whole box on the bill. Nothing is installed inside Tally, and the bill reaches Tally as a normal voucher.

## Frequently Asked Questions

**Q: Can Tally Prime print barcode labels on its own?**

A: No. Tally's help says Tally Prime does not print barcode labels. It can print the alias number on an invoice, and the stickers come from a separate tool, a TDL or an app.

**Q: Where do I enter the barcode in Tally Prime?**

A: In the alias field of the stock item. Alter the item, scan or type the code into the alias, and save with Ctrl+A.

**Q: Does the scan fill the quantity in Tally?**

A: No. A scan selects the item, and the quantity is typed. To bill a whole box in one scan, the quantity has to be printed into the sticker's code.

**Q: Do I need new codes for branded products?**

A: Usually not. Use the maker's EAN already on the pack as the alias, and print your own stickers only for items without one.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will print a test sheet of stickers from one of your purchase bills with you.
