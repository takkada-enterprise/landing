import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { MOOD_CATEGORIES } from '../../data/wuxiaQuotesDataset';

export default function AddQuoteModal({ isOpen, onClose, onAddQuote }) {
  const [quoteText, setQuoteText] = useState('');
  const [source, setSource] = useState('');
  const [meaning, setMeaning] = useState('');
  const [category, setCategory] = useState('philosophy');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quoteText.trim()) return;

    onAddQuote({
      quote: quoteText.trim(),
      source: source.trim() || 'Jianghu Saying',
      meaning: meaning.trim() || 'User submitted quote',
      category
    });

    setQuoteText('');
    setSource('');
    setMeaning('');
    onClose();
  };

  return (
    <div className="wuxia-modal-backdrop" onClick={onClose}>
      <div className="wuxia-modal-card" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: '"Noto Serif SC", serif', fontSize: '1.25rem', fontWeight: 900, color: '#171717' }}>
            Add a Jianghu Saying
          </h3>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#34312D', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Saying / Quote Text *</label>
            <textarea
              className="form-control"
              rows={3}
              placeholder="e.g. If Gods block my path, I shall slay the Gods!"
              value={quoteText}
              onChange={e => setQuoteText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Novel Title / Source</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Renegade Immortal by Er Gen"
              value={source}
              onChange={e => setSource(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mood Theme</label>
            <select
              className="form-control"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {MOOD_CATEGORIES.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Meaning / Context (Optional)</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Unstoppable resolve against destiny"
              value={meaning}
              onChange={e => setMeaning(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button type="button" className="btn-draw-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-draw-primary">
              <Sparkles size={16} />
              <span>Add Saying</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
