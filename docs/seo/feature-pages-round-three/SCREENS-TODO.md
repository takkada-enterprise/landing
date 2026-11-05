# Screens owed to the round-three feature pages

Eighteen captures landed on 2026-11-05 (demo company 143, `screens-raw/2026-11-05/`). Ronak rejected the adjacent stand-in screens these pages first carried, so nothing here borrows a screen: a step with no capture of its own is copy only. Every landed file is on the unproven backlog in `content/image-provenance.json`, marked as awaiting Ronak's review, until he records each one with `scripts/capture-guide-evidence.mjs record`.

Landed, first batch: Stock Control hero `stock-control-reorder`, steps `stock-control-reorder-list`, `-basket`, `-supplier-performance`, `-season-plan`. Proof of Delivery hero and step 1 `pod-driver-drops`, step 2 `pod-photo-proof`, step 4 `pod-office-approval`. Manufacturing hero `manufacturing-production-run` (it shows a Manufacturing Journal, so it sits on step 3), step 1 `manufacturing-bom`, step 4 `manufacturing-job-work`. Voucher names hero and step 1 `voucher-names-list`.

Landed, second batch: Manufacturing step 2 `manufacturing-run-short-check`. Voucher names step 2 `voucher-names-create-in-tally`, step 3 `voucher-names-series` (the prefix-clash line), step 4 `voucher-names-pick-at-billing`. Desktop entry hero and step 1 `desktop-entry-invoice`, a wide `sheet()` with the empty bottom strip cut off and no device frame (it renders as a rounded card in a wider hero column, `feature-hero-grid--wide`). Live tracking hero and step 2 `live-tracking-map` (the names are made up now). Email invoices hero and step 4 "See what went out" `email-invoices`: the capture is the Settings, Email screen that step describes word for word, so it sits there rather than on step 1.

Copy only by decision: the other three steps on desktop entry, live tracking and email invoices carry `copyOnly: true`; no capture exists for them and a borrowed screen is what was rejected. The set is closed in `src/data/__tests__/feature-pages.test.js` (`COPY_ONLY_STEPS`). Not used: `pod-cash-on-van.png` (a "Use the phone app to record deliveries" banner and greyed buttons; recapture).

To land a capture (demo company 143, `screens-raw/2026-11-05/<slug>.png`):

1. A phone capture comes off the app as a bare rectangle; every screen on the site sits in an iPhone frame. Frame it first: `python3 scripts/phone-frame/frame_capture.py screens-raw/2026-11-05/<slug>.png mockups/<slug>.png` (every landed phone capture was framed this way; a wide desktop capture is not framed). Then add it to `scripts/screens.manifest.json`, run `node scripts/exportScreens.mjs` (this worktree's `mockups/` holds only the round-three sources, so the full run stops at the first older row; the second batch was exported row by row with the same cwebp arguments and the manifest's `q`), register it in `src/data/screens.js` with alt text written from the picture, put each exported file on the unproven backlog in `content/image-provenance.json` (awaiting Ronak's review; never an evidence record), and if it becomes a hero, a byte budget in `scripts/checkImageBudgets.mjs`.
2. In the page, rename the step's `pendingScreen: '<slug>'` to `screen: '<slug>'` (or set `hero: { screen: '<slug>' }`), and remove the slug from that page's `pendingScreens`.
3. `src/data/__tests__/feature-pages.test.js` ("pages owed captures") goes red the moment a slug is registered while still pending, so step 2 cannot be skipped. When a page's `pendingScreens` empties, every step on it needs a screen or a place in the closed `COPY_ONLY_STEPS` set (`copyOnly: true` on the step).

Still owed:

| Capture slug | Page | Where it plugs in |
|---|---|---|
| `pod-cash-on-van` | `/proof-of-delivery-app-tally` | step 3 "Cash, UPI or cheque on the van" (the driver recording a payment) |
| `tally-drafts` | `/optional-voucher-tally-prime` | step 1 "Every draft, in one list", and the hero. Capture with Tally sync on so no banner shows |

What each capture should show is in the "Screens" section of that page's `*-claims.md` in this folder.
