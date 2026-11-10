---
title: "Sales Order Pending Report in Tally Prime: Who Is Waiting for Which Item"
slug: "sales-order-pending-report-tally-prime"
meta_title: "Sales Order Pending Report in Tally Prime, Item by Item"
meta_description: "Sales order pending report in Tally Prime: Sales Order Outstandings step by step, and how to see who is waiting for each item against stock."
primary_keyword: "sales order pending report in tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "Reports"
excerpt: "Three shops are waiting for 84 boxes of wood glue and the godown has 60. Where Tally lists pending sales orders, how to read them by party or by item, and how to see each item's waiting customers against stock on the phone."
---

The sales order pending report in Tally Prime is Sales Order Outstandings: it lists every sales order not yet fully delivered, by stock group, by item or by party, with the pending quantity, rate and value, and Sales Orders (Due Only) adds due dates and ageing. To set pending orders against stock you press F9 in the stock group view; Takkada's Customers waiting report shows each item's waiting customers beside Tally stock and the shortfall. The steps below open each report with Alt+G, the Go To box. Then a worked example: three hardware shops have ordered 84 Pcs of Wood Glue 1 kg between them, the godown holds 60, and someone has to decide who gets served first. A pending report cannot make that call for you, but it should put the three customers, their quantities and your stock on one screen, so the call takes a minute instead of a phone round of the godown.

## Key Highlights

- In TallyPrime, Alt+G and Sales Order Stock Group Outstandings or Sales Order Group Outstandings list what is still pending, with quantity, rate and value
- Sales Orders (Due Only) shows orders by due date, and F6 (Age wise) ages them by bill date or due date
- Customers waiting in Takkada lists, item by item, the customers with a pending sales order for it, against the stock you hold

## In This Article

- How do I check pending sales orders in Tally Prime?
- Party-wise or item-wise: which pending report answers which question?
- Worked example: 84 waiting, 60 in stock
- Pending orders against stock on the phone
- Why the orders have to be in the books first
- Frequently Asked Questions

## How do I check pending sales orders in Tally Prime?

Tally keeps a sales order open until a delivery note or invoice is made against it, so the pending report is simply every order line that has not yet been fully delivered. Tally's help lists three ways in. Each starts from Alt+G (Go To).

1. **Sales Order Stock Group Outstandings.** Type it in Go To and pick a stock group, such as Adhesives. You see the quantity, rate and value of pending orders. Drill into the group for its items, and press F5 (Stock Item-wise) to switch between the item view and the group view.
2. **Sales Order Group Outstandings.** Type it in Go To and pick a ledger group, usually Sundry Debtors, to read pending orders party by party. Drill down for the order details.
3. **Sales Orders (Due Only).** Type it in Go To and press F4 to choose a stock item. In Order Details, press F6 (Age wise) and choose Ageing by Bill Date or Ageing by Due Date to see how old each pending order is. F8 (All Orders) shows every order, not only the due ones.

In the stock group view, F9 (Orders) switches the figures between sales and purchase order outstanding, saleable stock and stock in hand. Press F12 and turn on Show Stock Items with zero Quantity or Balance if you want items with nothing pending to stay on the list. Ctrl+E exports any of these.

## Party-wise or item-wise: which pending report answers which question?

| Your question | Tally report | What you read |
|---|---|---|
| What does this customer still expect from me? | Sales Order Group Outstandings, Sundry Debtors, then the party | That party's pending lines |
| How much of this item is on order? | Sales Order Stock Group Outstandings, F5 for items | Pending quantity per item |
| Which orders are late? | Sales Orders (Due Only), F6 Age wise by due date | Orders by age |
| Can my stock cover what is pending? | Sales Order Stock Group Outstandings with F9 | Pending beside stock in hand |
| Who exactly is waiting for this one item? | Sales Orders (Due Only) for the item | Each order on that item |

The party view is what you open when a customer calls. The item view is what you open before you buy. Most owners need the last two rows together: for one item, the customers waiting and how far your stock falls short.

## Worked example: 84 waiting, 60 in stock

Wood Glue 1 kg has three open sales orders on 10 November. The godown's Tally stock is 60 Pcs.

| Customer | Sales order | Pending (Pcs) |
|---|---|---|
| Ravi Traders | SO/0087 | 48 |
| Patel Paints | SO/0091 | 24 |
| Lakshmi Stores | SO/0094 | 12 |
| **Waiting** | | **84** |
| Tally stock | | 60 |
| **Short** | | **24** |

At ₹310 a piece, the 84 pieces waiting are ₹26,040 of sales sitting on paper, and the 24 you do not have are ₹7,440 of it. You have three honest choices. Serve Ravi Traders in full and split the rest, serve the two smaller orders in full so two shops are closed out, or part-fill everyone and tell each one the date of the next lot. Which is right depends on who pays on time and who has another supplier one street away. The report's job is only to put 48, 24, 12 and 60 on one screen before you decide, and to show that 24 Pcs need buying.

## Pending orders against stock on the phone

Takkada's Customers waiting report is in the Reports tab under Customers & orders. It lists, item by item, the customers who have a pending sales order for it, against the stock you hold. Each item shows the pending quantity, Tally stock and how much you are short, and opens to the customers and orders behind it. For Wood Glue 1 kg that is the table above: 84 pending, 60 in Tally stock, 24 short, three customers.

The stock figure is Tally's, from your Tally as of the last sync. Tally takes goods out of stock only when the bill is made, so read the stock figure with that in mind on a day when vans are out. The report needs the orders themselves: it works from sales orders recorded in Tally or made in Takkada.

When stock alerts are on, Takkada can alert you after the goods arrive. The check runs twice a day, and the alert opens Customers waiting for just the items that came in, so you can see whom to serve from the new lot. The customer is not messaged by the alert; calling them is your call. The report and the rest of the Reports tab are on the [Tally reports on mobile](/tally-reports-on-mobile/) page.

**With the MIS Insights add-on:** Orders to ship & buy shows which pending sales orders your stock can serve today, by customer, and makes the challan or invoice for them in one go. Its PO assist suggests what to buy per item for the next few days, after pending sales orders, stock and open purchase orders, with the last supplier and rate, and its order register shows every sales and purchase order open in a period and what was delivered against it. Part of the MIS Insights add-on. Ask us to switch it on for your business.

## Why the orders have to be in the books first

Every report above, in Tally or on the phone, reads sales orders. An order taken on WhatsApp and kept in a notebook appears nowhere, so the godown buys against a guess. The case for recording each order is made in [why record sales orders in Tally](/blog/why-record-sales-orders-in-tally-demand-visibility/). Your salesmen can book them from the field with [sales order on mobile](/sales-order-on-mobile/), and each one lands in Tally as an ordinary sales order.

Once orders are in, the list of orders not yet billed is covered in [pending orders not yet invoiced](/blog/pending-orders-not-yet-invoiced-distributor/), and turning that pile into the day's van load is in [dispatch planning from Tally orders](/blog/dispatch-planning-from-tally-orders/).

## Frequently Asked Questions

**Q: How do I check pending sales orders in Tally Prime?**

A: Press Alt+G and open Sales Order Stock Group Outstandings to see pending quantity, rate and value by stock group, or Sales Order Group Outstandings and pick Sundry Debtors to see them by party. Sales Orders (Due Only) lists the orders by due date. All three read only orders not yet fully delivered.

**Q: How do I see item wise pending sales orders?**

A: Open Sales Order Stock Group Outstandings, pick the group and press F5 (Stock Item-wise) to list each item's pending quantity. For one item's orders, open Sales Orders (Due Only) and press F4 to choose the item. In Takkada, Customers waiting is already item by item, with the customers under each item.

**Q: Can I see pending orders against current stock?**

A: In Tally, press F9 (Orders) in the stock group outstanding view to switch between order outstanding, saleable stock and stock in hand. Customers waiting in Takkada shows pending, Tally stock and the shortfall together for each item, for example 84 pending, 60 in stock and 24 short.

**Q: Will my customer be told when stock arrives?**

A: No. When stock alerts are on, Takkada alerts you, the business, twice a day after goods come in, and the alert opens Customers waiting for those items. Telling the customer is your decision, by call or message.

**Q: Do I need to record sales orders in Tally?**

A: Yes. Customers waiting is built from sales orders recorded in Tally or made in Takkada, which land in Tally as sales orders. An order kept only in a notebook or a chat cannot show up in any pending report.

Takkada shows your customers waiting for each item against Tally stock, on the phone and the web app, from your Tally as of the last sync. [Message us on WhatsApp](https://wa.me/919435977777) to see it on your own orders.
