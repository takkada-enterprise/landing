---
slug: ledger-mapping
title: How to map your Tally ledgers
meta_title: "Map your Tally ledgers in Takkada for GST and charges"
meta_description: Tell Takkada which Tally ledger each tax, charge and discount belongs to, so every bill the app sends lands in the right place in your books.
featureKey: null
checkedAgainstAppOn: 2026-09-07
appRevision: 8444b1e82e199f3b5767f74cb201c8ca8a8cff9b
quotes:
  - "Ledger Mapping"
  - "Where invoices post in Tally"
  - "GST LEDGERS (SALES)"
  - "GST LEDGERS (PURCHASES)"
  - "Output CGST"
  - "Input IGST"
  - "SEPARATE LEDGERS PER GST RATE"
  - "Add the rates you bill at to map them."
  - "Add a rate"
  - "Add a GST rate"
  - "OPTIONAL LEDGERS"
  - "Round Off"
  - "Additional Charge (Labour / Packaging / Freight)"
  - "TDS (Tax Deducted at Source)"
  - "EXTRA CHARGES & DISCOUNTS"
  - "Add a charge or discount"
  - "Add another"
  - "Subtract"
  - "REVERSE CHARGE LEDGERS"
  - "Only if you record purchases under reverse charge (RCM)."
  - "Save Configuration"
  - "Create missing ledgers in Tally, then sync to see them here."
  - "is going to the wrong ledger"
  - "Setup Required"
  - "Configure Ledgers"
quoteSources:
  "Ledger Mapping": [lib/screens/ledger_config_screen.dart]
  "Where invoices post in Tally": [lib/screens/settings/invoices_settings_screen.dart]
  "GST LEDGERS (SALES)": [lib/screens/ledger_config_screen.dart]
  "GST LEDGERS (PURCHASES)": [lib/screens/ledger_config_screen.dart]
  "Output CGST": [lib/screens/ledger_config_screen.dart]
  "Input IGST": [lib/screens/ledger_config_screen.dart]
  "SEPARATE LEDGERS PER GST RATE": [lib/screens/ledger_config_screen.dart]
  "Add the rates you bill at to map them.": [lib/screens/ledger_config_screen.dart]
  "Add a rate": [lib/screens/ledger_config_screen.dart]
  "Add a GST rate": [lib/screens/ledger_config_screen.dart]
  "OPTIONAL LEDGERS": [lib/screens/ledger_config_screen.dart]
  "Round Off": [lib/screens/ledger_config_screen.dart]
  "Additional Charge (Labour / Packaging / Freight)": [lib/screens/ledger_config_screen.dart]
  "TDS (Tax Deducted at Source)": [lib/screens/ledger_config_screen.dart]
  "EXTRA CHARGES & DISCOUNTS": [lib/screens/ledger_config_screen.dart]
  "Add a charge or discount": [lib/screens/ledger_config_screen.dart]
  "Add another": [lib/screens/ledger_config_screen.dart]
  "Subtract": [lib/screens/ledger_config_screen.dart]
  "REVERSE CHARGE LEDGERS": [lib/screens/ledger_config_screen.dart]
  "Only if you record purchases under reverse charge (RCM).": [lib/screens/ledger_config_screen.dart]
  "Save Configuration": [lib/screens/ledger_config_screen.dart]
  "Create missing ledgers in Tally, then sync to see them here.": [lib/screens/ledger_config_screen.dart]
  "is going to the wrong ledger": [lib/screens/ledger_config_screen.dart]
  "Setup Required": [lib/widgets/ledger_config_guard.dart]
  "Configure Ledgers": [lib/widgets/ledger_config_guard.dart]
relatedGuides:
  - connect-tally
  - tally-sync
  - sales-invoice
  - gst-on-the-bill
  - purchase-invoice
sections:
  - id: before-you-start
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: map-gst-ledgers
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: separate-ledgers-per-rate
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: optional-ledgers
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: extra-charges-and-discounts
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: reverse-charge-ledgers
    featureKeys: []
    settings: {}
    permission: company-admin
  - id: when-something-goes-wrong
    featureKeys: []
    settings: {}
    permission: company-admin
images: []
---

A **ledger** in Tally is one named account that money is booked against — "Output CGST 9%", "Round Off", "Freight". When Takkada sends a bill to Tally, every line on that bill has to say which ledger it belongs to. **Ledger Mapping** is where you tell the app that, once, for your business. Get it right and every invoice, order and note the app creates lands in the same accounts your accountant already uses. Get it wrong and the bill still goes across — but the tax sits in the wrong account, and nothing in the app will shout about it.

## Before you start

- You need to be an owner or admin of the business. Business-wide settings are hidden from staff members, so if you cannot see the Invoices settings page, ask whoever owns the account to do this.
- Your Tally company must already be connected and synced at least once. The app can only offer you ledgers it has read out of your Tally. If a ledger you need is not in the list, it does not exist in Tally yet — the screen says so itself: "Create missing ledgers in Tally, then sync to see them here."
- Have your Tally open, or your accountant on the phone, so you can confirm the exact ledger names you use for GST.
- This is a one-time setup that you revisit only when your books change. It is not something you do per invoice.

## How to open the screen

1. Open **Settings**.
2. Tap **Invoices**.
3. Tap **"Where invoices post in Tally"**. The tick or warning icon beside it tells you whether the mapping is already complete.
4. The screen that opens is titled **"Ledger Mapping"**.

You may also arrive here from a bill. If you try to make an invoice before the GST mapping is finished, the app shows a **"Setup Required"** message with a **"Configure Ledgers"** button that brings you to the same screen.

## Map your GST ledgers

The first two cards are the ones almost every business fills in.

- **"GST LEDGERS (SALES)"** holds the ledgers your tax goes to when you sell. The three rows are **"Output CGST"**, Output SGST and Output IGST.
- **"GST LEDGERS (PURCHASES)"** holds the ledgers for tax on what you buy: Input CGST, Input SGST and **"Input IGST"**.

To fill them in:

1. Tap the box beside a row, for example Output CGST.
2. Type a few letters of the ledger name to search your Tally ledgers.
3. Tap the ledger you want.
4. Repeat for all six rows.
5. Scroll to the bottom and tap **"Save Configuration"**.

A red star beside a row means the app cannot finish a bill without it. If the app has already found a likely ledger in your own Tally, it fills the row in and shows a small line underneath saying where the suggestion came from. Check it before you save — a suggestion is a guess, not your decision.

## If Tally keeps a separate ledger for each GST rate

Some businesses keep one GST ledger per tax. Others keep one ledger for every rate they bill at, with names like "Output CGST 9%". If yours is the second kind, use the card called **"SEPARATE LEDGERS PER GST RATE"**. Tap its heading to open it.

1. Look under **"Add a rate"**. Tap the chip for a rate you bill at, for example 18%.
2. If the rate you want is not offered, tap **Other**, type the full rate in the **"Add a GST rate"** box and confirm.
3. Six rows appear for that rate — CGST and SGST at half the rate, IGST at the full rate, on both the sales and the purchase side.
4. Pick the matching Tally ledger for each row you actually use.
5. Repeat for every rate you bill at, then tap **"Save Configuration"**.

Two things follow from this, and the screen tells you both as you work:

- A rate row is used first. The plain ledger above is only the fallback for a rate you have not mapped here.
- Once every rate is mapped in this section, the red stars on the six plain rows above disappear, and you can clear them. Until then at least the plain ledgers are required, because some rate has to land somewhere.

If you keep only one ledger per tax, you can leave this whole card closed. The app tells you as much: **"Add the rates you bill at to map them."**

## Optional ledgers

The **"OPTIONAL LEDGERS"** card has four rows. None of them block saving. Fill in the ones your books use.

- **"Round Off"** — the ledger the small rounding difference on a bill is posted to.
- **"Additional Charge (Labour / Packaging / Freight)"** — a single ledger for a general extra charge on a bill.
- **Discount** — the ledger a discount line is posted to.
- **"TDS (Tax Deducted at Source)"** — the ledger for tax deducted at source, where your books record it.

Leave a row empty and the app simply will not offer that line on a bill.

## Your own charges and discounts

If you bill things the four rows above do not cover — freight, packing, a trade discount, a scheme rebate — use the **"EXTRA CHARGES & DISCOUNTS"** card. Each one you add gets its own box on a sales order and a sales invoice.

1. Tap **"Add a charge or discount"**.
2. Type the name you want to see on the bill, for example Freight. Keep it to 40 letters.
3. Pick the Tally ledger it posts to.
4. Choose whether it adds to the bill or subtracts from it. **"Subtract"** is the default, which suits a discount; switch it to Add for a charge.
5. Tap **"Add another"** for the next one, then **"Save Configuration"**.

Three rules the screen enforces, so it is worth knowing them before you type:

- A half-filled row blocks saving. A name with no ledger, or a ledger with no name, shows a short reason on that row. A row you have not touched at all is ignored.
- Two rows cannot share a name.
- Two rows cannot share the same Tally ledger, and neither can an extra row share a ledger with Round Off, Additional Charge or Discount. This is refused, not warned about: two lines pointing at one ledger get merged on the way to Tally, and the bill would no longer balance.

## Reverse charge ledgers

The last card, **"REVERSE CHARGE LEDGERS"**, is closed by default and explains itself: **"Only if you record purchases under reverse charge (RCM)."** Reverse charge means the buyer, not the seller, books the tax on a purchase. If your books do not do that, skip this card entirely. If they do, open it and map the payable and input rows plus the RCM Payment Ledger the same way as above.

## What changes for different people and settings

- **Owners and admins** see the business settings and can open and save this screen.
- **Staff members** do not see business-wide settings at all. A staff member who needs a new charge added has to ask an admin; there is no way to do it from a bill.
- **The ledger list itself is not a setting.** It is whatever your Tally holds after the last sync. Adding a ledger in Tally and syncing is the only way to make it appear here.
- **Nothing here creates a ledger in Tally.** The screen maps to ledgers that already exist.
- **Changing a mapping later does not rewrite bills already issued.** A document that has already gone out keeps the ledger it was made with.

## When something goes wrong

**Save is greyed out.** Something required is still empty, or an extra charge row is half-filled. Scroll up and look for a red star with no ledger beside it, and for a short red line under an extra row. Fix that one row and Save turns on.

**The ledger you want is not in the search list.** It does not exist in your Tally yet, or your last sync did not bring it across. Create it in Tally, let the desktop sync run, then reopen this screen. See [How to check and fix Tally sync](/guide/tally-sync).

**A red banner says GST at some rate "is going to the wrong ledger".** This is the important one. It means bills at that rate are resolving to a ledger that belongs to a different rate — your 18% tax is landing in your 2.5% account, for instance. Nothing else in the app will tell you. The banner lists each affected rate. Open the "SEPARATE LEDGERS PER GST RATE" card, map that rate's own ledgers, and save. Bills already sent to Tally are not corrected by saving; ask your accountant to fix those in Tally.

**You get "Setup Required" every time you try to bill.** Your GST mapping is not complete. Tap "Configure Ledgers", fill the starred rows, and save. If the app instead offers you a mapping it found in your own Tally, read it, and accept it only if the ledger names are the ones you use.

**You changed a mapping and the invoice still shows the old one.** Reopen the invoice screen. The app reads the mapping when the bill is started, not while you are typing on it.

## Related guides

- [How to connect your Tally company](/guide/connect-tally)
- [How to check and fix Tally sync](/guide/tally-sync)
- [How to make a sales invoice](/guide/sales-invoice)
- [How to check GST on a bill](/guide/gst-on-the-bill)
- [How to record a purchase invoice](/guide/purchase-invoice)
