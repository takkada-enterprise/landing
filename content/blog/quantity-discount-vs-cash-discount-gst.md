---
title: "Quantity Discount vs Cash Discount: What Changes in the Books and Under GST"
slug: "quantity-discount-vs-cash-discount-gst"
meta_title: "Quantity Discount vs Cash Discount Under GST"
meta_description: "A quantity discount rewards how much a retailer lifted. A cash discount rewards when he paid. How each behaves in Tally, and what GST asks of both."
primary_keyword: "quantity discount vs cash discount"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Schemes"
excerpt: "Distributors use the two terms interchangeably at the counter and then discover at settlement that they are earned on completely different facts. One is a question about your sales register. The other is a question about your receipt vouchers, and it is the one that quietly breaks."
---

Quantity discount vs cash discount is a distinction that distributors collapse in conversation and then pay for at settlement, because the two are earned on completely different facts. A quantity discount is earned by lifting. A retailer crosses a slab of units or rupees inside a scheme period, and the rate for that slab applies to him. A cash discount is earned by paying. The money lands inside an agreed window from the invoice date, and a percentage comes off that bill. The first is a question you put to your sales register. The second is a question you put to your receipt vouchers and to how each one was allocated. They also sit differently under GST, because the law cares about when the discount was agreed and whether it can be tied to specific invoices. This article separates them properly: what triggers each, when the number becomes knowable, where the data sits in Tally, and why the cash discount is the harder of the two.

## Key Highlights

- A quantity discount asks how much a retailer lifted in a period. A cash discount asks when his money arrived against a specific bill, which makes it far harder to compute from the books
- A distributor who posts receipts on account rather than bill by bill cannot compute a cash discount at all, because nothing in the ledger records which invoice a payment settled
- Section 15(3) of the CGST Act, 2017 treats a discount recorded on the invoice differently from one given after the supply, and the second route carries conditions the first does not
- A cash discount never allocated to the bill it belongs to leaves a small residual open on that bill, which is where most phantom balances in Sundry Debtors come from

## In This Article

- Quantity discount vs cash discount: the two triggers
- The comparison, line by line
- Why the cash discount is the harder number
- Trade discount on the invoice, and discounts given afterwards
- What GST asks before a discount can reduce tax
- Getting the inputs right before the season closes
- Frequently Asked Questions

## Quantity Discount vs Cash Discount: The Two Triggers

A quantity discount, whatever the principal calls it in his circular, rewards volume. Lift 500 bags in the season and you earn ₹20 a bag. Cross ₹15 lakh of purchases in the quarter and you earn one and a half percent on the whole lot. The trigger is a threshold crossed over a period fixed in advance. Turnover discount and quantity purchase scheme are the same animal on different axes, one in rupees and one in units, and both live in the same place in your data.

A cash discount rewards speed of payment. Pay within 15 days of the invoice and take 2% off, pay within 30 and take 1%, pay later and take nothing. The trigger is a date, measured from the invoice date to the date the money reached you. Nothing about the goods matters.

That is why the two need different evidence at settlement. The quantity discount is proved by a sales register. The cash discount is proved by a receipt with a date on it and an allocation to a bill.

## The Comparison, Line by Line

| | Quantity discount | Cash discount |
|---|---|---|
| What triggers it | Units or rupees lifted inside a defined period | Payment received inside a defined window from the invoice date |
| When you know the number | At the close of the period, once returns are netted off | Only after the money has arrived and been matched to a bill |
| Where the data lives | Sales register, sales returns, the item's unit of measure | Receipt vouchers, their dates, and their bill-wise allocations |
| GST treatment | On the invoice face, section 15(3)(a). Given later, section 15(3)(b) | Almost always given after the supply, so section 15(3)(b) applies |
| Effect on the ledger | One credit note for the period, which sits on account unless it is allocated to bills | A short receipt that leaves a residual on that specific bill until a credit note clears it |

The row that costs distributors money is the last one. A quantity discount credit note is a single entry a party can see and argue about. A cash discount is scattered across dozens of bills in amounts of a few hundred rupees each, and it fails silently.

## Why the Cash Discount Is the Harder Number

Computing a quantity discount needs one fact per invoice line: the quantity, converted into whatever unit the scheme counts in. A cash discount needs two facts to be true at once, and one of them is usually missing.

The first is the receipt date measured against the window. That sounds simple until you meet real payments. A part payment lands inside the window and the balance lands three weeks later, so the rate applies to part of the bill only. A cheque is dated the 14th and clears on the 19th, and the two sides disagree about which date counts. A UPI transfer arrives on a Sunday inside the window while your entry is passed on Monday outside it. Each of these needs a rule written down in advance rather than decided in the argument.

The second fact is allocation. A cash discount is defined against a bill, so the receipt must be tied to that bill. If receipts are entered [bill by bill against reference](/blog/bill-by-bill-against-reference-tally/), the tie exists as data and the window test runs on it. If receipts are posted on account, no report can recover it, because a lump of ₹2,40,000 against a party with eleven open bills does not say which bills it paid. A distributor working that way can only estimate a cash discount, and estimates are exactly what retailers dispute. The discipline of [splitting a single UPI payment across the right invoices](/blog/how-to-split-upi-payment-across-tally-invoices/) is what makes the scheme computable.

A third problem shows up months later. When a retailer short-pays by the discount he has claimed, the receipt closes ₹49,000 of a ₹50,000 bill and ₹1,000 stays open. Until a credit note is passed and allocated against that bill, the ledger says he still owes ₹1,000. Multiply that across a season and your [partywise outstanding statement](/blog/partywise-outstanding-statement-tally/) carries a tail of small balances nobody will collect and nobody wants to write off, because no one is sure which are genuine.

## Trade Discount on the Invoice, and Discounts Given Afterwards

A second axis runs underneath all of this, and it matters more than the quantity-versus-cash question: was the discount shown on the invoice, or given afterwards.

A trade discount deducted on the face of the invoice is settled the moment the invoice is raised. The taxable value is the net figure, GST is charged on it, the retailer's ledger is debited with it, and nothing remains to be reconciled. Staggered rates behave the same way when the slab is known at billing time, so a distributor who can fix the slab at the counter should do it there.

A discount given afterwards is a different instrument. The invoice went out at full value, GST was charged at full value, the retailer took input credit at full value, and now you want to reduce all three. That is what a credit note does, and it is why the conditions on it are stricter. A quantity discount usually travels this route because the slab is known only at period end, and a cash discount almost always does. This is the fault line that makes [dealer scheme management in Tally](/blog/dealer-scheme-management-tally/) a season-end job rather than a billing-time one.

## What GST Asks Before a Discount Can Reduce Tax

Section 15(3) of the CGST Act, 2017 is the whole of it. Clause (a) excludes from the value of supply a discount given before or at the time of the supply, if it has been duly recorded in the invoice issued for that supply. Clause (b) covers a discount given after the supply has been effected, and as it has stood since 2017 it allows the exclusion only where the discount was established in terms of an agreement entered into at or before the time of supply and specifically linked to relevant invoices, and where the input tax credit attributable to the discount has been reversed by the recipient.

CBIC's Circular No. 92/11/2019-GST dated 7 March 2019 applied that to the schemes distributors actually run. A staggered "buy more, save more" rate shown on the invoice is fine. A periodic or year-ending volume discount announced in advance and passed on later through credit notes is also excluded from value, provided the section 15(3) parameters are met, including the buyer's reversal of credit. A secondary discount, meaning one not known at the time of supply, is not excluded: you may still issue a financial or commercial credit note for it as a commercial transaction, but your output tax does not come down. Circular No. 251/08/2025-GST dated 12 September 2025 added the other half. Where a discount goes through a financial or commercial credit note, the recipient is not required to reverse input tax credit, because the original transaction value has not changed.

One change is in the pipeline. The Finance Act, 2026, which received assent on 30 March 2026, substitutes clause (b) of section 15(3) to drop the prior-agreement and invoice-linking requirement, so a post-supply discount would qualify where a credit note is issued under section 34 and the recipient reverses the attributable credit. That amendment takes effect from a date the government notifies, and no commencement date was traceable at the time of writing.

The working rule survives all of it. Put the scheme in writing before the season starts, name the rate, the window and the items it covers, and keep it where you can produce it. Confirm the treatment of your own schemes with your tax adviser before you pass the credit notes.

## Getting the Inputs Right Before the Season Closes

Both discounts are computable from data you already hold. What decides whether the settlement closes in one meeting or runs for a month is whether the inputs were recorded during the season or reconstructed after it.

For the quantity discount, that means each stock item is classified into the scheme or deliberately excluded before the first invoice, with its packet conversion recorded once, so nobody is converting bags to kilograms by eye in October. For the cash discount, it means every receipt is allocated to the bills it settles, on the day it is entered. Takkada's payment link does that part on its own: the retailer opens the link with no login, sees each open bill with the amount outstanding and the due status, ticks the ones he is paying, and pays by UPI at 0% MDR. The receipt is written back into Tally against those specific bills rather than as a lump on account, which is exactly the allocation a cash-discount window needs. Takkada also has a scheme settlement module, switched on for a company on request, that holds cash-discount windows keyed by payment date alongside the quantity slabs.

The number itself was never the difficult part. Producing the evidence behind it, months after the season closed, is where the season is won or lost.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: What is the difference between a quantity discount and a cash discount?**

A: A quantity discount is earned by lifting a threshold of units or rupees inside a defined period, so it is computed from the sales register net of returns. A cash discount is earned by paying inside a defined window from the invoice date, so it is computed from receipt dates and the bills those receipts were allocated against. The same retailer buying the same quantity can earn very different cash discounts depending on when he released payment.

**Q: Is a cash discount allowed as a deduction under GST?**

A: It depends on when the discount was agreed and whether it is linked to invoices. Section 15(3) of the CGST Act, 2017 excludes a discount recorded on the invoice, and excludes a post-supply discount only on further conditions, which as the clause has stood since 2017 include an agreement entered into at or before the time of supply, a link to the relevant invoices, and reversal of the attributable credit by the buyer. The Finance Act, 2026 substitutes that clause to remove the prior-agreement requirement, effective from a date to be notified. Check your own scheme with your tax adviser.

**Q: Can I show a cash discount on the invoice itself?**

A: You can print the terms, but the amount depends on a payment that has not happened when the invoice is raised, so most distributors settle it afterwards by credit note. That places it on the post-supply route under section 15(3)(b) rather than the simpler on-invoice route under section 15(3)(a). A quantity slab you can fix at billing time is better deducted on the invoice face.

**Q: Why does my party ledger show small balances left on old bills?**

A: Usually because a retailer short-paid a bill by the cash discount he claimed and no credit note was ever passed and allocated against that bill. The receipt closes most of the bill and a few hundred rupees stay open. Across a season this builds a tail of tiny outstanding amounts nobody collects and nobody writes off.

**Q: Do I need a written agreement before the season to give a scheme discount?**

A: For the post-supply route as the law has stood since 2017, yes, a discount established in terms of an agreement entered into at or before the time of supply and linked to relevant invoices. The Finance Act, 2026 removes that condition once it is notified into force. Writing the scheme down in advance is still the practical answer, because it is what ends the argument with the retailer at settlement.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
