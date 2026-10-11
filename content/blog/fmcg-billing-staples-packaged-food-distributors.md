---
title: "FMCG Billing for Staples and Packaged-Food Distributors"
slug: "fmcg-billing-staples-packaged-food-distributors"
meta_description: "FMCG billing for staples and packaged-food distributors: thin margins worked from MRP to the paisa on packed atta, rice, dal and oil lines, from the phone."
primary_keyword: "FMCG billing for staples and packaged-food distributors"
date: "2026-10-11"
author: "harsh"
category: "Schemes"
excerpt: "When the margin on a 5 kg atta bag is 8%, a rate off by a rupee eats the profit on the line. Here is how per-item margins keep staples billing exact."
---

FMCG billing for staples and packaged-food distributors has to be exact to the paisa, because the margins on atta, rice, dal, sugar and oil are thin and the bags are heavy. In Takkada, the owner sets each packed item's MRP and retailer margin once in the Billing Module. When the salesman adds a 5 kg atta bag or a 1 litre oil pouch to a new sales invoice or sales order on his phone, the rate stays the MRP and the margin is applied by itself as the line's discount, worked as a divisor on the retailer's cost. The amounts are rounded the way Tally rounds them. A trade discount, when the company allows one, goes on the line as Discount 1 or Discount 2, capped at the maximum you set, and the margin box is locked for staff. Loose items without a margin keep their usual rate from Tally. Invoices and sales orders sync to Tally with the discount on each item line.

## The staples distributor's arithmetic

A typical staples and packaged-food distributor supplies 150 to 250 kirana and general stores, with 7 to 15 days of credit. The range mixes branded packed goods with an MRP, like atta, rice, sugar, dal, oil, salt and spices, with a few loose or unbranded lines sold by weight. Margins on packed staples are thin, often in single digits, and they differ between pack sizes of the same product.

At those margins, rounding matters. A rate that is a rupee off on a ₹270 bag, across fifty bags, is the margin on a whole line. Salesmen working out rates in their heads round in the retailer's favour, and nobody notices until the month's profit looks short.

## Set the packed items

The owner opens Settings, then Invoices, then **Billing Module**, and opens a Tally stock group such as Atta and Flour. Tap an item and fill:

- **MRP (incl. GST)**: the printed price on the bag
- **Retail Margin %**: the margin you give the retailer (required; 0 is allowed)
- **Discount 1 %** and **Discount 2 %**: the most a salesman may give, if any

Each group row shows how many items it has and how many are set up. Loose and unbranded lines can stay unset.

## A line, worked to the paisa

Take a 5 kg atta bag printed at ₹270, with an 8% margin. The salesman adds 20 bags to an Incl. GST invoice at 5% GST. The cart shows "Discount 7.4%", which is the 8% margin worked as a divisor (the retailer buys at ₹270 ÷ 1.08), stored to two decimals as 7.41%. The invoice line reads "Rate: ₹ 270 / item", "Disc: 7.4% (-₹ 381.08)" and "Retail Margin: 8%", and the line total is ₹4,999.80.

The calculator says ₹5,000. The 20 paise gap is Tally's own rounding: rate without GST to the paisa first, then the discount, then CGST and SGST separately. The bill on the phone and the voucher in Tally follow the same rule.

If the company runs a trade discount on oil this month, the salesman enters it on the **Item Discount** sheet as D1. A figure above your maximum is refused with "Cannot exceed" and the limit.

## What the margin leaves alone

Loose dal sold by weight, with no margin set, keeps the usual rate from Tally. An invoice made from a saved sales order keeps that order's rate. Credit notes and purchase bills are not touched.

The [FMCG billing software for Tally](/blog/fmcg-billing-software-for-tally) guide covers the full rate logic, and the [MRP-based billing for Tally](/fmcg-module-tally) page shows the module.

## Frequently Asked Questions

**Q: Why does the line total differ from my calculator by a few paise?**

A: The app rounds like Tally: the rate without GST to the paisa first, then the discount, then each tax head. Your calculator skips those steps.

**Q: Can I bill loose items in the same invoice?**

A: Yes. Items without a margin set bill at their usual Tally rate on the same invoice.

**Q: What happens when the company changes an MRP?**

A: Change the MRP box on that item. The next new bill takes it, and bills already made keep their rates.

## Get started

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up your staples groups with you.
