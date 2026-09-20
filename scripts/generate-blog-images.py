#!/usr/bin/env python3
"""
Takkada Blog Header Image Generator
Generates 1200×630px OG-ready blog images using brand colors.
Run from the repo root: python3 scripts/generate-blog-images.py
Requires Pillow: pip install Pillow

2026-09-06 redesign: the old template baked a "TAKKADA" wordmark + URL and
the full tagline into every image. That text is redundant everywhere the
image is actually used (the blog card/related-post HTML already renders the
category, title and excerpt right below the thumbnail; the site header
already carries the logo), so scrolling the blog index put the literal word
"TAKKADA" in the same top-left spot on every one of ~90 identical-looking
cards. This version drops the wordmark, URL and tagline, keeps only the
title (still needed so a shared link unfurls with a headline on WhatsApp/
Twitter with no surrounding page), renders it in the site's real Plus Jakarta
Sans face (converted from the woff2s under public/assets/fonts to
scripts/fonts/*.ttf so Pillow can bake them), and gives each category its
own low-alpha line-icon + accent tint so the ~15 categories read as a family
with variation instead of one repeated slide.
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path
import math
import os
import re

# ── Brand tokens (src/styles.css :root) ─────────────────────────────────────
# Navy, since the 2026-09-18 revamp. The sage palette these were is still on
# roughly a third of the corpus in older PNGs; re-running this file is what
# retires it, and there is no way to retint one post without retinting all.
PRIMARY_DARK   = "#0F1F3D"   # --color-primary-dark: deepest navy
PRIMARY_NAVY   = "#1E3A6B"   # --color-navy
SECONDARY      = "#2B5290"   # --color-navy-lift: the grid, one step up
ACCENT         = "#9CCBEA"   # --color-accent: AA on #0F1F3D
TINT_BRIGHT    = "#149EC2"   # --color-primary-light
LABEL_DARK     = "#DCF2FB"   # --color-wash
SURFACE        = "#FFFFFF"

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

# ── Canvas ───────────────────────────────────────────────────────────────────
W, H = 1200, 630

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JAKARTA_TTF = os.path.join(SCRIPT_DIR, "fonts", "PlusJakartaSans.ttf")

def get_font_display(size, weight=800):
    """Plus Jakarta Sans at display weight. The site retired its display serif
    in the 2026-09-18 revamp: headings now carry weight rather than a second
    family, so a card title is the same face at 800."""
    font = ImageFont.truetype(JAKARTA_TTF, size)
    try:
        font.set_variation_by_axes([weight])
    except Exception:
        pass
    return font

def get_font_ui(size, weight=700):
    """Plus Jakarta Sans (the site's body/UI face), variable weight axis."""
    font = ImageFont.truetype(JAKARTA_TTF, size)
    try:
        font.set_variation_by_axes([weight])
    except Exception:
        pass
    return font

def make_gradient(c1, c2, width, height):
    """Vertical gradient from c1 (top) to c2 (bottom)."""
    img = Image.new("RGB", (width, height))
    draw = ImageDraw.Draw(img)
    r1, g1, b1 = hex_to_rgb(c1)
    r2, g2, b2 = hex_to_rgb(c2)
    for y in range(height):
        t = y / height
        r = int(r1 + (r2 - r1) * t)
        g = int(g1 + (g2 - g1) * t)
        b = int(b1 + (b2 - b1) * t)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    return img

def wrap_text(draw, text, font, max_width):
    """Wrap text to fit within max_width pixels."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = (current + " " + word).strip()
        bbox = draw.textbbox((0, 0), test, font=font)
        if bbox[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines

def draw_tag(draw, text, x, y, font, tint):
    """Draw a small category pill in the category's accent tint."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    pad_x, pad_y = 16, 9
    rw, rh = tw + pad_x * 2, (bbox[3] - bbox[1]) + pad_y * 2
    draw.rounded_rectangle([x, y, x + rw, y + rh], radius=8, fill=hex_to_rgb(tint))
    draw.text((x + pad_x - bbox[0], y + pad_y - bbox[1]), text, font=font, fill=hex_to_rgb(PRIMARY_DARK))
    return rh

# ── Per-category line icons ──────────────────────────────────────────────────
# Drawn as a single low-alpha watermark in the lower-right quadrant so each
# category reads distinctly without competing with the title. Two categories
# sharing an icon (e.g. Collections/Receivables, Compliance/Trust) is fine;
# they're adjacent concepts and the icon is a mood cue, not a legend.

def _icon_glyph(draw, cx, cy, r, color, glyph):
    font = get_font_ui(int(r * 1.9), weight=700)
    bbox = draw.textbbox((0, 0), glyph, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((cx - tw / 2 - bbox[0], cy - th / 2 - bbox[1]), glyph, font=font, fill=color)

def icon_coins(draw, cx, cy, r, color, width):
    # Not a "₹" glyph: the Plus Jakarta Sans latin subset baked into
    # scripts/fonts/PlusJakartaSans.ttf has no ₹ codepoint (it's outside the
    # Latin/Latin-ext blocks the subset covers) and silently falls back to a
    # broken glyph. Two overlapping coin outlines reads as "money" without
    # depending on a codepoint the font doesn't have.
    cr = r * 0.42
    for dx, dy in [(-r * 0.28, -r * 0.05), (r * 0.28, r * 0.05)]:
        c = (cx + dx, cy + dy)
        draw.ellipse([c[0] - cr, c[1] - cr, c[0] + cr, c[1] + cr], outline=color, width=width)
        draw.line([(c[0] - cr * 0.55, c[1]), (c[0] + cr * 0.55, c[1])], fill=color, width=width)

def icon_percent(draw, cx, cy, r, color, width):
    # Filled glyphs cover far more area than a thin stroke at the same alpha,
    # so "%" reads much bolder than the line icons at matching alpha. Dim it
    # to keep visual weight consistent with the rest of the set.
    _icon_glyph(draw, cx, cy, r, (color[0], color[1], color[2], 20), "%")

def icon_arrow_up(draw, cx, cy, r, color, width):
    draw.line([(cx, cy + r * 0.6), (cx, cy - r * 0.5)], fill=color, width=width)
    draw.line([(cx, cy - r * 0.5), (cx - r * 0.35, cy - r * 0.05)], fill=color, width=width)
    draw.line([(cx, cy - r * 0.5), (cx + r * 0.35, cy - r * 0.05)], fill=color, width=width)

def icon_swap(draw, cx, cy, r, color, width):
    y1, y2 = cy - r * 0.25, cy + r * 0.25
    draw.line([(cx - r * 0.6, y1), (cx + r * 0.5, y1)], fill=color, width=width)
    draw.line([(cx + r * 0.5, y1), (cx + r * 0.2, y1 - r * 0.22)], fill=color, width=width)
    draw.line([(cx + r * 0.5, y1), (cx + r * 0.2, y1 + r * 0.22)], fill=color, width=width)
    draw.line([(cx + r * 0.6, y2), (cx - r * 0.5, y2)], fill=color, width=width)
    draw.line([(cx - r * 0.5, y2), (cx - r * 0.2, y2 - r * 0.22)], fill=color, width=width)
    draw.line([(cx - r * 0.5, y2), (cx - r * 0.2, y2 + r * 0.22)], fill=color, width=width)

def icon_pin(draw, cx, cy, r, color, width):
    cy = cy - r * 0.2
    cr, gap = r * 0.5, 50
    draw.arc([cx - cr, cy - cr, cx + cr, cy + cr], start=90 + gap, end=90 - gap + 360, fill=color, width=width)
    a1, a2 = math.radians(90 + gap), math.radians(90 - gap)
    p1 = (cx + math.cos(a1) * cr, cy + math.sin(a1) * cr)
    p2 = (cx + math.cos(a2) * cr, cy + math.sin(a2) * cr)
    tip = (cx, cy + r * 1.3)
    draw.line([p1, tip], fill=color, width=width)
    draw.line([p2, tip], fill=color, width=width)

def icon_phone(draw, cx, cy, r, color, width):
    w, h = r * 0.9, r * 1.5
    x0, y0, x1, y1 = cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2
    draw.rounded_rectangle([x0, y0, x1, y1], radius=r * 0.22, outline=color, width=width)
    draw.line([(cx - r * 0.15, y1 - r * 0.18), (cx + r * 0.15, y1 - r * 0.18)], fill=color, width=width)

def icon_checklist(draw, cx, cy, r, color, width):
    rows = 3
    total_h = r * 1.4
    start_y = cy - total_h / 2
    box = r * 0.22
    thin = max(2, width - 2)
    for i in range(rows):
        y = start_y + i * (total_h / (rows - 1))
        draw.rounded_rectangle([cx - r * 0.7, y - box / 2, cx - r * 0.7 + box, y + box / 2], radius=box * 0.25, outline=color, width=thin)
        draw.line([(cx - r * 0.35, y), (cx + r * 0.7, y)], fill=color, width=thin)

def icon_bars(draw, cx, cy, r, color, width):
    heights = [r * 0.6, r * 0.95, r * 1.3]
    bw, gap = r * 0.35, r * 0.18
    base_y = cy + r * 0.7
    start_x = cx - (len(heights) * bw + (len(heights) - 1) * gap) / 2
    for i, h in enumerate(heights):
        x0 = start_x + i * (bw + gap)
        draw.rectangle([x0, base_y - h, x0 + bw, base_y], outline=color, width=width)

def icon_document(draw, cx, cy, r, color, width):
    w, h = r * 1.1, r * 1.5
    x0, y0, x1, y1 = cx - w / 2, cy - h / 2, cx + w / 2, cy + h / 2
    draw.rounded_rectangle([x0, y0, x1, y1], radius=r * 0.12, outline=color, width=width)
    thin = max(2, width - 2)
    for i in range(3):
        ly = y0 + h * 0.35 + i * h * 0.16
        draw.line([(x0 + w * 0.18, ly), (x1 - w * 0.18, ly)], fill=color, width=thin)

def icon_gear(draw, cx, cy, r, color, width):
    draw.ellipse([cx - r * 0.5, cy - r * 0.5, cx + r * 0.5, cy + r * 0.5], outline=color, width=width)
    draw.ellipse([cx - r * 0.18, cy - r * 0.18, cx + r * 0.18, cy + r * 0.18], outline=color, width=width)
    for i in range(8):
        rad = math.radians(i * 45)
        x0, y0 = cx + math.cos(rad) * r * 0.5, cy + math.sin(rad) * r * 0.5
        x1, y1 = cx + math.cos(rad) * r * 0.72, cy + math.sin(rad) * r * 0.72
        draw.line([(x0, y0), (x1, y1)], fill=color, width=width)

def icon_shield(draw, cx, cy, r, color, width):
    w, h = r * 1.1, r * 1.4
    pts = [
        (cx - w / 2, cy - h / 2 + h * 0.12),
        (cx, cy - h / 2),
        (cx + w / 2, cy - h / 2 + h * 0.12),
        (cx + w / 2, cy + h * 0.05),
        (cx, cy + h / 2),
        (cx - w / 2, cy + h * 0.05),
    ]
    draw.line(pts + [pts[0]], fill=color, width=width, joint="curve")
    draw.line(
        [(cx - w * 0.18, cy), (cx - w * 0.02, cy + h * 0.16), (cx + w * 0.22, cy - h * 0.12)],
        fill=color, width=max(2, width - 2), joint="curve",
    )

def icon_chain(draw, cx, cy, r, color, width):
    lw, lh = r * 0.55, r * 0.85
    draw.rounded_rectangle([cx - lw * 0.9, cy - lh / 2, cx - lw * 0.9 + lw, cy + lh / 2], radius=lw * 0.4, outline=color, width=width)
    draw.rounded_rectangle([cx + lw * 0.9 - lw, cy - lh / 2, cx + lw * 0.9, cy + lh / 2], radius=lw * 0.4, outline=color, width=width)

def icon_network(draw, cx, cy, r, color, width):
    for i in range(3):
        rad = math.radians(90 + i * 120)
        p = (cx + math.cos(rad) * r * 0.7, cy + math.sin(rad) * r * 0.7)
        draw.line([(cx, cy), p], fill=color, width=width)
        draw.ellipse([p[0] - r * 0.1, p[1] - r * 0.1, p[0] + r * 0.1, p[1] + r * 0.1], fill=color)
    draw.ellipse([cx - r * 0.13, cy - r * 0.13, cx + r * 0.13, cy + r * 0.13], fill=color)

def icon_dot(draw, cx, cy, r, color, width):
    draw.ellipse([cx - r * 0.3, cy - r * 0.3, cx + r * 0.3, cy + r * 0.3], outline=color, width=width)

# Every tint is light-on-navy now: the pill carries dark text, so a mid tone
# like the old secondary green would fail contrast on both counts at once.
CATEGORY_META = {
    "Collections":    dict(icon=icon_coins, tint=ACCENT),
    "Receivables":    dict(icon=icon_coins, tint=ACCENT),
    "Payables":       dict(icon=icon_arrow_up, tint=TINT_BRIGHT),
    "Field Sales":    dict(icon=icon_pin, tint=LABEL_DARK),
    "Tally Mobile":   dict(icon=icon_phone, tint=ACCENT),
    "How-To":         dict(icon=icon_checklist, tint=LABEL_DARK),
    "Market Reality": dict(icon=icon_bars, tint=TINT_BRIGHT),
    "Reports":        dict(icon=icon_document, tint=ACCENT),
    "Autopilot":      dict(icon=icon_gear, tint=LABEL_DARK),
    "Schemes":        dict(icon=icon_percent, tint=TINT_BRIGHT),
    "Compliance":     dict(icon=icon_shield, tint=ACCENT),
    "Trust":          dict(icon=icon_shield, tint=LABEL_DARK),
    "Integration":    dict(icon=icon_chain, tint=TINT_BRIGHT),
    "Distribution":   dict(icon=icon_network, tint=ACCENT),
    "Comparisons":    dict(icon=icon_swap, tint=LABEL_DARK),
}
DEFAULT_META = dict(icon=icon_dot, tint=ACCENT)

def generate_image(slug, title, category, tagline, output_dir):
    """Generate a single blog header image. `tagline` is accepted and ignored:
    the card/related-post HTML already renders the excerpt under the thumbnail
    (see module docstring)."""
    meta = CATEGORY_META.get(category, DEFAULT_META)
    tint = meta["tint"]

    # Opaque background.
    base = make_gradient(PRIMARY_DARK, PRIMARY_NAVY, W, H).convert("RGBA")

    # Every translucent element (grid + category icon) is drawn on its own
    # fully-transparent layer and alpha-composited onto the base. Pillow's
    # ImageDraw does NOT alpha-blend when you draw straight onto an RGBA
    # image (it overwrites), and mixed results otherwise for text vs shapes
    # on an RGB image with the mode="RGBA" draw hack (shapes blend, text
    # doesn't) — a real overlay + alpha_composite is the only path that's
    # correct for both.
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    odraw = ImageDraw.Draw(overlay)

    for x in range(0, W, 60):
        odraw.line([(x, 0), (x, H)], fill=(*hex_to_rgb(SECONDARY), 22), width=1)
    for y in range(0, H, 60):
        odraw.line([(0, y), (W, y)], fill=(*hex_to_rgb(SECONDARY), 22), width=1)

    # Single category icon, low-alpha watermark, lower-right
    meta["icon"](odraw, 940, 460, 150, (*hex_to_rgb(tint), 40), 7)

    img = Image.alpha_composite(base, overlay)
    draw = ImageDraw.Draw(img)

    # Category pill (opaque, drawn straight onto the composited image)
    font_tag = get_font_ui(15, weight=700)
    y_cursor = 64
    tag_h = draw_tag(draw, category.upper(), 64, y_cursor, font_tag, tint)
    y_cursor += tag_h + 32

    # Title, at the site's display weight (800, same as a hero heading)
    font_title = get_font_display(56, weight=800)
    lines = wrap_text(draw, title, font_title, W - 160)
    if len(lines) > 2:
        font_title = get_font_display(44, weight=800)
        lines = wrap_text(draw, title, font_title, W - 160)

    for line in lines[:3]:
        draw.text((64, y_cursor), line, font=font_title, fill=hex_to_rgb(SURFACE))
        bbox = draw.textbbox((64, y_cursor), line, font=font_title)
        y_cursor += (bbox[3] - bbox[1]) + 14

    # Bottom accent bar in the category's tint
    draw.rectangle([(0, H - 8), (W, H)], fill=hex_to_rgb(tint))

    # Save
    out_path = os.path.join(output_dir, f"{slug}.png")
    img = img.convert("RGB")
    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ── The posts ────────────────────────────────────────────────────────────────
# Read straight out of content/blog/*.md, not from a list kept here by hand.
# The hand-kept list was the reason checkBlogImages.mjs exists: adding a post
# and forgetting the entry shipped a broken hero and a blank WhatsApp unfurl
# with no build signal, and it did exactly that to forty of the July 2026
# batch. A post's own frontmatter is the only place that cannot fall behind
# the post.

FRONTMATTER = re.compile(r"\A---\s*\n(.*?)\n---\s*\n", re.S)

def field(block, name):
    m = re.search(rf'^{name}:\s*"?(.*?)"?\s*$', block, re.M)
    return m.group(1) if m else None

def read_posts(blog_dir):
    posts = []
    for path in sorted(Path(blog_dir).glob("*.md")):
        block = FRONTMATTER.match(path.read_text(encoding="utf-8"))
        if not block:
            raise SystemExit(f"{path.name}: no frontmatter block")
        body = block.group(1)
        title = field(body, "title")
        category = field(body, "category")
        if not title:
            raise SystemExit(f"{path.name}: frontmatter has no title")
        if category not in CATEGORY_META:
            # Not fatal: DEFAULT_META draws a plain dot. Worth saying out loud,
            # because a category with no icon is usually a typo in the post.
            print(f"  ! {path.stem}: category {category!r} has no icon, using the default")
        posts.append(dict(slug=path.stem, title=title, category=category or ""))
    return posts


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root  = os.path.dirname(script_dir)
    output_dir = os.path.join(repo_root, "public", "assets", "blog")
    os.makedirs(output_dir, exist_ok=True)

    posts = read_posts(os.path.join(repo_root, "content", "blog"))
    print(f"Generating {len(posts)} blog header images → {output_dir}\n")
    for post in posts:
        generate_image(
            slug=post["slug"],
            title=post["title"],
            category=post["category"],
            tagline=None,
            output_dir=output_dir,
        )
    print("\nDone. All images saved.")
