---
slug: dispatch
title: How to load and dispatch goods
meta_title: Load a van and dispatch goods in Takkada — orders, challans and invoices
meta_description: Load a van from your sales orders, delivery challans or sales invoices, record what actually went out, and follow the van from Building to Delivered or Billed.
featureKey: dispatch_load
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Dispatch"
  - "Load/Dispatch"
  - "To buy"
  - "Orders"
  - "Challans"
  - "Invoices"
  - "Print"
  - "Print summary"
  - "Transfer to PO"
  - "On a van"
  - "Already on another van"
  - "Start a new van"
  - "Show all"
  - "Open Settings › Dispatch"
  - "Nothing left to load."
  - "No vans yet"
  - "Go to Orders"
  - "Done"
  - "A document changed"
  - "Already billed"
  - "Building"
  - "Loaded"
  - "Keyed back"
  - "Part billed"
  - "Billed"
  - "Delivered"
  - "Van is loaded"
  - "Key back what went"
  - "Save what went out"
  - "Van went out"
  - "Make invoices"
  - "Bill from these challans"
  - "Take off changed lines"
  - "Take off the odd lines"
  - "Already billed in Tally"
  - "Put something on the van first."
  - "You can't make invoices here. Ask your admin for the Sales Invoice right."
  - "Take the odd ones off so everything on it comes from the same place. Until then it cannot be sent, confirmed or marked delivered."
  - "This van is finished — nothing comes off it now."
  - "went out"
  - "Why short?"
  - "Pick a reason"
  - "Take lines off the van"
  - "Take off the van"
  - "Has this van gone out?"
  - "Undo delivered"
  - "Close this van"
  - "Delete van"
  - "Print the sheet"
  - "What to print"
  - "Load list"
  - "Load grid"
  - "Drop slips"
  - "Review invoices"
  - "Nothing to buy"
  - "What this list means"
  - "Short"
  - "in Tally stock"
  - "Load the van from"
  - "Offer documents dated from"
  - "Bill the van as"
  - "Not set — nothing is offered until it is."
  - "Sales orders"
  - "Delivery challans"
  - "Sales invoices"
quoteSources:
  "Dispatch": [lib/screens/dispatch/dispatch_screen.dart]
  "Load/Dispatch": [lib/screens/dispatch/dispatch_screen.dart]
  "To buy": [lib/screens/dispatch/dispatch_screen.dart]
  "Orders": [lib/screens/dispatch/dispatch_screen.dart]
  "Challans": [lib/screens/dispatch/dispatch_screen.dart]
  "Invoices": [lib/screens/dispatch/dispatch_screen.dart]
  "Print": [lib/screens/dispatch/dispatch_screen.dart]
  "Print summary": [lib/screens/dispatch/orders_tab.dart]
  "Transfer to PO": [lib/screens/dispatch/orders_tab.dart]
  "On a van": [lib/screens/dispatch/orders_tab.dart]
  "Already on another van": [lib/screens/dispatch/orders_tab.dart]
  "Start a new van": [lib/screens/dispatch/orders_tab.dart]
  "Show all": [lib/screens/dispatch/orders_tab.dart]
  "Open Settings › Dispatch": [lib/screens/dispatch/orders_tab.dart]
  "Nothing left to load.": [lib/screens/dispatch/orders_tab.dart]
  "No vans yet": [lib/screens/dispatch/vans_tab.dart]
  "Go to Orders": [lib/screens/dispatch/vans_tab.dart]
  "Done": [lib/screens/dispatch/vans_tab.dart]
  "A document changed": [lib/screens/dispatch/vans_tab.dart]
  "Already billed": [lib/screens/dispatch/vans_tab.dart]
  "Building": [lib/models/dispatch_stage_words.dart]
  "Loaded": [lib/models/dispatch_stage_words.dart]
  "Keyed back": [lib/models/dispatch_stage_words.dart]
  "Part billed": [lib/models/dispatch_stage_words.dart]
  "Billed": [lib/models/dispatch_stage_words.dart]
  "Delivered": [lib/models/dispatch_stage_words.dart]
  "Van is loaded": [lib/models/dispatch_stage_words.dart]
  "Key back what went": [lib/models/dispatch_stage_words.dart]
  "Save what went out": [lib/models/dispatch_stage_words.dart]
  "Van went out": [lib/models/dispatch_stage_words.dart]
  "Make invoices": [lib/models/dispatch_stage_words.dart]
  "Bill from these challans": [lib/models/dispatch_stage_words.dart]
  "Take off changed lines": [lib/models/dispatch_stage_words.dart]
  "Take off the odd lines": [lib/models/dispatch_stage_words.dart]
  "Already billed in Tally": [lib/models/dispatch_stage_words.dart]
  "Put something on the van first.": [lib/models/dispatch_stage_words.dart]
  "You can't make invoices here. Ask your admin for the Sales Invoice right.":
    [lib/models/dispatch_stage_words.dart]
  "Take the odd ones off so everything on it comes from the same place. Until then it cannot be sent, confirmed or marked delivered.":
    [lib/models/dispatch_stage_words.dart]
  "This van is finished — nothing comes off it now.":
    [lib/models/dispatch_stage_words.dart]
  "went out": [lib/screens/dispatch/confirm_load_sheet.dart]
  "Why short?": [lib/screens/dispatch/confirm_load_sheet.dart]
  "Pick a reason": [lib/screens/dispatch/confirm_load_sheet.dart]
  "Take lines off the van": [lib/screens/dispatch/van_page.dart]
  "Take off the van": [lib/screens/dispatch/van_page.dart]
  "Has this van gone out?": [lib/screens/dispatch/van_page.dart]
  "Undo delivered": [lib/screens/dispatch/van_page.dart]
  "Close this van": [lib/screens/dispatch/van_page.dart]
  "Delete van": [lib/screens/dispatch/van_page.dart]
  "Print the sheet": [lib/screens/dispatch/van_page.dart]
  "What to print": [lib/screens/dispatch/print_options_sheet.dart]
  "Load list": [lib/screens/dispatch/print_options_sheet.dart]
  "Load grid": [lib/screens/dispatch/print_options_sheet.dart]
  "Drop slips": [lib/screens/dispatch/print_options_sheet.dart]
  "Review invoices": [lib/screens/dispatch/bill_load_review_screen.dart]
  "Nothing to buy": [lib/screens/dispatch/demand_tab.dart]
  "What this list means": [lib/screens/dispatch/demand_tab.dart]
  "Short": [lib/screens/dispatch/demand_tab.dart]
  "in Tally stock": [lib/screens/dispatch/demand_tab.dart]
  "Load the van from": [lib/screens/settings/dispatch_settings_screen.dart]
  "Offer documents dated from": [lib/screens/settings/dispatch_settings_screen.dart]
  "Bill the van as": [lib/screens/settings/dispatch_settings_screen.dart]
  "Not set — nothing is offered until it is.":
    [lib/screens/settings/dispatch_settings_screen.dart]
  "Sales orders": [lib/models/dispatch_settings.dart]
  "Delivery challans": [lib/models/dispatch_settings.dart]
  "Sales invoices": [lib/models/dispatch_settings.dart]
relatedGuides:
  - sales-orders
  - sales-invoice
  - tally-sync
  - e-invoice
sections:
  - id: before-you-start
    featureKeys: [dispatch_load]
    settings: {}
    permission: dispatch-view
  - id: which-documents-the-first-tab-offers
    featureKeys: [dispatch_load]
    settings: {}
    permission: company-admin
  - id: loading-from-sales-orders
    featureKeys: [dispatch_load]
    settings: { dispatch_load_from: sales_orders }
    permission: dispatch-view
  - id: recording-what-actually-went-out
    featureKeys: [dispatch_load]
    settings: { dispatch_load_from: sales_orders }
    permission: dispatch-view
  - id: making-the-invoices
    featureKeys: [dispatch_load]
    settings: { dispatch_load_from: sales_orders }
    permission: sales-invoice-create
  - id: existing-challans
    featureKeys: [dispatch_load]
    settings: { dispatch_load_from: delivery_challans }
    permission: dispatch-view
  - id: existing-invoices
    featureKeys: [dispatch_load]
    settings: { dispatch_load_from: sales_invoices }
    permission: dispatch-view
  - id: printing
    featureKeys: [dispatch_load]
    settings: {}
    permission: dispatch-view
  - id: to-buy
    featureKeys: [dispatch_load]
    settings: {}
    permission: sales-orders-view
  - id: when-the-picking-list-looks-empty
    featureKeys: [dispatch_load]
    settings: {}
    permission: dispatch-view
  - id: when-a-van-will-not-move
    featureKeys: [dispatch_load]
    settings: {}
    permission: dispatch-view
images: []
---

A **van** is the record of one trip: the shops it calls on, the goods on board, and what actually came off it at each shop. You build a van by ticking documents on a picking list, you follow it through a few plain stages, and at the end it either becomes invoices or is simply marked delivered.

You can load a van from your sales orders, from delivery challans you have already made, or from sales invoices you have already made. Your company's Dispatch setting chooses which of those the first tab offers. Whichever it is, the van itself works the same way: open it and the bar at the bottom always shows the one next thing to do.

Dispatch is a single screen with three tabs:

- the **picking list**, named after what your company loads from: **"Orders"**, **"Challans"** or **"Invoices"**;
- **"Load/Dispatch"**, the list of vans;
- **"To buy"**, a shopping list of what customers are still waiting for.

## Before you start

- **Dispatch has to be switched on for your company.** If it is not, the screen tells you so and names who can turn it on for you. There is nothing you can do about it from inside the app.
- **Your own access has to include the Dispatch screen.** If you cannot see it, ask an owner or admin of the business to give you access.
- **Making invoices is a separate permission.** Somebody can be allowed to load and dispatch a van but not to bill it. That is a normal way to set a team up, and the app will say so on the van rather than hiding the button.
- **If a button is on screen but will not press, the line just above it says why.** Read that line. It is the actual reason, and it names exactly what is missing.
- **Changing the company's Dispatch settings needs an admin.** The settings page lives under Settings, and staff members cannot open it.

Nothing on this screen is hidden from you because of your access. If you are not allowed to do something, the button stays where it is and carries its reason. Ask for the right named in that reason.

## Which documents the first tab offers

An admin sets this once, under Settings, on the Dispatch page. The setting is called **"Load the van from"** and it has three choices:

| Setting | The first tab is called | What the van produces at the end |
| --- | --- | --- |
| **"Sales orders"** | **"Orders"** | invoices you make from the van |
| **"Delivery challans"** | **"Challans"** | nothing new, the challan already exists |
| **"Sales invoices"** | **"Invoices"** | nothing new, the invoice already exists |

Under **"Delivery challans"** and **"Sales invoices"** a second setting applies: **"Offer documents dated from"**. The picking list will not offer a document dated before that day. While it reads **"Not set — nothing is offered until it is."**, the picking list is deliberately empty. Sales orders have no such date. They are offered by what is still pending on them.

There is a third setting, **"Bill the van as"**. It only appears when you load from sales orders, and it decides which billing button a finished van leads with. Whichever way it is set, the van itself always shows you the billing action you can take, and when one is not available to you it says why on the line above the buttons.

If an admin changes **"Load the van from"** while a van is already open, the picking list follows the new setting straight away, but a van that already exists keeps following the documents actually on it. A van built from orders stays an order van.

## Loading from sales orders

This is the longest of the three routes, because the order is a promise and the van is what turns it into a delivery and then into a bill.

1. Open Dispatch. You land on the picking list, the tab named **"Orders"**.
2. Tick the orders you are sending. You can tick one document, a whole shop heading, or a whole beat heading. Use the tiles across the top to narrow the list to one beat or one shop, and the search box to find a shop or an item.
3. Press the add button at the bottom. It counts what you ticked, and pressing it takes you straight to the van it put them on. Landing on the van is your confirmation, so there is no message to dismiss.
4. If you already have a van open, the app asks which one to add to, or offers **"Start a new van"**.
5. The van now shows the stage **"Building"**. Check the goods, set the drop order by dragging the shops into the sequence the driver will follow, and add the vehicle and driver.
6. When the van is physically loaded, press **"Van is loaded"**. The stage becomes **"Loaded"**.

The stage that matters for your stock and your pending lists is **"Loaded"**. A van still at **"Building"** reserves nothing at all: the same order stays on the picking list and anyone else can load it. The moment you press **"Van is loaded"**, those quantities come off everybody's pending list and the order stops being offered.

A document that is already riding somebody else's van is still shown on the picking list, greyed out, with an **"On a van"** tag. Tap the tag to open that van and go and talk to that driver. If you try to add it anyway, the app tells you it is **"Already on another van"** and names where it is.

### Recording what actually went out

1. When the van comes back, open it from **"Load/Dispatch"** and press **"Key back what went"**.
2. Every line is already filled in with the quantity that was ordered, so a delivery where everything went out needs no typing at all.
3. Where less went out, change the number under **"went out"** for that line. Zero is a real answer and means nothing went to that shop.
4. Any line you reduce asks **"Why short?"**. Choose from the list under **"Pick a reason"**. If you pick the other option, a note box appears.
5. Press **"Save what went out"**. The stage becomes **"Keyed back"**.

Until every short line has a reason, **"Save what went out"** stays dead and the line above it tells you how many lines still owe one. The reason is the whole point of asking: no stock is a purchase, a shop refusing goods is a sales conversation, and a blank is neither.

**What happens to the part that did not go.** The order is not written off. Whatever was ordered and did not go out stays owed, stays on the picking list, and shows up again on **"To buy"**. Keying a line back to zero does not cancel anything; it records that nothing went to that shop on this trip.

You can key a van back again, and correct a number you got wrong, right up until an invoice exists for it. Use the three-dot menu at the top of the van page.

### Making the invoices

1. On a van showing **"Keyed back"**, press **"Make invoices"**.
2. The **"Review invoices"** screen opens. Check the invoice for each shop before it is created, and set the voucher type and sales ledger if you are asked to.
3. Confirm. The van moves to **"Part billed"** while some shops are still to bill, and to **"Billed"** once every shop on it has an invoice.

Invoices are made per shop, from what you keyed back rather than from what was ordered. A shop keyed back to zero gets no invoice.

**"Billed"** is the end of the road for a van. There is nothing left to press on it and no line comes off it.

## Existing challans

If your company already writes a delivery challan before the goods leave, load the van from the challans instead. Nothing new is created at the end: the challan is the document, and the van simply records that it went.

1. Open Dispatch. The first tab is called **"Challans"**.
2. Tick the challans going out on this trip and press the add button at the bottom.
3. On the van, set the drop order, the vehicle and the driver, then press **"Van is loaded"**.
4. When the trip is done, press **"Van went out"** and confirm on **"Has this van gone out?"**. The stage becomes **"Delivered"**.

There is no key-back step on this route and no invoice is made from the van. The quantities are already written on the challan.

A delivered challan van still offers a quiet **"Bill from these challans"** link, which takes you to those challans so you can turn them into invoices in the ordinary way. Whether you can finish that depends on your own invoice permission, exactly as it does anywhere else in the app.

Only challans dated on or after **"Offer documents dated from"** are offered.

## Existing invoices

If you bill first and deliver afterwards, load the van from the invoices.

1. Open Dispatch. The first tab is called **"Invoices"**.
2. Tick the invoices going out on this trip and press the add button at the bottom.
3. On the van, set the drop order, the vehicle and the driver, then press **"Van is loaded"**.
4. When the trip is done, press **"Van went out"** and confirm. The stage becomes **"Delivered"**.

The invoice already exists. This route never asks you to key an order back and never makes a second invoice for the same goods. Only invoices dated on or after **"Offer documents dated from"** are offered.

A van can carry challans and invoices together. That is a perfectly ordinary delivery van and it is marked delivered like any other.

## Printing

There is one print icon, top right, on every Dispatch page, and it prints whatever is under it:

- On the picking list, the **"Print summary"** button at the bottom prints the documents you have ticked, and the whole offered list when you have ticked nothing. It prints one row per document with the shop, number, date and amount, and blank columns to write in. Printing changes nothing. It does not create a van and it does not clear your ticks.
- On **"Load/Dispatch"**, the **"Print"** icon prints the list of open vans.
- On a van, **"Print the sheet"** opens **"What to print"** and offers three blocks: **"Load list"** (one row per item, for the warehouse), **"Load grid"** (shops down, items across, for picking item by item) and **"Drop slips"** (one signed slip per shop, for the driver). Your choice is remembered for the company. A van still being built prints blank boxes for the warehouse to fill in by hand.

**"To buy"** has no print at all, and shows no print icon rather than one that does nothing.

## To buy

**"To buy"** turns the same information on its side for whoever does the buying: by item, instead of by customer.

Each row is one item. The **"Short"** figure is how much customers are still waiting for and have not been put on a van yet. Beside it is the quantity **"in Tally stock"** at your last Tally sync, and the date of that sync is printed at the top of the tab.

Read those two figures carefully, because they overlap. Tally only takes goods out of stock when the bill is made, so anything sitting on a van is **still counted** in the Tally stock figure. Where an item has goods on a van, the row says so underneath. Subtract that yourself before you buy. The app deliberately leaves the subtraction to you, because the stock figure covers the whole company while your shortage figure covers only the customers you are allowed to see.

Tap **"What this list means"** at the top of the tab for the same explanation inside the app. Tap any row to see which customers are waiting and on which orders.

Buying stock does not deliver it. A row only leaves this list when the goods are dispatched, billed, or the remainder is written off.

There is no purchase-order button on **"To buy"**. If you want to buy against a particular order, do it from the picking list instead: the three-dot menu on an order row offers **"Transfer to PO"**, which starts a purchase order pre-filled with that order's outstanding lines and then continues into the ordinary purchase-order flow. The customer's order stays owed. Transferring it never writes it off.

## When the picking list looks empty

An empty picking list almost never means there is nothing to do. Read the message on the screen before you report it:

- **"Nothing left to load."** followed by a date means exactly that: documents older than **"Offer documents dated from"** are not offered. They are not lost. Ask an admin to move that date back, using the **"Open Settings › Dispatch"** link on the empty screen.
- A message saying no start date has been set means the same setting has never been filled in, and nothing at all will be offered until it is. That is a setting, not an empty warehouse.
- **"Nothing left to load."** followed by everything already being on a van means what it says. Look under **"Load/Dispatch"**.
- If you have narrowed the list to one beat or one shop, the message says the scope is empty and offers **"Show all"**.
- If you are searching, clear the search box.

The same applies to **"To buy"**. If it says you cannot see sales orders, that is a limit on your access. The tab is built from sales orders and it says so plainly. **"Nothing to buy"** is the message when there is genuinely nothing.

## When a van will not move

Open the van and read the line above the buttons. It always says what is wrong.

**The van is empty.** A van still **"Building"** with nothing on it cannot be sent: the reason reads **"Put something on the van first."** Go back to the picking list and add something.

**A document on the van has changed.** If somebody edited, cancelled or deleted a source document after the van was loaded, the van shows **"A document changed"** in the vans list, a banner naming the shop and item, and one action: **"Take off changed lines"**. Nothing else works until those lines are off, so that the loader does not find out at the shop. Once they are off, the van carries on normally. The document that came off goes back on the picking list for somebody else.

If the van is already delivered or billed, nothing can come off it, and the reason says so: **"This van is finished — nothing comes off it now."**

**The van mixes orders with other documents.** This happens when an admin changes **"Load the van from"** while a van is open. The van then carries sales orders next to challans or invoices, and it can go no further in either direction. The screen offers **"Take off the odd lines"** and says **"Take the odd ones off so everything on it comes from the same place. Until then it cannot be sent, confirmed or marked delivered."** Take off whichever kind is the odd one out and the van works again. A van carrying challans and invoices together is not this case and needs no fixing.

**The office already billed it in Tally.** If Tally has invoiced everything on the van, the van shows **"Already billed"** and its reason is **"Already billed in Tally"**, with no billing button. Do not bill it again. That would put a second invoice for one delivery into your customer's books. The van stays as the record of the trip.

**"Make invoices" will not press.** The reason underneath will read **"You can't make invoices here. Ask your admin for the Sales Invoice right."** That is the whole answer: someone who administers your business grants that right. Nothing else unlocks it.

**The van says "Keyed back" but pressing the button opens the key-back sheet again.** A few old vans sit in a state that earlier versions of the app used. Just key it back and press **"Save what went out"** again. That moves it on, and the billing buttons appear. Do not try to bill it from where it is.

**The van is "Part billed".** Some shops on it have invoices and some do not. Press **"Make invoices"** again to finish the rest, and the shops already billed are left alone. At this stage a line only comes off the van if its own source document has changed. A line that already carries an invoice never comes off at all.

**You want to undo something.** The three-dot menu at the top of a van offers **"Take lines off the van"** while the van still allows it, and a row on the key-back sheet has its own **"Take off the van"** button. A van nobody ever keyed back can be deleted with **"Delete van"**. A van marked delivered by mistake can be put back with **"Undo delivered"**, but only for a short window after it went out. After that the van is the record of that delivery. A van that has already produced invoices is closed rather than deleted, and the menu says **"Close this van"** so you know its invoices stay.

**The van list looks wrong.** Vans are shared by everyone in the company, and somebody else may have moved one while you were looking at another tab. Pull the list down to refresh it, or leave the tab and come back. The vans list re-reads itself when you return to it. Finished vans are folded away under **"Done"**, and a company with no vans at all shows **"No vans yet"** with a **"Go to Orders"** button.
