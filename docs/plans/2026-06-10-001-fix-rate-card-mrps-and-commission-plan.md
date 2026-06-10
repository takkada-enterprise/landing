---
title: "fix: Update landing MRPs to MD rate card and remove commission percentages"
type: fix
status: completed
date: 2026-06-10
depth: lightweight
---

# fix: Update landing MRPs to MD rate card and remove commission percentages

## Summary

Two content corrections to the takkada landing site (`takkada website/landing`, repo `takkada-enterprise/landing`):

1. **Repricing** — bring the four plan MRPs in line with the June 2026 Master Distributor Rate Card (`~/Downloads/Takkada_MD_Rate_Card (1).pdf`). Plan prices are the single source of truth in `src/data/siteContent.js`; they propagate to the Home pricing section and the `Product`/`Offer` JSON-LD automatically. Two hardcoded price-range strings in `Home.jsx` must be updated by hand.
2. **De-percentaging the Partner page** — remove every explicit commission *percentage* from `/partners`. The product decision: the public site states that partners earn commission, but the specific percentage is confirmed only in the partner agreement (already the closing line of the FAQ answer).

Per user decision, no plan-price table is added to the Partner page — prices continue to live only in the pricing section.

### Rate card → site mapping (Annual MRP, GST extra)

| Plan | Current site | Rate card | Change |
|---|---|---|---|
| View Only | ₹2,500 | ₹2,700 | +200 |
| Voucher Model | ₹4,500 | ₹4,500 | none |
| Collections Model | ₹6,000 | ₹6,480 | +480 |
| Full Access | ₹7,500 | ₹7,200 | −300 |

New price **range** = ₹2,700 (low) to ₹7,200 (high). Add-on prices (Auto Dispatch ₹1,500, WhatsApp pack ₹2,000, Extra user ₹3,000, Extra business ₹1,000) already match the rate card and are unchanged.

---

## Problem Frame

- The site advertises stale MRPs (View Only, Collections, and Full Access are all wrong vs. the current rate card). The JSON-LD `Offer` prices are derived from the same data, so search/AEO surfaces also carry the wrong numbers.
- The Partner page publishes hard commission percentages ("50% commission", "56% more commission"). These are commercially sensitive and not meant to be fixed public figures — they belong in the partner agreement. The user wants them removed from outbound content.

## Scope Boundaries

**In scope**
- Four plan prices in `src/data/siteContent.js` (only three values actually change).
- Two hardcoded price-range strings in `src/routes/Home.jsx` (meta description + pricing section title).
- All explicit commission-percentage mentions on `src/routes/Partners.jsx` (hero copy, SEO description, FAQ answer).

**Out of scope / explicitly NOT touched**
- Add-on prices (already correct).
- Non-commission percentages elsewhere on the site — `">15% Cash"` cash-flow stat (`siteContent.js`), `"1.82%"` credit-card MDR FAQ (`siteContent.js`), `"95% confidence"` reconciliation copy (`AutoReconciliation.jsx`). These are not commission and stay.
- The 6-month / partner-fee / MD-fee figures from the rate card — that document is "for Master Distributor use only, not for circulation to end customers", so none of it goes on the public site.
- No new pricing table on the Partner page (user decision).

### Deferred to Follow-Up Work
- Updating the landing repo's own `CLAUDE.md` section 3 (Pricing) and section 4 (GTM "50% commission") to match. These are internal docs, not outbound content; worth syncing so the documented source-of-truth doesn't drift, but optional and separable from the site change. Included as U3 below — drop it if you'd rather keep it out of this commit.

---

## Key Technical Decisions

- **Edit prices at the data layer, not the view.** `src/data/siteContent.js` `pricing.plans[].price` is consumed by both `Home.jsx` (render) and `src/data/schema.js` (`priceNumber()` strips non-digits → `Offer.price`). Editing the data updates the visible cards and the structured data in one place. No schema edit needed.
- **Range strings are hand-maintained.** `Home.jsx` has two literal `"₹2,500 to ₹7,500"` strings not derived from the data. They must be edited manually to `"₹2,700 to ₹7,200"`. (Optional hardening — deriving the range from `pricing.plans` — is noted as a deferred nicety, not done here, to keep the diff minimal.)
- **Remove the percentage, keep the commission promise.** Rewrites drop the numeric "50%"/"56%" but retain "earn recurring commission … final commercials confirmed in your partner agreement." This honors the voice rules in the landing `CLAUDE.md` (no vanity numbers, lead with specific behavior) and avoids replacing a number with a vague superlative like "much more".
- **Currency glyph consistency.** `siteContent.js` uses the `₹` escape for ₹; new values keep that exact escape form. `Home.jsx` uses a literal `₹`; keep literal there.

---

## Implementation Units

### U1. Update plan MRPs in shared pricing data

**Goal:** Bring the four plan prices in line with the rate card; this also fixes the JSON-LD `Offer` prices for free.

**Requirements:** Repricing (rate-card mapping table above).

**Dependencies:** none.

**Files:**
- `src/data/siteContent.js` — `pricing.plans` price fields (View Only `₹2,500`→`₹2,700`; Voucher unchanged at `₹4,500`; Collections `₹6,000`→`₹6,480`; Full Access `₹7,500`→`₹7,200`).
- `src/data/schema.test.js` — verify/extend if it asserts on derived offer prices (check first; only touch if it pins old values).

**Approach:** Change three string literals (Voucher already correct — leave it byte-for-byte to keep the diff honest). Do not alter `period`, `description`, `features`, `badge`, or `highlighted`. The `Product` schema in `schema.js` reads these via `priceNumber()` and needs no edit.

**Patterns to follow:** existing `pricing.plans` entry shape in `siteContent.js`; `₹` escape convention already in the file.

**Test scenarios:**
- Covers repricing. Assert `pricing.plans` contains exactly the prices ₹2,700 / ₹4,500 / ₹6,480 / ₹7,200 mapped to View Only / Voucher Model / Collections Model / Full Access respectively (add a small unit test in `src/data/` if none exists, or extend `schema.test.js`).
- Schema derivation: assert `productSchema().offers` (or equivalent) yields numeric `price` values `2700, 4500, 6480, 7200` with `priceCurrency: "INR"`, proving the `priceNumber()` strip still works on the new strings (no stray separators).

**Verification:** Home pricing cards show the four new amounts; `dist/**/index.html` after build contains the new `Offer` prices in the JSON-LD; no old value (`2,500`, `6,000`, `7,500`) remains in `siteContent.js`.

---

### U2. Update hardcoded price-range strings and remove commission percentages

**Goal:** Fix the two literal price-range strings in `Home.jsx` and strip every explicit commission percentage from the Partner page while preserving the commission promise.

**Requirements:** Repricing (range strings); De-percentaging the Partner page.

**Dependencies:** U1 (range bounds follow from the new low/high).

**Files:**
- `src/routes/Home.jsx`
  - meta `description` (line ~147): `"₹2,500 to ₹7,500/year"` → `"₹2,700 to ₹7,200/year"`. Keep under 160 chars (per CLAUDE.md §9).
  - pricing section `<h2>` (line ~478): `"₹2,500 to ₹7,500 per year. GST extra."` → `"₹2,700 to ₹7,200 per year. GST extra."`
- `src/routes/Partners.jsx`
  - hero subtitle (lines ~142-145): remove the `<span className="tabular-nums">56%</span> more commission … over 3 years` construction. Reword to a percentage-free promise of recurring commission on every Tally customer (keep the "product they keep using because reconciliation is gone" idea). Remove the now-orphaned `56%` `tabular-nums` span; the `3` years span may stay or go with the rewrite.
  - `seo.description` (line ~79): drop "56% more recurring commission"; reword to a percentage-free line still under 160 chars with the UPI / reminders / reconciliation proof points.
  - `partnerFaqs` commission answer (lines ~50-51): drop "50% commission" and "100% margin"; state partners earn recurring commission on every plan and renewal, paid by the 5th monthly via UPI, with exact commercials confirmed in the partner agreement. Remove the stale `// TODO: confirm with founder.` comment on line 49 since the percentage is intentionally gone.

**Approach:** Pure copy edits. Preserve `tabular-nums` on any remaining numerals (the `3` years, the `5th`, `20`-minute). Do not introduce banned constructions from CLAUDE.md §5 (no em-dash breaks, no "Not X. Y.", no three-word staccato). Leave the non-commission `commission`-word usages that carry no percentage (benefit card line ~13, FAQ question ~48, dashboard answer ~72) intact — they are fine without a number.

**Patterns to follow:** surrounding Partner-page voice; `tabular-nums` utility usage already in the file.

**Test scenarios:**
- This unit is copy-only (no behavioral logic). `Test expectation: none -- prose/JSX content edits; correctness is verified by grep + build + visual walk, not unit assertions.`
- Guard check (optional, cheap): a repo grep asserting no `%` appears adjacent to "commission" in `src/routes/Partners.jsx` could be added if a content lint pattern exists; otherwise verified manually below.

**Verification:**
- `grep -nE "[0-9]+%" src/routes/Partners.jsx` returns nothing tied to commission (ideally nothing at all).
- `grep -rnE "₹2,500|₹7,500|2,500 to 7,500" src/routes/Home.jsx` returns nothing.
- `npm run build` passes; meta description and `<title>` stay within CLAUDE.md §9 char limits.
- `npm run preview` walk of `/` (pricing section + `<head>` source) and `/partners` (hero, FAQ) reads cleanly and percentage-free.

---

### U3. (Optional / deferrable) Sync internal pricing docs

**Goal:** Keep the landing repo's documented source-of-truth aligned so it doesn't contradict the shipped site.

**Requirements:** none (internal hygiene; not outbound content).

**Dependencies:** U1.

**Files:**
- `CLAUDE.md` (landing repo) — §3 Pricing plan list (₹2,500/6,000/7,500 → ₹2,700/6,480/7,200); §4 GTM line "Partners earn 50% commission…" → reflect that the public site no longer states a fixed percentage (the agreement governs it).

**Approach:** Documentation-only edit; no code, no tests. Drop this unit entirely if you prefer to keep the commit limited to shipped content.

**Test scenarios:** `Test expectation: none -- documentation edit.`

**Verification:** §3 / §4 figures match `siteContent.js` and the Partner page copy.

---

## System-Wide Impact

- **JSON-LD / AEO:** `Product` → `Offer` prices change automatically with U1. Rebuild required so `dist/` static HTML carries the new structured data (deploy is GitHub Pages on push to `main` per CLAUDE.md §8).
- **SEO meta:** Home meta description string changes (U2) — keep under 160 chars.
- **No data, auth, or backend surface touched.** This is static-site content only; none of the Supabase/Tally rules in the project AGENTS.md apply.

## Risks & Mitigations

- **Risk:** a price string with a thousands-separator that `priceNumber()` mis-parses. *Mitigation:* U1 test asserts the derived numeric offers equal `2700/4500/6480/7200`.
- **Risk:** rewriting commission copy into a vague superlative that trips CLAUDE.md §5/§7 craft bar. *Mitigation:* keep the concrete promise (recurring commission, paid 5th monthly via UPI, agreement governs commercials); read aloud in the craft-review pass.
- **Risk:** an overlooked stale `₹2,500`/`₹7,500` elsewhere. *Mitigation:* repo-wide grep in verification before commit.

## Execution / Rollout Notes

- Branch from `origin/main` (e.g. `fix/rate-card-mrps-2026-06`); current checkout is `fix/pages-apex-canonical-cname`, do not build on it. Do **not** push to `main` without explicit approval — GitHub Pages auto-deploys from `main`.
- Session-end checklist from landing `CLAUDE.md` §12 applies: `npm run build`, `npm run preview` walk of `/` and `/partners`, confirm `dist/` HTML has real content + new offer prices, banned-word grep, tabular-nums on every ₹ amount and remaining percentage.
- Commit/push only when the user asks.

## Open Questions

None blocking. U3 (internal-doc sync) is the only optional toggle and is the user's call at execution time.
