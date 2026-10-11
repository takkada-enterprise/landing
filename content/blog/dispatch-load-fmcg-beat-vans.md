---
title: "Dispatch Load for FMCG Distributors Running Daily Beat Vans"
slug: "dispatch-load-fmcg-beat-vans"
meta_description: "Dispatch load for FMCG distributors: tick a beat's pending orders onto a van, print drop slips, key back short cartons, and bill what each shop took."
primary_keyword: "dispatch load for FMCG distributors"
date: "2026-10-11"
author: "harsh"
category: "Distribution"
excerpt: "Five beats, five vans, 150 retailers and orders that arrive till 8 PM. Here is how an FMCG distributor loads by beat and bills only what each shop took."
---

A dispatch load for FMCG distributors starts from the beat: in Takkada you tick a beat's pending sales orders on the Dispatch screen, add them to that beat's van, and print a loading sheet with a load list for the godown and a drop slip for each shop. When the van comes back, the godown keys back only the cartons that did not go, with a reason like Shop refused or No stock. Each shop's bill is then made from what it actually took, and whatever stayed behind remains pending for tomorrow's van. That matters on a beat where a retailer orders 12 cases of biscuits on Monday evening, takes 9 on Tuesday morning because his shelf is full, and pays in 7 days. The bill for 9 cases is the bill he signs for, and the 3 cases wait on his order instead of turning into a credit note.

## A normal Tuesday at an FMCG godown

Say you run five beats out of one godown with about 150 retailers, a salesman on each beat and a van for each. Orders come in till 8 PM. By 7 AM the godown wants to know what goes on which van, and by evening the office wants to bill. The pain sits in the middle: the boys who load the van work from a handwritten list, the van comes back with a few cases, and the office bills from the order because the list never reached it.

## Load by beat

Open Dispatch and stay on the Orders tab. If your parties are set up on beats, the list is grouped by beat and then by shop, and shops without a beat sit under No beat. Tick the Station Road heading and the orders under it are selected; untick the one shop that asked you to hold. Press Add to van.

An order already on another open van shows greyed with that van and its salesman, so the Fancy Bazaar van cannot pick up a Station Road order by mistake. Orders your salesmen book on the phone through [sales orders on mobile](/sales-order-on-mobile) arrive here the same way as orders typed in Tally.

## The sheet the boys load from

On the van page add the vehicle number, the driver and the salesman. Drag the drops into the order the van will run the beat. Then print the sheet. The Load list gives one row per item with the total quantity, a tick box and the drop numbers that item goes to, which is what the loading staff need at 7 AM. Drop slips give the driver one slip per shop, with Item, Sent and Received columns and lines for Short / returned and Received by. When everything is on, press Van is loaded.

## Keying back the evening

When the van returns, the person at the godown opens the van and presses Key back what went. The lines arrive pre-filled with what was ordered, so only the short ones need touching. Shop 4 took 9 of 12: lower it to 9, pick Shop refused. Shop 11 got nothing of one SKU because the godown ran out: set 0, pick No stock. Save what went out.

The van now lists Still owed from this load. Those cases stay pending on the shops' orders for a later van, and the reasons tell you which shortfalls were a buying problem and which were a selling one.

## Billing the beat

Someone with the Sales Invoice right presses Make invoices. Review invoices shows one invoice per shop at the keyed-back quantity. Untick a shop if its bill should wait, then create the invoices. They reach Tally when the sync runs on the office computer, and the retailer's bill now matches his signed drop slip.

For the full flow across trades, see [dispatch planning from Tally orders](/blog/dispatch-planning-from-tally-orders).

## Frequently Asked Questions

**Q: Do I need beats set up to use this?**

A: No. Without beats the picking list is grouped by shop. With beats, you can tick a whole beat at once.

**Q: Can two salesmen's vans end up with the same order?**

A: An order line already on an open van is greyed and tagged with that van, and it cannot be added to a second one.

**Q: Can I correct a key-back after saving it?**

A: Yes, while nothing on the van is billed you can key it back again. Once invoices exist, the quantities are locked.

**Q: Does the driver need the app?**

A: No. The driver works from the printed drop slips. The person at the godown keys back the marked-up sheet.

## Try it on tomorrow's beats

WhatsApp us at [https://wa.me/919435977777](https://wa.me/919435977777) and we will set up a van from your own pending orders.
