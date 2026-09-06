---
title: "Nil MDR UPI Collection on Tally Invoices"
slug: "nil-mdr-upi-collection-on-tally-invoices"
meta_title: "Nil MDR UPI Collection, Straight Off Tally"
meta_description: "Nil MDR UPI collection on Tally invoices: attach a UPI link to each Tally invoice, collect at 0% MDR with no per-transaction fee, and auto-match into Tally."
primary_keyword: "nil mdr upi collection"
date: "2026-06-14"
updated: "2026-09-07"
author: "harsh"
category: "Collections"
excerpt: "A Dibrugarh distributor raises every invoice in Tally already. The gap is that collecting against it means a separate gateway taking a cut. Nil MDR UPI collection on Tally invoices closes that gap: the link rides on the invoice, the money lands whole, and the receipt posts itself back."
---

Nil MDR UPI collection on Tally invoices means a distributor collects payment through a UPI link that carries zero merchant discount rate and is tied directly to the specific invoice raised in Tally, so nothing is deducted from the payment and the receipt posts back to the right bill without anyone typing it in. A Dibrugarh distributor already raises every invoice inside Tally; the gap has never been the billing, it has been that collecting against that invoice usually means a separate payment gateway taking a cut before the money lands, and the receipt arriving as an unmatched credit that has to be reconciled by hand. Nil MDR UPI collection closes both problems in one step: the link rides on the invoice itself rather than sitting in a separate app, the full amount lands in the bank account with nothing skimmed off, and the receipt matches back to that invoice automatically, which is what turns a distributor's own existing Tally habit into a complete collection loop instead of half of one.

## Key Highlights

- Nil MDR UPI collection means collecting the full invoice amount over UPI with zero merchant discount rate and no per-transaction fee, so a ₹14,320 invoice is collected as ₹14,320
- Done off Tally invoices, the UPI link is attached to the invoice you already raise, and the receipt posts back into Tally as a voucher automatically
- UTR-based matching ties each payment to its specific invoice, so two invoices of the same amount reconcile correctly without WhatsApp screenshots

## In This Article

- What nil MDR UPI collection on Tally invoices means
- How the link attaches to a Tally invoice
- Why nil MDR has to mean no per-transaction fee
- Matching the receipt back to the right invoice
- The end-to-end flow on one invoice
- Frequently Asked Questions

## What Nil MDR UPI Collection on Tally Invoices Means

Nil MDR UPI collection means receiving a payment over UPI with no merchant discount rate deducted, so the full amount reaches you. Done on Tally invoices, it means the invoice you already raise in Tally becomes directly collectible: a UPI link sits on it, the retailer pays, and the money lands whole. There is no separate gateway taking a percentage between the invoice and your account.

For a distributor, this matters because the invoice already lives in Tally. The missing piece is collecting against it without a cut and without retyping the receipt later. Nil MDR UPI collection on Tally invoices supplies both. The structural reason a nil-MDR rail is possible is covered in the [0% MDR UPI collection guide for distributors](/blog/zero-mdr-upi-collection-for-distributors-india/).

## How the Link Attaches to a Tally Invoice

The mechanic is straightforward. When an invoice is raised in Tally, a companion app generates a UPI payment link pre-filled with the exact invoice amount and attaches it to that invoice. The link goes to the retailer, usually on WhatsApp alongside the invoice itself.

The retailer taps the link, their UPI app opens with the amount already filled, and they pay from their bank account. Because it is peer-to-merchant UPI, the payment carries nil MDR, so the full invoice amount arrives. How the link is wired to the Tally invoice is detailed in the explainer on [payment link Tally integration](/blog/payment-link-tally-integration/), and the dispatch-and-collect loop on WhatsApp is in the piece on [collecting payment against a Tally invoice on WhatsApp](/blog/collect-payment-against-tally-invoice-whatsapp/).

## Why Nil MDR Has to Mean No Per-Transaction Fee

Nil MDR is only genuinely nil if there is no per-transaction fee either. Some apps say "0% MDR" and then charge a flat amount per receipt, for example ₹3, which on a ₹400 invoice is effectively a 0.75% charge wearing a different label. Across 200 receipts a day that is around ₹1,80,000 a year, on a rail that is supposed to be free.

So nil MDR UPI collection on Tally invoices must come with no per-receipt fee at all. Takkada's claim is exact: 0% MDR on UPI collections, no transaction cap, no monthly fee. A receipt of any size lands whole, with no flat fee hiding behind the headline. The way these costs stack is in the [payment collection cost comparison for distributors](/blog/payment-collection-cost-comparison-india/).

## Matching the Receipt Back to the Right Invoice

Collecting the money is half the job; getting it onto the right invoice in Tally is the other half. The risk is look-alike payments: two invoices of ₹14,320 paid the same day, both retailers sending a screenshot, and no way to tell which payment cleared which.

Nil MDR UPI collection on Tally invoices solves this by matching on the UTR, the unique reference each UPI payment carries, tied to the specific invoice its link was generated for. Each payment resolves to its own invoice, the receipt voucher posts in Tally, and the party's outstanding drops, with no screenshot in the loop. This is what removes the nightly reconciliation, as the explainer on [tally payment reconciliation on mobile](/blog/tally-payment-reconciliation-on-mobile/) describes.

## The End-to-End Flow on One Invoice

Here is nil MDR UPI collection on Tally invoices, start to finish, on a single ₹14,320 invoice.

| Step | What happens | Amount |
|---|---|---|
| Invoice raised in Tally | UPI link attached, pre-filled | ₹14,320 |
| Sent on WhatsApp | Invoice and link in one message | ₹14,320 due |
| Retailer taps and pays | Peer-to-merchant UPI, nil MDR | ₹14,320 received |
| UTR auto-matches | Tied to this invoice, not a look-alike | matched |
| Receipt voucher posts in Tally | Outstanding drops to zero | ₹0 due |

The full amount arrives, the right invoice closes, and nobody retypes anything.

## Frequently Asked Questions

**Q: What is nil MDR UPI collection on Tally invoices?**

A: It is collecting the full invoice amount over UPI with zero merchant discount rate, directly against the Tally invoice you already raise. A UPI link is attached to the invoice, the retailer pays from their bank, the money lands whole, and the receipt posts back into Tally automatically.

**Q: Does nil MDR mean there are no charges at all?**

A: With a genuine rail, yes, no percentage and no per-transaction fee. Watch for apps that claim 0% MDR but charge a flat ₹3 a receipt, which is a real cost at volume. Takkada's 0% MDR on UPI collections, no transaction cap, no monthly fee has no per-receipt charge.

**Q: How does the payment get onto the right Tally invoice?**

A: By matching on the UTR, the unique reference each UPI payment carries, tied to the specific invoice its link was generated for. Two ₹14,320 invoices paid the same day resolve to the right one each, so the receipt posts to the correct party without relying on screenshots.

**Q: Do I need to change how I raise invoices in Tally?**

A: No. You raise invoices in Tally as you do now. The companion app attaches a UPI link to each invoice and posts the receipt back. Nil MDR UPI collection on Tally invoices fits on top of your existing Tally workflow rather than replacing it.

**Q: Is peer-to-merchant UPI really nil MDR?**

A: Yes. Standard peer-to-merchant UPI, where a retailer pays from their bank account, carries no merchant discount rate. That is what makes nil MDR UPI collection genuine rather than a promotional rate. The cost of the software is a flat subscription, not a cut of each payment.

Takkada is the only Tally-native distributor collection app in India with genuine nil MDR UPI collection, no per-transaction fee, and UTR auto-matching that posts receipts straight onto your Tally invoices. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
