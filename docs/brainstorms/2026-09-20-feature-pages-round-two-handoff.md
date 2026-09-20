# Handoff: feature pages, round two (for a fresh terminal to plan with `/ce-plan`)

Written 2026-09-20 19:55 IST by the session that executed plan `docs/plans/2026-09-20-001-fix-feature-page-walkthrough-screens-and-card-layout-plan.md`. Ronak looked at the result on `localhost:5173` and asked for four more things. Plan them; do not build from this file.

## Where the branch is

- Worktree `~/.claude/fleet/worktrees/landing__site-revamp`, branch `feat/site-revamp-navy`, 9 commits past the pushed `ac4e45f` (through `f4b8f3a`), **not pushed, no PR**. Ledger with the slot map: `.superpowers/sdd/2026-09-20-001-…/progress.md` (git-ignored, on disk).
- Night checks still owed for everything on the branch: `TAKKADA_APP_ROOT=<a takkada worktree> npm test`, `INDEXNOW_DRY_RUN=true npm run build`, shoot the preview, then push. Eight "built page preloads the hero" tests read `dist/` and stay red until that build. Day rule: single test files and headless shots only.
- Mechanisms that now exist and the new plan should reuse, not reinvent:
  - `page.hero = { screen }`, `walkthrough[].screen`, `tour.stations[].screen`, resolved by `stepShot()` / `heroShot()` in `src/data/featurePages.js`; screens live in `scripts/screens.manifest.json` → `node scripts/exportScreens.mjs` → `src/data/screens.js` (`phone()` 360×746, `sheet()` with its own size) with a provenance record per file in `content/image-provenance.json` (`route` must be a plain path) and a byte budget row in `scripts/checkImageBudgets.mjs`.
  - `page.sheet = { screen, overline, heading, body }` renders one exported sheet whole after the tour (`FeaturePage.jsx`, `.feature-sheet*` in `src/feature-page.css`). Used on `salesman-app-tally` with `sheet-salesman`.
  - `page.detail = { overline, heading, intro, groups: [{ title, points[] }], guide }` renders the "In detail" cards (six-track grid, no orphan). Used on the three import pages.
  - Walkthrough card: whole phone in a surface-tinted band, copy below; six-track grid (4 → 2×2, 5 → 3+2, fifth card full-row at ≤900px).
  - Shoot sets in `scripts/shoot.mjs`: `feature`, `walk`, `detail`, `sheet`, `sheets`, `all`. Verification is real screenshots at 1440 and 390, opened.
  - Tests that pin all of this: `src/routes/__tests__/feature-page.test.jsx`, `src/data/__tests__/feature-pages.test.js` (incl. `PLACEHOLDER_IMAGES`, the closed set of old images still allowed), `src/data/__tests__/screens.test.js`, `journey.test.js`.
- Captures in the git-ignored `mockups/` that are NOT registered yet: `Purchase Analystics.png` (Purchase Analytics FY 26-27, monthly trend, supplier concentration), `Itemwise purchase report.png` (Purchases by Item), `Sales Man summary.png` (Field Visits › Outcomes tab), `sales man wise report.png` (printed per-member invoice sheet, 1100×430), `Load Grid.png` (printed load grid sheet, 2772×434), `disptach settings.png`, `Invoice setting 2.png`, `invoice setting 3.png`, `Notification.png`, `Payment and reminder settings.png`, `Member Permission 4.png`. `Supplier Match.png` shows a real GSTIN: not publishable unless retouched (Ronak's standing rule: retouch real numbers to 9435977777; a real name beside a number, or a GSTIN, is otherwise blocked).
- Still on old sage images by Ronak's choice or for lack of a capture: the WhatsApp chat (keep it), the visit photo, e-way step 2, the four buyer-side order-link screens.

## The four asks (Ronak, 19:50)

1. **Delivery challan page must show the loading sheet.** `/delivery-challan-from-mobile` never shows the printed loading sheet, which is the point of the page. `sheet-loading` (720×335) is registered and used on the homepage's Load stop. Put it on the page through `page.sheet` (the `salesman-app-tally` precedent), with copy that says what the sheet is (load list by item, drops in route order). Consider `Load Grid.png` (account × item matrix) as a second sheet or the better one; decide on the pixels.

2. **"In detail" cards are too verbose.** On the three import pages the cards read as essays (see `/import-purchase-from-pdf#detail`). Ronak: "highlight the important pointer". Options to weigh: fewer points per card (3, not 5), a bold lead phrase per point with one plain sentence after it, or one headline fact per card with the rest behind a "More" toggle. Keep the discipline from Task 7: Live rows of `docs/manuals/document-import-capabilities.md` only, no em-dashes, no rupee amounts, word ceiling per point, tests in `feature-pages.test.js` and `feature-page.test.jsx`.

3. **Reports page should name every report there is a screenshot of.** `/tally-reports-on-mobile` shows four cards. Registered report screens: `total-fy`, `sales-analytics`, `customer-analytics` (Went Quiet), `payment-behaviour`, `sales-by-item`, `receivables-report`, `collections-outstanding`, `godown-list`, `report-export`; unregistered but shot: Purchase Analytics, Purchases by Item. Ronak wants all of them mentioned on the page. Likely shape: a report gallery section (phone per report, one line each) or a longer walkthrough; decide with the 40–60 word answer band and the page's search phrase in mind.

4. **Two new feature pages.** (a) **Approvals** (maker-checker): screen `maker-checker` is registered (Review request: new sales order, Approve / Send back / Decline) and is used as a step on `handwritten-order-to-tally`, `bank-statement-import-tally` and as the pharma hero; what the feature does is in the app (voucher approval gate, `zz_voucher_approval_gate`; demo approvals seeder). (b) **AI calling**: no feature page and no screen; the homepage journey has copy ("AI calling is charged on connected minutes", pinned by `journey.test.js`), and `marketing_ps` has the claims rules (nothing stage-only may be claimed as live). Both pages need a search phrase, a hero screen (AI calling has none: ask Ronak for a capture or plan a placeholder-free page), a walkthrough, the comparison table, FAQs, and registration in the hub and footer (`feature-pages.test.js` pins hub coverage and the answer band). The hub and features menu will change with two more pages.

## Constraints that bit today (put them in the plan)

- Prettier is not configured in this repo; `npx prettier --write` adds trailing commas in call args and reflows the four `featurePages*.js` data files. Do not run it on them.
- Headless Chrome `--screenshot` with a `#hash` URL captures a blank offset; shoot without the hash at a tall window, or use the `shoot.mjs` sets (CDP scroll to hash works there).
- The section background is `--color-wash`; anything placed on it must use another token or it disappears.
- `public/` ships verbatim: an unreferenced file there is still a URL. Old sage images that a slot no longer references still need deleting with their provenance backlog entries (plan 2026-09-20-001 Task 2, not done).
- Subagents: `model: "opus"`. UI work is verified by screenshots, never by code review.

## Suggested opening for the new terminal

```
/ce-plan docs/brainstorms/2026-09-20-feature-pages-round-two-handoff.md
```
