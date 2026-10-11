---
title: "Manual Rate Calculation vs Margin-Based FMCG Billing"
slug: "manual-rate-calculation-vs-margin-based-fmcg-billing"
meta_description: "Manual rate calculation vs margin-based FMCG billing: what changes when MRP, retailer margin and discount limits live on each item instead of a rate sheet."
primary_keyword: "margin-based FMCG billing"
date: "2026-10-11"
author: "harsh"
category: "Comparisons"
excerpt: "A rate sheet, a calculator and the salesman's memory, against MRP and margin stored on each item. Here is what each way costs on a real bill."
---

Margin-based FMCG billing replaces the rate sheet and the calculator with figures stored on each stock item: the printed MRP, the retailer's margin and the most a salesman may give as trade discount. With manual rate calculation, someone works out MRP less margin less discount for every line, often from an old sheet. In Takkada's Billing Module, the owner sets those figures once, and a new sales invoice or sales order from the phone takes the MRP as the rate for each item you have set up and applies the margin by itself as the line's discount, worked as a divisor on the retailer's cost. Extra discounts on the Item Discount sheet are capped at your limit, and the margin box is locked for staff. The difference shows up on three things you already care about: rates that match the company's letter, a salesman whose extra discount stops at the limit you set, and totals rounded the way Tally rounds them.

## The same bill, two ways

Take 120 packs of a ₹10 biscuit, 5% GST, with a 20% retailer margin, on an Incl. GST invoice.

Worked by hand, the salesman usually does one of two things. He takes 20% off ₹10 and bills at ₹8, which hands the retailer a 25% margin. Or he divides ₹10 by 1.20, gets ₹8.33, and bills 120 × ₹8.33 = ₹999.60, or rounds it to ₹1,000. Either way the figure in Tally is typed again in the evening, and it may not match what the retailer was told.

With the margin set on the item, the cart shows "Discount 16.7%". The invoice line reads "Rate: ₹ 10 / item", "Disc: 16.7% (-₹ 190.44)" and "Retail Margin: 20%", and the line total is ₹999.56. That is the margin worked as a divisor, 16.67%, with Tally's paisa rounding: rate without GST to the paisa first, then the discount, then each tax head.

## Side by side

| | Manual rate calculation | Margin-based billing in Takkada |
|---|---|---|
| Where rates live | A printed or shared rate sheet | MRP and margin on each stock item |
| Working out the rate | Salesman's calculator, per line | Applied by itself when the item is added to a new sales invoice or sales order |
| Margin maths | Often subtracted, giving away extra | Divided, the way the trade states it |
| Extra discount | Agreed at the counter, case by case | Discount 1 and Discount 2, capped at your limit |
| Who can change the margin | Whoever writes the bill | Only the owner's login |
| MRP revision | Reprint and resend the sheet | Change one box; the next new bill takes it |
| Getting it into Tally | Typed again in the evening | Invoices and sales orders synced with the discount on each line |

## Where manual still happens

The module works on items you have set up. An item with no margin bills at the usual rate from Tally, so a loose or unbranded line still takes whatever rate you quote. An invoice made from a saved sales order keeps that order's rate. Edits to old bills, credit notes and purchase bills are left as they are.

## What changes for the owner

With rates on a sheet, checking bills means re-doing the maths. With margins on the items, the owner checks one thing: whether each item's MRP and margin match the company's latest letter. The group screens in the Billing Module show how many items in each group are set up, so the gaps are easy to find.

Read the [FMCG billing software for Tally](/blog/fmcg-billing-software-for-tally) guide for the full rate logic, or see the [MRP-based billing for Tally](/fmcg-module-tally) page.

## Frequently Asked Questions

**Q: Is the divisor method right for my company's margin?**

A: It is how the trade usually states a retailer margin: on his cost. A 20% margin means he buys at MRP ÷ 1.20. If a company states it on MRP instead, enter the matching percentage so the result agrees with their letter.

**Q: Can I switch over item by item?**

A: Yes. Items without a margin keep their usual Tally rate, so you can start with your biggest groups.

**Q: Does the salesman still type any discount?**

A: Only a trade discount the retailer is owed, as D1 or D2 on the Item Discount sheet, up to the limit you set.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up your first group with you.
