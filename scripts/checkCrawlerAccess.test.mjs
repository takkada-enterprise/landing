import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  auditRobots,
  classifyResponse,
  detectAiRegression,
  isAllowed,
  parseRobots,
  AI_SEARCH_BOTS,
  BASELINE_BOT,
  ROBOTS_REQUIRED_BOTS,
} from './checkCrawlerAccess.mjs';

describe('classifyResponse', () => {
  it('classifies 2xx and 3xx as served', () => {
    expect(classifyResponse({ status: 200 })).toBe('served');
    expect(classifyResponse({ status: 204 })).toBe('served');
    expect(classifyResponse({ status: 301 })).toBe('served');
  });

  it('classifies access-denied and other error statuses as blocked', () => {
    expect(classifyResponse({ status: 401 })).toBe('blocked');
    expect(classifyResponse({ status: 403 })).toBe('blocked');
    expect(classifyResponse({ status: 429 })).toBe('blocked');
    expect(classifyResponse({ status: 503 })).toBe('blocked');
  });

  it('classifies a malformed/empty/errored response as unknown without throwing', () => {
    expect(classifyResponse({ status: null })).toBe('unknown');
    expect(classifyResponse({ status: null, error: 'ENOTFOUND' })).toBe('unknown');
    expect(classifyResponse({})).toBe('unknown');
    expect(classifyResponse(undefined)).toBe('unknown');
    expect(classifyResponse({ status: NaN })).toBe('unknown');
  });
});

describe('detectAiRegression', () => {
  const allServed = {
    [BASELINE_BOT]: 'served',
    ...Object.fromEntries(AI_SEARCH_BOTS.map((b) => [b, 'served'])),
  };

  it('reports clean when every citation crawler is served (happy path)', () => {
    const result = detectAiRegression(allServed);
    expect(result.regression).toBe(false);
    expect(result.blocked).toEqual([]);
  });

  it('flags a regression when an AI bot is blocked while Googlebot is served', () => {
    const result = detectAiRegression({ ...allServed, 'OAI-SearchBot': 'blocked' });
    expect(result.regression).toBe(true);
    expect(result.blocked).toContain('OAI-SearchBot');
  });

  it('does not assert a regression when the Googlebot baseline is not served', () => {
    const result = detectAiRegression({
      [BASELINE_BOT]: 'blocked',
      'OAI-SearchBot': 'blocked',
    });
    expect(result.regression).toBe(false);
    expect(result.note).toMatch(/inconclusive/i);
  });

  it('treats an unknown AI-bot result as neither served nor a hard regression', () => {
    const result = detectAiRegression({ ...allServed, ClaudeBot: 'unknown' });
    expect(result.regression).toBe(false);
    expect(result.blocked).toEqual([]);
  });
});

// The block Cloudflare's managed robots.txt was injecting ahead of our file
// through 2026-08-08, reduced to the shape that matters. Arm 1 of this script
// reported every one of these bots "served" the whole time it was live, which
// is exactly why arm 2 exists.
const CLOUDFLARE_MANAGED_BLOCK = `
User-agent: ClaudeBot
User-agent: GPTBot
User-agent: Google-Extended
User-agent: Applebot-Extended
Disallow: /

User-agent: *
Allow: /
`;

describe('parseRobots', () => {
  it('groups consecutive user-agent lines under one shared rule set', () => {
    const groups = parseRobots(CLOUDFLARE_MANAGED_BLOCK);
    expect(groups).toHaveLength(2);
    expect(groups[0].agents).toEqual([
      'claudebot',
      'gptbot',
      'google-extended',
      'applebot-extended',
    ]);
    expect(groups[0].rules).toEqual([{ type: 'disallow', path: '/' }]);
  });

  it('starts a new group when a user-agent follows a rule', () => {
    const groups = parseRobots('User-agent: A\nDisallow: /x\nUser-agent: B\nAllow: /\n');
    expect(groups.map((g) => g.agents)).toEqual([['a'], ['b']]);
  });

  it('ignores comments, blank lines and non-rule directives', () => {
    const groups = parseRobots(
      '# a comment\n\nUser-agent: A  # trailing\nContent-Signal: search=yes\nCrawl-delay: 5\nAllow: /\nSitemap: https://x/y.xml\n'
    );
    expect(groups).toHaveLength(1);
    expect(groups[0].rules).toEqual([{ type: 'allow', path: '/' }]);
  });

  it('returns an empty list for empty or non-string input rather than throwing', () => {
    expect(parseRobots('')).toEqual([]);
    expect(parseRobots(null)).toEqual([]);
    expect(parseRobots(undefined)).toEqual([]);
  });

  it('drops a rule that appears before any user-agent line', () => {
    expect(parseRobots('Disallow: /\nUser-agent: A\nAllow: /\n')).toEqual([
      { agents: ['a'], rules: [{ type: 'allow', path: '/' }] },
    ]);
  });
});

describe('isAllowed', () => {
  it('lets a named group override the wildcard group', () => {
    const groups = parseRobots('User-agent: *\nAllow: /\n\nUser-agent: BadBot\nDisallow: /\n');
    expect(isAllowed(groups, 'BadBot').allowed).toBe(false);
    expect(isAllowed(groups, 'Googlebot').allowed).toBe(true);
  });

  it('matches the user-agent case-insensitively, as crawlers do', () => {
    const groups = parseRobots('User-agent: ClaudeBot\nDisallow: /\n');
    expect(isAllowed(groups, 'claudebot').allowed).toBe(false);
    expect(isAllowed(groups, 'CLAUDEBOT').allowed).toBe(false);
  });

  it('falls back to the wildcard group when the bot is not named', () => {
    const groups = parseRobots('User-agent: *\nDisallow: /\n');
    const result = isAllowed(groups, 'SomeNewBot');
    expect(result.allowed).toBe(false);
    expect(result.matchedAgent).toBe('*');
  });

  it('allows when there is no matching group at all, because no instruction means allowed', () => {
    const groups = parseRobots('User-agent: OnlyThisBot\nDisallow: /\n');
    const result = isAllowed(groups, 'Googlebot');
    expect(result.allowed).toBe(true);
    expect(result.matchedAgent).toBeNull();
  });

  it('treats an empty Disallow value as disallowing nothing', () => {
    const groups = parseRobots('User-agent: A\nDisallow:\n');
    expect(isAllowed(groups, 'A').allowed).toBe(true);
  });

  it('gives the longest matching path prefix precedence', () => {
    const groups = parseRobots('User-agent: A\nDisallow: /\nAllow: /blog\n');
    expect(isAllowed(groups, 'A', '/').allowed).toBe(false);
    expect(isAllowed(groups, 'A', '/blog/post').allowed).toBe(true);
  });

  it('reports an equal-length Allow/Disallow contradiction as disallowed, not allowed', () => {
    // Deliberate deviation from Google's tie-break. A guard that answered
    // "allowed" here would have stayed silent through the managed-robots
    // incident, where an injected Disallow and our Allow were both live.
    const groups = parseRobots('User-agent: A\nDisallow: /x\nAllow: /x\n');
    const result = isAllowed(groups, 'A', '/x');
    expect(result.allowed).toBe(false);
    expect(result.conflict).toBe(true);
  });

  it('merges every group naming the agent, not just the first one', () => {
    // The bug a falsification probe caught: appending a second ClaudeBot group
    // that disallows everything left the verdict at "allowed", because the
    // earlier Allow group won and the later group was never read.
    const groups = parseRobots(
      'User-agent: ClaudeBot\nAllow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n'
    );
    expect(isAllowed(groups, 'ClaudeBot').allowed).toBe(false);
  });

  it('reaches the same verdict whichever order the contradicting groups appear in', () => {
    const first = 'User-agent: ClaudeBot\nDisallow: /\n\nUser-agent: ClaudeBot\nAllow: /\n';
    const second = 'User-agent: ClaudeBot\nAllow: /\n\nUser-agent: ClaudeBot\nDisallow: /\n';
    expect(isAllowed(parseRobots(first), 'ClaudeBot').allowed).toBe(
      isAllowed(parseRobots(second), 'ClaudeBot').allowed
    );
  });

  it('still lets a more specific path rule beat a broader one across merged groups', () => {
    const groups = parseRobots('User-agent: A\nDisallow: /\n\nUser-agent: A\nAllow: /blog\n');
    expect(isAllowed(groups, 'A', '/').allowed).toBe(false);
    expect(isAllowed(groups, 'A', '/blog/post').allowed).toBe(true);
  });

  it('ignores a wildcard group entirely once the agent is named anywhere', () => {
    const groups = parseRobots('User-agent: *\nDisallow: /\n\nUser-agent: A\nAllow: /\n');
    expect(isAllowed(groups, 'A').allowed).toBe(true);
    expect(isAllowed(groups, 'A').matchedAgent).toBe('a');
  });
});

describe('auditRobots', () => {
  it('catches the exact managed-robots block that arm 1 was blind to', () => {
    const { disallowed } = auditRobots(CLOUDFLARE_MANAGED_BLOCK);
    expect(disallowed.map((r) => r.bot).sort()).toEqual([
      'Applebot-Extended',
      'ClaudeBot',
      'GPTBot',
      'Google-Extended',
    ]);
  });

  it('passes the committed public/robots.txt with every required bot allowed', () => {
    // Resolved off cwd, not import.meta.url: vitest's jsdom transform hands this
    // module an http:// URL, which readFileSync rejects.
    const live = readFileSync(resolve(process.cwd(), 'public/robots.txt'), 'utf8');
    const { disallowed, results } = auditRobots(live);
    expect(disallowed).toEqual([]);
    expect(results).toHaveLength(ROBOTS_REQUIRED_BOTS.length);
  });

  it('reports every required bot disallowed under a blanket wildcard block', () => {
    const { disallowed } = auditRobots('User-agent: *\nDisallow: /\n');
    expect(disallowed).toHaveLength(ROBOTS_REQUIRED_BOTS.length);
  });

  it('reports clean for an empty robots.txt, since no instruction means allowed', () => {
    expect(auditRobots('').disallowed).toEqual([]);
  });
});
