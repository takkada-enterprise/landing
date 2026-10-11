---
title: "Auto Parts Billing for Lubricant and Battery Distributors"
meta_title: "Billing for Lubricant and Battery Distributors | Takkada"
slug: "lubricant-battery-distributor-billing"
meta_description: "Billing for lubricant and battery distributors: thin markups on engine oil and batteries, priced from the last purchase cost and kept in step with revisions."
primary_keyword: "lubricant and battery distributors"
date: "2026-10-12"
author: "harsh"
category: "Schemes"
excerpt: "Engine oil and batteries sell on thin markups, and a missed price revision can wipe out a month's margin on them. Here is how cost-plus billing keeps the rate in step with your purchase bills."
---

Auto parts billing for lubricant and battery distributors has to protect thin markups, and Takkada's AutoParts billing does it by pricing each item from its last purchase cost plus the markup you set. Engine oil might carry 15% and batteries 12%, set once on their stock groups. A one-litre oil pack that cost ₹312.50 sells at ₹359.38 before GST, and a battery that cost ₹4,210.00 sells at ₹4,715.20. When the oil company revises its rate and your next purchase bill reaches the app, the selling price follows it, and the Purchase price changes screen lists each item that moved and by how much. On a thin markup, a revision that the counter misses for two weeks can eat most of the margin on those sales. The cost is read per unit in the item's own unit, after the trade discount and before GST, so the way purchases are booked in Tally matters, and this post covers the unit check to make before you start.

## The distributor's week

You carry two or three oil brands in packs from half a litre to bulk drums, plus one or two battery brands. Your buyers are garages, two-wheeler workshops, petrol pump shops and spare parts retailers, perhaps 200 of them, on 15 to 30 days of credit. Volumes are high, markups are low, and the oil companies revise prices several times a year.

A battery sold ₹100 too cheap is noticed at month end. Two hundred oil packs sold at last month's rate often are not.

## Thin markups, set once

In Settings, Invoices, AutoParts billing, give the oil groups 15% and the battery groups 12%. A Company default markup covers anything else you stock. One premium synthetic grade can carry its own item markup, and the screen marks it "from item" so you know it is set apart.

Each figure is a markup on cost. At 15%, ₹312.50 becomes ₹359.375, rounded to ₹359.38. Only the business admin can change markups.

## Cartons, litres and pieces

Oil is often bought by the carton and sold by the pack. The app works out cost in the item's own unit, so a purchase line booked in a different unit from the item's own unit is skipped. If the only purchase of a pack was booked in cartons while the item is in pieces, the item's card in Stock Summary reads No usable cost and the pack bills at its normal price.

The fix sits in Tally: book the purchase in the item's own unit, and the next purchase bill gives a usable cost. A quick look through Stock Summary after setup shows which items are affected.

## Company stock and open-market stock

When the company's supply runs short, many distributors buy a few cartons from another dealer at a higher rate. If that bill is the latest one, it sets the cost. To stop that, set the oil company as the preferred supplier for those groups. The cost then follows that supplier's latest purchase, and only falls back to the latest purchase from anyone when that supplier has none. After changing a preferred supplier, the screen says costs will update in a few minutes.

## The bill

A workshop takes 24 oil packs and 4 batteries:

- 24 packs at ₹359.38: taxable ₹8,625.12, CGST ₹776.26, SGST ₹776.26, total ₹10,177.64
- 4 batteries at ₹4,715.20: taxable ₹18,860.80, CGST ₹1,697.47, SGST ₹1,697.47, total ₹22,255.74

These use 18% GST to show the arithmetic. The bill uses each item's own GST rate from your books. The invoice reaches Tally as a sales voucher with each line's rate, and the cost and markup stay in the app.

## When a revision lands

Tap Price changes. The purchase bill that carried the new rate is one card, with a line such as "12 items · 12 moved more than 10%" when a big revision lands. Each row shows the old and new cost and the selling price before and after.

The rules are in the [AutoParts billing guide](/blog/auto-parts-billing-software-for-tally), and the module page is [cost-plus pricing for Tally](/autoparts-billing-tally).

## Frequently Asked Questions

**Q: Why does an oil pack show No usable cost?**

A: No purchase gave a usable cost for it. One cause is a purchase booked in another unit, such as cartons, while the item is in pieces. Book the next purchase in the item's own unit.

**Q: Can the open-market purchase be kept out of the cost?**

A: Yes. Set the company as the preferred supplier, and its latest purchase sets the cost while it has one.

**Q: Does the markup apply to the price with GST?**

A: No. It applies to the cost before GST, and GST is added on the bill.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with your oil and battery groups and we will check the units with you before you switch on cost-plus pricing.
