# Site revamp: navy brand, playable phone, "Follow one invoice"

Date: 2026-09-18
Status: design approved in brainstorm, awaiting spec review
Prototypes (throwaway HTML, approved direction): `.superpowers/brainstorm/28334-1789722237/content/` in the main checkout (`idea-phone.html`, `idea-invoice.html`)
New assets: `public/assets/screenshots/latest mockup/` (48 PNGs: 44 phone screens, 4 printed sheets)

## Why

The app moved to a navy and blue look. The site is still sage green with a Fraunces serif, so the site and the product read as two brands. The homepage also lists features as a grid, which undersells 48 screens of real product. The goal is a site that looks better than a funded startup's and sells features through the product itself.

## Decisions made with Ronak

1. **Site matches the app.** Navy and blue tokens, Plus Jakarta Sans everywhere. Fraunces is retired.
2. **Dark hero.** Navy hero that continues the app's own header, light sections lower down.
3. **Scope.** Real redesign for Homepage, Features hub, and the feature-page template. Blog, partners, comparison, company and legal pages get the new tokens and type only.
4. **Hero = playable phone.** The real home screen with tappable tiles. Tapping opens the real screen for that feature and swaps the headline beside it.
5. **Story = "Follow one invoice".** One invoice slip stays pinned while the visitor scrolls seven stops. It gets rubber-stamped at each stop. Features hang off stops as links to their feature pages.
6. **Printed sheets appear as paper.** The loading sheet / picking list shows at the Load stop. The salesman summary export shows at the last stop. Both sit tilted behind the phone and enlarge on tap.
7. **The "₹17Cr+ collected monthly" claim is removed from the whole site.** "100+ businesses" stays.

## Design tokens (replace `:root` in `src/styles.css`, then re-sync landing `CLAUDE.md` §6 and §7)

Values are the app's own **Marine** palette, read from `takkada` `origin/stage:lib/theme/color_palettes.dart` on 2026-09-18 (Tally blue primary, deep navy hero band, marigold strictly as an accent dot). The site uses these hexes exactly.

| Role | Token | Value (Marine name) |
|---|---|---|
| Action blue: buttons, links, icons | `--color-primary` | `#006EA6` (seed) |
| Navy band | `--color-navy` | `#1E3A6B` (primaryContainerDark) |
| Deepest navy: hero, story band, footer | `--color-primary-dark`, `--color-ink`, `--color-dark` | `#0F1F3D` (gradientDarkTop) |
| Hero gradient | | `#0F1F3D` → `#1E3A6B`, lifting to `#2B5290` |
| Secondary cyan-blue | `--color-primary-light` | `#149EC2` |
| Sky, emphasis words on dark | `--color-accent` | `#8FB4C7` lightened to `#9CCBEA` for AA on navy |
| Wash, icon containers | `--color-wash` | `#DCF2FB` (primaryContainer) |
| Marigold: hot dots, time labels, active stop. Never on buttons | `--color-highlight` | `#FCAF1B` (accentDot) |
| Page background / surface variant | `--color-bg` / `--color-surface` | `#F7FAFC` / `#EEF5FA` |
| Text / secondary / muted | | `#0E1C2A` / `#44687D` / `#8FB4C7` |
| Border / chip | | `#D4E6F0` / `#EAF3F9` |
| Success / warning / danger | | `#059669` / `#D97706` / `#DC2626` (unchanged, same as app) |
| Paper, slip and sheets only | `--color-paper` | `#FBF9F2` |
| Stamp inks, slip only | | blue `#1F5FBF`, green `#0E8A5F`, red `#C2372F` |

- Old sage token names that components still reference are kept as aliases pointing at the new values for one release, then deleted. No sage hex survives anywhere.
- Shadows change tint from green-ink to navy `rgba(10,23,48,…)`.
- Type: Plus Jakarta Sans for display and body (800 hero, 700 headings). IBM Plex Mono as the one utility face, used only for the slip, time labels and stop labels. Self-hosted through `scripts/vendorFonts.mjs`. Fraunces files, `@font-face` rules, preload and `premium.css` re-point are removed.
- Motion: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`. Press feedback `scale(0.97)` on every button. Hover effects gated behind `(hover: hover) and (pointer: fine)`. All motion honours `prefers-reduced-motion`.

## Homepage, top to bottom

1. **Hero (deep navy).** Left: overline, H1, one sentence, primary CTA "Try the live demo". Centre: playable phone. Right: six job buttons (Collect, Bill, Dispatch, Stock, Team, Reports) that open the same screens, so keyboard and non-tappers get the same result.
   - 9 hotspots on `homepage.png`: Import, Reminders, Stock, Team, Pending, Dispatch tiles, plus Parties, Collect, Reports in the bottom nav. Amber dot marks each.
   - Open: target screen fades and scales in from the tapped tile's position (260–320ms). Headline, body and a "See how it works" link swap with a short blur crossfade. "Back to home screen" returns.
   - Hotspots are real `<button>`s with labels and visible focus. Initial H1 and copy are server-rendered for SEO; swapped copy is enhancement only.
   - Mobile: phone on top, job buttons become a horizontal chip row under it.
2. **Proof strip.** "100+ businesses" and named-place depth signals. No rupee-volume claim.
3. **Follow one invoice (deep navy band).** Pinned slip on the left, seven stations on the right.

   | Stop | Time label | Screen | Stamp | Feature links |
   |---|---|---|---|---|
   | Order | 10:40 AM, retailer's counter | Pending order | ORDER #118 | Salesman access, Pending orders, Field visits, Sales targets |
   | Bill | 11:05 AM, office | Auto einv and eway | IRN + E-WAY ✓ | Mobile invoicing, E-invoice, E-way bill, Maker checker, Import from PDF |
   | Load | 1:30 PM, godown | Van Loading + **loading sheet paper** | ON VAN 2 | Van loading, Picking list, Godown wise stock, Beat selection |
   | Send | 1:31 PM, retailer's phone | making challans & invoices | WHATSAPP ✓✓ | Auto invoice dispatch, Custom invoice template, Statement sharing |
   | Remind | Day 28, 10:00 AM | Reminder payment | REMINDED | Auto reminders, UPI collection, Payment behaviour |
   | Recover | Day 30, no reply yet | followup log, then Recovery dashboard team logging (phone cycles the two) | AI CALLED · WILL PAY, then PAID | **AI calling**, Follow-up log, Promise to pay, Recovery dashboard, Team recovery |
   | Tally | Day 31, 9 PM (paid that afternoon) | Settlements + **salesman summary paper** | IN TALLY ✓ | Auto reconciliation, Settlements, 20+ reports, Sales analytics |

   - The slip is HTML, not an image: party, place, four item lines, total, a status line that changes per stop. Stamps land with a scale 1.5 → 1 "thunk" (260ms) and lift off again when scrolling back up. Transitions, not keyframes, so they reverse cleanly.
   - The numbering is a true sequence, which is why stops are ordered and timed.
   - Only feature links that resolve to an existing feature page are rendered. A missing page means the pill is dropped, never a dead link.
   - Mobile: the slip collapses to a pinned bar showing invoice number, current status and the latest stamp. Stations stack, phone under text.
4. **Works with your Tally** trust band (existing content, new look).
5. **Pricing, data safety, FAQ, final CTA** on light. Content and pricing logic untouched; restyled by tokens.

Removed from the homepage: the "And The Rest" capability grid, the alternating story sections, the AI import section as a standalone band (it lives at the Bill stop).

### AI calling (new feature, Recover stop)

- Story beat: the WhatsApp reminder went unanswered, so Takkada calls the party in their own language, records what they said ("will pay by 22 Sep"), and the promise shows on the recovery board. The salesman's own calls are logged on the same screen.
- Visuals: the two real recovery screenshots (follow-up log with "Already tried" history and promise-to-pay, and the Recovery Team tab with Recovered, Dealers worked, Promises kept). A small HTML call chip sits beside the phone: "AI call · 1m 42s · Will pay by 22 Sep". The chip is illustrative and must match how the real call outcome is logged; confirm with Ronak before build.
- Claims: AI calling is developed (Ronak, 2026-09-11) and may be written in the present tense. Every mention carries "charged on connected minutes" so nobody reads it as bundled into a plan. No per-minute price on the homepage unless Ronak says so.
- It also gets a hero job button ("Recover") and its own feature page if one does not exist yet (one new page is in scope; copy from Ronak's facts only).

## Features hub

Grouped by the same seven stops instead of the current groups. Each group header shows its stamp and one screen. `src/data/featureGroups.js` is the single place the grouping lives; the homepage stations and the hub both read from it.

## Feature-page template

Navy header band with the feature's real screen from the new mockups, breadcrumb, and a "where this sits in the invoice's journey" strip that highlights its stop. Body, FAQ, schema and internal links unchanged.

## Asset pipeline

- Source PNGs are 1–2 MB. Each used screen is exported to WebP at two widths and renamed to a kebab-case slug under `public/assets/screens/`. Originals stay out of the build. `scripts/checkImageBudgets.mjs` must pass.
- Duplicate files in the mockup folder (`-1` suffixes) are ignored.
- One screen-to-feature map in `src/data/` so hero hotspots, stations and feature pages share one source.

## Content source: capability files (whole site)

Ronak's direction (2026-09-18): every feature on the site is described from the product's real spec, the way `PaySaathi/docs/manuals/document-import-capabilities.md` does it. That file is the model: each capability is a table row read from the code, with a status of **Live**, **Stage only** or **Built, switched off**.

- Each feature family gets one capabilities file in `PaySaathi/docs/manuals/<family>-capabilities.md`, written from the code on `origin/stage` and checked against `origin/main`, same status labels. Existing sources to start from: `document-import-capabilities.md`, `loading-sheet-manual.md`, `stock-control-manual.md`, `autoparts-billing-manual.md`, and the 21 live guides in `content/guide/`.
- Site copy (homepage stops, hero screens, hub, feature pages, FAQ, schema) may only state **Live** rows. Stage-only and switched-off rows never reach the site. AI calling is the one exception already cleared by Ronak, with "charged on connected minutes".
- Each feature page gains a "What it can do" section generated from the Live rows, so the page is specific (file types, limits, entry points, what gets written to Tally) instead of general.
- Example the homepage must carry, from the spec: at the Bill stop, "make invoices for many orders in one go, each with its e-invoice and e-way bill" (the Review invoices / Create 7 invoices screen).
- This is a second track that runs beside the design track. Design ships with today's copy where a capabilities file is not ready; pages are upgraded family by family as files land. The feature-by-feature gap map (which families have a file, a guide, a page, a screenshot) is appended below once research finishes.

## Claims and copy

- Remove "₹17Cr+ collected monthly" everywhere it renders: homepage proof strip, CountUp test, schema, blog CTAs, `llms.txt` generator, OG cards. Update landing `CLAUDE.md` §5 and §11.4 so the only public scale figure is "100+ businesses". Add a build guard that fails on the phrase returning.
- All landing `CLAUDE.md` voice rules still apply: no em-dashes, no contrast structures, tabular numerals on every figure, distributor-first framing.
- Every capability named on a stop must be live on prod. Verify against prod entitlements before the copy is final, per the pricing section's claims discipline.

## What stays the same

Vite + React + `vite-react-ssg`, plain CSS, no Tailwind, no animation library (CSS transitions and one IntersectionObserver hook). SEO contract in `CLAUDE.md` §9. Pricing data and tests. Blog content. All build guards.

## Testing

- Unit: screen-to-feature map has no broken slugs; every station link resolves; hotspot buttons open the right screen and restore on Back; reduced-motion path renders without transforms.
- Guard: no sage hex, no `Fraunces`, no "17Cr" in `src/`, `content/`, `index.html` or built `dist/`.
- Build: `npm run build` green, prerender checks green, image budgets green.
- Eyeball: `npm run preview`, walk home, hub, two feature pages, one blog post, on desktop and phone width. Ronak looks before the PR merges.

## Shipping

Branch `feat/site-revamp-navy` in worktree `~/.claude/fleet/worktrees/landing__site-revamp`. Build order on the branch: (1) tokens + type, (2) asset pipeline + hero, (3) follow-one-invoice, (4) hub + feature template. Nothing merges to `main` until all four are done and Ronak has looked, because new tokens under the old layout would go live half-done (Cloudflare deploys on merge). The one exception is the "₹17Cr+" claim removal, which ships first as its own small PR.

## Out of scope

Redesign of blog, partners, comparison, ICP and legal pages. New copy for feature-page bodies. Pricing changes. Video. The "A day at your shop" idea (kept as a possible future campaign page).

## Appendix: feature gap map (research 2026-09-18)

Paths are under `/Users/ronak/Desktop/PaySaathi/`. "Capabilities file" means a code-verified `docs/manuals/*-capabilities.md`. Only document import has one today; every other family needs one written before its page copy is upgraded.

| Family (stop) | Best existing sources | Site page today | Needed |
|---|---|---|---|
| Bulk invoices from orders + e-inv/e-way (Bill) | `docs/plans/2026-09-01-003-fix-dispatch-bulk-invoice-…-plan.md`, `docs/brainstorms/2026-07-24-pending-order-addon-requirements.md`, e-way plans `2026-09-05-005`, `2026-09-08-002` | e-invoice and e-way pages only | Capabilities file, **new page** "many invoices in one go" |
| Van loading, beats, picking list, load grid (Load) | `docs/manuals/loading-sheet-manual.md`, `docs/brainstorms/2026-09-06-dispatch-one-van-page-requirements.md`, `2026-08-28-dispatch-load-lifecycle…`, `2026-08-11-beat-dispatch-load-sheet…`, guide `dispatch.md` | none (nearest: delivery challan) | Capabilities file, **new page** |
| Godown-wise stock and item selection (Load) | `docs/manuals/stock-control-manual.md`, `docs/plans/2026-09-08-003-feat-godown-wise-stock-in-cart-and-block-plan.md`, `docs/brainstorms/2026-07-25-godown-register…` | 7 pages | Capabilities file, refresh |
| Document and bank statement import (Bill) | `docs/manuals/document-import-capabilities.md`, `docs/sales/takkada-document-import-brief.html` | 5 pages; none for sales-invoice or purchase-order import | Refresh from the file; bulk import (12 at once) is **switched off**, keep off the site |
| Maker-checker approvals (Bill) | `docs/brainstorms/2026-08-31-maker-checker-voucher-approval-requirements.md`, `docs/plans/2026-09-08-005-…` | none | Capabilities file, **new page** |
| Recovery dashboard, follow-up log, promise to pay, team recovery, payment behaviour (Recover) | `docs/brainstorms/2026-08-23-recovery-owner-view…`, `2026-08-25-recovery-team-board-table…`, `docs/plans/2026-08-17-001-…daily-brief…`, `docs/marketing/report-explainers/01-collections.md` | none for the dashboard | Capabilities file, **new page**. Owner view was stage-only for one client when written: verify Live first |
| AI calling (Recover) | none in the tree; facts come from Ronak | none | Ronak supplies the facts; **new page**; "charged on connected minutes" |
| Reminders, statements, settlements, UPI (Remind) | `docs/brainstorms/2026-08-24-smart-reminders-custom-cadence…`, `2026-08-21-bills-receivable-party-page-ageing-pdf…`, guides `whatsapp-reminders.md` | 11 pages; none for reminder logs or settlements | Capabilities file, refresh. UPI **QR** is not built: keep off the site |
| Team: targets, commission, field visits, salesman summary export (Order, Tally) | `docs/brainstorms/2026-07-07-team-sales-module…`, `2026-07-27-field-visit-tracking…`, `docs/plans/2026-09-06-004-feat-team-sales-daily-weekly-export-plan.md` | 6 pages; none for targets, commission or the export | Capabilities file, **new page** |
| Reports and analytics (Tally) | `docs/marketing/report-explainers/` (7 files), `docs/brainstorms/2026-08-03-sales-analytics…`, `docs/plans/2026-09-14-001-feat-sales-purchase-by-item-reports-plan.md` | 9 pages; none for analytics, item-wise or Total FY | Capabilities file, **new page** for analytics |
| Invoice settings, template, notifications | `docs/plans/2026-09-05-015-feat-invoice-settings-defaults-and-locks-plan.md`, `docs/brainstorms/2026-08-12-push-notification-system…` | template pages only | Capabilities file, fold into existing pages |

Add-on wording the site must keep: Pending Orders, Team Sales (beat dispatch and load sheet ship inside it), Field Visits and Sales Analytics (Reports +) are paid add-ons or upper-plan features. Sales by Item, Purchases by Item and the ageing PDF are free.

Plans and brainstorms say what was intended. A capabilities file is only true once each row is read from the code on `origin/stage` and checked against `origin/main`.
