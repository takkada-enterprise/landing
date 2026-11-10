---
title: "Physical Stock Entry in Tally Prime: Steps, Register and Stock Journal"
slug: "physical-stock-entry-in-tally-prime"
meta_title: "Physical Stock Entry in Tally Prime: Steps and Register"
meta_description: "Physical stock entry in Tally Prime step by step: the voucher, godown and batch fields, the register, and when a Stock Journal is the better entry."
primary_keyword: "physical stock entry in tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "Alt+G, Create Voucher, Ctrl+F7: the Physical Stock voucher step by step, where its register is, a worked example of 120 cartons in the books and 112 on the shelf, and when a Stock Journal suits better."
---

A physical stock entry in Tally Prime records the quantity you actually counted for an item in a godown on a date, and Tally adjusts the book stock to match it. You make it with the Physical Stock voucher. Press Alt+G (Go To) > Create Voucher and press Ctrl+F7, press F2 to set the date of the count, then select each item, its godown, its batch if batches are on, and type the quantity you found on the shelf. Press Ctrl+A to save. Tally adds the difference as inwards or outwards on its own, and every such entry shows in the Physical Stock Register, which opens from Alt+G. When you want the difference itself, its rate and its value on the entry, accountants often use a Stock Journal (Alt+F7) instead. The table further down compares the two, and the worked example takes one item from 120 cartons in the books to 112 on the shelf. Key paths are from TallyPrime's help, checked on 10 November 2026.

## Key Highlights

- The Physical Stock voucher takes the quantity you counted, not the difference. Type 112 when the shelf has 112, and Tally works out the 8 that are missing.
- Alt+G > Create Voucher > Ctrl+F7 opens the voucher, F2 changes the date, and Alt+G > Physical Stock Register shows every entry made with it.
- A Stock Journal records the 8-carton gap with a rate, here 8 × ₹850 = ₹6,800 at cost, which is why many accountants prefer it for shortages and excess.

## In This Article

- What a physical stock entry does
- Steps to make a physical stock entry in TallyPrime
- The Physical Stock Register
- A worked example: 120 cartons in the books, 112 on the shelf
- Physical Stock voucher vs Stock Journal: which to use after a count
- Common mistakes
- Who did the counting matters
- How Takkada makes the entry
- Frequently Asked Questions

## What a physical stock entry does

Tally keeps a running book stock for every item from your purchases, sales and transfers. After a count, the shelf and the book rarely agree. A physical stock entry tells Tally what the shelf held on the count date, and from that date the book stock starts from the counted figure. Tally's own note on the voucher says the cause of a discrepancy can be written in the narration, so the reason stays with the entry.

## Steps to make a physical stock entry in TallyPrime

1. Press Alt+G (Go To) > Create Voucher, then press Ctrl+F7 (Physical Stock).
2. Press F2 and set the date of the count.
3. In Name of Item, select the stock item.
4. In Godown, select the godown where you counted it. This field appears when godowns are on. If godowns are new to you, read [what a godown is in Tally](/blog/what-is-godown-in-tally/).
5. In Batch/Lot No., select the batch if the item is batch-wise. The manufacturing and expiry dates fill in on their own.
6. In Quantity, type the quantity you counted.
7. Repeat for every item counted in that godown, and write the reason for any large gap in the narration.
8. Press Ctrl+A to save.

## The Physical Stock Register

Press Alt+G (Go To), type or select Physical Stock Register and press Enter. The register lists the physical stock entries for the period, so you can see when each item was counted and how its stock was adjusted. It is the report to show your CA when they ask how the year's counts were recorded. The book side of the count, voucher by voucher for one item, is Stock Item Vouchers, which our post on the [stock register in Tally Prime](/blog/stock-register-in-tally-prime/) walks through.

## A worked example: 120 cartons in the books, 112 on the shelf

A distributor counts detergent powder in the Main godown on 10 November 2026. The figures are an illustration.

| | Quantity | Cost rate | Value at cost |
|---|---|---|---|
| Book stock before the count | 120 cartons | ₹850 | ₹1,02,000 |
| Counted on the shelf | 112 cartons | ₹850 | ₹95,200 |
| Difference | 8 cartons short | ₹850 | ₹6,800 |

With the Physical Stock voucher you type 112 against the Main godown and save. Tally takes the 8 cartons out of the book stock as an outward adjustment. With a Stock Journal you type the 8 cartons under Source (Consumption) at ₹850, and the voucher shows ₹6,800 going out of the Main godown.

## Physical Stock voucher vs Stock Journal: which to use after a count

Both entries bring the book stock to the counted figure. They differ in what you type and what the entry shows afterwards.

| | Physical Stock voucher | Stock Journal |
|---|---|---|
| Opens with | Alt+G > Create Voucher > Ctrl+F7 | Alt+G > Create Voucher > Alt+F7 |
| What you enter | The counted quantity | The difference: shortage under Source (Consumption), excess under Destination (Production) |
| Rate and value | Tally works out the gap from the book stock | Rate and amount sit on each line |
| Where the reason goes | Narration | Narration |
| Godown and batch | On each line | On each line |
| Suits best | A full count where you want the book to equal the shelf | A shortage or excess you want valued and explained on the entry |

Many accountants use the Stock Journal for shortages and excess because the value of the gap is visible on the voucher, which makes the profit and loss effect easy to explain to the owner. Ask your CA which one your books follow, and use the same one every time. The full Stock Journal entry, with the GST side of a shortage, is in [stock shortage and excess entry in Tally](/blog/stock-shortage-excess-entry-in-tally/).

## Common mistakes

- **Typing the difference into a Physical Stock voucher.** The voucher wants what is on the shelf. Typing 8 instead of 112 would set the stock to 8 cartons.
- **Wrong date.** Use the date of the count, and count before the first bill or after the last bill of that day, so that day's sales do not blur the figure.
- **Wrong godown.** A count of the Main godown entered against the Branch godown corrects one location and spoils the other.
- **Batch left blank.** For a batch-wise item, enter each batch on its own line, so Tally adjusts the right batch.

## Who did the counting matters

The entry is only as good as the count behind it. If the counter worked from a printed stock summary, they may have copied the book figure for the hard shelves, and the entry then hides the shortage. Before you make any entry, use a count where the counter never sees the book quantity, as in our [physical stock verification checklist](/blog/physical-stock-verification-checklist/). The [physical stock verification for Tally](/physical-stock-verification-tally/) page shows how that count runs on the phone. For the same steps in Hinglish, read [Tally me physical stock kaise kare](/blog/tally-me-physical-stock-kaise-kare/).

## How Takkada makes the entry

Takkada makes a Stock Journal for the difference instead of a Physical Stock voucher, the entry accountants already use for stock adjustments. In its Physical Stock Count add-on, the counter types what is on the shelf without seeing the book stock, and you review book stock, counted, difference and rate for each item. When you approve, Takkada makes the stock journal for Tally: shortages go out of the godown and extra stock comes in, at the rates you approved, and it is sent to Tally through Takkada's Tally connector.

## Frequently Asked Questions

**Q: What is a physical stock voucher in Tally Prime?**

A: It is the inventory voucher for recording the quantity you counted. You enter the item, godown, batch and counted quantity, and Tally adjusts the book stock to that figure, booking the gap as inwards or outwards. In the example, typing 112 cartons takes 8 out of a book stock of 120.

**Q: What is the shortcut key for the physical stock voucher in Tally Prime?**

A: Press Alt+G (Go To) > Create Voucher, then Ctrl+F7. Press F2 inside the voucher to set the date of the count, and Ctrl+A to save. The Stock Journal, by comparison, is Alt+F7 from the same Create Voucher screen.

**Q: Where is the physical stock register in Tally Prime?**

A: Press Alt+G (Go To), type Physical Stock Register and press Enter. It lists the physical stock entries for the period, so you can see each count and the adjustment it made.

**Q: Should I use a physical stock voucher or a stock journal for a shortage?**

A: Either brings the books to the shelf. A Stock Journal puts the shortage, its rate and its value on the entry, such as 8 cartons at ₹850 for ₹6,800, so many accountants prefer it. Agree one method with your CA and use it every time.

**Q: Can I enter physical stock for one godown only?**

A: Yes. Select the godown on each line and enter only the items you counted there. Count and enter one godown at a time, and the other godowns stay as they are.

Takkada's Physical Stock Count add-on makes this stock journal for you once you approve a count, valued at cost. Batch-wise items are counted but left out of the journal; adjust those in Tally by batch. Physical Stock Count is an add-on, priced by your partner. Ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company.
