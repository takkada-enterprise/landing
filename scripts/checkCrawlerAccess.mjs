// checkCrawlerAccess — confirm the Cloudflare AI-bot dashboard change landed and
// catch future regressions in AI-search crawler access to takkada.com.
//
// Why this is a *relative* signal, not a hard allow/deny oracle: Cloudflare
// verifies its known bots by source IP, so a spoofed user-agent from this
// machine can legitimately get a 403 even when the real crawler is allowed.
// The durable source of truth is the Cloudflare dashboard setting (Operator
// Action #1 in the plan). This script's job is to (a) confirm Googlebot is
// served as a baseline and (b) flag when the AI-search crawlers are blocked
// *relative* to that baseline — the shape of a regression.
//
// Pure helpers (classifyResponse, detectAiRegression) are unit-tested in
// scripts/checkCrawlerAccess.test.mjs; the network fetch only runs when this
// file is executed directly.

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const TARGET_URLS = [
  'https://takkada.com/',
  'https://takkada.com/sitemap.xml',
];

// The baseline crawler plus the AI-search / citation crawlers we want reachable.
export const BASELINE_BOT = 'Googlebot';

export const AI_SEARCH_BOTS = ['OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot'];

export const BOT_USER_AGENTS = {
  Googlebot:
    'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
  'OAI-SearchBot': 'Mozilla/5.0 (compatible; OAI-SearchBot/1.0; +https://openai.com/searchbot)',
  'ChatGPT-User': 'Mozilla/5.0 (compatible; ChatGPT-User/1.0; +https://openai.com/bot)',
  ClaudeBot: 'Mozilla/5.0 (compatible; ClaudeBot/1.0; +http://www.anthropic.com/claude-bot)',
  PerplexityBot: 'Mozilla/5.0 (compatible; PerplexityBot/1.0; +https://perplexity.ai/perplexitybot)',
};

/**
 * Classify a single fetch result into a coarse access bucket.
 * @param {{status: number|null, error?: string}} result
 * @returns {'served'|'blocked'|'unknown'}
 */
export function classifyResponse(result) {
  if (!result || result.error || result.status == null || Number.isNaN(result.status)) {
    return 'unknown';
  }
  const { status } = result;
  if (status >= 200 && status < 400) return 'served';
  // 401/403/429 are the access-denied shapes; any other 4xx/5xx is treated as
  // blocked for the purpose of the relative signal (it is not "served").
  if (status >= 400) return 'blocked';
  return 'unknown';
}

/**
 * Given a map of bot -> classification, decide whether the AI-search crawlers
 * are regressing relative to the Googlebot baseline.
 * @param {Record<string, 'served'|'blocked'|'unknown'>} classifications
 * @returns {{regression: boolean, baseline: string, blocked: string[], note?: string}}
 */
export function detectAiRegression(classifications) {
  const baseline = classifications[BASELINE_BOT];
  if (baseline !== 'served') {
    // No trustworthy baseline — cannot assert a relative regression.
    return {
      regression: false,
      baseline,
      blocked: [],
      note: `${BASELINE_BOT} is "${baseline ?? 'unknown'}", not "served"; relative signal is inconclusive (likely this machine's IP, not a real block).`,
    };
  }
  const blocked = AI_SEARCH_BOTS.filter((bot) => classifications[bot] === 'blocked');
  return { regression: blocked.length > 0, baseline, blocked };
}

async function fetchAs(url, userAgent) {
  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'manual',
      headers: { 'User-Agent': userAgent, Accept: '*/*' },
    });
    return { status: res.status };
  } catch (error) {
    return { status: null, error: error?.message ?? String(error) };
  }
}

async function main() {
  const url = process.argv[2] || TARGET_URLS[0];
  const bots = Object.keys(BOT_USER_AGENTS);
  const classifications = {};

  process.stdout.write(`Crawler-access check against ${url}\n\n`);
  for (const bot of bots) {
    // eslint-disable-next-line no-await-in-loop
    const result = await fetchAs(url, BOT_USER_AGENTS[bot]);
    const verdict = classifyResponse(result);
    classifications[bot] = verdict;
    const statusText = result.status ?? result.error ?? 'no-response';
    process.stdout.write(`  ${bot.padEnd(16)} ${String(statusText).padEnd(12)} ${verdict}\n`);
  }

  const { regression, baseline, blocked, note } = detectAiRegression(classifications);
  process.stdout.write('\n');
  if (note) process.stdout.write(`Note: ${note}\n`);
  process.stdout.write(`Baseline (${BASELINE_BOT}): ${baseline}\n`);

  if (regression) {
    process.stdout.write(
      `AI-ACCESS REGRESSION: ${blocked.join(', ')} blocked while ${BASELINE_BOT} is served.\n` +
        'Re-check the Cloudflare "Block AI bots" dashboard setting (Operator Action #1).\n'
    );
    process.exit(1);
  }
  process.stdout.write('No AI-access regression detected relative to the baseline.\n');
}

// Run the network check only when executed directly, never on import. Decode
// import.meta.url to a path so the compare survives a repo path with a space
// (this repo lives under "takkada website/").
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
