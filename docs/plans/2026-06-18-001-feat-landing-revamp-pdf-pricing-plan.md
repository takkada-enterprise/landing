---
status: active
created: 2026-06-18
type: feat
plan_id: 2026-06-18-001
title: "feat: Landing visual teardown + PDF-to-Purchase feature & ₹9,999 pricing"
deepened:
---

# feat: Landing visual teardown + PDF-to-Purchase feature & ₹9,999 pricing

**Target repo:** `landing` (`git@github.com:takkada-enterprise/landing.git`). Local working copy: `takkada website/landing/`. All paths below are repo-relative to that landing repo (e.g. `src/routes/Home.jsx`).

---

## Summary

Three threads, one release:

1. **Full visual teardown** of the marketing site (operator-chosen scope). Re-architect the visual language — token foundation, shared primitives, hero concept, section rhythm, mockup framing, and motion — so the site feels as polished as the refreshed app screens. The existing plain-CSS approach (`src/styles.css` monolith) and the React 19 + `vite-react-ssg` stack stay; no Tailwind/styled-components, no new build tooling.
2. **Surface the new PDF-to-Purchase feature** ("Import from PDF — turn a supplier PDF into a purchase entry"), now a hero capability in the app. It currently exists only as a single comparison-table row.
3. **Pricing update**: Full Access rises **₹7,200 → ₹9,999 + GST** (PDF import bundled in), and PDF import is sold as a **₹4,000/year add-on** on lower plans. Propagate through content, JSON-LD schema, copy, tests, and `CLAUDE.md`.

The work is sequenced so all **content/data/pricing truth lands first** (low visual risk, testable), then the **visual teardown** rebuilds on top of correct data, then a **polish + verify** phase walks the rendered site per the project's craft checklist before PR.

---

## Operator decisions carried into this plan

These were confirmed before planning and are **not** open for re-litigation by reviewers or downstream agents:

- **Revamp scope = full visual teardown.** Re-architect the visual system, not a light refresh. `CLAUDE.md` §6/§7 design tokens get rewritten to match the new system (see U4).
- **PDF pricing = bundled + add-on.** PDF import is included in the new ₹9,999 Full Access plan (justifying the rise from ₹7,200) and offered as a ₹4,000/year add-on on the Collections plan.
- **Hero stats / metrics bar stay as-is.** The "100+ businesses · ₹17Cr+ monthly · thousands of reminders" claims (`siteContent.js` `heroStats`; `Home.jsx` metrics bar) are **kept verbatim** by explicit operator choice. This is a known, accepted tension with `CLAUDE.md` §4–§5 and craft commandment #4 ("we have 20 customers, no vanity numbers"). **Do not remove or soften these during the teardown.** Carry them into the rebuilt hero/metrics components unchanged. (Recorded here so no future craft-review pass "fixes" them.)

---

## Problem Frame

The landing site at `takkada.com` is the product's first demo (`CLAUDE.md` §11). Two things make it currently under-sell:

- The **app got a visual refresh** (the new mockups dropped 2026-06-18: `home-screen`, `invoice-detail`, `party-list`, `payment-reminders`, and a brand-new `Reports Sceen.png`). The site's visual language predates that refresh and now looks a step behind the product it sells.
- The **headline new capability — PDF-to-Purchase import — is invisible** on the site. The new home mockup leads with it; the site mentions it only in one comparison row. There is no feature section, no copy, no pricing for it.

A blocking infrastructure detail: **the new mockups were edited in `dist/assets/screenshots/` (build output).** `npm run build` regenerates `dist/` from `public/assets/screenshots/`, which still holds the **old May images**. If we ship without moving the new mockups into `public/`, the next build silently reverts every hero/feature screenshot to the old design. U1 fixes this first.

---

## High-Level Technical Design

*This illustrates the intended approach and is directional guidance for review, not implementation specification. The implementing agent should treat it as context, not code to reproduce.*

**Sequencing model — data truth → visual rebuild → verify:**

```
Phase 1 (data/content, testable, low visual risk)
  U1 mockups→public   U2 pricing+schema   U3 PDF & Reports content
        │                   │                    │
        └─────────── correct data layer ─────────┘
                            ▼
Phase 2 (visual teardown, presentation-only, builds on correct data)
  U4 tokens ─► U5 primitives ─► U6 hero
                   │                │
                   └─► U7 mid sections (incl PDF + Reports feature rows)
                   └─► U8 conversion sections (pricing UI, FAQ, CTA)
                            ▼
Phase 3 (polish + ship)
  U9 motion/responsive/a11y ─► U10 coherence + SEO parity + craft walkthrough ─► PR
```

**Page IA after teardown (Home route section order):**

```
Hero (new concept)  →  Problem (9 PM ritual)  →  Intro (phones)  →  Metrics bar [stats KEPT]
  →  What Takkada does (capabilities)  →  Feature rows:
        Outstanding tracking · Smart reminders · Digital collection · Auto-recon
        + NEW: Import from PDF (purchase)        ← new headline feature
        + NEW: Reports / This Financial Year      ← uses reports-screen.png
  →  Feature grid  →  E-invoice / RBAC  →  Comparison  →  Tally connector
  →  How it works  →  Who it's for  →  Pricing [₹9,999 + PDF add-on]  →  Testimonial  →  FAQ  →  Final CTA
```

The teardown changes *how every section looks and composes*; it does not delete sections except where the rebuild merges them. Section content is driven from `src/data/siteContent.js`; keep that the source of truth.

---

## Key Technical Decisions

- **Keep the Inter Variable + DM Serif Display type pairing even in a full teardown.** The teardown re-architects composition, color depth, spacing, radius, elevation, mockup framing, and motion — but swapping the font pairing is high-cost (self-hosting/licensing churn, `CLAUDE.md` §7 is strict about no CDN variable Inter, no new families) and low craft-ROI given the pairing is already distinctive. The "full teardown" mandate is satisfied through the *visual system*, not a font swap. **If the new hero concept genuinely demands a different display face, that is permitted — but only with a self-hosted file and a corresponding rewrite of `CLAUDE.md` §7.** Default: retain the pairing.
- **Reconcile the token drift, don't ignore it.** Shipped `src/styles.css` `:root` (`--color-primary: #2d4a2d`) has already drifted from documented `CLAUDE.md` §6 (`#344E41`). The teardown defines one authoritative new token set in `:root` and rewrites `CLAUDE.md` §6 to match it, ending the drift.
- **Pricing flows from one source.** `src/data/siteContent.js` `pricing.plans` is the single source; `src/data/schema.js` auto-derives JSON-LD `Offer`s from it (`offers: pricing.plans.map(...)`). Update the data + the hardcoded copy strings + the assertions in `src/data/schema.test.js`; the schema output follows automatically.
- **PDF feature is content-driven, not a new route.** Surface it as a first-class feature *section* on Home (and a comparison row that already exists), fed from `siteContent.js`. A dedicated SEO landing route for PDF import is deferred (see Scope Boundaries) to keep this release focused.
- **Plain CSS stays.** No CSS Modules / Tailwind / styled-components (`CLAUDE.md` §8). The teardown rewrites sections within `src/styles.css` and may split it only if it stays plain CSS imported the same way.

---

## System-Wide Impact

- **Shared design system ripples to every page.** `src/styles.css` tokens + shared primitives (`Layout.jsx` nav/footer, `CTAButton`, `FeatureCard`, `PhoneMockup`, section/card classes) are consumed by blog, company pages (`about-us`, `contact-us`, etc.), ICP templates (`ICPTemplate.jsx`, routes `MobileTally`/`ForDistributors`/`WhatsAppInvoice`/`AutoReconciliation`), `Partners`, and `ComparisonSection`. Teardown of tokens/primitives **changes their look too**. Scope = redesign Home + the shared system; **verify secondary pages stay coherent** (U10), not bespoke-redesign each.
- **JSON-LD pricing** (`SoftwareApplication` offers, any `Product` schema) changes with the new prices — keep INR, keep the auto-derive path.
- **SEO copy** with the price range (`Home.jsx` `Seo` description) changes; re-verify title/desc char limits (`CLAUDE.md` §9).
- **Deploy is push-to-`main`, and `main` is PR-protected** (git log = merge PRs). Work on a feature branch, open a PR. Note: `CLAUDE.md` §8 says GitHub Pages, but institutional memory records the live deploy as **Cloudflare on push to main** — verify which actually serves `takkada.com` before relying on deploy behavior; it does not block the build work.

---

## Implementation Units

### U1. Land the new mockups into source (build-safe) + fix filename

**Goal:** Make the five refreshed mockups the real source images so they survive `npm run build`, and normalize the typo'd new file.

**Requirements:** Unblocks every visual unit that references screenshots; prevents silent revert to old May images.

**Dependencies:** none (do first).

**Files:**
- `public/assets/screenshots/home-screen.png` (replace with new)
- `public/assets/screenshots/invoice-detail.png` (replace)
- `public/assets/screenshots/party-list.png` (replace)
- `public/assets/screenshots/payment-reminders.png` (replace)
- `public/assets/screenshots/reports-screen.png` (NEW — copy from `dist/assets/screenshots/Reports Sceen.png`, renamed to kebab-case, no space, fixed "Sceen"→"screen")
- Source of new images: `dist/assets/screenshots/*` (the 18-Jun edits)

**Approach:** Copy the five 18-Jun images from `dist/assets/screenshots/` into `public/assets/screenshots/`, overwriting the four existing names and adding `reports-screen.png`. Do **not** reference the spaced `Reports Sceen.png` name anywhere in code. After copying, the old-vs-new diff should show the four hero screenshots updated and one new file. Leave the other (unchanged) screenshots as-is.

**Patterns to follow:** existing `/assets/screenshots/<name>.png` reference convention in `siteContent.js` and `Home.jsx`.

**Test scenarios:**
- After `npm run build`, `dist/assets/screenshots/home-screen.png` byte-matches the new `public/` source (not the old May image) — confirms build no longer reverts the mockup.
- `reports-screen.png` exists in `public/` and resolves (no 404) when referenced.
- `grep -rn "Reports Sceen" src` returns nothing (no spaced/typo references).

**Verification:** `npm run build` succeeds; built `index.html` hero `<img>` points at the new home screen; new reports image present in `dist/`.

---

### U2. Pricing update — data, schema, copy, tests, CLAUDE.md

**Goal:** Full Access ₹7,200 → **₹9,999 + GST** (PDF bundled in), add the **₹4,000/year PDF add-on** (Collections plan), and propagate everywhere price appears.

**Requirements:** Operator pricing decision; keeps JSON-LD, on-page copy, and tests internally consistent.

**Dependencies:** none (parallel with U1).

**Files:**
- `src/data/siteContent.js` — `pricing.plans` Full Access `price` → `₹9,999`; update Full Access description to note PDF import is included; add a PDF add-on entry to `pricing.addons` (`₹4,000 / year`, note "Collections plan"); update Collections plan feature list to mention PDF add-on availability.
- `src/data/schema.js` — no logic change (offers auto-derive), but confirm `priceNumber('₹9,999') === '9999'`.
- `src/data/schema.test.js` — update assertions: `byPlan['Full Access']` → `₹9,999`; offer `price` → `'9999'`.
- `src/routes/Home.jsx` — `Seo` description price range `₹2,700 to ₹7,200/year` → `₹2,700 to ₹9,999/year`; pricing section `<h2>` `₹2,700 to ₹7,200 per year` → `₹2,700 to ₹9,999 per year`.
- `CLAUDE.md` §3 — Full Access/Auto Dispatch `₹7,200` → `₹9,999`; add PDF-to-Purchase add-on (₹4,000/year, Collections) and note PDF is included in Full Access. Keep "GST extra" framing.
- (Leave `src/lib/parseFaqs.test.js` ₹7,200 fixture string alone — it is a parser-test fixture, not the live price. Note in PR if it reads as stale.)

**Approach:** Treat `siteContent.js` `pricing` as the source; everything else either derives from it (schema) or is a copy string to update (SEO + headline) or a test assertion to realign. Keep `+ GST` / `+ GST extra` wording consistent with existing rows. Voice rules (`CLAUDE.md` §5): describe what PDF import *does* ("turn a supplier PDF into a purchase entry"), not superlatives.

**Patterns to follow:** existing `pricing.addons` shape (`{ label, price, note }`); existing plan `features` array style ("Everything in X, plus:").

**Test scenarios:**
- `src/data/schema.test.js`: Full Access plan price renders `₹9,999`; derived `Offer` for Full Access is `{ price: '9999', priceCurrency: 'INR' }`. Covers schema↔pricing consistency.
- `src/data/schema.test.js`: every plan offer still has `priceCurrency: 'INR'` and a numeric `price` (regression — no `₹`/comma leaks into the number).
- Content assertion (extend or add): `pricing.addons` contains a PDF add-on at `₹4,000 / year`.
- Grep guard: `grep -rn "7,200\|7200" src` returns only the `parseFaqs` fixture (no live-price stragglers).

**Verification:** `npm test` green; built Home `index.html` shows ₹9,999 in pricing + ₹4,000 add-on; JSON-LD offers reflect new prices.

---

### U3. PDF-to-Purchase + Reports content (copy + data, no layout yet)

**Goal:** Author the content layer for the two new feature stories so U7 can render them: **Import from PDF** (purchase entry from a supplier PDF) and **Reports / This Financial Year** (the new `reports-screen.png`).

**Requirements:** Makes the headline new capability visible; uses the otherwise-unused new Reports mockup.

**Dependencies:** U1 (needs `reports-screen.png` and new `invoice-detail.png`), U2 (pricing context for PDF copy).

**Files:**
- `src/data/siteContent.js` — add a `coreFeatures` (or dedicated `pdfImport`) entry: label "Import from PDF", behavior-led title + description (e.g. supplier PDF → mapped purchase entry into Tally, AI extraction, review-before-create), `screenshot: '/assets/screenshots/home-screen.png'` or a dedicated PDF screen if available, `secondaryScreenshot: '/assets/screenshots/invoice-detail.png'`. Add a Reports feature entry referencing `/assets/screenshots/reports-screen.png` (This-FY totals + action lists: Outstanding by Age, Customer Analytics).
- `src/data/siteContent.js` — `navLinks` / `footerColumns`: add a "PDF Import" product anchor (e.g. `#pdf-import`) so it's discoverable.
- `comparisonSection` already has the "PDF/OCR — scan purchase invoices into Tally" row — leave it; confirm it still reads true.

**Approach:** Write copy to the craft bar: specific behavior, not superlatives ("a supplier sends a PDF bill, you turn it into a Tally purchase voucher in a few taps, lines and GST pre-filled for you to confirm"). Hinglish acceptable for Tier-2/3 framing per §5. No AI-roadmap promises beyond what ships. Reports copy mirrors the mockup's real labels ("This Financial Year", "Outstanding by Age", "Customer Analytics").

**Patterns to follow:** existing `coreFeatures` entry shape (`id`, `label`, `title`, `description`, `screenshot`, `secondaryScreenshot`); existing `navLinks`/`footerColumns` shapes.

**Test scenarios:**
- Content presence (extend a render/data test): a `coreFeatures`/feature entry with id matching the PDF section exists and has a non-empty title + description + screenshot path that resolves.
- Banned-words guard on new copy: `grep -niE "seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer" src/data/siteContent.js` returns nothing (craft §12).
- Reports feature entry references `/assets/screenshots/reports-screen.png` (not the spaced filename).

**Verification:** new feature objects render in U7 without missing-image fallbacks; nav/footer anchor resolves to the section.

---

### U4. Token foundation rebuild + CLAUDE.md §6/§7 rewrite

**Goal:** Define the new authoritative design-token layer for the teardown (color depth, spacing scale, radii, elevation/shadows, type scale, motion tokens) and end the doc-vs-CSS drift.

**Requirements:** Every subsequent visual unit consumes these tokens; governance docs must match.

**Dependencies:** none structurally, but begins Phase 2 (after Phase 1 data is correct).

**Files:**
- `src/styles.css` — rewrite the `:root` token block (`── Design Tokens ──`) and the shared scales it implies (spacing, radius, shadow, type). Keep `--font-sans` / `--font-serif` (decision) unless a justified swap.
- `CLAUDE.md` §6 (Design tokens) and §7 (Typography) — rewrite to the new token set so the doc is the live source of truth again. If type pairing is retained, §7 mostly stands; update only color/component-pattern tokens in §6.

**Approach:** Establish a deliberate sage-rooted system with more depth than the current flat palette — layered surfaces, a real elevation scale (soft shadows, not 1px outlines per §6), a tighter type scale, and motion duration/easing tokens so U9's motion is consistent. Preserve the brand sage identity; "teardown" = stronger system, not off-brand. Keep `.tabular-nums` utility. Don't introduce a second font family.

**Execution note:** Land tokens before touching components so primitives (U5) build on the final variables, not placeholders.

**Patterns to follow:** existing `:root` custom-property convention; `CLAUDE.md` §6 component-pattern vocabulary (cards 16px radius, icon containers, overline labels, 3 button variants) as the *baseline to evolve*, not discard.

**Test scenarios:** `Test expectation: none — token/config layer; correctness is verified visually in U10 and by build success.` (No behavioral logic.)

**Verification:** `npm run build` compiles; spot-check that existing pages still resolve tokens (no `var(--undefined)`); `CLAUDE.md` §6 color values match `:root`.

---

### U5. Shared primitives rebuilt in the new language

**Goal:** Rebuild the reusable vocabulary every section composes from: nav, footer, CTA buttons (3 variants), section shell (overline + heading + subtitle), card family, and the phone-mockup frame.

**Requirements:** Consistent component vocabulary (craft #10); the spine the page rebuild hangs on.

**Dependencies:** U4.

**Files:**
- `src/styles.css` — `── Navigation ──`, `── Footer ──`, `── CTA Buttons ──`, `── Section Shared ──`, card/grid-card/tally-card classes, phone-frame classes.
- `src/Layout.jsx` — nav/footer markup if structure changes (keep nav links + connector link behavior).
- `src/components/CTAButton.jsx`, `src/components/PhoneMockup.jsx`, `src/components/FeatureCard.jsx`, `src/components/FeatureIcon.jsx` — adjust markup/props to the new system if needed (keep public props stable where consumed elsewhere).

**Approach:** One coherent card/elevation/overline/button set used everywhere. The PhoneMockup frame is central (every feature row + hero uses it) — make its framing crisp (device bezel, shadow, optional subtle float) since the new mockups are the star. Keep `CTAButton` variant API (`primary`/`secondary`/`outline`/`dark`) so callers don't break.

**Test scenarios:**
- `src/Layout.test.jsx` (existing) still passes — nav renders expected links, footer columns render. Extend if markup IDs changed.
- `src/components/PhoneModal.test.jsx` still passes (phone modal unaffected or updated in lockstep).
- Render smoke: `CTAButton` renders each variant without error.

**Verification:** existing component tests green; nav/footer render correctly across one Home + one secondary page in `npm run preview`.

---

### U6. Hero teardown (new above-the-fold concept)

**Goal:** Rebuild the hero into a stronger above-the-fold that leads with "get paid without chasing" and showcases the refreshed app, per craft #1/#11 (distributor is the hero).

**Requirements:** First impression; sets the visual tone for the teardown.

**Dependencies:** U4, U5; uses new `home-screen.png` + `party-list.png` (U1). **Metrics/hero stats KEPT verbatim (operator decision).**

**Files:**
- `src/routes/Home.jsx` — hero section markup.
- `src/styles.css` — `── Hero ──` (+ `── Metrics Bar ──` if hero+metrics recompose).

**Approach:** New composition (e.g. asymmetric copy/mockup layout, layered phone frames, depth via the new elevation tokens). Keep the existing hero copy intent and the `heroStats` block **unchanged in content**. Lead with distributor's world, then what Takkada does. Mention "Import from PDF" as a supporting proof of the refreshed product if it strengthens the hero (optional).

**Test scenarios:** `Test expectation: none — presentation. Verified via build + preview screenshot in U10.` Guard: hero still renders the three `heroStats` values unchanged (snapshot/string check that `100+`, `₹17Cr+`, `1000s` are present — protects the operator decision).

**Verification:** preview screenshot of hero at desktop + mobile widths; stats present; CTAs resolve.

---

### U7. Mid-page sections teardown (incl. PDF + Reports feature rows)

**Goal:** Rebuild every mid-page section in the new system and add the two new feature rows (PDF import, Reports/This-FY).

**Requirements:** Surfaces the headline PDF feature; modernizes the bulk of the page.

**Dependencies:** U3 (content), U4, U5, U6.

**Files:**
- `src/routes/Home.jsx` — problem, intro, capabilities, `coreFeatures.map` rows (now including PDF + Reports), feature grid, advanced (e-invoice/RBAC), `ComparisonSection`, Tally connector, how-it-works, who-it-is-for.
- `src/styles.css` — `── Problem Section ──`, `── Intro Section ──`, `── Feature Sections ──`, `── Feature Grid ──`, `── Tally Section ──`, `── How It Works ──`, `── Comparison Section ──`.
- `src/components/ComparisonSection.jsx` — restyle only; the PDF/OCR row already exists in data.

**Approach:** Apply the new card/elevation/overline system uniformly. The PDF feature row is a *headline* row — give it prominence (e.g. first or visually emphasized among `coreFeatures`). Reports row uses `reports-screen.png`. Keep alternating `feature-section--reversed` rhythm or replace with a better cadence from the teardown. Don't feature-dump (craft #1): each row = one behavior that changes for the distributor.

**Test scenarios:** `Test expectation: none — presentation` for styling. Behavioral guards: PDF feature row renders with its image (no broken `<img>`); Reports row renders `reports-screen.png`; comparison table renders all rows including PDF/OCR.

**Verification:** preview walkthrough of every mid-page section desktop + mobile; no broken images; PDF + Reports rows visually present and prominent.

---

### U8. Conversion sections teardown (pricing UI, testimonial, FAQ, final CTA)

**Goal:** Rebuild the pricing block (4 plans + add-ons, PDF surfaced), testimonial, FAQ accordion, and final CTA band in the new system.

**Requirements:** The decision/convert surface must reflect ₹9,999 + the ₹4,000 PDF add-on clearly.

**Dependencies:** U2 (pricing data), U4, U5.

**Files:**
- `src/routes/Home.jsx` — pricing section, testimonial, FAQ, final CTA.
- `src/styles.css` — `── Pricing ──`, `── Testimonials ──`, `── FAQ ──`, `── Final CTA ──`.
- `src/components/FAQItem.jsx`, `src/components/TestimonialCard.jsx` — restyle to new system (keep behavior/props).

**Approach:** Pricing strip in the new card system; Full Access highlighted ("Most Popular") and clearly noting **PDF import included**; add-ons row surfaces the **₹4,000 PDF add-on** with its "Collections plan" note. Tabular-nums on every ₹ amount (craft #9/#12). FAQ accordion keeps single-open behavior (`faqIndex` state).

**Test scenarios:**
- Pricing renders ₹9,999 for Full Access and the ₹4,000 PDF add-on (string presence).
- `FAQItem` open/close still toggles (existing behavior preserved).
- `.tabular-nums` class present on rendered ₹ amounts in the pricing block.

**Verification:** preview of pricing/testimonial/FAQ/CTA; prices correct; FAQ toggles; CTAs resolve to demo link.

---

### U9. Motion, responsive, and accessibility pass

**Goal:** Add purposeful motion (craft #5), verify every breakpoint, and check a11y basics.

**Requirements:** Motion must teach, not decorate; mobile is the primary ICP context.

**Dependencies:** U6, U7, U8.

**Files:**
- `src/styles.css` — `── Mobile Refinements ──`, `── Mobile ──`, scroll-reveal/animated-heading sections; motion tokens from U4.
- `src/hooks/useScrollFx.js`, `src/components/AnimatedHeading.jsx` — tune if reused.

**Approach:** Default to no motion; opt-in per component with a documented reason (craft #5). Honor `prefers-reduced-motion`. Test at mobile (~360–414px), tablet, desktop. Check tap targets, contrast against new tokens, alt text on all mockups.

**Test scenarios:** `Test expectation: none — visual/interaction; verified in preview at multiple widths and with reduced-motion emulation.` Guard: every mockup `<img>` has non-empty `alt`.

**Verification:** preview at three widths + reduced-motion; no layout breakage; no motion that doesn't reflect product behavior.

---

### U10. Coherence sweep, SEO/schema parity, craft walkthrough, ship

**Goal:** Verify the shared-system teardown didn't break secondary pages, confirm SEO/schema, run the project's enforced craft checklist, then PR.

**Requirements:** `CLAUDE.md` §9 SEO/AEO + §12 session-end checklist are enforced gates.

**Dependencies:** U1–U9.

**Files (verify/touch as needed):**
- Secondary pages: `src/routes/{AboutUs,ContactUs,PrivacyPolicy,TermsAndConditions,RefundPolicy,Partners,BlogIndex,BlogPost,MobileTally,ForDistributors,WhatsAppInvoice,AutoReconciliation}.jsx`, `src/components/{ICPTemplate,CompanyPageLayout}.jsx` — fix only where the new tokens/primitives made them incoherent.
- `src/components/Seo.jsx`, `src/data/schema.js` — verify titles/descriptions under limits, OG tags, JSON-LD with new INR prices.
- `src/routes/__tests__/landing-schema.test.jsx`, `src/data/schema.test.js` — green with new prices.

**Approach:** Walk the rendered site end-to-end in `npm run preview` (craft #6/#12): dead ends, tone shifts, distributor confusion. Run the §12 checklist: `npm run build` clean; `cat dist/<page>/index.html` shows real content; new/changed pages have unique <title>/description under limits; banned-words grep on changed files; tabular-nums on every ₹/%/date in changed files; one read-aloud craft pass. **Run before push** (project rule for UI). Then feature branch → PR into `main` (PR-protected).

**Test scenarios:**
- `npm test` full suite green (schema, layout, FAQ, parseFaqs, blog-faq-schema, landing-schema).
- Raw-HTML check: `dist/index.html` contains the hero copy, ₹9,999 pricing, and the PDF feature heading (not an empty root div).
- Banned-words grep across changed `src` files returns nothing.
- Each changed page's `<title>` < 60 chars and meta description < 160 chars.

**Verification:** clean build; full preview walkthrough reported (dead ends / tone / confusion); checklist passed; PR opened against `main`.

---

## Scope Boundaries

**In scope:** Full visual teardown of the Home route + shared design system (tokens, nav, footer, buttons, cards, sections, phone mockup, motion); PDF-to-Purchase + Reports feature surfacing; ₹9,999 + ₹4,000 pricing propagation (data, schema, copy, tests, `CLAUDE.md`); landing the new mockups into source; SEO/schema parity; secondary-page coherence verification.

**Explicitly kept unchanged (operator decision):** hero stats / metrics bar ("100+ businesses · ₹17Cr+ monthly · thousands"). Not touched despite the §4–§5 honesty tension.

### Deferred to Follow-Up Work
- **Dedicated PDF-import SEO landing route** (e.g. `/pdf-purchase-import`) mirroring the ICP-template pattern, with its own schema/keywords. This release surfaces PDF on Home only.
- **Bespoke redesign of each secondary page** (blog post template, ICP pages, company pages) beyond inheriting the new system and coherence fixes.
- **Re-shooting / adding more app mockups** beyond the five provided 2026-06-18.
- **Reconfirming the live deploy target** (GitHub Pages per `CLAUDE.md` §8 vs Cloudflare per institutional memory) — worth resolving but orthogonal to this build.

### Outside this work
- App-side PDF-to-Purchase feature itself (lives in `takkada/` Flutter app; already shipped per memory).
- Pricing/billing enforcement in the backend (this is marketing-site copy only).

---

## Risk Analysis & Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Build reverts new mockups (dist-only edits) | Hero/features silently show old design | U1 lands them in `public/` first; U1 test asserts post-build bytes match new source |
| Token teardown breaks secondary pages | Blog/company/ICP pages look broken | U10 coherence sweep; tokens reconciled not removed; keep `var()` names where reused |
| Stale price strings linger | Site shows mixed ₹7,200/₹9,999 | U2 grep guard + schema tests; single-source pricing in `siteContent.js` |
| Craft-review pass "fixes" the kept stats | Contradicts operator decision | Decision recorded here + U6 guard asserts stats present |
| `CLAUDE.md` §6/§7 drift left unresolved | Future agents build off stale tokens | U4 rewrites §6 (and §7 if type changes) to match `:root` |
| Font swap temptation in "full teardown" | Licensing/self-host churn, §7 violation | Key Decision: retain Inter+DM Serif unless justified + §7 rewritten |

---

## Verification (release-level)

- `npm run build` clean; `npm test` green (updated pricing assertions included).
- `npm run preview` full walkthrough: no dead ends, consistent tone, no distributor confusion (craft #6).
- Raw-HTML/SEO checks pass for changed pages (`CLAUDE.md` §9/§12).
- New mockups present in built output; PDF + Reports feature sections render; ₹9,999 + ₹4,000 visible and correct in copy and JSON-LD.
- Hero stats unchanged.
- PR opened against `main` (never pushed directly).
