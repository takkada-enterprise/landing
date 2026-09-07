import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { routeMetadata } from '../siteMetadata';

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

// public/_redirects has one failure mode that is invisible from the file
// itself: on Cloudflare Pages a static asset wins over a redirect rule for the
// same path, so a rule pointing at a page the build still produces does
// nothing at all while looking exactly like a working redirect. That is how a
// promoted URL ends up serving both versions and splitting its own signal.
//
// So the two things asserted here are that the source no longer builds and the
// target does. Redirect syntax itself is Cloudflare's problem; this is about
// whether the rule can take effect.

const RULES = readFileSync(resolve(repoRoot, 'public/_redirects'), 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'))
  .map((line) => {
    const [from, to, code] = line.split(/\s+/);
    return { from, to, code, line };
  });

const KNOWN_ROUTES = new Set(routeMetadata.map((r) => r.path));
const strip = (p) => (p.length > 1 ? p.replace(/\/$/, '') : p);

describe('public/_redirects', () => {
  it('has rules to check', () => {
    expect(RULES.length).toBeGreaterThan(0);
  });

  it.each(RULES.map((r) => [r.line, r]))('%s: is a permanent redirect', (_line, rule) => {
    expect(rule.code).toBe('301');
  });

  // The one that matters. A retired blog post must actually be gone from
  // content/blog, or the built /blog/<slug>/index.html shadows the rule.
  it.each(RULES.filter((r) => r.from.startsWith('/blog/')).map((r) => [r.line, r]))(
    '%s: the post it replaces is no longer in the corpus',
    (_line, rule) => {
      const slug = strip(rule.from).replace('/blog/', '');
      const post = resolve(repoRoot, `content/blog/${slug}.md`);
      expect(
        existsSync(post),
        `${slug}.md still builds, so this redirect can never fire`
      ).toBe(false);
    }
  );

  it.each(RULES.map((r) => [r.line, r]))('%s: points at a route that exists', (_line, rule) => {
    expect(KNOWN_ROUTES).toContain(strip(rule.to));
  });

  // A redirect chain costs a hop and loses a little of what it was written to
  // preserve. A target that is itself a source is the way one gets created.
  it('has no rule whose target is another rule’s source', () => {
    const sources = new Set(RULES.map((r) => strip(r.from)));
    const chained = RULES.filter((r) => sources.has(strip(r.to))).map((r) => r.line);
    expect(chained).toEqual([]);
  });
});
