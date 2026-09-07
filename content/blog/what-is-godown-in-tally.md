---
title: "What is a Godown in Tally?"
slug: "what-is-godown-in-tally"
meta_title: "What is a Godown in Tally? A Distributor's Guide"
meta_description: "A godown in Tally is a physical place your stock sits. What it records, how it differs from a stock group, and how distributors use it across branches."
primary_keyword: "what is godown in tally"
date: "2026-08-08"
updated: "2026-08-09"
author: "founder"
category: "How-To"
excerpt: "Most distributors meet the godown field the day an operator presses Enter through it. Understanding what it actually records is the difference between a location report you trust and one you stop opening."
---

A godown in Tally is a physical place where stock sits, and enabling godowns turns every inventory figure in your books from one number into a number per location. It is a master, created once under inventory info, and after that every stock movement asks which godown it belongs to. Tally Prime lets you rename the term to "Location" if your team says location rather than godown, and the behaviour is identical. A godown answers "where", which is a different question from the ones a stock group or a stock category answers, and confusing those three is the most common reason a location report comes out wrong. For a distributor with a main warehouse and two branch stores, godowns are how one company file holds three physical positions of the same item without splitting the ledgers. This article covers what a godown records, what it does not, and how it behaves once real vouchers start moving through it.

## Key Highlights

- A godown is a place, not a classification; one item can sit in five godowns at once with a different quantity in each
- Tally ships with a default godown called Main Location, and a half-used default is the usual source of stock that appears to exist nowhere
- Godown-wise closing stock only reconciles with reality if inward, outward and transfer vouchers all carry a location, invoices included

## In This Article

- What a godown records
- Godown, stock group, stock category: three different questions
- How to create a godown in Tally
- What happens to your vouchers once godowns are on
- Where godown-wise stock goes wrong
- Reading godown stock away from the desktop

## What a Godown Records

A godown holds a quantity of a stock item at a place. That is the whole model, and its simplicity is why it works.

Before godowns are enabled, your closing stock for an item is one number. After they are enabled, it is a set of numbers that add up to the same total: 40 cartons at the main warehouse, 12 at the Jorhat branch, 9 sitting in transit. Every inward voucher puts quantity into a godown, every outward voucher takes it from one, and a stock journal moves it between two.

Tally also allows a godown to be marked so its stock is excluded from the company's inventory valuation, which is how third-party or job-work locations are handled. Most distributors never need that. What they need is one godown per real place, named the way the team names it out loud.

## Godown, Stock Group, Stock Category: Three Different Questions

Three masters look similar in the Tally menus and answer completely different questions. Getting them straight once saves a year of confused reports.

| Master | Question it answers | Example |
|---|---|---|
| Godown | Where is this item lying | Guwahati Main, Jorhat Branch |
| Stock group | What family does this item belong to | Paints, Hardware, Lubricants |
| Stock category | What cross-cutting attribute does it have | Premium, Economy, Promo pack |

An item belongs to exactly one stock group. It can sit in many godowns at once. That difference is the practical one: a group is a property of the item, a godown is a property of each movement. When somebody says "the godown report is wrong", the cause is almost always a movement that was recorded without its location, not a master that was set up badly.

## How to Create a Godown in Tally

Enable multiple godowns in the company's inventory features first, otherwise the master will not appear in the menus. Then create one godown per physical place, from the inventory masters.

Three things to get right while you are there. Name each godown the way your staff says it, because that name shows up in every picker a busy operator will use in a hurry. Decide what happens to the default Main Location, either renaming it to your primary warehouse or retiring it deliberately. And enter opening stock godown-wise rather than as a single lump, because a lump opening balance makes every location figure wrong until your first physical count fixes it.

If you would rather not sit at the desktop for this, godowns can be created and edited from the phone as well, covered in [creating and managing godowns in Tally from mobile](/blog/create-godown-in-tally-from-mobile/).

## What Happens to Your Vouchers Once Godowns Are On

The day multiple godowns are enabled, stock vouchers change shape. A purchase asks which godown the goods came into. A sales invoice asks which godown the goods left. A delivery challan asks the same. A stock journal asks for both a source and a destination, which is how a branch transfer is recorded.

This is the point at which discipline decides whether the feature helps you. The field is often prefilled with the last-used godown, so an operator moving quickly will inherit the wrong location without noticing. Businesses that get clean location reports do one of two things: they train the counter team on what each godown means on the day the godowns are created, or they make the selection compulsory so a line cannot be saved without it. The billing side of this is covered in [godown on sales invoices and delivery challans](/blog/godown-on-sales-invoice-delivery-challan/).

## Where Godown-Wise Stock Goes Wrong

Across enough distributor books, the same three failures show up.

**Goods in transit belong nowhere.** Stock dispatched from the main warehouse on Monday and received at the branch on Thursday is missing from both locations for three days, unless a transit godown exists to hold it. Create one and use it.

**Invoices without a location.** Transfers get recorded carefully because somebody is watching the truck. Invoices get recorded fast because a customer is waiting. If the invoice carries no godown, outward movement drains from the wrong place and the branch figure drifts within weeks.

**The unretired default.** Main Location sits in every company file. Half the entries use it, half use the real warehouse godown you created, and the report shows an item in two places that are the same place.

None of these are Tally faults. They are consequences of a location field that has to be filled correctly by whoever is standing at the counter.

## Reading Godown Stock Away From the Desktop

Tally's godown-wise reports live where Tally is installed. For an owner who is at one branch and wants to know what another is holding, or a salesman at a retailer's counter who needs to know whether the item can be dispatched today, that location is the wrong one.

Takkada reads the godowns already defined in your Tally and puts [godown wise stock on mobile](/godown-wise-stock-on-mobile), with item-level drill-down and an as-of-date view. Quantities for a past date are the real historical quantities; the values beside them use the item's current rate, so read a backdated view as exact on units and indicative on rupees. The report mechanics are in [the godown-wise stock report on mobile](/blog/godown-wise-stock-report-tally-mobile/), and the wider branch setup is in [managing multiple branches in Tally with godowns](/blog/manage-multiple-branches-tally-godowns/).

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: What is a godown in Tally in simple terms?**

A: It is a physical place where your stock sits, recorded as a master in the company's inventory info. Once multiple godowns are enabled, every stock voucher records which location the goods moved into or out of, so closing stock becomes a figure per place instead of one company-wide number. Tally Prime allows the term to be renamed to Location.

**Q: What is the difference between a godown and a stock group?**

A: A godown answers where an item is lying. A stock group answers what family the item belongs to, such as paints or lubricants. An item sits in exactly one stock group but can hold quantity in several godowns at the same time, because the group is a property of the item and the godown is a property of each movement.

**Q: Is a godown compulsory in Tally?**

A: No. Multiple godowns are an optional inventory feature, and a company that stores everything in one place gets no benefit from turning them on. Enable them when stock genuinely sits in more than one location, such as a main warehouse plus branch stores, or when goods spend meaningful time in transit between your own places.

**Q: Can one stock item be in more than one godown?**

A: Yes, and that is the point of the feature. The same item can show 40 units at the main warehouse and 12 at a branch, with the total matching the company-wide closing stock. Movement between the two locations is recorded through a stock journal rather than a sale, so nothing is bought or sold in the process.

**Q: What is Main Location in Tally?**

A: Main Location is the default godown Tally creates so that inventory works before you define anything. If you enable multiple godowns, either rename it to your primary warehouse or stop using it entirely, because entries split between Main Location and a real warehouse godown produce reports that show one physical place as two.

**Q: How do I see godown-wise stock without opening Tally on the desktop?**

A: Takkada shows godown-wise stock on the phone, reading the same godowns and quantities from your Tally, with item drill-down and a view as of any past date. It is the same data your desktop reports hold, put in front of whoever is standing at the counter or at the branch rather than at the machine Tally runs on.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
