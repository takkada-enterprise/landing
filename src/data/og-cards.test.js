import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { DEFAULT_OG_IMAGE } from './schema';

// The og:image is the WhatsApp/social unfurl card — the funnel's first
// impression when a link is forwarded (R12). It must be a real branded
// 1200×630 card, never the logo fallback the audit flagged.
describe('OG card system', () => {
  it('default og:image is a branded card, not the logo', () => {
    expect(DEFAULT_OG_IMAGE).not.toContain('takkada-logo');
    expect(DEFAULT_OG_IMAGE).toBe('/assets/og/takkada-og-default.png');
  });

  it('every referenced card exists in public/assets/og/', () => {
    for (const card of [
      'takkada-og-default.png',
      'takkada-og-comparison.png',
      'takkada-og-demo.png',
    ]) {
      const path = resolve(__dirname, '../../public/assets/og', card);
      expect(existsSync(path), `${card} missing — run scripts/generate-og-cards.py`).toBe(true);
    }
  });
});
