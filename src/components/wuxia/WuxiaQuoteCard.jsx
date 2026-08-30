import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download, RefreshCw, Share2, BookOpen } from 'lucide-react';
import { MOOD_CATEGORIES } from '../../data/wuxiaQuotesDataset';

export default function WuxiaQuoteCard({ quote, onNextQuote }) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!quote) return null;

  const currentCategory = MOOD_CATEGORIES.find(c => c.id === quote.category) || MOOD_CATEGORIES[0];

  const handleCopyQuote = () => {
    const formatted = `"${quote.quote}"\n— ${quote.source} (${currentCategory.label})\n\nThe Jianghu Oracle • Chinese Novel Quotes`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCopyLink = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#q=${quote.id}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const handleDownloadCard = () => {
    setDownloading(true);
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 960;
    const ctx = canvas.getContext('2d');

    // Rice Paper Background (#F3EBDD)
    ctx.fillStyle = '#F3EBDD';
    ctx.fillRect(0, 0, 800, 960);

    // Old Paper Inner Panel (#E5D7BE)
    ctx.fillStyle = '#E5D7BE';
    ctx.fillRect(40, 40, 720, 880);

    // Thin Border
    ctx.strokeStyle = '#34312D';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 880);

    // Corner Bracket Accents
    ctx.strokeStyle = '#9E2A2B';
    ctx.lineWidth = 4;
    // Top Left Corner
    ctx.beginPath();
    ctx.moveTo(60, 80); ctx.lineTo(60, 60); ctx.lineTo(80, 60);
    ctx.stroke();
    // Bottom Right Corner
    ctx.beginPath();
    ctx.moveTo(740, 880); ctx.lineTo(740, 900); ctx.lineTo(720, 900);
    ctx.stroke();

    // Cinnabar Seal Badge Stamp (#9E2A2B)
    ctx.fillStyle = '#9E2A2B';
    ctx.fillRect(680, 70, 48, 48);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Noto Serif SC", serif';
    ctx.fillText(currentCategory.seal || '道', 690, 104);

    // Category Label
    ctx.fillStyle = '#486B61';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText(currentCategory.label.toUpperCase(), 70, 95);

    // Title
    ctx.fillStyle = '#171717';
    ctx.font = 'bold 42px "Noto Serif SC", serif';
    ctx.fillText(quote.title, 70, 170);

    // Quote Body (wrapped text)
    ctx.fillStyle = '#171717';
    ctx.font = '600 30px "Noto Serif SC", serif';

    const words = quote.quote.split(' ');
    let line = '';
    let y = 260;
    words.forEach(w => {
      const testLine = line + w + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 640 && line !== '') {
        ctx.fillText(line, 70, y);
        line = w + ' ';
        y += 46;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 70, y);

    // Source Citation
    ctx.fillStyle = '#486B61';
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.fillText(`— ${quote.source}`, 70, y + 80);

    // Meaning / Context
    if (quote.meaning) {
      ctx.fillStyle = '#34312D';
      ctx.font = 'italic 22px Inter, sans-serif';
      ctx.fillText(`"${quote.meaning}"`, 70, y + 130);
    }

    // Branding Footer
    ctx.fillStyle = '#9E2A2B';
    ctx.font = 'bold 20px "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE JIANGHU ORACLE • CHINESE NOVEL QUOTES', 400, 880);

    // Export image
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `jianghu-oracle-${quote.id}.png`;
    a.click();
    setDownloading(false);
  };

  return (
    <div className="wuxia-manuscript-wrap">
      <AnimatePresence mode="wait">
        <motion.div
          key={quote.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="manuscript-card"
        >
          {/* Top Meta Bar */}
          <div className="card-top-meta">
            <span className="card-category-label">{currentCategory.label}</span>
            <div className="cinnabar-seal">
              {currentCategory.seal || '道'}
            </div>
          </div>

          {/* Title */}
          <h2 className="quote-chinese-title">{quote.title}</h2>
          <div className="quote-english-title">{quote.source}</div>

          {/* Main Quote Text */}
          <p className="quote-body-text">
            "{quote.quote}"
          </p>

          {/* Meaning / Insight */}
          {quote.meaning && (
            <div className="quote-meaning-box">
              <span>{quote.meaning}</span>
            </div>
          )}

          {/* Action Toolbar */}
          <div className="manuscript-actions">
            <button className="btn-draw-primary" onClick={onNextQuote}>
              <RefreshCw size={16} />
              <span>DRAW AGAIN</span>
            </button>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button className="btn-draw-secondary" onClick={handleCopyQuote}>
                {copied ? <Check size={14} color="#486B61" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy Saying'}</span>
              </button>

              <button className="btn-draw-secondary" onClick={handleCopyLink}>
                {linkCopied ? <Check size={14} color="#486B61" /> : <Share2 size={14} />}
                <span>{linkCopied ? 'Copied' : 'Share Link'}</span>
              </button>

              <button className="btn-draw-secondary" onClick={handleDownloadCard} disabled={downloading}>
                <Download size={14} />
                <span>{downloading ? 'Exporting...' : 'Manuscript Poster'}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
