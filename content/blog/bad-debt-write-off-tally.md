---
title: "Bad Debt Write Off in Tally: When and How Distributors Should Do It"
slug: "bad-debt-write-off-tally"
meta_title: "Bad Debt Write Off in Tally: When and How to Do It"
meta_description: "When to write off a bad debt, the Tally journal entries, GST implications under Section 34, and the income tax treatment under Section 36(1)(vii)."
primary_keyword: "bad debt write off tally"
date: "2026-05-06"
updated: "2026-09-07"
author: "founder"
category: "How-To"
excerpt: "A bad debt write off is the accounting decision to remove an unrecoverable receivable from the books and recognise it as a loss. Most Indian distributors carry bad debts on their books for years longer than they should, partly out of hope and partly because the GST and income tax treatment is misunderstood. Both choices cost money."
---

A bad debt write off in Tally is the accounting entry that removes a receivable a distributor has concluded is unrecoverable and records it as a loss instead of an asset still sitting on the books. Most Indian distributors hold these balances for years longer than they should, partly out of hope that a defaulting retailer will eventually pay, and partly because the GST and income tax treatment of a write-off is genuinely confusing. Both habits cost money: an unrecoverable receivable inflates the books, distorts the aging report, and in GST terms may still sit as an output-tax liability that was never actually collected. The right time to write off is once a party has crossed a defined threshold, typically 180 days past due with no payment or promise on record, and the right way is a documented journal entry against a bad debts account, not a silent deletion from the ledger.

## Key Highlights

- A bad debt write off in Tally is recorded as a journal: Debit Bad Debts Expense, Credit the Party Ledger. This removes the receivable from the books and creates a deductible expense for income tax.
- Under Section 36(1)(vii) of the Income Tax Act, a bad debt is deductible in the year it is written off in the books, with no requirement to first prove it is irrecoverable. The CBDT clarified this in 2010, but many distributor accountants still wait for "proof" that does not need to exist.
- The GST treatment is asymmetric and surprises most distributors: a bad debt write off does not allow a GST refund on the GST paid at the time of the original supply. If the original sale was in GST, the GST is gone, regardless of the write off.

## In This Article

- What a bad debt write off actually means
- When a debt should be written off
- The Tally journal entries, with screenshots-style guidance
- Income tax treatment under Section 36(1)(vii)
- The GST asymmetry: why you cannot reverse the GST
- Provision for doubtful debts vs actual write off
- A Coimbatore industrial distributor's annual write-off rhythm
- Frequently asked questions

## What a bad debt write off actually means

When a retailer owes you ₹2,40,000 and you decide that money is not coming back, three things should happen in your books:

1. The receivable comes off the asset side of the balance sheet
2. A loss of ₹2,40,000 is recognised in the profit and loss account for the year
3. The corresponding tax effect (income tax deduction, GST treatment) is captured

Most distributors do step 1 informally (they stop chasing) but never do step 2 or 3. The receivable continues to sit on the balance sheet for years, the bank lines of credit are calculated on inflated receivables, and the income tax deduction that the law allows is not claimed.

The write off is the accounting act that closes the loop on all three.

## When a debt should be written off

There is no single rule, but a working set of triggers that most distributor accountants and auditors agree on:

**The debtor has been chased for more than 24 months with no movement.**
A receivable that has not seen a single payment in two years, despite reminders, calls, and at least one personal escalation, is functionally bad debt.

**The retailer has shut their shop or the business is wound up.**
This is unambiguous. No amount of waiting will produce the money. Write it off in the year of the closure.

**A legal case has been pursued and exhausted.**
You filed a recovery suit, you won or lost, and either way the practical chance of getting paid is over. Write off the unrecovered portion.

**The amount is small enough that further pursuit costs more than the receivable.**
Below roughly ₹15,000 to ₹25,000, the cost of legal action and accountant time exceeds the amount. If the retailer has stopped responding for 12+ months on this size, write it off.

The last category is the most controversial because some owners feel it sets a precedent. In practice, the small amounts are usually under 5% of the bad debt portfolio. Cleaning them up gives the accountant clarity on which receivables are genuinely worth pursuing.

## The Tally journal entries

The standard write-off entry in Tally Prime:

Path: Gateway of Tally → Vouchers → F7 (Journal)

The entry:

| Particulars | Debit | Credit |
| --- | --- | --- |
| Bad Debts Expense (Indirect Expense ledger) | ₹2,40,000 | |
| To [Party Name] (Sundry Debtor ledger) | | ₹2,40,000 |

Narration: Bad debt written off for [Party Name], invoice no. [INV-XXXX] dated [date], unrecoverable as per board / partner / proprietor decision dated [date].

After this entry, the party ledger shows zero balance for that invoice, the Bad Debts ledger shows ₹2,40,000 of expense for the year, and the receivables total drops by ₹2,40,000.

Two important practical points:

**Do not delete or alter the original invoice.**
The original sales voucher must stay intact. The write off is a separate event, not a correction. Auditors will look for both the original sale and the write-off entry.

**Maintain a separate "Bad Debts Written Off" ledger.**
Group it under Indirect Expenses. Keep it distinct from "Discounts Allowed" or "Rebates", which serve a different purpose and are treated differently for GST.

If the write off is partial (you collected ₹40,000 against a ₹2,40,000 invoice and gave up on the remaining ₹2,00,000), the entry covers only the unrecovered ₹2,00,000.

## Income tax treatment under Section 36(1)(vii)

Section 36(1)(vii) of the Income Tax Act, 1961, allows a deduction for "any bad debt or part thereof which is written off as irrecoverable in the accounts of the assessee for the previous year".

The key phrase is "written off in the accounts". Up to 2010, there was confusion about whether the assessee had to prove the debt was actually irrecoverable, or whether the write-off itself was sufficient. The Supreme Court's decision in TRF Ltd. v. CIT (2010) settled it: the assessee only needs to write off the debt in the accounts. Proof of irrecoverability is not required.

This is a meaningful clarification because many distributor accountants still operate on the older understanding that they need to "prove" the debt is bad before claiming the deduction. The current law does not require proof. The act of recording the write off in the books, in good faith, is enough.

Two conditions must be satisfied for the deduction:

1. The debt must have been included in the assessee's income in an earlier year (or in the same year). This is automatically true for credit sales because the sale was recognised as revenue when the invoice was raised.
2. The debt must be written off in the books of accounts for the year in which the deduction is claimed.

For most distributors, both conditions are satisfied by the journal entry described above. The deduction is then claimed in the income tax return for that year, reducing taxable profit by the bad debt amount.

## The GST asymmetry

Here is where most distributors get a surprise. The GST on a bad debt is not refundable.

When you originally raised the invoice for ₹2,40,000 (let's say ₹2,03,390 + ₹36,610 GST at 18%), you paid the ₹36,610 GST to the government via your GSTR-3B for that month. Whether or not you eventually got paid by the retailer, that GST has already been remitted.

Section 34 of the CGST Act allows a credit note to be issued for sales returns, post-supply discount, or deficiency in service. But a credit note can only be issued by 30 November of the year following the financial year of the original supply. Even within that window, a credit note is for genuine reduction of the supply value, not for a customer's failure to pay.

Bad debt is not "deficiency in supply". The supply happened, the goods left the godown, the GST liability arose at that moment. The customer's later failure to pay does not retrospectively reduce the value of the supply for GST purposes.

So the practical position is: you write off the gross amount (₹2,40,000) including the GST component. The income tax deduction is on the gross amount. The GST is gone.

This is why GST significantly raises the real cost of bad debt compared to the pre-GST regime. Under the old VAT/CST system, in some states, an analogous reversal was possible. Under GST, it is not.

## Provision for doubtful debts vs actual write off

A "provision for doubtful debts" is different from a write off. A provision is a precautionary entry, recognising that some receivables may not be recovered, without specifying which ones.

Tally entry for a provision:

| Particulars | Debit | Credit |
| --- | --- | --- |
| Provision for Doubtful Debts (P&L) | ₹X | |
| To Provision for Doubtful Debts (Balance Sheet liability) | | ₹X |

The crucial tax point: a provision is generally not deductible for income tax under Section 36(1)(vii). Only an actual write off is deductible. So if your accountant creates only a provision at year end, without an actual write off, the receivable stays on the books and the income tax deduction is not available.

For distributors, the cleaner practice is: review the aging report at year end, identify the specific receivables that meet the write-off criteria, and write each one off with an individual journal entry. This gives the income tax deduction in the year of write off and removes the receivables from the balance sheet.

## A Coimbatore industrial distributor's annual write-off rhythm

An industrial parts distributor in Coimbatore, ₹19 crore turnover, around 60 active accounts. Before 2024, the owner avoided writing off bad debts because it felt like "giving up". By March 2024, the receivables ledger had ₹38 lakh of debts older than 24 months, none of which had moved in 18 months.

The accountant ran an exercise in April 2024:

| Bucket | Receivable amount | Action |
| --- | --- | --- |
| Over 24 months, no movement, retailer still operating | ₹14 lakh | Final settlement attempts, then partial recovery |
| Over 24 months, retailer shut down | ₹11 lakh | Full write off |
| Over 24 months, legal case lost or settled | ₹6 lakh | Full write off |
| Over 36 months, small amounts under ₹25,000 | ₹2 lakh | Full write off |
| Over 24 months, in legal process | ₹5 lakh | Hold, do not write off until case closes |

Total written off in FY 2024-25: ₹19 lakh. Income tax deduction: ₹19 lakh, saving roughly ₹4.94 lakh in tax at 26% effective rate (corporate, including surcharge and cess for the relevant slab). GST already paid on the original supply: ₹2.9 lakh, gone, not refundable.

The owner reported two changes after the exercise. First, the bank's working capital line review went smoother because the receivables on the balance sheet now reflected actual recoverable amounts, not optimistic ones. Second, the accountant's mental load dropped because the chase list got shorter and more realistic.

## What Takkada is, in one sentence

Takkada flags receivables crossing 90 and 180 days in real time, helps distributors take the conversation to the right party at the right moment, and reduces how often the bad debt write off conversation needs to happen at all by collecting cash up front through UPI payment links.

## Frequently Asked Questions

**Q: Can I claim income tax deduction for a bad debt without first suing the customer?**

A: Yes. After the Supreme Court's decision in TRF Ltd. v. CIT (2010), the assessee only needs to write off the debt in the books. There is no requirement to first prove irrecoverability through legal action or any other formal process. The good-faith write off itself is sufficient for the deduction under Section 36(1)(vii).

**Q: Can I get the GST back when I write off a bad debt?**

A: No, not under the current GST law. The GST liability arises at the time of supply, regardless of whether the customer eventually pays. Section 34 allows credit notes for genuine reduction in supply value, but customer non-payment does not qualify. The GST component of a bad debt is a real economic loss that cannot be recovered from the government.

**Q: Should I write off in installments or all at once?**

A: Write off in the year the decision is made that the debt is unrecoverable. If you split it across years without reason, the deduction may be challenged. The practical rhythm most distributors follow is one write-off exercise per year, usually in the March quarter, after a structured aging review.

**Q: What documentation should I keep for a bad debt write off?**

A: A board resolution or partners' resolution authorising the write off, a copy of the aging report identifying the specific receivable, copies of reminders and any legal notices sent, and the journal voucher recording the write off. Auditors will typically ask for some or all of these. Income tax officers usually accept the write off if the documentation shows a reasonable process.

**Q: Can I reverse a bad debt write off if the retailer pays later?**

A: Yes. If a written-off debt is recovered later, the recovery is recorded as income in the year of recovery, in a ledger called "Bad Debts Recovered". The original write off is not reversed; instead, the recovery is treated as a fresh income event. This is taxable in the year of recovery.

## Internal Links

- Aging Report in Tally: How Distributors Read It and Act On It
- Cheque Bounce Recovery for Distributors: The Section 138 Playbook
- Credit Limit for Retailers: How Distributors Set, Enforce and Adjust It

Takkada helps Indian distributors using Tally collect payments, send WhatsApp reminders, and generate e-invoices, all from mobile. Book a free demo.

*This article is for general information only and does not constitute tax or legal advice. For any specific bad debt, GST, or income tax matter, consult a qualified chartered accountant.*
