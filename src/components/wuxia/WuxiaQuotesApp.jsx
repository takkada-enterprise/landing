import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Sparkles } from 'lucide-react';
import { MOOD_CATEGORIES, getAllQuotes, addCustomQuote } from '../../data/wuxiaQuotesDataset';
import WuxiaQuoteCard from './WuxiaQuoteCard';
import AddQuoteModal from './AddQuoteModal';

export default function WuxiaQuotesApp() {
  const [quotes, setQuotes] = useState(getAllQuotes());
  const [activeMood, setActiveMood] = useState('all');
  const [currentQuote, setCurrentQuote] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Check URL hash for shared quote (#q=f1)
  useEffect(() => {
    const all = getAllQuotes();
    setQuotes(all);

    if (typeof window !== 'undefined' && window.location.hash.includes('q=')) {
      const qId = window.location.hash.replace(/^#q=/, '');
      const found = all.find(q => q.id === qId);
      if (found) {
        setCurrentQuote(found);
        setActiveMood(found.category || 'all');
        return;
      }
    }
    // Default to first random quote
    pickRandomQuote('all', all);
  }, []);

  const pickRandomQuote = (moodCategory, quoteList = quotes) => {
    const filtered = moodCategory === 'all'
      ? quoteList
      : quoteList.filter(q => q.category === moodCategory);

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

  const handleMoodSelect = (moodId) => {
    setActiveMood(moodId);
    pickRandomQuote(moodId);
  };

  const handleAddCustomQuote = (newQuoteData) => {
    const created = addCustomQuote(newQuoteData);
    const updated = getAllQuotes();
    setQuotes(updated);
    setCurrentQuote(created);
    setActiveMood(created.category);
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

        <button className="btn-draw-secondary" onClick={() => setModalOpen(true)}>
          <PlusCircle size={16} />
          <span>Add Saying</span>
        </button>
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

        {/* Mood Selection Chips */}
        <section className="wuxia-mood-wrap">
          <div className="wuxia-mood-grid">
            {MOOD_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                className={`mood-chip ${activeMood === cat.id ? 'active' : ''}`}
                onClick={() => handleMoodSelect(cat.id)}
              >
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
      
      {/* Add Custom Saying Modal */}
      <AddQuoteModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onAddQuote={handleAddCustomQuote}
      />
    </div>
  );
}
