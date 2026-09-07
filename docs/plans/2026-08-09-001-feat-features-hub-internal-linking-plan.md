---
title: "feat: Features hub page, nav link, and blog-to-feature internal linking"
type: feat
status: completed
created: 2026-08-09
---

# feat: Features hub page, nav link, and blog→feature internal linking

**Target repo:** `takkada website/landing` (Vite + React SSG, deploys via Cloudflare on merge to `main`, PR mandatory).

---

## Summary

Give the 26 feature landing pages a real home: a `/features` hub page linked from the top menu (replacing the `#features` homepage anchor in the menu slot), retitle the 3 blog posts that compete head-on with their own feature pages and point each at its feature page, and sweep the blog corpus so every feature page with genuinely related posts gets 3–6 inbound links instead of 1. Extend the existing internal-link test so the new link floor cannot rot.

## Problem Frame

- 26 feature pages hang off the footer only. The nav "Features" item scrolls to a homepage section, not a page. Google reads footer-only pages as afterthoughts; the Clarity data already showed the pre-08-08 feature pages pulled zero search entries until internal links appeared.
- 22 of 26 feature pages have exactly 1 inbound blog link (the test floor). `/salesman-app-tally`, with 9 inbound links, is the best-performing page — the correlation is the point. (Counts use markdown-link parsing, matching `blog-internal-links.test.js` — substring counts overcount via slug prefixes like `/salesman-app-tally-india`.)
- 3 blog posts chase the same phrase as a feature page: `tally-on-mobile.md` (vs `/tally-on-mobile`, head-on, no link to the page), `view-tally-reports-on-mobile.md` (vs `/tally-reports-on-mobile`, no link), `salesman-app-tally-india.md` (vs `/salesman-app-tally`, links but title leads with the exact phrase). A fourth, `how-to-send-payment-reminder-from-tally-whatsapp.md`, is already narrower in angle but doesn't link up to `/payment-reminder-tally`.

## Requirements

- R1: A `/features` hub page exists, fully prerendered, listing all 26 feature pages grouped by theme, meeting every §9 SEO requirement (unique title/description, canonical, OG, schema).
- R2: The top-menu "Features" item navigates to `/features` on every page. The homepage `#features` section remains but no longer owns the menu slot.
- R3: The 3 competing posts are retitled to narrower questions (URLs unchanged) and each carries a prominent link to its feature page near the top. The reminder how-to gets the top link (retitle optional).
- R4: Every feature page with genuinely related blog posts reaches 3+ inbound blog links; pages with no honest candidates are documented, not force-linked.
- R5: The link floor is enforced by test so it cannot regress.

## Key Technical Decisions

- **Repoint, don't add.** The nav already has a "Features" item; it moves from `#features` to `/features`. Two "Features" entries would be confusing and the homepage section keeps its content role. (Confirmed with operator.)
- **Retitle, never re-slug.** Blog URLs keep their age and inbound equity; only `title` / `meta_title` / h1-bearing frontmatter change. No `public/_redirects` entries needed, so the redirect test suite is untouched.
- **Hub renders from `FEATURE_PAGES`,** the same array that already drives routes, sitemap, llms.txt and footer — a new feature page appears on the hub automatically. Grouping needs a small addition (a group key per page or a slug→group map local to the hub); prefer whichever keeps `featurePages.js` JSX-free and Node-ESM-loadable, since the sitemap/llms generators import it.
- **Honest linking only.** The candidate scan found 8 feature pages with zero related posts (`debtor-ageing-report-on-phone`, `bank-statement-import-tally`, `multi-company-tally-reports`, `delivery-challan-from-mobile`, `credit-note-from-phone`, `custom-invoice-template-tally`, `livekeeping-alternative`, `tally-app-for-agri-input-distributors`). These stay at their current floor and are listed as future blog-round targets rather than receiving shoehorned links. Note: the per-slug candidate lists in U4 come from a token-overlap scan — a starting inventory, not a ceiling; the implementer should also add any post whose *body* is genuinely on-topic even when its title didn't match the scan.
- **Anchor-text discipline.** The cannibalisation guard in `src/data/__tests__/blog-internal-links.test.js` requires that a feature page's exact search phrase, used as anchor text, always points at that page. New links should use the search phrase (or a close variant) as anchor, pointed correctly — this is the strongest signal and the test already polices misdirection.
- **Bump `updated:` frontmatter** on every edited post — recency is a citation signal and `npm run audit:freshness` reads it.

---

## Implementation Units

### U1. The /features hub page

**Goal:** A prerendered `/features` page listing all 26 feature pages grouped by theme (team sales, payments & collection, reminders, GST compliance, reports, stock & godowns, imports, personas/alternatives), each entry a title + one-line summary + link.

**Requirements:** R1.

**Dependencies:** none.

**Files:**
- `src/routes/Features.jsx` (new)
- `src/data/featurePages.js` or a hub-local grouping module (grouping key or slug→group map)
- `src/data/siteMetadata.js` (routeMetadata entry with `llms` so the hub lands in llms.txt and sitemap)
- `src/routes/index.jsx` (route element)
- `public/llms.txt` (regenerate via `node scripts/generate-llms-txt.mjs`; a test enforces freshness)
- `src/routes/__tests__/features-hub.test.jsx` (new)

**Approach:** Render from `FEATURE_PAGES`; reuse the existing card/overline/section-heading vocabulary (CLAUDE.md §11 commandment 10) — no new visual patterns. Per-entry copy can reuse each page's existing `llms.summary` or `subheadline` rather than authoring 26 new lines. Include BreadcrumbList schema and an ItemList or CollectionPage schema. Keep the page light: it's a directory, not 26 hero sections. Title/description under the §9 character limits.

**Patterns to follow:** `src/components/FeaturePage.jsx` for Seo/schema wiring; `src/routes/Partners.jsx` or `ForDistributors.jsx` for a standalone-route shape; the routeMetadata comment block in `siteMetadata.js` for registration.

**Test scenarios:**
- Renders one link per entry in `FEATURE_PAGES` (26 today; count derived from the array, not hardcoded).
- Every rendered href matches a registered route in `routeMetadata`.
- Unique title under 60 chars, description under 160, canonical `https://takkada.com/features`.
- Grouping: every feature page appears in exactly one group; no group renders empty.
- Built output check: `dist/features/index.html` contains real link markup (prerender guard, mirrors the session-end checklist).

**Verification:** `npm run build` passes (includes llms.txt freshness and lead-answer guards); hub visible and navigable in `npm run preview`.

### U2. Nav repoint and footer tie-in

**Goal:** The top-menu "Features" item (desktop and mobile overlay) navigates to `/features`; the footer Features column heading links to the hub.

**Requirements:** R2.

**Dependencies:** U1.

**Files:**
- `src/data/siteContent.js` (`navLinks` entry `#features` → `/features`; footer column title link if the footer column component supports it — otherwise add a "All features →" link row)
- `src/Layout.jsx` (only if the footer column title needs to become linkable)
- `src/Layout.test.jsx` (extend)

**Approach:** `NavHashLink` already renders plain `Link`s for non-hash hrefs, so changing the data is the whole nav change. Check whether any homepage test pins the `#features` nav behavior.

**Test scenarios:**
- Nav renders "Features" as a link to `/features` (not a hash anchor).
- Mobile menu renders the same.
- No remaining `navLinks` entry points at `#features`.

**Verification:** clicking Features from the homepage and from a blog post lands on the hub in `npm run preview`.

### U3. Retitle the self-competing posts and add top links

**Goal:** Stop the three head-on title collisions; give each competing post a prominent early link up to its feature page.

**Requirements:** R3.

**Dependencies:** none (independent of U1/U2).

**Files:**
- `content/blog/tally-on-mobile.md` — narrow to the cost / what-breaks / which-bridge angle; add early link to `/tally-on-mobile`.
- `content/blog/view-tally-reports-on-mobile.md` — narrow to the step-by-step owner's-guide angle; add early link to `/tally-reports-on-mobile`.
- `content/blog/salesman-app-tally-india.md` — retitle so the exact phrase "Salesman app for Tally" no longer leads the title (the "what field teams actually need" angle is the keeper); it already links to `/salesman-app-tally`, keep that.
- `content/blog/how-to-send-payment-reminder-from-tally-whatsapp.md` — add early link to `/payment-reminder-tally`; retitle only if the title still reads as chasing the feature page's phrase.
- `src/data/__tests__/blog-internal-links.test.js` — extend with the retitle-collision assertion (see test scenarios).
- `src/data/featurePages.js` and `src/data/featurePagesSecondBatch.js` — update `relatedPosts[].title` for each retitled slug to the new frontmatter title; `feature-pages.test.js` pins these titles against disk, and `view-tally-reports-on-mobile` is pinned in BOTH files.

**Approach:** Change `title`, `meta_title`, `meta_description` where the description repeats the head phrase; keep `slug` and file name untouched. The "top link" is a natural sentence inside the lead answer paragraph (or immediately after it) linking the feature page with the search phrase as anchor — not a boxed callout, which would break the lead-answer prose rule. Bump `updated:`. Respect voice rules (§5): no "Not X. Y." structures, statements not questions. These are legacy posts grandfathered by `checkLeadAnswer.mjs`, but editing the lead paragraph brings the 120–180-word band into play — keep the lead compliant.

**Test scenarios:**
- Cannibalisation guard stays green: each search phrase used as anchor points at its feature page.
- `npm run lint:content` passes on all four edited posts.
- Each edited post's body contains a link to its feature page within the lead-answer block or the first section.
- No edited post's `title` begins with its feature page's exact search phrase (a small new assertion, scoped to these slugs, in `blog-internal-links.test.js` — prevents a future edit from reintroducing the collision).

**Verification:** `npm test` and `npm run build` green; read the retitled posts aloud against §5.

### U4. Blog→feature link deepening sweep

**Goal:** Raise the 13 thin-but-linkable feature pages from 1 inbound blog link toward 3–6 each by adding contextual links to existing, genuinely related posts. No new posts, no links from unrelated posts.

**Requirements:** R4.

**Dependencies:** U3 (so the sweep doesn't touch the four posts mid-edit).

**Files:** `content/blog/*.md` — roughly 30–45 posts get one added link each. Candidate inventory from the scan (implementer verifies each post's body actually supports the link before adding):
- `/payment-collection-tally` ← razorpay-vs-tally-native-collection, accept-online-payment-on-tally-invoice, collect-payment-against-tally-invoice-whatsapp, how-to-record-payment-in-tally-on-mobile, field-order-collection-app-tally
- `/payment-reminder-tally` ← how-to-send-payment-reminder-from-tally-whatsapp (added in U3), outstanding-payment-reminder-app-india, payment-due-date-tracking-tally, automate-payment-reminders-tally
- `/e-invoice-from-phone` ← e-invoice-on-phone-tally + GST-round posts whose bodies cover IRN/QR from mobile
- `/e-way-bill-from-phone` ← e-way-bill-on-phone, e-way-bill-180-day-rule, e-way-bill-expiry-extension-penalty, e-way-bill-with-e-invoice-auto-population
- `/outstanding-receivables-on-mobile` ← outstanding-receivables-report-tally, receivables-ageing-on-mobile-tally, receivables-management-for-distributors
- `/share-ledger-statement-whatsapp` ← partywise-outstanding-statement-tally + ledger-share posts
- `/tally-on-mobile-without-remote-access` ← how-to-access-tally-on-mobile-step-by-step + remote-access comparison posts
- `/send-payment-reminders-automatically` ← scheduled-payment-reminders-tally + reminder-round posts
- `/godown-wise-stock-on-mobile` ← godown-ka-stock-mobile-se-kaise-dekhe + the 08-08 godown round (10 posts — several should link here and to the other godown feature pages)
- `/sales-order-on-mobile` ← field-order-collection-app-tally, party-wise-sales-report-tally, order-round posts
- `/handwritten-order-to-tally` ← field-order-collection-app-tally + import-round posts
- `/tally-app-for-fmcg-distributors`, `/tally-app-for-pharma-distributors` ← distributor-workflow posts (payables, ageing, alternatives roundups) where the body genuinely addresses that vertical

**Approach:** One link per post per target, placed where the prose already discusses the capability — mid-body contextual links, using the search phrase or a close variant as anchor. Never edit a post into mentioning a feature it doesn't discuss. Bump `updated:` on every touched post. The 8 no-candidate pages are out of scope here (see Scope Boundaries).

**Test scenarios:**
- Every added link resolves to a registered route (existing dead-link guard covers this).
- Cannibalisation guard stays green corpus-wide.
- Each of the 13 targeted pages reaches ≥3 inbound blog links (becomes the U5 assertion).
- `npm run lint:content` passes on every touched post (lead-answer band, if a lead paragraph was edited).

**Verification:** re-run the inbound-link count; 13 targeted pages at 3+, none regressed.

### U5. Raise the tested link floor

**Goal:** Make the new link depth permanent: the existing "at least one inbound link" test learns a higher floor for the pages U4 deepened.

**Requirements:** R5.

**Dependencies:** U4.

**Files:** `src/data/__tests__/blog-internal-links.test.js`

**Approach:** Keep the global floor at 1 (new feature pages start there). Add a pinned list of the U4-deepened slugs with a floor of 3, plus the previously strong pages (`salesman-app-tally`, `tally-on-mobile`, `import-purchase-from-pdf`, `tally-reports-on-mobile`, `biz-analyst-alternative`) at their current counts' floor so they can't silently regress. A comment states the rule for future rounds: a new blog round that mentions a feature adds the page to the floored list.

**Test scenarios:**
- The raised floor fails when a link is removed from a floored page (verify by watching it go red once against a temporarily-deleted link — a green test is evidence of nothing until it has failed).
- A hypothetical new feature page (not in the floored list) still only needs 1 link.

**Verification:** full `npm test` green; the deliberate-red probe was run and reverted (do not ship the probe).

---

## Scope Boundaries

**In scope:** everything above.

**Out of scope (true non-goals):**
- Re-slugging or redirecting any blog post.
- New blog posts.
- Homepage `#features` section redesign — it stays as-is, minus the menu slot.
- The 7 older standalone landing routes (`/mobile-tally`, `/whatsapp-invoice-tally`, `/auto-reconciliation-tally`, `/for-distributors`, `/tally-mobile-app-comparison`, `/demo`, `/partners`) — they are not `FEATURE_PAGES` entries and don't join the hub in this pass.

### Deferred to Follow-Up Work

- **Blog rounds for the 8 zero-candidate feature pages** (`debtor-ageing-report-on-phone`, `bank-statement-import-tally`, `multi-company-tally-reports`, `delivery-challan-from-mobile`, `credit-note-from-phone`, `custom-invoice-template-tally`, `livekeeping-alternative`, `tally-app-for-agri-input-distributors`): each needs 3–5 supporting posts before it can be linked honestly. This is the natural brief for the next content round.
- Adding the older standalone landing routes to the hub (would need summaries and a decision on whether they graduate into `FEATURE_PAGES`).
- A "related feature pages" cross-link block on the FeaturePage template itself (feature↔feature linking) — helpful but a separate change with its own data question.

## Risks

- **Repointing the nav changes homepage scroll behavior users may expect.** Low: the `#features` section is still reachable by scrolling; the hub links back into everything.
- **Bulk-editing ~40 posts risks tripping the lead-answer guard on grandfathered posts.** Mitigation: mid-body links don't touch lead paragraphs; only U3's four posts edit leads, deliberately.
- **Title changes can temporarily wobble rankings for the retitled posts.** Expected and acceptable — the posts are being repositioned on purpose; the feature page is the intended winner for the head phrase.

## Deferred Implementation Notes

- Exact new titles for the U3 posts are written at implementation time against the §5 voice rules; the plan fixes the angle, not the wording.
- Hub grouping mechanism (field on the page object vs. hub-local map) decided when touching `featurePages.js`, honoring its JSX-free Node-ESM constraint.
- Final per-post link placement decided by reading each candidate post's body.
