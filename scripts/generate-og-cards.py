#!/usr/bin/env python3
"""
Takkada page OG-card generator (U6).
Produces the 1200x630 social/WhatsApp preview cards under public/assets/og/:
site-wide default, comparison page, and the /demo/ share page.

Same brand system as generate-blog-images.py (sage gradient, grid, accent
bar) so every card unfurls as one brand. Each card composites a real app
screenshot on the right — the product is the trust signal, not abstract art.

Run from the repo root (Pillow required; PEP-668 venv recipe):
  python3 -m venv /tmp/blogimg-venv && /tmp/blogimg-venv/bin/pip install Pillow
  /tmp/blogimg-venv/bin/python3 scripts/generate-og-cards.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

PRIMARY_DARK = "#1B3026"
PRIMARY_SAGE = "#344E41"
SECONDARY = "#4A7C59"
ACCENT = "#6B9E7A"
LABEL_DARK = "#B8D4BE"
SURFACE = "#FFFFFF"

W, H = 1200, 630
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_DIR = os.path.join(REPO, "public", "assets", "og")
INTER = os.path.join(REPO, "public", "assets", "fonts", "Inter-VariableFont_opsz_wght.ttf")


def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def get_font(size, bold=False):
    """Inter variable font (self-hosted) with weight variation; Arial fallback."""
    if os.path.exists(INTER):
        try:
            font = ImageFont.truetype(INTER, size)
            try:
                font.set_variation_by_axes([size, 700 if bold else 400])
            except Exception:
                pass
            return font
        except Exception:
            pass
    for path in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
    ]:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def make_gradient(c1, c2):
    img = Image.new("RGB", (W, H))
    draw = ImageDraw.Draw(img)
    r1, g1, b1 = hex_to_rgb(c1)
    r2, g2, b2 = hex_to_rgb(c2)
    for y in range(H):
        t = y / H
        draw.line([(0, y), (W, y)], fill=(
            int(r1 + (r2 - r1) * t), int(g1 + (g2 - g1) * t), int(b1 + (b2 - b1) * t)))
    return img


def wrap_text(draw, text, font, max_width):
    words, lines, current = text.split(), [], ""
    for word in words:
        test = (current + " " + word).strip()
        if draw.textbbox((0, 0), test, font=font)[2] <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def rounded_screenshot(path, width):
    """App screenshot scaled to `width`, with rounded corners."""
    shot = Image.open(path).convert("RGB")
    ratio = width / shot.width
    shot = shot.resize((width, int(shot.height * ratio)), Image.LANCZOS)
    radius = 28
    mask = Image.new("L", shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, *shot.size], radius=radius, fill=255)
    return shot, mask


def generate_card(filename, kicker, title, tagline, screenshot):
    img = make_gradient(PRIMARY_DARK, PRIMARY_SAGE)
    draw = ImageDraw.Draw(img, "RGBA")

    # Texture: subtle grid + circles, same family as the blog cards.
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=(*hex_to_rgb(SECONDARY), 30), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=(*hex_to_rgb(SECONDARY), 30), width=1)
    draw.ellipse([850, -180, 1380, 350], outline=(*hex_to_rgb(ACCENT), 60), width=2)
    draw.ellipse([-100, 430, 200, 730], outline=(*hex_to_rgb(ACCENT), 40), width=2)

    # Right rail: real app screenshot, bottom-cropped by the canvas.
    text_right = W - 80
    if screenshot and os.path.exists(screenshot):
        shot, mask = rounded_screenshot(screenshot, 300)
        img.paste(shot, (W - 300 - 72, 96), mask)
        draw = ImageDraw.Draw(img, "RGBA")
        text_right = W - 300 - 72 - 48

    # Wordmark + domain.
    draw.text((64, 52), "TAKKADA", font=get_font(26, bold=True), fill=hex_to_rgb(LABEL_DARK))
    draw.text((64, 88), "takkada.com", font=get_font(19), fill=hex_to_rgb(ACCENT))

    # Kicker pill.
    y = 190
    font_tag = get_font(17, bold=True)
    bbox = draw.textbbox((0, 0), kicker.upper(), font=font_tag)
    draw.rounded_rectangle([64, y, 64 + (bbox[2] - bbox[0]) + 32, y + (bbox[3] - bbox[1]) + 18],
                           radius=8, fill=hex_to_rgb(ACCENT))
    draw.text((64 + 16, y + 8), kicker.upper(), font=font_tag, fill=hex_to_rgb(PRIMARY_DARK))
    y += 66

    # Title.
    max_text = text_right - 64
    font_title = get_font(58, bold=True)
    lines = wrap_text(draw, title, font_title, max_text)
    if len(lines) > 2:
        font_title = get_font(48, bold=True)
        lines = wrap_text(draw, title, font_title, max_text)
    for line in lines[:3]:
        draw.text((64, y), line, font=font_title, fill=hex_to_rgb(SURFACE))
        y += draw.textbbox((64, y), line, font=font_title)[3] - y + 12
    y += 18

    # Tagline.
    font_sub = get_font(25)
    for line in wrap_text(draw, tagline, font_sub, max_text)[:2]:
        draw.text((64, y), line, font=font_sub, fill=hex_to_rgb(LABEL_DARK))
        y += draw.textbbox((64, y), line, font=font_sub)[3] - y + 8

    # Bottom accent bar.
    draw.rectangle([(0, H - 8), (W, H)], fill=hex_to_rgb(ACCENT))

    out = os.path.join(OUT_DIR, filename)
    img.convert("RGB").save(out, "PNG", optimize=True)
    print(f"✓ {out}")


CARDS = [
    {
        "filename": "takkada-og-default.png",
        "kicker": "For distributors on Tally",
        "title": "Get paid without chasing.",
        "tagline": "Invoice from your phone, send on WhatsApp, collect on UPI, auto-reconcile into Tally.",
        "screenshot": "public/assets/screenshots/home-screen.png",
    },
    {
        "filename": "takkada-og-comparison.png",
        "kicker": "Comparison",
        "title": "Choosing a Tally mobile app",
        "tagline": "Takkada vs Biz Analyst vs Livekeeping, feature by feature.",
        "screenshot": "public/assets/screenshots/reports-screen.png",
    },
    {
        "filename": "takkada-og-demo.png",
        "kicker": "Live demo",
        "title": "Open a real distributor's books",
        "tagline": "No signup. Explore the Takkada demo company from your phone.",
        "screenshot": "public/assets/screenshots/party-list.png",
    },
]

if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    for card in CARDS:
        generate_card(
            card["filename"], card["kicker"], card["title"], card["tagline"],
            os.path.join(REPO, card["screenshot"]),
        )
