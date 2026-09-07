---
slug: sales-invoice
title: How to make a sales invoice
meta_title: Make a sales invoice in Takkada — party, items, rate, GST and Tally sync
meta_description: Pick the customer, add items and rates, check the totals, set payment status and due date, and save. What each control does and what stops the save.
featureKey: voucher_creation_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Sales Invoice"
  - "Sales"
  - "Add Items"
  - "Search by item name, ID or HSN code"
  - "Create new item"
  - "Price Level"
  - "Discount %"
  - "Item Discount"
  - "Save & Continue"
  - "Please add at least one item to continue"
  - "No items match your search"
  - "Select a godown on every line before continuing."
  - "You cannot add items in this business."
  - "Invoice Summary"
  - "Invoice details"
  - "Invoice No."
  - "Invoice Date"
  - "Voucher Type"
  - "Select voucher type"
  - "Item details"
  - "Amount Details"
  - "Amount"
  - "GST"
  - "Incl. GST"
  - "Excl. GST"
  - "No GST"
  - "IGST"
  - "CGST"
  - "SGST"
  - "GST off"
  - "Round Off"
  - "Total"
  - "Payment Status"
  - "Unpaid"
  - "Paid"
  - "Partially Paid"
  - "Payment Due"
  - "Select due date"
  - "Send invoice via WhatsApp"
  - "Generate E-Invoice"
  - "Generate E-Way Bill"
  - "Create Invoice"
  - "Update Invoice"
  - "Invoice Created Successfully"
  - "Invoice Updated Successfully"
  - "Possible Duplicate"
  - "Proceed"
  - "Generating invoice number, please wait…"
  - "Invoice is already being created. Please wait."
  - "Fixed in Invoice Settings"
  - "You do not have permission to view this register."
  - "Voucher creation is not enabled for this company."
  - "Invoices"
  - "Invoice options"
  - "Default GST mode on invoices"
  - "Default price level"
  - "Show buyer PO number on invoices"
  - "Transporter details on invoices"
  - "Auto-send invoice via WhatsApp"
  - "Where invoices post in Tally"
  - "Setup Required"
quoteSources:
  "Sales Invoice": [lib/screens/party_details_screen.dart]
  "Sales": [lib/screens/sale_invoice_register_screen.dart]
  "Add Items": [lib/screens/add_invoice_items_screen.dart]
  "Search by item name, ID or HSN code": [lib/screens/add_invoice_items_screen.dart]
  "Create new item": [lib/screens/add_invoice_items_screen.dart]
  "Price Level": [lib/screens/add_invoice_items_screen.dart]
  "Discount %": [lib/screens/add_invoice_items_screen.dart]
  "Item Discount": [lib/screens/add_invoice_items_screen.dart]
  "Save & Continue": [lib/screens/add_invoice_items_screen.dart]
  "Please add at least one item to continue": [lib/screens/add_invoice_items_screen.dart]
  "No items match your search": [lib/screens/add_invoice_items_screen.dart]
  "Select a godown on every line before continuing.": [lib/screens/add_invoice_items_screen.dart]
  "You cannot add items in this business.": [lib/screens/add_invoice_items_screen.dart]
  "Invoice Summary": [lib/screens/invoice_summary_screen.dart]
  "Invoice details": [lib/screens/invoice_summary_screen.dart]
  "Invoice No.": [lib/screens/invoice_summary_screen.dart]
  "Invoice Date": [lib/screens/invoice_summary_screen.dart]
  "Voucher Type": [lib/screens/invoice_summary_screen.dart]
  "Select voucher type": [lib/screens/invoice_summary_screen.dart]
  "Item details": [lib/screens/invoice_summary_screen.dart]
  "Amount Details": [lib/screens/invoice_summary_screen.dart]
  "Amount": [lib/screens/invoice_summary_screen.dart]
  "GST": [lib/widgets/invoice/gst_basis_field.dart]
  "Incl. GST": [lib/models/gst_pricing_mode.dart]
  "Excl. GST": [lib/models/gst_pricing_mode.dart]
  "No GST": [lib/models/gst_pricing_mode.dart]
  "IGST": [lib/screens/invoice_summary_screen.dart]
  "CGST": [lib/screens/invoice_summary_screen.dart]
  "SGST": [lib/screens/invoice_summary_screen.dart]
  "GST off": [lib/screens/invoice_summary_screen.dart]
  "Round Off": [lib/screens/invoice_summary_screen.dart]
  "Total": [lib/screens/invoice_summary_screen.dart]
  "Payment Status": [lib/screens/invoice_summary_screen.dart]
  "Unpaid": [lib/screens/invoice_summary_screen.dart]
  "Paid": [lib/screens/invoice_summary_screen.dart]
  "Partially Paid": [lib/screens/invoice_summary_screen.dart]
  "Payment Due": [lib/screens/invoice_summary_screen.dart]
  "Select due date": [lib/screens/invoice_summary_screen.dart]
  "Send invoice via WhatsApp": [lib/screens/invoice_summary_screen.dart]
  "Generate E-Invoice": [lib/screens/invoice_summary_screen.dart]
  "Generate E-Way Bill": [lib/screens/invoice_summary_screen.dart]
  "Create Invoice": [lib/screens/invoice_summary_screen.dart]
  "Update Invoice": [lib/screens/invoice_summary_screen.dart]
  "Invoice Created Successfully": [lib/screens/invoice_summary_screen.dart]
  "Invoice Updated Successfully": [lib/screens/invoice_summary_screen.dart]
  "Possible Duplicate": [lib/screens/invoice_summary_screen.dart]
  "Proceed": [lib/screens/invoice_summary_screen.dart]
  "Generating invoice number, please wait…": [lib/screens/invoice_summary_screen.dart]
  "Invoice is already being created. Please wait.": [lib/screens/invoice_summary_screen.dart]
  "Fixed in Invoice Settings": [lib/models/invoice_defaults.dart]
  "You do not have permission to view this register.": [lib/screens/sale_invoice_register_screen.dart]
  "Voucher creation is not enabled for this company.": [lib/services/create_access_service.dart]
  "Invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Invoice options": [lib/screens/settings/invoices_settings_screen.dart]
  "Default GST mode on invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Default price level": [lib/screens/settings/invoices_settings_screen.dart]
  "Show buyer PO number on invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Transporter details on invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Auto-send invoice via WhatsApp": [lib/screens/settings/invoices_settings_screen.dart]
  "Where invoices post in Tally": [lib/screens/settings/invoices_settings_screen.dart]
  "Setup Required": [lib/widgets/ledger_config_guard.dart]
relatedGuides:
  - gst-on-the-bill
  - ledger-mapping
  - record-receipt
  - e-invoice
  - e-way-bill
  - tally-sync
sections:
  - id: before-you-start
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: sales-invoice-create
  - id: make-the-invoice
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: sales-invoice-create
  - id: the-invoice-summary
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: sales-invoice-create
  - id: options-before-you-save
    featureKeys: [voucher_creation_mobile, einvoice_ewaybill_mobile, auto_invoice_dispatch]
    settings: {}
    permission: sales-invoice-create
  - id: settings-that-change-this-form
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: company-admin
  - id: saved-here-versus-in-tally
    featureKeys: [voucher_creation_mobile, tally_sync_dashboard]
    settings: {}
    permission: sales-invoice-create
  - id: when-something-goes-wrong
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: sales-invoice-create
images: []
---

A sales invoice is the bill you give a customer. In Takkada you make one in two screens: first you pick the items and rates, then you check the totals and save. The bill exists in the app straight away and is queued to go into your Tally.

## Before you start

- **Making entries from the app has to be switched on.** Otherwise you are told: **"Voucher creation is not enabled for this company."**
- **You need the right to create sales invoices.** Rights are set per register. A member who can only view sees **"You do not have permission to view this register."** on the register they are not allowed into, and the add button is disabled with its own reason where they can look but not create.
- **Your GST ledger mapping must be finished.** The app checks before it lets you build a bill. If it is not done you get a **"Setup Required"** message. See [How to map your Tally ledgers](/guide/ledger-mapping).
- **Your items and customers come from Tally.** If an item or a customer is missing, it has not been created there or has not synced yet.
- **Know your company's GST mode.** Your business has a default, and it may be locked. The next sections explain what that means for the rates you type.

## Make the invoice

Start from the customer's page and tap the add button, then **"Sales Invoice"**. Or open the **"Sales"** register and use its add button.

### Step 1 — items and rates

1. The **"Add Items"** screen opens with your item catalogue.
2. Find items with **"Search by item name, ID or HSN code"**, or browse and filter.
3. Tap an item to add it, then set its quantity and rate on the line.
4. Type over the rate if this customer is getting a different price. If your business uses price lists, the **"Price Level"** control at the top decides which prices the lines open with.
5. Apply a discount on a line with **"Discount %"** or **"Item Discount"** where your business uses them.
6. If the item is genuinely new and you have the right to add items, **"Create new item"** is there. Otherwise get it created in Tally.
7. Tap **"Save & Continue"**.

### Step 2 — the summary and saving

1. The **"Invoice Summary"** opens.
2. Under **"Invoice details"** check the **"Invoice No."** and the **"Invoice Date"**. The number is generated for you; the date defaults to today.
3. If your business keeps more than one sales voucher type in Tally, a **"Voucher Type"** control appears. Pick the right one — **"Select voucher type"** is the empty state. If your business keeps only one, no control is shown, because there is nothing to choose.
4. Check the lines under **"Item details"**.
5. Check the money under **"Amount Details"** — see the next section.
6. Set **"Payment Status"**: **"Unpaid"**, **"Paid"** or **"Partially Paid"**.
7. Set **"Payment Due"** if you give credit. There are quick chips, or tap **"Select due date"** to pick a day.
8. Tap the button at the bottom. It reads **"Create Invoice"** with the total beside it, and confirms with **"Invoice Created Successfully"**.

Editing an existing invoice works the same way; the button reads **"Update Invoice"** and confirms with **"Invoice Updated Successfully"**.

## The Invoice Summary money box

Read it top to bottom. It is deliberately in this order.

1. **"Amount"** — your lines added up before tax.
2. **"IGST"**, or **"CGST"** and **"SGST"** — the tax on those lines. Which pair you see depends on where the customer is; the app decides, you do not.
3. **"GST"** — the basis. Three chips: **"Incl. GST"**, **"Excl. GST"** and **"No GST"**. This says how the rates you typed are to be read. If your business has locked the choice, the chips are inert and a caption reads **"Fixed in Invoice Settings"**.
4. **"Round Off"** — a chip that rounds the bill to the whole rupee. It only appears when a Round Off ledger has been mapped.
5. **"Total"** — what the customer owes.

A **"GST off"** badge sits beside the heading when the invoice charges no tax at all. Any extra charges or discounts your business has set up in Ledger Mapping appear here too, each with its own amount box, in the order your business put them in.

There is more on this box in [How to check GST on a bill](/guide/gst-on-the-bill).

## Options before you save

What appears here depends entirely on your business and this customer. Nothing you cannot use is shown.

- **"Send invoice via WhatsApp"** — only when the customer has a phone number on file and your business has invoice sending switched on. If message credits have run out the switch is off with the reason beside it.
- **"Generate E-Invoice"** and **"Generate E-Way Bill"** — only when your business has that feature and the invoice qualifies for it. Saving the invoice successfully is not the same as the e-invoice going through; the app tells you separately if that part failed. See [How to generate an e-invoice](/guide/e-invoice) and [How to generate an e-way bill](/guide/e-way-bill).

Extra header fields — a buyer's purchase-order number, transporter details, terms of delivery, a cost centre — appear only when your business has switched those on in Invoice Settings. If you cannot find a field you expect, that switch is the reason.

## Settings that change this form

These are set once, by an owner or admin, under **Settings → "Invoices"**. Staff members do not see them.

Under **"Invoice options"**:

- **"Default GST mode on invoices"** — which of Incl., Excl. or No GST a new invoice opens on.
- **Only this GST mode** — when on, invoices cannot switch, and the chips carry the "Fixed in Invoice Settings" caption.
- **Round off on invoices** — three choices. Optional means each invoice decides and it starts off. On by default means new invoices open rounded and you can switch it off. Always on means every invoice is rounded and the chip cannot be turned off.
- **"Default price level"** — which price list a new sales invoice opens on. It can still be changed on the invoice.
- **"Show buyer PO number on invoices"**, **"Transporter details on invoices"** and the other display switches — each adds or removes a field from this form.
- **"Auto-send invoice via WhatsApp"** — whether the WhatsApp switch starts on.

Under **Tax & Tally**, **"Where invoices post in Tally"** opens your ledger mapping. Round Off in particular will not appear on an invoice until its ledger is mapped there.

## Saved here versus gone to Tally

Saving creates the invoice in the app at once, and the customer's outstanding goes up immediately. Reaching Tally is a second step, done by the connector on your Windows PC. If that PC is off, the invoice waits.

To see where a bill actually is, open the Tally Sync screen — see [How to check and fix Tally sync](/guide/tally-sync).

## When something goes wrong

**"Please add at least one item to continue".** The cart is empty. Add an item before continuing.

**"No items match your search".** Nothing in the catalogue matches what you typed, or a filter is on. Clear the search and check the filters.

**"Select a godown on every line before continuing."** Your business tracks stock by godown and at least one line has none chosen. Set it on each line.

**"You cannot add items in this business."** You do not have the right to create stock items. Ask an admin, or pick an existing item.

**"Setup Required" before you can even start.** Your GST ledgers are not mapped. Follow [How to map your Tally ledgers](/guide/ledger-mapping).

**"Generating invoice number, please wait…"** and the save button is not ready. The app is reserving the next number. Wait a moment.

**"Invoice is already being created. Please wait."** You tapped save twice. Do not tap again — a second tap is exactly how a duplicate gets made.

**"Possible Duplicate".** The app has found an existing bill for this customer with the same number, or the same amount on the same day, and shows you what it found. Read it. Tap **"Proceed"** only if yours really is a separate bill.

**The GST chips will not change.** Your business has locked the mode. The caption "Fixed in Invoice Settings" says so. Only an admin can change it.

**The Round Off chip is missing.** No Round Off ledger is mapped. Map one under "Where invoices post in Tally" and it appears.

**The invoice saved but WhatsApp or the e-invoice did not.** The app tells you which part failed and the invoice itself stays saved. Fix the failed part separately rather than making the bill again.

**The invoice is not in Tally.** Normal for a few minutes, and expected while your Tally PC is off. The Tally Sync screen gives you the real reason.

## Related guides

- [How to check GST on a bill](/guide/gst-on-the-bill)
- [How to map your Tally ledgers](/guide/ledger-mapping)
- [How to record a receipt](/guide/record-receipt)
- [How to generate an e-invoice](/guide/e-invoice)
- [How to check and fix Tally sync](/guide/tally-sync)
