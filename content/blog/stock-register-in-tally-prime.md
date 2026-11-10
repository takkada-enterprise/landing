---
title: "Stock Register in Tally Prime: Item Vouchers, Monthly Summary and Export"
slug: "stock-register-in-tally-prime"
meta_title: "Stock Register in Tally Prime: Item Vouchers and Export"
meta_description: "Stock register in Tally Prime: open Stock Item Vouchers and the monthly summary, read opening and closing by godown, and export to PDF or Excel."
primary_keyword: "stock register in tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "Reports"
excerpt: "Wall Putty 20 kg opened October with 160 bags across two godowns and closed with 135. The stock register in Tally Prime shows every voucher in between. Here is the path, the godown view and the export."
---

The stock register in Tally Prime is the Stock Item Vouchers report. Open Stock Summary, drill into an item and then into a month, and you see every voucher that moved it, with inward, outward and closing quantity. The Stock Item Monthly Summary, one level up, shows the same item month by month. Alt+E (Export) sends either report to PDF or Excel. Many people call this the stock ledger, and an auditor or CA may ask for it item by item at year end. This post walks the path in TallyPrime, shows how to read it godown by godown, and works one item through October 2026: Wall Putty 20 kg, 160 bags at the start of the month across the Main godown and the Shop, a purchase of 200, a transfer of 40 and five sales, closing at 135. It also covers Movement Analysis, which answers a different question. Key paths are from TallyPrime's help pages, checked on 10 November 2026.

## Key Highlights

- Stock Summary → item → Stock Item Monthly Summary → month → Stock Item Vouchers is the stock register path in TallyPrime.
- Godown Summary (Alt+G) shows each godown's stock, and drilling into an item opens its monthly summary for that godown.
- In the example, 160 bags + 240 inwards − 265 outwards = 135 bags, where the 40-bag transfer between godowns shows on both sides.

## In This Article

- Is the stock register the same as the stock ledger?
- How to open the stock register in Tally Prime
- How to see an item's stock godown-wise
- A worked example: one item, one month, two godowns
- What Movement Analysis tells you that the register does not
- On the phone: the stock ledger
- When the register and the shelf disagree
- Frequently Asked Questions

## Is the stock register the same as the stock ledger?

Yes, for most purposes. Both names mean one item's movement voucher by voucher, with a running balance. Tally's reports are named after the level you are looking at.

| What you want | Tally report | What a CA may call it |
|---|---|---|
| All items, opening to closing | Stock Summary | Stock statement |
| One item, month by month | Stock Item Monthly Summary | Item summary |
| One item, voucher by voucher | Stock Item Vouchers | Stock register or stock ledger |
| One godown's stock | Godown Summary | Godown stock statement |

The stock item master, where you create the item, is a different thing. When someone asks for the stock ledger of an item, they want the vouchers, which is the third row.

## How to open the stock register in Tally Prime

1. Press Alt+G (Go To), type Stock Summary and press Enter.
2. Drill into the stock group and then the item. Tally opens the Stock Item Monthly Summary, with inwards, outwards and closing for each month.
3. Select a month and press Enter. This is Stock Item Vouchers: each voucher's date, party, type and number, with inward and outward quantity and value.
4. Press F2 to change the period, for example 1 to 31 October.
5. Press Alt+E (Export), choose the current report and pick Excel or PDF as the format.

Stock Summary has an F12 option, Show Opening Balance, if you want the opening column on the summary itself.

## How to see an item's stock godown-wise

Press Alt+G, type Godown Summary and press Enter. Tally lists the stock in each godown with its closing balance. Drill into a godown and then an item, and Tally opens that item's monthly summary for the godown, which drills to its vouchers the same way. To set two godowns side by side, press Alt+C (New Column) in Godown Summary and pick the other godown. For items kept in batches, Tally's Batch Summary shows the stock batch by batch.

## A worked example: one item, one month, two godowns

A paint, hardware and sanitary distributor keeps Wall Putty 20 kg in two godowns, the Main godown and the Shop. October 2026 opened with 140 bags in Main and 20 in the Shop.

| Date | Voucher | Party or note | Godown | In | Out | Balance |
|---|---|---|---|---|---|---|
| 1 Oct | Opening | | Both | | | 160 |
| 3 Oct | Purchase | Om Distributors | Main | 200 | | 360 |
| 6 Oct | Sales | Ravi Traders | Main | | 70 | 290 |
| 10 Oct | Stock Journal | Transfer Main → Shop | Both | 40 | 40 | 290 |
| 14 Oct | Sales | Mehta Sanitary | Main | | 60 | 230 |
| 17 Oct | Sales | Lakshmi Stores | Shop | | 25 | 205 |
| 21 Oct | Sales | Patel Paints | Main | | 50 | 155 |
| 27 Oct | Sales | Shree Ganesh Hardware | Shop | | 20 | 135 |
| **31 Oct** | **Closing** | | | **240** | **265** | **135** |

Read across all godowns, the transfer adds 40 and takes away 40, so the balance does not move. Read godown by godown, it is a real movement. Main went from 140 to 120: 140 + 200 − 40 − 180. The Shop went from 20 to 15: 20 + 40 − 45. Together that is 135, which matches the last line.

If a count on 31 October finds 12 bags in the Shop instead of 15, the register tells you where to look: the two Shop sales and the transfer are all the vouchers that touched it this month.

## What Movement Analysis tells you that the register does not

Stock Item Movement Analysis groups the same month by party: who supplied the item and who bought it, with quantity and value. Press Alt+G, type Stock Item Movement Analysis and pick the item. The register answers "what happened, in order". Movement Analysis answers "with whom". If you need the rate each supplier charged, open the supplier from Movement Analysis, as our post on [supplier rate comparison for the same item](/blog/supplier-rate-comparison-same-item/) explains.

Neither report says how long the stock has been sitting. That is the [stock ageing report in Tally Prime](/blog/stock-ageing-report-tally-prime/).

## On the phone: the stock ledger

In Takkada, open any item and tap Stock ledger, or open it from a godown's stock. You see every voucher that moved the item, with the Opening Balance and the closing quantity, for all godowns or one. For items kept in batches, it shows the batches on the end date of the period. Figures come from your Tally, as of the last sync.

The ledger downloads as a print-ready PDF laid out like Tally's stock item register, or as Excel with one row per voucher, and goes out through the phone's share sheet on WhatsApp or email. A partner who gets the CA's call on Saturday can send the register for one item without reaching the office computer. A godown's stock itself opens by item, stock group or category, as our post on the [godown-wise stock report](/blog/godown-wise-stock-report-tally-mobile/) describes. The other reports the app reads from your Tally are on the [Tally reports on mobile](/tally-reports-on-mobile/) page.

## When the register and the shelf disagree

The register is what the books say. The shelf is what is there. When they differ, count first, then record the count. Our guide to [physical stock entry in Tally Prime](/blog/physical-stock-entry-in-tally-prime/) shows the voucher that brings the books in line, and the [physical stock verification for Tally](/physical-stock-verification-tally/) page shows how the Physical Stock Count add-on gives one stock group in one godown to one person to count on the phone, without the book figure on their screen, and puts every difference in front of you before the stock journal is made for Tally.

## Frequently Asked Questions

**Q: How do I check the stock ledger in Tally Prime?**

A: Open Stock Summary with Alt+G, drill into the item to reach its Stock Item Monthly Summary, then select a month to open Stock Item Vouchers. That report lists every voucher that moved the item, with inward, outward and closing quantity. Press F2 to set the period.

**Q: What is the difference between stock register and stock ledger?**

A: In everyday use they mean the same report: one item's movement, voucher by voucher, with a running balance. In TallyPrime it is called Stock Item Vouchers. The stock item master, where the item is created, is a separate screen.

**Q: How do I see an item's stock godown-wise in Tally?**

A: Press Alt+G and open Godown Summary, then drill into a godown and the item to reach its monthly summary and vouchers for that godown. Press Alt+C to add a second godown as a column. In the example, Main closes October at 120 bags and the Shop at 15.

**Q: Can I export the stock register to Excel?**

A: Yes. With Stock Item Vouchers open, press Alt+E (Export), choose the current report and set the format to Excel or PDF. In Takkada, the stock ledger downloads as Excel with one row per voucher, or as a PDF laid out like Tally's stock item register.

**Q: How do I see batch-wise stock of an item?**

A: In TallyPrime, Batch Summary shows an item's stock batch by batch, for items kept in batches. In Takkada, the item's stock ledger shows its batches on the end date of the period you pick.

Takkada shows each item's stock ledger, godown stock and the rest of your Tally reports on the phone and the web app, from your Tally as of the last sync. [Message us on WhatsApp](https://wa.me/919435977777) to see it on your own items.
