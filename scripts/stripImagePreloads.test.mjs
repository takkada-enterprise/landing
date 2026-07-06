import { describe, expect, it } from 'vitest';
import { HERO_IMAGE, stripBlanketImagePreloads } from './stripImagePreloads.mjs';

const hero = `<link rel="preload" as="image" href="${HERO_IMAGE}">`;
const blanket = '<link rel="preload" as="image" href="/assets/screenshots/settlement.webp">';
const logo = '<link rel="preload" as="image" href="/assets/screenshots/takkada-logo.png">';
const blogHero =
  '<link rel="preload" as="image" href="/assets/blog/biz-analyst-alternative.png" fetchpriority="high">';
const script = '<link rel="modulepreload" href="/assets/index-abc.js">';
const font = '<link rel="preload" as="font" href="/x.woff2">';

describe('stripBlanketImagePreloads', () => {
  it('keeps the hero image preload and strips every blanket one', () => {
    const html = `<head>${hero}${blanket}${logo}</head>`;
    const out = stripBlanketImagePreloads(html);
    expect(out).toContain(hero);
    expect(out).not.toContain(blanket);
    expect(out).not.toContain(logo);
  });

  it('keeps deliberate fetchpriority="high" preloads (blog heroes)', () => {
    const html = `<head>${blogHero}${logo}</head>`;
    const out = stripBlanketImagePreloads(html);
    expect(out).toContain(blogHero);
    expect(out).not.toContain(logo);
  });

  it('leaves non-image preloads and module preloads untouched', () => {
    const html = `<head>${script}${font}${blanket}</head>`;
    const out = stripBlanketImagePreloads(html);
    expect(out).toContain(script);
    expect(out).toContain(font);
    expect(out).not.toContain(blanket);
  });

  it('is a no-op on pages with no image preloads', () => {
    const html = '<head><title>x</title></head><body></body>';
    expect(stripBlanketImagePreloads(html)).toBe(html);
  });
});
