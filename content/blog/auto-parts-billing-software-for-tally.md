---
title: "Auto Parts Billing Software for Tally: Selling Price from Last Purchase Cost + Markup"
meta_title: "Auto Parts Billing Software for Tally | Takkada"
slug: "auto-parts-billing-software-for-tally"
meta_description: "Auto parts billing software for Tally that prices each part from its last purchase cost plus your markup, set for the company, a stock group or one item."
primary_keyword: "auto parts billing software for Tally"
date: "2026-10-12"
author: "harsh"
category: "Schemes"
excerpt: "A parts business lives on cost plus a markup that differs by brand. Here is how Takkada reads the cost from your purchase bills, applies your markup and puts the price on the bill, worked on a ₹250.24 bearing."
---

Auto parts billing software for Tally should price a part from what you paid for it, and Takkada's AutoParts billing does exactly that: the selling price is the last purchase cost plus a markup you set for the whole company, for a stock group or for a single item. The cost is read from the latest purchase bill for that part in your books, per unit, after the trade discount on the line and before GST. A bearing that cost ₹250.24, with a 40% markup, sells at ₹350.34 before GST, and the bill adds GST on top. When the next consignment's purchase bill reaches the app at a new cost, the selling price of each part it prices moves with it, and the Purchase price changes screen lists which parts moved and by how much. An item's own markup wins over its group's, and the group's wins over the company default. Cost and markup stay hidden from staff who are not allowed to see purchase costs.

## Why parts prices drift

A parts distributor carries thousands of part numbers, and many costs change with each consignment. The owner's rule lives in his head: bearings at 40% over cost, oil seals at 55%, the rest at 30%. The counter works from a list typed weeks ago, so when the cost goes up and the list does not, the margin shrinks on the parts that sell most.

## Where the cost comes from

The cost is the money paid per unit on the part's most recent purchase bill: the line amount less the trade discount on that line, before GST, in the item's own unit, rounded to two decimals. If one bill lands the same part on two lines at different rates, the cost is the quantity-weighted average of those two lines.

A free line does not count, and neither does a purchase booked in a different unit from the item's own unit. If no purchase gives a usable cost, the item's card in Stock Summary says Never purchased or No usable cost, and the part bills at its normal price.

Many traders call this the landed cost. In the app it is the item line on the purchase bill, so freight or clearing booked as separate ledger lines on that bill is not spread into it. If those charges matter, cover them in your markup.

If you buy one part from two suppliers, set a preferred supplier for its group or the item. The cost then follows that supplier's latest purchase, falling back to anyone's latest when that supplier has none.

## Markup at three levels

Open Settings, Invoices, AutoParts billing. Set a Company default markup, a markup on any stock group, and an override on a single item. An item's own markup comes first, then its group's, then the company default, and each item row says where its figure came from, such as "40% · from group". An excluded item stays on its normal price. Only the business admin can change markups.

The figure is a markup on cost. At 40%, ₹250.24 becomes ₹350.34, while a 40% margin on price would have meant ₹417.07.

## Two price levels

Each markup dialog has a second box for a second level. The levels are called SP1 and SP2 until you rename them, and the business admin puts each party on one from its edit sheet. A garage on SP1 at 40% pays ₹350.34 for the bearing; a large retailer on SP2 at 25% pays ₹312.80.

## On the bill

On a sales invoice, quotation or sales order, the part arrives at its AutoParts price for that party's level. Ten bearings at ₹350.34 make a taxable value of ₹3,503.40. At 18% GST, CGST is ₹315.31 and SGST is ₹315.31, for a line total of ₹4,134.02.

The line keeps the cost, markup and purchase date it was priced from. Reopening the saved bill later does not re-price it, and an order turned into an invoice carries the same price. If the person billing types a different rate, the line keeps that rate. Tally receives the line's rate like any sales line; the cost and markup stay in the app.

## When a consignment lands

The Price changes button opens Purchase price changes: one card for each purchase bill from the last 90 days that moved a cost, such as "38 items · 4 moved more than 10%". Each part shows its old and new cost, the change in percent, and its selling price before and after at today's markup.

The module page, [cost-plus pricing for Tally](/autoparts-billing-tally), shows the screens.

## Frequently Asked Questions

**Q: Which purchase sets the cost of a part?**

A: The latest qualifying purchase bill for that part, or the latest from its preferred supplier if you set one. Cancelled bills, free lines and lines in another unit are skipped.

**Q: Does an old invoice change when the cost moves?**

A: No. Each saved line keeps the cost, markup and purchase date it was priced from.

**Q: What does Tally receive?**

A: A normal sales voucher with each line's rate. The cost and markup stay in the app.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with your stock group list and the markups you use, and we will walk through the setup with you.
