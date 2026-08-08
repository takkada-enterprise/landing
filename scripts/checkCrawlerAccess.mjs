// checkCrawlerAccess — confirm the Cloudflare AI-bot dashboard change landed and
// catch future regressions in AI-search crawler access to takkada.com.
//
// TWO ARMS, because one of them was blind and it cost a full session to notice.
//
// Arm 1, edge access: fetch as each bot and compare against a Googlebot
// baseline. This is a *relative* signal, not a hard allow/deny oracle, because
// Cloudflare verifies its known bots by source IP, so a spoofed user-agent from
// this machine can legitimately get a 403 even when the real crawler is
// allowed. Its job is to confirm Googlebot is served and flag when the AI
// crawlers are blocked relative to that baseline.
//
// Arm 2, robots.txt directives: fetch the live robots.txt and evaluate it the
// way a crawler would. Arm 1 cannot see this class of block at all. Through
// 2026-08-08 Cloudflare's managed robots.txt was injecting `Disallow: /` for
// ClaudeBot, GPTBot, Google-Extended and Applebot-Extended ahead of our own
// file, and Arm 1 reported every bot served (200) the entire time, because
// nothing was blocked *by IP*. A well-behaved crawler reads robots.txt and
// leaves; the 200 it would have got is irrelevant. Arm 2 closes that gap and is
// the reason this script can now be trusted as a regression detector.
//
// Pure helpers (classifyResponse, detectAiRegression, parseRobots, isAllowed,
// auditRobots) are unit-tested in scripts/checkCrawlerAccess.test.mjs; the
// network fetches only run when this file is executed directly.

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

// The full set CLAUDE.md §9 requires robots.txt to allow. Wider than
// AI_SEARCH_BOTS, which only covers the four this machine can usefully
// impersonate over HTTP: GPTBot, Google-Extended and Applebot-Extended are
// training/grounding agents whose access is a robots.txt question only.
export const ROBOTS_REQUIRED_BOTS = [
  'Googlebot',
  'Bingbot',
  'GPTBot',
  'ClaudeBot',
  'PerplexityBot',
  'OAI-SearchBot',
  'Google-Extended',
  'Applebot-Extended',
];

export const ROBOTS_URL = 'https://takkada.com/robots.txt';

/**
 * Parse a robots.txt into user-agent groups. Consecutive `User-agent:` lines
 * share one group of rules, which is how the format expresses "these agents,
 * same policy". Unknown directives (Sitemap, Content-Signal, Crawl-delay) are
 * ignored rather than treated as rules.
 * @param {string} text
 * @returns {Array<{agents: string[], rules: Array<{type: 'allow'|'disallow', path: string}>}>}
 */
export function parseRobots(text) {
  const groups = [];
  let current = null;
  // A group closes when a User-agent line follows at least one rule; another
  // User-agent immediately after a User-agent extends the same group.
  let expectingAgents = false;

  for (const rawLine of String(text ?? '').split('\n')) {
    const line = rawLine.split('#')[0].trim();
    if (line === '') continue;
    const colon = line.indexOf(':');
    if (colon === -1) continue;
    const field = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (field === 'user-agent') {
      if (!current || !expectingAgents) {
        current = { agents: [], rules: [] };
        groups.push(current);
        expectingAgents = true;
      }
      current.agents.push(value.toLowerCase());
      continue;
    }
    if (field !== 'allow' && field !== 'disallow') continue;
    if (!current) continue;
    expectingAgents = false;
    current.rules.push({ type: field, path: value });
  }
  return groups;
}

/**
 * Decide whether `path` is crawlable by `agent`.
 *
 * Group selection follows RFC 9309: the most specific user-agent wins (an exact
 * name beats `*`), and EVERY group naming that agent is merged, not just the
 * first one. The merge matters here specifically. Cloudflare's managed
 * robots.txt injected its block ahead of our file, so a `Disallow: /` for
 * ClaudeBot and our own `Allow: /` for ClaudeBot were both live in the same
 * document. A first-group-wins parser reads that document differently depending
 * on which half came first, which is not a property a regression guard may have.
 *
 * Rule selection deviates from Google's parser on ONE point, deliberately. The
 * standard breaks an equal-length Allow/Disallow tie in favour of Allow. This
 * function reports the tie as disallowed and sets `conflict`. A guard that
 * answered "allowed" while a `Disallow: /` for that bot sat in the live file
 * would have stayed silent through the exact incident it exists to catch. Two
 * directives contradicting each other IS the misconfiguration, whichever way a
 * given crawler happens to resolve it.
 *
 * @param {ReturnType<typeof parseRobots>} groups
 * @param {string} agent
 * @param {string} [path]
 * @returns {{allowed: boolean, matchedAgent: string|null, rule: object|null, conflict: boolean}}
 */
export function isAllowed(groups, agent, path = '/') {
  const wanted = String(agent ?? '').toLowerCase();

  const named = groups.filter((group) => group.agents.includes(wanted));
  const wildcard = groups.filter((group) => group.agents.includes('*'));
  const matching = named.length > 0 ? named : wildcard;

  // No group at all means no instruction, and no instruction means allowed.
  if (matching.length === 0) {
    return { allowed: true, matchedAgent: null, rule: null, conflict: false };
  }
  const matchedAgent = named.length > 0 ? wanted : '*';
  const rules = matching.flatMap((group) => group.rules);

  let best = null;
  let conflict = false;
  for (const rule of rules) {
    // An empty Disallow value means "disallow nothing"; it is not a match.
    if (rule.type === 'disallow' && rule.path === '') continue;
    if (!path.startsWith(rule.path)) continue;
    if (best === null || rule.path.length > best.path.length) {
      best = rule;
      conflict = false;
      continue;
    }
    if (rule.path.length === best.path.length && rule.type !== best.type) {
      // Contradiction at the same specificity. Report the restrictive side.
      conflict = true;
      if (rule.type === 'disallow') best = rule;
    }
  }
  if (!best) return { allowed: true, matchedAgent, rule: null, conflict: false };
  return { allowed: best.type === 'allow' && !conflict, matchedAgent, rule: best, conflict };
}

/**
 * Audit a robots.txt body against the bots the site is required to allow.
 * @param {string} text
 * @param {string[]} [bots]
 * @param {string} [path]
 * @returns {{disallowed: Array<{bot: string, matchedAgent: string|null, rule: object|null}>, results: Array<object>}}
 */
export function auditRobots(text, bots = ROBOTS_REQUIRED_BOTS, path = '/') {
  const groups = parseRobots(text);
  const results = bots.map((bot) => ({ bot, ...isAllowed(groups, bot, path) }));
  return { disallowed: results.filter((r) => !r.allowed), results };
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

async function auditLiveRobots(robotsUrl) {
  process.stdout.write(`\nrobots.txt directives, from ${robotsUrl}\n\n`);
  let body;
  try {
    const res = await fetch(robotsUrl, { headers: { Accept: 'text/plain' } });
    if (!res.ok) {
      process.stdout.write(`  could not read robots.txt (HTTP ${res.status}). Skipping arm 2.\n`);
      return { inconclusive: true, disallowed: [] };
    }
    const contentType = res.headers.get('content-type') ?? '';
    body = await res.text();
    // A host with no robots.txt of its own can serve an SPA's index.html here
    // with a 200. That is not an allow, it is an absence, and it is exactly the
    // shape app.takkada.com returns today.
    if (contentType.includes('text/html') || /^\s*<!doctype html/i.test(body)) {
      process.stdout.write(
        `  ${robotsUrl} returned HTML, not a robots.txt. That host has no crawler\n` +
          '  instructions at all. Ship a real robots.txt there.\n'
      );
      return { inconclusive: true, disallowed: [] };
    }
  } catch (error) {
    process.stdout.write(`  fetch failed: ${error?.message ?? error}. Skipping arm 2.\n`);
    return { inconclusive: true, disallowed: [] };
  }

  const { results, disallowed } = auditRobots(body);
  for (const result of results) {
    const via = result.matchedAgent === null ? 'no matching group' : `via ${result.matchedAgent}`;
    const rule = result.rule ? `${result.rule.type}: ${result.rule.path || '(empty)'}` : 'no rule';
    if (result.conflict) {
      process.stdout.write(
        `  ${result.bot.padEnd(18)}CONFLICT    contradicting allow/disallow at the same specificity\n`
      );
      continue;
    }
    process.stdout.write(
      `  ${result.bot.padEnd(18)}${(result.allowed ? 'allowed' : 'DISALLOWED').padEnd(12)}${rule.padEnd(20)}${via}\n`
    );
  }
  return { inconclusive: false, disallowed };
}

async function main() {
  const url = process.argv[2] || TARGET_URLS[0];
  const robotsUrl = process.argv[3] || ROBOTS_URL;
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

  const robots = await auditLiveRobots(robotsUrl);

  process.stdout.write('\n');
  let failed = false;

  if (regression) {
    failed = true;
    process.stdout.write(
      `EDGE REGRESSION: ${blocked.join(', ')} blocked while ${BASELINE_BOT} is served.\n` +
        'Re-check Cloudflare → AI Crawl Control → Security, the per-crawler Block toggles.\n'
    );
  } else {
    process.stdout.write('Edge: no access regression relative to the baseline.\n');
  }

  if (robots.disallowed.length > 0) {
    failed = true;
    process.stdout.write(
      `ROBOTS REGRESSION: ${robots.disallowed.map((r) => r.bot).join(', ')} disallowed.\n` +
        'First suspect is Cloudflare → AI Crawl Control → Signals → "Managed robots.txt",\n' +
        'which injects its own block ahead of our file and cannot be fixed by editing it.\n'
    );
  } else if (robots.inconclusive) {
    process.stdout.write('robots.txt: inconclusive, see above.\n');
  } else {
    process.stdout.write('robots.txt: every required crawler is allowed.\n');
  }

  if (failed) process.exit(1);
}

// Run the network check only when executed directly, never on import. Decode
// import.meta.url to a path so the compare survives a repo path with a space
// (this repo lives under "takkada website/").
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main();
}
