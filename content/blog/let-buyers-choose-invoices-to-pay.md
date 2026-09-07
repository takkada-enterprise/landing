---
title: "Let Buyers Choose Which Invoices to Pay: The Bill by Bill Payment Link"
slug: "let-buyers-choose-invoices-to-pay"
meta_title: "Bill by Bill Payment Link: Buyer Picks the Invoices"
meta_description: "A retailer pays ₹1,00,000 against nine open bills. Let him tick which ones, and the receipt lands against those exact bills in Tally instead of on account."
primary_keyword: "bill by bill payment link"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Collections"
excerpt: "A retailer owes ₹3,40,000 across nine bills and sends ₹1,00,000. Who decides which bills that money closed? Today it is your accountant, guessing, three days later. That single guess is where most party ledger disputes are born."
---

A bill by bill payment link is a link you send a party that lists his open invoices and lets him tick the ones he is paying, so the money arrives already allocated. It matters because the usual alternative carries no instruction at all. A retailer who owes ₹3,40,000 across nine bills sends ₹1,00,000 by UPI and says nothing about what it covers. Somebody in your office then decides on his behalf, two or three days later, working from a rule of thumb or a note taken on a phone call. That decision is the origin of most party ledger disputes, because the person making it was not the person who had the intent. When the buyer picks the bills himself at the moment he pays, the allocation is captured by the only person who actually knew it, and the receipt can be written into Tally against those exact bills instead of sitting on account waiting to be sorted out.

## Key Highlights

- A bare UPI transfer carries an amount, a payer and a reference number, but no instruction about which bills it settles, so the allocation is always reconstructed later by someone who was not part of the decision
- The three common allocation habits, oldest bill first, whatever the retailer said on the phone, and on account for now, each fail in a different way, and all three fail silently
- When the buyer ticks his own bills on a payment link, the receipt posts into Tally as a bill-wise against-reference entry, which keeps ageing honest and stops reminders quoting invoices the party has already paid

## In This Article

- What a bill by bill payment link changes about collections
- Why the lump payment is the root of ledger disputes
- The three ways distributors allocate today
- The only person who knows is the one paying
- How the allocation reaches Tally
- What stops going wrong downstream
- Sending the link to your party
- Frequently Asked Questions

## What a Bill by Bill Payment Link Changes About Collections

Think about what actually travels with a UPI payment. There is an amount, a payer's name usually abbreviated past recognition, and a [UTR reference number](/blog/what-is-utr-number-tally-payment/) proving the transfer happened. That is the entire payload. Nothing in it says "this is for invoice 1178 and 1182, and I am holding back on 1191 because of the rate."

A bill by bill payment link adds one field to that payload, and it is the field that matters: the allocation. The buyer opens the link, sees his own open bills, ticks the ones he is settling, and pays. The money and the instruction arrive together, from the same person, at the same moment.

Everything downstream of that is bookkeeping that no longer needs a judgement call. The receipt has a list of bills attached to it, so it can be posted against those bills. Nobody has to infer anything.

## Why the Lump Payment Is the Root of Ledger Disputes

Take the nine bills. Sharma Traders owes ₹3,40,000 across invoices raised over eleven weeks, some inside terms, some forty days overdue. He transfers ₹1,00,000 on a Tuesday. On your side, a credit appears in the bank statement on Wednesday, and on Thursday your accountant sits down to post it.

He has to answer a question the payment did not answer. Which bills did this close? Whatever he decides becomes the truth in your books, and the retailer's own books will show a different truth, because the retailer allocated it in his head on Tuesday and never told you.

The gap does not announce itself. Both ledgers show the same party total, ₹2,40,000 outstanding, so a casual check reconciles fine. It is the bill-level composition underneath that has quietly split into two versions. That mismatch sits there for months, growing every time another lump payment lands, until somebody sends a statement and the two lists refuse to line up.

## The Three Ways Distributors Allocate Today

Ask ten distributors how the office handles an unallocated receipt and you get three answers.

| How the money gets allocated | What it assumes | What it costs you |
|---|---|---|
| Oldest bill first | The retailer meant to clear his oldest dues | Closes bills the retailer was deliberately withholding on, so a disputed bill vanishes from your follow-up list while he still considers it open |
| Whatever the retailer said on the phone | Someone wrote it down and it reached the accountant intact | Fine when it works. The note gets lost, the part payments get split from memory, and nobody can produce the instruction two months later |
| On account, sort it later | Later will actually come | Every one of the nine bills stays fully open. Ageing overstates, and the next reminder quotes a bill he has already paid |

Oldest-first is the most defensible of the three and still wrong often enough to matter, because a retailer who withholds payment on one bill is making a point about that bill. If your books silently close it, you lose the dispute without ever having the conversation.

On account is the one that compounds. It is the fastest key to press when the accountant is behind, and it leaves the [partywise outstanding statement](/blog/partywise-outstanding-statement-tally/) showing bills that are already settled. A month of that and the statement you send is no longer something you would defend on a call.

## The Only Person Who Knows Is the One Paying

There is a reason the retailer chose ₹1,00,000 and not ₹80,000 or the full ₹3,40,000. Two bills are under a rate dispute he raised with your salesman. One has a short-supply claim pending. Three are the ones his own accountant flagged as beyond terms this week. He assembled that number out of specific bills, deliberately, in about thirty seconds.

That reasoning exists in one place, his head, and only for as long as he is looking at the list. He does not write it down, because from where he sits the payment is done. By the time your side looks at it, everything except the amount has evaporated.

A payment link puts the bill list in front of him during those thirty seconds. He is already deciding which bills to pay. Ticking them costs him nothing extra, and it turns a private decision into a recorded one. The rate dispute now shows up as a bill he chose to leave open, which is exactly what it is, and your salesman can go and settle it instead of finding out in December.

## How the Allocation Reaches Tally

Tally already has the right mechanism for this and has had it for years. A ledger maintained bill-by-bill gives every invoice its own reference and its own clock, and a receipt settles [against reference](/blog/bill-by-bill-against-reference-tally/) to the specific bills it pays. Tally has always been able to hold the allocation. The difficulty has been getting the instruction to the person entering the receipt.

Done by hand, this is a receipt voucher where the operator [splits the payment across each invoice](/blog/how-to-split-upi-payment-across-tally-invoices/) and types the amount going to each. It works, and for a distributor with thirty parties it is a fine way to live. The load becomes real at two hundred parties and forty receipts a day, which is when the on-account shortcut starts appearing in the books.

When the allocation travels with the payment, the same voucher gets written with the buyer's own list of bills in it. ₹1,00,000 arrives tagged to five specific invoices, and it posts against those five. The ageing on the remaining four keeps running from their original dates. What went into Tally is a bill-wise entry that matches what the retailer believes he paid, which is the only definition of a clean ledger that survives a phone call.

## What Stops Going Wrong Downstream

Three things change once allocations stop being guesses, and none of them are about the payment itself.

**Ageing stays true.** A 30/60/90 bucket is only as good as the dates on the open bills. Every misallocated receipt moves a bill into the wrong bucket, and after a few months your overdue column carries bills that are paid and misses bills that are not. Correct allocation at source is what makes an ageing report worth acting on.

**Reminders stop chasing paid bills.** The fastest way to lose credibility with a retailer is to send him a reminder for an invoice he settled three weeks ago. He stops reading the messages, and the ones that matter get ignored along with the rest. When receipts land on the right bills, the reminder list is always the true open list.

**The year-end confirmation gets much shorter.** Balance confirmation season is long because the totals agree while the bill-level lists do not, so both sides work backwards through a year of lump receipts to find where the composition diverged. If every receipt was allocated by the party who paid it, there is nothing to reconstruct. The two lists were built from the same instruction.

## Sending the Link to Your Party

In Takkada, you share a payment link for a party. He opens it on his phone without creating an account or downloading anything, the way he would open any link on WhatsApp. He sees his own open bills, each with the voucher number, the amount still outstanding on that bill, and its due status, whether it is due in nine days, due today, or forty days overdue. He ticks the bills he is paying, selects all of them, or types a custom amount if he is making a part payment. He pays by UPI, at 0% MDR, which is a separate argument we have made at length in our [zero MDR collection](/blog/zero-mdr-upi-collection-for-distributors-india/) posts. The receipt then posts back into Tally bill by bill, against the invoices he chose. The link is token-based and expires, so an old message cannot be reused.

The part worth sitting with is what happened to the bookkeeping. The buyer did your allocation for you, and he did it more accurately than anyone on your side could have, because he was the one holding the reason.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Can a customer choose which invoices he is paying?**

A: Yes, if you send him a payment link that lists his open bills instead of a plain UPI request. He sees each open invoice with its number, the amount outstanding on it and its due status, and ticks the ones he is settling before paying. The selection travels with the payment, so the receipt can be posted against those specific bills rather than allocated by guesswork afterwards.

**Q: UPI se payment aaya kis bill ka hai?**

A: With a plain UPI transfer there is no way to know for certain, because the payment carries only an amount, a payer name and a reference number. The allocation has to be reconstructed by your office, usually from a phone call or a rule like oldest bill first. If the retailer selects his bills on a payment link at the time of paying, the answer comes with the money instead of being inferred later.

**Q: What happens if the buyer types a custom amount instead of ticking bills?**

A: The custom amount option exists for part payments where he wants to send a round figure. It is the ticking route that carries a bill-level instruction, so it is worth encouraging retailers to select bills whenever they can. A custom amount still reaches you as a payment, but the allocation decision comes back to your side, which is the situation you were trying to avoid.

**Q: Is on account ever the right answer?**

A: Yes, for the genuine cases. An advance received before any invoice exists, or money that arrives with no identifiable party context, belongs on account until it can be placed. The problem is using it as a default because it is faster to enter. Anything parked on account should be cleared to specific bills quickly, because while it sits there every original bill still reads as fully open.

**Q: Does the buyer need an account or an app to use a payment link?**

A: No. He opens the link on his phone and the page shows his open bills straight away, with no signup, no password and nothing to install. This is deliberate, because a retailer who has to create an account before paying you will simply not pay through the link. The link is token-based and expires, so it stops working after its window rather than staying live forever.

**Q: How does the receipt get back into Tally against the right bills?**

A: The bills the buyer selected are carried through with the payment, so the receipt is written into Tally as a bill-wise entry against those invoices, which is Tally's against-reference behaviour on a ledger maintained bill-by-bill. The remaining open bills keep their own dates, so ageing continues to run correctly on them and no manual end-of-day matching is needed.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
