---
slug: gst-on-the-bill
title: How to check GST on a bill
meta_title: "GST on a bill in Takkada: rates, tax rows and Round Off"
meta_description: What the GST chips on the Invoice Summary do to your rates, why a bill shows IGST or CGST and SGST, what the badges on a line mean, and how Round Off behaves.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Invoice Summary"
  - "Edit Invoice"
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
  - "GST Exempt"
  - "CGST & SGST"
  - "HSN"
  - "Round Off"
  - "Total"
  - "Fixed in Invoice Settings"
  - "Additional Charge"
  - "18% GST"
  - "Item details"
  - "Default GST mode on invoices"
  - "Only this GST mode"
  - "Round off on invoices"
  - "Each invoice chooses. Off unless selected."
  - "New invoices start rounded to the rupee. Can be switched off per invoice."
  - "Every invoice is rounded to the rupee. Cannot be switched off."
  - "Where invoices post in Tally"
  - "Invoices"
quoteSources:
  "Invoice Summary": [lib/screens/invoice_summary_screen.dart]
  "Edit Invoice": [lib/screens/sales_invoice_detail_screen.dart]
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
  "GST Exempt": [lib/screens/invoice_summary_screen.dart]
  "CGST & SGST": [lib/screens/invoice_summary_screen.dart]
  "HSN": [lib/screens/invoice_summary_screen.dart]
  "Round Off": [lib/screens/invoice_summary_screen.dart]
  "Total": [lib/screens/invoice_summary_screen.dart]
  "Fixed in Invoice Settings": [lib/models/invoice_defaults.dart]
  "Additional Charge": [lib/screens/invoice_summary_screen.dart]
  "18% GST": [lib/screens/invoice_summary_screen.dart]
  "Item details": [lib/screens/invoice_summary_screen.dart]
  "Default GST mode on invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Only this GST mode": [lib/screens/settings/invoices_settings_screen.dart]
  "Round off on invoices": [lib/screens/settings/invoices_settings_screen.dart]
  "Each invoice chooses. Off unless selected.": [lib/models/invoice_defaults.dart]
  "New invoices start rounded to the rupee. Can be switched off per invoice.": [lib/models/invoice_defaults.dart]
  "Every invoice is rounded to the rupee. Cannot be switched off.": [lib/models/invoice_defaults.dart]
  "Where invoices post in Tally": [lib/screens/settings/invoices_settings_screen.dart]
  "Invoices": [lib/screens/settings/invoices_settings_screen.dart]
relatedGuides:
  - sales-invoice
  - ledger-mapping
  - purchase-invoice
  - e-invoice
sections:
  - id: before-you-start
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: read-the-tax-on-a-saved-bill
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: the-gst-chips
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: the-tax-rows
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: what-the-line-badges-mean
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: round-off
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
  - id: when-something-goes-wrong
    featureKeys: []
    settings: {}
    permission: same-as-the-invoice-you-are-on
images: []
---

This guide explains what the GST controls on a bill actually do in the app — which number changes when you tap what, and why a bill shows the tax it shows. It describes the software's behaviour and nothing else. What your business should charge, and on what, is a question for your accountant.

Everything here lives in the **"Amount Details"** box at the bottom of the **"Invoice Summary"**.

## Before you start

- You reach this box by making or opening a bill, so whatever rights you have for that bill apply here. There is no separate GST screen.
- The tax figures are worked out from the GST rate on each item, which comes from your item master in Tally. If a rate is wrong, it is wrong in the item, not on the bill.
- Whether the tax splits one way or the other depends on your business's place of supply and the customer's. The app decides this; there is no control for it on the bill.
- The default GST mode, whether it can be changed, and the rounding rule are all set once by an owner or admin under **Settings → "Invoices"**. Staff members do not see those settings.

## Read the tax on a bill you have already saved

Nothing below changes a figure. This is how you get to the box and read it.

1. Open the bill from its register and let the detail screen load. Its heading is the bill's own number.
2. Tap **"Edit Invoice"** to reopen the bill on the **"Invoice Summary"** screen. The tax figures only live there; the detail screen shows the totals, not the controls behind them.
3. Scroll to the **"Amount Details"** box at the bottom of that screen. Everything on this page is inside it.
4. Read the tax rows first — either **"IGST"** on its own, or **"SGST"** and **"CGST"** one under the other. A row that would come to zero is not printed at all, so a missing row is a zero, not a fault.
5. Check the **"GST"** row under them. Whichever of the three chips is selected is how the app read every rate you typed on this bill.
6. Look for the **"Round Off"** chip and, if it is on, the difference shown beside it. That difference is part of what the customer pays.
7. Read the **"Total"** last, and leave the screen without saving if you only came to look.

## The GST chips: how your rates are read

The row labelled **"GST"** has three chips. They do not change your tax rate. They tell the app how to read the per-unit rates you typed.

- **"Incl. GST"** — the rate you typed already has tax inside it. The app works backwards to split the line into a taxable value and a tax amount. The customer's total does not move.
- **"Excl. GST"** — the rate you typed is before tax. The app adds tax on top, so the total goes up.
- **"No GST"** — this bill charges no tax at all. The tax rows disappear and a **"GST off"** badge appears beside the "Amount Details" heading.

Tapping a different chip re-reads every rate on the bill through the new meaning, so the numbers above will change. Look at the **"Total"** afterwards, every time.

If the chips are greyed out and a small line underneath says **"Fixed in Invoice Settings"**, your business has locked the mode. Every bill uses the one mode, and only an owner or admin can change that.

## The tax rows

Directly above the chips you see either:

- **"IGST"** on its own, or
- **"SGST"** and **"CGST"**, one under the other.

You never pick which. The app puts up whichever pair belongs to this bill, based on where the goods are going. A row that would be zero is simply not shown.

Below them come your business's own extra charges and discounts, if it has set any up. Each one has its own box with its own amount, in the order your business arranged them under **"Where invoices post in Tally"** — see [How to map your Tally ledgers](/guide/ledger-mapping).

The general **"Additional Charge"** box, when your business has that ledger mapped, has one extra control: once you type an amount, a chip appears offering **"18% GST"** on that charge. Tapping it adds tax on the charge and the totals above adjust. Leave it off and the charge carries no tax.

## What the badges on a line mean

Under **"Item details"** each line carries a small line of its own:

- **"IGST"**: followed by the item's rate, or **"CGST & SGST"**: followed by half of it — the same split as the totals, per line.
- **"HSN"**: followed by the item's HSN code, when the item has one.
- **"GST Exempt"** in a red badge when this item carries a zero rate but the bill does charge tax on other lines.
- **"GST off"** in the same place when the whole bill is on the No GST mode.

Those last two look similar and mean quite different things. "GST Exempt" is about the item. "GST off" is about the bill. If you see "GST Exempt" on an item you expect to be taxed, the rate on that item is zero in your masters — fix it there, not here.

## Round Off

**"Round Off"** is a chip in the same box, and it appears only when your business has mapped a Round Off ledger. If you cannot see it, that mapping is missing.

Tapping it on rounds the bill to the nearest whole rupee and shows the difference beside the chip. That difference can be positive or negative; a negative one is shown in red. The **"Total"** moves with it.

Your business's rule for this is set under **"Round off on invoices"** and there are three:

- **Optional** — **"Each invoice chooses. Off unless selected."** The chip starts off; you turn it on when you want it.
- **On by default** — **"New invoices start rounded to the rupee. Can be switched off per invoice."**
- **Always on** — **"Every invoice is rounded to the rupee. Cannot be switched off."** The chip is on and inert, with the "Fixed in Invoice Settings" caption under it.

When you edit a bill that already had rounding on, the app keeps the rounding in step with the changed lines by itself — unless you had set the amount by hand, in which case your figure is left alone.

## What changes for different people and settings

- **The chips are the same everywhere.** The GST basis control on a sales order and a purchase order is the same control, so the choice reads identically wherever it is made.
- **Locking affects everyone.** When "Only this GST mode" is on, even an owner has to change the setting first; the bill cannot override it.
- **Round Off needs a ledger.** The rounding policy has no effect until a Round Off ledger is mapped, and the settings page says so rather than pretending it works.
- **Staff members cannot change any of these defaults**, only use them on the bill in front of them, and only where the bill's own controls are unlocked.

## When something goes wrong

**The total jumped when you tapped a GST chip.** That is the chips working. Going from Incl. to Excl. adds tax on top of the same rate. If the total should not have moved, you wanted the other chip.

**The chips will not respond.** Your business has locked the mode; look for the "Fixed in Invoice Settings" caption. Ask an admin.

**A line says "GST Exempt" but the item is taxable.** The item's GST rate is zero in your masters. Correct it in Tally and let the sync run, then rebuild the bill.

**The whole bill says "GST off" and you did not mean it.** The bill is on the No GST chip. Tap Incl. GST or Excl. GST, then check the total.

**There is no Round Off chip.** No Round Off ledger is mapped for your business. An admin maps one under "Where invoices post in Tally", after which the chip appears.

**You see IGST and expected CGST and SGST, or the other way round.** The app chose it from where the bill is going. Check the customer's state and your own on the bill before assuming the app is wrong; if the state on the party is wrong, correct the party.

**The tax adds up but the printed bill looks different.** The printed document is built from the same figures, but which fields print is a separate set of switches under Invoice Settings. Check there before assuming a calculation problem.

## Related guides

- [How to make a sales invoice](/guide/sales-invoice)
- [How to map your Tally ledgers](/guide/ledger-mapping)
- [How to record a purchase invoice](/guide/purchase-invoice)
- [How to generate an e-invoice](/guide/e-invoice)
