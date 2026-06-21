# Competitor comparison pages — audit & gap fill (2026-06-21)

Request: build comparison/alternatives pages for `takkada.com` against
**livekeeping, biz analyst, bis analyst, credflow, mybillbokk, billbook**.

Finding: five of the six already have current, well-researched pages in
`content/blog/` (several `updated: 2026-06-21`). Only one genuine gap existed
(`billbook` as a standalone cluster), which has been built. The rest are handled
as keyword variants, not new pages, because duplicate near-identical pages next
to existing ones cause keyword cannibalization.

## Coverage map (requested → existing page → action)

| Requested term | Existing page(s) | Status | Action taken |
|---|---|---|---|
| livekeeping | `livekeeping-alternative-for-distributors.md` | Covered | None. Optional head-to-head below. |
| biz analyst | `biz-analyst-alternative.md`, `credflow-vs-biz-analyst-vs-takkada.md` | Covered (updated 2026-06-21) | None. |
| **bis analyst** | — (misspelling of "biz analyst") | Variant | No new page. Folded into keyword strategy for the biz-analyst page (Google maps bis→biz; a thin doorway page would dilute, not help). |
| credflow | `takkada-vs-credflow.md`, `credflow-alternative-tally-native.md`, `best-credflow-alternatives-india-2026.md`, `credflow-vs-biz-analyst-vs-takkada.md` | Heavily covered | None. |
| **mybillbokk** | `mybillbook-alternative-for-distributors.md` | Covered ("mybillbokk" is itself a misspelling of myBillBook) | No new page. Misspelling captured as a query variant. |
| **billbook** | only matched myBillBook | **GAP — built** | New page `billbook-alternative-for-distributors.md`. |

## What "billbook" resolves to (disambiguation)

"BillBook" is a distinct search cluster from the already-covered **myBillBook**
(FloBiz). It maps to the generic free *bill book app* category — **Apna Billbook**
(apnabillbook.com), **BillBooks** (mybillbooks.co.in), and head-on searches like
"bill book app", "billbook download", "free GST bill book". To avoid
cannibalizing the myBillBook page, the new page targets the **category** (free
bill-book billing apps in general) and cross-links to the myBillBook page for
that one specific product. Clean hub-and-spoke: generic "bill book app" page →
specific myBillBook page.

Sources used for disambiguation:
- [myBillBook (FloBiz)](https://mybillbook.in/)
- [Apna Billbook](https://apnabillbook.com/)
- [BillBooks](https://mybillbooks.co.in/)

## Page built

`content/blog/billbook-alternative-for-distributors.md`
- Primary keyword: **bill book app alternative**
- Title (48 chars): "Bill Book App Alternative for Tally Distributors"
- Angle: a Tally distributor who adopts any standalone bill book app inherits a
  second ledger to reconcile before every GST filing; a Tally-native layer
  removes the split. Pricing-agnostic (category framing) so it stays accurate and
  durable as individual app prices change.
- Follows house conventions: 143-word front-loaded lead-answer paragraph,
  Key Highlights, capability table, ICP split, 5-pair FAQ in the `**Q:**`/`A:`
  pattern, internal links, demo close.

Verified in the static build:
- Renders to `dist/blog/billbook-alternative-for-distributors/index.html` (24 KB
  real HTML, not an empty root div)
- Unique `<title>` < 60 chars, meta description < 160 chars
- Apex canonical `https://takkada.com/blog/billbook-alternative-for-distributors/`
- Schema emitted: Article, BreadcrumbList, FAQPage (5 Question/Answer pairs)
- `npm run lint:content` → 0 fail / 0 warn (post is in the enforced, non-legacy set)
- In `dist/sitemap.xml`
- Hero image generated at `public/assets/blog/billbook-alternative-for-distributors.png`

## Keyword strategy

Primary targets, by page:

| Page | Primary | Secondary / long-tail |
|---|---|---|
| billbook (new) | bill book app alternative | bill book app for distributors, free GST bill book app, apna billbook alternative, billbook vs tally, bill book app download for business |
| biz-analyst (existing) | biz analyst alternative | **bis analyst alternative** (misspelling), biz analyst vs takkada, biz analyst alternative for collections |
| mybillbook (existing) | mybillbook alternative | mybillbokk alternative (misspelling), mybillbook vs tally, mybillbook for distributors |
| livekeeping (existing) | livekeeping alternative | livekeeping vs takkada, livekeeping for distributors |
| credflow (existing, ×4) | credflow alternative / takkada vs credflow | best credflow alternatives 2026, credflow vs biz analyst |

Misspelling handling (bis analyst, mybillbokk): no separate pages. Search engines
already collapse these to the correct brand, and thin doorway pages risk a
duplicate-content penalty. They are covered by the body copy and the existing
pages' authority. If analytics later show real impressions on a misspelling with
no impressions on the correct page, revisit.

## Recommendations (optional, not built)

1. **Head-to-head "vs" pages.** "[competitor] vs takkada" is a distinct intent
   from "[competitor] alternative" and has separate volume. The alternatives
   pages exist; dedicated `takkada-vs-livekeeping` and `takkada-vs-biz-analyst`
   pages could capture the "vs" query. **Caution:** only build these if the
   angle is genuinely different from the alternatives page, or they cannibalize.
   `takkada-vs-credflow` already exists as the proof of format.

2. **Internal-link the new page in.** The myBillBook, Khatabook, and Vyapar
   alternative pages should link to the new bill-book page (and it already links
   back), so the comparisons cluster interlinks tightly.

3. **Quarterly accuracy review.** The biz-analyst and livekeeping pages quote
   specific competitor pricing (₹3,300 / ₹2,500–₹6,000). Re-verify against the
   live pricing pages each quarter and bump `updated:` so `dateModified` stays
   honest. The new bill-book page is deliberately pricing-agnostic to avoid this
   maintenance burden.

## Deploy

Standard path: commit on a branch off `origin/<default>` and open a PR to the
landing repo (GitHub Pages publishes `dist/` on merge to `main`). Not pushed by
this session — left for operator review.
