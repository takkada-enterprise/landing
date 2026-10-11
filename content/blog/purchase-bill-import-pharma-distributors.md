---
title: "Purchase Bill Import for Pharma Distributors: MRP and GST Lines"
meta_title: "Purchase Bill Import for Pharma Distributors"
slug: "purchase-bill-import-pharma-distributors"
meta_description: "Purchase bill import for pharma distributors: read item, HSN, MRP and GST off the supplier bill, check each line, then save it as a Tally purchase voucher."
primary_keyword: "purchase bill import for pharma distributors"
date: "2026-10-11"
author: "harsh"
category: "Autopilot"
excerpt: "Pharma purchase bills are dense: HSN, MRP, rate, GST and discount on every line. Here is what the import reads off them, what you check, and what stays a Tally step."
---

Purchase bill import for pharma distributors reads the supplier's bill, PDF or photo, into a draft purchase voucher with each line's item, HSN code, quantity, rate, printed MRP, GST rate and discount filled in where the bill prints them, and you check every line before saving it. You choose Import from PDF or photo in the Purchase register, confirm the supplier by name or GSTIN, map each line to your own stock item, and review the voucher. MRP has its own field, marked as the printed MRP rather than the rate, and if a line's MRP comes out below its purchase rate the screen asks you to double-check. One limit matters for pharma: the import does not read batch numbers or expiry dates, so for batch-wise items that part stays with you in Tally. The rest of the line is shown and editable, and the voucher reaches Tally only after you tap Save Purchase Voucher, the same way any entry made in the app does.

## A pharma distributor's purchase desk

A typical pharma distributor buys from 30 to 60 companies and their C&F agents. Bills arrive daily, many with 30 or more lines, each line carrying HSN, pack, quantity, rate, MRP, discount and GST. The person entering them is usually the same person handling chemist orders, so purchase entry slips to the evening and stock in Tally runs a day behind the shelf.

The cost of a typing slip is high here. A wrong MRP on a purchase line can follow the item into billing, and a wrong GST rate shows up as a mismatch when the supplier files.

## What the import reads off a pharma bill

From the header: supplier name, GSTIN and address, invoice number and date, due date, taxable total, CGST, SGST or IGST, discount and TDS where printed.

From each line: description, HSN, quantity, rate, MRP, GST rate, discount percent, amount and unit. Serial numbers are read where a bill prints them.

On **Map Line Items**, each line gets one of your stock items. A line whose printed code equals the part number on one of your Tally items is filled in and marked "Matched by part number". After a bill from a company has been imported once, the items you chose for its lines come back as "Remembered from a past invoice" on the next one, while the rate and discount always come from the new bill.

## The checks before you save

**Edit item details** on a line lets you fix the unit, HSN and GST. An HSN that is not 4, 6 or 8 digits is flagged with "Check the bill". If a line has no quantity printed, the app asks you to enter one instead of guessing. On **Review Purchase Voucher**, if the lines add up to a different figure from the bill's printed total, both numbers are shown with "Check the items before you save."

If the same supplier reference already exists as a purchase invoice, the screen says so and the save button stays off.

## Where batch and expiry fit

Batch numbers and expiry dates are not read from the bill and the review screen has no field for them. If your pharma stock is batch-wise in Tally, plan for that step in Tally as you do today. The import takes the typing of item, rate, MRP and tax off your desk, which is most of each line.

The [Import purchase from PDF](/import-purchase-from-pdf) page shows the screens, and the [guide to importing purchase bills into Tally](/blog/import-purchase-bills-into-tally-photo-pdf) covers the full flow.

## Frequently Asked Questions

**Q: Does the import read batch numbers and expiry dates?**

A: No. Item, HSN, quantity, rate, MRP, GST and discount are read. Batch and expiry stay a Tally step.

**Q: Will the MRP be used as the purchase rate?**

A: No. MRP has its own field, labelled as the printed MRP, and the screen warns when MRP is below the purchase rate.

**Q: Can I correct a wrong HSN before saving?**

A: Yes. Open Edit item details on the line and change it. The app checks that it is 4, 6 or 8 digits.

**Q: Is anything saved without me checking it?**

A: No. Nothing is created until you tap Save Purchase Voucher on the review screen.

## See it on a pharma bill

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with one supplier bill and we will run the import on your Tally data.
