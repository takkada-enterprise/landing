---
title: "Agri Input Dealer Scheme Software: When the Year Lands in Two Windows"
slug: "crop-protection-dealer-scheme-software"
meta_title: "Agri Input Dealer Scheme Software"
meta_description: "Crop protection, seed and fertiliser dealers settle schemes on a crop cycle. What agri input dealer scheme software has to get right at season end."
primary_keyword: "agri input dealer scheme software"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Schemes"
excerpt: "A crop protection distributor books most of his year in the few weeks around sowing, then settles the scheme six months later against stock that partly came back. The arithmetic is easy. Agreeing on the inputs, after the season has closed and the dealer's memory has hardened, is the whole job."
---

Agri input dealer scheme software has to be built around a year that does not spread out evenly. A crop protection, seed and fertiliser distributor moves most of his turnover in the few weeks either side of sowing, gives credit that waits on the harvest rather than a 30-day calendar, and runs four or five principal schemes at once with different slabs on different crops. The books hold weight or volume while the scheme counts packets, unsold stock comes back after the season is over, and the settlement conversation happens months after the promise was made. Tally records every one of those transactions accurately and holds none of the scheme rules behind them. What a scheme tool for this trade has to do is classify every SKU by crop and category with its packet conversion, hold each dealer's booking, run the settlement off the live books, flag what it could not resolve, and produce a working you can put in front of the dealer.

## Key Highlights

- Agri input buying compresses into two short windows around Kharif and Rabi sowing, so a scheme race that an FMCG line runs across twelve months is decided here in a few weeks
- Cash-discount windows are the hardest part of the settlement, because payment arrives when the harvest sells and a receipt posted on account cannot be tested against a window at all
- The scheme counts packets while the books usually hold litres or kilograms, and returns land after the slab has already been discussed, so both the packet factor and the vouchers counted have to be recorded rather than reconstructed

## In This Article

- What agri input dealer scheme software has to handle
- A year of turnover inside two windows
- Credit tied to the harvest rather than the 30th
- Four principals, four schemes, different crops
- Packs on the invoice, kilograms in the books
- Returns after the season and a settlement months later
- Running the season settlement off your books
- Frequently Asked Questions

## What Agri Input Dealer Scheme Software Has to Handle

A crop protection distributor sells insecticide, herbicide, fungicide, hybrid seed and fertiliser into a few hundred retail counters across three or four districts. On paper that is the same job as any FMCG line: lift from principals, push into the channel, collect, settle the scheme. In practice almost every input to the scheme calculation behaves differently.

The buying comes as a spike rather than a drip. The credit runs on the crop rather than the calendar. The scheme is four or five overlapping circulars from different principals, each keyed to a different crop and a different pack. And the settlement lands after the harvest has sold, once the dealer has had six months to form his own version of what was promised.

None of that makes the arithmetic harder. It makes the inputs harder to agree on, which is the part that actually costs money. The general shape of this problem is covered in [dealer scheme management in Tally](/blog/dealer-scheme-management-tally/); what follows is what changes when the trade is agri input.

## A Year of Turnover Inside Two Windows

Kharif dispatch goes out around June and July, ahead of the monsoon sowing. Rabi goes out around October and November. Between them sits most of the year's turnover, invoiced in a few weeks.

That compression does two things to a scheme. First, the slab race is decided fast. A dealer who is 30 litres short of the next slab on a cotton insecticide has days to close the gap, and he will ring the office to ask where he stands. If answering means exporting the sales register and rebuilding a spreadsheet, the answer arrives after the window has shut and the lift did not happen.

Second, bookings matter more here than in a steady-offtake line. Principals push pre-season booking schemes because they want the channel loaded before the rain. So the distributor holds promises made in May against liftings that happen in June and July, and those promises sit on a booking sheet, often on paper, that nobody reconciles until settlement. A scheme tool for this trade has to answer "where does this dealer stand today" during the window, not only at the end of it.

## Credit Tied to the Harvest Rather Than the 30th

A krishi kendra pays when the farmer pays, and the farmer pays when the crop sells at the mandi. Receivables here routinely run past any 30 or 60 day term, which is a cash problem in its own right and is dealt with in the piece on [receivables for agri-input distributors](/blog/receivables-app-for-agri-input-distributors/).

For schemes, the consequence is narrower. Most principal schemes carry a cash-discount rate keyed to when money arrives: a higher rate inside a defined window, a lower one after, sometimes a third bucket for the tail. That test works only if the window is a real date range, the receipt carries its actual date, and the receipt is allocated to specific bills, [bill by bill against reference](/blog/bill-by-bill-against-reference-tally/), rather than dropped on account.

That last one is where most settlements quietly break. A lump harvest payment covering eleven invoices, posted on account, cannot be tested against a window at all, because nothing says which bill it settled or which rate it earned. The distributor falls back to one rate for the whole payment, the dealer expects the higher rate on the earlier bills, and the argument is unavoidable. Allocation discipline during the season is what makes the settlement possible at the end of it, and it is the same discipline that keeps a [party-wise outstanding statement](/blog/partywise-outstanding-statement-tally/) trustworthy.

## Four Principals, Four Schemes, Different Crops

An FMCG distributor usually runs one principal's scheme structure across his whole basket. A crop protection distributor runs several at once, and they are keyed to different things.

| Scheme shape | What it is keyed to | Where it bites in agri input |
|---|---|---|
| Crop-category slab | Litres or kilograms lifted within one crop category | The same dealer sits in different slabs for cotton, paddy and vegetable lines |
| Absolute rate per pack | A fixed rupee amount per pack lifted | Needs the packet conversion right, or the rate hits the wrong unit |
| MRP-linked rate | A percentage of the pack's MRP | MRP changes between seasons, so the rate has to be read against the season's MRP |
| Token or free-goods rate | Units given free against a lifted quantity | Free goods leave the godown as stock and must be excluded from the count |
| Cash discount window | The date money arrived | Collides with harvest-linked payment, as above |

A dealer can land in a high slab on the cotton line and a low one on the paddy line in the same season, and the invoices that produced both sit mixed in one sales register. Splitting them by eye at settlement time is the commonest source of a wrong number, because the person doing it is reading item names off an export and guessing which crop each belongs to.

The fix is to make the classification a decision taken once, before the season, and recorded against the item: its crop, its category, whether it is in the scheme or deliberately excluded, and its packet factor. Then an [item-wise sales report](/blog/item-wise-sales-report-tally/) can be read against the scheme rather than interpreted against it.

## Packs on the Invoice, Kilograms in the Books

Agri input has a unit problem most trades do not. The principal's circular is written in packs, because that is how a farmer buys: a 250 ml bottle, a 5 litre jar, a 1 kg seed packet, a 50 kg fertiliser bag. The books frequently hold the same item in litres or kilograms, because that is how it was set up in Tally years ago and how the godown counts it.

A slab written as "1,000 packs" against stock held in litres cannot be evaluated until somebody converts. Do that at settlement time, on a spreadsheet, across forty items, and it will be done inconsistently. A 5 litre jar counted as one pack in one row and five in another is a slab boundary crossed or missed on a dealer who lifted several hundred jars.

Recording the packet factor once, on the item, alongside its crop and category, removes the whole class of error. It also survives the mid-season pack introductions this trade is full of, because a new pack size arrives as a new item that has to be classified before it can be counted.

## Returns After the Season and a Settlement Months Later

The last structural difference is the tail. Unsold crop protection stock comes back after the season, along with expiry-dated product, sometimes weeks after the slab was already discussed with the dealer. Both have to be netted off the lifted quantity before the slab is applied, and both arrive after the conversation that set the dealer's expectation.

So the timing of the settlement matters as much as its logic. A number computed in September and re-computed in November against a book that has since absorbed returns, voucher edits and a late credit note will not match itself, and the distributor cannot explain the difference. A settlement run has to keep its own record of the vouchers it counted, so the sheet opened in November still shows exactly what went into the September figure.

The same principle applies to what the run could not resolve. An unclassified item, a dealer with no booking on file, a return rate that looks wrong against the lifting: each should stop and be shown rather than be absorbed silently into a total. A run that swallows eleven unmapped items produces a smaller payout and a dealer who is correctly angry. A run that says "eleven items are still unclassified" produces a delay, and the delay is much cheaper than the argument. The working also sits alongside the [credit limit you set for that retailer](/blog/credit-limit-for-retailers/).

## Running the Season Settlement Off Your Books

Takkada has a scheme settlement module built for this shape of work, and it is switched on for a company on request rather than being part of the standard plans. The sequence follows the season. You classify each stock item into the scheme or mark it deliberately excluded, with its crop, its category and its packet factor. You enter each dealer's booking before the window opens. You run the season settlement, and the run reads liftings, returns and receipts straight from your synced Tally data rather than from an export taken last week.

The configuration carries what these schemes actually use: MRP, an absolute rate, a token rate, category slabs, and cash-discount windows keyed by payment date with a catch-all bucket for the gap days between one window closing and the next opening. What the run cannot resolve, it flags, separated into what blocks the number, what is worth a look, and what is simply context, such as a quantity you excluded on purpose. Then the credit notes go out and the working exports as a workbook you can sit down with in front of the dealer.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: How is a crop protection scheme different from an FMCG dealer scheme?**

A: The rules look similar but the inputs behave differently. Buying compresses into a few weeks around sowing, credit runs on the harvest rather than a 30 or 60 day term, several principals run overlapping schemes keyed to different crops, and the scheme counts packs while the books often hold litres or kilograms. The arithmetic is the same. Agreeing on the inputs is much harder.

**Q: How do I handle a scheme counted in packets when Tally holds kilograms?**

A: Record the packet factor once against the item, before the season, alongside its crop and category. Every lifting and every return then converts the same way all season. The failure to avoid is converting at settlement time on a spreadsheet, where a 5 litre jar gets counted as one pack in one row and five in another, which on a large dealer is enough to move him across a slab boundary.

**Q: How does a cash-discount window work when the dealer pays after the harvest?**

A: The window is a date range and the test is which range the receipt fell into. That test can only run if the receipt was allocated against specific bills rather than posted on account. A lump harvest payment covering eleven invoices with no allocation cannot be scored, so define the windows as real dates, keep a bucket for the gap days, and allocate receipts bill by bill through the season.

**Q: What do I do about stock that comes back after the season closes?**

A: Net it off the lifted quantity before applying the slab, converted into the same unit the scheme counts in. The difficulty is timing, because returns often arrive after the dealer has been told roughly where he stands. That is why the run should store the vouchers it counted, so a September number can still be explained in November after the book has moved.

**Q: Can I settle schemes for several principals in one season?**

A: Yes, provided each item carries its crop and category so the same sales register can be read four different ways. A dealer commonly sits in a high slab on one crop line and a low slab on another in the same season. Splitting those by eye off an export is the most common cause of a wrong payout, so the split has to be a recorded property of the item rather than a judgement made at the end.

**Q: Does the settlement work with my existing Tally?**

A: Yes. The scheme settlement module runs against the Tally data you already keep, reading liftings, returns and receipts from your synced books rather than a spreadsheet somebody typed. It is enabled for a company on request rather than sold as part of a plan, and it produces credit notes plus an exportable working.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
