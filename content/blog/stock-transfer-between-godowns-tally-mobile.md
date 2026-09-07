---
title: "Stock Transfer Between Godowns from Mobile"
slug: "stock-transfer-between-godowns-tally-mobile"
meta_title: "Stock Transfer Between Godowns in Tally, from Mobile"
meta_description: "Record a branch-to-branch stock transfer in Tally from your phone. How the stock journal works, what GST applies, and why timing beats paperwork."
primary_keyword: "stock transfer between godowns tally"
date: "2026-08-08"
updated: "2026-08-08"
author: "founder"
category: "How-To"
excerpt: "The quantity is known once, while the goods are being loaded. Every hour after that, the transfer note gets copied, remembered and eventually approximated."
---

A stock transfer between godowns in Tally is recorded as a stock journal: quantity goes out of the source location and the same quantity comes into the destination location, with no sale and no purchase involved. Because both godowns sit under the same GSTIN, no tax event arises, which is why the entry is a movement rather than an invoice. The mechanics are simple and the timing is where distributors lose accuracy. A truck is loaded at the main warehouse on Monday, a paper note travels with it, and the entry reaches Tally on Thursday when somebody at the desktop gets to it. For those three days both locations are wrong. Takkada records the same stock journal from the phone, at the moment the goods move, and writes it back into your Tally against the voucher type your accountant already uses. This article covers the entry, the transit problem, and the checks that keep branch stock honest.

## Key Highlights

- A branch transfer is a stock journal with an out line from the source godown and an in line into the destination godown, not a sale
- No GST arises on a movement between two godowns under the same GSTIN; a movement between different registrations is a different transaction and is billed as one
- The accuracy loss is almost never arithmetic, it is delay: the quantity is known exactly once, at the loading dock

## In This Article

- What a stock transfer entry actually is
- Recording the transfer from the phone
- Goods in transit and the godown nobody creates
- Units, batches and the details that trip transfers
- When a transfer is not a transfer
- Checking that the two ends agree

## What a Stock Transfer Entry Actually Is

In Tally, moving goods between your own locations is a stock journal. The voucher carries two sides: consumption from the source godown, and receipt into the destination godown. Nothing is sold, nobody is billed, and no ledger balance changes. Only the location of the stock changes.

That is why the entry feels lightweight and gets treated as lightweight. It is also why it is the entry most often postponed. An invoice has a customer waiting for it. A transfer has nobody waiting for it, so it queues behind everything else, and the branch stock figure drifts in the meantime.

The underlying model is covered in [what a godown is in Tally](/blog/what-is-godown-in-tally/), and the wider branch setup in [managing multiple branches in Tally with godowns](/blog/manage-multiple-branches-tally-godowns/).

## Recording the Transfer from the Phone

Takkada records the stock journal on mobile, and the flow follows the same shape as the desktop voucher.

You add the outward lines against the source godown and the inward lines against the destination godown, choosing items, quantities and units per line. The unit picker offers the units that exist in your Tally masters rather than free text, so a transfer cannot introduce a unit your books do not recognise. When batch tracking is in use for an item, the batch is carried on the line so the receiving location knows which lot arrived. Save, and the voucher is written back into Tally against your existing stock journal voucher type, appearing on the desktop as an ordinary entry rather than something imported from outside.

The value of doing it on the phone is not that it saves typing. It is that the person who knows the quantity is holding the device. A storekeeper counting cartons onto a truck records twenty-eight because he just counted twenty-eight. The same figure, recopied twice and entered on Thursday, has a way of becoming thirty.

Staff who should only move stock in their own location can be restricted to named godowns, which is covered in [restricting staff to their own warehouse](/blog/restrict-staff-warehouse-access-tally/).

## Goods in Transit and the Godown Nobody Creates

Between dispatch and receipt, the goods are physically on a road. Most company files have no place to put them, so the transfer is recorded either at dispatch, which makes the branch look like it holds stock that has not arrived, or at receipt, which makes the main warehouse look like it still holds stock that left three days ago.

The clean answer is a transit godown, and it costs one master to create.

| Event | Entry | Where the stock sits after |
|---|---|---|
| Truck leaves main warehouse | Stock journal, main to transit | Transit |
| Branch receives and counts | Stock journal, transit to branch | Branch |
| Short receipt found at branch | Shortfall stays in transit until settled | Transit, visibly |

The third row is the one that pays for the whole practice. A short receipt is a real event in distribution, and a transit godown makes it visible as a number rather than as a disagreement between two people's memory of what was loaded.

## Units, Batches and the Details That Trip Transfers

Three details cause most transfer disputes, and none of them are the quantity itself.

**The unit of measure.** Goods that go out in bags and come back in kilograms need a conversion, and a conversion applied inconsistently across a season is worth real money on a large branch. Recording transfers against the unit masters your Tally already holds removes the improvised conversion at entry time.

**Batches.** If an item is batch-tracked, the receiving location needs to know which batch arrived, otherwise the branch cannot sell it correctly and expiry tracking breaks quietly.

**Rates.** A transfer is not a sale, so the rate on the line is a valuation figure rather than a price to anyone. It does not create margin at the branch and it should not be treated as a branch purchase cost in any commercial conversation.

## When a Transfer Is Not a Transfer

Two situations look like branch transfers and are not, and treating them as stock journals creates a compliance problem rather than a reporting one.

If the receiving location is registered under a different GSTIN, even within the same company, the movement between the two registrations is a supply and is billed accordingly. A stock journal is the wrong instrument there.

If the goods are moving to a customer rather than to your own location, that is a dispatch, and it belongs on a delivery challan or an invoice with the godown stamped on the lines. That side is covered in [godown on sales invoices and delivery challans](/blog/godown-on-sales-invoice-delivery-challan/).

The test to apply is ownership. If the goods are still yours and still inside the same registration, it is a transfer. Anything else is a transaction with a document.

## Checking That the Two Ends Agree

A transfer is complete when both locations show what they should, and the check takes a minute on a phone.

Open the location view for the destination godown and confirm the received items landed there. Open the item drill-down and confirm the quantity left the source. If a transit godown is in use, confirm the transit balance is zero for anything already received, because a lingering transit figure is either a short receipt or an entry somebody forgot to complete. The report side of this is covered in [the godown-wise stock report on mobile](/blog/godown-wise-stock-report-tally-mobile/).

Distributors who run this check weekly stop discovering branch discrepancies at the annual physical count, when the trail is cold and nobody remembers which truck was short.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: How do I transfer stock from one godown to another in Tally?**

A: Use a stock journal. Record the outward lines against the source godown and the inward lines against the destination godown, with the same items and quantities on both sides. Nothing is sold or purchased, so no ledger balance changes and only the location of the stock moves. Takkada records the same voucher from the phone and writes it back into your Tally.

**Q: Is GST applicable on stock transfer between godowns?**

A: Not when both godowns fall under the same GST registration, because no supply takes place when goods move within one registration. If the two locations are registered separately, the movement between them is a supply and has to be billed with tax. Check the registration of each location before deciding which document to raise.

**Q: How should goods in transit between two branches be recorded?**

A: Create a transit godown and move the stock into it at dispatch, then out of it into the destination when the branch receives and counts. Without a transit location, the goods are either counted at both ends or at neither, and a short receipt shows up as an argument instead of as a visible balance sitting in transit.

**Q: Can a branch storekeeper record a transfer from his phone?**

A: Yes, and he can be restricted to the godowns you allow. A team member limited to named godowns can only record stock movements involving those locations, with anything else rejected on the server rather than merely hidden in the app. That is the right control for warehouse and dispatch staff.

**Q: Does a stock transfer affect party balances or profit?**

A: No. A stock journal has no party and no ledger effect, so outstanding, receivables and profit are untouched. It changes where inventory sits, which is why the only reports affected are location-wise stock reports. Any rate on the line is a valuation figure and does not represent a sale to the branch.

**Q: What is the most common reason branch stock does not match after transfers?**

A: Timing and missing locations, in that order. Transfers entered days after the goods moved leave both ends wrong in the meantime, and outward sales recorded without a godown drain stock from the wrong place entirely. Recording the movement when it happens and stamping locations on invoices fixes most branch discrepancies before they accumulate.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
