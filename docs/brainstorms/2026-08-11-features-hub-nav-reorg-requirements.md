---
date: 2026-08-11
topic: features-hub-nav-reorg
---

# Features Hub and Navigation Reorganisation

## Summary

Re-tier the /features hub so the 6–8 features that sell the product lead with rich visual cards, with comparison and trade pages separated into their own labelled sections and the long tail collapsed into a compact index. Clean up the header navigation (Features dropdown, merge "Product", demote the installer download) and the footer feature list, and fix the broken bits found during the 2026-08-11 site walkthrough. No page is deleted and no crawlable link is lost.

---

## Problem Frame

The operator's own read of takkada.com is that it "looks messy", and a walkthrough on 2026-08-11 confirmed five concrete causes. The /features hub renders 26 near-identical text-only cards in 9 groups with no imagery and uniform visual weight, so the page reads as a sitemap while the homepage reads as a designed product site; the hub also mixes three content types (features, competitor comparisons, trade/persona pages) as equals. The header offers "Product" and "Features" side by side where "Product" is only a homepage section anchor, and three competing header buttons include a direct Windows-installer download. The mobile menu overlay is semi-transparent, so page text bleeds through and it reads as a rendering bug. The order-booking feature page has a literal yellow "PLACEHOLDER" image live in production. The footer repeats the entire ~24-link feature directory in no visible order. Most of the 50+ feature pages exist to catch Google and AI-search traffic, so their URLs and inbound links are load-bearing.

---

## Requirements

**Broken-window fixes**
- R1. The yellow "PLACEHOLDER" image on the order-booking feature page is replaced with a real product visual in the device frame style used by neighbouring cards.
- R2. When the mobile menu is open, the page content behind it must not show through the menu surface; menu items render on an opaque (or effectively opaque) background.

**/features hub re-tier**
- R3. The hub opens with a lead tier of 6–8 core features, each shown as a rich card (title, one-line benefit, product visual in a device frame) that links to its feature page. The proposed lead list is a Key Decision below and needs operator approval before ship.
- R4. Comparison pages ("Weighing your options") and trade pages ("Built for your trade") move out of the feature groups into their own clearly-labelled sections, visually distinct from the feature tiers.
- R5. All remaining feature pages stay on the hub as a compact, scannable secondary index (short text links grouped by theme), below the lead tier.
- R6. Every page listed on today's hub remains reachable from the reorganised hub. The features-hub coverage test (grouping covers FEATURE_PAGES exactly, both directions) must stay green or be extended to cover the new tiers.
- R7. The hub's intro copy above the first card is shortened so the first feature card is visible without scrolling past multiple screens of prose on a phone.

**Header navigation**
- R8. The header gains a Features dropdown (or equivalent disclosure) showing the feature groups or lead features plus an "All features" link, so a visitor can see what the product does from any page without navigating away.
- R9. "Product" disappears as a separate top-level menu item (merged into Features or removed); no top-level menu item may be a homepage-section anchor that teleports visitors off their current page.
- R10. "Tally Connector" moves out of the primary header button row. The download stays reachable from the site (placement decided in planning), but the header presents at most two primary actions (Book a Demo, Chat on WhatsApp).

**Footer**
- R11. The footer feature list is curated to a shortlist (roughly the lead tier) plus an "All features" link to the hub; the full ~24-link dump goes away.

**SEO safety (hard rules)**
- R12. No page is deleted, no URL changes, and every existing feature, comparison, and trade page keeps at least one crawlable HTML link from the hub and/or footer after the reorganisation.
- R13. Structured data, titles, and meta descriptions of existing pages are not regressed by the reorganisation.

**Craft and approval gates**
- R14. New hub and nav surfaces follow the existing design system (tokens, type, card and device-frame patterns in CLAUDE.md §6–7 and §11) and the Emil design-engineering craft rules for any motion or interaction added; no new fonts, colors, or one-off component patterns.
- R15. The operator eyeballs the rendered hub, header (desktop and mobile), and footer before the PR to main is merged.

---

## Acceptance Examples

- AE1. **Covers R2.** Given the homepage on a 390px-wide phone viewport, when the menu button is tapped, the hero headline and body text are not legible behind the open menu.
- AE2. **Covers R8, R9.** Given a visitor on a blog post, when they open the Features menu item in the header, they can reach any lead feature page directly without first being sent to the homepage.
- AE3. **Covers R5, R6, R12.** Given the reorganised hub, when the set of links on /features (lead tier + sections + secondary index) is compared to today's 26 hub pages, every page appears at least once and the coverage test passes.
- AE4. **Covers R10.** Given the header on any page, when a first-time visitor scans the button row, they see Book a Demo and Chat on WhatsApp only; clicking nothing in the primary row triggers a file download.

---

## Success Criteria

- The operator looks at /features and the menus and no longer reads them as messy; the hub visibly leads with the product's strongest features instead of a uniform wall of text.
- A first-time visitor can tell, from the header alone, what the product does and where to see features, pricing, and a demo — without being bounced back to the homepage.
- No SEO regression: the pages indexed today keep their URLs and crawlable links (AE3), and no placeholder or broken-looking surface remains on the walked pages.
- Handoff quality: ce-plan can produce an implementation plan from this doc without inventing any product behaviour — the only open items are the explicitly deferred planning questions below.

---

## Scope Boundaries

- No changes to the homepage's own sections or copy (recently passed operator review).
- No deleting, renaming, or rewriting any feature page's content or URL.
- No new pages and no pricing changes.
- Per-feature-page design polish (the "approach C" full cohesiveness pass) is deferred.
- No changes to the blog, partners, or company pages.

---

## Key Decisions

- Re-tier and re-present, never remove: the ~50-page long tail is SEO/AI-search surface; organising means hierarchy, not deletion.
- Proposed lead tier (operator approves or edits before ship), anchored to what the homepage and rate card already emphasise: Payment collection on Tally, Payment reminders from Tally, Tally on mobile, Tally reports on mobile, Salesman app for Tally, E-invoice from the phone, E-way bill from the phone, Import purchase from PDF.
- Comparisons and trade pages are navigation destinations for specific visitor intents, not features; they get their own sections rather than polluting the feature tiers.
- The header sells at most two actions. The installer download is a customer-onboarding tool, not a first-visit call to action.
- Evidence basis: this reorganisation answers the operator's own eyeball judgment, not observed visitor behaviour; no analytics claim is made about conversion impact.

---

## Dependencies / Assumptions

- Product visuals for lead-tier cards can be reused from the phone screenshots already on the individual feature pages (device-frame treatment per the existing pattern; raw square screenshots are a known defect class).
- The features-hub coverage test exists and gates unmapped pages; it will need extending for the new tier structure rather than deleting.
- Deploy path: PR to main, Cloudflare publishes on merge.

---

## Outstanding Questions

### Deferred to Planning

- [Affects R3][Technical] Which existing screenshot asset serves each lead card, and whether any need re-capture (the order-booking page's placeholder proves at least one asset gap).
- [Affects R8][Technical] Dropdown vs. full-width disclosure on desktop, and how the same structure renders inside the mobile menu.
- [Affects R10][User decision, small] Where the Tally Connector download lands (footer, features dropdown, or a setup page) — operator picks at the eyeball checkpoint.
- [Affects R3, R5][Needs research] Whether the hub's reveal-on-scroll animation pattern interacts with the known `.reveal`/dynamic-className blanking landmine documented in repo memory; verify during implementation.
