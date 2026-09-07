---
title: "content: 20-article Reports depth + WhatsApp share round (Plan 1 of 3)"
type: content
status: completed
created: 2026-08-25
executor: Cursor + Grok 4.6 (high). No Claude-specific tooling is assumed anywhere in this file.
---

# content: 20-Article Reports Depth + WhatsApp Share Round (Plan 1 of 3)

**Target repo:** `takkada website/landing` (this repo). All paths are relative to the repo root. Sibling plans: `2026-08-25-002-content-recovery-stockout-20-articles-plan.md` (Plan 2) and `2026-08-25-003-content-beats-visits-team-sales-20-articles-plan.md` (Plan 3). Run the three plans serially (each appends to the tail of the same `ARTICLES` list in `scripts/generate-blog-images.py` and each can move the inbound-link counts the test ratchets on). If a second plan must start before the first is merged, its branches rebase on `main` before opening a PR, resolve the tail conflict in `scripts/generate-blog-images.py`, and re-run the inbound-link test.

---

## How to run this plan in Cursor (read first)

1. Open the folder `takkada website/landing` as the workspace root. Nothing outside it is needed.
2. Work in the order of the Implementation Units (U0 → U5). Each unit ends with a gate; do not start the next unit until the gate is green.
3. This plan is the executor's only instruction set. `scripts/publish-blogs.sh` and `docs/plans/aeo-seo-blog-engine.md` are stale and must not be followed.
4. Before writing any post, read these three files in full: `CLAUDE.md` (sections 5, 9, 10, 11, 12), `content/blog/dealer-scheme-management-tally.md` (the tone and structure gold standard), and `content/blog/godown-wise-stock-report-tally-mobile.md` (the nearest report-style post).
5. Every product claim in every post must trace to a row in the SAFE table below. If a sentence needs a fact that is not in the SAFE table, cut the sentence. Never look for the fact in the app repos and never guess.
6. Write like a working distributor talks. Grok tends toward marketing cadence; after drafting each post, do one rewrite pass with the single question "would a competitor's site carry this exact sentence?" If yes, rewrite it with a concrete scenario (a party name, a rupee figure, a time of day).
7. Craft review is a real step, not a checkbox: read every new post aloud once before the unit gate.

---

## Summary

Write and publish 20 AEO+SEO blog articles about the depth of Takkada's Reports section (financial statements, action reports, exports, statement options) and the exact ways a report or statement reaches a customer on WhatsApp. The corpus (168 posts) already has one-post coverage of the headline report keywords (sales, purchase, stock summary, MIS, ageing, party-wise, item-wise). It has nothing on Trial Balance / P&L / Balance Sheet on mobile, the Daybook, Sales/Customer Analytics, Cross-sell Gaps, ageing slab customisation, Excel and Tally-format export, the Pending Bills vs Ledger statement choice, FIFO vs bill-wise, or report access control. Those are the gaps this round fills.

Process mirrors the proven Aug 4 and Aug 8 rounds: pilot post first (one eyeball gate), cluster PRs, images in the same PR as their posts, claims verified against the SAFE table, merge to `main` = Cloudflare deploy = live.

---

## Product Truth (verified 2026-08-25 against the live app `origin/main` and the production database)

`origin/main` of the app equals its `stage` branch on the date of verification, so every surface below is live for customers unless marked otherwise.

### SAFE to claim as live product

| # | Claim | Wording guidance |
|---|---|---|
| S1 | The Reports section has two groups: **Financial Statements** (Trial Balance, Profit & Loss, Balance Sheet, MIS Reports) and **Action Reports** (Collections, Bills Receivable, Bills Payable, Sales Analytics, Customer Analytics, Cross-sell Gaps, Inventory, Purchase Analytics, Daybook) | Use these exact report names. |
| S2 | A **"This Financial Year"** band on the Reports screen shows ten register totals (Sales Invoice, Sales Order, Purchase Invoice, Purchase Order, Receipts, Payments, Credit Note, Debit Note, Journal, Contra), each tappable into its register | |
| S3 | Trial Balance, P&L and Balance Sheet are read straight from the Tally books synced to the phone. Balance Sheet drills group → sub-group → ledger. Trial Balance is a flat list (no drill-down) | Never say the Balance Sheet "always balances" (see UNSAFE). |
| S4 | MIS Reports show a 12-month grid with a total column, part of Reports+ | No drill-down exists in MIS; do not imply one. |
| S5 | **Reports+** is a paid add-on bundled into the Copilot plan that unlocks MIS Reports, Sales Analytics, Cross-sell Gaps, Purchase Analytics, the Payment-behaviour tab of Collections and the Velocity tab of Inventory | Pricing and plan names per `CLAUDE.md` §3; never hand-type a rupee price, refer readers to `/pricing`-style pages only via existing internal links. |
| S6 | Collections has two tabs: **Outstanding** and **Payment behaviour** (which customers pay late, how many days they take) | |
| S7 | Receivables ageing lets the user **edit the ageing slabs** (add, remove, reset the day dividers) on the phone; the choice is remembered per company on that device | |
| S8 | The Payments report has a basis toggle: **Bill-wise** or **FIFO** | |
| S9 | Daybook has Today / Yesterday / Last 7 days / Last 30 days / Custom presets and a voucher-type chip | |
| S10 | Ledger statement and godown reports have date presets This FY / This Quarter / This Month / Last Month / Last FY / Custom | Other action reports mostly have **no** date filter (ageing is always as of today). Say so when relevant. |
| S11 | Party search on every report is a search box (type a name) | Not a picker; not a multi-select. |
| S12 | **PDF and Excel export** (a chooser sheet) exists for Trial Balance, P&L, Balance Sheet, Bills Receivable ageing, Bills Payable ageing, MIS, Payments, Purchase Analytics, Sales Analytics, Cross-sell Gaps and Inventory Velocity | |
| S13 | Receivables Ageing and Customer Analytics export to **PDF** in one tap (no Excel). Daybook shares as PDF or as a **CSV** file | Do not call the Daybook file "Excel". |
| S14 | **Tally-format export** (the layout Tally itself prints) exists for five statutory reports: Trial Balance, Balance Sheet, P&L, Bills Payable, Bills Receivable. P&L and Balance Sheet export only for the current period | |
| S15 | Every exported PDF/Excel goes through the phone's **share sheet**, where the user picks WhatsApp (or email, Drive, etc.) | This is the honest phrasing for "share any report on WhatsApp". |
| S16 | A party's **ledger statement** and **pending-bills statement** can be sent on WhatsApp from the party page, the bills page and the ageing report, in two ways: (a) **"Send from my WhatsApp"**, which opens the user's own WhatsApp with the message pre-filled and the PDF going through the share sheet; (b) sent from the Takkada business number, where the app shows the message as **queued** | Never say "sent" for path (b); say queued/goes out. |
| S17 | **Settings › Statements** lets the company choose the statement document: **Ledger Account** (full statement) or **Pending Bills** (only bills awaiting payment), plus one switch **"Include details"** (line items and narration). The choice applies to both Share PDF and WhatsApp send | These are the only two statement options. |
| S18 | Bank details print on the statement/reminder automatically from the company's default bank, and appear in reminder text only when there is no payment link | Not user-configurable; do not describe a toggle. |
| S19 | Access to the Reports tab is **permission-controlled per team member**; a member without the permission does not see reports at all | |
| S20 | On the **web app**, a manual WhatsApp send carries the message text only (also copied to clipboard); the PDF attachment is a phone-only behaviour | Mention only when a post discusses web use. |
| S21 | "0% MDR on UPI collections, no transaction cap, no monthly fee"; **100+ businesses · ₹17Cr+ collected monthly** | The only permitted traction and pricing-adjacent claims. |

### UNSAFE — never claim

| Banned claim | Why |
|---|---|
| "Share any report to WhatsApp in one tap" / "one-tap WhatsApp for every report" | Reports go via the share sheet; on web no report PDF reaches WhatsApp at all; Stock/godown screens have no export |
| "Export any report to Excel" | Ten reports do; ageing, customer analytics, ledger statement are PDF-only; Daybook is CSV |
| "Send the PDF from your own WhatsApp number" as a single action | The deep link carries text; the PDF rides the share sheet |
| "A Balance Sheet that always balances" / "books that tie to Tally to the rupee" | Not proven fleet-wide; the app shows a Difference row when the synced books do not foot |
| "Filter any report by salesman / godown / branch" | No salesman filter exists; godown is its own report, not a filter |
| "Pick your own date range on any report" | Most action reports have no date filter |
| "Choose ageing buckets or bank details on the statement" | Only Ledger/Pending-Bills + "Include details" ship |
| "Drill from Trial Balance into a ledger" | Trial Balance is flat |
| "Reports+ / Stock Control is in general release" | Reports+ is an operator-toggled add-on; Stock Control is not publicly available (see Plan 2) |
| Any adoption count ("109 companies use Reports+") | Internal only. Site-wide rule. |
| Any named competitor comparison of report depth | Not verified this round; use "what to look for" framing |

---

## AEO targeting: write for the question people type into ChatGPT and Claude

Search on AI assistants is conversational and specific: "how do I see my Tally trial balance on my phone", "can I send a Tally ledger statement on WhatsApp", "which report shows customers who pay late in Tally". An assistant answers from the passage that most directly and completely answers that exact question, then cites it. So every post in this round is built around one **AI-search question** (column in the table below) plus 2–3 phrasings of it, and follows these rules:

1. **Sentence one of the lead paragraph answers the AI-search question directly**, in the words of the question ("You can see a Trial Balance from Tally on your phone by …"). Sentence two adds the one caveat a careful answer needs. The rest of the 134–167 words completes the answer so the paragraph stands alone when lifted out of the page.
2. **The primary_keyword is the short-form (Google) query; the AI-search question is the long-form (assistant) query.** Both must appear naturally: the keyword in title/meta/slug/H2, the question as an H2 or FAQ question verbatim.
3. **FAQ questions are the phrasings people actually type**, first person or second person, with the product or Tally named ("Can I export the Balance Sheet to Excel from the Takkada app?"), never marketing questions ("Why choose Takkada?"). Each answer is 2–4 sentences, self-contained, and repeats the entity (Tally, the report name) so it survives being quoted alone.
4. **Definitions and numbers up front.** Any post about a report defines the report in one sentence within the first 100 words, then says what it is for a distributor specifically. Worked examples use concrete Indian figures (₹1,00,000; 30-day terms; 45 parties) because assistants prefer passages with specifics.
5. **Scope honesty is a citation feature.** A sentence like "the Trial Balance on the phone is a flat list; only the Balance Sheet drills to the ledger" is exactly what an assistant quotes when a user asks "does it drill down". Say what the product does not do wherever it clarifies scope.
6. **Comparison posts get a comparison table** (two or three columns, plain markdown) near the top; assistants lift tables well.
7. **Entity consistency:** always "Tally" (not TallyPrime unless the sentence is specifically about the desktop product), "distributor" and "wholesaler", "WhatsApp", "UPI", "India". No abbreviation appears before its expansion.
8. **Recency:** `date` and `updated` are the real publish date. Never backdate.

## The 20 Articles (locked)

Categories must be one of the existing values: `Reports`, `How-To`, `Collections`, `Tally Mobile`, `Market Reality`, `Comparisons`. Hub = #1; every other post links to the hub. Posts marked **(P)** carry the primary WhatsApp-sharing angle. The **AI-search question** must appear verbatim as an H2 or FAQ question and be answered in sentence one of the lead.

| # | Slug | Working title | primary_keyword | AI-search question | Category |
|---|---|---|---|---|---|
| 1 | `tally-reports-for-distributors-daily-checklist` | The Reports a Distributor Should Open Every Day (and Which Ones Live on the Phone) | tally reports for distributors | Which Tally reports should a distributor check daily? | Reports |
| 2 | `trial-balance-tally-mobile` | Trial Balance from Tally on Your Phone: What It Shows and What It Does Not | trial balance tally mobile | How do I see my Tally trial balance on my phone? | Reports |
| 3 | `profit-and-loss-statement-tally-mobile` | Profit and Loss Statement from Tally on Mobile for Distributors | profit and loss tally mobile | Can I see my Tally profit and loss on mobile? | Reports |
| 4 | `balance-sheet-tally-mobile-distributor` | Reading Your Balance Sheet on the Phone: Group to Ledger Drill-Down | balance sheet tally mobile | How do I read my Tally balance sheet on my phone? | Reports |
| 5 | `daybook-tally-mobile` | Daybook from Tally on Your Phone: Today's Vouchers Without Opening the Desktop | daybook tally mobile | How can I see today's Tally entries without opening Tally? | Reports |
| 6 | `customise-ageing-slabs-receivables-tally` | Set Your Own Ageing Slabs for Receivables (0-15, 15-45, 45-90 or Whatever Your Trade Uses) | ageing slabs receivables | Can I change the ageing buckets in a Tally receivables report? | How-To |
| 7 | `customer-payment-behaviour-report-tally` | Which Customers Pay Late: The Payment Behaviour Report | customer payment behaviour report | Which report shows which customers pay late in Tally? | Collections |
| 8 | `sales-analytics-report-tally-distributor` | Sales Analytics from Tally for Distributors: Beyond the Sales Register | sales analytics tally | What sales analytics can I get from Tally data as a distributor? | Reports |
| 9 | `customer-analytics-report-tally` | Customer Analytics from Tally: Who Buys, How Often, How Much | customer analytics tally | How do I find my top customers and how often they buy from Tally? | Reports |
| 10 | `cross-sell-gap-report-distributors` | The Cross-sell Gap Report: Items Your Customers Should Be Buying From You | cross sell report distributor | How do I find which items a customer is not buying from me? | Reports |
| 11 | `financial-year-totals-tally-mobile` | This Year's Sales, Purchases, Receipts and Payments at a Glance | financial year totals tally | How do I see this year's total sales and purchases from Tally on my phone? | Tally Mobile |
| 12 | `export-tally-report-to-excel-from-mobile` | How to Export a Tally Report to Excel from Your Phone | export tally report to excel from mobile | Can I export a Tally report to Excel from my phone? | How-To |
| 13 | `share-tally-report-pdf-on-whatsapp` **(P)** | How to Share a Tally Report as PDF on WhatsApp | share tally report on whatsapp | How do I send a Tally report on WhatsApp? | How-To |
| 14 | `tally-format-export-trial-balance-balance-sheet` | Tally-Format Export: The Same Layout Your CA Expects, From the Phone | tally format export | Can I export a trial balance in Tally format from my phone for my CA? | How-To |
| 15 | `pending-bills-statement-vs-ledger-statement-whatsapp` **(P)** | Pending Bills or Full Ledger: Which Statement to Send a Customer on WhatsApp | pending bills statement whatsapp | Should I send a customer the full ledger or only pending bills on WhatsApp? | Collections |
| 16 | `send-statement-from-own-whatsapp-vs-business-number` **(P)** | Send a Statement from Your Own WhatsApp or from the Business Number: What Changes | statement from own whatsapp number | Can I send a Tally ledger statement from my own WhatsApp number? | Collections |
| 17 | `mis-report-vs-profit-and-loss-distributor` | MIS Report vs Profit and Loss: Why a Distributor Needs Both | mis report vs profit and loss | What is the difference between an MIS report and a profit and loss statement? | Reports |
| 18 | `bill-wise-vs-fifo-receivables-report` | Bill-wise vs FIFO: Two Ways to Read the Same Receipts | bill wise vs fifo receivables | What is the difference between bill-wise and FIFO receivables in Tally? | Collections |
| 19 | `who-can-see-which-reports-tally-team` | Who Can See Which Reports: Report Access for Your Team | restrict reports access tally | How do I stop my salesman from seeing my Tally reports? | Tally Mobile |
| 20 | `tally-ki-report-mobile-par-kaise-dekhe` | Tally ki Report Mobile par Kaise Dekhe (Hinglish) | tally report mobile par kaise dekhe | Tally ki report mobile par kaise dekhe? | How-To |

Existing posts to cross-link from (never duplicate their keyword): `view-tally-reports-on-mobile`, `mis-reports-for-distributors-tally`, `aging-report-tally`, `receivables-ageing-on-mobile-tally`, `outstanding-receivables-report-tally`, `party-wise-sales-report-tally`, `item-wise-sales-report-tally`, `purchase-report-tally-mobile`, `stock-summary-report-tally-mobile`, `profit-report-for-distributors-tally`, `how-to-share-ledger-statement-whatsapp-tally`, `send-reminders-from-your-own-whatsapp-number`, `cash-bank-report-tally-mobile`, `daily-sales-report-tally-mobile`.

Feature landing pages to link **to** (use their exact search phrase as anchor text only when linking to that page; the corpus test enforces this): `/tally-reports-on-mobile` ("Tally reports on mobile"), `/debtor-ageing-report-on-phone` ("Debtor ageing report on phone"), `/share-ledger-statement-whatsapp` ("ledger statement on WhatsApp"), `/outstanding-receivables-on-mobile` ("Outstanding receivables on mobile"), `/multi-company-tally-reports` ("Multi-company Tally reports"). **No post title may begin with any feature page's `searchPhrase`** (the test `src/data/__tests__/blog-internal-links.test.js` checks all 28 pages in `src/data/featurePages*.js`, not only the ones listed here).

---

## Per-Post Contract (locked corpus conventions — deviations fail the build or tests)

- File: `content/blog/<slug>.md`. Slug = filename minus `.md`.
- Frontmatter fields, exactly and in this order: `title, slug, meta_title, meta_description, primary_keyword, date, updated, author, category, excerpt`. Every frontmatter value is double-quoted, dates included (an unquoted date becomes a JS Date and serialises with a `T00:00:00.000Z` suffix into the schema). `author: "founder"`. `date` and `updated` = the publish date (YYYY-MM-DD). `meta_title` ≤ 60 chars, `meta_description` ≤ 160 chars, `excerpt` 1–3 sentences, plain text, no links.
- **Lead answer paragraph** first: prose immediately after the frontmatter, before any `##`, 134–167 words (hard band 120–180), answering the title question in the first two sentences. No list, no heading, no bold line before it. `scripts/checkLeadAnswer.mjs` hard-fails a post that opens with a list or heading. New slugs must never be added to its grandfather list.
- Then `## Key Highlights` (3 bullets, each one atomic, concrete claim) → `## In This Article` (bullet list of the H2s) → 5–7 body H2s, 1,200–1,800 words total → `## Frequently Asked Questions` (5–6 pairs, each `**Q: …?**` on its own line followed by `A: …` paragraph; **no links, no bold, no italics inside answers**; the FAQ parser turns these into FAQPage schema).
- Verbatim closing line as the last paragraph: `Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch. [Book a free demo](https://calendar.notion.so/meet/ronakmalu/takkada).`
- Keyword placement: title, meta_title, meta_description, slug, first 100 words, at least one body H2, one FAQ question. Natural variants count; do not force awkward exact repetitions (corpus median is 2 exact hits per post).
- ≥3 internal links, always trailing-slash form `[anchor](/blog/<slug>/)` for posts and `[anchor](/<slug>)` for feature pages. Every link target must exist in `content/blog/` or be a registered route (the test resolves every internal link).
- Voice per `CLAUDE.md` §5/§11: banned tokens (seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer, trusted by thousands, millions of, 99.9%), no stylistic em-dashes anywhere (use full stops), no "Not X. Y." / "It is not X, it is Y" contrasts, no three-word fragments for emphasis, sections end on statements, distributor is the hero, Tally is the neighbour not the enemy, Hinglish welcome in dialogue. No internal tech names (Vite, Supabase, Flutter, AiSensy, Cashfree).
- Rupee figures use Indian grouping (₹1,00,000) and are illustrative scenarios, never adoption stats.
- Header image: one `public/assets/blog/<slug>.png` per post, generated by `scripts/generate-blog-images.py` (append an entry to its `ARTICLES` list: slug, title, category, tagline ≤ 80 chars). `scripts/checkBlogImages.mjs` fails the build if any slug lacks its PNG, so the image lands in the same commit as its post.

---

## Implementation Units

### U0. Branch and environment

**Goal:** A clean branch off the live `main`, with the image tooling working.
**Files:** none changed.
**Approach:**
- `git fetch origin`. Create the cluster branches directly off `origin/main` (never off the local checkout, which may sit on an unrelated feature branch): `content/reports-cluster-a` / `-b` / `-c`. Work each unit on its own cluster branch. The pilot post is committed on the first cluster branch; its draft PR is that cluster's PR, promoted from draft after the go.
- `npm ci` (or `npm install`) so `npm test` and `npm run build` run.
- Pillow is not on the system Python. Create a venv once: `python3 -m venv .venv-blog && .venv-blog/bin/pip install Pillow`. Do not commit the venv (confirm `.gitignore` covers it; if not, add `.venv-blog/` to `.gitignore` in this PR).
- Run `npm test` and `npm run build` once on the untouched branch to confirm the baseline is green before any content lands. Note: `npm run build` includes `scripts/submitIndexNow.mjs`, which submits every sitemap URL to IndexNow on every build, including local ones. This is harmless before merge (unpublished slugs will 404 for a crawler until Cloudflare deploys) but means the local build is not a silent step.
- Write `scripts/tmp-check-round.mjs` (do NOT commit it; add it to `.git/info/exclude`) that, for every slug in this round, asserts: frontmatter field order and the meta_title ≤60 / meta_description ≤160 limits; the verbatim closing line as the last paragraph; `parseFaqs()` from `src/lib/parseFaqs.js` returning ≥5 pairs with no `[`, `**` or `*` inside any answer; ≥3 internal links whose targets exist under `content/blog/` or in `src/data/featurePages*.js` slugs; `primary_keyword` unique across all of `content/blog/`; and a PNG at `public/assets/blog/<slug>.png`. Run it at every unit gate; it is the runnable form of the per-post test scenarios below.
**Verification:** baseline `npm test` and `npm run build` both exit 0; branch is based on `origin/main`'s current head.

### U1. Pilot post — the hub (#1)

**Goal:** Lock template, tone and claims wording on one post before scaling; this is the one eyeball gate in the round.
**Dependencies:** U0.
**Files:** `content/blog/tally-reports-for-distributors-daily-checklist.md`, `scripts/generate-blog-images.py` (one `ARTICLES` entry), `public/assets/blog/tally-reports-for-distributors-daily-checklist.png`.
**Approach:** Full contract above. The body walks one distributor's day: morning (Collections › Outstanding and the FY band), midday (Daybook, Bills Receivable), evening (Sales Analytics, Customer Analytics if on Reports+), month-end (Trial Balance, P&L, MIS). Each report named exactly as in S1, with one sentence of what it answers and one of what it does not (S3, S4, S10 caveats). Closes with the share path (S15/S16) in one honest paragraph. Links to ≥4 existing report posts and to `/tally-reports-on-mobile` using its exact phrase as anchor.
**Verification:** `npm run lint:content` summary shows `0 warn, 0 fail` and the pass count has risen by the number of new posts (baseline on `origin/main`: `168 posts: 92 pass, 0 warn, 0 fail, 76 legacy`); greps for banned tokens and em-dashes across the file return zero; every claim traces to a SAFE row; **Human gate:** push the pilot branch, open its PR as a draft, post the PR URL in the session, and stop. Do not start the next unit until a human replies with a go; an unattended run cannot infer approval.

### U2. Cluster A — financial statements and registers (#2, #3, #4, #5, #11, #14, #17)

**Goal:** The seven posts about statements, the FY band and Tally-format export.
**Dependencies:** U1 approved.
**Files:** `content/blog/trial-balance-tally-mobile.md`, `profit-and-loss-statement-tally-mobile.md`, `balance-sheet-tally-mobile-distributor.md`, `daybook-tally-mobile.md`, `financial-year-totals-tally-mobile.md`, `tally-format-export-trial-balance-balance-sheet.md`, `mis-report-vs-profit-and-loss-distributor.md`; `scripts/generate-blog-images.py` (7 entries); 7 PNGs.
**Approach:** #2 says plainly the Trial Balance is a flat list and points readers who want drill-down to the Balance Sheet post. #4 explains the group → sub-group → ledger drill and states that a non-zero Difference row means the synced books need attention in Tally, never that the app "fixes" it. #14 lists exactly the five statutory reports and the current-period rule for P&L/BS. #17 explains that MIS is a month-by-month movement view and the P&L is a period result, so the MIS total and the P&L can legitimately differ on closing stock. Each links to the hub and ≥2 siblings or existing posts.
**Test scenarios (standing, per post):** build green; FAQ parses to 5+ pairs with no inline links or emphasis in answers; keyword in title, first 100 words and one H2; meta_title ≤60 / meta_description ≤160; slug = filename; no existing post shares the `primary_keyword`; banned-token grep zero; ≥3 resolving internal links; closing line verbatim; PNG exists; `npm test` green.

### U3. Cluster B — action reports (#6, #7, #8, #9, #10, #18, #19)

**Goal:** The seven posts about Collections, ageing slabs, analytics, cross-sell, FIFO and report permissions.
**Dependencies:** U1 approved.
**Files:** `content/blog/customise-ageing-slabs-receivables-tally.md`, `customer-payment-behaviour-report-tally.md`, `sales-analytics-report-tally-distributor.md`, `customer-analytics-report-tally.md`, `cross-sell-gap-report-distributors.md`, `bill-wise-vs-fifo-receivables-report.md`, `who-can-see-which-reports-tally-team.md`; 7 image entries; 7 PNGs.
**Approach:** #6 uses a real trade example (pharma 0-7-15-30, agri-input 0-45-90-120) and states the slabs are remembered per company on that phone. #7 and #8 and #10 name Reports+ once each as the plan tier, never with an adoption number. #18 explains bill-wise vs FIFO with one ₹ worked example (three bills, one part payment). #19 is scope-honest: the Reports tab permission is all-or-nothing per member; per-report permissions are not claimed. Links to `/debtor-ageing-report-on-phone` from #6 with its exact phrase as anchor.
**Test scenarios:** standing set from U2, plus: #19 contains no sentence that implies per-report or per-salesman report filtering (adversarial read against the UNSAFE table).

### U4. Cluster C — WhatsApp share and Hinglish (#12, #13, #15, #16, #20)

**Goal:** The five posts that carry the WhatsApp-sharing angle and the Hinglish entry.
**Dependencies:** U1 approved.
**Files:** `content/blog/export-tally-report-to-excel-from-mobile.md`, `share-tally-report-pdf-on-whatsapp.md`, `pending-bills-statement-vs-ledger-statement-whatsapp.md`, `send-statement-from-own-whatsapp-vs-business-number.md`, `tally-ki-report-mobile-par-kaise-dekhe.md`; 5 image entries; 5 PNGs.
**Approach:** #12 lists exactly which reports export to Excel (S12) and which are PDF-only or CSV (S13); this list is the post's value. #13 describes the share sheet honestly (S15) and, in one paragraph, the web difference (S20). #15 and #16 are the highest claims-risk posts in the round: #15 explains the Settings › Statements choice (S17) and the "Include details" switch, nothing more; #16 explains "Send from my WhatsApp" vs the business number, uses "queued" for the business-number path, and links to `send-reminders-from-your-own-whatsapp-number` and `/share-ledger-statement-whatsapp` (exact phrase as anchor). #20 is Hinglish in the register of `godown-ka-stock-mobile-se-kaise-dekhe.md`.
**Test scenarios:** standing set, plus: #13 and #16 contain no "one tap" / "sent" phrasing for the business-number path; #15 names no statement option beyond the two that exist.

### U5. Build, PR, merge, verify live

**Goal:** All 20 posts live on takkada.com.
**Dependencies:** U2, U3, U4.
**Files:** none new.
**Approach:**
- Ship as cluster PRs from branches `content/reports-cluster-a` / `-b` / `-c` (the pilot rides with cluster A). Commit style: `content(reports): add Cluster A statements and registers (U2, 7 posts)`. Each PR runs `npm test` and `npm run build` green locally before push.
- After a cluster's posts land, run `npx vitest run src/data/__tests__/blog-internal-links.test.js`. If `has a floor for every page that has outgrown the default` fails, add each page it names to `LINK_FLOORS` in that file at its new inbound count. That is the intended ratchet, not a test break; never lower an existing number.
- `main` accepts PRs only; open with `gh pr create --base main`, and merge with `gh pr merge --squash` (or the GitHub UI) once green. Merge = Cloudflare deploy = live.
- After each merge, poll the live URLs: `curl -s -o /dev/null -w '%{http_code}\n' https://takkada.com/blog/<slug>/` for every slug in the PR, and the same for `https://takkada.com/assets/blog/<slug>.png`. Cloudflare edges return 200 and 404 for different slugs of the same deploy for several minutes; re-poll per slug until all are 200 rather than reading an early 404 as a broken deploy.
- Confirm on one live page: `curl -s https://takkada.com/blog/<slug>/ | grep -c 'FAQPage'` ≥ 1 and the `og:image` tag points at the PNG.
- Update the frontmatter of this plan to `status: completed` in the last PR.
**Test expectation:** none beyond the build/test gates — no behavioural code changes in this round.

---

## Scope Boundaries

**In scope:** 20 posts + 20 images + `ARTICLES` entries in this repo only.

**Deferred to follow-up work:** posts that mention Stock Control or lost sales (Plan 2 owns those); recovery-board posts (Plan 2); any homepage or feature-page copy change; a report-depth comparison against named competitors (needs a verification round); a `/features` hub entry for reports (separate plan); backfilling lead paragraphs on legacy posts (opportunistic, not this round).

**Not in scope:** any change to `scripts/checkLeadAnswer.mjs`'s grandfather list, `Seo.jsx` preload whitelist, `src/data/featurePages*.js`, pricing content, or `siteContent.js`.

---

## Risks

- **Claims drift:** the SAFE table was verified 2026-08-25. If more than two weeks pass before a cluster ships, re-read the table against the live app before merging (site rule: refresh claims on publish day). Anything not re-verifiable stays off the site.
- **Balance Sheet Difference row:** #4 must not promise a balanced sheet; readers whose books do not foot will see the Difference row and the post should have told them what it means.
- **Cannibalisation:** the corpus already ranks for the headline report terms. Every new post targets a narrower phrase; if a `primary_keyword` collides with an existing post's, change the new one, never the old.
- **Renderer traps:** do not touch the test-pinned slugs (`biz-analyst-alternative`, `distributor-cash-flow-receivables`), the four RETITLED posts in `blog-internal-links.test.js`, or any existing post's `updated:` date unless its content actually changed.
