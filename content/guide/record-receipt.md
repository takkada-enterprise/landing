---
slug: record-receipt
title: How to record a receipt
meta_title: "Record a receipt in Takkada, on account or against a bill"
meta_description: Enter money you have received, link it to the customer's unpaid bills so their balance drops, choose the bank or cash account, and watch it go across to Tally.
featureKey: voucher_creation_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "New Receipt"
  - "Receipts"
  - "Receipt"
  - "Create Receipt"
  - "Edit Receipt"
  - "Receipt No."
  - "Creating receipt for"
  - "Allocate against invoices"
  - "Select Invoices"
  - "Unpaid"
  - "Partial"
  - "Paid"
  - "Search by voucher number"
  - "Done"
  - "This party has no invoices"
  - "No invoices match the selected filter"
  - "Amount"
  - "Add tax and discount"
  - "GST Rate (%)"
  - "Add notes"
  - "Select mode of payment"
  - "No bank accounts found"
  - "Collect via UPI"
  - "Create receipt"
  - "Update receipt"
  - "Saving..."
  - "Receipt created"
  - "Possible Duplicate"
  - "Create anyway"
  - "Amount must be greater than 0"
  - "Please select mode of payment"
  - "Receipt updated successfully"
  - "Against invoice"
  - "No Receipts Yet"
  - "Search receipts by name, bank, or narration"
  - "Total Receipts"
  - "You do not have access to the Receipts register for this business."
  - "Voucher creation is not enabled for this company."
quoteSources:
  "New Receipt": [lib/screens/receipts_register_screen.dart]
  "Receipts": [lib/screens/receipts_register_screen.dart]
  "Receipt": [lib/screens/party_details_screen.dart]
  "Create Receipt": [lib/screens/create_receipt_screen.dart]
  "Edit Receipt": [lib/screens/create_receipt_screen.dart]
  "Receipt No.": [lib/widgets/voucher/voucher_number_field.dart]
  "Creating receipt for": [lib/screens/create_receipt_screen.dart]
  "Allocate against invoices": [lib/screens/create_receipt_screen.dart]
  "Select Invoices": [lib/screens/select_invoices_screen.dart]
  "Unpaid": [lib/screens/select_invoices_screen.dart]
  "Partial": [lib/screens/select_invoices_screen.dart]
  "Paid": [lib/screens/select_invoices_screen.dart]
  "Search by voucher number": [lib/screens/select_invoices_screen.dart]
  "Done": [lib/screens/select_invoices_screen.dart]
  "This party has no invoices": [lib/screens/select_invoices_screen.dart]
  "No invoices match the selected filter": [lib/screens/select_invoices_screen.dart]
  "Amount": [lib/widgets/voucher/amount_input_field.dart]
  "Add tax and discount": [lib/widgets/voucher/tax_discount_modal.dart]
  "GST Rate (%)": [lib/widgets/voucher/tax_discount_modal.dart]
  "Add notes": [lib/widgets/voucher/notes_widgets.dart]
  "Select mode of payment": [lib/widgets/voucher/bank_selection_list.dart]
  "No bank accounts found": [lib/widgets/voucher/bank_selection_list.dart]
  "Collect via UPI": [lib/screens/upi_qr_screen.dart]
  "Create receipt": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Update receipt": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Saving...": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Receipt created": [lib/widgets/voucher/voucher_success_dialog.dart]
  "Possible Duplicate": [lib/widgets/voucher/duplicate_voucher_dialog.dart]
  "Create anyway": [lib/widgets/voucher/duplicate_voucher_dialog.dart]
  "Amount must be greater than 0": [lib/screens/create_receipt_screen.dart]
  "Please select mode of payment": [lib/screens/create_receipt_screen.dart]
  "Receipt updated successfully": [lib/screens/create_receipt_screen.dart]
  "Against invoice": [lib/screens/create_receipt_screen.dart]
  "No Receipts Yet": [lib/screens/receipts_register_screen.dart]
  "Search receipts by name, bank, or narration": [lib/screens/receipts_register_screen.dart]
  "Total Receipts": [lib/screens/receipts_register_screen.dart]
  "You do not have access to the Receipts register for this business.": [lib/screens/receipts_register_screen.dart]
  "Voucher creation is not enabled for this company.": [lib/services/create_access_service.dart]
relatedGuides:
  - record-payment
  - bills-and-outstanding
  - party-ledger
  - sales-invoice
  - tally-sync
sections:
  - id: before-you-start
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: receipts-register-create
  - id: record-a-receipt
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: receipts-register-create
  - id: against-a-bill-or-on-account
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: receipts-register-create
  - id: payment-mode-and-bank
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: receipts-register-create
  - id: saved-here-versus-in-tally
    featureKeys: [voucher_creation_mobile, tally_sync_dashboard]
    settings: {}
    permission: receipts-register-create
  - id: when-something-goes-wrong
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: receipts-register-create
images: []
---

A receipt records money that has come in from a customer. Doing it in the app does two things at once: the customer's outstanding balance drops, and the entry is queued to go into your Tally.

The one decision that matters is whether you point the money at particular bills, or leave it sitting against the customer generally. This guide covers both.

## Before you start

- **Making entries from the app has to be switched on for your business.** If it is not, the app tells you plainly: **"Voucher creation is not enabled for this company."**
- **You need the right to create in the Receipts register.** Access is set per register and per person, so a colleague who can make invoices may still not be able to make receipts. If you do not have it, tapping the add button says: **"You do not have access to the Receipts register for this business."**
- **You need at least one bank or cash account set up.** Every receipt has to say what the money came into. With none set up you will see **"No bank accounts found"** where the account list should be, and you cannot save.
- **Know which bills this money is for.** If the customer told you which invoices they are settling, have those numbers ready.

## Record a receipt

There are two doors. From a party's page, tap the add button and choose **"Receipt"**. Or open the **"Receipts"** register and tap **"New Receipt"**.

1. The form opens headed **"Create Receipt"**, with the customer's name under **"Creating receipt for"**. Check that name first — a receipt against the wrong customer is a real mess to undo.
2. **"Receipt No."** at the top is filled in for you.
3. Decide what the money is for. Tap **"Allocate against invoices"** to pick particular bills — the next section explains this. Skip it to record the money without naming a bill.
4. Type the **"Amount"** you actually received.
5. If part of the amount is tax or a discount, tap **"Add tax and discount"** and fill in the box, which also lets you set a **"GST Rate (%)"**. Leave it alone if the receipt is a plain payment.
6. Set the date. It defaults to today; change it if the money came in earlier.
7. Tap **"Add notes"** if you want to write a line about the payment — a cheque number, or who handed it over.
8. Under **"Select mode of payment"**, tap the bank or cash account the money went into.
9. Tap **"Create receipt"** at the bottom. It changes to **"Saving..."** while it works, and you get a **"Receipt created"** confirmation.

## Against a bill, or on account

This is the part people ask about most.

**Against a bill** means you tell the app which unpaid invoices this money settles. In Tally the same idea is called *Against Ref* — a reference from the payment back to the specific bill it clears. The effect is that those bills stop showing as unpaid, by the amount you allocated.

**On account** means you record the money without naming a bill. In Tally that is *On Account*: the customer's balance drops, but no individual bill is marked settled. It is the honest choice when a customer sends a round figure and you do not yet know what it covers.

To allocate against bills:

1. On the receipt form, tap **"Allocate against invoices"**.
2. The **"Select Invoices"** screen opens with that customer's bills, each showing what is still due on it.
3. Use the chips at the top to narrow the list — **"Unpaid"**, **"Partial"**, **"Paid"** or **All**. Or use **"Search by voucher number"** if you have the number in hand.
4. Tap the bills this money settles. The count and the total appear as you tap.
5. Tap **"Done"**.
6. Back on the form, the card now shows how many invoices you selected and what they add up to.

Two things worth knowing:

- The allocation is only offered when you are creating a new receipt. Opening an existing one to change it shows the form as **"Edit Receipt"** without the picker.
- When a receipt was created from a particular bill, the form shows a read-only line labelled **"Against invoice"** naming it.

If you leave the picker alone, the receipt is simply on account. Nothing is wrong with that, and you can settle the bills later from the customer's outstanding list.

## Payment mode and bank account

The list under **"Select mode of payment"** is your own bank and cash accounts as they exist in Tally. Picking one is what tells your books where the money landed, so a receipt cannot be saved without it.

If a bank account has a UPI ID stored against it, a **"Collect via UPI"** action appears on that row. That is a separate thing from recording a receipt: it puts a QR in front of the customer so they can pay. The money arriving does not record itself — you still come back and record the receipt afterwards.

## Saved here versus gone to Tally

Saving is not the same as reaching Tally.

- **Saved** means the receipt exists in the app straight away and the customer's balance has already changed.
- **Sent to Tally** happens afterwards, through the connector on your Windows PC. If that PC is off, the receipt sits in a queue until it comes back on.

So a receipt you can see in the app is not proof it is in your books yet. To check, open the Tally Sync screen — see [How to check and fix Tally sync](/guide/tally-sync). The commonest failure there is a bank or party name that does not exist in Tally under exactly that spelling.

## What changes for different people and settings

- **Register rights are per register.** Being able to see the Receipts register is not the same as being able to add to it. The add button is disabled with its own reason when you can view but not create.
- **A party-scope restriction narrows the list.** A member limited to certain customers sees only those customers' receipts and only their bills in the invoice picker.
- **Editing is not always offered.** An existing receipt opens as **"Edit Receipt"**, and a successful change confirms with **"Receipt updated successfully"**. Some receipts cannot be changed from the app once they are in Tally.
- **UPI collection is a separate feature.** Being allowed to record money in does not mean the collection tools are switched on for your business, and having those tools does not give anyone the right to record receipts.

## When something goes wrong

**"Amount must be greater than 0".** The amount box is empty or zero. A receipt has to carry a figure.

**"Please select mode of payment".** You have not tapped a bank or cash account. Scroll to the account list and pick one.

**"No bank accounts found".** Your business has no bank or cash accounts the app can see. They come from Tally, so create the ledger there and let the sync run.

**"Possible Duplicate".** The app has spotted an existing receipt from the same customer for the same amount on the same day, and shows you the details. Read them. If it really is a second, separate payment, tap **"Create anyway"**. If not, cancel — this dialog exists to stop the same payment being entered twice.

**"This party has no invoices" in the picker.** There is nothing to allocate against. Either the bills were entered under a different party name, or this customer genuinely has none. Record the receipt on account and sort out the allocation later.

**"No invoices match the selected filter".** A chip is filtering the list. Tap All to see everything.

**The register says "No Receipts Yet" but you know there are some.** A search or filter is on. Clear the **"Search receipts by name, bank, or narration"** box and reset the month. The **"Total Receipts"** figure at the top of the register follows whatever period you have chosen, so check that too before you conclude money is missing.

**The receipt saved but is not in Tally.** That is normal for a few minutes, and expected for as long as your Tally PC is off. Check the Tally Sync screen for the actual reason.

## Related guides

- [How to record a payment](/guide/record-payment)
- [How to read bills and outstanding](/guide/bills-and-outstanding)
- [How to open a party ledger and share a statement](/guide/party-ledger)
- [How to make a sales invoice](/guide/sales-invoice)
- [How to check and fix Tally sync](/guide/tally-sync)
