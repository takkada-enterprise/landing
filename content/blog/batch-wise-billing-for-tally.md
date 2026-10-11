---
title: "Batch-wise Billing for Tally: Batch Number, Mfg Date, Expiry and MRP Rate on the Invoice"
meta_title: "Batch-wise Billing for Tally | Takkada"
slug: "batch-wise-billing-for-tally"
meta_description: "Batch-wise billing for Tally from your phone: pick the batch, see stock, MRP, Mfg and Exp, get the batch's rate on the line, and print Mfg and Exp on the PDF."
primary_keyword: "batch-wise billing for Tally"
date: "2026-10-12"
author: "harsh"
category: "Tally Mobile"
excerpt: "Two batches of the same item, two MRPs, two expiry dates. Here is how Takkada lets you pick the batch on the bill, prices the line from it and prints Mfg and Exp under the item."
---

Batch-wise billing for Tally means the invoice names the exact batch that left your godown, and Takkada's Price by batch setting does this from the phone: tap the Batch box on a sales-invoice line, pick the batch, and the line takes that batch's rate. The list shows each batch of the item with stock left in that godown, along with its MRP, last purchase rate, Mfg date and expiry date where your Tally books carry them. The rate comes from the batch's MRP first, then the last rate you sold that batch at, then the rate already on the line. Expired batches sit at the bottom of the list with a red Expired label. A second batch of the same item goes on its own line with its own rate. On the PDF, the batch prints under the item with Mfg and Exp beside it, and the bill reaches Tally with the batch name on each line and its dates when known.

## Why one item needs more than one line

You buy the same cough syrup, biscuit or engine oil many times a year. Each purchase arrives as a batch with its own number, Mfg date, expiry and often its own printed MRP, and Tally keeps them apart when the item is batch-wise.

The trouble starts at billing. The order says 20 pieces, and the godown packs 12 from the older batch and 8 from the newer one. If the bill says one batch, or none, your Tally stock per batch drifts, and the retailer's claim for an expired strip has nothing to match against.

## Turning it on

Settings, Invoices has two switches, and only a business admin can change them. **Batch numbers on invoices** shows the Batch box on each line. **Price by batch** goes one step further: one batch per line, each line priced from its batch. Turning Price by batch on also turns the Batch box on. Turning the Batch box off turns Price by batch off with it.

## What the batch list shows

Tap the Batch box on a sales-invoice line. Each batch row reads like this:

- The batch name, and how many are left in that godown
- The rate the line will get if you pick it
- `MRP ₹120 · Bought ₹90 · Mfg 01-Sep-2026 · Exp 31-Jan-2028`, each part only when Tally has it

The stock figure is what Tally counts in that batch, less the app invoices that have not reached Tally yet, so a carton already billed from the phone is not offered again as if it were still on the shelf. Only batches with stock left appear. The list runs in batch-name order with expired batches moved to the bottom. You still choose the batch, and an expired one can be picked if you mean to.

## Where the rate comes from

When you pick a batch, the app fills the rate in this order:

1. The batch MRP. In an Incl. GST bill it goes in as it is. In an Excl. GST bill the GST is taken out: MRP ₹105 at 5% becomes ₹100.00.
2. If the batch has no MRP, the last rate you sold that batch at.
3. If neither exists, the rate already on the line, which is usually the item's rate.

Most distributors sell to retailers below MRP, so type your rate over it and the line keeps it, unless you have locked rates for ladder discounts. If your Tally batches carry no MRP, the line opens at your last selling rate for that batch.

## On the PDF and in Tally

Under the item name the PDF prints `B2409 · Mfg 01-Sep-2026 · Exp 31-Jan-2028`, with each date only when known. The bill goes to Tally as a normal sales voucher, each line carrying its batch, its own rate, and its Mfg and expiry when known.

## What it covers today

Price by batch works on the sales invoice. Quotations, sales orders and credit notes do not take the batch picker. Batches themselves come from your Tally purchases and opening stock; the app reads them and does not create them. Purchase bill import does not read batch or expiry either, so that stays a Tally step.

If you run a pharma house, the [Tally app for pharma distributors](/tally-app-for-pharma-distributors) page shows the rest of the day's work on the phone.

## Frequently Asked Questions

**Q: Does the batch list show expiry dates?**

A: Yes, when Tally has them for that batch. Mfg and Exp show on the batch row, and expired batches sit at the bottom with a red Expired label.

**Q: Can I still bill an expired batch?**

A: Yes. The app marks it in red and leaves the decision to you.

**Q: Will the rate always be the MRP?**

A: The MRP comes first when the batch has one. You can type your own rate over it, and the line keeps what you type, unless the owner has locked rates for staff.

**Q: Does it work on sales orders and returns?**

A: Price by batch is on the sales invoice only today.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will switch it on with you against one of your batch-wise items.
