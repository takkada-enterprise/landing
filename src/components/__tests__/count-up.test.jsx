import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CountUp from '../CountUp';

// The claims contract for the animated stats: the DOM always carries the
// real figure for SSG/crawlers/no-JS, and once the animation runs, no frame
// ever shows a number small enough to read as a different (smaller) stat.

function mockMatchMedia(reducedMotion) {
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query) => ({
      matches: query.includes('prefers-reduced-motion') ? reducedMotion : false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  );
}

function mockIntersectionObserver() {
  const callbacks = [];
  class MockIO {
    constructor(cb) {
      callbacks.push(cb);
      this.cb = cb;
    }

    observe(el) {
      this.el = el;
    }

    disconnect() {}
  }
  vi.stubGlobal('IntersectionObserver', MockIO);
  return {
    intersectAll() {
      callbacks.forEach((cb) => cb([{ isIntersecting: true }]));
    },
  };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe('CountUp', () => {
  it('renders the exact final string without an IntersectionObserver (SSR/no-JS path)', () => {
    // jsdom has no IntersectionObserver by default; the effect must bail
    // and leave the server-rendered final value untouched.
    render(<CountUp value={100} suffix="+" />);
    expect(screen.getByText('100+')).toBeInTheDocument();
  });

  it('keeps the final value under prefers-reduced-motion even when observed', () => {
    mockMatchMedia(true);
    const io = mockIntersectionObserver();
    const { container } = render(<CountUp value={17} prefix="₹" suffix="Cr+" />);
    io.intersectAll();
    expect(container.textContent).toBe('₹17Cr+');
  });

  it('never shows less than 70% of the final value on any animation frame', async () => {
    mockMatchMedia(false);
    const io = mockIntersectionObserver();

    // Drive requestAnimationFrame by hand so every painted frame is visible
    // to the assertion.
    let now = 0;
    const queue = [];
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((cb) => {
        queue.push(cb);
        return queue.length;
      })
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal('performance', { now: () => now });

    const { container } = render(<CountUp value={100} suffix="+" />);
    io.intersectAll();

    const seen = [];
    // Pump frames 16ms apart until the animation stops queueing.
    for (let i = 0; i < 120 && queue.length; i += 1) {
      const cb = queue.shift();
      cb(now);
      seen.push(parseInt(container.textContent, 10));
      now += 16;
    }

    expect(seen.length).toBeGreaterThan(2);
    seen.forEach((v) => expect(v).toBeGreaterThanOrEqual(70));
    // And it lands on the real figure.
    expect(container.textContent).toBe('100+');
  });
});
