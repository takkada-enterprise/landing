---
title: "Days of Cover: How Many Days Your Current Stock Lasts"
slug: "days-of-inventory-cover-distributor"
meta_title: "Days of Inventory Cover for Distributors"
meta_description: "Days of inventory cover is quantity on hand divided by average daily sales. Worked example in bottles and rupees, read from Tally stock."
primary_keyword: "days of inventory cover"
date: "2026-08-26"
updated: "2026-08-26"
author: "founder"
category: "How-To"
excerpt: "96 bottles of oil, 24 leaving a day: 4 days of inventory cover. Kolkata takes 7. Cover is already below lead time at 9:10 on Monday."
---

You calculate how many days of stock you have left by dividing quantity on hand by average daily sales. That quotient is days of inventory cover, in days, for that item, at that location. Tally holds the two inputs, Stock Summary for the quantity and item-wise sales for the rate; it does not print cover as a column, so the division is the owner's. A Guwahati FMCG owner on Monday at 9:10 reads 96 bottles of 1-litre mustard oil on Stock Summary and 720 bottles sold in 30 days, which is 24 a day. Cover is 96 ÷ 24 = 4 days. The Kolkata truck needs 7. At ₹185 a bottle the shelf is ₹17,760, which still only lasts until Friday. This article works the formula, shows why company totals lie when you have two godowns, and puts cover next to lead time so the purchase happens while there are still days left.

## Key Highlights

- Days of inventory cover equals quantity on hand divided by average daily sales, in days, per item, per location
- On 96 bottles and 24 a day, cover is 4 days; against a 7-day lead time the purchase is already late if it waits for the last case
- Company Stock Summary of 96 can hide a dry Guwahati counter if Tinsukia is holding the stock; cover uses the location you actually sell from

## In This Article

- How do I calculate how many days of stock I have left?
- Days of inventory cover in one line
- A worked example in bottles and rupees
- Which Tally numbers go into the division
- Cover against lead time, not against a feeling
- Recalculating cover when the day moves
- Frequently Asked Questions

## How do I calculate how many days of stock I have left?

Take what is on the shelf. Divide by how many units leave on a normal day. The answer is how many days of stock you have left. That is days of inventory cover.

Monday 9:10, 96 bottles, 24 a day, 4 days. Put those four days next to the 7 days Kolkata takes.

If you skip the division and look at rupees, ₹17,760 of oil looks like a healthy shelf. It is four days. Fancy Bazaar's two cases on Thursday afternoon need a shelf that still has Thursday in it.

The formula is the same for a biscuit carton and a slow pickle jar. 45 cartons at 18 a day is 2.5 days. 200 jars at 2 a day is 100 days. Both are cover. Only the first one is this morning's purchase. The pickle is a [dead stock](/blog/dead-stock-identification-tally-distributor/) conversation if it sits through year-end.

This is one of the four numbers in [stockout control for distributors](/blog/stockout-control-for-distributors-india/). Average daily sales, lead time, days of cover, reorder point. Cover is the one you recompute every time you look, because quantity changes by afternoon.

## Days of inventory cover in one line

Quantity on hand ÷ average daily sales = days of cover.

| Input | Source | Unit |
|---|---|---|
| Quantity on hand | Stock Summary, or godown-wise stock for a location | bottles, cartons, cases |
| Average daily sales | Item-wise sales quantity ÷ days in the period | same units per day |
| Days of cover | The quotient | days |

Use quantity, not value, in the division. Rates move. Bottles leaving the gate are the rate that empties the shelf.

Pick a period that matches the item. 30 days for a steady FMCG line. A quiet June will understate a line that only moves in Puja, and cover will look fatter than the October shelf will actually last. For seasonal lines, last year's season is the better denominator, which is the [seasonal stock planning](/blog/seasonal-stock-planning-for-distributors/) problem.

Cover is per item. A godown total in rupees is a working-capital figure. It will not tell you that the oil dies on Friday while the pickle lasts until March.

Cover is per location if you sell from more than one. Guwahati cover on the oil is Guwahati quantity divided by Guwahati's daily sales, or by the company daily sales if you cannot split the rate. Using the company 96 when Guwahati is at 0 is how the counter promises two cases that do not exist.

## A worked example in bottles and rupees

1-litre mustard oil, Guwahati, Monday 9:10.

Stock Summary quantity: 96 bottles. Rate ₹185. Shelf value ₹17,760.

Item-wise sales, last 30 days: 720 bottles. Average daily sales: 720 ÷ 30 = 24 bottles.

Days of inventory cover: 96 ÷ 24 = 4 days.

Lead time for Kolkata, median from the purchase register: 7 days. Worst case: 14.

Cover 4 against lead time 7 means the truck, even on a typical week, cannot arrive before the shelf is empty. The purchase belongs on Monday, not on Thursday when the last case goes.

[Reorder point](/blog/reorder-point-formula-for-distributors/) with a 3-day buffer: 24 × 7 + 72 = 240. On-hand 96 is below 240. Same conclusion, in units instead of days. Cover is the days view. Reorder point is the units view. Owners who think in "how many days till I am dry" want cover. Purchase quantity still comes from the reorder-point gap, 240 − 96 = 144 bottles, 6 cases, ₹26,640 at ₹185.

If 50 bottles are already on sales orders, free quantity is 46. Cover on free stock is 46 ÷ 24 ≈ 1.9 days. That is the number that should sit next to the 7-day truck, because the 96 is not all yours to sell.

Biscuit carton, same morning: 45 on hand, 18 a day, cover 2.5 days, Kolkata rains lead time 12. Even worse. Pickle jar: 200 on hand, 2 a day, cover 100 days. Leave it off the purchase list.

## Which Tally numbers go into the division

Quantity on hand: [Stock Summary from Tally on mobile](/blog/stock-summary-report-tally-mobile/), as of today, item drill-down. Past-date quantity is the real historical quantity if you are arguing about last Saturday's count. The rupee value on a past date is at current rate, exact on units, indicative on rupees. Cover wants units.

Location: [Godown wise stock on mobile](/godown-wise-stock-on-mobile) per godown, as of any date. Guwahati 0, Tinsukia 96. Company cover of 4 days is a lie at the Fancy Bazaar counter. Compute cover where you promise.

Average daily sales: [item-wise sales](/blog/item-wise-sales-report-tally/) quantity for the period, divided by days. Value is useful for ranking rupees. Cover uses quantity.

Inventory has Stock and Velocity tabs. Stock is the numerator sitting still. Velocity is how fast the item moves, which is how you know which of 400 SKUs even need cover today. An item with high stock and low velocity has huge cover and a capital problem. An item with low stock and high velocity has tiny cover and a purchase problem.

Inventory and Stock Summary have no export. Velocity exports to PDF or Excel if the Monday purchase call needs a sheet. Cover itself is still a division you write next to lead time.

Do not read Tally's reorder master as cover. This method uses sales and stock you can see.

## Cover against lead time, not against a feeling

Four days of cover feels fine if you have never written the 7 next to it. It feels like the week still has a week in it. The truck does not agree.

The rule is simple. When days of cover is at or below lead time, the purchase is due. When cover is below the worst-case lead time, the buffer has already been eaten. [Supplier lead time tracking](/blog/supplier-lead-time-tracking-for-distributors/) is where those two lead-time figures come from: median and worst case, not the average.

A slow crate with 90 days of cover against a 7-day supplier is not a stockout risk. It is cash on a shelf. Different meeting. A 4-day oil against 7 is this meeting.

Feelings that fail: "we still have four cases." Four cases at 24 a day is four days. "Value is ₹17,760, that is a lot." It is four days. "Tinsukia has stock." Tinsukia is not standing at Fancy Bazaar.

Write cover and lead time on the same line in the notebook. The comparison is the method. Cover alone is a trivia fact.

## Recalculating cover when the day moves

Cover is the number that goes stale by 4 PM.

Monday 9:10: 96 on hand, cover 4. Monday 4 PM: a scheme cleaned 48 bottles. On-hand 48, cover 2. The 7-day truck did not get faster. The purchase that was already late is now two days later.

A large sales order punched at 11 AM, 50 bottles to two retailers, drops free cover even if Stock Summary still shows 96 until invoicing. If you run cover on free quantity, subtract pending orders. Pending Orders is a paid add-on, available on request.

A receipt at the gate on Wednesday, 144 bottles, jumps cover to (96 leftover or whatever remains + 144) ÷ 24. Recompute. The notebook line changes. The formula does not.

Thursday look: anything that moved unusually, a festival lift, a salesman who booked big on Wednesday. You do not rebuild 400 SKUs. You rebuild the movers whose numerator changed.

The oil does not raise a hand at 4 days. At 9 AM Monday and again Thursday, the owner divides, writes the 4 next to the 7, and decides. Agri-input shops do this daily in season because cover collapses in a week of bookings.

Saturday's physical count still has to match Monday's Stock Summary, or the numerator is a story. Days of inventory cover is honest only when the quantity is.

## Frequently Asked Questions

**Q: How do I calculate how many days of stock I have left?**

A: Divide quantity on hand by average daily sales. The result is days of inventory cover for that item. Use location quantity if you sell from more than one godown, and use units rather than rupees in the division.

**Q: What is days of inventory cover?**

A: Days of inventory cover is how many days current stock will last at the current sales rate. Quantity from Stock Summary or godown-wise stock, daily sales from item-wise sales, then divide. Tally does not print this column. The owner does.

**Q: Should I use a 30-day average or a 90-day average?**

A: Use the period that matches how the item moves. Thirty days is enough for a steady FMCG line. A seasonal item needs last season's rate, or a quiet month will make cover look safer than October will be.

**Q: Why compare cover to lead time?**

A: Cover is how long the shelf lasts. Lead time is how long the truck takes. When cover is at or below lead time, the purchase is already due. A healthy rupee value on the shelf can still be four days against a seven-day truck.

**Q: Do I compute cover on company stock or godown stock?**

A: Compute it on the location you promise from. Company 96 with Guwahati at 0 is four days of cover that the Fancy Bazaar counter does not have. Godown-wise stock is the numerator for that counter.

**Q: How often should I recompute days of inventory cover?**

A: Whenever quantity or the sales rate has moved enough to change the comparison with lead time. For movers, Monday and Thursday is a working cadence. For a slow crate at 90 days, once a month is enough.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
