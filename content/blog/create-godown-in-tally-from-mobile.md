---
title: "Create and Manage Godowns in Tally from Your Phone"
slug: "create-godown-in-tally-from-mobile"
meta_title: "Create a Godown in Tally from Your Phone"
meta_description: "Create godown masters in Tally from mobile, with parent, alias and address. Naming rules that keep location reports readable, and what to set up first."
primary_keyword: "create godown in tally"
date: "2026-08-08"
updated: "2026-08-08"
author: "founder"
category: "How-To"
excerpt: "A new branch opens on Monday and the godown master gets created on Friday, because the person who can create it is in another town. Four days of stock lands somewhere it should not."
---

To create a godown in Tally you add a master under the company's inventory info, after switching on multiple godowns in the inventory features, and from that point every stock voucher records which location a movement belongs to. The master itself is small: a name, an optional parent godown, an alias, an address, and a setting for whether the location can hold inventory at all. What makes it worth thinking about is that the name you type here appears in every picker your counter staff will use in a hurry, and in every location report you read afterwards. Takkada lets you create and edit those godown masters from the phone, synced into your Tally, so a new branch or a transit location can be set up on the day it starts operating rather than on the day somebody reaches the desktop. This article covers the fields, the naming rules, and the order to set things up in.

## Key Highlights

- The godown master carries a name, a parent, aliases, an address and a flag for whether it can store inventory
- Godowns can be nested under a parent, which is how a warehouse with numbered sections stays readable in reports
- Creating the master on the day the location starts operating prevents stock landing in the default godown for a week

## In This Article

- Turning godowns on before you create any
- The fields on a godown master
- Naming rules that survive contact with a busy counter
- Creating and editing godowns from the phone
- Parent godowns and when to nest
- The setup order that avoids rework

## Turning Godowns On Before You Create Any

Multiple godowns are an optional inventory feature in Tally, so the master does not appear in the menus until the feature is switched on for the company. Turn it on first, then create locations.

Tally Prime also allows the term to be renamed from "Godown" to "Location", which is worth doing if your team says location out loud. The behaviour is identical, and matching the software's vocabulary to the warehouse's vocabulary removes a small friction from every conversation about it afterwards. What the master actually records is covered in [what a godown is in Tally](/blog/what-is-godown-in-tally/).

One decision to make at the same time. Tally ships with a default godown called Main Location. Either rename it to your primary warehouse and use it, or retire it deliberately and never post to it. Companies that leave it half-used end up with one physical place appearing as two in every report.

## The Fields on a Godown Master

The master is short, and each field earns its place.

| Field | What it does | Practical note |
|---|---|---|
| Name | Identifies the location everywhere | This is what appears in pickers and reports |
| Parent | Nests this godown under another | Leave as primary unless you genuinely have sections |
| Alias | A second name that also finds it | Useful when the team says a short form |
| Address | Where the location physically is | Helpful on dispatch paperwork and for new staff |
| Can store inventory | Whether stock may sit here | Off for a grouping-only parent node |

The last one confuses people the first time. A godown that exists only to group other godowns, such as a warehouse containing three floors, should not itself hold stock. Turning the flag off makes that structural intent explicit instead of leaving a tempting empty location in every picker.

## Naming Rules That Survive Contact with a Busy Counter

Every godown name is read under time pressure by somebody with a customer waiting. Three rules keep location reports readable a year later.

Use the name your staff says out loud. "Jorhat Branch" beats "GD-002" in every practical situation, because the operator picking from a dropdown is matching against what he calls the place, not against a code the accountant invented.

Keep the naming pattern consistent across locations. If one is "Guwahati Main" then the next is "Jorhat Branch" rather than "Branch, Jorhat". Sorted lists become scannable and the picker stops being a puzzle.

Name transit as transit. Goods on a truck need a home, and a location called "In Transit" is understood by everyone immediately. The reason it matters is covered in [stock transfer between godowns from mobile](/blog/stock-transfer-between-godowns-tally-mobile/).

## Creating and Editing Godowns from the Phone

Takkada shows the godown masters already defined in your Tally and lets you add or edit them from the phone, with the same fields the desktop master carries: name, parent, aliases, address, and whether the location can store inventory. The master syncs into Tally, so the desktop sees a normal godown rather than something maintained outside the books.

The practical value is timing rather than convenience. A new branch starts operating on a Monday. If the master is created that morning, the first day's receipts land in the right place. If it waits until somebody reaches the office desktop on Friday, four days of stock has gone into whatever location the operator picked instead, and correcting it means finding and editing those vouchers afterwards.

The same applies to a location that turns out to be needed mid-season, which is usually a transit godown or a temporary storage point taken during a peak.

## Parent Godowns and When to Nest

Tally allows a godown to sit under a parent, and the feature is genuinely useful in exactly one situation: one physical site with sub-locations you need to distinguish.

A warehouse with three floors, a yard with covered and open storage, a branch with a shop counter and a back store. Create the site as a parent that cannot store inventory, and the sub-locations under it. Reports then roll up to the site while still letting you see the sections.

Do not nest for anything else. Regions, sales territories and business verticals are not places, and modelling them as godown hierarchy produces a structure that fights you at every entry screen. If the question is "which branch", one flat godown per branch is the answer. The multi-branch picture is in [managing multiple branches in Tally with godowns](/blog/manage-multiple-branches-tally-godowns/).

## The Setup Order That Avoids Rework

Doing these five things in order takes an afternoon and saves a physical count later.

Switch on multiple godowns for the company. Create one godown per real place, including transit, with names your team already uses. Decide what happens to Main Location and act on it the same day. Enter opening stock location-wise rather than as a single lump, because a lump opening balance makes every location figure wrong until your first count. Then tell the counter and warehouse team what each godown means, on the day the godowns appear, because the field will otherwise be filled by whatever was used last.

After that, the discipline that keeps the numbers honest is on the voucher side: every outward movement carrying a location, invoices included. That is covered in [godown on sales invoices and delivery challans](/blog/godown-on-sales-invoice-delivery-challan/).

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: How do I create a godown in Tally?**

A: Switch on multiple godowns in the company's inventory features, then create the master under inventory info. Give it a name, choose a parent if it sits inside a larger site, and add an alias and address if useful. Once created, stock vouchers will ask which godown each movement belongs to, and godown-wise reports become available.

**Q: Can I create a godown without opening Tally on the desktop?**

A: Yes. Takkada lets you create and edit godown masters from the phone with the same fields the desktop master carries, and the master syncs into your Tally. This matters when a branch or a temporary storage point starts operating before anyone can reach the office machine, because stock recorded in the meantime would otherwise land in the wrong location.

**Q: What is a parent godown used for?**

A: Nesting one location inside another, which is worth doing when a single site has sub-locations such as floors or a shop counter plus a back store. The parent usually should not store inventory itself, so reports roll up to the site while still separating the sections. Regions and sales territories are not places and should not be modelled this way.

**Q: Should I keep Tally's Main Location godown?**

A: Either rename it to your primary warehouse and use it as a real location, or stop posting to it entirely. The failure to avoid is leaving it half-used alongside a warehouse godown you created, because the same physical place then appears twice in every report and the quantities split between them for no reason anybody can explain later.

**Q: Can a godown be marked so its stock is not counted in inventory?**

A: Yes. The master carries a setting for whether the location can store inventory, which is how a grouping-only parent node is handled. Tally also supports excluding a location's stock from the company's valuation, used for third-party or job-work premises. Most distributors need neither beyond the parent case.

**Q: How many godowns should a distributor create?**

A: One per place where stock actually sits, plus one for transit. That usually means the main warehouse, each branch, and In Transit. Resist creating locations for anything that is not physical, because every extra entry in the picker slows down the person recording a voucher and increases the chance of the wrong location being chosen.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
