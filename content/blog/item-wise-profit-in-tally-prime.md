---
title: "Item Wise Profit in Tally Prime: F7 Steps, the Gaps and a Faster Check"
slug: "item-wise-profit-in-tally-prime"
meta_title: "Item Wise Profit in Tally Prime: F7 Steps and the Gaps"
meta_description: "Item-wise profit in Tally Prime: the F7 steps, why Stock Summary and Sales Register can differ, and how to list items sold below cost."
primary_keyword: "item wise profit in tally prime"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "Reports"
excerpt: "Wall Putty 20 kg made ₹17,000 in September across three customers, and one of them was sold below cost. Here is how to find item-wise profit in Tally Prime, why two reports can disagree, and how to catch the below-cost sale."
---

To see item wise profit in Tally Prime, open Stock Summary and press F7 (Show Profit): each item's outwards side then shows its consumption at cost, the gross profit and a percentage. For each invoice, open the Sales Register, pick a month and press F7. Neither report lists only the items sold below cost, and neither gives profit customer by customer. That gap matters for a distributor who sells the same item to many shops at different rates, because one low rate can hide inside a healthy item total. The worked example below follows Wall Putty 20 kg through September 2026: three customers, ₹1,57,400 of sales, ₹17,000 of profit, and one customer billed under cost. It also explains why Stock Summary and the Sales Register can show different profit for the same month, and how to check one invoice's margin from your phone. Key paths are from TallyPrime's help pages, checked on 10 November 2026.

## Key Highlights

- Stock Summary with F7 gives profit item by item; the Sales Register with F7 gives profit invoice by invoice, with Gross Revenue shown before tax.
- The two reports can show different profit because they can value cost differently; F12 in the Sales Register has an option, Show Cost based on Stock Valuation, to bring them closer.
- In the example, Wall Putty 20 kg earns 10.8% on selling price for the month, while one customer's 60 bags went out ₹600 below cost.

## In This Article

- How to check item wise profit in Tally Prime
- Why Stock Summary and Sales Register show different profit
- How to see customer wise profit in Tally
- A worked example: one item, three customers
- How to find items sold below cost
- On the phone: item, customer, invoice
- Frequently Asked Questions

## How to check item wise profit in Tally Prime

Item profit in Tally Prime lives in Stock Summary, and invoice profit lives in the Sales Register. Both use F7.

1. Press Alt+G (Go To), type Stock Summary and press Enter.
2. Press F7 (Show Profit). The outwards side of each item now shows consumption, gross profit and a percentage column.
3. Drill into a stock group to reach its items, and press F2 to set the period you want.
4. For invoice profit, press Alt+G, open the Sales Register, select a month and press Enter.
5. Press F7 (Show Profit). Each invoice shows Transaction Value (with tax), Gross Revenue (without tax), Cost and Gross Profit.

Tally's help also notes that F12 (Configure) in Stock Summary has an option to work out gross profit on gross value, which includes tax. Leave it off if you want profit on the value before GST, which is what most owners compare against their purchase rate.

## Why Stock Summary and Sales Register show different profit

The two reports can work out cost in different ways, so the same month can show two profit figures. Tally's help says the Sales Register's F12 option Show Cost based on Stock Valuation brings invoice-level gross profit in line with Stock Summary. Even then, batches, godowns, discounts, additional costs and different actual and billed quantities can leave a gap.

| Report | Cost it uses | Question it answers |
|---|---|---|
| Stock Summary, F7 | Cost from the item's stock valuation | Which items made money this period |
| Sales Register, F7 | Book cost on each invoice, unless F12 changes it | Which invoices made money |
| Sales Register, F7 with Show Cost based on Stock Valuation | Cost on the same basis as Stock Summary | Invoice profit that agrees with the item view |

If your accountant and your Stock Summary disagree on September's profit, check this setting before you check the entries.

## How to see customer wise profit in Tally

Tally has no report that shows profit customer by customer. Tally's own business guide points to Ledger Movement Analysis for a party: press Alt+G, type Movement, choose the ledger analysis and pick the customer. It shows what that customer bought, in quantity and value, and the rates. It does not show the cost against each line, so the profit has to be worked out by hand or in Excel from an export. For one item, Stock Item Movement Analysis lists who it went out to, which is the start of the table below.

## A worked example: one item, three customers

Wall Putty 20 kg is a steady seller for a paint, hardware and sanitary distributor. In September 2026 its cost was ₹540 a bag, as the distributor's Tally values it. Three customers bought it.

| Customer | Bags | Average price | Sales | Cost at ₹540 | Profit | On selling price |
|---|---|---|---|---|---|---|
| Ravi Traders | 120 | ₹640 | ₹76,800 | ₹64,800 | ₹12,000 | 15.6% |
| Mehta Sanitary | 80 | ₹610 | ₹48,800 | ₹43,200 | ₹5,600 | 11.5% |
| Lakshmi Stores | 60 | ₹530 | ₹31,800 | ₹32,400 | −₹600 | −1.9% |
| **Total** | **260** | | **₹1,57,400** | **₹1,40,400** | **₹17,000** | **10.8%** |

Stock Summary with F7 shows the last line only: ₹17,000 of profit at 10.8%. That looks fine. The ₹600 loss on Lakshmi Stores is inside it, and so is the fact that Ravi Traders pays ₹110 a bag more than Lakshmi Stores for the same putty. The item total tells you the putty made money; only the customer rows show where the rate slipped below cost.

## How to find items sold below cost

In Tally, you find a below-cost sale by scanning for minus signs. Open the Sales Register with F7 for the month and look down the Gross Profit column, invoice by invoice. A loss on one line can hide inside an invoice that made money on the other lines, so a careful check means opening each invoice. For a month with a few hundred bills, that is an afternoon.

In Takkada, the Insights tab inside Sales by Item has a card called Selling below cost. It lists the items sold under their purchase price in the period, with the average price, the purchase price and how much was given away. The card works item by item: an item lands on it when its average sale price for the period is under its average purchase price. Wall Putty 20 kg averaged about ₹605 a bag in September against ₹540, so it stays off the card; the ₹600 lost on Lakshmi Stores shows when you tap the item and read its customers. Cost on this card is the purchase price as Takkada reads it from your Tally. The same tab has cards for slipping items, vanished customers and the few items that make 80% of your sales, all explained on the [sales insights from Tally](/sales-insights-tally/) page.

## On the phone: item, customer, invoice

Takkada reads your sales from Tally, as of the last sync, and Sales by Item shows each item's quantity, net amount, average price and the change against the previous period. Amounts are after line discount and before GST. Tap Wall Putty 20 kg and you see its customers and their average price this period. Tap Lakshmi Stores and you see the invoices. Sales by Item takes customer returns (credit notes) off and shows them in a Returns column. The [party-wise item-wise sales report for Tally](/party-wise-item-wise-sales-report-tally/) page walks through the grouping by customer, stock group or month.

Open the invoice itself and, once the owner turns on Show margin on invoice, each line shows Cost, Margin and Margin %. Cost is the item's cost for that financial year as your Tally values it, and Margin % on the invoice is on selling price. If a line's cost is missing, you can type one for that invoice only; it is not sent to Tally. The [invoice-wise profit for Tally](/invoice-wise-profit-tally/) page shows that screen. Owners and full-access team members see item-wise sales and profit; you choose who else sees reports.

Margin percent is often quoted on cost in the trade and on selling price in the books. Our post on [gross profit on cost vs selling price](/blog/gross-profit-on-cost-vs-selling-price/) has the conversion table, and the [profit report for distributors](/blog/profit-report-for-distributors-tally/) covers the month-end gross profit view. Every report the app adds is listed on the [Tally reports on mobile](/tally-reports-on-mobile/) page.

## Frequently Asked Questions

**Q: Can I check item wise profit in Tally Prime?**

A: Yes. Open Stock Summary with Alt+G and press F7 (Show Profit). Each item's outwards side shows consumption at cost, gross profit and a percentage for the period you set with F2. In the example, Wall Putty 20 kg shows ₹17,000 of profit on ₹1,57,400 of sales.

**Q: Why does Stock Summary profit not match Sales Register profit?**

A: The two reports can work out cost differently. In the Sales Register, press F12 and turn on Show Cost based on Stock Valuation to bring invoice profit in line with Stock Summary. Batches, godowns, discounts and additional costs can still leave a small gap.

**Q: How do I see customer wise profit in Tally?**

A: Tally has no customer-profit report. Ledger Movement Analysis for a party shows what the customer bought and at what rates, and you work out profit against cost yourself. In the example, that is how you would find Ravi Traders earning ₹12,000 and Lakshmi Stores losing ₹600 on the same item.

**Q: How do I find items sold below cost?**

A: In Tally, open the Sales Register with F7 and look for negative gross profit, invoice by invoice. In Takkada, the Selling below cost card in the Insights tab lists each item whose average sale price was under its purchase price, and the amount given away. A loss on one customer inside an item that made money overall shows in that item's customer list instead.

**Q: Does GST change item profit in Tally?**

A: Not by default. The Sales Register shows Gross Revenue without tax next to the cost, and gross profit is worked out on that value. Stock Summary has an F12 option to work profit out on gross value, which includes tax, so keep it off when you compare with purchase rates.

Takkada shows Sales by Item, the Insights cards and the margin on each sales invoice from your Tally books, on the phone and the web app. [Message us on WhatsApp](https://wa.me/919435977777) to see them on your own data.
