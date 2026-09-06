---
title: "How to Split One UPI Payment Across Multiple Tally Invoices"
slug: "how-to-split-upi-payment-across-tally-invoices"
meta_title: "Split a UPI Payment Across Invoices in Tally: Steps"
meta_description: "How to split one UPI payment across invoices in Tally using a receipt voucher and Against Reference bill-by-bill allocation, plus the faster auto-matched way."
primary_keyword: "split upi payment across invoices"
date: "2026-06-21"
updated: "2026-09-07"
author: "founder"
category: "How-To"
excerpt: "A retailer sends one ₹1,00,000 UPI payment to clear three open invoices at once. In Tally that lump sum has to be split across each bill by Against Reference, or your party ledger shows the right total but the wrong open bills. Here is the exact way to do it, plus the faster auto-matched route."
---

Splitting one UPI payment across multiple Tally invoices means allocating a single lump-sum receipt across each of the specific open bills it is meant to settle, rather than letting the whole amount sit against the party as one undifferentiated credit. A retailer who sends one ₹1,00,000 UPI payment to clear three open invoices at once has, from Tally's perspective, given the distributor a decision to make: without splitting it by Against Reference against each bill individually, the party ledger will show the correct total outstanding but the wrong specific bills as open, which breaks any aging report or collection call that relies on knowing exactly which invoice is still due. The manual way is to open the receipt voucher in Tally and allocate the amount across each invoice reference by hand, entry by entry. The faster, auto-matched route uses the UTR and invoice metadata to split the same payment automatically the moment it lands, so the ledger is accurate without anyone doing the arithmetic themselves.

## Key Highlights

- A single lump UPI receipt is allocated to several invoices through one receipt voucher using Tally's Against Reference bill-by-bill method, so a ₹1,00,000 payment splits cleanly across three bills
- Allocating bill-by-bill keeps your Partywise Outstanding accurate; an "On Account" receipt clears the party total but leaves every individual invoice showing as open
- When the receipt arrives over UPI with a reference number, auto-matching can split it across the right open invoices and post the receipt voucher into Tally at 0% MDR, with no transaction cap and no monthly fee

## In This Article

- Why one UPI payment has to split across invoices in Tally
- The numbered steps to split a UPI payment across invoices using Against Reference
- How a ₹1,00,000 receipt splits across three bills in the ledger
- The faster way: auto-matching a UPI receipt to the right invoices
- On Account versus Against Reference, and when each is correct
- Frequently Asked Questions

## Why You Split a UPI Payment Across Invoices in Tally

A retailer with three open bills rarely pays them one by one. He looks at his outstanding, rounds it off, and sends one UPI transfer for the lot. Now you are holding a single ₹1,00,000 receipt that belongs to invoice #1042, #1058, and #1071, and Tally has no way to guess which bills you meant unless you tell it.

This is where most party ledgers go wrong. If you post the ₹1,00,000 as a plain receipt against the party without picking bills, the party balance comes down correctly, but all three invoices still sit in the Partywise Outstanding report as open. The next time your salesman pulls that party's outstanding, it shows bills already paid. That gap is exactly why you split the UPI payment across invoices instead of dumping it on the party account.

Tally handles this through bill-by-bill tracking, where every invoice carries a bill reference and every receipt is allocated Against Reference to one or more of those bills. The steps below walk the whole thing, and if you want the background on the matching method itself, the explainer on [bill-by-bill Against Reference in Tally](/blog/bill-by-bill-against-reference-tally/) is the right place to start.

## How to Split a UPI Payment Across Invoices: The Steps

Here is the exact sequence to split one UPI payment across several open invoices using a receipt voucher and Against Reference allocation. The example splits a ₹1,00,000 UPI receipt across three bills.

1. Open Tally Prime and go to **Vouchers**, then press **F6** for a Receipt voucher.
2. Set the **Date** to the day the UPI money actually landed in your bank, not the day you are entering it.
3. In the **Account** field, pick the bank ledger where the UPI settled (for example, your current account). Tally will debit this for the full ₹1,00,000.
4. Under **Particulars**, select the retailer's party ledger. Enter the full receipt amount, ₹1,00,000, on the credit side.
5. The **Bill-wise Details** screen now opens for that party. This is where the split happens.
6. In **Type of Ref**, choose **Against Ref**. Tally lists every open bill for that party.
7. Pick invoice #1042 and enter the amount you are clearing against it, say ₹40,000.
8. On the next line choose **Against Ref** again, pick invoice #1058, and enter ₹35,000.
9. On the third line choose **Against Ref**, pick invoice #1071, and enter ₹25,000. The three amounts add up to ₹1,00,000.
10. Confirm the allocation total equals the receipt amount. If even ₹1 is unallocated, Tally will hold it as a New Ref or On Account line, so clear it before saving.
11. Enter the UPI reference number (the UTR) in the narration so the bank receipt is traceable later.
12. Press **Ctrl+A** to accept and save the voucher.

That is the whole split. One receipt voucher, one bank debit of ₹1,00,000, three bills closed against the party. If you are unsure what the UPI reference number in step 11 is for, the note on [the UTR number in a Tally payment](/blog/what-is-utr-number-tally-payment/) explains how it ties a bank line to a voucher.

## How a ₹1,00,000 Receipt Splits Across Three Bills

The table below shows what the allocation looks like once the receipt voucher is saved. The party owed ₹1,15,000 across three invoices, the retailer paid ₹1,00,000, and one bill stays partly open.

| Invoice | Original amount | Allocated from receipt | Status after |
|---|---|---|---|
| #1042 | ₹40,000 | ₹40,000 | Fully cleared |
| #1058 | ₹35,000 | ₹35,000 | Fully cleared |
| #1071 | ₹40,000 | ₹25,000 | ₹15,000 still open |
| **Total** | **₹1,15,000** | **₹1,00,000** | **₹15,000 outstanding** |

The party ledger now shows a credit of ₹1,00,000, and the Partywise Outstanding report correctly shows only ₹15,000 against invoice #1071, with #1042 and #1058 gone from the open list. This is the payoff of bill-by-bill allocation: your outstanding report tells the truth. For the report side of this, the piece on the [partywise outstanding statement in Tally](/blog/partywise-outstanding-statement-tally/) shows how the open bills read after a split receipt.

## The Faster Way: Auto-Matching the UPI Receipt to Invoices

Doing this by hand is fine for one or two splits a day. A distributor running 30 to 90 day terms across a couple of hundred parties is doing it forty times a day, and that is the work that piles up into the 9 PM reconciliation session. The bottleneck is not Tally. It is the manual reading of each bank line, finding the party, and remembering which bills the lump sum covers.

When the payment is collected over a UPI link tied to the invoices in the first place, the matching is already known. The receipt comes back with its UTR, the system knows which open bills the retailer was paying, and it allocates the amount Against Reference across those bills and posts the receipt voucher into Tally for you. A ₹1,00,000 payment splits across the three invoices without anyone typing a bill-wise screen. The deeper walkthrough lives in the explainer on [auto-reconciliation into Tally](/blog/auto-reconciliation-tally/), and the collection side is covered in [payment link Tally integration](/blog/payment-link-tally-integration/).

What this changes for the distributor is the order of the day. Instead of one batch of split receipts at night, each UPI payment matches and posts through the day as the money lands. The longer view on doing this from the phone is in [Tally payment reconciliation on mobile](/blog/tally-payment-reconciliation-on-mobile/). And because the collection runs over UPI, there is 0% MDR on UPI collections, no transaction cap, no monthly fee, so splitting a large receipt costs you nothing on the rails.

## On Account Versus Against Reference: When Each Is Correct

The single mistake that breaks split receipts is choosing **On Account** when you meant **Against Reference**. They look similar on the bill-wise screen, but they do opposite things to your outstanding.

- **Against Reference** ties the receipt to specific named bills. Use this every time you know which invoices the UPI payment covers. It is the only method that keeps Partywise Outstanding accurate.
- **On Account** parks the money against the party with no bill named. The party total drops, but every invoice stays open in the outstanding report. Use this only when the retailer pays an advance with no invoice yet raised, or when you genuinely cannot tell which bills the money is for.
- **New Reference** is for the invoice side, when you raise a fresh bill that will be settled later. It is not how you clear an existing bill.

A receipt that should have split across three invoices but was posted On Account is the classic reason a party ledger balances while the outstanding report still chases paid bills. When that gap shows up across a whole route, it inflates your collection days, and the cost of that is laid out in the piece on [days sales outstanding for Indian distributors](/blog/days-sales-outstanding-distributor-india/). Pick Against Reference, allocate to the exact bills, and the report stays clean.

## Frequently Asked Questions

**Q: How do I split one UPI payment across multiple invoices in Tally?**

A: Create a Receipt voucher (F6), debit the bank ledger that received the UPI for the full amount, credit the party for the same amount, and in Bill-wise Details choose Against Ref for each open bill, entering the part of the receipt that clears each one. The allocated amounts must add up to the total received. That single voucher splits one UPI payment across several invoices.

**Q: What happens if the split amounts do not add up to the receipt total?**

A: Tally holds the unallocated balance as a separate line, either On Account or as a New Reference. If you left ₹15,000 unallocated on a ₹1,00,000 receipt, that ₹15,000 sits against the party with no bill attached, and the matching invoice stays open. Always confirm the bill-wise total equals the receipt amount before saving.

**Q: Can one UPI receipt clear bills across two different parties?**

A: No. One receipt voucher is tied to one party ledger, so it can only split across that party's invoices. If a single UPI transfer somehow covers two parties, you record it against the correct party or split it into separate vouchers, never mix two parties' bills in one receipt.

**Q: Why does my party balance look right but invoices still show open?**

A: The receipt was almost certainly posted On Account instead of Against Reference. On Account lowers the party total without naming bills, so the Partywise Outstanding report keeps showing the individual invoices as unpaid. Edit the receipt, switch the allocation to Against Ref, and pick the specific bills.

**Q: Is there a faster way than splitting every UPI receipt by hand?**

A: Yes. When the payment is collected on a UPI link tied to the open invoices, the receipt comes back with its UTR already matched to those bills, and it splits across the invoices and posts the receipt voucher into Tally automatically. This removes the manual bill-wise typing for routine receipts and runs at 0% MDR with no transaction cap.

**Q: Does a partial payment still split correctly?**

A: Yes. If the retailer pays ₹1,00,000 against ₹1,15,000 of bills, you allocate the full ₹1,00,000 across the invoices and leave the remaining ₹15,000 open on whichever bill you choose. That bill shows its reduced open balance in the outstanding report, and the rest stays clear.

Takkada is the only Tally-native distributor collection app in India with genuine 0% MDR on UPI, collecting on UPI links and auto-reconciling each receipt to the right bills back in Tally. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
