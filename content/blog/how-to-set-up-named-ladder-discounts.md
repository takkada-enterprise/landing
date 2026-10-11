---
title: "How to Set Up Named Ladder Discounts on an Invoice"
slug: "how-to-set-up-named-ladder-discounts"
meta_description: "How to set up named ladder discounts in Takkada: name the two extra steps, type the steps on an invoice line, check the PDF, and optionally lock staff."
primary_keyword: "set up named ladder discounts"
date: "2026-10-11"
author: "harsh"
category: "How-To"
excerpt: "Four steps from a blank setting to a bill that prints Disc., your own step names and Total Disc., with an optional lock so staff cannot touch the rate or the first discount."
---

To set up named ladder discounts in Takkada, the owner names the second and third discount steps once in Settings, Invoices, Discount step names, and from then on anyone billing a sales invoice or sales order can type up to three steps on a line. The first step is the line's usual Discount %. The two extra steps take your names, up to 16 characters each, such as Trade and Cash, and those names appear on the phone's discount sheet and as column headings on the invoice PDF. Typing 10, 5 and 2 on a ₹10,000 line, rate before GST, gives a total of 16.21% and a taxable value of ₹8,379.00. Tally receives that 16.21 in the item line's discount field. If you want staff to change only the named steps, the owner can also set each item's first discount and turn on a lock. The whole setup takes a few minutes and needs the Ladder discount add-on on your company.

## Step 1: Name the two extra steps

Open Settings, then Invoices. With the Ladder discount add-on on, you will see a tile called **Discount step names**, which reads "Your names for the two extra discounts: Disc 2, Disc 3" until you change it.

Tap it. The dialog says "These names appear on the discount box and as the column headings on your invoice." Fill in **Second discount** and **Third discount**, for example "Trade" and "Cash", and tap Save. A box left blank goes back to Disc 2 or Disc 3, so a column heading is never empty.

The names apply to the whole company. Only the owner's login can change them; other members see the names but cannot edit them.

## Step 2: Type the steps on a bill

Start a sales invoice or sales order from the phone and add an item. Tap the discount on the line, the "+ Discount" chip if it has none yet. The **Item Discount** sheet opens.

- **Discount %** is the first step
- The next two boxes carry your names, Trade and Cash in this example
- Each box takes 0 to 99.99, with up to two decimals

Type 10, 5 and 2. Under the boxes the sheet shows the price after each step and the total, "100.00 → 90.00 → 85.50 → 83.79 · total 16.21%" for an item at ₹100. Tap Apply.

The line in the cart now reads "10% + 5% + 2% · total 16.21%". A step left blank is skipped. If only Discount % is filled, the line is an ordinary single-discount line.

## Step 3: Check the bill and the PDF

On the invoice summary, the laddered line shows the same "10% + 5% + 2% · total 16.21%". For 100 units at ₹100, the line works out to a ₹1,621.00 discount and ₹8,379.00 taxable, with GST then charged on ₹8,379.00. At 18%, that is ₹754.11 CGST and ₹754.11 SGST.

Save and share the PDF. The items table keeps the Disc. column for the first step, adds a Trade column and a Cash column, and ends with Total Disc. A step column prints only when some line on that bill uses it, so a bill with no laddered line prints as before.

The bill syncs to Tally with your rate and 16.21 in the item line's discount field.

## Step 4 (optional): Lock the rate and first discount for staff

If the first discount is your fixed trade discount, set it per item. In Settings, Invoices, tap **First discount by item**. Your stock groups are listed; open one and enter each item's **First discount %**. Leave it empty for 0%.

Then turn on **Lock rate and first discount for staff** in the same Invoices screen. Its subtitle reads "Staff can change only Trade and Cash", with your names.

From then on, for logins other than the owner, on sales invoices, sales orders and quotations:

- the Rate box is read-only and the price level shows "(set by owner)"
- Discount % is read-only with "Set by owner"
- each new line takes the item's first discount
- the two named steps stay open

The server checks the first discount as well, and refuses a staff line that carries a different one. Credit notes are outside the lock.

For the full method behind the totals, read [how the ladder discount works on a Tally invoice](/blog/ladder-discount-in-tally-invoices). The module is at [ladder discount in Tally](/ladder-discount-tally).

## Frequently Asked Questions

**Q: Where do I name the discount steps?**

A: Settings, then Invoices, then Discount step names. Only the second and third steps take a name; the first is Discount %.

**Q: Who can change the step names and the lock?**

A: The owner's login. Other members see the names but cannot change them.

**Q: Does the item's first discount fill in when the lock is off?**

A: No. It fills new lines for staff only while the lock is on. With the lock off, the first step is whatever sits in Discount %, typed by hand or carried in from your price list.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will walk through these four steps with you on a call.
