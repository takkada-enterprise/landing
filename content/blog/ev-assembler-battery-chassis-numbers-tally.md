---
title: "EV Assemblers on Tally: Battery, Motor and Chassis Numbers Through Production"
slug: "ev-assembler-battery-chassis-numbers-tally"
meta_title: "EV Assemblers on Tally: Battery and Chassis Numbers"
meta_description: "EV and e-rickshaw assemblers on Tally: chassis, motor, battery and charger numbers per vehicle through production, printed on the bill, found later."
primary_keyword: "ev battery and chassis number tracking"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "One scooter, one chassis number, one motor number, two batteries and a charger. How an EV assembler on Tally keeps those numbers together from the shop floor to the sale bill, with a worked example."
---

EV battery and chassis number tracking means knowing, for every scooter or e-rickshaw you assemble, its chassis number, motor number and colour, and the serial number of each battery and charger fitted in it. In Tally, the usual way is to make the vehicle and its bought-in parts batch-wise stock items, name each unit's batch by its own number, and record the assembly in a Manufacturing Journal that consumes the parts and produces the vehicle. Tally then knows that battery LFP-0457 left stock and that scooter XEV24C000187 came in. When one journal carries a whole day's production, it does not say which two batteries and which charger went into which chassis. Many assemblers keep that link in a notebook on the shop floor or an Excel sheet, and look it up when a battery comes back or the sale bill needs the numbers. This post covers the Tally setup, a worked example for one scooter, and how an app beside Tally can hold that link for you.

## Key Highlights

- Each vehicle and each numbered part is one Tally batch named by its own number, with "Maintain in batches" set to Yes on those stock items.
- A Manufacturing Journal for 20 scooters shows the 40 batteries used that day, but not which 2 went into which chassis.
- In the worked example, scooter XEV24C000187 is built from batteries LFP-0457 and LFP-0458 and charger CHG-11902, and sold on INV/0033 with all five numbers under the item.

## In This Article

- The numbers each vehicle carries
- How it is done on most shop floors
- Setting it up in Tally
- Worked example: one scooter from parts to the bill
- Form 21 and the sale bill
- Where Takkada fits
- Frequently Asked Questions

## The numbers each vehicle carries

An assembled scooter or e-rickshaw has one number of its own and several that come from its parts. Each one is needed again at a different point.

| Number | Where it comes from | Where you need it later |
|---|---|---|
| Chassis no | Your frame series, or the frame supplier | Sale bill, the sale certificate for registration, every service visit |
| Motor no | The plate on the motor, from the motor supplier | Sale bill, the sale certificate for registration |
| Colour | Your body or paint line | Sale bill, stock count by colour |
| Battery no (one or more) | The label on each battery pack | Sale bill, a battery complaint, a replacement claim with the battery supplier |
| Charger no | The label on the charger | Sale bill, a charger complaint |

The chassis number is the vehicle's identity. The battery numbers matter most after the sale, because batteries are often the part customers bring back, and the battery supplier usually asks for the pack's number before it accepts one back.

## How it is done on most shop floors

Batteries and chargers arrive in lots with a packing list of serial numbers. The store keeper enters the lot in Tally and files the list. On the floor, the fitter writes the chassis number, the motor number and the battery numbers of each finished vehicle in a register. At the sale, the billing clerk opens the register and types those numbers under the item on the bill.

This works while the register is complete and readable. It breaks when a digit is copied wrong, when a page is missing, or when a battery taken out of a returned vehicle is fitted into a new one and the register is not corrected. The question "which scooter did battery LFP-0458 go into, and who bought it?" then needs someone to search the register and old bills by hand.

## Setting it up in Tally

These steps are for TallyPrime, from Tally's own help on batches and manufacturing (checked 10 November 2026).

1. Press F11 (Company Features) and set Enable Batches to Yes.
2. Open each numbered stock item, the scooter, the battery and the charger, through Alt+G (Go To) > Alter Master > Stock Item, and set Maintain in batches to Yes. If the option is not shown, press F12 (Configure) and turn on Maintain Stock Item in Batches.
3. On the purchase, enter each battery and charger as its own batch of quantity 1, named by the number on its label.
4. For the assembly, open a Stock Journal and press Ctrl+H (Change Mode) > Use for Manufacturing Journal. Select the scooter as the product, with its Bill of Materials if you have set one up, give the finished scooter its chassis number as the batch, and pick the battery and charger batches among the components consumed.
5. On the sale, pick the scooter's batch and type the motor number, colour and part numbers in the item's description lines, so they print under the item on the bill.

If you record one Manufacturing Journal per vehicle, that voucher holds the link between the chassis and its batteries, and opening the battery's Batch Vouchers report leads you to it. Many assemblers record a day's or a week's production in one journal, for example 20 scooters and 40 batteries, and then the voucher shows which batteries were used that day without saying which pair went into which scooter. The motor number and colour also stay outside Tally unless they are typed on every bill. The [serial number in Tally Prime](/blog/serial-number-in-tally-prime-batch-method/) guide covers the one-batch-per-unit method in full.

## Worked example: one scooter from parts to the bill

The numbers below are made up for the example.

| Step | Document | Numbers on it |
|---|---|---|
| Batteries bought | Purchase bill from the battery supplier | LFP-0457, LFP-0458, as two batches of quantity 1 |
| Charger bought | Purchase bill from the charger supplier | CHG-11902 |
| Scooter built | Production run, or a Manufacturing Journal in Tally | Chassis no XEV24C000187, Motor no MTR-48V-20931, Color Red, using LFP-0457, LFP-0458 and CHG-11902 |
| Scooter sold | Sales invoice INV/0033 to Ravi Kumar | E-scooter 48V, quantity 1, with the five numbers under the item |

Under the item on INV/0033, the bill reads:

- Chassis no: XEV24C000187
- Motor no: MTR-48V-20931
- Color: Red
- Battery no: LFP-0457, LFP-0458
- Charger no: CHG-11902

Three months later Ravi Kumar brings back battery LFP-0458. To answer him you need the scooter it sits in, the bill it went out on and the sale date. With a register, that is a search through pages and bills. With the numbers linked at production, it is one lookup by the battery number. Dealers who face the same question for loose batteries can read [finding who bought a battery by its serial number](/blog/battery-serial-number-history-dealers/).

## Form 21 and the sale bill

For a vehicle that is registered, the dealer gives the buyer a sale certificate in Form 21, which carries the chassis number and the engine number, or the motor number for a battery-operated vehicle. Keeping the same numbers on your sale bill keeps the buyer's papers consistent with each other. Formats and the papers asked for vary by state, so check the exact requirement with your RTO agent or CA. The [chassis number tracking for Tally](/chassis-number-tracking-tally/) page shows how the numbers can print on the bill from the vehicle's own details instead of being retyped.

## Where Takkada fits

Takkada's Custom Fields add-on keeps the details of each unit in Takkada. On the stock group for your scooters you add the fields you keep, such as Chassis no, Motor no, Color and Battery no, and mark one of them as the Unit no, which is the batch name in Tally. Turn on "Maintain in batches" in Tally for those items, and the app lists any item in the group that is not.

With the Manufacturing add-on as well, a production run gives each finished scooter its own Unit no and details, and you pick which parts go into it, any number, like two batteries and a charger. A part used in one scooter cannot go into another. This covers in-house production, not job work. When the scooter is sold, its parts' numbers print with it, and the sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. No unit is sold twice or built into two products in Takkada.

Units by detail counts units sold or in stock by any field, such as colour or battery type, and a battery that went out inside a sold scooter counts as sold too. Unit history takes a chassis number or battery number and shows the unit, the vehicle it went into or the parts inside it, and every step with its date, bill number and party. The [serial number tracking for Tally](/serial-number-tracking-tally/) page covers the setup end to end, and the [Manufacturing in Tally Prime](/manufacturing-in-tally-prime/) page covers production runs.

## Frequently Asked Questions

**Q: How do I track battery serial numbers in an e-rickshaw or scooter?**

A: Make the battery a batch-wise stock item in Tally and enter each pack as its own batch of quantity 1, named by its serial number. Then record which batches went into each vehicle, either in one Manufacturing Journal per vehicle or in an app that links parts to the finished unit. In the example, LFP-0457 and LFP-0458 are linked to chassis XEV24C000187.

**Q: Can one vehicle have two batteries recorded?**

A: Yes. In Tally, a Manufacturing Journal for one vehicle can consume two battery batches. In Takkada, with the Manufacturing add-on, a production run lets you pick any number of parts for each finished unit, such as two batteries and one charger, and both battery numbers print on the sale bill.

**Q: Does a battery fitted in a sold scooter show as sold?**

A: In Takkada's Units by detail report, yes: a part built into a finished unit counts as sold when that unit is sold. In Tally, the battery batch leaves stock when the Manufacturing Journal consumes it, so it no longer shows as stock either way. Only the link to the buyer differs.

**Q: Do I need the Manufacturing add-on for this?**

A: You need it to link parts to a finished vehicle in Takkada, because production runs are part of the Manufacturing add-on. It covers in-house production, not job work. A dealer who buys finished vehicles and only sells them needs the Custom Fields add-on alone.

The Custom Fields add-on is switched on for each company separately and priced by your partner; ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company. Remember to set "Maintain in batches" to Yes in Tally for the items you track unit by unit.
