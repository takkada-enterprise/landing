---
title: "How to Pick a Batch on an Invoice and Show Mfg and Expiry on the PDF"
meta_title: "How to Pick a Batch on an Invoice | Takkada"
slug: "how-to-pick-batch-show-mfg-expiry-on-invoice"
meta_description: "How to pick a batch on an invoice from your phone and print Mfg and Exp on the PDF: the two settings, the batch list, the rate it fills and what reaches Tally."
primary_keyword: "pick a batch on an invoice"
date: "2026-10-12"
author: "harsh"
category: "How-To"
excerpt: "Five steps from the settings switch to a PDF with the batch, Mfg and Exp under the item, with what each screen shows on the way."
---

To pick a batch on an invoice in Takkada and print Mfg and Expiry on the PDF, a business admin turns on Price by batch under Settings, Invoices, and from then on the Batch box on a sales-invoice line lists the item's batches to choose from. Each batch row shows the stock left in that godown, the rate the line will take, and the MRP, purchase rate, Mfg and Exp where your Tally books carry them. Tap a batch and the line takes it with its rate: the batch MRP first, then the last rate that batch sold at, then the rate already on the line. Expired batches sit at the bottom in red. When you share or print the invoice, the PDF shows the batch under the item name with Mfg and Exp beside it, and the bill reaches Tally with the same batch on the line, with its dates when known. The steps below walk through it once.

## Before you start

Your items need to be batch-wise in Tally, with batches entered on purchases or in opening stock. The MRP, Mfg and expiry you see on the phone are the ones on those Tally entries. If a batch has no expiry in Tally, nothing prints for it, and the bill still carries the batch name.

## Step 1: Turn on Price by batch

Open Settings, then Invoices. You will find two switches next to each other:

- **Batch numbers on invoices** shows the Batch box on each line.
- **Price by batch** puts one batch on each line, priced from that batch, with Mfg and Exp on the bill.

Turn on Price by batch. If the Batch box was off, it turns on too. Only a business admin can change these switches.

## Step 2: Start a sales invoice

Create a sales invoice as you normally do: party, then items. Add the item and set the quantity. The line opens at the rate the app normally gives it.

## Step 3: Tap the Batch box

Tap the Batch box on the line. The list shows each batch of that item with stock left in the line's godown. A row reads:

- `B2409` on top
- `40 left` and the rate, for example `₹120`
- `MRP ₹120 · Bought ₹90 · Mfg 01-Sep-2026 · Exp 31-Jan-2028`

The stock figure already subtracts app invoices that have not reached Tally yet. The list follows batch name, with expired batches at the bottom carrying a red Expired label. You can type in the box to filter by name.

## Step 4: Pick the batch

Tap the batch. The line takes the batch and its rate:

1. The batch MRP. In an Incl. GST invoice it goes in as it is. In an Excl. GST invoice the GST comes out: MRP ₹105 at 5% fills ₹100.00.
2. If the batch has no MRP, the last rate you sold that batch at.
3. If neither, the rate already on the line, usually the item's rate.

If you sell below MRP, type your rate over it and the line keeps it, unless you have locked rates for ladder discounts. To bill the same item from a second batch, tap the Batch box again and pick it. The app adds a new line for the item, quantity 1, at the second batch's rate, and leaves the first line as it was. Set the new line's quantity.

## Step 5: Save and share the PDF

Save the invoice and share or print it. Under the item name the PDF prints `B2409 · Mfg 01-Sep-2026 · Exp 31-Jan-2028`, each date only when known. The saved invoice on the phone shows the same line. The bill goes to Tally as a sales voucher, each line carrying its batch and its own rate, plus Mfg and expiry when known.

## If something looks off

- No list when you tap the box: the item may have no batch with stock left in that godown, or the invoice is not a sales invoice. Quotations, sales orders and credit notes do not take the picker.
- A batch missing its dates: Tally holds no Mfg or Exp for it.
- "One batch per line when pricing by batch": you typed two names in one box. Pick the second batch instead, and it gets its own line.

The [batch-wise billing guide](/blog/batch-wise-billing-for-tally) explains the rules in full, and pharma houses can see the [Tally app for pharma distributors](/tally-app-for-pharma-distributors).

## Frequently Asked Questions

**Q: Where is the Price by batch setting?**

A: Settings, Invoices, below Batch numbers on invoices.

**Q: Why does the rate show the MRP?**

A: The batch MRP is the first rate the app fills. Type your own rate and the line keeps it.

**Q: Can I pick an expired batch?**

A: Yes. It sits at the bottom of the list with a red Expired label.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will go through these five steps with you on your own items.
