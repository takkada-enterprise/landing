# Site Revamp (Design Track) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Pass `model: "opus"` on every subagent dispatch (PaySaathi CLAUDE.md).

**Goal:** Rebrand takkada.com to the app's Marine (navy and blue) look and rebuild the homepage, Features hub and feature-page template around a playable phone hero and the "Follow one invoice" story.

**Architecture:** One token swap in `src/styles.css` `:root` restyles every page. Two new data modules (`screens.js`, `journey.js`) are the single source for which screen and which features belong to which stop; the hero, the story, the hub and the feature-page strip all read from them. New UI is three small React components with plain CSS transitions and one IntersectionObserver hook. No animation library.

**Tech Stack:** Vite 7, React 19, `vite-react-ssg`, plain CSS, Vitest + Testing Library (jsdom), `cwebp` (at `/opt/homebrew/bin/cwebp`) for image export.

**Spec:** `docs/brainstorms/2026-09-18-site-revamp-navy-follow-one-invoice-requirements.md` (read it first; this plan argues from it).

**Out of this plan (Plan 2, written after this ships to the branch):** the per-family capabilities files in `PaySaathi/docs/manuals/` and the new feature pages they feed (bulk invoices, van loading, maker-checker, recovery dashboard, AI calling, salesman targets and export, analytics). Plan 2 also swaps each feature page's hero image to its new mockup from `src/data/screens.js`, family by family, alongside its capabilities-sourced copy; this plan only restyles the template. Until Plan 2 lands, station pills whose page does not exist are simply not rendered (Task 5 enforces this).

## Global Constraints

- Worktree: `~/.claude/fleet/worktrees/landing__site-revamp`, branch `feat/site-revamp-navy`. Never work in the Desktop checkout (it sits on a stale branch that other sessions switch).
- **Nothing merges to `main` until all tasks are done and Ronak has looked.** Cloudflare deploys on merge. Task 1 is the only exception and ships as its own PR from its own branch.
- Do not run `npm run dev`, `npm run preview` or the full Vitest suite during the day on Ronak's Mac (it hangs the machine). Run single test files while building; run the full suite, the build and the preview walk at night.
- Colours: only the Marine hexes in the spec's token table. No sage hex (`#344E41 #1B3026 #4A7C59 #6B9E7A #B8D4BE #E7F0E8 #DAE5D6 #14241C`) anywhere in `src/`. Marigold `#FCAF1B` is an accent dot only, never a button fill.
- Type: Plus Jakarta Sans (display and body) and IBM Plex Mono (slip, time labels, stop labels only). Fraunces is removed. No other family.
- Motion (Emil Kowalski rules): animate only `transform`, `opacity`, `filter`. Never `transition: all`. Easing `cubic-bezier(0.23, 1, 0.32, 1)` via `--ease-out`. Press feedback `transform: scale(0.97)` at 160ms on every pressable. Nothing enters from `scale(0)`; start at `0.96` or above with opacity. UI transitions at or under 320ms; the stamp "thunk" is 260ms. Exits faster than enters. Hover effects only inside `@media (hover: hover) and (pointer: fine)`. Use transitions, not keyframes, for anything that can reverse (stamps, screen swaps). `prefers-reduced-motion: reduce` keeps opacity fades and drops every transform and blur.
- Copy: landing `CLAUDE.md` §5 applies. No em-dashes, no "Not X. Y." contrast structures, no banned words (seamless, world-class, enterprise-grade, revolutionary, unleash, game-changer). Every rupee amount, percentage, time and date carries `className="tabular-nums"`.
- Claims: "₹17Cr+ collected monthly" appears nowhere. "100+ businesses" is the only scale figure. AI calling copy always includes "charged on connected minutes". Bulk document import (12 at once) and the UPI QR code are not mentioned.
- Home CSS rule heads stay prefixed with `.home-v3` (existing test in `home-v3.test.jsx` enforces it).
- Commit trailer on every commit:
  ```
  Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
  ```

## Open questions for Ronak (ask before the task that needs them)

1. **Before Task 4:** "Were all the new mockup screens captured from the demo company (id 143)?" The build has a screenshot-provenance guard that fails on any app screenshot without a record. If yes, records cite company 143. If any screen came from a real customer's books, that screen is not used.
2. **Before Task 7:** "What does a finished AI call look like in the app's follow-up log (the exact words on the row)?" The call chip beside the phone must match it.

## File structure

| File | Responsibility |
|---|---|
| `src/styles.css` (modify `:root`, shadows) | The one token layer |
| `src/premium.css`, `src/home.css`, `src/feature-page.css` (modify) | Drop Fraunces re-point; hero and section styles |
| `scripts/vendorFonts.mjs`, `src/fonts.css` (regenerate) | Self-hosted Jakarta + Plex Mono |
| `scripts/exportScreens.mjs` (create) | PNG mockups to two WebP widths, from a manifest |
| `src/data/screens.js` (create) | Screen registry: slug, paths, size, alt |
| `src/data/journey.js` (create) | Seven stops: label, time, headline, body, screens, stamp, feature slugs, hub group |
| `src/data/heroHotspots.js` (create) | Nine hotspots and six job buttons for the playable phone |
| `src/hooks/useActiveStation.js` (create) | IntersectionObserver that reports the centred station index |
| `src/components/PlayablePhone.jsx` (create) | Hero phone |
| `src/components/InvoiceSlip.jsx` (create) | HTML paper slip with stamps |
| `src/components/PaperSheet.jsx` (create) | Tilted printed sheet that enlarges in a `<dialog>` |
| `src/components/FollowOneInvoice.jsx` (create) | The seven-stop section |
| `src/components/JourneyStrip.jsx` (create) | "Where this sits" strip for feature pages |
| `src/journey.css` (create, imported in `src/main.jsx` after `home.css`) | Styles for the five components above, all under `.home-v3` or `.journey-strip` |
| `src/routes/Home.jsx`, `src/data/siteContent.js` (modify) | Recompose homepage; remove dead content |
| `src/data/featureGroups.js`, `src/routes/Features.jsx` (modify) | Hub grouped by stop |
| `src/components/FeaturePage.jsx` (modify) | Navy header, journey strip |
| `src/__tests__/brand-guard.test.js` (create) | No sage hex, no Fraunces, no "17Cr" in `src/`, `content/`, `index.html` |
| `CLAUDE.md` (modify §5, §6, §7, §11.4) | Re-sync to the new truth |

---

### Task 1: Remove the "₹17Cr+ collected monthly" claim (own branch, own PR)

**Files:**
- Modify: `src/data/siteContent.js:57-59` (the `heroContent.stats` array)
- Modify: `src/components/__tests__/count-up.test.jsx` (any case that uses `17` / `Cr+`)
- Modify: `CLAUDE.md` §5 "No vanity numbers" bullet and §11.4
- Create: `src/__tests__/claims-guard.test.js`

**Interfaces:**
- Produces: `heroContent.stats` has exactly one entry, `{ value: 100, prefix: '', suffix: '+', label: 'Businesses' }`.

- [ ] **Step 1: Cut the branch in its own worktree**

```bash
cd "/Users/ronak/Desktop/PaySaathi/takkada website/landing" && git fetch origin
git worktree add ~/.claude/fleet/worktrees/landing__drop-17cr -b fix/drop-17cr-claim origin/main
cd ~/.claude/fleet/worktrees/landing__drop-17cr && npm ci
```

- [ ] **Step 2: Write the failing guard**

```js
// src/__tests__/claims-guard.test.js
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const BANNED = /(₹|\\u20B9|Rs\.?)\s?17\s?(Cr|crore)|17\s?Cr\+|Collected monthly/i;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name.startsWith('.')) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(jsx?|mjs|md|html|css|json|txt)$/.test(name)) out.push(p);
  }
  return out;
}

describe('retired public claims', () => {
  it('never states a rupee volume collected per month', () => {
    const files = [...walk(join(root, 'src')), ...walk(join(root, 'content')), join(root, 'index.html')]
      .filter((f) => !f.endsWith('claims-guard.test.js'));
    const hits = files.filter((f) => BANNED.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
```

- [ ] **Step 3: Run it and watch it fail**

Run: `npx vitest run src/__tests__/claims-guard.test.js`
Expected: FAIL, listing `src/data/siteContent.js` (and any test or content file that repeats the claim).

- [ ] **Step 4: Remove the claim**

In `src/data/siteContent.js` replace the `stats` array and its comment with:

```js
  // The one founder-confirmed public scale figure (CLAUDE.md §5). The monthly
  // rupee volume was retired on 2026-09-18 (operator direction) and
  // src/__tests__/claims-guard.test.js keeps it out.
  stats: [{ value: 100, prefix: '', suffix: '+', label: 'Businesses' }],
```

For every other file the guard lists: in tests, swap the fixture to `{ value: 100, prefix: '', suffix: '+' }`; in `content/` prose, delete the sentence that carries the figure and bump that post's `updated:` frontmatter to `2026-09-18`.

In `CLAUDE.md` §5 replace the "No vanity numbers" bullet's figure sentence with: `The one public scale figure is **100+ businesses** (platform-wide, founder-confirmed 2026-07-06). The monthly rupee volume was retired on 2026-09-18 and must not return.` Make the matching edit in §11.4.

- [ ] **Step 5: Run the guard, the count-up test and the home test**

Run: `npx vitest run src/__tests__/claims-guard.test.js src/components/__tests__/count-up.test.jsx src/routes/__tests__/home-v3.test.jsx`
Expected: PASS. If `home-v3.test.jsx` asserts two hero stats, change it to assert one stat labelled "Businesses".

- [ ] **Step 6: Commit and open the PR**

```bash
git add -A && git commit -m "fix(claims): retire the monthly rupee volume figure site-wide"
git push -u origin fix/drop-17cr-claim
gh pr create --base main --title "Retire the ₹17Cr+ monthly claim" --body "Operator direction 2026-09-18. Removes the figure from hero stats, tests, content and CLAUDE.md, and adds a guard test."
```

Do not merge. Tell Ronak the PR number; the full build runs at night before merge.

---

### Task 2: Marine tokens

**Files:**
- Modify: `src/styles.css` `:root` block (starts line 21) and the `--shadow-*` tokens below it
- Modify: `index.html:15` (`theme-color`)
- Create: `src/__tests__/brand-guard.test.js`

**Interfaces:**
- Produces CSS custom properties used by every later task: `--color-primary #006EA6`, `--color-navy #1E3A6B`, `--color-primary-dark`/`--color-ink`/`--color-dark #0F1F3D`, `--color-navy-lift #2B5290`, `--color-primary-light #149EC2`, `--color-accent #9CCBEA`, `--color-wash #DCF2FB`, `--color-highlight #FCAF1B`, `--color-bg #F7FAFC`, `--color-surface #EEF5FA`, `--color-text #0E1C2A`, `--color-text-secondary #44687D`, `--color-text-muted #8FB4C7`, `--color-border #D4E6F0`, `--color-paper #FBF9F2`, `--stamp-blue #1F5FBF`, `--stamp-green #0E8A5F`, `--stamp-red #C2372F`, `--ease-out cubic-bezier(0.23,1,0.32,1)`, `--font-mono`.

- [ ] **Step 1: Write the failing guard**

```js
// src/__tests__/brand-guard.test.js
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const src = resolve(__dirname, '..');
const SAGE = /#(344E41|1B3026|4A7C59|6B9E7A|B8D4BE|E7F0E8|DAE5D6|14241C|E8F0E8|DEEBDD|E4EFE4|DCE9E0|EDF2EA)\b/i;

function cssFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) cssFiles(p, out);
    else if (/\.(css|jsx?)$/.test(name) && !name.endsWith('brand-guard.test.js')) out.push(p);
  }
  return out;
}

describe('Marine brand', () => {
  it('leaves no sage hex anywhere in src', () => {
    const hits = cssFiles(src).filter((f) => SAGE.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });

  it('defines the Marine tokens on :root', () => {
    const css = readFileSync(join(src, 'styles.css'), 'utf8');
    for (const [name, hex] of [
      ['--color-primary', '#006EA6'], ['--color-navy', '#1E3A6B'], ['--color-ink', '#0F1F3D'],
      ['--color-wash', '#DCF2FB'], ['--color-highlight', '#FCAF1B'], ['--color-bg', '#F7FAFC'],
      ['--color-text', '#0E1C2A'],
    ]) {
      expect(css).toMatch(new RegExp(`${name}:\\s*${hex}`, 'i'));
    }
  });
});
```

- [ ] **Step 2: Run it and watch it fail**

Run: `npx vitest run src/__tests__/brand-guard.test.js`
Expected: FAIL on both cases.

- [ ] **Step 3: Replace the colour tokens in `src/styles.css` `:root`**

Replace everything from `/* Brand sage */` down to the `/* Status */` group's last line with:

```css
  /* Brand: the app's Marine palette (takkada lib/theme/color_palettes.dart).
     Old sage token NAMES are kept as aliases so every existing rule restyles
     without edits; brand-guard.test.js keeps the old HEXES out. */
  --color-primary: #006EA6;          /* Tally blue: buttons, links, icons */
  --color-navy: #1E3A6B;
  --color-navy-lift: #2B5290;
  --color-primary-dark: #0F1F3D;     /* deepest navy: hero, story band, footer */
  --color-primary-light: #149EC2;
  --color-accent: #9CCBEA;           /* emphasis on navy, AA on #0F1F3D */
  --color-sage: var(--color-primary-light);
  --color-sage-light: #9CCBEA;       /* label-on-dark */
  --color-wash: #DCF2FB;
  --color-sage-bg: var(--color-wash);
  --color-container: #DCF2FB;
  --color-on-container: #0F1F3D;
  --color-ink: #0F1F3D;
  --color-highlight: #FCAF1B;        /* marigold: accent dots only, never buttons */

  --tint-mint: #DCF2FB;
  --tint-peach: #EAF3F9;
  --tint-rose: #EEF5FA;
  --tint-sky: #DCF2FB;
  --tint-sand: #F7FAFC;

  /* Surfaces */
  --color-bg: #F7FAFC;
  --color-white: #FFFFFF;
  --color-surface: #EEF5FA;
  --color-surface-alt: #EAF3F9;
  --color-surface-variant: #EEF5FA;
  --color-dark: #0F1F3D;
  --color-dark-bg: #0F1F3D;
  --color-paper: #FBF9F2;            /* invoice slip and printed sheets only */

  /* Text */
  --color-text: #0E1C2A;
  --color-text-secondary: #44687D;
  --color-text-muted: #8FB4C7;
  --color-text-light: #FFFFFF;

  /* Lines */
  --color-border: #D4E6F0;
  --color-border-light: #EAF3F9;
  --color-hairline: #EAF3F9;

  /* Status (same as the app) */
  --color-success: #059669;
  --color-danger: #DC2626;
  --color-warning: #D97706;

  /* Stamp inks: invoice slip only */
  --stamp-blue: #1F5FBF;
  --stamp-green: #0E8A5F;
  --stamp-red: #C2372F;
```

In the same block set `--ease-out: cubic-bezier(0.23, 1, 0.32, 1);` and add `--font-mono: 'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace;` under `--font-serif`.

- [ ] **Step 4: Re-tint the shadows and sweep literals**

Run: `grep -nE "rgba\(20, ?36, ?28" src/*.css | wc -l` then replace every `rgba(20,36,28,` / `rgba(20, 36, 28,` with `rgba(14, 28, 42,` across `src/*.css`. Then run the guard; for each file it still lists, replace the literal sage hex with the matching `var(--color-…)` token from Step 3 (dark sage → `var(--color-primary-dark)`, mid sage → `var(--color-primary)`, pale sage → `var(--color-wash)`). In `index.html` set `<meta name="theme-color" content="#0F1F3D" />`.

- [ ] **Step 5: Run the guard**

Run: `npx vitest run src/__tests__/brand-guard.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(brand): swap the token layer to the app's Marine palette"
```

---

### Task 3: One type family plus a mono utility face

**Files:**
- Modify: `scripts/vendorFonts.mjs:37-41` (`GOOGLE_CSS_URL`)
- Regenerate: `src/fonts.css`, `public/assets/fonts/*`
- Modify: `src/premium.css:8-16` (remove the Fraunces re-point), `src/__tests__/fonts.test.js`
- Modify: `src/__tests__/brand-guard.test.js` (add a Fraunces case)

**Interfaces:**
- Consumes: `--font-mono` from Task 2.
- Produces: `fonts.css` declares only `Plus Jakarta Sans` (400;500;600;700;800) and `IBM Plex Mono` (400;500;600). `var(--font-serif)` resolves to Plus Jakarta Sans everywhere (it already does in `styles.css:76`; only the `premium.css` override made it Fraunces).

- [ ] **Step 1: Add the failing case to `brand-guard.test.js`**

```js
  it('ships no Fraunces anywhere', () => {
    const hits = cssFiles(src).filter((f) => /Fraunces/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
```

Run: `npx vitest run src/__tests__/brand-guard.test.js` — Expected: FAIL listing `fonts.css`, `premium.css`, `home.css`.

- [ ] **Step 2: Point the vendoring script at the new families**

In `scripts/vendorFonts.mjs` set:

```js
export const GOOGLE_CSS_URL =
  'https://fonts.googleapis.com/css2' +
  '?family=IBM+Plex+Mono:wght@400;500;600' +
  '&family=Plus+Jakarta+Sans:wght@400;500;600;700;800' +
  '&display=swap';
```

Run: `node scripts/vendorFonts.mjs` then `git status --short public/assets/fonts src/fonts.css`. Delete any `public/assets/fonts/fraunces-*.woff2` the script no longer references.

- [ ] **Step 3: Remove the Fraunces re-point**

In `src/premium.css` delete the `--font-display` and `--font-serif: var(--font-display);` declarations and the "One tasteful type addition" comment line. Reword the comments in `src/home.css:9` and `src/premium.css:221` that name Fraunces so the word no longer appears.

- [ ] **Step 4: Update `src/__tests__/fonts.test.js`**

Wherever the test lists the families the site depends on, the list becomes `['Plus Jakarta Sans', 'IBM Plex Mono']`. Keep every other assertion (woff2 exists, `font-display: swap`, unicode-range, no Google hosts, no preload).

- [ ] **Step 5: Run both font tests**

Run: `npx vitest run src/__tests__/fonts.test.js src/__tests__/brand-guard.test.js`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(type): retire Fraunces; self-host Plus Jakarta Sans and IBM Plex Mono"
```

---

### Task 4: Screen export pipeline and registry

Ask Ronak Open Question 1 before starting.

**Files:**
- Create: `scripts/exportScreens.mjs`, `scripts/screens.manifest.json`, `src/data/screens.js`, `src/data/__tests__/screens.test.js`
- Modify: `scripts/checkImageBudgets.mjs` (`BUDGETS`), `content/image-provenance.json`
- Output: `public/assets/screens/<slug>-360.webp` and `-720.webp`

**Interfaces:**
- Produces: `export const SCREENS` (object keyed by slug) and `export function screen(slug)` returning `{ slug, src, srcSet, width, height, alt }`. Throws on an unknown slug. Phone screens are 966:2000; sheets carry their own ratio.

Source filenames in `public/assets/screenshots/latest mockup/` do not always match what the file shows (`Team Sales.png` is the "Review invoices, Create 7 invoices" screen). **Open each source PNG and confirm `shows` before exporting.**

- [ ] **Step 1: Write the manifest**

```json
[
  { "slug": "home", "source": "homepage.png", "shows": "Home: payable, receivable, quick action tiles", "alt": "Takkada home screen showing total receivable and quick action tiles" },
  { "slug": "pending-orders", "source": "Pending order.png", "shows": "Pending Orders by party with Make Invoice", "alt": "Pending orders listed by party with a Make Invoice action" },
  { "slug": "review-invoices", "source": "Team Sales.png", "shows": "Review invoices, Create 7 invoices", "alt": "Review screen creating seven invoices in one go" },
  { "slug": "einvoice-eway", "source": "Auto einv and eway.png", "shows": "E-invoice and e-way bill on the invoice", "alt": "Invoice with e-invoice and e-way bill generated" },
  { "slug": "van-loading", "source": "Van Loading.png", "shows": "Van loading", "alt": "Van loading screen with drops in route order" },
  { "slug": "invoice-sent", "source": "making challans & invoices.png", "shows": "Making challans and invoices", "alt": "Challans and invoices being made for a van" },
  { "slug": "reminders", "source": "Reminder payment.png", "shows": "Collect, Reminders tab", "alt": "Payment reminders queued for overdue parties" },
  { "slug": "followup-log", "source": "followup log -revery dashbaord.png", "shows": "Log follow-up with promise to pay", "alt": "Follow-up log with call outcome and promise to pay" },
  { "slug": "recovery-team", "source": "Recovery dashboard team logging.png", "shows": "Recovery, Team tab", "alt": "Recovery board showing amount recovered per team member" },
  { "slug": "settlements", "source": "Settlements.png", "shows": "Collect, Settlements tab", "alt": "UPI settlements listed by party" },
  { "slug": "party-list", "source": "Party list color coded due overdue.png", "shows": "Parties colour coded by due and overdue", "alt": "Party list colour coded by due and overdue" },
  { "slug": "document-import", "source": "DOCUMENT import.png", "shows": "Document import", "alt": "Document import reading a supplier bill" },
  { "slug": "godown-stock", "source": "Godown Wise stock.png", "shows": "Godown wise stock", "alt": "Stock split by godown" },
  { "slug": "salesman-summary", "source": "Sales Man summary.png", "shows": "Salesman summary", "alt": "Salesman summary with sales and collections" },
  { "slug": "sales-analytics", "source": "Sales Anlaytics.png", "shows": "Sales analytics", "alt": "Sales analytics with monthly trend" },
  { "slug": "sheet-loading", "source": "Picking List.png", "shows": "Printed loading sheet", "alt": "Printed loading sheet with load list by item", "sheet": true },
  { "slug": "sheet-salesman", "source": "salesman wise summary report.png", "shows": "Team Sales export", "alt": "Exported team sales sheet by member", "sheet": true }
]
```

- [ ] **Step 2: Write the exporter**

```js
// scripts/exportScreens.mjs
// Exports the operator's PNG mockups to two WebP widths. Phone screens are
// shown at up to 340 CSS px, so 360w and 720w cover 1x and 2x. Sheets are
// wider on screen, so they export at 720w and 1440w.
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = resolve(root, 'public/assets/screenshots/latest mockup');
const outDir = resolve(root, 'public/assets/screens');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/screens.manifest.json'), 'utf8'));

mkdirSync(outDir, { recursive: true });
for (const { slug, source, sheet } of manifest) {
  const input = resolve(srcDir, source);
  if (!existsSync(input)) throw new Error(`Missing source for ${slug}: ${source}`);
  for (const w of sheet ? [720, 1440] : [360, 720]) {
    execFileSync('cwebp', ['-quiet', '-q', '80', '-resize', String(w), '0', input, '-o', resolve(outDir, `${slug}-${w}.webp`)]);
  }
}
console.log(`Exported ${manifest.length} screens to public/assets/screens`);
```

Run: `node scripts/exportScreens.mjs && ls -la public/assets/screens | head -40`
Expected: 34 files. If `home-720.webp` is over 64,000 bytes, lower its quality to 74 by adding a `"q": 74` field to that manifest row and reading `q ?? 80` in the script.

- [ ] **Step 3: Write the failing registry test**

```js
// src/data/__tests__/screens.test.js
import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { SCREENS, screen } from '../screens';

const root = resolve(__dirname, '../../..');
const manifest = JSON.parse(readFileSync(resolve(root, 'scripts/screens.manifest.json'), 'utf8'));

describe('screen registry', () => {
  it('has one entry per manifest row and nothing else', () => {
    expect(Object.keys(SCREENS).sort()).toEqual(manifest.map((m) => m.slug).sort());
  });
  it('points every src and srcSet candidate at a file on disk', () => {
    for (const s of Object.values(SCREENS)) {
      for (const url of [s.src, ...s.srcSet.split(',').map((c) => c.trim().split(' ')[0])]) {
        expect(existsSync(resolve(root, 'public', url.replace(/^\//, ''))), url).toBe(true);
      }
    }
  });
  it('gives every screen alt text and intrinsic size', () => {
    for (const s of Object.values(SCREENS)) {
      expect(s.alt.length).toBeGreaterThan(10);
      expect(s.width).toBeGreaterThan(0);
      expect(s.height).toBeGreaterThan(0);
    }
  });
  it('throws on an unknown slug instead of rendering a broken image', () => {
    expect(() => screen('nope')).toThrow(/Unknown screen/);
  });
});
```

Run: `npx vitest run src/data/__tests__/screens.test.js` — Expected: FAIL, module not found.

- [ ] **Step 4: Write the registry**

```js
// src/data/screens.js
// Single registry of app screens used by the hero, the journey, the hub and
// feature pages. JSX-free so Node can load it from tests and scripts.
// Regenerate the files with: node scripts/exportScreens.mjs
const phone = (slug, alt) => ({
  slug, alt, width: 360, height: 745,
  src: `/assets/screens/${slug}-360.webp`,
  srcSet: `/assets/screens/${slug}-360.webp 360w, /assets/screens/${slug}-720.webp 720w`,
});
const sheet = (slug, alt, width, height) => ({
  slug, alt, width, height,
  src: `/assets/screens/${slug}-720.webp`,
  srcSet: `/assets/screens/${slug}-720.webp 720w, /assets/screens/${slug}-1440.webp 1440w`,
});

export const SCREENS = {
  home: phone('home', 'Takkada home screen showing total receivable and quick action tiles'),
  'pending-orders': phone('pending-orders', 'Pending orders listed by party with a Make Invoice action'),
  'review-invoices': phone('review-invoices', 'Review screen creating seven invoices in one go'),
  'einvoice-eway': phone('einvoice-eway', 'Invoice with e-invoice and e-way bill generated'),
  'van-loading': phone('van-loading', 'Van loading screen with drops in route order'),
  'invoice-sent': phone('invoice-sent', 'Challans and invoices being made for a van'),
  reminders: phone('reminders', 'Payment reminders queued for overdue parties'),
  'followup-log': phone('followup-log', 'Follow-up log with call outcome and promise to pay'),
  'recovery-team': phone('recovery-team', 'Recovery board showing amount recovered per team member'),
  settlements: phone('settlements', 'UPI settlements listed by party'),
  'party-list': phone('party-list', 'Party list colour coded by due and overdue'),
  'document-import': phone('document-import', 'Document import reading a supplier bill'),
  'godown-stock': phone('godown-stock', 'Stock split by godown'),
  'salesman-summary': phone('salesman-summary', 'Salesman summary with sales and collections'),
  'sales-analytics': phone('sales-analytics', 'Sales analytics with monthly trend'),
  'sheet-loading': sheet('sheet-loading', 'Printed loading sheet with load list by item', 720, 335),
  'sheet-salesman': sheet('sheet-salesman', 'Exported team sales sheet by member', 720, 439),
};

export function screen(slug) {
  const s = SCREENS[slug];
  if (!s) throw new Error(`Unknown screen "${slug}". Add it to scripts/screens.manifest.json and src/data/screens.js.`);
  return s;
}
```

Run the test again — Expected: PASS.

- [ ] **Step 5: Budgets and provenance**

Add to `BUDGETS` in `scripts/checkImageBudgets.mjs`:

```js
  ['public/assets/screens/home-720.webp', 64_000, 'homepage LCP element (playable phone)'],
```

Run: `node scripts/checkImageBudgets.mjs` — Expected: all within budget.

Run: `node scripts/checkScreenshotProvenance.mjs` — Expected: FAIL naming each new `public/assets/screens/*.webp` with the fields its record needs. Using Ronak's answer to Open Question 1, add one `images` record per file to `content/image-provenance.json` exactly as the guard's output specifies, with `kind: "appScreenshot"`, the demo company id from the file's `demoCompanyId`, `reviewedOn: "2026-09-18"`, `reviewedBy: "Ronak (operator mockups, latest mockup folder)"`, and `origin` naming the source PNG from the manifest. Each 360w and 720w file is its own record (a resize is new bytes) and names its source PNG. Re-run until it passes, then run `npx vitest run scripts/__tests__/screenshot-provenance.test.mjs` — Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat(screens): export the new app mockups to WebP behind one registry"
```

---

### Task 5: Journey and hero data

**Files:**
- Create: `src/data/journey.js`, `src/data/heroHotspots.js`, `src/data/__tests__/journey.test.js`

**Interfaces:**
- Consumes: `screen(slug)` from Task 4; `FEATURE_PAGES` from `src/data/featurePages.js` (array of objects with `slug` and `title`).
- Produces:
  - `export const INVOICE = { number, short, party, place, lines: [{label, amount}], total }`
  - `export const STOPS`: array of `{ id, label, when, headline, body, screens: string[], sheet: string|null, stamp: {text, tone: 'blue'|'ink'|'green'|'red', size?: 'lg'}, status, features: [{label, slug}], note?: string }`
  - `export function liveFeatures(stop, pages)` returns only features whose `slug` exists in `pages`
  - `export const HOTSPOTS`: `[{ key, label, screen, box: {left, top, width, height} (percent strings), overline, headline, body, href }]`
  - `export const JOBS`: `[{ key, label, hint }]` where `key` matches a hotspot key
  - `export const HERO_HOME = { overline, headline, body }`

- [ ] **Step 1: Write the failing test**

```js
// src/data/__tests__/journey.test.js
import { describe, it, expect } from 'vitest';
import { STOPS, INVOICE, liveFeatures } from '../journey';
import { HOTSPOTS, JOBS } from '../heroHotspots';
import { SCREENS } from '../screens';
import { FEATURE_PAGES } from '../featurePages';

describe('journey data', () => {
  it('runs the seven stops in order', () => {
    expect(STOPS.map((s) => s.id)).toEqual(['order', 'bill', 'load', 'send', 'remind', 'recover', 'tally']);
  });
  it('uses only registered screens and sheets', () => {
    for (const s of STOPS) {
      for (const slug of [...s.screens, ...(s.sheet ? [s.sheet] : [])]) expect(SCREENS[slug], slug).toBeDefined();
    }
    for (const h of HOTSPOTS) expect(SCREENS[h.screen], h.screen).toBeDefined();
  });
  it('drops a feature pill whose page does not exist, so no pill is a dead link', () => {
    const pages = [{ slug: 'real-page' }];
    const stop = { features: [{ label: 'A', slug: 'real-page' }, { label: 'B', slug: 'ghost' }] };
    expect(liveFeatures(stop, pages)).toEqual([{ label: 'A', slug: 'real-page' }]);
  });
  it('leaves every stop with at least one live pill on the real page list', () => {
    for (const s of STOPS) expect(liveFeatures(s, FEATURE_PAGES).length, s.id).toBeGreaterThan(0);
  });
  it('says AI calling is charged on connected minutes wherever it is named', () => {
    const recover = STOPS.find((s) => s.id === 'recover');
    expect(`${recover.body} ${recover.note ?? ''}`).toMatch(/charged on connected minutes/);
  });
  it('maps every hero job button to a hotspot', () => {
    for (const j of JOBS) expect(HOTSPOTS.some((h) => h.key === j.key), j.key).toBe(true);
  });
  it('keeps the slip arithmetic honest', () => {
    const sum = INVOICE.lines.reduce((n, l) => n + l.amount, 0);
    expect(Math.round(sum * 100)).toBe(Math.round(INVOICE.total * 100));
  });
});
```

Run: `npx vitest run src/data/__tests__/journey.test.js` — Expected: FAIL, module not found.

- [ ] **Step 2: Write `src/data/journey.js`**

```js
// src/data/journey.js
// "Follow one invoice": the one story the homepage tells. The stops are a true
// sequence (an invoice really does pass through them in this order), which is
// why they are ordered and timed. JSX-free: tests and scripts load it in Node.
//
// Feature slugs point at existing feature pages. A slug with no page is dropped
// at render time by liveFeatures(), never rendered as a dead link. New pages
// arrive with Plan 2 (capabilities files) and light up their pill on their own.

export const INVOICE = {
  number: 'INV/26-27/0032',
  short: '0032',
  party: 'Annapurna Kirana',
  place: 'Dibrugarh · 30 day terms',
  lines: [
    { label: 'Groundnut Oil 15L × 36', amount: 73407.6 },
    { label: 'Sugar 50kg Bag × 29', amount: 63549.16 },
    { label: 'Besan 25kg Bag × 28', amount: 34515.6 },
    { label: '+ 4 more items', amount: 14947.8 },
  ],
  total: 186420.16,
};

export const STOPS = [
  {
    id: 'order', label: 'Order', when: '10:40 AM · At the retailer\'s counter',
    headline: 'Your salesman takes the order on his phone.',
    body: 'He sees only his own parties, live stock and the right price level. The order is in your pending list before he has left the shop.',
    screens: ['pending-orders'], sheet: null,
    stamp: { text: 'ORDER #118', tone: 'blue' }, status: 'ORDER TAKEN AT THE SHOP',
    features: [
      { label: 'Salesman app', slug: 'salesman-app-tally' },
      { label: 'Order booking', slug: 'order-booking-app-tally' },
      { label: 'Visit tracking', slug: 'salesman-visit-tracking-photo-proof' },
      { label: 'Restrict what he sees', slug: 'restrict-salesman-access-tally' },
    ],
  },
  {
    id: 'bill', label: 'Bill', when: '11:05 AM · In the office',
    headline: 'Seven orders become seven invoices in one go, each with its e-invoice and e-way bill.',
    body: 'Review the lot on one screen and create them together. The IRN and e-way bill number are written back against the same voucher in Tally.',
    screens: ['review-invoices', 'einvoice-eway'], sheet: null,
    stamp: { text: 'IRN + E-WAY ✓', tone: 'blue' }, status: 'BILLED · IRN AND E-WAY GENERATED',
    features: [
      { label: 'E-invoice from the phone', slug: 'e-invoice-from-phone' },
      { label: 'E-way bill from the phone', slug: 'e-way-bill-from-phone' },
      { label: 'Import a bill from PDF', slug: 'import-purchase-from-pdf' },
      { label: 'Handwritten order to Tally', slug: 'handwritten-order-to-tally' },
    ],
  },
  {
    id: 'load', label: 'Load', when: '1:30 PM · At the godown',
    headline: 'The van is loaded from a printed sheet, godown by godown.',
    body: 'Tick the orders, pick the van, and print the loading sheet. What actually went is keyed back before the challans and invoices are made.',
    screens: ['van-loading'], sheet: 'sheet-loading',
    stamp: { text: 'ON VAN 2', tone: 'ink' }, status: 'LOADED ON VAN 2',
    features: [
      { label: 'Godown wise stock', slug: 'godown-wise-stock-on-mobile' },
      { label: 'Delivery challan', slug: 'delivery-challan-from-mobile' },
      { label: 'Godown on the invoice', slug: 'godown-on-sales-invoice-delivery-challan' },
    ],
  },
  {
    id: 'send', label: 'Send', when: '1:31 PM · On the retailer\'s phone',
    headline: 'The invoice reaches the customer on WhatsApp the second you save it.',
    body: 'The PDF, the amount and a pay link go out in one message. Nobody in your office presses send.',
    screens: ['invoice-sent'], sheet: null,
    stamp: { text: 'WHATSAPP ✓✓', tone: 'green' }, status: 'DELIVERED ON WHATSAPP',
    features: [
      { label: 'Auto invoice dispatch', slug: 'auto-invoice-dispatch-tally' },
      { label: 'Your invoice format', slug: 'custom-invoice-template-tally' },
      { label: 'Share a ledger statement', slug: 'share-ledger-statement-whatsapp' },
    ],
  },
  {
    id: 'remind', label: 'Remind', when: 'Day 28 · 10:00 AM',
    headline: 'The reminder goes out. You don\'t make the call.',
    body: 'Overdue parties get a WhatsApp reminder with the amount and a pay link, on the schedule you set.',
    screens: ['reminders'], sheet: null,
    stamp: { text: 'REMINDED', tone: 'ink' }, status: 'REMINDED ON DAY 28',
    features: [
      { label: 'Automatic reminders', slug: 'send-payment-reminders-automatically' },
      { label: 'Reminder schedule', slug: 'scheduled-payment-reminders-tally' },
      { label: 'UPI collection, zero MDR', slug: 'nil-mdr-upi-collection-on-tally-invoices' },
    ],
  },
  {
    id: 'recover', label: 'Recover', when: 'Day 30 · No reply yet',
    headline: 'No reply to the reminder, so Takkada makes the call.',
    body: 'An AI call in the party\'s own language asks for the payment and logs what they said. AI calling is charged on connected minutes. Your team\'s own follow-ups sit in the same log, and the recovery board shows who recovered what.',
    screens: ['followup-log', 'recovery-team'], sheet: null,
    stamp: { text: 'PAID', tone: 'red', size: 'lg' }, status: 'PROMISED ON THE CALL · PAID BY UPI',
    features: [
      { label: 'Outstanding by age', slug: 'debtor-ageing-report-on-phone' },
      { label: 'Receivables on mobile', slug: 'outstanding-receivables-on-mobile' },
      { label: 'Payment collection', slug: 'payment-collection-tally' },
    ],
  },
  {
    id: 'tally', label: 'Tally', when: 'Day 30 · 9:00 PM',
    headline: 'The receipt is already in Tally. The 9 PM reconciliation is gone.',
    body: 'The payment settles against the right invoice and shows in tonight\'s reports. Export the day\'s salesman sheet and share it as it is.',
    screens: ['settlements'], sheet: 'sheet-salesman',
    stamp: { text: 'IN TALLY ✓', tone: 'green' }, status: 'RECEIPT POSTED IN TALLY · NOTHING RE-TYPED',
    features: [
      { label: 'Split one payment across invoices', slug: 'how-to-split-upi-payment-across-tally-invoices' },
      { label: 'Tally reports on mobile', slug: 'tally-reports-on-mobile' },
      { label: 'Daily sales report', slug: 'daily-sales-report-tally-mobile' },
    ],
  },
];

export function liveFeatures(stop, pages) {
  const known = new Set(pages.map((p) => p.slug));
  return stop.features.filter((f) => known.has(f.slug));
}
```

- [ ] **Step 3: Write `src/data/heroHotspots.js`**

Percentages are measured on `homepage.png` (966 × 2000) and hold for any resize of that same file.

```js
// src/data/heroHotspots.js
export const HERO_HOME = {
  overline: 'Tap any tile on the phone',
  headline: 'Your Tally, in your pocket. Go on, use it.',
  body: 'This is the real home screen. Tap a tile with a yellow dot and the app opens that screen, the way it will on your phone.',
};

const tile = (col, row) => ({
  left: ['8.1%', '37%', '65.8%'][col], top: ['46.6%', '57.8%', '69%'][row], width: '26.4%', height: '10%',
});
const nav = (left) => ({ left, top: '88%', width: '16%', height: '7.5%' });

export const HOTSPOTS = [
  { key: 'import', label: 'Import', screen: 'document-import', box: tile(1, 0), href: '/import-purchase-from-pdf',
    overline: 'Bill · Import', headline: 'Photo of a bill in. Invoice out.',
    body: 'Share a supplier PDF or a photo from WhatsApp. Takkada reads the party, items and tax, checks the bill\'s own maths, and you approve it into Tally.' },
  { key: 'reminders', label: 'Reminders', screen: 'reminders', box: tile(2, 0), href: '/send-payment-reminders-automatically',
    overline: 'Collect · Reminders', headline: 'The reminder goes out. You don\'t make the call.',
    body: 'Overdue parties get a WhatsApp reminder with the amount and a pay link, on the schedule you set.' },
  { key: 'stock', label: 'Stock', screen: 'godown-stock', box: tile(0, 1), href: '/godown-wise-stock-on-mobile',
    overline: 'Stock · Godown wise', headline: 'Know what is in which godown before you promise it.',
    body: 'Live stock from Tally, split by godown, so nobody books what you don\'t have.' },
  { key: 'team', label: 'Team', screen: 'salesman-summary', box: tile(1, 1), href: '/salesman-app-tally',
    overline: 'Team · Salesmen', headline: 'See what each salesman sold and collected today.',
    body: 'Each salesman sees only his own parties. You see all of them, side by side.' },
  { key: 'pending', label: 'Pending', screen: 'pending-orders', box: tile(2, 1), href: '/order-booking-app-tally',
    overline: 'Sell · Pending orders', headline: 'Orders taken at the counter, waiting to be billed.',
    body: 'Every pending order by party, with one tap to make the invoice.' },
  { key: 'dispatch', label: 'Dispatch', screen: 'van-loading', box: tile(0, 2), href: '/delivery-challan-from-mobile',
    overline: 'Dispatch · Van loading', headline: 'Load the van from a sheet, then bill the whole beat.',
    body: 'Tick the orders, pick the van, print the loading sheet, and make the challans and invoices together.' },
  { key: 'parties', label: 'Parties', screen: 'party-list', box: nav('24%'), href: '/outstanding-receivables-on-mobile',
    overline: 'Parties', headline: 'Red is overdue. Amber is due this week.',
    body: 'Every party colour coded, so you know who to chase without opening a ledger.' },
  { key: 'collect', label: 'Collect', screen: 'settlements', box: nav('60%'), href: '/payment-collection-tally',
    overline: 'Collect · Settlements', headline: 'UPI money in, matched to the right invoice.',
    body: 'Each payment settles to your bank and lands in Tally against the correct bill.' },
  { key: 'reports', label: 'Reports', screen: 'sales-analytics', box: nav('78%'), href: '/tally-reports-on-mobile',
    overline: 'Reports', headline: '20+ reports, without walking to the Tally PC.',
    body: 'Sales, purchases, items and parties, for any period, on your phone.' },
];

export const JOBS = [
  { key: 'reminders', label: 'Collect', hint: 'Reminders with pay links' },
  { key: 'import', label: 'Bill', hint: 'A bill photo becomes an invoice' },
  { key: 'dispatch', label: 'Dispatch', hint: 'Load the van' },
  { key: 'stock', label: 'Stock', hint: 'Godown wise' },
  { key: 'team', label: 'Team', hint: 'Salesman summary' },
  { key: 'reports', label: 'Reports', hint: 'Sales analytics' },
];
```

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/data/__tests__/journey.test.js`
Expected: PASS. If "at least one live pill" fails for a stop, a slug is misspelt: check it with `grep -n "slug: '<slug>'" src/data/featurePages*.js` and correct the spelling. Do not weaken the test.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(journey): data for the seven stops and the playable phone"
```

---

### Task 6: PlayablePhone component

**Files:**
- Create: `src/components/PlayablePhone.jsx`, `src/components/__tests__/playable-phone.test.jsx`, `src/journey.css`
- Modify: `src/main.jsx` (add `import './journey.css';` directly after `import './home.css';`)

**Interfaces:**
- Consumes: `HOTSPOTS`, `JOBS`, `HERO_HOME` (Task 5); `screen()` (Task 4).
- Produces: `<PlayablePhone onChange={(hotspot|null) => void} activeKey={string|null} />`. Controlled: the parent owns which hotspot is open so the hero copy and the job buttons stay in step. Exports `default PlayablePhone`.

Motion reasons (goes in the file header): the open animation explains where the screen came from (scales from the tapped tile), so it earns its place; the hint dot is the only ambient motion and stops under reduced motion.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/__tests__/playable-phone.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen as ui, fireEvent } from '@testing-library/react';
import PlayablePhone from '../PlayablePhone';

describe('PlayablePhone', () => {
  it('renders the home screen and nine labelled hotspot buttons', () => {
    render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    expect(ui.getByAltText(/home screen/i)).toBeInTheDocument();
    expect(ui.getAllByRole('button', { name: /^Open / })).toHaveLength(9);
  });
  it('reports the tapped hotspot to the parent', () => {
    const onChange = vi.fn();
    render(<PlayablePhone activeKey={null} onChange={onChange} />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Reminders' }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ key: 'reminders' }));
  });
  it('shows the opened screen, hides the hotspots from tab order, and offers Back', () => {
    const onChange = vi.fn();
    render(<PlayablePhone activeKey="reminders" onChange={onChange} />);
    expect(ui.getByAltText(/Payment reminders queued/)).toBeInTheDocument();
    expect(ui.queryAllByRole('button', { name: /^Open / })).toHaveLength(0);
    fireEvent.click(ui.getByRole('button', { name: /Back to home screen/ }));
    expect(onChange).toHaveBeenCalledWith(null);
  });
});
```

Run: `npx vitest run src/components/__tests__/playable-phone.test.jsx` — Expected: FAIL, module not found.

- [ ] **Step 2: Write the component**

```jsx
// src/components/PlayablePhone.jsx
// The hero: the real home screen with tappable tiles.
// Motion (CLAUDE.md §11.5): the opened screen scales from the tapped tile so
// the visitor sees where it came from. The marigold hint dot is the only
// ambient motion and is switched off under prefers-reduced-motion.
import { useRef } from 'react';
import { HOTSPOTS } from '../data/heroHotspots';
import { screen } from '../data/screens';

export default function PlayablePhone({ activeKey, onChange }) {
  const origin = useRef({ x: '50%', y: '50%' });
  const home = screen('home');
  const active = HOTSPOTS.find((h) => h.key === activeKey) ?? null;
  const opened = active ? screen(active.screen) : null;

  function open(h) {
    origin.current = {
      x: `calc(${h.box.left} + ${h.box.width} / 2)`,
      y: `calc(${h.box.top} + ${h.box.height} / 2)`,
    };
    onChange(h);
  }

  return (
    <div className={`pphone${active ? ' is-open' : ''}`}>
      <img className="pphone-base" src={home.src} srcSet={home.srcSet} sizes="(max-width: 700px) 70vw, 340px"
        width={home.width} height={home.height} alt={home.alt} fetchpriority="high" decoding="async" />
      {opened && (
        <img key={opened.slug} className="pphone-screen" src={opened.src} srcSet={opened.srcSet}
          sizes="(max-width: 700px) 70vw, 340px" width={opened.width} height={opened.height} alt={opened.alt}
          style={{ transformOrigin: `${origin.current.x} ${origin.current.y}` }} />
      )}
      {!active && HOTSPOTS.map((h) => (
        <button key={h.key} type="button" className="pphone-hot" style={h.box}
          aria-label={`Open ${h.label}`} onClick={() => open(h)} />
      ))}
      {active && (
        <button type="button" className="pphone-back" onClick={() => onChange(null)}>← Back to home screen</button>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Write the styles (start `src/journey.css`)**

```css
/* journey.css — playable phone, invoice slip, paper sheets, follow-one-invoice.
   Every rule head is prefixed .home-v3 (home-v3.test.jsx enforces this for
   home styles) except .journey-strip, which renders on feature pages. */

.home-v3 .pphone { position: relative; width: min(340px, 70vw); aspect-ratio: 966 / 2000; margin-inline: auto;
  filter: drop-shadow(0 40px 70px rgba(5, 12, 28, 0.6)); }
.home-v3 .pphone-base, .home-v3 .pphone-screen { position: absolute; inset: 0; width: 100%; height: 100%; }
.home-v3 .pphone-screen { opacity: 1; transform: none;
  transition: opacity 260ms var(--ease-out), transform 320ms var(--ease-out);
  @starting-style { opacity: 0; transform: scale(0.96); } }

.home-v3 .pphone-hot { position: absolute; border: 0; border-radius: 14px; background: transparent; cursor: pointer;
  transition: transform 160ms var(--ease-out), background-color 160ms ease; }
.home-v3 .pphone-hot:active { transform: scale(0.95); }
.home-v3 .pphone-hot:focus-visible { outline: 3px solid var(--color-highlight); outline-offset: 2px; }
.home-v3 .pphone-hot::after { content: ""; position: absolute; top: 8px; right: 8px; width: 9px; height: 9px;
  border-radius: 50%; background: var(--color-highlight); animation: pphone-ping 2.2s ease-out infinite; }
.home-v3 .pphone-hot:nth-of-type(2n)::after { animation-delay: 0.7s; }
.home-v3 .pphone-hot:nth-of-type(3n)::after { animation-delay: 1.3s; }
@media (hover: hover) and (pointer: fine) {
  .home-v3 .pphone-hot:hover { background-color: rgba(0, 110, 166, 0.12); }
}

.home-v3 .pphone-back { position: absolute; left: 50%; bottom: -58px; translate: -50% 0; padding: 10px 20px;
  border-radius: 999px; border: 1px solid rgba(255, 255, 255, 0.25); background: rgba(255, 255, 255, 0.08);
  color: #fff; font: 600 14px var(--font-sans); cursor: pointer; transition: transform 160ms var(--ease-out);
  @starting-style { opacity: 0; } }
.home-v3 .pphone-back:active { transform: scale(0.97); }

@keyframes pphone-ping {
  0% { box-shadow: 0 0 0 0 rgba(252, 175, 27, 0.6); }
  70%, 100% { box-shadow: 0 0 0 12px rgba(252, 175, 27, 0); }
}
@media (prefers-reduced-motion: reduce) {
  .home-v3 .pphone-hot::after { animation: none; }
  .home-v3 .pphone-screen { transition: opacity 200ms ease; @starting-style { opacity: 0; transform: none; } }
}
```

The `home-v3.test.jsx` selector test skips `@keyframes` step selectors (`from`, `to`, percentages) already. If it rejects the nested `@starting-style` block, extend that test's filter to skip lines starting with `@starting-style` rather than un-nesting the CSS.

- [ ] **Step 4: Run the test**

Run: `npx vitest run src/components/__tests__/playable-phone.test.jsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(hero): playable phone with nine real-screen hotspots"
```

---

### Task 7: FollowOneInvoice (slip, stations, paper sheets)

Ask Ronak Open Question 2 before Step 5.

**Files:**
- Create: `src/hooks/useActiveStation.js`, `src/components/InvoiceSlip.jsx`, `src/components/PaperSheet.jsx`, `src/components/FollowOneInvoice.jsx`, `src/components/__tests__/follow-one-invoice.test.jsx`
- Modify: `src/journey.css` (append)

**Interfaces:**
- Consumes: `STOPS`, `INVOICE`, `liveFeatures` (Task 5); `screen()` (Task 4); `FEATURE_PAGES`; `formatInr` is NOT used for the slip (the slip prints paise, `formatInr` rounds) so the slip formats with `toLocaleString('en-IN', { minimumFractionDigits: 2 })`.
- Produces: `useActiveStation(count)` returns `[activeIndex, setRef(i)]`; `<InvoiceSlip activeIndex />`; `<PaperSheet slug caption />`; `<FollowOneInvoice />` rendering `<section id="digital-collection">` (keeps the anchor the nav and footer already point at).

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/__tests__/follow-one-invoice.test.jsx
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen as ui, within, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FollowOneInvoice from '../FollowOneInvoice';
import { STOPS } from '../../data/journey';

let observers;
beforeEach(() => {
  observers = [];
  globalThis.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; observers.push(this); }
    observe() {} unobserve() {} disconnect() {}
  };
});
const arrive = (el) => act(() => observers.forEach((o) => o.cb([{ isIntersecting: true, target: el }])));
const mount = () => render(<MemoryRouter><FollowOneInvoice /></MemoryRouter>);

describe('FollowOneInvoice', () => {
  it('renders seven stations in order, each with a headline and a screen', () => {
    mount();
    const stations = ui.getAllByRole('article');
    expect(stations).toHaveLength(7);
    stations.forEach((el, i) => {
      expect(within(el).getByRole('heading', { level: 3 })).toHaveTextContent(STOPS[i].headline);
      expect(within(el).getAllByRole('img').length).toBeGreaterThan(0);
    });
  });
  it('starts with only the first stamp pressed', () => {
    mount();
    expect(ui.getByText('ORDER #118')).toHaveClass('is-on');
    expect(ui.getByText('PAID')).not.toHaveClass('is-on');
  });
  it('presses every stamp up to the station the reader reached, and lifts them again on the way back', () => {
    mount();
    const stations = ui.getAllByRole('article');
    arrive(stations[5]);
    expect(ui.getByText('PAID')).toHaveClass('is-on');
    expect(ui.getByText('IN TALLY ✓')).not.toHaveClass('is-on');
    expect(ui.getByTestId('slip-status')).toHaveTextContent(STOPS[5].status);
    arrive(stations[1]);
    expect(ui.getByText('PAID')).not.toHaveClass('is-on');
  });
  it('renders pills only as links to real pages', () => {
    mount();
    for (const a of ui.getAllByTestId('stop-pill')) expect(a.getAttribute('href')).toMatch(/^\/[a-z0-9-]+$/);
  });
  it('shows the two printed sheets, at Load and at Tally', () => {
    mount();
    expect(ui.getByRole('button', { name: /loading sheet/i })).toBeInTheDocument();
    expect(ui.getByRole('button', { name: /team sales sheet/i })).toBeInTheDocument();
  });
  it('prints the slip total with paise and tabular figures', () => {
    mount();
    const total = ui.getByText('₹1,86,420.16');
    expect(total.closest('.tabular-nums')).not.toBeNull();
  });
});
```

Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx` — Expected: FAIL, module not found.

- [ ] **Step 2: Write the hook**

```js
// src/hooks/useActiveStation.js
// Reports which station sits in the middle band of the viewport. One observer
// for all stations. Without IntersectionObserver (SSG, old browsers) the first
// station stays active, which renders a complete, readable page.
import { useCallback, useEffect, useRef, useState } from 'react';

export function useActiveStation(count) {
  const [active, setActive] = useState(0);
  const nodes = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(nodes.current.indexOf(e.target));
        }
      },
      { rootMargin: '-48% 0px -48% 0px' },
    );
    nodes.current.slice(0, count).forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, [count]);

  const setRef = useCallback((i) => (el) => { nodes.current[i] = el; }, []);
  return [active, setRef];
}
```

- [ ] **Step 3: Write the slip**

```jsx
// src/components/InvoiceSlip.jsx
// The signature element: one paper invoice that stays pinned and collects a
// rubber stamp at every stop. HTML, not an image, so it is crisp, selectable
// and readable by crawlers.
// Motion: a stamp lands with a 1.5 → 1 scale over 260ms (the "thunk") and lifts
// off when the reader scrolls back. Transitions, so it reverses mid-flight.
import { INVOICE, STOPS } from '../data/journey';

const inr = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvoiceSlip({ activeIndex }) {
  return (
    <div className="slip-rail">
      <div className="slip tabular-nums" aria-label={`Invoice ${INVOICE.number}`}>
        <div className="slip-head"><span>TAX INVOICE</span><span>{INVOICE.short}</span></div>
        <div className="slip-party">{INVOICE.party}</div>
        <div className="slip-place">{INVOICE.place}</div>
        <hr />
        {INVOICE.lines.map((l) => (
          <div className="slip-line" key={l.label}><span>{l.label}</span><span>{inr(l.amount)}</span></div>
        ))}
        <hr />
        <div className="slip-line slip-total"><span>TOTAL</span><span>₹{inr(INVOICE.total)}</span></div>
        <div className="slip-status" data-testid="slip-status" aria-live="polite">{STOPS[activeIndex].status}</div>
        {STOPS.map((s, i) => (
          <span key={s.id}
            className={`slip-stamp slip-stamp--${s.id} slip-stamp--${s.stamp.tone}${s.stamp.size === 'lg' ? ' slip-stamp--lg' : ''}${i <= activeIndex ? ' is-on' : ''}`}
            aria-hidden={i > activeIndex}>{s.stamp.text}</span>
        ))}
      </div>
      <ol className="slip-stops">
        {STOPS.map((s, i) => (
          <li key={s.id} className={i === activeIndex ? 'is-on' : i < activeIndex ? 'is-done' : ''}>{s.label}</li>
        ))}
      </ol>
    </div>
  );
}
```

- [ ] **Step 4: Write the paper sheet**

```jsx
// src/components/PaperSheet.jsx
// A printed sheet (loading sheet, salesman export) tucked behind the phone.
// Tap to read it full size in a native <dialog>, which gives focus trapping and
// Escape for free. The dialog stays centred (modals are not origin-aware).
import { useRef } from 'react';
import { screen } from '../data/screens';

export default function PaperSheet({ slug, caption }) {
  const dialog = useRef(null);
  const s = screen(slug);
  return (
    <>
      <button type="button" className="sheet" aria-label={`Enlarge the ${caption}`} onClick={() => dialog.current?.showModal()}>
        <img src={s.src} srcSet={s.srcSet} sizes="300px" width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" />
        <span className="sheet-caption">{caption}</span>
      </button>
      <dialog ref={dialog} className="sheet-dialog" onClick={(e) => { if (e.target === dialog.current) dialog.current.close(); }}>
        <img src={s.src} srcSet={s.srcSet} sizes="90vw" width={s.width} height={s.height} alt={s.alt} />
        <form method="dialog"><button className="sheet-close">Close</button></form>
      </dialog>
    </>
  );
}
```

jsdom has no `showModal`; the test only checks the button exists, so no polyfill is needed.

- [ ] **Step 5: Write the section**

```jsx
// src/components/FollowOneInvoice.jsx
// "Follow one invoice": the homepage's one story. Seven true, ordered stops.
import { Link } from 'react-router-dom';
import { STOPS, liveFeatures } from '../data/journey';
import { FEATURE_PAGES } from '../data/featurePages';
import { screen } from '../data/screens';
import { useActiveStation } from '../hooks/useActiveStation';
import InvoiceSlip from './InvoiceSlip';
import PaperSheet from './PaperSheet';

const SHEET_CAPTION = { 'sheet-loading': 'loading sheet', 'sheet-salesman': 'team sales sheet' };

export default function FollowOneInvoice() {
  const [active, setRef] = useActiveStation(STOPS.length);
  return (
    <section className="foi" id="digital-collection" aria-labelledby="foi-title">
      <div className="foi-intro">
        <span className="section-label">Follow one invoice</span>
        <h2 className="section-title" id="foi-title">From the order at the counter to the receipt in Tally.</h2>
      </div>
      <div className="foi-grid">
        <InvoiceSlip activeIndex={active} />
        <div className="foi-stations">
          {STOPS.map((stop, i) => (
            <article key={stop.id} ref={setRef(i)} className={`foi-station${i === active ? ' is-on' : ''}`} id={`stop-${stop.id}`}>
              <div className="foi-copy">
                <div className="foi-when tabular-nums">{stop.when}</div>
                <h3>{stop.headline}</h3>
                <p>{stop.body}</p>
                <div className="foi-pills">
                  {liveFeatures(stop, FEATURE_PAGES).map((f) => (
                    <Link key={f.slug} to={`/${f.slug}`} className="foi-pill" data-testid="stop-pill">{f.label}</Link>
                  ))}
                </div>
              </div>
              <div className="foi-visual">
                {stop.sheet && <PaperSheet slug={stop.sheet} caption={SHEET_CAPTION[stop.sheet]} />}
                {stop.screens.map((slug, n) => {
                  const s = screen(slug);
                  return <img key={slug} className={`foi-phone foi-phone--${n}`} src={s.src} srcSet={s.srcSet}
                    sizes="(max-width: 700px) 60vw, 250px" width={s.width} height={s.height} alt={s.alt} loading="lazy" decoding="async" />;
                })}
                {stop.id === 'recover' && (
                  <div className="foi-callchip tabular-nums">
                    <strong>AI call · 1m 42s</strong><span>Will pay by 22 Sep</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Replace the call chip's two strings with the exact wording from Ronak's answer to Open Question 2.

- [ ] **Step 6: Append the styles to `src/journey.css`**

```css
/* ── Follow one invoice ─────────────────────────────────────────────── */
.home-v3 .foi { background: var(--color-primary-dark); color: #fff; padding: 96px 0 40px; }
.home-v3 .foi-intro { max-width: 1160px; margin: 0 auto 24px; padding: 0 32px; }
.home-v3 .foi-intro .section-label { color: var(--color-accent); }
.home-v3 .foi-intro .section-title { color: #fff; max-width: 720px; }
.home-v3 .foi-grid { max-width: 1160px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: 340px 1fr; gap: 70px; }

.home-v3 .slip-rail { position: sticky; top: 84px; height: calc(100vh - 100px); display: flex; flex-direction: column; justify-content: center; gap: 26px; }
.home-v3 .slip { position: relative; background: var(--color-paper); color: #1D2433; font: 400 12.5px/1.7 var(--font-mono);
  padding: 26px 24px 30px; transform: rotate(-1.6deg); box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45);
  -webkit-mask: radial-gradient(circle 6px at 8px 0, transparent 98%, #000) -8px 0 / 16px 51% repeat-x,
                radial-gradient(circle 6px at 8px 100%, transparent 98%, #000) -8px 100% / 16px 51% repeat-x;
          mask: radial-gradient(circle 6px at 8px 0, transparent 98%, #000) -8px 0 / 16px 51% repeat-x,
                radial-gradient(circle 6px at 8px 100%, transparent 98%, #000) -8px 100% / 16px 51% repeat-x; }
.home-v3 .slip-head { display: flex; justify-content: space-between; font-weight: 600; letter-spacing: 0.04em; }
.home-v3 .slip-party { font: 800 19px/1.2 var(--font-sans); letter-spacing: -0.015em; margin-top: 10px; }
.home-v3 .slip-place { opacity: 0.6; }
.home-v3 .slip hr { border: 0; border-top: 1.5px dashed rgba(29, 36, 51, 0.25); margin: 12px 0; }
.home-v3 .slip-line { display: flex; justify-content: space-between; gap: 10px; }
.home-v3 .slip-line span:first-child { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.home-v3 .slip-total { font-weight: 600; font-size: 15px; }
.home-v3 .slip-status { margin-top: 12px; font-size: 11.5px; letter-spacing: 0.05em; opacity: 0.65; min-height: 20px; }

.home-v3 .slip-stamp { position: absolute; font: 800 13px/1 var(--font-sans); letter-spacing: 0.08em; padding: 5px 10px;
  border: 2.5px solid currentColor; border-radius: 6px; mix-blend-mode: multiply;
  opacity: 0; transform: scale(1.5) rotate(var(--r));
  transition: opacity 120ms ease-out, transform 160ms var(--ease-out); }   /* exit: fast */
.home-v3 .slip-stamp.is-on { opacity: 0.88; transform: scale(1) rotate(var(--r));
  transition: opacity 180ms ease-out, transform 260ms var(--ease-out); }   /* enter: the thunk */
.home-v3 .slip-stamp--blue { color: var(--stamp-blue); }
.home-v3 .slip-stamp--green { color: var(--stamp-green); }
.home-v3 .slip-stamp--red { color: var(--stamp-red); }
.home-v3 .slip-stamp--ink { color: #1D2433; }
.home-v3 .slip-stamp--lg { font-size: 22px; padding: 6px 16px; border-width: 3.5px; }
.home-v3 .slip-stamp--order { --r: -8deg; top: 50px; right: 16px; font-size: 11px; }
.home-v3 .slip-stamp--bill { --r: 5deg; top: 100px; right: 18px; }
.home-v3 .slip-stamp--load { --r: -4deg; top: 150px; left: 120px; }
.home-v3 .slip-stamp--send { --r: 7deg; top: 196px; right: 22px; }
.home-v3 .slip-stamp--remind { --r: -3deg; top: 236px; left: 26px; font-size: 11px; }
.home-v3 .slip-stamp--recover { --r: -10deg; bottom: 54px; left: 22px; }
.home-v3 .slip-stamp--tally { --r: 3deg; bottom: 18px; right: 16px; font-size: 11px; }

.home-v3 .slip-stops { list-style: none; display: flex; justify-content: space-between; padding: 0 4px; margin: 0;
  font: 400 11.5px var(--font-mono); letter-spacing: 0.04em; text-transform: uppercase; color: rgba(255, 255, 255, 0.35); }
.home-v3 .slip-stops li { transition: color 220ms ease; }
.home-v3 .slip-stops li.is-done { color: rgba(255, 255, 255, 0.7); }
.home-v3 .slip-stops li.is-on { color: var(--color-highlight); }

.home-v3 .foi-station { min-height: 84vh; display: grid; grid-template-columns: 1fr 270px; gap: 48px; align-items: center;
  opacity: 0.28; transition: opacity 320ms var(--ease-out); }
.home-v3 .foi-station.is-on { opacity: 1; }
.home-v3 .foi-when { font: 400 13px var(--font-mono); letter-spacing: 0.05em; color: var(--color-highlight); text-transform: uppercase; }
.home-v3 .foi-station h3 { font: 800 38px/1.08 var(--font-sans); letter-spacing: -0.03em; margin: 12px 0 14px; }
.home-v3 .foi-station p { color: rgba(255, 255, 255, 0.72); font-size: 16.5px; line-height: 1.6; max-width: 430px; }
.home-v3 .foi-pills { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 20px; }
.home-v3 .foi-pill { font-size: 13px; font-weight: 600; color: #fff; text-decoration: none; padding: 7px 13px; border-radius: 999px;
  background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.14);
  transition: background-color 160ms ease, transform 160ms var(--ease-out); }
.home-v3 .foi-pill:active { transform: scale(0.97); }
.home-v3 .foi-pill:focus-visible { outline: 3px solid var(--color-highlight); outline-offset: 2px; }
@media (hover: hover) and (pointer: fine) { .home-v3 .foi-pill:hover { background-color: rgba(255, 255, 255, 0.16); } }

.home-v3 .foi-visual { position: relative; }
.home-v3 .foi-phone { width: 250px; height: auto; filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.5));
  transform: translateY(18px); transition: transform 520ms var(--ease-out); }
.home-v3 .foi-station.is-on .foi-phone { transform: none; }
.home-v3 .foi-phone--1 { position: absolute; left: -120px; top: 60px; width: 200px; z-index: -1; opacity: 0.9; }

.home-v3 .sheet { position: absolute; left: -170px; bottom: -10px; width: 300px; padding: 0; border: 0; cursor: zoom-in; z-index: -1;
  background: #fff; transform: rotate(-5deg); box-shadow: 0 24px 50px rgba(0, 0, 0, 0.45);
  transition: transform 220ms var(--ease-out); }
.home-v3 .sheet img { display: block; width: 100%; height: auto; }
.home-v3 .sheet-caption { position: absolute; left: 10px; bottom: 8px; font: 500 11px var(--font-mono); letter-spacing: 0.05em;
  text-transform: uppercase; color: #1D2433; background: var(--color-highlight); padding: 3px 8px; border-radius: 4px; }
.home-v3 .sheet:active { transform: rotate(-5deg) scale(0.98); }
.home-v3 .sheet:focus-visible { outline: 3px solid var(--color-highlight); outline-offset: 4px; }
@media (hover: hover) and (pointer: fine) { .home-v3 .sheet:hover { transform: rotate(-3deg) translateY(-6px); } }
.home-v3 .sheet-dialog { border: 0; padding: 0; max-width: min(1100px, 92vw); background: #fff; border-radius: 12px; }
.home-v3 .sheet-dialog::backdrop { background: rgba(5, 12, 28, 0.7); }
.home-v3 .sheet-dialog img { display: block; width: 100%; height: auto; }
.home-v3 .sheet-close { position: absolute; top: 12px; right: 12px; padding: 8px 16px; border-radius: 999px; border: 0;
  background: var(--color-primary-dark); color: #fff; font: 600 14px var(--font-sans); cursor: pointer; }

.home-v3 .foi-callchip { position: absolute; right: -24px; top: 90px; display: grid; gap: 2px; padding: 12px 16px; border-radius: 14px;
  background: #fff; color: var(--color-text); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35); font-size: 12.5px; }
.home-v3 .foi-callchip strong { font-size: 14px; }

@media (max-width: 900px) {
  .home-v3 .foi-grid { grid-template-columns: 1fr; gap: 0; padding: 0 16px; }
  .home-v3 .slip-rail { position: sticky; top: 56px; z-index: 5; height: auto; padding: 10px 0; background: var(--color-primary-dark); }
  .home-v3 .slip { transform: none; padding: 10px 14px; box-shadow: none; -webkit-mask: none; mask: none; border-radius: 10px; }
  .home-v3 .slip hr, .home-v3 .slip-line:not(.slip-total), .home-v3 .slip-place, .home-v3 .slip-stamp:not(.slip-stamp--lg) { display: none; }
  .home-v3 .slip-stamp--lg { position: static; display: inline-block; font-size: 12px; padding: 3px 8px; border-width: 2px; margin-top: 6px; }
  .home-v3 .foi-station { grid-template-columns: 1fr; min-height: auto; padding: 56px 0; opacity: 1; }
  .home-v3 .foi-station h3 { font-size: 28px; }
  .home-v3 .foi-visual { margin-top: 28px; display: flex; justify-content: center; }
  .home-v3 .foi-phone--1, .home-v3 .foi-callchip { display: none; }
  .home-v3 .sheet { position: relative; left: 0; bottom: 0; width: 46%; margin-right: -12%; }
}
@media (prefers-reduced-motion: reduce) {
  .home-v3 .slip-stamp, .home-v3 .slip-stamp.is-on { transform: rotate(var(--r)); transition: opacity 200ms ease; }
  .home-v3 .foi-phone, .home-v3 .sheet { transform: none; transition: none; }
  .home-v3 .sheet { transform: rotate(-5deg); }
}
```

- [ ] **Step 7: Run the test**

Run: `npx vitest run src/components/__tests__/follow-one-invoice.test.jsx`
Expected: PASS (6 tests).

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat(home): follow-one-invoice section with pinned slip, stamps and paper sheets"
```

---

### Task 8: Recompose the homepage

**Files:**
- Modify: `src/routes/Home.jsx` (hero at `:364`, `RoadSection` at `:166` and its use at `:422`, `StorySection` at `:111` and `:455`, `hv3-ai` at `:458`, `hv3-grid-section` at `:488`)
- Modify: `src/data/siteContent.js` (`heroContent`; delete `storyOrderToCash`, `storyTeamSales`, `aiImport`, `featureGridV3` once nothing imports them)
- Modify: `src/home.css` (hero block), `src/routes/__tests__/home-v3.test.jsx`

**Interfaces:**
- Consumes: `PlayablePhone` (Task 6), `FollowOneInvoice` (Task 7), `HOTSPOTS`, `JOBS`, `HERO_HOME` (Task 5).
- Produces: section order `#product` (hero) → `#testimonial` (proof) → `#digital-collection` (journey) → `#tally` → differentiators → `#pricing` → `#data-safety` → `#faq` → `#final-cta`. The `#features` id moves onto the journey's station list wrapper so existing nav and footer hash links still land.

- [ ] **Step 1: Rewrite the section-order and story tests first**

In `home-v3.test.jsx`:
- Replace the "tells the page story through headings alone" expectation with the H1 (`Your Tally, in your pocket. Go on, use it.`), the journey H2 (`From the order at the counter to the receipt in Tally.`) and the seven stop H3s from `STOPS`.
- Replace "renders the order-to-cash tour…" with: seven `article` elements inside `#digital-collection`.
- Delete the `describe` block that tests the road's observer pause/unpause behaviour, the "story 2 with screenshots pending" case and the three grid-tile cases ("resolves every tile icon", "renders each tile title exactly once", "keeps adoption numbers off the grid"). Those components no longer exist.
- Change the section-order case to `hero → proof → journey → tally → pricing`.
- Keep unchanged: hash-link ids, no duplicate ids, no anchor into the app, WhatsApp prefill contexts (rename the two story contexts to one `story-follow-one-invoice`), "claims nothing unclaimable", and the `.home-v3` CSS prefix case (add `journey.css` to the files it reads).

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx` — Expected: FAIL on the new expectations.

- [ ] **Step 2: New hero content**

In `src/data/siteContent.js` replace `heroContent` with:

```js
export const heroContent = {
  overline: 'For Indian distributors on Tally',
  // The H1 and body are owned by src/data/heroHotspots.js (HERO_HOME) because
  // they swap as the visitor taps the phone. This object keeps what is static.
  promise: 'Get paid without chasing.',
  stats: [{ value: 100, prefix: '', suffix: '+', label: 'Businesses' }],
};
```

- [ ] **Step 3: New hero markup**

In `Home.jsx` add the imports and replace the body of `<section className="hv3-hero" id="product">`:

```jsx
import PlayablePhone from '../components/PlayablePhone';
import FollowOneInvoice from '../components/FollowOneInvoice';
import { HOTSPOTS, JOBS, HERO_HOME } from '../data/heroHotspots';
```

```jsx
// inside Home():
const [hot, setHot] = useState(null);
const copy = hot ?? HERO_HOME;
```

```jsx
<section className="hv3-hero" id="product">
  <div className="hv3-hero-grid">
    <div className="hv3-hero-copy">
      <span className="section-label hero-overline">{hot ? hot.overline : heroContent.overline}</span>
      <h1 className="hero-title" aria-live="polite">{copy.headline}</h1>
      <p className="hero-subtitle">{copy.body}</p>
      <div className="hv3-hero-cta">
        <DemoTryCTA context="hero" />
        {hot && <Link className="hv3-hero-more" to={hot.href}>See how it works →</Link>}
      </div>
      <p className="hv3-hero-promise">{heroContent.promise}</p>
    </div>
    <PlayablePhone activeKey={hot?.key ?? null} onChange={setHot} />
    <div className="hv3-hero-jobs" role="group" aria-label="Pick a job to see its screen">
      <span className="hv3-hero-jobs-label">Or pick a job</span>
      {JOBS.map((j) => (
        <button key={j.key} type="button" className={`hv3-job${hot?.key === j.key ? ' is-on' : ''}`}
          onClick={() => setHot(HOTSPOTS.find((h) => h.key === j.key))}>
          {j.label}<small>{j.hint}</small>
        </button>
      ))}
    </div>
  </div>
</section>
```

The server-rendered H1 is `HERO_HOME.headline` (state starts `null`), so crawlers and no-JS visitors get the real headline. Keep `HOME_SEO` as it is.

- [ ] **Step 4: Swap the story sections**

Replace `<RoadSection … />`, `<StorySection story={storyTeamSales} … />`, the `hv3-ai` section and the `hv3-grid-section` section with one `<FollowOneInvoice />` placed after the proof strip. Delete the now-unused `StorySection`, `RoadSection`, `gridIconMap`, `aiIconMap` and their lucide imports. Then in `siteContent.js` delete `storyOrderToCash`, `storyTeamSales`, `aiImport`, `featureGridV3` after confirming no other importer: `grep -rn "storyOrderToCash\|storyTeamSales\|aiImport\|featureGridV3" src scripts`. If `generate-llms-txt.mjs` or a route reads one of them, leave that export and note it in the commit body.

- [ ] **Step 5: Hero styles in `src/home.css`**

Replace the existing `.home-v3 .hv3-hero…` block with:

```css
.home-v3 .hv3-hero { background: radial-gradient(620px 520px at 50% 58%, var(--color-navy-lift) 0%, transparent 70%), linear-gradient(180deg, var(--color-primary-dark), var(--color-navy)); color: #fff; padding: 56px 0 96px; }
.home-v3 .hv3-hero-grid { max-width: 1240px; margin: 0 auto; padding: 0 32px; display: grid; grid-template-columns: 1fr 340px 1fr; gap: 48px; align-items: center; min-height: min(760px, calc(100vh - 80px)); }
.home-v3 .hv3-hero .hero-overline { font: 400 13px var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-accent); }
.home-v3 .hv3-hero .hero-title { font-size: clamp(36px, 4.2vw, 52px); line-height: 1.04; letter-spacing: -0.035em; color: #fff; margin: 16px 0; }
.home-v3 .hv3-hero .hero-subtitle { color: rgba(255, 255, 255, 0.72); font-size: 17px; line-height: 1.6; max-width: 400px; min-height: 82px; }
.home-v3 .hv3-hero-cta { display: flex; align-items: center; gap: 18px; margin-top: 24px; flex-wrap: wrap; }
.home-v3 .hv3-hero-more { color: var(--color-accent); font-weight: 700; text-decoration: none; }
.home-v3 .hv3-hero-promise { margin-top: 28px; font: 400 13px var(--font-mono); letter-spacing: 0.05em; color: rgba(255, 255, 255, 0.5); text-transform: uppercase; }
.home-v3 .hv3-hero-jobs { display: grid; gap: 8px; }
.home-v3 .hv3-hero-jobs-label { font: 400 12px var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255, 255, 255, 0.45); margin-bottom: 6px; }
.home-v3 .hv3-job { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; text-align: left; padding: 13px 16px; border-radius: 14px; border: 1px solid rgba(255, 255, 255, 0.1); background: rgba(255, 255, 255, 0.04); color: #fff; font: 600 15px var(--font-sans); cursor: pointer; transition: background-color 160ms ease, border-color 160ms ease, transform 160ms var(--ease-out); }
.home-v3 .hv3-job small { color: rgba(255, 255, 255, 0.5); font-weight: 500; font-size: 12.5px; }
.home-v3 .hv3-job:active { transform: scale(0.97); }
.home-v3 .hv3-job:focus-visible { outline: 3px solid var(--color-highlight); outline-offset: 2px; }
.home-v3 .hv3-job.is-on { background: #fff; color: var(--color-navy); border-color: #fff; }
.home-v3 .hv3-job.is-on small { color: var(--color-text-secondary); }
@media (max-width: 1000px) {
  .home-v3 .hv3-hero-grid { grid-template-columns: 1fr; gap: 32px; text-align: center; padding: 0 16px; }
  .home-v3 .hv3-hero .hero-subtitle { margin-inline: auto; min-height: 0; }
  .home-v3 .hv3-hero-cta { justify-content: center; }
  .home-v3 .hv3-hero-grid > .pphone { order: -1; }
  .home-v3 .hv3-hero-jobs { grid-auto-flow: column; grid-auto-columns: max-content; overflow-x: auto; padding-bottom: 8px; margin-top: 40px; }
  .home-v3 .hv3-hero-jobs-label, .home-v3 .hv3-job small { display: none; }
}
```

The nav sits over a navy hero now. If the nav's link colour is dark on the homepage's top state, give the home route's nav the existing on-dark variant (search `nav--on-dark` / `nav-dark` in `src/styles.css`; if there is none, add `.home-v3-nav .nav-link { color: #fff; }` scoped to the unscrolled state the nav already tracks).

- [ ] **Step 6: Run the home tests**

Run: `npx vitest run src/routes/__tests__/home-v3.test.jsx src/routes/__tests__/home-trust.test.jsx src/routes/__tests__/landing-schema.test.jsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat(home): playable-phone hero and one follow-one-invoice story replace the story, AI and grid sections"
```

---

### Task 9: Features hub grouped by stop

**Files:**
- Modify: `src/data/featureGroups.js`, `src/routes/Features.jsx:174-200`, `src/routes/__tests__/features-hub.test.jsx`, `src/feature-page.css` or the hub's block in `src/styles.css`

**Interfaces:**
- Consumes: `STOPS` (Task 5), `screen()` (Task 4).
- Produces: `FEATURE_GROUPS` with ids `order, bill, load, send, remind, recover, tally, weighing-options, built-for-your-trade`. Each of the first seven carries a new optional field `stop: '<stop id>'`. Existing invariant holds: every `FEATURE_PAGES` slug sits in exactly one group (the existing test enforces it both ways).

- [ ] **Step 1: Add the failing case to `features-hub.test.jsx`**

```js
import { STOPS } from '../../data/journey';

it('leads with one group per journey stop, in journey order', () => {
  const stopGroups = FEATURE_GROUPS.filter((g) => g.stop);
  expect(stopGroups.map((g) => g.stop)).toEqual(STOPS.map((s) => s.id));
});
```

Run: `npx vitest run src/routes/__tests__/features-hub.test.jsx` — Expected: FAIL.

- [ ] **Step 2: Regroup**

Rewrite `FEATURE_GROUPS` so the seven stop groups come first, each `{ id: <stop id>, stop: <stop id>, title, intro, slugs }`, followed by the two existing non-journey groups `weighing-options` and `built-for-your-trade` unchanged. Move every slug from the seven retired groups by this rule, and let the existing "exactly one group" test tell you what is left over:

| Retired group | Goes to |
|---|---|
| `team-in-the-market` | `order` |
| `gst-paperwork`, `entries-without-typing` | `bill` |
| `billing-stock-godowns` | `load` (godown, stock, challan slugs); any invoice-format slug goes to `send` |
| WhatsApp dispatch, invoice format, statement-share slugs from `getting-paid` | `send` |
| reminder and UPI-collection slugs from `getting-paid` | `remind` |
| `who-owes-you` | `recover` |
| `tally-on-your-phone` (reports, reconciliation, multi-company) | `tally` |

Titles and intros (copy rules apply):

```js
{ id: 'order',   stop: 'order',   title: 'Taking the order',        intro: 'What your salesman does at the retailer\'s counter, and what you see of it.' },
{ id: 'bill',    stop: 'bill',    title: 'Making the bill',          intro: 'Invoices, e-invoice, e-way bill and entries that fill themselves in.' },
{ id: 'load',    stop: 'load',    title: 'Loading and stock',        intro: 'Godowns, challans and what is actually on the shelf.' },
{ id: 'send',    stop: 'send',    title: 'Sending it to the customer', intro: 'The invoice and the statement reach WhatsApp without anyone pressing send.' },
{ id: 'remind',  stop: 'remind',  title: 'Reminding and collecting', intro: 'Reminders on your schedule, with a pay link in every one.' },
{ id: 'recover', stop: 'recover', title: 'Recovering what is overdue', intro: 'Who owes you, for how long, and who in your team is chasing it.' },
{ id: 'tally',   stop: 'tally',   title: 'Back in Tally',            intro: 'Receipts matched, reports on your phone, nothing typed twice.' },
```

- [ ] **Step 3: Show the stop on each group header**

In `Features.jsx` inside `.features-hub-group-header`, when `group.stop` is set, render the stop's stamp text and first screen beside the title:

```jsx
{group.stop && (() => {
  const stop = STOPS.find((s) => s.id === group.stop);
  const s = screen(stop.screens[0]);
  return (
    <div className="features-hub-stop">
      <span className={`features-hub-stamp features-hub-stamp--${stop.stamp.tone}`}>{stop.stamp.text}</span>
      <img src={s.src} srcSet={s.srcSet} sizes="120px" width={s.width} height={s.height} alt="" loading="lazy" decoding="async" />
    </div>
  );
})()}
```

```css
.features-hub-group-header { position: relative; }
.features-hub-stop { position: absolute; right: 0; top: -12px; display: flex; align-items: flex-start; gap: 14px; }
.features-hub-stop img { width: 84px; height: auto; filter: drop-shadow(0 12px 20px rgba(14, 28, 42, 0.18)); }
.features-hub-stamp { font: 800 11px var(--font-sans); letter-spacing: 0.08em; padding: 4px 8px; border: 2px solid currentColor; border-radius: 5px; transform: rotate(-5deg); }
.features-hub-stamp--blue { color: var(--stamp-blue); } .features-hub-stamp--green { color: var(--stamp-green); }
.features-hub-stamp--red { color: var(--stamp-red); } .features-hub-stamp--ink { color: var(--color-text); }
@media (max-width: 700px) { .features-hub-stop { display: none; } }
```

Anchor ids: `checkFeaturesHub.mjs` and the hub's legacy anchors (`features-hub-anchor` spans at `Features.jsx:124`) keep old group ids reachable. Add the seven retired ids to that anchor list so old links and blog posts that point at `/features#getting-paid` still land (map each to the first new group it fed).

- [ ] **Step 4: Run the hub tests and guard**

Run: `npx vitest run src/routes/__tests__/features-hub.test.jsx scripts/checkFeaturesHub.test.mjs`
Expected: PASS, including the existing "places every feature page in exactly one group".

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(hub): group the features directory by the invoice's seven stops"
```

---

### Task 10: Feature-page template

**Files:**
- Create: `src/components/JourneyStrip.jsx`, `src/components/__tests__/journey-strip.test.jsx`
- Modify: `src/components/FeaturePage.jsx:160` (hero section), `src/feature-page.css`, `src/journey.css`

**Interfaces:**
- Consumes: `STOPS` (Task 5), `FEATURE_GROUPS` (Task 9).
- Produces: `<JourneyStrip slug={page.slug} />` renders nothing when the slug's group has no `stop`.

- [ ] **Step 1: Write the failing test**

```jsx
// src/components/__tests__/journey-strip.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import JourneyStrip from '../JourneyStrip';
import { FEATURE_GROUPS } from '../../data/featureGroups';

const inStop = FEATURE_GROUPS.find((g) => g.stop === 'remind').slugs[0];
const offJourney = FEATURE_GROUPS.find((g) => !g.stop).slugs[0];

describe('JourneyStrip', () => {
  it('marks the stop this feature belongs to', () => {
    render(<MemoryRouter><JourneyStrip slug={inStop} /></MemoryRouter>);
    expect(ui.getByText('Remind').closest('li')).toHaveAttribute('aria-current', 'step');
    expect(ui.getAllByRole('listitem')).toHaveLength(7);
  });
  it('renders nothing for a page that is not part of the journey', () => {
    const { container } = render(<MemoryRouter><JourneyStrip slug={offJourney} /></MemoryRouter>);
    expect(container).toBeEmptyDOMElement();
  });
});
```

Run: `npx vitest run src/components/__tests__/journey-strip.test.jsx` — Expected: FAIL.

- [ ] **Step 2: Write the component**

```jsx
// src/components/JourneyStrip.jsx
// "Where this sits in the invoice's journey": seven stops, this page's stop
// marked. Links each stop back to its place in the homepage story.
import { Link } from 'react-router-dom';
import { STOPS } from '../data/journey';
import { FEATURE_GROUPS } from '../data/featureGroups';

export default function JourneyStrip({ slug }) {
  const group = FEATURE_GROUPS.find((g) => g.slugs.includes(slug));
  if (!group?.stop) return null;
  return (
    <nav className="journey-strip" aria-label="Where this sits in an invoice's journey">
      <span className="journey-strip-label">One invoice, seven stops</span>
      <ol>
        {STOPS.map((s) => (
          <li key={s.id} aria-current={s.id === group.stop ? 'step' : undefined}>
            <Link to={`/#stop-${s.id}`}>{s.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
```

```css
/* append to src/journey.css */
.journey-strip { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; margin-top: 28px; }
.journey-strip-label { font: 400 12px var(--font-mono); letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); }
.journey-strip ol { list-style: none; display: flex; gap: 6px; flex-wrap: wrap; margin: 0; padding: 0; }
.journey-strip a { display: block; padding: 6px 12px; border-radius: 999px; font: 600 13px var(--font-sans); color: rgba(255, 255, 255, 0.7); text-decoration: none; border: 1px solid rgba(255, 255, 255, 0.14); transition: transform 160ms var(--ease-out); }
.journey-strip a:active { transform: scale(0.97); }
.journey-strip li[aria-current="step"] a { background: var(--color-highlight); color: #1D2433; border-color: var(--color-highlight); }
```

- [ ] **Step 3: Navy the feature hero and mount the strip**

In `FeaturePage.jsx` render `<JourneyStrip slug={page.slug} />` as the last child of the hero's copy column inside `<section className="hero icp-hero feature-hero" id="hero">`. In `src/feature-page.css` add:

```css
.feature-hero { background: linear-gradient(180deg, var(--color-primary-dark), var(--color-navy)); color: #fff; }
.feature-hero .hero-title, .feature-hero h1 { color: #fff; }
.feature-hero .hero-subtitle, .feature-hero p { color: rgba(255, 255, 255, 0.74); }
.feature-hero .section-label, .feature-hero .breadcrumb a { color: var(--color-accent); }
.feature-hero img { filter: drop-shadow(0 30px 50px rgba(5, 12, 28, 0.55)); }
```

Apply the same three colour rules to `.features-hub-hero` so the hub's header matches. Check button contrast inside the navy hero: the primary button becomes white-on-navy there (`.feature-hero .btn-primary { background: #fff; color: var(--color-navy); }`).

- [ ] **Step 4: Run the tests**

Run: `npx vitest run src/components/__tests__/journey-strip.test.jsx src/routes/__tests__/feature-page.test.jsx src/data/__tests__/feature-pages.test.js`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat(feature-page): navy header and a journey strip marking the feature's stop"
```

---

### Task 11: Re-sync CLAUDE.md, full verification, hand to Ronak (run at night)

**Files:**
- Modify: `CLAUDE.md` §6 (tokens), §7 (typography), §11.5 (motion note)

- [ ] **Step 1: Rewrite `CLAUDE.md` §6 and §7** so they mirror `src/styles.css` `:root` exactly: the Marine table from the spec, "Hero: deep navy band carrying the playable phone", shadows tinted `rgba(14,28,42,…)`, marigold as accent dot only. §7 becomes: two families, Plus Jakarta Sans for everything and IBM Plex Mono for the slip, time labels and stop labels; Fraunces is retired and `brand-guard.test.js` keeps it out; do not add any other family. Add to §11.5: "Stamps and screen swaps use transitions so they reverse; nothing animates `all`; hover effects sit behind `(hover: hover) and (pointer: fine)`."

- [ ] **Step 2: Full suite and build**

Run: `npm test` — Expected: all green.
Run: `npm run build` — Expected: green through every guard (`checkImagePreloads`, `checkRoutePrerender`, `checkFeaturesHub`, `checkImageBudgets`). If `checkImagePreloads` expects a preload for the old hero image, point it at `/assets/screens/home-720.webp` per that script's own instructions.

- [ ] **Step 3: Raw-HTML and claims checks**

```bash
grep -c "Your Tally, in your pocket" dist/index.html          # expect ≥ 1
grep -c "From the order at the counter" dist/index.html       # expect ≥ 1
grep -rIlE "17 ?Cr|Fraunces|#344E41" dist | head              # expect no output
grep -rIn "seamless\|world-class\|enterprise-grade\|revolutionary\|unleash\|game-changer" src/data/journey.js src/data/heroHotspots.js   # expect no output
```

- [ ] **Step 4: Walk the store**

Run `npm run preview`. At 1440px and at 390px wide walk: `/`, `/features`, two feature pages (one on the journey, one in `weighing-options`), one blog post, `/partners`. Check: every hotspot opens its screen and Back returns; keyboard Tab reaches hotspots, job buttons, pills and sheets with a visible marigold focus ring; stamps land going down and lift going up; both sheets enlarge and close with Escape; no horizontal scroll at 390px; the pinned slip bar does not cover station headings on mobile; nav text is readable over the navy hero and after scrolling; with macOS "Reduce motion" on, nothing moves but fades. Play the stamp and screen-open transitions at 10% speed in Chrome DevTools' Animations panel and confirm no two states overlap harshly. Fix what you find and re-run the touched tests.

- [ ] **Step 5: Commit, push the branch, stop**

```bash
git add -A && git commit -m "docs: re-sync CLAUDE.md tokens and type to the Marine brand"
git push -u origin feat/site-revamp-navy
```

Do not open a PR to `main`. Tell Ronak the branch is ready and give him this numbered list to check in `npm run preview` (one line each, do X and expect Y). Merge only on his yes.
