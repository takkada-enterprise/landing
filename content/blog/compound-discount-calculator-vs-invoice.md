---
title: "Calculating Compound Discount on a Calculator vs on the Invoice"
meta_title: "Compound Discount: Calculator vs Invoice | Takkada"
slug: "compound-discount-calculator-vs-invoice"
meta_description: "Compound discount on a calculator vs on the invoice: why 10% + 5% + 3% gives ₹8,293.50 on a calculator and ₹8,293.00 on the bill and in Tally."
primary_keyword: "compound discount on a calculator"
date: "2026-10-11"
author: "harsh"
category: "Comparisons"
excerpt: "The calculator says ₹8,293.50. The bill says ₹8,293.00. Both did the sum honestly. Here is where the 50 paise go, and why the bill is the one that matches Tally."
---

Working out a compound discount on a calculator gives you the exact chain, but the Tally voucher carries one discount percentage per line, to two decimals, so the calculator's answer is often a few paise away from what your voucher will show. On ₹10,000 with 10% + 5% + 3%, the calculator ends at ₹8,293.50, because the true compound discount is 17.065%, a figure with three decimals. In Takkada, you type the three steps on the invoice line instead, and the app rounds the total half up to 17.07%, works the line from that figure, and lands on ₹8,293.00, the same amount Tally computes from 17.07. The bill also prints each step and the total, so the retailer sees how 10, 5 and 3 became 17.07. The calculator is fine for a quick quote at the counter. The invoice is where the number has to agree with your books, and that is the one the app works out for you.

## The calculator way

Most offices handle stepped discounts like this. The salesman or the billing clerk takes ₹10,000, knocks off 10% to get ₹9,000, takes 5% off that to get ₹8,550, takes 3% off that to get ₹8,293.50, and then needs one percentage for Tally's discount column. He divides, gets 17.065, and has to choose between 17.06 and 17.07.

- At 17.06%, Tally's line comes to ₹8,294.00
- At 17.07%, it comes to ₹8,293.00
- Neither is the calculator's ₹8,293.50

On one line, 50 paise is noise. On a 40-line bill for a retailer who checks every line against the scheme letter, it is a reconciliation that never quite closes. And the quicker mistake, adding 10 + 5 + 3 to 18%, takes the line to ₹8,200.00, ₹93.50 lower than the chain on this line alone.

## The invoice way

In Takkada, the steps go straight onto the sales invoice or sales order line. Tap the discount on the line, type 10 in Discount % and 5 and 3 in the two boxes the owner has named, and the Item Discount sheet shows "100.00 → 90.00 → 85.50 → 82.93 · total 17.07%" for an item at ₹100.

The rounding is fixed: the compound total is worked in whole numbers and rounded half up to two decimals. The line's discount, its taxable value and its GST are then all computed from that rounded figure, the same way Tally works a line from its discount column. The server checks that the stored total matches the steps, and refuses a line where it does not.

The ₹10,000 line, rate before GST, at 18% GST:

- Total discount: 17.07%, so ₹1,707.00 off
- Taxable value: ₹8,293.00
- CGST ₹746.37 and SGST ₹746.37
- Line total: ₹9,785.74

## Side by side

| | Calculator, then Tally | Steps on the invoice |
|---|---|---|
| Who compounds the steps | A person, every time | The app, from the steps typed |
| Rounding | Whatever that person chooses | Half up to two decimals, the same way on each line |
| Amount on the bill | Calculator's chain, or Tally's figure | Worked from the rounded total, as Tally works it |
| What the retailer sees | One percentage | Disc., your named steps, Total Disc. |
| What Tally receives | The number someone typed | The rounded total in the item line's discount field |

When the steps compound to an exact two-decimal figure, the two ways agree. 10% + 5% + 2% is exactly 16.21%, and both give ₹8,379.00 on ₹10,000. The gap shows up on totals like 17.065% that need rounding.

## When the calculator still helps

At the counter, before an order is even booked, a calculator is the fastest way to tell a retailer roughly what a scheme is worth. That is a quote. Once the bill is made, the steps on the line take over, and the figure the retailer pays is the one the invoice and Tally both show.

For the complete method, read [how the ladder discount works on a Tally invoice](/blog/ladder-discount-in-tally-invoices). The module is at [ladder discount in Tally](/ladder-discount-tally).

## Frequently Asked Questions

**Q: Why does my calculator give a different amount from the bill?**

A: The calculator keeps every decimal of the compound discount. The Tally voucher carries one percentage to two decimals, and the bill is worked from that rounded figure so that it matches Tally.

**Q: How does the app round 17.065%?**

A: Half up, to 17.07%. The rounding is done in whole numbers, so it does not drift on a half.

**Q: Does the order of the steps matter?**

A: No. 10 + 5 + 3 and 3 + 5 + 10 compound to the same total. Only the price shown after each step changes.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with a bill that never matched your calculator and we will work it through on the invoice.
