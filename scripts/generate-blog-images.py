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
        "slug": "billbook-alternative-for-distributors",
        "title": "Bill Book App Alternative for Tally Distributors",
        "category": "Comparisons",
        "tagline": "Why a Tally distributor outgrows a standalone bill book app.",
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
    {
        "slug": "what-is-takkada",
        "title": "What Is Takkada? The Tally-Native Receivables App",
        "category": "Tally Mobile",
        "tagline": "Invoicing, collection, and reconciliation, on top of your Tally.",
    },
    {
        "slug": "takkada-vs-credflow",
        "title": "Takkada vs CredFlow: Tally Receivables Apps Compared",
        "category": "Comparisons",
        "tagline": "UPI MDR, phone invoicing, and Tally sync, compared in 2026.",
    },
    {
        "slug": "best-credflow-alternatives-india-2026",
        "title": "Best CredFlow Alternatives in India (2026)",
        "category": "Comparisons",
        "tagline": "The credflow alternatives worth shortlisting, and where each fits.",
    },
    {
        "slug": "credflow-vs-biz-analyst-vs-takkada",
        "title": "CredFlow vs Biz Analyst vs Takkada",
        "category": "Comparisons",
        "tagline": "Three tools, three jobs. The full three-way matrix.",
    },
    {
        "slug": "best-tally-app-for-receivables-2026",
        "title": "Best Tally App for Receivables in India",
        "category": "Tally Mobile",
        "tagline": "Beyond the outstanding report: the app that closes the loop.",
    },
    {
        "slug": "accounts-receivable-automation-tally",
        "title": "Accounts Receivable Automation for Tally",
        "category": "How-To",
        "tagline": "Automate invoicing, reminders, UPI collection, reconciliation.",
    },
    {
        "slug": "bidirectional-tally-sync-explained",
        "title": "How Bidirectional Tally Sync Works",
        "category": "Tally Mobile",
        "tagline": "A mirror you look at versus a workspace you act in.",
    },
    {
        "slug": "takkada-pricing-plans-2026",
        "title": "Takkada Pricing and Plans (2026)",
        "category": "Market Reality",
        "tagline": "Four flat annual plans, and 0% MDR on UPI on every one.",
    },
    {
        "slug": "automate-payment-reminders-tally",
        "title": "Automate Payment Reminders in Tally",
        "category": "How-To",
        "tagline": "Smart reminders that change by due date and overdue status.",
    },
    {
        "slug": "whatsapp-payment-collection-playbook-india",
        "title": "WhatsApp Payment Collection Playbook",
        "category": "Collections",
        "tagline": "Dispatch, remind, and collect on UPI at 0% MDR, one thread.",
    },
    {
        "slug": "how-to-access-tally-on-mobile-step-by-step",
        "title": "How to Access Tally on Mobile",
        "category": "How-To",
        "tagline": "The four real bridges from your phone to the office Tally machine.",
    },
    {
        "slug": "tally-remote-access-vs-mobile-app",
        "title": "Tally Remote Access vs a Mobile App",
        "category": "Comparisons",
        "tagline": "Latency, voucher creation, offline, and cost on a 2G-zone route.",
    },
    {
        "slug": "view-tally-reports-on-mobile",
        "title": "View Tally Reports on Mobile",
        "category": "Tally Mobile",
        "tagline": "The five reports a distributor reads from the phone every day.",
    },
    {
        "slug": "tally-mobile-app-for-android",
        "title": "Tally Mobile App for Android",
        "category": "Tally Mobile",
        "tagline": "What installs, what syncs, and what an Android phone can do.",
    },
    {
        "slug": "free-tally-mobile-app-vs-paid",
        "title": "Free Tally Mobile App vs Paid",
        "category": "Tally Mobile",
        "tagline": "Where read-only viewing ends and paid write-back begins.",
    },
    {
        "slug": "is-there-an-official-tally-mobile-app",
        "title": "Is There an Official Tally Mobile App?",
        "category": "Tally Mobile",
        "tagline": "The honest answer, and what every mobile path really is.",
    },
    {
        "slug": "how-to-record-payment-in-tally-on-mobile",
        "title": "Record a Payment in Tally on Mobile",
        "category": "How-To",
        "tagline": "Log cash and UPI receipts from the field, matched back to Tally.",
    },
    {
        "slug": "tally-payment-reconciliation-on-mobile",
        "title": "Tally Payment Reconciliation on Mobile",
        "category": "How-To",
        "tagline": "How auto-matching ends the 9 PM reconciliation session.",
    },
    {
        "slug": "accept-online-payment-on-tally-invoice",
        "title": "Accept Online Payment on Tally Invoices",
        "category": "Collections",
        "tagline": "Turn an invoice into a UPI link and collect at 0% MDR.",
    },
    {
        "slug": "collect-payment-against-tally-invoice-whatsapp",
        "title": "Collect Payment Against a Tally Invoice",
        "category": "Collections",
        "tagline": "Dispatch, remind, and collect on WhatsApp at 0% MDR, one thread.",
    },
    {
        "slug": "what-is-mdr-and-why-it-matters-for-distributors",
        "title": "What Is MDR, and Why It Matters",
        "category": "Market Reality",
        "tagline": "The cut taken on every payment, and how 0% MDR changes it.",
    },
    {
        "slug": "upi-mdr-charges-india-2026",
        "title": "UPI MDR Charges in India 2026",
        "category": "Market Reality",
        "tagline": "What P2M UPI really costs, and the per-transaction fee trap.",
    },
    {
        "slug": "is-upi-free-for-merchants-in-india",
        "title": "Is UPI Free for Merchants in India?",
        "category": "Market Reality",
        "tagline": "The payment is free. The hidden fees and reconciliation are not.",
    },
    {
        "slug": "payment-gateway-charges-comparison-for-distributors",
        "title": "Payment Gateway Charges Compared",
        "category": "Comparisons",
        "tagline": "MDR, per-transaction, monthly fees, versus a true 0% MDR rail.",
    },
    {
        "slug": "how-much-distributors-lose-to-mdr-every-year",
        "title": "How Much Distributors Lose to MDR",
        "category": "Market Reality",
        "tagline": "The yearly number nobody adds up, by collection volume.",
    },
    {
        "slug": "zero-mdr-upi-for-pharma-distributors",
        "title": "Zero MDR UPI for Pharma Distributors",
        "category": "Collections",
        "tagline": "Thin margins, long DSO, and the MDR that eats both.",
    },
    {
        "slug": "zero-mdr-upi-for-fmcg-distributors",
        "title": "Zero MDR UPI for FMCG Distributors",
        "category": "Collections",
        "tagline": "High volume, low ticket: why the per-receipt fee is brutal.",
    },
    {
        "slug": "only-tally-native-zero-mdr-upi-app-india",
        "title": "The Only Tally-Native 0% MDR UPI App",
        "category": "Market Reality",
        "tagline": "Genuine 0% MDR, no per-transaction fee, posted into Tally.",
    },
    {
        "slug": "nil-mdr-upi-collection-on-tally-invoices",
        "title": "Nil MDR UPI Collection on Tally Invoices",
        "category": "Collections",
        "tagline": "Link rides the invoice, money lands whole, receipt posts back.",
    },
    {
        "slug": "upi-vs-card-vs-cash-collection-cost-distributor",
        "title": "UPI vs Card vs Cash Collection Cost",
        "category": "Comparisons",
        "tagline": "The real expense of each rail, fees, time, and risk counted.",
    },
    {
        "slug": "marg-erp-alternative-for-distributors",
        "title": "Marg ERP Alternative: Mobile Collections for Tally Distributors",
        "category": "Comparisons",
        "tagline": "Keep the Tally books you trust. Add the field collection layer.",
    },
    {
        "slug": "busy-software-alternative-for-distributors",
        "title": "BUSY Software Alternative for Tally Distributors Who Collect",
        "category": "Comparisons",
        "tagline": "Don't migrate your core to fix a field-collection problem.",
    },
    {
        "slug": "zoho-books-vs-tally-for-distributors",
        "title": "Zoho Books vs Tally for Distributors",
        "category": "Comparisons",
        "tagline": "Cloud reach without handing your books to a new system.",
    },
    {
        "slug": "mybillbook-alternative-for-distributors",
        "title": "myBillBook Alternative for Tally-Native Distributors",
        "category": "Comparisons",
        "tagline": "One ledger in Tally, not a second set of numbers to reconcile.",
    },
    {
        "slug": "okcredit-alternative-for-distributors",
        "title": "OkCredit Alternative for Distributor Udhaar Collection",
        "category": "Comparisons",
        "tagline": "Past the digital khata to invoice-linked collection on Tally.",
    },
    {
        "slug": "bharatpe-for-distributors-mdr",
        "title": "BharatPe for Distributors: Is the QR Really 0% MDR?",
        "category": "Comparisons",
        "tagline": "The QR is 0% MDR. It still can't tell you which invoice paid.",
    },
    {
        "slug": "paytm-for-business-vs-takkada",
        "title": "Paytm for Business vs Takkada: UPI Collection on Tally",
        "category": "Comparisons",
        "tagline": "Acceptance is the easy half. Reconciliation into Tally is the work.",
    },
    {
        "slug": "razorpay-vs-tally-native-collection",
        "title": "Razorpay Payment Links vs Tally-Native Collection",
        "category": "Comparisons",
        "tagline": "A gateway settles to the bank. A Tally layer closes the bill.",
    },
    {
        "slug": "best-tally-add-on-apps-for-distributors-2026",
        "title": "Best Tally Mobile Add-On Apps for Distributors (2026)",
        "category": "Comparisons",
        "tagline": "Sorted by the job they do, from viewing to collecting.",
    },
    {
        "slug": "what-is-utr-number-tally-payment",
        "title": "What Is a UTR Number, and How It Matches a Tally Payment",
        "category": "How-To",
        "tagline": "The reference that pins a UPI receipt to the right bill in Tally.",
    },
    {
        "slug": "what-is-vpa-upi-id-distributors",
        "title": "What Is a VPA (UPI ID), and How Distributors Collect With One",
        "category": "Market Reality",
        "tagline": "The name@bank address every UPI collection runs on.",
    },
    {
        "slug": "mdr-vs-convenience-fee-upi",
        "title": "MDR vs Convenience Fee in UPI: What Distributors Pay",
        "category": "Market Reality",
        "tagline": "Two charges, two payers. What actually hits your account.",
    },
    {
        "slug": "upi-autopay-for-distributors",
        "title": "UPI AutoPay for Distributors: Recurring Collection Explained",
        "category": "How-To",
        "tagline": "How the e-mandate works, and the collection path that ships today.",
    },
    {
        "slug": "bill-by-bill-against-reference-tally",
        "title": "Bill-by-Bill in Tally: What \"Against Reference\" Means",
        "category": "Tally Mobile",
        "tagline": "The four reference types, and the one that closes an open bill.",
    },
    {
        "slug": "zero-mdr-upi-for-electrical-distributors",
        "title": "Zero MDR UPI for Electrical & Hardware Distributors",
        "category": "Collections",
        "tagline": "Long credit, big-ticket bills. Where 0% MDR frees real capital.",
    },
    {
        "slug": "collections-app-for-textile-wholesalers",
        "title": "Collections App for Textile & Garment Wholesalers on Tally",
        "category": "Collections",
        "tagline": "Seasonal credit, part-payments, shade disputes. Matched bill by bill.",
    },
    {
        "slug": "receivables-app-for-agri-input-distributors",
        "title": "Receivables App for Agri-Input Distributors",
        "category": "Collections",
        "tagline": "Credit tied to harvest, not the calendar. Built for crop cycles.",
    },
    {
        "slug": "tally-collection-app-for-paint-distributors",
        "title": "Tally Collection App for Paint Distributors",
        "category": "Collections",
        "tagline": "Schemes, painters, contractor tails. Collected back into Tally.",
    },
    {
        "slug": "zero-mdr-upi-for-dairy-distributors",
        "title": "Zero MDR UPI for Dairy & Food Product Distributors",
        "category": "Collections",
        "tagline": "Huge volume, razor margins. Every rupee of MDR compounds.",
    },
    {
        "slug": "how-to-send-payment-reminder-from-tally-whatsapp",
        "title": "How to Send a Payment Reminder From Tally on WhatsApp",
        "category": "How-To",
        "tagline": "The manual route, and the faster way to nudge a party to pay.",
    },
    {
        "slug": "how-to-check-party-outstanding-tally-mobile",
        "title": "How to Check a Party's Outstanding Balance in Tally on Mobile",
        "category": "How-To",
        "tagline": "Find what a retailer owes you, from your phone.",
    },
    {
        "slug": "how-to-share-ledger-statement-whatsapp-tally",
        "title": "How to Share a Ledger Statement on WhatsApp From Tally",
        "category": "How-To",
        "tagline": "Send a party their full account in three taps, not ten.",
    },
    {
        "slug": "how-to-reconcile-bank-statement-tally-mobile",
        "title": "How to Reconcile a Bank Statement With Tally on Mobile",
        "category": "How-To",
        "tagline": "The Banking BRS flow, and how to shrink the nightly job.",
    },
    {
        "slug": "how-to-split-upi-payment-across-tally-invoices",
        "title": "How to Split One UPI Payment Across Multiple Tally Invoices",
        "category": "How-To",
        "tagline": "Allocate one lump receipt across the bills it actually pays.",
    },
    {
        "slug": "bakaya-kaise-vasool-kare-distributor",
        "title": "Bakaya Kaise Vasool Kare: Distributor Collection Guide",
        "category": "Collections",
        "tagline": "Retailer se baaki paisa kaise nikalein, bina rishta bigaade.",
    },
    {
        "slug": "tally-mobile-par-kaise-chalaye",
        "title": "Tally Mobile Par Kaise Chalaye: Step-by-Step",
        "category": "Tally Mobile",
        "tagline": "Phone pe Tally ka data kaise laayein, step by step.",
    },
    {
        "slug": "distributor-credit-policy-template",
        "title": "Distributor Credit Policy: Terms, Limits, Penalty Template",
        "category": "Collections",
        "tagline": "A copy-ready policy: credit terms, limits, late fee, stop-supply.",
    },
    {
        "slug": "cash-conversion-cycle-for-distributors",
        "title": "Cash Conversion Cycle for Distributors: How to Shorten It",
        "category": "Collections",
        "tagline": "DIO plus DSO minus DPO. The lever that frees real cash.",
    },
    {
        "slug": "is-it-safe-to-connect-app-to-tally",
        "title": "Is It Safe to Connect a Third-Party App to Tally?",
        "category": "Market Reality",
        "tagline": "What to check before any app touches your Tally data.",
    },
    # ── Backfill: the July 2026 batch shipped without header images, so 40 ──
    # posts carried a broken hero and a 404 og:image for two weeks. Card
    # titles are deliberately shorter than the posts' SEO frontmatter titles,
    # since anything past two lines drops to a smaller face.
    {
        "slug": "accounts-payable-in-tally-for-distributors",
        "title": "Accounts Payable in Tally",
        "category": "Payables",
        "tagline": "What you owe your suppliers this week, on the phone you already check.",
    },
    {
        "slug": "accounts-payable-vs-receivable-distributor",
        "title": "Accounts Payable vs Accounts Receivable",
        "category": "Payables",
        "tagline": "Two ledgers, opposite directions. Confuse them and cash goes missing.",
    },
    {
        "slug": "sundry-creditors-tally-mobile",
        "title": "Sundry Creditors in Tally on Mobile",
        "category": "Payables",
        "tagline": "Which supplier gets paid this Thursday, on your phone.",
    },
    {
        "slug": "sundry-debtors-tally-mobile",
        "title": "Sundry Debtors in Tally on Mobile",
        "category": "Collections",
        "tagline": "At 9 PM, the list of who still owes you, on the phone in your hand.",
    },
    {
        "slug": "bills-payable-in-tally-explained",
        "title": "Bills Payable in Tally, Explained",
        "category": "Payables",
        "tagline": "Which supplier bill falls due on the 3rd, and which on the 30th.",
    },
    {
        "slug": "bills-receivable-in-tally-explained",
        "title": "Bills Receivable in Tally",
        "category": "Collections",
        "tagline": "He says he paid last week. Which bill, though.",
    },
    {
        "slug": "accounts-payable-ageing-report-tally",
        "title": "Accounts Payable Ageing Report (Tally)",
        "category": "Payables",
        "tagline": "The supplier schedule hiding inside one lump creditor balance.",
    },
    {
        "slug": "receivables-ageing-on-mobile-tally",
        "title": "Receivables Ageing on Mobile",
        "category": "Collections",
        "tagline": "The quiet retailer who slid from 45 days to 92 unnoticed.",
    },
    {
        "slug": "reduce-receivable-days-distributor",
        "title": "Cut Receivable Days Without Losing the Retailer",
        "category": "Collections",
        "tagline": "Collect faster while the retailer still wants your stock.",
    },
    {
        "slug": "bill-wise-payables-tracking-tally",
        "title": "Bill-Wise Payables Tracking in Tally",
        "category": "Payables",
        "tagline": "Bill-wise is on for sales and off for purchases. That is the blur.",
    },
    {
        "slug": "receivables-management-for-distributors",
        "title": "Receivables Management: The Mobile Playbook",
        "category": "Collections",
        "tagline": "The whole playbook for running the book from a phone.",
    },
    {
        "slug": "accounts-receivable-turnover-ratio-distributor",
        "title": "Accounts Receivable Turnover Ratio",
        "category": "Collections",
        "tagline": "Same outstanding, very different business. The ratio tells them apart.",
    },
    {
        "slug": "clean-up-old-receivables-tally",
        "title": "Clean Up Old Receivables in Your Tally",
        "category": "Collections",
        "tagline": "Two-year-old bills nobody believes. How to clear them properly.",
    },
    {
        "slug": "payment-due-date-tracking-tally",
        "title": "Payment Due-Date Tracking in Tally",
        "category": "Payables",
        "tagline": "The bill that slips is never the one you remember.",
    },
    {
        "slug": "tally-on-autopilot-for-distributors",
        "title": "Tally on Autopilot",
        "category": "Autopilot",
        "tagline": "Forty opens a day, most of them typing. What runs itself.",
    },
    {
        "slug": "tally-collections-on-autopilot",
        "title": "Put Your Tally Collections on Autopilot",
        "category": "Autopilot",
        "tagline": "Chasing that runs whether anyone remembers to or not.",
    },
    {
        "slug": "auto-invoice-dispatch-tally",
        "title": "Auto Invoice Dispatch from Tally",
        "category": "Autopilot",
        "tagline": "The invoice sends itself the moment it is saved in Tally.",
    },
    {
        "slug": "import-purchase-from-pdf-tally",
        "title": "Supplier PDFs into Tally Purchase Entries",
        "category": "Autopilot",
        "tagline": "The supplier PDF stack becomes a review queue, not a typing queue.",
    },
    {
        "slug": "hands-free-reconciliation-tally",
        "title": "Hands-Free Reconciliation in Tally",
        "category": "Autopilot",
        "tagline": "The accountant's last hour of the day, given back.",
    },
    {
        "slug": "scheduled-payment-reminders-tally",
        "title": "Scheduled Payment Reminders",
        "category": "Autopilot",
        "tagline": "The chase diary moves out of your head and onto a clock.",
    },
    {
        "slug": "tally-autopilot-vs-manual-entry",
        "title": "Tally on Autopilot vs Typing Every Voucher",
        "category": "Autopilot",
        "tagline": "Ten minutes here and there, added up into arithmetic.",
    },
    {
        "slug": "what-takkada-automates-in-tally",
        "title": "What Takkada Can and Can't Automate",
        "category": "Autopilot",
        "tagline": "What runs on its own, and what you are still on the hook for.",
    },
    {
        "slug": "daily-sales-report-tally-mobile",
        "title": "Daily Sales Report from Tally",
        "category": "Reports",
        "tagline": "How much did we sell today, known before you reach home.",
    },
    {
        "slug": "outstanding-receivables-report-tally",
        "title": "Outstanding Receivables Report",
        "category": "Reports",
        "tagline": "How much is stuck in the market, party by party, with ageing.",
    },
    {
        "slug": "party-wise-sales-report-tally",
        "title": "Party-Wise Sales Report in Tally",
        "category": "Reports",
        "tagline": "Which retailers carry your business, ranked instead of guessed.",
    },
    {
        "slug": "item-wise-sales-report-tally",
        "title": "Item-Wise Sales Report from Tally",
        "category": "Reports",
        "tagline": "What moves, in quantity and value, checked from the godown floor.",
    },
    {
        "slug": "salesman-wise-sales-report-tally",
        "title": "Salesman-Wise Sales Report",
        "category": "Reports",
        "tagline": "Four salesmen, four routes, and numbers instead of gut feel.",
    },
    {
        "slug": "purchase-report-tally-mobile",
        "title": "Purchase Report from Tally",
        "category": "Reports",
        "tagline": "What came in, from whom, at what cost. Before the next order.",
    },
    {
        "slug": "stock-summary-report-tally-mobile",
        "title": "Stock Summary Report from Tally",
        "category": "Reports",
        "tagline": "Is it in stock, answered at the counter, not after a call.",
    },
    {
        "slug": "cash-bank-report-tally-mobile",
        "title": "Cash and Bank Position from Tally",
        "category": "Reports",
        "tagline": "How much is actually in the bank, before you commit the cheque.",
    },
    {
        "slug": "profit-report-for-distributors-tally",
        "title": "Profitability Report for Distributors",
        "category": "Reports",
        "tagline": "Three crore a month and no idea where the margin went.",
    },
    {
        "slug": "mis-reports-for-distributors-tally",
        "title": "MIS Reports for Distributors",
        "category": "Reports",
        "tagline": "The short fixed list an owner reads daily. No dashboard required.",
    },
    {
        "slug": "tally-data-on-your-own-server",
        "title": "Can My Tally Data Stay on My Own Server?",
        "category": "Trust",
        "tagline": "Your books already sit on your machine. Where the app layer can follow.",
    },
    {
        "slug": "is-takkada-customisable",
        "title": "Can Takkada Be Customised for My Business?",
        "category": "Trust",
        "tagline": "Does it bend to how you work, or do you bend to it.",
    },
    {
        "slug": "where-is-my-tally-data-stored-takkada",
        "title": "Where Is My Tally Data Stored?",
        "category": "Trust",
        "tagline": "Where the data sits, and who can actually look at it.",
    },
    {
        "slug": "does-takkada-change-my-tally",
        "title": "Does Takkada Change or Touch My Tally Data?",
        "category": "Trust",
        "tagline": "Whether anything reaches into your ledgers. Answered plainly.",
    },
    {
        "slug": "creditors-vs-debtors-tally",
        "title": "Creditors vs Debtors in Tally",
        "category": "Tally Mobile",
        "tagline": "One word confused, one ledger dirtied. The cheat sheet.",
    },
    {
        "slug": "purchase-bill-tracking-tally",
        "title": "Purchase Bills in Tally, and How to Track Them",
        "category": "How-To",
        "tagline": "Twelve deliveries a week. Miss one reference and the statement never ties.",
    },
    {
        "slug": "advance-received-vs-bill-adjustment-tally",
        "title": "Advance Received vs Bill Adjustment",
        "category": "How-To",
        "tagline": "Credit and outstanding on the same party, at the same time.",
    },
    {
        "slug": "ledger-reconciliation-tally-distributor",
        "title": "Ledger Reconciliation in Tally",
        "category": "How-To",
        "tagline": "Find the one entry behind the gap, instead of arguing about totals.",
    },
    {
        "slug": "sample-post",
        "title": "How Distributors Lose 15 Days of Cash Every Month",
        "category": "Collections",
        "tagline": "The gap between knowing who owes and actually collecting it.",
    },
    # ── August 2026 feature round: schemes, e-way bill, field sales, ──────
    # customer-facing links, and WhatsApp own-number.
    {
        "slug": "dealer-scheme-management-tally",
        "title": "Dealer Scheme Management in Tally",
        "category": "Schemes",
        "tagline": "Tally holds every invoice and none of the scheme logic.",
    },
    {
        "slug": "season-scheme-settlement-agri-input",
        "title": "Season Scheme Calculation for Dealers",
        "category": "Schemes",
        "tagline": "Promised in April, defended in October. How to keep it arguable-with.",
    },
    {
        "slug": "scheme-credit-note-gst-distributors",
        "title": "Scheme Credit Note GST Treatment",
        "category": "Schemes",
        "tagline": "When a payout reduces tax, and when it only moves money.",
    },
    {
        "slug": "crop-protection-dealer-scheme-software",
        "title": "Agri Input Dealer Scheme Software",
        "category": "Schemes",
        "tagline": "A year of turnover moves in two windows. The settlement comes later.",
    },
    {
        "slug": "quantity-discount-vs-cash-discount-gst",
        "title": "Quantity Discount vs Cash Discount",
        "category": "Schemes",
        "tagline": "One rewards how much he lifted. The other rewards when he paid.",
    },
    {
        "slug": "e-way-bill-closure-rule-2026",
        "title": "E-Way Bill Closure: Paused, Not Cancelled",
        "category": "Compliance",
        "tagline": "Nothing changed on 1 August 2026. Here is the real position.",
    },
    {
        "slug": "e-way-bill-180-day-rule",
        "title": "E-Way Bill 180 Days Rule",
        "category": "Compliance",
        "tagline": "Two portal-level walls, live since January 2025, with no workaround.",
    },
    {
        "slug": "e-way-bill-with-e-invoice-auto-population",
        "title": "E-Way Bill With E-Invoice: What Carries Across",
        "category": "Compliance",
        "tagline": "The IRN fills Part A. Part B is still yours to enter.",
    },
    {
        "slug": "e-way-bill-expiry-extension-penalty",
        "title": "E-Way Bill Expired: The Penalty and the Window",
        "category": "Compliance",
        "tagline": "The truck is on the road and the bill has run out. What the law says.",
    },
    {
        "slug": "restrict-salesman-access-tally",
        "title": "Restrict Salesman Access in Tally",
        "category": "Field Sales",
        "tagline": "Give him his parties without giving him every margin in the book.",
    },
    {
        "slug": "salesman-visit-tracking-photo-proof",
        "title": "Salesman Visit Tracking App",
        "category": "Field Sales",
        "tagline": "What actually proves he went, without following him all day.",
    },
    {
        "slug": "salesman-order-to-tally-without-reentry",
        "title": "Salesman Orders Into Tally, Typed Once",
        "category": "Field Sales",
        "tagline": "The order pad, the WhatsApp photo, and the evening retyping.",
    },
    {
        "slug": "salesman-wise-collection-accountability",
        "title": "Salesman-Wise Collection Report",
        "category": "Field Sales",
        "tagline": "Sales measured to the rupee, collection measured by feel.",
    },
    {
        "slug": "customer-portal-for-distributors-india",
        "title": "Customer Portal for Distributors in India",
        "category": "Collections",
        "tagline": "Four things you actually want. Only some of them need a portal.",
    },
    {
        "slug": "customers-see-outstanding-online",
        "title": "Can My Customers See Their Outstanding Online?",
        "category": "Collections",
        "tagline": "Yes, through a link. No account, only their own bills.",
    },
    {
        "slug": "vendor-portal-pending-invoices",
        "title": "Vendor Portal Pending Invoices",
        "category": "Payables",
        "tagline": "Why the principal's portal disagrees with your Tally, and how to fix it.",
    },
    {
        "slug": "online-balance-confirmation-ledger",
        "title": "Ledger Balance Confirmation Online",
        "category": "Collections",
        "tagline": "Do it quarterly. At year end the disagreements are already a year old.",
    },
    {
        "slug": "let-buyers-choose-invoices-to-pay",
        "title": "Let Buyers Choose Which Invoices to Pay",
        "category": "Collections",
        "tagline": "One lakh against nine bills. Who decides which ones it closed.",
    },
    {
        "slug": "which-invoice-did-customer-pay-upi",
        "title": "Which Invoice Did That UPI Payment Settle?",
        "category": "Collections",
        "tagline": "A UTR, a VPA, and no idea which bill just got paid.",
    },
    {
        "slug": "send-reminders-from-your-own-whatsapp-number",
        "title": "Reminders From Your Own WhatsApp Number",
        "category": "Collections",
        "tagline": "The number he has saved for eleven years gets opened. Early access.",
    },
    {
        "slug": "whatsapp-business-api-own-number-vs-third-party",
        "title": "WhatsApp API: Your Number or Theirs",
        "category": "Collections",
        "tagline": "Three tiers, one real trade-off, and who owns the number if you leave.",
    },
    {
        "slug": "manage-multiple-branches-tally-godowns",
        "title": "Manage Multiple Branches in Tally",
        "category": "How-To",
        "tagline": "One company file, three locations, every movement carrying its place.",
    },
    {
        "slug": "what-is-godown-in-tally",
        "title": "What is a Godown in Tally?",
        "category": "How-To",
        "tagline": "A godown answers where. A stock group answers what. Two questions.",
    },
    {
        "slug": "godown-wise-stock-report-tally-mobile",
        "title": "Godown-Wise Stock Report on Mobile",
        "category": "Reports",
        "tagline": "What is lying at the branch, today or as of any past date.",
    },
    {
        "slug": "stock-transfer-between-godowns-tally-mobile",
        "title": "Stock Transfer Between Godowns",
        "category": "How-To",
        "tagline": "The quantity is known once, at the loading dock. Record it there.",
    },
    {
        "slug": "restrict-staff-warehouse-access-tally",
        "title": "Restrict Staff to Their Own Warehouse",
        "category": "Tally Mobile",
        "tagline": "A storekeeper who moves his own stock, and nobody else's.",
    },
    {
        "slug": "multi-location-inventory-app-tally-distributors",
        "title": "Multi-Location Inventory App for Tally",
        "category": "Market Reality",
        "tagline": "Eight questions to ask before the second branch tests your choice.",
    },
    {
        "slug": "create-godown-in-tally-from-mobile",
        "title": "Create Godowns in Tally from Your Phone",
        "category": "How-To",
        "tagline": "The branch opens Monday. The master should exist Monday.",
    },
    {
        "slug": "godown-on-sales-invoice-delivery-challan",
        "title": "Godown on Invoices and Challans",
        "category": "Tally Mobile",
        "tagline": "Sales move the most stock out. Stamp the location there first.",
    },
    {
        "slug": "branch-stock-visibility-for-distributors",
        "title": "Branch Stock Visibility for Distributors",
        "category": "Market Reality",
        "tagline": "At 9 PM the question arrives where the desktop is not.",
    },
    {
        "slug": "godown-ka-stock-mobile-se-kaise-dekhe",
        "title": "Godown ka Stock Mobile se Kaise Dekhe",
        "category": "How-To",
        "tagline": "Counter par khade hue jawab, branch ko call kiye bina.",
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
