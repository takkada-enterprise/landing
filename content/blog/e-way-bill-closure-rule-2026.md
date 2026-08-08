---
title: "E Way Bill Closure: What Is Paused and What to Get Ready For"
slug: "e-way-bill-closure-rule-2026"
meta_title: "E Way Bill Closure: Paused Until Further Notice"
meta_description: "GSTN Advisory No. 668 dated 29 July 2026 kept the e-way bill closure facility in abeyance. Nothing changed on 1 August. Here is the real status."
primary_keyword: "e way bill closure"
date: "2026-08-04"
updated: "2026-08-08"
author: "founder"
category: "Compliance"
excerpt: "Half the tax sites on the internet still say the e-way bill closure facility went live on 1 August 2026. It did not. GSTN put the whole set of enhancements in abeyance four days earlier, and this is what a distributor actually needs to know."
---

E way bill closure is not in force today. GSTN Advisory No. 668, dated 29 July 2026, put the proposed e-way bill enhancements in abeyance until further notice, so nothing changed on 1 August 2026 and nothing in your dispatch or billing routine has to change right now. This is worth saying plainly, because a large number of tax and software sites still carry the June headline and tell distributors the facility went live on 1 August, which is wrong. When the facility does eventually land, closure will be voluntary: the supplier, the recipient, the transporter or the driver may close an e-way bill after the goods are delivered, on the day of delivery or the immediately following day. The mandatory Ship-To GSTIN capture announced alongside it is paused under the same advisory. This article covers the current status, what the facility will require when it arrives, why it was held back, and how to check for yourself whether it has been revived.

## Key Highlights

- GSTN Advisory No. 668, dated 29 July 2026, kept the proposed e-way bill enhancements in abeyance until further notice, and told stakeholders no changes are required in production systems
- They had been scheduled for 1 August 2026, announced through advisories dated 9 June 2026 and 17 June 2026 with FAQs on 2 July 2026. That schedule no longer holds
- Two things were paused together: the voluntary closure facility, and the mandatory Ship-To GSTIN capture in Bill-To / Ship-To transactions
- Everything else about e-way bills is unchanged, including the 180-day document rule and the 360-day extension cap, both live since 1 January 2025

## In This Article

- Current status of e way bill closure
- What the closure facility will require when it lands
- The Ship-To GSTIN change that was paused alongside it
- Why GSTN held it back
- The e-way bill rules that are live today
- What to do in the meantime, and how to spot a revival
- Frequently Asked Questions

## Current Status of E Way Bill Closure

**Status as of 4 August 2026: paused.**

GSTN Advisory No. 668, dated 29 July 2026, placed the proposed e-way bill enhancements in abeyance until further notice. This covers both the voluntary closure facility and the mandatory Ship-To GSTIN capture, which had been scheduled to take effect on 1 August 2026 under the earlier advisories dated 9 June 2026 and 17 June 2026. GSTN's message to stakeholders was that no changes are required in production systems and that fresh instructions should be awaited. No replacement date has been published as of 4 August 2026.

That paragraph is the whole answer. The rest of this article is preparation rather than obligation.

The confusion is easy to explain. The June advisories were widely written up, the 1 August date got into headlines, and the abeyance notice landed on 29 July, three days before the date everyone had published. Those June articles still rank, and still tell a distributor his e-way bills now need a closing action. They do not.

## What the Closure Facility Will Require When It Lands

Today an e-way bill simply expires. Its validity period runs out and there is no positive act saying the goods arrived. Closure adds that act, and per the 9 June 2026 and 17 June 2026 advisories it has three characteristics worth remembering:

| Design point | What the advisories say |
|---|---|
| Whether it is compulsory | Voluntary, a facility rather than a filing obligation |
| Who can close it | The supplier, the recipient, the transporter or the driver |
| When it can be done | On the day of delivery, or the immediately following day |

The voluntary part is what decides how much work this is for you. A distributor who never closes a single e-way bill would not thereby be in default, and whoever does close them, most likely the transporter, creates a delivery signal the supplier and the recipient can both see.

The narrow window is the operational catch. Same day or next day is not much room when a truck reaches a retailer's shutter at 8 PM and the delivery challan comes back to the office two days later. A reliable closure record needs the person at the delivery end doing it from a phone rather than the office doing it from a desk on Monday. That is the same constraint that already applies to generating an [e-way bill from the phone](/e-way-bill-from-phone/).

## The Ship-To GSTIN Change That Was Paused Alongside It

The second half of the paused package is a data-quality change rather than a workflow change. Under the June 2026 advisories, the Ship-To GSTIN was to become a mandatory field in applicable Bill-To / Ship-To transactions, with "URP" used where the consignee is unregistered.

For a distributor this is a master-data question. Bill-To / Ship-To is routine in this trade: the bill goes to a head office or a buying group, the goods go to a branch, a godown, or a site. If your Tally masters carry the ship-to address as free text and no GSTIN, that field gets filled at the point of generation, under time pressure, at a loading bay. That is where bad data gets typed.

Because the change is paused, there is no deadline for cleaning this up and no penalty for doing it early. It is the one preparation item here that pays even if the rule never comes back, since correct consignee GSTINs on branch-delivery parties make [e-invoice generation](/blog/e-invoice-on-phone-tally/) cleaner too.

## Why GSTN Held It Back

The advisory keeps its reasoning short. It states that the enhancements are in abeyance until further notice, that no changes are required in production, and that fresh instructions will follow. It does not publish a diagnosis, so anyone telling you precisely why it was pulled is filling in a blank.

What can be said honestly is the shape of it. These were API-level changes affecting every GST Suvidha Provider, every ERP and every billing product touching the e-way bill system, announced in June for an August start. A pause three days before go-live, with an instruction not to alter production systems, reads as an ecosystem readiness problem rather than a change of policy direction. The design was published, the FAQs followed on 2 July 2026, and none of it was withdrawn. A facility this fully specified tends to come back close to the form it was published in.

## The E-Way Bill Rules That Are Live Today

While the closure facility waits, these are in force and are the ones that actually catch people out:

| Rule | Effective from | What it means |
|---|---|---|
| 180-day document rule | 1 January 2025, per the GSTN advisory dated 17 December 2024 | An e-way bill can only be generated against a document dated within the last 180 days |
| 360-day extension cap | 1 January 2025 | Extensions cannot carry an e-way bill beyond 360 days from its original generation date |
| Validity, Rule 138(10) | In force | One day per 200 km for regular cargo, one day per 20 km for over-dimensional cargo, plus a day for each part thereof. The clock starts when Part B vehicle details are first entered |
| Extension window | In force | Extendable up to 8 hours before or 8 hours after expiry, with a reason |
| Threshold | In force | ₹50,000 consignment value inter-state. Intra-state thresholds vary by state, so check your own state's notification |
| 2FA on the e-way bill system | 1 April 2025 | All taxpayers |
| EWB Portal 2.0 | 1 July 2025 | Live |
| 30-day reporting limit on the IRP | 1 April 2025 | Taxpayers with AATO of ₹10cr and above |
| Rule 138E blocking | In force | Generation blocked for taxpayers with unfiled returns |

On penalties, Section 129(1) of the CGST Act 2017, as substituted by section 117(i) of the Finance Act 2021 and in force from 1 January 2022 by Notification 39/2021-CT dated 21 December 2021, sets two cases. Under clause (a), where the owner of the goods comes forward, the penalty equals 200% of the tax payable on those goods, or for exempted goods 2% of the value or ₹25,000, whichever is less. Under clause (b), where the owner does not come forward, it is 50% of the value of the goods or 200% of the tax payable, whichever is higher, or for exempted goods 5% of the value or ₹25,000, whichever is less. Many sites still describe tax as payable on top of these amounts. The 2021 substitution removed that wording.

## What to Do in the Meantime, and How to Spot a Revival

Operationally, nothing. There is no configuration to change, no field to start filling, and no process to add. Any vendor telling you otherwise as of 4 August 2026 is working off the June advisories.

The readiness items are worth a slow afternoon rather than a project:

- Fill in the consignee GSTIN on every party you regularly bill to one address and ship to another. This pays off regardless of what happens to the rule.
- Decide now who would perform the closure: the driver, the transporter, or your own delivery staff. Same day or next day means someone standing at the delivery, on a phone.
- Confirm your billing software gets its e-way bill capability from a provider that updates when the API version does, so a revival is a version bump on their side rather than a project on yours.
- Keep generating from the phone where the movement starts. Whatever closure eventually looks like, it belongs on the same device, and that is already how the rest of [GST compliance on mobile](/blog/gst-compliance-on-mobile-for-distributors/) has been going.

To check whether it has been revived, go to the source rather than to a search result. Advisories are published in the News and Updates section of the GST portal and on the e-way bill system's own site, each carrying a number and a date. A revival will arrive as a fresh advisory naming a fresh effective date, exactly as Advisory No. 668 named the abeyance. Two other reliable signals: your GSP or software provider will circulate an updated API specification, and the e-way bill FAQ page will start describing closure in the present tense. Check the date on anything that says "from 1 August 2026", because that sentence was true when it was written and stopped being true on 29 July 2026.

Takkada's e-way bill screens today cover what is actually live: generation from an invoice, Part A auto-populated when the invoice already carries an e-invoice, standalone e-way bills with QR, and the cancellation flow, each written back into Tally against the same voucher. Closure is not an available action anywhere at the moment, on the GST system or in any app, because the facility is switched off.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Is the e-way bill closure facility live right now?**

A: No. GSTN Advisory No. 668, dated 29 July 2026, placed the proposed e-way bill enhancements in abeyance until further notice. They had been scheduled for 1 August 2026, but nothing took effect on that date. GSTN told stakeholders that no changes are required in production systems and that fresh instructions should be awaited. As of 4 August 2026 no replacement date has been announced.

**Q: Will closing an e-way bill be compulsory when it starts?**

A: As designed in the advisories dated 9 June 2026 and 17 June 2026, closure is voluntary. It records that a delivery has been completed rather than creating a filing obligation. A supplier, a recipient, a transporter or a driver may close an e-way bill, on the day of delivery or the immediately following day. Since the facility is in abeyance, the final form could differ from what was published.

**Q: E way bill kaise banaye Tally se?**

A: You generate it against the invoice rather than as a separate exercise. Once the sales voucher is saved in Tally, Part A carries the party, item and value data from that voucher, and Part B carries the vehicle number and transporter details. With Takkada the same thing happens from a phone, and where the invoice already has an e-invoice against it, Part A is populated automatically so only the vehicle details need entering. The e-way bill number is written back into Tally against that same voucher.

**Q: What is the Ship-To GSTIN change that was announced with it?**

A: Under the June 2026 advisories, the Ship-To GSTIN was to become a mandatory field in applicable Bill-To / Ship-To transactions, with URP used where the consignee is unregistered. It was paused by the same Advisory No. 668 dated 29 July 2026. Filling consignee GSTINs on branch-delivery parties is still worth doing, because the same data improves e-invoice generation today.

**Q: How will I know if the rule has been revived?**

A: Watch the News and Updates section of the GST portal and the e-way bill system's own advisory page. Each advisory carries a number and a date, and a revival will be a fresh advisory naming a fresh effective date, as Advisory No. 668 announced the abeyance. Your software provider or GSP will also circulate an updated API specification. Be careful with articles saying the change applies from 1 August 2026, because most were written in June and never updated.

**Q: What e-way bill rules should I be worried about instead?**

A: The ones already in force. Since 1 January 2025, an e-way bill can only be generated against a document dated within 180 days, and extensions cannot carry a bill beyond 360 days from its original generation date. Validity under Rule 138(10) runs one day per 200 km for regular cargo, with the clock starting when Part B vehicle details are entered. An expiring bill can be extended up to 8 hours before or after expiry, and generation is blocked under Rule 138E if returns are unfiled.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
