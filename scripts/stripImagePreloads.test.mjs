import { describe, expect, it } from 'vitest';
import {
  HERO_IMAGE,
  findImagePreloads,
  isDeliberatePreload,
  stripBlanketImagePreloads,
} from './stripImagePreloads.mjs';

const hero = `<link rel="preload" as="image" href="${HERO_IMAGE}">`;
// What React 19 actually emits for the playable phone's base <img>, which
// carries src + srcSet + sizes + fetchPriority: no href, a camelCased
// imageSrcSet, and a camelCased fetchPriority. Captured from
// renderToStaticMarkup rather than hand-written, because both the missing
// href and the casing are the things that break a naive guard.
const responsiveHero =
  '<link rel="preload" as="image" imageSrcSet="/assets/screens/home-360.webp 360w, /assets/screens/home-720.webp 720w" imageSizes="(max-width: 600px) 90vw, 360px" fetchPriority="high"/>';
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

describe('the homepage hero is the playable phone screen', () => {
  it('HERO_IMAGE names the 720w home screen export', () => {
    expect(HERO_IMAGE).toBe('/assets/screens/home-720.webp');
  });

  it('keeps the responsive hero preload even with no href attribute', () => {
    // Strip the fetchPriority so only rule 2 (the URL match) can save it —
    // otherwise this passes on rule 1 and proves nothing about the belt.
    const withoutPriority = responsiveHero.replace(' fetchPriority="high"', '');
    expect(isDeliberatePreload(withoutPriority)).toBe(true);
    expect(stripBlanketImagePreloads(`<head>${withoutPriority}</head>`)).toContain(withoutPriority);
  });

  it('keeps it on fetchPriority alone too', () => {
    const out = stripBlanketImagePreloads(`<head>${responsiveHero}${blanket}</head>`);
    expect(out).toContain(responsiveHero);
    expect(out).not.toContain(blanket);
  });

  it('carries HERO_IMAGE in the tag the post-build guard greps', () => {
    // checkImagePreloads.mjs asserts dist/index.html holds a preload whose raw
    // tag contains HERO_IMAGE. With no href that substring lives in the
    // imageSrcSet, so this is the shape that check depends on.
    const tags = findImagePreloads(`<head>${responsiveHero}${blanket}</head>`);
    expect(tags.filter((tag) => tag.includes(HERO_IMAGE))).toHaveLength(1);
  });

  it('does not rescue a blanket preload for some other screen export', () => {
    const otherScreen =
      '<link rel="preload" as="image" imageSrcSet="/assets/screens/review-invoices-360.webp 360w, /assets/screens/review-invoices-720.webp 720w">';
    expect(isDeliberatePreload(otherScreen)).toBe(false);
    expect(stripBlanketImagePreloads(`<head>${otherScreen}</head>`)).toBe('<head></head>');
  });
});
