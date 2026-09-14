import React, { useState, useEffect, useRef } from 'react';
import { getShuffledQuestions } from '../data/sitcomTriviaQuestions';
import {
  fetchTop3Leaderboard,
  submitLeaderboardScore,
  isEligibleForTop3,
} from '../lib/sitcomTriviaLeaderboard';
import '../sitcom-trivia.css';

const OPTION_PREFIXES = ['A', 'B', 'C', 'D'];

const FEATURED_SITCOMS = [
  'Friends',
  'The Office',
  'Seinfeld',
  'How I Met Your Mother',
  'The Big Bang Theory',
  'Brooklyn Nine-Nine',
  'Modern Family',
  'Parks and Recreation',
  'Community',
  'New Girl',
  "Schitt's Creek",
  'Arrested Development',
  'Two and a Half Men',
  "That '70s Show",
  'Everybody Loves Raymond',
  'The Fresh Prince of Bel-Air',
  'Frasier',
  'Malcolm in the Middle',
  'Scrubs',
  '30 Rock',
];

function FounderNoteCard() {
  return (
    <div className="trivia-founder-section">
      <p className="founder-note">
        This trivia game is a side project built by the founder of{' '}
        <a
          href="https://takkada.com"
          target="_blank"
          rel="noopener noreferrer"
          className="founder-link"
        >
          Takkada.com
        </a>
        , an accounting software layer for Tally helping Indian distributors & wholesalers.
      </p>
      <p className="founder-subnote">
        Are you a founder, startup enthusiast, VC, or investor looking to connect?
      </p>
      <a
        href="https://wa.me/917019152071?text=Hi!%20I%20came%20across%20your%20Sitcom%20Trivia%20side%20project%20and%20would%20love%20to%20connect."
        target="_blank"
        rel="noopener noreferrer"
        className="trivia-whatsapp-btn"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
}

export default function SitcomTriviaRoute() {
  // Game state: 'START' | 'PLAYING' | 'ENDED'
  const [gameState, setGameState] = useState('START');
  const [playerName, setPlayerName] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Timer & Scoring
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  // Visual feedback flash ('correct' | 'wrong' | null)
  const [feedbackFlash, setFeedbackFlash] = useState(null);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState([]);
  const [hasSavedScore, setHasSavedScore] = useState(false);
  const [saveNameInput, setSaveNameInput] = useState('');
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const timerRef = useRef(null);

  // Load initial leaderboard on mount
  useEffect(() => {
    fetchTop3Leaderboard().then(setLeaderboard);
  }, []);

  // Timer countdown logic
  useEffect(() => {
    if (gameState === 'PLAYING') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('ENDED');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState]);

  // Start Game Handler
  const handleStartGame = (e) => {
    if (e) e.preventDefault();
    const shuffled = getShuffledQuestions();
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setTimeLeft(60);
    setFeedbackFlash(null);
    setHasSavedScore(false);
    setSaveNameInput(playerName.trim());
    setGameState('PLAYING');
  };

  // Answer Option Click Handler
  const handleAnswerSelect = (optionIndex) => {
    if (gameState !== 'PLAYING') return;

    const currentQ = questions[currentIndex];
    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      setScore((prev) => prev + 3);
      setCorrectCount((prev) => prev + 1);
      setFeedbackFlash('correct');
    } else {
      setScore((prev) => prev - 1);
      setWrongCount((prev) => prev + 1);
      setFeedbackFlash('wrong');
    }

    // Flash feedback briefly, then clear
    setTimeout(() => {
      setFeedbackFlash(null);
    }, 400);

    // Auto advance to next question
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // If player somehow finishes all 100 questions before 60s, reshuffle and continue
      setQuestions(getShuffledQuestions());
      setCurrentIndex(0);
    }
  };

  // Save Score to Top 3 Leaderboard
  const handleSaveScore = async (e) => {
    if (e) e.preventDefault();
    const nameToSave = (saveNameInput || playerName || 'Anonymous').trim();
    const updatedLeaderboard = await submitLeaderboardScore({
      name: nameToSave,
      score,
    });
    setLeaderboard(updatedLeaderboard);
    setHasSavedScore(true);
  };

  // Share link handler
  const handleShare = () => {
    const shareText = `I scored ${score} points on 60-Second American Sitcom Trivia (${correctCount} Correct, ${wrongCount} Wrong)! Can you beat me?`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://takkada.com/sitcom-trivia/';

    if (navigator.share) {
      navigator
        .share({
          title: '60-Second American Sitcom Trivia',
          text: shareText,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopiedShareLink(true);
      setTimeout(() => setCopiedShareLink(false), 2500);
    }
  };

  const currentQ = questions[currentIndex];
  const eligibleForTop3 = isEligibleForTop3(score, leaderboard);

  return (
    <div className="trivia-page-wrapper">
      <div className="trivia-container">
        {/* Header */}
        <header className="trivia-header">
          <h1 className="trivia-main-title">60-Second American Sitcom Trivia</h1>
          <p className="trivia-hero-copy">
            How well do you know classic American sitcoms? Answer as many questions as you can before the clock reaches zero!
          </p>
          <div className="trivia-scoring-pill">
            <span className="scoring-positive">Correct: +3</span>
            <span style={{ opacity: 0.4 }}>|</span>
            <span className="scoring-negative">Wrong: −1</span>
          </div>
        </header>

        {/* START SCREEN */}
        {gameState === 'START' && (
          <div className="trivia-card trivia-start-card">
            <form onSubmit={handleStartGame}>
              <div className="trivia-input-group">
                <label className="trivia-input-label" htmlFor="trivia-name">
                  Enter your name (optional):
                </label>
                <input
                  id="trivia-name"
                  type="text"
                  className="trivia-name-input"
                  placeholder="e.g. Alex, Rahul, Sarah..."
                  maxLength={25}
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                />
              </div>

              <button type="submit" className="trivia-btn-primary">
                START GAME
              </button>
            </form>

            {/* Global Top 3 Preview on Start Screen */}
            <div className="trivia-leaderboard-section" style={{ marginTop: '2.5rem' }}>
              <div className="leaderboard-header">
                🏆 GLOBAL TOP 3 HIGH SCORES
              </div>
              <div className="podium-list">
                {leaderboard.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`podium-item ${idx === 0 ? 'podium-item-gold' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="podium-rank">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="podium-name">{item.name}</span>
                    </div>
                    <span className="podium-score">{item.score} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Founder Note inside Start Card */}
            <FounderNoteCard />
          </div>
        )}

        {/* PLAYING SCREEN */}
        {gameState === 'PLAYING' && currentQ && (
          <div className="trivia-card">
            {/* Feedback Flash Overlay */}
            {feedbackFlash === 'correct' && (
              <div className="trivia-feedback-flash flash-correct">Correct +3</div>
            )}
            {feedbackFlash === 'wrong' && (
              <div className="trivia-feedback-flash flash-wrong">Wrong −1</div>
            )}

            {/* HUD Header */}
            <div className="trivia-hud">
              <div className="trivia-hud-box">
                <span className="hud-label">TIME LEFT</span>
                <span className={`hud-value hud-timer ${timeLeft <= 10 ? 'hud-timer-critical' : ''}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="trivia-hud-box" style={{ textAlign: 'right' }}>
                <span className="hud-label">SCORE</span>
                <span className="hud-value">{score}</span>
              </div>
            </div>

            {/* Question */}
            <h2 className="trivia-question-title">{currentQ.question}</h2>

            {/* 4 Options (A, B, C, D) */}
            <div className="trivia-options-grid">
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  className="trivia-option-btn"
                  onClick={() => handleAnswerSelect(idx)}
                >
                  <span className="option-prefix">{OPTION_PREFIXES[idx]}</span>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* END SCREEN */}
        {gameState === 'ENDED' && (
          <div className="trivia-card trivia-end-card">
            <h2 className="trivia-times-up-title">TIME'S UP!</h2>
            {playerName && (
              <div className="trivia-player-name-summary">Played by {playerName}</div>
            )}

            {/* Score Summary */}
            <div className="trivia-final-score-box">
              <div className="final-score-number">{score}</div>
              <div className="final-score-label">FINAL SCORE</div>
            </div>

            <div className="trivia-stats-row">
              <div className="stat-item">
                <span className="stat-value scoring-positive">{correctCount}</span>
                <span className="stat-label">Correct (+3)</span>
              </div>
              <div className="stat-item">
                <span className="stat-value scoring-negative">{wrongCount}</span>
                <span className="stat-label">Wrong (-1)</span>
              </div>
            </div>

            {/* Top 3 Qualification Prompt */}
            {eligibleForTop3 && !hasSavedScore && (
              <div className="top3-qualify-banner">
                <div className="qualify-title">🎉 YOU MADE THE TOP 3!</div>
                <p style={{ margin: 0, fontSize: '0.95rem', color: '#fef08a' }}>
                  Save your high score on the global leaderboard:
                </p>
                <form onSubmit={handleSaveScore} className="qualify-save-row">
                  <input
                    type="text"
                    className="trivia-name-input"
                    placeholder="Enter your display name..."
                    value={saveNameInput}
                    onChange={(e) => setSaveNameInput(e.target.value)}
                    maxLength={25}
                    required
                  />
                  <button type="submit" className="qualify-btn">
                    SAVE SCORE
                  </button>
                </form>
              </div>
            )}

            {/* Top 3 Leaderboard Display */}
            <div className="trivia-leaderboard-section">
              <div className="leaderboard-header">🏆 GLOBAL TOP 3 HIGH SCORES</div>
              <div className="podium-list">
                {leaderboard.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className={`podium-item ${idx === 0 ? 'podium-item-gold' : ''}`}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="podium-rank">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                      </span>
                      <span className="podium-name">{item.name}</span>
                    </div>
                    <span className="podium-score">{item.score} pts</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="trivia-actions-group">
              <button onClick={handleStartGame} className="trivia-btn-primary" style={{ width: 'auto' }}>
                PLAY AGAIN
              </button>
              <button onClick={handleShare} className="trivia-btn-secondary">
                {copiedShareLink ? '✓ Link Copied!' : 'Challenge a Friend 🚀'}
              </button>
            </div>

            {/* Founder Note inside End Card */}
            <FounderNoteCard />
          </div>
        )}

        {/* Crawlable SEO Content Section */}
        <section className="trivia-seo-section">
          <h2 className="trivia-seo-title">About 60-Second American Sitcom Trivia</h2>
          <p>
            Welcome to the ultimate rapid-fire <strong>60-Second American Sitcom Trivia Challenge</strong>. Test your knowledge of television history, iconic characters, famous catchphrases, and unscripted running gags under intense time pressure.
          </p>
          <p>
            You have exactly 60 seconds to answer as many trivia questions as possible. Each correct answer earns <strong>+3 points</strong>, while incorrect answers deduct <strong>1 point (−1)</strong>. Only the fastest and most accurate sitcom fans will claim a spot on our global Top 3 High Score Leaderboard!
          </p>
          <h3 style={{ color: '#ffffff', fontSize: '1.2rem', marginTop: '1.5rem' }}>
            Featured American Sitcoms in this Quiz
          </h3>
          <div className="trivia-seo-grid">
            {FEATURED_SITCOMS.map((show, i) => (
              <div key={i} className="sitcom-tag">
                {show}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
