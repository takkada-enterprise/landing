---
slug: purchase-invoice
title: How to record a purchase invoice
meta_title: "Record a purchase invoice in Takkada from a supplier bill"
meta_description: Enter a supplier's bill with its own number and date, add items and taxes, mark what you have paid, and read whether the entry has actually reached Tally.
featureKey: voucher_creation_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Purchase"
  - "Purchase Invoice"
  - "Add Items"
  - "Save & Continue"
  - "Purchase Invoice Summary"
  - "Purchase Invoice details"
  - "Purchase Invoice No."
  - "Purchase Invoice Date"
  - "Supplier Invoice No."
  - "Supplier Invoice Date"
  - "Enter supplier invoice number"
  - "Other Ref"
  - "Buyer PO No."
  - "Enter PO number"
  - "Add PO date"
  - "Purchase Ledger"
  - "Select ledger"
  - "Amount Details"
  - "Round Off"
  - "Total"
  - "Payment Status"
  - "Create Purchase Invoice"
  - "Update Purchase Invoice"
  - "Purchase Details"
  - "Details"
  - "Invoice No"
  - "Invoice Date"
  - "Due Date"
  - "Taxable Amount"
  - "Total Amount"
  - "Paid Amount"
  - "TDS Deducted"
  - "Labour Charge"
  - "Invoice Discount"
  - "Update Payment Status"
  - "Which account paid?"
  - "Enter the amount paid to supplier"
  - "Amount cannot exceed total"
  - "Mark as Paid"
  - "Mark as Unpaid"
  - "Partially Paid"
  - "Payment status updated successfully"
  - "Payment status was left unchanged."
  - "Synced to Tally"
  - "Syncing to Tally…"
  - "Tally sync failed"
  - "Re-sync to Tally"
  - "Voucher Number"
  - "Edit Voucher Number"
  - "Voucher number updated successfully"
  - "Edit Invoice"
  - "Share"
  - "WhatsApp"
  - "Cancel Invoice"
  - "Keep Invoice"
  - "Invoice cancelled successfully"
  - "Invoices with e-invoice or e-way bill cannot be cancelled here."
  - "This invoice contains fractional GST rates, which are not editable in this flow yet."
  - "Unable to Load Invoice"
  - "Try Again"
  - "You do not have permission to view this register."
  - "Voucher creation is not enabled for this company."
quoteSources:
  "Purchase": [lib/screens/purchase_invoice_register_screen.dart]
  "Purchase Invoice": [lib/screens/party_details_screen.dart]
  "Add Items": [lib/screens/add_invoice_items_screen.dart]
  "Save & Continue": [lib/screens/add_invoice_items_screen.dart]
  "Purchase Invoice Summary": [lib/screens/invoice_summary_screen.dart]
  "Purchase Invoice details": [lib/screens/invoice_summary_screen.dart]
  "Purchase Invoice No.": [lib/screens/invoice_summary_screen.dart]
  "Purchase Invoice Date": [lib/screens/invoice_summary_screen.dart]
  "Supplier Invoice No.": [lib/screens/invoice_summary_screen.dart]
  "Supplier Invoice Date": [lib/screens/invoice_summary_screen.dart]
  "Enter supplier invoice number": [lib/screens/invoice_summary_screen.dart]
  "Other Ref": [lib/screens/invoice_summary_screen.dart]
  "Buyer PO No.": [lib/screens/invoice_summary_screen.dart]
  "Enter PO number": [lib/screens/invoice_summary_screen.dart]
  "Add PO date": [lib/screens/invoice_summary_screen.dart]
  "Purchase Ledger": [lib/screens/invoice_summary_screen.dart]
  "Select ledger": [lib/screens/invoice_summary_screen.dart]
  "Amount Details": [lib/screens/invoice_summary_screen.dart]
  "Round Off": [lib/screens/invoice_summary_screen.dart, lib/screens/purchase_invoice_detail_screen.dart]
  "Total": [lib/screens/invoice_summary_screen.dart]
  "Payment Status": [lib/screens/invoice_summary_screen.dart]
  "Create Purchase Invoice": [lib/screens/invoice_summary_screen.dart]
  "Update Purchase Invoice": [lib/screens/invoice_summary_screen.dart]
  "Purchase Details": [lib/screens/purchase_invoice_detail_screen.dart]
  "Details": [lib/screens/purchase_invoice_detail_screen.dart]
  "Invoice No": [lib/screens/purchase_invoice_detail_screen.dart]
  "Invoice Date": [lib/screens/purchase_invoice_detail_screen.dart]
  "Due Date": [lib/screens/purchase_invoice_detail_screen.dart]
  "Taxable Amount": [lib/screens/purchase_invoice_detail_screen.dart]
  "Total Amount": [lib/screens/purchase_invoice_detail_screen.dart]
  "Paid Amount": [lib/screens/purchase_invoice_detail_screen.dart]
  "TDS Deducted": [lib/screens/purchase_invoice_detail_screen.dart]
  "Labour Charge": [lib/screens/purchase_invoice_detail_screen.dart]
  "Invoice Discount": [lib/screens/purchase_invoice_detail_screen.dart]
  "Update Payment Status": [lib/screens/purchase_invoice_detail_screen.dart]
  "Which account paid?": [lib/screens/purchase_invoice_detail_screen.dart]
  "Enter the amount paid to supplier": [lib/screens/purchase_invoice_detail_screen.dart]
  "Amount cannot exceed total": [lib/screens/purchase_invoice_detail_screen.dart]
  "Mark as Paid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Mark as Unpaid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Partially Paid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Payment status updated successfully": [lib/screens/purchase_invoice_detail_screen.dart]
  "Payment status was left unchanged.": [lib/screens/purchase_invoice_detail_screen.dart]
  "Synced to Tally": [lib/screens/purchase_invoice_detail_screen.dart]
  "Syncing to Tally…": [lib/screens/purchase_invoice_detail_screen.dart]
  "Tally sync failed": [lib/screens/purchase_invoice_detail_screen.dart]
  "Re-sync to Tally": [lib/screens/purchase_invoice_detail_screen.dart]
  "Voucher Number": [lib/screens/purchase_invoice_detail_screen.dart]
  "Edit Voucher Number": [lib/screens/purchase_invoice_detail_screen.dart]
  "Voucher number updated successfully": [lib/screens/purchase_invoice_detail_screen.dart]
  "Edit Invoice": [lib/screens/purchase_invoice_detail_screen.dart]
  "Share": [lib/screens/purchase_invoice_detail_screen.dart]
  "WhatsApp": [lib/screens/purchase_invoice_detail_screen.dart]
  "Cancel Invoice": [lib/screens/purchase_invoice_detail_screen.dart]
  "Keep Invoice": [lib/screens/purchase_invoice_detail_screen.dart]
  "Invoice cancelled successfully": [lib/screens/purchase_invoice_detail_screen.dart]
  "Invoices with e-invoice or e-way bill cannot be cancelled here.": [lib/screens/purchase_invoice_detail_screen.dart]
  "This invoice contains fractional GST rates, which are not editable in this flow yet.": [lib/screens/purchase_invoice_detail_screen.dart]
  "Unable to Load Invoice": [lib/screens/purchase_invoice_detail_screen.dart]
  "Try Again": [lib/screens/purchase_invoice_detail_screen.dart]
  "You do not have permission to view this register.": [lib/screens/purchase_invoice_register_screen.dart]
  "Voucher creation is not enabled for this company.": [lib/services/create_access_service.dart]
relatedGuides:
  - record-payment
  - sales-invoice
  - gst-on-the-bill
  - ledger-mapping
  - tally-sync
sections:
  - id: before-you-start
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
  - id: enter-the-suppliers-bill
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
  - id: the-references
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
  - id: taxes-and-totals
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
  - id: what-you-have-paid
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
  - id: app-status-versus-tally-status
    featureKeys: [voucher_creation_mobile, tally_sync_dashboard]
    settings: {}
    permission: purchase-invoice-view
  - id: when-something-goes-wrong
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-create
images: []
---

A purchase invoice is a bill your supplier gave you. Recording it puts what you owe them into your books and adds the goods to your stock. The supplier's own number and date are kept alongside your internal number, so you can find the bill later by either.

## Before you start

- **Making entries from the app has to be switched on.** Otherwise you are told: **"Voucher creation is not enabled for this company."**
- **You need the right to the Purchase Invoices register.** Viewing and creating are separate rights, and a member without the view right sees **"You do not have permission to view this register."**
- **Your GST ledger mapping must include the purchase side.** Input CGST, Input SGST and Input IGST are what a purchase bill posts its tax to. See [How to map your Tally ledgers](/guide/ledger-mapping).
- **Have the supplier's bill in front of you.** You will need its number, its date and its line items.
- **The supplier and the items must exist.** They come from Tally, so anything missing has to be created there and synced.

## Enter the supplier's bill

Start from the supplier's page and tap the add button, then **"Purchase Invoice"**. Or open the **"Purchase"** register and use its add button.

1. The **"Add Items"** screen opens. Add each line from the supplier's bill with its quantity and rate.
2. Tap **"Save & Continue"**.
3. The **"Purchase Invoice Summary"** opens.
4. Under **"Purchase Invoice details"**, check the **"Purchase Invoice No."** — your own number, generated for you — and the **"Purchase Invoice Date"**.
5. Fill in the references described below.
6. Check the money in **"Amount Details"**.
7. Set the **"Payment Status"** for what you have paid so far.
8. Tap **"Create Purchase Invoice"**. Editing later, the same button reads **"Update Purchase Invoice"**.

## The references

This is where a purchase bill differs from a sales bill, and it is worth doing properly. Six months later these fields are how you find the document.

- **"Supplier Invoice No."** — the number printed on the supplier's own bill. The hint reads **"Enter supplier invoice number"**. Enter it exactly as they printed it, including any slashes or a year.
- **"Supplier Invoice Date"** — the date on their bill, which is often not the date you are keying it in.
- **"Buyer PO No."** — your purchase-order number, if you raised one. Type it under **"Enter PO number"** and set its date with **"Add PO date"**. This field only appears when your business has that switch on.
- **"Other Ref"** — anything else you want carried on the document: a challan number, a lorry receipt.
- **"Purchase Ledger"** — which purchase account in Tally these goods are bought under. **"Select ledger"** is the empty state. Your business may have one or several; if several, choose the one your accountant expects.

## Taxes and totals

The money box works exactly as it does on a sales bill, with the input side of GST instead of the output side. The **"Round Off"** chip appears if your business has mapped a Round Off ledger, and the **"Total"** at the bottom is what you owe the supplier.

The full explanation of the GST chips, the tax rows and rounding is in [How to check GST on a bill](/guide/gst-on-the-bill).

## What you have paid

Open a saved bill from the register. The screen is headed **"Purchase Details"** and has a **"Details"** section showing **"Invoice No"**, **"Invoice Date"**, **"Due Date"**, **"Taxable Amount"**, **"Total Amount"** and **"Paid Amount"**, plus **"Round Off"**, **"TDS Deducted"**, **"Labour Charge"** and **"Invoice Discount"** where the bill carries them.

To record what you have paid:

1. Open **"Update Payment Status"**.
2. Choose **"Mark as Paid"** for the whole bill, **"Partially Paid"** for some of it, or **"Mark as Unpaid"** to undo.
3. For a part payment, type the figure under **"Enter the amount paid to supplier"**.
4. If the figure is higher than what is already recorded, the sheet asks **"Which account paid?"** Choose the bank or cash account. This is not optional.
5. Save. You get **"Payment status updated successfully"**.

Step 4 exists because the app creates a real payment entry behind the scenes, and Tally refuses a payment with no bank named. If that entry cannot be created, the app leaves the status alone and tells you **"Payment status was left unchanged."** That is the app refusing to say "paid" in the app while your books say otherwise. More on payments in [How to record a payment](/guide/record-payment).

## App status versus Tally status

The detail screen carries a line telling you where the bill actually is:

- **"Syncing to Tally…"** — queued and on its way.
- **"Synced to Tally"** — the connector reported it went across.
- **"Tally sync failed"** — it did not. A **"Re-sync to Tally"** action is offered, which sends the invoice again with its current values on the next sync.

Read that line before you conclude anything. A bill you can see in the app is not necessarily in your books; that is what the line is for. For the reason behind a failure, open the Tally Sync screen — see [How to check and fix Tally sync](/guide/tally-sync).

## Changing or cancelling a bill

- **"Edit Invoice"** reopens the bill for changes.
- **"Voucher Number"** can be corrected on its own through **"Edit Voucher Number"**, which confirms with **"Voucher number updated successfully"**.
- **"Cancel Invoice"** marks the bill cancelled while keeping it in your records. The confirmation offers **"Keep Invoice"** if you change your mind, and success reads **"Invoice cancelled successfully"**.

You can also **"Share"** the bill, including over **"WhatsApp"**, where your business has that set up.

## What changes for different people and settings

- **Viewing and creating are separate rights**, and both are separate again from the Payments register. Someone who can enter purchase bills may not be able to record what was paid on them.
- **The buyer PO field, transporter details and the other extra header fields** appear only when an admin has switched them on in Invoice Settings.
- **Round Off appears only when its ledger is mapped.** No mapping, no chip.
- **A bill with an e-invoice or e-way bill against it cannot be cancelled from this screen.** The app says so: **"Invoices with e-invoice or e-way bill cannot be cancelled here."**
- **Purchase settings are business-wide.** Staff do not see them; ask an admin.

## When something goes wrong

**"Amount cannot exceed total".** You typed a paid figure larger than the bill. Check the number.

**"Payment status was left unchanged."** The payment behind the status change could not be created. Most often the bank was not chosen, or the app could not reach the server. Try again and answer "Which account paid?".

**"This invoice contains fractional GST rates, which are not editable in this flow yet."** The bill has a rate the edit screen cannot yet handle. Leave it as it is and make the correction in Tally, or contact support.

**"Invoices with e-invoice or e-way bill cannot be cancelled here."** Exactly what it says. Those documents have to be dealt with through the compliance flow first.

**"Unable to Load Invoice".** The bill could not be fetched. Tap **"Try Again"**; if it persists, check your internet.

**"Tally sync failed".** Open the Tally Sync screen for the real reason — nearly always a supplier, item or ledger name that does not exist in Tally under exactly that spelling. Use **"Re-sync to Tally"** only after you have fixed the cause; resending an unchanged bill will fail the same way.

**You cannot find a bill you entered.** Check the register's month and any search text. Purchase bills are filed by your own invoice date, not by the supplier's date.

## Related guides

- [How to record a payment](/guide/record-payment)
- [How to make a sales invoice](/guide/sales-invoice)
- [How to check GST on a bill](/guide/gst-on-the-bill)
- [How to map your Tally ledgers](/guide/ledger-mapping)
- [How to check and fix Tally sync](/guide/tally-sync)
