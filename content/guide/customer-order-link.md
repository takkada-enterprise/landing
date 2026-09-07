---
slug: customer-order-link
title: How to take orders through a customer link
meta_title: How to take orders through a customer link in Takkada
meta_description: Turn on your public order link, choose what customers see and pay, share the link, and review, match and approve the orders that come back.
featureKey: public_customer_ordering
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - Order link
  - Create link
  - Public order link is active
  - Public business name
  - Merchant WhatsApp number
  - Items on this link
  - Prices customers see
  - Choose a price level
  - Show items that are out of stock
  - Price for this customer link
  - Rotate public link?
  - Old customer links will stop accepting order requests.
  - Disable public link?
  - Customer orders
  - Not available
  - No orders yet
  - Customer in your books
  - Choose customer
  - Posts to
  - Order value (excl. GST)
  - Approve & create order
  - Reject this order?
  - The customer will not get an order. Nothing is sent to Tally.
quoteSources:
  Order link:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Create link:
    - lib/widgets/customer_order/customer_order_link_share_card.dart
  Public order link is active:
    - lib/widgets/customer_order/customer_order_link_share_card.dart
  Public business name:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Merchant WhatsApp number:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Items on this link:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Prices customers see:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Choose a price level:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Show items that are out of stock:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Price for this customer link:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Rotate public link?:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Old customer links will stop accepting order requests.:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Disable public link?:
    - lib/screens/settings/customer_order_link_settings_screen.dart
  Customer orders:
    - lib/screens/customer_order_inbox_screen.dart
  Not available:
    - lib/screens/customer_order_inbox_screen.dart
  No orders yet:
    - lib/screens/customer_order_inbox_screen.dart
  Customer in your books:
    - lib/screens/customer_order_detail_screen.dart
  Choose customer:
    - lib/screens/customer_order_detail_screen.dart
  Posts to:
    - lib/screens/customer_order_detail_screen.dart
  Order value (excl. GST):
    - lib/screens/customer_order_detail_screen.dart
  Approve & create order:
    - lib/screens/customer_order_detail_screen.dart
  Reject this order?:
    - lib/screens/customer_order_detail_screen.dart
  The customer will not get an order. Nothing is sent to Tally.:
    - lib/screens/customer_order_detail_screen.dart
relatedGuides:
  - sales-orders
  - party-ledger
  - sales-invoice
  - team-access
sections:
  - id: turn-the-link-on
    featureKeys: [public_customer_ordering]
    settings: {}
    permission: company-admin
  - id: choose-prices-and-items
    featureKeys: [public_customer_ordering]
    settings: {priceLevel: tally_price_level, includeOutOfStock: bool}
    permission: company-admin
  - id: review-incoming-orders
    featureKeys: [public_customer_ordering]
    settings: {}
    permission: sales-order-create
images: []
---

The order link is one web address you can give your customers. They open it,
pick items at the prices you have set, and send you a request. Nothing reaches
your books automatically — every request lands in an inbox inside Takkada, and
you decide whether to turn it into an order.

## Before you start

- The order link has to be switched on for your business. If it is not, the
  inbox says "Not available" and tells you to contact support. There is no
  self-serve switch on that screen.
- Setting up the link is admin work: the public name, the prices and the
  published items are business-wide.
- Approving an incoming request creates a real sales order, so you need the
  right to create sales orders.
- Your item prices come from your Tally price levels. Get those right before you
  publish the link.
- **The page your customer sees has no help of its own.** Neither do the payment
  pages. They are deliberately plain: a customer should see your business, your
  items and your prices, and nothing about Takkada. Everything explained below
  happens on your side.

## Turn the link on

1. Open Settings and then "Order link".
2. Fill in "Public business name" — this is the name your customers will see at
   the top of the page, so use the name they know you by.
3. Fill in "Merchant WhatsApp number" with the country code, so a customer can
   reach you from the page.
4. Tap "Create link".
5. The card changes to "Public order link is active" and shows the address.

## Choose what customers see and pay

Under "Items on this link":

1. Open "Prices customers see" and "Choose a price level". The price level comes
   from your Tally data, so whatever your Tally already says for that level is
   what the link charges.
2. Tap the price beside any item to override it for this link. The box is
   "Price for this customer link" and the amount is before GST.
3. Decide on "Show items that are out of stock". Leave it on unless your Tally
   stock quantities are genuinely accurate — turning it off hides every item
   Tally reports as zero or less, which can empty your catalogue by accident.
4. Publish the items you want customers to be able to order.

Prices on the link are before GST throughout. Tax is worked out on your side
when you approve the order.

## Share the link

1. On the "Order link" screen, use Copy to put the address on your clipboard, or
   Share to send it straight through WhatsApp or any other app.
2. Send the same address to as many customers as you like. It is one public
   link, not one per customer.

Two controls change the address itself. "Rotate public link?" warns that
"Old customer links will stop accepting order requests." — use it if the address
has gone somewhere it should not have. "Disable public link?" stops the page
accepting orders altogether. Both are immediate and cannot be undone by
re-enabling: rotating always produces a new address.

## Review the orders that come in

1. Open "Customer orders". Requests arrive here, newest first. Before your first
   one it reads "No orders yet".
2. Tap a request to open it.
3. Check "Customer in your books". Takkada tries to match the buyer to a
   customer you already have. Confirm the match, or use "Choose customer" to
   pick the right one. You cannot approve until this is settled — an order with
   no customer has nowhere to go.
4. Check the items, quantities and rates. You can change them here; this is your
   order to accept, not the customer's to dictate.
5. Under "Posts to", pick the sales ledger the order should be booked against.
6. Check "Order value (excl. GST)". GST is added on top once the customer's
   details are known, and the screen tells you whether that will be IGST or
   CGST + SGST.
7. Tap "Approve & create order".

The request becomes a sales order in your books and follows the ordinary sales
order route from there.

To refuse a request, use Reject. The confirmation says "Reject this order?", followed by
"The customer will not get an order. Nothing is sent to Tally."
Nothing is created and nothing is sent.

## When it does not look right

**The inbox says the order link is not switched on.** The feature is off for
your business. Contact support; no setting inside the app turns it on.

**The customer says the page shows no items.** Two usual causes: nothing has
been published to the link yet, or "Show items that are out of stock" is off and
your Tally stock is showing zero. Turn it back on and look again.

**The prices on the page are wrong.** They follow the price level you picked,
plus any per-item override. Change the level, or set the item's own
"Price for this customer link".

**Approve will not complete.** The buyer has not been matched to a customer in
your books, or the customer's GST details have not loaded so the tax cannot be
worked out yet. The screen names which, and offers Retry for the second.

**The order was created but the request still looks unfinished.** Approving
again finishes the link-up; it does not create a second order. The screen says
so before you tap.

**An old customer keeps using an address that no longer works.** They have the
pre-rotation link. Send them the current one.
