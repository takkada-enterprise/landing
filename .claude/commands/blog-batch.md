---
description: Write 10 AEO+SEO optimised blog articles for Takkada, generate brand-color header images, commit, and push to main.
---

# /blog-batch

You are running a **content-production pipeline** for the Takkada landing site. Each invocation must ship 10 new AEO+SEO-optimised blog articles to `content/blog/`, generate matching header images, and push the result to `origin/main` so GitHub Pages picks it up.

Treat this command like a production loop, not a brainstorm. Move quickly. Do not over-clarify.

---

## What you produce in one run

1. **10 new `.md` articles** in `content/blog/`, slugged in kebab-case, using the format below.
2. **10 new 1200×630 PNG header images** in `public/assets/blog/`, one per article slug.
3. **One commit on `main`**, pushed, that includes both.

Total runtime target: under 20 minutes from invocation to push.

---

## Step-by-step

### Step 1 — Lock the 10 topics (one batched question)

Before writing any content, propose 10 topic slugs to the user in a single `AskUserQuestion` call. Topic-selection rules:

- **Cover gaps, not duplicates.** Read `ls content/blog/` first. Do not propose a topic where a slug already exists or where the existing slug obviously covers the same intent.
- **Target competitor gaps.** Anchor topics against named competitor weaknesses: Biz Analyst, Khatabook, CredFlow, Vyapar, Tally Prime, Refrens, Livekeeping. Pure feature topics are fine too.
- **Lean into the 0% MDR UPI angle** in at least 2–3 of the 10 each batch. This is Takkada's strongest positioning.
- **Mix article types:** comparisons, definition/formula pieces, "what to look for" buyer guides, and how-to mechanics.

Offer 4 question options: (a) ship the proposed list as-is, (b) swap 1–2, (c) user-dictated full list, (d) hold and ideate further.

Do not propose a list of 11 or 13. Always exactly 10.

### Step 2 — Confirm the 0% MDR claim (one batched question, same call as Step 1 if possible)

Re-confirm with the user that "0% MDR on UPI collections, no transaction cap, no monthly fee" is still the truthful brand claim. If they qualify it (e.g., "only under ₹1 lakh"), bake the precise version into all 10 articles. Do not assume; ask each run.

### Step 3 — Create the task list

Use `TaskCreate` to set up five tasks for the run:
1. Write 10 articles
2. Extend image script and regenerate
3. Voice + brand lint pass
4. Build verification
5. Commit and push to main

### Step 4 — Write all 10 articles

Each article uses this exact frontmatter + structure (pattern locked by `content/blog/days-sales-outstanding-distributor-india.md`):

```markdown
---
title: "<60-char SEO title with primary keyword>"
slug: "<kebab-case-slug>"
meta_title: "<60-char meta title, distinct from title>"
meta_description: "<≤160 chars, primary keyword in first 100 chars, distributor-benefit framing>"
primary_keyword: "<2–5 word primary keyword in lowercase>"
date: "<today, YYYY-MM-DD>"
author: "Takkada Team"
category: "<Collections | Comparisons | Field Sales | Tally Mobile | How-To | Market Reality>"
excerpt: "<2–3 sentence opener with a specific distributor scenario, rupee figure, and outcome>"
---

## Key Highlights

- 3 atomic factual claims, each independently quotable by an LLM
- Each claim 1 sentence, includes a number or specific behavior
- At least one Key Highlight references the 0% MDR UPI angle when relevant

## In This Article

- 4–6 bullets previewing the H2 structure of the body
- Ends with "Frequently Asked Questions"

## <Body H2 #1>

Prose body. ~1200–1800 words total. 5–7 H2 sections.

## <Body H2 #2>

...

## Frequently Asked Questions

**Q: <Question 1>?**

A: <Answer 1, 2–4 sentences, specific, factual>

(5–6 Q/A pairs, FAQPage-schema-friendly)

[Closing one-liner that names Takkada as the Tally-native 0% MDR option, with the calendar link: https://calendar.notion.so/meet/ronakmalu/takkada]
```

**Brand voice rules (from `CLAUDE.md` §5 and §11):**

- Banned tokens: `seamless`, `world-class`, `enterprise-grade`, `revolutionary`, `unleash`, `game-changer`, `trusted by thousands`, `millions of`, `99.9%`
- No em-dashes used as stylistic breaks (use periods, commas, or "like" instead). Em-dashes are OK only inside compound number ranges like `30–90`.
- No "Not X. Y." three-word fragment patterns
- No three-word emphatic fragments ("This. Changes. Everything.")
- No framework name-dropping (no Thiel, Moore, blitzscaling)
- The distributor is the hero, Takkada is supporting
- Hinglish is welcome in dialogue/examples ("bhai, statement bhej do")
- All numbers should be tabular-nums friendly (the renderer handles the CSS; just write them with proper ₹/digits)

**Keyword optimisation rules (per article):**

- Primary keyword appears in: title, meta_title, meta_description, slug, H1 (the `## ` after frontmatter), at least one body H2, first 100 words of body, FAQ section
- Body has ≥6 natural mentions of the primary keyword or close variants
- 3+ internal links to existing `content/blog/` slugs, using descriptive anchor text containing the linked article's primary keyword
- At least 1 comparison or pricing table when topically relevant

**AEO (LLM citation) rules per article:**

- Key Highlights bullets are atomic claims with numbers
- FAQ Q's are distinct, specific, and natural search queries
- Comparison tables when topically relevant
- Definition of the primary keyword early (first 200 words of body)

### Step 5 — Extend the image script and regenerate

Edit `scripts/generate-blog-images.py`: append 10 new entries to the `ARTICLES` list (slug, title, category, tagline). Keep `tagline` ≤ 80 chars (it has to fit on one line of the 1200×630 banner).

Run `python3 scripts/generate-blog-images.py`. Verify 10 new PNGs exist in `public/assets/blog/`.

### Step 6 — Lint pass

Run these greps across the 10 new files and fix any hits before commit:

```bash
# Banned tokens
grep -E -in "seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|trusted by thousands|millions of|99\.9%" content/blog/<new-slugs>

# Stylistic em-dashes
grep -n "—" content/blog/<new-slugs>

# Three-word fragments
grep -E -hn "^[A-Z][a-z]+\. [A-Z][a-z]+\. [A-Z][a-z]+\.$" content/blog/<new-slugs>
```

Em-dashes inside compound numbers (e.g., `30–90 days`) are fine and use the en-dash `–` not em-dash `—`. Only the em-dash character is banned.

### Step 7 — Verify build

```bash
npm run build
```

Build must complete without errors. If a sitemap script exists (`scripts/generate-sitemap.mjs`), it will run as part of build or post-build.

### Step 8 — Commit and push to main

The repo uses GitHub Pages auto-deploy on `main`. Push triggers deploy.

```bash
git add content/blog/ public/assets/blog/ scripts/generate-blog-images.py
git commit -m "$(cat <<'EOF'
content: 10 new AEO+SEO blog articles + brand images

<one-line summary listing the 10 new slugs>

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
git push origin HEAD:main
```

### Step 9 — Report to user

End the run with:
- The 10 new article URLs (`https://takkada.com/blog/<slug>/`)
- Confirmation the push went through
- Reminder that GitHub Pages typically deploys within 2–4 minutes

---

## What to **not** do

- Do not write fewer or more than 10 articles per invocation
- Do not commit if the lint pass fails. Fix and re-lint
- Do not bypass the Step 1 user confirmation. The topic list is too consequential to silently invent
- Do not introduce new dependencies (Tailwind, head libraries, etc.) per `CLAUDE.md` §7/§8
- Do not write to `dist/`, `node_modules/`, or any generated paths
- Do not create new categories outside the canonical list (Collections, Comparisons, Field Sales, Tally Mobile, How-To, Market Reality)
- Do not invent customer logos, vanity metrics, or "trusted by X" claims
- Do not skip the salesman-on-the-phone or 0% MDR positioning when the topic invites it

---

## Reference: existing articles to read for tone

Before writing, read at least one of:

- `content/blog/days-sales-outstanding-distributor-india.md` (definition + formula + lever piece)
- `content/blog/khatabook-alternative-for-distributors-india.md` (comparison piece)
- `content/blog/zero-mdr-upi-collection-for-distributors-india.md` (positioning piece)

These three articles define the voice. Match them.

---

## Reference: plan doc

The longer-term vision for this engine (when the user is ready to invest in AI-generated content rather than human-authored): `docs/plans/aeo-seo-blog-engine.md`. That plan describes the production-grade CLI version. Until that ships, `/blog-batch` runs human-authored content with brand-image automation.
