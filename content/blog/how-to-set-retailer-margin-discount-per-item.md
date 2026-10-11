---
title: "How to Set Retailer Margin and Discount per Stock Item"
slug: "how-to-set-retailer-margin-discount-per-item"
meta_description: "How to set retailer margin and discount per stock item in Takkada: open Billing Module, pick a group, fill MRP, margin, D1 and D2, then check a test bill."
primary_keyword: "retailer margin and discount per stock item"
date: "2026-10-11"
author: "harsh"
category: "How-To"
excerpt: "Six steps from the Billing Module to your first bill priced from MRP, with every box and label named as it appears in the app."
---

To set retailer margin and discount per stock item in Takkada, log in as the owner, open Settings, then Invoices, then Billing Module, pick a stock group, tap an item and fill its MRP, Retail Margin %, Discount 1 % and Discount 2 %, then save. From the next new sales invoice or sales order, that item bills at its MRP with the margin applied by itself as the line's discount. Discount 1 and Discount 2 work as limits: the salesman can give up to that figure on the line when a retailer is owed it, and no more. The margin is worked as a divisor on the retailer's cost, so a 20% margin shows as a 16.67% discount. You need the Billing Module switched on for your business and invoice creation from the phone. This guide walks through each step with the labels exactly as the app shows them, then shows how to check the result on a test bill before your salesmen start.

## Step 1: Open the Billing Module

Log in with the owner's account. Go to Settings, then Invoices, and tap **Billing Module**. If the row shows an add-on marker or a lock instead, the module is not switched on for your business yet. Staff logins cannot open this screen.

## Step 2: Pick a stock group

The screen lists your Tally stock groups, with "Ungrouped Items" for anything outside a group. Each row shows a line like "48 items · 12 configured". Use **Search stock groups...** if the list is long, and tap the group you want.

## Step 3: Fill the item's boxes

Inside the group, the header counts progress ("12/48 configured") and each item shows chips for what is set: MRP, M, D1, D2 and C. Use **Search items...** to find one, tap it, and fill:

1. **MRP (incl. GST)**: the printed price. Optional, but it must be more than 0 when typed.
2. **Retail Margin %**: required. Enter 0 if the item carries no margin.
3. **Discount 1 %**: the most a salesman may give at the first stage. Leave it empty if he may give none.
4. **Discount 2 %**: the same for the second stage.
5. **Salesman commission %**: optional, used by Team Sales.

Percent boxes take 0 to 100. Tap **Save**.

You can also open any stock item's page and use the edit button on its **Billing Configuration** card. Both doors save to the same place.

## Step 4: Check a test bill

Start a new sales invoice and add the item. Say its MRP is ₹10, the margin 20% and GST 5%, and you add 120 on an Incl. GST invoice. The cart chip reads **Discount 16.7%**. On the invoice the line shows "Qty: 120 | Rate: ₹ 10 / item", "Disc: 16.7% (-₹ 190.44)", "Retail Margin: 20%" and a total of ₹999.56. The label rounds to one decimal; the bill itself uses 16.67%, and the total follows Tally's paisa rounding.

## Step 5: Show the salesman the Item Discount sheet

When a retailer is owed a trade discount, the salesman taps the line's discount. The **Item Discount** sheet shows Retailer margin (greyed out for staff), Discount 1 (D1) and Discount 2 (D2), with a line like "Max Discount 1: 3%". A figure above the limit shows "Cannot exceed 3%" and Apply stays blocked. With D1 at 2% on the test line, the discount becomes 18.33% and the total ₹979.66.

## Step 6: Know where it does not apply

The margin is applied on new sales invoices and sales orders only. An invoice made from a saved sales order keeps the order's rate. Edits to old bills, credit notes and purchase bills are left alone, and items with no margin keep their usual Tally rate.

For the full picture, read the [FMCG billing software for Tally](/blog/fmcg-billing-software-for-tally) guide, or see the [MRP-based billing for Tally](/fmcg-module-tally) page.

## Frequently Asked Questions

**Q: Why can't I see the Billing Module row?**

A: Look under Settings, then Invoices. If it shows an add-on marker or a lock, the module is not on for your business. WhatsApp us and we will check your account.

**Q: Can I leave Discount 1 and Discount 2 empty?**

A: Yes. Then the salesman cannot give that discount on the item. Only the retailer margin applies.

**Q: Does changing a margin change old bills?**

A: No. The new figure applies from the next new bill. Bills already made keep their rates.

## Get set up

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up your first stock group with you.
