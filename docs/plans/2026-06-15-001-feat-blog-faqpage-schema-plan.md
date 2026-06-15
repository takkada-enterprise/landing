---
title: "feat: Emit FAQPage schema on every blog post (corpus-wide AEO gap)"
slug: blog-faqpage-schema
status: completed
type: feat
created: 2026-06-15
owner: Takkada team
depth: standard
goal: Every blog post emits valid FAQPage JSON-LD built from its own FAQ section, so all 77 FAQ-bearing articles become eligible for Google FAQ rich results and AI-answer citation, with zero per-article content edits.
---

# feat: Emit FAQPage schema on every blog post

## Problem frame

The blog has 78 articles. 77 of them carry a `## Frequently Asked Questions` section with real Q/A pairs (404 pairs total). **None of them emit `FAQPage` structured data.** The strategy doc (`docs/seo-aeo/01-blog-content-strategy.md`) and the engine plan (`docs/plans/aeo-seo-blog-engine.md`, G2) both require an FAQPage block on every post, because it is one of the highest-leverage AEO signals: it is what Google renders as FAQ rich results and what LLMs extract as quotable Q/A facts.

Root cause is a single omission. `src/routes/BlogPost.jsx` (lines 60–67) builds its schema array from `articleSchema(post)` and `breadcrumbSchema(...)` only. It never calls `faqPageSchema()`. The FAQ content exists exclusively inside the rendered markdown body (`post.html`), as `<p><strong>Q: …</strong></p>` / `<p>A: …</p>`, with no structured extraction. So the data is on the page for humans but invisible to crawlers as schema.

Verified by build: `grep -c '"@type":"FAQPage"'` across `dist/blog/*/index.html` returns **0** for every post (existing and new alike). This is not a regression from any recent change; it has been true for the whole corpus since the blog shipped.

## Scope

**In scope:** Parse each article's existing FAQ section at build time, expose it as structured data on the post module, and feed it to the already-existing `faqPageSchema()` helper from the blog renderer. Covers all current and future posts automatically.

**Out of scope / non-goals:**
- Rewriting or restructuring any article's FAQ prose. The body stays exactly as written.
- Adding `faqs:` arrays to article frontmatter (rejected approach — see Key Decisions).
- Changing the visible FAQ rendering, accordion behaviour, or `FAQItem.jsx`.
- Touching the ICP-page FAQ path (`ICPTemplate.jsx`), which already emits FAQPage correctly.

### Deferred to follow-up work
- A lint rule in the (not-yet-built) blog engine that fails a draft whose FAQ section parses to zero pairs. This plan adds a non-fatal build **warning** for that case; promoting it to a hard lint gate belongs with the engine plan.
- Backfilling an FAQ section into `sample-post.md` (it is a stub; leave it).

---

## Key technical decisions

**Decision 1 — Parse the existing markdown FAQ at build time; do not duplicate it into frontmatter.**
The corpus FAQ format is strikingly uniform: 77/77 FAQ-bearing posts use `## Frequently Asked Questions` and `**Q: …**` question lines, with the answer as the following paragraph(s). A build-time parser keyed on that structure covers the entire corpus deterministically and stays correct for every future article with no extra authoring step. The alternative — a structured `faqs:` array in each article's frontmatter — would duplicate content that already exists in the body across 77 files, create drift between the visible FAQ and the schema, and impose an authoring tax forever. Rejected.

**Decision 2 — Extract the parser as a pure, separately-tested module, not inline plugin code.**
The markdown transform lives in `vite.config.js`'s `markdownPlugin`, which is awkward to unit-test. Put the parsing logic in a standalone pure function (`src/lib/parseFaqs.js`) that both the Vite plugin and the test suite import. This is the durable mechanism: one tested function, two callers, no logic hidden inside a build plugin.

**Decision 3 — Reuse `faqPageSchema()` verbatim.**
`src/data/schema.js` already exports `faqPageSchema(items)` taking `[{question, answer}]` and is used by ICP pages. The blog renderer should call the same helper. No new schema builder.

**Decision 4 — Emit FAQPage only when pairs exist.**
Guard on `post.faqs?.length`. The one post without an FAQ (`sample-post`) and any future FAQ-less post simply omit the block, which is correct.

---

## Data flow

```
content/blog/<slug>.md
        │  (raw markdown + frontmatter)
        ▼
vite.config.js  markdownPlugin.transform
   matter() → {data, content}
   parseFaqs(content) → faqs: [{question, answer}]      ← NEW (calls src/lib/parseFaqs.js)
   export default { ...data, slug, html, faqs }          ← faqs added to export
        │
        ▼
src/lib/blogPosts.js   import.meta.glob → { ...mod.default }   (faqs flows through, no change needed)
        │
        ▼
src/routes/BlogPost.jsx
   schemas = [ articleSchema, breadcrumbSchema,
               post.faqs?.length && faqPageSchema(post.faqs) ]  ← NEW
        │
        ▼
   <Seo schemas={schemas}/> → JSON-LD in static HTML
```

*This illustrates the intended approach and is directional guidance for review, not implementation specification.*

---

## Implementation units

### U1. Pure FAQ parser module

**Goal:** A standalone, tested function that turns an article's raw markdown into `[{question, answer}]`.

**Requirements:** Supports Decision 1 and 2; advances engine-plan G2 (FAQPage-compatible Q/A pairs).

**Dependencies:** none.

**Files:**
- Create: `src/lib/parseFaqs.js`
- Create: `src/lib/parseFaqs.test.js`

**Approach:**
- Export `parseFaqs(markdown: string): {question, answer}[]`.
- Locate the `## Frequently Asked Questions` section (case-insensitive on "Frequently Asked Questions"/"FAQ"); take content from that heading to the next `## ` heading or end of document.
- Within that block, treat each `**Q: …**` line as a question and the following non-empty paragraph(s) up to the next `**Q:` or sub-heading as its answer.
- Strip the `Q:` / `A:` prefixes, surrounding `**`, and trailing/leading whitespace. Collapse a multi-paragraph answer into a single space-joined string (schema `text` is plain).
- Return `[]` when no FAQ section or no parseable pairs (never throw).

**Patterns to follow:** Keep it dependency-free plain JS (the project already parses markdown with `gray-matter`/`marked` at build, but this function operates on the raw `content` string and should not pull new deps).

**Test scenarios:**
- Covers G2. Standard block with 4 `**Q: …?**` / `A: …` pairs returns 4 objects with prefixes and `**` stripped.
- A `**Q:` whose answer spans two paragraphs joins into one `answer` string.
- Markdown with no FAQ heading returns `[]`.
- FAQ heading present but body empty (heading immediately followed by another `## `) returns `[]`.
- A real fixture lifted from `content/blog/biz-analyst-alternative.md` (5 pairs) parses to exactly 5, first question text matches verbatim.
- Question text containing a `?` and inline punctuation is preserved intact.
- Input that is not a string / undefined returns `[]` (fails safe, no throw).

---

### U2. Wire the parser into the build transform

**Goal:** Every `.md` module export gains a `faqs` array; drift is surfaced with a build warning.

**Requirements:** Decision 1; feeds U3.

**Dependencies:** U1.

**Files:**
- Modify: `vite.config.js` (`markdownPlugin.transform`)

**Approach:**
- Import `parseFaqs` from `./src/lib/parseFaqs.js`.
- After `matter(code)`, compute `const faqs = parseFaqs(content);` and include `faqs` in the exported object alongside `slug` and `html`.
- If `content` contains a `## Frequently Asked Questions` heading but `faqs.length === 0`, emit a non-fatal `this.warn(...)` (or `console.warn`) naming the file, so a malformed future FAQ section is visible in the build log without breaking the build.
- No change needed in `src/lib/blogPosts.js` — it already spreads `...mod.default`, so `faqs` flows through to `post.faqs`.

**Patterns to follow:** Mirror the existing return shape in `markdownPlugin` (`{ ...data, slug, html }`).

**Test scenarios:**
- `Test expectation: none for the plugin wiring itself` — the parsing logic is covered in U1; the pass-through is exercised end-to-end by U3's build assertion. Verify manually that `post.faqs` is populated in dev.

---

### U3. Emit FAQPage from the blog renderer

**Goal:** `BlogPost.jsx` adds `faqPageSchema(post.faqs)` to its JSON-LD when the post has FAQ pairs.

**Requirements:** Decision 3, 4; resolves the problem-frame gap.

**Dependencies:** U2.

**Files:**
- Modify: `src/routes/BlogPost.jsx`
- Modify: `src/data/schema.js` only if `faqPageSchema` needs an export tweak (it is already exported — likely no change)

**Approach:**
- Import `faqPageSchema` from `../data/schema`.
- Build the schema array as `[articleSchema(post), breadcrumbSchema([...])]` and conditionally append `faqPageSchema(post.faqs)` when `post.faqs?.length > 0`. Filter out falsy entries before passing to `<Seo>`.
- No visible-DOM change; the FAQ continues to render from `post.html`.

**Patterns to follow:** The existing `schemas` array construction in `BlogPost.jsx:60-67`; the ICP page (`src/components/ICPTemplate.jsx`) for how FAQPage is composed alongside other schemas.

**Test scenarios:**
- Covers G2. Rendering a post with FAQ pairs produces a schema array containing one object with `@type` `FAQPage` whose `mainEntity` length equals the post's pair count.
- A post with no FAQ (`sample-post`) produces a schema array with **no** FAQPage entry and no `undefined`/`false` entries.
- Article and BreadcrumbList schema remain present and unchanged (no regression).

---

### U4. Corpus-wide build verification

**Goal:** Prove the fix lands on the whole corpus, not just one post.

**Requirements:** Verifies the goal.

**Dependencies:** U1–U3.

**Files:**
- Optional: extend `src/routes/__tests__/landing-schema.test.jsx` (or add `src/routes/__tests__/blog-faq-schema.test.jsx`) with a corpus-level assertion.

**Approach:**
- After `npm run build`, assert that `dist/blog/*/index.html` contains `"@type":"FAQPage"` for the FAQ-bearing posts. Target count: 77 (every post except `sample-post`). A test can read the built files, or iterate `getAllPosts()` and assert `post.faqs.length > 0` for all but the known stub.
- Validate one or two pages against Google's Rich Results Test manually before relying on indexing.

**Test scenarios:**
- Covers G2. Count of posts with `post.faqs.length > 0` equals 77 (allow the test to compute "all posts minus those without a FAQ heading" rather than hardcoding, so adding articles does not break it).
- `sample-post` has `faqs.length === 0`.
- Build output: number of `dist/blog/*/index.html` files containing `"@type":"FAQPage"` matches the number of FAQ-bearing source posts.

---

## System-wide impact

- **Affected:** every blog post page (78 routes) gains JSON-LD; no visible UI change.
- **Build:** one new pure module + one transform line + one renderer change. No new dependencies. SSG output grows by a small JSON-LD block per post.
- **SEO/AEO:** posts become eligible for FAQ rich results and structured Q/A extraction by AI crawlers — the explicit goal of the content strategy.
- **Risk:** low. The parser fails safe to `[]`; FAQ-less posts simply omit the block. The only realistic failure is a future article using a non-standard FAQ format, which the U2 build warning surfaces.

## Verification (whole feature)

1. `npm test` green, including U1 parser tests and U3 schema tests.
2. `npm run build` succeeds; build log shows no `parseFaqs` warnings for the current corpus.
3. `grep -l '"@type":"FAQPage"' dist/blog/*/index.html | wc -l` returns 77.
4. Google Rich Results Test passes on at least two live article URLs after deploy.

## Deferred to implementation

- Exact regex vs. line-state-machine inside `parseFaqs` — pick whichever is cleaner against the real fixtures; the test suite is the contract.
- Whether multi-paragraph answers should join with a space or a newline in the schema `text` (cosmetic; default to a single space).
- Whether to hardcode 77 or compute the expected FAQ-post count dynamically in U4 (prefer dynamic).
