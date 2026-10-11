---
date: 2026-10-11
topic: feature-blogs-100
status: awaiting-review
---

# 100 feature blogs (10 per feature) for SEO + AEO

## Goal

Recent Takkada features have little or no blog coverage. The corpus (234 posts on origin/main, 2026-10-11) has
zero posts on auto parts / spare parts, Desktop Entry, Dispatch Load, Import Automation, ladder discount
or order links, and only 1 title each for FMCG and recovery dashboard. Ship 100 short posts — 10 per feature, 10 features —
that rank for what buyers actually type and get quoted by AI answer engines, each showing the feature inside a
different kind of business.

Success: every post answers its search phrase in the first two lines, every claim matches what the live prod
app shows, and each feature batch ships as its own PR that Ronak merges.

## Decisions (Ronak, 2026-10-11)

- 10 posts per feature, 10 features, AI calling included.
- Batch number, manufacturing date, expiry date and batch-wise MRP added as the 10th feature (Ronak, mid-brainstorm).
- Posts showcase different business use cases.
- Order and shape as below, approved in chat.

## Shape of each 10-post batch

| Slot | Count | Purpose |
|---|---|---|
| Pillar | 1 | The head term ("X software for Tally"). Every other post in the batch links to it. |
| Business use case | 6 | Same feature, a different trade each time. Concrete day-in-the-life, numbers illustrative. |
| How-to | 1 | Step-by-step setup/use, matches "how to …" searches. |
| Hinglish | 1 | Matches romanised Hindi searches. |
| Before vs after | 1 | Manual way vs Takkada way; matches "manual vs software" / comparison intent. |

## Rules every post follows

1. **Answer first.** A 134–167-word lead paragraph under the title (no list, no heading) whose first two sentences answer the title's question outright — the repo's `checkLeadAnswer.mjs` convention.
2. **FAQ at the end.** 3–5 questions phrased the way people ask them; short direct answers.
3. **One primary keyword** in title, slug, meta description and first paragraph. No two posts in the corpus share one.
4. **Links:** to the feature page (if one exists in `featurePages*.js`) and to the batch pillar.
5. **600–900 words.** Precise, no padding. No em-dashes in post copy. Brand voice and banned-token lint from `.claude/commands/blog-batch.md`.
6. **Claims gate.** Only what the live prod app does today. Before a batch is written, the feature's prod
   entitlement and screens are re-checked; any claim not visible in the app is cut. Use-case businesses are
   typical examples — never named customers, never testimonials, never adoption counts.
7. **No prices** (matches the 2026-10-04 price scrub).
8. Ships through the repo's `/blog-batch` pipeline (10 posts + header images + lint + build with
   `INDEXNOW_DRY_RUN=true` for local builds), one PR per feature to `main`. Nothing is live until Ronak merges.

## Live status checked 2026-10-11 (prod `company_feature_entitlements`, active)

| Feature | Key | Active cos | Note |
|---|---|---|---|
| AI calling | `ai_calling` | 1 | Already sold on the site; 2 posts exist (2026-10-02) — avoid repeating their angles |
| FMCG billing | `billing_module` | 18 | Retail margin + discount % per stock item — confirm exact screen behaviour before writing |
| Recovery dashboard | `recovery_followups` | 29 | Follow-up log, promise-to-pay, missed-promise detection. Revamp NOT built — write today's version |
| Import Automation | `document_import` | 133 | Supplier bills, customer invoices, orders, bank statements → entries for review |
| Dispatch Load | `dispatch_load` | 70 | Pending orders → load → loading sheet → confirm → bill |
| Order links | `personal_order_links` / `public_customer_ordering` | 3 / 35 | No-price order requests the merchant converts |
| Ladder discount | `ladder_discount` | 2 | Named compounding discounts, one aggregate on invoice and in Tally |
| Auto parts | `autoparts_billing` | 10 | Cost-plus pricing from last landed cost + markup (company / group / item). Verify app screens are on prod before writing |
| Desktop Entry | `desktop_entry` | 1 | Needs Ronak's go to market on prod before its batch is written |
| Batch, Mfg/Exp, batch MRP | `trn_batch.manufactured_on/expiry_on/mrp_rate` | 13 cos with expiry or MRP data | Batch-wise pricing (own line + rate per batch, Mfg/Exp on PDF, expired batches flagged) is behind the company setting *Price by batch*. Confirm the app half is on prod before writing |

## The 100 titles

Slugs are drafts; the batch run checks each against existing `content/blog/*.md` and renames on collision.

### Batch 1 — AI calling
1. Pillar — AI Calling for Payment Collection: Overdue Parties Called Automatically from Tally
2. AI Collection Calls for FMCG Distributors with 300+ Retailers
3. AI Payment Reminder Calls for Pharma Distributors Chasing Chemist Dues
4. AI Calls for Agri-Input Dealers: Collecting from Farmers After Harvest
5. AI Collection Calls for Hardware and Building-Material Traders
6. AI Calls for Textile Wholesalers with Long Credit Cycles
7. AI Collection Calls for Auto Parts Dealers and Garages
8. How to Start AI Collection Calls from Send Reminders Now
9. Hinglish — AI se Payment Ka Call Kaise Karwaye: Baaki Wale Party ko Automatic Call
10. Office Staff Calling vs AI Calling: Same Overdue List, Different Results

### Batch 2 — FMCG billing
1. Pillar — FMCG Billing Software for Tally: Retailer Margin and Discount per Item
2. FMCG Billing for Biscuit and Snacks Distributors
3. FMCG Billing for Personal-Care and Detergent Distributors
4. FMCG Billing for Beverage and Dairy Distributors
5. FMCG Billing for Super Stockists Selling to Sub-Distributors
6. FMCG Billing for Confectionery Wholesalers with Many Small SKUs
7. FMCG Billing for Staples and Packaged-Food Distributors
8. How to Set Retailer Margin and Discount per Stock Item
9. Hinglish — FMCG Distributor ka Billing Mobile se Tally mein Kaise Kare
10. Manual Rate Calculation vs Margin-Based FMCG Billing

### Batch 3 — Recovery dashboard
1. Pillar — Recovery Dashboard for Tally: Every Follow-up, Promise and Missed Date in One Place
2. Recovery Tracking for FMCG Distributors with Field Collectors
3. Recovery Dashboard for Pharma Distributors: Chemist-wise Follow-ups
4. Recovery Tracking for Agri-Input Dealers with Seasonal Credit
5. Recovery Dashboard for Building-Material Suppliers with Contractor Dues
6. Recovery Tracking for Electronics and Mobile Distributors
7. Recovery Dashboard for Textile Traders with Agent-Booked Parties
8. How to Log a Follow-up and Promise-to-Pay from the Collections Report
9. Hinglish — Party ne Payment ka Promise Toda? Mobile par Turant Pata Kare
10. Recovery Register in a Notebook vs a Recovery Dashboard

### Batch 4 — Import Automation
1. Pillar — Import Purchase Bills into Tally from a Photo or PDF
2. Purchase Bill Import for FMCG Distributors Receiving 50 Bills a Week
3. Purchase Bill Import for Pharma Distributors: Batch and Expiry Lines
4. Supplier Bill Import for Hardware Traders with Long Item Lists
5. Bank Statement Import into Tally for Distributors
6. Order Import from WhatsApp Photos for Wholesalers
7. Customer Invoice Import for Businesses Moving to Tally
8. How to Photograph a Supplier Bill and Review the Entry Before It Reaches Tally
9. Hinglish — Purchase Bill ki Photo se Tally Entry Kaise Banaye
10. Typing Purchase Bills by Hand vs Importing Them

### Batch 5 — Dispatch Load
1. Pillar — Dispatch Planning from Tally Orders: Load, Loading Sheet and Billing in One Flow
2. Dispatch Load for FMCG Distributors Running Daily Beat Vans
3. Dispatch Planning for Beverage Distributors with Truck Capacity Limits
4. Dispatch Load for Building-Material Suppliers Delivering to Sites
5. Dispatch Planning for Agri-Input Dealers in Peak Season
6. Dispatch Load for Pharma Distributors with Same-Day Delivery
7. Dispatch Load for Electrical and Hardware Wholesalers
8. How to Build a Load from Pending Orders and Print the Loading Sheet
9. Hinglish — Gaadi Load Kaise Banaye aur Loading Sheet Kaise Nikale
10. Paper Picking List vs Dispatch Load: What Actually Left the Godown

### Batch 6 — Order links
1. Pillar — WhatsApp Order Link for Distributors: Customers Place Orders, You Convert in Tally
2. Order Links for FMCG Distributors Taking Retailer Orders Without a Salesman
3. Order Links for Pharma Distributors Receiving Chemist Orders on WhatsApp
4. Order Links for Agri-Input Dealers Taking Orders from Village Retailers
5. Order Links for Hardware Shops Ordering from Wholesalers
6. Order Links for Bakery and Dairy Suppliers Taking Daily Orders
7. Order Links for Stationery and Packaging Wholesalers
8. How to Send a Personal Order Link to Each Party
9. Hinglish — Customer Khud Order Kaise Bheje: WhatsApp Order Link
10. Orders by Phone Call vs Orders by Link

### Batch 7 — Ladder discount
1. Pillar — Ladder Discount in Tally Invoices: 10% + 5% + 2% Shown Right, Totalled Right
2. Ladder Discount for FMCG Distributors Passing Company Schemes
3. Ladder Discount for Tiles and Sanitaryware Dealers
4. Ladder Discount for Paint Dealers with Trade and Cash Discount
5. Ladder Discount for Electrical Wholesalers with Brand Slabs
6. Ladder Discount for Pharma Distributors with Trade Discount
7. Ladder Discount for Auto Parts Dealers with List-Price Discounts
8. How to Set Up Named Ladder Discounts on an Invoice
9. Hinglish — Discount par Discount Kaise Lagaye Invoice mein
10. Calculating Compound Discount on a Calculator vs on the Invoice

### Batch 8 — Auto parts
1. Pillar — Auto Parts Billing Software for Tally: Selling Price from Landed Cost + Markup
2. Spare Parts Pricing for Auto Parts Importers After Every Container
3. Auto Parts Billing for Two-Wheeler Spare Parts Distributors
4. Auto Parts Billing for Tractor and Farm-Machinery Parts Dealers
5. Auto Parts Billing for Commercial-Vehicle Parts Wholesalers
6. Auto Parts Billing for Lubricant and Battery Distributors
7. Markup by Stock Group: Pricing Thousands of Part Numbers Without a Spreadsheet
8. How to Set Markup at Company, Group and Item Level
9. Hinglish — Spare Parts ka Rate Cost + Margin se Kaise Banaye
10. Spreadsheet Price Lists vs Cost-Plus Pricing for Spare Parts

### Batch 9 — Desktop Entry (needs Ronak's go first)
1. Pillar — Fast Billing on a Computer with Tally Sync: Desktop Entry
2. Desktop Billing for FMCG Distributors with a Billing Counter
3. Desktop Entry for Pharma Distributors Billing Long Invoices
4. Desktop Entry for Hardware Traders with Walk-in Customers
5. Desktop Entry for Textile Wholesalers Billing Many Lines
6. Desktop Entry for Agri-Input Dealers in Peak-Season Rush
7. Desktop Entry for Accountants Entering Receipts and Payments
8. How to Bill with the Keyboard: Tab, Enter and Ctrl+S
9. Hinglish — Computer par Fast Billing, Seedha Tally mein
10. Billing in Tally Directly vs Billing in Desktop Entry

### Batch 10 — Batch number, Mfg date, expiry, batch-wise MRP
1. Pillar — Batch-wise Billing for Tally: Batch Number, Mfg Date, Expiry and MRP on Every Invoice
2. Batch and Expiry Tracking for Pharma Distributors
3. Batch-wise MRP for FMCG Distributors After an MRP Revision
4. Batch and Expiry Billing for Agri-Input Dealers: Seeds, Pesticides and Fertiliser
5. Batch-wise Billing for Food and Beverage Distributors with Short Shelf Life
6. Batch and Expiry Tracking for Cosmetics and Personal-Care Distributors
7. Batch Billing for Paint and Lubricant Dealers
8. How to Pick a Batch on an Invoice and Show Mfg and Expiry on the PDF
9. Hinglish — Batch Wise MRP aur Expiry Date Invoice mein Kaise Dikhaye
10. Tracking Expiry in a Register vs Seeing It While You Bill

## Out of scope

- Refreshing the 234 existing posts.
- The recovery dashboard revamp (gets its own posts after it ships).
- New feature landing pages.

## Open items for the plan

- Per batch: confirm exact app behaviour (screens, wording) on prod before writing — FMCG billing and auto
  parts most of all.
- Desktop Entry batch is blocked on Ronak's go to market it on prod.
