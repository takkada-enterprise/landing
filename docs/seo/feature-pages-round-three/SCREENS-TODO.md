# Screens owed to the round-three feature pages

The eight pages in `src/data/featurePagesRoundThree.js` shipped without captures. Each hero is a real adjacent registry screen (honest alt text, the /import-purchase-from-pdf precedent); walk-through steps render copy only until their capture lands.

To land a capture (demo company 143, `screens-raw/2026-11-05/<slug>.png`):

1. Add it to `scripts/screens.manifest.json`, run `node scripts/exportScreens.mjs`, register it in `src/data/screens.js` with alt text written from the picture, add its provenance record to `content/image-provenance.json`, and if it becomes a hero, a byte budget in `scripts/checkImageBudgets.mjs`.
2. In the page, rename the step's `pendingScreen: '<slug>'` to `screen: '<slug>'` (or set `hero: { screen: '<slug>' }`), and remove the slug from that page's `pendingScreens`.
3. `src/data/__tests__/feature-pages.test.js` ("pages owed captures") goes red the moment a slug is registered while still pending, so step 2 cannot be skipped. When a page's `pendingScreens` empties, every step on it needs a screen. Single-capture pages will have three copy-only steps left over at that point, so either give them screens or decide on the layout then.

| Capture slug | Page | Where it plugs in |
|---|---|---|
| `stock-control-reorder` | `/stock-control-tally` | walk-through step 1 "Reorder Now, most overdue first"; also the better hero (replace `godown-list`) |
| `stock-control-basket` | `/stock-control-tally` | step 2 "Tick, check, create the order" |
| `stock-control-supplier-performance` | `/stock-control-tally` | step 3 "Suppliers, judged on what they did" |
| `stock-control-season-plan` | `/stock-control-tally` | step 4 "A season plan with an order-by date" |
| `pod-driver-drops` | `/proof-of-delivery-app-tally` | step 1 "His trips, in driving order"; also the better hero (replace `van-loading`) |
| `pod-photo-proof` | `/proof-of-delivery-app-tally` | step 2 "Delivered, with the photo to prove it" |
| `pod-office-approval` | `/proof-of-delivery-app-tally` | step 4 "The office approves it into Tally" |
| `manufacturing-bom` | `/manufacturing-in-tally-prime` | step 1 "The bill of materials, set once" |
| `manufacturing-production-run` | `/manufacturing-in-tally-prime` | step 2 "A run that checks the godown first"; also the better hero (replace `godown-items`) |
| `manufacturing-job-work` | `/manufacturing-in-tally-prime` | step 4 "Job work, out and back" |
| `voucher-names-list` | `/custom-voucher-type-tally` | step 1 "Name it, give it a prefix", or the hero (replace `invoice-summary`) |
| `desktop-entry-invoice` | `/desktop-billing-tally` | step 1 "Type it the way Tally taught you", or the hero (replace `add-items`). A desktop capture is wide: register it with `sheet()`, not `phone()` |
| `live-tracking-map` | `/salesman-location-tracking-app` | step 2 "The Team Map, refreshed every minute", or the hero (replace `field-visits`) |
| `email-invoices` | `/email-invoice-from-tally` | step 1 "The invoice reaches the inbox", or the hero (replace `invoice-summary-send`). Prod has sent no invoice email yet, so this needs a staged demo send |
| `tally-drafts` | `/optional-voucher-tally-prime` | step 1 "Every draft, in one list", or the hero (replace `maker-checker`) |

What each capture should show is in the "Screens" section of that page's `*-claims.md` in this folder.
