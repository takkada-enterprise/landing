# Claims sheet: `/salary-slip-in-hindi/` (Staff and Payroll pages, 2026-11-10)

Page: Salary slip in Hindi. Copy lives in `src/data/featurePagesHrms.js`. Every capability sentence on the page maps to a row below; anything else stays off.

## Gating

- Feature key `staff_payroll` (the Staff and Payroll add-on), switched on by hand per company. It is a single-customer entitlement, so trials and demo company 143 do **not** get it. On prod 2026-11-10: 2 companies. Capability claims only, never adoption claims (prod has 1 staff row and 0 salary runs).
- Live in the prod app 2.1.326+351 (takkada `origin/main` 73ac89bbd, web live, Android green). iOS 2.1.326 was in App Review on 2026-11-10, so the pages say "phone" and never name iPhone (H39).
- Price not decided. The page prints no price; `planPointer` names Momentum and the note sends the reader to a partner or to WhatsApp. No "free trial": trials and the demo do not include payroll.
- Screens are stage captures of book co7088 with made-up staff (operator exception: the add-on is not on demo co143).

Source: HRMS claims table compiled 2026-11-10 (`scratchpad/hrms-seo/claims.md`, rows H1-H40). Evidence paths are in that table, under `/Users/ronak/Desktop/PaySaathi/takkada/takkada` at `origin/main`. Re-run its "Publish-day checks" before this page merges to `main`.

## Can say

| Claims row | What the page says | Status |
|---|---|---|
| H17 | Payslips in English and Hindi from the same figures, ready to download as a PDF. A few words (state name, "1 day") stay in English, and the page says so. (Answer, walkthrough 2, FAQ 3.) | LIVE |
| H14 | Each line shows its working: salary after absent days, overtime, PF, professional tax, advance recovered. (Walkthrough 1.) | LIVE |
| H2, H16 | Daily-wage slip: paid days times the day rate, bonus, ESI, advance recovered. (Walkthrough 3, FAQ 5.) | LIVE |
| H18 | Staff see their own slips in the Takkada app with a notification when one is ready. (Walkthrough 4, FAQ 4.) | LIVE |
| H19 | Each person sees only their own pay. (FAQ 4.) | LIVE |
| Hindi labels | वेतन, ओवरटाइम, पीएफ, व्यवसाय कर, एडवांस वसूली, कुल देय are read off the R2 Hindi payslip captures (`hrms-payslip-hindi-full-phone`, `hrms-staff-payslip-hindi-netpay-phone`). | Basis |

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
