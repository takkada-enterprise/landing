---
title: "Dealer Scheme Management in Tally: Why the Season Never Settles Cleanly"
slug: "dealer-scheme-management-tally"
meta_title: "Dealer Scheme Management in Tally"
meta_description: "Tally records the sale but not the scheme behind it. How distributors track QPS, TOD and season schemes, and settle them without a spreadsheet war."
primary_keyword: "dealer scheme management in tally"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Schemes"
excerpt: "Every distributor who runs dealer schemes ends the season the same way: one Excel file, three versions of it, and a week of arguments with retailers about what was promised. Tally holds every invoice but none of the scheme logic, and that gap is where the margin quietly goes."
---

Dealer scheme management in Tally is the gap every distributor works around, because Tally records what you sold and what you were paid but holds no memory of the scheme that sat behind the sale. A quantity scheme, a turnover discount, a season slab, an early-payment rate: none of these are fields in a voucher. So the scheme lives in a spreadsheet on one laptop, gets rebuilt from the sales register at season end, and produces a credit note number that the retailer disputes because his version of the promise is different. The arithmetic is the easy half. The work is agreeing on the inputs, which SKUs counted, which returns came back, which payment landed inside which window, and then proving it line by line. This article covers how the common scheme types actually behave, why the season-end settlement goes wrong in the same three places every year, and what a defensible settlement looks like when it is built from your Tally data rather than beside it.

## Key Highlights

- Tally stores the sale and the receipt but not the scheme rule, so scheme liability is invisible in the books until somebody rebuilds it from the sales register at season end
- The disputes at settlement are almost never arithmetic. They are disagreements about inputs: which items counted, how returns were treated, and which cash-discount window a payment landed in
- A settlement is only defensible if it can name the vouchers behind every number, which is why the working has to be built from Tally data rather than from a spreadsheet somebody typed

## In This Article

- What dealer scheme management in Tally actually involves
- The scheme types a distributor is running at once
- Why Tally alone cannot settle a scheme
- The three places the season-end number breaks
- What a defensible settlement looks like
- Running the settlement off your Tally data
- Frequently Asked Questions

## What Dealer Scheme Management in Tally Actually Involves

Ask a distributor what his scheme workload is and he will describe two separate jobs. The first is forward-looking: telling retailers what the scheme is, taking bookings against it, and pricing invoices so the scheme rate is honoured at the counter. Tally handles that half reasonably well, because it ends up as a price level, a discount column, or simply a rate the operator types.

The second job is backward-looking, and it is the one that eats the month after the season closes. Somebody has to add up what each dealer actually lifted, apply the slab he landed in, subtract what came back as returns, check which of his payments arrived inside the early-payment window, and arrive at a rupee figure to credit him. Tally will give you every input for that calculation. It will not do the calculation, because the rule that turns those inputs into a number was never recorded anywhere in the books.

That asymmetry is the whole problem. The liability is real from the day the first scheme invoice is raised, and it stays invisible in the trial balance until the credit note is passed months later.

## The Scheme Types a Distributor Is Running at Once

Most distributors are not running one scheme. They are running four, overlapping, from different principals, on different calendars. This is heaviest in trades where the buying is seasonal, which is why it bites [agri-input distributors](/blog/receivables-app-for-agri-input-distributors/) and paint and cement dealers harder than it bites a steady-offtake FMCG line.

| Scheme type | What triggers it | Where it usually lives today |
|---|---|---|
| Quantity purchase scheme (QPS) | Lifting a slab of units in a period | Principal's circular, retyped into Excel |
| Turnover discount (TOD) | Crossing a rupee turnover in the period | Excel, computed from the sales register |
| Season or booking scheme | Booking a quantity before the season, lifting it during | A booking register, often on paper |
| Cash discount on early payment | Paying inside a defined window | Memory, or a note against the ledger |

The cash-discount one is the quiet troublemaker. QPS and TOD depend on quantities and values that Tally already holds accurately. Cash discount depends on *when money arrived relative to a window*, and that means the receipt date, the bill it was allocated against, and the window definition all have to agree. If receipts have been posted on account instead of [bill by bill against reference](/blog/bill-by-bill-against-reference-tally/), the window test cannot even be run, because there is no way to say which bill a payment settled.

## Why Tally Alone Cannot Settle a Scheme

Tally is a book of record and it is doing exactly its job here. A scheme is a commercial rule that lives outside the accounting entry, and there is no voucher field where "5 units free on every 100 lifted, cotton category, kharif window" belongs.

What follows from that is predictable. The scheme rule gets encoded somewhere else, usually in a spreadsheet built by the one person who understands it. That spreadsheet pulls a sales register export, applies formulas, and produces a payout column. Three things then go wrong at once. The export is a snapshot, so any voucher edited after it was taken is silently stale. The formulas are unversioned, so nobody can say whether last season used the same rounding. And the file is unshareable in any meaningful sense, because sending a retailer an Excel sheet with your entire dealer list in it is not something you can do.

The result is a settlement that is probably correct and definitely unprovable. When a retailer says "you promised me more", the only available response is to open the file and argue about it.

## The Three Places the Season-End Number Breaks

Across enough seasons, the disputes cluster into the same three failures, and none of them are arithmetic.

**Item classification.** A scheme applies to some SKUs and not others. New packs get introduced mid-season, a variant gets renamed, a non-scheme item shares a name with a scheme item. If the classification is done by eye at settlement time, two people will classify differently, and the difference shows up as a quantity gap the retailer notices immediately.

**Returns and the unit of measure.** Schemes are counted in packets or bags; Tally often holds kilograms or litres. A return that comes back in a different unit than it went out in has to be converted before it can be netted off, and a conversion factor applied inconsistently across a season is worth real money on a large dealer.

**Payment windows.** A cash-discount rate depends on which window a payment landed in. Part payments split across windows, payments that arrive on the boundary day, and payments never allocated to a specific bill all produce a number that one side computes differently from the other. This is the same allocation discipline that makes a [partywise outstanding statement](/blog/partywise-outstanding-statement-tally/) trustworthy in the first place.

A settlement process that does not name these three decisions explicitly is going to relitigate them every season.

## What a Defensible Settlement Looks Like

The test of a settlement is not whether the total is right. It is whether you can put the working in front of the retailer and have the conversation end.

That means four things have to be true. Every item in the scheme is classified once, in advance, with its packet conversion recorded, so nobody classifies by eye at settlement time. Every dealer's booking is recorded before the season rather than reconstructed after it. The run that produces the number captures the vouchers it counted, so the sheet you open in November still shows exactly what went into the September figure even if a voucher was edited since. And anything the run could not resolve, an unclassified item, a dealer with no booking, a return rate that looks wrong, is surfaced as a flagged line rather than absorbed silently into a total.

That last point is the one distributors underrate. A settlement engine that silently swallows an unmapped SKU produces a smaller payout and a retailer who is correctly angry. One that stops and says "eleven items are still unclassified" produces a delay and a defensible number, and the delay is much cheaper.

## Running the Settlement Off Your Tally Data

Takkada has a scheme settlement module that works against the Tally data you already have, and it is switched on for a company on request rather than being part of the standard plans. The shape of it follows the four requirements above. You classify each stock item into the scheme or mark it deliberately excluded, with its packet conversion. You enter each dealer's booking. You run the season settlement, and the run reads the sales, returns and receipts straight from your synced Tally data rather than from an export somebody took last week. What it cannot resolve, it flags, separated into what blocks the number, what is worth a look, and what is simply context, such as a quantity you excluded on purpose. Then the credit notes go out, and the working exports as a workbook you can send.

The part that matters when a retailer calls in November is that a run keeps its own record of the vouchers it counted. The sheet does not re-query and quietly change under you. It shows the number and the evidence behind the number, and the conversation ends where it should.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Can Tally calculate dealer schemes on its own?**

A: No. Tally records the sale, the return and the receipt accurately, but it has no field for the scheme rule that turns those into a payout. Slabs, quantity schemes, turnover discounts and cash-discount windows are commercial rules that sit outside the voucher, so the calculation always happens somewhere else, usually in a spreadsheet built from a sales register export.

**Q: What is the difference between QPS and TOD for a distributor?**

A: A quantity purchase scheme pays on units lifted, so a retailer who crosses a unit slab earns the rate for that slab. A turnover discount pays on rupee value crossed in the period. Most distributors run both at once from different principals, which is why one dealer can sit in a high quantity slab and a low turnover slab in the same season.

**Q: How do I handle sales returns when settling a scheme?**

A: Returns have to be netted off the lifted quantity before the slab is applied, and they have to be converted into the same unit the scheme counts in. The common failure is a scheme counted in packets while Tally holds kilograms, with the conversion factor applied inconsistently. Record the conversion once per item rather than at settlement time.

**Q: Why do retailers dispute scheme payouts so often?**

A: Almost never because the arithmetic is wrong. The disputes are about inputs: whether a particular item was in the scheme, how a return was treated, and which cash-discount window a part payment landed in. If the settlement cannot show the vouchers behind each number, both sides are arguing from memory and neither can close it.

**Q: How do I calculate a scheme payout at season end?**

A: Fix the scheme item list and the packet conversion first, then take lifted quantity net of returns per dealer, apply the slab the dealer landed in, apply the cash-discount rate for the window each payment fell into, and subtract anything already credited during the season. Do the classification before the season rather than during the settlement, because that is where the disagreements come from.

**Q: Can I settle schemes without a separate spreadsheet?**

A: Yes, if the settlement runs against your live Tally data rather than an export. Takkada has a scheme settlement module, enabled per company on request, that classifies items, holds dealer bookings, runs the season settlement off synced Tally vouchers, flags what it could not resolve, and issues the credit notes with an exportable working.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
