---
title: "Serial Number TDL for Tally Prime, or an App Beside Tally? A Fair Comparison"
slug: "serial-number-tdl-tally-prime-alternative"
meta_title: "Serial Number TDL for Tally Prime, or an App Beside It?"
meta_description: "Serial number TDL for Tally Prime compared with the batch method and an app beside Tally: where details live, who can enter them, and the questions to ask."
primary_keyword: "serial number tdl for tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "Comparisons"
excerpt: "Three ways to track numbered units on Tally: batches alone, a TDL that adds serial fields, or an app beside Tally. Where each keeps the details, who can enter them, and what to ask before you choose."
---

A serial number TDL for Tally Prime is a customisation, written in Tally's own definition language, that loads into Tally and adds fields and reports for the serial number of each unit, usually on the stock item, the purchase and the sales voucher. It is one of three ways to track numbered units on Tally. The second needs nothing installed: make each unit a batch named by its serial number or IMEI, and Tally's Batch Summary shows which numbers are unsold. The third is an app beside Tally that keeps each unit's details itself and sends the unit number to Tally as the batch. Which one fits depends mostly on who enters the units and where. If all entry happens at one Tally computer, a TDL set up by your Tally partner can work well. If bills are made on phones, at two counters or from a van, entry happens away from that computer. Below, the three compared, and the questions to ask any vendor.

## Key Highlights

- A TDL changes your Tally itself, so it needs testing on your Tally release, and again after an upgrade.
- The batch method needs nothing installed and holds one number per unit; colour, motor number or the parts inside a unit live somewhere else.
- An app beside Tally suits a business where units are bought and sold on phones or at more than one counter, as long as the unit number still reaches Tally as the batch.

## In This Article

- What a TDL is
- Three ways to track serial numbers on Tally
- A worked example: one shop, two counters
- When a TDL is the right call
- When an app beside Tally fits
- Questions to ask any vendor
- Where Takkada fits
- Frequently Asked Questions

## What a TDL is

TDL stands for Tally Definition Language, the language Tally itself is built in. A TDL file adds or changes screens, fields, reports and print formats, and Tally loads it from its list of TDL files. Tally partners write them for one customer or sell them ready-made. Our [barcode TDL guide](/blog/barcode-tdl-for-tally-prime/) asks the same question for barcodes, and most of its advice on testing and on where a file comes from applies here too.

## Three ways to track serial numbers on Tally

Patterns only; check each cell against the product you are offered.

| | Tally batches alone | A TDL that adds serial fields to Tally | An app beside Tally |
|---|---|---|---|
| Where the details live | The batch name holds the number; nothing else | In Tally, in the fields the TDL adds | In the app; the unit number goes to Tally as the batch |
| Who can enter units | Whoever works on that Tally | Whoever works on that Tally | Anyone with the app and permission |
| Entry on a phone | No | Only as far as your Tally is reachable from a phone | Yes |
| A number used twice | The batch balance shows it, if someone checks | Depends on how the TDL is written | The app can refuse the bill |
| Parts inside a finished unit | Not linked | Depends on the TDL | Depends on the app |
| Reports | Batch Summary by batch name | Whatever reports the TDL adds | The app's own reports |
| At a Tally upgrade | Nothing to check | Ask whether the TDL is tested on the new release | Ask whether the app's Tally connection is tested on it |

Tally's stock is right only if every unit is its own batch with quantity 1. Our [serial number in Tally Prime guide](/blog/serial-number-in-tally-prime-batch-method/) covers that method step by step.

## A worked example: one shop, two counters

A mobile shop buys a carton of 20 phones and sells from two counters.

| Moment | Batches alone | A TDL | An app beside Tally |
|---|---|---|---|
| The carton arrives | 20 batches typed into the purchase at the Tally computer | 20 numbers typed into the TDL's fields at the Tally computer | 20 numbers pasted on the purchase in the app |
| Counter 2 sells a phone | Walks to the Tally computer or writes a slip | Walks to the Tally computer or writes a slip | Bills it on its own phone |
| The same IMEI is billed twice | Seen later, if someone checks the batch balance | Depends on the TDL | Refused in the app when the bill is saved |
| The owner asks how many Blue are left | Counted by hand | Answered if the TDL has that report | Answered if the app has that report |

If the shop has one counter and one person at Tally, the first two columns are enough. The second counter is what changes the answer.

## When a TDL is the right call

- All purchases and sales are typed at one Tally computer, by one or two trained people.
- You want the extra fields to show in Tally's own screens and reports.
- Your Tally partner writes or supports the TDL, tests it on your release and is reachable when something breaks.
- You are comfortable re-testing it after every Tally upgrade.

## When an app beside Tally fits

- Bills are made away from the Tally computer: on salesmen's phones, at a second counter, or from a van.
- Units are assembled before sale, and you need to know which parts went into which finished unit.
- You want the details to fill the bill's description lines by picking the unit, so nobody retypes numbers.
- You want your Tally left as it is, with nothing loaded into it.

## Questions to ask any vendor

1. Where are the unit details kept, and what reaches Tally: the number only, or the details too?
2. Does every unit become a Tally batch of quantity 1, so Tally's own stock and Batch Summary stay right?
3. What happens when someone bills a number that is already sold, or one that is held for another customer?
4. Can a purchase of 20 units be filled by pasting a column of numbers?
5. Can a finished product carry the numbers of the parts inside it, and do they print on its bill?
6. Which Tally release is it tested on, and who tests it after an upgrade?
7. What happens to units bought or sold straight in Tally, outside the add-on?

## Where Takkada fits

Takkada is an app beside Tally, and its Custom Fields add-on is built for numbered units. There is no TDL to install: the details are kept in Takkada, and the Unit no travels to Tally as the batch through Takkada's Tally connector, so "Maintain in batches" must be on for those items in Tally. You set up the fields per stock group, then buy, sell and see the reports on the phone, or in a computer browser with Web view, which comes with the Assurance plan. No unit is sold twice in Takkada: a bill holding a unit already sold, built into another product or held on another order is refused, naming the bill that holds it. A sale typed straight into Tally is matched after Takkada syncs, not blocked. With the Manufacturing add-on, a production run gives each finished unit its own Unit no and links the parts that go into it, such as two batteries and a charger in one scooter; this covers in-house production, not job work.

See the [serial number tracking for Tally](/serial-number-tracking-tally/) page for the full flow. If you are wondering how far Takkada bends to your business in general, read [whether Takkada is customisable](/blog/is-takkada-customisable/).

## Frequently Asked Questions

**Q: What is a TDL in Tally Prime?**

A: TDL is Tally Definition Language, the language Tally is built in. A TDL file loads into Tally and adds or changes screens, fields, reports and print formats. Tally partners write them for a single customer or sell them as ready customisations.

**Q: Is there a serial number TDL for Tally Prime?**

A: Yes, Tally partners offer TDLs that add serial number fields and reports to Tally Prime. Each covers different ground, so ask how a number used twice is handled and which Tally release it is tested on. See a demo on a copy of your own data before loading it on your live books.

**Q: Will a TDL work after I upgrade Tally Prime?**

A: Usually, but it is not automatic. A TDL is written against Tally's screens, and a new release can change them. Ask the vendor whether the TDL is tested on the release you are moving to, and try it on a copy of your data before upgrading the main computer.

**Q: Can I track serial numbers in Tally without a TDL?**

A: Yes. Turn on Enable Batches in F11, set Maintain in batches to Yes on the item, and type each unit's serial number as a batch with quantity 1 on the purchase. The Batch Summary then shows every unsold number with a closing quantity of 1.

Takkada's Custom Fields add-on keeps your own details for every unit beside Tally, with the Unit no as the batch name in Tally, so "Maintain in batches" stays on for those items and nothing is installed in Tally. The sale goes to Tally through Takkada with each Unit no as the batch and the details in the item's description lines. Custom Fields is an add-on, priced by your partner. Ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company.
