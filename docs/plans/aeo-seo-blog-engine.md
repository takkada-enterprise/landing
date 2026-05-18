---
title: AEO + SEO Blog Engine for Takkada
slug: aeo-seo-blog-engine
status: active
owner: Takkada team
created: 2026-05-18
goal: A repeatable CLI-driven blog production system that ships articles ranked above Biz Analyst, Khatabook, CredFlow, Vyapar, and Tally Prime on Indian distributor search and AI-citation queries.
---

# AEO + SEO Blog Engine for Takkada

## 1. Context

Takkada's current blog has 29 articles in `content/blog/`. Recent posts (DSO, salesman app, WhatsApp dispatch) were written manually inside this Claude session. The publishing flow already exists: `scripts/publish-blogs.sh` regenerates images and commits, `scripts/generate-sitemap.mjs` produces the sitemap, GitHub Pages picks up `main`. What's missing is the **front half**: a deterministic, terminal-driven loop that takes a target keyword or competitor URL and outputs an article + image prompts that are competitive on both classical Google SERP **and** AI-answer surfaces (ChatGPT, Claude, Perplexity, Gemini).

The five competitors to beat:

| Competitor | Where they currently win | Where they're weak |
|---|---|---|
| Biz Analyst | Tally-on-mobile keyword pack | Generic copy, no field-sales depth, no e-invoice/e-way detail |
| Khatabook | Hindi/Hinglish receivables content, brand recall | Not Tally-native; their content avoids the Tally integration question |
| CredFlow | DSO + receivables analytics SEO | B2B-only tone, doesn't speak to 5–50 person distributors |
| Vyapar | "Billing software" head terms | Sells *replacing* Tally, not *augmenting* it; distributor-side content is thin |
| Tally Prime (official) | Brand SEO on "Tally + X" queries | Won't write competitive content about their own gaps (mobile, WhatsApp, UPI) |

Takkada's structural advantage: we sit *on top of* Tally, talk to real distributors weekly, and can write from inside the problem (DSO math, retailer behaviour, kirana-side reality) in a way none of the above will.

Image generation stays out of the terminal loop for now — Gemini API requires paid billing, and the user prefers to paste prompts into Gemini web manually. The engine outputs prompts; the human pastes images.

## 2. Goals

- **G1.** One CLI invocation turns a target keyword (or competitor URL) into a publish-ready `.md` article in `content/blog/` matching the format in `days-sales-outstanding-distributor-india.md`.
- **G2.** Every generated article passes the AEO bar: Key Highlights block with ≥3 atomic claims (each independently quotable by an LLM), an FAQ section with FAQPage-compatible Q/A pairs, and explicit numeric proof where claims are quantitative.
- **G3.** Every generated article passes the SEO bar: unique meta title <60 chars, meta description <160 chars, primary keyword in title + H1 + first 100 words, 3+ internal links to existing articles in `content/blog/`, and a `BreadcrumbList` + `Article` schema block on render.
- **G4.** The engine outputs 3 image prompts per article (header + 2 inline diagram options), formatted for direct paste into Gemini web. The human generates and drops files into `public/assets/blog/`.
- **G5.** Voice and brand guardrails from `CLAUDE.md` sections 5, 7, and 11 are enforced automatically — banned phrases (em-dash breaks, "seamless", "world-class", three-word fragments, etc.) fail the build until rewritten.
- **G6.** Competitor delta is measurable: for each generated article, the engine produces a one-line diff showing what this article covers that the top-ranking competitor article does not.

## 3. Non-goals (Scope Boundaries)

- **Not** automating image generation. Images remain manual until the user enables Gemini API billing or chooses a paid image provider.
- **Not** publishing to social, Reddit, or LinkedIn. This plan ends at "article merged to `main`".
- **Not** building a CMS / admin UI. Everything is files + CLI scripts.
- **Not** writing for languages other than English/Hinglish in this iteration. Pure Hindi or regional language posts are a separate plan.
- **Not** introducing a new framework. Stay on the existing Vite/React/`vite-react-ssg` stack. The engine is Node CLIs in `scripts/`.
- **Not** generating fake stats. Banned by `CLAUDE.md` §5; the engine refuses to emit numbers it cannot ground in a source the human supplies.

## 4. Architecture (one-paragraph version)

A single Node CLI (`scripts/blog/new.mjs`) takes a brief (target keyword, optional competitor URL, optional must-include facts), calls the Anthropic API to produce a structured brief, then calls it again to produce the article body, runs the result through a deterministic lint pass (`scripts/blog/lint.mjs`), and writes the final `.md` to `content/blog/`. A second CLI (`scripts/blog/image-prompts.mjs`) reads any `.md` and emits 3 Gemini-ready prompts. `scripts/publish-blogs.sh` already exists for the commit/deploy half; the new CLIs slot in upstream of it.

```
keyword + competitor URL
        │
        ▼
┌─────────────────────┐
│ scripts/blog/       │   (Anthropic API, structured output)
│   research.mjs      │ → brief.json (claims, FAQs, internal-link targets)
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ scripts/blog/       │   (Anthropic API, fills the article template)
│   write.mjs         │ → draft.md
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ scripts/blog/       │   (deterministic regex + structural checks)
│   lint.mjs          │ → pass / fail with specific line numbers
└─────────────────────┘
        │
        ▼
   content/blog/<slug>.md
        │
        ▼
┌─────────────────────┐
│ scripts/blog/       │   (no AI call; pulls title + category from frontmatter)
│   image-prompts.mjs │ → prints 3 prompts to stdout
└─────────────────────┘
        │ (human pastes into Gemini web,
        │  saves PNG into public/assets/blog/)
        ▼
   scripts/publish-blogs.sh
```

## 5. Implementation Units

### U1 — Article template lock-in

**Goal:** Codify the existing `.md` shape (frontmatter + Key Highlights + In This Article + body + FAQ + Internal Links) as a single source of truth.

**Files:**
- Create: `scripts/blog/template.md` (template with placeholder tokens)
- Create: `scripts/blog/template.schema.json` (frontmatter schema — title, slug, meta_title, meta_description, primary_keyword, date, author, category, excerpt, all required)
- Modify: `scripts/import-seo-drafts.mjs` (point at the new template if it diverges)

**Approach:** Read `content/blog/days-sales-outstanding-distributor-india.md` end-to-end and extract its structure verbatim. Tokens use `{{double-brace}}` style. Validate that 3 random existing articles parse against the schema; if they don't, the article-renderer in the React app is doing extra work and the schema needs to widen.

**Verification:** `node scripts/blog/template.mjs --check content/blog/*.md` exits 0 against every existing article. Any article that fails the schema is reported by file path and missing field.

**Execution note:** No AI calls in this unit. Pure file-shape work.

---

### U2 — Competitor scrape + gap brief

**Goal:** Given a competitor article URL (Biz Analyst, Khatabook, CredFlow, Vyapar, Tally), produce a structured brief that names what the competitor covers, what they miss, and what claims Takkada can make that they can't.

**Files:**
- Create: `scripts/blog/research.mjs`
- Create: `scripts/blog/competitor-fetch.mjs` (thin HTTP fetch + readability extraction, no AI)

**Approach:**
1. `competitor-fetch.mjs` fetches the URL, strips boilerplate via the `@mozilla/readability` package, returns plaintext + outline.
2. `research.mjs` sends `{target_keyword, competitor_outline, competitor_text}` to the Anthropic API with a prompt that asks for: (a) the competitor's claim list, (b) the competitor's gaps relative to a Tally-native distributor angle, (c) 3–6 atomic claims Takkada should make, (d) 5 FAQ questions a real distributor asks, (e) 3–5 internal-link slugs from `content/blog/`.
3. Output: `content/blog-drafts/<slug>-brief.json`.

**Verification:**
- Run against the existing CredFlow DSO post; output brief includes claims about Indian retailer 30/45/60-day cycles that CredFlow's post omits.
- Run with no competitor URL (`--keyword-only`); output brief is still structurally valid, just without the competitor diff fields populated.

**Execution note:** Cache the competitor fetch on disk keyed by URL hash so re-runs are free.

---

### U3 — Article writer

**Goal:** Brief in, article `.md` out, matching the template and respecting brand voice.

**Files:**
- Create: `scripts/blog/write.mjs`
- Create: `scripts/blog/voice.md` (the prompt's voice block — copies §5 of `CLAUDE.md` verbatim)

**Approach:**
1. Load template, brief, voice block.
2. Call Anthropic with a structured prompt that produces the article in sections (Key Highlights, In This Article, body sections, FAQ, Internal Links). Each section is generated in a single call with the prior sections in context, not all at once — keeps coherence and lets us re-roll a single section without regenerating the whole post.
3. Inline internal links as `[anchor](/blog/<slug>)` using slugs from the brief. Refuse to inline a slug that doesn't exist in `content/blog/`.
4. Write to `content/blog-drafts/<slug>.md`. (Not directly to `content/blog/` — the lint pass promotes it.)

**Verification:**
- Generated draft contains all required frontmatter fields and parses against `template.schema.json`.
- Word count is within 1,200–2,400 words (the band the existing articles sit in).
- At least 3 internal links and they all resolve to real files.
- Re-running with the same brief produces deterministically similar structure (section headings stable; body wording naturally varies).

**Execution note:** Keep the model and the API key configurable via env (`ANTHROPIC_API_KEY`, `BLOG_MODEL` default `claude-sonnet-4-6`). Sonnet 4.6 is the right tier — Opus is overkill for this format, Haiku loses the voice nuance.

---

### U4 — Voice + brand lint

**Goal:** Deterministic, no-AI check that fails on banned phrases and structural deficiencies before promotion to `content/blog/`.

**Files:**
- Create: `scripts/blog/lint.mjs`

**Approach:**
Plain-regex and structural checks against a draft:

| Check | Source of rule |
|---|---|
| No em-dashes used as stylistic breaks (allow inside compound numbers, e.g., "30–90") | `CLAUDE.md` §5 |
| Banned tokens: "seamless", "world-class", "enterprise-grade", "revolutionary", "unleash", "game-changer", "trusted by thousands", "millions of" | `CLAUDE.md` §12 |
| No `"X. Y. Z."` three-word fragments | `CLAUDE.md` §5 |
| Meta title ≤ 60 chars, meta description ≤ 160 chars, slug matches filename | `CLAUDE.md` §9 |
| Every ₹ amount, %, and date is on a line that survives `grep -E '₹[0-9]'` (used by render-layer tabular-nums class) | `CLAUDE.md` §7 |
| Primary keyword appears in `title`, in the first `<h2>` (Key Highlights doesn't count), and in the first 100 words of body | SEO baseline |
| FAQ section has ≥3 Q/A pairs and each Q ends with `?` | AEO baseline |
| Key Highlights has ≥3 bullets and each bullet is a standalone factual claim (>40 chars, no pronoun-only refs) | AEO baseline |

Exit 0 promotes the file from `content/blog-drafts/` to `content/blog/`. Exit non-zero leaves it in drafts with a line-by-line failure report.

**Verification:**
- Lint passes on all 3 articles shipped today (DSO, salesman app, WhatsApp dispatch).
- Lint fails on a hand-crafted draft containing each banned phrase, and the failure report names the line.

**Execution note:** Don't use an AI model in this unit. Determinism matters — the same draft must always pass or always fail.

---

### U5 — Image-prompt generator

**Goal:** Given an article `.md`, print 3 Gemini-web-ready prompts to stdout. No API call.

**Files:**
- Create: `scripts/blog/image-prompts.mjs`

**Approach:**
1. Parse frontmatter from the `.md`.
2. Emit three prompts derived from `(title, category, excerpt)`:
   - **Header (1200×630):** the dark-sage gradient brand header (matches existing PNGs in `public/assets/blog/`).
   - **Concept illustration:** category-specific (collections → DSO chart; field sales → salesman on mobile; etc.).
   - **Spot diagram:** simple flat diagram of the article's central mechanism.
3. Each prompt includes brand color hexes, aspect ratio, file-name suggestion, and a one-line note on where to drop the file.

**Verification:**
- Running it against `days-sales-outstanding-distributor-india.md` emits exactly 3 prompts, all referencing the article's title, category, and brand palette.
- A new operator pastes prompt #1 into Gemini web, downloads the result, drops it as `public/assets/blog/<slug>.png`, and the existing blog renderer picks it up with no other changes.

---

### U6 — One-command happy path

**Goal:** A single command turns a keyword + competitor URL into a draft, lints it, promotes it on green, and prints the image prompts.

**Files:**
- Create: `scripts/blog/new.mjs` (the orchestrator)
- Modify: `package.json` (add `"blog:new": "node scripts/blog/new.mjs"` script)

**Approach:**
```
npm run blog:new -- \
  --keyword "outstanding payment reminder app india" \
  --competitor https://khatabook.com/blog/...
```
Sequence: `research → write → lint → (on green) promote → image-prompts`. On lint failure, print failures and exit non-zero, leaving the draft in `content/blog-drafts/<slug>.md` for human edit + manual re-lint via `npm run blog:lint -- content/blog-drafts/<slug>.md`.

**Verification:**
- Cold run against a new keyword (e.g., "credit period for retailers india") produces a publish-ready article in under 90 seconds, with image prompts printed at the end.
- Lint failure halts promotion; the draft file in `content/blog-drafts/` is editable and re-lintable.

---

### U7 — Competitor delta artefact

**Goal:** Every article carries a hidden HTML comment at the top of the body listing what it covers that the competitor doesn't. Used by the team to track positioning, not rendered to users (the React renderer strips HTML comments).

**Files:**
- Modify: `scripts/blog/write.mjs` (inject the comment block)

**Approach:**
After generation, append a comment block of the form:
```
<!-- competitor-delta:source=<url> | covers-that-comp-misses: ["DSO math by turnover band", "WhatsApp 7/15/30 reminder cadence", "retailer-side objection handling"] -->
```
A future sub-command `scripts/blog/audit-delta.mjs` (out of scope for this plan; a follow-up) can grep these to produce a positioning report.

**Verification:**
- Every article produced through U6 contains exactly one `competitor-delta` comment.
- Inspecting the rendered HTML on `npm run preview` confirms the comment is stripped from the visible page.

---

### U8 — Schema injection

**Goal:** Each rendered blog page emits valid `Article` + `BreadcrumbList` + `FAQPage` schema, picked up by Google Rich Results and AI crawlers.

**Files:**
- Modify: the React component that renders a blog post (locate via `grep -r "primary_keyword" src/`)
- Possibly modify: `scripts/generate-sitemap.mjs` to include blog routes if it doesn't already

**Approach:**
1. Identify the existing blog renderer component.
2. Add a `<Head>` block (via `vite-react-ssg`'s `Head`, per `CLAUDE.md` §8) that emits three JSON-LD scripts: `Article`, `BreadcrumbList` (Home → Blog → <Title>), and `FAQPage` constructed from the article's FAQ section.
3. Pricing in any schema example uses `INR` (`CLAUDE.md` §9).

**Verification:**
- Build the site, then `curl https://takkada.com/blog/<slug>/` (or local preview) and grep for `"@type":"FAQPage"`, `"@type":"Article"`, `"@type":"BreadcrumbList"`. All three must appear.
- Validate the JSON-LD against Google's Rich Results Test on at least 2 articles.

---

### U9 — Operator runbook

**Goal:** A one-page `RUNBOOK.md` at `docs/runbooks/blog.md` so the team can ship an article without asking an agent every time.

**Files:**
- Create: `docs/runbooks/blog.md`

**Content outline:**
1. Pick a keyword (or competitor URL).
2. Run `npm run blog:new -- --keyword "..." --competitor "..."`.
3. On lint failure: open the draft in `content/blog-drafts/`, fix, re-run `npm run blog:lint`.
4. Copy the 3 image prompts the CLI printed; paste into gemini.google.com (signed in).
5. Download generated images; save as `public/assets/blog/<slug>.png`, `<slug>-illustration.png`, `<slug>-diagram.png`.
6. `bash scripts/publish-blogs.sh` (existing).
7. Wait for GitHub Pages deploy; verify the article renders with images and schema.

**Verification:** A non-technical operator (or a fresh Claude session with no prior context) can follow the runbook end-to-end on a new keyword and ship.

---

## 6. Sequencing

Hard dependency order: **U1 → U2 → U3 → U4 → U6**. U5, U7, U8, U9 are independent once their prerequisites land.

| Wave | Units | Why |
|---|---|---|
| 1 | U1 | Template lock is upstream of everything |
| 2 | U2, U5 (parallel) | Research needs the template; image-prompts only needs the frontmatter shape |
| 3 | U3 | Needs the brief from U2 |
| 4 | U4 | Needs writer output to lint |
| 5 | U6 | Orchestrates U2–U5 |
| 6 | U7, U8, U9 (parallel) | Independent polish |

## 7. Verification (whole-engine)

- End-to-end: `npm run blog:new -- --keyword "udhar vasuli app for distributors" --competitor <khatabook-url>` produces a publishable article, lint passes, image prompts print, all in <90s.
- Spot-check ranking signal: title, H1, first 100 words all contain the primary keyword variant.
- Spot-check AEO signal: at least 3 atomic claims in Key Highlights, each independently citable.
- Spot-check brand: zero banned phrases via `grep -E -i "seamless|world-class|enterprise-grade|revolutionary|game-changer"` against the new file.
- Spot-check internal linking: at least 3 in-repo links, all resolving.

## 8. Deferred to Implementation

1. **Anthropic API key plumbing.** Confirm whether the repo already has an `ANTHROPIC_API_KEY` available in a `.env.local` (it doesn't appear to). The implementer decides: env var, `.env.local`, or a one-shot `--api-key` flag. Whichever, the key must never land in git.
2. **Sonnet vs. Opus default.** Plan defaults to Sonnet 4.6 on quality grounds; implementer should A/B 2 articles on each tier and pick by output quality + cost.
3. **Readability extraction.** Plan suggests `@mozilla/readability`, but if the competitor pages use heavy client-side rendering, `cheerio` + a manual selector list per domain may be more reliable. Implementer picks during U2.
4. **Image prompt fidelity.** Plan emits text prompts only. If Gemini web's image quality varies too much per prompt, the prompts may need explicit style anchors (e.g., "same flat illustration style as previous Takkada blog headers"). Tune after the first 5 articles ship.
5. **Localization.** Whether to ever emit Hinglish-titled articles ("udhar vasuli kaise kare") is an existing pattern in `content/blog/` and the engine should at least *not break* on Hinglish slugs.

## 9. What this looks like once shipped

A founder or operator opens a terminal, types:

```
npm run blog:new -- --keyword "credit limit for retailers" --competitor https://khatabook.com/blog/credit-limit
```

90 seconds later, an article is sitting at `content/blog/credit-limit-for-retailers.md`, lint-clean, with the right meta tags, FAQ, internal links, and a comment block documenting what we cover that Khatabook doesn't. The terminal prints three image prompts. The operator pastes them into Gemini, downloads three PNGs, drops them into `public/assets/blog/`, runs `bash scripts/publish-blogs.sh`, and the article is on takkada.com within the next deploy cycle.

No agent intervention required after the first invocation. Compounds across keywords. Outranks the competitors on both Google SERP and AI-answer citations because every article is a deliberate gap-fill against a specific competitor URL, with primary-source claims a distributor reading it can verify against their own books.
