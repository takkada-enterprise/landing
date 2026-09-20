// checkRateCardDrift — fail the build when the site and the partner rate card
// stop agreeing on a price.
//
// The two surfaces have drifted twice (June + August 2026), both times through
// a change that touched only one of them. The checked-in snapshot
// (src/data/rateCardSnapshot.json) is the agreed truth; this guard enforces it
// in the ONE gate that actually runs on every deploy — `npm run build` — since
// the vitest suite does not.
//
// Two layers, because the June failure mode was a hand-typed rupee string in a
// component that no data-level check could see:
//   1. Data: pricing.plans / pricing.addons must equal the snapshot, BOTH
//      directions — a price changed on one side, a pill added without a
//      snapshot entry, or a snapshot entry the site dropped all fail.
//   2. Rendered HTML: every ₹-figure on the prerendered homepage and refund
//      policy must be derivable from the snapshot (annual, the 3-year per-year
//      and billed-once amounts, addon prices, the biggerSetups exemption).
//      Blog HTML is deliberately out of scope — 170 posts legitimately quote
//      prices in prose that goes stale by design.
//
// A page with ZERO rupee figures also fails: a guard that can pass by failing
// to see anything reads as coverage without being any (checkFeaturesHub lesson).
//
// ── data-not-a-price ──
// Some rupee figures on a scanned page are illustrations, not offers: the paper
// invoice slip in the homepage story totals ₹1,86,420.16, and the WhatsApp
// message card beside it quotes the same figure. Neither is a price the
// partner rate card could ever justify, and putting them in the snapshot would
// be a lie about what the snapshot is.
//
// So an element may carry the bare attribute `data-not-a-price`, and this guard
// removes that element AND EVERYTHING INSIDE IT before it looks for figures.
// Put it on the ROOT of the illustration (the slip, the message card), never on
// a wrapper that also holds a real price — the whole subtree goes dark to this
// check, and a real price hidden inside one would sail past.
//
// Rules of thumb for whether a figure earns the attribute: it is an example of
// a customer's own money (an invoice, a payment, a balance), it is not
// something Takkada charges for, and changing it changes no offer.

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { pricing, formatInr } from '../src/data/siteContent.js';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// readFileSync + JSON.parse rather than a JSON import attribute: the deploy
// build is the only gate, and the `with { type: 'json' }` syntax carries a
// Node >= 20.10 floor the rest of scripts/ does not have.
export const snapshot = JSON.parse(
  readFileSync(resolve(repoRoot, 'src/data/rateCardSnapshot.json'), 'utf-8'),
);

/**
 * Every rupee integer the snapshot can justify on a rendered page. Rounded
 * like formatInr rounds, so a plan price that is not a multiple of 4 does not
 * fail a correctly-synced deploy over 2242.5 vs the rendered ₹2,243.
 */
export function allowedFigures(snap) {
  const allowed = new Set();
  for (const { annualInr } of Object.values(snap.plans)) {
    const perYear = Math.round(annualInr * (1 - snap.termDiscount));
    allowed.add(annualInr); // 1-year price
    allowed.add(perYear); // 3-year per-year headline
    allowed.add(Math.round(annualInr * (1 - snap.termDiscount) * snap.termYears)); // billed-once total
  }
  for (const { priceInr } of Object.values(snap.addons)) {
    allowed.add(priceInr);
  }
  for (const figures of Object.values(snap.exemptions)) {
    for (const figure of figures) allowed.add(figure);
  }
  return allowed;
}

// Prerendered React splits adjacent JSX children with comment nodes, so a
// rupee figure can arrive as "₹<!-- -->12<!-- -->crore". The matcher skips
// comments/whitespace after ₹, and a figure followed by a scale word
// (₹12 crore, ₹2 lakh) is an article figure, not a rate-card price.
const RUPEE_RE = /₹((?:<!--[^>]*-->|&nbsp;|\s)*)([\d,]*\d)/g;
const GAP_RE = /^(?:<!--[^>]*-->|&nbsp;|\s)+/;
const SCALE_RE = /^(?:cr(?:ore)?s?|lakhs?|l\b)/i;

/** All ₹-priced figures in a page, as integers. "₹8,500" → 8500. Bare "₹" is ignored. */
export function extractFigures(html) {
  const figures = [];
  for (const match of html.matchAll(RUPEE_RE)) {
    const rest = html.slice(match.index + match[0].length).replace(GAP_RE, '');
    if (SCALE_RE.test(rest)) continue;
    figures.push(Number(match[2].replaceAll(',', '')));
  }
  return figures;
}

// One tag, open or close, with its attributes. The attribute part steps over
// quoted values so a `>` inside an attribute cannot end the tag early.
const TAG_RE = /<(\/?)([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
const MARKED_RE = /(?:^|\s)data-not-a-price(?=$|[\s=/])/;
// A tag that cannot contain anything, so it never opens a subtree to strip.
const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

/**
 * Drop every element carrying `data-not-a-price`, subtree and all.
 *
 * Counts nesting rather than matching `<tag ...>` to the first `</tag>`: the
 * slip is a div of divs, and a single greedy or lazy regex would either eat the
 * rest of the document or stop at the first inner `</div>` and leave the total
 * behind. An unclosed marked element swallows the rest of the page, which is
 * the safe way to be wrong here — the zero-figures check then fails the build
 * rather than passing it quietly.
 */
export function stripNotAPrice(html) {
  let out = '';
  let copyFrom = 0;
  let stripping = null;
  let depth = 0;

  TAG_RE.lastIndex = 0;
  for (let m = TAG_RE.exec(html); m !== null; m = TAG_RE.exec(html)) {
    const [full, slash, rawName, attrs] = m;
    const name = rawName.toLowerCase();
    const isClose = slash === '/';
    const childless = VOID_TAGS.has(name) || attrs.trimEnd().endsWith('/');

    if (stripping === null) {
      if (isClose || !MARKED_RE.test(attrs)) continue;
      out += html.slice(copyFrom, m.index);
      if (childless) {
        copyFrom = m.index + full.length;
      } else {
        stripping = name;
        depth = 1;
      }
    } else if (name === stripping) {
      if (isClose) {
        depth -= 1;
        if (depth === 0) {
          copyFrom = m.index + full.length;
          stripping = null;
        }
      } else if (!childless) {
        depth += 1;
      }
    }
  }

  return stripping === null ? out + html.slice(copyFrom) : out;
}

/** Layer 2: scan one rendered page. */
export function inspectPage(html, allowed) {
  const figures = extractFigures(stripNotAPrice(html));
  return {
    total: figures.length,
    unknown: [...new Set(figures.filter((figure) => !allowed.has(figure)))],
  };
}

/** Layer 1: the site's data must equal the snapshot, both directions. */
export function inspectData(sitePricing, snap) {
  const problems = [];

  const snapPlans = Object.values(snap.plans);
  for (const { publicName, annualInr } of snapPlans) {
    const sitePlan = sitePricing.plans.find((p) => p.plan === publicName);
    if (!sitePlan) {
      problems.push(`plan "${publicName}" is in the snapshot but not on the site`);
    } else if (sitePlan.annualPrice !== annualInr) {
      problems.push(
        `plan "${publicName}": site sells ₹${sitePlan.annualPrice}, snapshot says ₹${annualInr}`,
      );
    } else if (sitePlan.price !== formatInr(annualInr)) {
      // plan.price is a duplicated literal string that RefundPolicy renders
      // directly — it can drift from annualPrice on its own.
      problems.push(
        `plan "${publicName}": price string "${sitePlan.price}" disagrees with annualPrice ${annualInr}`,
      );
    }
  }
  for (const sitePlan of sitePricing.plans) {
    if (!snapPlans.some((p) => p.publicName === sitePlan.plan)) {
      problems.push(`plan "${sitePlan.plan}" is on the site but absent from the snapshot`);
    }
  }

  const snapAddons = Object.values(snap.addons);
  for (const { publicLabel, priceInr } of snapAddons) {
    const siteAddon = sitePricing.addons.find((a) => a.label === publicLabel);
    if (!siteAddon) {
      problems.push(`add-on "${publicLabel}" is in the snapshot but not on the site`);
    } else if (!siteAddon.price.includes(formatInr(priceInr))) {
      problems.push(
        `add-on "${publicLabel}": site says "${siteAddon.price}", snapshot says ${formatInr(priceInr)}`,
      );
    }
  }
  for (const siteAddon of sitePricing.addons) {
    if (!snapAddons.some((a) => a.publicLabel === siteAddon.label)) {
      problems.push(
        `add-on "${siteAddon.label}" is on the site but absent from the snapshot — new offers get a snapshot entry AND a dashboard config key in the same change`,
      );
    }
  }

  return problems;
}

// Homepage + refund policy: the two pages whose prices come from the rate
// table. The 26 feature pages also print plan money, but only via
// planPricing() (derived, covered by the data layer) mixed with illustrative
// prose figures (₹50,000 invoices etc.) — scanning them needs a per-page
// allow-list, not a longer array. Blog HTML is out of scope by design.
const SCANNED_PAGES = ['dist/index.html', 'dist/refund-policy/index.html'];

function main() {
  const problems = inspectData(pricing, snapshot);

  const allowed = allowedFigures(snapshot);
  for (const page of SCANNED_PAGES) {
    const file = resolve(repoRoot, page);
    if (!existsSync(file)) {
      problems.push(`${page} not found — run after vite-react-ssg build`);
      continue;
    }
    const { total, unknown } = inspectPage(readFileSync(file, 'utf-8'), allowed);
    if (total === 0) {
      problems.push(`${page}: no rupee figures found at all — the scan has gone vacuous`);
    }
    for (const figure of unknown) {
      problems.push(
        `${page}: ₹${figure} is not derivable from rateCardSnapshot.json — either the snapshot is stale or a price was hand-typed`,
      );
    }
  }

  if (problems.length > 0) {
    process.stderr.write(
      `checkRateCardDrift: the site and the rate-card snapshot disagree:\n${problems
        .map((p) => `  - ${p}`)
        .join('\n')}\n`,
    );
    process.exit(1);
  }
  process.stdout.write(
    `checkRateCardDrift: ${SCANNED_PAGES.length} pages consistent with the snapshot.\n`,
  );
}

// Same main-detection idiom as checkLeadAnswer.mjs — a missed compare here
// would exit 0 without running anything, the silent green this file exists
// to prevent.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
