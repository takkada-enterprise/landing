---
title: "How to Set Markup at Company, Group and Item Level"
meta_title: "How to Set Markup at Company, Group and Item Level"
slug: "how-to-set-markup-company-group-item"
meta_description: "How to set markup at company, group and item level in AutoParts billing: the screens, the order the app follows and how to check the price on a bill."
primary_keyword: "set markup at company, group and item level"
date: "2026-10-12"
author: "harsh"
category: "How-To"
excerpt: "A step-by-step walk through the AutoParts billing screens: company default, stock group markups, item overrides, exclusions, preferred suppliers and the second price level."
---

To set markup at company, group and item level in Takkada, open Settings, Invoices, AutoParts billing, type a Company default markup, then a markup on any stock group, then an override on any single item. The app uses the most specific one: the item's own markup first, then its group's, then the company default. Each markup is added on top of the part's last purchase cost, before GST, so a part that cost ₹250.24 sells at ₹325.31 with 30%, ₹350.34 with 40% and ₹362.85 with 45%. A 0% markup sells at cost, ₹250.24. Only the business admin can save markups; other members allowed to see purchase costs can open the screens and read them. The last step shows how to check the result on Stock Summary and on a bill before your counter starts using it. The AutoParts billing tile appears only when the add-on is switched on for your company.

## Step 1: Open AutoParts billing

Go to Settings, then Invoices. The tile reads AutoParts billing, "Selling price = purchase cost + markup %". The screen that opens has the company default at the top, the Stock groups list below it, and a Price changes button in the top bar.

## Step 2: Set the company default

Tap the edit button beside Company default markup. The note says it is used for every item whose group has no markup of its own. Type 30 and save. A part in a group without a markup now prices at cost plus 30%.

To remove it later, open the same dialog and choose Remove. Parts that relied on it then have no markup and bill at their normal price.

## Step 3: Set markups on stock groups

Find the group with the search box, tap its edit button and type the figure. The dialog notes that items with their own markup keep it. A group of 412 bearings at 40% is one entry.

If the figure is above 100% and the group holds more than 100 items, the app asks you to confirm before saving.

## Step 4: Override or exclude single items

Tap the group to open its items. Each item's menu offers Set item markup, Remove item markup, Exclude from AutoParts billing and Set preferred supplier. The row then shows the source, such as "45% · from item", or says the item is excluded and billed at the normal price.

Use an item markup for a part that sells on a different margin from its group. Use Exclude for a part that should keep its normal price.

## Step 5: Choose a preferred supplier where needed

If a part comes from more than one supplier, tap the truck button on its group, or Set preferred supplier on the item. Pick the supplier from the list of suppliers you buy from, or keep Latest purchase from any supplier. The cost then follows the preferred supplier's latest purchase and falls back to anyone's when that supplier has none. The app says costs will update in a few minutes.

## Step 6: Name and use the second level

Tap Level names to rename SP1 and SP2, for example Retail and Dealer, up to 24 characters. Each markup dialog has a box for each level; leave the second blank for no second-level price. Then open a party's edit sheet and choose its AutoParts price level.

## Step 7: Check the result

Open Stock Summary and find a part. Its card shows "Cost as of" with the purchase date and the cost, then "M1 40%" and the SP1 price, and the second level when it is set. A part that cannot be priced reads Never purchased or No usable cost.

Then start a sales invoice and add the part. With 40% on a cost of ₹250.24, the line comes in at ₹350.34 before GST. Ten pieces make ₹3,503.40, plus ₹315.31 CGST and ₹315.31 SGST at 18%, for ₹4,134.02. If this was only a check, leave the invoice without saving it, since a saved invoice goes to Tally.

The reasoning behind each rule is in the [AutoParts billing guide](/blog/auto-parts-billing-software-for-tally), and the module page is [cost-plus pricing for Tally](/autoparts-billing-tally).

## Frequently Asked Questions

**Q: Who can change the markups?**

A: Only the business admin. Other members allowed to see purchase costs can view them.

**Q: Can a markup be zero or negative?**

A: Zero is allowed and sells at cost. A negative figure is refused.

**Q: What happens if no markup applies to an item?**

A: Its row says there is no markup and the item is billed at the normal price, the way it was before AutoParts.

## Talk to us

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up the first company default and group markups with you on a call.
