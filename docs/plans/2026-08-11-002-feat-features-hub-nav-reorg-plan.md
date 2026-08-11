---
title: "feat: Features hub re-tier and navigation reorganisation"
type: feat
status: active
date: 2026-08-11
origin: docs/brainstorms/2026-08-11-features-hub-nav-reorg-requirements.md
---

# feat: Features hub re-tier and navigation reorganisation

## Summary

Re-tier `/features` at the data layer (`featureGroups.js` gains a lead tier, labelled comparison/trade sections, and a compact secondary index) while keeping the `features-hub-card` class on every tier's links as the build-contract the coverage guards key on. The header gains a Features disclosure built on the repo's existing `aria-expanded` pattern, the mobile-overlay fix copies the visibility-step pattern from the sticky CTA bar, and every test the reorg deliberately breaks is rewritten in the same commit with the reason recorded in the file.

---

## Problem Frame

The operator reads takkada.com as "messy": the /features hub renders a wall of uniform text cards, the header offers a homepage-anchor "Product" item plus a competing installer download, the mobile menu reads as a rendering bug, and the footer dumps the full feature-link directory. Full context in the origin document (see Sources & References). The 27 pages in `FEATURE_PAGES`, plus five legacy standalone routes excluded from the hub gates, are load-bearing SEO/AI-search surface, so this is re-presentation, never removal.

One origin requirement dissolved during research: the yellow "PLACEHOLDER" image (origin R1) is already fixed on `main`. PR #77 (`feat/order-link-feature-page`) merged into `origin/main` on 2026-08-11 (merge commit `950bf0f`, verified against the remote), shipping the order-booking page with real mockups — `PLACEHOLDER_ASSETS` on `main` is empty and no placeholder asset remains. That merge also added a 27th feature page (`order-booking-app-tally`, in the `team-in-the-market` group, now titled "Orders from the market") and landed the `PLACEHOLDER_ASSETS`/`HELD_PAGES` guard machinery. **This plan is baselined against `origin/main` at `950bf0f`** — all counts below reflect the merged tree. Confirmed with the operator 2026-08-11.

---

## Requirements

Traced to origin R-IDs; origin R1 is dropped (see Problem Frame).

**Broken-window fix**
- R2. Open mobile menu is opaque: page content must not read through the menu surface at any point, including mid-animation.

**/features hub re-tier**
- R3. Hub opens with a lead tier of the 8 approved features as rich cards (title, one-line benefit, device-framed product visual, link). Operator-approved list, confirmed 2026-08-11: `payment-collection-tally`, `payment-reminder-tally`, `tally-on-mobile`, `tally-reports-on-mobile`, `salesman-app-tally`, `e-invoice-from-phone`, `e-way-bill-from-phone`, `import-purchase-from-pdf`. (Whether `order-booking-app-tally` — live on `main` since PR #77 — joins the lead tier is an operator call at the eyeball checkpoint; the plan defaults it to the secondary index.)
- R4. Comparison pages ("Weighing your options") and trade pages ("Built for your trade") render as their own labelled sections, visually distinct from the feature tiers.
- R5. All remaining feature pages stay on the hub as a compact, theme-grouped secondary index below the lead tier.
- R6. Every `FEATURE_PAGES` page (27 today) remains reachable from the reorganised hub; both coverage gates (`checkFeaturesHub.mjs` build guard and `features-hub.test.jsx`) stay green, extended for the tier structure.
- R7. Hub intro shortened so the first lead card is visible without scrolling multiple screens on a phone.

**Header navigation**
- R8. Header gains a Features disclosure **on desktop** showing the lead features plus an "All features" link, reachable from any page. On mobile, the overlay keeps a single "Features" link to the hub (operator-confirmed scope decision — see Scope Boundaries).
- R9. "Product" disappears as a top-level menu item. `#pricing` is the one documented exception to "no homepage-section anchors in the top level": no standalone pricing page exists and new pages are out of scope, so Pricing keeps its `NavHashLink` (operator confirms at eyeball).
- R10. "Tally Connector" leaves the primary header button row; header presents at most two primary actions (Book a Demo, Chat on WhatsApp). Download stays reachable (default placement: footer; operator confirms at eyeball).

**Footer**
- R11. Footer feature list curated to the lead tier plus "All features"; the full dump goes away.

**SEO safety (hard rules)**
- R12. No page deleted, no URL changes, every page in `FEATURE_PAGES` keeps at least one crawlable HTML link from hub and/or footer.
- R13. Structured data, titles, and meta descriptions of existing pages not regressed (`CollectionPage` keeps `numberOfItems === FEATURE_PAGES.length`).

**Craft and approval gates**
- R14. New surfaces follow the existing design system (CLAUDE.md §6–7, §11); no new fonts, colors, or one-off patterns; any motion follows the craft rules.
- R15. Operator eyeballs the rendered hub, header (desktop + mobile), and footer before the PR to `main` is merged.

**Origin acceptance examples:** AE1 (covers R2), AE2 (covers R8, R9 — desktop; see U6 for the mobile reading), AE3 (covers R5, R6, R12), AE4 (covers R10).

---

## Scope Boundaries

- No changes to the homepage's own sections or copy (recently operator-approved). The orphaned `#product` id stays in place on Home — removing the nav item breaks nothing (the anchor-contract test is one-directional).
- No deleting, renaming, or rewriting any feature page's content or URL. No new pages, no pricing changes.
- Per-feature-page design polish (origin "approach C") is deferred, per origin.
- No changes to blog, partners, or company pages.
- No reveal-on-scroll or other motion added to the hub. `Features.jsx` carries a "no motion of its own" header comment today; this plan keeps that decision (craft rule 5), which also sidesteps the known `.reveal`/dynamic-className blanking landmine entirely.
- The mobile menu keeps a single "Features" link to `/features` — no in-place expanding feature list inside the overlay in this pass (confirmed with operator 2026-08-11).

### Deferred to Follow-Up Work

- In-place Features expansion inside the mobile overlay: possible after U1 makes the overlay scrollable; revisit after the operator sees the shipped state.
- A "jump to section" affordance on the hub: skipped for v1, revisit after eyeball.
- Repointing the footer Product column's feature-named `#` anchors (Import from PDF, Payment Collection, etc.) at their feature pages instead of homepage sections: a design-review suggestion worth considering, but it changes footer navigation behaviour beyond the origin's curation scope — operator decides at eyeball or later.

---

## Context & Research

### Relevant Code and Patterns

All verified against `origin/main` at `950bf0f` (2026-08-11).

- `src/routes/Features.jsx` — current hub; renders `groupFeaturePages(FEATURE_PAGES)`.
- `src/data/featureGroups.js` — `FEATURE_GROUPS` (9 groups; `team-in-the-market` is titled "Orders from the market" and holds `order-booking-app-tally`), `FEATURE_BLURBS`, `groupFeaturePages()`. The tier structure lands here (JSX-free: this module is imported by Node-ESM build scripts).
- `src/data/featurePages.js` (+ `featurePagesSecondBatch.js`, `featurePagesAlternatives.js`, `featurePagesPersonas.js`) — `FEATURE_PAGES` (27 entries), `featurePagePath()`, `featureFooterLinks`, `featureRouteMetadata`, and per-page `hero` objects (image, width, height, alt). Not restructured by this plan.
- `src/Layout.jsx` — `SiteHeader`, `MobileMenu`, `SiteFooter`, `NavHashLink`; all header/footer/overlay work happens here.
- `src/components/PhoneModal.jsx` — the repo's dialog pattern: `role="dialog"`, `aria-modal`, Escape handler, focus move. U1 copies its semantics for the overlay.
- `src/data/siteContent.js` — `navLinks` (top of file), `footerColumns` (~line 554), `appLinks.tallyConnector`.
- `src/styles.css` — `.mobile-overlay` (~363), `.site-nav` z-index 100 (~281), `.mobile-cta-bar` visibility-step pattern (~527), `.tally-card` (~1268), connector hidden ≤1210px (~1925), desktop nav renders from 768px up. Display-headings weight block near the top for any new heading class.
- `src/home.css` `.hv3-step-phone` — the closest existing "card with device visual" pattern; drop-shadow on the alpha silhouette, never border-radius/box-shadow (the frame is baked into the artwork).
- Disclosure precedents: `src/components/FAQItem.jsx` and the Home order-to-cash tour (`aria-expanded` + `aria-controls` button pattern).
- Build gates chained in `npm run build`: `checkFeaturesHub.mjs` (regex `CARD_RE` requires `class` before `href` in emitted anchors), `checkRoutePrerender.mjs`, `checkImageBudgets.mjs`, `checkImagePreloads.mjs` (the HERO_IMAGE whitelist it imports from `stripImagePreloads.mjs` owns preloads — never add one in `Seo.jsx`).

### Institutional Learnings

- `.reveal` + state-dependent className blanks sections (memory `reference_reveal_class_fights_react_classname`, fix `df18c1b`). Plan avoids by adding no hub motion; the dropdown puts state classes on elements that never carry `.reveal`.
- Raw square screenshots are a defect class; the device frame is baked into the artwork (memory `reference_landing_feature_mockups_need_the_device_frame`). All 8 lead assets are already framed mockups — no re-capture needed.
- "When a test encodes a strategy, reverse it and record the reason in the file — never delete it" (Phase 3 learning, applied to the footer-coverage assertions here).
- Screenshot library is not all publishable: `invoice-detail`, `share-ledger`, `bankbook`, `inventory-supplier`, `party-list`, `settlement` carry real customer data (`UNSAFE_CAPTURES`). All 8 lead assets are outside that set.
- Never validate byte-weight/LCP changes on localhost for this repo; predict from bytes, measure live.
- Parallel sessions collide in this repo: `git fetch` and branch from fresh `origin/main`; `npm ci` in the worktree (never symlink node_modules). This bit during planning itself — PR #77 merged mid-session and invalidated the first draft's counts.

### Lead-tier asset table (verified 2026-08-11)

Each entry below is that page's own `hero` object — the lead cards derive from `page.hero`, and this table only documents what that resolves to today.

| Lead feature (slug) | Hero asset (`public/assets/screenshots/`) | Note |
|---|---|---|
| payment-collection-tally | `whatsapp-dispatch-mockup.webp` | shared with 2 other pages (not other lead cards) |
| payment-reminder-tally | `payment-reminders.webp` | shows a settings screen, not an outgoing reminder — flag at eyeball |
| tally-on-mobile | `home-screen-framed.webp` | |
| tally-reports-on-mobile | `monthly-sales.webp` | silver bezel; others are black — flag at eyeball |
| salesman-app-tally | `field-visit-photo-mockup.webp` | |
| e-invoice-from-phone | `invoice-summary-mockup.webp` | |
| e-way-bill-from-phone | `delivery-challans-mockup.webp` | shows challans, not an e-way bill — flag at eyeball |
| import-purchase-from-pdf | `add-items-mockup.webp` | |

Two aspect-ratio families (≈0.483 vs ≈0.4926) and one bezel-color mismatch exist across these; the card CSS must tolerate both ratios, and the three flagged items go to the operator at the eyeball checkpoint (swap or re-derive via the documented frame-plate recipe only if asked). All eight are already budgeted in `checkImageBudgets.mjs` as their own page's hero — no new `BUDGETS` entries needed.

---

## Key Technical Decisions

- **`features-hub-card` stays the single coverage contract.** All 27 anchors — lead cards, comparison cards, trade cards, compact index links — carry it; per-tier styling comes from modifier classes (e.g., a lead variant and a compact variant). Neither `CARD_RE` in the build guard nor the test's card selector changes, so the guards keep their teeth without a risky dual edit. A comment at `CARD_RE` records that the class is a build contract.
- **Each page appears exactly once across all tiers.** The set-equality assertions keep enforcing both directions unchanged. The lead 8 do not repeat in the secondary index.
- **Tier structure is data in `featureGroups.js`, derived not duplicated.** A new lead-slugs export names the 8; the secondary index derives as "each non-section group's pages minus lead slugs" (the `weighing-options` and `built-for-your-trade` groups are excluded from the index — they render as the two labelled sections). Per-tier counts in tests derive from the exports and `FEATURE_PAGES.length`, never literals, so a future lead-list edit or 28th page is a one-line data change. No second hand-maintained page list.
- **Lead-card visual is `page.hero`.** Image, intrinsic width/height, and alt all come from the same object the feature page's own LCP hero uses — no second asset mapping, no invented alt text. The Context table above is a verification record, not a data source.
- **The drained GST group:** both `gst-paperwork` pages are lead cards, so that theme heading disappears from the secondary index (operator-confirmed 2026-08-11). Its DOM id moves to the lead-tier section so all 9 historical `#` anchors keep resolving; a new test pins every `FEATURE_GROUPS[].id` to a rendered DOM id.
- **Lead-card benefit copy reuses `FEATURE_BLURBS` verbatim.** Visible card text and the `CollectionPage` ListItem `description` stay one string; the schema source is re-plumbed to iterate all pages flat so `numberOfItems` stays pinned to `FEATURE_PAGES.length` (27) regardless of tier layout (R13).
- **Desktop "Features" stays a `<Link>` to `/features`; a sibling chevron button owns the disclosure.** Keeps `Layout.test.jsx`'s "Features is a link in both navs" assertions true, preserves the hub's top-nav link on every page, and gives keyboard/touch an explicit `aria-expanded` control (FAQItem pattern). The hover region is the wrapper containing both the link and the chevron — not the chevron alone — with a short open-intent delay and a short close delay, so the panel is discoverable on a pointer sweep without flashing on transit. Escape closes and refocuses the trigger; pointerdown-outside closes. Desktop nav renders from 768px up, so iPad-class touch devices get the chevron as their only way in: its hit target is minimum 44×44px (via padding, not icon size), and the panel width is viewport-clamped with right-edge alignment so it cannot overflow at tablet widths.
- **The dropdown panel is always in the DOM, hidden with the visibility-step pattern.** The SSG output then carries the lead-feature links on every page — partial compensation for the footer's curated long tail — while `visibility: hidden` keeps the closed panel's links out of the tab order and accessibility tree (crawlers read the HTML regardless of CSS visibility).
- **Mobile overlay fix = the `.mobile-cta-bar` visibility-step pattern plus dialog semantics.** `visibility: hidden` + delayed transition kills mid-fade bleed-through (AE1) and removes the closed menu from the tab order/accessibility tree (a live desktop tab-order leak today). The open overlay gets `role="dialog"` + `aria-modal`, the toggle button gets `aria-expanded`/`aria-controls`, focus moves to the first overlay link on open and back to the toggle on close, and Escape closes — following `PhoneModal.jsx`. Overlay becomes `overflow-y: auto` / top-aligned with header-clearing padding (the new opaque `menu-open` header would cover centred content); a `menu-open` header state paints solid white and drops blur/shadow so header and overlay read as one opaque surface; `prefers-reduced-motion` honored.
- **Close-on-navigate is centralized.** One location-keyed effect in `LayoutInner` closes the mobile menu and the desktop panel on any route/hash change, replacing per-link `onClick` closers — browser back/forward with the menu open currently leaves the page scroll-locked.
- **Connector placement:** the footer's Product column gets an explicitly-labelled Windows download link, directly under the existing "Tally Connector" `#tally` homepage link and with distinct wording to avoid the same-name/different-behaviour collision; the mobile-overlay entry stays. Operator picks the final home at eyeball (origin defers this to R15).
- **Image discipline on the hub:** first lead card's image gets high fetch priority (it becomes the LCP element once the intro shortens); the other seven lazy-load; all carry width/height from `page.hero`; a new test asserts every hub visual has a `BUDGETS` entry (all eight already do, as their own pages' heroes). No new preloads in `Seo.jsx`.

---

## Open Questions

### Resolved During Planning

- Is the placeholder live on prod? — No. PR #77 merged to `main` 2026-08-11 with real mockups; `PLACEHOLDER_ASSETS` on `main` is empty. R1 dropped; plan re-baselined to the merged tree (27 pages).
- Is the order-link branch a coordination hazard? — No longer; it merged as PR #77 before implementation started. The 27th page falls into the secondary index automatically via the derivation in U2.
- Why does the mobile menu look transparent when its CSS background is opaque? — The 300ms opacity fade has no visibility step (mid-fade sampling), and the glass `.site-nav.scrolled` strip sits above the overlay. Both addressed in U1.
- Dropdown vs full-width disclosure on desktop (origin deferred question)? — Compact panel anchored to the Features item, always-in-DOM; split control (link + chevron button); wrapper-owned hover with open/close delays.
- Which screenshot serves each lead card (origin deferred question)? — Each page's own `page.hero`; table above; all 8 exist, none unsafe, three flagged for eyeball.
- `.reveal` interaction (origin deferred question)? — Moot: no motion added to the hub.

### Deferred to Operator Eyeball (U6)

- Whether `payment-reminders.webp` / `delivery-challans-mockup.webp` get swapped or re-derived (content-mismatch flags) and whether `monthly-sales.webp`'s silver bezel is acceptable in the lead row.
- Final connector placement (footer link is the default this plan ships).
- Whether `order-booking-app-tally` joins the lead tier (making it 9) or stays in the secondary index (the plan's default).
- Whether keeping Pricing as a `#pricing` homepage anchor is acceptable for now (the documented R9 exception).

### Deferred to Implementation

- Exact dropdown panel layout (single column vs two): settle in the browser during U4, inside existing tokens and the clamping rules above.

---

## Implementation Units

### U1. Mobile overlay opacity, scroll, dialog semantics, and close-on-navigate

**Goal:** The open mobile menu reads as one opaque surface at every moment, works as a proper dialog for keyboard and screen-reader users, and no navigation path leaves the page scroll-locked.

**Requirements:** R2 (AE1).

**Dependencies:** None. Ships as its own first commit — independently verifiable.

**Files:**
- Modify: `src/styles.css`, `src/premium.css` (header `menu-open` state), `src/Layout.jsx`
- Test: `src/Layout.test.jsx`

**Approach:**
- Copy the `.mobile-cta-bar` visibility-step transition onto `.mobile-overlay`; make the overlay top-aligned and scrollable with padding clearing the header; add the `menu-open` header state (solid white, no blur/shadow, z-order above the overlay so the logo + close row stays usable); add a `prefers-reduced-motion` block.
- Dialog semantics per `PhoneModal.jsx`: `role="dialog"` + `aria-modal` on the open overlay, `aria-expanded`/`aria-controls` on `.mobile-menu-btn`, focus moves to the first overlay link on open and returns to the toggle on close, Escape closes.
- Replace per-link `onClick` closers with one location-keyed effect in `LayoutInner` (closes the desktop panel too once U4 lands).

**Patterns to follow:** `.mobile-cta-bar` (`src/styles.css` ~527) for the visibility step; `PhoneModal.jsx` for dialog semantics; existing `lock-scroll` handling in `LayoutInner`.

**Test scenarios:**
- Happy path: menu opens → overlay has the open class, `role="dialog"`, and focus lands inside; menu closes → hidden state removes it from the accessibility tree and focus returns to the toggle (assert on class/attribute contract, not pixels). Covers AE1's contract at the DOM level; visual confirmation is U6's job.
- Edge case: with the menu open, a route change (not via a link click) closes the menu and removes `lock-scroll` from body.
- Edge case: Escape closes the open overlay.
- Edge case: closed overlay's links are not tabbable (the current desktop tab-order leak stays fixed).
- Regression: existing `Layout.test.jsx` nav/footer assertions stay green untouched by this unit.

**Verification:** `npm test` green; in `npm run preview` on a phone-width viewport, tapping the menu shows no page text through the surface at any point during the animation, and the overlay scrolls when content exceeds the viewport.

---

### U2. Tier structure in the data layer + data-invariant tests

**Goal:** `featureGroups.js` expresses lead tier, comparison/trade sections, and the derived secondary index; the data invariants are asserted in this unit's own commit.

**Requirements:** R3, R4, R5, R6 (AE3), R13.

**Dependencies:** None (parallel-safe with U1).

**Files:**
- Modify: `src/data/featureGroups.js`
- Test: `src/data/__tests__/feature-pages.test.js` (the new data invariants land here, in this commit); `src/routes/__tests__/features-hub.test.jsx` render assertions are rewritten in U3

**Approach:**
- Add the operator-approved 8-slug lead list as a named export; derive the secondary index per non-section group (pages minus lead slugs, excluding `weighing-options` and `built-for-your-trade`, which render as the two labelled sections). Section labels come from the merged `featureGroups.js` on `main` (`team-in-the-market` is now "Orders from the market"). Keep the module JSX-free and Node-ESM-loadable (build scripts import it).
- New data invariants (asserted at the data layer, over `FEATURE_PAGES` slugs, not rendered anchors): the lead list matches the operator-approved slugs exactly (distinct, all valid); lead ∪ section groups ∪ secondary index = `FEATURE_PAGES` slugs exactly, no overlaps; every non-drained group keeps ≥1 secondary entry; `FEATURE_BLURBS` still covers all pages. Counts derive from the exports and `FEATURE_PAGES.length` — no hardcoded 27s.

**Patterns to follow:** existing `groupFeaturePages()` derivation style; the file's existing comment discipline for recording why assertions exist.

**Test scenarios:**
- Happy path: tier partition is exact both directions over the data (this is the AE3 invariant at the data layer).
- Edge case: a slug in the lead list that isn't in `FEATURE_PAGES` fails loudly.
- Edge case: adding a 28th page to a group without touching tier data lands it in the secondary index automatically (`order-booking-app-tally` proves the path today by sitting in the index untouched).
- Error path: a page appearing in two tiers fails the partition assertion.

**Verification:** `npm test` green with the new invariants in `feature-pages.test.js`; `node`-importing `featureGroups.js` outside Vite still works (build scripts depend on it).

---

### U3. Hub re-tier render

**Goal:** `/features` opens with 8 rich lead cards, then the two labelled sections, then the compact secondary index; intro shortened; schema and both coverage gates green.

**Requirements:** R3, R4, R5, R6 (AE3), R7, R13, R14.

**Dependencies:** U2.

**Files:**
- Modify: `src/routes/Features.jsx`, `src/feature-page.css`, `scripts/checkFeaturesHub.mjs` (CARD_RE build-contract comment)
- Test: `src/routes/__tests__/features-hub.test.jsx`

**Approach:**
- Lead card: existing `.tally-card` + `features-hub-card` + a lead modifier class; title from `llms.title`, benefit from `FEATURE_BLURBS`, visual from `page.hero` (image, width, height, alt — the drop-shadow-on-alpha treatment per the `.hv3-step-phone` pattern; no border-radius, no box-shadow). Card CSS must tolerate both asset aspect ratios.
- Layout (directional, refined at eyeball): lead cards as a 2-column grid ≥768px and 1 column below, with the mockup capped at a fixed max-height and placed beside the title/blurb at phone width, so eight cards stay within roughly two phone screens instead of eight full-height mockups stacked.
- All 27 anchors keep `features-hub-card` with `class` before `href` in emitted attribute order; section/index styling via modifier classes only. No non-feature link carries the class.
- Schema iterates all pages flat (not via the render grouping) so `numberOfItems === FEATURE_PAGES.length` is layout-independent.
- All 9 group ids render as DOM ids (`gst-paperwork` on the lead section); new test pins this.
- Intro: keep the citation-eligible answer paragraph but move it below the lead tier rather than deleting it (R7 without sacrificing the AEO passage).
- Images: first card high fetch priority, others lazy, width/height from `page.hero`; new test asserts every hub visual has a `BUDGETS` entry (all eight already do as their own pages' heroes — no `BUDGETS` edits).
- New-pattern justification comments in the component/CSS headers per craft rule 10; no motion (header comment stays). Comment at `CARD_RE` records the class is a build contract.
- Rewritten assertions each carry the reason in-file (repo norm): per-tier counts derived from the U2 exports (8 lead / 2 comparison / 3 trade / rest in index), set-equality across tiers, card-content checks per tier shape (lead cards carry `h3` + blurb + image; index links are title-only).

**Test scenarios:**
- Happy path: `features-hub-card` anchors set-equal to `FEATURE_PAGES` paths (27 today, derived not hardcoded) (AE3); per-tier counts match the exports; lead cards show title + blurb + image with `page.hero` width/height/alt; index links render title-only.
- Happy path: `CollectionPage` `numberOfItems === FEATURE_PAGES.length`, every ListItem description equals the page's blurb; `BreadcrumbList` unchanged.
- Edge case: every `FEATURE_GROUPS[].id` resolves to a DOM id on the hub.
- Edge case: exactly one hub image carries high fetch priority; the others are lazy.
- Error path (guard-level): a stray `features-hub-card` anchor to a non-feature path fails `checkFeaturesHub` (existing behavior, re-verified against the new markup).
- Integration: `npm run build` green through `checkFeaturesHub`, `checkRoutePrerender`, `checkImageBudgets`; raw `dist/features/index.html` contains all 27 links and real prose.

**Verification:** Build + tests green; on a phone-width preview, the first lead card is visible within one light scroll (R7); watch one coverage assertion go red by temporarily removing a slug locally before trusting it green.

---

### U4. Header: Features disclosure, Product removed, connector demoted

**Goal:** From any page, the desktop header shows what the product does via a Features disclosure (8 lead links + "All features"); no `#product` top-level item; two primary actions only.

**Requirements:** R8, R9, R10 (AE2, AE4), R14.

**Dependencies:** U2 (lead-slugs export). U1's close-on-navigate effect should land first.

**Files:**
- Modify: `src/Layout.jsx`, `src/data/siteContent.js` (`navLinks`), `src/styles.css` (+ `src/premium.css` if the panel needs the elevated-surface tokens)
- Test: `src/Layout.test.jsx`, `src/routes/__tests__/home-v3.test.jsx` (anchor contract re-check)

**Approach:**
- Remove the `Product` entry from `navLinks`; leave Home's `#product` id in place. `Pricing` keeps its `#pricing` `NavHashLink` — the documented R9 exception (no standalone pricing page exists and new pages are out of scope).
- "Features" stays a `<Link>`; sibling chevron `<button aria-expanded aria-controls>` (min 44×44px hit target via padding) toggles an always-in-DOM panel listing the 8 lead features + "All features". The hover region is the wrapper around link + chevron, with open-intent and close delays; focus opens; Escape closes and refocuses; pointerdown-outside closes; route change closes via U1's effect. Closed panel is hidden with `visibility: hidden` (visibility-step) so its links leave the tab order and accessibility tree while staying in the SSG HTML. Panel width viewport-clamped, right-aligned (tablet safety). State classes never share an element with `.reveal`.
- Remove the desktop connector pill from `.nav-actions`; keep Book a Demo + WhatsApp as the only primary actions (AE4). The mobile-overlay connector entry stays. Panel links must NOT carry `features-hub-card` (stray-check).
- Mobile overlay nav: unchanged single "Features" link (scope decision).

**Patterns to follow:** `FAQItem.jsx` disclosure semantics; `.mobile-cta-bar` visibility step for the closed panel; `NavHashLink` for the Pricing entry; existing pill/button variants for the panel's "All features" row.

**Test scenarios:**
- Happy path: panel contains exactly the lead-feature links + "All features", derived from the U2 export not hardcoded (AE2: reachable from any page without navigating away).
- Happy path: `navLinks` contains no `#product` entry; `#pricing` is the only remaining hash entry; "Features" is still a link to `/features` in both navs (existing assertions preserved).
- Happy path: `.nav-actions` renders exactly two primary actions and carries no `download` attribute (AE4); the mobile-overlay connector entry is out of scope for this assertion and keeps its `download`.
- Edge case: Escape and outside-pointerdown close the panel; `aria-expanded` tracks state.
- Edge case: closed panel's links are not tabbable and the panel is out of the accessibility tree.
- Edge case: panel links are present in raw SSG HTML of a non-home page (crawlable without JS).
- Regression: home-v3 anchor contract stays green after `#product` removal (`#pricing` and footer hashes still satisfy the non-empty guard).

**Verification:** Tests + build green; keyboard-only walk in preview: tab to chevron, open, traverse links, Escape returns focus to the trigger; on a touch/tablet viewport ≥768px the chevron alone opens the panel comfortably.

---

### U5. Footer curation

**Goal:** Footer Features column = lead 8 + "All features"; connector download gets a distinct labelled footer home; the reversed coverage assertions record why.

**Requirements:** R10 (default placement), R11, R12.

**Dependencies:** U2 (lead-slugs export). U3 should land first so long-tail pages never lose both surfaces at once.

**Files:**
- Modify: `src/data/siteContent.js` (`footerColumns`), `src/Layout.jsx` (`SiteFooter`'s plain-anchor branch passes through a `download` flag from the link object)
- Test: `src/data/__tests__/feature-pages.test.js`, `src/Layout.test.jsx`

**Approach:**
- Features column derives from the lead-slugs export + "All features" (drops below the `footer-col-wide` threshold — intended visual narrowing).
- Add the Windows connector download to the footer's Product column, directly under the existing `#tally` "Tally Connector" link, with wording that distinguishes download from homepage-section link.
- Reverse the two footer-coverage assertions ("every page in footer" → "every page linked from hub; footer carries exactly the lead export + All features"), with the strategy reason written in the file so a future session doesn't restore the dump. R12 stays provable: the hub gate guarantees all 27 a crawlable link.

**Test scenarios:**
- Happy path: footer Features column = lead export + "All features" exactly (9 links today, derived).
- Happy path: footer has both connector-related links with distinct labels/targets; exactly one has a download target.
- Edge case (R12): union of hub links and footer links still covers every `FEATURE_PAGES` page — asserted, not assumed.
- Regression: `blog-internal-links` floors and `redirects` tests stay green untouched.

**Verification:** Tests + build green; footer renders as a normal-width column.

---

### U6. Full-site verification and operator eyeball checkpoint

**Goal:** The shipped state passes every gate and the operator approves the three surfaces before the PR merges (R15).

**Requirements:** R12, R13, R14, R15; final proof of AE1–AE4.

**Dependencies:** U1–U5.

**Files:**
- No new source files. PR assembly + preview walkthrough.

**Approach:**
- Fresh worktree off fetched `origin/main` (≥ `950bf0f`), `npm ci`, all work rebased there; re-check `origin/main` for further movement before the PR (parallel sessions ship into this repo).
- Full `npm run build` + `npm test`; §12 session-end checklist including banned-word grep on changed files, raw-HTML checks on `dist/features/index.html` and one other page's dropdown links, tabular-nums on any numerals.
- Walk the store (§11.6) at desktop and 390px widths: AE1 (menu opacity mid-animation), AE2 on desktop (blog post → dropdown → lead page); at 390px verify the overlay's Features link reaches `/features` without a homepage detour (the mobile reading of AE2), AE3 (hub covers all 27), AE4 (button row scan).
- Present to the operator for eyeball with the open decisions: the two content-mismatched lead images and the bezel inconsistency, the connector's final home, whether `order-booking-app-tally` joins the lead tier, and the Pricing `#pricing` exception. PR to `main` only after approval; Cloudflare publishes on merge.

**Test scenarios:** Test expectation: none — verification unit; all behavior is asserted in U1–U5.

**Verification:** Operator approval recorded; PR merged; live `/features`, header, and footer match the approved preview; post-merge spot-check that `takkada.com/features` raw HTML carries all 27 links.

---

## System-Wide Impact

- **Interaction graph:** `featureGroups.js` is imported by the hub, tests, and Node-ESM build scripts — it must stay JSX-free. `navLinks`/`footerColumns` render on every page; the dropdown adds 9 links to every page's SSG output (intended).
- **Error propagation:** coverage failures surface at build time (`checkFeaturesHub`) and test time; the build is the only gate — there is no CI test job, so U6's local full build is load-bearing.
- **State lifecycle risks:** menu/panel open state across navigation (centralized closer, U1); `lock-scroll` leakage (U1 edge case).
- **API surface parity:** none — no URLs, routes, or data contracts change externally.
- **Integration coverage:** raw-HTML assertions (prerender guards + U4's SSG panel check) prove what jsdom can't.
- **Unchanged invariants:** all 27 URLs and their page content, titles, meta, canonicals; `FEATURE_PAGES` batch files; blog internal-link floors; the homepage.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| Another PR lands on `main` mid-implementation (it happened during planning — PR #77) | Branch from fresh `origin/main`, derive all counts from data not literals, re-check the remote before the PR (U6) |
| LCP regression on `/features` from 8 images (~400KB) | First-card-priority + lazy others + capped-height cards (U3); predict from bytes, measure live after merge — never trust localhost |
| Long tail loses ~19 site-wide footer links (operator-accepted trade) | Hub gate guarantees crawlable links (R12); always-in-DOM dropdown adds 8 lead links site-wide; watch Search Console after ship |
| Guard becomes unfalsifiable if markup and regex drift | Class contract unchanged by design; U3 deliberately watches one assertion go red before trusting green |
| Overlay fix looks right in jsdom but wrong on a real phone | Tests assert the contract; U6's 390px eyeball is the acceptance gate, per AE1 |

---

## Sources & References

- **Origin document:** `docs/brainstorms/2026-08-11-features-hub-nav-reorg-requirements.md`
- Prior plan that built the current hub: `docs/plans/2026-08-09-001-feat-features-hub-internal-linking-plan.md` ("repoint, don't add" nav decision; excluded standalone routes stay excluded from the hub gates)
- PR #77 (`feat/order-link-feature-page`), merged to `main` 2026-08-11 at `950bf0f` — added the 27th page and the placeholder-guard machinery
- Repo craft/design rules: `CLAUDE.md` §5–§12
