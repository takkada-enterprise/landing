---
status: active
type: content
created: 2026-06-14
target_repo: takkada website/landing (github.com/takkada-enterprise/landing)
primary_keywords: ["tally mobile", "tally on mobile", "payment on tally"]
---

# content: 10-article AEO/SEO cluster to rank for "tally mobile", "tally on mobile", "payment on tally"

**Target repo:** `takkada website/landing` (all paths below are relative to that repo root, not the PaySaathi monorepo root).

---

## Summary

Ship 10 new human-quality, AEO+SEO-optimised blog articles to `content/blog/`, each with a matching 1200×630 brand header image, then build-verify, lint, and (operator-gated) push to `main` for GitHub Pages deploy.

The three target head terms already have dedicated pages:

| Head term | Existing page (do not duplicate) |
|---|---|
| `tally on mobile` | `content/blog/tally-on-mobile.md` |
| `tally mobile` / `tally mobile app india` | `content/blog/tally-mobile-app-india.md`, `tally-prime-mobile-app.md` |
| `payment on tally` | `content/blog/payment-link-tally-integration.md`, `upi-collection-app-for-distributors-india.md` |

So the strategy is **topic-cluster reinforcement**, not head-term repetition: 10 long-tail support articles that each capture an adjacent query, answer it specifically (AEO), and link *up* to the head pages with keyword-rich anchors. This is what moves the head terms — a hub gets stronger as its spokes accumulate internal links and topical depth. Writing an 11th "tally on mobile" page would cannibalise the existing one, not help it.

This plan is the per-run specialisation of the existing `/blog-batch` pipeline (`.claude/commands/blog-batch.md`), with the topic slate and 0% MDR claim pre-resolved (see Key Decisions). The pipeline's format contract, voice rules, and session-end checklist are authoritative and carried forward verbatim.

---

## Key Technical Decisions

- **Topic slate (operator-approved 2026-06-14):** the 10 slugs in Implementation Units U2–U6 ship as-is. All 10 are new — verified against the existing 49 slugs; none overlaps an existing intent.
- **0% MDR claim (operator-confirmed 2026-06-14):** use the unqualified form — "0% MDR on UPI collections, no transaction cap, no monthly fee." Bake this exact wording into the 4 payment-focused articles (U5, U6). No threshold qualifier.
- **Cluster shape:** 6 articles reinforce the `tally mobile` / `tally on mobile` hub (U2, U3), 4 reinforce the `payment on tally` hub (U5, U6); 3 of the payment pieces lead with the 0% MDR angle (satisfies the pipeline's "2–3 per batch" rule).
- **Internal links use real markdown links**, e.g. `[running Tally on mobile](/blog/tally-on-mobile/)`. Note: the existing `tally-on-mobile.md` ends with a plain-text "Internal Links" list — do **not** copy that pattern; it is a known drift. Follow `days-sales-outstanding-distributor-india.md`, which uses proper inline markdown anchors. Each new article carries 3+ inline internal links with descriptive anchor text containing the linked article's primary keyword.
- **Category vocabulary is fixed** to the canonical set: `Collections | Comparisons | Field Sales | Tally Mobile | How-To | Market Reality`. No new categories.
- **Deploy path is `main`.** This repo deploys via GitHub Pages on push to `main` (`CLAUDE.md` §8); there is no stage branch here. Per the monorepo's global "never push to main without explicit permission" rule, the push (U9) is **gated on explicit operator approval at execution time**. Everything through build-verification (U8) is safe to do unprompted; U9 stops and asks.

---

## Cluster Map (slug → primary keyword → hub it reinforces → 0% MDR lean)

| # | Slug | Primary keyword | Reinforces | Type | 0% MDR |
|---|---|---|---|---|---|
| 1 | `how-to-access-tally-on-mobile-step-by-step` | how to access tally on mobile | tally on mobile | How-To | — |
| 2 | `tally-mobile-app-for-android` | tally mobile app for android | tally mobile | Tally Mobile | — |
| 3 | `free-tally-mobile-app-vs-paid` | free tally mobile app | tally mobile | Tally Mobile | — |
| 4 | `is-there-an-official-tally-mobile-app` | official tally mobile app | tally mobile / on mobile | Tally Mobile | — |
| 5 | `tally-remote-access-vs-mobile-app` | tally remote access | tally on mobile | Comparisons | — |
| 6 | `view-tally-reports-on-mobile` | tally reports on mobile | tally on mobile | Tally Mobile | — |
| 7 | `how-to-record-payment-in-tally-on-mobile` | record payment in tally on mobile | payment on tally | How-To | yes |
| 8 | `accept-online-payment-on-tally-invoice` | payment on tally | payment on tally | Collections | yes |
| 9 | `tally-payment-reconciliation-on-mobile` | tally payment reconciliation | payment on tally | How-To | yes |
| 10 | `collect-payment-against-tally-invoice-whatsapp` | collect payment against tally invoice | payment on tally | Collections | yes |

---

## Per-article authoring contract (applies to every article in U2–U6)

Each `.md` file uses the frontmatter + body structure locked by `content/blog/days-sales-outstanding-distributor-india.md` and specified in `.claude/commands/blog-batch.md` Step 4. Non-negotiables:

- **Frontmatter:** `title` (≤60 chars, primary kw), `slug`, `meta_title` (≤60, distinct from title), `meta_description` (≤160, primary kw in first 100 chars), `primary_keyword` (lowercase), `date: "2026-06-14"`, `author: "Takkada Team"`, `category` (from fixed set), `excerpt` (2–3 sentences, specific distributor scenario + ₹ figure + outcome).
- **Body sections in order:** `## Key Highlights` (3 atomic, independently-quotable claims, each with a number or specific behaviour) → `## In This Article` (4–6 bullets previewing H2s, ends with "Frequently Asked Questions") → 5–7 body `## H2` sections, ~1200–1800 words total → `## Frequently Asked Questions` (5–6 Q/A pairs, each Q a distinct natural search query) → closing one-liner naming Takkada as the Tally-native 0% MDR option with the calendar link `https://calendar.notion.so/meet/ronakmalu/takkada`.
- **Keyword placement (per article):** primary keyword in title, meta_title, meta_description, slug, first body H2-equivalent, ≥1 body H2, first 100 words of body, and FAQ; ≥6 natural primary-keyword/variant mentions in the body.
- **Definition early:** define the primary keyword within the first 200 words of body (AEO).
- **Internal links:** 3+ inline markdown links to existing `content/blog/` slugs, descriptive anchor text containing the target's primary keyword. Preferred targets per cluster listed in each unit.
- **One comparison or pricing table** where topically relevant (always relevant for U3, U5, U7, U8).
- **Voice (`CLAUDE.md` §5, §11):** distributor is the hero; specific behaviours not superlatives; rupee/time/party-count proof points; Hinglish OK in dialogue. Banned tokens: `seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer, trusted by thousands, millions of, 99.9%`. No stylistic em-dashes (`—`); en-dash `–` only inside number ranges. No "Not X. Y." contrast structures. No three-word emphatic fragments. No internal tech-stack names (`CLAUDE.md` §10).
- **Honest scale:** 20 customers; depth-of-domain proof (Dibrugarh/Guwahati/Barpeta scenarios), never vanity metrics.

---

## Implementation Units

### U1. Pre-flight: confirm slugs are free and re-read the voice anchors

**Goal:** Guarantee no slug collision and re-load the exact tone before writing.
**Dependencies:** none.
**Files:** (read-only) `content/blog/days-sales-outstanding-distributor-india.md`, `content/blog/khatabook-alternative-for-distributors-india.md`, `content/blog/zero-mdr-upi-collection-for-distributors-india.md`, `content/blog/tally-on-mobile.md`, `content/blog/payment-link-tally-integration.md`.
**Approach:** `ls content/blog/` and grep for each of the 10 target slugs; abort/rename if any exists (none should — verified at plan time). Re-read the three voice anchors plus the two head pages the cluster links into, so anchor text and claims stay consistent with what already ranks.
**Test scenarios:** none — pre-flight verification. Verification: all 10 slugs confirmed absent; voice anchors read.
**Verification:** `ls content/blog/ | grep -E '<10 slugs>'` returns nothing.

### U2. Write the 3 "tally on mobile" how-to / access articles (#1, #5, #6)

**Goal:** Three spokes reinforcing the `tally on mobile` hub: setup mechanics, the remote-access comparison, and reports-on-mobile for owners.
**Requirements:** rank-support for `tally on mobile`.
**Dependencies:** U1.
**Files (create):**
- `content/blog/how-to-access-tally-on-mobile-step-by-step.md`
- `content/blog/tally-remote-access-vs-mobile-app.md`
- `content/blog/view-tally-reports-on-mobile.md`
**Approach:**
- #1 `how-to-access-tally-on-mobile-step-by-step` (How-To): the four bridges (remote desktop, Tally.NET remote, read-only companion, read+write companion), framed as a do-this-then-this guide. Explain the Tally XML gateway in plain language without naming internal tooling. Comparison table of the four access methods.
- #5 `tally-remote-access-vs-mobile-app` (Comparisons): AnyDesk/TeamViewer/Tally.NET remote vs a native companion app, on a 2G-zone Barpeta route. Table: latency, voucher creation, offline, cost.
- #6 `view-tally-reports-on-mobile` (Tally Mobile): owner persona — outstanding, ledger, day book, top parties, stock on the phone; where read-only ends and write-back begins.
**Internal-link targets:** `/blog/tally-on-mobile/`, `/blog/tally-mobile-app-india/`, `/blog/tally-cloud/`, `/blog/best-tally-app-for-receivables-2026/`, `/blog/bidirectional-tally-sync-explained/`.
**Patterns to follow:** structure and table style of `content/blog/tally-on-mobile.md`; voice of `days-sales-outstanding-distributor-india.md`.
**Test scenarios:** none (prose content) — validated by U7 lint + U8 build. Each file must satisfy the per-article contract (frontmatter completeness, keyword placement, 3+ internal links, FAQ with 5–6 pairs).

### U3. Write the 3 "tally mobile" buyer-guide / device articles (#2, #3, #4)

**Goal:** Three spokes reinforcing the `tally mobile` / `tally mobile app` hub: Android device intent, free-vs-paid buyer question, and the "is there an official app" clarifier.
**Requirements:** rank-support for `tally mobile`.
**Dependencies:** U1.
**Files (create):**
- `content/blog/tally-mobile-app-for-android.md`
- `content/blog/free-tally-mobile-app-vs-paid.md`
- `content/blog/is-there-an-official-tally-mobile-app.md`
**Approach:**
- #2 `tally-mobile-app-for-android` (Tally Mobile): Android-specific reality — what installs, what syncs, what a distributor's Android phone can and cannot do against the office Tally machine.
- #3 `free-tally-mobile-app-vs-paid` (Tally Mobile): buyer guide answering "is there a free Tally mobile app" honestly; what free tiers cover (read-only) vs what paid unlocks (voucher creation, collections, auto-recon). Comparison table; tie cost to the value of deleting the 9 PM reconciliation.
- #4 `is-there-an-official-tally-mobile-app` (Tally Mobile): clears the recurring confusion — Tally Solutions ships no native mobile client; every path is a companion layer. Tally is the neighbour, not the enemy (`CLAUDE.md` positioning guardrail).
**Internal-link targets:** `/blog/tally-mobile-app-india/`, `/blog/tally-prime-mobile-app/`, `/blog/multi-business-tally-mobile-app/`, `/blog/best-tally-app-for-receivables-2026/`, `/blog/tally-on-mobile/`.
**Test scenarios:** none (prose content) — per-article contract + U7 lint + U8 build.

### U4. Write the 2 payment how-to mechanics articles (#7, #9)

**Goal:** Two spokes reinforcing `payment on tally`: how to record a payment from the phone, and how payment reconciliation works on mobile.
**Requirements:** rank-support for `payment on tally`.
**Dependencies:** U1.
**Files (create):**
- `content/blog/how-to-record-payment-in-tally-on-mobile.md`
- `content/blog/tally-payment-reconciliation-on-mobile.md`
**Approach:**
- #7 `how-to-record-payment-in-tally-on-mobile` (How-To): the receipt-entry mechanic from the field — cash and UPI receipts, UTR matching, what posts back to Tally. Lead with the 0% MDR UPI angle (exact wording per Key Decisions).
- #9 `tally-payment-reconciliation-on-mobile` (How-To): the 9 PM reconciliation problem and how auto-reconciliation matches UPI receipts to invoices and posts a receipt voucher. 0% MDR lean.
**Internal-link targets:** `/blog/auto-reconciliation-tally/`, `/blog/payment-link-tally-integration/`, `/blog/upi-collection-app-for-distributors-india/`, `/blog/zero-mdr-upi-collection-for-distributors-india/`.
**Test scenarios:** none (prose content) — per-article contract + U7 lint + U8 build. Each must contain the exact 0% MDR sentence and a payment-flow table.

### U5. Write the 2 payment collection / 0% MDR articles (#8, #10)

**Goal:** The two strongest `payment on tally` spokes — #8 targets the head phrase "payment on tally" head-on; both lead with 0% MDR.
**Requirements:** rank-support for `payment on tally`.
**Dependencies:** U1.
**Files (create):**
- `content/blog/accept-online-payment-on-tally-invoice.md`
- `content/blog/collect-payment-against-tally-invoice-whatsapp.md`
**Approach:**
- #8 `accept-online-payment-on-tally-invoice` (Collections, primary_keyword `payment on tally`): how a distributor turns a Tally invoice into a collectible — UPI payment link on the invoice, accept payment on Tally without MDR. Cost-comparison table vs a typical payment-gateway MDR (use the 0% MDR exact claim). This is the article carrying the literal head term.
- #10 `collect-payment-against-tally-invoice-whatsapp` (Collections): the WhatsApp dispatch + payment-link + auto-match loop, party-level, ₹-figure proof. 0% MDR lean.
**Internal-link targets:** `/blog/payment-link-tally-integration/`, `/blog/zero-mdr-upi-collection-for-distributors-india/`, `/blog/tally-whatsapp-invoice-dispatch/`, `/blog/whatsapp-payment-collection-playbook-india/`, `/blog/payment-collection-cost-comparison-india/`.
**Test scenarios:** none (prose content). #8 must use `payment on tally` as `primary_keyword` and place it in title, meta, slug-equivalent, first 100 words, ≥1 H2, and FAQ. Both must contain the exact 0% MDR sentence.

### U6. Generate 10 brand header images

**Goal:** One 1200×630 PNG per slug in `public/assets/blog/`.
**Dependencies:** U2–U5 (slugs and taglines finalised).
**Files (modify):** `scripts/generate-blog-images.py` (append 10 entries to the `ARTICLES` list: slug, title, category, tagline ≤80 chars). **Files (create, generated):** 10 PNGs under `public/assets/blog/<slug>.png`.
**Approach:** append the 10 entries, run `python3 scripts/generate-blog-images.py`, verify 10 new PNGs exist. Taglines reuse the article's one-line hook, ≤80 chars to fit the banner.
**Test scenarios:** none (asset generation). Verification: `ls public/assets/blog/*.png | wc -l` increases by exactly 10; each new slug has a PNG.

### U7. Voice + brand + AEO lint pass

**Goal:** Catch banned tokens, stylistic em-dashes, three-word fragments, and missing keyword/link/FAQ requirements before build.
**Dependencies:** U2–U5.
**Files:** the 10 new `.md` files (read/fix).
**Approach:** run the `/blog-batch` Step 6 greps over the 10 new files and fix every hit:
- `grep -E -in "seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|trusted by thousands|millions of|99\.9%" content/blog/<new-slugs>`
- `grep -n "—" content/blog/<new-slugs>` (em-dash only; `–` ranges are fine)
- `grep -E -hn "^[A-Z][a-z]+\. [A-Z][a-z]+\. [A-Z][a-z]+\.$" content/blog/<new-slugs>`
Plus a manual per-article pass confirming: frontmatter char limits (title/meta_title ≤60, meta_description ≤160), primary keyword in all required slots, ≥3 inline internal links, 5–6 FAQ pairs, exact 0% MDR sentence present in U4/U5 articles, category in the fixed set.
**Test scenarios:** none (lint gate). Verification: all greps return zero hits; manual checklist passes for all 10.

### U8. Build verification + rendered walk

**Goal:** Prove every new page emits real static HTML with correct head tags.
**Dependencies:** U6, U7.
**Files:** none modified (build only).
**Approach:** `npm run build` completes without errors (runs the sitemap script if present). Spot-check rendered output for 2–3 of the new slugs: `cat dist/blog/<slug>/index.html` shows real body content (not an empty root div), a unique `<title>` <60 chars, a unique meta description <160 chars, canonical pointing to `https://takkada.com/blog/<slug>/`, OG/Twitter tags, and FAQPage/BreadcrumbList JSON-LD where applicable (`CLAUDE.md` §9). Walk the 10 pages in `npm run preview` for dead ends, tone shifts, and broken internal links (`CLAUDE.md` §11 commandment 6).
**Test scenarios:** none (build/QA gate). Verification: build exits 0; all 10 `dist/blog/<slug>/index.html` contain rendered content + canonical + schema; no broken internal links in the walk.

### U9. Commit and (operator-gated) push to `main`

**Goal:** Ship the 10 articles + images to GitHub Pages.
**Dependencies:** U8.
**Files:** `content/blog/` (10 new), `public/assets/blog/` (10 new), `scripts/generate-blog-images.py`.
**Approach:** stage exactly the three paths above, commit with a message listing the 10 slugs (Co-Authored-By trailer per monorepo convention). **Then stop and ask the operator for explicit approval before `git push origin HEAD:main`** — `main` is the live deploy branch and the global rule forbids unprompted pushes to it. On approval, push; GitHub Pages deploys within ~2–4 minutes.
**Test scenarios:** none. Verification: clean working tree after commit; on approval, `git push` succeeds and the 10 URLs `https://takkada.com/blog/<slug>/` resolve after deploy.

---

## Scope Boundaries

**In scope:** 10 new cluster articles, 10 header images, lint, build-verify, commit, operator-gated push.

**Deferred to Follow-Up Work:**
- Fixing the plain-text "Internal Links" trailer in the existing `tally-on-mobile.md` to use real markdown anchors (consistency cleanup; not blocking this batch).
- Adding inbound links *from* the existing head pages back down to the strongest new spokes (boosts the cluster further, but editing the 3 head pages is a separate, higher-risk change).
- The production-grade AI content engine in `docs/plans/aeo-seo-blog-engine.md` (explicitly the long-term path; this run stays human-authored).

**Outside scope:** new categories; any change to `siteContent.js`, components, routing, or deploy config; competitor-bashing copy; vanity metrics.

---

## Risks & Mitigations

- **Cannibalisation of the existing head pages.** Mitigated by the cluster design — every new article is a distinct long-tail intent and links *up* to the head page rather than competing for the same phrase. U1 verifies no slug/intent overlap.
- **Unqualified 0% MDR claim becoming untrue.** Operator re-confirmed the exact wording this run; it lives only in the 4 payment articles. If the commercial reality changes, those 4 are the blast radius.
- **Push to live `main`.** Mitigated by the U9 explicit-approval gate; everything before U9 is reversible local work.
- **Voice drift toward generic SaaS copy** (`CLAUDE.md` §11 "gravitational pull to mediocrity"). Mitigated by U7's craft pass — read each article's opener aloud; if a competitor could run the same sentence, rewrite.

---

## Verification (whole-batch)

- 10 new `.md` files in `content/blog/`, each passing the per-article contract.
- 10 new PNGs in `public/assets/blog/`.
- All U7 lint greps clean.
- `npm run build` green; rendered HTML for all 10 slugs carries content + canonical + schema.
- Commit on `main` staged; push executed only after operator approval.
