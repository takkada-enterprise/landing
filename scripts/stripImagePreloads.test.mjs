import { describe, expect, it } from 'vitest';
import {
  HERO_IMAGE,
  findImagePreloads,
  isDeliberatePreload,
  stripBlanketImagePreloads,
} from './stripImagePreloads.mjs';

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

  it('matches regardless of attribute order and quote style (SSG update-proofing)', () => {
    const reordered = '<link as="image" href="/assets/screenshots/settlement.webp" rel="preload">';
    const singleQuoted = "<link rel='preload' as='image' href='/assets/screenshots/party-list.webp'>";
    const html = `<head>${reordered}${singleQuoted}${hero}</head>`;
    const out = stripBlanketImagePreloads(html);
    expect(out).not.toContain(reordered);
    expect(out).not.toContain(singleQuoted);
    expect(out).toContain(hero);
  });
});

describe('shared detection helpers (used by the post-build guard)', () => {
  it('findImagePreloads returns only image preloads', () => {
    const tags = findImagePreloads(`<head>${hero}${script}${font}${blogHero}</head>`);
    expect(tags).toHaveLength(2);
  });

  it('isDeliberatePreload accepts hero + fetchpriority-high and rejects blanket tags', () => {
    expect(isDeliberatePreload(hero)).toBe(true);
    expect(isDeliberatePreload(blogHero)).toBe(true);
    expect(isDeliberatePreload(blanket)).toBe(false);
  });
});
