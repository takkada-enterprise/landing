---
title: "How to Reconcile a Bank Statement With Tally on Mobile"
slug: "how-to-reconcile-bank-statement-tally-mobile"
meta_title: "Bank Reconciliation in Tally on Mobile: Step-by-Step"
meta_description: "Bank reconciliation in Tally, step by step: the classic Banking > BRS flow, setting bank dates, and the faster mobile way to clear UPI receipts daily."
primary_keyword: "bank reconciliation in tally"
date: "2026-06-21"
author: "founder"
category: "How-To"
excerpt: "A Guwahati FMCG distributor sits down at 9 PM to match a ₹4,80,000 bank statement against 60 receipts in Tally, half of them UPI with only a UTR to go on. Here is the classic Tally bank reconciliation flow, step by step, plus the faster way to clear UPI receipts through the day so the night session shrinks."
---

## Key Highlights

- Bank reconciliation in Tally is the Banking > Bank Reconciliation screen, where you set the bank date on every voucher against the bank statement until the difference reads zero
- A distributor handling 40–60 UPI receipts a day can spend 45–90 minutes a night matching UTRs by hand; auto-matching collection receipts as the money lands cuts that nightly session to a quick review
- Takkada collects on UPI at 0% MDR on UPI collections, no transaction cap, no monthly fee, and posts the matched receipt voucher into Tally the moment the payment clears

## In This Article

- What bank reconciliation in Tally actually checks
- The classic Banking > Bank Reconciliation flow, step by step
- How to set bank dates against your bank statement
- Where UPI receipts make manual reconciliation slow
- The faster mobile way to clear UPI receipts daily
- A side-by-side comparison of manual BRS and auto-matched collections
- Frequently Asked Questions

## What Bank Reconciliation in Tally Actually Checks

Bank reconciliation in Tally is the act of matching what your books say against what the bank statement says, line by line, until the two agree. Tally keeps a "book balance" the moment you pass a receipt or payment voucher. The bank credits or debits your account on its own clock, sometimes the same day, sometimes a day or two later. The gap between those two timelines is what the Bank Reconciliation Statement, or BRS, closes.

A distributor running 30 to 60 retail collections a day feels this gap most at night. You raised the receipts through the day. The bank cleared them on its own schedule. By 9 PM you are sitting with a bank statement on one screen and Tally on the other, asking the same question for each line: did this ₹14,320 in the statement match the receipt I passed for that party, or is it still unmatched? That question, repeated 60 times, is the manual reconciliation session. The steps below walk the Tally-native way to do it, then the way to make most of it disappear.

## The Classic Banking > Bank Reconciliation Flow, Step by Step

Tally Prime has a dedicated reconciliation screen for every bank ledger. Here is the bank reconciliation in Tally flow, in order:

1. From the Gateway of Tally, go to **Banking > Bank Reconciliation**
2. Select the bank ledger you want to reconcile (your current account or OD account)
3. Tally shows every voucher posted to that bank ledger, with a column for **Bank Date** that is blank until you fill it
4. Open your bank statement for the same period, side by side
5. For each voucher that appears in the bank statement, enter the **Bank Date**, the date the bank actually cleared it
6. Leave the Bank Date blank for any voucher the bank has not yet cleared (a cheque in transit, a UPI receipt still pending)
7. Watch the **Balance as per Company Books** and **Balance as per Bank** figures at the bottom; the difference shrinks as you set dates
8. When every cleared line has a bank date and the difference reads the genuine in-transit amount, the reconciliation for that day is done

The discipline is in step 5 and step 6. A voucher with a bank date is reconciled. A voucher without one is still floating. The day your bank balance and book balance disagree by a number you cannot explain, this screen is where you find the missing line.

## How to Set Bank Dates Against Your Bank Statement

The bank date is the single field that does the work in bank reconciliation in Tally. Your voucher date is when you recorded the receipt. The bank date is when the money actually hit the account. They are often different, and that difference is normal.

A worked example. On 18 June a distributor in Dibrugarh passes a ₹14,320 receipt voucher for a retailer who paid by cheque. The cheque clears on 20 June. In the Bank Reconciliation screen, the voucher date stays 18 June and the bank date is set to 20 June. Until 20 June, that ₹14,320 sits as an unreconciled difference, which is correct, because the bank had not paid it yet.

Tally also auto-reconciles when you import the bank statement file directly. If your bank offers a statement in a format Tally can read, you can import it and Tally will match and stamp bank dates on the vouchers it recognises by amount and reference. UPI receipts are where this auto-matching gets thin, because the statement narration carries a UTR, not your retailer's name, and Tally has no way to know which party that UTR belongs to. That is the line you end up matching by hand. The piece on [what a UTR number is in a Tally payment](/blog/what-is-utr-number-tally-payment/) explains why that reference string is the hinge of every UPI match.

## Where UPI Receipts Make Manual Reconciliation Slow

A cheque is easy to reconcile because it carries the retailer's name and a clear amount. UPI is harder for a specific reason: by the time it reaches your bank statement, the retailer's identity is gone and all you have is a UTR and a rupee figure.

So the manual UPI reconciliation goes like this. You see ₹9,640 credited in the statement with a UTR. You open Tally, look at which parties owe roughly that amount, guess which one paid, and pass or match the receipt. When two retailers owe ₹9,640 on the same day, you are now phoning one of them to ask "bhai, aapne aaj paisa bheja kya?" just to know which ledger to credit. Multiply that by 40 UPI receipts and the 9 PM session stretches past an hour.

This is the part of bank reconciliation in Tally that the classic screen cannot speed up on its own, because the matching problem is upstream: the UTR was never tied to the party at the moment of payment. The fix is to capture that link when the money is collected, not reconstruct it at night. The breakdown on [Tally payment reconciliation on mobile](/blog/tally-payment-reconciliation-on-mobile/) walks through how that capture changes the night.

## The Faster Mobile Way to Clear UPI Receipts Daily

If the UTR is tied to the party and the invoice at the moment of collection, reconciliation stops being a nightly hunt and becomes a running tally through the day. Here is how that flow works on the phone:

1. You send the retailer a UPI payment link for the exact invoice amount, generated against that specific party in Tally
2. The retailer pays the link; the payment carries the UTR and is already attached to that party and invoice, because the link knew both
3. The receipt voucher posts into Tally automatically, matched to the right ledger, the moment the money clears
4. By the time you sit down at night, the UPI receipts are already reconciled; what is left is only cheques and the odd manual NEFT

This does not replace the Banking > Bank Reconciliation screen for your full bank statement. Cheques in transit, bank charges, and direct NEFTs you did not invoice still pass through the classic BRS flow. What changes is the volume. The 40 UPI lines that used to eat the night are matched as they arrive, so the manual session at the end of the day is a short review, not an hour of UTR detective work. The detail on [auto-reconciliation in Tally](/blog/auto-reconciliation-tally/) covers exactly which receipts get matched automatically and which still need your eye.

## A Side-by-Side Comparison of Manual BRS and Auto-Matched Collections

| What you do | Manual Banking > BRS | UPI auto-matched collections |
|---|---|---|
| Match a cheque clearing | Set bank date by hand | Set bank date by hand |
| Identify which party a UPI UTR belongs to | Guess by amount, sometimes phone the retailer | Already attached at payment time |
| Post the receipt voucher | Pass it manually after matching | Posts automatically on clearance |
| Time spent on 40 UPI receipts a night | 45–90 minutes | A short review |
| Full bank statement reconciliation | Yes, in Tally | Still in Tally for cheques and NEFT |
| Extra Tally licence needed | No | No |

The honest read on this table: the classic BRS screen is still where your full bank statement gets reconciled, and nothing replaces it for cheques and direct transfers. What auto-matched collections remove is the slowest, most error-prone part, the UPI lines where the party identity went missing. Get those matched at the moment of payment and the nightly reconciliation shrinks to the lines that genuinely need a human.

## Frequently Asked Questions

**Q: How do I do bank reconciliation in Tally step by step?**

A: Go to Gateway of Tally > Banking > Bank Reconciliation, select your bank ledger, and Tally lists every voucher posted to it. Open your bank statement alongside, and for each voucher the bank has cleared, enter the Bank Date, which is the date the money actually moved. Leave the bank date blank for anything still in transit. When the cleared lines all carry a bank date and the remaining difference equals your genuine in-transit amount, the reconciliation is complete.

**Q: Can I reconcile a bank statement in Tally from my mobile?**

A: Tally Prime is a Windows product with no native mobile reconciliation screen, so the full Banking > BRS flow runs on the office machine. What a Tally-native mobile app can do is match UPI collection receipts to the right party and post them into Tally as the money clears, which removes most of the nightly UPI matching. The classic statement reconciliation for cheques and NEFTs still happens in desktop Tally. The guide on [accessing Tally on mobile](/blog/how-to-access-tally-on-mobile-step-by-step/) explains the bridges between phone and the office machine.

**Q: Why does my Tally bank balance not match my bank statement?**

A: The two timelines differ. Your book balance updates the moment you pass a voucher; the bank updates when it clears the transaction, which can be a day or two later. Cheques in transit, UPI receipts not yet credited, bank charges you have not recorded, and direct credits you missed all create a gap. The Bank Reconciliation screen exists to find and explain each of those lines until the difference is only the genuine in-transit amount.

**Q: What is a UTR and why does it slow down UPI reconciliation?**

A: A UTR is the unique reference number every UPI and bank transfer carries. In your bank statement, a UPI credit shows the UTR and the amount but not the retailer's name, so you cannot tell which party paid without matching the amount or phoning them. That guessing is the slow part of UPI reconciliation. Capturing the UTR against the party at the moment of payment removes the guess.

**Q: Does auto-matching UPI receipts replace the Bank Reconciliation Statement in Tally?**

A: No. Auto-matching handles the UPI collection receipts, posting them to the correct party and ledger as they clear. Your full bank statement reconciliation for cheques, NEFTs, bank charges, and any payment you did not invoice still runs through the Banking > Bank Reconciliation screen in Tally. The two work together: fewer manual lines at night, same reliable BRS for everything else.

**Q: Will reconciling on the phone need a separate Tally licence?**

A: No. A Tally-native mobile layer connects to your existing Tally installation and posts matched receipt vouchers back into it, so there is no extra Tally licence. You keep your current Tally and your current bank reconciliation flow; the mobile side only feeds clean, party-matched UPI receipts into the books so fewer lines are left to reconcile by hand.

Takkada is the only Tally-native distributor collection app in India with genuine 0% MDR on UPI, matching UTRs to the right party and posting the receipt into Tally as the money clears, so the 9 PM reconciliation shrinks to a quick review. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
