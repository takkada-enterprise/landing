#!/bin/bash
# Takkada Blog Publisher
# Run from the landing/ directory:
#   bash scripts/publish-blogs.sh
set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_DIR"

echo "📁 Working in: $REPO_DIR"
echo ""

# ── 1. Generate blog images ──────────────────────────────────────────────────
echo "🖼  Generating blog header images..."
if ! python3 -c "from PIL import Image" 2>/dev/null; then
  echo "   Installing Pillow..."
  pip install Pillow --quiet --break-system-packages 2>/dev/null || pip3 install Pillow --quiet
fi
python3 scripts/generate-blog-images.py
echo ""

# ── 2. Verify new blog files exist ──────────────────────────────────────────
echo "📄 New blog files:"
for slug in days-sales-outstanding-distributor-india salesman-app-tally-india tally-whatsapp-invoice-dispatch; do
  md="content/blog/${slug}.md"
  img="public/assets/blog/${slug}.png"
  md_status=$( [ -f "$md" ]  && echo "✓" || echo "✗ MISSING" )
  img_status=$( [ -f "$img" ] && echo "✓" || echo "✗ MISSING" )
  echo "   $slug"
  echo "     Article: $md_status  |  Image: $img_status"
done
echo ""

# ── 3. Git status ────────────────────────────────────────────────────────────
echo "🔍 Git status:"
git status --short
echo ""

# ── 4. Stage, commit, push ──────────────────────────────────────────────────
echo "📦 Staging new blog files..."
git add content/blog/days-sales-outstanding-distributor-india.md
git add content/blog/salesman-app-tally-india.md
git add content/blog/tally-whatsapp-invoice-dispatch.md
git add public/assets/blog/days-sales-outstanding-distributor-india.png
git add public/assets/blog/salesman-app-tally-india.png
git add public/assets/blog/tally-whatsapp-invoice-dispatch.png
git add scripts/generate-blog-images.py
git add scripts/publish-blogs.sh

COMMIT_MSG="feat(blog): add 3 AEO-optimised articles (DSO, salesman app, WhatsApp dispatch)

- days-sales-outstanding-distributor-india
- salesman-app-tally-india
- tally-whatsapp-invoice-dispatch

All three target AI citation (AEO) and high-intent search.
Images generated via brand-colour Python script."

echo "💬 Committing..."
git commit -m "$COMMIT_MSG"

echo "🚀 Pushing to origin..."
git push origin HEAD

echo ""
echo "✅ Done! GitHub Actions will build and deploy to takkada.com."
