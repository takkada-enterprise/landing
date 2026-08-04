---
title: "E-Way Bill Auto Generation With E-Invoice: What the IRN Actually Carries Across"
slug: "e-way-bill-with-e-invoice-auto-population"
meta_title: "E-Way Bill Auto Generation With E-Invoice"
meta_description: "When an invoice already has an IRN, Part A of the e-way bill auto-populates from it. What carries across, what you still enter, and when validity starts."
primary_keyword: "e way bill auto generation with e invoice"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Compliance"
excerpt: "Distributors key the same consignment twice: once into the invoice, once into the e-way bill portal. When the invoice already carries an IRN, most of that second entry is already done for you, and the part that is left is the part the office never has at the right moment anyway."
---

E-way bill auto generation with e-invoice works at the portal level as auto-population of Part A from the IRN. When you report an invoice to the Invoice Registration Portal and receive an IRN, the IRP passes the document details across to the e-way bill system, so the consignor, consignee, document number and date, value, HSN and tax heads all arrive already filled on the e-way bill side. Part B, meaning the vehicle number, transporter and mode of transport, still has to be supplied before the e-way bill is valid for movement, and the validity clock under Rule 138(10) starts the moment Part B is first entered. The saving is a data-entry saving, and it is a large one: the consignment gets keyed once, at the invoice, and the second keying that used to happen separately on the e-way bill portal disappears along with the transcription errors it produced.

## Key Highlights

- An IRN populates Part A of the e-way bill with the invoice details; Part B, the vehicle and transporter, is supplied separately and the e-way bill is only valid for movement once it is in
- Validity under Rule 138(10) is counted from the first Part B entry, at one day per 200 km for regular cargo and one day per 20 km for over-dimensional cargo, plus a day for each part thereof
- Taxpayers with annual aggregate turnover of ₹10 crore and above cannot report a document to the IRP more than 30 days after its document date, effective 1 April 2025, and a separate 180-day limit applies on the e-way bill side
- EWB Portal 2.0 went live on 1 July 2025, and two-factor authentication has been mandatory for all taxpayers since 1 April 2025

## In This Article

- What e-way bill auto generation with e-invoice actually does
- What carries across from the IRN and what you still enter
- The 30-day IRP reporting limit and why it reaches the e-way bill
- EWB Portal 2.0, two-factor authentication and blocked generation
- Why Part B belongs at the loading point, not the desk
- Generating the e-way bill from the invoice in Takkada
- Frequently Asked Questions

## What E-Way Bill Auto Generation With E-Invoice Actually Does

The e-invoice system and the e-way bill system sit on the same national infrastructure and share the document reference, which is what makes the handoff possible. There are two shapes it takes in practice.

In the first, you send the transport details along with the invoice payload when you report it. The response comes back carrying both the IRN and the e-way bill number, because Part A was built from the invoice you just reported and Part B was in the same payload. This is the single round-trip, and it works when the vehicle is already standing at the bay when the invoice is raised.

In the second, you report the invoice on its own and get the IRN back. Later, on the e-way bill side, you pull the document by its IRN. Part A appears already filled from the reported invoice, and you add Part B. This is the shape that fits most distributors, because the invoice is usually raised before anybody knows which truck is taking it.

Either way, the identity of the consignment is fixed at the invoice. The e-way bill stops being a second, independently typed description of the same shipment and becomes a transport wrapper around a document the system already holds.

## What Carries Across From the IRN and What You Still Enter

The split is clean, and it is worth knowing exactly where the line falls before you set up the process.

| Comes across from the IRN | Still has to be supplied |
|---|---|
| Supplier GSTIN, name and dispatch address | Mode of transport (road, rail, air, ship) |
| Recipient GSTIN, name and ship-to address | Vehicle number, for road movement |
| Document type, number and date | Transporter ID, where a third party is carrying |
| Item lines with HSN and quantity | Transport document number and date, for rail, air or ship |
| Taxable value, tax heads and total invoice value | Approximate distance in kilometres |

Two consequences follow from that table. The first is that accuracy has to be enforced at the invoice, because whatever is wrong there is wrong on the e-way bill too. A wrong place of supply, a stale HSN on an item master, a ship-to address that belongs to the buyer's old branch: all of it flows through, and fixing it after the IRN exists is a far heavier job than catching it at entry. The checks worth running before you report are the same ones covered in [generating an e-invoice from the phone](/blog/e-invoice-on-phone-tally/).

The second is that everything left in the right-hand column is information the office does not reliably have. The vehicle number is known at the loading bay. The transporter is sometimes decided by who turns up. This is why the entry that remains after auto-population is the entry that keeps getting done late, or done with a placeholder.

## The 30-Day IRP Reporting Limit and Why It Reaches the E-Way Bill

From 1 April 2025, a taxpayer with annual aggregate turnover of ₹10 crore and above cannot report a document to the IRP more than 30 days after the document date. The portal refuses it. There is no appeal screen and no late-reporting fee.

For a business in that bracket, this quietly becomes an e-way bill problem as well. If the invoice never got an IRN, there is no IRN to populate Part A from, and the e-invoice itself is not a valid document, so the movement it was supposed to cover is exposed. The 30-day limit is therefore not only an e-invoicing deadline. It is the upstream gate on the whole auto-population path.

There is a second clock on the e-way bill side, live since 1 January 2025: an e-way bill can only be generated against a document dated within 180 days. Total extensions cannot carry an e-way bill beyond 360 days from its original generation date either. So a document has 30 days to become an IRN for the ₹10 crore-plus bracket, and 180 days to become an e-way bill for everyone.

The habits these rules break are familiar ones: the delivery challan converted into an invoice "next month", the stock transfer left unbilled while two branches argued about the rate, the month-end batch where forty documents get reported at once and three of them are dated forty days back. All of it was survivable before. Now the first two hit a wall and the third loses three invoices.

## EWB Portal 2.0, Two-Factor Authentication and Blocked Generation

EWB Portal 2.0 went live on 1 July 2025. For most distributors the operational change that mattered more arrived earlier: two-factor authentication became mandatory for all taxpayers from 1 April 2025.

That single change breaks a workflow almost every distributor was running: one e-way bill login, one password on a sticky note, and whoever needed a bill logged in and made one. With a second factor in the loop, the person who can complete the login is the person holding the registered mobile, usually the owner or the accountant, so the godown manager standing next to a loaded truck at 6 PM now has to call somebody. Sub-user accounts exist on the portal precisely so each person has their own credentials, and setting them up properly is the difference between two-factor authentication being a small login step and a daily bottleneck.

Rule 138E is the other blocker to know about. Where returns have not been filed for the prescribed periods, e-way bill generation gets blocked for that GSTIN, and it unblocks when the return is filed. Any distributor whose filing runs late should treat that as a dispatch risk and not only a compliance risk, because the trucks stop before the notice arrives.

## Why Part B Belongs at the Loading Point, Not the Desk

Because validity is counted from the first Part B entry, where and when Part B gets entered is a commercial decision and not just an administrative one.

Under Rule 138(10), an e-way bill is valid for one day per 200 km for regular cargo and one day per 20 km for over-dimensional cargo, with a day added for each part thereof. If the accountant enters Part B at 11 AM with the vehicle number the transporter said over the phone, and the truck actually leaves at 6 PM after loading, seven hours of that validity are gone before the goods move. On a run that needed one day of validity, that is most of the margin. An expiring e-way bill can be extended up to 8 hours before or 8 hours after expiry with a reason recorded, which is a genuine safety net for a breakdown and a poor substitute for starting the clock at the right time.

The other cost of desk entry is the placeholder vehicle number. It goes in so the paperwork looks complete, the real truck turns out to be a different one, and either somebody remembers to update Part B or the consignment travels against a bill that does not describe it.

Entering Part B where the truck is, at the moment it is loaded, fixes both problems at once. That is the whole argument for [generating the e-way bill from a phone](/blog/e-way-bill-on-phone/) rather than from a desktop the loading bay does not have. It is also the reason the rest of the mobile compliance stack matters for distributors who dispatch from more than one place, which is covered in [GST compliance on mobile](/blog/gst-compliance-on-mobile-for-distributors/).

## Generating the E-Way Bill From the Invoice in Takkada

In Takkada, the e-way bill starts from the invoice. Open the sales voucher on the phone and generate the e-way bill from it. Where that invoice already carries an e-invoice, Part A comes across from it, so the person at the loading bay is entering transport details and nothing else. Standalone e-way bills, for the movements that do not begin with an e-invoice, are generated the same way and come back with the QR on them. Cancellation runs from the same screen.

What comes back gets written into Tally against the same voucher, so nobody is retyping an e-way bill number at 9 PM off a WhatsApp screenshot, and the voucher in the books carries the same reference the driver is showing at the check-post. The mechanics of that write-back are described in [how the two-way Tally sync works](/blog/bidirectional-tally-sync-explained/). This is part of the Assurance plan and above, at ₹6,480 a year with GST extra.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Does the e-way bill generate automatically once I have an IRN?**

A: No. Reporting the invoice to the IRP populates Part A of the e-way bill with the document details, which is auto-population rather than a completed e-way bill. Part B, meaning the mode of transport, vehicle number, transporter and distance, still has to be supplied. The e-way bill is valid for movement only after Part B is in, and the validity period starts counting from that first Part B entry.

**Q: Can I get the IRN and the e-way bill number in a single submission?**

A: Yes, if the transport details are included in the payload at the time you report the invoice. The response then carries both the IRN and the e-way bill number, saving a round-trip. This only works when the vehicle and transporter are already known at the moment the invoice is raised. If they are not, report the invoice for the IRN and complete Part B later, which is the more common pattern for distributors.

**Q: E way bill kaise banaye Tally se?**

A: On a desktop, open the sales voucher in Tally Prime and send it for e-way bill generation using your stored portal credentials, entering the vehicle number, transporter and distance before submitting. On a phone with a Tally-connected app, the same voucher opens on the handset, Part A carries over when the invoice already has an e-invoice, and you add only the transport details. Either way the e-way bill number comes back against the same voucher.

**Q: What is the 30-day reporting limit on the IRP, and does it apply to me?**

A: With effect from 1 April 2025, taxpayers with annual aggregate turnover of ₹10 crore and above cannot report a document to the Invoice Registration Portal more than 30 days after the document date. Below that turnover the limit does not apply. If it applies to you, it also gates the e-way bill path, because a document that never received an IRN has no Part A to auto-populate from.

**Q: How long is an e-way bill valid, and when does the clock start?**

A: Under Rule 138(10), validity is one day for every 200 km for regular cargo and one day for every 20 km for over-dimensional cargo, with an additional day for each part thereof. The clock starts when Part B is first entered, not when Part A was filled. An expiring e-way bill can be extended up to 8 hours before or 8 hours after expiry, with a reason recorded.

**Q: What is the penalty for moving goods without a valid e-way bill?**

A: Section 129(1) of the CGST Act 2017, as substituted by section 117(i) of the Finance Act 2021 and brought into force on 1 January 2022 by Notification 39/2021-CT dated 21 December 2021, sets two levels. Where the owner of the goods comes forward, the penalty is 200% of the tax payable on those goods, and for exempted goods it is 2% of the value of the goods or ₹25,000, whichever is less. Where the owner does not come forward, it is 50% of the value of the goods or 200% of the tax payable, whichever is higher, and for exempted goods 5% of the value or ₹25,000, whichever is less.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
