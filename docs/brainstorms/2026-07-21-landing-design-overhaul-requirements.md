---
date: 2026-07-21
topic: landing-design-overhaul
---

# takkada.com Design Overhaul — Poster-Volume Sage

## Summary

Overhaul the homepage and shared shell (nav, CTA system, footer, mobile behavior) by turning the existing sage + Fraunces brand up to poster volume: dramatically larger editorial type, an alternating paper/ink section rhythm, a cinematic proof band, product-meaningful motion, and a WhatsApp-first conversion system including a sticky mobile CTA. This executes R16 of `docs/brainstorms/2026-07-06-takkada-com-10x-overhaul-requirements.md` with a confirmed design direction.

---

## Problem Frame

The site is clean and on-brand but reads calm rather than arresting. Visitors are mobile-first distributors who decide in seconds whether this is a serious company; the current page does not stop the scroll, and the conversion action (WhatsApp) competes with a secondary CTA at equal visual weight. Engagement of arriving visitors is healthy, so the lever is perceived quality and CTA force, not information.

---

## Requirements

**Visual system**
- R1. Keep the locked brand system: sage-only palette, Plus Jakarta Sans body + Fraunces display, existing token layer. No new fonts or hues.
- R2. Push display type to poster scale on desktop and a strong (but readable) mobile scale; hero headline is the dominant object in the first viewport.
- R3. Introduce an alternating paper/ink rhythm down the homepage: at least two deep-ink drama bands (proof band, final CTA) between warm paper sections.
- R4. The proof band presents the two confirmed figures (100+ businesses, ₹17Cr+ collected monthly) cinematically; no other scale numbers.

**Motion (each must teach, per craft rule 5)**
- R5. Hero entrance: staggered rise of headline, subhead, CTAs, phone. One-time, GPU-cheap, reduced-motion safe.
- R6. Proof-band numbers count up on first scroll-in (motion = collections arriving).
- R7. Existing scroll-reveal system is retained; no new decorative animation.

**Conversion (WhatsApp-first)**
- R8. "Chat on WhatsApp" is the single dominant CTA at every decision point; demo booking is visually secondary everywhere.
- R9. A sticky mobile CTA bar (WhatsApp) appears after the visitor scrolls past the hero, site-wide via the shared layout.
- R10. Every section ends with a clear next step; no dead ends on the walk-through.

**Mobile**
- R11. Mobile is the primary design target: type scale, spacing, tap targets, and the sticky bar are tuned at 390px first; desktop inherits.
- R12. No performance regression on low-end Android: transform/opacity motion only, no new heavyweight assets.

**Guards**
- R13. All existing tests stay green (schema.test.js plan guard, Layout tests) and `npm run build` passes.
- R14. Copy changes are minimal and follow CLAUDE.md §5 voice rules; no banned words, no new claims.

---

## Success Criteria

- The founder eyeballs the dev build and says it looks dramatically better on their phone.
- WhatsApp is unmistakably the one action on every screenful.
- Build + tests pass; site remains SSG-renderable with real content in raw HTML.

---

## Scope Boundaries

- No rebrand, no new fonts/colors (direction "turn up current brand" confirmed 2026-07-21).
- takkada.ai untouched; blog article content untouched; pricing values untouched.
- No publish: work stays on a local branch; merge to main is a publish and needs the founder.
- Inner pages inherit the upgraded shell but are not individually redesigned this round.

---

## Key Decisions

- Direction: evolve the sage/Fraunces brand to poster volume rather than dark-flip or rebrand. Rationale: brand parity with the app, lowest risk, still transformative.
- Conversion: WhatsApp chat is the one primary action; demo stays secondary. Matches how Tier 2/3 distributors behave (confirmed 2026-07-21).
