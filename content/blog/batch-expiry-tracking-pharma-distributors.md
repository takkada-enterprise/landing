---
title: "Batch and Expiry Tracking for Pharma Distributors"
slug: "batch-expiry-tracking-pharma-distributors"
meta_description: "Batch and expiry tracking for pharma distributors on Tally: pick the batch while billing a chemist, see Exp and stock left, and print Mfg and Exp on the bill."
primary_keyword: "batch and expiry tracking for pharma"
date: "2026-10-12"
author: "harsh"
category: "Tally Mobile"
excerpt: "A chemist calls about a strip that expired on his shelf. Here is how a pharma distributor on Tally can see Exp at the moment of billing and put the batch on the bill."
---

Batch and expiry tracking for pharma distributors works best at the moment of billing, and Takkada's Price by batch setting puts it there: when you bill a chemist from the phone, the Batch box on the sales-invoice line lists each batch of that medicine with stock left, its Mfg and Exp dates and its MRP, as your Tally books hold them. Expired batches drop to the bottom of the list with a red Expired label, so the clerk sees the problem before the strip leaves. Pick a batch and the line takes that batch's rate; pick a second batch and it goes on its own line. The PDF the chemist receives prints the batch with Mfg and Exp under the item name, and the bill reaches Tally with the batch on each line and its dates when known. Because chemists buy below MRP, you can type your trade rate over the MRP and the line keeps it.

## A pharma distributor's ordinary Tuesday

You supply 250 chemists across two districts on 21-day credit. A morning order from one counter runs to 40 lines: antibiotics, syrups, a few cold-chain items. Most items have two or three live batches in the godown, bought at different times, with different expiry months.

The packer takes whatever is in front. The bill says nothing about batches, or says the wrong one. Three months later the chemist sends back a box of expired strips and asks for credit. Your team opens Tally, looks at batches, and argues about which bill they went out on.

## What the clerk sees while billing

With Price by batch on, tapping the Batch box on a line shows the batches of that medicine in the godown the line is billed from:

- Batch number and quantity left
- MRP, last purchase rate, Mfg date and Exp date, each when Tally has it
- The rate the line will take
- A red Expired label on any batch past its expiry date, listed last

The list follows batch-name order with expired stock at the bottom. The clerk picks the batch the packer is actually sending. An expired batch can still be picked if you mean to, and the red label tells the clerk exactly what he is about to bill.

## Rates, PTR and the MRP default

Chemists buy at the trade rate, below MRP. When a batch has an MRP in Tally, the app fills the MRP first because it is the one price printed on the strip. Change it to your trade rate on the line and the line keeps it, unless the owner has locked rates for staff. If your purchase entries leave batch MRP blank, the app falls back to the last rate you sold that batch at, then to the rate already on the line. Most medicines now sit in the 5% GST slab: in an Excl. GST bill an MRP of ₹105 is filled as ₹100.00.

## What the chemist and your Tally receive

The chemist's PDF prints, under each item, a line such as `AMX2409 · Mfg 01-Sep-2026 · Exp 31-Aug-2028`. When the expiry claim comes back, the batch on his bill matches the batch in your Tally, because the sales voucher carried the batch name for that line, with Mfg and expiry when known.

## Where the rest of your pharma flow stands

Batches come from your Tally purchases and opening stock. [Purchase bill import](/blog/purchase-bill-import-pharma-distributors) reads item, HSN, quantity, rate, MRP, GST and discount, and batch and expiry stay a Tally step there. The [van and loading sheet](/blog/dispatch-load-pharma-same-day-delivery) do not show batch or expiry. Credit notes for expiry returns do not take the batch picker today. The full batch billing walk-through is in the [batch-wise billing guide](/blog/batch-wise-billing-for-tally), and the [Tally app for pharma distributors](/tally-app-for-pharma-distributors) page covers collections, reminders and orders.

## Frequently Asked Questions

**Q: Does the app warn me before I bill an expired batch?**

A: The batch shows a red Expired label in the list and sits at the bottom. There is no separate warning at save.

**Q: Will the bill show the expiry date to the chemist?**

A: Yes, when Tally holds the dates for that batch and you picked the batch with Price by batch on. Mfg and Exp print under the item.

**Q: Can I enter a new batch and its expiry in the app?**

A: Batches and their dates come from Tally. Enter the purchase in Tally as you do today and the batch appears in the list.

**Q: Does it handle expiry returns?**

A: Credit notes do not take the batch picker today.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with one of your batch-wise medicines and we will show you its batch list.
