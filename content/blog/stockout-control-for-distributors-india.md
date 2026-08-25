---
title: "Stockout Control for Distributors: A Method You Can Run From Tally Data"
slug: "stockout-control-for-distributors-india"
meta_title: "Stockout Control for Distributors in India"
meta_description: "Stockout control for a distributor means four numbers per item, read from Tally stock and sales, before the godown goes dry."
primary_keyword: "stockout control distributor"
date: "2026-08-26"
updated: "2026-08-26"
author: "founder"
category: "Market Reality"
excerpt: "A distributor running 400 SKUs and six suppliers still runs out of the one item a retailer came for. Stockout control is four numbers per item, kept against Tally stock and sales. Lead time lives with the owner."
---

Distributors avoid stockouts using Tally data by keeping four numbers on each item, average daily sales, supplier lead time in days, days of cover, and a reorder point, then reading those against live stock and sales from the same books. Tally holds the quantities and the sales; it does not compute a reorder point, so stockout control for a distributor is a method the owner runs from those two facts plus a lead time he already knows. A Guwahati FMCG distributor with 400 SKUs and six suppliers looks at yesterday's item-wise sales, today's Stock Summary, and sales orders already in Tally that have not yet become invoices, then places a purchase before days of cover fall below lead time. Velocity shows how fast each item moves and sits in Reports+. Godown-wise stock answers which location is actually dry. This article lays out the four numbers, the live reports that feed them, why sales orders make demand visible, and what the owner still holds himself.

## Key Highlights

- Stockout control for a distributor is four numbers per item: average daily sales, supplier lead time, days of cover, and a reorder point, read against Tally stock and sales
- The sales side comes from live reports on the phone: Inventory with Stock and Velocity tabs, Stock Summary as of any date, godown-wise stock, item-wise sales, and party-wise sales
- Sales orders punched on the phone land in Tally as Sales Orders, so committed demand is visible before it becomes an invoice; Tally does not compute the reorder point for you

## In This Article

- How do distributors avoid stockouts using Tally data?
- Stockout control for a distributor starts with four numbers
- Which live reports supply the sales side
- Why sales orders make demand visible
- What this method leaves with the owner
- Running it on 400 SKUs and six suppliers
- Frequently Asked Questions

## How do distributors avoid stockouts using Tally data?

A retailer walks in for a 200 ml shampoo that sells forty bottles a day. The godown has two cases left. The supplier in Delhi takes eight days. If nobody has done the arithmetic, the shop is dry on Thursday and the purchase order goes out on Friday, which is already late.

That is the whole problem, scaled across 400 SKUs and six suppliers. Tally already knows how many bottles are on the shelf and how many went out yesterday. What it will not do is multiply those two facts by the eight days the Delhi truck needs. Stockout control is that multiplication, done on purpose, on the items that can actually go dry, using the stock and sales Tally already holds.

The owner does not watch all 400. He watches the ones whose days of cover are close to lead time. A slow crate at the back of the godown with 90 days of cover is a working-capital question. The shampoo with 7 days of cover and an 8-day lead time is this afternoon's purchase call.

The arithmetic is asked at 11 AM in the godown, when a salesman has already promised forty bottles of the 200 ml to a Fancy Bazaar retailer. The Tally desktop is in the office. Stock Summary and item-wise sales have to be readable on the phone in his hand, or that promise is a guess.

## Stockout control for a distributor starts with four numbers

Keep these four on each item you actually care about. A notebook is enough. A sheet with 80 rows for the movers is better than a sheet with 400 empty columns.

| Number | What it is | Where the input comes from |
|---|---|---|
| Average daily sales | Units sold per day, usually a 30-day or 90-day average | Item-wise sales for the period |
| Lead time | Days from placing the purchase to goods in the godown | The owner's knowledge of each supplier |
| Days of cover | Quantity on hand divided by average daily sales | Stock Summary, or godown-wise stock if you have more than one location |
| Reorder point | Average daily sales times lead time, plus a buffer the owner chooses | Computed by the owner, not by Tally |

On the shampoo: 40 a day, 8 days lead time, 80 bottles on hand. Days of cover is 2. Reorder point, with a 2-day buffer, is 40 × 8 + 80 = 400. You are 320 bottles below the point. The purchase is today, not after the two cases run out.

Lead time is the number people skip, and it is the one Tally will not store for you. Supplier A in Delhi is 8 days. Supplier B in Guwahati is 2. Supplier C in Kolkata is 12 in the rains. Those figures live in the owner's head, or in a note against the supplier's name. They do not appear as a field next to the stock item. Treating all six suppliers as "about a week" is how the 12-day line goes dry while the 2-day line is over-bought.

Days of cover is the one you recompute every time you look. Quantity changes. The average changes more slowly. Cover of 2 days on an 8-day lead time is already a stockout in slow motion.

The reorder point is a line the owner draws, not a master in Tally. Some books keep a reorder level inside Tally's inventory masters. This method does not read that master. It uses sales and stock you can see, times a lead time you know.

## Which live reports supply the sales side

Lead time stays with the owner. The sales and stock half comes from three live report families on the phone.

The Inventory report has two tabs. **Stock** is what is there. **Velocity** is how fast each item moves, and Velocity sits in Reports+. Velocity is the ranking that tells you which of the 400 SKUs can actually go dry this week. An item with high stock and low velocity is capital sitting still. An item with low stock and high velocity is the 200 ml shampoo at forty a day.

[Stock Summary from Tally on mobile](/blog/stock-summary-report-tally-mobile/) is the godown as of a date, with item drill-down. You can read it as of today or as of any past date. Quantities for a past date are the real historical quantities. The rupee value beside them is at the item's current rate, so a backdated view is exact on units and indicative on rupees. Inventory and Stock Summary have no export. Velocity exports to PDF or Excel, which is the sheet you take into the Monday purchase call.

[Godown wise stock on mobile](/godown-wise-stock-on-mobile) answers the next question: which location is dry. A company total of 80 bottles is useless if 80 are in Tinsukia and the Guwahati counter is at zero. The [godown-wise stock report](/blog/godown-wise-stock-report-tally-mobile/) is the same cut, as of any date, with item drill-down. A salesman promising delivery from the branch in front of him needs the branch number, not the company number.

[Item-wise sales](/blog/item-wise-sales-report-tally/) is the average-daily-sales input. Quantity and value per item over the period, on the phone, so the ranking is available while you are standing in the aisle. [Party-wise sales](/blog/party-wise-sales-report-tally/) tells you who will feel it if that item goes to zero: the three retailers who lift 60% of that SKU will be in tomorrow asking, and they are the calls that cost you the relationship.

Inventory, Stock Summary, godown-wise stock, item-wise sales and party-wise sales are the Tally data behind how distributors avoid stockouts using Tally data. They give quantity and movement. They do not give a reorder quantity, a supplier lead-time field, or a figure for a sale that never got billed.

## Why sales orders make demand visible

Stock on hand is what you have. A sales order is what you have already promised. If you only look at stock, you will sell the last 80 bottles twice.

[Sales order on mobile](/sales-order-on-mobile) means the order is punched on the phone and lands in Tally as a Sales Order. The counter promise and the books agree the same afternoon, instead of a pad that gets typed at 8 PM. That is the same once-only capture as [salesman order taking without re-entry](/blog/salesman-order-to-tally-without-reentry/). For stockout control it has a second job: it makes committed demand visible while the stock is still sitting in the godown.

Pending Orders shows orders not yet invoiced. It is a paid add-on, available on request. Read stock against pending orders and you see the 80 bottles minus the 50 already promised to two retailers, which is 30 you can still sell, which is less than one day's sales, which is a purchase call before lunch.

Without sales orders in Tally, demand is a memory of who asked. With them, the 400-SKU book has a queue you can subtract from cover. The reorder point then uses a truer number: cover against what is still free to sell, not against what is merely unsold.

## What this method leaves with the owner

A few things stay outside the reports.

The shampoo does not raise a hand when it crosses 400 bottles. At 9 AM on Monday, and again on Thursday for this FMCG book, the owner or the purchase person opens Velocity, writes cover next to lead time, and decides. Agri-input shops do the same look daily in season.

Delhi 8 days, Guwahati 2, Kolkata 12 in the rains: those figures live in the purchase notebook against the supplier's name. They are not a column next to the stock item. Tally's own reorder master is not the source for this method.

The books record the forty bottles that went out. They do not record the Fancy Bazaar retailer who asked for the 200 ml, found two cases gone, and bought from the next van. That reconstruction, if you want it, is a mark in the same notebook.

Purchase orders can be created on the phone, including import from a photo of a supplier's PO or quotation, and they land in Tally. That is the capture half, one step, so the reorder you just decided does not wait for an evening typing session.

Inventory and Stock Summary have no export. If the Monday purchase call needs a sheet, Velocity's PDF or Excel export is the one that exists. The rest is read on the phone.

Saturday's godown count still has to match Monday's Stock Summary. The eight days still live in the notebook. The method does not run itself between those two looks.

## Running it on 400 SKUs and six suppliers

A week of this, in a Guwahati FMCG godown, looks like a short list rather than a project.

Monday 9 AM. Open Velocity. Sort by movement. The top thirty items are the ones that can go dry. For each, read Stock Summary quantity, divide by the 30-day average from item-wise sales, and write days of cover next to lead time from the supplier notebook. Anything whose cover is at or below lead time goes on the purchase list. This Monday that is eleven items, including the shampoo at 2 days against 8, a 1-litre oil at 6 days against 7, and a biscuit carton at 4 days against 12 because the Kolkata line is in the rains.

Monday 11 AM. Read godown-wise for those eleven. The oil is short in Guwahati and fine in Tezpur, so the purchase is for Guwahati, and a stock transfer is a separate decision. The biscuit is short in both.

Monday afternoon. Sales orders already in Tally, plus Pending Orders if that add-on is on, get subtracted from the free quantity before the PO qty is typed. The shampoo's 80 on hand minus 50 promised is 30 free. The PO is 20 cases, not 8.

Thursday. Repeat for anything that moved unusually, a scheme, a retailer stocking up before a festival, a salesman who booked a large order on Wednesday. The four numbers do not need a full rebuild twice a week. They need a look at the items that changed.

The ₹180 bottle, forty a day, is ₹7,200 of sales a day when it is in stock. Two dry days are ₹14,400 you did not bill, and two days of retailers who will try the next distributor. That arithmetic is why the method exists. It is also why it has to run off Tally data you already trust, rather than off a second stock book somebody typed.

Stockout control for a distributor in India is that week, repeated. Four numbers, live reports, sales orders that show demand, and an owner who still knows how many days each of his six suppliers actually takes.

## Frequently Asked Questions

**Q: How do distributors avoid stockouts using Tally data?**

A: Distributors avoid stockouts using Tally data by keeping four numbers per item, average daily sales, supplier lead time, days of cover, and a reorder point, then reading those against live stock and sales reports. Tally holds the quantities and the sales. The owner supplies lead time and draws the reorder point, then places the purchase before cover falls below lead time.

**Q: What is stockout control for a distributor?**

A: Stockout control for a distributor is a method of watching which items will go dry before they do, using average daily sales, lead time, days of cover, and a reorder point against Tally stock and sales. It is run by the owner or a purchase person on a cadence the shop already has. Tally does not compute the reorder point.

**Q: What four numbers should I keep per item for stockout control?**

A: Keep average daily sales from item-wise sales, supplier lead time in days from your own knowledge of each supplier, days of cover as quantity on hand divided by average daily sales, and a reorder point as average daily sales times lead time plus a buffer you choose. A sheet of the movers is enough. You do not need all 400 SKUs on day one.

**Q: Does Tally compute a reorder point for me?**

A: Tally holds stock quantity and sales quantity, and does not compute a reorder point, because a reorder point needs lead time and lead time is not a Tally field. Some books keep a reorder level in Tally's inventory masters; this method does not read that master. It uses the sales and stock you can see.

**Q: How do I know which godown is about to run out?**

A: Read godown-wise stock per location, as of today, with item drill-down, next to that item's average daily sales. A company total can hide a dry counter. If Guwahati is at zero and Tinsukia is holding the stock, the purchase or the transfer is a Guwahati problem, not a company-stock problem.

**Q: Do sales orders help with stockout control?**

A: Yes. A sales order punched on the phone lands in Tally as a Sales Order, so promised demand is visible while the stock is still in the godown. Pending Orders, a paid add-on available on request, shows orders not yet invoiced. Free quantity is stock minus what is already promised, and that is the number days of cover should use.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
