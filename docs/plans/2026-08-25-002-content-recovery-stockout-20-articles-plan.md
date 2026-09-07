---
title: "content: 20-article Recovery dashboard + Stockout control round (Plan 2 of 3)"
type: content
status: completed
created: 2026-08-25
executor: Cursor + Grok 4.6 (high). No Claude-specific tooling is assumed anywhere in this file.
---

# content: 20-Article Recovery Dashboard + Stockout Control Round (Plan 2 of 3)

**Target repo:** `takkada website/landing` (this repo). All paths are relative to the repo root. Sibling plans: `2026-08-25-001-content-reports-depth-whatsapp-20-articles-plan.md` (Plan 1) and `2026-08-25-003-content-beats-visits-team-sales-20-articles-plan.md` (Plan 3). Run the three plans serially (each appends to the tail of the same `ARTICLES` list in `scripts/generate-blog-images.py` and each can move the inbound-link counts the test ratchets on). If a second plan must start before the first is merged, its branches rebase on `main` before opening a PR, resolve the tail conflict in `scripts/generate-blog-images.py`, and re-run the inbound-link test.

---

## How to run this plan in Cursor (read first)

1. Open the folder `takkada website/landing` as the workspace root. Nothing outside it is needed.
2. Work in the order U0 → U4. U5 is reference material for a future round and is never executed. Each unit ends with a gate; do not start the next unit until the gate is green.
3. This plan is the executor's only instruction set. `scripts/publish-blogs.sh` and `docs/plans/aeo-seo-blog-engine.md` are stale and must not be followed.
4. Before writing any post, read in full: `CLAUDE.md` (sections 5, 9, 10, 11, 12), `content/blog/dealer-scheme-management-tally.md` (tone and structure gold standard), `content/blog/salesman-wise-collection-accountability.md` (nearest recovery-style post) and `content/blog/stock-summary-report-tally-mobile.md` (nearest stock post).
5. Every product claim in every post must trace to a row in the SAFE table below. If a sentence needs a fact that is not there, cut the sentence. Never look for it in the app repos and never guess.
6. **This round has one hard posture decision (see "Stockout posture" below): the stockout half is written as problem-space education plus the stock reports that are live today. It does not describe a Takkada stockout feature.** Do not soften this because the topic feels thin; the topic is strong on its own.
7. Grok tends toward marketing cadence. After drafting each post, do one rewrite pass asking "would a competitor's site carry this exact sentence?" If yes, rewrite with a concrete scenario (party name, rupee figure, time of day). Read every post aloud once before the unit gate.

---

## Summary

Write and publish 20 AEO+SEO articles in two halves of 10:

- **Recovery (R1–R10):** the Recovery view inside Collect: follow-up log, promise-to-pay, the morning daily brief card, per-customer recovery owner, the Team board (Recovered / Outstanding / Speed), the Habits view, reminder cadence presets and custom cadence, and "nobody has chased this customer". The corpus covers reminders and collection tactics broadly; it has nothing on follow-up logging, promises, recovery ownership, or a team board.
- **Stockout (S1–S10):** stockouts, reorder points, supplier lead time, lost sales measurement, days of cover, fast/slow movers, dead stock, seasonal planning, and why recording Sales Orders is what makes demand visible. The corpus has zero posts on any of these.

Process mirrors the Aug 4 and Aug 8 rounds: pilot post per half (two eyeball gates), cluster PRs, images in the same PR, claims verified against the SAFE table, merge to `main` = Cloudflare deploy = live.

### Stockout posture (decision, 2026-08-25)

The app's Stock Control screens (Reorder Now, Suppliers, Season Plan, Lost Sales) exist in code but are a dark launch: not customer-visible, switched on for one company on request, with supplier data unpopulated for every customer and an open performance defect at scale. None of that may be described on the site. The ten stockout posts therefore:

- Teach the method (reorder point, lead time, days of cover, lost-sales measurement) with worked examples a distributor can do with Tally data and a notebook.
- Use only the live surfaces: the Inventory report (Stock and Velocity tabs), Stock Summary, Godown stock, item-wise sales, Sales Orders on mobile, Pending Orders.
- Never name "Stock Control", "Reorder Now", "Season Plan" or a stockout alert. If Ronak later makes Stock Control customer-visible, the "Widening list" at the end names the exact sentences to update.

---

## Product Truth (verified 2026-08-25 against the live app `origin/main` and the production database)

### SAFE to claim as live product — Recovery

| # | Claim | Wording guidance |
|---|---|---|
| R-S1 | Inside the **Collect** tab there is a **Recovery** view with four tabs: **Parties, Bills, Habits, Team** | Say "Recovery view in Collect"; it is not a separate app section. It is switched on per company on request. Never give an adoption number. |
| R-S2 | **Parties** is the receivables ageing by party (as of today; user-editable ageing slabs); **Bills** is bill-by-bill outstanding | |
| R-S3 | **Habits** shows payment behaviour per customer (how many days they take to pay, median days) and is part of Reports+ | |
| R-S4 | **Follow-up log** per party: channel (call, WhatsApp, in person, other), outcome, a next-action date, an optional **promised amount and promised date**. Entries are append-only; a newer promise supersedes the older one | Outcomes are a fixed set; do not invent names beyond "paid / promised / no answer / disputed"-style plain language. |
| R-S5 | A promise is marked **missed** only after the promised date has passed and no receipt has landed in Tally for that party, with allowance for sync lag | "proven missed", never "flagged instantly". |
| R-S6 | **Daily brief** card each morning: promises due today, follow-ups due today, promises proven missed, receipts awaiting confirmation, top overdue parties, or an explicit "All clear" | It is a card in the app that the owner opens. |
| R-S7 | The daily brief can be **shared** as text through the phone's share sheet (WhatsApp, email, anywhere) | Manual share. See UNSAFE: it is not sent automatically. |
| R-S8 | Each party can have a **recovery owner** (a team member); owners can be reassigned from the app | |
| R-S9 | **Team** board: per member **Recovered**, **Outstanding**, **Speed** (median days to collect), dealers worked, promises kept / missed / open, rank; a roll-up line for the company; and a line naming overdue parties **nobody has chased** | Today it is a set of cards with sort chips; do not describe a sortable table. |
| R-S10 | Reminder cadence has four presets: **Every day / Every 2 days / Every 3 days (default) / Every 7 days**, each with its own before-due nudge and overdue schedule, plus a **custom cadence**: 1 day before due, on the due date, then every N days (1–90) | Company-wide setting; not per party. |
| R-S11 | WhatsApp reminders can carry a **UPI payment link** once the company's payment collection is set up (KYC) | "once payment collection is active", never "every reminder". |
| R-S12 | Reminders and statements go from the Takkada business number (shown as **queued** in the app) or via **"Send from my WhatsApp"** from the owner's own number | |
| R-S13 | "0% MDR on UPI collections, no transaction cap, no monthly fee"; **100+ businesses · ₹17Cr+ collected monthly** | The only permitted traction figures. |

### SAFE to claim as live product — Stock

| # | Claim | Wording guidance |
|---|---|---|
| K-S1 | **Inventory** report with **Stock** and **Velocity** tabs (Velocity = how fast each item moves; part of Reports+) | |
| K-S2 | **Stock Summary** as of any date with item drill-down; **Godown-wise stock** per location, as of any date | Valuation for past dates is quantity-exact at current rate. |
| K-S3 | **Item-wise sales** and **party-wise sales** reports on the phone | |
| K-S4 | **Sales Orders** can be created on the phone and land in Tally as Sales Orders; **Pending Orders** shows orders not yet invoiced (paid add-on, available on request) | |
| K-S5 | Purchase Orders on mobile, including **import from a photo** of a supplier's PO/quotation, land in Tally | Keep to one sentence; do not expand into a PO feature post. |
| K-S6 | Inventory and Stock Summary have **no export**; Velocity exports to PDF/Excel | |

### UNSAFE — never claim

| Banned claim | Why |
|---|---|
| "Takkada sends you a daily recovery brief on WhatsApp" / "brief arrives on WhatsApp every morning" | The automatic send is not built; the brief is a card the owner opens and can share by hand |
| "Sort your team by outstanding / recovered" as a table | The Team tab is cards with sort chips; the table is an unbuilt plan |
| "Edit a customer's phone number from the recovery board" | Not built |
| "Every reminder carries a pay-now link" | Gated on payment-collection onboarding and KYC per company |
| Per-party reminder cadence | Cadence is company-wide |
| "Get an alert when an item is about to stock out" / any low-stock notification | No such alert exists anywhere |
| "See supplier lead times / season plans / reorder quantities in the app" | Dark-launch Stock Control; supplier data is empty for every customer |
| "Takkada shows you the sales you lost" | Not publicly available; and lost sales are only observable where a Sales Order exists |
| "Track sales-order fulfilment end to end" | Not built for real customers |
| "Reorder levels from Tally's reorder master" | The app does not read Tally's reorder-level field |
| Any adoption or usage count; any named-customer figure | Internal only |
| Named-competitor comparison | Not verified this round; use "what to look for" framing |

---

## AEO targeting: write for the question people type into ChatGPT and Claude

Assistant search is conversational: "how do I track promises to pay from customers", "what is a reorder point for a distributor", "how do I know which items are about to run out in Tally". An assistant answers from the passage that most directly and completely answers that question, then cites it. Every post is built around one **AI-search question** (column in the tables below) and follows these rules:

1. **Sentence one of the lead paragraph answers the AI-search question directly, in the words of the question.** Sentence two carries the one caveat a careful answer needs. The rest of the 134–167 words completes the answer so the paragraph stands alone when lifted.
2. **primary_keyword is the short Google query; the AI-search question is the long assistant query.** The keyword goes in title/meta/slug/one H2; the question appears verbatim as an H2 or FAQ question.
3. **FAQ questions are phrasings people actually type**, first or second person, naming Tally or the report ("Can I log a call with a customer against their outstanding in Tally?"). Answers are 2–4 self-contained sentences that repeat the entity.
4. **Definition first, then the distributor's version.** Every method post (reorder point, days of cover, lead time, lost sales) defines the term in one sentence within the first 100 words, gives the formula in plain words, then a worked example with Indian figures (₹, cases, 30-day terms). Formulas are what assistants quote.
5. **Scope honesty is a citation feature.** "Takkada does not send the brief automatically; you share it from the card" is exactly what an assistant quotes when a user asks "does it WhatsApp me every morning". Say what the product does not do.
6. **Comparison and method posts get a small markdown table** near the top (formula inputs, or preset cadences); assistants lift tables well.
7. **Entity consistency:** "Tally", "distributor" and "wholesaler", "WhatsApp", "UPI", "India". Expand every abbreviation on first use (DSO, FIFO, MOQ).
8. **Recency:** `date` and `updated` are the real publish date. Never backdate.

---

## The 20 Articles (locked)

Categories must be one of the existing values: `Collections`, `How-To`, `Reports`, `Market Reality`, `Comparisons`, `Tally Mobile`. Hubs = R1 and S1; every post in a half links to its hub. The AI-search question must appear verbatim as an H2 or FAQ question and be answered in sentence one of the lead.

### Recovery half

| # | Slug | Working title | primary_keyword | AI-search question | Category |
|---|---|---|---|---|---|
| R1 | `payment-recovery-dashboard-for-distributors` | A Payment Recovery Dashboard for Distributors: Parties, Bills, Habits, Team | payment recovery dashboard | What should a payment recovery dashboard show a distributor? | Collections |
| R2 | `customer-follow-up-log-for-collections` | Keep a Follow-up Log Against Every Outstanding Customer | payment follow up log | How do I keep track of follow-up calls with customers who owe me money? | How-To |
| R3 | `promise-to-pay-tracking-distributors` | Promise to Pay: Record It, Date It, Know When It Was Broken | promise to pay tracking | How do I track promises to pay from my customers? | Collections |
| R4 | `daily-collection-brief-for-distributor-owners` | The Morning Collection Brief: What to Look at Before the First Call | daily collection brief | What should I check every morning to collect payments faster? | Collections |
| R5 | `assign-recovery-owner-per-customer` | One Owner per Outstanding Customer: Assigning Recovery Responsibility | collection owner per customer | How do I assign each customer's outstanding to one salesman for follow-up? | How-To |
| R6 | `collection-team-board-recovered-outstanding-speed` | Recovered, Outstanding, Speed: Reading a Collection Team Board | collection team leaderboard | How do I compare my salesmen on payment collection? | Collections |
| R7 | `how-often-to-send-payment-reminders-cadence` | How Often to Send Payment Reminders: Presets and a Custom Cadence | payment reminder frequency | How often should I send payment reminders to customers? | How-To |
| R8 | `overdue-customers-nobody-has-chased` | The Overdue Customers Nobody Has Chased | unchased overdue customers | How do I find overdue customers that no one on my team has followed up with? | Collections |
| R9 | `customer-payment-speed-median-days-to-pay` | Payment Speed: Median Days to Pay per Customer and per Salesman | customer payment speed report | How do I measure how many days each customer takes to pay me? | Reports |
| R10 | `vasuli-ka-dashboard-mobile-par` | Vasuli ka Dashboard Mobile par: Kaun Kitna Baaki, Kisne Kab Promise Kiya (Hinglish) | vasuli dashboard | Vasuli ka dashboard mobile par kaise dekhe? | Collections |

### Stockout half

| # | Slug | Working title | primary_keyword | AI-search question | Category |
|---|---|---|---|---|---|
| S1 | `stockout-control-for-distributors-india` | Stockout Control for Distributors: A Method You Can Run From Tally Data | stockout control distributor | How do distributors avoid stockouts using Tally data? | Market Reality |
| S2 | `reorder-point-formula-for-distributors` | The Reorder Point Formula for Distributors (With a Worked Example) | reorder point formula distributor | How do I calculate a reorder point for a distribution business? | How-To |
| S3 | `supplier-lead-time-tracking-for-distributors` | Track Supplier Lead Time from Your Own Purchase Register | supplier lead time tracking | How do I calculate supplier lead time from my purchase records? | How-To |
| S4 | `lost-sales-due-to-stockout-how-to-measure` | Lost Sales Due to Stockout: Why Your Invoices Cannot Show Them | lost sales due to stockout | How do I measure sales lost because of stockouts? | Market Reality |
| S5 | `days-of-inventory-cover-distributor` | Days of Cover: How Many Days Your Current Stock Lasts | days of inventory cover | How do I calculate how many days of stock I have left? | How-To |
| S6 | `fast-moving-slow-moving-items-report-tally` | Fast-Moving and Slow-Moving Items from Tally on Your Phone | fast moving slow moving items tally | How do I find fast-moving and slow-moving items in Tally? | Reports |
| S7 | `dead-stock-identification-tally-distributor` | Finding Dead Stock in Tally Before Year-End | dead stock in tally | How do I identify dead stock in Tally? | How-To |
| S8 | `seasonal-stock-planning-for-distributors` | Seasonal Stock Planning: Last Year's Sales Register Is Your Forecast | seasonal stock planning distributor | How do I plan seasonal stock as a distributor? | Market Reality |
| S9 | `why-record-sales-orders-in-tally-demand-visibility` | Why Recording Sales Orders in Tally Is the Only Way to See Real Demand | why record sales orders in tally | Should I record sales orders in Tally or just invoices? | Tally Mobile |
| S10 | `stock-khatam-hone-se-pehle-kaise-pata-kare` | Stock Khatam Hone se Pehle Kaise Pata Kare (Hinglish) | stock khatam hone se pehle | Stock khatam hone se pehle kaise pata chale? | How-To |

Existing posts to cross-link from (never duplicate their keyword): `how-indian-distributors-manage-collections`, `salesman-wise-collection-accountability`, `whatsapp-payment-reminder-for-distributors`, `automate-payment-reminders-tally`, `scheduled-payment-reminders-tally`, `send-reminders-from-your-own-whatsapp-number`, `receivables-ageing-on-mobile-tally`, `days-sales-outstanding-distributor-india`, `collection-efficiency-ratio-formula-india`, `stock-summary-report-tally-mobile`, `item-wise-sales-report-tally`, `godown-wise-stock-report-tally-mobile`, `salesman-order-to-tally-without-reentry`, `bakaya-kaise-vasool-kare-distributor`, `udhar-vasuli-kaise-kare-distributor`.

Feature landing pages to link **to** (use the exact search phrase as anchor text only when linking to that page): `/payment-reminder-tally` ("Payment reminder from Tally"), `/send-payment-reminders-automatically` ("send payment reminders automatically"), `/debtor-ageing-report-on-phone` ("Debtor ageing report on phone"), `/outstanding-receivables-on-mobile` ("Outstanding receivables on mobile"), `/godown-wise-stock-on-mobile` ("Godown wise stock on mobile"), `/sales-order-on-mobile` ("Sales order on mobile"), `/salesman-app-tally` ("Salesman app for Tally"). **No post title may begin with any feature page's `searchPhrase`** (the test `src/data/__tests__/blog-internal-links.test.js` checks all 28 pages in `src/data/featurePages*.js`, not only the ones listed here).

---

## Per-Post Contract (locked corpus conventions — deviations fail the build or tests)

- File: `content/blog/<slug>.md`. Slug = filename minus `.md`.
- Frontmatter fields, exactly and in this order: `title, slug, meta_title, meta_description, primary_keyword, date, updated, author, category, excerpt`. Every frontmatter value is double-quoted, dates included (an unquoted date becomes a JS Date and serialises with a `T00:00:00.000Z` suffix into the schema). `author: "founder"`. `date` and `updated` = the publish date. `meta_title` ≤ 60 chars, `meta_description` ≤ 160 chars, `excerpt` 1–3 plain sentences, no links.
- **Lead answer paragraph** first: prose immediately after the frontmatter, before any `##`, 134–167 words (hard band 120–180). `scripts/checkLeadAnswer.mjs` hard-fails a post that opens with a list or heading. New slugs never enter its grandfather list.
- Then `## Key Highlights` (3 atomic, concrete bullets) → `## In This Article` (bullets of the H2s) → 5–7 body H2s, 1,200–1,800 words → `## Frequently Asked Questions` (5–6 pairs: `**Q: …?**` line, then `A: …` paragraph; **no links, bold or italics inside answers**).
- Verbatim closing line as the last paragraph: `Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).`
- Keyword in title, meta_title, meta_description, slug, first 100 words, one H2, one FAQ question. Natural variants count; never force repetitions.
- ≥3 internal links, trailing-slash form `[anchor](/blog/<slug>/)` for posts, `[anchor](/<slug>)` for feature pages. Every target must exist.
- Voice per `CLAUDE.md` §5/§11: banned tokens (seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer, trusted by thousands, millions of, 99.9%), no stylistic em-dashes (full stops instead), no "Not X. Y." contrasts, no three-word fragments, sections end on statements, distributor is the hero, Tally is the neighbour, Hinglish welcome in dialogue. No internal tech names.
- Rupee figures use Indian grouping (₹1,00,000) and are illustrative, never adoption stats.
- Header image: `public/assets/blog/<slug>.png` via `scripts/generate-blog-images.py` (append an `ARTICLES` entry: slug, title, category, tagline ≤ 80 chars). `scripts/checkBlogImages.mjs` fails the build without it, so image and post share a commit.

---

## Implementation Units

### U0. Branch and environment

**Goal:** A clean branch off the live `main`, image tooling working, baseline green.
**Files:** none changed (possibly `.gitignore`).
**Approach:** `git fetch origin`. Create the cluster branches directly off `origin/main` (never off the local checkout, which may sit on an unrelated feature branch): `content/recovery-cluster` / `content/stockout-cluster`. Work each unit on its own cluster branch. The pilot post is committed on the first cluster branch; its draft PR is that cluster's PR, promoted from draft after the go. `npm ci`. Pillow is not on the system Python: `python3 -m venv .venv-blog && .venv-blog/bin/pip install Pillow`; ensure `.venv-blog/` is gitignored. Run `npm test` and `npm run build` on the untouched branch. Note that `npm run build` runs `scripts/submitIndexNow.mjs`, which submits every sitemap URL to IndexNow on every build including local ones; harmless before merge, but not silent.
- Write `scripts/tmp-check-round.mjs` (do NOT commit it; add it to `.git/info/exclude`) that, for every slug in this round, asserts: frontmatter field order and the meta_title ≤60 / meta_description ≤160 limits; the verbatim closing line as the last paragraph; `parseFaqs()` from `src/lib/parseFaqs.js` returning ≥5 pairs with no `[`, `**` or `*` inside any answer; ≥3 internal links whose targets exist under `content/blog/` or in `src/data/featurePages*.js` slugs; `primary_keyword` unique across all of `content/blog/`; and a PNG at `public/assets/blog/<slug>.png`. Run it at every unit gate; it is the runnable form of the per-post test scenarios below.
**Verification:** baseline `npm test` and `npm run build` exit 0.

### U1. Two pilot posts — the hubs (R1, S1)

**Goal:** Lock template, tone and claims wording for each half before scaling; the two eyeball gates.
**Dependencies:** U0.
**Files:** `content/blog/payment-recovery-dashboard-for-distributors.md`, `content/blog/stockout-control-for-distributors-india.md`, two `ARTICLES` entries, two PNGs.
**Approach:** R1 walks an owner's morning through the Recovery view: the daily brief card (R-S6), one promise due today (R-S4/R-S5), the Team board's "nobody has chased" line (R-S9), one reminder cadence decision (R-S10). It states that the brief is shared by hand (R-S7) and that the view is switched on per company on request. S1 is the method hub: a distributor with 400 SKUs and 6 suppliers, four numbers to keep per item (average daily sales, lead time, days of cover, reorder point), which live reports supply the sales side (K-S1/K-S2/K-S3), and why Sales Orders make demand visible (K-S4). It names no Takkada stockout feature.
**Verification:** `npm run lint:content` summary shows `0 warn, 0 fail` and the pass count has risen by the number of new posts (baseline on `origin/main`: `168 posts: 92 pass, 0 warn, 0 fail, 76 legacy`); banned-token and em-dash greps zero; every claim traces to a SAFE row; **Human gate:** push the pilot branch, open its PR as a draft, post the PR URL in the session, and stop. Do not start the next unit until a human replies with a go; an unattended run cannot infer approval.

### U2. Recovery cluster (R2–R10)

**Goal:** The nine remaining recovery posts.
**Dependencies:** U1 approved.
**Files:** `content/blog/customer-follow-up-log-for-collections.md`, `promise-to-pay-tracking-distributors.md`, `daily-collection-brief-for-distributor-owners.md`, `assign-recovery-owner-per-customer.md`, `collection-team-board-recovered-outstanding-speed.md`, `how-often-to-send-payment-reminders-cadence.md`, `overdue-customers-nobody-has-chased.md`, `customer-payment-speed-median-days-to-pay.md`, `vasuli-ka-dashboard-mobile-par.md`; 9 `ARTICLES` entries; 9 PNGs.
**Approach:** R3 explains "proven missed" with the sync-lag allowance in one sentence. R4 is the highest claims-risk post: it describes the card and the manual share and contains no sentence implying an automatic WhatsApp send. R6 describes cards with sort chips, and defines Speed as median days to collect. R7 carries a four-row preset table plus the custom cadence rule (1 day before, on due, then every N days) and states it is company-wide. R9 draws on the Habits tab (Reports+) and the Team board's Speed. R10 is Hinglish in the register of `bakaya-kaise-vasool-kare-distributor.md`. Each links to R1 and ≥2 siblings or existing posts.
**Test scenarios (standing, per post):** build green; FAQ parses to 5+ pairs with no inline links or emphasis in answers; keyword in title, first 100 words and one H2; meta_title ≤60 / meta_description ≤160; slug = filename; no existing post shares the `primary_keyword`; banned-token grep zero; ≥3 resolving internal links; closing line verbatim; PNG present; `npm test` green. Plus: R4 and R1 contain no phrase matching "sends you", "arrives on WhatsApp", "every morning on WhatsApp" (adversarial read against UNSAFE row 1); R6 contains no "table" or "sort by outstanding" phrasing.

### U3. Stockout cluster (S2–S10)

**Goal:** The nine remaining stock posts.
**Dependencies:** U1 approved.
**Files:** `content/blog/reorder-point-formula-for-distributors.md`, `supplier-lead-time-tracking-for-distributors.md`, `lost-sales-due-to-stockout-how-to-measure.md`, `days-of-inventory-cover-distributor.md`, `fast-moving-slow-moving-items-report-tally.md`, `dead-stock-identification-tally-distributor.md`, `seasonal-stock-planning-for-distributors.md`, `why-record-sales-orders-in-tally-demand-visibility.md`, `stock-khatam-hone-se-pehle-kaise-pata-kare.md`; 9 entries; 9 PNGs.
**Approach:** S2 gives the formula in words (average daily sales × lead time, plus a safety buffer for the slow supplier) and one worked example in cases and rupees. S3 shows how to read lead time off the purchase register (order date to receipt date) and suggests keeping the median and the worst case, not the average. S4 carries the round's sharpest insight: an invoice register only shows what was sold, so a stockout leaves no trace unless a Sales Order was recorded first; states the principle, never the internal percentage. S6 and S7 use the live Inventory Velocity tab and Stock Summary (K-S1/K-S2, Reports+ named once for Velocity). S8 uses last year's item-wise and party-wise sales (K-S3). S9 is the bridge to Plan 3's order-taking posts and to `/sales-order-on-mobile`. S10 is Hinglish.
**Test scenarios:** standing set from U2, plus: no post contains "Stock Control", "Reorder Now", "Season Plan", "alert", "notification" or "lost sales report" as a product claim (grep, then adversarial read); every formula post has a worked example with at least one ₹ figure and one quantity.

### U4. Build, PR, merge, verify live

**Goal:** All 20 posts live on takkada.com.
**Dependencies:** U2, U3.
**Approach:**
- Ship as two cluster PRs from `content/recovery-cluster` (with pilot R1) and `content/stockout-cluster` (with pilot S1). Commit style: `content(recovery): add Recovery cluster (U2, 9 posts)`. `npm test` and `npm run build` green locally before each push.
- After a cluster's posts land, run `npx vitest run src/data/__tests__/blog-internal-links.test.js`. If `has a floor for every page that has outgrown the default` fails, add each page it names to `LINK_FLOORS` in that file at its new inbound count. That is the intended ratchet, not a test break; never lower an existing number.
- `main` accepts PRs only: `gh pr create --base main`, merge with `gh pr merge --squash` once green. Merge = Cloudflare deploy = live.
- After each merge, poll `curl -s -o /dev/null -w '%{http_code}\n' https://takkada.com/blog/<slug>/` and `https://takkada.com/assets/blog/<slug>.png` for every slug. Cloudflare edges serve 200 and 404 for different slugs of the same deploy for several minutes; re-poll per slug until all are 200.
- Confirm on one live page per PR that the HTML contains `FAQPage` and an `og:image` pointing at the PNG.
- Set this plan's frontmatter to `status: completed` in the last PR.
**Test expectation:** none beyond the build/test gates.

### U5. Widening list (do not execute; keep for the day Stock Control goes public)

If Stock Control becomes customer-visible, these are the sentences to widen, in this order: S1 "four numbers to keep per item" → point at the app; S2 reorder point → "the app computes this from your sales and supplier history"; S3 lead time → "the app keeps median and worst-case lead time per supplier"; S4 → "the Lost Sales view shows the items customers asked for that you could not serve"; S8 → Season Plan. Until then, none of these sentences exist.

---

## Scope Boundaries

**In scope:** 20 posts + 20 images + `ARTICLES` entries in this repo only.

**Deferred to follow-up work:** any Stock Control product post (U5 widening list); a Purchase Order / photo-import post (one sentence allowed here, full post is its own round); recovery Team **table** and phone-edit posts (unbuilt features); a "daily brief on WhatsApp" post (not built); competitor comparisons; homepage or feature-page copy.

**Not in scope:** `scripts/checkLeadAnswer.mjs` grandfather list, `Seo.jsx` preload whitelist, `src/data/featurePages*.js`, pricing content, `siteContent.js`.

---

## Risks

- **Claims drift, both directions:** the recovery Team table and phone edit are built on a branch and may ship soon; the automatic brief may ship later. Do not pre-empt either. Re-verify the SAFE table against the live app on publish day if more than two weeks have passed.
- **The stockout half reads as a feature tease if the writer slips.** The adversarial grep in U3 is the guard; the posts must be useful with a notebook alone.
- **Recovery is switched on per company.** Every recovery post says "available on request" once, never a count.
- **Renderer traps:** do not touch the test-pinned slugs (`biz-analyst-alternative`, `distributor-cash-flow-receivables`), the RETITLED list in `blog-internal-links.test.js`, or any existing post's `updated:` unless its content changed.
