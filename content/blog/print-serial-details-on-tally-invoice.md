---
title: "How to Add Description in a Tally Prime Invoice: Chassis No, IMEI and Colour"
slug: "print-serial-details-on-tally-invoice"
meta_title: "How to Add Description in Tally Prime Invoice, Per Unit"
meta_description: "How to add description in a Tally Prime invoice: turn it on, type chassis no, IMEI or colour under the item, and fix it when it does not print."
primary_keyword: "how to add description in tally prime invoice"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "One F12 setting opens a description screen under every item on a Tally Prime sales voucher. Here is how to turn it on, what vehicle and phone dealers type there, and what to check when the lines do not print."
---

Here is how to add description in Tally Prime invoice lines under an item. Open the sales voucher, press F12 (Configure) and set Provide Additional Descriptions for Stock Items to Yes. From then on, when you select a stock item and press Enter, the Description of Item screen opens. Type one line per detail, such as Chassis no: XEV24C000187, Motor no: MTR-48V-20931 and Color: Red, then press Enter to go back to the voucher. The lines print under that item on the invoice. This is where dealers put the serial number of each unit: a vehicle's chassis and motor numbers, a phone's IMEI, the colour and the battery numbers. The hard part is the typing, because the numbers are copied from a register onto every bill and one wrong digit means a corrected invoice. Below are the setting, what to type, why a description sometimes does not print, and how the lines can fill from each unit's own details.

## Key Highlights

- One F12 option in the sales voucher, Provide Additional Descriptions for Stock Items, opens the Description of Item screen for every item you select.
- Each detail goes on its own line, and the lines print under the item on the invoice: a scooter bill might carry 5 lines, a phone bill 2.
- Rule 46 of the CGST Rules does not name the IMEI or the chassis number among the invoice particulars, so printing them is your choice; confirm with your CA.

## In This Article

- Turning on item descriptions in a sales voucher
- What prints on the invoice
- Item description not showing in Tally Prime
- Typing each unit's details, or filling them from the unit
- IMEI, chassis number and the GST invoice
- Where Takkada fits
- Frequently Asked Questions

## Turning on item descriptions in a sales voucher

These steps follow Tally's own help on adding and printing descriptions for stock items.

1. Open a sales voucher (F8).
2. Press F12 (Configure) and set Provide Additional Descriptions for Stock Items to Yes. Save the configuration.
3. Select the stock item and press Enter. The Description of Item screen appears.
4. Type the descriptions, one detail per line. Press Enter to go back to the voucher, then fill in the quantity and rate as usual.
5. Save the voucher and print it. The description recorded for the item prints in the invoice, under the item name.

The description belongs to that line of that voucher, so it is typed fresh on each bill. That suits serial numbers, since every unit's numbers differ.

## What prints on the invoice

Two examples, with made-up numbers, of what dealers usually type.

| Item on the bill | Description lines typed under it |
|---|---|
| E-scooter 48V, qty 1 | Chassis no: XEV24C000187 |
| | Motor no: MTR-48V-20931 |
| | Color: Red |
| | Battery no: LFP-0457, LFP-0458 |
| | Charger no: CHG-11902 |
| Smartphone 128 GB, qty 1 | IMEI: 356789104562318 |
| | Color: Black |

Keep the label in front of each number, such as "Chassis no:" or "IMEI:", so the bill reads clearly months later. If one line has 3 phones, it needs 3 IMEIs under it, and nothing in the description screen checks that the count matches the quantity.

## Item description not showing in Tally Prime

When the description lines do not appear on the printed invoice, check these in order.

| What you see | Likely reason | What to do |
|---|---|---|
| The Description of Item screen never opens | The F12 option is off for this voucher | Press F12 in the sales voucher and set Provide Additional Descriptions for Stock Items to Yes |
| The lines print under the wrong item | They were typed after selecting a different item | Alter the voucher and move the lines to the right item |
| A POS bill prints without them | POS invoices have their own print setting | Tally's POS print configuration has Print Additional Description(s) for Item Name; set it to Yes |
| The screen opens but the print leaves the lines out | A customised invoice format may not print descriptions | Ask your Tally partner whether the format prints item descriptions |

In the last case the lines are still in the voucher, and they print once the format includes them.

## Typing each unit's details, or filling them from the unit

The description screen is plain text. Tally does not know that the line "Chassis no: XEV24C000187" belongs to one scooter, so it cannot warn you if the same chassis number is typed on two bills, and it cannot fill the motor number for you when you pick the vehicle.

| | Typed by hand on each bill | Filled from the unit's own details |
|---|---|---|
| Where the numbers come from | A register, the box or the vehicle | The details saved when the unit was bought |
| A digit typed wrong | Shows up later on the customer's papers | The lines are copied, so they match the purchase |
| The same number on two bills | Up to the clerk to notice | Can be refused when the bill is saved |
| Time per bill | One line at a time, for every unit | Picking the unit fills the lines |

Keeping each unit as a Tally batch named by its serial number is the first step either way. Our [serial number in Tally Prime guide](/blog/serial-number-in-tally-prime-batch-method/) shows the one-batch-per-unit method, and the [batch picking and expiry guide](/blog/how-to-pick-batch-show-mfg-expiry-on-invoice/) covers batches that are lots rather than single units.

## IMEI, chassis number and the GST invoice

Rule 46 of the CGST Rules lists what a tax invoice must carry, from the supplier's GSTIN and the invoice number to the HSN code, a description of the goods, the quantity, the taxable value and the tax. It does not name the IMEI, the chassis number or the engine number. So printing them is your choice, and many phone and vehicle dealers print them anyway, because the bill is the first thing a customer shows when a unit comes back. Confirm with your CA for your own case. Vehicle dealers also match the chassis and engine numbers on the bill with the vehicle's registration papers, so check the exact requirement with your RTO agent.

## Where Takkada fits

Takkada's Custom Fields add-on fills these description lines from each unit's own details. You set up fields for a stock group, such as chassis no, motor no, colour and battery no, and choose which ones print on the bill. One field is the Unit no, the batch name in Tally, so "Maintain in batches" must be on for those items in Tally. When you pick units on a sales invoice, the number you pick is the quantity, and their details fill the item's description lines, which you can still edit. The details print under the item on the sales invoice, sales order, delivery challan, credit note and debit note. The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. Your [invoice format](/custom-invoice-template-tally/) keeps its own look around them.

The [serial number tracking for Tally](/serial-number-tracking-tally/) page shows the whole flow, and vehicle dealers can see it on the [chassis number tracking for Tally](/chassis-number-tracking-tally/) page.

## Frequently Asked Questions

**Q: How to add additional description in Tally Prime?**

A: In the sales voucher, press F12 (Configure) and set Provide Additional Descriptions for Stock Items to Yes. Select the item and press Enter, and the Description of Item screen opens for you to type the lines. Press Enter to return to the voucher, and the lines print under the item.

**Q: Why is item description not showing in Tally Prime invoice?**

A: The most common reason is that Provide Additional Descriptions for Stock Items is off in F12, so the description screen never opened. On a POS bill, the POS print setting Print Additional Description(s) for Item Name must also be Yes. If the lines are in the voucher but not on the print, ask your Tally partner whether your invoice format prints descriptions.

**Q: Can I print the chassis number on a Tally invoice?**

A: Yes. Type it as a description line under the vehicle, such as "Chassis no: XEV24C000187", with the motor number and colour on the next lines. Many dealers also use the chassis number as the vehicle's batch name, so the Batch Summary shows which chassis numbers are still in stock.

**Q: Do I have to print the IMEI number on a GST invoice?**

A: Rule 46 of the CGST Rules, which lists the particulars of a tax invoice, does not name the IMEI, so printing it is your choice. Many phone dealers print it because it ties a returned handset to its bill. Confirm with your CA for your own case.

Takkada's Custom Fields add-on keeps the chassis no, IMEI, colour or any detail with every unit, and picking the unit on the bill fills its description lines, with the Unit no as the batch name in Tally, so "Maintain in batches" stays on for those items. No unit is sold twice in Takkada. Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company.
