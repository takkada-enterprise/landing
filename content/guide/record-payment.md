---
slug: record-payment
title: How to record a payment
meta_title: "Record a supplier payment in Takkada against a bill"
meta_description: Enter money you have paid a supplier, choose which bank or cash account it left, tie it to a purchase bill, and know what it takes to reach Tally.
featureKey: voucher_creation_mobile
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "New Payment"
  - "Payments"
  - "Payment"
  - "Create Payment"
  - "Edit Payment"
  - "Payment No."
  - "Creating payment for"
  - "Amount"
  - "Add tax and discount"
  - "Add notes"
  - "Select mode of payment"
  - "No bank accounts found"
  - "Create payment"
  - "Update payment"
  - "Saving..."
  - "Payment created"
  - "Possible Duplicate"
  - "Create anyway"
  - "Amount must be greater than 0"
  - "Please select mode of payment"
  - "Payment updated successfully"
  - "Update Payment Status"
  - "Mark as Paid"
  - "Mark as Unpaid"
  - "Partially Paid"
  - "Enter custom amount"
  - "Full payment received"
  - "No payment made"
  - "Payment status updated successfully"
  - "Payment status was left unchanged."
  - "No Payments Yet"
  - "Search payments by name, bank, or narration"
  - "Total Payments"
  - "You do not have access to the Payments register for this business."
  - "Voucher creation is not enabled for this company."
  - "Payments & reminders"
  - "Money in & out"
  - "Bank accounts"
  - "UPI QR on unpaid invoices"
quoteSources:
  "New Payment": [lib/screens/payments_register_screen.dart]
  "Payments": [lib/screens/payments_register_screen.dart]
  "Payment": [lib/screens/party_details_screen.dart]
  "Create Payment": [lib/screens/create_payment_screen.dart]
  "Edit Payment": [lib/screens/create_payment_screen.dart]
  "Payment No.": [lib/widgets/voucher/voucher_number_field.dart]
  "Creating payment for": [lib/screens/create_payment_screen.dart]
  "Amount": [lib/widgets/voucher/amount_input_field.dart]
  "Add tax and discount": [lib/widgets/voucher/tax_discount_modal.dart]
  "Add notes": [lib/widgets/voucher/notes_widgets.dart]
  "Select mode of payment": [lib/widgets/voucher/bank_selection_list.dart]
  "No bank accounts found": [lib/widgets/voucher/bank_selection_list.dart]
  "Create payment": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Update payment": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Saving...": [lib/widgets/voucher/create_voucher_bottom_bar.dart]
  "Payment created": [lib/widgets/voucher/voucher_success_dialog.dart]
  "Possible Duplicate": [lib/widgets/voucher/duplicate_voucher_dialog.dart]
  "Create anyway": [lib/widgets/voucher/duplicate_voucher_dialog.dart]
  "Amount must be greater than 0": [lib/screens/create_payment_screen.dart]
  "Please select mode of payment": [lib/screens/create_payment_screen.dart]
  "Payment updated successfully": [lib/screens/create_payment_screen.dart]
  "Update Payment Status": [lib/screens/purchase_invoice_detail_screen.dart]
  "Mark as Paid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Mark as Unpaid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Partially Paid": [lib/screens/purchase_invoice_detail_screen.dart]
  "Enter custom amount": [lib/screens/purchase_invoice_detail_screen.dart]
  "Full payment received": [lib/screens/purchase_invoice_detail_screen.dart]
  "No payment made": [lib/screens/purchase_invoice_detail_screen.dart]
  "Payment status updated successfully": [lib/screens/purchase_invoice_detail_screen.dart]
  "Payment status was left unchanged.": [lib/screens/purchase_invoice_detail_screen.dart]
  "No Payments Yet": [lib/screens/payments_register_screen.dart]
  "Search payments by name, bank, or narration": [lib/screens/payments_register_screen.dart]
  "Total Payments": [lib/screens/payments_register_screen.dart]
  "You do not have access to the Payments register for this business.": [lib/screens/payments_register_screen.dart]
  "Voucher creation is not enabled for this company.": [lib/services/create_access_service.dart]
  "Payments & reminders": [lib/screens/settings/payments_settings_screen.dart]
  "Money in & out": [lib/screens/settings/payments_settings_screen.dart]
  "Bank accounts": [lib/screens/settings/payments_settings_screen.dart]
  "UPI QR on unpaid invoices": [lib/screens/settings/payments_settings_screen.dart]
relatedGuides:
  - record-receipt
  - purchase-invoice
  - bills-and-outstanding
  - party-ledger
  - tally-sync
sections:
  - id: before-you-start
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: payments-register-create
  - id: record-a-payment
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: payments-register-create
  - id: paying-a-particular-purchase-bill
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: purchase-invoice-and-payments-create
  - id: bank-or-cash
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: payments-register-create
  - id: recording-money-is-not-collecting-money
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: payments-register-create
  - id: when-something-goes-wrong
    featureKeys: [voucher_creation_mobile]
    settings: {}
    permission: payments-register-create
images: []
---

A payment records money going out — usually to a supplier. Recording it in the app reduces what you owe that supplier and queues the entry for your Tally.

## Before you start

- **Making entries from the app has to be switched on for your business.** If it is not, you are told: **"Voucher creation is not enabled for this company."**
- **You need the right to create in the Payments register.** Rights are set per register, so someone who can enter receipts may still not be able to enter payments. Without it the add button says **"You do not have access to the Payments register for this business."**
- **You need a bank or cash account.** A payment cannot be saved without saying what it went out of. If the account list shows **"No bank accounts found"**, none has reached the app from Tally yet.
- **Know the supplier.** Payments are always made against a party, so start from the right one.

## Record a payment

Two doors, same form. From a supplier's page tap the add button and choose **"Payment"**, or open the **"Payments"** register and tap **"New Payment"**.

1. The form opens as **"Create Payment"**, with the supplier's name under **"Creating payment for"**. Check the name.
2. **"Payment No."** is filled in for you.
3. Type the **"Amount"** you paid.
4. If some of it is tax or a discount, tap **"Add tax and discount"**. Skip this for a plain payment.
5. Set the date. It defaults to today; change it if the money went out earlier.
6. Tap **"Add notes"** to write the cheque number, UTR or anything else you will want to see later.
7. Under **"Select mode of payment"**, tap the bank or cash account the money left.
8. Tap **"Create payment"**. It shows **"Saving..."** and then confirms with **"Payment created"**.

To change one you already entered, open it from the register. The form is headed **"Edit Payment"**, the button reads **"Update payment"**, and a successful change confirms with **"Payment updated successfully"**.

## Paying a particular purchase bill

The payment form itself does not have a bill picker. A payment entered here goes against the supplier as a whole — their overall balance drops, but no individual purchase bill is marked settled.

When you want a payment tied to one purchase bill, do it from the bill instead:

1. Open the purchase invoice from the Purchase Invoices register.
2. Open its payment status. The sheet is headed **"Update Payment Status"**.
3. Choose **"Mark as Paid"** for the whole bill (**"Full payment received"**), **"Partially Paid"** with **"Enter custom amount"** for part of it, or **"Mark as Unpaid"** (**"No payment made"**) to undo.
4. When the amount you enter is more than what is already recorded as paid, the sheet asks **which** bank or cash account paid it. Answer that — it is not optional.
5. Save. You get **"Payment status updated successfully"**.

Step 4 matters more than it looks. The app creates a real payment entry behind the scenes, and a payment with no bank account named is refused by Tally. If that entry cannot be created, the app deliberately leaves the bill's status alone rather than marking it paid — and tells you **"Payment status was left unchanged."** That is the app protecting you from a bill that says paid in the app and unpaid in your books.

See [How to record a purchase invoice](/guide/purchase-invoice) for the rest of that screen.

## Bank or cash

The list under **"Select mode of payment"** is your own bank and cash accounts, exactly as they exist in Tally. Choose the one the money actually left. This is what decides which account is reduced in your books, so a wrong choice here is a wrong entry, not just a wrong label.

Bank accounts are managed by an owner or admin under **Settings → "Payments & reminders" → "Money in & out" → "Bank accounts"**. Staff members do not see business settings, so if an account is missing, ask an admin. Accounts themselves come from Tally — if a ledger is not there, it will not be here.

## Recording money is not the same as collecting money

These are two different things and they are gated separately.

- **Recording a payment** is bookkeeping: you paid someone, you write it down. That is what this guide is about, and it is controlled by your register rights.
- **Collection tools** — the UPI QR a customer scans, payment links, reminders — are about getting money *in*, and are separate features your business may or may not have. On the payment form there is deliberately no UPI QR action, because a QR asking a supplier to pay you makes no sense there. You will see it on receipts, and only when a bank account has a UPI ID stored.

So: having the collection features switched on does not give anyone the right to enter payments, and being allowed to enter payments does not switch collection on. If you want the QR shown on unpaid invoices, an admin turns it on under **"UPI QR on unpaid invoices"** in the same settings page — and it stays off until a bank account has a UPI ID.

## Saved here versus gone to Tally

Saving puts the payment in the app immediately and the supplier's balance changes at once. Getting it into Tally is a second step that happens through the connector on your Windows PC. While that PC is off, the payment waits in a queue.

If a payment has not appeared in Tally, open the Tally Sync screen — see [How to check and fix Tally sync](/guide/tally-sync). The usual cause is a bank ledger or supplier name that does not exist in Tally under exactly that spelling.

## When something goes wrong

**"Amount must be greater than 0".** The amount is blank or zero.

**"Please select mode of payment".** No bank or cash account is selected. The save button stays off until you pick one.

**"No bank accounts found".** Nothing has come across from Tally. Create the bank or cash ledger in Tally and let the sync run.

**"Possible Duplicate".** The app has found an existing payment to the same party for the same amount on the same day and shows you it. If yours really is a second, separate payment, tap **"Create anyway"**. Otherwise cancel — this is how a payment gets entered twice.

**The register says "No Payments Yet" but you entered some.** A search or a month filter is on. Clear the **"Search payments by name, bank, or narration"** box and check the month. **"Total Payments"** at the top follows the same period, so it will look wrong for the same reason.

**You marked a purchase bill paid and it did not stick.** Read the message. If it says the status was left unchanged, the underlying payment could not be created — most often because the bank was not chosen or the app could not reach the server. Try again and answer the bank question.

**A member says the add button does nothing.** It is disabled with a reason. Tap it and read the message: it will either be the register right or the feature itself.

## Related guides

- [How to record a receipt](/guide/record-receipt)
- [How to record a purchase invoice](/guide/purchase-invoice)
- [How to read bills and outstanding](/guide/bills-and-outstanding)
- [How to open a party ledger and share a statement](/guide/party-ledger)
- [How to check and fix Tally sync](/guide/tally-sync)
