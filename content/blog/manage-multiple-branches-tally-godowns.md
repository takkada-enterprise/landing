---
title: "How to Manage Multiple Branches in Tally with Godowns"
slug: "manage-multiple-branches-tally-godowns"
meta_title: "Manage Multiple Branches in Tally with Godowns"
meta_description: "Make each branch a godown and every movement carries its location. How distributors run multi-branch stock, transfers and billing from Tally on a phone."
primary_keyword: "manage multiple branches tally"
date: "2026-08-08"
updated: "2026-08-09"
author: "founder"
category: "How-To"
excerpt: "One company file, three locations, and no way to see what the branch is holding without ringing the branch. Godowns are how Tally already answers that, and the phone is where the answer becomes useful."
---

To manage multiple branches in Tally, you make each branch a godown, and every stock movement then carries the location it happened in. Tally supports this natively: godowns are its way of holding one item in several places, so a single company file can carry a main warehouse, two branch stores and a transit location without splitting your books or your GST returns. The setup is the easy half. The difficulty is that the godown-wise view sits on the desktop where Tally is installed, so an owner standing in one branch cannot see what the other branch is holding, and a branch operator cannot record a transfer without calling the office and waiting. Takkada reads those same godowns from your Tally and puts per-location stock, branch transfers and godown-stamped billing on the phone, with each staff member restricted to the warehouses you allow. This article covers the setup, the daily use, and where multi-branch stock quietly goes wrong.

## Key Highlights

- A branch modelled as a godown keeps one company file, one GSTIN-level return and one ledger set, while every stock movement still carries the location it happened in
- The godown-wise stock view is a desktop report by default, which is why the branch phone call survives in businesses that set godowns up correctly years ago
- Warehouse-scoped staff access limits stock movements to named godowns, so a branch operator transfers and views only his own location's stock

## In This Article

- What a godown is, and why a branch is one
- Setting your branches up as godowns
- Seeing branch stock without ringing the branch
- Moving stock between branches
- Putting the godown on invoices and delivery challans
- Giving a branch operator access to one warehouse
- Collecting money across branches

## What a Godown Is, and Why a Branch Is One

A godown in Tally is a physical place stock can sit. Tally calls it a godown, some businesses call it a location, and Tally Prime lets you rename the term to "Location" if that reads better to your team. Whatever it is called, it is the field that answers "where is this item", and enabling it turns every inventory number in your books from one figure into a figure per place.

For a distributor with branches, this is the right model far more often than the alternative. The alternative is a separate company file per branch, which means separate ledgers, separate outstanding, separate everything, and a month-end where somebody consolidates by hand. If your branches operate under one GSTIN and one legal entity, godowns keep the books together and still tell you where the goods are. Running genuinely separate legal entities is a different question, and it is covered in [managing multiple businesses from one Tally mobile app](/blog/multi-business-tally-mobile-app/).

The practical test is simple. If a branch is a place where your stock physically sits and moves, it is a godown. If it files its own return under its own GSTIN, it is a company.

## Setting Your Branches Up as Godowns

The Tally-side setup takes an afternoon and is worth doing carefully, because the names you choose here follow you into every report afterwards.

Turn on multiple godowns in the company's inventory features, then create one godown per physical location. Give each a name a human would say out loud, "Guwahati Main", "Jorhat Branch", "Tinsukia Store", rather than codes only the accountant remembers. Tally keeps a default godown called Main Location; either rename it to your primary warehouse or leave it and stop using it, because a half-used default godown is where mystery stock accumulates.

Two decisions matter more than they look:

| Decision | Why it bites later |
|---|---|
| Whether opening stock is entered godown-wise | Enter it as one lump and every location figure is wrong until the first physical count |
| Whether transit stock gets its own godown | Goods on a truck between branches are either in two places or in none, and a transit godown is the honest answer |

Once godowns exist, every stock voucher asks which one. That is the point. It is also the moment operators start pressing Enter through the field, so tell the branch team what each godown means on the day you create them.

## Seeing Branch Stock Without Ringing the Branch

Here is the pattern that survives in almost every multi-branch distributor. The godowns are set up correctly, the entries are being made correctly, and the owner still calls the branch to ask what is lying there, because the report that would answer him is on a desktop in the other office.

Takkada puts [godown wise stock on mobile](/godown-wise-stock-on-mobile). You pick a location, you get its items with quantity and value, you tap an item to see how it is spread across your other godowns, and you can ask the same question as of a past date instead of only today. That last part is what makes a stock argument end. The full mechanics are in [the godown-wise stock report on mobile](/blog/godown-wise-stock-report-tally-mobile/), and the plain item-level view without locations is the [stock summary report](/blog/stock-summary-report-tally-mobile/).

One honest caveat, because it changes how you read the number. Quantities as of a past date are the real historical quantities. The values shown against them use the item's current rate, so a backdated view is accurate on units and indicative on rupees. For availability questions, which is what a branch view is mostly used for, quantity is the answer you needed anyway.

## Moving Stock Between Branches

A branch transfer in Tally is a stock journal: quantity out of one godown, the same quantity into another, no sale, no GST implication when it stays inside the same GSTIN. Every distributor with branches does this weekly, and in most of them it happens on paper first and reaches Tally days later.

Takkada records the transfer from the phone. You choose the source godown and the destination godown, pick items, enter quantities, and save. The stock journal goes back into your Tally against the same voucher type your accountant already uses, so the desktop shows it as a normal entry rather than something imported from outside. The person doing the loading can record it while the goods are being loaded, which is the only time anybody actually knows the quantity.

The step-by-step version, including how the unit of measure is handled, is in [stock transfer between godowns from mobile](/blog/stock-transfer-between-godowns-tally-mobile/).

## Putting the Godown on Invoices and Delivery Challans

Stock leaves a specific place when you sell it. If the invoice does not say which godown, your per-location stock drifts away from reality within a month, and no amount of careful transfer entry fixes it.

Takkada stamps the godown on sales invoice lines and delivery challan lines from the phone, and the stamp flows into Tally with the voucher. For companies that want the discipline enforced, godown selection can be made compulsory per company, so a line cannot be saved without a location. The billing side is covered in [godown on sales invoices and delivery challans](/blog/godown-on-sales-invoice-delivery-challan/).

This is the part branch businesses skip and then spend a physical stock count fixing. The invoice is the largest single source of outward movement in the books. If it carries no location, the location view is decoration.

## Giving a Branch Operator Access to One Warehouse

The owner sees everything. The Jorhat storekeeper should see and move Jorhat stock, and should not be able to issue a transfer out of the Guwahati warehouse because a screen let him.

Takkada lets you restrict a team member to named godowns for stock movements, which covers stock journals and delivery challans. A restricted member sees his own godowns in the pickers, and lines against any other location are refused at the server rather than merely hidden in the app. Scope this honestly when you plan your roles: the restriction governs stock movements today, so it is the right control for warehouse and dispatch staff, and it is not a way to partition who sees which sales. The full setup, and what it does not cover, is in [restrict staff to their own warehouse](/blog/restrict-staff-warehouse-access-tally/). For limiting a field salesman to his own parties and orders instead, see [restricting salesman access in Tally](/blog/restrict-salesman-access-tally/).

## Collecting Money Across Branches

Multi-branch businesses collect money in more places than they can watch. A retailer pays the Jorhat branch in cash, someone at the counter writes it in a notebook, and the entry reaches Tally when the branch accountant next opens it.

Takkada puts a UPI payment link on the invoice itself, so the retailer pays from wherever he is and the receipt reconciles back into Tally against the right bill. Collection carries 0% MDR on UPI, with no transaction cap and no monthly fee, which matters when a branch network is pushing a few crore a month through small ticket payments. The branch stops being a place where money waits for someone to record it.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Should each branch be a separate Tally company or a godown?**

A: If the branches trade under one legal entity and one GSTIN, make each branch a godown. You keep one company file, one set of ledgers and one consolidated outstanding, while every stock movement still records its location. Create separate companies only when a branch is a separate legal entity filing its own returns, because consolidation across company files is manual work every month.

**Q: How do I enable multiple godowns in Tally?**

A: Turn on the multiple godowns option in the company's inventory features, then create one godown per physical location under the inventory masters. Tally Prime lets you rename the term to Location if your team says location rather than godown. After that, stock vouchers ask which godown a movement belongs to, and godown-wise reports become available.

**Q: Can I see godown-wise stock on my phone?**

A: Yes. Takkada reads the godowns already defined in your Tally and shows stock by location on the phone, with item-level drill-down and an as-of-date view for past positions. Quantities for a past date are historical; the values beside them use the item's current rate, so read a backdated view as exact on units and indicative on value.

**Q: How is stock transferred between two branches in Tally?**

A: Through a stock journal that takes quantity out of the source godown and puts the same quantity into the destination godown. It is a movement rather than a sale, so no GST arises when both locations sit under the same GSTIN. Takkada records the same stock journal from the phone and writes it back into Tally against your existing voucher type.

**Q: Can I stop a branch employee from moving another branch's stock?**

A: Yes. A team member can be restricted to named godowns for stock movements, covering stock journals and delivery challans, and any line against a location outside his list is rejected on the server. This is the control for warehouse and dispatch staff. It governs stock movements rather than who can see which sales.

**Q: Does godown-wise accounting change my GST returns?**

A: No. Godowns record where goods physically sit. Your returns are filed at the registration level, so moving stock between two godowns under the same GSTIN creates no tax event. A movement between locations registered under different GSTINs is a different transaction and is billed as such.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
