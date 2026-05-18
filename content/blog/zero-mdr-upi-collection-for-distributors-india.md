---
title: "Zero MDR UPI Collection for Indian Distributors: What 0% Actually Means"
slug: "zero-mdr-upi-collection-for-distributors-india"
meta_title: "0% MDR UPI Collection for Distributors in India"
meta_description: "What 0% MDR on UPI collections means for an Indian distributor, how it works, and what it saves on ₹3 crore to ₹50 crore of annual receipts."
primary_keyword: "0 mdr upi collection distributor india"
date: "2026-05-18"
author: "Takkada Team"
category: "Collections"
excerpt: "A distributor in Pune collecting ₹8 crore a year on UPI through a 1% MDR gateway is paying ₹8 lakh annually for the privilege of moving his own money. Zero MDR is not a discount, it is a different payment architecture."
---

## Key Highlights

- Most payment-gateway-backed B2B collection tools charge 0.5%–1.5% MDR on UPI receipts. On ₹10 crore annual UPI collections, that is ₹5–15 lakh leaving the distributor's account every year
- 0% MDR UPI collection means the payment flows directly from the retailer's UPI handle to the distributor's UPI handle, with no gateway taking a percentage in the middle
- Takkada charges a flat annual platform subscription. The UPI collection rail itself has no per-transaction cost, no monthly cap, and no transaction-volume threshold

## In This Article

- What MDR is and why it exists
- How a typical "B2B collection app + payment gateway" stack works
- How a 0% MDR architecture works differently
- What 0% saves at distributor volumes
- What it does not change
- Frequently Asked Questions

## What MDR Is and Why It Exists

MDR stands for Merchant Discount Rate. It is the percentage of every transaction that a payment gateway, card network, or wallet keeps in exchange for processing the payment. When a retailer pays you ₹14,320 through a typical gateway, the gateway might take ₹143 (1%) and remit ₹14,177 to your bank.

This is invisible at the per-transaction level, which is why distributors often do not notice it. It becomes very visible at the annual level. A distributor collecting ₹10 crore on UPI through a 1% MDR product is paying ₹10 lakh a year. That is two salaries, or a small delivery vehicle, or six months of rent on a godown.

For card transactions and digital wallets, MDR is structurally required, because the rail genuinely costs money to operate. For UPI, the picture is different.

## How a Typical "B2B Collection App + Payment Gateway" Stack Works

A standard collection tool flow looks like this:

1. The collection app generates a payment link for the invoice
2. The retailer clicks the link, lands on a payment page hosted by a payment gateway (Razorpay, Cashfree, PayU, etc.)
3. The retailer selects UPI, pays through their UPI app
4. The payment gateway receives the money first, deducts its MDR, and remits the net amount to the distributor's bank account a day or two later
5. The collection app updates the invoice as paid and sends a receipt

The gateway in step 4 is what generates the MDR. It is a real third party, providing real infrastructure (PCI compliance, settlement banking, fraud monitoring), and it charges for that service. Some tools then add their own platform margin on top.

This architecture works. It is not wrong. But for a distributor collecting ₹5 crore to ₹50 crore a year on UPI, the cumulative MDR cost is the largest line item in the collections P&L, and it is paid forever.

## How a 0% MDR Architecture Works Differently

The UPI rail itself is free for person-to-person and most person-to-merchant transactions in India. There is no fee on a direct UPI transfer from a retailer's UPI app to a distributor's UPI handle.

A 0% MDR collection product is built around this structural fact:

1. The collection app generates a UPI link or QR code pointing directly to the distributor's own UPI handle (or a UPI-Collect request from the distributor's handle)
2. The retailer pays. The money flows directly retailer-UPI to distributor-UPI on the NPCI rail
3. The collection app monitors the distributor's UPI inflow, matches the incoming payment to the open invoice, and updates Tally
4. No gateway in the middle. No MDR.

The collection app is paid for through a flat annual subscription, not through skimming the payment rail. The economics of the product do not depend on transaction volume.

This is how Takkada works. It is not a trick or a launch promotion. It is the architecture.

## What 0% Saves at Distributor Volumes

The savings scale with annual UPI collections, not turnover.

| Annual UPI collections | At 0.5% MDR | At 1.0% MDR | At 1.5% MDR | At 0% MDR (Takkada) |
|---|---|---|---|---|
| ₹2 crore | ₹1,00,000 | ₹2,00,000 | ₹3,00,000 | ₹0 |
| ₹5 crore | ₹2,50,000 | ₹5,00,000 | ₹7,50,000 | ₹0 |
| ₹10 crore | ₹5,00,000 | ₹10,00,000 | ₹15,00,000 | ₹0 |
| ₹25 crore | ₹12,50,000 | ₹25,00,000 | ₹37,50,000 | ₹0 |
| ₹50 crore | ₹25,00,000 | ₹50,00,000 | ₹75,00,000 | ₹0 |

A ₹15 crore turnover distributor with 70% UPI collections pays ₹10,50,000 a year on a 1% MDR product. The Takkada annual subscription for that distributor is a small fraction of that number, and the rest is structurally saved.

## What It Does Not Change

Honest scope. 0% MDR is not a magic wand.

- It does not change credit period. If the retailer pays on day 45, they pay on day 45. The lever there is [DSO compression](/blog/days-sales-outstanding-distributor-india/), not MDR.
- It does not change the cost of cards or wallets. Card and wallet rails do have real cost. Takkada's 0% applies specifically to UPI receipts.
- It does not change Tally reconciliation effort if Tally is not connected. The auto-reconciliation benefit kicks in when [Tally is wired in](/blog/auto-reconciliation-tally/).
- It does not change retailer behaviour. A retailer who delays on principle will still delay. The lever there is structured reminders, not pricing.

What 0% MDR changes is the part of collections cost that compounds with volume. As the distributor grows, the saving grows. As collections shift more toward UPI (which they will, structurally), the saving grows.

## Frequently Asked Questions

**Q: Is 0% MDR legal?**

A: Yes. UPI rails are free of MDR for most merchant transactions by government and NPCI policy. The cost a typical gateway charges on UPI is the gateway's own margin, not a regulatory requirement. A product that does not route through a gateway does not need to charge that margin.

**Q: Is there a transaction cap above which MDR kicks in?**

A: On Takkada, no. A ₹500 receipt and a ₹5,00,000 receipt both have 0% MDR. There is no monthly cap, no daily limit, and no transaction-count threshold above which a fee starts. The flat annual subscription is the only cost.

**Q: How does Takkada make money then?**

A: Annual platform subscription, paid by the distributor. The subscription covers the platform, the Tally integration, the mobile app, the WhatsApp reminders, and the support. The payment rail itself is not where the revenue comes from.

**Q: What about cards and wallets?**

A: If a retailer insists on paying by card or wallet, that transaction will carry the underlying rail's actual cost (typically 1–2% for cards, varies for wallets). Takkada does not charge a platform margin on top of that. The 0% specifically applies to UPI, which is where ~70% of distributor collections already flow in 2026.

**Q: Does this work for high-value B2B transactions, say ₹2 lakh per invoice?**

A: Yes. UPI in India supports transactions up to ₹2 lakh per transaction for retail use, and higher for verified merchants under the recent NPCI revisions. For invoices above that, the retailer can pay in two or three UPI transactions, or use NEFT/RTGS which is also free of MDR for most banks.

**Q: How quickly does the money land in my bank account?**

A: UPI is real-time. The money is in the distributor's bank account within seconds of the retailer completing the payment. Settlement is not T+1 or T+2 as it is with some card gateways.

Takkada is the only Tally-native distributor collection app in India with 0% MDR on UPI. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
