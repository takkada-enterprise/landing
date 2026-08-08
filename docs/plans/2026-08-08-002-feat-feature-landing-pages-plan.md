# Feature Landing Pages — Phased Plan

**Date:** 2026-08-08 · **Goal:** clients from ChatGPT and Google. Every hero feature gets its own landing page that matches what a prospect actually searches, and the AI-search plumbing that feeds ChatGPT/Perplexity/Claude answers is fully opened.

**Rule for the executor: STOP at the end of every phase.** Update the Status line of that phase in this file (with date + what shipped), show Ronak the result, and wait for a go-ahead before starting the next phase.

**Sources of truth for claims:**
- `pitch-deck/takkada-product-deck-2026-08.html` (product claims, operator-approved)
- `pitch-deck/competitor-analysis-2026-08.html` (competitor facts + claim guardrails)
- `CLAUDE.md` in this repo (pricing, voice rules, retired plan names)
- Locked wording, verbatim: **"0% MDR on UPI collections, no transaction cap, no monthly fee."**
- ~~E-way bill **cancel and close from the phone are built** (deck 2026-08-06) — "only app that cancels or closes an e-invoice/e-way bill from the phone" is claimable~~ **WRONG, corrected 2026-08-08. Cancel is real. CLOSE IS NOT, and cannot be, because the facility does not exist.** GSTN Advisory No. 668 dated 29 July 2026 put the e-way bill closure facility in abeyance until further notice, so no software can offer it. Verified three ways: our own blog post `content/blog/e-way-bill-closure-rule-2026.md` (founder-authored, cites the advisory), and the backend, which has `create-ewaybill` and `cancel-gst-compliance` edge functions and **no close function of any kind**. The claim was live in the Phase 2 pilot's comparison table and has been corrected to "Generate and cancel". **Two follow-ups the operator owns:** `pitch-deck/takkada-product-deck-2026-08.html` still says "or close the e-way bill, right from the app", and `competitor-analysis-2026-08.html` still carries "Only app that cancels or closes an e-invoice/e-way bill from the phone" as verified-true. Both need the same correction before the next reprint or send.
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

**Now green in the lab.** LCP **2.31–2.48s across five consecutive runs**, all under the 2.5s threshold; CLS 0.001–0.028 against 0.1; Lighthouse performance **0.95–0.97**. Started the session at LCP 3.1–3.8s / 0.87.

Caveat that matters: this is *lab* data. Google ranks on *field* data (CrUX), which is a 28-day rolling 75th percentile across real devices, so it will lag this by roughly a month and can read worse. Re-check the Clarity / Search Console Core Web Vitals panel in early September before treating it as banked.

What actually got it there, in order of contribution:
1. **Blog bundle split** (PR #59) — 3.1–3.8s → 2.6–2.9s. By far the biggest single win.
2. **Hero re-encode** (PR #64) — 2.59s → 2.36s median. 63,850 → 48,840 bytes from the lossless PNG source, dimensions unchanged.
3. **Cloudflare email obfuscation off** (operator) — ~60ms. Lighthouse estimated 1,091ms of "potential savings"; the real gain was a small fraction of that.
4. **Font self-hosting** (PRs #61/#62) — **zero** LCP contribution, see Finding 4. Kept for CLS and weight.

**Lesson recorded twice over:** Lighthouse's `wastedMs` / "potential savings" numbers are estimates under its simulation model, not wall-clock time you get back. Two predictions in this session were built on them and both over-promised. Predict from bytes and the request timeline instead.

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

**Cloudflare email obfuscation: turned off by the operator 2026-08-08.** It was injecting `/cdn-cgi/scripts/.../email-decode.min.js` as a render-blocking script to hide exactly one footer address, and it also hid that address from the AI crawlers this phase existed to let in. Verified gone; `admin@paysaathi.com` is now readable in the HTML. Measured gain was ~60ms, not the 1,091ms Lighthouse advertised.

**What is left on the critical path, and deliberately not done:**
- `assets/app-*.css` render-blocks ~900ms (17KB, first thing on a cold connection).
- **The 71KB JS bundle fetches at High priority alongside the hero image**, competing for bandwidth. The site is fully server-rendered, so that JS is only needed for hydration. Deprioritising it would free bandwidth for the LCP element **at the cost of CTAs (Book a Demo, WhatsApp, menu) becoming clickable later**. That is a product trade-off, not a technical one — it needs an operator decision, and the page is already under threshold without it.

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

**Status: COMPLETE and LIVE on takkada.com 2026-08-08 (PR #66 merged 07:13 UTC, operator-approved). Pilot page: https://takkada.com/salesman-app-tally/**

**What shipped in the commit:**
- `src/data/featurePages.js` (content, JSX-free) + `src/components/FeaturePage.jsx` (template) + `src/feature-page.css`.
- **Registration is one object.** `siteMetadata.js` spreads `featureRouteMetadata` and `routes/index.jsx` builds its elements from the same array, so a new entry gets the route, the sitemap line, the llms.txt line, the footer "Features" link and its own WhatsApp CTA context with no other edit. Only follow-up is `node scripts/generate-llms-txt.mjs`, and a test fails if that is skipped.
- `articleSchema` refactored onto a shared `articlePageSchema`, so blog posts and feature pages emit the same Article node instead of two copies that drift.
- Pilot page live at `/salesman-app-tally` on the local build: 6 walk-through cards on real app screenshots, 5-row comparison table, 6 FAQs, related-reading block into 4 existing salesman posts.

**Hero mockup (added on operator request before merge):** each page declares its own `hero` image. The pilot uses a real Guwahati storefront carrying the coordinates and timestamp, which argues the visit-proof claim better than a description of it. It is the LCP element on desktop, so it renders eager at `fetchPriority="high"` with explicit dimensions, re-encoded from PNG at q68 (83,320 → 53,584 bytes) with a `checkImageBudgets` entry pinning it.

Two things learned wiring it:
- **`fetchPriority` on the `<img>` is what earns the preload.** vite-react-ssg injects a preload per `<img>` and `stripImagePreloads` keeps only the high-priority ones. Never hand-write a second `<link rel=preload>`. A test now asserts the built page preloads the hero and nothing else, so a walk-through image losing `loading="lazy"` fails rather than quietly competing for bandwidth.
- **These mockups have an alpha channel**, so `box-shadow` drew a rectangle behind a phone-shaped hole and read as a stray white card. `drop-shadow` follows the silhouette. Applies to every mockup on the site.

**Verified on the live site, not assumed:**
- `npm test` 272 passed / 1 skipped, 27 files. `npm run build` green through all five guard scripts.
- `https://takkada.com/salesman-app-tally/` returns 200 with **41,728 bytes** of real prerendered HTML (14,828 chars of text). Correct title, canonical and h1.
- All 6 JSON-LD blocks parse live: Article (named Person author, LinkedIn `sameAs`, honest `dateModified`), SoftwareApplication, FAQPage, BreadcrumbList, plus site-wide Organization and WebSite.
- Exactly **1 image preload** on the live page, and it is the hero. Hero serves at 53,584 bytes as `image/webp`.
- Live in `sitemap.xml` at priority 0.9, in `llms.txt`, and linked from the footer of every page including the homepage.
- 15 internal links on the page, zero dead; all 9 homepage hash targets exist.
- Main JS bundle still **74KB gzip** — the blog chunk stayed isolated, so the Phase 1 LCP work is not undone.
- Every new guard was falsified by breaking the data and watching it go red. One guard (`WHATSAPP_MESSAGES[ctx] === waMessage`) proved circular and was rewritten rather than left green.

**CodeQL note for the next PR:** copying the `expect(url.startsWith('https://takkada.com'))` assertion out of `landing-schema.test.jsx` trips `js/incomplete-url-substring-sanitization` and fails the PR's CodeQL check on a *new* alert. Six alerts of that same rule are already open on `main` from the same copied pattern, which is why main itself stays green. Assert `new URL(x).origin` instead: it clears the alert and is stricter (the prefix test passes for `https://takkada.com.example.com`). Worth backfilling those six when someone is next in those files.

**Not measured yet:** live LCP for this page. Phase 1 established that a local Lighthouse run does not reproduce the bandwidth contention that matters, so this needs a run against the live URL before any claim about its speed.

**Two things worth knowing before Phase 3:**

**Finding 1 — the "6 existing feature landing pages" are not 6 pages.** `/tally-on-mobile` renders `<Home>` under a different canonical, so it is the homepage body with a keyword title. That is a likely part of why these pages pull zero top entries, alongside the missing internal links. Phase 3 item 8 should treat it as a rewrite onto this engine, not a refresh.

**Finding 2 — competitor detail for field-sales is NOT verified.** The competitor grid (2026-08-06) covers e-invoice lifecycle, collections, AI entry, voucher depth and per-device billing. It says nothing about whether the competitors do geo-tagged visit proof or check-in. The comparison table on the pilot page therefore only carries rows the grid actually supports, and claims no absence that was never researched. Before any page leans on a field-sales absence claim, that research has to happen.

**Open question for Ronak:** the blog post `salesman-app-tally-india` already targets this head term. Two of our own URLs now compete for it. Recommendation: keep both, point the post's internal links at the new page so the page wins the term and the post feeds it. That is how the plan's own evidence says pages start ranking.

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

**Status: COMPLETE and LIVE on takkada.com 2026-08-08 (PR #70 merged). All 8 URLs verified returning 200 from the live apex 2026-08-08.** Built green locally first (29 files / 498 tests). Suite 29 files / 498 tests green, `npm run build` green, all seven new URLs plus the rebuilt /tally-on-mobile server-rendered with one h1, four JSON-LD blocks of their own, canonical, OG, sitemap entry, llms.txt line and footer link.

**What shipped, row by row:** rows 2-7 are new pages through the Phase 2 engine (`payment-collection-tally`, `payment-reminder-tally`, `e-invoice-from-phone`, `e-way-bill-from-phone`, `tally-reports-on-mobile`, `import-purchase-from-pdf`). Row 1 was the Phase 2 pilot and only changed where it carried the false close claim. Row 8 is the `/mobile-tally` refresh described below.

**Every claim was re-verified against prod `company_feature_entitlements` on 2026-08-08 before the copy was written:** team_sales 18 · field_visits 6 · payment_reminders 87 · payment_links 87 · upi_collections 77 · einvoice_ewaybill_mobile 77 · reports_plus 56 · purchase_import 35 · payment_collection 10. Every page's underlying feature is live for real customers.

**Finding 1 — the plan's e-way close premise was wrong and the pilot was already shipping it.** See the corrected bullet at the top of this file. The deck and the competitor grid still carry it.

**Finding 2 — the screenshot library is not all safe to publish, and one unsafe image is already live.** Five files under `public/assets/screenshots/` carry real customer party names or balances: `invoice-detail` (Hindustan Unilever Ltd), `share-ledger` (Shyamal Das, ₹8.56 Lacs receivable, real invoice numbers), `bankbook` (Favorite Food Co, Sundarbans Food Products, real bank balances), `inventory-supplier` (ACT II, Sundrop Brands Limited), `party-list` (already known-banned). None of those five are referenced by any page, but **`einvoice-eway.webp` is, and it is live on the homepage today** — it shows the party "Shyamal Das" and a Red Bull line. It was the obvious hero for the e-invoice page and was deliberately not used. Recommend pulling it from the homepage road and re-capturing. Note also that all of these ship to the CDN and are fetchable by URL whether or not a page links them.

**Finding 3 — `/mobile-tally` had two live copy defects, now fixed.** Its FAQ named two retired plans ("the Voucher and Collections plans", withdrawn in the 2026-07-25 rate card rebuild) and hand-wrote an extra-user rupee figure, both against CLAUDE.md §3. `src/routes/__tests__/icp-refresh.test.jsx` now fails on either regressing.

**Row 8, both halves done.** `/mobile-tally` got the two things the ranking blog posts have and it did not: a front-loaded answer block and four internal links to real posts. `ICPTemplate` grew two optional props for this, so the three ICP pages that were not refreshed render byte-identically.

**`/tally-on-mobile` was rebuilt as its own page (operator approved 2026-08-08).** It had been `<Home seo={…} />`, the entire homepage body under a second canonical, which made it a near-duplicate of `/` and is the likeliest reason a head term with its own exact-match URL pulled no entries at all. It is now the eighth `FEATURE_PAGES` entry and deliberately the broadest of them, since "tally on mobile" is what someone searches before they know the category has a name. 91KB of duplicated homepage became 38KB of its own content. `TallyOnMobile.jsx` is deleted. `tally-on-mobile.test.jsx` was kept and its assertions reversed: it used to *require* the home hero headline and the home pricing band, which pinned the duplication in place, and it now asserts both are absent.

**One guard was refined rather than worked around.** PR #68's closure guard scanned the whole page object, which made it impossible to write the most useful thing an e-way page can say to someone searching "eway bill closing on phone" — that closure does not exist and why. The ban is now absolute on every selling surface, and an FAQ may raise closure only while denying it and citing the advisory.

**Watch on the next Search Console read:** `/tally-on-mobile` is a live head-term URL whose content changed completely. Impressions may move either way for a few weeks before settling.

**One content gap.** `/import-purchase-from-pdf` has no screenshot of the actual PDF-import review screen, because none exists in the library. It leads with the voucher item-lines screen and the alt text describes only what is really on it. Worth a capture of the import review flow to swap in; the page ships honest without it.

**STOP — show Ronak the seven pages in the browser before pushing.**

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

**Status: COMPLETE and LIVE on takkada.com 2026-08-08 (PR #71 merged). All 13 URLs verified returning 200 from the live apex 2026-08-08; sitemap 205 URLs and llms.txt 201 links confirmed live.** Built green locally first (29 files / 902 tests). Suite 29 files / 901 passed / 1 skipped, `npm run build` green, all 13 URLs server-rendered with ~1,500–1,650 words of their own prose, one h1, 6 JSON-LD blocks each, canonical, OG, sitemap entry (205 urls), llms.txt line and footer link.

**All 10 feature pages and all 3 problem pages shipped**, so nothing in the phase is deferred. New slugs: `/outstanding-receivables-on-mobile`, `/share-ledger-statement-whatsapp`, `/debtor-ageing-report-on-phone`, `/tally-on-mobile-without-remote-access`, `/send-payment-reminders-automatically`, `/bank-statement-import-tally`, `/godown-wise-stock-on-mobile`, `/multi-company-tally-reports`, `/sales-order-on-mobile`, `/delivery-challan-from-mobile`, `/credit-note-from-phone`, `/custom-invoice-template-tally`, `/handwritten-order-to-tally`.

**The batch order this phase actually used, and why it is not the one the plan asked for.** The plan said to order by Search Console impressions from Phase 3. Phase 3 merged the same day, so those URLs have not been crawled and there is no impression data to order by. The order came from the two demand signals that do exist: which blog cluster is already pulling entries for a topic, and how many prod companies run the underlying feature. Re-order the remainder once Search Console has a few weeks on the Phase 3 URLs.

**Every claim re-verified against prod `company_feature_entitlements` on 2026-08-08 before the copy was written** (active and unexpired): payment_reminders 87 · payment_links 87 · invoice_created_whatsapp 87 · team_access_controls 84 · voucher_creation_mobile 79 · upi_collections 77 · einvoice_ewaybill_mobile 77 · bank_statement_import 71 · reports_plus 56 · auto_invoice_dispatch 47 · purchase_import 35 · sales_order_import 34 · team_sales 18 · payment_collection 10 · billing_module 6 · field_visits 6 · bulk_delivery_challan 4 · pending_order 3. The last two are low enough that `/delivery-challan-from-mobile` and `/sales-order-on-mobile` carry a capability claim and no adoption claim; CLAUDE.md §3 bans an adoption number for Pending Orders outright.

**Finding 1 — one page in this batch deliberately overlaps a Phase 3 page, and it needs watching.** `/send-payment-reminders-automatically` targets the problem phrase someone types before they know a Tally app exists; `/payment-reminder-tally` targets the Tally-qualified query. Different intents and different query sets, so both were built, and the copy, FAQs and framing were written apart rather than reworded. This is *not* the `/tally-on-mobile` failure mode, which served the entire homepage body under a second canonical. It is still the closest two URLs on this site have come to competing. If Search Console shows them trading places on the same queries, merge them rather than letting both rank thinly.

**Finding 2 — the screenshot gap Phase 3 recorded is now load-bearing for four pages.** Bank statement import, godown-wise stock, credit and debit notes, and the handwritten order describe screens the library has no safe capture of. `bankbook.png` shows a real customer's bank balances and `inventory-supplier.png` names a real supplier, so both stay banned along with the other three Phase 3 named. Those four pages follow the precedent `/import-purchase-from-pdf` set: lead with a real adjacent screen, and write alt text describing only what is actually in the frame. They ship honest, and a capture pass would materially improve them. `inventory-history.png` was reviewed as a candidate for the stock page and rejected: no `.webp` exists, and its sibling was banned for naming a supplier, so the conservative call was not to publish it.

**Finding 3 — this phase broke the footer, and the fix is a sitewide visual change worth looking at.** The Features column is generated from `FEATURE_PAGES`, so it went from 8 links to 21 while its neighbours carry 5 to 7. As a single list it made the footer badly lopsided on every page of the site. A long generated column now spans the grid row and flows into 2 sub-columns on mobile and 3 above 720px. The guard that every feature page is linked from the footer is untouched, so this is layout only, but it changes the footer everywhere and should be part of the eyeball.

**A guard caught something the plan did not mention.** `src/data/__tests__/blog-internal-links.test.js` (added by PR #69 during Phase 3) requires every feature page to be linked from at least one blog post, and forbids any post from spending a page's exact search phrase as anchor text on a different URL. 13 posts each gained one contextual sentence carrying a link to its matching landing page, with `updated:` bumped on all 13 so `dateModified` reflects a real edit. Five of those posts had no `updated:` field at all and now have one.

**Structural note.** `src/data/featurePages.js` was 1,403 lines with 8 pages. The second batch lives in `src/data/featurePagesSecondBatch.js` and is concatenated into `FEATURE_PAGES`; nothing downstream knows which batch a page came from. `sourceFile` is now resolved per page rather than hardcoded, so the sitemap's `<lastmod>` tracks the file that actually changes. The import specifier carries an explicit `.js` because the sitemap and llms.txt generators load these modules through Node ESM, which does not resolve extensionless paths.

**Done when:** all 13 live, each in sitemap + footer + llms.txt, schema validates, submitted in Google Search Console for indexing.
**Status against that bar:** 13 pages built ✅ · sitemap, footer, llms.txt registration ✅ (llms.txt regenerated, 31 pages / 181 → 194 links) · schema present, 6 JSON-LD blocks per page ✅ · live ✅ merged as PR #71 and verified 200 on the apex 2026-08-08 · Search Console submission ❌ still pending, and it is now the only unmet item in Phases 3 and 4. It is an operator action; the weekly loop in `docs/ops/measurement-loop.md` step 3 carries it.

| # | Page (slug) | Search phrase it targets | Plan pointer |
|---|---|---|---|
| 1 | `/outstanding-receivables-on-mobile` | outstanding receivables on mobile | Clarity |
| 2 | `/share-ledger-statement-whatsapp` | ledger statement on WhatsApp | Clarity |
| 3 | `/debtor-ageing-report-on-phone` | debtor ageing report on phone | Clarity |
| 4 | `/tally-on-mobile-without-remote-access` | tally on mobile without remote access | Clarity |
| 5 | `/send-payment-reminders-automatically` | send payment reminders automatically | Clarity |
| 6 | `/bank-statement-import-tally` | bank statement import | Copilot |
| 7 | `/godown-wise-stock-on-mobile` | godown wise stock on mobile | Momentum |
| 8 | `/multi-company-tally-reports` | multi-company Tally reports | Clarity |
| 9 | `/sales-order-on-mobile` | sales order on mobile | Momentum |
| 10 | `/delivery-challan-from-mobile` | delivery challan from mobile | Momentum |
| 11 | `/credit-note-from-phone` | credit note from phone | Momentum |
| 12 | `/custom-invoice-template-tally` | custom invoice template | Momentum |
| 13 | `/handwritten-order-to-tally` | handwritten order to Tally | Copilot |

---

## Phase 5 — Comparison, alternative and persona pages (highest buying intent)

**Status: BUILT 2026-08-08 on branch `feat/phase5-comparison-persona-pages`, NOT PUSHED. Waiting on Ronak's eyeball, which is what this phase's STOP asks for.** Suite 32 files / 1,140 passed / 1 skipped, `npm run build` green, all six URLs server-rendered with 1,200–1,400 words of their own prose, one h1, six JSON-LD blocks, canonical, OG, sitemap entry (208 urls) and footer link.

**What shipped:** `/biz-analyst-alternative`, `/livekeeping-alternative`, `/tally-app-for-fmcg-distributors`, `/tally-app-for-pharma-distributors`, `/tally-app-for-agri-input-distributors`, plus the `/tally-mobile-app-comparison` refresh and the named grid on the homepage.

**Re-verification done first, as the phase required.** Livekeeping's App Store version history read through the latest entry: create e-way/e-invoice with editable shipping address, edit HSN on creation, edit and cancel Tally vouchers, stock journal and physical stock, WhatsApp reminders. No IRN cancel, no e-way cancel, no Part-B, no extension, no payment collection of any kind. Public pricing around ₹3,000/yr with compliance as a paid add-on (IndiaMART lists the one-year plan with add-ons at ₹6,000). Biz Analyst's own site confirms per-device, per-Tally-licence billing and a voucher list without credit or debit notes. The 2026-08-06 grid holds.

**Finding 1 — the live comparison grid was wrong against us, in the direction that matters.** `comparisonSection` said Biz Analyst cannot generate an e-invoice or e-way bill from mobile. They can, founder-confirmed 08-06. That row had been live on `/tally-mobile-app-comparison` for months, and **the table had no test at all**, so nothing could have caught it. (Correction, verified against the live page after the merge: this phase's commit message and the first draft of this note both said the grid was also on the homepage. It is not. `ComparisonSection` has exactly one caller.) A row that understates a competitor is worse than one that flatters us: it is the claim we cannot defend if anyone checks. Corrected, the differentiator row is now cancellation rather than generation, and the grid has a guard pinned to the two ways it can go wrong. The disclaimer still said "reviewed on April 26, 2026".

**Finding 2 — a real customer capture reached a rendered page, and only an eyeball caught it.** `settlement.webp` went in as the `/biz-analyst-alternative` hero. It carries a named individual and two real bank UTRs, and its numbers (pending settlement ₹0, total settled ₹27) argued the opposite of the page they were leading. Phase 3 found five unsafe captures and wrote them into this file; **a note in a plan is not a guard**. The feature-page data test now fails on any of the six, and was watched go red. `settlements-mockup.webp` is the sanitised capture of the same screen and is what ships.

**The alternative pages name their competitor, which no feature page had done.** The unnamed-competitor guard is now opt-in per page through `namesCompetitor` and permits exactly one name, so an alternative page cannot drift into a category roundup. Its banned list also matched the bare string `marg`, so any page discussing a distributor's *margins* read as name-dropping Marg ERP; that is a word boundary now.

**URL decision, operator-made 2026-08-08: the landing page owns the query and the blog post redirects to it.** `/blog/biz-analyst-alternative` and `/blog/livekeeping-alternative-for-distributors` targeted the exact phrases the new pages target, and two URLs answering one query split the signal. Both posts are retired and 301'd through `public/_redirects`. The corpus guard already refused to let a post spend a landing page's search phrase as anchor text on another URL, which is the same rule from the inside.

**A redirect trap worth recording.** On Cloudflare Pages a static asset wins over a redirect rule for the same path, so a rule pointing at a page the build still produces does nothing while looking exactly like a working redirect. `src/data/__tests__/redirects.test.js` asserts the source is gone from the corpus and the target is a live route, and was watched go red with the post restored. **Still unverified: the redirects themselves cannot be tested locally**, because `vite preview` does not read `_redirects`. Curl both old URLs after the merge.

**Finding 3 — `/tally-mobile-app-comparison` would have shipped two dead links and nothing would have failed.** Its head-to-head cards are hard-coded hrefs in a component, and `blog-internal-links.test.js` only reads `content/blog/*.md`. Deleting the two posts left the page pointing at 404s with a green suite. Fixed, and a test now refuses either retired URL by name.

**Persona pages are deliberately not the zero-MDR posts reworded.** Those posts own the "what does 0% MDR mean for my trade" query and are indexed; the pages take the broader "app for my trade" query and link down to them. Same watch item Phase 4 opened for `/send-payment-reminders-automatically`: if Search Console shows a page and its post trading places on one query, merge them. No customer is named on any of the three.

**Nothing claims e-way bill closure.** The Livekeeping page answers it head-on in an FAQ citing Advisory No. 668, which is what the closure guard requires.

**Still open from this phase:** the deck and `competitor-analysis-2026-08.html`/`.md` both still carry "cancels or closes" and a closure row in the capability table. The website was corrected in Phase 3; these two were not, and this phase read from that file. Fix before any reprint or send.

**STOP — show Ronak the six pages in the browser before pushing.**

- "Biz Analyst alternative" and "Livekeeping alternative" pages. Note: the deck guardrail says competitors stay unnamed in *sales* material, but the site already names them (`/tally-mobile-app-comparison`, vs-blog posts) — precedent stands; every claim must come from the verified grid (Biz Analyst: no payment collection, no cancel/close; Livekeeping: generate-only e-invoice, nothing after the invoice). Re-verify the Livekeeping changelog before publishing (fortnightly rule).
- Refresh `/tally-mobile-app-comparison` with the 2026-08 grid (keep the HTML table).
- Persona pages: FMCG distributors · pharma distributors · agri/crop-science distributors (real customers exist in each; no customer names without permission).

**STOP — update this file, show Ronak.**

---

## Phase 6 — Measure, refresh, repeat (ongoing loop)

**Status: MACHINERY BUILT 2026-08-08, branch `feat/phase6-measurement-loop`, not pushed. The loop is now runnable; the first read with real search data is the week of 2026-08-15 at the earliest.**

This phase is not a build, it is a habit, so what shipped is the scaffolding that makes the habit survive being forgotten for a month. Ronak chose "build the loop's machinery" over "run this week's measurement" (the Clarity and Search Console panels need a login this repo does not have, and the Phase 3/4 URLs were hours old with nothing crawled yet).

**Shipped in this phase:**

- **`npm run audit:freshness`** (`scripts/checkContentFreshness.mjs`) — buckets all 191 dated items, 21 feature pages plus 170 posts, by the date that actually reaches a crawler as `dateModified` (`updated` when present, else the publish date). Prints the refresh queue oldest first, undated at the top. Deliberately a report and not a build gate: content ages every day whether or not anyone edits it, so an age threshold in `npm run build` would turn the passage of time into a red build. `--fail-over=N` exists for a future cron that wants a hard threshold. **First run: 176 fresh, 15 ageing, 0 stale, 0 undated.** The 15 ageing are all blog posts from 2026-04-23 to 2026-05-06. Nothing is due yet.
- **`npm run audit:crawlers`** — the Phase 1 carried follow-up (c) is closed. That script had one arm, edge blocking by IP, and it was blind to exactly the block that motivated Phase 1: it reported all five bots served (200) the whole time Cloudflare's managed robots.txt was disallowing ClaudeBot, GPTBot, Google-Extended and Applebot-Extended. A second arm now fetches the live robots.txt and evaluates it the way a crawler does, with real group-matching semantics (named agent beats `*`, longest path prefix wins, Allow breaks a tie). The regression test is the actual Cloudflare block reduced to its shape, so the guard is pinned against the incident rather than against a hypothetical. **Live run 2026-08-08: both arms pass, all eight required crawlers read `Allow: /`.**
- **`docs/ops/measurement-loop.md`** — the weekly 15-minute procedure, which panels to read, which two watch items to check by name, the quarterly refresh rules, and the open items carried from earlier phases.
- **`docs/ops/measurement-log.md`** — the tracking table, seeded with the 2026-07-26 pre-work baseline and the 2026-08-08 launch row.

**Finding 1 — Phases 3 and 4 were both already live and this file said otherwise.** Both status lines read "NOT PUSHED — waiting on Ronak's eyeball". PR #70 and PR #71 are merged into `main`, and all 21 URLs return 200 on the apex, with `sitemap.xml` at 205 URLs and `llms.txt` at 201 links. The stale lines are corrected above. Worth noting because a plan that lies about what is live is worse than a plan with a gap in it, and Phase 6 exists to measure pages the plan claimed were not there.

**Finding 2 — the freshness corpus is healthier than the quarterly-refresh framing assumed.** No stale content, and no undated content at all, which means every one of the 191 items is emitting a real `dateModified`. The refresh burden for this quarter is 15 posts, not a backlog.

**The rule no script can enforce, and it is the one that matters.** Only bump `updated:` when the page actually changed in a way a reader would notice. A date moved on an unedited page is a false freshness signal told to a crawler, and this site's whole citation posture rests on not telling those. The script names the queue; it cannot check the honesty of the fix.

**Two things stay operator-owned and neither is buildable from here:** the Clarity and Search Console reads (login), and the off-site lever, YouTube demos plus Reddit answers, which has its own checklist in `docs/ops/off-site-presence-geo.md` and is the largest uncaptured item left in this plan.

**Still open, and it is the only unmet bar in Phases 3 and 4:** submitting the 21 feature URLs in Google Search Console for indexing.

- Weekly: Clarity top entry pages + referrers (watch the ChatGPT line grow); Search Console impressions/clicks per landing page.
- Quarterly content refresh (content < 3 months old is ~3× more citation-eligible); honest `dateModified` bumps.
- New keyword spotted → new page is a 10-minute content entry via the Phase 2 engine.
- Off-site (biggest remaining GEO lever, separate effort): YouTube demo shorts + Reddit answers — brand mentions correlate ~3× more with AI citations than backlinks.

**Success =** feature pages appearing as Clarity entry pages + Search Console clicks + demo requests, and ChatGPT/Perplexity referral sessions climbing week over week.

**STOP — update this file, show Ronak.**
