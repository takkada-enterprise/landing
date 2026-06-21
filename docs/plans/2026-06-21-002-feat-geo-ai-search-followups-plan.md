---
title: "feat: GEO / AI-search follow-ups — robots.txt, named authors, front-loaded answers, off-site presence"
type: feat
status: active
created: 2026-06-21
depth: standard
target_repo: takkada-enterprise/landing
origin: GEO-ANALYSIS.md (PaySaathi root, 2026-06-21)
---

# feat: GEO / AI-search follow-ups (items #2–#5 from GEO-ANALYSIS.md)

**Target repo:** `takkada-enterprise/landing` (working dir: `takkada website/landing`). All file paths below are relative to that repo root. Deploy is Cloudflare on push to `main` (PR-protected); branch from current and open a PR.

## Summary

Acts on four of the five GEO findings for takkada.com. The on-site content is already strong (SSR, deep schema, FAQ blocks, 98 intent-matched posts), so this is targeted reinforcement, not a rebuild:

- **#2 robots.txt** — make every crawler appear once with one intentional directive. **Key correction from the audit:** the source `public/robots.txt` is *already* clean. The self-contradiction (a `Disallow` block for GPTBot/ClaudeBot/Google-Extended followed by an `Allow` block) is **injected by Cloudflare's edge "Block AI bots / managed robots.txt" feature**, not by the repo. The real lever is a Cloudflare dashboard change (operator action); the repo change is a small polish + a verification routine.
- **#4 named authors** — replace the generic `"Takkada Team"` byline with a real named author (founder) carrying credentials + LinkedIn `sameAs`. Requires a new author registry and a schema change (author is currently typed `Organization`, must become `Person`).
- **#5 front-loaded answers** — establish a "134–167-word self-contained answer immediately under the H1" convention, guard it with a build-time lint check, and backfill a cornerstone set of ~15–20 highest-intent posts first.
- **#3 off-site presence** — YouTube + Reddit. Off-repo marketing; carried here as a lightweight **ops track**, explicitly not implementation.

### Decisions carried in (confirmed with operator)
- **#4:** Founder as the single primary author. Operator supplies real name, role, and LinkedIn URL; this plan builds the mechanism and leaves the identity as a named input.
- **#5:** Cornerstone set (~15–20) first, plus convention + lint guard, then roll out the rest opportunistically.
- **#3:** Included as a lightweight ops checklist track in this plan.

---

## Scope Boundaries

**In scope**
- `public/robots.txt` polish + documented Cloudflare dashboard action + a re-runnable crawler-access verification.
- Author registry (`src/data/authors.js`), `Person` author schema with `sameAs`, byline rendering, `dateModified` fix.
- Lead-answer convention + lint guard + backfill of the cornerstone post set.
- An off-site presence checklist (YouTube/Reddit) as ops, not code.

**Deferred to Follow-Up Work**
- Front-loading the remaining ~80 non-cornerstone posts (rolled out after the cornerstone set; guard makes new posts compliant by default).
- A multi-author pool (only the founder is added now).
- Per-author `/authors/<slug>` pages and `ProfilePage` schema (registry is built to support this later).
- `aggregateRating` on `SoftwareApplication` (needs genuine multi-review data — out of scope here).

**Outside this product's identity / non-goals**
- Any vanity metrics or invented credentials/claims (violates the landing repo voice rules in `CLAUDE.md` §5).
- Blocking Googlebot or general search crawlers — Google access is already correct and must stay so.

---

## Requirements Traceability

| Item | Source (GEO-ANALYSIS.md) | Units |
|---|---|---|
| #2 robots.txt single intentional directive | §2, §8.2 | U1 |
| #4 named author + credentials + LinkedIn sameAs | §7, §8.4 | U2, U3 |
| #5 front-loaded 134–167-word answer under H1 | §6, §8.5 | U4, U5 |
| #3 YouTube + Reddit presence | §5, §8.3 | U6 |

---

## Key Technical Decisions

1. **robots.txt fix lives in Cloudflare, not the repo.** Verified live: source `public/robots.txt` lists each bot once with `Allow`; the conflicting `Disallow` block is Cloudflare's managed injection. Editing the repo file cannot remove the injected block. So U1's durable fix is an operator dashboard action (disable "Block AI bots" / managed-robots.txt for the search-citation crawlers), and the repo's job is to (a) keep the source authoritative and explicit and (b) ship a verification script so the access regression is catchable. Rationale: fix the actual cause, not a copy of it (Zero-to-One §2 — find the secret; it's the edge layer).

2. **Author becomes a `Person` driven by a registry.** `articleSchema()` in `src/data/schema.js` currently emits `author: { '@type': 'Organization', name: post.author }`. Change it to resolve `post.author` against a new `src/data/authors.js` registry and emit `{ '@type': 'Person', name, url, sameAs:[linkedin], jobTitle, worksFor:{@id org} }`, falling back to the existing Organization shape when the author is unknown. Registry indirection (not inline frontmatter) keeps one source of truth for credentials and supports future author pages without touching 98 files.

3. **`dateModified` must stop mirroring `datePublished`.** Currently both are `post.date`. Add an optional `updated` frontmatter field; `dateModified` uses `post.updated ?? post.date`. Recency is a ~3× citation multiplier — front-loading edits (U5) should legitimately bump `updated`.

4. **Front-loading is enforced by a lint guard, not just a convention.** A Node script checks every post has a self-contained lead paragraph (target 134–167 words, hard-fail outside a tolerance band) as the first content node after the H1/frontmatter and before any `##` subheading. Wiring it into the build/CI makes the convention durable for all future posts (Zero-to-One §5 — build the mechanism once).

5. **Off-site track stays non-code.** U6 is a checklist with no repo artifacts beyond optionally recording channel URLs in the `sameAs` arrays once they exist. Marked ops so `ce-work` does not treat it as buildable.

---

## Implementation Units

### U1. robots.txt — one intentional directive + edge fix + verification

**Goal:** Every crawler resolves to a single, unambiguous directive, and the AI-search crawlers (OAI-SearchBot, PerplexityBot, ClaudeBot) are actually reachable at the edge.

**Requirements:** #2 (GEO §2, §8.2)

**Dependencies:** none

**Files:**
- `public/robots.txt` (modify — source of truth)
- `scripts/checkCrawlerAccess.mjs` (new — verification)
- `scripts/checkCrawlerAccess.test.mjs` (new)
- `docs/plans/2026-06-21-002-...-plan.md` Operator Actions section (this doc) records the dashboard step

**Approach:**
- **Operator action (cannot be done from the repo):** In the Cloudflare dashboard for takkada.com → Security → Bots (and WAF managed rules / "Manage robots.txt"), disable AI-bot blocking for the citation crawlers we want — `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot` — while it's fine to keep blocking pure scrapers/trainers (`CCBot`, `Bytespider`, `Amazonbot`, `meta-externalagent`). This removes the injected `Disallow` block that contradicts the source file. Document this as Operator Action #1; the plan cannot self-verify the dashboard, only the resulting behavior.
- **Source polish:** keep one group per agent; add `ChatGPT-User` (live browsing) to the allow set; add an explicit `Content-Signal: search=yes, ai-input=yes, ai-train=no` line so intent is stated, not implied. Do not introduce duplicate same-name groups.
- **Verification script:** fetch `https://takkada.com/` (and `/sitemap.xml`) with each crawler's user-agent and assert status. Note in output that a spoofed-UA 403 from a non-verified IP is expected for Cloudflare-verified bots, so the script reports status per bot and flags the *relative* signal (Googlebot 200 vs AI bot 403) rather than asserting a hard pass — it's a regression detector and a dashboard-change confirmation aid, not a definitive allow/deny oracle.

**Patterns to follow:** existing `scripts/` Node ESM style (`.mjs`); reuse the repo's existing fetch/test harness conventions.

**Execution note:** treat the Cloudflare change as the gating step — the script's purpose is to confirm it landed.

**Test scenarios:**
- `checkCrawlerAccess.mjs` parses a fixture of HTTP responses and classifies each bot as `served`/`blocked`. Covers happy path.
- Given Googlebot=200 and OAI-SearchBot=403, the script flags an AI-access regression (exit non-zero or warn). Error path.
- Given all citation crawlers=200, the script reports clean. Happy path.
- Malformed/empty response for a bot → reported as `unknown`, not a crash. Edge case.

**Verification:** source `robots.txt` has zero duplicate user-agent groups; after the operator dashboard change, re-running the script shows OAI-SearchBot/PerplexityBot/ClaudeBot no longer hard-blocked relative to Googlebot.

---

### U2. Author registry + `Person` schema + byline + freshness fix

**Goal:** Blog Article schema emits a real `Person` author with credentials and LinkedIn `sameAs`, and `dateModified` reflects real edits.

**Requirements:** #4 (GEO §7, §8.4); supports #5 freshness (GEO §4)

**Dependencies:** none

**Files:**
- `src/data/authors.js` (new — registry: slug → `{ name, jobTitle, bio, url, linkedin, knowsAbout[] }`)
- `src/data/schema.js` (modify — `articleSchema` author resolution + `dateModified`)
- `src/data/schema.test.js` (modify — new assertions)
- `src/routes/BlogPost.jsx` (modify — byline can link to author LinkedIn / future author page)
- `src/lib/blogPosts.js` (modify only if `updated` field needs surfacing alongside `date`)

**Approach:**
- Registry keyed by a stable author key (e.g. `"founder"`); the human's display name lives in the registry, so frontmatter can reference the key while the rendered/byline name stays consistent. Keep a graceful fallback: unknown author key → current Organization-typed author shape (no regression for unmigrated posts).
- `articleSchema(post)`: resolve author; when found, emit `{ '@type': 'Person', name, url, sameAs: [linkedin], jobTitle, worksFor: { '@id': org } }`. Set `dateModified: post.updated ?? post.date`.
- `BlogPost.jsx` byline: render author name; when the registry has a `url`/`linkedin`, wrap in a link (rel external). Keep current visual structure (`.blog-post-byline`).

**Patterns to follow:** existing `articleSchema`/`testimonialSchema` in `src/data/schema.js`; `SAME_AS` const pattern for org; existing byline markup in `src/routes/BlogPost.jsx`.

**Test scenarios (`src/data/schema.test.js`):**
- Post whose author resolves in the registry → `articleSchema` author is `@type: Person` with `name`, `sameAs` containing the LinkedIn URL, and `jobTitle`. Happy path.
- Post with an unknown/legacy author string → falls back to `@type: Organization` (no crash, no missing author). Edge / backward-compat.
- `dateModified` equals `updated` when present, else `datePublished`. Happy path + edge.
- `worksFor`/publisher still references the org `@id`. Integration (schema graph consistency).

**Verification:** Google Rich Results / schema validator on a migrated post shows a valid `Person` author with `sameAs`; legacy posts still validate.

---

### U3. Founder author content + assign byline (operator-input gated)

**Goal:** A real founder author exists with a credible bio + LinkedIn, attributed on cornerstone posts.

**Requirements:** #4 (GEO §7, §8.4)

**Dependencies:** U2

**Files:**
- `src/data/authors.js` (modify — fill founder entry with operator-provided real details)
- `content/blog/*.md` cornerstone set (modify — set `author` frontmatter to the founder key; optional short author-bio block at end)

**Approach:**
- **Operator Action #2:** provide founder real name, role/title, 1–2 sentence credential-bearing bio, and LinkedIn URL. Do not invent any of these (voice rules `CLAUDE.md` §5 forbid fabricated claims) — leave registry placeholders clearly marked `TODO(operator)` until supplied; the plan can ship the mechanism but not fake identity.
- Assign the founder as author on the cornerstone set (same list as U5). Optionally append a small "About the author" block to cornerstone posts referencing the bio.

**Execution note:** none.

**Test scenarios:** `Test expectation: none — content/data fill. Schema correctness is covered by U2; lint correctness by U4.`

**Verification:** cornerstone posts render the founder byline (linked to LinkedIn) and emit `Person` author schema; no `TODO(operator)` placeholders remain in shipped author entries.

---

### U4. Lead-answer convention + build-time lint guard

**Goal:** A durable, enforced convention that every post opens with a 134–167-word self-contained answer under the H1.

**Requirements:** #5 (GEO §6, §8.5)

**Dependencies:** none

**Files:**
- `scripts/checkLeadAnswer.mjs` (new — lint)
- `scripts/checkLeadAnswer.test.mjs` (new)
- `CLAUDE.md` (modify — document the lead-answer rule under the content/voice conventions)
- `package.json` (modify — add a `lint:content` script; wire into existing build/CI check)

**Approach:**
- Parse each `content/blog/*.md`: after frontmatter, the first content block before any `##` heading must be a prose paragraph (not a bullet list) of N words. Enforce a band: warn outside 120–180, hard-fail if there is *no* lead paragraph or the first block is a list/heading. (Several current posts open with a "## Key Highlights" bullet list — those fail and are fixed in U5.)
- Word-count counts visible words, ignores markdown link syntax.
- Wire into the same gate the repo already runs in CI (mirror how existing `scripts/` checks are invoked from `package.json`).

**Patterns to follow:** existing `src/lib/parseFaqs.js` markdown-parsing approach; existing `scripts/` ESM + test conventions.

**Test scenarios (`scripts/checkLeadAnswer.test.mjs`):**
- Post with a 150-word lead paragraph before the first `##` → passes. Happy path.
- Post that opens with a bullet list / `## Key Highlights` → fails with a clear message. Error path (this is the current `what-is-takkada.md` shape).
- Post with a 90-word lead → warns (below band). Edge.
- Post with a 220-word lead → warns (above band). Edge.
- Post with no body before first `##` → fails. Edge.
- Link-heavy lead paragraph counts words not markup. Edge.

**Verification:** `npm run lint:content` passes on the cornerstone set after U5 and fails on a deliberately malformed fixture.

---

### U5. Front-load the cornerstone post set (~15–20)

**Goal:** Highest-intent posts open with a citable, self-contained answer; all pass U4's guard.

**Requirements:** #5 (GEO §6, §8.5)

**Dependencies:** U4 (guard defines the bar), U2 (so `updated` bumps are honored)

**Files (cornerstone set — representative; final list ~15–20 highest commercial/definition intent):**
- `content/blog/what-is-takkada.md`
- `content/blog/tally-mobile-app-india.md`
- `content/blog/tally-on-mobile.md`
- `content/blog/tally-prime-mobile-app.md`
- `content/blog/how-to-access-tally-on-mobile-step-by-step.md`
- `content/blog/zero-mdr-upi-collection-for-distributors-india.md`
- `content/blog/only-tally-native-zero-mdr-upi-app-india.md`
- `content/blog/auto-reconciliation-tally.md`
- `content/blog/takkada-vs-credflow.md`
- `content/blog/credflow-vs-biz-analyst-vs-takkada.md`
- `content/blog/biz-analyst-alternative.md`
- `content/blog/vyapar-alternative-for-distributors.md`
- `content/blog/best-tally-app-for-receivables-2026.md`
- `content/blog/takkada-pricing-plans-2026.md`
- `content/blog/payment-collection-app-for-distributors-india.md`
- `content/blog/whatsapp-payment-collection-playbook-india.md`
- `content/blog/is-it-safe-to-connect-app-to-tally.md`
- `content/blog/is-there-an-official-tally-mobile-app.md`

**Approach:**
- Insert (or rewrite the opening into) a 134–167-word prose paragraph that directly answers the post's title question in the first 40–60 words, then completes the self-contained answer — placed before existing "## Key Highlights"/"## In This Article" scaffolding.
- Obey voice rules (`CLAUDE.md` §5): no em-dash breaks, no "Not X. Y." contrast, no staccato fragments, no vanity numbers, Hinglish acceptable. Keep factual claims true (0% MDR, ₹2,700–₹9,999, 20 customers — do not inflate).
- Bump `updated` frontmatter on each edited post (feeds U2's `dateModified`).

**Execution note:** none. Content edits; correctness is enforced by U4 + U2 tests, not new per-post tests.

**Test scenarios:** `Test expectation: none — content. Coverage is U4's lint guard (all cornerstone posts must pass) + U2's dateModified test.`

**Verification:** `npm run lint:content` is green across the cornerstone set; spot-check that each lead paragraph answers the title in the first 1–2 sentences.

---

### U6. Off-site presence — YouTube + Reddit (OPS TRACK, non-code)

**Goal:** Stand up the two highest-correlation off-site citation signals.

**Requirements:** #3 (GEO §5, §8.3)

**Dependencies:** none (but YouTube/Reddit URLs, once live, feed back into `SAME_AS` in `src/data/schema.js` and the founder LinkedIn in U2 — small follow-up edit)

**Approach (checklist — not implementation):**
- **YouTube:** create a channel; record 3–5 short demos mirroring the product's proof behaviors — "invoice from phone → WhatsApp → UPI 0% MDR → auto-reconcile into Tally", "check party outstanding on mobile", "e-way bill from phone". Use real screen capture; no invented numbers.
- **Reddit:** participate authentically in Indian SME/distributor and Tally-adjacent communities; answer real "Tally mobile app", "0% MDR collection", "receivables chasing" threads. No astroturfing.
- **Entity hygiene:** once channels exist, add their URLs to the Organization `sameAs` array (`src/data/schema.js`) and keep the founder LinkedIn consistent with U2.

**Test scenarios:** `Test expectation: none — off-site ops. The only repo artifact is the eventual sameAs URL addition, covered by U2/schema tests.`

**Verification:** channels live with first content; `sameAs` updated when URLs exist.

---

## Operator Actions (cannot be done from the repo)

1. **Cloudflare dashboard (U1):** disable AI-bot blocking for `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot` (keep blocking `CCBot`/`Bytespider`/`Amazonbot`/`meta-externalagent` if desired). This is the actual fix for the robots.txt contradiction.
2. **Founder identity (U3):** provide real name, title, credential bio, and LinkedIn URL for the author registry. Nothing fabricated.
3. **Off-site (U6):** create the YouTube channel and Reddit account; supply URLs for `sameAs` once live.

---

## Sequencing

- **U1**, **U2**, **U4** are independent and can land in parallel.
- **U3** depends on U2 (+ Operator Action #2).
- **U5** depends on U4 (bar) and U2 (freshness).
- **U6** is independent ops; its only repo touch (sameAs) is a small follow-up after U2.

Suggested order: U1 ‖ U2 ‖ U4 → U3, U5 → U6.

---

## Risks & Mitigations

- **Cloudflare verified-bot nuance (U1):** a spoofed-UA 403 from this machine is *expected* for Cloudflare-verified crawlers, so the verification script is a regression detector, not a hard oracle. Mitigation: rely on the dashboard setting as the source of truth; use the script to confirm the relative Googlebot-vs-AI-bot signal and catch future regressions.
- **Fabricated-author risk (U3):** the strongest authority play is also the easiest place to violate the voice rules. Mitigation: hard `TODO(operator)` gate — ship the mechanism, not invented credentials.
- **Lint-guard false positives (U4):** legitimate posts that open with a short definition could trip the band. Mitigation: warn (not fail) outside the band; only hard-fail on a missing/list-first lead.
- **Voice drift in 18 rewrites (U5):** Mitigation: every edited post must pass the existing repo content conventions; reuse exact factual figures from `CLAUDE.md` §3.

---

## Test Strategy

- Unit: `src/data/schema.test.js` (U2 — Person author, sameAs, dateModified, fallback), `scripts/checkLeadAnswer.test.mjs` (U4 — band + list-first failure), `scripts/checkCrawlerAccess.test.mjs` (U1 — classification + regression flag).
- Content gates: `npm run lint:content` green on cornerstone set (U5).
- Manual: schema validator on one migrated post; live crawler-access re-check after the Cloudflare change.
