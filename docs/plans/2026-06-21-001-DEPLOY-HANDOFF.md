# Deploy handoff — 20 AEO+SEO articles (plan 2026-06-21-001)

**Status:** all 20 articles written, integrated, and verified green by the swarm. The swarm does **not** push — this is your step, in a separate terminal.

**Branch:** `content/aeo-seo-20-articles` (off `origin/main`), in `takkada website/landing`.

## What landed

- 20 new `content/blog/*.md` articles (4 steps × 5).
- 20 new `public/assets/blog/*.png` header images (1200×630).
- `scripts/generate-blog-images.py` — 20 appended `ARTICLES` entries.
- This handoff doc + the plan doc under `docs/plans/`.

The 20 slugs:

| Step | Slugs |
|---|---|
| 1 — AEO definitions | `what-is-utr-number-tally-payment`, `what-is-vpa-upi-id-distributors`, `mdr-vs-convenience-fee-upi`, `upi-autopay-for-distributors`, `bill-by-bill-against-reference-tally` |
| 2 — verticals | `zero-mdr-upi-for-electrical-distributors`, `collections-app-for-textile-wholesalers`, `receivables-app-for-agri-input-distributors`, `tally-collection-app-for-paint-distributors`, `zero-mdr-upi-for-dairy-distributors` |
| 3 — how-tos | `how-to-send-payment-reminder-from-tally-whatsapp`, `how-to-check-party-outstanding-tally-mobile`, `how-to-share-ledger-statement-whatsapp-tally`, `how-to-reconcile-bank-statement-tally-mobile`, `how-to-split-upi-payment-across-tally-invoices` |
| 4 — Hinglish/finance/trust | `bakaya-kaise-vasool-kare-distributor`, `tally-mobile-par-kaise-chalaye`, `distributor-credit-policy-template`, `cash-conversion-cycle-for-distributors`, `is-it-safe-to-connect-app-to-tally` |

## Verification already done (U6, all green)

- `npm run build` exits 0; sitemap wrote 111 URLs; all 20 new `/blog/<slug>/` URLs present in `dist/sitemap.xml` and `dist/blog/<slug>/index.html`.
- Sampled dist HTML renders real article content (~26–29 KB; Key Highlights + FAQ in the static output), with title, meta description, canonical, full OG set, Twitter card, and JSON-LD. `og:image` points at the generated PNG.
- Aggregate banned-token grep clean across all 20; aggregate em-dash grep clean; three-word-fragment grep clean. (Integration caught one em-dash in `bill-by-bill-against-reference-tally` that the author's self-check missed; fixed in place.)
- Zero orphan internal links across all 20 files (every `/blog/<slug>/` resolves to a live or newly-written article).

## Steps to ship (you, separate terminal, in `takkada website/landing`)

```bash
cd "takkada website/landing"
git checkout content/aeo-seo-20-articles

# 1. Review the diff
git status
git add content/blog public/assets/blog scripts/generate-blog-images.py docs/plans
git diff --cached --stat

# 2. Confirm green on your machine
npm run build

# 3. Commit
git commit   # message below

# 4. Push the branch and open a PR to main
git push -u origin content/aeo-seo-20-articles
gh pr create --base main --head content/aeo-seo-20-articles \
  --title "content: 20 AEO+SEO blog articles (UTR/VPA/MDR defs, verticals, how-tos, Hinglish/finance/trust)" \
  --body "Adds 20 new blog articles + header images (plan 2026-06-21-001). Build green, sitemap +20 URLs, lint clean, zero orphan links."

# 5. Merge
gh pr merge <n> --merge
```

Suggested commit message:

```
content: add 20 AEO+SEO blog articles + header images

Plan 2026-06-21-001. Four batches of five: AEO definition pages
(UTR, VPA, MDR-vs-convenience-fee, UPI AutoPay, bill-by-bill),
vertical collection pages (electrical, textile, agri-input, paint,
dairy), task how-tos (reminder, outstanding, ledger, bank recon,
split-UPI), and mixed surfaces (2 Hinglish, credit-policy template,
cash conversion cycle, third-party-app trust).

Build green, sitemap +20 URLs, banned-token/em-dash lint clean,
zero orphan internal links.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

## Deploy reality (corrects CLAUDE.md §8, which is stale)

- `main` is **PR-protected** — a direct `git push origin HEAD:main` is rejected (GH013), so the PR is mandatory.
- Deploy is **Cloudflare on merge to `main`**, not GitHub Pages (the repo's "Deploy to GitHub Pages" Action is intentionally disabled per the blog-batch memory). Cloudflare picks up the merge automatically; new URLs should be live within a few minutes.

## After Cloudflare finishes

Spot-check 2–3 live URLs:

- https://takkada.com/blog/what-is-utr-number-tally-payment/
- https://takkada.com/blog/distributor-credit-policy-template/
- https://takkada.com/blog/bakaya-kaise-vasool-kare-distributor/

## One follow-up worth doing later (not blocking)

CLAUDE.md §8 still says "Deployment: GitHub Pages." It's wrong (Cloudflare on merge to `main`). Worth a one-line fix so the next person isn't misled.
