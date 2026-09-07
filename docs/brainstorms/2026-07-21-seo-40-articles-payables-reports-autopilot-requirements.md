---
date: 2026-07-21
topic: seo-40-articles-payables-reports-autopilot
---

# 40 New SEO Articles: Payables, Receivables, Bills, Reports, Autopilot, Trust

## Summary

Add 40 new distributor-angled SEO blog posts to `content/blog/`, across five clusters — Payables/Receivables/Bills (14), Autopilot (8), Reports (10), Trust/Objection (4), Supporting long-tail (4) — each deconflicted against the 99 live posts and written to the existing `CLAUDE.md` craft bar, lead-answer convention, and AEO shape. The full publish-ready topic map lives in the plan (see `docs/plans/2026-07-21-001-content-40-articles-payables-reports-autopilot-plan.md`).

---

## Problem Frame

Takkada's blog already ranks deep on Tally-on-mobile, 0% MDR UPI, and collections/reconciliation (99 live posts). It is thin-to-empty on the accounting-vocabulary surface a distributor actually searches — **accounts payable, accounts receivable, bills payable, bills receivable, ageing, creditors/debtors** — and on two product stories that close hesitant buyers: **Takkada's autopilot/automation** capability and the **Reports** feature. It also has no content answering the two objections a cautious family-run distributor raises before buying: "can you customise this for my business?" and "can my Tally data stay on my own server?" These gaps mean high-intent buyers searching those terms land on generic accounting sites, not on Takkada.

---

## Actors

- A1. **Prospective distributor (buyer)**: Tally-using distributor/wholesaler, ₹2cr–₹200cr turnover, searching an accounting task or a pre-purchase objection. The hero of every article.
- A2. **AI answer engines (GPTBot, ClaudeBot, PerplexityBot, etc.)**: lift the lead-answer paragraph as a citation. Already allow-listed in `robots.txt`.

---

## Requirements

**Content scope**
- R1. Produce 40 net-new posts under `content/blog/*.md`, none duplicating an existing slug (deconflicted against the 99 live posts).
- R2. Cluster allocation is fixed: Payables/Receivables/Bills 14 · Autopilot 8 · Reports 10 · Trust/Objection 4 · Supporting long-tail 4.
- R3. Every post is angled to a Tally-using distributor with buyer intent — a task or objection they actually search ("how distributors track accounts payable in Tally"), never a generic definition explainer ("what is accounts payable").

**Craft + SEO/AEO compliance (per `CLAUDE.md`)**
- R4. Each post opens with a self-contained lead-answer paragraph (134–167 words of prose, no list/heading first) that passes `scripts/checkLeadAnswer.mjs` (`npm run lint:content`, wired into `npm run build`).
- R5. Each post carries the standard AEO shape: unique `meta_title` (<60 chars) and `meta_description` (<160 chars), `primary_keyword`, `category`, `excerpt`, and ≥3 internal links (interlinking to the relevant existing hub posts named in the plan).
- R6. Copy obeys the voice rules and banned-words list in `CLAUDE.md` §5/§10 (no em-dash breaks, no "Not X. Y." structures, no vanity stats, no internal tech-stack names). Only the two confirmed public figures (100+ businesses, ₹17Cr+ collected monthly) may be cited.

**Claims discipline on trust topics**
- R7. The "host on your own server" post frames on-premise hosting as an **enterprise / on-request option at additional cost**, not a standard plan tier, and states the capability without over-claiming it as a shipped self-serve feature.
- R8. The "customisation" post frames bespoke customisation as available **on request**, consistent with the reseller/done-with-you GTM motion.

---

## Success Criteria

- 40 posts merged to `main` and live on `takkada.com/blog` (Cloudflare deploys on merge), each passing `npm run build` and the content lint with real HTML in the static output.
- Each post ranks for a distinct primary keyword with no cannibalization of an existing post (new posts interlink to, rather than compete with, the named hubs).
- A downstream implementer (or `ce-work`) can produce each article from the plan's topic map without inventing the title, slug, keyword, angle, or interlink target.

---

## Scope Boundaries

- No changes to site design, components, pricing data, navigation, or the build/deploy pipeline — content markdown files only (plus the auto-regenerated sitemap).
- No competitor-comparison, MDR/UPI, or vertical-collection posts — those clusters are already deep; these 40 fill the payables/reports/autopilot/trust gaps only.
- No rewriting, merging, or re-dating of the 99 existing posts. New posts only link to them.
- No generic definition-only articles (explicitly rejected in favor of the buyer-intent angle).

---

## Key Decisions

- **Buyer-intent angle over broad-traffic explainers**: user chose to pull in Tally distributors ready to buy, not top-of-funnel generic accounting traffic. Keeps the batch inside the craft bar and avoids AI-slop definition pages.
- **Reports is a 10-post cluster added on top of the original 30** (40 total), reflecting the Reports+ feature as a first-class SEO surface.
- **Trust topics written as objection-answering posts around real searched questions**, not as low-search capability phrases — 4 posts, high conversion, low volume.
- **Direct YAML-frontmatter authoring** (the pattern recent posts use), not the legacy `blog-drafts` + `import-seo-drafts.mjs` batch pipeline — simpler and more robust for 40 files.

---

## Dependencies / Assumptions

- On-premise / own-server hosting is a real capability Takkada offers on request at extra cost (assumed from user statement — R7 keeps the copy claim-safe regardless).
- New `category` values ("Payables", "Autopilot", "Reports", "Trust") are safe to introduce — `category` is rendered as a free-form tag in `src/routes/BlogIndex.jsx`, not validated against a fixed list.
- Publishing to `main` is via PR (branch is PR-protected); Cloudflare builds and publishes `dist/` on merge.
