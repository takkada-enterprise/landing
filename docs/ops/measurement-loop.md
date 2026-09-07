# Measurement loop — weekly read, quarterly refresh

**Status:** ops track, operator-owned for the dashboard reads, scripted for everything that can be scripted.
**Source:** plan `docs/plans/2026-08-08-002-feat-feature-landing-pages-plan.md`, Phase 6.

Phases 1 to 4 put 21 feature landing pages and 170 guides live and opened the AI-search door. From here the work stops being "build pages" and becomes "watch what they do, refresh what goes stale, add a page when a keyword shows up". This file is that loop written down so it survives being forgotten for a month.

Two dashboards need a human login and cannot be automated from this repo. Everything else is a command.

---

## Weekly, about 15 minutes

### 1. Run the two site-side checks

```bash
npm run audit:crawlers    # is the AI-search door still open
npm run audit:freshness   # what content is ageing out of the citation window
```

`audit:crawlers` has two arms and both matter. The edge arm fetches as each bot and compares against a Googlebot baseline. The robots.txt arm reads the live file and evaluates it the way a crawler would. The second arm exists because the first one is blind to a robots.txt directive: through 2026-08-08 Cloudflare's managed robots.txt was disallowing ClaudeBot, GPTBot, Google-Extended and Applebot-Extended, and the edge arm reported all five bots served (200) the entire time. A non-zero exit means the door moved. First suspect is always **Cloudflare → AI Crawl Control → Signals → "Managed robots.txt"**, not Security → Bots.

### 2. Microsoft Clarity (login required)

Read two panels and write both numbers into `measurement-log.md`:

- **Top entry pages.** The question is whether any `/feature-slug` page has entered the list. As of 2026-08-08 the only pages pulling entries were blog posts, `import-purchase-from-pdf-tally` at #1. A feature page appearing here is the first real evidence the Phase 2 engine works.
- **Referrers.** Watch the ChatGPT line. It was 13 sessions in the week of 07-26 while the door was still half shut. Perplexity and Claude referrals are the ones the Phase 1 robots change was bought for, so a first appearance from either is a milestone worth noting.

### 3. Google Search Console (login required)

- **Performance → Pages**, last 28 days. Record impressions and clicks for each feature URL. Sort by impressions, not clicks: a page with impressions and no clicks has a title or description problem, which is a cheap fix. A page with neither is not indexed yet, which is a different problem.
- **Pages → Indexing.** Confirm the 21 feature URLs are indexed rather than "Discovered, currently not indexed". Submit any that are missing.

Two watch items are already on the record and should be checked by name every week until they settle:

- **`/tally-on-mobile`** is a live head-term URL whose content changed completely in Phase 3. It used to serve the entire homepage body under a second canonical. Impressions may move either way for a few weeks before settling.
- **`/send-payment-reminders-automatically` vs `/payment-reminder-tally`** are the closest two URLs on this site have come to competing. Different intents by design, written apart rather than reworded. If Search Console shows them trading places on the same queries, merge them rather than letting both rank thinly.

### 4. Core Web Vitals, monthly rather than weekly

Lab numbers are already green: homepage LCP 2.31 to 2.48s across five runs, CLS 0.001 to 0.028. Google ranks on field data (CrUX), a 28-day rolling 75th percentile, so it lags the lab by about a month and reads worse. Check the Search Console Core Web Vitals panel in early September before treating the LCP work as banked.

---

## Quarterly, content refresh

`npm run audit:freshness` buckets every page and post by the date that actually reaches a crawler as `dateModified` (the `updated` field when present, else the publish date):

| Bucket | Age | What it means |
|---|---|---|
| fresh | ≤ 90 days | inside the window where content is materially more citation-eligible |
| ageing | 91 to 180 days | one quarter of notice before it drops out |
| stale | > 180 days | refresh or accept it will be passed over |
| undated | no date | worse than stale, because `dateModified` is absent or guessed |

Work the queue oldest first. The script prints it in that order.

**The rule the script cannot enforce.** Only bump `updated:` when the page actually changed in a way a reader would notice. A date moved on an unedited page is a false freshness signal told to a crawler, and this site's entire citation posture rests on not telling those. If a post does not need editing, leave the date alone and let it age honestly.

---

## When a new keyword shows up

A new feature page is one data entry, not a build task. Add an object to `src/data/featurePages.js` (or `featurePagesSecondBatch.js`) and the route, sitemap entry, footer link, llms.txt line and schema all follow from it. Then run `node scripts/generate-llms-txt.mjs` to refresh the committed `public/llms.txt`, which a test enforces.

Two guards will hold you to the standard, so expect them:

- `src/data/__tests__/blog-internal-links.test.js` requires every feature page to be linked from at least one blog post, and forbids a post from spending a page's exact search phrase as anchor text on a different URL.
- `scripts/checkLeadAnswer.mjs` hard-fails a post that opens with a list or a heading instead of a front-loaded answer paragraph.

---

## Off-site, the biggest remaining lever

Brand mentions correlate with AI citations several times more strongly than backlinks do, and this site has no video and no forum presence. That work is operator-owned and already has its own checklist in `docs/ops/off-site-presence-geo.md`. It is the largest uncaptured lever left in this plan.

---

## Known open items carried from earlier phases

- **`app.takkada.com` and `stage.takkada.com` have no robots.txt of their own.** Their origin returns the app's `index.html` for `/robots.txt`. Cloudflare's managed file used to be their only crawler instruction, and turning it off left them with none. The fix is a real `Disallow`-all `robots.txt` in the app repo's `web/` folder, not in this repo. `npm run audit:crawlers -- https://takkada.com/ https://app.takkada.com/robots.txt` detects and reports the condition.
- **Five screenshots under `public/assets/screenshots/` carry real customer names or balances** and are banned from publication: `invoice-detail`, `share-ledger`, `bankbook`, `inventory-supplier`, `party-list`. They ship to the CDN and are fetchable by URL whether or not a page links them. `einvoice-eway.webp` is a sixth, it names a real party, and it is live on the homepage today. Recommend pulling it and re-capturing.
- **Four Phase 4 pages describe screens the library has no safe capture of** (bank statement import, godown-wise stock, credit and debit notes, handwritten order). They ship honest by leading with a real adjacent screen and describing only what is in the frame. A capture pass would materially improve them.
