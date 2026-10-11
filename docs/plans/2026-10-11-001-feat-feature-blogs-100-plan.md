# 100 Feature Blogs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Dispatch every subagent with `model: "opus"`.

**Goal:** Ship 100 short SEO + AEO blog posts to takkada.com, 10 per feature across 10 features, one PR per feature.

**Architecture:** Task 1 adds a manifest (`src/data/featureBlogs100.js`) and a vitest guard that enforces the spec's rules on every post listed there. Tasks 2–11 each verify one feature's claims against prod and the app, list the batch's 10 slugs in the manifest (guard goes red), write the 10 posts (guard goes green), generate header images, run the full build and open a PR to `main`. Ronak merges each PR. Merge = live on Cloudflare.

**Tech Stack:** Markdown + gray-matter frontmatter in `content/blog/`, Vite SSG, vitest, `scripts/generate-blog-images.py` (Pillow), prod Supabase read-only SQL (`mcp__prod-supabase__execute_sql`, SELECT only), the takkada app repo at `/Users/ronak/Desktop/PaySaathi/takkada` (read `origin/main`, which is what prod runs).

**Spec:** `docs/brainstorms/2026-10-11-feature-blogs-100-requirements.md`

## Global Constraints

- 10 posts per batch: 1 pillar, 6 business use case, 1 how-to, 1 Hinglish, 1 before-vs-after.
- Lead: a 134–167-word prose paragraph under the frontmatter, before any `##` heading; its first two sentences answer the title. (`scripts/checkLeadAnswer.mjs` fails a list or heading opener.)
- FAQ: a `## Frequently Asked Questions` section with 3–5 `**Q: …?**` / `A: …` pairs (parsed by `src/lib/parseFaqs.js` into FAQPage JSON-LD).
- Body length: 600–900 words including the lead and FAQ.
- One `primary_keyword` per post, unique across all of `content/blog/`. It appears in title, slug, meta_description and the lead.
- Every non-pillar post links to its batch pillar (`/blog/<pillar-slug>`). Every post links to the batch feature page when the batch has one.
- Claims: only what the live prod app does today. Use-case businesses are typical examples. Never customer names, testimonials, adoption counts or "N companies use this".
- No prices. No `₹` figure attached to a plan, add-on, per-minute or per-user charge. Illustrative invoice amounts are fine.
- No em-dash (`—`) anywhere in post copy. En-dash in ranges (`30–90`) is fine.
- Banned tokens: seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer, trusted by thousands, millions of, 99.9%.
- No "Not X. Y." contrasts, no three-word staccato fragments, sections end on statements, the distributor is the hero (repo `CLAUDE.md` §5, §11).
- No internal tech names (Supabase, Flutter, Angoor, loader) in copy (`CLAUDE.md` §10).
- Frontmatter: `title`, `slug`, `meta_description` (≤160 chars), `primary_keyword`, `date: "<ship date>"`, `author: "harsh"`, `category` (an existing `CATEGORY_META` key in `scripts/generate-blog-images.py`), `excerpt`. Title ≤60 chars where the spec title allows; if a spec title is longer, keep the spec title and add `meta_title` ≤60 chars.
- Closing line links WhatsApp `https://wa.me/919435977777`, never the calendar link.
- Branch per batch from `origin/main`, PR to `main`. Never push `main`. Local builds use `INDEXNOW_DRY_RUN=true`.
- `.claude/commands/blog-batch.md` is stale on four points and this plan overrides it: no direct push to `main`, no "Key Highlights" opener (lead paragraph instead), 600–900 words (not 1200–1800), no forced 0% MDR angle.

## Review Focus

1. **A claim the app does not show** (e.g. "AI call in Tamil" when that language is not offered). Expected: cut. Pinned by each batch's claims sheet (step B1) that the PR reviewer checks line by line against the post.
2. **Keyword cannibalisation with an existing post** (e.g. a new "AI collection calls" post fights `how-ai-collection-calls-work`). Expected: no two posts share a `primary_keyword`. Pinned in the Task 1 guard (corpus-wide uniqueness).
3. **A price slipping into copy** ("billed at ₹4 a minute"). Expected: none. Pinned in the Task 1 guard (price regex). The regex also catches illustrative "₹50,000 a month"; write "₹50,000 every month" or "monthly sales of ₹50,000" instead.
4. **Half a batch landing** (5 of 10 files in a PR). Expected: a batch is all-or-nothing. Pinned in the Task 1 guard.
5. **Hinglish post written in Devanagari or with an English-only keyword.** Expected: Roman-script Hinglish, keyword in Hinglish. Pinned in the Task 1 guard (no Devanagari in `kind: 'hinglish'` posts).

---

## The batch procedure (steps B1–B9)

Every batch task (2–11) runs these nine steps with the inputs listed in its own section.

- [ ] **B1: Claims sheet.** Run the task's prod SQL (read-only) and read the task's app files on takkada `origin/main` (`git -C /Users/ronak/Desktop/PaySaathi/takkada fetch -q && git -C /Users/ronak/Desktop/PaySaathi/takkada show origin/main:<path>`). Write `docs/seo/feature-blogs-100/<batch-id>-claims.md` with two lists: **Can say** (each line names the screen/string/file that proves it) and **Must not say**. If the entitlement shows 0 active prod companies or the app screen is absent on `origin/main`, STOP the batch and report to Ronak.
- [ ] **B2: Slug check.** For each slug in the task, `ls content/blog/<slug>.md` must fail. On a collision, append the trade or `-tally` and update the task's table.
- [ ] **B3: Manifest entry.** Add the task's batch object to `FEATURE_BLOG_BATCHES` in `src/data/featureBlogs100.js` (exact object given in the task).
- [ ] **B4: Run the guard, expect FAIL.** `npx vitest run src/data/__tests__/feature-blogs-100.test.js`. Expected: FAIL, "missing file content/blog/<slug>.md" for all 10.
- [ ] **B5: Write the 10 posts** in `content/blog/<slug>.md`, following Global Constraints and the claims sheet. Read `content/blog/how-ai-collection-calls-work.md` first for voice. Each use-case post opens on that trade's real problem (day, party count, credit terms) before the feature appears.
- [ ] **B6: Run the guard, expect PASS.** Same command as B4. Fix and re-run until green. Then `npm run lint:content` (no FAIL; warnings for the 10 new posts must be zero).
- [ ] **B7: Images.** `python3 scripts/generate-blog-images.py` (regenerates every banner). Keep only the 10 new PNGs: `git checkout -- public/assets/blog/` then confirm `git status --short public/assets/blog/` shows exactly 10 `??` lines for the new slugs. Open 2 of them and look.
- [ ] **B8: Full checks.** `INDEXNOW_DRY_RUN=true npm run build` (must pass; it runs checkLeadAnswer, checkBlogImages, checkBlogPrerender, checkRateCardDrift, checkRetiredClaims). Then `TAKKADA_APP_ROOT=$(ls -d ~/.claude/fleet/worktrees/takkada__*/ | while read d; do [ -f "$d/tool/help/visibility-evidence.json" ] && echo "$d" && break; done) npm test` (all green). Then `grep -c "<slug>" dist/sitemap.xml` is 1 for each new slug.
- [ ] **B9: Commit and PR.**

```bash
git add content/blog/<10 slugs>.md public/assets/blog/<10 slugs>.png src/data/featureBlogs100.js docs/seo/feature-blogs-100/<batch-id>-claims.md
git commit -m "content(blog): <feature> batch, 10 posts (plan 2026-10-11-001 T<n>)

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XTdHeaNkTeZ6oiwvwU9xus"
git push -u origin HEAD
gh pr create --base main --title "Blog: <feature> (10 posts)" --body "<the 10 URLs https://takkada.com/blog/<slug>, link to the claims sheet>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01XTdHeaNkTeZ6oiwvwU9xus"
```

Do not merge. Report the PR link to Ronak in one line.

---

### Task 1: Manifest and guard

**Files:**
- Create: `src/data/featureBlogs100.js`
- Create: `src/data/__tests__/feature-blogs-100.test.js`

**Interfaces:**
- Produces: `export const FEATURE_BLOG_BATCHES: Array<{ id: string, featurePage: string|null, pillar: string, posts: Array<{ slug: string, kind: 'pillar'|'usecase'|'howto'|'hinglish'|'compare' }> }>`. Tasks 2–11 append one object each.

- [ ] **Step 1: Worktree.** `cd "/Users/ronak/Desktop/PaySaathi/takkada website/landing" && git fetch -q && git worktree add "../landing-wt-blogs100-t1" -b content/blogs100-guard origin/main && cd ../landing-wt-blogs100-t1 && npm ci`

- [ ] **Step 2: Write the manifest with one fake batch pointing at an existing post, to prove the guard bites.**

```js
// src/data/featureBlogs100.js
// The 100 feature blogs (plan docs/plans/2026-10-11-001-feat-feature-blogs-100-plan.md).
// One object per feature batch; src/data/__tests__/feature-blogs-100.test.js
// holds every listed post to the spec's rules.
export const FEATURE_BLOG_BATCHES = [];
```

- [ ] **Step 3: Write the guard.**

```js
// src/data/__tests__/feature-blogs-100.test.js
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { FEATURE_BLOG_BATCHES } from '../featureBlogs100';
import { FEATURE_PAGES } from '../featurePages';
import { authors } from '../authors';
import { parseFaqs } from '../../lib/parseFaqs';
import { extractLead, countWords } from '../../../scripts/checkLeadAnswer.mjs';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');
const blogDir = resolve(repoRoot, 'content/blog');
const imgDir = resolve(repoRoot, 'public/assets/blog');

const BANNED = /seamless|world-class|enterprise-grade|revolutionary|unleash|game-changer|trusted by thousands|millions of|99\.9%/i;
const PRICE = /₹\s?[\d,]+(\.\d+)?\s*(\/|per|a|an)\s*(min|minute|month|year|user|seat|company)\b|₹\s?[\d,]+\s*(\+\s*GST|plan|add-on)/i;
const INTERNAL = /\b(supabase|flutter|angoor|electron|tally-database-loader)\b/i;
const DEVANAGARI = /[ऀ-ॿ]/;
const KINDS = { pillar: 1, usecase: 6, howto: 1, hinglish: 1, compare: 1 };
const featureSlugs = new Set(FEATURE_PAGES.map((p) => p.slug));

const corpusKeywords = readdirSync(blogDir)
  .filter((f) => f.endsWith('.md'))
  .map((f) => matter(readFileSync(resolve(blogDir, f), 'utf-8')).data.primary_keyword)
  .filter(Boolean)
  .map((k) => k.trim().toLowerCase());

const read = (slug) => {
  const raw = readFileSync(resolve(blogDir, `${slug}.md`), 'utf-8');
  return { raw, ...matter(raw) };
};

describe('feature blogs 100: manifest shape', () => {
  for (const batch of FEATURE_BLOG_BATCHES) {
    it(`${batch.id}: exactly 10 posts with the 1/6/1/1/1 mix and the pillar listed`, () => {
      expect(batch.posts).toHaveLength(10);
      const counts = {};
      for (const p of batch.posts) counts[p.kind] = (counts[p.kind] || 0) + 1;
      expect(counts).toEqual(KINDS);
      expect(batch.posts.find((p) => p.kind === 'pillar').slug).toBe(batch.pillar);
      if (batch.featurePage) expect(featureSlugs.has(batch.featurePage)).toBe(true);
    });
  }
});

describe('feature blogs 100: every listed post', () => {
  for (const batch of FEATURE_BLOG_BATCHES) {
    for (const { slug, kind } of batch.posts) {
      describe(slug, () => {
        it('exists with its banner (a batch is all-or-nothing)', () => {
          expect(existsSync(resolve(blogDir, `${slug}.md`)), `missing file content/blog/${slug}.md`).toBe(true);
          expect(existsSync(resolve(imgDir, `${slug}.png`)), `missing banner public/assets/blog/${slug}.png`).toBe(true);
        });

        it('has complete frontmatter', () => {
          const { data } = read(slug);
          expect(data.slug).toBe(slug);
          for (const k of ['title', 'meta_description', 'primary_keyword', 'date', 'author', 'category', 'excerpt']) {
            expect(data[k], k).toBeTruthy();
          }
          expect(data.meta_description.length).toBeLessThanOrEqual(160);
          expect(authors[data.author], `unknown author ${data.author}`).toBeTruthy();
          if (data.title.length > 60) expect((data.meta_title || '').length).toBeGreaterThan(0);
          if (data.meta_title) expect(data.meta_title.length).toBeLessThanOrEqual(60);
        });

        it('owns its primary keyword across the whole corpus', () => {
          const kw = read(slug).data.primary_keyword.trim().toLowerCase();
          expect(corpusKeywords.filter((k) => k === kw), `"${kw}" used by more than one post`).toHaveLength(1);
        });

        it('opens with a 134–167-word answer that carries the keyword', () => {
          const { raw, data } = read(slug);
          const lead = extractLead(raw);
          expect(lead.kind).toBe('paragraph');
          expect(lead.wordCount).toBeGreaterThanOrEqual(134);
          expect(lead.wordCount).toBeLessThanOrEqual(167);
          expect(lead.text.toLowerCase()).toContain(data.primary_keyword.trim().toLowerCase());
        });

        it('is 600–900 words with 3–5 FAQs', () => {
          const { content } = read(slug);
          const words = countWords(content);
          expect(words).toBeGreaterThanOrEqual(600);
          expect(words).toBeLessThanOrEqual(900);
          const faqs = parseFaqs(content);
          expect(faqs.length).toBeGreaterThanOrEqual(3);
          expect(faqs.length).toBeLessThanOrEqual(5);
        });

        it('links to the pillar and the feature page', () => {
          const { content } = read(slug);
          if (kind !== 'pillar') expect(content).toContain(`(/blog/${batch.pillar}`);
          if (batch.featurePage) expect(content).toContain(`(/${batch.featurePage}`);
          expect(content).toContain('https://wa.me/919435977777');
        });

        it('passes the copy rules', () => {
          const { content, data } = read(slug);
          const text = `${data.title}\n${data.meta_description}\n${data.excerpt}\n${content}`;
          expect(text).not.toContain('—');
          expect(text).not.toMatch(BANNED);
          expect(text).not.toMatch(PRICE);
          expect(text).not.toMatch(INTERNAL);
          if (kind === 'hinglish') expect(text).not.toMatch(DEVANAGARI);
        });
      });
    }
  }
});
```

- [ ] **Step 4: Prove it bites.** Temporarily set the manifest to a probe batch whose pillar is a real, longer post and whose other 9 slugs do not exist:

```js
export const FEATURE_BLOG_BATCHES = [{
  id: 'probe', featurePage: 'ai-collection-calls', pillar: 'how-ai-collection-calls-work',
  posts: [
    { slug: 'how-ai-collection-calls-work', kind: 'pillar' },
    ...['a','b','c','d','e','f'].map((x) => ({ slug: `probe-${x}`, kind: 'usecase' })),
    { slug: 'probe-h', kind: 'howto' }, { slug: 'probe-i', kind: 'hinglish' }, { slug: 'probe-j', kind: 'compare' },
  ],
}];
```

Run: `npx vitest run src/data/__tests__/feature-blogs-100.test.js`
Expected: manifest-shape test PASS; `probe-*` FAIL "missing file"; `how-ai-collection-calls-work` FAIL on the lead word band or 600–900 words (the existing post is longer), which proves the length rules run against real content.

- [ ] **Step 5: Revert the probe** to `export const FEATURE_BLOG_BATCHES = [];`, run the guard (PASS, zero post tests), run `npm test` (all green with `TAKKADA_APP_ROOT` set as in B8).

- [ ] **Step 6: Commit and PR** (same shape as B9; title "Blog guard for the 100 feature posts"). Batches 2–11 branch from `main` after this merges, or stack on this branch if Ronak has not merged yet.

---

### Task 2: Batch `ai-calling`

**Inputs:**
- B1 SQL: `select count(*) from company_feature_entitlements where feature_key='ai_calling' and status='active';` App files: grep `origin/main` of takkada for `ai_calling` and "Send Reminders Now" under `lib/`; read the call-trigger screen and the follow-up written back (promise, note, next follow-up date). Also read the two existing posts `how-ai-collection-calls-work` and `payment-follow-up-calls-for-distributors` and list their primary keywords in **Must not say** (no reuse). Must not say: per-minute price, the vendor name, languages not offered in the app.
- Feature page: `ai-collection-calls`. Categories: `Collections` (how-to → `How-To`, compare → `Comparisons`).

```js
{ id: 'ai-calling', featurePage: 'ai-collection-calls', pillar: 'ai-calling-for-payment-collection-tally', posts: [
  { slug: 'ai-calling-for-payment-collection-tally', kind: 'pillar' },
  { slug: 'ai-collection-calls-fmcg-distributors', kind: 'usecase' },
  { slug: 'ai-payment-reminder-calls-pharma-distributors', kind: 'usecase' },
  { slug: 'ai-collection-calls-agri-input-dealers', kind: 'usecase' },
  { slug: 'ai-collection-calls-hardware-building-material', kind: 'usecase' },
  { slug: 'ai-collection-calls-textile-wholesalers', kind: 'usecase' },
  { slug: 'ai-collection-calls-auto-parts-dealers', kind: 'usecase' },
  { slug: 'how-to-start-ai-collection-calls', kind: 'howto' },
  { slug: 'ai-se-payment-ka-call-kaise-karwaye', kind: 'hinglish' },
  { slug: 'office-staff-calling-vs-ai-calling', kind: 'compare' },
]},
```

Titles: spec Batch 1, items 1–10 in this order. Run B1–B9.

### Task 3: Batch `fmcg-billing`

**Inputs:**
- B1 SQL: `... feature_key='billing_module' ...`. App files: grep takkada `origin/main` `lib/` for `billing_module` and `isBillingModule`/MRP seeding; record exactly how the rate is derived (MRP, retail margin %, discount % per stock item) and what the invoice line shows. Must not say anything about schemes unless the screen shows it.
- Feature page: `fmcg-module-tally`. Categories: `Schemes` for use cases (percent icon), `How-To`, `Comparisons`.

```js
{ id: 'fmcg-billing', featurePage: 'fmcg-module-tally', pillar: 'fmcg-billing-software-for-tally', posts: [
  { slug: 'fmcg-billing-software-for-tally', kind: 'pillar' },
  { slug: 'fmcg-billing-biscuit-snacks-distributors', kind: 'usecase' },
  { slug: 'fmcg-billing-personal-care-detergent-distributors', kind: 'usecase' },
  { slug: 'fmcg-billing-beverage-dairy-distributors', kind: 'usecase' },
  { slug: 'fmcg-billing-super-stockists', kind: 'usecase' },
  { slug: 'fmcg-billing-confectionery-wholesalers', kind: 'usecase' },
  { slug: 'fmcg-billing-staples-packaged-food-distributors', kind: 'usecase' },
  { slug: 'how-to-set-retailer-margin-discount-per-item', kind: 'howto' },
  { slug: 'fmcg-distributor-billing-mobile-se-tally-mein', kind: 'hinglish' },
  { slug: 'manual-rate-calculation-vs-margin-based-fmcg-billing', kind: 'compare' },
]},
```

Titles: spec Batch 2. Run B1–B9.

### Task 4: Batch `recovery-dashboard`

**Inputs:**
- B1 SQL: `... feature_key='recovery_followups' ...`. App files: takkada `origin/main` `lib/` grep `recovery_followups`, "Promise", "follow-up"; record where a follow-up is logged (Collections, Bills Receivable), its fields (channel, outcome, next date, promised amount/date) and how a missed promise shows. Must not say: anything from the unbuilt revamp (grouped party list, Team/History button, FIFO settle). Read existing `promise-to-pay-tracking-distributors` and `vasuli-ka-dashboard-mobile-par`; their keywords go in Must not say.
- Feature page: none (`featurePage: null`); link `/payment-reminder-tally` once in each post instead. Categories: `Collections`, `How-To`, `Comparisons`.

```js
{ id: 'recovery-dashboard', featurePage: null, pillar: 'recovery-dashboard-for-tally', posts: [
  { slug: 'recovery-dashboard-for-tally', kind: 'pillar' },
  { slug: 'recovery-tracking-fmcg-distributors-field-collectors', kind: 'usecase' },
  { slug: 'recovery-dashboard-pharma-distributors', kind: 'usecase' },
  { slug: 'recovery-tracking-agri-input-dealers', kind: 'usecase' },
  { slug: 'recovery-dashboard-building-material-suppliers', kind: 'usecase' },
  { slug: 'recovery-tracking-electronics-mobile-distributors', kind: 'usecase' },
  { slug: 'recovery-dashboard-textile-traders', kind: 'usecase' },
  { slug: 'how-to-log-follow-up-promise-to-pay', kind: 'howto' },
  { slug: 'party-ne-payment-promise-toda-kaise-pata-kare', kind: 'hinglish' },
  { slug: 'recovery-register-notebook-vs-recovery-dashboard', kind: 'compare' },
]},
```

Titles: spec Batch 3. Run B1–B9.

### Task 5: Batch `import-automation`

**Inputs:**
- B1 SQL: `... feature_key='document_import' ...`. App files: takkada `origin/main` `lib/` grep `document_import`; record which document types are accepted (supplier bills, customer invoices, orders, bank statements), the review step before Tally, and photo vs PDF. Read existing posts with "import" in the slug (`ls content/blog | grep import`) and put their keywords in Must not say.
- Feature page: `import-purchase-from-pdf` (bank statement post also links `/bank-statement-import-tally`). Categories: `Autopilot`, `How-To`, `Comparisons`.

```js
{ id: 'import-automation', featurePage: 'import-purchase-from-pdf', pillar: 'import-purchase-bills-into-tally-photo-pdf', posts: [
  { slug: 'import-purchase-bills-into-tally-photo-pdf', kind: 'pillar' },
  { slug: 'purchase-bill-import-fmcg-distributors', kind: 'usecase' },
  { slug: 'purchase-bill-import-pharma-batch-expiry', kind: 'usecase' },
  { slug: 'supplier-bill-import-hardware-traders', kind: 'usecase' },
  { slug: 'bank-statement-import-tally-distributors', kind: 'usecase' },
  { slug: 'order-import-whatsapp-photos-wholesalers', kind: 'usecase' },
  { slug: 'customer-invoice-import-moving-to-tally', kind: 'usecase' },
  { slug: 'how-to-photograph-supplier-bill-review-entry', kind: 'howto' },
  { slug: 'purchase-bill-photo-se-tally-entry', kind: 'hinglish' },
  { slug: 'typing-purchase-bills-vs-importing', kind: 'compare' },
]},
```

Titles: spec Batch 4. Run B1–B9.

### Task 6: Batch `dispatch-load`

**Inputs:**
- B1 SQL: `... feature_key='dispatch_load' ...`. App files: takkada `origin/main` `lib/` grep `dispatch_load`, "loading sheet"; record the flow (pending orders → load → loading sheet print → confirm what went out → bill). Must not say: vehicle tracking, route optimisation, capacity maths unless the screen has it (the beverage post talks about capacity as the owner's problem, not an app feature, unless B1 finds it).
- Feature page: none; link `/sales-order-on-mobile` instead. Categories: `Distribution`, `How-To`, `Comparisons`.

```js
{ id: 'dispatch-load', featurePage: null, pillar: 'dispatch-planning-from-tally-orders', posts: [
  { slug: 'dispatch-planning-from-tally-orders', kind: 'pillar' },
  { slug: 'dispatch-load-fmcg-beat-vans', kind: 'usecase' },
  { slug: 'dispatch-planning-beverage-distributors', kind: 'usecase' },
  { slug: 'dispatch-load-building-material-site-delivery', kind: 'usecase' },
  { slug: 'dispatch-planning-agri-input-peak-season', kind: 'usecase' },
  { slug: 'dispatch-load-pharma-same-day-delivery', kind: 'usecase' },
  { slug: 'dispatch-load-electrical-hardware-wholesalers', kind: 'usecase' },
  { slug: 'how-to-build-load-print-loading-sheet', kind: 'howto' },
  { slug: 'gaadi-load-loading-sheet-kaise-banaye', kind: 'hinglish' },
  { slug: 'paper-picking-list-vs-dispatch-load', kind: 'compare' },
]},
```

Titles: spec Batch 5. Run B1–B9.

### Task 7: Batch `order-links`

**Inputs:**
- B1 SQL: `... feature_key in ('personal_order_links','public_customer_ordering') ... group by feature_key`. App files: takkada `origin/main` grep `public_customer_ordering`, `personal_order_links`; record that buyers send no-price order requests and the merchant reviews/converts them, and what a personal link pre-fills. Read existing `order-booking-app-tally` feature page copy; reuse no keyword.
- Feature page: `order-booking-app-tally`. Categories: `Field Sales`, `How-To`, `Comparisons`.

```js
{ id: 'order-links', featurePage: 'order-booking-app-tally', pillar: 'whatsapp-order-link-for-distributors', posts: [
  { slug: 'whatsapp-order-link-for-distributors', kind: 'pillar' },
  { slug: 'order-links-fmcg-retailer-orders', kind: 'usecase' },
  { slug: 'order-links-pharma-chemist-orders', kind: 'usecase' },
  { slug: 'order-links-agri-input-village-retailers', kind: 'usecase' },
  { slug: 'order-links-hardware-shops', kind: 'usecase' },
  { slug: 'order-links-bakery-dairy-daily-orders', kind: 'usecase' },
  { slug: 'order-links-stationery-packaging-wholesalers', kind: 'usecase' },
  { slug: 'how-to-send-personal-order-link', kind: 'howto' },
  { slug: 'customer-khud-order-kaise-bheje', kind: 'hinglish' },
  { slug: 'orders-by-phone-vs-orders-by-link', kind: 'compare' },
]},
```

Titles: spec Batch 6. Run B1–B9.

### Task 8: Batch `ladder-discount`

**Inputs:**
- B1 SQL: `... feature_key='ladder_discount' ...`. App files: takkada `origin/main` grep `ladder_discount`; record how named discounts compound, what the invoice line/PDF shows and the single aggregate sent to Tally. Work one example to the paisa in the pillar (e.g. ₹10,000 at 10% + 5% + 2% = ₹8,379) and check it against the app's formula.
- Feature page: `ladder-discount-tally`. Categories: `Schemes`, `How-To`, `Comparisons`.

```js
{ id: 'ladder-discount', featurePage: 'ladder-discount-tally', pillar: 'ladder-discount-in-tally-invoices', posts: [
  { slug: 'ladder-discount-in-tally-invoices', kind: 'pillar' },
  { slug: 'ladder-discount-fmcg-company-schemes', kind: 'usecase' },
  { slug: 'ladder-discount-tiles-sanitaryware-dealers', kind: 'usecase' },
  { slug: 'ladder-discount-paint-dealers', kind: 'usecase' },
  { slug: 'ladder-discount-electrical-wholesalers', kind: 'usecase' },
  { slug: 'ladder-discount-pharma-trade-discount', kind: 'usecase' },
  { slug: 'ladder-discount-auto-parts-list-price', kind: 'usecase' },
  { slug: 'how-to-set-up-named-ladder-discounts', kind: 'howto' },
  { slug: 'discount-par-discount-invoice-mein', kind: 'hinglish' },
  { slug: 'compound-discount-calculator-vs-invoice', kind: 'compare' },
]},
```

Titles: spec Batch 7. Run B1–B9.

### Task 9: Batch `auto-parts`

**Inputs:**
- B1 SQL: `... feature_key='autoparts_billing' ...` plus `select count(*) from autoparts_company_config;` (markup rows exist on prod). App files: takkada `origin/main` grep `autoparts`; confirm the AutoParts settings, markup at company/group/item level, and the cost-movement screen exist on `origin/main`. If the app half is not on `origin/main`, STOP (spec: verify before writing).
- Feature page: `autoparts-billing-tally`. Categories: `Schemes`, `How-To`, `Comparisons`.

```js
{ id: 'auto-parts', featurePage: 'autoparts-billing-tally', pillar: 'auto-parts-billing-software-for-tally', posts: [
  { slug: 'auto-parts-billing-software-for-tally', kind: 'pillar' },
  { slug: 'spare-parts-pricing-importers-landed-cost', kind: 'usecase' },
  { slug: 'two-wheeler-spare-parts-billing', kind: 'usecase' },
  { slug: 'tractor-farm-machinery-parts-billing', kind: 'usecase' },
  { slug: 'commercial-vehicle-parts-billing', kind: 'usecase' },
  { slug: 'lubricant-battery-distributor-billing', kind: 'usecase' },
  { slug: 'markup-by-stock-group-part-numbers', kind: 'usecase' },
  { slug: 'how-to-set-markup-company-group-item', kind: 'howto' },
  { slug: 'spare-parts-rate-cost-plus-margin', kind: 'hinglish' },
  { slug: 'spreadsheet-price-list-vs-cost-plus-spare-parts', kind: 'compare' },
]},
```

Titles: spec Batch 8. Run B1–B9.

### Task 10: Batch `batch-expiry-mrp`

**Inputs:**
- B1 SQL: `select count(distinct company_id) from trn_batch where expiry_on is not null or mrp_rate > 0;` (13 on 2026-10-11). App files: takkada `origin/main` grep "Price by batch", `BatchStock`, `get_item_batch_stock`; confirm the batch picker, one line per batch with its own rate, Mfg/Exp on the invoice PDF sub-line, expired batches listed last with a red tag, and the rate default (batch MRP → that batch's last sold rate → item rate). If "Price by batch" is not on `origin/main`, STOP.
- Feature page: none; link `/tally-app-for-pharma-distributors` instead. Categories: `Tally Mobile`, `How-To`, `Comparisons`.

```js
{ id: 'batch-expiry-mrp', featurePage: null, pillar: 'batch-wise-billing-for-tally', posts: [
  { slug: 'batch-wise-billing-for-tally', kind: 'pillar' },
  { slug: 'batch-expiry-tracking-pharma-distributors', kind: 'usecase' },
  { slug: 'batch-wise-mrp-fmcg-mrp-revision', kind: 'usecase' },
  { slug: 'batch-expiry-billing-agri-inputs', kind: 'usecase' },
  { slug: 'batch-billing-food-beverage-shelf-life', kind: 'usecase' },
  { slug: 'batch-expiry-cosmetics-personal-care', kind: 'usecase' },
  { slug: 'batch-billing-paint-lubricant-dealers', kind: 'usecase' },
  { slug: 'how-to-pick-batch-show-mfg-expiry-on-invoice', kind: 'howto' },
  { slug: 'batch-wise-mrp-expiry-invoice-mein', kind: 'hinglish' },
  { slug: 'expiry-register-vs-billing-with-batch', kind: 'compare' },
]},
```

Titles: spec Batch 10. Run B1–B9.

### Task 11: Batch `desktop-entry` (blocked)

**Gate:** do not start until Ronak says Desktop Entry may be marketed on prod. Ask once, after Task 10's PR is up.

**Inputs:**
- B1 SQL: `... feature_key='desktop_entry' ...`. App files: takkada `origin/main` grep `desktop_entry`, `Ctrl+S`, keyboard shortcuts; record which vouchers it covers (invoices, orders, receipts, payments) and that the phone app keeps working. Link `https://takkada.com/keyboard-shortcuts` only if landing PR #132 has merged.
- Feature page: none; link `/tally-on-mobile` instead. Categories: `Tally Mobile`, `How-To`, `Comparisons`.

```js
{ id: 'desktop-entry', featurePage: null, pillar: 'fast-billing-on-computer-tally-sync', posts: [
  { slug: 'fast-billing-on-computer-tally-sync', kind: 'pillar' },
  { slug: 'desktop-billing-fmcg-billing-counter', kind: 'usecase' },
  { slug: 'desktop-entry-pharma-long-invoices', kind: 'usecase' },
  { slug: 'desktop-entry-hardware-walk-in', kind: 'usecase' },
  { slug: 'desktop-entry-textile-many-lines', kind: 'usecase' },
  { slug: 'desktop-entry-agri-input-peak-season', kind: 'usecase' },
  { slug: 'desktop-entry-receipts-payments-accountants', kind: 'usecase' },
  { slug: 'how-to-bill-with-keyboard-tab-enter-ctrl-s', kind: 'howto' },
  { slug: 'computer-par-fast-billing-seedha-tally', kind: 'hinglish' },
  { slug: 'billing-in-tally-vs-desktop-entry', kind: 'compare' },
]},
```

Titles: spec Batch 9. Run B1–B9.
