---
slug: sales-orders
title: How to take and track sales orders
meta_title: How to take and track sales orders in Takkada
meta_description: Record what a customer has ordered, see how much is still pending, invoice part of an order, and send the order on to a van for dispatch.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Sales Orders
  - New Sales Order
  - All Orders
  - Open Orders Only
  - Quotations Only
  - Sales Orders Only
  - Partially Closed
  - Delivery Date (optional)
  - Convert to Invoice
  - Make challan
  - Share Sales Order
  - Fulfil Order
  - Packed
  - Nothing pending on this order — everything ordered has been invoiced or cancelled.
  - Pending Orders
  - Make Invoice
  - Nothing pending — every order is fully shipped.
  - Reason (required)
  - "You can't make invoices here. Ask your admin for the Sales Invoice right."
  - No orders match the selected filters
quoteSources:
  Sales Orders:
    - lib/screens/sales_order_list_screen.dart
  New Sales Order:
    - lib/screens/sales_order_list_screen.dart
  All Orders:
    - lib/screens/sales_order_list_screen.dart
  Open Orders Only:
    - lib/screens/sales_order_list_screen.dart
  Quotations Only:
    - lib/screens/sales_order_list_screen.dart
  Sales Orders Only:
    - lib/screens/sales_order_list_screen.dart
  Partially Closed:
    - lib/models/sales_order.dart
  Delivery Date (optional):
    - lib/screens/sales_order_summary_screen.dart
  Convert to Invoice:
    - lib/screens/sales_order_detail_screen.dart
  Make challan:
    - lib/screens/sales_order_detail_screen.dart
  Share Sales Order:
    - lib/screens/sales_order_detail_screen.dart
  Fulfil Order:
    - lib/screens/fulfil_sales_order_screen.dart
  Packed:
    - lib/screens/fulfil_sales_order_screen.dart
  Nothing pending on this order — everything ordered has been invoiced or cancelled.:
    - lib/screens/fulfil_sales_order_screen.dart
  Pending Orders:
    - lib/screens/pending_orders_screen.dart
  Make Invoice:
    - lib/screens/pending_orders_screen.dart
  Nothing pending — every order is fully shipped.:
    - lib/screens/pending_orders_screen.dart
  Reason (required):
    - lib/screens/pending_orders_screen.dart
  "You can't make invoices here. Ask your admin for the Sales Invoice right.":
    - lib/models/dispatch_stage_words.dart
  No orders match the selected filters:
    - lib/screens/sales_order_list_screen.dart
relatedGuides:
  - dispatch
  - sales-invoice
  - customer-order-link
  - party-ledger
sections:
  - id: take-an-order
    featureKeys: []
    settings: {}
    permission: sales-order-create
  - id: track-pending
    featureKeys: [pending_order]
    settings: {}
    permission: sales-order-view
  - id: bill-an-order
    featureKeys: []
    settings: {dispatchDocument: invoice_or_delivery_challan}
    permission: sales-invoice-create
  - id: into-dispatch
    featureKeys: [dispatch_load]
    settings: {}
    permission: dispatch-view
images: []
---

A sales order records what a customer has asked for. It is not a bill: nothing
is owed and no GST is due until you raise the invoice. Takkada keeps orders open
until the goods have actually gone, so at any moment you can see what you have
promised and how much of it is still to ship.

## Before you start

- You need permission to see sales orders on this business, and a separate
  permission to create them. Being able to read the list does not mean you can
  add to it.
- Making the invoice from an order needs the sales-invoice right. Without it the
  button is there but refuses, with the reason
  "You can't make invoices here. Ask your admin for the Sales Invoice right."
- Loading an order onto a van is a different screen with its own access. See
  the van section below.
- Quotations live in the same list as orders. A quotation is a price you have
  offered; an order is a commitment.

## Order or invoice — which do you make?

Make an **order** when the customer has asked for goods you have not sent yet.
Make an **invoice** when the goods are going, or have gone. An order costs
nothing and can be edited or cancelled. An invoice is a tax document: once it is
in your books it should be reversed with a credit note, not deleted.

The usual sequence is order first, invoice later, and Takkada carries the order's
items, rates and reference into the invoice so you do not key them twice.

## Take an order

1. Open "Sales Orders".
2. Tap "New Sales Order".
3. Choose the customer.
4. Add the items with quantity and rate.
5. Set the order date, and a "Delivery Date (optional)" if you have promised one.
6. Review the summary and save.

The order gets a number and appears in the list as Open.

## Find an order again

The list filters by type and by state:

- "All Orders" shows everything.
- "Open Orders Only" hides what is finished.
- "Quotations Only" and "Sales Orders Only" separate the two kinds.

If you have filtered too hard you will see
"No orders match the selected filters" — clear the filter rather than
concluding the order is gone.

Open an order to see its items, its status and its totals, and use
"Share Sales Order" to send the customer a PDF of it.

## Pending quantity and partial fulfilment

An order does not have to be shipped in one go.

- An order that has been fully invoiced closes.
- An order that has been part invoiced shows "Partially Closed".
- The quantity still owed on each line is its pending quantity.

Businesses using the pending-orders view get a whole screen for this. Open
"Pending Orders" and you see every customer with something owed, each line
showing what is still pending. When there is nothing left it says
"Nothing pending — every order is fully shipped."

To ship part of an order:

1. Open the order, or find it under "Pending Orders".
2. Choose to make the invoice. On a business using pending orders this opens
   "Fulfil Order"; from the pending list the same door is labelled
   "Make Invoice".
3. Enter the quantity "Packed" against each item — the amount actually going
   now, which may be less than the amount ordered.
4. Continue into the invoice, check it, and save.
5. The order stays open for the rest, with its pending quantity reduced.

When everything has gone, the screen says
"Nothing pending on this order — everything ordered has been invoiced or cancelled."

### Cancelling what will never ship

If the customer no longer wants part of an order, cancel that line instead of
leaving it pending forever. The cancel step asks for a
"Reason (required)", so the order's history explains itself later.

## Bill an order

From an open order you get two doors: "Convert to Invoice" and "Make challan".
Both are offered whenever the order can still be billed. Your business's dispatch
document setting decides which of the two is the highlighted one — it does not
remove the other. Each door has its own permission, and the one you lack tells
you which right to ask your admin for.

## Sending an order out on a van

Orders can also be loaded onto a van and billed after the goods have actually
left. That is a separate screen with its own access: as well as being allowed to
see orders, your business needs Dispatch switched on and you need access to it.
If Dispatch is not available to you, everything above still works — you just
invoice from the order directly.

The dispatch guide covers loading, keying back what actually went, and billing
from a van.

## When it does not look right

**The order is not in the list.** Check the filter first, then check that you are
on the right business.

**"Convert to Invoice" is greyed out.** Either you do not have the sales-invoice
right — the reason names it — or the order is already closed or cancelled.

**The pending quantity looks wrong after an invoice.** Pending is reduced by
what you actually invoiced, not by what was ordered. If you packed less, the
remainder is still open, which is the intended behaviour.

**A line shows as being on a van.** Goods on a van are still owed and still
appear as pending until they are billed. That is deliberate — it stops the same
goods being promised twice.

**You cannot edit the order.** Orders stop being editable once they have been
converted or cancelled, and on businesses using pending orders once part of the
order has been fulfilled. Cancel the remaining lines or raise a fresh order.
