---
title: "The Reorder Point Formula for Distributors (With a Worked Example)"
slug: "reorder-point-formula-for-distributors"
meta_title: "Reorder Point Formula for Distributors"
meta_description: "A reorder point formula distributor method: daily sales times lead time, plus a buffer. Worked example in bottles and rupees from Tally stock."
primary_keyword: "reorder point formula distributor"
date: "2026-08-26"
updated: "2026-08-26"
author: "founder"
category: "How-To"
excerpt: "Monday 9:10, 96 bottles of oil on the shelf, 24 leaving a day, Kolkata seven days out. The reorder point is 240. The purchase is today, six cases, not after the last case goes."
---

You calculate a reorder point for a distribution business by multiplying average daily sales by supplier lead time in days, then adding a safety buffer for the days the slow supplier actually takes. Tally holds the sales quantity and the stock on hand; it does not compute the reorder point, because the formula needs lead time and lead time is not a Tally field. A reorder point formula distributor owners use is that product plus buffer, written against live stock. On Monday at 9:10 a Guwahati FMCG owner reads 24 bottles a day of 1-litre mustard oil from item-wise sales, seven days for the Kolkata line, and 96 bottles on the Stock Summary. Reorder point with a three-day buffer is 24 times 7 plus 72, which is 240. On hand is 96, so the gap is 144 bottles, six cases, at ₹185 a bottle. Cover is 4 days against a 7-day truck.

## Key Highlights

- A reorder point is average daily sales times lead time, plus a buffer the owner chooses for the slow supplier, in units, not rupees
- Tally supplies the two inputs you can see, item-wise sales for the daily rate and Stock Summary for quantity on hand; the owner supplies lead time
- On 24 bottles a day, 7 days lead time, a 3-day buffer, and 96 on hand, the reorder point is 240 and the purchase is 144 bottles today

## In This Article

- How do I calculate a reorder point for a distribution business?
- The reorder point formula distributor owners actually write down
- A worked example in cases and rupees
- Where average daily sales and stock come from
- The buffer is for the slow supplier
- Using the reorder point on Monday morning
- Frequently Asked Questions

## How do I calculate a reorder point for a distribution business?

A retailer at Fancy Bazaar wants two cases of 1-litre mustard oil at 11 AM. The godown has four cases left. The Kolkata supplier takes seven days on a good week. If the purchase waits until the four cases are gone, the shop is dry for most of that week, and Fancy Bazaar buys from the next van.

The reorder point is the quantity at which you place the next purchase, while there is still enough stock to cover the days the truck needs. You calculate a reorder point for a distribution business from three figures: how many units leave per day, how many days the supplier takes, and a buffer for the week the truck is late. Multiply the first two, add the buffer, and that line is the reorder point. When Stock Summary is at or below that line, the purchase is today.

Tally already knows the first input and the on-hand quantity. It does not know the seven days. That number lives in the purchase notebook against the supplier's name, or in the dates on your own purchase register if you have been [tracking supplier lead time](/blog/supplier-lead-time-tracking-for-distributors/). The formula is arithmetic the owner runs. The books do not run it.

The owner does not compute this for all 400 SKUs at 9 AM. He computes it for the movers whose [days of inventory cover](/blog/days-of-inventory-cover-distributor/) is close to lead time. The pickle jar with 90 days of cover is a working-capital question. The oil with 4 days of cover and a 7-day truck is this morning's purchase call.

This is the sales-and-stock half of [stockout control for distributors](/blog/stockout-control-for-distributors-india/). Four numbers per item, and the reorder point is the one that turns the other three into a purchase quantity.

## The reorder point formula distributor owners actually write down

In plain words: average daily sales, times lead time in days, plus a safety buffer.

| Input | What it is | Unit |
|---|---|---|
| Average daily sales | Units sold per day, usually a 30-day average | bottles, cartons, cases |
| Lead time | Days from placing the purchase to goods in the godown | days |
| Safety buffer | Extra days of sales you keep for the slow week | same units as stock |
| Reorder point | Daily sales × lead time, plus the buffer | same units as stock |

Average daily sales comes from item-wise sales for the period you trust. For a steady FMCG line, 30 days is enough. For a line that spikes around a festival, 30 days in a quiet month will understate the rate, and the reorder point will be late. Use the period that matches how the item actually moves.

Lead time is calendar days, not working days, unless your supplier and your godown both close on the same Sundays and you have checked. A purchase placed Thursday that lands the next Thursday is 7 days, including the weekend the truck sat.

The buffer is extra units, not a second lead time you keep in your head and forget to add. Write it as days of sales, then convert: 3 days of buffer at 24 a day is 72 bottles. Do not reuse the on-hand quantity as the buffer. On-hand is what is sitting there. Buffer is what you add on purpose because Kolkata was once 10 days in the rains.

The reorder point is a quantity. Compare it to quantity on hand, not to rupees on hand. ₹17,760 of oil on the shelf can still be four days of cover.

Some books keep a reorder level inside Tally's inventory masters. This method does not read that master. It uses sales and stock you can see, times a lead time you know.

## A worked example in cases and rupees

Monday 9:10, Guwahati godown, 1-litre mustard oil.

Item-wise sales for the last 30 days: 720 bottles. Average daily sales is 720 ÷ 30 = 24 bottles a day.

Kolkata supplier: 7 days from the WhatsApp order to the goods receipt at the gate.

Stock Summary as of this morning: 96 bottles. That is 4 cases of 24. At ₹185 a bottle, the shelf is holding ₹17,760.

Buffer the owner has already chosen for this line: 3 days, because the same supplier took 10 days in last year's rains. Buffer in units is 24 × 3 = 72 bottles.

Reorder point = 24 × 7 + 72 = 168 + 72 = 240 bottles.

On hand is 96. 96 is below 240. The purchase quantity is 240 − 96 = 144 bottles, which is 6 cases.

Days of cover right now is 96 ÷ 24 = 4 days. The truck needs 7. Without a purchase today, the godown is dry from Friday, and Fancy Bazaar's two cases on Thursday afternoon have nothing to pick.

At ₹185 a bottle, 24 a day is ₹4,440 of sales a day while the oil is in stock. Three dry days are ₹13,320 you did not bill, and three days of retailers who will try the next distributor. That is why the line is 240, not "order when we are almost out."

If 50 bottles are already promised on sales orders that have not yet become invoices, free stock is 96 − 50 = 46, which is under two days. The purchase is still 6 cases, and it is still this morning. Pending Orders, a paid add-on available on request, is the list of those not-yet-invoiced orders. Without it, you subtract from a notebook of what the salesmen already promised.

Purchase orders can be created on the phone, including import from a photo of a supplier's PO, and they land in Tally. That is the capture half, one step, so the six cases you just decided do not wait for an evening typing session.

## Where average daily sales and stock come from

The formula is only as good as the two Tally numbers.

Average daily sales comes from [item-wise sales](/blog/item-wise-sales-report-tally/) for the period. Quantity sold, not value sold. A rate change does not change how many bottles leave the gate. Set the period, read the outward quantity for that SKU, divide by the number of days in the period. On the phone this is the ranking you can read while standing in the aisle.

Quantity on hand comes from [Stock Summary from Tally on mobile](/blog/stock-summary-report-tally-mobile/), as of today, with item drill-down. Past-date quantity is the real historical quantity if you need yesterday's position after a count. The rupee value beside a past date is at the item's current rate, so it is exact on units and indicative on rupees. For a reorder point you want today's units.

If you have more than one location, company Stock Summary of 96 bottles is the wrong input when 96 are in Tinsukia and Guwahati is at zero. [Godown wise stock on mobile](/godown-wise-stock-on-mobile) is the cut per location. The reorder point for the Guwahati counter uses Guwahati quantity, not the company total. A stock transfer from Tinsukia is a separate decision from the Kolkata purchase.

Inventory has a Stock tab and a Velocity tab. Stock is what is there. Velocity is how fast each item moves. Velocity is how you pick which of the 400 SKUs even need a reorder point this week. An item with high stock and low velocity is capital sitting still. An item with 96 on hand and 24 leaving a day is this formula.

Inventory and Stock Summary have no export. If Monday's purchase call needs a sheet, Velocity's PDF or Excel export is the one that exists. The reorder point itself still lives in the notebook next to lead time.

## The buffer is for the slow supplier

The buffer is the part people skip, and it is the part that stops a 7-day formula from failing on a 10-day week.

Supplier A in Guwahati is 2 days. Supplier B in Delhi is 8. Supplier C in Kolkata is 7 in fair weather and 12 when the highway floods. Treating all three as "about a week" is how the 12-day line goes dry while the 2-day line is over-bought.

Write the buffer as extra days of sales for that supplier, on that route, in the season you are in. Three days on the oil is 72 bottles. Two days on a biscuit carton that moves 18 a day is 36 cartons. The number is different per line because the supplier is different, and because a slow crate at the back of the godown does not need the same cushion as the oil.

Do not copy last month's on-hand quantity into the buffer column. Ninety-six bottles on the shelf and a 72-bottle buffer are different numbers; writing the same figure in both columns is how the purchase quantity comes out wrong. On-hand changes every afternoon. Buffer changes when the supplier's worst week changes.

A buffer of zero is a choice. It means you accept a dry day if the truck is late by one day. Some owners make that choice on a line with a local supplier who turns around in 24 hours. On Kolkata oil, a zero buffer is a dry Friday.

The buffer does not appear as a field next to the stock item. It sits in the same notebook as lead time. Recompute the reorder point when either number changes, not every time a bottle leaves.

## Using the reorder point on Monday morning

A week of this, on the oil and the other movers, is a short list.

Monday 9:10. Open Velocity, then the thirty items that can go dry. For each, read Stock Summary, divide by the 30-day average, write cover next to lead time. Anything at or below the reorder point goes on the purchase list. This Monday that is the oil at 96 against 240, a 200 ml shampoo at 80 against 400, and a biscuit carton at 45 against 288 because Kolkata is in the rains.

Monday 11:00. Read godown-wise for those three. The oil is short in Guwahati and fine in Tezpur, so the six cases are for Guwahati. The biscuit is short in both.

Monday afternoon. Subtract sales orders already in Tally from free quantity before the PO qty is typed. The oil's 96 minus 50 promised is 46 free. The PO is still 6 cases.

Thursday. Repeat for anything that moved unusually: a scheme, a retailer stocking up before a festival, a salesman who booked a large order on Wednesday. The reorder point does not need a full rebuild twice a week. It needs a look at the items that changed.

The oil does not raise a hand when it crosses 240. Monday 9 AM and Thursday, the owner opens the two reports, writes cover next to lead time, and decides. Saturday's count still has to match Monday's Stock Summary. The seven days still live in the notebook. That look, in cases and rupees, is the reorder point formula distributor teams finish the week with, before the last case goes.

## Frequently Asked Questions

**Q: How do I calculate a reorder point for a distribution business?**

A: Multiply average daily sales by supplier lead time in days, then add a safety buffer in the same units as stock. Compare that reorder point to quantity on hand from Stock Summary. When on-hand is at or below the line, place the purchase the same day.

**Q: What is a reorder point formula distributor owners should write down?**

A: Average daily sales times lead time, plus a buffer for the slow supplier. Daily sales comes from item-wise sales. On-hand comes from Stock Summary. Lead time and buffer come from the owner, because Tally does not store them against the item.

**Q: Does Tally compute a reorder point for me?**

A: Tally holds stock quantity and sales quantity, and does not compute a reorder point, because a reorder point needs lead time and lead time is not a Tally field. Some books keep a reorder level in Tally's inventory masters. This method does not read that master.

**Q: What numbers do I need for the worked example?**

A: You need units sold per day, lead time in days, a buffer in units, and quantity on hand. On 24 bottles a day, 7 days lead time, a 72-bottle buffer, and 96 on hand, the reorder point is 240 and the purchase is 144 bottles.

**Q: Should I use rupees or quantity for the reorder point?**

A: Use quantity. Compare bottles to bottles, or cases to cases. A rupee value on the shelf can hide four days of cover. Convert to rupees after you have the unit gap, if you need a cash figure for the purchase.

**Q: Do I calculate a reorder point for every SKU?**

A: No. Start with the movers whose days of cover are close to lead time. A slow crate with 90 days of cover is a capital question. The oil with 4 days of cover and a 7-day truck is this morning's purchase.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
