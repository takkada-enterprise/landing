---
title: "How to Restrict Salesman Access in Tally Without Locking Him Out of His Job"
slug: "restrict-salesman-access-tally"
meta_title: "Restrict Salesman Access in Tally: What Owners Can Hide"
meta_description: "Tally access is close to all or nothing. What its security levels can and cannot hide from a field salesman, and the permission model that fixes it."
primary_keyword: "restrict salesman access in tally"
date: "2026-08-04"
updated: "2026-08-04"
author: "founder"
category: "Field Sales"
excerpt: "Most owners have not given their salesmen access to the books because of one uncomfortable fact: handing a field man the company data hands him every party's balance, every purchase rate, and the margin on every item. The reluctance is rational, and the fix is permission that scopes party by party instead of report by report."
---

To restrict salesman access in Tally, you switch on security control for the company, create a security level for the field team, and then disallow the reports and voucher types you do not want opened. That takes an owner some distance, and it is usually where he stops, because the control is granular by report rather than by party. Tally will happily withhold the Purchase Register from a level. What it will not do is show a salesman the outstanding of the forty retailers on his beat while hiding the other two hundred and sixty, because a right attaches to a report and not to a row inside it. So the owner ends up choosing between the whole ledger and nothing, and most choose nothing. The workable answer is a permission layer that scopes by ledger, ledger group, stock group, register and screen, so the salesman opens his own parties and nothing sitting behind them.

## Key Highlights

- Tally security levels grant or deny rights by report and voucher type, so there is no built-in way to give one salesman a subset of parties from the same debtors ledger
- The four things owners want hidden are purchase rates and margin, other salesmen's parties, the full party list, and the ability to alter or delete a voucher after it is posted
- A field salesman needs four things to work without calling the office: his own parties' outstanding bill by bill, order taking, receipt logging, and the ability to send a statement
- A permission model that restricts screens, ledgers and ledger groups, stock groups and registers separates those two lists cleanly, which report-level rights cannot

## In This Article

- How to restrict salesman access in Tally today
- The four things an owner actually wants hidden
- What the salesman genuinely needs to do his job
- Where report-level rights run out
- The shape of a permission model that separates the two lists
- Setting it up without stalling the field team
- Frequently Asked Questions

## How to Restrict Salesman Access in Tally Today

Tally's own answer is security control, and it is a real answer, built long before anyone put a distribution salesman on a smartphone. You enable it during company alteration, which creates an administrator user and unlocks the security level screen. Two levels ship predefined, Owner and Data Entry, and any level you create is built on top of one of those. Against a level you then set rights: the types of access allowed or disallowed, applied to reports and to voucher types.

That gives you a handful of controls that genuinely matter. You can disallow whole reports so the level never opens them. You can hold back alteration rights on a voucher type, so a user creates entries but cannot go back and change them. You can set the days allowed for back-dated vouchers to zero, and set a cut-off date before which nothing can be touched. Users are then attached to levels with their own passwords, per company.

For an accountant at a desk in the office, this is proportionate and it works. The design assumption is that the person being restricted is inside the building, on the Tally machine, doing accounting work. A salesman standing in a retailer's shop in another district at 11 AM is a different problem.

## The Four Things an Owner Actually Wants Hidden

Ask an owner why the field team has no access and the reasons come out in a fixed order. Each one has a specific screen behind it.

| What he wants hidden | Why it matters | Where it leaks in the books |
|---|---|---|
| Purchase rates and margin | The salesman learns exactly what the firm makes on every carton, and so does his next employer | Purchase register, purchase vouchers, stock valuation, item cost |
| Other salesmen's parties | One man sees another's beat, his incentive base, and which of his retailers is soft on payment | Any debtors report that lists all parties |
| The full party list | The customer list is the business. A printed outstanding statement is a competitor's prospecting sheet | Bills receivable, outstanding statements, ledger index |
| Editing or deleting a voucher | A rate changed after the fact, a receipt backdated, an invoice quietly removed | Alteration mode on any voucher type |

The first and the third are the ones that stop the conversation. An owner will often accept the risk on order entry and even on receipts, because those are visible and auditable. He will not accept a salesman who resigns on a Friday walking out with the margin structure and three hundred party balances.

The fourth is different in character. It concerns the books staying true rather than secrecy, and it is the one control Tally handles cleanly, through alteration rights and the back-dated voucher settings.

## What the Salesman Genuinely Needs to Do His Job

Set the owner's fears aside and look at the other list. A distribution salesman on a beat needs a surprisingly small amount of the company's data, and almost none of it is sensitive.

He needs the outstanding of the parties he is visiting today, bill by bill, with the due date on each bill rather than a single lump figure. A retailer who is told he owes ₹2,84,000 argues. A retailer who is shown four invoice numbers with dates and days overdue pays one of them. That is the same discipline that makes a [partywise outstanding statement](/blog/partywise-outstanding-statement-tally/) usable in the first place.

He needs to take an order at the counter and have it reach the office as a sales order rather than a WhatsApp message that gets retyped in the evening. He needs to log a receipt when the retailer pays, whether that is cash, a cheque, or a UPI payment against specific bills. And he needs to be able to send a party its statement, which is what the retailer asks for on almost every visit, because [sharing a ledger statement on WhatsApp](/blog/how-to-share-ledger-statement-whatsapp-tally/) settles a dispute in a way an argument at the counter never does.

Notice what is absent from that list. There is no purchase data in it, no stock valuation, no other salesman's parties, no balance sheet or bank ledger. The [field order collection workflow](/blog/field-order-collection-app-tally/) lives inside four narrow surfaces, and the owner's four fears sit outside all of them.

## Where Report-Level Rights Run Out

If the two lists barely touch, the obvious question is why an owner cannot simply switch off the reports in the first list and leave the second one on. Three things get in the way.

The first is that party scoping does not exist. Every retailer sits under Sundry Debtors. A right that opens a debtors report opens it for all of them, so there is no way to give Ramesh his forty parties and Suresh his fifty from the same group. Splitting the group into "Debtors North" and "Debtors South" is the workaround people try, and it survives until a party is transferred, a new man joins, or two salesmen share a large retailer.

The second is that cost travels further than the purchase register. Disallowing purchase reports is easy. Item valuation still surfaces wherever stock is valued, so removing every trace of margin usually means switching off stock reporting entirely, which takes away the item availability the salesman actually came for.

The third is that a desktop control does not follow the data into the field. A right stops a screen from opening on the Tally machine, and does nothing about the Excel export somebody mailed last month or the printed ageing report in the car. Security control is doing what it was built to do, but the practical shape of a field team in 2026 is thirty Android phones in thirty different towns, which is a different surface to defend.

## The Shape of a Permission Model That Separates the Two Lists

What the problem needs is permission that attaches to data rather than to reports, set per team member. Four axes cover almost every case an Indian distributor runs into.

| Axis | What it controls | The salesman case |
|---|---|---|
| Screens | Which parts of the app open at all | Outstanding, orders, receipts on. Reports, purchase, bank off |
| Ledgers and ledger groups | Which ledgers are visible and which groups never load | His own parties only. Purchase accounts, bank and expenses invisible |
| Stock groups | Which item groups he can see and sell from | The categories on his beat, without valuation |
| Registers | Which registers he can open | Sales register yes, purchase register no |

Two properties make this hold up in practice. Restriction has to be per member rather than per role, because a real distributor has a senior man covering three districts and a new joiner on trial in one town, and one shared "salesman" definition will always be wrong for one of them. And it has to be additive from a closed default, so a member starts with nothing open and the owner grants what the job needs.

Layer the create-without-alter rule on top and the picture is complete. The salesman posts an order and logs a receipt, cannot go back into yesterday's entry to change the rate, and cannot delete it. The office keeps the correction rights it always had.

A second benefit arrives without being asked for. A [salesman-wise sales report](/blog/salesman-wise-sales-report-tally/) becomes trustworthy, because each member's activity is attributable rather than pooled under one shared login that four people know the password to.

## Setting It Up Without Stalling the Field Team

Takkada's team access controls run on exactly those axes: which screens open for a member, which ledgers and ledger groups he can see, which stock groups, and which registers. A salesman can be limited to his own parties, so opening the outstanding screen shows his beat and no one else's, and the reports carrying purchase cost and margin simply do not appear in his app.

Underneath, Tally stays the book of record and stays exactly as it is. Orders sync in as sales orders so nobody retypes them, receipts post back against the specific bills, and the statement he sends comes from the same data the office is looking at. If you are weighing what changes on the Tally side first, [connecting an app to Tally safely](/blog/is-it-safe-to-connect-app-to-tally/) covers that ground.

The practical sequence is short. Decide the four things you will not show, decide the four things each man must be able to do, then open the second list one member at a time and leave the first closed. Most owners find the field team wanted far less than they feared, and that nobody got access for five years because Tally's controls do not bend at the party level, which is a design choice rather than a defect. The rest of what a field team can do once access is scoped sits in the wider piece on the [salesman app for Tally](/blog/salesman-app-tally-india/).

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch.

## Frequently Asked Questions

**Q: Can I give a salesman access to only some parties in Tally?**

A: Not through Tally's own security levels. Rights are granted against reports and voucher types, so a level that can open a debtors report opens it for every party under Sundry Debtors. Owners sometimes split the group into region-wise sub-groups as a workaround, but it breaks as soon as a party moves between beats or two salesmen share a large retailer. Party-level scoping needs a permission layer that sits above Tally and filters by ledger.

**Q: How do I hide purchase rates from a user in Tally?**

A: Disallow the purchase voucher types and the purchase register for that security level, which removes the direct route. The harder part is that item cost surfaces wherever stock is valued, so a level that can still open stock reports can often infer margin. Closing every valuation report works, but it usually also removes the stock availability a field salesman needs, which is why owners end up giving nothing at all.

**Q: Can I stop a salesman from deleting or editing a voucher in Tally?**

A: Yes, and this is the one Tally handles cleanly. Deletion happens inside alteration mode, so a security level that has create rights on a voucher type but no alteration rights can post an entry and cannot remove or change it afterwards. Setting days allowed for back-dated vouchers to zero and fixing a cut-off date closes the backdating route as well.

**Q: Does Tally have a built-in salesman role?**

A: No. Two security levels are predefined, Owner and Data Entry, and any level you create is based on one of them. There is no salesman template, so whatever you want a field user to see has to be assembled by hand from the allow and disallow lists, and the result is still scoped by report rather than by party.

**Q: Salesman ko party ka outstanding kaise dikhaye bina purchase rate dikhaye?**

A: In Tally alone the two are hard to separate cleanly, because the report rights that open outstanding also tend to open the reports where cost is visible. The dependable route is a mobile layer where permissions are set per team member: outstanding and order screens switched on, purchase and valuation screens never loaded, and the ledger list filtered to that salesman's own parties. The books stay in Tally and only the permitted slice reaches the phone.

**Q: What does it cost to add salesmen with restricted access?**

A: On Takkada, role-based salesman access sits in the Copilot plan at ₹8,500 per year for the business, with GST extra, and each additional user beyond the included one is ₹3,000 per year. A three-year term is 25% off and billed once. So an owner with three salesmen is looking at the plan plus three user seats, rather than a per-salesman licence for the accounting software itself.

Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).
