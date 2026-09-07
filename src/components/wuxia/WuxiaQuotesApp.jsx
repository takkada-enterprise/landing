import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MOOD_CATEGORIES, getAllQuotes } from '../../data/wuxiaQuotesDataset';
import WuxiaQuoteCard from './WuxiaQuoteCard';

const MOOD_WALLPAPERS = {
  all: '/assets/Wuxia/1932181.jpg',
  fate: '/assets/Wuxia/1932181.jpg',
  dao: '/assets/Wuxia/1932246.jpg',
  sword: '/assets/Wuxia/wp2999269.png',
  rebel: '/assets/Wuxia/1932198.jpg',
  persevere: '/assets/Wuxia/1932200.jpg',
};

const WALLPAPER_PRESETS = [
  { id: 'auto', name: '✨ Mood Auto', url: null },
  { id: '1932181', name: '🍁 Autumn Lake', url: '/assets/Wuxia/1932181.jpg' },
  { id: '1932200', name: '🌅 Golden Temple', url: '/assets/Wuxia/1932200.jpg' },
  { id: '1932246', name: '🏯 Great Monastery', url: '/assets/Wuxia/1932246.jpg' },
  { id: '1932198', name: '🌉 Mountain Bridge', url: '/assets/Wuxia/1932198.jpg' },
  { id: 'wp2999269', name: '⚔️ Wuxia Warrior', url: '/assets/Wuxia/wp2999269.png' },
];

export default function WuxiaQuotesApp() {
  const [quotes, setQuotes] = useState(getAllQuotes());
  const [activeMood, setActiveMood] = useState('all');
  const [currentQuote, setCurrentQuote] = useState(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState('auto');

  // Determine active background image
  const activeBgImage = selectedWallpaper === 'auto'
    ? (MOOD_WALLPAPERS[activeMood] || MOOD_WALLPAPERS.all)
    : (WALLPAPER_PRESETS.find(w => w.id === selectedWallpaper)?.url || MOOD_WALLPAPERS.all);

  // Check URL hash for shared quote (#q=f1)
  useEffect(() => {
    const all = getAllQuotes();
    setQuotes(all);

    if (typeof window !== 'undefined' && window.location.hash.includes('q=')) {
      const qId = window.location.hash.replace(/^#q=/, '');
      const found = all.find(q => q.id === qId);
      if (found) {
        setCurrentQuote(found);
        setActiveMood(found.path || 'all');
        return;
      }
    }
    // Default to first random quote
    pickRandomQuote('all', all);
  }, []);

  const pickRandomQuote = (moodPath, quoteList = quotes) => {
    const filtered = moodPath === 'all'
      ? quoteList
      : quoteList.filter(q => q.path === moodPath);

    if (filtered.length === 0) {
      setCurrentQuote(quoteList[0]);
      return;
    }

    let randomIndex = Math.floor(Math.random() * filtered.length);
    if (currentQuote && filtered.length > 1 && filtered[randomIndex].id === currentQuote.id) {
      randomIndex = (randomIndex + 1) % filtered.length;
    }

    setCurrentQuote(filtered[randomIndex]);
  };

  const handleMoodSelect = (pathId) => {
    setActiveMood(pathId);
    pickRandomQuote(pathId);
  };

  return (
    <div className="wuxia-app-container">
      {/* Wuxia Atmospheric Background Artwork */}
      <div
        className="wuxia-bg-backdrop"
        style={{ backgroundImage: `url(${activeBgImage})` }}
      >
        <div className="wuxia-bg-overlay" />
      </div>

      {/* Side Vertical Chinese Calligraphy Text Accent */}
      <div className="vertical-chinese-sidebar">
        江湖万里风云
      </div>

      {/* Navbar */}
      <header className="wuxia-navbar" style={{ position: 'relative', zIndex: 50 }}>
        <div className="wuxia-logo">
          <div className="cinnabar-seal">江湖</div>
          <span>THE JIANGHU ORACLE</span>
        </div>
        {/* Wallpaper Switcher */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--jade)', letterSpacing: '0.5px' }}>SCENERY:</span>
          {WALLPAPER_PRESETS.map((wp) => (
            <button
              key={wp.id}
              onClick={() => setSelectedWallpaper(wp.id)}
              style={{
                background: selectedWallpaper === wp.id ? 'var(--ink)' : 'rgba(229, 215, 190, 0.7)',
                color: selectedWallpaper === wp.id ? '#FFF' : 'var(--charcoal)',
                border: '1px solid var(--manuscript-border)',
                borderRadius: '3px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {wp.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <section className="wuxia-hero">
          <motion.div
            className="wuxia-hero-tag"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span>ANCIENT SAYINGS & IDIOMS</span>
          </motion.div>

          <motion.h1
            className="wuxia-title"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            What does the Jianghu have to say today?
          </motion.h1>

          <motion.p
            className="wuxia-subtitle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Draw an ancient martial arts saying, cultivator insight, or proverb based on your current state of mind.
          </motion.p>
        </section>

        {/* Mood Selection Chips (6 Core Seals) */}
        <section className="wuxia-mood-wrap">
          <div className="wuxia-mood-grid">
            <button
              className={`mood-chip ${activeMood === 'all' ? 'active' : ''}`}
              onClick={() => handleMoodSelect('all')}
            >
              <span>☯️ All Sayings</span>
            </button>
            {MOOD_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`mood-chip ${activeMood === cat.id ? 'active' : ''}`}
                onClick={() => handleMoodSelect(cat.id)}
              >
                <span style={{ fontFamily: '"Noto Serif SC", serif', fontWeight: 900, color: '#9E2A2B' }}>{cat.seal}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Active Manuscript Card */}
        {currentQuote && (
          <WuxiaQuoteCard
            quote={currentQuote}
            onNextQuote={() => pickRandomQuote(activeMood)}
          />
        )}
      </main>
    </div>
  );
}

