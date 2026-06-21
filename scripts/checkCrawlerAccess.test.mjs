import { describe, expect, it } from 'vitest';
import {
  classifyResponse,
  detectAiRegression,
  AI_SEARCH_BOTS,
  BASELINE_BOT,
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
