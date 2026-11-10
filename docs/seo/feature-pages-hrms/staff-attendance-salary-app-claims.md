# Claims sheet: `/staff-attendance-salary-app/` (Staff and Payroll pages, 2026-11-10)

Page: Staff attendance and salary app (hub). Copy lives in `src/data/featurePagesHrms.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `staff_payroll` (the Staff and Payroll add-on), switched on by hand per company. It is a single-customer entitlement, so trials and demo company 143 do **not** get it. On prod 2026-11-10: 2 companies. Capability claims only, never adoption claims (prod has 1 staff row and 0 salary runs).
- Live in the prod app 2.1.326+351 (takkada `origin/main` 73ac89bbd, web live, Android green). iOS 2.1.326 was in App Review on 2026-11-10, so the pages say "phone" and never name iPhone (H39).
- Price not decided. The page prints no price; `planPointer` names Momentum and the note sends the reader to a partner or to WhatsApp. No "free trial": trials and the demo do not include payroll.
- Screens are stage captures of book co7088 with made-up staff (operator exception: the add-on is not on demo co143).

Source: HRMS claims table compiled 2026-11-10 (`scratchpad/hrms-seo/claims.md`, rows H1-H40). Evidence paths are in that table, under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main`. Re-run its "Publish-day checks" before this page merges to `main`.

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| H1 | Keep every staff member in one list with their job, joining date and salary. | LIVE |
| H2 | Pay staff monthly, daily, hourly or by pieces made. | LIVE |
| H3 | Mark today's attendance for the whole team in one tap: present, absent, half day, paid leave, weekly off or holiday. (Walkthrough 1, hero.) | LIVE |
| H4 | Add in and out times; overtime is worked out from them. (Walkthrough 2.) | LIVE |
| H5 | Set the weekly off, company holidays and the time work starts. (Walkthrough 1.) | LIVE |
| H6 | Calendar month, 30 days or 26 days. (FAQ 2.) | LIVE |
| H7 | Late and early fines and the overtime rate, with a higher rate for the weekly off. (Walkthrough 2, FAQ 2.) | LIVE |
| H9 | Piece-rate pay from pieces entered each day at your rate. (Use case 2, FAQ 5.) | LIVE |
| H10 | Punch in and out from the phone with a selfie and their location; you check doubtful punches. FAQ 1 only, never a headline, and it says the app does not match faces. | CAVEAT |
| H11, H12 | Staff ask for leave from their phone; approve or reject with a note; approved leave goes into salary as paid leave; leave left shown. (Walkthrough 3.) | LIVE |
| H14, H15 | Salary worked out from attendance, overtime, fines, bonus, advances and deductions with the working on each line; salary so far; confirm on the last day locks the month. (Walkthrough 4.) | LIVE |
| H16 | Daily-wage staff paid for the days they work and their paid leave. (FAQ 5.) | LIVE |
| H17, H18 | Payslips in English and Hindi as PDF; staff see their own slips in the Takkada app and are told when one is ready. (Walkthrough 5, FAQ 4.) | LIVE |
| H19 | Each staff member sees only their own pay; nobody can open another person's salary. (Walkthrough 7, FAQ 3.) | LIVE |
| H21, H22 | Advance taken back from the next salary or in monthly parts; loan with an EMI. (Walkthrough 6.) | LIVE |
| H24 | Approve a staff bill to a Tally expense ledger, paid now or with salary. (Walkthrough 6, use case 3 without the photo.) | LIVE |
| H26, H27 | One balanced salary entry made for Tally, sent through Takkada's Tally connector. (Walkthrough 8.) | CAVEAT wording |
| H28 | PF ECR and ESI files prepared from confirmed salary for you or your CA to upload. (Walkthrough 8.) | CAVEAT wording |
| H33 | TDS worked out for your CA (llms summary only). | CAVEAT wording |
| H38 | Owner and accountant run salary from the web and desktop app. (FAQ 6.) | LIVE |

Every HRMS page also carries this disclaimer: "The PF, ESI, professional tax, labour welfare fund and income-tax rates in the app are worked out from the rates it holds and are not yet checked by a CA; have your CA check the figures before you pay or upload them."

## Cannot say

- WhatsApp payslips (H20, NOT LIVE: template functions held on prod). Say "Staff get their payslip in the Takkada app".
- "Posted in Tally", "synced to Tally", "no double entry ever" (H26 CAVEAT: every payroll job in dogfood stayed queued with the loader offline). Say "makes the salary entry for Tally" / "sent through Takkada's Tally connector".
- "Files PF/ESI/TDS for you", "auto-filing", "one-click filing", "upload-ready", "accepted by EPFO" (H28: no real portal upload yet).
- "CA-verified", "100% compliant", "always up to date" (3 of 16 statutory rate rows are source-verified; the app itself says the limits are not yet checked by a CA).
- "Form 16 generator" or that the app makes Form 16 / Form 130 (H37). Form 130 comes only from TRACES.
- Face recognition, biometric or attendance-machine sync, fake-GPS detection (H10).
- Leave types such as sick, casual or earned (H13: one paid-leave bucket).
- Full and final settlement, gratuity settlement, hiring, appraisals, staff documents.
- Staff bills "with a photo of the receipt" (H23 CAVEAT: no real photo upload on app.takkada.com yet).
- Any price, "free", "included in your plan", customer counts, testimonials, competitor names, and the internal names "PagarBook plus" and "Paysaathi".
- Shifts and roster (H8) and the yearly bonus sheet (H31) are live but have no capture yet, so these pages leave them out.
