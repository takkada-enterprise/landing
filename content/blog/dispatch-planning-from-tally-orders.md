---
title: "Dispatch Planning from Tally Orders: Load, Loading Sheet and Billing in One Flow"
meta_title: "Dispatch Planning from Tally Orders | Takkada"
slug: "dispatch-planning-from-tally-orders"
meta_description: "Dispatch planning from Tally orders: put pending orders on a van, print the loading sheet, key back what went out, then bill only what was delivered."
primary_keyword: "dispatch planning from Tally orders"
date: "2026-10-11"
author: "harsh"
category: "Distribution"
excerpt: "The order says 10 cartons. The van came back with 2. Here is how dispatch planning from your Tally orders keeps the bill matched to what actually left the godown."
---

Dispatch planning from Tally orders works as one flow in Takkada: you tick the pending sales orders that should go today, add them to a van, print the loading sheet, key back what actually left the godown, and bill the van from those keyed quantities. Orders entered in Tally and orders booked on the phone sit together on the picking list, grouped by shop, and by beat if your business uses beats. The loading sheet gives the godown a load list by item and the driver a drop slip per shop to get signed. When the van is back, the person at the godown changes only the lines that went short and picks a reason, such as No stock or Shop refused. The quantity that did not go stays pending for a later van. Then someone with the Sales Invoice right reviews one invoice per shop and creates them, and they reach Tally when the sync runs on the office computer.

## Where dispatch usually slips

A shop ordered 10 cartons, the godown had 8, the van left with 8, and somebody billed 10 from the order because nobody told the office. A week later the shop disputes the bill and the fix is a credit note. Dispatch makes "what went out" a number someone keys in before anyone bills.

## Step 1: pick from what is still pending

Open Dispatch from the home screen. The Orders tab lists the sales orders that still have quantity to send. Search a shop or an item, then tick an order, a shop or a beat and press Add to van.

An order already riding an open van stays on the list, greyed out and tagged with that van and its salesman, so two vans cannot carry the same order line. If your salesmen book orders in the field, [taking sales orders on mobile](/sales-order-on-mobile) is how those orders reach this list.

## Step 2: set up the van and print the loading sheet

On the van page, add the vehicle number, driver and salesman if you want them printed, and drag the drops into visiting order. Print the sheet and choose its blocks: a Load list with one row per item for the godown, a Load grid with drops down the side and items across, and Drop slips with one slip per shop for the driver. Drop 7 is the same shop on all three. A Dispatched column prints as blank boxes to write in.

When the goods are on board, press Van is loaded. From then, what is on that van has come out of everybody's pending list.

## Step 3: key back what went out

When the van returns, press Key back what went. Each line is pre-filled with the ordered quantity, so a full delivery saves in one press. On a short line you lower the number and answer Why short?: No stock, Vehicle full, Shop refused, Damaged or Other. Save what went out stays off until each short line has its reason.

The van then shows Still owed from this load, and that remainder stays pending for a later van. If a shop cancelled the rest, you can write it off with a reason, permanently.

## Step 4: bill the van

Make invoices opens Review invoices, with one invoice per shop at the quantity keyed back. Untick a shop to leave it for later, check each shop's voucher type and sales ledger, then create the invoices. Only a member with the Sales Invoice right can do this, so the godown keys back and the office bills.

If the office already billed the van's orders in Tally while it was out, the van shows Already billed in Tally once those bills have synced, and offers no second bill. An invoice made here can be deleted until it reaches Tally; after that, reversing it takes a credit note.

## What Dispatch leaves to you

There is no vehicle tracking, no suggested route and no capacity calculation. You decide what fits on the van, and the app records what actually went. The To buy tab lists what customers are still waiting for, item by item.

Trade-wise walkthroughs: [FMCG beat vans](/blog/dispatch-load-fmcg-beat-vans), [beverage trucks](/blog/dispatch-planning-beverage-distributors), [pharma same-day runs](/blog/dispatch-load-pharma-same-day-delivery) and [a step-by-step guide](/blog/how-to-build-load-print-loading-sheet).

## Frequently Asked Questions

**Q: Do I need to make the sales orders in Takkada?**

A: No. Sales orders entered in Tally and sales orders booked in Takkada both appear on the picking list once they have quantity left to send.

**Q: What happens to the quantity that did not go?**

A: It stays pending on the order and shows up for a later van. You can also write off a shop's remainder with a reason.

**Q: Does keying back change stock in Tally?**

A: No. Tally moves stock when the bill is made, and a bill made from the van uses the quantity you keyed back.

**Q: Can the godown staff make invoices?**

A: Only if they hold the Sales Invoice right. Without it they can build vans and key back, and the office makes the invoices.

## See it on your own orders

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will build a van from your own pending orders with you.
