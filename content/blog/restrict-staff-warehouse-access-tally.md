---
title: "Restrict Staff to Their Own Warehouse in Tally"
slug: "restrict-staff-warehouse-access-tally"
meta_title: "Godown Wise Access Control in Tally: Restrict Staff"
meta_description: "Godown wise access control for Tally data on mobile. Limit a storekeeper to his own godowns for stock reports, transfers and challans, and what it excludes."
primary_keyword: "godown wise access control tally"
date: "2026-08-08"
updated: "2026-08-08"
author: "founder"
category: "Tally Mobile"
excerpt: "The Jorhat storekeeper should move Jorhat stock. Nobody plans for him to issue a transfer out of the main warehouse; it happens because a screen let him."
---

Godown wise access control in Tally data means a team member works only inside the locations you assign him, and on mobile that is a switch you turn on per member and a list of godowns you tick. In Takkada the scope covers godown stock reports, stock journals and delivery challans: what a member can see and what he can create. A storekeeper assigned to two branch godowns sees those two locations in his pickers, and a line against any other location is refused on the server rather than merely hidden in his app. The scope is deliberately narrow and worth understanding before you plan roles around it. It governs stock movement and stock visibility. It does not partition who can see which sales invoices, and it is not a branch-wise profit and loss control. This article covers how to set it up, what it changes, and where its boundary sits.

## Key Highlights

- The restriction is an explicit switch per member, and ticking every godown is a different choice from leaving the restriction off
- Scope covers godown stock reports, stock journals and delivery challans, both viewing and creating
- Document lines recorded with no godown become invisible to a restricted member, which is why the setup screen counts them before you save

## In This Article

- What the restriction actually controls
- Setting it up for one member
- Why blank godown lines are counted before you save
- Godowns added later, and same-name godowns
- What this control does not do
- Choosing the right control for the role

## What the Restriction Actually Controls

A restricted member is confined to a named list of godowns. Inside Takkada that has two effects at once.

He sees only those locations in the godown stock view, so the branch storekeeper's stock screen is his branch rather than the whole company. And he can only create stock movements involving those locations: a stock journal line or a delivery challan line pointing at a godown outside his list is rejected. The rejection happens on the server, not in the interface, which is the part that matters. A control that only hides a dropdown option is a suggestion. This one refuses the write.

That combination is what a warehouse role actually needs. The person handling goods at one location should be able to do his whole job for that location and nothing at another.

The locations themselves come from your Tally, as explained in [what a godown is in Tally](/blog/what-is-godown-in-tally/).

## Setting It Up for One Member

The setup lives on the member's permissions screen and takes about a minute.

Open the member, find the godown scope section, and turn on "restrict this member to selected godowns". Then tick the locations he is responsible for. The section shows how many of your godowns are assigned, so the count is visible while you decide.

Two properties of the design are worth knowing, because they were chosen deliberately.

| Behaviour | What it means |
|---|---|
| The restriction is an explicit switch | Ticking godowns while the switch is off changes nothing; the member stays unrestricted |
| Restricted with every godown ticked is a real state | It means "all locations as they exist today", and new ones do not join automatically |

The first exists because the opposite semantic caused a real problem elsewhere in the product: an admin selecting everything to mean "give him all of it" and instead locking the member down, because selecting anything at all implied restriction. Here the switch says what you meant, and the ticks say where.

## Why Blank Godown Lines Are Counted Before You Save

When you turn the restriction on, the screen warns you about two things it can see in your data, and both warnings are there because they surprise people otherwise.

The first is document lines with no godown recorded at all. Those lines belong to no location, so a member restricted to specific locations cannot see them. The screen counts them and tells you the number before you save, because a company that has been recording challans without locations for two years is about to make a large amount of history invisible to a member who needs it. The fix is upstream: stamp locations on outward documents, covered in [godown on sales invoices and delivery challans](/blog/godown-on-sales-invoice-delivery-challan/).

The second is the zero-selection case. Restriction on with nothing ticked is a valid instruction, and it means the member sees no godown data whatever. The screen asks you to confirm that explicitly rather than saving a member into a blank state by accident.

## Godowns Added Later, and Same-Name Godowns

Two edge cases decide whether this control ages well in your business.

New godowns do not join a restricted member's list on their own. Open a third branch, and a member restricted to the first two will not see it until you assign it. This is the safe default, and it is also a maintenance item: the day a location is created is the day to revisit who should reach it. Creating locations from the phone is covered in [creating and managing godowns in Tally from mobile](/blog/create-godown-in-tally-from-mobile/).

Godowns that share a name are treated as the same access grant. If two locations in your Tally are both called "Store", assigning one gives access to the other. The setup screen flags this when it finds it. The real fix is on the master side, because two locations with one name will confuse your reports long before they confuse your permissions.

## What This Control Does Not Do

Being precise here is more useful than being impressive, because a permission you believe in wrongly is worse than one you do not have.

Godown wise access control governs stock movements and godown stock visibility. It does not restrict sales invoices, sales orders or quotations by location. A member restricted to one warehouse still sees the company's invoices as his other permissions allow, so this is not a way to stop a branch team from seeing another branch's sales.

It is also not a cost-centre or branch-wise profit control. There is no branch P&L partition behind it, and general reports such as the sales register do not gain a location filter from it.

If your requirement is limiting a field salesman to his own parties, orders and collections, that is a different control, covered in [restricting salesman access in Tally](/blog/restrict-salesman-access-tally/).

## Choosing the Right Control for the Role

Match the control to what the person actually touches, and the setup stays simple.

A warehouse or dispatch person handles goods at one location. Restrict him to that godown and he gets his stock view, his transfers and his challans, with nothing at other locations reachable. That is the case this control was built for.

A branch accountant or manager who bills, collects and reports needs more than a stock scope, and his access is set through the rest of the permission model rather than through godowns. A field salesman needs party and order scoping instead.

An owner or admin stays unrestricted, because the value of the multi-branch view is seeing every location at once. That view is covered in [the godown-wise stock report on mobile](/blog/godown-wise-stock-report-tally-mobile/) and the full setup in [managing multiple branches in Tally with godowns](/blog/manage-multiple-branches-tally-godowns/).

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Does Tally have godown wise access control built in?**

A: Tally's own security controls are organised around users, voucher types and report access on the desktop installation rather than around per-godown scoping of a mobile team. Takkada adds a godown scope on top of your Tally data, so a team member is limited to named locations for godown stock reports, stock journals and delivery challans, with out-of-scope lines rejected on the server.

**Q: What exactly does a restricted member lose access to?**

A: Godown stock for locations outside his list, and the ability to create stock journal or delivery challan lines against those locations. He keeps whatever else his permissions allow. The restriction is about where stock moves and which locations he can see stock for, so plan roles around movement rather than around who may view which documents.

**Q: Can I stop a branch employee from seeing another branch's sales invoices?**

A: Not through godown scope. That control covers stock movements and godown stock visibility, so a member restricted to one warehouse still sees invoices as his other permissions allow. If invoice-level separation is what you need, treat it as a separate requirement rather than assuming warehouse scoping delivers it.

**Q: What happens to old entries that were saved without a godown?**

A: They become invisible to a restricted member, because a line with no location cannot fall inside a list of locations. The setup screen counts those lines and shows the number before you save, so the decision is made with the size of the gap in front of you. Recording locations on outward documents from now on stops the gap growing.

**Q: If I add a new godown, do restricted members get it automatically?**

A: No. A member restricted to selected godowns keeps exactly the list you assigned, and a location created later stays invisible to him until you add it. Treat assignment as part of opening a new location, alongside creating the master and telling the counter team what the location means.

**Q: Is turning the restriction on with all godowns ticked the same as leaving it off?**

A: No, and the difference matters over time. Restriction off means the member always has every location, including ones created next year. Restriction on with everything ticked means the locations that exist today, and a new location will not reach him until you assign it. Choose deliberately rather than by habit.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
