---
title: "Batch Wise Sales Report in Tally, and Units Sold by Colour or Model"
slug: "units-sold-by-colour-report-tally"
meta_title: "Batch Wise Sales Report in Tally, and Sales by Colour"
meta_description: "Batch wise sales report in Tally Prime step by step, why it cannot tell you how many Red ones sold, and how to count units by colour, model or any detail."
primary_keyword: "batch wise sales report in tally"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "Reports"
excerpt: "Tally's Batch Summary shows which batches went out. When every batch is one scooter or one phone, it lists serial numbers, so counting how many Red ones sold needs another way. Here are three, with a worked count."
---

A batch wise sales report in Tally Prime comes from the Batch Summary: press Alt+G (Go To), choose Batch Summary, pick the stock item, and each batch shows its inward and outward quantity for the period, with the closing stock beside it. Select a batch and drill down to its Batch Vouchers to see the bills that took it out. When each batch is a single unit named by its serial number, such as a scooter by its chassis number or a phone by its IMEI, the report lists those numbers. It tells you that XEV24C000187 went out, but it cannot tell you how many Red scooters sold this month, because colour is not part of a batch. To count by colour or model you need a stock item per colour, the colour coded into each batch name, or the details kept with each unit. This post covers the Tally report, the three workarounds and their trade-offs, and a worked count of seven scooters sold.

## Key Highlights

- Batch Summary (Alt+G > Batch Summary) shows inward, outward and closing quantity for every batch of one stock item, for the period you choose.
- When one batch is one unit, a month with 7 scooters sold shows 7 batch rows with an outward quantity of 1 each, and no colour.
- Counting "4 Red, 2 Blue, 1 Black" needs colour stored somewhere Tally's batch report can read it, or a report that reads the details kept with each unit.

## In This Article

- Batch wise sales in Tally Prime, step by step
- What the report shows when one batch is one unit
- Three ways to count units by colour or model
- Worked example: seven scooters sold in October
- Counting units by any detail in Takkada
- Frequently Asked Questions

## Batch wise sales in Tally Prime, step by step

The report needs batches switched on for the company (F11, Enable Batches) and "Maintain in batches" set to Yes on the stock item. The steps follow Tally's own help on the Batch Summary (checked 10 November 2026).

1. Press Alt+G (Go To), type or select Batch Summary and press Enter.
2. Select the stock item from the List of Items.
3. Change the period to the month or quarter you want to see.
4. Read the outward quantity of each batch. That is what left stock in the period, and the closing quantity is what is still in stock.
5. Select a batch and press Enter to drill down, first to its monthly summary and then to the Batch Vouchers, which list every voucher that moved that batch.

Two points matter when you read it as a sales report. Outward counts every movement out, so a battery consumed in a Manufacturing Journal or moved by a Stock Journal shows as outward too, beside the ones sold on a bill. And the report is for one stock item at a time, so three scooter models mean three reports.

## What the report shows when one batch is one unit

Tally's help suggests naming each unit's batch by its own number, such as the IMEI of a phone, so the Batch Summary shows which units are still unsold. For October, the scooter item would read like this:

| Batch | Inward | Outward | Closing |
|---|---|---|---|
| XEV24C000187 | 1 | 1 | |
| XEV24C000188 | 1 | 1 | |
| XEV24C000189 | 1 | | 1 |
| XEV24C000190 | 1 | 1 | |

The sold units show an empty closing quantity and the unsold ones show 1. That answers "which chassis numbers are still in the godown", which is a common question. It leaves out everything else about the unit: its colour, its motor number, the battery type fitted. The batch name is one text field, and in this method it is already used for the chassis number.

## Three ways to count units by colour or model

| Way | How it looks in Tally | Counting Red sold | The trade-off |
|---|---|---|---|
| A stock item per colour | "E-scooter 48V Red", "E-scooter 48V Blue" | Read the outward quantity of the Red item | 3 models in 4 colours is 12 stock items, each needing its own rate and price list updates |
| Colour in the batch name | Batch "XEV24C000187-RED" | Export the Batch Summary to Excel and filter on "-RED" | Every name typed by hand, and the batch name no longer matches the chassis number on the vehicle |
| Details kept with each unit | Batch "XEV24C000187", colour kept beside it | Count the units whose colour is Red | Needs a place for the details: an Excel register, or an app beside Tally |

A stock item per colour suits a business with two or three colours and few models. The colour code in the batch name works for a small volume if one person types every name the same way. Once you track more than one detail, such as colour and battery type or storage, the third way is the one that scales, because each detail is its own field.

## Worked example: seven scooters sold in October

The chassis numbers and bills below are made up for the example. Seven scooters of one model went out in October:

| Chassis no | Color | Bill |
|---|---|---|
| XEV24C000187 | Red | INV/0033 |
| XEV24C000188 | Red | INV/0034 |
| XEV24C000191 | Blue | INV/0036 |
| XEV24C000192 | Red | INV/0038 |
| XEV24C000195 | Black | INV/0041 |
| XEV24C000196 | Blue | INV/0042 |
| XEV24C000199 | Red | INV/0045 |

In the Batch Summary these are 7 rows with an outward quantity of 1. With the colour kept beside each chassis number, the same month counts as:

| Color | Sold in October |
|---|---|
| Red | 4 |
| Blue | 2 |
| Black | 1 |
| **Total** | **7** |

That count is what goes into the next purchase order: if Red sells twice as fast as Blue, the next lot should lean Red. With a register, someone builds this table by hand at month end. With the details kept per unit, it is one report.

## Counting units by any detail in Takkada

Takkada's Custom Fields add-on keeps the details of each unit in Takkada. You add fields to a stock group, such as Chassis no, Color and Battery no, and mark one as the Unit no, which is the batch name in Tally. Turn on "Maintain in batches" in Tally for those items, and the app lists any item in the group that is not.

Units by detail then counts units sold or in stock by any of those fields, between the dates you pick: how many Red sold this month, how many 48V batteries are in stock. Units whose colour was never filled in show as Not filled, so the total still adds up. A battery that went out inside a sold scooter counts as sold too, which matters for assemblers who fit bought-in batteries. Unit history takes one number and shows that unit's steps with date, bill and party.

The sale itself goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. The [serial number tracking for Tally](/serial-number-tracking-tally/) page shows the setup, and the [IMEI tracking for Tally](/imei-tracking-tally/) page shows the same count for phones by colour or storage. For the Tally method itself, read the guide to the [serial number in Tally Prime](/blog/serial-number-in-tally-prime-batch-method/), and for your other Tally reports on the phone, the [Tally reports on mobile](/tally-reports-on-mobile/) page.

## Frequently Asked Questions

**Q: How do I see batch wise sales in Tally Prime?**

A: Press Alt+G (Go To), select Batch Summary and pick the stock item. Each batch shows its inward, outward and closing quantity for the period, and drilling into a batch opens its Batch Vouchers. Outward includes every movement out, such as consumption in production, beside the sales.

**Q: How can I see colour wise stock in Tally?**

A: Tally has no colour field on a batch, so the usual ways are a separate stock item per colour, or a colour code in each batch name that you filter in Excel. With 3 models in 4 colours, the first way means 12 stock items. Keeping colour as a detail of each unit, outside the batch name, is the third way.

**Q: Should I make a separate stock item for each colour?**

A: It works well for two or three colours and a few models, because Tally's normal stock and sales reports then count each colour. It gets heavy as colours and models multiply, since every item needs its own rate and price updates. If you also track a serial number per unit, keep the colour as a detail of the unit instead.

**Q: Can I see IMEI wise sales?**

A: Yes. If each phone is a batch named by its IMEI, the Batch Summary lists every IMEI with an outward quantity of 1 once sold, and the Batch Vouchers show the bill. In Takkada, Unit history finds one IMEI with its purchase, its sale bill, the date and the party.

The Custom Fields add-on is switched on for each company separately and priced by your partner; ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company. Remember to set "Maintain in batches" to Yes in Tally for the items you track unit by unit.
