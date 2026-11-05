# Screens owed to the round-three feature pages

Eleven captures landed on 2026-11-05 (demo company 143, `screens-raw/2026-11-05/`), plus `stock-control-reorder-list`. Ronak rejected the adjacent stand-in screens these pages first carried, so nothing here borrows a screen any more: a page with no capture of its own has a copy-only hero (desktop entry, live tracking, email invoices, Tally drafts), and a step with none is copy only. The landed files are on the unproven backlog in `content/image-provenance.json`, marked as awaiting Ronak's review, until he records each one with `scripts/capture-guide-evidence.mjs record`.

Landed: Stock Control hero `stock-control-reorder`, steps `stock-control-reorder-list`, `-basket`, `-supplier-performance`, `-season-plan`. Proof of Delivery hero and step 1 `pod-driver-drops`, step 2 `pod-photo-proof`, step 4 `pod-office-approval`. Manufacturing hero `manufacturing-production-run` (it shows a Manufacturing Journal, so it sits on step 3, not step 2), step 1 `manufacturing-bom`, step 4 `manufacturing-job-work`. Voucher names hero and step 1 `voucher-names-list`. Not used: `live-tracking-map.png` (the salesman's made-up name is a real politician's; recapture) and `tally-drafts.png` (every row carries a "Tally sync is off" banner; recapture).

To land a capture (demo company 143, `screens-raw/2026-11-05/<slug>.png`):

1. A phone capture comes off the app as a bare rectangle; every screen on the site sits in an iPhone frame. Frame it first: `python3 scripts/phone-frame/frame_capture.py screens-raw/2026-11-05/<slug>.png mockups/<slug>.png` (the twelve landed ones were framed this way on 2026-11-05; a wide desktop capture is not framed). Then add it to `scripts/screens.manifest.json`, run `node scripts/exportScreens.mjs`, register it in `src/data/screens.js` with alt text written from the picture, add its provenance record to `content/image-provenance.json`, and if it becomes a hero, a byte budget in `scripts/checkImageBudgets.mjs`.
2. In the page, rename the step's `pendingScreen: '<slug>'` to `screen: '<slug>'` (or set `hero: { screen: '<slug>' }`), and remove the slug from that page's `pendingScreens`.
3. `src/data/__tests__/feature-pages.test.js` ("pages owed captures") goes red the moment a slug is registered while still pending, so step 2 cannot be skipped. When a page's `pendingScreens` empties, every step on it needs a screen. Single-capture pages will have three copy-only steps left over at that point, so either give them screens or decide on the layout then.

Still owed:

| Capture slug | Page | Where it plugs in |
|---|---|---|
| `pod-cash-on-van` | `/proof-of-delivery-app-tally` | step 3 "Cash, UPI or cheque on the van" (the driver recording a payment) |
| `manufacturing-run-short-check` | `/manufacturing-in-tally-prime` | step 2 "Stock checked before the batch starts" (a run with a component marked Short) |
| `voucher-names-create-in-tally` | `/custom-voucher-type-tally` | step 2 "Created in Tally, under the right parent" |
| `voucher-names-series` | `/custom-voucher-type-tally` | step 3 "Its own series, with no clashes" |
| `voucher-names-pick-at-billing` | `/custom-voucher-type-tally` | step 4 "Pick it when you bill" |
| `desktop-entry-invoice` | `/desktop-billing-tally` | step 1 "Type it the way Tally taught you", and the hero. A desktop capture is wide: register it with `sheet()`, not `phone()` |
| `live-tracking-map` | `/salesman-location-tracking-app` | step 2 "The Team Map, refreshed every minute", and the hero. Use made-up names that belong to nobody |
| `email-invoices` | `/email-invoice-from-tally` | step 1 "The invoice reaches the inbox", and the hero. Prod has sent no invoice email yet, so this needs a staged demo send |
| `tally-drafts` | `/optional-voucher-tally-prime` | step 1 "Every draft, in one list", and the hero. Capture with Tally sync on so no banner shows |

What each capture should show is in the "Screens" section of that page's `*-claims.md` in this folder.
