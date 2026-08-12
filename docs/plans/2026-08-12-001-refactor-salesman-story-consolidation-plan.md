---
title: "refactor: One chronological story on the salesman page, wake-on-scroll homepage road"
type: refactor
status: completed
created: 2026-08-12
planning_docs: []
---

# refactor: One chronological story on the salesman page, wake-on-scroll homepage road

**Target repo:** `takkada website/landing` (branch `feat/team-sales-beats-landing`, PR #81 — this plan amends that unmerged branch, so nothing here is a change to the live site until the PR merges).

## Summary

The `/salesman-app-tally` page currently tells its story twice: an 8-card walkthrough grid whose bottom-cropped phones sit at different heights (Ronak: "the phones alignments are fucked"), followed by a 4-station scroll tour that repeats the beats/order/load-sheet content ("looks like we did everything randomly"). This plan replaces both with **one chronological, scroll-driven tour of the salesman's whole day** — six stations, one sticky phone, one quick soft crossfade and nothing else moving. On the homepage, the order-to-cash road keeps its exact look but **wakes when scrolled into view** instead of auto-playing unseen, with the same soft fade.

Both decisions were confirmed by Ronak on 2026-08-12 (option "One chronological tour" for the page, "Wake on scroll + softer fade" for the homepage road, "Keep scroll-swap, minimal" for motion depth).

---

## Problem Frame

- The card grid crops each 600×1242 phone to a ~200px bottom window after variable-length body text, so no two phones align, and 8 cards leave an orphaned 2-card last row.
- The tour below repeats three of the grid's steps (order, load sheet, beats context), so the page reads as two competing narrations of the same day.
- The homepage road auto-advances on a 4.5s timer from page load, even while off-screen — by the time a reader reaches it, it is mid-story at a random station.

## Scope Boundaries

**In scope:** `/salesman-app-tally` story sections; the shared FeaturePage template's rendering contract and data tests; the homepage RoadSection's start condition and crossfade softness (behavior only, zero layout/visual change).

**Out of scope (non-goals):**
- The other 26 feature pages keep their card-grid walkthroughs untouched (their 6-step grids were never flagged).
- Homepage Team Sales story section (5-step rail) stays as shipped in PR #81.
- No new screenshots; all six tour screens are already-shipped sanitised mockups.

### Deferred to Follow-Up Work
- Auditing the other feature pages' grids for the same crop-misalignment (only if Ronak flags them).
- Removing now-orphaned assets if any (e.g., `sales-target-mockup` if nothing references it after this change) — verify references before deleting, separate commit.

---

## Key Technical Decisions

1. **The tour replaces the walkthrough on this page, not site-wide.** `FeaturePage.jsx` renders the card-grid section only when `page.walkthrough` is non-empty; the salesman entry drops `walkthrough`/`walkthroughHeading` and carries a 6-station `tour`. Every other page is untouched data-wise and render-wise.
2. **Six stations, strictly chronological (morning → evening):** beat → check-in with geo-photo proof → order against live stock → godown loads by route → invoice + Pay link on WhatsApp → watch the day / leaderboard. RBAC does not become a station (it would break the timeline — the "random" feel Ronak flagged); it survives as a one-line footnote under the tour plus its existing FAQ and comparison-table presence.
3. **Minimal motion (Ronak's call):** the scroll-swap is structural (one phone, six screens), so it stays; the crossfade is opacity plus a slight blur bridge only — the scale transform goes. Inactive stations keep the opacity dim (it is the "where am I" affordance, not decoration). Reduced motion keeps the instant-swap behavior already shipped.
4. **Homepage road: gate the existing timer on visibility, change nothing else.** An IntersectionObserver starts the auto-advance when the section is meaningfully in view and pauses it when it leaves. Click/hover/reduced-motion behavior, layout, and CSS classes stay identical; the phone crossfade gains the same soft blur bridge. If `IntersectionObserver` is unavailable (old browsers, jsdom), fall back to today's behavior so tests and edge browsers see no regression.
5. **Close the test gap this exposes:** the data test's image-existence and real-customer-capture sweeps currently only scan `hero` + `walkthrough`; they must also sweep `tour.stations`, and the Article-schema image fallback in `FeaturePage.jsx` (`walkthrough[0]?.image`) needs a hero/tour fallback for a page with no walkthrough.

---

## Implementation Units

### U1. Salesman page data: one 6-station tour

**Goal:** The salesman entry tells the day once, chronologically.
**Dependencies:** none.
**Files:** `src/data/featurePages.js`.
**Approach:** Remove `walkthrough` and `walkthroughHeading` from the `salesman-app-tally` entry. Rewrite `tour` to six stations in day order (screens: `beats-mockup`, `field-visits-feed-mockup`, `add-items-mockup`, `beat-load-sheet-mockup`, `whatsapp-dispatch-mockup`, `team-sales-hub-mockup`), merging the best sentences from the deleted cards — check-in copy carries the geo-photo proof claim so nothing verified is lost. Tour heading reframed to cover the whole day (e.g. the walkthrough's "One shop visit, start to finish" spirit), overline stays "Order to money"-adjacent or becomes "One day on a beat" — final wording at implementation, voice rules §5 apply (no em-dashes, no contrast structures). Add `tour.footnote` carrying the RBAC line ("View and create rights are set per register, per person…"). Hero, answer block, SEO, FAQs, comparison, relatedPosts unchanged.
**Patterns to follow:** station shape already in the entry; footnote pattern from `storyOrderToCash.footnote` in `src/data/siteContent.js`.
**Test scenarios:** covered by U2's contract tests (data-only unit). Verify by U2 suite: salesman page has no walkthrough, 6 tour stations, every station image exists on disk and is in the sanitised set, footnote non-empty.

### U2. Template + test contract: walkthrough optional when a tour exists

**Goal:** The shared template and data tests treat "walkthrough OR tour" as the page's story requirement, and every guard that swept walkthrough images now sweeps tour images too.
**Dependencies:** U1.
**Files:** `src/components/FeaturePage.jsx`, `src/data/__tests__/feature-pages.test.js`, `src/routes/__tests__/feature-page.test.jsx`.
**Approach:** Render the walkthrough `<section>` only when `page.walkthrough?.length`. Article schema image: fall back `walkthrough[0]?.image → tour first station → hero.image`. Data test changes: (a) every page must have `walkthrough.length > 0 || tour.stations.length > 0`; (b) walkthrough-shape tests (icons resolve, step images exist/sized) iterate only pages that have one; (c) image-existence and `isUnsafe` real-capture sweeps extend `used` with `...(page.tour?.stations.map((s) => s.screenshot) ?? [])`; (d) placeholder-asset sweep gets the same extension. Route test: assert the salesman page renders exactly one story section (tour present, no `.feature-steps` grid) and other pages still render their grids.
**Test scenarios:**
- Salesman page: renders `.ftour` with 6 stations and no walkthrough grid; Article schema still carries a non-empty image.
- Any other page (e.g. `payment-collection-tally`): walkthrough grid renders exactly as before (regression).
- Contract: a hypothetical page with neither walkthrough nor tour fails the data test (guard actually bites — watch it go red by asserting against a stub, or temporarily, per testing_ps evidence bar).
- Sweep: a tour station pointing at a non-existent file fails; a tour station pointing at a known-unsafe capture (e.g. `share-ledger`) fails.
**Verification:** full `npm test` green; deliberately breaking one guard goes red.

### U3. Tour presentation: minimal-motion and alignment pass

**Goal:** The tour reads calm and aligned: stations flush on a shared left edge, phone steady, one quick soft crossfade.
**Dependencies:** U1.
**Files:** `src/feature-page.css`, `src/components/FeatureTour.jsx` (comment header updated to the reduced motion contract).
**Approach:** Drop the `scale(0.985)` from the crossfade (opacity + 2px blur bridge only, ~0.35–0.45s ease-out). Verify number-circle / title baseline alignment and consistent station spacing at 1280px and 390px; keep the `min-height` scroll bands and the center-band observer as shipped. Keep inactive-station dimming and the sticky-top clamp. No new patterns.
**Test scenarios:** `Test expectation: none — presentation-only CSS; verified visually in U5's preview walk (both viewports, screenshots to Ronak).`

### U4. Homepage road: wake on scroll, softer fade, look unchanged

**Goal:** The road starts its story when the reader arrives at it and pauses when they leave; the crossfade gets the soft blur bridge. Pixel-identical at rest.
**Dependencies:** none (parallel to U1–U3).
**Files:** `src/routes/Home.jsx` (RoadSection), `src/home.css`.
**Approach:** Add an in-view state via IntersectionObserver on the tour wrapper (threshold around 0.3–0.4); the existing desktop timer effect additionally requires in-view. Preserve exactly: click-to-drive (`userDrove`), hover pause, mobile scroll-driven activation, reduced-motion gating, countdown progress bar. If `IntersectionObserver` is undefined, treat as always-in-view (today's behavior — keeps jsdom tests and old browsers working). CSS: add the blur bridge to `.hv3-tour-phone img` transition (filter alongside opacity), mirroring the `.ftour` recipe; keep the drop-shadow constant across states.
**Test scenarios:**
- home-v3 route tests still pass unmodified (jsdom has no IntersectionObserver → fallback path, proving the guard).
- Manual: load homepage, do not scroll — road sits on station 1, not advancing; scroll to it — it starts; scroll past — it pauses; scroll back — resumes; click a station — timer stops as today (verified in U5's preview walk).
- Reduced-motion (emulate in devtools): no auto-advance, instant swaps — unchanged.
**Verification:** `npm test` green with no home-test edits needed; the four manual behaviors observed in preview.

### U5. Verify and update PR #81

**Goal:** The branch that Ronak reviews carries the consolidated pages with all gates green.
**Dependencies:** U1–U4.
**Files:** none new (screenshots to scratchpad only).
**Approach:** Full `npm test` + `npm run build`; walk `/salesman-app-tally` and `/` in preview at 1280px and 390px; screenshot the tour (top, mid-scroll, mobile) and the homepage road (before-wake and after-wake) and send to Ronak; push to `feat/team-sales-beats-landing` (updates PR #81 in place); update the PR body's "what changes" section.
**Test scenarios:** `Test expectation: none — verification unit; the evidence is the green gates and the screenshots.`
**Verification:** all 38 test files green, build gates green (image budgets, prerender, rate-card drift), PR #81 updated, screenshots delivered.

---

## Risks

- **AEO regression risk (low):** the deleted card copy is merged into station bodies, so the walkthrough's claims stay in the prerendered HTML; the answer block, FAQ, and comparison table (the citation-bearing surfaces) are untouched.
- **Shared-template blast radius:** U2 touches the template all 27 pages render through — the regression assertions on an untouched page are the guard.
- **Observer-in-jsdom:** both U2 and U4 must keep the IO-undefined fallback or the suite breaks silently; called out in both units.

## Deferred Implementation Notes

- Exact station wording (voice §5 pass at implementation, read aloud per craft rule 12).
- Final crossfade duration (pick between 0.35–0.45s by eye in preview).
- Whether `sales-target-mockup` / `rbac.webp` end up unreferenced (check before any deletion; deletion is follow-up, not this PR).
