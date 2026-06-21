# Off-site presence checklist — YouTube + Reddit (GEO item #3)

**Status:** ops track, operator-owned. No code ships from this file until channel URLs exist.
**Source:** plan `docs/plans/2026-06-21-002-feat-geo-ai-search-followups-plan.md` (U6); GEO-ANALYSIS.md §5, §8.3.

AI-search engines weight off-site mentions and video heavily when deciding who to cite. The on-site work (front-loaded answers, named author, schema) is shipped; this is the off-repo half. It is a checklist, not a build task.

## YouTube

- [ ] Create a Takkada channel (handle consistent with the brand: Takkada / Pay Saathi).
- [ ] Record 3–5 short demos that mirror the product's real proof behaviours. Use real screen capture, no invented numbers:
  - [ ] Invoice from the phone → WhatsApp dispatch → UPI 0% MDR collection → auto-reconcile into Tally (the full loop).
  - [ ] Check a party's outstanding on mobile.
  - [ ] Raise an e-way bill / e-invoice from the phone.
- [ ] Keep titles answer-shaped and matched to real search intent (e.g. "How to collect a Tally invoice on UPI at 0% MDR").

## Reddit

- [ ] Create / use an authentic account; participate in Indian SME, distributor, and Tally-adjacent communities.
- [ ] Answer real threads on "Tally mobile app", "0% MDR collection", "receivables chasing". Be useful first; mention Takkada only where it genuinely answers the question.
- [ ] No astroturfing, no sockpuppets, no fake reviews (landing voice rules, `CLAUDE.md` §5/§10).

## Entity hygiene — wiring URLs back once channels are live

When the channels exist, add their URLs to the Organization `sameAs` array so crawlers merge them into one knowledge-graph node:

- File: `src/data/schema.js`, the `SAME_AS` const.
- Add the YouTube channel URL and (if used) the Reddit profile URL alongside the existing LinkedIn / Facebook / store / domain entries.
- Keep the founder's personal LinkedIn consistent with the author registry (`src/data/authors.js`, `founder.linkedin`) — see Operator Action #2 in the plan.
- `src/data/schema.test.js` already asserts `sameAs` contents; extend those assertions when you add the URLs.

No placeholder or guessed URLs go in `sameAs` — add each only when the channel is real and live.
