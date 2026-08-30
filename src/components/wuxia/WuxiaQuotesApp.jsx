import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MOOD_CATEGORIES, getAllQuotes } from '../../data/wuxiaQuotesDataset';
import WuxiaQuoteCard from './WuxiaQuoteCard';

export default function WuxiaQuotesApp() {
  const [quotes, setQuotes] = useState(getAllQuotes());
  const [activeMood, setActiveMood] = useState('all');
  const [currentQuote, setCurrentQuote] = useState(null);

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
      {/* Side Vertical Chinese Calligraphy Text Accent */}
      <div className="vertical-chinese-sidebar">
        江湖万里风云
      </div>

      {/* Navbar */}
      <header className="wuxia-navbar">
        <div className="wuxia-logo">
          <div className="cinnabar-seal">江湖</div>
          <span>THE JIANGHU ORACLE</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
