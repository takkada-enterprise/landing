// checkLeadAnswer — enforce the lead-answer convention: every blog post opens
// with a self-contained prose paragraph (target 134–167 words) immediately
// under the title, before any `##` subheading. A front-loaded answer is what
// AI-search engines lift as a citation (plan U4 / GEO §6).
//
// Enforcement shape:
//   - HARD FAIL when there is no lead paragraph, or the first content block is
//     a list or a heading (e.g. a post that opens with "## Key Highlights").
//   - WARN (non-fatal) when a lead paragraph exists but its word count is
//     outside the 120–180 tolerance band around the 134–167 target.
//   - PASS otherwise.
//
// Legacy ratchet: posts that predate this convention are grandfathered in
// LEGACY_GRANDFATHERED so the guard can ship without blocking the build on the
// ~80 not-yet-backfilled posts. The cornerstone set and every NEW post are not
// grandfathered, so they are enforced immediately. The list may only shrink;
// when it is empty, delete it.
//
// Pure helpers (extractLead, countWords, checkLead) are unit-tested in
// scripts/checkLeadAnswer.test.mjs; filesystem scanning only runs via the CLI.

import { readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export const BAND = { warnMin: 120, warnMax: 180, targetMin: 134, targetMax: 167 };

const HEADING_RE = /^#{1,6}\s/;
const LIST_RE = /^(\s*)([-*+]\s|\d+[.)]\s)/;

/**
 * Find the first content node after the frontmatter and before the first
 * `##`-style subheading.
 * @param {string} markdown - raw markdown including frontmatter
 * @returns {{kind: 'paragraph'|'list'|'heading'|'empty', text: string, wordCount: number}}
 */
export function extractLead(markdown) {
  const { content } = matter(typeof markdown === 'string' ? markdown : '');
  const lines = content.split('\n');

  let i = 0;
  while (i < lines.length && lines[i].trim() === '') i += 1;

  if (i >= lines.length) return { kind: 'empty', text: '', wordCount: 0 };

  const first = lines[i];
  if (HEADING_RE.test(first.trim())) return { kind: 'heading', text: first.trim(), wordCount: 0 };
  if (LIST_RE.test(first)) return { kind: 'list', text: first.trim(), wordCount: 0 };

  // Gather the paragraph: consecutive non-blank lines until a blank line.
  const paragraphLines = [];
  for (let j = i; j < lines.length; j += 1) {
    if (lines[j].trim() === '') break;
    paragraphLines.push(lines[j].trim());
  }
  const text = paragraphLines.join(' ');
  return { kind: 'paragraph', text, wordCount: countWords(text) };
}

/**
 * Count visible words, ignoring markdown link/emphasis/code syntax so markup
 * never inflates or deflates the count.
 * @param {string} text
 * @returns {number}
 */
export function countWords(text) {
  if (typeof text !== 'string') return 0;
  const stripped = text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // image ![alt](url) -> alt
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // link [label](url) -> label
    .replace(/[*_`>#]/g, ' ') // emphasis / code / blockquote / stray hashes
    .replace(/\s+/g, ' ')
    .trim();
  if (!stripped) return 0;
  return stripped.split(' ').filter(Boolean).length;
}

/**
 * Judge a post's lead against the convention.
 * @param {string} markdown - raw markdown including frontmatter
 * @param {{warnMin?: number, warnMax?: number}} [opts]
 * @returns {{status: 'pass'|'warn'|'fail', kind: string, wordCount: number, message: string}}
 */
export function checkLead(markdown, opts = {}) {
  const warnMin = opts.warnMin ?? BAND.warnMin;
  const warnMax = opts.warnMax ?? BAND.warnMax;
  const lead = extractLead(markdown);

  if (lead.kind !== 'paragraph') {
    const reason =
      lead.kind === 'heading'
        ? 'first content block is a heading'
        : lead.kind === 'list'
          ? 'first content block is a list'
          : 'no content before the first subheading';
    return {
      status: 'fail',
      kind: lead.kind,
      wordCount: 0,
      message: `Missing lead answer (${reason}). Add a self-contained ${BAND.targetMin}–${BAND.targetMax}-word prose paragraph under the title.`,
    };
  }

  const wc = lead.wordCount;
  if (wc < warnMin || wc > warnMax) {
    return {
      status: 'warn',
      kind: 'paragraph',
      wordCount: wc,
      message: `Lead answer is ${wc} words, outside the ${warnMin}–${warnMax} band (target ${BAND.targetMin}–${BAND.targetMax}).`,
    };
  }

  return { status: 'pass', kind: 'paragraph', wordCount: wc, message: `Lead answer ${wc} words.` };
}

// ---------------------------------------------------------------------------
// Legacy posts predating the lead-answer convention (2026-06-21). Grandfathered
// so the guard ships without blocking the build; backfilled opportunistically
// (plan Follow-Up Work). The cornerstone set is intentionally absent — those are
// front-loaded in U5 and enforced. New posts are absent too, so they are
// enforced on day one. This set may only shrink. When empty, delete it.
export const LEGACY_GRANDFATHERED = new Set([
  'accept-online-payment-on-tally-invoice',
  'accounts-receivable-automation-tally',
  'aging-report-tally',
  'automate-payment-reminders-tally',
  'bad-debt-write-off-tally',
  'bakaya-kaise-vasool-kare-distributor',
  'best-credflow-alternatives-india-2026',
  'best-tally-add-on-apps-for-distributors-2026',
  'bharatpe-for-distributors-mdr',
  'bidirectional-tally-sync-explained',
  'bill-by-bill-against-reference-tally',
  'busy-software-alternative-for-distributors',
  'cash-conversion-cycle-for-distributors',
  'cheque-bounce-recovery-distributors',
  'collect-payment-against-tally-invoice-whatsapp',
  'collection-efficiency-ratio-formula-india',
  'collections-app-for-textile-wholesalers',
  'credflow-alternative-tally-native',
  'credit-limit-for-retailers',
  'days-sales-outstanding-distributor-india',
  'distributor-cash-flow-receivables',
  'distributor-credit-policy-template',
  'dso-for-distributors',
  'e-invoice-on-phone-tally',
  'e-way-bill-on-phone',
  'field-order-collection-app-tally',
  'free-tally-mobile-app-vs-paid',
  'gst-compliance-on-mobile-for-distributors',
  'how-indian-distributors-manage-collections',
  'how-much-distributors-lose-to-mdr-every-year',
  'how-to-check-party-outstanding-tally-mobile',
  'how-to-reconcile-bank-statement-tally-mobile',
  'how-to-record-payment-in-tally-on-mobile',
  'how-to-send-payment-reminder-from-tally-whatsapp',
  'how-to-share-ledger-statement-whatsapp-tally',
  'how-to-split-upi-payment-across-tally-invoices',
  'is-upi-free-for-merchants-in-india',
  'khatabook-alternative-for-distributors-india',
  'marg-erp-alternative-for-distributors',
  'mdr-vs-convenience-fee-upi',
  'multi-business-tally-mobile-app',
  'mybillbook-alternative-for-distributors',
  'nil-mdr-upi-collection-on-tally-invoices',
  'okcredit-alternative-for-distributors',
  'outstanding-payment-reminder-app-india',
  'partywise-outstanding-statement-tally',
  'payment-collection-cost-comparison-india',
  'payment-gateway-charges-comparison-for-distributors',
  'payment-gateway-for-msme-india',
  'payment-link-tally-integration',
  'paytm-for-business-vs-takkada',
  'razorpay-vs-tally-native-collection',
  'receivables-app-for-agri-input-distributors',
  'refrens-vs-takkada',
  'salesman-app-tally-india',
  'tally-cloud',
  'tally-collection-app-for-paint-distributors',
  'tally-mobile-app-for-android',
  'tally-mobile-par-kaise-chalaye',
  'tally-payment-reconciliation-on-mobile',
  'tally-remote-access-vs-mobile-app',
  'tally-whatsapp-invoice-dispatch',
  'udhar-vasuli-kaise-kare-distributor',
  'upi-autopay-for-distributors',
  'upi-collection-app-for-distributors-india',
  'upi-mdr-charges-india-2026',
  'upi-vs-card-vs-cash-collection-cost-distributor',
  'view-tally-reports-on-mobile',
  'what-is-mdr-and-why-it-matters-for-distributors',
  'what-is-utr-number-tally-payment',
  'what-is-vpa-upi-id-distributors',
  'whatsapp-invoice-format-tally',
  'whatsapp-payment-reminder-for-distributors',
  'working-capital-problem-indian-wholesalers',
  'zero-mdr-upi-for-dairy-distributors',
  'zero-mdr-upi-for-electrical-distributors',
  'zero-mdr-upi-for-fmcg-distributors',
  'zero-mdr-upi-for-pharma-distributors',
  'zoho-books-vs-tally-for-distributors',
]);

function runCli() {
  const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const blogDir = resolve(repoRoot, 'content/blog');
  const files = readdirSync(blogDir).filter((f) => f.endsWith('.md'));

  const failures = [];
  const warnings = [];
  const grandfathered = [];

  for (const file of files) {
    const raw = readFileSync(resolve(blogDir, file), 'utf-8');
    const { data } = matter(raw);
    const slug = data.slug || file.replace(/\.md$/, '');
    const result = checkLead(raw);

    if (result.status === 'fail') {
      if (LEGACY_GRANDFATHERED.has(slug)) {
        grandfathered.push({ slug, result });
      } else {
        failures.push({ slug, result });
      }
    } else if (result.status === 'warn') {
      warnings.push({ slug, result });
    }
  }

  for (const { slug, result } of warnings) {
    process.stdout.write(`WARN  ${slug}: ${result.message}\n`);
  }
  for (const { slug, result } of failures) {
    process.stdout.write(`FAIL  ${slug}: ${result.message}\n`);
  }

  const passCount = files.length - failures.length - warnings.length - grandfathered.length;
  process.stdout.write(
    `\nlint:content — ${files.length} posts: ${passCount} pass, ${warnings.length} warn, ` +
      `${failures.length} fail, ${grandfathered.length} legacy (grandfathered).\n`
  );

  if (failures.length > 0) {
    process.stdout.write(
      'Lead-answer guard failed. Add a front-loaded answer paragraph to the posts above ' +
        '(see CLAUDE.md content conventions).\n'
    );
    process.exit(1);
  }
}

// Robust "run directly?" check. A simple `file://${process.argv[1]}` compare
// breaks when the repo path contains a space (this repo lives under
// "takkada website/"), because import.meta.url percent-encodes it. Decoding the
// URL back to a path avoids that.
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  runCli();
}
