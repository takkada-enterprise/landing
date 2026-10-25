---
title: "Carton Barcode: One Scan for the Whole Box, With the Quantity Inside the Code"
meta_title: "Carton Barcode: One Scan for the Whole Box | Takkada"
slug: "carton-barcode"
meta_description: "A carton barcode that carries the box quantity lets one scan bill a whole box. How it works for a distributor, the part-box sticker, and GRN by scanning."
primary_keyword: "carton barcode"
date: "2026-10-25"
updated: "2026-10-25"
author: "founder"
category: "How-To"
excerpt: "A piece barcode makes your staff scan 24 times or type 24. A carton barcode with the box quantity inside the code bills the whole box in one scan. Here is how distributors set it up."
---

A carton barcode is a sticker on the outer box whose code carries both the item and the quantity inside that box, so one scan bills the whole box. That is the barcode a distributor actually needs, because you sell by the carton, bag and case while most product barcodes identify a single piece. With a piece barcode, a clerk billing 6 cartons of 24 scans once and types 144, or scans 144 times. With a carton barcode that says "this item, 6 cartons", one scan puts 6 cartons on the bill. Take an example: a Guwahati FMCG distributor billing 400 cartons a day moves most of that typing off the billing desk. The same sticker works at the other end, when goods arrive and the godown scans boxes off the truck against the purchase order. Below is how the quantity gets into the code, what happens with a part box, and how receiving by scanning catches short supply at the gate.

## Piece barcode against carton barcode

| | Piece barcode (maker's EAN) | Carton barcode with quantity |
|---|---|---|
| What one scan means | One piece of this item | This item, this many in the box |
| Billing 6 cartons of 24 | Scan, then type 144 | One scan per box sticker |
| Who prints it | The brand owner | You, from your purchase bill |
| Part box of 15 | Type 15 | Its own sticker that says 15 |
| Works in Tally on its own | Yes, through the stock item alias | Needs a tool that reads the quantity |

Some makers print a different code on the outer carton than on the piece. That code still names one carton of a fixed size, so it only helps if your tool knows how many pieces that carton holds.

## How the quantity gets into the code

The sticker is printed when the stock arrives. You open the purchase bill, say how many units go on one sticker, and the tool works out how many stickers to print. For example, 33 cartons at 6 a sticker comes to 6 stickers: five that say 6 and one that says 3. Each code carries the item and its own count, and the count is also printed on the sticker in plain text, so the godown can read it without a scanner.

## The part-box sticker

Boxes get opened. When a retailer takes 15 pieces from a box of 24, the 9 left behind need a sticker that says 9. Print one for the loose quantity and stick it over the old one. If the old sticker stays, the next scan bills 24 pieces that are no longer there.

## Receiving by scanning

At the gate, the godown opens the GRN against the purchase order and scans each box as it comes off the truck. Each scan adds that box's quantity to the received line. When the scanning stops, any ordered line nobody scanned stands out, so the short supply is caught before the supplier's bill is booked at full quantity.

## Where Takkada fits

With [barcode labels for Tally Prime](/barcode-in-tally-prime), Takkada prints carton stickers from a purchase bill, an item or a picked list, with the box quantity inside each code and the last sticker carrying the remainder. Scanning works on sales invoices, purchases, delivery challans, GRNs and stock journals, by phone camera, Bluetooth gun or USB gun. A maker's carton code can be linked to an item with its pack quantity, by the business admin only. For batch-wise stock, see [batch-wise billing for Tally](/blog/batch-wise-billing-for-tally).

## Frequently Asked Questions

**Q: What is a carton barcode?**

A: A barcode on the outer box that identifies the carton, and in a distributor's own sticker, the quantity inside. One scan then books the whole box.

**Q: Can Tally read the quantity from a carton barcode?**

A: No, Tally on its own reads only the item. Tally matches a scanned code to a stock item through its alias, and the quantity is typed. A tool that prints and reads the quantity in the code does the rest.

**Q: What happens when a carton is opened and part-sold?**

A: Print a new sticker for the pieces left and put it over the old one, so the next scan bills what is actually in the box.

**Q: Can I use the carton code the maker already printed?**

A: Yes, if your billing tool lets you link that code to the item and the number of pieces the carton holds. After that, a scan adds the full carton.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will print carton stickers from one of your purchase bills with you.
