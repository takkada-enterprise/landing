---
title: "Credit Limit for Retailers: How Distributors Set, Enforce and Adjust It"
slug: "credit-limit-for-retailers"
meta_title: "Credit Limit for Retailers: How to Set and Enforce It"
meta_description: "A practical method for setting retailer credit limits, enforcing hold-on-dispatch, and revising up or down based on payment history."
primary_keyword: "credit limit for retailers"
date: "2026-05-06"
updated: "2026-09-07"
author: "founder"
category: "How-To"
excerpt: "A credit limit is the maximum amount a distributor is willing to let a single retailer owe at any point in time. It is the most under-used risk tool in Indian B2B distribution. Most distributors set credit limits informally in their head, never enforce them in their software, and only react when a party is already 90 days overdue on a large amount."
---

A credit limit for a retailer is the maximum outstanding balance a distributor is willing to let that single party carry at any point in time, and setting one properly means fixing a number based on the retailer's order history and payment pattern, not a round figure picked out of habit. It is the most under-used risk tool in Indian B2B distribution: most distributors set credit limits informally in their own head, never enter them into their billing software, and only react once a party is already 90 days overdue on a large amount, by which point the exposure has already been taken. Enforcing a limit means the system itself blocks or flags a new order once a retailer's outstanding crosses the ceiling, rather than leaving that judgment call to a salesman under pressure to hit a number at month-end. Adjusting it means raising the limit only after a retailer has shown a clean payment record over several cycles, never before.

## Key Highlights

- A credit limit is not a credit term. The term is "30 days net". The limit is "you can never owe me more than ₹2.5 lakh at one time, regardless of when each invoice is due". Most distributor problems come from confusing the two.
- A workable formula for first-time limits: take the retailer's average monthly purchase, multiply by 1.5, and round to the nearest ₹25,000. Adjust up or down once you have 6 months of payment history.
- The single hardest decision is the hold-on-dispatch rule. Most distributors flinch at the idea of refusing to send goods to a long-standing party. The ones who set the rule and stick to it have notably lower DSO and almost no bad debt.

## In This Article

- Credit limit vs credit term: why the distinction matters
- How most distributors set limits today (and why it fails)
- A formula approach for setting first-time limits
- When and how to revise a limit
- Hard stop vs soft stop on dispatch
- A Bhopal electronics distributor's credit limit overhaul
- Frequently asked questions

## Credit limit vs credit term

The credit term is when each invoice is due. The credit limit is how much the customer is allowed to owe in total at any one moment.

A retailer on net 30 terms could, in theory, owe you a different amount every day depending on how often they buy and how often they pay. Without a limit, that amount can drift up to anywhere. A retailer who buys ₹40,000 every Monday and pays in 45 days is sitting at ₹1.6 lakh outstanding at all times. If their payment habits slip, that number climbs without anyone noticing until the aging report comes in 60 days later.

A credit limit caps that exposure. "You can owe me up to ₹2 lakh. If a new invoice would push you past that, dispatch holds until you clear some part of the balance." The retailer can buy as often as they want. They just have to keep the running balance under the cap.

## How most distributors set limits today

In practice, the limit is usually one of three things. First, a number the owner has carried in his head for years, never written down, and only invoked when something goes wrong. Second, the credit limit field in Tally that nobody fills in or reviews. Third, the salesman's gut, applied at the point of sale, with no consistency across parties.

All three fail for the same reason: nothing automatic happens at the moment a new invoice would breach the limit. The voucher gets created, the goods go out, and the breach only becomes visible weeks later when the aging report is pulled.

## A formula approach for setting first-time limits

For a new retailer with no payment history, a workable starting point:

Limit = Average expected monthly purchase × 1.5, rounded to nearest ₹25,000

So a retailer who is expected to buy around ₹80,000 a month gets a limit of ₹1.25 lakh (80,000 × 1.5 = ₹1.2 lakh, rounded up). This gives them roughly 45 days of headroom on net-30 terms, which absorbs normal payment delays without leaving the distributor over-exposed.

For a returning retailer where you have 6 or more months of data, the formula shifts:

Limit = (Average monthly purchase × 1.5) + (one standard deviation of payment delay × average monthly purchase / 30)

That second term sounds complicated. In practice it just means: if a retailer pays consistently on day 30, their limit should be tighter. If they pay anywhere between day 25 and day 50 with no pattern, they need more headroom on the limit because they are less predictable. Most distributor accountants do not need to compute this formally. The rule of thumb is: predictable payers get tight limits, erratic payers get looser limits but stricter dispatch holds.

For the top 5 parties, treat the limit as a negotiation, not a calculation. These parties usually have enough volume to demand custom terms. Set the limit based on what you can absorb if they default, not what they ask for.

## A reference table for sizing limits

| Retailer profile | Avg monthly purchase | Suggested first-time limit |
| --- | --- | --- |
| Small retailer, new account | ₹15,000 | ₹25,000 |
| Mid-tier retailer, new account | ₹50,000 | ₹75,000 |
| Mid-tier retailer, 6 months good history | ₹50,000 | ₹1,00,000 |
| Large retailer, new account | ₹2,00,000 | ₹3,00,000 |
| Large retailer, 1 year good history | ₹2,00,000 | ₹4,00,000 |
| Top 5 party, custom-negotiated | Variable | Owner-set, with collateral or PDC if possible |

These are starting points, not rules. A category with 7-day credit terms (daily-movement FMCG) needs much tighter multiples than a category with 60-day terms (electronics, industrial).

## When and how to revise a limit

A limit is not set once and forgotten. Three trigger events should prompt a review.

**Six months of payment history.**
If the retailer has paid on or near the due date 5 of 6 months, the limit can move up by 25 to 33%. If they have slipped past 60 days even once, the limit should hold or come down.

**A single late payment past 75 days.**
This is a structural signal, not a one-off. The limit drops to roughly 70% of the existing limit, the retailer is moved to weekly reminder cadence, and dispatch holds until the overdue amount clears. This is non-negotiable in disciplined operations.

**A volume jump request.**
The retailer asks to place an order that would breach the existing limit. This is a moment of real information. If their business is genuinely growing, the limit should rise (with an updated payment history check). If they are stretching credit because they are squeezed, you find out before, not after.

## Hard stop vs soft stop on dispatch

Once the limit is set, the question is what happens at the moment a new invoice would breach it.

A **hard stop** means the system blocks the voucher. No invoice is generated, no goods leave the godown, until either the existing balance is cleared down or the owner explicitly overrides the block. This is the cleanest enforcement, and the one with the lowest bad debt rate, but it requires the limit to be in software, not in someone's head.

A **soft stop** means the voucher is flagged with an alert. The salesman, the accountant, and the owner all see the breach. The dispatch can still happen, but it has to be a conscious decision by someone with authority to take the risk.

Most distributors run a hybrid: hard stop for retailers under 12 months old or with any past late payment, soft stop with owner approval for established parties. The transition from soft to hard for a particular party is itself a signal: it usually happens after the first 60+ day breach.

The mistake is having no stop at all. The voucher gets raised, the goods go out, and the breach is invisible until reconciliation surfaces it weeks later.

## A Bhopal electronics distributor's credit limit overhaul

A consumer electronics distributor in Bhopal, ₹14 crore turnover, 78 retail parties. The owner had carried credit limits in his head for 12 years. No limits were filled in Tally. Dispatch happened on the salesman's word.

In December 2025, two parties simultaneously failed to pay on amounts of ₹6.4 lakh and ₹3.8 lakh. Both had been allowed to climb to roughly 4x their normal monthly purchase. The owner absorbed ₹4.1 lakh of bad debt across the two and used the moment to overhaul the system.

What changed:

1. Every active retailer got a limit, written down, calculated using the formula above
2. Limits were entered into the credit limit field in Tally for every party
3. A hold-on-dispatch alert was set up for any voucher that would breach the limit
4. A monthly review of limits, anchored to the aging report, was added to the partner meeting

Six months later: total receivables down 22%, DSO down from 68 to 51, and zero new instances of a single party owing more than 1.6x their monthly purchase. The owner reported that the hardest part was not the system, but the conversations with two long-standing retailers who had been used to drifting up to ₹3 lakh exposure and now had to hold under ₹1.5 lakh. Both adjusted within a quarter.

## What Takkada is, in one sentence

Takkada reads credit limits straight out of Tally, fires a real-time alert the moment a new invoice would breach the limit, and gives the owner a one-tap dispatch hold or override on the phone, so the distributor never finds out about a credit breach two weeks after the goods have already left.

## Frequently Asked Questions

**Q: Should I tell the retailer their credit limit?**

A: Yes, if you want the limit to actually work. Retailers who do not know their limit are surprised when dispatch holds and treat it as hostility. Retailers who know their limit treat it as a parameter and plan around it. The conversation is short: "Your account is set up at ₹2 lakh outstanding. If you want to place an order that would push you past that, clear part of the balance first or we will need to talk about an increase."

**Q: Can I set credit limits per category instead of per retailer?**

A: You can, but it is usually less effective. Two retailers buying the same SKU mix can have very different payment behaviours. Per-retailer limits track risk; per-category limits track exposure but not risk. Most distributors run per-retailer.

**Q: What if a retailer breaches the limit on a single large order?**

A: Two options. First, ask for advance payment on the portion above the limit. Second, ask for a post-dated cheque or bank guarantee for the excess. Both are normal in Indian B2B and most retailers expect them on order sizes that double their usual exposure.

**Q: How often should I update credit limits?**

A: Set up an automatic 6-month review on every active party. Outside that, any payment delay past 75 days, any voucher breach, or any volume jump request should trigger an immediate review. Limits that go untouched for years are usually wrong by the time anyone looks at them.

**Q: Does Tally enforce the credit limit automatically?**

A: Tally has a credit limit field at the ledger master level and can warn when a voucher would breach it, but the warning is on the desktop, where many distributors do not have eyes on every voucher in real time. The warning is also easy to override silently. Effective enforcement usually requires a layer that pushes the alert to the phone, where the owner sees it the moment it triggers.

## Internal Links

- DSO for Distributors: How to Calculate and Reduce Days Sales Outstanding
- Aging Report in Tally: How Distributors Read It and Act On It
- The Working Capital Problem for Indian Wholesalers in 2026

Takkada helps Indian distributors using Tally collect payments, send WhatsApp reminders, and generate e-invoices, all from mobile. Book a free demo.
