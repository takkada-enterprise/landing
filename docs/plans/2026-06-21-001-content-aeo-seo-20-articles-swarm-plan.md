---
title: "content: 20 AEO+SEO blog articles via 4-step author swarm"
type: content
status: active
created: 2026-06-21
plan_id: 2026-06-21-001
target_repo: takkada website/landing
---

# content: 20 AEO+SEO Blog Articles via a 4-Step Author Swarm

**Target repo:** `takkada website/landing` (github.com/takkada-enterprise/landing)

## Summary

Ship 20 new AEO+SEO-optimised blog articles to `content/blog/` in **four sequential steps of five articles each**. Each step runs a **swarm of five parallel author sub-agents** (one agent per article) so that no single context window ever holds all 20 long-form drafts. After each batch's five drafts land, **one integration sub-agent** registers them (appends image-script entries, regenerates header images, runs the banned-token lint on just those five files). The orchestrator holds only slugs, briefs, and pass/fail signals — never the full article bodies. The final **build + lint + PR-to-`main`** (which Cloudflare auto-deploys) is performed by the **operator in a separate terminal**; the swarm never pushes.

The 20 topics are not invented fresh. They are the highest-leverage 20 of the 31 still-unpublished topics already curated in `docs/plans/2026-06-14-001-content-next-40-articles-plan.md` (Tiers 2–8; Tier 1's nine competitor pages already shipped and are live). Reusing that strategy-grounded, slug-ready backlog avoids reinventing topics and avoids slug collisions with the 78 live articles.

---

## Problem Frame

The corpus is 78 live articles, deep on Tally-on-mobile, 0% MDR UPI, and collections/reconciliation, but thin-to-empty on:

- **Pure AEO definition pages** (UTR, VPA, MDR-vs-convenience-fee, UPI AutoPay, bill-by-bill) — the exact entity-definition surfaces LLMs quote verbatim and that every other post can internally link to.
- **Vertical collection pages beyond FMCG/pharma** — a proven, near-zero-competition template (`zero-mdr-upi-for-fmcg-distributors` and `...pharma...` already rank).
- **Task-level "how do I…" pages** — high-intent, mid-task readers the concept pages don't serve.
- **Hinglish localization** — only `udhar-vasuli-kaise-kare-distributor` exists.
- **Finance depth and a trust/objection page** — CredFlow's turf and the single biggest conversion objection (third-party Tally data safety).

The production constraint that shapes the *how*: writing 20 articles of ~1,500–1,800 words each, each under a strict 8-point contract, in one agent context degrades quality badly as the window fills. The swarm architecture exists specifically to keep every author agent's context clean (one article's worth) and the orchestrator's context tiny (slugs + signals).

---

## Scope Boundaries

### In scope

- 20 new `.md` articles in `content/blog/`, each following the locked article contract (see "Author Agent Brief").
- 20 new 1200×630 header PNGs in `public/assets/blog/` via `scripts/generate-blog-images.py`.
- Per-batch registration (image-script entries + image generation + targeted lint).
- A final cross-batch verification pass (full `npm run build`, internal-link validity audit, sitemap confirmation).
- A written operator handoff for the deploy step.

### Outside scope (product identity)

- No new blog rendering, schema, or routing code. Posts are auto-discovered via `import.meta.glob('/content/blog/*.md')` in `src/lib/blogPosts.js` and the sitemap auto-generates from `content/blog/` in `scripts/generate-sitemap.mjs`. **There is no manifest/index to hand-edit** — dropping the `.md` file in is the registration. The only per-article manual file edit is the image-script slug entry.
- No off-page SEO (third-party listicles, review-site profiles) — that is `docs/seo-aeo/02-non-content-activities.md`, not blog topics.
- No deploy by the swarm. Commit + PR + merge to `main` is the operator's separate-terminal step (see U7).

### Deferred to follow-up work (a later batch)

The 11 remaining unpublished backlog topics not selected for this 20: `zero-mdr-upi-for-stationery-distributors`, `upi-collection-for-auto-parts-distributors`, `receivables-automation-plywood-distributors`, `collection-app-for-electronics-distributors`, `how-to-set-credit-limit-retailer-tally`, `how-to-track-salesman-wise-collections-tally`, `upi-par-zero-mdr-kaise-milega`, `invoice-discounting-vs-faster-collection`, `cash-flow-forecasting-for-distributors`, `tally-partners-recurring-revenue-mobile-add-on`, `best-apps-tally-partner-can-resell-2026`.

---

## The 20 Topics (locked, slug-ready)

All slugs verified absent from `content/blog/` on 2026-06-21. Source: `docs/plans/2026-06-14-001-content-next-40-articles-plan.md`.

### Step 1 — AEO definition / question pages (category: `Market Reality` or `How-To`)

| # | Title | Slug | Target query | AEO angle |
|---|---|---|---|---|
| 1 | What Is a UTR Number, and How It Matches a Tally Payment | `what-is-utr-number-tally-payment` | "what is utr number", "utr match tally" | Owns the reconciliation entity Takkada auto-matches on |
| 2 | What Is a VPA (UPI ID), and How Distributors Collect With One | `what-is-vpa-upi-id-distributors` | "what is vpa", "what is upi id" | Foundational UPI-cluster definition |
| 3 | MDR vs Convenience Fee in UPI: What Distributors Actually Pay | `mdr-vs-convenience-fee-upi` | "mdr vs convenience fee" | Disambiguation page feeding the 0% MDR hub |
| 4 | UPI AutoPay for Distributors: Recurring Collection Explained | `upi-autopay-for-distributors` | "upi autopay", "upi mandate for business" | Net-new concept; recurring-collection use case |
| 5 | Bill-by-Bill in Tally: What "Against Reference" Means | `bill-by-bill-against-reference-tally` | "bill by bill tally", "against reference tally" | Explains the Tally mechanic Takkada automates |

### Step 2 — Vertical collection pages (category: `Market Reality` or `Collections`)

| # | Title | Slug | Target query |
|---|---|---|---|
| 6 | Zero MDR UPI for Electrical & Hardware Distributors | `zero-mdr-upi-for-electrical-distributors` | "electrical distributor collection app" |
| 7 | Collections App for Textile & Garment Wholesalers on Tally | `collections-app-for-textile-wholesalers` | "textile wholesaler collection app tally" |
| 8 | Receivables App for Agri-Input (Seed, Fertilizer) Distributors | `receivables-app-for-agri-input-distributors` | "fertilizer distributor receivables app" |
| 9 | Tally Collection App for Paint Distributors | `tally-collection-app-for-paint-distributors` | "paint distributor collection tally" |
| 10 | Zero MDR UPI for Dairy & Food Product Distributors | `zero-mdr-upi-for-dairy-distributors` | "dairy distributor collection app" |

### Step 3 — Task-level how-to pages (category: `How-To`)

| # | Title | Slug | Target query |
|---|---|---|---|
| 11 | How to Send a Payment Reminder From Tally on WhatsApp | `how-to-send-payment-reminder-from-tally-whatsapp` | "how to send payment reminder whatsapp tally" |
| 12 | How to Check a Party's Outstanding Balance in Tally From Your Phone | `how-to-check-party-outstanding-tally-mobile` | "check party outstanding tally mobile" |
| 13 | How to Share a Ledger Statement on WhatsApp From Tally | `how-to-share-ledger-statement-whatsapp-tally` | "send ledger statement whatsapp tally" |
| 14 | How to Reconcile a Bank Statement With Tally on Mobile | `how-to-reconcile-bank-statement-tally-mobile` | "bank reconciliation tally mobile" |
| 15 | How to Split One UPI Payment Across Multiple Tally Invoices | `how-to-split-upi-payment-across-tally-invoices` | "split payment multiple invoices tally" |

### Step 4 — Mixed surfaces (Hinglish + finance + trust)

| # | Title | Slug | Category | Angle |
|---|---|---|---|---|
| 16 | Bakaya Kaise Vasool Kare: Distributor Collection Guide | `bakaya-kaise-vasool-kare-distributor` | `Collections` | Hinglish, Tier 2/3 trust voice |
| 17 | Tally Mobile Par Kaise Chalaye: Step-by-Step | `tally-mobile-par-kaise-chalaye` | `Tally Mobile` | Hinglish how-to |
| 18 | Distributor Credit Policy: Terms, Limits, Penalty Template | `distributor-credit-policy-template` | `Collections` | Template = highly LLM-extractable |
| 19 | Cash Conversion Cycle for Distributors: How to Shorten It | `cash-conversion-cycle-for-distributors` | `Collections` | Finance definition page (CredFlow's turf, distributor reality) |
| 20 | Is It Safe to Connect a Third-Party App to Tally? | `is-it-safe-to-connect-app-to-tally` | `Market Reality` | Clears the biggest conversion objection; AEO trust query |

---

## Author Agent Brief (the reusable contract every swarm agent receives)

This is the single source of truth handed to each of the five author agents per batch. It is lifted from `.claude/commands/blog-batch.md` Step 4 and `CLAUDE.md` §5/§9/§11, condensed so an agent can produce a compliant article holding only this brief plus its one assigned topic. The orchestrator passes each agent: its **title, slug, category, primary_keyword, target query, angle**, and the **curated internal-link target list** (below) — nothing about the other articles.

**Frontmatter (exact keys):** `title` (≤60 chars, primary keyword in it), `slug` (kebab-case, as locked above), `meta_title` (≤60, distinct from title), `meta_description` (≤160, primary keyword in first 100 chars), `primary_keyword` (2–5 words, lowercase), `date: "2026-06-21"`, `author: "Takkada Team"`, `category` (one of: `Collections | Comparisons | Field Sales | Tally Mobile | How-To | Market Reality` — no new categories), `excerpt` (2–3 sentences, a specific distributor scenario with a real ₹ figure and outcome).

**Body structure (pattern anchor: `content/blog/days-sales-outstanding-distributor-india.md`):**
- `## Key Highlights` — exactly 3 atomic, independently quotable claims, each with a number or specific behavior; ≥1 references the 0% MDR UPI angle when the topic invites it.
- `## In This Article` — 4–6 bullets previewing the H2s, ending with "Frequently Asked Questions".
- 5–7 body `## H2` sections, ~1,200–1,800 words total, ≥1 comparison/pricing table when topically relevant.
- `## Frequently Asked Questions` — 5–6 `**Q:** / A:` pairs, each a distinct natural search query.
- Closing one-liner naming Takkada as the Tally-native 0% MDR option + calendar link `https://calendar.notion.so/meet/ronakmalu/takkada`.

**Keyword rules:** primary keyword in title, meta_title, meta_description, slug, the first H2, ≥1 other H2, first 100 words of body, and the FAQ; ≥6 natural body mentions of the keyword or close variants.

**AEO rules:** Key Highlights bullets are atomic claims with numbers; FAQ questions are literal typed queries; define the primary keyword inside the first 200 words of body; comparison tables where relevant.

**Internal links:** ≥3 inline links to **live** `content/blog/<slug>/` articles using descriptive anchor text that contains the linked article's primary keyword. Agents link only to slugs from the curated target list the orchestrator supplies (live slugs + same-batch slugs being written this step), never to invented slugs. The integration agent validates every link resolves.

**0% MDR claim (verbatim, operator-locked):** "0% MDR on UPI collections, no transaction cap, no monthly fee." The "only app" claim must use the Tally-native qualifier: "the only Tally-native distributor collection app in India with genuine 0% MDR on UPI." (Re-confirm with the operator at run start per U1.)

**Voice rules (CLAUDE.md §5/§11):** distributor is the hero, Takkada supporting; Hinglish welcome in dialogue/examples; real ₹ figures only (we have 20 customers — no vanity numbers); Tally is the neighbour, not the enemy.

**Banned tokens (hard-fail lint):** `seamless`, `world-class`, `enterprise-grade`, `revolutionary`, `unleash`, `game-changer`, `trusted by thousands`, `millions of`, `99.9%`. No em-dash `—` as a stylistic break (en-dash `–` inside number ranges like `30–90` is fine). No "Not X. Y." contrast structures. No three-word emphatic fragments.

---

## Curated internal-link targets (passed to agents so links never break)

To keep links resolving and topically tight, the orchestrator hands each batch a short list of live anchor slugs (plus the four other slugs being written in the same batch). Suggested live anchors by step:

- **Step 1 (definitions):** `upi-mdr-charges-india-2026`, `what-is-mdr-and-why-it-matters-for-distributors`, `nil-mdr-upi-collection-on-tally-invoices`, `tally-payment-reconciliation-on-mobile`, `auto-reconciliation-tally`, `payment-link-tally-integration`.
- **Step 2 (verticals):** `zero-mdr-upi-for-fmcg-distributors`, `zero-mdr-upi-for-pharma-distributors`, `zero-mdr-upi-collection-for-distributors-india`, `payment-collection-app-for-distributors-india`, `days-sales-outstanding-distributor-india`.
- **Step 3 (how-tos):** `how-to-access-tally-on-mobile-step-by-step`, `view-tally-reports-on-mobile`, `partywise-outstanding-statement-tally`, `whatsapp-payment-reminder-for-distributors`, `tally-payment-reconciliation-on-mobile`.
- **Step 4 (mixed):** `udhar-vasuli-kaise-kare-distributor`, `credit-limit-for-retailers`, `working-capital-problem-indian-wholesalers`, `dso-for-distributors`, `collection-efficiency-ratio-formula-india`, `best-tally-add-on-apps-for-distributors-2026`.

---

## Execution Architecture (how the swarm runs)

```
Orchestrator (ce-work, holds only slugs + briefs + signals)
│
├─ U1  Pre-flight: branch off origin/main, confirm 0% MDR claim, finalize briefs
│
├─ U2  STEP 1 ──► 5 author agents in parallel ──► 5 .md drafts
│                 then 1 integration agent ──► image entries + images + lint(5)
├─ U3  STEP 2 ──► (same shape)
├─ U4  STEP 3 ──► (same shape)
├─ U5  STEP 4 ──► (same shape)
│
├─ U6  Cross-batch verification: full build, internal-link audit (all 20), sitemap
│
└─ U7  OPERATOR (separate terminal): build + lint + PR to main → Cloudflare deploy
```

*This illustrates the intended orchestration and is directional guidance for review, not implementation specification.*

**Why five-per-step and per-batch integration:** context-window hygiene is the design goal stated in the request. An author agent that holds one article writes a sharper article than one juggling twenty. The orchestrator never ingests article bodies — it dispatches, collects a slug + a pass/fail, and moves on. Integration is batched (not deferred to the end) so a banned-token or broken-link failure is caught against five files while the batch context is fresh, not against twenty at once.

**Sequential steps, parallel within a step:** the four steps run in order (so a mid-run failure stops cleanly with a known-good prefix), but the five author agents inside a step run concurrently. The "swarm" the operator asked for is the five-wide fan-out per step.

---

## Implementation Units

### U1. Pre-flight: branch, claim confirmation, brief finalization

**Goal:** Establish a clean working branch and lock the inputs every downstream agent depends on, so no author agent has to make a positioning decision.

**Dependencies:** none.

**Files:** none created; operates on git state in `takkada website/landing`.

**Approach:**
- Operator (or orchestrator) creates a feature branch off `origin/main` (e.g. `content/aeo-seo-20-articles`). Do **not** work on `main` — it is PR-protected (see U7).
- Re-confirm with the operator that the 0% MDR claim is still truthful and unqualified ("0% MDR on UPI collections, no transaction cap, no monthly fee"). If qualified, bake the precise version into all 20 briefs before dispatch. This is a per-run confirmation per `blog-batch.md` Step 2.
- Assemble the per-article brief packets (title, slug, category, primary_keyword, target query, angle, internal-link target list) from the tables above. Each packet is what a single author agent receives.

**Test expectation:** none — setup/coordination unit, no behavioral change.

**Verification:** branch exists off `origin/main`; operator has confirmed the claim wording; 20 brief packets assembled and grouped into the four batches.

---

### U2. Step 1 batch — 5 AEO definition articles + integration

**Goal:** Produce, register, and lint the five Step-1 definition articles.

**Requirements:** Problem Frame (AEO definition gap); topics #1–#5.

**Dependencies:** U1.

**Files:**
- Create: `content/blog/what-is-utr-number-tally-payment.md`, `content/blog/what-is-vpa-upi-id-distributors.md`, `content/blog/mdr-vs-convenience-fee-upi.md`, `content/blog/upi-autopay-for-distributors.md`, `content/blog/bill-by-bill-against-reference-tally.md`
- Modify: `scripts/generate-blog-images.py` (append 5 `ARTICLES` entries: slug, title, category, tagline ≤80 chars)
- Create (generated): `public/assets/blog/<each-slug>.png`

**Approach:**
1. **Swarm:** dispatch 5 author sub-agents in parallel, one per slug, each receiving its brief packet + the Author Agent Brief + the Step-1 internal-link target list. Each agent writes exactly one `.md` file and returns only its slug + a self-check result (frontmatter present, char limits met, ≥3 links, no banned tokens). The orchestrator does not read the bodies into its own context.
2. **Integration sub-agent:** after all five drafts land, one agent appends the five image entries to `scripts/generate-blog-images.py`, runs the generator inside the Pillow venv (see Risks — PEP-668 gotcha), confirms 5 new PNGs exist, and runs the banned-token + em-dash + three-word-fragment lint greps across just these five files. Any hit is fixed (delegated back to the owning author agent or fixed in place) before the batch is declared green.

**Patterns to follow:** `content/blog/days-sales-outstanding-distributor-india.md` (definition+formula voice); `.claude/commands/blog-batch.md` Steps 4–6; existing `ARTICLES` list shape in `scripts/generate-blog-images.py`.

**Test scenarios (applied by the integration agent to each of the 5 files):**
- Frontmatter has all required keys; `title`/`meta_title` ≤60; `meta_description` ≤160 with primary keyword in first 100 chars.
- Primary keyword present in title, slug, first H2, first 100 words of body, and FAQ; ≥6 body mentions.
- `## Key Highlights` has exactly 3 atomic numeric claims; `## Frequently Asked Questions` has 5–6 Q/A pairs.
- ≥3 inline `/blog/<slug>/` links, every target resolving to a live or same-batch slug.
- Banned-token grep returns zero hits; em-dash grep returns zero `—`; three-word-fragment grep returns zero.
- Closing calendar link `https://calendar.notion.so/meet/ronakmalu/takkada` present.
- `category` is one of the six canonical values.
- A new PNG exists in `public/assets/blog/` for each slug.

**Verification:** 5 files exist and pass every scenario above; 5 PNGs generated; lint clean on the batch.

---

### U3. Step 2 batch — 5 vertical collection articles + integration

**Goal:** Produce, register, and lint the five Step-2 vertical articles.

**Requirements:** Problem Frame (vertical-page gap); topics #6–#10.

**Dependencies:** U1 (may run after U2 or independently; sequence U2→U3→U4→U5 for clean failure isolation).

**Files:**
- Create: `content/blog/zero-mdr-upi-for-electrical-distributors.md`, `content/blog/collections-app-for-textile-wholesalers.md`, `content/blog/receivables-app-for-agri-input-distributors.md`, `content/blog/tally-collection-app-for-paint-distributors.md`, `content/blog/zero-mdr-upi-for-dairy-distributors.md`
- Modify: `scripts/generate-blog-images.py` (append 5 entries)
- Create (generated): `public/assets/blog/<each-slug>.png`

**Approach:** Same swarm + integration shape as U2, with the Step-2 internal-link target list. Each vertical article must use **real, honest** margin-band and DSO figures for that vertical (CLAUDE.md §5/§10 — no invented stats); the template is "swap the vertical, the margin band, the DSO reality" but the numbers must be defensible for electrical/textile/agri-input/paint/dairy respectively.

**Patterns to follow:** `content/blog/zero-mdr-upi-for-fmcg-distributors.md` and `content/blog/zero-mdr-upi-for-pharma-distributors.md` (the proven vertical template).

**Test scenarios:** all scenarios from U2, plus: each article cites a vertical-specific DSO/margin reality that is plausible and not copied verbatim from the FMCG/pharma anchors (no find-and-replace tell); the 0% MDR claim appears verbatim where the angle invites it.

**Verification:** 5 files pass; 5 PNGs; lint clean; spot-check that vertical numbers differ meaningfully across the five.

---

### U4. Step 3 batch — 5 task-level how-to articles + integration

**Goal:** Produce, register, and lint the five Step-3 how-to articles.

**Requirements:** Problem Frame (task-level how-to gap); topics #11–#15.

**Dependencies:** U1.

**Files:**
- Create: `content/blog/how-to-send-payment-reminder-from-tally-whatsapp.md`, `content/blog/how-to-check-party-outstanding-tally-mobile.md`, `content/blog/how-to-share-ledger-statement-whatsapp-tally.md`, `content/blog/how-to-reconcile-bank-statement-tally-mobile.md`, `content/blog/how-to-split-upi-payment-across-tally-invoices.md`
- Modify: `scripts/generate-blog-images.py` (append 5 entries)
- Create (generated): `public/assets/blog/<each-slug>.png`

**Approach:** Same swarm + integration shape, Step-3 internal-link list. How-to articles lead with the numbered task steps a mid-task reader needs, then thread Takkada in as the resolution. Steps must be concrete and correct for a Tally-on-mobile workflow; do not describe app features that do not exist (CLAUDE.md §10 — no unshipped-feature promises).

**Patterns to follow:** existing how-to register voice; `content/blog/how-to-access-tally-on-mobile-step-by-step.md`.

**Test scenarios:** all U2 scenarios, plus: each article contains an ordered step list answering the target "how do I…" query; no description of an unshipped capability.

**Verification:** 5 files pass; 5 PNGs; lint clean.

---

### U5. Step 4 batch — Hinglish + finance + trust (5 articles) + integration

**Goal:** Produce, register, and lint the five Step-4 mixed-surface articles.

**Requirements:** Problem Frame (Hinglish, finance depth, trust-objection gaps); topics #16–#20.

**Dependencies:** U1.

**Files:**
- Create: `content/blog/bakaya-kaise-vasool-kare-distributor.md`, `content/blog/tally-mobile-par-kaise-chalaye.md`, `content/blog/distributor-credit-policy-template.md`, `content/blog/cash-conversion-cycle-for-distributors.md`, `content/blog/is-it-safe-to-connect-app-to-tally.md`
- Modify: `scripts/generate-blog-images.py` (append 5 entries)
- Create (generated): `public/assets/blog/<each-slug>.png`

**Approach:** Same swarm + integration shape, Step-4 internal-link list. Sub-rules per article type:
- **Hinglish (#16, #17):** Hinglish is the body voice, not just dialogue garnish; mirror `udhar-vasuli-kaise-kare-distributor` register. Keep frontmatter `title`/`meta` readable to an English search engine (Roman-script Hinglish, not Devanagari — Devanagari is a separate deferred localization track).
- **Finance (#18 credit-policy-template, #19 cash-conversion-cycle):** #18 ships an extractable, copy-pasteable policy template (terms, limits, penalty) — the table/template is the AEO bait. #19 defines the cash conversion cycle with the distributor's real numbers and ties shortening it to faster collection.
- **Trust (#20):** answer "is it safe to connect a third-party app to Tally?" honestly — describe read/write scope and reconciliation safety in plain terms without naming internal tech (CLAUDE.md §10). This is a conversion-objection page; it must not overclaim.

**Patterns to follow:** `content/blog/udhar-vasuli-kaise-kare-distributor.md` (Hinglish), `content/blog/working-capital-problem-indian-wholesalers.md` (finance depth).

**Test scenarios:** all U2 scenarios, plus: #16/#17 read as genuine Hinglish throughout (not English with two Hindi words); #18 contains a reusable template block; #20 makes no safety claim that isn't defensible and names no internal tech.

**Verification:** 5 files pass; 5 PNGs; lint clean.

---

### U6. Cross-batch verification

**Goal:** Prove all 20 articles build, render, and cross-link correctly as a set before handing off to deploy.

**Requirements:** Plan Quality Bar (build-green, links resolve, sitemap includes new URLs).

**Dependencies:** U2, U3, U4, U5.

**Files:** none created; runs against the whole repo.

**Approach:**
- Run `npm run build` — must complete with no errors; `scripts/generate-sitemap.mjs` runs as part of build and must include all 20 new `/blog/<slug>/` URLs.
- Internal-link audit across all 20 new files: every inline `/blog/<slug>/` link resolves to a file that now exists in `content/blog/` (live or newly written). Flag any orphan link.
- Confirm `dist/blog/<slug>/index.html` for a sampled few contains real rendered content (the raw-HTML / AEO requirement in CLAUDE.md §9/§12), not an empty root div.
- Confirm 20 PNGs are present in `public/assets/blog/`.
- Final aggregate banned-token grep across all 20 files (defense in depth over the per-batch lints).

**Test scenarios:**
- Build exits 0; sitemap contains 20 new URLs.
- Zero orphan internal links across the 20 files.
- Sampled `dist/blog/<slug>/index.html` shows rendered article HTML.
- 20 PNGs present; aggregate banned-token grep returns zero hits.

**Verification:** build green, sitemap complete, zero orphan links, raw-HTML check passes on samples.

---

### U7. Operator deploy handoff (separate terminal)

**Goal:** Document the exact steps the operator runs in a separate terminal to ship the batch, since the swarm never pushes.

**Requirements:** request constraint ("a new terminal will deploy it"); CLAUDE.md global safety rule (never push `main` without permission).

**Dependencies:** U6 (green).

**Files:** none — this is a handoff note executed by the operator.

**Approach (operator, separate terminal, in `takkada website/landing`):**
1. Review the diff: 20 new `content/blog/*.md`, 20 new `public/assets/blog/*.png`, the `scripts/generate-blog-images.py` additions.
2. Re-run `npm run build` to confirm green on the operator's machine.
3. Commit on the feature branch and open a PR to `main` (`gh pr create --base main`), then `gh pr merge <n> --merge`.
4. **Deploy reality (corrects CLAUDE.md §8, which is stale):** `main` is PR-protected — a direct `git push origin HEAD:main` is rejected (GH013), so the PR is mandatory. Deploy is **Cloudflare on merge to `main`**, not GitHub Pages (the repo's "Deploy to GitHub Pages" Action is intentionally disabled). Cloudflare picks up the merge automatically; expect the new URLs live within a few minutes.
5. Spot-check 2–3 live URLs (`https://takkada.com/blog/<slug>/`) after Cloudflare finishes.

**Test expectation:** none — operator-run deploy/coordination, covered by U6's pre-merge verification.

**Verification:** PR merged to `main`; Cloudflare deploy completes; sampled live URLs return the new articles.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| **Context-window bloat** if the orchestrator reads article bodies | Author agents return only slug + self-check result; bodies stay in the agent that wrote them. Integration is a separate agent per batch. This is the whole reason for the architecture. |
| **Image generation fails** — this Mac's `python3` is PEP-668 externally-managed; `pip install Pillow` is blocked | Integration agent uses a venv: `python3 -m venv /tmp/blogimg-venv && /tmp/blogimg-venv/bin/pip install Pillow && /tmp/blogimg-venv/bin/python scripts/generate-blog-images.py`. (From `reference_takkada_blog_batch_state` memory.) |
| **Broken internal links** if agents invent slugs | Agents link only to the curated target list (live + same-batch slugs); integration agent + U6 audit every link resolves. |
| **Vertical pages read as find-and-replace** of FMCG/pharma | U3 requires defensibly different DSO/margin numbers per vertical; integration spot-checks divergence. |
| **Accidental push to `main`** | Swarm never pushes (scope boundary). Operator deploys via PR; `main` is PR-protected so a stray direct push is rejected anyway. |
| **Banned tokens / em-dashes slip through** | Per-batch lint (U2–U5) + aggregate lint (U6), two independent passes. |
| **Hinglish degrades to English-with-garnish** | U5 scenario explicitly checks the body reads as genuine Hinglish against the `udhar-vasuli` anchor. |
| **CLAUDE.md §8 misleads the deploy step** (says GitHub Pages) | U7 carries the corrected deploy reality (Cloudflare + PR-protected `main`) inline. Consider a follow-up to fix §8. |

---

## Open Decisions for the Operator

- **Run cadence:** all four steps in one `ce-work` session, or one step per session? One-session keeps momentum; per-session keeps each orchestrator context even leaner. Default: one session, sequential steps, since per-batch integration already bounds context.
- **Hinglish frontmatter:** Roman-script Hinglish titles assumed (English-search-engine readable). Confirm Devanagari stays deferred.
- **0% MDR claim wording:** re-confirm at U1 (per-run requirement).
