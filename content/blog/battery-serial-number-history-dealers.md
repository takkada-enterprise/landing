---
title: "Battery Dealers: Find Who Bought Battery No. X, from Purchase to Sale"
slug: "battery-serial-number-history-dealers"
meta_title: "Battery Serial Number Tracking for Dealers on Tally"
meta_description: "Battery serial number tracking for dealers on Tally: the battery no on every bill, who bought it and when, and what to look up when a battery comes back."
primary_keyword: "battery serial number tracking"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "A customer walks in with a dead battery and no bill. With the serial number kept as a Tally batch and printed on every bill, the sale date, the bill and the party are one lookup away."
---

Battery serial number tracking for a dealer means that when a customer brings a battery back, the number on its label leads you straight to the bill it went out on, the sale date and the party. The method that works in Tally is to keep each battery as its own batch named by its serial number: switch on batches, set the battery's stock item to "Maintain in batches", enter each battery as a batch of quantity 1 on the purchase, and pick that batch when you sell it. Print the number on the sale bill too, so the customer's copy carries it. Then the Batch Summary shows which numbers are still in stock, and the battery's Batch Vouchers show the purchase and the sale. Without it, the dealer searches old bills by date and amount. This post covers what to look up, how to keep the number in Tally, a worked lookup, and what happens in the books when a battery comes back.

## Key Highlights

- Keep each battery as one Tally batch named by its serial number, with "Maintain in batches" set to Yes on the battery's stock item.
- Print the serial number under the item on the sale bill, so the customer's copy and your copy carry the same number.
- In the worked example, one lookup of battery LFP-0458 shows its purchase, the scooter it was fitted in, bill INV/0033, the sale date and the buyer.

## In This Article

- What to look up when a battery comes back
- Keeping the serial number in Tally
- Printing the number on the bill
- Worked example: the history of one battery
- When a battery comes back into stock
- Stock and sales by capacity or model
- What this covers, and what it leaves out
- Frequently Asked Questions

## What to look up when a battery comes back

A customer at the counter with a battery wants an answer, and the battery maker or distributor wants proof before it takes the battery back. These are the questions, and where each answer sits.

| Question | Where the answer is |
|---|---|
| Did we sell this battery? | The batch with this serial number, and whether its closing quantity is empty |
| On which bill, and on what date? | The sale voucher that took this batch out |
| To which customer? | The party on that sale voucher |
| Which purchase did it come in on? | The purchase voucher that brought this batch in, for your claim to the supplier |
| Was it fitted in something we sold? | Your production or fitting record, if you fit batteries into vehicles or inverter sets |

Whether the battery is still inside the maker's replacement period depends on the maker's own terms. The sale date is the part your books must answer quickly and correctly.

## Keeping the serial number in Tally

Tally's own help describes this method for phones by IMEI, and it works the same way for batteries (checked 10 November 2026).

1. Press F11 (Company Features) and set Enable Batches to Yes.
2. Open the battery's stock item (Alt+G > Alter Master > Stock Item) and set Maintain in batches to Yes. If the option is not shown, press F12 (Configure) and turn on Maintain Stock Item in Batches.
3. On the purchase, enter each battery as its own batch of quantity 1, named by the serial number on its label.
4. On the sale, pick the batch with that serial number.
5. To find a battery later, open the Batch Summary for the item (Alt+G > Batch Summary), select the batch and drill down to its Batch Vouchers.

A carton of 20 batteries means 20 batch lines on the purchase, typed at the Tally computer. The full method, with its limits, is in the guide to the [serial number in Tally Prime](/blog/serial-number-in-tally-prime-batch-method/).

## Printing the number on the bill

The batch name on a Tally sales voucher is your record. The customer's proof is the printed bill, so the serial number should print under the item. In Tally that is done through the item's description lines, typed on each bill, and the guide to [printing chassis no, IMEI and colour on a Tally invoice](/blog/print-serial-details-on-tally-invoice/) shows the setting. A customer who keeps the bill can then match the number on the battery to the number on the paper, and the counter conversation gets shorter.

## Worked example: the history of one battery

The numbers below are made up for the example. A dealer who also assembles electric scooters bought battery LFP-0458 in a lot, fitted it in a scooter and sold the scooter. Three months later Ravi Kumar brings the battery back. A lookup by its number reads:

| Date | Step | Document | Party |
|---|---|---|---|
| 2 August 2026 | Bought | Purchase invoice from the battery supplier | The battery supplier |
| 5 September 2026 | Used in a unit | Production run for scooter XEV24C000187 | |
| 14 September 2026 | Sold, inside XEV24C000187 | Sales invoice INV/0033 | Ravi Kumar |

The dealer now has the sale date for the customer, the purchase for the supplier's claim, and the scooter the battery sits in. In Takkada, linking a battery to the scooter it went into is a production run, which needs the Manufacturing add-on and covers in-house production, not job work. With a register and old bills, the same three answers mean a long search. EV and e-rickshaw assemblers who fit two batteries per vehicle can read how [battery, motor and chassis numbers move through production](/blog/ev-assembler-battery-chassis-numbers-tally/).

## When a battery comes back into stock

If the battery is taken back from the customer, the books need a sales return, which in Tally is a credit note against the original sale with the same batch. The battery's batch is back in stock and can be sold again or sent back to the supplier on a debit note. If the battery goes back to the supplier, the debit note picks the same batch, so the number leaves your stock. For making these notes away from the Tally computer, see [credit notes from your phone](/credit-note-from-phone/).

## Stock and sales by capacity or model

Batteries come in capacities and types, such as 100Ah and 150Ah, or tubular and flat plate. When the capacity is part of the stock item's name, Tally's stock reports count it already. When one stock item covers several types, the type needs to be kept with each unit to be counted. Batteries also sell on thin markups, which is covered in [billing for lubricant and battery distributors](/blog/lubricant-battery-distributor-billing/).

## What this covers, and what it leaves out

Takkada's Custom Fields add-on keeps your own details for every unit in Takkada, such as Battery no, capacity or type, with the Battery no as the Unit no, which is the batch name in Tally. Turn on "Maintain in batches" in Tally for those items. A purchase of 20 batteries gives 20 rows, and you can paste a column of numbers. The fields you mark Print on the bill print under the item on the sales invoice, and the sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. No battery is sold twice in Takkada.

Unit history takes a battery number and shows the battery, its details, the vehicle it went into if any (production runs need the Manufacturing add-on), and every step with date, bill number and party. A credit note against an invoice offers only the units on that invoice, and a returned battery is back in stock to sell again. Units by detail counts batteries sold or in stock by any field, such as capacity. Batteries bought straight in Tally show up marked Details missing after Takkada syncs with Tally, so you can fill them in.

It finds who bought a battery, on which bill and when. It does not keep warranty dates or remind anyone about them, and it does not decide a replacement claim for you. The [serial number tracking for Tally](/serial-number-tracking-tally/) page shows the full setup.

## Frequently Asked Questions

**Q: How do I check which customer bought a battery by its serial number?**

A: If each battery is a Tally batch named by its serial number, open the Batch Summary for the item, select that batch and drill down to its Batch Vouchers. The sale voucher there shows the party and the date. In Takkada, Unit history finds the same battery by its number in one search.

**Q: Can I print the battery serial number on the bill?**

A: Yes. In Tally, type the serial number in the item's description lines on the sales voucher, and it prints under the item. In Takkada, a field marked Print on the bill fills those lines from the battery's own details when you pick it, and you can still edit them before saving.

**Q: What happens in the books when a battery comes back?**

A: Make a credit note against the original sales invoice with the same batch, and the battery is back in your stock. If it then goes back to the supplier, a debit note with that batch takes it out again. In Takkada, the credit note offers only the batteries that were on that invoice.

**Q: Does this track warranty dates?**

A: No. It finds the battery's sale bill, the sale date and the party, which is the information a replacement claim starts from. Checking that date against the maker's terms stays with you or the maker.

The Custom Fields add-on is switched on for each company separately and priced by your partner; ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company. Remember to set "Maintain in batches" to Yes in Tally for the items you track unit by unit.
