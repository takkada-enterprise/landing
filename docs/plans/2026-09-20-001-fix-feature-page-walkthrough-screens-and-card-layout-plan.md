# Feature-Page Walkthroughs: One App Generation, Aligned Cards, Honest Team Sales Sheet — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Pass `model: "opus"` on every subagent dispatch (PaySaathi CLAUDE.md: never Fable for subagents). Every UI task ends with REAL screenshots at 1440 and 390, opened at full size (memory: UI work is verified by screenshots, never by code review).

**Goal:** Every feature page shows one generation of the app (the Sept-2026 blue build) below the hero as well as in it, the walkthrough cards line up, and the Team Sales sheet on the homepage stops printing "Member" nine times.

**Architecture:** Three separate problems, three stages that Ronak can eyeball one at a time. Stage 1 ships today without any new capture: the walkthrough card stops carrying a phone (the only honest state until the blocked screens are re-shot), the grid stops orphaning cards, and the 24 sage-era screenshots leave the repo, which clears the provenance backlog. Stage 2 waits for seven captures from Ronak, then puts phones back into the cards through the existing screen registry (`src/data/screens.js`, `screen(slug)`), one field per step, with a fixed media band so alignment is by construction. Stage 3 is in `supabase-functions`: the demo seeder attributes receipts to the demo salesmen the way it already attributes invoices, so the exported sheet names people; Ronak then re-exports it and it lands through Stage 2's registry path.

**Tech Stack:** Vite 7, React 19, `vite-react-ssg`, plain CSS, Vitest + Testing Library, headless Chrome via `node scripts/shoot.mjs <set>`, `cwebp` via `node scripts/exportScreens.mjs`; Postgres/plpgsql for Stage 3.

**Spec:** Ronak's brief of 2026-09-20 (three problems found on `localhost:4173/tally-reports-on-mobile`), on top of `docs/plans/2026-09-19-001-fix-site-revamp-visual-repair-and-feature-screens-plan.md` (Task 7 replaced `hero.screen` only) and its ledger `.superpowers/sdd/2026-09-19-001-…/progress.md`. Branch state at planning: `feat/site-revamp-navy` at `34187a0`, pushed, no PR, 58 commits ahead of `origin/main`.

**Predecessor facts this plan relies on** (verified 2026-09-20):

- 27 feature pages: 26 carry a `walkthrough` (4 or 5 steps), 1 (`salesman-app-tally`) carries a 6-station `tour`. Between them they reference 24 distinct `/assets/screenshots/*.webp` files. `party-ledger-mockup` is used in 22 slots, `invoice-summary-mockup` in 17, `whatsapp-dispatch-mockup` in 16, `add-items-mockup` in 14.
- 20 pages already use `hero.screen`; 7 still carry a legacy hero image (`e-invoice-from-phone`, `e-way-bill-from-phone`, `multi-company-tally-reports`, `credit-note-from-phone`, `custom-invoice-template-tally`, `order-booking-app-tally`, `tally-app-for-agri-input-distributors`; both shapes resolve through `heroShot(page)` in `src/data/featurePages.js:1426`).
- `content/image-provenance.json` `unprovenAllowlist` has 40 entries; 28 of them are `/assets/screenshots/*` files referenced only by walkthroughs, tours or legacy heroes.
- `scripts/screens.manifest.json` has 25 rows; `src/data/screens.js` exports the same 25 (`phone()` = 360×746, `sheet()` carries its own size).

---

## Part 1: What the mockups really are (every file opened with the Read tool, 2026-09-20)

Filenames lie; this table is what the pixels show. **BLOCKED** = shows a phone number, a real name beside a number, or a GSTIN; not publishable. The four `-1` files are pixel-identical duplicates.

| # | `mockups/` file | What the screen really is | Registry slug (existing) | Verdict |
|---|---|---|---|---|
| 1 | Auto einv and eway.png | Invoice Summary, lower half: Amount details, GST mode, "Send invoice via WhatsApp — Invoice will be sent to **9573440784**", Generate E-Invoice toggle | — | **BLOCKED** (number) |
| 2 | Bills Recievables Report.png | Mahalaxmi Kirana Mart receivables: total, ageing chips 90+/61-90/31-60, open bills, Share PDF, Send on WhatsApp | `receivables-report` | clean |
| 3 | Customer Analytics.png | "Went Quiet": customers who stopped ordering, value at risk, silent-for filter | `customer-analytics` | clean |
| 4 | dispatch beat selection.png | Dispatch, Orders tab: To-load grouped by route (Bapunagar, Satellite, Maninagar…), Add 5 to van | `dispatch-beats` | clean |
| 5 | disptach settings.png | Dispatch settings: "Load the van from" dropdown (Sales orders / Delivery challans / Sales invoices), "Bill the van as" | — | clean, unused |
| 6 | DOCUMENT import.png | Imports list: sales invoice, purchase invoice (jpg), bank statements (masked `XXXXXXXX3…`), Import a document | `document-import` | clean |
| 7/8 | Field visit tracking(.png, -1) | Field Visits, Feed tab: Balaji Traders / Priya Desai, Sardar Provision / Amit Shah, Krishna General Store / Rajesh Patel (names only) | `field-visits` | clean |
| 9 | followup log -revery dashbaord.png | Log follow-up for Mahalaxmi Kirana Mart: "Already tried: Rajesh Patel · Will pay", reach/outcome chips, promise to pay | `followup-log` | clean |
| 10 | Godown wise item selection.png | Add Items list with "Godown: Main Store" chip, 18 items with rate per unit, no cart | — | clean, unused (candidate `add-items`) |
| 11 | Godown Wise stock.png | Add Items with cart open: Toor Dal 30kg, "8 available in Shop Counter", Godown dropdown per line | `godown-stock` | clean |
| 12 | homepage.png | Home: PAY SAATHI I…, payable/receivable, Quick actions 3×3, Registers | `home` | clean |
| 13 | Invoice setting 1.png | Invoices settings, top: GST mode, round off, price level, reverse charge, batch numbers | — | clean, unused |
| 14 | Invoice setting 2.png | Invoices settings, middle: extra header details, Ship To, Dispatch From, transporter, godown, stock on item card | — | clean, unused |
| 15 | invoice setting 3.png | Invoices settings, bottom: auto-send toggles, GST Portal Credentials "For e-Invoice & e-Way Bill", Where invoices post in Tally, Tally voucher types | — | clean, unused |
| 16 | Invoice summary.png | Invoice Summary, upper half: Annapurna Kirana **9573440784**, INV/26-27/0032, date, payment due chips, Sales ledger | — | **BLOCKED** (number) |
| 17 | Item wise sale report.png | Sales by Item, Sep 2026: qty, amount, avg price, spread | `sales-by-item` | clean |
| 18 | Itemwise purchase report.png | Purchases by Item, Sep 2026 | — | clean, unused |
| 19 | Load Grid.png | Printed "Load grid" sheet: account × item matrix, Load and Delivered totals (2772×434) | — | clean, unused (sheet) |
| 20 | Maker Checker approval feature.png | Review request: New sales order, Sai Distributors, "Sent by a team member", Approve / Send back / Decline | `maker-checker` | clean |
| 21 | making challans & invoices.png | Van · 17/09, Keyed back: "**ronak / 919435977777**", drops, Make invoices / Make challans | — | **BLOCKED** (name + number) |
| 22 | Notification.png | Notifications settings (payments received, new orders, dispatch updates, evening summary…) | — | clean, unused |
| 23 | Party Detail.png | Mahalaxmi Kirana Mart ledger: To collect, Mobile numbers "**+91 98201 14477** from Tally", invoice rows, Share Statement | — | **BLOCKED** (number) |
| 24 | Party list color coded due overdue.png | Parties: To collect ₹27,79,414, Customers/Suppliers, Due/Payable/No due/Overdue chips, list | `party-list` | clean |
| 25 | Party Selection.png | Select Party while billing: due amount, No GST, last invoice date, sort chips | `party-selection` | clean |
| 26 | Partywise collection report.png | Collections, Outstanding tab: ageing legend, per-party buckets, assigned collector name (Rajesh Patel, Priya Desai) | — | clean, unused |
| 27 | Payment and reminder settings.png | Payments & reminders settings: Smart Reminders, Bank accounts, UPI QR toggle | — | clean, unused |
| 28 | Payment Behavior report.png | Collections, Payment behaviour tab: collected this FY, days-taken chips, Bill-wise/FIFO, collection days by customer | `payment-behaviour` | clean |
| 29/30 | Pending order(.png, -1) | Pending Orders by party: Annapurna Kirana, SO/26-27/010, Make Invoice, per-line pending + on van | `pending-orders` | clean |
| 31 | Picking List.png | Printed loading sheet "Shreeji Distributors (Demo)", Load list by category, drops | `sheet-loading` | clean (sheet) |
| 32 | Purchase Analystics.png | Purchase Analytics FY 26-27: monthly trend, supplier concentration HHI | — | clean, unused |
| 33 | Recovery dashboard team logging.png | Collect › Recovery › Team: Recovered ₹3,25,658, per-member recovered/outstanding/speed | `recovery-team` | clean |
| 34 | reminder logs.png | Collect › Reminders: Last reminded per party, Sent / Failed | `reminders` | clean |
| 35 | Reminder payment.png | Smart Reminders settings: 3d / DUE / +3 / +7 / +14 / every 7d, cadence radios | `reminder-schedule` | clean |
| 36 | Sales Anlaytics.png | Sales Analytics FY 26-27: monthly trend, customer concentration | `sales-analytics` | clean |
| 37/38 | Sales Man summary(.png, -1) | Field Visits, **Outcomes** tab: per member visits/verified/dealers, booked on visits, at the dealers visited | — | clean, unused |
| 39 | sales man wise report.png | Printed per-member invoice list sheet (Rajesh Patel, Sunita Mehta), grand total (1100×430) | — | clean, unused (sheet) |
| 40 | salesman wise summary report.png | Exported "Team Sales" sheet: 14 rows, **9 named "Member"** | `sheet-salesman` | clean but wrong (Part 3) |
| 41 | Settlements.png | Collect › Settlements: pending settlement, total settled, per-party Pending/Settled | `settlements` | clean |
| 42 | Statement setting.png | Statements settings: Ledger Account / Pending Bills, Include details | `statement-settings` | clean |
| 43 | TEAM RECOVERY.png | Same screen as #33 (status bar shows a recording indicator) | (dup of `recovery-team`) | clean, duplicate |
| 44/45 | Team sales module -target of sales man(.png, -1) | Team: 3 of 61 out today, Check in, Dispatch/Beats, Orders/Invoices, leaderboard with targets and commission | `salesman-summary` | clean |
| 46 | Team Sales.png | Review invoices: "No delivery note will sit behind these invoices", Annapurna Kirana lines, Create 7 invoices | `review-invoices` | clean |
| 47 | Total FY.png | Reports: this FY per voucher type (Sales Invoice ₹50,85,304.60 … Contra) | `total-fy` | clean |
| 48 | Van Loading.png | Van · 17 Sep, Building: "**ronak / 919435977777**", route order, Van is loaded | — | **BLOCKED** (name + number) |

Blocked: 5 files (#1, #16, #21, #23, #48). Clean and already registered: 25. Clean and unregistered: 13 (#5, #10, #13, #14, #15, #18, #19, #22, #26, #27, #32, #37, #39).

### The 24 walkthrough/tour images → what can truthfully replace each

| Old image (slots) | What its alt promised | Truthful replacement today | If none, what Ronak must shoot |
|---|---|---|---|
| party-ledger-mockup (22) | party ledger, receipts matched to invoices | `receivables-report` ONLY where the step is about dues / open bills | **Party Detail** (#23) with the Mobile numbers card showing a dummy number → `party-detail` |
| invoice-summary-mockup (17) | invoice summary with amount due + pay link | none (#1, #16 blocked) | **Invoice Summary** twice, dummy number: upper half → `invoice-summary`; lower half with the WhatsApp/E-Invoice toggles → `invoice-summary-send` |
| whatsapp-dispatch-mockup (16) | WhatsApp chat with invoice PDF + Pay now | none | **A WhatsApp chat** from the demo showing the invoice PDF and the pay link, number hidden → `whatsapp-invoice` |
| add-items-mockup (14) | order with live stock next to each item | `godown-stock` (stock is the point) or new `add-items` from #10 (plain item picking) | — |
| settlements-mockup (11) | settled collections | `settlements` | — |
| reports-screen (8) | FY summary of sales/receipts/purchase/payments | `total-fy` | — |
| delivery-challans-mockup (6) | delivery challans listed with dispatch details | `dispatch-beats` (documents to load, grouped by route) | Van screen (#48) re-shot with a demo driver → `van-loading` (nicer, not required) |
| smart-reminders-mockup (5) | pre-due and post-due reminder steps | `reminder-schedule` | — |
| rbac (5) | role-based access settings | none | **Member permissions** screen (Settings › Team › a member) → `member-permissions` |
| pending-orders-mockup (5) | pending quantities per item | `pending-orders` | — |
| monthly-sales (3) | sales register grouped by month | `sales-analytics` | — |
| home-screen-framed (3) | home with registers | `home` | — |
| payment-reminders (2) | how often a party is messaged | `reminder-schedule` | — |
| sales-target-mockup (2) | per-salesman targets | `salesman-summary` | — |
| field-visit-photo-mockup (1) | geo-tagged shopfront photo | `field-visits` (feed) as a substitute | a **visit photo** screen if he wants the photo itself → `field-visit-photo` |
| beats-mockup (1, tour) | routes with salesman + dealer count | none (dispatch-beats is Dispatch, not Beats) | **Beats** screen (Team › Beats) → `beats` |
| field-visits-feed-mockup (1, tour) | check-ins with time | `field-visits` | — |
| beat-load-sheet-mockup (1, tour) | load sheet for one route | none as a phone (`sheet-loading` is a wide sheet) | **Van** re-shot (#48) → `van-loading` |
| team-sales-hub-mockup (1, tour) | who is out + leaderboard | `salesman-summary` | — |
| order-link-{catalog,cart,confirm,sent,inbox} (5) | the buyer's order link, 5 web screens | none (no mockup of the order link exists) | five order-link captures, or leave `order-booking-app-tally` as is: its hero is old too, so that page is consistent, not mixed |

**Consequence that shapes the plan:** with today's mockups only 2 of the 26 walkthrough pages (`tally-reports-on-mobile`, `tally-on-mobile`) can get a complete set of truthful phones. Every other page has at least one step whose only honest screen is blocked (#1, #16, #23) or does not exist (WhatsApp chat, permissions). So "swap the 24 images" is not a landing-repo task; it is gated on seven captures from Ronak. Stage 1 removes the sage phones now; Stage 2 puts blue ones back when the captures land.

## Part 2: The card layout, three options

Today (`src/feature-page.css:62-110`): `.feature-step` is `padding: 28px 28px 0` and `.feature-step-shot` is `max-height: 200px; overflow: hidden` under copy of varying length, so each phone is cut by the card edge at a different height. `repeat(auto-fit, minmax(288px, 1fr))` in a ~1152px container gives 3 columns, so a 4-step page orphans one card.

| Option | What it looks like | Alignment | Cost / risk |
|---|---|---|---|
| **A. Shared baseline, phone at the foot** | Copy on top, a fixed 200px media band pinned to the bottom of every card (`margin-top: auto`), phone top-aligned inside the band so the crop is the same on every card | Rows are equal height (grid stretch), so every band starts at the same y; phones line up | Long copy pushes the band down but never past it; the phone still peeks in from the bottom, which is the current idea done right. Needs a truthful screen on EVERY step of a page or the page looks broken |
| **B. Phone first, fixed band at the top** (recommended for Stage 2) | A 220px media band at the top of the card showing the screen's top (app bar + first rows), copy below | Aligned by construction, regardless of copy length; the visible crop is the meaningful part of the screen | Same gate as A: every step of a page needs a registry screen. The card reads "screenshot card", the most conventional pattern, right for non-technical readers |
| **C. Copy-only cards** (recommended for Stage 1, today) | Icon, title, body. No phone below the hero; the hero phone is the page's screen | Nothing to align | Pages lose the phones below the fold. Zero provenance debt: 24 files deleted, backlog cleared. Ships without any capture |

Both A and B share the "all or none per page" rule, pinned by a test: a page either has a registry screen on every step or on none. Mixed cards (some with a band, some without) would mis-align again.

**Recommendation:** C now, B later. Stage 1 = C on all 26 pages plus the grid fix (4 steps → 2×2, 5 steps → 3 + 2 half-width). Stage 2 = B, executed page by page as its screens become available, starting with the two pages that are complete today so Ronak can judge the card with real phones before he shoots the rest. If Ronak prefers A, Task 5 Step 3 has the four-line CSS delta.

## Part 3: Why the Team Sales sheet prints "Member" nine times (verified on prod, read-only)

- `get_team_sales_period_export` (and `get_team_sales_leaderboard`) label a row `coalesce(nullif(btrim(u.raw_user_meta_data->>'name'), ''), u.phone, 'Member')` after a `left join auth.users u on u.id = entrant`. "Member" means **no user row was found at all**, not a member without a name.
- Receipts' entrant is `paysathi_receipts.client_id` (`team_sales_countable_receipts`). On prod demo company 143, September 2026: 28 receipts, 28 distinct `client_id`s, **0 of them exist in `auth.users`**. Invoices in the same month: 29, all 6 entrants are real users.
- Cause: `seed_demo_company_dataset` inserts receipts with `client_id = gen_random_uuid()` (`20260801130000_demo_seed_ist_business_day.sql:257-265`, same in `20260801140000…:300`). `seed_demo_company_salesmen` (`20260730124500_demo_salesmen_survive_nightly_reset.sql`) later round-robins **invoices** onto the six `@shreejidemo.invalid` fixtures via `attributed_member_id`, and never touches receipts.
- So: a demo-company data gap, not an app bug. The 9 "Member" rows are 9 receipts each under a random id, so they cannot even group. Fix in Stage 3: the same seeder step stamps `paysathi_receipts.client_id` onto the same members. No app release is needed; the sheet is re-exported from the app after the next nightly reset.

## Global Constraints

- Worktree `~/.claude/fleet/worktrees/landing__site-revamp`, branch `feat/site-revamp-navy`. **Do NOT merge, do NOT open a PR.** Push the branch only in Task 3 Step 5.
- Evidence: nothing is done without real screenshots at 1440 AND 390, opened at full size. `node scripts/shoot.mjs feature` (all 27 pages; the set already exists in `scripts/shoot.mjs:23-52`). Dev server: `npx vite --port 5173 --strictPort`.
- Heavy commands (full suite, `npm run build`) are night-only and run with `INDEXNOW_DRY_RUN=true TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__promote-0907`. During the day run single test files.
- Marine tokens only (`src/styles.css` `:root`); no sage hex, no Fraunces (`src/__tests__/brand-guard.test.js`). Readable text on navy is white or `rgba(255,255,255,≥0.72)`. No image overlaps a text block at any width. Motion: `transform`, `opacity`, `filter` only; never `transition: all`; easing `var(--ease-out)`; press `scale(0.97)` at 160ms.
- Copy: no em-dashes; none of seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer; "Not X. Y." banned; answers stay in the 40-60 word band (`src/data/__tests__/feature-pages.test.js` sweeps). Tabular numbers on amounts.
- Screens: every file under `public/assets/screens/` goes mockups → `scripts/screens.manifest.json` → `node scripts/exportScreens.mjs` → `src/data/screens.js`, with a provenance record (`content/image-provenance.json`, `kind: "appScreenshot"`, demo company 143). A capture that shows a phone number, a real name beside a number, or a GSTIN is never exported. `public/` is copied into `dist/` verbatim, so an unreferenced file there is still a public URL: delete, do not merely unreference.
- Commits: small, staged by path (never `git add -A`), trailer `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>` when this model writes the commit.
- Stage 3 (`supabase-functions`): work in a sibling `sf-wt-*` worktree under the monorepo, ship as a migration numbered above `origin/stage`'s max (`20261029900100` at planning; re-check), never `apply_migration`. Build and test on stage (demo company 112); prod (demo company 143) changes only through the deploy. `mcp__prod-supabase__*` is live customer data.

## File structure

| File | Responsibility |
|---|---|
| `src/components/FeaturePage.jsx` (211-243, 148) | Walkthrough card markup; schema image fallback |
| `src/feature-page.css` (62-110, 252) | `.feature-steps` grid and `.feature-step` card |
| `src/data/featurePages.js`, `featurePagesSecondBatch.js`, `featurePagesAlternatives.js`, `featurePagesPersonas.js` | Step data: Stage 1 drops `image/alt/width/height`; Stage 2 adds `screen` |
| `src/data/featurePages.js` (`heroShot`, new `stepShot`) | Resolve a step or station through the registry |
| `src/components/FeatureTour.jsx` | Stage 2: stations read `screen` |
| `src/routes/__tests__/feature-page.test.jsx`, `src/data/__tests__/feature-pages.test.js`, `src/data/__tests__/screens.test.js` | Pins |
| `public/assets/screenshots/`, `content/image-provenance.json`, `scripts/checkImageBudgets.mjs` | Stage 1: retire the sage files and their backlog entries |
| `scripts/screens.manifest.json`, `src/data/screens.js`, `public/assets/screens/` | Stage 2: new rows |
| `supabase-functions/supabase/migrations/<n>_demo_receipts_attributed_to_salesmen.sql`, `supabase/tests/demo_receipts_attributed_to_salesmen_regression.sql` | Stage 3 |

---

## Stage 1: ships today, no capture needed (Ronak eyeballs after Task 3)

### Task 1: Walkthrough cards become copy-only and the grid stops orphaning

**Files:**
- Modify: `src/components/FeaturePage.jsx:148`, `:211-243`
- Modify: `src/feature-page.css:62-110`, `:252`
- Modify: `src/data/featurePages.js`, `src/data/featurePagesSecondBatch.js`, `src/data/featurePagesAlternatives.js`, `src/data/featurePagesPersonas.js` (every `walkthrough[]` step)
- Test: `src/routes/__tests__/feature-page.test.jsx:84-100`, `src/data/__tests__/feature-pages.test.js:117-128`, `:137`, `:270-272`

**Interfaces:**
- Produces: a walkthrough step is `{ icon, title, body }`. `.feature-steps` carries `data-steps="<count>"`. `.feature-step` contains only `.feature-step-copy`.

- [ ] **Step 1: Failing tests**

In `src/routes/__tests__/feature-page.test.jsx`, replace the `page.walkthrough.forEach((step, i) => { const img = … })` block (lines 91-97) with:

```jsx
      expect(grid.querySelector('.feature-steps').getAttribute('data-steps')).toBe(
        String(page.walkthrough.length)
      );
      page.walkthrough.forEach((step, i) => {
        expect(steps[i].querySelector('img')).toBeNull();
        expect(steps[i].querySelector('h3').textContent).toBe(step.title);
      });
```

Append to the same describe block:

```jsx
  it('has no phone-shot rule left in the card CSS', () => {
    const css = readFileSync(resolve(__dirname, '../../feature-page.css'), 'utf8');
    expect(css).not.toMatch(/\.feature-step-shot/);
  });
```

(`readFileSync`/`resolve` are already imported in this file; if not, add `import { readFileSync } from 'node:fs'; import { resolve } from 'node:path';`.)

In `src/data/__tests__/feature-pages.test.js`, replace the per-step image test at lines 117-128 with:

```js
  it.each(FEATURE_PAGES.filter((p) => p.walkthrough?.length).map((p) => [p.slug, p]))(
    '%s: walkthrough steps carry copy only (phones return through the registry in Stage 2)',
    (_slug, page) => {
      for (const step of page.walkthrough) {
        expect(step.title).toBeTruthy();
        expect(step.body).toBeTruthy();
        expect(step).not.toHaveProperty('image');
        expect(step).not.toHaveProperty('width');
      }
    }
  );
```

Delete `...(page.walkthrough?.map((s) => s.image) ?? [])` from the image sweep (line 137) and the `featurePage:walkthrough` surface entries (lines 270-274).

Run: `npx vitest run src/routes/__tests__/feature-page.test.jsx src/data/__tests__/feature-pages.test.js` — Expected: FAIL (cards still render `<img>`, steps still have `image`).

- [ ] **Step 2: Markup**

In `src/components/FeaturePage.jsx` replace lines 218-241 with:

```jsx
          <div className="feature-steps" data-steps={page.walkthrough.length}>
            {page.walkthrough.map((step) => {
              const Icon = ICONS[step.icon];
              return (
                <article key={step.title} className="feature-step">
                  <div className="feature-step-copy">
                    <div className="tally-card-icon">{Icon && <Icon size={22} />}</div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
```

At line 148 the schema image fallback becomes `image: page.tour?.stations?.[0]?.screenshot ?? shot?.src,` and update its comment: the walkthrough no longer carries images, so the Article image is the hero (or the tour's first station).

- [ ] **Step 3: CSS**

Replace `src/feature-page.css:62-110` with:

```css
/* ── Walk-through ──
 * A card grid of copy-only steps. The phones that used to sit at the foot of
 * each card were sage-era captures cut off at a different height per card;
 * they come back through the screen registry (Stage 2 of plan 2026-09-20-001)
 * as a fixed media band once every step of a page has a truthful capture.
 * Six tracks so 3-, 4- and 5-step pages all fill their rows: a card spans 2,
 * a 4-step page's cards span 3 (2×2), the last two of a 5-step page span 3. */
.feature-steps {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 24px;
  margin-top: 48px;
}

.feature-step {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  padding: 28px;
  background: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.feature-steps[data-steps='4'] .feature-step {
  grid-column: span 3;
}

.feature-steps[data-steps='5'] .feature-step:nth-child(n + 4) {
  grid-column: span 3;
}

.feature-step-copy h3 {
  margin: 14px 0 8px;
  font-family: var(--font-serif);
  font-weight: var(--weight-display);
  font-size: 20px;
  line-height: 1.3;
  color: var(--color-text);
}

.feature-step-copy p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-text-secondary);
}
```

In the `@media (max-width: 900px)` block (line 232) add:

```css
  .feature-steps .feature-step,
  .feature-steps[data-steps='4'] .feature-step,
  .feature-steps[data-steps='5'] .feature-step:nth-child(n + 4) {
    grid-column: span 3;
  }
```

In the `@media (max-width: 767px)` block (line 252) replace `.feature-steps { gap: 44px; }` with:

```css
  .feature-steps {
    gap: 16px;
  }

  .feature-steps .feature-step,
  .feature-steps[data-steps='4'] .feature-step,
  .feature-steps[data-steps='5'] .feature-step:nth-child(n + 4) {
    grid-column: span 6;
  }
```

- [ ] **Step 4: Strip the four image fields from every walkthrough step**

The four data files are hand-formatted JS, so do not round-trip them through a parser. Run this once from the worktree root (not committed):

```bash
node -e '
const fs = require("fs");
for (const f of ["featurePages","featurePagesSecondBatch","featurePagesAlternatives","featurePagesPersonas"]) {
  const p = `src/data/${f}.js`; let s = fs.readFileSync(p, "utf8"); let out = ""; let i = 0;
  while (true) {
    const start = s.indexOf("walkthrough: [", i); if (start < 0) { out += s.slice(i); break; }
    let depth = 0, j = start + "walkthrough: ".length;
    for (; j < s.length; j++) { if (s[j] === "[") depth++; else if (s[j] === "]") { depth--; if (depth === 0) { j++; break; } } }
    const block = s.slice(start, j).replace(/\n\s*(image|alt|width|height):[^\n]*,/g, "");
    out += s.slice(i, start) + block; i = j;
  }
  fs.writeFileSync(p, out);
}'
npx prettier --write src/data/featurePages.js src/data/featurePagesSecondBatch.js src/data/featurePagesAlternatives.js src/data/featurePagesPersonas.js
grep -c "assets/screenshots" src/data/featurePages*.js
```

Expected after the grep: only the 6 legacy `hero.image` lines and the 6 `tour.stations[].screenshot` lines remain (`featurePages.js` ≈ 7 hits split across hero + tour; the other three files ≈ 1-2 hero hits each). Open `git diff --stat` and confirm only removals inside `walkthrough` arrays.

- [ ] **Step 5: Run, shoot, look**

Run: `npx vitest run src/routes/__tests__/feature-page.test.jsx src/data/__tests__/feature-pages.test.js src/data/schema.test.js` — Expected: PASS.
Run: `node scripts/shoot.mjs feature`. Open every `shots/feature/feature-*-1440.png` and `-390.png`. Acceptance: at 1440 a 4-step page shows 2×2 equal cards, a 5-step page shows 3 + 2 (the two wider), no orphan; at 390 one column; no card has an image; the hero phone is the only phone on the page; headings and body readable; nothing overlaps.

- [ ] **Step 6: Commit**

```bash
git add src/components/FeaturePage.jsx src/feature-page.css src/data/featurePages.js src/data/featurePagesSecondBatch.js src/data/featurePagesAlternatives.js src/data/featurePagesPersonas.js src/routes/__tests__/feature-page.test.jsx src/data/__tests__/feature-pages.test.js
git commit -m "fix(feature-pages): walkthrough cards carry copy only and fill their rows

The sage-era phones under each card were clipped at a different height per
card and mixed two app generations on every page. Phones return through the
screen registry once each page has a truthful capture (plan 2026-09-20-001)."
```

---

### Task 2: Retire the sage-era screenshots and their provenance backlog

**Files:**
- Delete: every file under `public/assets/screenshots/` that nothing references after Task 1 (expected: the 24 walkthrough/tour images minus those still used by a legacy hero or the tour, plus the already-unreferenced `.png` masters)
- Modify: `content/image-provenance.json` (`unprovenAllowlist`), `scripts/checkImageBudgets.mjs` (rows for deleted files), `src/data/__tests__/screens.test.js`

**Interfaces:**
- Produces: `STILL_REFERENCED`, the exact list of `public/assets/screenshots/*` files kept, pinned in `screens.test.js`.

- [ ] **Step 1: Compute the referenced set**

```bash
cd ~/.claude/fleet/worktrees/landing__site-revamp
for f in public/assets/screenshots/*; do b=$(basename "$f"); n=$(grep -rl --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=shots "$b" src content scripts index.html public/*.html 2>/dev/null | grep -v image-provenance.json | wc -l | tr -d ' '); echo "$n $b"; done | sort -n
```

Anything with `0` is unreferenced. Expected to stay referenced: the legacy hero images of the 7 pages still on `hero.image` (`invoice-summary-mockup.webp`, `delivery-challans-mockup.webp`, `reports-screen.webp`, `order-link-buyer-mockup.webp`, `monthly-sales.webp`), the tour's 6 station images (`beats-mockup`, `field-visits-feed-mockup`, `add-items-mockup`, `beat-load-sheet-mockup`, `whatsapp-dispatch-mockup`, `team-sales-hub-mockup` `.webp`), logos (`takkada-logo.*`, `takkada-favicon.png`, `tally-erp-logo.png`) and whatever the grep shows is used by a blog or guide page. Write the list down in the task report; it is `STILL_REFERENCED`.

- [ ] **Step 2: Failing test**

Append to `src/data/__tests__/screens.test.js`:

```js
import { readdirSync } from 'node:fs';

// Sage-era captures left the walkthroughs on 2026-09-20 (plan 2026-09-20-001).
// public/ ships verbatim, so a file here is a public URL whether or not a page
// links it: the folder may hold only what a page still renders.
const STILL_REFERENCED = [
  // paste STILL_REFERENCED from Step 1, one basename per line, sorted
];
it('public/assets/screenshots holds only files a page still renders', () => {
  const dir = resolve(repoRoot, 'public/assets/screenshots');
  expect(readdirSync(dir).sort()).toEqual([...STILL_REFERENCED].sort());
});
```

(`resolve` and `repoRoot` already exist in this file.) Run: `npx vitest run src/data/__tests__/screens.test.js` — Expected: FAIL listing the extra files.

- [ ] **Step 3: Delete and prune**

`git rm` every unreferenced file (both `.png` and `.webp`). In `content/image-provenance.json` remove each `unprovenAllowlist` entry whose `path` no longer exists (28 of the 40 are `/assets/screenshots/*`; keep the two `og/` entries and any kept file's entry). In `scripts/checkImageBudgets.mjs` remove the rows and comments for deleted files (`field-visit-photo-mockup` at ~line 41 goes; `home-screen-framed.webp` stays only if Step 1 shows a live reference).

Run: `node scripts/checkScreenshotProvenance.mjs && node scripts/checkImageBudgets.mjs && npx vitest run src/data/__tests__/screens.test.js src/data/__tests__/feature-pages.test.js` — Expected: all pass; the provenance script's backlog count drops by the number of deleted entries (write the before/after count in the report).

- [ ] **Step 4: Commit**

```bash
git add -u public/assets/screenshots content/image-provenance.json scripts/checkImageBudgets.mjs src/data/__tests__/screens.test.js
git commit -m "chore(screens): delete the sage-era captures nothing renders any more

public/ is served verbatim, so an unreferenced file is still a URL. Their
provenance backlog entries go with them."
```

---

### Task 3: Night checks, then hand Stage 1 to Ronak

- [ ] **Step 1: Full suite.** `TAKKADA_APP_ROOT=/Users/ronak/.claude/fleet/worktrees/takkada__promote-0907 npm test` — Expected: green. If that worktree is gone, pick another from `ls -d ~/.claude/fleet/worktrees/takkada__*/tool/help/visibility-evidence.json`.
- [ ] **Step 2: Build, dry-run.** `INDEXNOW_DRY_RUN=true TAKKADA_APP_ROOT=… npm run build` — Expected: exit 0, every `check*` guard OK, IndexNow reports a dry run. `grep -rIl "assets/screenshots/" dist | wc -l` must equal the number of pages still carrying a legacy hero or the tour (≈7 HTML files), no more.
- [ ] **Step 3: Shoot the built site.** `npx vite preview --port 4173` in the background, `node scripts/shoot.mjs feature --base http://localhost:4173`, open all 54 PNGs. Acceptance as Task 1 Step 5, on the build.
- [ ] **Step 4: Ledger.** Record in `.superpowers/sdd/2026-09-20-001-…/progress.md`: Task 1-3 commits, the `STILL_REFERENCED` list, the backlog count before/after.
- [ ] **Step 5: Push the branch, no PR.** `git push origin feat/site-revamp-navy`. Tell Ronak in plain words: walkthroughs are copy-only on every page, no card shows a phone, the 24 old captures are gone, backlog cleared; give the numbered check list: (1) open `localhost:4173/tally-reports-on-mobile` → four equal cards in 2×2, no phones below the hero; (2) `/send-payment-reminders-automatically` → 3 + 2 cards, the last two wider; (3) narrow the window to phone width → one column; (4) `/salesman-app-tally` → the tour still shows old phones (Stage 2). Then ask for the seven captures listed under "What Ronak shoots" below.

---

## Stage 2: phones come back through the registry (blocked on Ronak's captures)

### What Ronak shoots (from the demo company, numbers dummy or hidden)

| # | Screen | Registry slug | Unblocks |
|---|---|---|---|
| 1 | Invoice Summary, upper half, party number replaced by a dummy (e.g. 98765 43210) | `invoice-summary` | 17 slots |
| 2 | Invoice Summary, lower half (Amount details, Send via WhatsApp, Generate E-Invoice), dummy number | `invoice-summary-send` | e-invoice / e-way heroes and steps |
| 3 | A WhatsApp chat showing the invoice PDF and the pay link, number hidden | `whatsapp-invoice` | 16 slots |
| 4 | Party detail (Mahalaxmi Kirana Mart) with the Mobile numbers card dummy | `party-detail` | 22 slots |
| 5 | A member's permissions screen | `member-permissions` | 5 slots (rbac) |
| 6 | Beats screen (Team › Beats) | `beats` | tour station 1 |
| 7 | Van screen with a demo driver, not "ronak / 9194…" | `van-loading` | tour station 4, challan steps |
| 8 | Team Sales export after Stage 3 lands on prod | `sheet-salesman` (replace) | Part 3 |

Optional: a visit photo (`field-visit-photo`), five order-link web screens (`order-link-*`). Without them `tally-app-for-fmcg-distributors` step 1 uses `field-visits` and `order-booking-app-tally` stays as it is (consistently old, not mixed).

### Task 4: Register the captures

**Files:**
- Modify: `scripts/screens.manifest.json`, `src/data/screens.js`, `content/image-provenance.json`
- Output: `public/assets/screens/<slug>-360.webp`, `-720.webp`

- [ ] **Step 1: Open each new PNG with the Read tool** and write `shows` from what it shows. Refuse any file that still prints a real number or a real name beside a number.
- [ ] **Step 2: Manifest rows** (one per capture; edit `shows`/`alt` to the pixels):

```json
  { "slug": "invoice-summary", "source": "<file>.png", "shows": "Invoice Summary, upper half: party, invoice number, date, payment due chips, sales ledger", "alt": "Invoice summary with the party, invoice number, date and payment terms" },
  { "slug": "invoice-summary-send", "source": "<file>.png", "shows": "Invoice Summary, lower half: amount details, GST mode, Send invoice via WhatsApp, Generate E-Invoice", "alt": "Invoice summary with the amount, GST mode and the WhatsApp and e-invoice switches" },
  { "slug": "whatsapp-invoice", "source": "<file>.png", "shows": "WhatsApp chat: invoice PDF and the pay link sent to the party", "alt": "WhatsApp chat with the invoice PDF and a pay link" },
  { "slug": "party-detail", "source": "<file>.png", "shows": "Party ledger: to collect, opening balance, sales, invoice rows with Due, Share Statement", "alt": "A party's ledger with the amount to collect and each invoice's due status" },
  { "slug": "member-permissions", "source": "<file>.png", "shows": "Member permissions: what a team member may see and do", "alt": "Permissions for one team member" },
  { "slug": "beats", "source": "<file>.png", "shows": "Beats: routes with salesman and dealer count", "alt": "Beats listing each route with its salesman and dealer count" },
  { "slug": "van-loading", "source": "<file>.png", "shows": "Van: drops in route order with item quantities, Van is loaded", "alt": "A van being loaded drop by drop" }
```

Add the matching `phone('<slug>', '<alt>')` entries to `SCREENS` in `src/data/screens.js`. Run `node scripts/exportScreens.mjs`, read the true 360w height with `sips -g pixelHeight public/assets/screens/<slug>-360.webp` (every phone so far is 746; if a capture differs, give that entry its own height), add one provenance record per exported file in the shape of the existing `public/assets/screens/` records (`kind: "appScreenshot"`, company 143, `reviewedOn`, `origin` naming the source PNG and its `shows`).
- [ ] **Step 3:** `node scripts/checkScreenshotProvenance.mjs && node scripts/checkImageBudgets.mjs && npx vitest run src/data/__tests__/screens.test.js` — Expected: pass. Commit: `feat(screens): <n> captures registered for the walkthroughs`.

---

### Task 5: Steps and stations read the registry; cards get a fixed media band (Option B)

**Files:**
- Modify: `src/data/featurePages.js` (add `stepShot`, next to `heroShot` at ~1426), `src/components/FeaturePage.jsx`, `src/components/FeatureTour.jsx`, `src/feature-page.css` (walkthrough block, `.ftour-phone img`), the four data files, tests `feature-page.test.jsx`, `feature-pages.test.js`

**Interfaces:**
- Produces: a step is `{ icon, title, body, screen? }`; a tour station is `{ title, body, screen }`. `stepShot(step)` → `screen(step.screen)` or `null`. Per page: every step has `screen` or no step has it (test-pinned).

- [ ] **Step 1: Failing tests**

`src/data/__tests__/feature-pages.test.js`:

```js
import { SCREENS } from '../screens';

it.each(FEATURE_PAGES.filter((p) => p.walkthrough?.length).map((p) => [p.slug, p]))(
  '%s: walkthrough phones are all-or-none and every slug is registered',
  (_slug, page) => {
    const withScreen = page.walkthrough.filter((s) => s.screen);
    expect([0, page.walkthrough.length]).toContain(withScreen.length);
    for (const s of withScreen) expect(SCREENS).toHaveProperty(s.screen);
  }
);
it('the tour reads its stations from the registry', () => {
  const tour = FEATURE_PAGES.find((p) => p.tour).tour;
  for (const st of tour.stations) {
    expect(SCREENS).toHaveProperty(st.screen);
    expect(st).not.toHaveProperty('screenshot');
  }
});
```

`src/routes/__tests__/feature-page.test.jsx` (replace the Task 1 `img` assertions):

```jsx
      page.walkthrough.forEach((step, i) => {
        const img = steps[i].querySelector('.feature-step-shot img');
        if (step.screen) {
          const shot = screen(step.screen);
          expect(img.getAttribute('src')).toBe(shot.src);
          expect(img.getAttribute('srcset')).toBe(shot.srcSet);
          expect(img.getAttribute('alt')).toBe(shot.alt);
          expect(img.getAttribute('width')).toBe(String(shot.width));
          expect(img.getAttribute('loading')).toBe('lazy');
          expect(steps[i].firstElementChild.className).toBe('feature-step-shot');
        } else {
          expect(img).toBeNull();
        }
      });
```

and a CSS pin: `.feature-step-shot` declares a fixed `height:` and `overflow: hidden`, and `.feature-step` declares no `max-height`. Import `screen` from `../../data/screens`.

- [ ] **Step 2: Helper and markup**

`src/data/featurePages.js`, after `heroShot`:

```js
// A walkthrough step or tour station names its screen by registry slug, the
// same way the hero does. A page either gives every step a screen or none:
// the fixed media band only lines up when every card has one.
export function stepShot(step) {
  return step?.screen ? screen(step.screen) : null;
}
```

`FeaturePage.jsx` card:

```jsx
                <article key={step.title} className="feature-step">
                  {stepShot(step) && (
                    <div className="feature-step-shot">
                      <img
                        src={stepShot(step).src}
                        srcSet={stepShot(step).srcSet}
                        sizes="208px"
                        alt={stepShot(step).alt}
                        width={stepShot(step).width}
                        height={stepShot(step).height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  )}
                  <div className="feature-step-copy">…unchanged…</div>
                </article>
```

`FeatureTour.jsx` station image: `const shot = screen(station.screen);` then `src={shot.src} srcSet={shot.srcSet} sizes="200px" alt={shot.alt} width={shot.width} height={shot.height}` (the hard-coded `600`/`1242` go).

- [ ] **Step 3: CSS (Option B)**

```css
/* Media band first, fixed height, so every phone in a row starts at the same
 * y and is cut at the same y whatever the copy below it does. The band shows
 * the top of the screen (app bar and first rows), which is the part that
 * names the feature. */
.feature-step {
  padding: 0;
  overflow: hidden;
}

.feature-step-shot {
  height: 220px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background: var(--color-wash);
}

.feature-step-shot img {
  display: block;
  width: 208px;
  height: auto;
  margin-top: 20px;
  filter: drop-shadow(0 10px 20px rgba(10, 23, 48, 0.14));
}

.feature-step-copy {
  padding: 24px 28px 28px;
}
```

If Ronak chose **Option A** instead: keep `.feature-step { padding: 28px 28px 0 }`, put the band last in the markup, and use `.feature-step-copy { flex: 1 } .feature-step-shot { margin-top: auto; height: 200px; overflow: hidden; }` with the same `img` rule minus `margin-top`.

- [ ] **Step 4: Data.** Apply the replacement table (Part 1) page by page. Rule: a step gets `screen` only if the screen shows what the step's `title`+`body` say; where `party-ledger` was the old image, use `party-detail` unless the step is about dues/open bills, then `receivables-report`. When a page cannot be completed, leave it copy-only. Tour stations: `beats`, `field-visits`, `godown-stock`, `van-loading`, `whatsapp-invoice`, `salesman-summary`. Record every step's before → after and the reason in the task report; Ronak reads it. Replace the legacy `hero.image` blocks (7 pages) whose screen now exists (`e-invoice-from-phone` → `invoice-summary-send`, `e-way-bill-from-phone` → `invoice-summary-send`, `credit-note-from-phone` stays unless a credit-note capture arrives, `custom-invoice-template-tally` → `invoice-summary`, `multi-company-tally-reports` and `tally-app-for-agri-input-distributors` → whichever the copy supports, else keep).
- [ ] **Step 5: Copy check.** For every step that got a screen, read title + body beside the screen; change the minimum words so the text is true of the screen (the Task 8 discipline of the 09-19 plan). Run `npx vitest run src/data/__tests__/feature-pages.test.js src/data/schema.test.js src/__tests__/claims-guard.test.js` and `node scripts/checkRetiredClaims.mjs`.
- [ ] **Step 6: Shoot and look.** `node scripts/shoot.mjs feature`; open all 54 PNGs. Acceptance: on every page with phones, every band in a row starts and ends at the same y; each visible crop shows the app bar and first rows of the right screen; copy never touches an image; at 390 one column, band intact; pages without a complete set are copy-only and look like Stage 1.
- [ ] **Step 7: Repeat Task 2 Step 1-3** for the files the tour and legacy heroes released; commit per family: `feat(feature-pages): <family> walkthroughs show the current app`.
- [ ] **Step 8: Night checks as Task 3**, push, no PR, numbered check list for Ronak.

---

## Stage 3: the Team Sales sheet names people (`supabase-functions`)

### Task 6: `seed_demo_company_salesmen` also attributes receipts

**Files:**
- Create: `supabase/migrations/<max+1>_demo_receipts_attributed_to_salesmen.sql` (number above `origin/stage`'s max; `20261029900100` at planning, re-check with `git ls-tree --name-only origin/stage supabase/migrations/ | sort | tail -1`)
- Create: `supabase/tests/demo_receipts_attributed_to_salesmen_regression.sql`
- Worktree: `cd /Users/ronak/Desktop/PaySaathi/supabase-functions && git worktree add ../sf-wt-demo-receipts -b fix/demo-receipts-attributed-to-salesmen origin/stage`

**Interfaces:**
- Consumes: the LIVE body of `seed_demo_company_salesmen(integer)` (`select pg_get_functiondef('public.seed_demo_company_salesmen(integer)'::regprocedure)` on stage; the migration file is stale by definition), `v_members` (six `@shreejidemo.invalid` fixtures), `paysathi.is_projection` escape hatch (the receipts table carries `paysathi_receipts_update_ledger_balance_trigger`).
- Produces: every demo receipt's `client_id` is one of `v_members`, dealt round-robin per month by amount, the same way invoices are.

- [ ] **Step 1: Failing regression test** (`supabase/tests/demo_receipts_attributed_to_salesmen_regression.sql`, in the DO-block RAISE pattern of `supabase/tests/reset_demo_company_restore.sql`):

```sql
-- After the seeder runs, no demo receipt may sit under an id that is not a
-- roster member: the Team Sales export labels such a row "Member" and cannot
-- group it (2026-09-20, plan 2026-09-20-001 Part 3).
begin;
do $$
declare v_demo int; v_bad int;
begin
  select id into v_demo from public.companies where is_demo and no_tally_mode order by id limit 1;
  if v_demo is null then raise exception 'no demo company on this database'; end if;
  perform public.seed_demo_company_salesmen(v_demo);
  select count(*) into v_bad
  from public.paysathi_receipts r
  where r.company_id = v_demo
    and r.is_cancelled is not true
    and not exists (
      select 1 from public.user_companies uc
      join auth.users u on u.id = uc.user_id
      where uc.company_id = v_demo and uc.status = 'active'
        and u.email like '%@shreejidemo.invalid' and u.id = r.client_id);
  if v_bad > 0 then
    raise exception 'demo receipts not attributed to a demo salesman: %', v_bad;
  end if;
end $$;
rollback;
```

Run it against stage the way the suite runs (see `testing_ps` for the runner; a plain `execute_sql` of the file body from the first `begin;` is acceptable for a first red). Expected: RAISE with a count > 0 (54 on stage today).

- [ ] **Step 2: Migration.** Capture the live body (Interfaces), then in the new file `CREATE OR REPLACE` it with one addition after the invoice update and before `set_config('paysathi.is_projection', 'off', true)`:

```sql
  -- Receipts: the export and the leaderboard read a receipt's entrant from
  -- client_id (team_sales_countable_receipts). The dataset seeder stamps a
  -- random uuid there, so every receipt printed as "Member". Same deal as the
  -- invoices: per month, by amount, round-robin onto the fixtures.
  with ranked as (
    select r.id,
           (row_number() over (
              partition by date_trunc('month', r.voucher_date)
              order by r.amount desc, r.id
           ) - 1) as seq
    from public.paysathi_receipts r
    where r.company_id = p_company_id
  )
  update public.paysathi_receipts r
     set client_id = v_members[(k.seq % v_n) + 1]
  from ranked k
  where r.id = k.id
    and r.client_id is distinct from v_members[(k.seq % v_n) + 1];
```

Keep every other line of the live body byte-identical (the migration replaces the whole function; `pg_get_functiondef` bodies carry no trailing `;`, add it). Keep `revoke all … from public, anon, authenticated;` and the `comment on function`, extending the comment with "and its receipts".

- [ ] **Step 3: Prove on stage, rolled back.** `begin; <migration body>; select public.seed_demo_company_salesmen(112); select count(*) from public.paysathi_receipts r where r.company_id=112 and not exists (select 1 from auth.users u where u.id=r.client_id); rollback;` — Expected: `0`. Then run the regression test (Step 1) inside the same rolled-back transaction: passes.
- [ ] **Step 4: Suite and ship.** Run the sf test suite the way `testing_ps` says; push `fix/demo-receipts-attributed-to-salesmen` to `stage` via PR; watch the stage deploy (a new function reading `trn_voucher` is not involved, so the straggler-invariant allowlist is not touched). After the deploy, `select public.reset_demo_company();` is NOT run by hand on prod: the nightly reset (21:00 UTC) calls `seed_demo_company_salesmen` and re-attributes. Next morning, on prod (read-only): `select count(*) from public.paysathi_receipts r where r.company_id=143 and not exists (select 1 from auth.users u where u.id=r.client_id)` → `0`. Then Ronak exports the Team Sales sheet from the app; it lists Amit Shah, Priya Desai, Rajesh Patel, Nikhil Joshi, Sunita Mehta with both sales and receipts and no "Member" row. That PNG is capture #8 for Task 4.
- [ ] **Step 5: Commit** (`fix(demo): seed attributes receipts to the demo salesmen, so Team Sales exports name people`) and record the prod count in the ledger.

---

## Self-review notes

- Brief coverage: Problem 1 (mixed generations) → Task 1 removes the old generation today, Tasks 4-5 bring the new one in; the 24-image inventory and truthful replacements are Part 1. Problem 2 (alignment, orphan) → Task 1 (grid), Task 5 Step 3 (fixed band). Problem 3 ("Member" ×9) → Part 3 diagnosis, Task 6 fix, capture #8 replaces `sheet-salesman`. Ask 1 (does a capture exist per image) → Part 1 second table. Ask 2 (layout options, not one answer) → Part 2. Ask 3 (staged plan) → three stages, each ending in screenshots and a hand-back.
- Names used across tasks: `stepShot(step)`, `step.screen`, `station.screen`, `data-steps`, `.feature-step-shot`, `STILL_REFERENCED`, registry slugs `invoice-summary`, `invoice-summary-send`, `whatsapp-invoice`, `party-detail`, `member-permissions`, `beats`, `van-loading`, `sheet-salesman`.
- Deliberately not done: no "Unassigned" fold in the export RPC (the data fix removes the case; a label change would be a second copy of the rule); no new screens registered in Stage 1 (nothing renders them yet); `order-booking-app-tally` left consistent-old rather than half-new.
- Open after this plan: the 7 legacy-hero pages until their captures exist; `credit-note-from-phone` and `e-way-bill-from-phone` still have no screen of their own feature; OG/blog card images still green/Fraunces (carried from the 09-19 ledger).

---

## Owner rulings (2026-09-20 afternoon). These override Part 2 and the Stage 1/2 split above.

1. **Retouch, do not wait.** Party Detail and both Invoice Summary mockups: replace the real number with **9435977777** and publish. The Van screen (`Van Loading.png`, "ronak / 9194…") is published as it is. So `party-detail`, `invoice-summary`, `invoice-summary-send` and `van-loading` are available now; `van-loading` comes off the BLOCKED/REJECTED lists in `feature-pages.test.js` and `journey.test.js`.
2. **Placeholders, not copy-only.** Stage 1's copy-only walkthrough is dropped. Wherever a step's truthful screen is still to be shot (WhatsApp chat, member permissions, Beats, visit photo, order link, an e-way screen) the step keeps its OLD image until the capture lands. `stepShot(step)` therefore resolves three shapes: `screen` slug, legacy `{ image, alt, width, height }`, legacy station `{ screenshot, screenshotAlt }`. A test pins the exact placeholder set so nothing else drifts back.
3. **Layout:** Option B (phone-first fixed band) as written in Task 5 Step 3. Ronak has seen it on localhost (screenshot 13:36) and has not asked for a change.
4. **Plan executes it, not the assistant by hand.** Nothing from this plan is on `feat/site-revamp-navy` beyond `34187a0`. A hand-built reference of Tasks 1, 4, 5 and the new Task 7 exists on branch **`wip/2026-09-20-walkthroughs-reference`** (`28c11ee` screens, `72e5126` registry + band, `13ce9e3` in-detail section, `09fb38c` docs). The executor may read it and cherry-pick, but each task still ends with its own tests and screenshots before its commit lands on the feature branch. Traps recorded there: `npx prettier --write` with no repo config double-quotes everything, run it with `--single-quote --print-width 100` and never on the four `featurePages*.js` data files (prettier 3 reflows their `body:` strings); a script walking those files must skip `//` comments (they contain backticks and apostrophes) and a page object can open with a comment before `slug:`. Retouched mockups sit beside the originals in the git-ignored `mockups/` folder as `<name> 9435977777.png`.

### Revised task order

| Task | What changes from the text above |
|---|---|
| Task 4 first | Register `invoice-summary` (from `Invoice summary 9435977777.png`), `invoice-summary-send` (`Auto einv and eway 9435977777.png`), `party-detail` (`Party Detail 9435977777.png`), `van-loading` (`Van Loading.png`), plus `add-items` (#10), `invoice-settings` (#13) and `collections-outstanding` (#26). `invoice-settings` needs `"q": 66` to stay under the 720w budget. Provenance origin text says the number was replaced at Ronak's instruction; do not print the number itself in JSON. |
| Task 5 | Step 4's all-or-none rule becomes the placeholder rule (ruling 2). Mapping per slot: see the wip branch's four data files, or re-derive from the Part 1 table. Legacy heroes move: `e-invoice-from-phone` → `invoice-summary-send`, `e-way-bill-from-phone` → `van-loading`, `credit-note-from-phone` and `custom-invoice-template-tally` → `invoice-summary`, `multi-company-tally-reports` → `home`, `tally-app-for-agri-input-distributors` → `sales-analytics`; `order-booking-app-tally` keeps its own. Add a `walk` set to `scripts/shoot.mjs` (each page at `#walkthrough`, the tour page at `#tour`) and shoot it at both widths. |
| Task 1 | Only its grid fix (six tracks, 4 → 2×2, 5 → 3 + 2) survives, inside Task 5's CSS. No copy-only state. |
| Task 2 | Runs AFTER Ronak's remaining captures land, since the placeholders still render the old files. |
| Task 3 | Night checks and push, unchanged, after Task 5 and Task 7. |
| Task 6 | Unchanged (`supabase-functions`, the "Member" rows). |
| **Task 7 (new): "In detail" on the import pages** | Ronak (13:20): the document-import manual describes the feature at length and `import-purchase-from-pdf` says none of it (he cited pazy.io's invoice-automation guide as the depth he wants). Add an optional `page.detail = { overline, heading, intro, groups: [{ title, points: [] }], guide: { slug, label } }`, rendered between the tour and the comparison table as `.tally-card`s with a list each and a link to `/guide/import-documents`. Fill `import-purchase-from-pdf` (7 topics), `bank-statement-import-tally` (5) and `handwritten-order-to-tally` (4) from the **Live** rows only of `/Users/ronak/Desktop/PaySaathi/docs/manuals/document-import-capabilities.md` (2026-09-13); Stage-only and built-switched-off rows stay out (Disc% and tax-inclusive reading, bulk import, item-master fill, sales-import memory). No rupee amounts, no em-dashes, ≤ 48 words a point. Tests: one card per topic, the guide file exists, the three slugs and no others. Shoot each page at `#detail`, both widths. The finished copy is on the wip branch (`13ce9e3`). |

**Still owed by Ronak:** WhatsApp chat with an invoice and pay link (16 slots), a member's permissions screen (5), Beats (tour station 1); optional: a visit photo, the five order-link screens, an e-way bill screen. Then the Team Sales sheet after Task 6.
