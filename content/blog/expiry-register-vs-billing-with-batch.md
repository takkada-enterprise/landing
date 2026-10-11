---
title: "Tracking Expiry in a Register vs Seeing It While You Bill"
slug: "expiry-register-vs-billing-with-batch"
meta_description: "Tracking expiry in a register tells you what is expiring this month. Seeing Exp while you bill stops the wrong batch leaving. How the two fit together on Tally."
primary_keyword: "tracking expiry in a register"
date: "2026-10-12"
author: "harsh"
category: "Comparisons"
excerpt: "A monthly expiry register and a batch list on the billing screen answer different questions. Here is what each one catches, what each misses, and how they work side by side."
---

Tracking expiry in a register tells you, once a month, which batches are close to expiry so you can push them or return them; seeing expiry while you bill stops the wrong batch from leaving on a particular invoice. A distributor usually needs both, and they do different jobs. The register, whether a notebook, a spreadsheet or Tally's own batch reports, is a look back across the whole godown. Takkada's Price by batch setting gives the second view: on a sales-invoice line, the Batch box lists each batch of the item with stock left, its Mfg and Exp and its MRP from your Tally books, with expired batches at the bottom under a red Expired label. The clerk picks the batch going out, the line takes that batch's rate, and the PDF prints the batch with Mfg and Exp under the item. The register keeps its monthly job, and the bill now carries the batch the register will later look for.

## How the register works today

Once a month someone sits with Tally or a notebook and lists the batches that expire in the next 60 or 90 days. The list goes to the sales team: push these first, offer a scheme on those, send the rest back to the company before the claim window closes.

That review is useful. It sees the whole godown at once, and it plans ahead. Where it struggles is the gap between the review and the counter. The register says "send batch A first", and at 11 in the morning a packer with 40 lines to fill takes batch B because it is in front. The bill does not name a batch, so nobody finds out until batch A expires on the shelf.

## What changes when you see expiry while billing

With Price by batch on, the clerk tapping the Batch box sees, for that item and godown:

- Each batch with its stock left and the rate the line will take
- `MRP ₹120 · Mfg 01-Sep-2026 · Exp 31-Jan-2028` under it, where Tally has those details
- Expired batches at the bottom, marked in red

He picks the batch the register asked to clear first. If the order needs two batches, each goes on its own line with its own rate. The retailer's PDF names the batch with its dates, and Tally receives the same batch and dates on the voucher line, so batch stock in Tally follows the bills.

## Side by side

| Question | Expiry register | Batch list while billing |
|---|---|---|
| Which batches expire in the next 90 days? | Yes, across the godown | No, it shows one item at a time |
| Which batch goes on this bill? | No | Yes, the clerk picks it |
| Is this batch already expired? | At the last review | Yes, a red label at the moment of billing |
| Does the retailer's bill show Mfg and Exp? | No | Yes, when Tally has the dates |
| Does it plan returns to the company? | Yes | No |

## How to run both

Keep the monthly review for planning. It is the only view of the whole godown, and the app does not produce a near-expiry report or alerts. Name batches so that name order is close to date order, such as year then month, because the list follows batch name with expired stock last. Then let the billing screen carry the review's decisions to the bill. The item page in the app also lists batches under each godown with their MRP, Mfg and Exp, which helps when someone asks on the phone whether a batch is still in stock.

The full rules are in the [batch-wise billing guide](/blog/batch-wise-billing-for-tally). Pharma houses, where expiry claims cost the most, can see the [Tally app for pharma distributors](/tally-app-for-pharma-distributors).

## Frequently Asked Questions

**Q: Does the app replace my monthly expiry review?**

A: No. It has no near-expiry report. It shows expiry on the batch list while billing.

**Q: Will the clerk see expired stock while billing?**

A: Yes. Expired batches sit at the bottom of the list with a red Expired label.

**Q: Where do the expiry dates come from?**

A: From the batches in your Tally purchases and opening stock.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with last month's expiry list and we will show you those batches on the billing screen.
