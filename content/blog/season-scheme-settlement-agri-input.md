---
title: "Season Scheme Calculation for Dealers: Settling Kharif and Rabi Without a Fight"
slug: "season-scheme-settlement-agri-input"
meta_title: "Season Scheme Calculation for Dealers"
meta_description: "A season scheme is booked before kharif or rabi, lifted during it, and settled months later. How agri-input distributors make that number hold up."
primary_keyword: "season scheme calculation for dealers"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Schemes"
excerpt: "The promise is made in April and the number is defended in October. Between those two dates the retailer under-lifts, over-lifts, returns unsold packets and pays in three instalments. This is how an agri-input distributor keeps a season settlement arguable-with instead of argued-about."
---

A season scheme calculation for dealers has to survive three moments that sit months apart. The booking comes first, before kharif or rabi opens, when a retailer commits to a quantity and you commit to a rate. The lifting happens through the season, as he draws stock against that booking and often takes more than he booked. The settlement comes last, weeks after the season has closed, when returns have come back, payments have landed and all of it has to become one credit note. The arithmetic in the middle is simple. What makes the job hard is that the commercial promise was made in one month and the number is being defended in another, using data that moved all summer. A season settlement holds up when the booking, the scheme item list and the payment windows were all recorded before the season opened, so the run reads facts instead of reconstructing them from memory.

## Key Highlights

- A booking scheme settles against three separate events: the quantity booked before the season, the quantity lifted during it, and the receipts that landed inside each payment window
- The season is the unit the scheme settles on, and a rabi season that opens in October is still being settled around the March year-end close
- Almost every season-end dispute traces to something never written down before the season started: the booking, the scheme item list, or the packet conversion
- Returns arriving after the season closes are the most expensive open question, because the slab has usually been credited by then

## In This Article

- How a season scheme calculation for dealers works
- Why the season beats the financial year as the unit
- What changes between the booking and the lifting
- How payment windows interact with the slab
- What has to be on record before the season opens
- Running the settlement off your Tally data
- Frequently Asked Questions

## How a Season Scheme Calculation for Dealers Works

A booking scheme in seed, crop protection or fertiliser runs on a promise made in advance. Before the season opens, your field team takes a booking from each village retailer: so many packets of a hybrid, so many litres of a molecule, sometimes against a token advance. In return he is told what he earns if he lifts that quantity, usually a slab rate, sometimes free packets, often with an extra rate for early payment.

Three things then have to be tracked separately, and most distributors track only the middle one.

| Stage | When it happens | What has to be recorded | What usually goes missing |
|---|---|---|---|
| Booking | Before the season opens | Dealer, item, quantity booked, rate promised | The booking, which lives on a diary page |
| Lifting | Through the season | Invoices, quantities, the billing unit | The link back to the booking |
| Settlement | After the season closes | Returns, receipt dates, the slab landed in | The evidence behind the final figure |

Tally holds the middle row completely: every invoice, every quantity, every rate. It holds nothing about the first, because there is no voucher for a promise, and it will not compute the third, because the rule that turns lifting into a payout was never a field in the books. That gap is the subject of [dealer scheme management in Tally](/blog/dealer-scheme-management-tally/), and the season scheme is its hardest case, because the distance between promise and payout is measured in months.

## Why the Season Beats the Financial Year as the Unit

An accountant's year runs April to March. A season does not. Kharif bookings are taken before the monsoon, lifting runs through the rains, and the settlement conversation starts once the crop is in. Rabi opens after that and its settlement lands close to the March closing, when the same accountant is already busy with year-end.

That mismatch causes two concrete problems. The first is that a season straddles the periods your reports are cut on. A quantity slab has to be totalled across the season window, not a quarter or a financial year, so any report built on standard period boundaries gives the wrong denominator.

The second is scheduling. The rabi settlement and the year-end close compete for the same week and the same person. A settlement that needs a fortnight of spreadsheet work does not get a fortnight in March, so it gets done fast, and a number produced fast is a number that gets challenged. Distributors who settle rabi cleanly did the classification work in October, before the season opened.

Principals hand their schemes down on the season calendar too, so a working cut on the financial year leaves you defending two totals, one downward to the retailer and one upward to the company.

## What Changes Between the Booking and the Lifting

A booking is a forecast, and forecasts move. Three movements account for most of the settlement work, and each needs a rule decided in advance rather than negotiated at the end.

**The dealer does not lift his full booking.** Rain came late, or the crop shifted. He booked 400 packets and lifted 260. Paying him on the booked slab and paying him on the lifted slab are both defensible policies, but deciding it dealer by dealer at settlement time is not, because the retailer who lifted 260 will hear what his neighbour got. Write the shortfall rule into the scheme before the season, along with any tolerance band you will allow.

**The dealer lifts beyond his booking.** A retailer books 400 and lifts 520 because the season ran long. If the scheme rate applies only to the booked quantity, the extra 120 is billed plain. If the extra lifting earns too, you need to know at which slab, and whether it pushes him into a higher band. Agree this before the season, because the retailer who was told mid-season to "lift more, scheme milega" will remember that sentence exactly.

**Returns arrive after the season has closed.** Unsold seed and unopened packets come back weeks after the crop is planted, sometimes after the credit note has been passed, and a return that lands post-settlement can drop a dealer out of the slab you paid him at. Two habits reduce the damage: hold the settlement until the return window your principal allows has closed, and net returns in the scheme's own unit rather than the billing unit. A packet-counted scheme sitting on kilogram-billed stock needs its conversion factor fixed per item, once.

Each of these is a decision about inputs rather than arithmetic, which is why they survive into arguments.

## How Payment Windows Interact With the Slab

Most season schemes carry a payment leg on top of the quantity leg. Pay within the first window and you earn one rate, pay in the next and the rate steps down, pay after that and it goes to zero. The two legs multiply, so a retailer's figure depends on how much he lifted and on when he paid.

That makes the receipt date and its allocation load-bearing. The window test only runs if you can say which bill a rupee settled and on what date, which means receipts have to be posted [bill by bill against reference](/blog/bill-by-bill-against-reference-tally/) rather than on account. Where a payment sits on account, there is no honest way to place it in a window, and the retailer's version of events is as good as yours.

Three cases come up every season.

A part payment splits across windows. The retailer pays 40% inside the early window and the balance three weeks later. Rate each receipt in the window it landed in, against the bills it settled, rather than rating the whole invoice at whichever window the last rupee arrived in. That is the discipline that makes [splitting one UPI payment across invoices](/blog/how-to-split-upi-payment-across-tally-invoices/) traceable.

A payment lands on a boundary day. Windows written as "within 15 days" and "within 30 days" leave open what day 15 earns. State the boundary as inclusive or exclusive in the scheme text, then encode it the same way in the working.

A payment lands in a gap between windows, because schemes written as a table of ranges often leave uncovered days. A properly configured scheme keys its windows by payment date and carries a catch-all for those gap days, so nothing goes unrated and the retailer can see which of his payments earned what.

## What Has to Be on Record Before the Season Opens

The settlement is only as arguable-with as the record behind it. Four things need to exist before the first scheme invoice is raised, and all four are cheap in April and expensive in October.

**The scheme item list.** Every stock item either counts towards the scheme or is deliberately excluded, so a new pack introduced mid-season is classified when it appears rather than at season end.

**The packet conversion per item.** If the scheme counts packets and the billing is in kilograms or litres, the factor belongs on the item, recorded once. Applied inconsistently it is worth real money on a large dealer, and it is the error a retailer catches fastest.

**Every dealer's booking.** Dealer, quantity and rate promised, captured when the field team takes it. A booking that only exists in a diary is one you will re-negotiate.

**The rate structure and the windows, in writing.** The MRP, the scheme rate, the category slabs, and the payment windows with their boundary rule. This is what you read out in a disagreement, and it has to date from before the season.

Do these four and the settlement is a calculation. Skip them and it becomes a negotiation run from two sets of memory, which is where [ledger reconciliation with a retailer](/blog/ledger-reconciliation-tally-distributor/) also ends up when nothing was recorded at the time.

## Running the Settlement Off Your Tally Data

Takkada has a scheme settlement module built for this shape of work, switched on for a company on request rather than being part of the standard plans. Its order of operations follows the four requirements above.

You classify each stock item into the scheme or mark it deliberately excluded, with its packet factor, and you enter each dealer's booking for the season. The config carries the MRP, an absolute rate, a token rate, the category slabs, and the cash-discount windows keyed by payment date with a catch-all bucket for the gap days. Then you run the season settlement, and it reads the invoices, returns and receipts straight from your synced Tally data rather than an export somebody pulled in July.

What it cannot resolve, it flags, separated into what blocks the number, what is worth a look, and what is simply context such as a quantity you excluded on purpose. An unclassified item or a dealer with no booking on file stops the run rather than being absorbed into a smaller payout. Once the flags are clear, the credit notes go out and the working exports as a workbook.

The part that matters months later is that a run keeps its own copy of the vouchers it counted. When a retailer calls in December about a kharif figure, the sheet still shows what went into the September number, including vouchers edited since. That is the difference between a settlement you can be argued with about and one you have to argue about.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: What is a booking-based season scheme?**

A: It is a scheme where the retailer commits to a quantity before the season opens, often against a token advance, and earns a rate based on what he lifts against that booking. Two numbers are in play, the booked quantity and the lifted quantity, and the settlement rule has to say what happens when they do not match.

**Q: Season ke baad scheme ka hisaab kaise banaye?**

A: Start from the booking register rather than the sales register. For each dealer, take the quantity lifted in the season window, net off returns in the scheme's own unit, compare it against what he booked, and apply the slab your shortfall rule points to. Then rate each receipt by the window it landed in, using bill-wise allocation, and subtract anything already credited. Keep the voucher list behind every figure.

**Q: Should a season scheme be settled on the financial year or on the season?**

A: On the season. The promise was made on the season calendar and the principal's own scheme is cut the same way, so settling on April to March gives a total matching neither the retailer's expectation nor the claim you file upward. The financial year still governs when the credit note is passed, but the quantity window is the season.

**Q: What happens if a dealer does not lift his full booking?**

A: That depends on the rule you wrote before the season. Some distributors pay on lifted quantity only, some honour the booked slab within a tolerance band, some drop the dealer a slab. All three are workable. Disputes come from deciding it dealer by dealer at settlement time, because terms travel between retailers in a market faster than you expect.

**Q: How do I handle a return that comes back after the season has closed?**

A: Net it off the lifted quantity before the slab is applied, converted into the unit the scheme counts in. The practical protection is timing: hold the settlement until the return window your principal allows has closed, because a return landing after the credit note was passed can drop the dealer below the slab you paid him at, and recovering that credit is harder than delaying it.

**Q: Can I run the settlement without exporting a sales register to Excel?**

A: Yes, if the settlement reads your live Tally data directly. Takkada has a scheme settlement module, enabled per company on request, that holds the item classification and packet factors, stores each dealer's booking, runs the settlement off synced vouchers, flags what it could not resolve, and issues the credit notes with an exportable working.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
