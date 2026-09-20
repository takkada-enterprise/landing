# Mobile eyeball of takkada.com, 2026-09-20 22:14–22:18 IST: four asks plus an audit

Ronak opened the live site (PR #120, `a1b1803`) on his Android phone the evening it went live and sent four screenshots. This note records what each one showed, what he said, and what a full phone walk of the site found alongside them. The plan that executes it is `docs/plans/2026-09-21-001-fix-mobile-eyeball-hero-journey-menu-plan.md`.

## The four asks, verbatim

| # | Screenshot | Ronak | What the pixels show |
|---|---|---|---|
| 1 | Hero bottom: the job chips `Team · Reminders · AI calls · Dis…` with a grey scrollbar under them, navy below, then the testimonial card | "Need space here" | The chip row sits in a bare navy field with the browser's horizontal scrollbar painted under it, the fourth chip is cut at the viewport edge with no hint that the row scrolls, and the white proof card starts flush against the navy band (`.hv3-proof` has `padding-top: 0` below 768px; desktop has 24px) |
| 2 | The "Follow one invoice" section top on a phone: pale band, a tall empty navy area, eyebrow, the title "From the order at the counter to the receipt in Tally.", the pinned slip bar, then `10:40 AM · AT THE RETAILER'S COUNTER` | "Need better heading so that I understand what to expect going down, journey or something" | The title names the two ends but never says the reader is about to scroll through stops. On desktop the slip's stop rail (`ORDER BILL LOAD SEND REMIND RECOVER TALLY`) carries that; the rail is `display: none` below 900px, so a phone reader has nothing that says "seven stops, you are at the first". The section also opens with 96px of navy above the eyebrow on a phone |
| 3 | Hero copy under the phone: "This is the real home screen. Tap any tile with a yellow dot to see how that part works, then come back here." at 17px, 72% white | "Highlight tap any tile, bold it increase the size, otherwise most people will ignore" | The instruction is the same weight and colour as body copy. Nothing on the page connects the words "yellow dot" to the marigold dots on the phone above |
| 4 | The open mobile menu: Features / Pricing / Partners / Blog, then `Tally Connector` (outline), `Try the demo` (white pill), `Chat on WhatsApp` (navy gradient), `Book a Demo` (white pill). Both white pills circled | "same thing" | Two full-width white pills, both ending in "demo", one row apart. They do different things: "Try the demo" opens the live app after an OTP; "Book a Demo" captures a number and continues to a calendar slot with a human. Nothing in the label or the chrome says so |

Plus: "also audit the site to make it perfect by fixing these things".

## The walk (2026-09-21, headless Chrome, 390×1600 phone viewport stepped down the page; 1440×900 desktop for the homepage)

Same classes of problem, found elsewhere:

- **Feature-page walkthrough steps dim to 40% on phones.** `.ftour-step button { opacity: 0.4 }` applies at every width; on a phone the steps below the active one read as disabled copy (seen on `/salesman-app-tally`). The homepage story already has the ruling "nothing dims on a phone: a station fills the screen on its own, so the dim would only read as a broken page" (`src/journey.css`, ≤900px block). The tour never got it.
- **Two headlines on one page say the same thing.** Hero: "Your Tally, in your pocket." Connector band six screens later: "Your Tally. Now on your phone."
- **The legal name is spelled two ways on one page.** Data-safety card: "Pay Saathi Innovation LLP" (matches CLAUDE.md §13). Footer and copyright: "Pay Saathi Innovations LLP" (`contactInfo.company`). The copyright year is a typed `2025`.

Checked and left alone: the desktop hero (copy left, phone centre, six job rows right, all readable); the feature-page hero pair "Chat on WhatsApp" + "Book a 15-min demo" (two different chromes, no "Try the demo" beside them); the pricing table; the differentiator band; the FAQ; the final CTA band.

## Decisions taken in the plan (Ronak can veto any of them)

1. **The instruction becomes the lead line.** "Tap any tile with a yellow dot." renders as a 20px/700 white `<strong>` with a real marigold dot in front of it, the same `--color-highlight` as the dots on the phone. The rest ("This is the real home screen…") stays body weight under it.
2. **The chip row gets room and loses the scrollbar.** 48px above, 64px below, the scrollbar hidden, the row bleeding to the viewport edge so the cut chip reads as "more this way", and the proof card lifted 28px off the navy on phones.
3. **The story announces itself as a journey.** Title: "One invoice, seven stops: from the order at the counter to the receipt in Tally." One lead sentence under it telling the reader to scroll and what happens to the slip. Every station carries `Stop N of 7` above its time label, which is the phone's substitute for the desktop stop rail (the feature pages already say "One invoice, seven stops" in their journey strip). Phone top padding 96 → 64px.
4. **"Book a Demo" becomes "Book a call".** The modal-driven button (menu, header fallback, company pages, and the modal's own title) is the human-conversation path, so it is named after what it is, gets a phone icon and the blue outline chrome; "Try the demo" gets a phone-screen icon and stays the white pill. Three actions, three looks, no shared word. The calendar links that say "book a 15-min demo" beside a WhatsApp button are left as they are: they never sit next to "Try the demo".
5. **Audit fixes:** tour steps stop dimming below 900px; the connector band heading becomes "Your books stay on your PC."; the company name is `Pay Saathi Innovation LLP` everywhere (the CLAUDE.md spelling) and the copyright year comes from the clock.

## Open for Ronak

- Spelling of the legal entity. The plan aligns on **"Pay Saathi Innovation LLP"** because CLAUDE.md §13 says so and the Play/App Store card already uses it. If the registered name is the plural, say so and the plan flips one constant.
- "Book a call" as the name of the modal path. If he prefers another word for the human conversation, it is one constant.
