---
title: "Payment Gateway for MSME: What Actually Matters When You're a Distributor"
slug: "payment-gateway-for-msme-india"
meta_title: "Payment Gateway for MSME India: What Distributors Need"
meta_description: "A practical guide to payment gateway for MSME in India. UPI MDR, settlement times, B2B-specific features, and what to evaluate before signing."
primary_keyword: "payment gateway for msme india"
date: "2026-04-25"
updated: "2026-10-23"
author: "harsh"
category: "Market Reality"
excerpt: "A payment gateway processes the transaction between the customer's bank and yours. For an Indian MSME, the gateway is the layer that lets you accept UPI, cards, net-banking, and (increasingly) BNPL on a single integration. Razorpay, Cashfree, PayU, and Paytm for Business are the dominant gateways serving the MSME and SMB segment."
---

The right payment gateway for an MSME distributor in India is chosen less on the headline fee and more on settlement speed, reconciliation and how well it handles B2B invoices. On fees, person-to-merchant UPI from a bank account carries 0% MDR at any amount, while cards, net banking, and wallet or RuPay credit payments above ₹2,000 can carry charges. Settlement varies from same-day to two working days, which matters to a distributor paying suppliers on fixed dates. The questions that decide the choice come after the payment. Can each payment be tied to a specific invoice? Does the gateway give a reference you can match against Tally? Does it handle part-payments and one payment covering several bills? Without those, the gateway collects the money and the accountant still matches it by hand every evening. This guide lists what to evaluate before signing, with the questions to ask each provider and how the answers turn into hours saved or lost.

## Key Highlights

- Person-to-merchant UPI from a bank account is zero-MDR at any amount; the ₹2,000 line applies to wallet (PPI) payments over UPI, and some gateways add their own platform fee on UPI, so ask for every charge
- Settlement times for Indian MSME-focused gateways range from T+0 (instant) to T+2 working days; the difference is meaningful for cash-flow-tight distributors
- The right payment gateway for an MSME distributor is decided less by transaction fee and more by reconciliation API quality, B2B invoice support, and integration with the rest of the stack

## In This Article

- What a payment gateway for MSME actually does
- The four major Indian gateways MSMEs use
- What a distributor should evaluate
- Hidden costs nobody talks about in the sales pitch
- A practical comparison

## What a payment gateway for MSME actually does

A payment gateway processes the transaction between the customer's bank and yours. For an Indian MSME, the gateway is the layer that lets you accept UPI, cards, net-banking, and (increasingly) BNPL on a single integration. Razorpay, Cashfree, PayU, and Paytm for Business are the dominant gateways serving the MSME and SMB segment.

For a distributor, the gateway is one of three pieces of the collections stack. The other two are the payment link layer (which generates per-invoice UPI links) and the reconciliation layer (which matches incoming UTRs back to invoices in Tally). A gateway alone is not a collection system; it is the rails the rest of the system runs on.

## The four major Indian gateways MSMEs use

Razorpay. Largest by Indian MSME merchant count. Strong API, deep documentation, supports UPI, cards, net-banking, EMI, BNPL. Settlement T+2 standard, T+1 on higher tiers. UPI from a bank account is zero-MDR; check whether a platform fee applies on top.

Cashfree Payments. Strong on B2B and on payouts. Robust reconciliation API. Used by many distributor-focused platforms (Takkada included) for the underlying gateway. Settlement T+1 standard, instant settlement available on premium plans. Payouts API is a meaningful advantage for distributors who also need to settle to suppliers.

PayU. Older, enterprise-leaning. Strong in card processing, weaker on UPI compared to Razorpay or Cashfree. Settlement T+2.

Paytm for Business. Strong UPI-native, large consumer brand. Best for businesses where buyers are already on Paytm. Settlement T+1 or T+0 with a Paytm Bank account.

For B2B distributor use cases specifically, Razorpay and Cashfree are the most common picks because of API depth and reconciliation features.

## What a distributor should evaluate

Five questions, in order of importance.

1. Does the gateway provide a per-invoice UPI link with embedded reference? Without this, your incoming UTRs come in without a way to tie them back to the originating invoice. The reconciliation problem is then yours to solve manually.

2. Does the gateway provide a real-time settlement webhook? When a payment lands in your account, you want to know within seconds, not on a daily settlement report. Webhook quality varies — Razorpay and Cashfree are strongest here.

3. What is the actual settlement time? T+0, T+1, T+2, or T+3 changes your cash-flow shape meaningfully. A distributor on tight working capital cannot afford T+3.

4. What is the MDR structure for B2B-sized payments? UPI from a bank account is zero-MDR at any amount, but wallet payments over ₹2,000 can carry up to 1.1% interchange and some gateways add a platform fee. For a distributor whose typical invoice is ₹20,000 to ₹2 lakh, the per-transaction fee at scale matters. Negotiate volume tiers.

5. Can I do payouts as well, not just collections? Many distributors also need to pay suppliers, salesmen, transporters, brand promoters. A gateway with a payouts API consolidates the stack.

## Hidden costs nobody talks about in the sales pitch

Three cost categories that show up after you sign.

Reconciliation API access. Some gateways gate the reconciliation API behind a higher tier. If the cheapest plan does not include it, the rest of your stack cannot match UTRs to invoices. Ask explicitly which plan includes the reconciliation API.

Webhook reliability and retries. Webhooks fail. A gateway with poor webhook reliability (intermittent delivery, no retry mechanism) means the reconciliation layer goes blind for hours, and the manual reconciliation work returns. Ask for the gateway's webhook delivery SLA.

Refund and chargeback handling. Distributor B2B refunds are rare but expensive when they happen. Some gateways charge ₹50 to ₹100 per refund processed; others bundle refunds free. Read the rate card carefully.

KYC and onboarding friction. MSME onboarding is regulated. Some gateways take 3 to 7 working days to activate; others are instant. If you need collections live this week, instant onboarding matters.

## A practical comparison

| Capability | Razorpay | Cashfree | PayU | Paytm for Business |
| --- | --- | --- | --- | --- |
| UPI per-invoice link | Yes | Yes | Yes | Yes |
| Reconciliation API on entry tier | Limited | Yes | Limited | Limited |
| Settlement (standard plan) | T+2 | T+1 | T+2 | T+1 |
| Instant settlement available | Yes (premium) | Yes (premium) | Limited | Yes (with Paytm Bank) |
| Payouts API | Yes | Yes (strong) | Yes | Yes |
| Fees on UPI (platform fee, wallet interchange) | Volume-tiered | Volume-tiered | Volume-tiered | Volume-tiered |
| MDR on cards (typical) | 2% | 1.95% | 2% | 1.99% |
| Webhook reliability | High | High | Medium | High |
| KYC onboarding speed | 1 to 3 days | 1 to 2 days | 2 to 5 days | 1 day |

(Pricing and settlement terms change; verify with each gateway before signing.)

## What about choosing a payment gateway for MSME at very small scale?

For a distributor under ₹2 crore turnover with under 30 invoices a month, gateway choice is less critical. Any of the four work. The reconciliation effort is small enough to handle manually. As you scale past ₹5 crore turnover and 200-plus monthly receipts, the reconciliation API quality, webhook reliability, and B2B-specific features matter more than the headline MDR number.

A Pune electricals distributor we know switched from PayU to Cashfree at the ₹8 crore turnover mark. Headline MDR went up by 0.05%. Reconciliation effort dropped by an estimated 12 hours a month because the API was cleaner. Net economic impact was strongly positive.

## What Takkada is, in one sentence

Takkada uses Cashfree Payments under the hood for collections and payouts, and adds the layer above the gateway — per-invoice UPI links, UTR-to-invoice matching with split-payment handling, and Tally posting — that turns a payment gateway into a collection system.

## Frequently Asked Questions

**Q: Is UPI free for MSME merchants in India?**

A: Person-to-merchant UPI paid from a bank account carries zero MDR at any amount. Wallet (PPI) payments over UPI above ₹2,000 can carry an interchange of up to 1.1%, and some gateways add their own platform fee on UPI, which is often negotiable at volume.

**Q: Do I need a payment gateway if I just want to accept UPI?**

A: For person-to-merchant UPI through a static QR (like a PhonePe Business or Paytm QR), you do not need a separate gateway. For per-invoice dynamic UPI links with embedded references, yes — that is gateway functionality.

**Q: How long does payment gateway onboarding take for an MSME?**

A: Razorpay and Cashfree typically activate in 1 to 3 working days for MSMEs with clean PAN, GSTIN and bank documents. PayU is slower; Paytm for Business is fast.

**Q: Can a payment gateway help with my GST compliance?**

A: Indirectly. A good gateway provides clean settlement reports tagged with GSTIN, which makes month-end reconciliation faster. It does not file your GSTR returns; that is your CA's work or a GST suvidha provider's.

**Q: Is the gateway's transaction fee tax-deductible for an MSME?**

A: Yes, payment gateway fees are a normal business expense and are deductible for income tax purposes. Verify with your CA based on your specific accounting setup.

## Internal Links

- Payment Collection App for Distributors India: The 2026 Reality
- Payment Link Tally Integration: Collect and Auto-Reconcile
- The Working Capital Problem for Indian Wholesalers in 2026

Takkada is built on top of Tally and uses Cashfree Payments as the underlying gateway, so Indian distributors get per-invoice UPI links, real reconciliation, and receipts posted back to Tally automatically. Book a free demo.
