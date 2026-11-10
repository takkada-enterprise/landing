---
title: "Salary Entry in Tally Prime with PF and ESI, with a Worked Example"
slug: "salary-entry-in-tally-prime-with-pf-esi"
meta_title: "Salary Entry in Tally Prime with PF and ESI"
meta_description: "Salary entry in Tally Prime with PF and ESI: ledgers and groups, the journal for one month, the payment entries, and a worked example that balances."
primary_keyword: "salary entry in tally prime with pf and esi"
date: "2026-11-10"
updated: "2026-11-10"
author: "founder"
category: "How-To"
excerpt: "Three staff, ₹56,000 of gross salary, PF, ESI, professional tax and one advance. This is the October journal in Tally Prime, line by line, with the totals that make it balance at ₹63,760."
---

The salary entry in Tally Prime with PF and ESI is one journal for the month. On the debit side go the gross salary and the employer's share of PF and ESI. On the credit side go Salary Payable (the net pay you owe each person), PF Payable (employee plus employer share), ESI Payable (employee plus employer share), Professional Tax Payable, TDS on Salary Payable and any staff advance taken back that month. When you pay the staff and deposit PF, ESI and professional tax, payment vouchers clear each payable ledger to zero. Tally's payroll feature is not needed: ordinary ledgers and a journal voucher are enough. The worked example below takes three staff with ₹56,000 of gross salary in October 2026, works out 12% PF with the pension split, ESI at 0.75% and 3.25%, professional tax and one advance recovery, and shows the journal balancing at ₹63,760 on both sides. Rates are as published by EPFO and ESIC on 10 November 2026.

## Key Highlights

- Employee PF is 12% of PF wages, and the employer's 12% splits into 8.33% for the pension scheme (EPS) and 3.67% for PF, with the EPF wage ceiling at ₹25,000 a month from 17 September 2026.
- ESI applies where gross wages are up to ₹21,000 a month: 0.75% from the employee and 3.25% from the employer, deposited within 15 days of the month end.
- One monthly journal carries the whole salary: in the example, ₹63,760 of debits against ₹63,760 of credits across salary, PF, ESI, professional tax and an advance.

## In This Article

- The ledgers to create, and their groups
- The worked example: three staff in October
- The October salary journal
- The payment entries in November
- Adding TDS to the salary entry
- With Tally payroll, or without it
- Letting the app make the entry
- Frequently Asked Questions

## The ledgers to create, and their groups

Create each ledger once from Gateway of Tally > Create > Ledger. The groups below are the common practice. Tally's own payroll help places PF, ESI and salary payable ledgers under Current Liabilities and PF admin charges under Indirect Expenses. Your CA may prefer Duties & Taxes for the statutory payables, so agree the groups with them before the first month.

| Ledger | Group | What it holds |
|---|---|---|
| Salary | Indirect Expenses (Direct Expenses for factory wages) | Gross salary for the month |
| Employer PF Contribution | Indirect Expenses | The employer's 12% |
| Employer ESI Contribution | Indirect Expenses | The employer's 3.25% |
| Salary Payable | Current Liabilities | Net pay owed to staff |
| PF Payable | Current Liabilities | Employee and employer PF, until deposited |
| ESI Payable | Current Liabilities | Employee and employer ESI, until deposited |
| Professional Tax Payable | Current Liabilities or Duties & Taxes | PT cut from salary |
| TDS on Salary Payable | Duties & Taxes (type of duty: TDS) | Income tax deducted from salary |
| Staff Advance (one per person) | Loans & Advances (Asset) | Advances given, until recovered |

The employer also pays EDLI at 0.5% and PF administration charges at 0.5% of PF wages, subject to the minimums EPFO sets. Many businesses book these in the same journal under a "PF Admin and EDLI Charges" ledger in Indirect Expenses. They are left out of the example to keep the table readable.

## The worked example: three staff in October

October 2026 has 31 days and all three were present every working day. The professional tax figure is an example only, because the slab depends on your state and the person's salary.

| | Ramesh (salesman) | Sunita (packer) | Manoj (accountant) | Total |
|---|---|---|---|---|
| Gross salary | ₹18,000 | ₹14,000 | ₹24,000 | ₹56,000 |
| Employee PF, 12% | ₹2,160 | ₹1,680 | ₹2,880 | ₹6,720 |
| Employer PF, 12% | ₹2,160 | ₹1,680 | ₹2,880 | ₹6,720 |
| of which EPS, 8.33% | ₹1,499 | ₹1,166 | ₹1,999 | ₹4,664 |
| of which PF, 3.67% | ₹661 | ₹514 | ₹881 | ₹2,056 |
| Employee ESI, 0.75% | ₹135 | ₹105 | not covered | ₹240 |
| Employer ESI, 3.25% | ₹585 | ₹455 | not covered | ₹1,040 |
| Professional tax (example) | ₹200 | nil | ₹200 | ₹400 |
| Advance recovered | nil | ₹1,000 | nil | ₹1,000 |
| Net pay | ₹15,505 | ₹11,215 | ₹20,920 | ₹47,640 |

Manoj earns ₹24,000, which is above the ₹21,000 ESI limit, so no ESI is cut from his pay. He is under the ₹25,000 EPF wage ceiling, so his PF is 12% of the full ₹24,000. The EPS amount is rounded to the rupee and the employer's PF share is the rest of the 12%.

## The October salary journal

Press F7 for a Journal voucher, dated the last day of the month.

| Ledger | Debit | Credit |
|---|---|---|
| Salary | ₹56,000 | |
| Employer PF Contribution | ₹6,720 | |
| Employer ESI Contribution | ₹1,040 | |
| Salary Payable | | ₹47,640 |
| PF Payable (₹6,720 + ₹6,720) | | ₹13,440 |
| ESI Payable (₹240 + ₹1,040) | | ₹1,280 |
| Professional Tax Payable | | ₹400 |
| Staff Advance: Sunita | | ₹1,000 |
| **Total** | **₹63,760** | **₹63,760** |

If the totals differ, the usual cause is that the employee share of PF or ESI was credited to the payable ledger without being taken out of net pay. Each employee deduction should reduce Salary Payable by the same amount it adds to a payable ledger.

## The payment entries in November

Each payable is cleared with a Payment voucher (F5) when the money goes out.

| Date | Debit | Credit | Amount |
|---|---|---|---|
| 1 November | Salary Payable | Bank | ₹47,640 |
| By 15 November | PF Payable | Bank | ₹13,440 |
| By 15 November | ESI Payable | Bank | ₹1,280 |
| As per your state's due date | Professional Tax Payable | Bank | ₹400 |

PF for a month is deposited through the ECR on the EPFO site and ESI on the ESIC site, both by the 15th of the next month. After these entries every payable ledger for October reads zero, which is the quickest check that nothing was missed.

## Adding TDS to the salary entry

When income tax is due on someone's salary, the journal gets one more credit line. Say ₹5,000 of TDS is due on a manager's salary this month. Credit TDS on Salary Payable ₹5,000 and reduce his share of Salary Payable by the same ₹5,000, so the debit side does not change. When you deposit the tax with a challan, a payment voucher debits TDS on Salary Payable and credits Bank. The quarterly salary TDS statement is now Form 138 (earlier Form 24Q), explained in our post on [Form 130 and Form 138](/blog/form-130-form-138-salary-tds-2026/).

## With Tally payroll, or without it

TallyPrime has its own payroll, with pay heads, attendance vouchers and a payroll voucher that builds this same accounting. It suits an office that keeps attendance at the computer. The journal route above needs no pay heads: the salary working happens elsewhere (an Excel sheet or a payroll app) and only the accounting lands in Tally. Pick one route per company, because running both makes the same salary appear twice. Advances given during the month go in separately, as shown in our guide to [staff advance entry in Tally](/blog/staff-advance-entry-in-tally/).

## Letting the app make the entry

Takkada's Staff and Payroll add-on works out every salary from attendance, overtime, fines, bonus, advances and deductions, and shows the working on each payslip. You pick your own Tally ledgers for salary, PF, ESI, PT and advances, or let the app create them, and the app makes one balanced salary entry for Tally every month, sent through Takkada's Tally connector. You can [make the salary entry for Tally from your phone](/payroll-software-tally/), and the same confirmed month gives you the [PF ECR file and ESI sheet](/pf-ecr-esi-file-from-salary/) for you or your CA to upload. The PF, ESI and PT lines are worked out from the rates in the app, for your CA to check.

For the wider picture, see [what to look for in payroll for a Tally business](/blog/payroll-for-tally-users-what-to-look-for/) and the [staff attendance and salary app](/staff-attendance-salary-app/).

## Frequently Asked Questions

**Q: Staff salary comes under which head in Tally?**

A: The Salary ledger usually goes under Indirect Expenses for office, shop and sales staff, and under Direct Expenses for factory wages that go into making goods. The amount you owe staff until salary day sits in a Salary Payable ledger under Current Liabilities. In the example, ₹56,000 of salary is the expense and ₹47,640 is the payable.

**Q: How to pass salary entry in Tally with TDS?**

A: Add a credit line to TDS on Salary Payable, a ledger under Duties & Taxes with the type of duty set to TDS, and reduce that person's net pay by the same amount. If ₹5,000 of TDS is due, Salary Payable falls by ₹5,000 and TDS on Salary Payable rises by ₹5,000, so the journal still balances. The deposit later debits the TDS ledger and credits Bank.

**Q: Can I pass a salary entry in Tally without payroll?**

A: Yes. Create ordinary ledgers for salary, the employer's PF and ESI, and the payables, then pass one journal voucher (F7) at month end. The salary working stays in your sheet or app, and Tally holds only the accounting. This is the route most small businesses use.

**Q: Under which group is PF payable in Tally?**

A: Tally's payroll help places PF payable under Current Liabilities, and that is the common choice. Some CAs prefer Duties & Taxes for statutory payables. Either works as long as the ledger is cleared each month: in the example, ₹13,440 goes in on 31 October and comes out with the deposit by 15 November.

**Q: Is salary a direct or indirect expense?**

A: Salary for office, sales and shop staff is an indirect expense. Wages for workers who make the goods are usually a direct expense, because they are part of the cost of production. A small factory often keeps two ledgers, Wages under Direct Expenses and Salary under Indirect Expenses.

Takkada's Staff and Payroll add-on makes this journal for you from the month's confirmed salary, in the ledgers you choose. It is switched on for each company separately; [message us on WhatsApp](https://wa.me/919435977777) to see it on your own staff list.
