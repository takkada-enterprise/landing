---
title: "Godown on Sales Invoices and Delivery Challans from Mobile"
slug: "godown-on-sales-invoice-delivery-challan"
meta_title: "Godown Wise Billing in Tally, from Mobile"
meta_description: "Stamp the godown on sales invoice and delivery challan lines from your phone. Why godown wise billing keeps branch stock honest, and how to make it compulsory."
primary_keyword: "godown wise billing tally"
date: "2026-08-08"
updated: "2026-08-08"
author: "founder"
category: "Tally Mobile"
excerpt: "Transfers get recorded carefully because a truck is standing there. Invoices get recorded fast because a customer is waiting. That difference is where branch stock goes wrong."
---

Godown wise billing in Tally means every stock-bearing line on a sales invoice or delivery challan records which location the goods left, and it is the single habit that keeps multi-branch stock figures honest. Distributors usually get transfers right, because somebody is standing next to a truck while it happens. Invoices are recorded quickly with a customer waiting, so the location field gets whatever was used last, and within a month the branch position has drifted away from the shelf. Sales are the largest outward flow in any distribution business, which makes the invoice the largest single source of error in a location report. Takkada stamps the godown on invoice and challan lines from the phone, writes it into Tally with the voucher, and can make the field compulsory for the whole company so a line cannot be saved without a location. This article covers how it works and what it fixes.

## Key Highlights

- Location accuracy is decided on outward documents, because sales move far more stock out than transfers move between locations
- The godown sits on the line rather than the voucher, so one invoice can dispatch from two locations when it genuinely does
- A company-level setting can require a synced storage godown on stock-bearing voucher lines, turning discipline into a rule

## In This Article

- Why the invoice decides your branch figures
- Godown on the line, not on the voucher
- Delivery challans and the dispatch that precedes the bill
- Making the godown compulsory
- What flows back into Tally
- The checks worth running monthly

## Why the Invoice Decides Your Branch Figures

Think about the volume of movement in a normal month. A distributor might raise a handful of branch transfers and several hundred invoices. Every one of those invoices takes stock out of somewhere.

If transfers carry locations and invoices do not, your location report is built from a small, accurate stream and a large, blank one. The result is predictable: branch stock looks higher than the shelf, the main warehouse looks lower, and the first physical count turns into an argument nobody can settle from the books.

This is why godown wise billing is not an advanced practice for large operations. It is the thing that makes the location feature work at all. The wider picture is in [managing multiple branches in Tally with godowns](/blog/manage-multiple-branches-tally-godowns/).

## Godown on the Line, Not on the Voucher

The location belongs on each stock line rather than once on the document, and that design matches how dispatch actually happens.

A retailer orders eight items. Six are at the branch and two have to go from the main warehouse. A single voucher with a single location would force somebody to either split the invoice artificially or record a dispatch that did not happen. Line-level locations let the document describe reality: six lines from the branch, two from the main warehouse, one bill to the customer.

Takkada carries the godown on invoice lines and challan lines in the app, so the person raising the bill sets the location as part of picking the item rather than as a separate step afterwards. What the underlying master records is covered in [what a godown is in Tally](/blog/what-is-godown-in-tally/). Raising a [delivery challan from mobile](/delivery-challan-from-mobile/), including a whole dispatch round at once, is covered on its own page.

## Delivery Challans and the Dispatch That Precedes the Bill

In a lot of distribution, goods leave before the invoice is finalised. The challan is the document that records that movement, and it is where the location stamp earns most of its value.

| Document | What it records | Why the location matters |
|---|---|---|
| Delivery challan | Goods physically leaving | The stock has moved; the report should show it now |
| Sales invoice | The sale and the tax | Ties the outward movement to the bill and the party |
| Stock journal | Movement between your own locations | Neither sale nor purchase, only a change of place |

If the challan carries the location and the invoice follows it, your stock position is right on the day the truck leaves rather than on the day the accountant catches up. Warehouse staff can be limited to their own locations for exactly these two documents, covered in [restricting staff to their own warehouse](/blog/restrict-staff-warehouse-access-tally/).

## Making the Godown Compulsory

Training works for a while. A rule works permanently, and Takkada carries a company-level setting that requires a synced storage godown on stock-bearing voucher lines.

Switched on, a line without a location cannot be saved. The operator picks a godown because the screen will not move on without one, and the location report stops depending on whether the counter was busy that afternoon.

Two things to do before you switch it on. Make sure every location that should be selectable actually exists as a master, including transit, so nobody is stuck without a valid option. And tell the team what each location means on the day the rule starts, because a compulsory field with unclear options produces confident wrong answers rather than blank ones. Creating those masters from the phone is covered in [creating and managing godowns in Tally from mobile](/blog/create-godown-in-tally-from-mobile/).

Single-location companies should leave this off. There is nothing to distinguish, and a compulsory field with one option is friction with no return.

## What Flows Back Into Tally

The location stamped on the phone travels with the voucher into your Tally, against the same voucher types your accountant already uses. On the desktop it appears as an ordinary entry with a godown on its lines, which is what makes the whole arrangement work with an existing set of books.

Tally stays the record. The phone is where the entry is made at the moment the goods move, by the person who knows what moved. Nothing is maintained in a parallel system, and no export or import step sits between the two, which is the reason the location figures on the phone and on the desktop agree.

## The Checks Worth Running Monthly

Three checks take a few minutes and catch most drift before it becomes a count.

Open the location view for each godown and compare a handful of fast-moving items against what is on the shelf. Persistent gaps in one direction usually mean outward documents with the wrong location rather than theft. The report side is covered in [the godown-wise stock report on mobile](/blog/godown-wise-stock-report-tally-mobile/).

Check whether the transit location is holding anything old. A transit balance that has not cleared is a receipt somebody never completed, or a short delivery nobody raised.

Look at whether anything is still posting to the default Main Location godown. If entries are landing there after you created real locations, somebody is pressing through the field, and that is a five-minute conversation rather than a month of drift.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Can I select a godown on a sales invoice in Tally?**

A: Yes. When multiple godowns are enabled, stock-bearing lines record which location the goods left, so one invoice can dispatch some items from a branch and others from the main warehouse. Takkada carries the same line-level godown on invoices raised from the phone, and the stamp travels into Tally with the voucher.

**Q: Why is godown wise billing important for a distributor?**

A: Because sales move far more stock out of your locations than transfers move between them. If invoices carry no location, the location report is built mostly from blanks, and the branch figure drifts within weeks. Getting the godown onto outward documents is what makes multi-location stock reporting usable rather than decorative.

**Q: Can I force staff to choose a godown on every line?**

A: Yes. A company-level setting requires a synced storage godown on stock-bearing voucher lines, so a line without a location cannot be saved. Create every location you need first, including transit, and explain what each one means when you turn the rule on, otherwise the field gets filled confidently and wrongly.

**Q: What is the difference between the godown on a challan and on an invoice?**

A: The challan records goods physically leaving, so its location stamp updates your stock position on the day the truck goes. The invoice records the sale and the tax against the party. When the challan carries the location and the invoice follows it, your books show the movement when it happened rather than when the paperwork was completed.

**Q: Does stamping a godown change my GST or invoice format?**

A: No. The godown records where the goods left from, which is an inventory attribute rather than a tax one. Your tax computation, invoice numbering and print format are unaffected. The only reports that change are the location-wise stock reports, which become accurate instead of partial.

**Q: We only have one location. Should we still use godowns?**

A: There is little to gain. A single-location company gets one figure per item either way, and making the field compulsory adds a step with no reporting benefit. Turn locations on when stock genuinely sits in more than one place, including a transit location if goods spend real time moving between your own premises.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
