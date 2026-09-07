---
date: 2026-07-21
plan_id: 2026-07-21-001
type: content
status: completed
title: "content: 40 new SEO articles — payables, receivables, bills, reports, autopilot, trust"
origin: docs/brainstorms/2026-07-21-seo-40-articles-payables-reports-autopilot-requirements.md
---

# content: 40 New SEO Articles — Payables, Receivables, Bills, Reports, Autopilot, Trust

**Target repo:** landing (`takkada-enterprise/landing`). All paths repo-relative to the landing root.

## Summary

Publish 40 net-new, distributor-angled blog posts to `content/blog/`, filling the accounting-vocabulary, reports, autopilot, and trust gaps in the 99-post corpus. Each ships under the standard article shape (YAML frontmatter + 134–167-word lead answer + FAQ + ≥3 internal links) and passes the content lint and build gates. Work is sequenced as a pilot article first, then five cluster batches, then a final sitemap/QA pass. Origin: `docs/brainstorms/2026-07-21-seo-40-articles-payables-reports-autopilot-requirements.md`.

---

## Problem Frame

The corpus is deep on Tally-on-mobile, 0% MDR UPI, and collections, but thin-to-empty on what a distributor types when they search an accounting task — accounts payable/receivable, bills payable/receivable, ageing, creditors/debtors — and silent on two buyer stories (autopilot, Reports) and two pre-purchase objections (customisation, own-server hosting). High-intent searchers currently land on generic accounting sites instead of Takkada.

---

## How an article ships here (shared spec — applies to every unit)

Verified against the live repo, not the stale schema files:

- **Mechanism:** a new post is a single `content/blog/<slug>.md` file. `src/lib/blogPosts.js` auto-registers it via `import.meta.glob('/content/blog/*.md')`. No index/registry edit needed.
- **Frontmatter (YAML, matching current posts):** `title`, `slug`, `meta_title` (<60 chars), `meta_description` (<160 chars), `primary_keyword`, `date: "2026-07-21"`, `updated: "2026-07-21"`, `author`, `category`, `excerpt`.
- **Lead-answer convention:** first block after the title is a 134–167-word prose paragraph that fully answers the title question (no `## Key Highlights` or list first). Enforced by `scripts/checkLeadAnswer.mjs` via `npm run lint:content` (also runs inside `npm run build`).
- **Body shape (per `docs/plans/aeo-seo-blog-engine.md`):** Key Highlights (≥3 atomic claims), In This Article, body sections, Frequently Asked Questions (drives FAQPage schema — see `src/routes/__tests__/blog-faq-schema.test.jsx`), and ≥3 internal links to the named hub posts.
- **Voice/claims gates (`CLAUDE.md` §5/§10):** no em-dash breaks, no "Not X. Y." contrast, no banned words (seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer), no internal tech-stack names, no vanity stats. Only confirmed figures: 100+ businesses, ₹17Cr+ collected monthly.
- **Deploy:** PR to `main` (PR-protected; direct push rejected). Cloudflare builds and publishes `dist/` on merge; new URLs live within minutes. Sitemap regenerates via `scripts/generate-sitemap.mjs` (run in build).

Canonical one-liner to thread into each post (per strategy doc): *"Takkada is a Tally-integrated receivables and auto-reconciliation app for Indian distributors, with 0% MDR UPI collection and WhatsApp dispatch."*

---

## The 40 topics (publish-ready: title · slug · target query · angle · interlink hub)

Deconflicted against all 99 live slugs. No collisions. "Interlink" names an existing live post each new post should link to (each post carries ≥3 links total).

### Cluster A — Payables / Receivables / Bills (14) · category: "Payables" / "Collections"

| # | Title | Slug | Target query | Angle / interlink |
|---|---|---|---|---|
| 1 | Accounts Payable in Tally: How Distributors Track What They Owe | `accounts-payable-in-tally-for-distributors` | "accounts payable in tally" | Creditors/purchase bills on mobile; net-new AP hub. → `view-tally-reports-on-mobile` |
| 2 | Accounts Payable vs Accounts Receivable for a Distributor | `accounts-payable-vs-receivable-distributor` | "accounts payable vs receivable" | Disambiguation framed to the cash cycle. → `cash-conversion-cycle-for-distributors` |
| 3 | Sundry Creditors in Tally: Track Supplier Dues on Mobile | `sundry-creditors-tally-mobile` | "sundry creditors tally" | Creditor ledger on phone. → `accounts-payable-in-tally-for-distributors` |
| 4 | Sundry Debtors in Tally: See Who Owes You on Mobile | `sundry-debtors-tally-mobile` | "sundry debtors tally" | Debtor ledger on phone. → `partywise-outstanding-statement-tally` |
| 5 | Bills Payable in Tally, Explained for Wholesalers | `bills-payable-in-tally-explained` | "bills payable meaning tally" | What/when-due; net-new. → `bill-by-bill-against-reference-tally` |
| 6 | Bills Receivable in Tally: Money Your Retailers Owe | `bills-receivable-in-tally-explained` | "bills receivable meaning" | Retailer dues. → `bill-by-bill-against-reference-tally` |
| 7 | Accounts Payable Ageing Report for Distributors (Tally) | `accounts-payable-ageing-report-tally` | "creditors ageing report" | Pay suppliers on time; distinct from receivables ageing. → `aging-report-tally` |
| 8 | Receivables Ageing on Mobile: Catch the 60/90-Day Parties | `receivables-ageing-on-mobile-tally` | "receivables ageing tally mobile" | Mobile-first, actionable. → `aging-report-tally` |
| 9 | How Distributors Cut Receivable Days Without Losing the Retailer | `reduce-receivable-days-distributor` | "how to reduce dso" | Practical playbook. → `dso-for-distributors` |
| 10 | Bill-Wise Payables Tracking in Tally | `bill-wise-payables-tracking-tally` | "bill wise payable tally" | Against-reference for purchases. → `bill-by-bill-against-reference-tally` |
| 11 | Receivables Management for Indian Distributors: The Mobile Playbook | `receivables-management-for-distributors` | "receivables management app india" | Pillar. → `accounts-receivable-automation-tally` |
| 12 | Accounts Receivable Turnover Ratio for Distributors | `accounts-receivable-turnover-ratio-distributor` | "accounts receivable turnover ratio" | Formula + benchmark. → `collection-efficiency-ratio-formula-india` |
| 13 | How to Clean Up Old Receivables Sitting in Your Tally | `clean-up-old-receivables-tally` | "clear old outstanding tally" | Housekeeping. → `bad-debt-write-off-tally` |
| 14 | Payment Due-Date Tracking in Tally So Nothing Slips | `payment-due-date-tracking-tally` | "payment due date tally" | Never miss a due date. → `automate-payment-reminders-tally` |

### Cluster B — Autopilot (8) · category: "Autopilot" / "How-To"

| # | Title | Slug | Target query | Angle / interlink |
|---|---|---|---|---|
| 15 | Tally on Autopilot: What Runs Without You Touching It | `tally-on-autopilot-for-distributors` | "tally automation" | Pillar for the automation story. → `auto-reconciliation-tally` |
| 16 | Put Your Tally Collections on Autopilot | `tally-collections-on-autopilot` | "automate collections tally" | Reminders + links + posting. → `automate-payment-reminders-tally` |
| 17 | Auto Invoice Dispatch: Every Tally Invoice on WhatsApp, Automatically | `auto-invoice-dispatch-tally` | "automatic invoice dispatch whatsapp" | Full Access hero feature. → `tally-whatsapp-invoice-dispatch` |
| 18 | Turn Supplier PDFs into Tally Purchase Entries Automatically | `import-purchase-from-pdf-tally` | "pdf to tally purchase entry" | Import-from-PDF feature; net-new. → `accounts-payable-in-tally-for-distributors` |
| 19 | Hands-Free Reconciliation: Receipts Post to Tally on Their Own | `hands-free-reconciliation-tally` | "automatic reconciliation tally" | Auto-posting. → `tally-payment-reconciliation-on-mobile` |
| 20 | Scheduled Payment Reminders That Send Themselves | `scheduled-payment-reminders-tally` | "scheduled payment reminders" | Cadence angle. → `whatsapp-payment-reminder-for-distributors` |
| 21 | Tally on Autopilot vs Typing Every Voucher: The Time Math | `tally-autopilot-vs-manual-entry` | "automate tally data entry" | Hours-saved framing. → `tally-on-autopilot-for-distributors` |
| 22 | What Takkada Can (and Can't) Automate in Your Tally | `what-takkada-automates-in-tally` | "what does takkada automate" | Scope-honest AEO page. → `what-is-takkada` |

### Cluster C — Reports (10) · category: "Reports"

| # | Title | Slug | Target query | Angle / interlink |
|---|---|---|---|---|
| 23 | Daily Sales Report from Tally on Your Phone | `daily-sales-report-tally-mobile` | "tally sales report mobile" | → `view-tally-reports-on-mobile` |
| 24 | Outstanding Receivables Report for Distributors (Mobile) | `outstanding-receivables-report-tally` | "outstanding report tally mobile" | → `partywise-outstanding-statement-tally` |
| 25 | Party-Wise Sales Report in Tally on Mobile | `party-wise-sales-report-tally` | "party wise sales report tally" | → `view-tally-reports-on-mobile` |
| 26 | Item-Wise / Product Sales Report from Tally | `item-wise-sales-report-tally` | "item wise sales report tally" | → `view-tally-reports-on-mobile` |
| 27 | Salesman-Wise Sales Report for Distributor Teams | `salesman-wise-sales-report-tally` | "salesman wise sales report tally" | → `salesman-app-tally-india` |
| 28 | Purchase Report from Tally on Your Phone | `purchase-report-tally-mobile` | "purchase report tally mobile" | → `accounts-payable-in-tally-for-distributors` |
| 29 | Stock Summary Report from Tally on Mobile | `stock-summary-report-tally-mobile` | "stock summary tally mobile" | → `view-tally-reports-on-mobile` |
| 30 | Cash and Bank Position Report from Tally | `cash-bank-report-tally-mobile` | "bank balance tally mobile" | → `how-to-reconcile-bank-statement-tally-mobile` |
| 31 | Profitability Report for Distributors (Tally on Mobile) | `profit-report-for-distributors-tally` | "gross profit report tally" | → `working-capital-problem-indian-wholesalers` |
| 32 | MIS Reports for Distributors: The Numbers to Check Daily | `mis-reports-for-distributors-tally` | "distributor mis report" | Reports pillar. → `view-tally-reports-on-mobile` |

### Cluster D — Trust / Objection (4) · category: "Trust" / "Market Reality"

| # | Title | Slug | Target query | Angle / interlink |
|---|---|---|---|---|
| 33 | Can My Tally Data Stay on My Own Server? | `tally-data-on-your-own-server` | "self hosted tally app", "on premise tally mobile" | **On-request enterprise option, extra cost** (R7). → `is-it-safe-to-connect-app-to-tally` |
| 34 | Can Takkada Be Customised for My Business? | `is-takkada-customisable` | "custom tally app" | **Bespoke on request** (R8). → `what-is-takkada` |
| 35 | Where Is My Tally Data Stored, and Who Can See It? | `where-is-my-tally-data-stored-takkada` | "is takkada safe", "tally data privacy" | Privacy/storage answer. → `is-it-safe-to-connect-app-to-tally` |
| 36 | Does Takkada Change or Touch My Tally Data? | `does-takkada-change-my-tally` | "will app modify tally data" | Tally stays system of record (positioning guardrail). → `bidirectional-tally-sync-explained` |

### Cluster E — Supporting long-tail (4) · category: "How-To" / "Tally Mobile"

| # | Title | Slug | Target query | Angle / interlink |
|---|---|---|---|---|
| 37 | Creditors vs Debtors in Tally: A Distributor's Cheat Sheet | `creditors-vs-debtors-tally` | "creditors vs debtors tally" | → `accounts-payable-vs-receivable-distributor` |
| 38 | What Is a Purchase Bill in Tally, and How to Track It | `purchase-bill-tracking-tally` | "track purchase bills tally" | → `bills-payable-in-tally-explained` |
| 39 | Advance Received vs Bill Adjustment in Tally | `advance-received-vs-bill-adjustment-tally` | "adjust advance against bill tally" | → `bill-by-bill-against-reference-tally` |
| 40 | Ledger Reconciliation in Tally: Match Your Books to the Party's | `ledger-reconciliation-tally-distributor` | "ledger reconciliation tally" | → `how-to-share-ledger-statement-whatsapp-tally` |

---

## Output Structure

```
content/blog/
  accounts-payable-in-tally-for-distributors.md          # U2 (Cluster A, ×14)
  ...
  tally-on-autopilot-for-distributors.md                 # U4 (Cluster B, ×8)
  ...
  daily-sales-report-tally-mobile.md                     # U3 (Cluster C, ×10)
  ...
  tally-data-on-your-own-server.md                       # U5 (Cluster D, ×4)
  ...
  creditors-vs-debtors-tally.md                          # U6 (Cluster E, ×4)
public/sitemap.xml                                       # regenerated by build (U7)
```

---

## Implementation Units

Each cluster is one batch = one PR to `main` (Cloudflare deploys on merge). Batches are independent after U1; they can ship in any order or in parallel. U-IDs are stable.

### U1. Pilot article — validate the template end-to-end

**Goal:** Prove the article shape, frontmatter, lead-answer lint, FAQ schema, and build all pass on a single real post before scaling to 39 more. De-risks 39 rework loops.
**Requirements:** R1, R3, R4, R5, R6.
**Dependencies:** none.
**Files:** `content/blog/accounts-payable-in-tally-for-distributors.md` (topic #1 — the AP hub; highest downstream link value).
**Approach:** Author topic #1 to the shared spec above. Read 2–3 recent live posts (e.g., `content/blog/accounts-receivable-automation-tally.md`, `content/blog/what-is-takkada.md`) first and match structure, frontmatter keys, and internal-link style exactly. Introduce `category: "Payables"` here.
**Patterns to follow:** `content/blog/what-is-takkada.md` (frontmatter + lead answer + FAQ), `docs/plans/aeo-seo-blog-engine.md` (article shape), `CLAUDE.md` §5 lead-answer + voice rules.
**Test scenarios:**
- Covers R4. `npm run lint:content` passes on the new file (lead answer is prose, 120–180-word band, no leading list/heading).
- Covers R5. Frontmatter has unique `meta_title` <60 chars and `meta_description` <160 chars; ≥3 internal links present; FAQ section yields FAQPage schema (`src/routes/__tests__/blog-faq-schema.test.jsx` still green).
- Covers R6. Grep of the changed file for banned words (seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer) returns nothing; no em-dash stylistic breaks; no internal tech names.
- `npm run build` completes; `dist/blog/accounts-payable-in-tally-for-distributors/index.html` (or equivalent output path) contains real rendered content, not an empty root div.
**Verification:** Pilot article renders in `npm run preview` with a working lead answer, visible FAQ, and live internal links; all four scenarios pass. This locks the template for U2–U6.

### U2. Batch A — Payables / Receivables / Bills (13 remaining)

**Goal:** Publish topics #2–#14 (topic #1 shipped in U1), owning the AP/AR/bills accounting-vocabulary surface.
**Requirements:** R1, R2, R3, R4, R5, R6.
**Dependencies:** U1 (locked template).
**Files:** one `content/blog/<slug>.md` per topics #2–#14 (slugs in the Cluster A table).
**Approach:** Reuse the U1 template. Wire the cluster's internal-link web: newer posts link to the U1 AP hub and to the named existing hubs. Categories "Payables"/"Collections".
**Patterns to follow:** U1 output; Cluster A table for title/slug/keyword/angle/interlink.
**Test scenarios:**
- Covers R4/R5/R6. Every file passes `npm run lint:content`; each has unique title+meta under limits and ≥3 internal links; banned-word grep clean across the batch.
- Covers R1. No new slug collides with an existing `content/blog/*.md` (verify with a slug-uniqueness check across the directory).
- `npm run build` green; spot-check 2 rendered pages in `dist/` for real content.
**Verification:** 13 posts live after merge; each ranks-eligible (unique keyword, canonical, schema) and interlinks correctly in `npm run preview`.

### U3. Batch C — Reports (10)

**Goal:** Publish topics #23–#32, establishing the Reports+ SEO surface.
**Requirements:** R1, R2, R3, R4, R5, R6.
**Dependencies:** U1.
**Files:** one `content/blog/<slug>.md` per topics #23–#32.
**Approach:** Reuse template. Introduce `category: "Reports"`. Each report post names the concrete Tally report, what a distributor decides from it, and how Takkada surfaces it on mobile (ties to the Reports+ add-on without over-claiming). Interlink to `view-tally-reports-on-mobile` (pillar) and the MIS pillar (#32).
**Patterns to follow:** U1 output; `content/blog/view-tally-reports-on-mobile.md`; Cluster C table.
**Test scenarios:**
- Covers R4/R5/R6. Lint, unique title/meta, ≥3 internal links, banned-word grep clean per file.
- Covers R1. Slug-uniqueness check clean.
- `npm run build` green; spot-check 2 rendered report pages.
**Verification:** 10 report posts live; MIS pillar (#32) links out to the other 9; preview walk shows no dead links.

### U4. Batch B — Autopilot (8)

**Goal:** Publish topics #15–#22, building authority on "Tally automation / autopilot" and showcasing Full Access differentiators.
**Requirements:** R1, R2, R3, R4, R5, R6.
**Dependencies:** U1.
**Files:** one `content/blog/<slug>.md` per topics #15–#22.
**Approach:** Reuse template. `category: "Autopilot"`. #15 is the pillar; #22 is the scope-honest "what it can/can't automate" AEO page (name real limits per `CLAUDE.md` honesty rules). Interlink to the existing automation posts (`auto-reconciliation-tally`, `automate-payment-reminders-tally`, `tally-whatsapp-invoice-dispatch`) rather than duplicating them.
**Patterns to follow:** U1 output; Cluster B table; positioning guardrail (Tally is the neighbour, not the enemy).
**Test scenarios:**
- Covers R4/R5/R6. Lint, unique title/meta, ≥3 internal links, banned-word grep clean per file.
- Covers R1. Slug-uniqueness check clean; confirm #17/#19/#20 do not duplicate the existing dispatch/reconciliation/reminder posts (distinct angle, interlink instead).
- `npm run build` green; spot-check 2 rendered pages.
**Verification:** 8 autopilot posts live; each links to (not restates) the relevant existing automation post; #22 honestly names non-automatable cases.

### U5. Batch D — Trust / Objection (4)

**Goal:** Publish topics #33–#36, answering the pre-purchase objections that block cautious distributors.
**Requirements:** R1, R2, R3, R4, R5, R6, R7, R8.
**Dependencies:** U1.
**Files:** one `content/blog/<slug>.md` per topics #33–#36.
**Approach:** Reuse template. `category: "Trust"`. **#33 frames own-server hosting as an on-request enterprise option at additional cost (R7); #34 frames customisation as available on request (R8)** — no over-claim of a shipped self-serve feature. #35/#36 answer data-storage and "does it change my Tally" using the system-of-record guardrail.
**Patterns to follow:** U1 output; `content/blog/is-it-safe-to-connect-app-to-tally.md`; `CLAUDE.md` §5 claims discipline + §10 never-publish list.
**Test scenarios:**
- Covers R7. #33 copy contains no claim that self-hosting is a standard/self-serve plan; presents it as on-request + extra cost.
- Covers R8. #34 presents customisation as on-request, consistent with the done-with-you GTM.
- Covers R4/R5/R6. Lint, unique title/meta, ≥3 internal links, banned-word grep clean per file.
- `npm run build` green; both hosting/customisation pages reviewed against §10 (no over-promise, no roadmap dates).
**Verification:** 4 trust posts live; a claims read-through confirms nothing asserts an unshipped capability as live self-serve.

### U6. Batch E — Supporting long-tail (4)

**Goal:** Publish topics #37–#40, filling the connective-tissue queries that support Clusters A and C.
**Requirements:** R1, R2, R3, R4, R5, R6.
**Dependencies:** U1.
**Files:** one `content/blog/<slug>.md` per topics #37–#40.
**Approach:** Reuse template. Categories "How-To"/"Tally Mobile". These interlink heavily into Cluster A (creditors/debtors, purchase bills, advance-vs-adjustment, ledger reconciliation).
**Patterns to follow:** U1 output; Cluster E table.
**Test scenarios:**
- Covers R4/R5/R6. Lint, unique title/meta, ≥3 internal links, banned-word grep clean per file.
- Covers R1. Slug-uniqueness check clean.
- `npm run build` green; spot-check 2 rendered pages.
**Verification:** 4 posts live and correctly interlinked into Cluster A/C.

### U7. Final QA + sitemap + interlink audit

**Goal:** Confirm all 40 are live, discoverable, and internally linked as a coherent web before considering the batch done.
**Requirements:** R1, R5, and Success Criteria.
**Dependencies:** U2, U3, U4, U5, U6.
**Files:** `public/sitemap.xml` (regenerated), no hand edits.
**Approach:** Run the full build so `scripts/generate-sitemap.mjs` picks up all 40 new URLs. Walk the rendered site per `CLAUDE.md` §6 (no dead ends, no tone shift). Verify every new post appears in the blog index and sitemap, and that hub posts referenced across clusters resolve.
**Test scenarios:**
- Covers R1. Directory slug-uniqueness check across all of `content/blog/` returns zero duplicates; count of new files = 40.
- Covers R5. Every new URL is present in the regenerated `public/sitemap.xml`; each new page has a canonical `https://takkada.com/...` tag and OG/Twitter tags in `dist/`.
- Internal-link audit: no broken internal `/blog/...` link across the 40 new posts (each named interlink target resolves to a live slug).
- Full `npm run build` + `npm test` green (including `src/data/schema.test.js` pricing guard and blog FAQ schema test).
**Verification:** 40 posts live on `takkada.com/blog`, all in the sitemap and blog index, zero dead links, build + tests green.

---

## Scope Boundaries

- Content markdown files only. No design/component/pricing/nav/pipeline changes; sitemap is auto-regenerated, not hand-edited.
- No competitor-comparison, MDR/UPI, or vertical-collection posts (those clusters are already deep).
- No rewriting/merging/re-dating of the 99 existing posts — new posts only link to them.
- No generic definition-only articles (buyer-intent angle only).

### Deferred to Follow-Up Work

- Category-filter UI in the blog index for the new "Payables"/"Autopilot"/"Reports"/"Trust" tags (only worth doing if the tags prove useful navigation; today `category` is a display tag only).
- OG card image generation for the 40 new posts (`scripts/generate-og-cards.py`) if the batch should have custom social cards rather than the default.

---

## Key Technical Decisions

- **One PR per cluster, pilot first.** U1 locks the template so 39 posts don't each rediscover a lint/schema failure. Clusters are independent PRs so partial progress ships and Cloudflare deploys incrementally.
- **Direct YAML-frontmatter authoring**, not the legacy `blog-drafts` + `scripts/import-seo-drafts.mjs` pipeline (that script is hardcoded to `seo-batch-1.md` and a fixed date). Recent posts use direct frontmatter; it's simpler and avoids editing the import script.
- **New `category` values are safe** — `src/routes/BlogIndex.jsx` renders `post.category` as a free-form tag; no fixed-list validation to update.
- **Interlink, don't duplicate.** Where a topic is adjacent to a live post (dispatch, reconciliation, reminders, ageing), the new post takes a distinct angle and links to the existing one, protecting against cannibalization (R1).

---

## Dependencies / Assumptions

- On-premise/own-server hosting and bespoke customisation are real on-request capabilities at extra cost (from user); U5's R7/R8 keep the copy claim-safe regardless.
- Publishing requires a PR to `main` (PR-protected); Cloudflare builds `dist/` on merge. Content author needs the repo checked out and `npm install` done for local lint/build.

---

## Outstanding Questions

### Deferred to Planning / Execution

- [Affects U1][Execution] Confirm the exact `dist/` output path for a blog post (`dist/blog/<slug>/index.html` vs `dist/<slug>/index.html`) when running the first build — read from the actual build output rather than assuming.
- [Affects U5][User decision, non-blocking] Exact wording of the own-server "extra cost" line (name a price band, or keep it "priced on request"?). Default to "priced on request" per `CLAUDE.md` GTM commercials-are-private rule unless the user specifies.
