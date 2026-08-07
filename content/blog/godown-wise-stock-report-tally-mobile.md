---
title: "Godown-Wise Stock Report from Tally on Your Phone"
slug: "godown-wise-stock-report-tally-mobile"
meta_title: "Godown-Wise Stock Report from Tally on Mobile"
meta_description: "See stock by location from your Tally on a phone, as of any date, with item drill-down. What the godown wise stock report shows and how to read its values."
primary_keyword: "godown wise stock report tally"
date: "2026-08-08"
updated: "2026-08-08"
author: "founder"
category: "Reports"
excerpt: "The question is always the same. How much of this item is lying at the branch, right now, and can I promise it today. The answer exists in Tally and sits on a desktop in another town."
---

A godown-wise stock report in Tally shows how much of each item is lying at each location, and on the phone it becomes the answer to the question that otherwise costs a call to the branch. In Tally Prime the report is reached from the stock summary by drilling into godowns, and it gives closing quantity and value per location, per item. The limitation is not the report. It is that the report opens only where Tally is installed, so the owner visiting a branch, the salesman standing at a retailer's counter, and the dispatch clerk loading a truck all have to ask somebody else. Takkada reads the same godowns from your Tally and shows stock by location on the phone, with item-level drill-down and a view as of any past date. This article covers what the report shows, how to read its value column honestly, and how the mobile view is used during the working day.

## Key Highlights

- The report answers one question well: how many units of this item are at this location, today or as of a chosen past date
- Quantities for a past date are the real historical quantities; the value beside them is computed at the item's current rate, so a backdated view is exact on units and indicative on rupees
- The location figures are only as good as the vouchers behind them, which means invoices and challans have to carry a godown too

## In This Article

- What a godown-wise stock report actually shows
- Reading the value column honestly
- The report on a phone, and who uses it
- Item drill-down across locations
- As-of-date and the stock argument it ends
- What makes the numbers trustworthy

## What a Godown-Wise Stock Report Actually Shows

The report is a matrix collapsed to a list. For each location, the items lying there with their closing quantity and value; for each item, the locations that hold it. Tally builds it from the same vouchers that produce your stock summary, filtered by the godown recorded on each movement.

That last clause is the whole dependency. A purchase brings quantity into a godown, a sale takes it out of one, a stock journal moves it between two. The report is arithmetic over those movements. It has no independent knowledge of where goods physically are, which is worth remembering when a figure looks wrong: the report is usually reporting your entries correctly.

The plain item-level view without locations is the [stock summary report](/blog/stock-summary-report-tally-mobile/), and the underlying master is explained in [what a godown is in Tally](/blog/what-is-godown-in-tally/).

## Reading the Value Column Honestly

Every stock report has two columns, and they are not equally reliable at a distance from today.

Quantity is a fact. Forty cartons were at the branch on the 12th of last month because the vouchers say so, and no later event changes that history.

Value is a computation, and in the mobile godown view it is computed as quantity multiplied by the item's current closing rate. For today's position that is the number you want. For a backdated position it is an indication rather than a historical valuation, because the rate applied is today's rate rather than the rate that ruled on the date you chose. If your rates have moved meaningfully since, the rupee figure for a past date will not match a historical valuation your accountant computes.

This matters most when somebody uses a stock screen for a closing-value question at year end. Use it for availability, spread and movement, which is what a branch view is opened for ninety times out of a hundred. For statutory valuation, the desktop report and your accountant's method remain the answer.

## The Report on a Phone, and Who Uses It

Three people open this view during a normal day, and each wants something different from it.

| Who | What they ask | What ends the question |
|---|---|---|
| Owner, at one branch | What is the other branch holding | Location list with quantity and value |
| Salesman, at a counter | Can I promise this item today | Item drill-down showing which godown has it |
| Dispatch or warehouse staff | What is here that should have moved | Location view filtered to their own godowns |

The dispatch case is the one that changes behaviour fastest, because it removes the phone call that used to interrupt whoever was in front of the Tally machine. A warehouse operator can be restricted to his own godowns, which is covered in [restricting staff to their own warehouse](/blog/restrict-staff-warehouse-access-tally/).

## Item Drill-Down Across Locations

The list view answers "what is at this branch". The drill-down answers the harder question, which is "where is this item".

Tap an item and you see how its quantity is spread across your godowns. A retailer wants 30 cartons, the branch has 12, and the main warehouse has 60. That single screen is what turns "let me check and call you back" into a delivery commitment made at the counter, with a [branch transfer](/blog/stock-transfer-between-godowns-tally-mobile/) raised the same afternoon to cover it.

For distributors carrying wide catalogues, this drill-down is the difference between a location report that is interesting and one that is used. Nobody scrolls a thousand-item list. Everybody looks up one item.

## As-Of-Date and the Stock Argument It Ends

The mobile view can be asked for a past date, and that capability settles a specific recurring fight.

A branch claims goods were never received. A principal's claim settlement needs the position on a particular day. A physical count from last month disagrees with the books and somebody wants to know what the books said at the time. Rather than reconstructing from the sales register, you set the date and read the location position as the vouchers had it then.

Carry the valuation caveat from earlier into any conversation you have with that screen. The units are historical, the rupee column is at current rate. Say which one you are quoting.

## What Makes the Numbers Trustworthy

A location report is downstream of voucher discipline, and three habits keep it honest.

Every outward movement carries a godown, including sales invoices and delivery challans. Businesses that stamp locations only on transfers watch their branch figures drift within a month, because sales are the larger outward flow by far.

Goods in transit have their own godown. Otherwise stock loaded on Monday and received Thursday is missing from both ends for three days, and somebody will report it as a discrepancy.

Opening stock was entered godown-wise. A single lump opening balance makes every location wrong until the first physical count, and the report gets blamed for it.

Get those three right and the location report stops being a thing people argue with. Takkada keeps the phone view current through the sync with your Tally, so the number the salesman reads is the number the books hold, without anybody exporting anything.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: How do I see a godown-wise stock report in Tally?**

A: On the desktop, open the stock summary and drill into the godown view, which lists closing quantity and value for each location. It is built from the godown recorded on every inward, outward and transfer voucher. On mobile, Takkada shows the same location-wise position read from your Tally, with item drill-down and a view as of a chosen past date.

**Q: Can I see godown-wise stock for a past date?**

A: Yes. The mobile view accepts an as-of date and shows the position the vouchers held on that day. The quantities are historical and exact. The value column is quantity multiplied by the item's current rate, so treat a backdated rupee figure as indicative rather than as a historical valuation for accounts.

**Q: Why does my godown-wise stock not match the physical stock at the branch?**

A: Nearly always because some outward movements carry no location. Transfers get recorded carefully, invoices get recorded fast, and an invoice without a godown drains stock from the wrong place. The other two usual causes are goods in transit with no transit godown to sit in, and an opening balance entered as one lump instead of location-wise.

**Q: Does the mobile report show value or only quantity?**

A: Both. Each location shows items with quantity and value, and an item can be opened to see how it is spread across locations. Quantity is the figure to rely on for availability decisions. Value is computed at the current rate, which is the right basis for today and an approximation for a backdated view.

**Q: Can a salesman see stock at a godown he is not responsible for?**

A: That depends on how you set his access. A team member can be restricted to named godowns for stock movements, so a warehouse operator works within his own locations. Decide the scope deliberately when you set up roles, because a field salesman quoting availability usually needs to see more locations than a storekeeper does.

**Q: Does opening this report on the phone slow down or change my Tally?**

A: No. The phone reads a synced copy of your inventory data, so opening a report does not touch the machine Tally runs on and nobody has to leave the desktop free. Tally remains the book of record, and entries made from the phone are written back into it as normal vouchers.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
