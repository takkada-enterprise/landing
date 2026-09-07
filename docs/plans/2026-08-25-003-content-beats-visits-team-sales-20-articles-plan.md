---
title: "content: 20-article Beats, visit tracking and team sales round (Plan 3 of 3)"
type: content
status: completed
created: 2026-08-25
executor: Cursor + Grok 4.6 (high). No Claude-specific tooling is assumed anywhere in this file.
---

# content: 20-Article Beats, Visit Tracking and Team Sales Round (Plan 3 of 3)

**Target repo:** `takkada website/landing` (this repo). All paths are relative to the repo root. Sibling plans: `2026-08-25-001-content-reports-depth-whatsapp-20-articles-plan.md` (Plan 1) and `2026-08-25-002-content-recovery-stockout-20-articles-plan.md` (Plan 2). Run the three plans serially (each appends to the tail of the same `ARTICLES` list in `scripts/generate-blog-images.py` and each can move the inbound-link counts the test ratchets on). If a second plan must start before the first is merged, its branches rebase on `main` before opening a PR, resolve the tail conflict in `scripts/generate-blog-images.py`, and re-run the inbound-link test.

---

## How to run this plan in Cursor (read first)

1. Open the folder `takkada website/landing` as the workspace root. Nothing outside it is needed.
2. Work in the order of the Implementation Units (U0 → U6). Each unit ends with a gate; do not start the next unit until the gate is green.
3. This plan is the executor's only instruction set. `scripts/publish-blogs.sh` and `docs/plans/aeo-seo-blog-engine.md` are stale and must not be followed.
4. Before writing any post, read in full: `CLAUDE.md` (sections 5, 9, 10, 11, 12), `content/blog/salesman-visit-tracking-photo-proof.md` (the strongest post in this area and the tone standard for the round), `content/blog/dealer-scheme-management-tally.md`, and the "One day on a beat" tour copy in `src/data/featurePages.js` (search for `salesman-app-tally`) which is already public and safe to echo.
5. Every product claim in every post must trace to a row in the SAFE table below. If a sentence needs a fact that is not there, cut the sentence. Never look for it in the app repos and never guess.
6. **The phrase "beat planning" is the user's shorthand; the product has beats (static dealer lists with one salesman) and a dispatch window, not a scheduler.** Titles and copy say "beats", "beat-wise", "today's load", never "day plan", "route plan", "schedule visits" (see UNSAFE).
7. Grok tends toward marketing cadence. After drafting each post, do one rewrite pass asking "would a competitor's site carry this exact sentence?" If yes, rewrite with a concrete scenario (a beat name like Station Road, a dealer, a time). Read every post aloud once before the unit gate.

---

## Summary

Write and publish 20 AEO+SEO articles about running a field team from Tally with the phone: beats (dealer routes with one salesman each), the dispatch overview and load sheet, delivered tick-off, visit check-in with a camera photo and location, check-out with duration, offline visits, the owner's Field Visits feed and Outcomes, the "unverified" honesty posture, Team Sales targets, commission, Orders-vs-Invoices basis, attribution and reassignment, voucher-type permissions, the customer self-order link, and pending orders. The corpus has six Field Sales posts on the headline terms (salesman app, visit tracking with photo proof, order without re-entry, restrict access, collection accountability, field order app). It has nothing on beats, dispatch, load sheets, delivered status, check-out duration, offline visits, outcomes, targets, commission basis, attribution, or the order link.

This round also fixes live contradictions before any new post repeats them (U1): two feature pages (salesman, and Tally-on-mobile-without-remote-access) say Takkada has no offline mode, which is now wrong for visits; and `salesman-app-tally-india.md` implies invoices and receipts created offline sync later, which is not true of Takkada.

Process mirrors the Aug 4 and Aug 8 rounds: pilot post first (one eyeball gate), cluster PRs, images in the same PR, claims verified against the SAFE table, merge to `main` = Cloudflare deploy = live.

---

## Product Truth (verified 2026-08-25 against the live app `origin/main` and the production database)

Everything in this area is live on production; there is no stage-only tier. Field Visits is switched on per company on request (never state a count). Team Sales, Pending Orders and the Customer Order Link are customer-visible features.

### SAFE to claim as live product

| # | Claim | Wording guidance |
|---|---|---|
| B1 | Dealers are grouped into named **beats**; each beat has one assigned salesman (or none). The screen is called **Beats**; a beat is a name plus a dealer list | A beat has no date, day, sequence or target. |
| B2 | A dealer belongs to **one beat only**; adding a dealer to a new beat moves it and the app shows what moved | |
| B3 | The salesman opens **"Today's load"** for his beat: pending orders from the **last 3 days including today**; older pending orders sit behind an "older pending" chip | Say "3-day window", never "today's plan". |
| B4 | **Dispatch** ("What goes out today"): pending orders across beats totalled into one item list, then a **Load sheet** per beat with the per-dealer breakdown | |
| B5 | **Unassigned** view lists dealers on no beat (full-access members only) | |
| B6 | Orders are ticked **Mark delivered / Mark all delivered**, with Undo. Delivered is a Takkada-only fact; **Tally is not told** an order was delivered | State this scope plainly; it is a positive (Tally stays clean). |
| B7 | **Visit check-in** captures a **camera photo (mandatory, no gallery)**, GPS location with accuracy, device time, the salesman, the dealer, and an optional note | |
| B8 | Check-in is **refused** (no visit recorded) when the phone reports a mock/fake location; the refused attempt is still shown to the owner. An owner can grant a device exemption, in which case the visit is accepted and marked **Unverified** | Trust check = mock-location flag only. Never "root detection" or "tamper detection". |
| B9 | **Check-out** records duration ("At the dealer 12 minutes") and distance from where the visit started ("Checked out 40 m from where the visit started"); duration is shown as unreliable when the check-out leg fails its own trust check | |
| B10 | **Visits work offline**: check-in and check-out are saved on the phone ("Saved on this phone") and upload when signal returns. **Sales orders need signal**, which is why "Take an order" is offered after check-out | This is the exact offline scope. |
| B11 | Owner's **Field Visits** screen: **Feed** (defaults to today, filter by salesman or Everyone) and **Outcomes** | |
| B12 | Tapping a visit photo shows a caption plate: salesman, approximate street address (reverse-geocoded when viewed, prefixed "Approx."), coordinates with accuracy, timestamp | |
| B13 | **Outcomes** splits **"Booked on these visits"** (orders attributed to that salesman) from **"At the dealers visited"** (orders by anyone, payments received, overdue outstanding at those dealers) | Payments are dealer-level, not credited to the salesman. |
| B14 | Orders taken in the field are ordinary **Sales Orders in Tally** (written back), created from the phone after check-out or any time | Order creation is not gated on Team Sales. |
| B15 | **Team Sales**: leaderboard, per-member **targets and commission**, **Orders / Invoices basis** toggle, period Month / Quarter / Year, **reassign** an order's attribution to another member (Tally is not touched by a reassignment) | |
| B16 | **Member permissions**: per-register view/create rights, restrict which ledgers (parties) a member sees, restrict which **voucher types** a member can use | Stock-group restriction exists as an older, separate control; do not detail it. |
| B17 | **Customer Order Link**: a public or personal web link where a buyer places an order with no app or login, priced server-side; the order lands in the merchant's inbox for one-tap conversion; category chips filter the catalogue. Personal links still ask the buyer for a mobile number | Never call it a "portal". |
| B18 | **Pending Orders**: orders not yet invoiced, paid add-on available on request | |
| B19 | Visit capture and the Field Visits screens are **phone-only**; Beats, Dispatch and Team Sales also work on the web | |
| B20 | "0% MDR on UPI collections, no transaction cap, no monthly fee"; **100+ businesses · ₹17Cr+ collected monthly** | The only permitted traction figures. |

### UNSAFE — never claim

| Banned claim | Why |
|---|---|
| "Day plans", "plan tomorrow's route", "schedule visits", "visit targets per day" | No scheduling exists; a beat is a static list; "Today's load" is the 3-day pending-orders window |
| "Map view", "optimised route", "turn-by-turn", "route sequence" | No maps, no ordering |
| "Geo-fenced check-in: he cannot check in unless he is at the shop" | No dealer coordinates, no distance check on check-in |
| "Detects rooted or tampered phones" | Out of scope by design |
| "Outcome types: order / collection / no-order reason" | No outcome picker; a free-text note only. Outcomes is a derived owner report |
| "Delivery status flows back to Tally" | Deliveries are Takkada-only by design |
| "Collections credited to the salesman who visited" / "commission on collections" | Receipts carry no salesman attribution; Payments received is dealer-level |
| "Invoices and receipts created offline sync later" | Only visits are offline-capable; vouchers need signal |
| "Takkada has no offline mode" | Now false for visits (fix the feature page FAQ in U1) |
| "Proven with field teams across India" or any usage figure | Internal only |
| Named-competitor comparison | Not verified; use "what to look for" |

---

## AEO targeting: write for the question people type into ChatGPT and Claude

Assistant search is conversational: "how do I know my salesman actually visited the shop", "what is a beat in FMCG distribution", "how do I make a load sheet for tomorrow's deliveries". An assistant answers from the passage that most directly and completely answers that question, then cites it. Every post is built around one **AI-search question** (column below) and follows these rules:

1. **Sentence one of the lead paragraph answers the AI-search question directly, in the words of the question.** Sentence two carries the one caveat a careful answer needs. The rest of the 134–167 words completes the answer so it stands alone when lifted.
2. **primary_keyword is the short Google query; the AI-search question is the long assistant query.** Keyword in title/meta/slug/one H2; the question verbatim as an H2 or FAQ question.
3. **FAQ questions are phrasings people actually type**, first or second person, naming Tally or the feature ("Does the salesman need internet to check in at a shop?"). Answers are 2–4 self-contained sentences that repeat the entity.
4. **Definition first, then the distributor's version.** "A beat is …", "a load sheet is …", "visit check-in means …" in one sentence within the first 100 words, then what it changes for a 5-salesman distributor with 120 dealers.
5. **Scope honesty is a citation feature.** "Takkada records the photo, the location and the time; it does not track the phone all day" and "delivered is marked in the app and never written into Tally" are exactly what assistants quote for "does it track my salesman's location all day". Say what the product does not do.
6. **Comparison and method posts get a small markdown table** near the top (what a check-in captures; orders basis vs invoices basis; GPS tracker vs geo-tagged photo).
7. **Entity consistency:** "Tally", "distributor" and "wholesaler", "salesman" (the trade's word; "field team" as the plural), "dealer" for the retail party, "WhatsApp", "UPI", "India". Expand abbreviations on first use (GPS, RBAC is never used in copy).
8. **Recency:** `date` and `updated` are the real publish date. Never backdate.

---

## The 20 Articles (locked)

Categories must be one of the existing values: `Field Sales`, `How-To`, `Tally Mobile`, `Market Reality`, `Comparisons`, `Collections`. Hub = #1; every post links to the hub. The AI-search question must appear verbatim as an H2 or FAQ question and be answered in sentence one of the lead.

| # | Slug | Working title | primary_keyword | AI-search question | Category |
|---|---|---|---|---|---|
| 1 | `beat-wise-sales-management-tally-distributors` | Beat-wise Sales Management for Tally Distributors: Beats, Load Sheets, Visits, Orders | beat wise sales management | How do distributors manage salesmen beat-wise with Tally? | Field Sales |
| 2 | `what-is-a-beat-in-distribution-sales` | What Is a Beat in Distribution Sales (and How Many Dealers Fit in One) | what is a beat in sales | What is a beat in FMCG or distribution sales? | Market Reality |
| 3 | `create-beats-and-assign-salesman-mobile` | Create Beats and Assign a Salesman from Your Phone | beat assignment salesman | How do I assign dealers to a salesman's beat? | How-To |
| 4 | `dispatch-load-sheet-for-distributors` | The Dispatch Load Sheet: What Goes Out Today, Beat by Beat | dispatch load sheet | How do I make a load sheet for tomorrow's deliveries? | How-To |
| 5 | `mark-orders-delivered-without-touching-tally` | Mark Orders Delivered Without Touching Tally | order delivery tracking distributor | How do I track which orders were delivered without changing Tally? | Tally Mobile |
| 6 | `geo-tagged-visit-photo-vs-all-day-gps-tracking` | Geo-tagged Visit Photo vs All-day GPS Tracking for Salesmen | geo tagged photo attendance field sales | Is a geo-tagged photo better than GPS tracking for salesmen? | Comparisons |
| 7 | `visit-duration-and-check-out-field-sales` | How Long Was He at the Dealer: Check-out, Duration and Distance | visit duration tracking field sales | How do I know how long my salesman spent at each shop? | Field Sales |
| 8 | `offline-visit-check-in-for-salesmen` | Visit Check-in With No Signal: Saved on the Phone, Uploaded Later | offline field visit app | Does the salesman need internet to check in at a shop? | Field Sales |
| 9 | `field-visit-outcomes-orders-booked-vs-dealers-visited` | Visit Outcomes: Orders Booked on the Visit vs Everything at That Dealer | visit to order conversion field sales | How do I see which salesman visits actually produced orders? | Field Sales |
| 10 | `fake-gps-location-field-sales-what-happens` | Fake GPS on a Salesman's Phone: What the App Does and What It Does Not | fake gps location field sales | How do I stop my salesman from faking his location? | Field Sales |
| 11 | `salesman-targets-and-commission-from-tally` | Salesman Targets and Commission Computed from Tally Sales | salesman target commission tracking | How do I set sales targets and commission for salesmen from Tally data? | Field Sales |
| 12 | `sales-incentive-on-orders-or-invoices` | Incentive on Orders or on Invoices: Pick a Basis and Stick to It | sales incentive on orders or invoices | Should salesman incentive be based on orders or on invoices? | Comparisons |
| 13 | `order-attribution-and-reassignment-salesman` | Who Gets Credit for the Order: Attribution and Reassignment | sales attribution salesman | How do I reassign a sale to a different salesman without changing Tally? | How-To |
| 14 | `customer-self-order-link-for-distributors` | A Self-Order Link for Your Dealers: They Order, You Convert | customer order link whatsapp | How can my dealers place orders on their own without an app? | Field Sales |
| 15 | `pending-orders-not-yet-invoiced-distributor` | Pending Orders: Every Order Not Yet Invoiced, in One List | pending orders report distributor | How do I see all sales orders not yet invoiced in Tally? | Tally Mobile |
| 16 | `gps-tracking-app-for-salesman-what-to-look-for` | GPS Tracking App for Salesmen: What to Look For Before You Buy | gps tracking app for salesman | What should I look for in a salesman tracking app in India? | Market Reality |
| 17 | `voucher-type-permissions-for-team-members-tally` | Let a Salesman Raise Orders but Never an Invoice: Voucher-type Permissions | voucher type permission tally member | How do I let my salesman create sales orders but not invoices? | How-To |
| 18 | `sales-team-leaderboard-for-distributors` | A Sales Team Leaderboard From Your Own Tally Books | sales team leaderboard distributor | How do I rank my salesmen by sales from Tally? | Field Sales |
| 19 | `a-day-on-a-beat-distributor-field-sales-routine` | A Day on a Beat: The Field Sales Routine, Hour by Hour | distributor field sales daily routine | What does a distributor salesman's day look like with a beat app? | Market Reality |
| 20 | `salesman-ki-visit-mobile-se-kaise-track-kare` | Salesman ki Visit Mobile se Kaise Track Kare (Hinglish) | salesman ki visit kaise track kare | Salesman ki visit mobile se kaise track kare? | How-To |

Existing posts to cross-link from (never duplicate their keyword): `salesman-app-tally-india`, `salesman-visit-tracking-photo-proof`, `salesman-order-to-tally-without-reentry`, `restrict-salesman-access-tally`, `salesman-wise-collection-accountability`, `field-order-collection-app-tally`, `salesman-wise-sales-report-tally`, `let-buyers-choose-invoices-to-pay`, `godown-on-sales-invoice-delivery-challan`.

Feature landing pages to link **to** (exact search phrase as anchor text only when linking to that page): `/salesman-app-tally` ("Salesman app for Tally"), `/sales-order-on-mobile` ("Sales order on mobile"), `/delivery-challan-from-mobile` ("Delivery challan from mobile"), `/handwritten-order-to-tally` ("Handwritten order to Tally"), `/godown-wise-stock-on-mobile` ("Godown wise stock on mobile"). **No post title may begin with any feature page's `searchPhrase`** (the test `src/data/__tests__/blog-internal-links.test.js` checks all 28 pages in `src/data/featurePages*.js`, not only the ones listed here). `/salesman-app-tally` has a link floor in that test; adding links to it is fine, removing existing ones is not.

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
**Approach:** `git fetch origin`. Create the cluster branches directly off `origin/main` (never off the local checkout, which may sit on an unrelated feature branch): `content/beats-cluster-a` / `-b` / `-c`. Work each unit on its own cluster branch. The pilot post is committed on the first cluster branch; its draft PR is that cluster's PR, promoted from draft after the go. `npm ci`. Pillow is not on the system Python: `python3 -m venv .venv-blog && .venv-blog/bin/pip install Pillow`; ensure `.venv-blog/` is gitignored. Run `npm test` and `npm run build` on the untouched branch. Note that `npm run build` runs `scripts/submitIndexNow.mjs`, which submits every sitemap URL to IndexNow on every build including local ones; harmless before merge, but not silent.
- Write `scripts/tmp-check-round.mjs` (do NOT commit it; add it to `.git/info/exclude`) that, for every slug in this round, asserts: frontmatter field order and the meta_title ≤60 / meta_description ≤160 limits; the verbatim closing line as the last paragraph; `parseFaqs()` from `src/lib/parseFaqs.js` returning ≥5 pairs with no `[`, `**` or `*` inside any answer; ≥3 internal links whose targets exist under `content/blog/` or in `src/data/featurePages*.js` slugs; `primary_keyword` unique across all of `content/blog/`; and a PNG at `public/assets/blog/<slug>.png`. Run it at every unit gate; it is the runnable form of the per-post test scenarios below.
**Verification:** baseline `npm test` and `npm run build` exit 0.

### U1. Fix the two live offline contradictions

**Goal:** Make the already-public offline claims true before new posts link to them.
**Dependencies:** U0.
**Files:** `src/data/featurePages.js` (the `salesman-app-tally` page's FAQ answer containing "Takkada does not have an offline mode"), `src/data/featurePagesSecondBatch.js` (the `tally-on-mobile-without-remote-access` page's FAQ answer containing "there is no offline mode"), `content/blog/salesman-app-tally-india.md` (the FAQ answer implying invoices and receipts created offline sync to Tally later).
**Approach:** Rewrite both feature-page FAQ answers to the exact scope in B10 (feature-page FAQ answers must stay ≥25 words and contain no `₹`; `src/data/__tests__/feature-pages.test.js` pins that): visit check-in and check-out are saved on the phone without signal and upload later; creating an order, invoice or receipt needs a working data connection. Rewrite the blog FAQ answer the same way, in that post's voice, and bump its `updated:` to the edit date (a real content change). Keep the FAQ question text unchanged in both places so no test pins break; keep answers free of links and emphasis.
**Test scenarios:** `npm test` green (feature-page tests pin the page's structure, not the FAQ prose); `grep -n "does not have an offline mode" src/data/featurePages.js`, `grep -n "there is no offline mode" src/data/featurePagesSecondBatch.js` and `grep -n "created offline are held locally" content/blog/salesman-app-tally-india.md` all return zero; the three answers agree with each other word-for-word on scope.
**Verification:** all three files changed in one commit titled `fix(content): correct offline scope on salesman page and post`; ride in the pilot PR.

### U2. Pilot post — the hub (#1)

**Goal:** Lock template, tone and claims wording before scaling; the one eyeball gate in the round.
**Dependencies:** U1.
**Files:** `content/blog/beat-wise-sales-management-tally-distributors.md`, one `ARTICLES` entry, one PNG.
**Approach:** Full contract. The body follows one distributor (five salesmen, ~120 dealers, beats named after roads) through: creating beats (B1/B2), the morning Dispatch and Load sheet (B3/B4), the salesman's check-in with a camera photo (B7/B8), an order taken after check-out landing in Tally as a Sales Order (B14), delivered tick-off that never touches Tally (B6), and the evening Team Sales view (B15). One paragraph states what the product does not do (no scheduler, no map, no all-day tracking). Links to `/salesman-app-tally` with its exact phrase as anchor and to ≥3 existing Field Sales posts.
**Verification:** `npm run lint:content` summary shows `0 warn, 0 fail` and the pass count has risen by the number of new posts (baseline on `origin/main`: `168 posts: 92 pass, 0 warn, 0 fail, 76 legacy`); banned-token, em-dash and UNSAFE-phrase greps ("day plan", "route plan", "map", "geo-fence", "root") return zero; every claim traces to a SAFE row; **Human gate:** push the pilot branch, open its PR as a draft, post the PR URL in the session, and stop. Do not start the next unit until a human replies with a go; an unattended run cannot infer approval.

### U3. Cluster A — beats, dispatch, orders (#2, #3, #4, #5, #14, #15, #17)

**Goal:** The seven posts on beats, dispatch, delivered status, the order link, pending orders and voucher-type permissions.
**Dependencies:** U2 approved.
**Files:** `content/blog/what-is-a-beat-in-distribution-sales.md`, `create-beats-and-assign-salesman-mobile.md`, `dispatch-load-sheet-for-distributors.md`, `mark-orders-delivered-without-touching-tally.md`, `customer-self-order-link-for-distributors.md`, `pending-orders-not-yet-invoiced-distributor.md`, `voucher-type-permissions-for-team-members-tally.md`; 7 entries; 7 PNGs.
**Approach:** #2 defines a beat in sentence one and gives a rule of thumb for dealers per beat as trade practice, not product. #3 states the one-beat-per-dealer rule and the Unassigned view (B2/B5). #4 explains the 3-day window and the "older pending" chip honestly (B3/B4). #5 leads with why delivered stays out of Tally (B6). #14 never uses "portal" and states the mobile-number step (B17). #15 says "paid add-on, available on request" once (B18). #17 uses the "orders but never an invoice" scenario (B16). Each links to the hub and ≥2 siblings or existing posts; #14 and #15 link to `/sales-order-on-mobile` with its exact phrase.
**Test scenarios (standing, per post):** build green; FAQ parses to 5+ pairs with no inline links or emphasis; keyword in title, first 100 words and one H2; meta_title ≤60 / meta_description ≤160; slug = filename; no existing post shares the `primary_keyword`; banned-token grep zero; ≥3 resolving internal links; closing line verbatim; PNG present; `npm test` green. Plus: #4 contains no "plan", "schedule" or "route order" claim; #5 contains no sentence implying Tally learns delivery status.

### U4. Cluster B — visits and trust (#6, #7, #8, #9, #10, #20)

**Goal:** The six posts on check-in, check-out, offline, outcomes, fake GPS and the Hinglish entry.
**Dependencies:** U2 approved.
**Files:** `content/blog/geo-tagged-visit-photo-vs-all-day-gps-tracking.md`, `visit-duration-and-check-out-field-sales.md`, `offline-visit-check-in-for-salesmen.md`, `field-visit-outcomes-orders-booked-vs-dealers-visited.md`, `fake-gps-location-field-sales-what-happens.md`, `salesman-ki-visit-mobile-se-kaise-track-kare.md`; 6 entries; 6 PNGs.
**Approach:** #6 carries a three-column table (what a geo-tagged photo captures / what all-day GPS captures / what the salesman feels) and the "four facts" argument from `salesman-visit-tracking-photo-proof.md` without repeating its keyword. #7 quotes the exact card wording ("At the dealer 12 minutes", "Checked out 40 m from where the visit started") and the unreliable-duration case (B9). #8 is the exact B10 scope and links to the corrected feature-page FAQ. #9 explains "Booked on these visits" vs "At the dealers visited" and states that payments are dealer-level, never credited to the salesman (B13). #10 is the highest claims-risk post: mock-location refusal, the owner-granted exemption and the "Unverified" label (B8), and a plain statement that there is no root detection and no geo-fence. #20 is Hinglish in the register of `udhar-vasuli-kaise-kare-distributor.md`.
**Test scenarios:** standing set from U3, plus: #10 contains no "root", "tamper", "geo-fence" or "cannot check in unless at the shop" claim; #8 contains no sentence implying invoices or receipts work offline; #9 contains no "commission on collections" phrasing.

### U5. Cluster C — team sales and positioning (#11, #12, #13, #16, #18, #19)

**Goal:** The six posts on targets, commission basis, attribution, the buyer's guide, the leaderboard and the day-on-a-beat narrative.
**Dependencies:** U2 approved.
**Files:** `content/blog/salesman-targets-and-commission-from-tally.md`, `sales-incentive-on-orders-or-invoices.md`, `order-attribution-and-reassignment-salesman.md`, `gps-tracking-app-for-salesman-what-to-look-for.md`, `sales-team-leaderboard-for-distributors.md`, `a-day-on-a-beat-distributor-field-sales-routine.md`; 6 entries; 6 PNGs.
**Approach:** #11 and #18 use the Team Sales surface (B15) with a worked ₹ example and the Month/Quarter/Year periods. #12 carries a two-column table (orders basis vs invoices basis: when credit is given, what a cancellation does, what a partial invoice does). #13 states that reassignment never touches Tally (B15) and that receipts cannot be attributed. #16 is "what to look for", zero named competitors, and includes the honest scope items (no all-day tracking, no map) as buying criteria. #19 is the narrative version of the feature page's six-station tour, hour by hour, with the mobile-only note for visit capture (B19).
**Test scenarios:** standing set, plus: #16 names no competitor; #13 contains no "collections credited" claim.

### U6. Build, PR, merge, verify live

**Goal:** All 20 posts and the two offline fixes live on takkada.com.
**Dependencies:** U3, U4, U5.
**Approach:**
- Ship as cluster PRs from `content/beats-cluster-a` (with U1 and the pilot), `content/beats-cluster-b`, `content/beats-cluster-c`. Commit style: `content(beats): add Cluster A beats and dispatch (U3, 7 posts)`. `npm test` and `npm run build` green locally before each push.
- After a cluster's posts land, run `npx vitest run src/data/__tests__/blog-internal-links.test.js`. If `has a floor for every page that has outgrown the default` fails, add each page it names to `LINK_FLOORS` in that file at its new inbound count. That is the intended ratchet, not a test break; never lower an existing number.
- `main` accepts PRs only: `gh pr create --base main`, merge with `gh pr merge --squash` once green. Merge = Cloudflare deploy = live.
- After each merge, poll `curl -s -o /dev/null -w '%{http_code}\n' https://takkada.com/blog/<slug>/` and `https://takkada.com/assets/blog/<slug>.png` for every slug. Cloudflare edges serve 200 and 404 for different slugs of the same deploy for several minutes; re-poll per slug until all are 200.
- Confirm on one live page per PR that the HTML contains `FAQPage` and an `og:image` pointing at the PNG; confirm `https://takkada.com/salesman-app-tally` no longer contains "does not have an offline mode".
- Set this plan's frontmatter to `status: completed` in the last PR.
**Test expectation:** none beyond the build/test gates.

---

## Scope Boundaries

**In scope:** 20 posts + 20 images + `ARTICLES` entries + the two offline-scope corrections, all in this repo.

**Deferred to follow-up work:** any post that needs scheduling, maps, geo-fencing or outcome codes (write only if those ship); a stock-group restriction post (older control, unverified this round); a Purchase Order / photo-import post; competitor comparisons by name; any further feature-page copy change beyond the U1 FAQ fix.

**Not in scope:** `scripts/checkLeadAnswer.mjs` grandfather list, `Seo.jsx` preload whitelist, the tour stations in `featurePages.js`, pricing content, `siteContent.js`.

---

## Risks

- **"Beat planning" drift:** the single biggest risk is a writer promoting the static beat into a planner. The U2/U3 greps for "plan", "schedule", "route order", "map" are the guard; run them on every post, not only the ones named.
- **Field Visits is switched on per company.** Every visit post says "available on request" once, never a count.
- **Offline claim consistency:** after U1, four places state the offline scope (two feature-page FAQs, the old post FAQ, #8). They must agree word-for-word on scope or an assistant will quote the contradiction.
- **Renderer traps:** do not touch the test-pinned slugs (`biz-analyst-alternative`, `distributor-cash-flow-receivables`), the RETITLED list in `blog-internal-links.test.js` (which includes `salesman-app-tally-india`; its title and its lead-paragraph link to `/salesman-app-tally` must stay), or any other existing post's `updated:` unless its content changed.
