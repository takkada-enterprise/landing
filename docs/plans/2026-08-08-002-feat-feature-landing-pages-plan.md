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

**Status: COMPLETE and LIVE on takkada.com 2026-08-08 (PR #59 merged 19:49 UTC; operator flipped the Cloudflare toggle the same evening, verified live). Two premises in this phase turned out to be wrong; read the findings below before acting on them.**

**Shipped in this phase:**
- `llms.txt` is now **generated**, not hand-written (`scripts/generate-llms-txt.mjs`). Prices derive from `pricing` in `siteContent.js`, pages from a new optional `llms: { section, title, summary }` field on `routeMetadata`, guides from blog frontmatter on disk. 11 pages + 170 guides = 181 links, up from 11. Guard tests fail on a hand-edit, on drift from the generator, and on any retired plan name reappearing. **This is the hook Phase 2 needs**: a new feature page earns its llms.txt line by registering `llms` on its route, nothing else.
- Logo assets: nav/footer now use a 360x128 WebP (10KB) and the favicon a 180x64 PNG (13KB), replacing the 1172px 133KB source PNG that every visitor downloaded on every page. 135KB → 24KB per page load, site-wide. Both logos carry explicit `width`/`height`. The full-size PNG stays as the schema.org logo URL only.

**Finding 1 — the CLS premise is stale. Do not spend more on it.**
Measured 2026-08-08 with Lighthouse against live takkada.com, mobile, `--throttling-method=devtools`: homepage CLS **0.03** across three runs, top blog entry page **0.00**. Both comfortably green. The 0.48 in the Clarity week-of-07-26 data predates the homepage rebuild (PR #57, merged 08-06), which fixed it. Caveat worth one check: Clarity/CrUX is 75th-percentile field data across real devices and can read worse than a lab run, so re-read the Clarity CWV panel now that #57 has been live a few days before calling it closed.

**Finding 2 — the real Core Web Vitals problem on the homepage is LCP, not CLS. FIXED, and the fix is measured.**
Live mobile LCP was **3.1–3.8s** against a 2.5s "good" threshold. The LCP element is the hero image, and **78% of its time was Load Time**, meaning the file was queued behind other bytes rather than requested late (it is already preloaded with `fetchpriority=high`). Total page weight was 1,447KB.

Root cause, diagnosed and confirmed: `src/lib/blogPosts.js:1` uses `import.meta.glob('/content/blog/*.md', { eager: true })`, so every post's rendered HTML lands in whatever chunk imports it — and the blog routes were imported statically, making that chunk the main bundle. Anyone landing on the homepage downloaded every article on the site before the hero could paint. Importing the two blog routes dynamically moves the payload into a chunk only `/blog` and `/blog/:slug` fetch.

Measured on live takkada.com, mobile, devtools throttling, three runs each:

| | Before | After |
|---|---|---|
| LCP | 3.1–3.8s | **2.6–2.9s** |
| Page weight | 1,447 KB | **852 KB** |
| Main JS (gzip) | 585 KB | **72 KB** |
| Lighthouse performance | 0.87 | **0.94–0.96** |

Note the local before/after showed LCP *unchanged* at 2.3–2.5s — localhost does not reproduce the bandwidth contention. The win only appeared against the live site. Do not trust a local Lighthouse run to validate a byte-weight change on this repo.

**Still not fully green:** LCP sits at **2.5–3.0s** against the 2.5s threshold. See Finding 4 for the font attempt, which did not move it.

**A new failure mode this introduces, and its guard.** If a future router or `vite-react-ssg` upgrade stops awaiting `lazy`, all 170 blog pages become empty client-rendered shells that still return 200 and still sit in `sitemap.xml`. Nothing else in the build would notice. `scripts/checkBlogPrerender.mjs` fails the build on that, asserting on prose in the raw HTML rather than on route config.

**Finding 4 — self-hosting the fonts did NOT deliver the LCP win it was predicted to. Record this before anyone tries it again.**

The Google Fonts `<link>` was render-blocking for 1,326ms, so vendoring it looked like the obvious next LCP lever. It was shipped (PR #61) and **made things worse**: live mobile LCP went 2.6–2.9s → **3.1–4.2s** across five consecutive runs.

Cause, from the request timeline: the hero image is the LCP element, and its download time went 1,728ms → 3,120ms **on identical bytes**. Off Google's origin the fonts had their own connection; on ours they compete with the image for the same one. Two specific thieves:
1. The `rel=preload` hints put 93KB of High-priority font requests ahead of the hero at ~705ms.
2. Worse, `latin-ext` arrived at **VeryHigh** priority mid-hero-download — a font discovered during layout is treated as critical. 81KB of it.

PR #62 fixed both: preloads removed (`font-display: swap` covers it), and `latin-ext` subset from 81,228 → 2,568 bytes because **the site uses exactly one character from that range — ₹, 1,710 times**. LCP returned to **2.5–3.0s**, i.e. back to where it was before the font work, not better.

**Honest scorecard for the font change:**

| | Before fonts | After fonts + fix |
|---|---|---|
| LCP | 2.6–2.9s | 2.5–3.0s (**no gain**) |
| CLS | 0.029 | **0.002** (real gain) |
| Font payload | 175 KB | **98 KB** |
| Third-party dependency | Google | none |

So: worth keeping for the CLS improvement, the weight, and losing the Google dependency — but **removing a render-blocking stylesheet does not automatically improve LCP when the LCP element is an image that then has to share the connection.** Do not assume otherwise next time; measure the request timeline, not just the render-blocking list.

**What is actually left on the critical path** (measured 2026-08-08 post-fix):
- `assets/app-*.css`, render-blocking **888ms** — 17KB that takes ~1s to arrive on a cold connection.
- **`/cdn-cgi/scripts/.../email-decode.min.js`, render-blocking 1,091ms.** This is Cloudflare's **Scrape Shield → Email Obfuscation** feature injecting a blocking script because the pages contain email addresses. It is not in our repo and cannot be fixed in code. **This is now the single largest remaining LCP lever and it is another dashboard toggle.** Weigh it against whatever spam protection the obfuscation is buying.

**Finding 3 — the AI-bot block is narrower than this plan assumed, and the control is named differently than step 1 says.**

The setting is **AI Crawl Control → Signals → "Managed robots.txt"** (a single toggle), *not* Security → Bots. Confirmed by inspecting the live dashboard 2026-08-08: every per-crawler "Block Crawler" toggle under AI Crawl Control → Security is already OFF, and ClaudeBot shows 45 allowed requests — so nothing is blocked at the edge. The `Disallow: /` comes purely from the managed robots.txt file. Cloudflare's own "Robots.txt violations" panel confirms it: ClaudeBot, `Disallow: /`, 3 violations.

**Zone-wide side effect, verified before recommending the change:** `app.takkada.com` and `stage.takkada.com` have **no robots.txt of their own** — their origin returns the Flutter app's `index.html` for `/robots.txt`. Cloudflare's managed file is currently the only crawler instruction those hosts have. Turning the toggle off leaves them with none. Judged acceptable (login-gated, crawlers get an empty shell, and pay-link tokens live in the URL *fragment* which browsers never transmit, so crawling cannot leak one), but the follow-up is to ship a real `Disallow`-all `robots.txt` in the Flutter app's `web/` folder rather than leave it depending on a dashboard toggle.

Live `robots.txt` verified 2026-08-08. Cloudflare injects its managed block *ahead* of our file, and it disallows: `ClaudeBot`, `GPTBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`, `Amazonbot`, `Bytespider`, `meta-externalagent`. It does **not** touch `OAI-SearchBot`, `ChatGPT-User`, or `PerplexityBot` — those three already have full access, which is consistent with ChatGPT already showing up as a referrer. So the operator action buys ClaudeBot (Claude citations) and Google-Extended (AI Overviews / Gemini grounding), not the whole door. Still worth doing, just not the blocker this phase treated it as.
`scripts/checkCrawlerAccess.mjs` reports all five bots served (200). That is not a contradiction: the script measures *edge* blocking by IP, and cannot see a robots.txt directive. Noted as a real gap in that check.

**Item 5 (freshness pass):** nothing done, deliberately. This phase touched no article or page copy, only generated data and asset plumbing, so no `dateModified` may honestly be bumped.

1. **Operator action (Ronak, ~10 min, Cloudflare dashboard for takkada.com):**
   - **Exact location, verified in the live dashboard 2026-08-08:** AI Crawl Control → **Signals** → turn OFF the **"Managed robots.txt"** toggle (top-left of that page). It is the only control that matters; the per-crawler Block toggles under AI Crawl Control → Security are already all OFF and are not the cause.
   - Verified live 2026-08-08: Cloudflare still injects a `Disallow: /` block for ClaudeBot, GPTBot, Google-Extended ahead of our own robots.txt. Our repo file is already correct; the dashboard setting is the only fix.
   - Decision made: allow all AI-search citation crawlers. GPTBot (training) may stay blocked or be allowed — allowing it also puts Takkada in future model knowledge; recommended: allow.
   - ✅ **DONE 2026-08-08.** Operator switched Managed robots.txt OFF. Verified live: `takkada.com/robots.txt` dropped from 15,962 bytes to 1,242, the `BEGIN Cloudflare Managed content` section is gone, and ClaudeBot / GPTBot / Google-Extended / Applebot-Extended all now read `Allow: /` from our own file.
   - ⚠️ **Confirmed side effect, now real:** `app.takkada.com/robots.txt` and `stage.takkada.com/robots.txt` return the Flutter app's HTML (200, `text/html`) instead of a robots.txt, so those hosts now have no crawler instructions at all. Follow-up (b) below closes it.
2. ✅ **DONE (live).** Fix `public/llms.txt`: it still shows retired plans ("Voucher Model / Collections Model / Full Access ₹8,499"). Replace with live plan names + prices from `src/data/siteContent.js`, and keep a Features section that lists every feature landing page as it ships.
3. ✅ **DONE.** Run `scripts/checkCrawlerAccess.mjs` + live curl checks; record results here. See Finding 3.
4. ✅ **DONE, but the premise was wrong.** CLS was already 0.03. The real problem was LCP; see Finding 2. Fixed and measured live: 3.1-3.8s → 2.6-2.9s.
5. ✅ **N/A, deliberately.** No article or page copy was touched this phase, only generated data and asset plumbing, so no `dateModified` may honestly be bumped.

**Done when:** live robots.txt has no conflicting AI-bot blocks, llms.txt is truthful, CLS is green.
**Status against that bar:** llms.txt truthful and self-maintaining ✅ live · CLS green ✅ (was already green; verified, not fixed) · LCP 3.1-3.8s → 2.6-2.9s ✅ live (bonus, not in the original bar) · robots.txt still blocking ClaudeBot + Google-Extended ✅ **done and verified live 2026-08-08**.

**Carried into Phase 2 as follow-ups:** (a) render-blocking Google Fonts, 1,326ms, the last LCP lever; (b) a real `Disallow`-all `robots.txt` in the Flutter app's `web/` folder so `app.takkada.com` stops depending on a Cloudflare toggle; (c) `checkCrawlerAccess.mjs` cannot see robots.txt directives, only edge blocking — it reported all-clear while ClaudeBot was disallowed, so it needs a robots.txt parse arm.

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
