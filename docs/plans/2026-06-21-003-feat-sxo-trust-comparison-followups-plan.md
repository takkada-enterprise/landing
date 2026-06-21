---
title: "feat: SXO follow-ups — trust wall, legitimacy block, comparison page, demo video"
type: feat
status: active
created: 2026-06-21
depth: standard
target_repo: takkada website/landing
---

# feat: SXO follow-ups — trust, comparison, demo video

## Summary

The "tally on mobile" SXO analysis (2026-06-21) shipped the exact-match `/tally-on-mobile` landing page and surfaced four remaining gaps. This plan covers the rest. The two weakest SXO dimensions were **Trust** (one testimonial, no rebuttal of the "is a Tally mobile app even safe/legit?" fear that dominates the informational SERP) and the **Comparison-shopper** persona (scored 53/100 — arrives from "20 best Tally mobile apps" listicles with no dedicated page to land on).

Two pieces are smaller than expected because the codebase already carries scaffolding:
- `TestimonialCard` already renders a multi-card row; the `testimonials` array in `src/data/siteContent.js` simply has one entry. Adding more is a data change.
- `ComparisonSection` already renders a Takkada vs Biz Analyst vs Livekeeping feature matrix on the home page. The remaining work is to promote it to a dedicated, indexable comparison route for listicle-referred traffic, and enrich the rows.

The operator confirmed (2026-06-21): testimonials will be real quotes the operator supplies (3-5 named distributors); the demo asset is a real video the operator provides; and `/tally-on-mobile` stays a verbatim clone of home (the SXO "differentiate the hero" recommendation is **declined** — see Scope Boundaries).

---

## Problem Frame

From the SXO scorecard:
- **Trust 6/15** — the lowest-scoring gap dimension. The site has one testimonial and no content that answers the top informational-SERP fear ("Tally has no official mobile app; APK downloads are often malware"). Every persona's score is capped by this.
- **Comparison-shopper 53/100** — "Needs Work." The existing matrix is buried mid-home; a shopper referred by a listicle has no keyword-matched page to land on.
- **Media 9/15** — three static screenshots; app-store rivals show video.

All work lives in the marketing site repo (`takkada website/landing`, Vite 7 + React 19 SSG, deploys on push to `main`). Every change must honor that repo's `CLAUDE.md`: no vanity numbers, no banned superlatives (seamless, world-class, enterprise-grade, revolutionary, game-changer), no cheap shots at competitors, the distributor is the hero, Plus Jakarta Sans only, tabular-nums on every ₹/%/date, and the 11 craft commandments.

---

## Requirements Traceability

| Req | Source | Addressed by |
|---|---|---|
| R1. Multiple named, real distributor testimonials | SXO Priority Action 2; persona Trust gap | U1 |
| R2. Data-safety / legitimacy block rebutting the "safe/legit?" SERP fear | SXO Priority Action 2; Skeptical First-Timer persona (56/100) | U2 |
| R3. Honest, consistent scale signal (no vanity numbers) | CLAUDE.md craft rule #4; SXO Trust | U2 (count reconciliation) |
| R4. Dedicated, indexable competitor comparison page | SXO Priority Action 3; Comparison-shopper persona (53/100) | U3 |
| R5. Demo video to close the media gap | SXO Priority Action 5; Media dimension | U4 |

---

## Key Technical Decisions

- **Reuse, don't reinvent.** `TestimonialCard`, `ComparisonSection`, the `Seo` component, and the `Home`-prop SEO pattern (just established for `/tally-on-mobile`) are the vocabulary. New components only where none exists (the video embed).
- **Comparison page = promote the existing section, don't fork it.** Extract the matrix into a route that renders the existing `ComparisonSection` plus framing copy and its own `Seo` + schema, so home and the standalone page share one matrix and one data source (`comparisonSection` in `src/data/siteContent.js`). No drift.
- **Comparison must stay fair.** The `comparisonSection.disclaimer` already names the review date and tells sales to verify. Keep it. Frame the page as "best Tally mobile app for distributors" (neutral, factual), not a hit piece. This satisfies the "no cheap shots" voice rule while still capturing comparison intent.
- **Count honesty is a real open decision.** The live home `metrics-bar` shows "100+ Businesses Trust Takkada" and "₹17+ Crore Collected Monthly", but CLAUDE.md craft rule #4 states "We have 20 customers." These conflict. The plan does **not** invent or unilaterally change a number the operator published — U2 flags it for operator confirmation and aligns whatever number is confirmed across the site. (See origin: repo `CLAUDE.md` §5/§11.)
- **Video must not regress performance or craft rule #5** (motion serves meaning; default no motion). The embed is click-to-play with a poster image, no autoplay, lazy-loaded, with an explicit aspect-ratio box to prevent layout shift.

---

## Scope Boundaries

### In scope
- A multi-testimonial wall fed by real operator-supplied quotes.
- A data-safety / legitimacy trust section.
- A dedicated comparison route reusing the existing matrix.
- A reusable, performance-safe demo-video embed component placed on the home page (which the identical `/tally-on-mobile` clone inherits automatically).

### Declined (operator decision 2026-06-21)
- **Differentiating the `/tally-on-mobile` hero** (the SXO "view your Tally data first / surface View Only ₹2,700" recommendation). Operator chose to keep `/tally-on-mobile` a verbatim clone of home. Tradeoff accepted: the two URLs are content-identical, which carries near-duplicate-content risk and forgoes the read-only-intent capture the SXO flagged. Revisit only if the page underperforms.

### Deferred to Follow-Up Work
- Persona-tuned variants of the comparison page per competitor (e.g., a distinct `/takkada-vs-biz-analyst`). Ship the one neutral comparison page first.
- A second video or an interactive screenshot tour (the operator is providing one video; a tour can follow if the video underperforms).

### Out of scope
- Any change to the Flutter app, backend, or pricing logic.
- New testimonial copywriting invented by the agent (voice rule: real quotes only).

---

## Implementation Units

### U1. Multi-testimonial wall

**Goal:** Replace the single-testimonial row with 3-5 real, named distributor testimonials.
**Requirements:** R1.
**Dependencies:** none (operator supplies quote copy).
**Files:**
- `src/data/siteContent.js` (expand the `testimonials` array)
- `src/routes/Home.jsx` (verify the `.testimonial-row` grid handles 3-5 cards; adjust wrap/columns if needed)
- `src/styles.css` (only if the row needs a responsive multi-column rule)
- `src/routes/__tests__/testimonials.test.jsx` (new)

**Approach:** `TestimonialCard` and the `testimonials.map()` row in `Home.jsx` already support N cards; this is primarily a data change. Add operator-provided entries (`quote`, `name`, `role`) to the array. Confirm the row reflows to a 2-3 column grid at desktop and stacks on mobile without overflow. Keep avatars as the existing first-initial circle. Do not invent quotes — leave clearly-marked placeholder entries only if the operator has not yet supplied all copy, and flag them.

**Patterns to follow:** existing `testimonials` shape and `TestimonialCard` props; the `.testimonial-row` section in `Home.jsx`.

**Test scenarios** (`src/routes/__tests__/testimonials.test.jsx`):
- Renders one `TestimonialCard` per `testimonials` entry (count matches data length).
- Each card shows its `name`, `role`, and `quote` verbatim from data.
- Avatar shows the first character of `name`.
- No card quote contains a banned superlative (assert against the §12 banned-word list).

**Verification:** Home renders 3-5 testimonials in a balanced grid; `npm run build` clean; cards visible and legible in `npm run preview` at mobile and desktop widths.

---

### U2. Data-safety & legitimacy trust block

**Goal:** Add a section that answers the "is a Tally mobile app safe / legitimate?" fear and reconciles the public scale number to an honest figure.
**Requirements:** R2, R3.
**Dependencies:** none.
**Files:**
- `src/data/siteContent.js` (new `trustSignals` content block — data-safety points + verified app-store links)
- `src/routes/Home.jsx` (render the new section, placed near the Tally-connector / FAQ region)
- `src/components/` (reuse `FeatureCard` / icon-container vocabulary; only add a component if no existing card fits)
- `src/styles.css` (section styling if a new layout is required)
- `src/routes/__tests__/trust-block.test.jsx` (new)

**Approach:** A compact section (2-line summary + 3-4 proof points per craft rule #2 progressive disclosure) covering: your data stays in your Tally (nothing migrates), the official Android/iOS apps (link the real Play Store and App Store URLs already present in the site's Organization `sameAs`), and the Windows connector's role. Frame each as the distributor's concern first (craft rule #11). Use real, specific behaviors, not "bank-grade security" superlatives.

**Count reconciliation (R3):** before this section ships, confirm with the operator whether the public number is "100+" (current `metrics-bar`) or ~20 (CLAUDE.md). Apply the confirmed number consistently to the `metrics-bar` and any new trust copy. The agent does not pick the number — it surfaces the conflict and applies the operator's answer. If unresolved at build time, leave the existing `metrics-bar` untouched and ship the data-safety points without a new count claim.

**Patterns to follow:** `tally-section` / `grid-card` markup in `Home.jsx`; icon-container token (`#E8F0E8` fill, sage icon) per CLAUDE.md §6; app-store URLs from the Organization schema in `src/data/schema.js`.

**Test scenarios** (`src/routes/__tests__/trust-block.test.jsx`):
- The section renders and contains the "data stays in Tally" assurance text.
- App-store links resolve to the real `apps.apple.com/.../id6755435132` and `play.google.com/.../com.paysaathi.takkadaapp` URLs and carry `rel="noopener"`.
- No banned superlative appears in the section copy.
- If a count is rendered, it matches the operator-confirmed value (guard against reintroducing an unverified number) — otherwise assert no new "N+ businesses" string is introduced.

**Verification:** section reads as trust-building to a skeptical first-timer; `npm run build` clean; §12 banned-word grep passes on changed files.

---

### U3. Dedicated comparison page

**Goal:** A standalone, indexable comparison route for traffic referred by "best Tally mobile app" / "Biz Analyst alternative" listicles, reusing the existing matrix.
**Requirements:** R4.
**Dependencies:** none (uses existing `ComparisonSection` + `comparisonSection` data).
**Files:**
- `src/routes/TallyMobileComparison.jsx` (new route; renders `Seo` + framing copy + `<ComparisonSection />` + a CTA band)
- `src/data/siteContent.js` (enrich `comparisonSection.rows` — add the strongest true differentiators not yet shown, e.g. zero-MDR UPI collection and two-way write-back into Tally)
- `src/routes/index.jsx` (register the route element)
- `src/data/siteMetadata.js` (add the route to `routeMetadata` so it enters the sitemap)
- `src/routes/__tests__/tally-mobile-comparison.test.jsx` (new)

**Approach:** Mirror the `/tally-on-mobile` route pattern: a thin route component with its own `Seo` (unique <60-char title targeting the comparison query, <160-char description, self-canonical `/tally-mobile-app-comparison/`) that renders the shared `ComparisonSection` plus a short, fair intro and a demo CTA. Enrich the shared `comparisonSection` data so the new rows also strengthen the home matrix (single source). Keep the existing `disclaimer` (fairness guardrail). Consider `ItemList` or `Product`/`SoftwareApplication` schema; reuse `softwareApplicationSchema()`. Final slug is a minor decision — `/tally-mobile-app-comparison` is the working choice.

**Patterns to follow:** `src/routes/TallyOnMobile.jsx` (thin SEO-targeted route), `src/routes/index.jsx` `ELEMENT_FOR_PATH` registration, the `/tally-on-mobile` entry in `src/data/siteMetadata.js`, and the `tally-on-mobile.test.jsx` test shape.

**Test scenarios** (`src/routes/__tests__/tally-mobile-comparison.test.jsx`):
- Route is registered in `routeMetadata` at the chosen exact-match path.
- Canonical and `og:url` resolve to `https://takkada.com/tally-mobile-app-comparison/` (trailing slash, per `absoluteUrl`); title ≤ 60 chars and matches the comparison keyword.
- The matrix renders one row per `comparisonSection.rows` entry and the three competitor column headers (`Takkada`, `Biz Analyst`, `Livekeeping`) are present.
- The fairness disclaimer text is present.
- New differentiator rows (zero-MDR UPI, two-way write-back) appear once the data is enriched.

**Verification:** `npm run build` emits `dist/tally-mobile-app-comparison/index.html` with real static content and the matrix; the URL appears in `dist/sitemap.xml`; competitor names render fairly with the disclaimer.

---

### U4. Demo-video embed component

**Goal:** A reusable, performance-safe video embed placed on the home page to close the media gap.
**Requirements:** R5.
**Dependencies:** none (operator supplies the video URL/file + poster).
**Files:**
- `src/components/VideoEmbed.jsx` (new)
- `src/routes/Home.jsx` (place the embed, e.g. in the intro/product region)
- `src/styles.css` (aspect-ratio box + poster styling)
- `public/assets/` (operator-provided poster image; video file if self-hosted)
- `src/components/__tests__/VideoEmbed.test.jsx` (new)

**Approach:** Click-to-play with a poster frame, no autoplay (craft rule #5: default no motion). Support either a self-hosted `<video>` with `preload="none"` or a privacy-friendly lazy YouTube `<iframe>` swapped in on click — decide once the operator confirms the asset form. Wrap in a fixed aspect-ratio container to prevent CLS. Accessible: real play button with an aria-label, captions track slot if the operator provides one. Component file header documents the motion-opt-in reason per craft rule #5.

**Patterns to follow:** the device-frame / `feature-phone` image treatment in `Home.jsx` for visual consistency; existing `--radius-lg`, `--shadow-phone`, and motion tokens in `src/styles.css`.

**Test scenarios** (`src/components/__tests__/VideoEmbed.test.jsx`):
- Renders the poster image and a play control before interaction (no iframe/video network load on mount).
- Play control has an accessible name (aria-label).
- Clicking play mounts the player (video or iframe) with the provided source.
- Does not autoplay (no `autoplay` attribute / no player mounted on initial render).
- Container carries a fixed aspect-ratio style (guards against layout shift).

**Verification:** video plays on click in `npm run preview`; Lighthouse/preview shows no layout shift on load; `npm run build` clean.

---

## System-Wide Impact

- **Routing/sitemap:** U3 adds one route; follow the dual registration (`routeMetadata` + `ELEMENT_FOR_PATH`) or the build throws — the same guard that protected the `/tally-on-mobile` work. Sitemap regenerates from `routeMetadata` at build.
- **Shared data:** U1 and U3 both edit `src/data/siteContent.js`; U3's `comparisonSection` enrichment also strengthens the home matrix (intended). Land U1 and U3 in separate commits to keep diffs reviewable.
- **`/tally-on-mobile` inheritance:** because that page renders the `Home` body, U1/U2/U4 changes appear there automatically — verify it still looks right in preview.
- **Deploy:** all four units ship to `main` (Cloudflare deploy on push; `main` is PR-protected per repo memory). Expect a PR, not a direct push.

---

## Sequencing

U1, U2, U3, U4 are independent and can land in any order or in parallel. Suggested order by value-to-effort: **U1 (data-only, fastest) → U2 (trust, highest-impact gap) → U3 (comparison route) → U4 (video, gated on operator asset).** U4 can slip to last since it depends on an external asset.

---

## Verification Strategy

Per the repo's §12 session-end checklist, before each commit:
- `npm run build` passes; `npm test` green (existing 94 + new unit tests).
- `npm run preview` walk of every changed page (home, the new comparison route, and the inherited `/tally-on-mobile`).
- `cat dist/<page>/index.html` shows real static content (not an empty root div).
- New route has a unique <60-char title, <160-char description, canonical, OG, and schema.
- §12 banned-word grep on changed files.
- Tabular-nums on any new ₹/% figure.
- One craft-review read-aloud pass.

---

## Open Questions (operator-owned)

- **Q1 (blocks U2 count claim):** Is the public scale number "100+ businesses / ₹17+ Crore monthly" accurate, or should it read ~20 customers? The agent will apply whatever is confirmed; if unanswered, U2 ships without a new count.
- **Q2 (U4 asset form):** Self-hosted MP4 or a YouTube/Vimeo link? Determines `<video>` vs lazy-`<iframe>`. Operator also provides a poster image.
- **Q3 (U1 copy):** The 3-5 real testimonial quotes (name, role/city, quote) — supplied by operator before U1 ships its real copy.
