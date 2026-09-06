---
title: "UPI MDR Charges in India: The 2026 Reality"
slug: "upi-mdr-charges-india-2026"
meta_title: "UPI MDR Charges India 2026: What You Pay"
meta_description: "UPI MDR charges in India explained for 2026: what P2M UPI actually costs, where RuPay credit-on-UPI carries MDR, and how a 0% MDR collection rail works."
primary_keyword: "upi mdr charges"
date: "2026-06-14"
updated: "2026-09-07"
author: "harsh"
category: "Market Reality"
excerpt: "A Dibrugarh distributor assumed all his UPI collections were free, then noticed a quiet ₹3-per-receipt fee on his collection app. Across 6,000 receipts a year that is ₹18,000 he never agreed to. UPI MDR charges are mostly zero, but the fine print is where distributors bleed."
---

UPI MDR charges in India remain 0% for person-to-merchant payments in 2026, a regulatory position that has held since 2020 and shows no sign of changing, so a distributor collecting through a genuine UPI rail should see no percentage deducted from any payment received. The complication is not the MDR itself, since that figure is genuinely zero, it is the fine print some apps add around it. A Dibrugarh distributor who assumed all his UPI collections were free noticed a quiet ₹3-per-receipt fee buried in his collection app's terms, which across 6,000 receipts a year added up to ₹18,000 he never explicitly agreed to when he signed up. That fee is not MDR by definition, since MDR specifically means a percentage of the transaction value, but it functions exactly like one from the distributor's point of view: money taken off every single payment received. The real 2026 reality is that the MDR question is settled at zero, and the actual due diligence a distributor needs is checking for exactly this kind of substitute per-transaction charge instead.

## Key Highlights

- UPI MDR charges on standard peer-to-merchant payments are zero, so a normal UPI collection from a retailer to a distributor carries no merchant discount rate
- RuPay credit card routed over UPI does carry MDR above a ticket threshold, which is the main exception distributors should know
- The bigger trap is not UPI MDR charges themselves but per-transaction app fees, say ₹3 a receipt, that are charged on top of a "0% MDR" headline

## In This Article

- What UPI MDR charges actually are in 2026
- Where UPI is genuinely zero
- The RuPay credit-on-UPI exception
- The per-transaction fee that imitates MDR
- How a 0% MDR rail keeps it clean
- Frequently Asked Questions

## What UPI MDR Charges Actually Are in 2026

UPI MDR charges are the merchant discount rate applied, if any, to a payment received over UPI. For the kind of collection a distributor runs, retailer pays distributor over UPI, the answer in 2026 is that the MDR is zero. Standard peer-to-merchant UPI does not carry a percentage cut the way a card payment does. So if someone tells you UPI collections are expensive because of MDR, the base case does not support that.

The reason this matters is that distributors collect overwhelmingly on UPI, not cards. If your UPI MDR charges are genuinely zero, the cost of collecting is a software cost, not a percentage of every rupee. That is a fundamentally cheaper structure as you scale, as the [0% MDR UPI collection guide for distributors](/blog/zero-mdr-upi-collection-for-distributors-india/) lays out across volumes.

## Where UPI Is Genuinely Zero

A normal flow looks like this: you raise an invoice, the retailer gets a UPI payment link, they tap and pay from their UPI app, and the money lands in your account in full. No card network sits in the middle, so there is no percentage to take. This is peer-to-merchant UPI, and its UPI MDR charges are zero.

This is the rail Takkada collects on. The claim is exact: 0% MDR on UPI collections, no transaction cap, no monthly fee. The ₹14,320 invoice is collected as ₹14,320, not ₹14,177 after a cut. How that link is attached to a Tally invoice is covered in the explainer on [payment link Tally integration](/blog/payment-link-tally-integration/).

## The RuPay Credit-on-UPI Exception

There is one genuine exception worth knowing. When a customer pays using a RuPay credit card linked to UPI, above a small-ticket threshold, that transaction does carry MDR, because a credit line and a card network are now involved. This is not the typical retailer-pays-from-bank UPI most distributor collections use, but it exists.

For a distributor, the practical takeaway is simple. Your bread-and-butter UPI collections, retailer paying from their bank account over UPI, have zero MDR. The credit-on-UPI case is a small minority and is the one place UPI MDR charges legitimately appear.

## The Per-Transaction Fee That Imitates MDR

Here is where distributors actually lose money, and it is not from real UPI MDR charges. Some collection apps advertise "0% MDR" and then charge a flat fee per transaction, for example ₹3 a receipt. Because it is a rupee figure rather than a percentage, they can still call it 0% MDR. The effect on your pocket is the same as a fee.

Run the math. A distributor with 6,000 receipts a year at ₹3 each pays ₹18,000. At 200 receipts a day, it is ₹600 a day and around ₹1,80,000 a year. On a ₹400 receipt, a ₹3 fee is effectively a 0.75% charge wearing a "0% MDR" label. So when comparing apps, the real question is not the headline MDR; it is whether there is any per-transaction fee at all. The [payment collection cost comparison for distributors](/blog/payment-collection-cost-comparison-india/) breaks down how these layers add up.

## How a 0% MDR Rail Keeps It Clean

A genuine 0% MDR rail has no percentage and no per-transaction fee. Takkada's 0% MDR on UPI collections, no transaction cap, no monthly fee means a receipt of any size lands whole, and there is no ₹3 hiding behind the headline. The software is funded by a flat annual subscription.

A clean rail also reconciles cleanly. When the amount received equals the invoice amount to the rupee, with no fee deducted, the receipt matches the invoice automatically. This is the difference between books that balance and a nightly hunt for missing paise, as the explainer on [auto-reconciliation in Tally](/blog/auto-reconciliation-tally/) shows.

## Frequently Asked Questions

**Q: What are UPI MDR charges in India in 2026?**

A: For standard peer-to-merchant UPI, where a retailer pays a distributor from their bank account, UPI MDR charges are zero. There is no percentage cut on these payments. MDR mainly appears on card transactions and on RuPay credit cards routed over UPI above a small-ticket threshold.

**Q: Do distributors pay MDR on UPI collections?**

A: On normal UPI collections, no. The base case carries zero MDR. Where distributors do pay is when an app adds a per-transaction fee, say ₹3 a receipt, on top of a "0% MDR" claim. That fee, not real UPI MDR, is what usually costs them.

**Q: Is RuPay credit card on UPI free of MDR?**

A: No. RuPay credit card linked to UPI does carry MDR above a small-ticket threshold, because a credit line and card network are involved. This is the main genuine exception, but it is a small share of typical distributor collections, which are bank-to-bank UPI.

**Q: How do I know if my UPI app charges a hidden fee?**

A: Check for any per-transaction charge in any name, even on a "0% MDR" plan. If the app deducts a flat rupee amount per receipt, you are paying a fee regardless of the MDR headline. A genuine 0% rail, like Takkada's, has no per-receipt charge at all.

**Q: Why does Takkada have zero UPI MDR charges?**

A: Takkada collects over peer-to-merchant UPI, where there is no card network taking a percentage, and funds the software with a flat annual subscription instead of a cut of each payment. So it is 0% MDR on UPI collections, no transaction cap, no monthly fee, with no per-transaction fee added on top.

Takkada is the only Tally-native distributor collection app in India with genuine 0% UPI MDR charges, no per-transaction fee, and receipts auto-matched back into Tally. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
