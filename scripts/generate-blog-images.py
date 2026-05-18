#!/usr/bin/env python3
"""
Takkada Blog Header Image Generator
Generates 1200×630px OG-ready blog images using brand colors.
Run from the repo root: python3 scripts/generate-blog-images.py
Requires Pillow: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os
import math

# ── Brand tokens ────────────────────────────────────────────────────────────
PRIMARY_DARK   = "#1B3026"
PRIMARY_SAGE   = "#344E41"
SECONDARY      = "#4A7C59"
ACCENT         = "#6B9E7A"
CONTAINER_TINT = "#DAE5D6"
ON_CONTAINER   = "#0D1F12"
LABEL_DARK     = "#B8D4BE"
SURFACE        = "#FFFFFF"
TEXT_MUTED     = "#9CA39D"

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

# ── Canvas ───────────────────────────────────────────────────────────────────
W, H = 1200, 630

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

def draw_grid(draw, color, alpha=25):
    """Subtle grid overlay for texture."""
    grid_color = (*hex_to_rgb(color), alpha)
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=hex_to_rgb(color), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=hex_to_rgb(color), width=1)

def draw_circles(draw):
    """Decorative background circles."""
    circle_color = (*hex_to_rgb(SECONDARY), 60)
    # Large circle top-right
    draw.ellipse([900, -150, 1400, 350], fill=hex_to_rgb(SECONDARY) + (40,) if False else None,
                 outline=hex_to_rgb(ACCENT), width=1)
    # Small circle bottom-left
    draw.ellipse([-80, 400, 220, 700], outline=hex_to_rgb(ACCENT), width=1)

def get_font(size, bold=False):
    """Try system fonts, fall back to default."""
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()

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

def draw_tag(draw, text, x, y, font):
    """Draw a small category pill."""
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    pad_x, pad_y = 16, 8
    rx, ry = x, y
    rw, rh = tw + pad_x * 2, bbox[3] - bbox[1] + pad_y * 2
    draw.rounded_rectangle([rx, ry, rx + rw, ry + rh], radius=6,
                            fill=hex_to_rgb(ACCENT))
    draw.text((rx + pad_x, ry + pad_y), text, font=font, fill=hex_to_rgb(PRIMARY_DARK))
    return rh + 16

def generate_image(slug, title, category, tagline, output_dir):
    """Generate a single blog header image."""
    # Base gradient
    img = make_gradient(PRIMARY_DARK, PRIMARY_SAGE, W, H)
    draw = ImageDraw.Draw(img, "RGBA")

    # Subtle grid
    for x in range(0, W, 60):
        draw.line([(x, 0), (x, H)], fill=(*hex_to_rgb(SECONDARY), 30), width=1)
    for y in range(0, H, 60):
        draw.line([(0, y), (W, y)], fill=(*hex_to_rgb(SECONDARY), 30), width=1)

    # Decorative circles
    draw.ellipse([850, -180, 1380, 350], outline=(*hex_to_rgb(ACCENT), 60), width=2)
    draw.ellipse([950, -80, 1280, 250], outline=(*hex_to_rgb(LABEL_DARK), 30), width=1)
    draw.ellipse([-100, 430, 200, 730], outline=(*hex_to_rgb(ACCENT), 40), width=2)

    # Takkada wordmark (top-left)
    font_brand = get_font(22, bold=True)
    draw.text((64, 52), "TAKKADA", font=font_brand, fill=hex_to_rgb(LABEL_DARK))

    # takkada.com label
    font_small = get_font(18)
    draw.text((64, 82), "takkada.com/blog", font=font_small, fill=hex_to_rgb(TEXT_MUTED))

    # Category pill
    font_tag = get_font(16, bold=True)
    y_cursor = 160
    draw_tag(draw, category.upper(), 64, y_cursor, font_tag)
    y_cursor += 52

    # Title
    font_title = get_font(58, bold=True)
    lines = wrap_text(draw, title, font_title, W - 160)
    # If > 2 lines, reduce font size
    if len(lines) > 2:
        font_title = get_font(46, bold=True)
        lines = wrap_text(draw, title, font_title, W - 160)

    for line in lines[:3]:
        draw.text((64, y_cursor), line, font=font_title, fill=hex_to_rgb(SURFACE))
        bbox = draw.textbbox((64, y_cursor), line, font=font_title)
        y_cursor += (bbox[3] - bbox[1]) + 12

    y_cursor += 20

    # Tagline
    font_sub = get_font(26)
    sub_lines = wrap_text(draw, tagline, font_sub, W - 160)
    for line in sub_lines[:2]:
        draw.text((64, y_cursor), line, font=font_sub, fill=hex_to_rgb(LABEL_DARK))
        bbox = draw.textbbox((64, y_cursor), line, font=font_sub)
        y_cursor += (bbox[3] - bbox[1]) + 8

    # Bottom accent bar
    bar_y = H - 8
    draw.rectangle([(0, bar_y), (W, H)], fill=hex_to_rgb(ACCENT))

    # Save
    out_path = os.path.join(output_dir, f"{slug}.png")
    img = img.convert("RGB")
    img.save(out_path, "PNG", optimize=True)
    print(f"✓ {out_path}")


# ── Article definitions ───────────────────────────────────────────────────────
ARTICLES = [
    {
        "slug": "days-sales-outstanding-distributor-india",
        "title": "Days Sales Outstanding for Indian Distributors",
        "category": "Collections",
        "tagline": "What your DSO number should be. And how to compress it.",
    },
    {
        "slug": "salesman-app-tally-india",
        "title": "Salesman App for Tally in India: What Field Teams Actually Need",
        "category": "Field Sales",
        "tagline": "View-only access covers half the job. Here's what closes the gap.",
    },
    {
        "slug": "tally-whatsapp-invoice-dispatch",
        "title": "Auto-Dispatching Invoices on WhatsApp from Tally",
        "category": "Collections",
        "tagline": "What auto-dispatch is, how it works, and what it does to collection cycles.",
    },
    {
        "slug": "khatabook-alternative-for-distributors-india",
        "title": "Khatabook Alternative for Indian Distributors",
        "category": "Comparisons",
        "tagline": "Why distributors outgrow udhar-book apps and what closes the gap.",
    },
    {
        "slug": "credflow-alternative-tally-native",
        "title": "CredFlow Alternative for Indian Distributors",
        "category": "Comparisons",
        "tagline": "A Tally-native view on collections, MDR, and salesman-side invoicing.",
    },
    {
        "slug": "zero-mdr-upi-collection-for-distributors-india",
        "title": "Zero MDR UPI Collection for Indian Distributors",
        "category": "Collections",
        "tagline": "What 0% MDR actually means, structurally, and what it saves at scale.",
    },
    {
        "slug": "collection-efficiency-ratio-formula-india",
        "title": "Collection Efficiency Ratio for Indian Distributors",
        "category": "Collections",
        "tagline": "Formula, realistic targets, and the three levers that move the number.",
    },
    {
        "slug": "upi-collection-app-for-distributors-india",
        "title": "UPI Collection App for Distributors in India",
        "category": "Collections",
        "tagline": "What a distributor-grade UPI collection app must do in 2026.",
    },
    {
        "slug": "whatsapp-invoice-format-tally",
        "title": "WhatsApp Invoice Format for Tally",
        "category": "Collections",
        "tagline": "The three-part format that actually gets paid in 8 seconds.",
    },
    {
        "slug": "field-order-collection-app-tally",
        "title": "Field Order Collection App for Tally",
        "category": "Field Sales",
        "tagline": "What salesmen need on the phone to close orders at the counter.",
    },
    {
        "slug": "partywise-outstanding-statement-tally",
        "title": "Partywise Outstanding Statement in Tally",
        "category": "Collections",
        "tagline": "Format, WhatsApp dispatch, and the 0% MDR UPI link that gets it paid.",
    },
    {
        "slug": "multi-business-tally-mobile-app",
        "title": "Multi-Business Tally Mobile App",
        "category": "Tally Mobile",
        "tagline": "One phone, multiple companies, one consolidated dashboard.",
    },
    {
        "slug": "payment-collection-cost-comparison-india",
        "title": "Payment Collection Cost Comparison for Indian Distributors",
        "category": "Comparisons",
        "tagline": "The honest math on what 1 crore of collection actually costs.",
    },
]

if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root  = os.path.dirname(script_dir)
    output_dir = os.path.join(repo_root, "public", "assets", "blog")
    os.makedirs(output_dir, exist_ok=True)

    print(f"Generating {len(ARTICLES)} blog header images → {output_dir}\n")
    for article in ARTICLES:
        generate_image(
            slug=article["slug"],
            title=article["title"],
            category=article["category"],
            tagline=article["tagline"],
            output_dir=output_dir,
        )
    print("\nDone. All images saved.")
