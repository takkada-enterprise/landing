import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, cleanup } from '@testing-library/react';
import React from 'react';
import SitcomTriviaRoute from '../SitcomTriviaRoute';
import { SITCOM_TRIVIA_QUESTIONS, getShuffledQuestions } from '../../data/sitcomTriviaQuestions';
import { isEligibleForTop3 } from '../../lib/sitcomTriviaLeaderboard';

describe('Sitcom Trivia Data & Logic', () => {
  it('contains exactly 100 questions', () => {
    expect(SITCOM_TRIVIA_QUESTIONS).toHaveLength(100);
  });

  it('ensures every question has valid structure and 4 options', () => {
    SITCOM_TRIVIA_QUESTIONS.forEach((q) => {
      expect(q.id).toBeGreaterThan(0);
      expect(typeof q.question).toBe('string');
      expect(q.question.length).toBeGreaterThan(10);
      expect(Array.isArray(q.options)).toBe(true);
      expect(q.options).toHaveLength(4);
      expect(q.correctIndex).toBeGreaterThanOrEqual(0);
      expect(q.correctIndex).toBeLessThanOrEqual(3);
      expect(typeof q.sitcom).toBe('string');
    });
  });

  it('shuffles questions correctly', () => {
    const shuffled = getShuffledQuestions();
    expect(shuffled).toHaveLength(100);
  });

  it('calculates Top 3 eligibility accurately', () => {
    const leaderboard = [
      { name: 'Alex', score: 90 },
      { name: 'Rahul', score: 80 },
      { name: 'Sarah', score: 70 },
    ];

    expect(isEligibleForTop3(75, leaderboard)).toBe(true);
    expect(isEligibleForTop3(65, leaderboard)).toBe(false);
    expect(isEligibleForTop3(95, leaderboard)).toBe(true);
    expect(isEligibleForTop3(10, [])).toBe(true);
  });
});

describe('SitcomTriviaRoute Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders start screen with title, rules, name input, and start button', async () => {
    await act(async () => {
      render(<SitcomTriviaRoute />);
    });

    expect(screen.getByText('60-Second American Sitcom Trivia')).toBeInTheDocument();
    expect(screen.getByText(/Correct: \+3/i)).toBeInTheDocument();
    expect(screen.getByText(/Wrong: −1/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e.g. Alex, Rahul, Sarah/i)).toBeInTheDocument();
  });

  it('transitions to playing state on START GAME click', async () => {
    let rendered;
    await act(async () => {
      rendered = render(<SitcomTriviaRoute />);
    });

    const startBtn = rendered.getByText('START GAME');
    await act(async () => {
      fireEvent.click(startBtn);
    });

    expect(rendered.getByText('TIME LEFT')).toBeInTheDocument();
    expect(rendered.getByText('SCORE')).toBeInTheDocument();
  });
});
