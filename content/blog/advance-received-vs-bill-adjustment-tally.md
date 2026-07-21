---
title: "Advance Received vs Bill Adjustment in Tally"
slug: "advance-received-vs-bill-adjustment-tally"
meta_title: "Advance vs Bill Adjustment in Tally: Distributor Guide"
meta_description: "Adjust an advance against a bill in Tally: what advance received means, how a bill adjustment settles it, and why an unadjusted advance overstates outstanding."
primary_keyword: "adjust advance against bill tally"
date: "2026-07-21"
updated: "2026-07-21"
author: "founder"
category: "How-To"
excerpt: "A retailer sends ₹40,000 before any invoice exists, so it goes in as an advance. Three weeks later the bill is raised, but nobody adjusts the advance against it. Now the books show credit and outstanding at the same time for the same party. Here is how advance and bill adjustment actually work in Tally."
---

An advance received in Tally is money a party pays you before you have raised the invoice for it, recorded as a receipt tagged with the "Advance" reference type against that party. A bill adjustment is the later step that ties that advance to the actual bill once it exists, done by recording an Against Reference entry (or using the bill-settlement screen) so the advance offsets the invoice. The two are a pair. The advance parks the money, and the adjustment settles it. If you take the advance but never adjust it, Tally carries a strange picture: the party shows a credit sitting as an advance and, once the bill is raised, an open invoice at the same time, so your outstanding is overstated and the ledger contradicts itself. This guide walks what advance received means, how a bill adjustment clears it, why the unadjusted case is a trap, and how a mobile layer keeps advances from piling up unsettled.

## Key Highlights

- An advance received is money taken before the invoice exists, tagged "Advance" against the party; a bill adjustment is the Against Reference step that offsets that advance once the real bill is raised
- An advance that is never adjusted leaves a party showing both a credit (the parked advance) and an open bill at once, which overstates your outstanding and makes reminders quote bills the party has effectively paid
- Takkada matches each receipt to the right open bill and writes it back into Tally, so advances get adjusted at the point money moves instead of piling up for someone to reconcile at 9 PM

## In This Article

- What "advance received" means for a distributor
- What a bill adjustment does, step by step
- Advance vs bill adjustment, side by side
- The unadjusted-advance trap and what it costs
- Keeping advances adjusted from the phone
- Frequently Asked Questions

## What "Advance Received" Means for a Distributor

Distribution runs on money that arrives out of order. A retailer wants his stock reserved, so he sends ₹40,000 today, before you have raised a single bill. A new party pays part upfront to open an account. A regular clears a round figure "adjust kar lena baad mein". In every case, money has come in and no invoice yet exists to attach it to.

That is exactly what the Advance reference type is for. When you record the receipt, you tag it Advance against the party, and Tally holds it as a credit sitting on that party's ledger with no bill behind it. It is honest at that moment: you owe the party goods or a bill worth that money.

The Advance type is one of Tally's four reference types, alongside New Reference, Against Reference, and On Account. The full set is walked through in [bill-by-bill against reference in Tally](/blog/bill-by-bill-against-reference-tally/); this post drills into the one pairing that trips distributors up most, the advance and its adjustment.

## What a Bill Adjustment Does, Step by Step

The advance is only half the story. The adjustment is the half that gets forgotten, and it is what actually settles the money.

Once the invoice exists, you adjust the advance against it so the credit and the bill cancel out. The flow on the desktop looks like this.

1. Raise the sales invoice as usual, which opens a New Reference bill for the full amount
2. Open a receipt voucher (or the bill-settlement screen) for that party
3. Instead of a fresh receipt, select **Against Reference** and pick the open bill
4. Tally shows the party's pending advance; apply that advance amount against the bill
5. If the advance covers the bill fully, the bill closes; if partly, the bill stays open for the balance
6. Accept the voucher, and the advance drops off the party's ledger

After this, the party's outstanding reads true. The advance is gone, the bill is settled to the extent of it, and only the genuine remaining balance shows as open. The [steps to record a payment in Tally on mobile](/blog/how-to-record-payment-in-tally-on-mobile/) follow the same logic when the settlement happens from the phone rather than the desk.

## Advance vs Bill Adjustment, Side by Side

The two are easy to confuse because they touch the same money. This table keeps them apart.

| | Advance received | Bill adjustment |
|---|---|---|
| When it happens | Money arrives before the invoice | After the invoice exists |
| Reference type used | Advance | Against Reference |
| What it does | Parks a credit against the party | Offsets that credit against a real bill |
| Effect on outstanding | No bill to reduce yet | Reduces the open bill |
| If you skip it | Advance sits unsettled | Bill stays open, ledger contradicts itself |
| The one-line job | Hold the money honestly | Settle the money correctly |

The advance is a promise recorded; the adjustment is the promise kept. A distributor who takes advances but treats the adjustment as optional ends up with a ledger that is half-true.

## The Unadjusted-Advance Trap and What It Costs

Here is the failure the excerpt described. The retailer sends ₹40,000 as an advance. Weeks later the ₹40,000 bill is raised as a New Reference. Nobody performs the adjustment. Now the party ledger shows two things at once: a ₹40,000 advance credit and a ₹40,000 open bill. The net balance is correct, but the bill-level view lies.

The cost is real and quiet. Your outstanding report overstates open bills, so ageing looks worse than it is. The reminder you fire quotes a bill the retailer has effectively already funded, and he calls back annoyed, "paisa toh advance mein de diya tha bhai". Credibility on the collection call drops. Multiply that across a party base of 200 retailers and the receivables number your whole cash plan rests on is soft.

The cure is discipline: every advance gets adjusted against its bill the moment the bill exists. Advances are for money that genuinely has no bill yet, and they should be cleared, not parked forever. This is the same drift that turns [manual reconciliation](/blog/auto-reconciliation-tally/) into a nightly guessing game, an amount sitting loose because tying it to the right bill took one more step than anyone had time for.

## Keeping Advances Adjusted From the Phone

Advances pile up unadjusted for one practical reason: the person who took the payment is not the person sitting at Tally, and by the time the bill is raised the advance has slipped everyone's mind. The fix is to close the loop where the money moves, not hours later at a desk.

Takkada captures the receipt when it comes in, matches it to the correct open bill, and writes it back into Tally as the right entry, so an advance that should offset a bill gets adjusted automatically instead of parked. The owner sees the party's true outstanding on the phone, with advances already netted where a bill exists, because Takkada keeps [reconciliation matched on mobile](/blog/tally-payment-reconciliation-on-mobile/) rather than left for the 9 PM shift. When a retailer pays ahead on a UPI link, the money lands against his account and lines up to settle the next bill the moment it is raised.

Tally stays the system of record. The adjustment discipline that keeps a ledger honest just stops depending on someone remembering it three weeks later.

## Frequently Asked Questions

**Q: What is an advance received in Tally?**

A: An advance received in Tally is money a party pays before you have raised the invoice for it. You record it as a receipt tagged with the Advance reference type against that party, and Tally holds it as a credit on the party's ledger with no bill attached. It stays as an advance until you adjust it against a real bill.

**Q: How do I adjust an advance against a bill in Tally?**

A: After the invoice exists, open a receipt or the bill-settlement screen for the party, choose Against Reference, and select the open bill. Tally shows the party's pending advance; apply it against the bill. If the advance covers the bill fully the bill closes, and the advance drops off the ledger so the outstanding reads correctly.

**Q: What happens if I do not adjust an advance?**

A: The party's ledger shows both the advance credit and the open bill at the same time. The net balance is right, but the bill-level outstanding is overstated, ageing looks worse than reality, and a reminder may quote a bill the party has already funded. Unadjusted advances should be cleared against their bills promptly.

**Q: What is the difference between an advance and an On Account receipt?**

A: An advance is money received before any invoice exists, tagged Advance. An On Account receipt is money received when a bill may exist but you cannot yet say which one it settles. Both are holding states, and both should be re-tagged Against Reference to a specific bill once that bill is known, so the ledger stays clean.

**Q: Can advances be adjusted automatically from mobile?**

A: Yes. Takkada captures a receipt, matches it to the correct open bill, and writes it back into Tally as an Against Reference entry, so an advance that should offset a bill gets adjusted without manual end-of-day work. The owner sees the party's true outstanding on the phone, with advances already netted where a bill exists.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
