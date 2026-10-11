---
title: "FMCG Billing Software for Tally: Retailer Margin and Discount per Item"
meta_title: "FMCG Billing Software for Tally | Takkada"
slug: "fmcg-billing-software-for-tally"
meta_description: "FMCG billing software for Tally: set MRP, retailer margin and two discount limits per stock item, and new bills work out the retailer's rate for those items."
primary_keyword: "FMCG billing software for Tally"
date: "2026-10-11"
author: "harsh"
category: "Schemes"
excerpt: "Your price structure starts at the printed MRP and ends at the retailer's rate. Here is how Takkada's Billing Module keeps that structure on each stock item you set up, so the salesman bills from his phone without a calculator."
---

FMCG billing software for Tally should start where your price structure starts: the printed MRP, the retailer's margin and the trade discounts the company allows. In Takkada, the owner sets those per stock item once, in the Billing Module, and a new sales invoice or sales order from the phone works out the retailer's rate for those items. When the salesman adds an item, the rate stays the MRP and the retailer's margin appears as the line's discount, worked as a divisor the way the trade states it: a 20% margin becomes a 16.67% discount. The salesman can add Discount 1 and Discount 2 up to the maximum you set, and the margin box is locked for him. Invoices and sales orders sync to Tally with the discount on each item line. Your price list stops living in a register and a calculator, and the items you have set up bill at the rate you agreed with the company.

## Why FMCG pricing breaks on the counter

The company prints an MRP, tells you the retailer's margin, and runs a trade discount or two on top. Then it changes them. A grammage cut, a new MRP, a revised margin on one pack size. The office updates a sheet, the salesman carries last month's sheet, and the retailer gets billed at whichever rate the person holding the pen remembered.

The rate the retailer pays is also not MRP minus the margin. A retailer's margin is stated on his cost, so a 20% margin means he buys at MRP divided by 1.20. Subtract 20% and you have given him 25%. On a ₹10 pack that is ₹8.33 against ₹8.00.

## What you set per stock item

The owner opens Settings, then Invoices, then **Billing Module**. Your Tally stock groups are listed, each with a line like "48 items · 12 configured". Inside a group, each item has five boxes:

- **MRP (incl. GST)**, as printed on the pack
- **Retail Margin %**, the one required box (0 is allowed)
- **Discount 1 %** and **Discount 2 %**, the most a salesman may give at each stage
- **Salesman commission %**, used if you run Team Sales

The same boxes sit on each stock item's own page, in the Billing Configuration card. Only the owner's login can set them.

## What happens on the bill

When the salesman adds an item to a new sales invoice or sales order, the margin is applied by itself. Take a biscuit pack with an MRP of ₹10, 5% GST and a 20% retailer margin, and 120 packs on an Incl. GST invoice. The cart shows "Discount 16.7%". The invoice line reads "Qty: 120 | Rate: ₹ 10 / item", "Disc: 16.7% (-₹ 190.44)" and "Retail Margin: 20%", and the line total is ₹999.56.

A calculator says 120 × (₹10 ÷ 1.20) is ₹1,000. The line is 44 paise lower because the app rounds the way Tally does: the rate without GST to the paisa first (₹9.52), then the discount at 16.67%, then CGST and SGST separately.

If the retailer is owed a trade discount, the salesman taps the line's discount and the **Item Discount** sheet opens. It shows "Max Discount 1: 3%" style limits, and a higher figure is refused with "Cannot exceed 3%". The Retailer margin box is greyed out for anyone but the owner. With D1 at 2% on the same line, the combined discount becomes 18.33% and the total ₹979.66.

## Where the margin stays out

The margin is applied once and never twice. A line someone already priced by hand is left alone. An invoice made from a sales order keeps the rate the customer was quoted. Editing an old bill, credit notes and purchase bills are untouched. An item with no margin keeps the usual rate from Tally.

## What Tally receives

An invoice reaches Tally as a sales voucher and a sales order as a sales order, with the discount percentage on the item line. The MRP you type stays in Takkada; Tally's item master is not changed. For the full module, see [MRP-based billing for Tally](/fmcg-module-tally).

## Frequently Asked Questions

**Q: Why is the retailer margin divided instead of subtracted?**

A: Because the trade states it on the retailer's cost. A 20% margin means the retailer buys at MRP ÷ 1.20, which is a 16.67% discount on MRP. Subtracting 20% would give him 25%.

**Q: Do Discount 1 and Discount 2 come off every bill?**

A: No. The margin applies by itself. D1 and D2 are the maximums the salesman may add on the Item Discount sheet when a retailer is owed them.

**Q: Can a salesman change the margin on a bill?**

A: Not on the Item Discount sheet, where the Retailer margin box is disabled for staff. If he types a rate by hand, that rate replaces the MRP on the line and the margin is not added on top.

**Q: What if I leave the MRP box empty?**

A: The rate the app would normally take from Tally, such as your standard price or price list, is treated as the MRP and the margin comes off that.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up your first stock group with you.
