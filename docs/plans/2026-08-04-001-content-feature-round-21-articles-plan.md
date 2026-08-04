---
title: "content: 21-article feature round (e-way bill, schemes, salesman, portal, payments, WhatsApp)"
type: feat
status: active
date: 2026-08-04
origin: ../../docs/brainstorms/2026-08-04-feature-blog-round-requirements.md
---

# Content: 21-Article Feature Round

**Target repo:** `takkada website/landing` (this repo). Origin requirements doc lives in the monorepo root `docs/brainstorms/`.

## Summary

Ship 21 problem-first SEO/AEO articles covering the six newly-live product features, in five thematic clusters weighted toward the corpus's open ground (schemes/agri, portal, field sales, e-way bill) and capped where the corpus is saturated (WhatsApp reminders, payment gateway). Each cluster is one PR to `main` following the 2026-07-21 batch's shared spec, plus a backfill of the 40 missing July-batch header images.

---

## Problem Frame

Six shipped features have zero or near-zero blog coverage while the blog is the site's main organic engine (139 posts). See origin doc for the full frame. Plan-specific additions from research: the e-way bill "closure" rule the round was premised on is officially **in abeyance** (GSTN Advisory 668, 2026-07-29), and the corpus audit found the WhatsApp-reminder and gateway clusters saturated — both materially reshape topic selection.

---

## Requirements

- R1. 21 posts across six features, split by search intent: e-way bill 4, schemes/agri 5, salesman 4, portal + invoice-pick 6, WhatsApp own-number 2 (origin R1, rebalanced per corpus overlap audit; user-confirmed 2026-08-04).
- R2. Problem-first framing; each post targets one primary keyword not already claimed by an existing post's `primary_keyword` (origin R2).
- R3. E-way bill compliance content matches the verified 2026 state: closure rule paused (Advisory 668), 180/360-day rules live since 2025-01-01, EWB 2.0 live, penalties per CGST Act exact wording (origin R4).
- R4. Feature mechanics spot-checked against the live product before each cluster's PR (origin R5).
- R5. Claims discipline: 0% MDR locked wording; own-number WhatsApp always labeled "early access"; only 100+ businesses / ₹17Cr+ monthly as traction figures; prices only from the live rate card (Clarity ₹2,900 / Momentum ₹4,500 / Assurance ₹6,480 / Copilot ₹8,500, Payment Collection add-on ₹1,500); no internal tech-stack names (origin R6).
- R6. Every post follows the live shared spec (NOT the stale `blog-batch.md`): lead-answer paragraph 134–167 words first, `## Key Highlights` ≥3, `## In This Article`, 5–7 H2s at 1,200–2,400 words, `## Frequently Asked Questions` with 5–6 `**Q: …**` / `A: …` pairs, canonical closing one-liner + calendar demo link, `author: "founder"`, ≥3 internal links to existing slugs (origin R7).
- R7. Publication via feature branch → PR → merge to `main` (Cloudflare deploys); `npm run build` (includes `lint:content`) and `npm test` green before every PR (origin R8).
- R8. Hindi/Hinglish variants only where a real query exists; satisfied inside posts via Hinglish FAQ questions (e.g., "e way bill kaise banaye Tally se", "UPI se payment aaya kis bill ka hai") rather than separate Hindi posts this round (origin R3 — see Key Technical Decisions).

**Origin acceptance examples:** AE1 (covers R3), AE2 (covers R4, R5), AE3 (covers R6, R7).

---

## Scope Boundaries

- No rewriting, merging, or re-dating existing posts — new posts only link to them (July-batch rule).
- No new "whatsapp payment reminder", MDR, or gateway-comparison head terms — those clusters are saturated; new posts link into them instead.
- No announcement posts, no takkada.ai content, no pricing/traction beyond R5 (origin).
- No blog-engine code changes; the only non-content file touched is `scripts/generate-blog-images.py` (data list append).
- No use of the stale `blog-batch.md` push flow (`git push origin HEAD:main` is rejected — `main` is PR-protected), the stale `scripts/publish-blogs.sh`, or the retired `blog-drafts` import pipeline.

### Deferred to Follow-Up Work

- Standalone Hindi-language posts (e.g., a full "e way bill kaise banaye" post): future batch if the Hinglish FAQ blocks show traction.
- Promoting the `parseFaqs` "FAQ section found but no Q/A pairs" build warning to a hard gate: separate engine change.
- A "what's new in Takkada" announcement channel for existing customers: operator-run WhatsApp broadcast, not blog.

---

## Context & Research

### Relevant Code and Patterns

- Shared spec + batch/PR conventions: `docs/plans/2026-07-21-001-content-40-articles-payables-reports-autopilot-plan.md` (the authoritative template; `blog-batch.md` has drifted — wrong push flow, wrong opening structure, legacy author string).
- Gold-standard post to mirror: `content/blog/accounts-payable-ageing-report-tally.md` (frontmatter: title, slug, meta_title ≤60, meta_description ≤160, primary_keyword, date, updated, author: "founder", category, excerpt).
- FAQ→schema chain is automatic at build time: `src/lib/parseFaqs.js` (heading `## …Frequently Asked Questions…`; `**Q: …**` / `A: …`; no links inside answers) → `src/routes/BlogPost.jsx` → `src/data/schema.js` `faqPageSchema`. `updated` frontmatter drives `dateModified` (AI-citation recency signal).
- Header images: append `{slug, title, category, tagline ≤80 chars}` entries to `ARTICLES` in `scripts/generate-blog-images.py`, run it (needs Pillow), PNGs land in `public/assets/blog/<slug>.png`; `src/lib/blogPosts.js` hardcodes `heroImage` per slug with no existence check.
- Lint gate: `scripts/checkLeadAnswer.mjs` — prose paragraph first (hard fail on list/heading), 134–167 words target (120–180 tolerance); new posts are not grandfathered.
- Banned-token greps (em-dash `—` banned; en-dash in ranges fine): `seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|trusted by thousands|millions of|99.9%`.
- CTA band renders automatically (`src/components/BlogCtaBand.jsx`) — author nothing.
- Closing line, verbatim in 103/139 posts: `Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).`
- Live categories with room: `Field Sales` (2 posts), plus `How-To`, `Collections`, `Reports`, `Trust`. New free-form categories are safe (BlogIndex renders them untyped); this round adds `Compliance` (e-way cluster) and `Schemes` (agri cluster).

### Feature truth (from product code and memory, to be spot-checked per U-unit)

- WhatsApp own-number: self-serve Meta onboarding at `/settings/whatsapp-number`; submitting records the number, operator completes provider setup, then sends go from the customer's own number. Early-access add-on ₹2,000/yr. Never claim instant self-serve activation.
- E-way: generation from invoice, Part-A auto-population with e-invoice, auto-arm for high-value e-invoices, standalone e-way with QR, cancellation flow (WhiteBooks GSP credentials).
- Salesman: order taking synced to Tally, field visits with who/where/when-stamped photos, salesman-wise boards (orders or invoices basis), role gates restricting screens/parties.
- Schemes: scheme config with voucher-type and entity pickers, season/payment windows, scheme credit notes (live for agri customers; engine rollout is per-company).
- Invoice-pick payments: pay-page (`app.takkada.com/#/pay?token=…`) shows pending invoices; buyer selects which to pay; allocation lands bill-by-bill (Agst Ref) in Tally.
- Portal: customers/vendors view their ledger and pending bills via shared links without a Takkada login.

### External References (verified 2026-08-04 by research agent; cite in posts)

- Closure rule paused: GSTN Advisory No. 668 (2026-07-29); Business Standard 2026-07-30; ClearTax updated pages. Closure is voluntary, same-day/next-day window, OTP-based, no penalty for not closing. Ship-To GSTIN mandate also on hold.
- Live rules: 180-day generation limit + 360-day extension cap (GSTN advisory 2024-12-17, effective 2025-01-01); EWB Portal 2.0 (2025-07-01); 30-day IRP limit for AATO ≥ ₹10cr (2025-04-01); 2FA all taxpayers (2025-04-01); Rule 138E blocking on unfiled returns.
- Penalties: Section 129 detention (pull exact percentages from the CGST Act bare text before publishing — aggregator sites paraphrase inconsistently); ₹10,000-or-tax-evaded general penalty; exempt-goods cap ₹25,000.
- Keyword lists per topic: research agent report 2026-08-04 (question-format queries marked for FAQ blocks; Hinglish queries confirmed).

---

## Key Technical Decisions

- **Rebalanced cluster sizes** (5/6/4/4/2 vs origin's rough 4/4/4/3/3/3): corpus audit found schemes at zero coverage, portal at one post, while WhatsApp reminders have 7 posts and gateway ~20. Writing into saturation cannibalizes our own rankings. User-confirmed 2026-08-04.
- **E-way framing = "paused rule, be ready"**: accuracy beats urgency; half the ranking tax sites still say the rule is live from Aug 1 — being the correct answer is the AEO win. User-confirmed.
- **Hinglish inside FAQ blocks, not separate posts** (R8): keeps the 21-post budget on the six features while still capturing question-format Hinglish queries; standalone Hindi posts deferred.
- **Follow the July-batch spec, not `blog-batch.md`**: the command file's push flow is rejected by branch protection and its structure fails `lint:content`.
- **One PR per cluster, pilot post first**: the July batch de-risked 39 rework loops by locking the template on one article; same here.
- **Image backfill included** (U7): 40/139 posts currently render broken heroes and 404 `og:image`s — an active SEO liability adjacent to work we're already doing in the same script. User-confirmed.

---

## Open Questions

### Resolved During Planning

- Is the e-way closure rule live?: No — in abeyance since 2026-07-29 (Advisory 668). Frame as preparation, not obligation.
- Can we claim WhatsApp own-number as live?: Only as **early access** (site rule; zero customers enabled as of 2026-08-03).
- Do new categories break anything?: No — free-form tags, no validation.

### Deferred to Implementation

- Exact Section 129 penalty wording: pull from CGST Act bare text at write time (U3).
- Per-state intra-state e-way thresholds table: verify against current state notifications at write time or omit the table (U3).
- Which existing hub post each new post links to: chosen per post at write time from the overlap map (all units).
- Live rate-card prices and the ₹2,000/yr own-number add-on price: re-verify against `src/data/siteContent.js` on write day (U6).

---

## Implementation Units

Every content unit (U1–U6) shares these **standing test scenarios**, verified per post:
- Happy path: `npm run build` passes — `lint:content` accepts the lead answer (prose first, 134–167 words), sitemap picks up the new `/blog/<slug>/` route.
- Happy path: FAQ section parses to ≥5 Q/A pairs (build emits no `parseFaqs` warning for the slug); questions end with `?`; no links/markdown inside answers (corpus-wide `parseFaqs.test.js` enforces).
- Edge case: primary keyword appears in `title`, first H2 after Key Highlights, and first 100 words; `meta_title` ≤60 chars, `meta_description` ≤160; slug matches filename; no existing post claims the same `primary_keyword`.
- Error path: banned-token greps return zero hits (incl. em-dash); no "Not X. Y." fragments; no invented numbers — every rupee figure, date, and stat traces to R5 sources or the cited advisories.
- Integration: every internal link target exists in `content/blog/`; ≥3 internal links; closing one-liner verbatim; `npm test` stays green (180 tests).

### U1. Pilot post: dealer scheme management (locks the template)

**Goal:** One publishable post proving the template end-to-end before scaling to 20 more.

**Requirements:** R1, R2, R5, R6, R7

**Dependencies:** None

**Files:**
- Create: `content/blog/dealer-scheme-management-tally.md`
- Modify: `scripts/generate-blog-images.py` (1 entry)

**Approach:** Target `primary_keyword: "dealer scheme management in tally"` (zero corpus competition). Category `Schemes`. Cover trade schemes/QPS/TOD, why Tally alone can't settle them, how scheme credit notes close the loop. FAQ block takes the question queries ("how to manage dealer schemes in Tally", "how to calculate scheme payout at season end").

**Verification:** Standing scenarios pass; full build + tests green; post reads correctly in `npm run dev` preview. Ship inside the U2 PR.

### U2. Cluster B — schemes/agri (4 remaining posts)

**Goal:** Own the greenfield agri-scheme cluster.

**Requirements:** R1, R2, R4, R5, R6, R7

**Dependencies:** U1 (template locked)

**Files:**
- Create: `content/blog/season-scheme-settlement-agri-input.md` (pk "season scheme calculation for dealers"; kharif/rabi framing), `content/blog/scheme-credit-note-gst-distributors.md` (pk "scheme credit note gst"), `content/blog/crop-protection-dealer-scheme-software.md` (pk "agri input dealer scheme software"; vertical page mirroring the `zero-mdr-upi-for-*-distributors` series), `content/blog/quantity-discount-vs-cash-discount-gst.md` (pk "quantity discount vs cash discount")
- Modify: `scripts/generate-blog-images.py` (4 entries)

**Approach:** Internal links: `receivables-app-for-agri-input-distributors` (only existing agri post), U1, and each other. GST treatment claims (credit-note vs discount) cite CBIC circulars — flag anything unverifiable rather than paraphrasing tax sites.

**Verification:** Standing scenarios. **Spot-check before PR:** confirm on the live product that scheme config + scheme credit notes work as described for a real agri company (Covers AE2). One PR: `content(schemes): add Batch B agri scheme articles (U1+U2, 5 posts)`.

### U3. Cluster A — e-way bill (4 posts)

**Goal:** Be the accurate answer on e-way compliance while competitors' pages are stale.

**Requirements:** R1, R2, R3, R5, R6, R7

**Dependencies:** U1

**Files:**
- Create: `content/blog/e-way-bill-closure-rule-2026.md` (pk "e way bill closure"; the paused-rule explainer — Covers AE1), `content/blog/e-way-bill-180-day-rule.md` (pk "e way bill 180 days rule"), `content/blog/e-way-bill-with-e-invoice-auto-population.md` (pk "e way bill auto generation with e invoice"), `content/blog/e-way-bill-expiry-extension-penalty.md` (pk "e way bill expired penalty")
- Modify: `scripts/generate-blog-images.py` (4 entries)

**Approach:** Category `Compliance`. Hub link: `e-way-bill-on-phone` (existing, keeps its head term). Closure post leads with "voluntary + currently paused" and dates every claim; auto-population post must say Part-A auto-*population* (not auto-generation) at the portal level, with Takkada's auto-arm for high-value e-invoices described as the app behavior. Hinglish FAQ entries ("e way bill kaise banaye Tally se").

**Execution note:** Pull Section 129 percentages from the CGST Act bare text and re-check for a fresh GSTN advisory superseding No. 668 on write day — a revival of the rule flips the framing.

**Verification:** Standing scenarios; every regulatory claim carries an effective date and source. PR: `content(compliance): add Batch A e-way bill articles (U3, 4 posts)`.

### U4. Cluster C — salesman / field sales (4 posts)

**Goal:** Grow the 2-post `Field Sales` category into a real cluster.

**Requirements:** R1, R2, R4, R5, R6, R7

**Dependencies:** U1

**Files:**
- Create: `content/blog/restrict-salesman-access-tally.md` (pk "restrict salesman access in tally"), `content/blog/salesman-visit-tracking-photo-proof.md` (pk "salesman visit tracking app"), `content/blog/salesman-order-to-tally-without-reentry.md` (pk "salesman order taking without re-entry"), `content/blog/salesman-wise-collection-accountability.md` (pk "salesman wise collection report")
- Modify: `scripts/generate-blog-images.py` (4 entries)

**Approach:** Avoid the claimed head terms (`salesman app tally india`, `field order collection app tally`, `salesman wise sales report tally`) — link to them instead. Mirror competitor vocabulary the audience searches ("beat plan", "no manual re-entry") without naming competitors. Visit-tracking post uses the stamped-photo (who/where/when) proof angle.

**Verification:** Standing scenarios. **Spot-check before PR:** role-gate behavior (what a salesman login can and cannot see) and visit-photo stamping confirmed on the live app (Covers AE2). PR: `content(field-sales): add Batch C salesman articles (U4, 4 posts)`.

### U5. Cluster D — portal + buyer invoice selection (6 posts)

**Goal:** Own the near-empty portal/ledger-sharing space and the buyer-side payment-selection angle.

**Requirements:** R1, R2, R4, R5, R6, R7

**Dependencies:** U1

**Files:**
- Create: `content/blog/customer-portal-for-distributors-india.md` (pk "customer portal for distributors"), `content/blog/customers-see-outstanding-online.md` (pk "can my customers see their outstanding online"), `content/blog/vendor-portal-pending-invoices.md` (pk "vendor portal pending invoices"), `content/blog/online-balance-confirmation-ledger.md` (pk "ledger balance confirmation online"), `content/blog/let-buyers-choose-invoices-to-pay.md` (pk "bill by bill payment link"), `content/blog/which-invoice-did-customer-pay-upi.md` (pk "upi payment against which invoice")
- Modify: `scripts/generate-blog-images.py` (6 entries)

**Approach:** No MDR/gateway angle (saturated) — the two payment posts are about *allocation certainty*: buyer picks the bills, Tally gets clean Agst Ref entries, "UPI se payment aaya kis bill ka hai" dies as a question. Link into `how-to-split-upi-payment-across-tally-invoices`, `bill-by-bill-against-reference-tally`, `how-to-share-ledger-statement-whatsapp-tally`, `partywise-outstanding-statement-tally`.

**Verification:** Standing scenarios. **Spot-check before PR:** open a real pay-page link and a ledger-share link; confirm the pending-invoice selection flow and what a portal viewer actually sees (Covers AE2). PR: `content(portal): add Batch D portal and payment-selection articles (U5, 6 posts)`.

### U6. Cluster E — WhatsApp own-number (2 posts)

**Goal:** Claim the unclaimed "your own number" positioning without violating the early-access rule.

**Requirements:** R1, R2, R4, R5, R6, R7

**Dependencies:** U1

**Files:**
- Create: `content/blog/send-reminders-from-your-own-whatsapp-number.md` (pk "payment reminder from own whatsapp number"), `content/blog/whatsapp-business-api-own-number-vs-third-party.md` (pk "whatsapp business api own number vs third party")
- Modify: `scripts/generate-blog-images.py` (2 entries)

**Approach:** Positioning: reminders from the number your retailers already know, vs the BSP-market default of a separate rented number. FAQ takes the anxiety query ("will my number get banned for sending payment reminders on WhatsApp") with the honest Meta-Business-API answer. **Every availability mention carries "early access"**; onboarding described as it is (submit number in app → setup completed for you → number goes live), never as instant self-serve. Link into the existing 7-post reminder cluster rather than re-taking its head terms.

**Verification:** Standing scenarios; grep the two posts for the feature name appearing without "early access" nearby; add-on price re-verified against `src/data/siteContent.js` (Covers AE2). PR: `content(whatsapp): add Batch E own-number articles (U6, 2 posts)`.

### U7. Header images: 21 new + 40 backfill

**Goal:** Every post in the corpus has a hero image and valid `og:image` — including the 40 July-batch posts currently 404ing.

**Requirements:** R7 (origin R7's image convention); fixes a live SEO defect

**Dependencies:** U1–U6 (slugs final)

**Files:**
- Modify: `scripts/generate-blog-images.py` (verify all 21 new entries landed; add 40 entries for the July-batch slugs + optionally `sample-post`)
- Create: 61 PNGs in `public/assets/blog/`

**Approach:** Taglines ≤80 chars distilled from each post's excerpt. Backfill entries take their `title`/`category` from the existing posts' frontmatter verbatim.

**Test expectation: none** — generator script data append; verification is visual and structural, not behavioral.

**Verification:** `ls public/assets/blog/*.png | wc -l` accounts for every `content/blog/*.md` slug; spot-open 3 images (one new, two backfill) to confirm rendering; `npm run build` green. Backfill ships as its own PR (`content(images): backfill 40 missing July-batch blog headers`); new-post images ship inside their cluster PRs.

---

## System-Wide Impact

- **Interaction graph:** Content-only; the build pipeline (`lint:content` → SSG → sitemap → preload check) picks up new posts automatically. No route registration, no test-file changes.
- **API surface parity:** None. The one shared-file touch is the image script's data list.
- **Unchanged invariants:** Existing posts untouched (renaming/deleting `biz-analyst-alternative` or `distributor-cash-flow-receivables` would break `blog-faq-schema.test.jsx` — we don't). `schema.test.js` pricing guards unaffected as long as R5 prices are respected.
- **Integration coverage:** The corpus-wide `parseFaqs.test.js` loop automatically covers every new post's FAQ block.

---

## Risks & Dependencies

| Risk | Mitigation |
|------|------------|
| GSTN revives or re-schedules the closure rule mid-round | U3 execution note: re-check advisories on write day; closure post structured so the status paragraph is one edit |
| A feature spot-check contradicts a drafted claim | Per-unit spot-checks run before each PR; the affected sentence softens or the post holds (origin dependency) |
| Em-dash/banned-token slips across ~35k words | Lint greps run per cluster before commit; build's `lint:content` is the backstop |
| Keyword cannibalization despite the audit | Every new `primary_keyword` checked against the 139 existing frontmatters before writing (standing scenario) |
| Section 129 figures published wrong | Bare-Act verification required before U3 merges; if unverifiable, state the penalty class without exact percentages |

---

## Sources & References

- **Origin document:** `../../docs/brainstorms/2026-08-04-feature-blog-round-requirements.md` (monorepo root)
- July batch spec: `docs/plans/2026-07-21-001-content-40-articles-payables-reports-autopilot-plan.md`
- Content strategy: monorepo `docs/seo-aeo/01-blog-content-strategy.md`
- FAQ schema plan: `docs/plans/2026-06-15-001-feat-blog-faqpage-schema-plan.md`
- Research reports (2026-08-04): e-way rule + keyword landscape (web agent); blog-engine + slug inventory audit (repo agent) — both summarized in Context & Research above
