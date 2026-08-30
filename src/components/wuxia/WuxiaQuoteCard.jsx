import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Download, RefreshCw, Share2 } from 'lucide-react';
import { MOOD_CATEGORIES } from '../../data/wuxiaQuotesDataset';

export default function WuxiaQuoteCard({ quote, onNextQuote }) {
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!quote) return null;

  const currentCategory = MOOD_CATEGORIES.find(c => c.id === quote.path) || MOOD_CATEGORIES[0];

  const formatSourceText = (sourceObj, type) => {
    if (type === 'novel' && sourceObj?.title) {
      return `Novel: ${sourceObj.title}${sourceObj.translator ? ` (${sourceObj.translator})` : ''}`;
    }
    if (type === 'classical' && sourceObj?.text) {
      return `Classical Text: ${sourceObj.text}${sourceObj.author ? ` (${sourceObj.author})` : ''}`;
    }
    if (type === 'idiom') {
      return sourceObj?.text || 'Traditional Chinese Idiom';
    }
    return sourceObj?.text || 'Unattributed Saying';
  };

  const formattedSource = formatSourceText(quote.source, quote.sourceType);

  const handleCopyQuote = () => {
    const textToCopy = `${quote.cn} (${quote.pinyin})\n"${quote.en}"\n\nMeaning: ${quote.sense}\nSource: ${formattedSource}\n\nThe Jianghu Oracle • Chinese Novel Quotes`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
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
    canvas.height = 980;
    const ctx = canvas.getContext('2d');

    // Rice Paper Background (#F3EBDD)
    ctx.fillStyle = '#F3EBDD';
    ctx.fillRect(0, 0, 800, 980);

    // Old Paper Inner Panel (#E5D7BE)
    ctx.fillStyle = '#E5D7BE';
    ctx.fillRect(40, 40, 720, 900);

    // Border
    ctx.strokeStyle = '#34312D';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 720, 900);

    // Corner Brackets
    ctx.strokeStyle = '#9E2A2B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(60, 80); ctx.lineTo(60, 60); ctx.lineTo(80, 60);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(740, 900); ctx.lineTo(740, 920); ctx.lineTo(720, 920);
    ctx.stroke();

    // Cinnabar Seal Badge (#9E2A2B)
    ctx.fillStyle = '#9E2A2B';
    ctx.fillRect(680, 70, 48, 48);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 26px "Noto Serif SC", serif';
    ctx.fillText(quote.seal || currentCategory.seal, 690, 104);

    // Category Label
    ctx.fillStyle = '#486B61';
    ctx.font = 'bold 20px Inter, sans-serif';
    ctx.fillText(currentCategory.label.toUpperCase(), 70, 95);

    // Chinese Text (cn)
    ctx.fillStyle = '#171717';
    ctx.font = 'bold 44px "Noto Serif SC", serif';
    ctx.fillText(quote.cn, 70, 170);

    // Pinyin
    ctx.fillStyle = '#486B61';
    ctx.font = 'italic 22px Inter, sans-serif';
    ctx.fillText(quote.pinyin, 70, 210);

    // English Rendering (wrapped)
    ctx.fillStyle = '#171717';
    ctx.font = '600 28px "Noto Serif SC", serif';

    const words = quote.en.split(' ');
    let line = '';
    let y = 280;
    words.forEach(w => {
      const testLine = line + w + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > 640 && line !== '') {
        ctx.fillText(line, 70, y);
        line = w + ' ';
        y += 42;
      } else {
        line = testLine;
      }
    });
    ctx.fillText(line, 70, y);

    // Sense / Meaning
    if (quote.sense) {
      ctx.fillStyle = '#34312D';
      ctx.font = 'italic 22px Inter, sans-serif';
      ctx.fillText(`"${quote.sense}"`, 70, y + 70);
    }

    // Source Citation
    ctx.fillStyle = '#9E2A2B';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(`— ${formattedSource}`, 70, y + 130);

    // Branding Footer
    ctx.fillStyle = '#9E2A2B';
    ctx.font = 'bold 20px "Noto Serif SC", serif';
    ctx.textAlign = 'center';
    ctx.fillText('THE JIANGHU ORACLE • CHINESE NOVEL QUOTES', 400, 900);

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
              {quote.seal || currentCategory.seal}
            </div>
          </div>

          {/* Standalone Chinese Characters */}
          <h2 className="quote-chinese-title">{quote.cn}</h2>
          
          {/* Pinyin */}
          <div style={{ fontFamily: 'Inter, sans-serif', fontStyle: 'italic', color: '#486B61', fontSize: '1rem', marginBottom: '20px' }}>
            {quote.pinyin}
          </div>

          {/* Main English Translation */}
          <p className="quote-body-text">
            "{quote.en}"
          </p>

          {/* Sense / Context */}
          {quote.sense && (
            <div className="quote-meaning-box">
              <span>{quote.sense}</span>
            </div>
          )}

          {/* Source Citation Badge */}
          <div className="quote-source">
            <span>— {formattedSource}</span>
          </div>

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
