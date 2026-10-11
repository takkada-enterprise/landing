---
title: "Markup by Stock Group: Pricing Thousands of Part Numbers Without a Spreadsheet"
meta_title: "Markup by Stock Group for Part Numbers | Takkada"
slug: "markup-by-stock-group-part-numbers"
meta_description: "Markup by stock group prices thousands of part numbers from their purchase cost: one figure per Tally stock group, with item overrides and exclusions."
primary_keyword: "markup by stock group"
date: "2026-10-12"
author: "harsh"
category: "Schemes"
excerpt: "Three thousand part numbers do not need three thousand prices typed by hand. Here is how one markup per stock group, plus a few item overrides, prices the lot from purchase cost."
---

Markup by stock group lets you price thousands of part numbers by setting one figure per group instead of a price per part, and AutoParts billing in Takkada uses the stock groups you already keep in Tally. Bearings at 40%, oil seals at 55% and a company default of 30% for everything else can price a whole catalogue with three numbers. The app multiplies each part's last purchase cost by its group's markup: a bearing that cost ₹180.00 sells at ₹252.00, and an oil seal that cost ₹42.80 sells at ₹66.34, both before GST. A part that needs its own figure gets an item markup, which wins over the group's, and a part that should stay on its normal price can be excluded. The group list shows how many items each group holds, how many are set individually and how many are excluded, so you can see the shape of your pricing on one screen.

## Why the spreadsheet grows

A parts business with 3,000 part numbers across 40 stock groups usually has one big sheet: part, cost, markup, price. It works until costs move. Then someone sorts, filters, pastes the new costs and re-copies the price column, and the sheet the counter uses is a few weeks behind the one in the office.

Most of that sheet is the same rule repeated. Hundreds of bearing rows say "cost plus 40%". The rule belongs to the group, and only the exceptions belong to the rows.

## The groups come from Tally

Open Settings, Invoices, AutoParts billing. Below the Company default markup is the Stock groups list, built from the Tally stock groups your items sit in, with a search box. Each row reads like "412 items · 3 set individually · 1 excluded". Items with no group sit together under Ungrouped items.

A markup applies to the items whose own stock group it is. If Bearings has sub-groups in Tally, such as Ball Bearings and Taper Bearings, each sub-group is its own row and takes its own markup. Group names are matched without caring about capital letters or extra spaces.

## Setting a group's markup

Tap the pencil on Bearings and type 40 in the markup box. The dialog notes that items with their own markup keep it. Save, and the snackbar says the markup was saved for Bearings.

If you type a markup above 100% on a group of more than 100 items, the app asks "Set 120% on 412 items?" and warns that those items will sell at more than double their purchase cost. Choose Go back, or Yes, set 120%.

## Exceptions at the item level

Tap a group to open its items. For each part you can Set item markup, Remove item markup to fall back to the group's figure, or Exclude from AutoParts billing. Each row says where its figure comes from: "40% · from group", "25% · from item" or "30% · company default".

A pulley that cost ₹615.00 would sell at ₹861.00 under the group's 40%. Give it an item markup of 25% and it sells at ₹768.75. A part in a group with no markup of its own takes the company default: ₹180.00 at 30% is ₹234.00.

Retired items are hidden unless you tap Show retired.

## Who changes what

Only the business admin can change markups. Members allowed to see purchase costs can open the screens and read them. Everyone billing sees just the resulting selling price.

## When costs move

The markups stay put while the costs underneath them change with each purchase bill. Tap Price changes to see each recent purchase bill, which parts it moved and what that did to their selling prices at today's markup.

The full set of rules is in the [AutoParts billing guide](/blog/auto-parts-billing-software-for-tally), and the screens are on [cost-plus pricing for Tally](/autoparts-billing-tally).

## Frequently Asked Questions

**Q: Does a parent group's markup pass down to its sub-groups?**

A: No. A markup applies to items whose own stock group it is, so each sub-group takes its own figure or falls to the company default.

**Q: What wins when an item and its group both have a markup?**

A: The item's own markup. Then the group's, then the company default.

**Q: Can I keep a few parts on their old fixed price?**

A: Yes. Exclude them from AutoParts billing and they bill at their normal price.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) with your Tally stock group list and we will help you pick the first group markups.
