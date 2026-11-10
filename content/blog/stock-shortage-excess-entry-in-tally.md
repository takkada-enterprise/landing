---
title: "Stock Shortage and Excess Entry in Tally, with the GST Side"
slug: "stock-shortage-excess-entry-in-tally"
meta_title: "Stock Shortage and Excess Entry in Tally, with GST"
meta_description: "Stock shortage and excess entry in Tally: a stock journal for each, at cost, in the right godown, plus what a shortage means for input tax credit."
primary_keyword: "stock shortage entry in tally"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "Three items short by ₹4,860 and one item ₹520 over, entered as a Stock Journal at cost in the right godown, with the input tax credit question a shortage raises under GST."
---

A stock shortage entry in Tally takes the missing quantity out of the godown at cost, and an excess entry brings the extra quantity in at cost. Most accountants make both with a Stock Journal. Press Alt+G (Go To) > Create Voucher and press Alt+F7, put the short items under Source (Consumption) and the extra items under Destination (Production), each with its godown, quantity and cost rate, and write the reason in the narration. The shortage lowers your closing stock, and your CA decides whether it is also shown as a separate loss. A shortage has a GST side too. Under section 17(5)(h) of the CGST Act, input tax credit is not available on goods lost, stolen, destroyed or written off, so credit already taken on such goods is reversed in GSTR-3B. The worked example below takes three items short by ₹4,860 and one item ₹520 over, and works out the credit to reverse at 18%.

## Key Highlights

- A Stock Journal can carry both sides: short items under Source (Consumption) and extra items under Destination (Production), each in its own godown and at cost.
- Value each line at the cost rate of the goods. In the example, ₹4,860 goes out, ₹520 comes in, and closing stock falls by ₹4,340.
- On goods lost or stolen, input tax credit already taken is reversed. At 18%, the ₹4,860 shortage means ₹874.80 of credit, to confirm with your CA.

## In This Article

- Shortage and excess: what each means
- The Stock Journal for a shortage and an excess
- A worked example: three items short, one over
- What the entry does to your accounts
- The GST side of a shortage
- Why the count must be honest
- How Takkada makes this entry
- Frequently Asked Questions

## Shortage and excess: what each means

A shortage is when the shelf holds less than the books say. An excess is when it holds more. Both come out of a physical count, and both are corrected in the godown where they were found. The usual reasons for each, from wrong godowns on invoices to unbilled cash sales, are in [physical stock not matching Tally](/blog/physical-stock-not-matching-tally/). Fix entry mistakes at their source first, and use a shortage or excess entry only for what is still different after that.

## The Stock Journal for a shortage and an excess

1. Press Alt+G (Go To) > Create Voucher, then press Alt+F7 (Stock Journal).
2. Set the date of the count.
3. Under Source (Consumption), select each short item, its godown and the quantity missing. Rate and amount fill in where a rate is set for the item; correct the rate to cost if it is not.
4. Under Destination (Production), select each extra item, its godown and the quantity over, with its cost rate.
5. Write the count reference and the reason in the narration, then press Ctrl+A to save.

| Side of the Stock Journal | What goes there | Godown | Rate |
|---|---|---|---|
| Source (Consumption) | Items short, quantity missing | Where the count was done | Cost rate |
| Destination (Production) | Items over, extra quantity | Where the count was done | Cost rate |

Some accountants keep shortages and excess as separate Stock Journals, so each total stands alone. Either way works. If you prefer to type the counted quantity and let Tally work out the gap, use the Physical Stock voucher in [physical stock entry in Tally Prime](/blog/physical-stock-entry-in-tally-prime/).

## A worked example: three items short, one over

A spare parts trader counts the Spares group in the Main godown. After a recount, four items are still different. The figures are an illustration.

| Item | Side | Quantity | Cost rate | Amount |
|---|---|---|---|---|
| Brake shoe set | Source (short) | 3 sets | ₹1,020 | ₹3,060 |
| Clutch plate | Source (short) | 2 pcs | ₹650 | ₹1,300 |
| Spark plug | Source (short) | 4 pcs | ₹125 | ₹500 |
| **Total short** | | | | **₹4,860** |
| Fan belt | Destination (over) | 2 pcs | ₹260 | ₹520 |
| **Total over** | | | | **₹520** |

The Stock Journal takes ₹4,860 of goods out of the Main godown and brings ₹520 in. The net effect on stock is ₹4,340 less.

## What the entry does to your accounts

The Stock Journal moves quantity and value in your inventory. Your closing stock falls by the net ₹4,340, and because closing stock feeds gross profit, the shortage lowers profit by the same amount. Some CAs leave it there for a normal shortage. Others show an unusual loss, such as theft or damage, as a separate loss in the profit and loss account so it is visible. That is an accounting choice for your CA to make, and it should be the same every year.

## The GST side of a shortage

> **GST box: confirm with your CA.**
>
> - **Lost, stolen, destroyed or written off.** Section 17(5)(h) of the CGST Act says input tax credit is not available on goods lost, stolen, destroyed or written off (the clause also covers goods given away as gifts or samples). Credit already taken on such goods is reversed.
> - **Where it goes in the return.** CBIC Circular 170/02/2022-GST of 6 July 2022 says reversal of credit that is ineligible under section 17(5) is reported in Table 4(B)(1) of GSTR-3B.
> - **The example.** If the ₹4,860 of short goods carried 18% GST when bought, the credit involved is ₹874.80: ₹437.40 CGST and ₹437.40 SGST.
> - **Sold without a bill.** If the goods were sold and never billed, that is a supply. Tax is due on the sale, and it is a different problem from a loss.
> - **Goods not accounted for.** Under section 35(6), where goods are not accounted for, the proper officer can work out tax as if they had been supplied. A shortage you record and explain is your answer to that question.
> - **Normal loss.** Breakage, drying or spillage that is normal for the trade is argued case by case. Keep the reason for each line.

Excess stock deserves the same care. An excess usually means an entry was missed, such as a purchase not entered or a sale billed twice. Find it if you can, because an unexplained excess also raises questions about where the goods came from.

## Why the count must be honest

A shortage entry built on a count copied from the stock summary records nothing, and the GST question stays open. Use a count where the counter never sees the book figure, recount only what differs, and check what moved after the cut-off. The full method is in our [physical stock verification checklist](/blog/physical-stock-verification-checklist/).

## How Takkada makes this entry

In Takkada's Physical Stock Count add-on, each difference is valued at cost: the godown's FIFO cost, else Tally's closing rate, else a rate you type, and you can change any rate before approving. The approve screen shows the total shortage and excess value first. Then [approval makes this stock journal for Tally](/physical-stock-verification-tally/): shortages go out of the godown and extra stock comes in, at the rates you approved, and it is sent to Tally through Takkada's Tally connector. Batch-wise items are counted but left out of the journal; adjust those in Tally by batch. The app does not reverse input tax credit, so the GST box above stays with you and your CA.

## Frequently Asked Questions

**Q: How do I pass a stock shortage entry in Tally?**

A: Open a Stock Journal with Alt+G > Create Voucher > Alt+F7. Put each short item under Source (Consumption) with its godown, the missing quantity and its cost rate, write the reason in the narration, and save with Ctrl+A. In the example, three items go out for ₹4,860.

**Q: How is excess stock entered in Tally?**

A: In the same Stock Journal, under Destination (Production), with the godown, the extra quantity and the cost rate. In the example, 2 fan belts at ₹260 come in for ₹520. Look for a missed purchase or a double sale before you enter it.

**Q: Do I need to reverse input tax credit on a stock shortage?**

A: On goods lost, stolen, destroyed or written off, yes: section 17(5)(h) of the CGST Act blocks the credit, and the reversal goes in Table 4(B)(1) of GSTR-3B. At 18%, a ₹4,860 shortage means ₹874.80 of credit. Confirm the treatment with your CA.

**Q: At what rate should a stock shortage be valued?**

A: At cost, the rate the goods came in at, using the valuation method your books follow. The selling price would overstate the loss. Your CA may ask you to use the closing stock rate, so agree it once and keep it the same.

**Q: Is a stock shortage an expense?**

A: A shortage lowers closing stock, so it lowers profit even without a separate ledger. Some CAs also show an unusual loss, such as theft or damage, as a separate loss in the profit and loss account. Ask your CA which way your books follow.

Takkada's Physical Stock Count add-on makes the stock journal for Tally when you approve a count, at cost. Physical Stock Count is an add-on, priced by your partner. Ask them for the add-on price, or [message us on WhatsApp](https://wa.me/919435977777) and we will switch it on for your company.
