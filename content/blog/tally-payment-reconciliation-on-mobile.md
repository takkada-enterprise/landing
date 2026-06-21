---
title: "Tally Payment Reconciliation on Mobile, Done Right"
slug: "tally-payment-reconciliation-on-mobile"
meta_title: "Tally Payment Reconciliation on Mobile: How It Works"
meta_description: "Tally payment reconciliation on mobile: how auto-reconciliation matches UPI receipts to invoices and posts a receipt voucher, ending the 9 PM session."
primary_keyword: "tally payment reconciliation"
date: "2026-06-14"
author: "founder"
category: "How-To"
excerpt: "A Guwahati accountant stays back every night to match the day's UPI credits against invoices in Tally. Forty receipts, ninety minutes, two errors. Moving Tally payment reconciliation onto mobile with auto-matching turns that ninety minutes into zero. Here is how the matching actually works."
---

## Key Highlights

- Tally payment reconciliation is the work of matching each received payment to the invoice it settles and posting a receipt voucher; on mobile, auto-reconciliation does this as money arrives instead of in a nightly batch
- Auto-matching uses the UTR, the amount, and the party to link a UPI receipt to the right open invoice, then posts a standard receipt voucher into Tally
- Because Takkada runs 0% MDR on UPI collections, no transaction cap, no monthly fee, the received amount equals the invoice amount, so there is no gateway deduction to reconcile

## In This Article

- What Tally payment reconciliation actually is
- Why the 9 PM reconciliation exists
- How auto-reconciliation works on mobile
- What happens to part payments and mismatches
- Manual versus auto reconciliation compared
- Frequently Asked Questions

## What Tally Payment Reconciliation Actually Is

Tally payment reconciliation is the process of matching money you received against the invoices it was meant to pay, and recording each match as a receipt voucher in Tally. Until that match is made and the voucher posted, an invoice shows as outstanding even though the money is in your bank. So reconciliation is what turns "the money came" into "the invoice is settled" in your books.

Done by hand, it means sitting with the bank statement and the list of open invoices and pairing them one by one. Done on mobile with auto-reconciliation, the matching happens automatically as each payment arrives, through a read-and-write Tally companion app that syncs to the office machine. The underlying matching logic is covered in depth in the explainer on [auto-reconciliation in Tally](/blog/auto-reconciliation-tally/).

## Why the 9 PM Reconciliation Exists

The nightly reconciliation is a distributor ritual born of a real gap. Through the day, retailers pay over UPI against invoices raised earlier. The money lands in the bank, but nothing posts to Tally automatically, because the bank does not know which invoice each credit belongs to. So someone has to sit down at night and connect them.

For a distributor collecting across 30 to 50 parties a day, that is 40-odd UPI credits to match against open invoices, ninety minutes of work, and a real error rate when two parties paid similar amounts. The reconciliation is not optional, because without it the outstanding report is wrong and the owner gives credit against dues that are already cleared. Moving Tally payment reconciliation to mobile removes the ritual, not the rigour.

## How Auto-Reconciliation Works on Mobile

Auto-reconciliation matches three signals to link a payment to an invoice:

1. **The UTR**: when a UPI payment link is sent with an invoice, the payment that comes back carries a reference tied to that invoice, so the match is exact
2. **The amount**: the received figure is checked against open invoice amounts for the party
3. **The party**: the payer's identity narrows the candidate invoices to one customer's dues

When all three line up, the app posts a receipt voucher into Tally against that invoice, marks it settled, and updates the party's outstanding. No one types anything. This works best when the payment originated from a payment link on the invoice, which is why the way a link rides on the invoice matters; that is covered in the piece on [payment link Tally integration](/blog/payment-link-tally-integration/).

Because the collection runs at 0% MDR on UPI collections, no transaction cap, no monthly fee, the amount received equals the invoice amount to the rupee. There is no gateway deduction that would make ₹14,320 arrive as ₹14,248 and break the amount match, which is one quiet reason a 0% MDR rail reconciles more cleanly. The savings side of that is laid out in the piece on [0% MDR UPI collection for distributors](/blog/zero-mdr-upi-collection-for-distributors-india/).

## What Happens to Part Payments and Mismatches

Reconciliation is only trustworthy if it handles the messy cases honestly.

- **Part payment**: a retailer pays ₹50,000 against a ₹80,000 invoice. The app posts a receipt for ₹50,000, leaves ₹30,000 open, and the invoice stays partly outstanding.
- **One payment, many invoices**: ₹1,00,000 paid against three invoices auto-splits across them, oldest first, posting one receipt that clears two and part-pays the third.
- **No clean match**: if the UTR, amount, and party do not resolve to one invoice, the app flags it for a human instead of guessing. A flagged item is reviewed on the phone, not silently mis-posted.

The flag-instead-of-guess behaviour is the important one. Auto-reconciliation should never force a match it is unsure of, because a wrong match is worse than no match.

## Manual Versus Auto Reconciliation Compared

| Factor | Manual 9 PM reconciliation | Auto-reconciliation on mobile |
|---|---|---|
| When it happens | Once, at night, in a batch | As each payment arrives |
| Who does it | Accountant at the desk | The app, with human review on flags |
| Time per day | 60–90 minutes for 40 receipts | Near zero |
| Error rate | Real, on similar amounts | Low, exact UTR matching |
| Outstanding report accuracy | Correct only after the batch | Correct through the day |
| Gateway deduction to adjust | Yes, if MDR applies | None at 0% MDR |

A distributor weighing the full collection setup, not just reconciliation, will find the wider feature checklist in the rundown of the [UPI collection app for distributors](/blog/upi-collection-app-for-distributors-india/).

## Frequently Asked Questions

**Q: What is Tally payment reconciliation?**

A: Tally payment reconciliation is matching each payment you received to the invoice it settles and posting a receipt voucher in Tally so the invoice no longer shows as outstanding. Until the match is made, the money sits in your bank but the invoice still reads unpaid in your books.

**Q: How does auto-reconciliation work on mobile?**

A: It matches the UTR, the amount, and the party to link a UPI receipt to the right open invoice, then posts a receipt voucher into Tally automatically. This runs as each payment arrives, so the matching is spread across the day instead of piled into a nightly session.

**Q: Does auto-reconciliation remove the 9 PM reconciliation entirely?**

A: For UPI receipts that came through payment links, largely yes, because each one auto-matches as it arrives. Cash and unusual cases still need a quick human glance, but the bulk of the nightly batch disappears. Most distributors go from ninety minutes to a short review.

**Q: What happens when a payment does not match cleanly?**

A: A good system flags it for review rather than guessing. If the UTR, amount, and party do not resolve to a single invoice, the item is held for a person to confirm on the phone. This prevents a wrong auto-match, which is harder to fix than an unmatched receipt.

**Q: How does 0% MDR help reconciliation?**

A: With 0% MDR on UPI collections, no transaction cap, no monthly fee, the amount received equals the invoice amount exactly. There is no gateway cut that would make the credit smaller than the invoice and break the amount match, so reconciliation stays clean and the books balance to the rupee.

**Q: Is the receipt voucher from auto-reconciliation a normal Tally voucher?**

A: Yes. Auto-reconciliation posts a standard Tally receipt voucher, the same kind your accountant would create by hand. Your CA and your Tally reports see a normal entry, just one made automatically from a matched payment rather than typed at night.

Takkada runs Tally payment reconciliation on mobile: UPI receipts collected at 0% MDR auto-match to invoices and post clean receipt vouchers into Tally, so the 9 PM session goes away. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
