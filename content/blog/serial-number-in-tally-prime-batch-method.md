---
title: "Serial Number in Tally Prime: Track Each Unit with One Batch per Unit"
slug: "serial-number-in-tally-prime-batch-method"
meta_title: "Serial Number in Tally Prime: One Batch per Unit Method"
meta_description: "How to track item serial numbers in Tally Prime: turn on batches, name each unit's batch by its serial or IMEI, find unsold units, and know the limits."
primary_keyword: "serial number in tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "Tally Prime has no serial-number field on a stock item, but its batches can do the job. Here is the one-batch-per-unit method, step by step, with three phones as the example and the limits you should know."
---

To keep a serial number in Tally Prime for every unit you buy and sell, make each unit its own batch and name that batch by the unit's serial number or IMEI. Tally Prime has no separate serial-number field on a stock item, and most search results about serial numbers in Tally are really about voucher numbering or the Tally licence serial. The batch method uses features Tally already has. Press F11 and set Enable Batches to Yes, then set Maintain in batches to Yes on the stock item. On the purchase, type each unit's number as a batch with quantity 1, and on the sale, pick that unit's batch. The Batch Summary report then lists every number with its closing quantity, so a batch still showing 1 is a unit you have not sold. The method records the number only. Colour, engine number and the parts inside a finished unit have to be kept somewhere else, and the limits are set out below.

## Key Highlights

- Tally's own help suggests using the IMEI as the batch number for a single unit, so each phone, vehicle or battery becomes one batch of quantity 1.
- Two switches turn it on: Enable Batches in F11 for the company, and Maintain in batches on each stock item that is sold unit by unit.
- The batch holds one number per unit; any other detail, such as colour or motor number, needs a register, a TDL or an app beside Tally.

## In This Article

- Which serial number are you looking for?
- How to track serial numbers with batches in Tally Prime
- Worked example: three phones by IMEI
- Batch number vs serial number
- What the batch method cannot do
- Three ways to go further
- Where Takkada fits
- Further reading
- Frequently Asked Questions

## Which serial number are you looking for?

Three different things are called a serial number in Tally.

| What it is | Where it lives in Tally |
|---|---|
| The serial number of each unit, such as an IMEI or chassis number (this guide) | No field of its own; kept as a batch name |
| The number on each invoice | Voucher type numbering |
| Your Tally licence serial | Tally's licence pages |

## How to track serial numbers with batches in Tally Prime

These steps follow Tally's help pages on batches and on finding unsold goods with batch-wise details.

1. **Turn on batches for the company.** Press F11 (Company Features) and set Enable Batches to Yes.
2. **Set the item to keep batches.** Open the stock item (Alt+G, Alter Master, Stock Item) and set Maintain in batches to Yes. If the option is not shown, press F12 (Configure) in the stock item screen and turn on Maintain Stock Item in Batches.
3. **Record the purchase one unit per batch.** In the purchase voucher (F9), select the item. In the Stock Item Allocations screen, type the first unit's serial number or IMEI as the batch, with quantity 1 and its rate. Add a new batch line for each unit on the bill.
4. **Pick the unit on the sale.** In the sales voucher (F8), select the item and choose the batch that carries the number of the unit going out.
5. **See what is unsold.** Press Alt+G and open Batch Summary for the item. A batch with a closing quantity of 1 is still in stock, and sold units show a blank closing balance.

Tally's help also allows a lot or month prefix before the number, such as Feb-356789104562318. Whatever pattern you pick, keep it the same every time.

## Worked example: three phones by IMEI

A shop buys three handsets of Smartphone 128 GB and sells one.

| Step | Batch name (IMEI) | Quantity | Closing quantity after the step |
|---|---|---|---|
| Purchase bill, line 1 | 356789104562318 | 1 | 1 |
| Purchase bill, line 2 | 356789104562326 | 1 | 1 |
| Purchase bill, line 3 | 356789104562334 | 1 | 1 |
| Sale on INV/0033 to Ravi Kumar | 356789104562318 | 1 out | blank (sold) |

The Batch Summary now shows two IMEIs with a closing quantity of 1, the two phones on the shelf. If Ravi Kumar comes back, batch 356789104562318 leads to INV/0033. The report cannot tell you that his phone was Black and the other two are Blue, because colour is not part of a batch.

## Batch number vs serial number

The method above uses a batch to do a serial number's job.

| | Batch number | Serial number |
|---|---|---|
| Covers | Many units made or bought together | Exactly one unit |
| Typical quantity | 50 strips, 200 bottles, 12 cartons | 1 |
| Usual purpose | Expiry, rate or quality by lot | Who bought this exact unit, and on which bill |
| Examples | B2409, LOT-17 | IMEI, chassis number, battery number |

For lots of medicine or paint, see our guide to [batch-wise billing](/blog/batch-wise-billing-for-tally/). For phones, vehicles or batteries, each unit is a batch of one.

## What the batch method cannot do

The batch method needs nothing beyond Tally itself, and it stops at the number.

| What you need | What Tally batches give you |
|---|---|
| Colour, motor number or battery number per unit | The batch name only; the rest goes in a register |
| A warning that a number is already sold | The batch balance, if someone checks it |
| The parts inside a finished unit | No link; usually a shop-floor notebook |
| The details printed under the item | Lines typed by hand on every bill |
| Units sold by colour or model | Quantities by batch, counted by hand |

## Three ways to go further

When the number alone is not enough, there are three routes.

| Route | Where the details live | Who can enter units |
|---|---|---|
| Tally batches alone | The batch name only | Whoever works on that Tally |
| A TDL that adds serial fields to Tally | In Tally, in fields the TDL adds | Whoever works on that Tally |
| An app beside Tally | In the app; the unit number goes to Tally as the batch | Anyone with the app, on a phone or the web |

Our [comparison of a serial number TDL and an app beside Tally](/blog/serial-number-tdl-tally-prime-alternative/) sets out when each fits.

## Where Takkada fits

Takkada's Custom Fields add-on is the third route. You add the details you keep for every unit to a stock group, such as chassis no, colour or IMEI. One field is the Unit no, the batch name in Tally, so "Maintain in batches" must be on for those items in Tally, as in step 2. There is no TDL to install: the details are kept in Takkada, and the unit number travels to Tally as the batch through Takkada's Tally connector.

Buy 5 and you get 5 rows, one per unit; paste a column of numbers to fill them. A sales bill picks from units still in that godown. No unit is sold twice in Takkada: the bill is refused, naming the bill that holds the unit, and a sale typed straight into Tally is matched after Takkada syncs. The details print under the item, and Units by detail counts units sold or in stock by any field. The [serial number tracking for Tally](/serial-number-tracking-tally/) page walks through it, with [IMEI tracking for Tally](/imei-tracking-tally/) for phone shops and [chassis number tracking for Tally](/chassis-number-tracking-tally/) for vehicle dealers.

## Further reading

- [How to add description in a Tally Prime invoice](/blog/print-serial-details-on-tally-invoice/)
- [EV assemblers on Tally: battery and chassis numbers](/blog/ev-assembler-battery-chassis-numbers-tally/)
- [Batch wise sales report in Tally, and sales by colour](/blog/units-sold-by-colour-report-tally/)
- [Battery dealers: find who bought battery no. X](/blog/battery-serial-number-history-dealers/)
- [Tally Prime mein serial number aur IMEI kaise daale](/blog/tally-prime-mein-serial-number-imei-kaise-daale/), in Hinglish

## Frequently Asked Questions

**Q: How do I add item serial number in Tally Prime?**

A: Use a batch for each unit. Turn on Enable Batches in F11, set Maintain in batches to Yes on the stock item, and on the purchase type each unit's serial number as a batch with quantity 1. A bill of 10 units then has 10 batch lines.

**Q: Can Tally Prime track IMEI numbers?**

A: Yes, as batch names. Tally's own help gives the IMEI as an example of a batch number for a single unit, so each phone is one batch of quantity 1 and the Batch Summary shows which IMEIs are in stock.

**Q: What is the difference between batch number and serial number?**

A: A batch number covers many units made together, such as 200 bottles of one lot. A serial number covers exactly one unit, such as one phone's IMEI, and in Tally it is kept as a batch of quantity 1.

**Q: Where can I see unsold serial numbers in Tally Prime?**

A: Press Alt+G and open Batch Summary for the item. Every batch with a closing quantity of 1 is a unit still in stock; in the example above, 2 of the 3 IMEIs.

**Q: Can I print serial numbers on a Tally invoice?**

A: Yes. Turn on Provide Additional Descriptions for Stock Items with F12 in the sales voucher and type the number in the item's description lines, which print under the item. Our guide on [adding description in a Tally Prime invoice](/blog/print-serial-details-on-tally-invoice/) has the steps.

**Q: Do I need a TDL for serial numbers in Tally?**

A: No, the batch method needs nothing installed. A TDL helps when you want more fields and all entry happens at the Tally computer; an app beside Tally helps when units are entered on phones or at 2 or more counters.

Takkada's Custom Fields add-on keeps your own details for every unit, with the Unit no as the batch name in Tally, so "Maintain in batches" stays on for those items. The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company.
