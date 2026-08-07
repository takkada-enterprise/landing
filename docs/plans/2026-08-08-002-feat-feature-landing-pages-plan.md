# Feature Landing Pages — Phased Plan

**Date:** 2026-08-08 · **Goal:** clients from ChatGPT and Google. Every hero feature gets its own landing page that matches what a prospect actually searches, and the AI-search plumbing that feeds ChatGPT/Perplexity/Claude answers is fully opened.

**Rule for the executor: STOP at the end of every phase.** Update the Status line of that phase in this file (with date + what shipped), show Ronak the result, and wait for a go-ahead before starting the next phase.

**Sources of truth for claims:**
- `pitch-deck/takkada-product-deck-2026-08.html` (product claims, operator-approved)
- `pitch-deck/competitor-analysis-2026-08.html` (competitor facts + claim guardrails)
- `CLAUDE.md` in this repo (pricing, voice rules, retired plan names)
- Locked wording, verbatim: **"0% MDR on UPI collections, no transaction cap, no monthly fee."**
- E-way bill **cancel and close from the phone are built** (deck 2026-08-06) — "only app that cancels or closes an e-invoice/e-way bill from the phone" is claimable; re-verify before each new page that uses it.
- **Never claim:** AI calling (does not exist), offline mode (concede it), adoption numbers for Pending Orders.

**Evidence this plan is built on (Clarity, week of 07-26):**
- Blog posts are the only pages pulling search entries (`import-purchase-from-pdf-tally` #1). The 6 existing feature landing pages pull **zero** top entries — pages alone don't rank; internal links, matching titles and freshness do.
- ChatGPT is already a referrer (13 sessions) despite the half-blocked door.
- Homepage CLS is 0.48 (**poor**) — a Core Web Vitals ranking penalty on the highest-traffic page.

---

## Phase 1 — Open the AI-search door (highest leverage, zero new pages)

**Status: BUILT 2026-08-08, on `feat/feature-landing-pages`, not yet merged. One operator action outstanding (item 1). Two premises in this phase turned out to be wrong — see the findings below before acting on them.**

**Shipped in this phase:**
- `llms.txt` is now **generated**, not hand-written (`scripts/generate-llms-txt.mjs`). Prices derive from `pricing` in `siteContent.js`, pages from a new optional `llms: { section, title, summary }` field on `routeMetadata`, guides from blog frontmatter on disk. 11 pages + 160 guides = 171 links, up from 11. Guard tests fail on a hand-edit, on drift from the generator, and on any retired plan name reappearing. **This is the hook Phase 2 needs**: a new feature page earns its llms.txt line by registering `llms` on its route, nothing else.
- Logo assets: nav/footer now use a 360x128 WebP (10KB) and the favicon a 180x64 PNG (13KB), replacing the 1172px 133KB source PNG that every visitor downloaded on every page. 135KB → 24KB per page load, site-wide. Both logos carry explicit `width`/`height`. The full-size PNG stays as the schema.org logo URL only.

**Finding 1 — the CLS premise is stale. Do not spend more on it.**
Measured 2026-08-08 with Lighthouse against live takkada.com, mobile, `--throttling-method=devtools`: homepage CLS **0.03** across three runs, top blog entry page **0.00**. Both comfortably green. The 0.48 in the Clarity week-of-07-26 data predates the homepage rebuild (PR #57, merged 08-06), which fixed it. Caveat worth one check: Clarity/CrUX is 75th-percentile field data across real devices and can read worse than a lab run, so re-read the Clarity CWV panel now that #57 has been live a few days before calling it closed.

**Finding 2 — the real Core Web Vitals problem on the homepage is LCP, not CLS.**
Live mobile LCP is **3.1–3.8s** against a 2.5s "good" threshold. The LCP element is the hero image, and **78% of its time is Load Time**, meaning the file is queued behind other bytes rather than being requested late (it is already preloaded with `fetchpriority=high`). Total page weight is 1,447KB. The logo fix above removes 111KB of that contention; the remaining dominant item is the JS bundle at **557KB transferred / 2.3MB raw**.

Root cause of the bundle, diagnosed and confirmed: `src/lib/blogPosts.js:1` uses `import.meta.glob('/content/blog/*.md', { eager: true })`. The eager glob compiles all **160 blog posts' rendered HTML into the client bundle**, so someone landing on the homepage downloads every article on the site. Fixing it means a lazy glob plus splitting post metadata (needed by the index) from post HTML (needed only by one slug). That is a real change to blog data loading, so it is **not** done here and is proposed as its own unit — it would be the single largest performance win available, and it grows with every blog batch.

**Finding 3 — the AI-bot block is narrower than this plan assumed.**
Live `robots.txt` verified 2026-08-08. Cloudflare injects its managed block *ahead* of our file, and it disallows: `ClaudeBot`, `GPTBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Amazonbot`, `Bytespider`, `meta-externalagent`. It does **not** touch `OAI-SearchBot`, `ChatGPT-User`, or `PerplexityBot` — those three already have full access, which is consistent with ChatGPT already showing up as a referrer. So the operator action buys ClaudeBot (Claude citations) and Google-Extended (AI Overviews / Gemini grounding), not the whole door. Still worth doing, just not the blocker this phase treated it as.
`scripts/checkCrawlerAccess.mjs` reports all five bots served (200). That is not a contradiction: the script measures *edge* blocking by IP, and cannot see a robots.txt directive. Noted as a real gap in that check.

**Item 5 (freshness pass):** nothing done, deliberately. This phase touched no article or page copy, only generated data and asset plumbing, so no `dateModified` may honestly be bumped.

1. **Operator action (Ronak, ~10 min, Cloudflare dashboard for takkada.com):**
   - Security → Bots (and/or AI Crawl Control): turn OFF "Block AI bots" / the managed robots.txt injection, or set it to *allow* `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`.
   - Verified live 2026-08-08: Cloudflare still injects a `Disallow: /` block for ClaudeBot, GPTBot, Google-Extended ahead of our own robots.txt. Our repo file is already correct; the dashboard setting is the only fix.
   - Decision made: allow all AI-search citation crawlers. GPTBot (training) may stay blocked or be allowed — allowing it also puts Takkada in future model knowledge; recommended: allow.
2. Fix `public/llms.txt`: it still shows retired plans ("Voucher Model / Collections Model / Full Access ₹8,499"). Replace with live plan names + prices from `src/data/siteContent.js`, and keep a Features section that lists every feature landing page as it ships.
3. Run `scripts/checkCrawlerAccess.mjs` + live curl checks; record results here.
4. Fix homepage CLS (0.48 → target < 0.1). Likely culprits: images without dimensions, late-loading hero/font. Verify with Lighthouse before/after.
5. Quick freshness pass: bump `dateModified` honestly wherever content is touched.

**Done when:** live robots.txt has no conflicting AI-bot blocks, llms.txt is truthful, CLS is green.
**Status against that bar:** llms.txt truthful and self-maintaining ✅ · CLS green ✅ (was already green; verified, not fixed) · robots.txt still blocking ClaudeBot + Google-Extended ⏳ (operator action 1, only Ronak can do it).

**STOP — update this file, show Ronak.**

---

## Phase 2 — The page engine (build once, add pages in minutes forever)

**Status: NOT STARTED**

One `FeaturePage` template component + one content/data entry per page (same pattern as the blog). Every page automatically gets:

- **Front-loaded answer block**: first 40–60 words directly answer the search phrase (≈44% of AI citations come from the first 30% of a page).
- Hero with the exact search phrase in the `<h1>` and `<title>`.
- Feature walk-through with real app screenshots (assets exist in `pitch-deck/assets/product/`).
- **HTML comparison table** ("Takkada vs other Tally mobile apps" — competitors unnamed on feature pages per deck guardrail; tables get ~156% higher AI selection).
- FAQ section with `FAQPage` schema (self-contained Q&As, quotable by AI).
- Schema: `Article` + `BreadcrumbList` + `SoftwareApplication` reference; named author with `sameAs` LinkedIn (not "Takkada Team").
- Standard CTA: demo request + WhatsApp button. Pricing pointer derived from `siteContent.js` (never hand-written rupees).
- Automatic: route registration, sitemap entry, footer "Features" column link, llms.txt line, related-blog cross-links.
- Voice rules from CLAUDE.md §5 enforced (no em-dash breaks, no "Not X. Y." structures, Hinglish where natural).

Ship with **one pilot page — Salesman app for Tally** — end to end, `flutter`-style eyeball: run locally, Ronak looks before push.

**Done when:** pilot page live on stage build, in sitemap, linked from footer, schema validates.
**STOP — update this file, show Ronak the pilot page in the browser.**

---

## Phase 3 — The 8 priority pages (Ronak's keyword list)

**Status: NOT STARTED**

| # | Page (slug) | Search phrases it catches | Key claim |
|---|---|---|---|
| 1 | `/salesman-app-tally` *(pilot from Phase 2)* | salesman app, salesman module tally | orders with live stock, geo-photo visit proof, targets & commission |
| 2 | `/payment-collection-tally` | payment collection on tally, payment collection | 0% MDR UPI, pay-link on every invoice, auto-recon into Tally |
| 3 | `/payment-reminder-tally` | payment reminder tally, whatsapp payment reminder | pre-due + post-due schedules, per-party caps, ledger attached |
| 4 | `/e-invoice-from-phone` | einvoice on tally from phone, e-invoice mobile | IRN + QR from the phone, written back into Tally, cancel from app |
| 5 | `/e-way-bill-from-phone` | eway bill on phone, eway bill closing on phone | generate, **cancel and close** from the phone — only app that does |
| 6 | `/tally-reports-on-mobile` | extensive reports from tally, tally reports mobile | 20+ reports, TB/P&L/BS, GSTR-1 & 3B for the CA |
| 7 | `/import-purchase-from-pdf` | import purchase from pdf tally | photo/PDF → purchase voucher (demand proven: #1 blog entry page) |
| 8 | Refresh `/tally-on-mobile` + `/mobile-tally` | tally on mobile | fix why they don't rank: internal links, title match, front-loaded answer, fresh dateModified |

**Done when:** all 8 live, each in sitemap + footer + llms.txt, schema validates, submitted in Google Search Console for indexing.
**STOP — update this file, show Ronak.**

---

## Phase 4 — Second batch: remaining feature + problem pages

**Status: NOT STARTED**

Feature pages: ledger/statement share on WhatsApp · outstanding & receivables on mobile · delivery challans (incl. bulk) · sales orders with live stock & pending quantities · bank statement import · stock/godown on mobile · credit & debit notes from phone · multi-company + consolidated reports · your own invoice template · handwritten order from a photo.

Problem pages (how people search before they know an app exists): "see Tally on mobile without remote/TeamViewer" · "send payment reminders to customers automatically" · "debtor ageing report from Tally on phone".

Order within the batch: whatever Search Console impressions from Phase 3 suggest first.

**STOP — update this file, show Ronak.**

---

## Phase 5 — Comparison, alternative and persona pages (highest buying intent)

**Status: NOT STARTED**

- "Biz Analyst alternative" and "Livekeeping alternative" pages. Note: the deck guardrail says competitors stay unnamed in *sales* material, but the site already names them (`/tally-mobile-app-comparison`, vs-blog posts) — precedent stands; every claim must come from the verified grid (Biz Analyst: no payment collection, no cancel/close; Livekeeping: generate-only e-invoice, nothing after the invoice). Re-verify the Livekeeping changelog before publishing (fortnightly rule).
- Refresh `/tally-mobile-app-comparison` with the 2026-08 grid (keep the HTML table).
- Persona pages: FMCG distributors · pharma distributors · agri/crop-science distributors (real customers exist in each; no customer names without permission).

**STOP — update this file, show Ronak.**

---

## Phase 6 — Measure, refresh, repeat (ongoing loop)

**Status: NOT STARTED**

- Weekly: Clarity top entry pages + referrers (watch the ChatGPT line grow); Search Console impressions/clicks per landing page.
- Quarterly content refresh (content < 3 months old is ~3× more citation-eligible); honest `dateModified` bumps.
- New keyword spotted → new page is a 10-minute content entry via the Phase 2 engine.
- Off-site (biggest remaining GEO lever, separate effort): YouTube demo shorts + Reddit answers — brand mentions correlate ~3× more with AI citations than backlinks.

**Success =** feature pages appearing as Clarity entry pages + Search Console clicks + demo requests, and ChatGPT/Perplexity referral sessions climbing week over week.
