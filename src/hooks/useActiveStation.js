// Reports which station sits in the middle band of the viewport, so the pinned
// invoice slip can collect its stamps as the reader scrolls. One observer for
// all stations, because seven observers would fire seven times a frame.
//
// The motion this drives is a scroll-linked *state* change, not a scroll-linked
// animation: the hook only says which station is current, and CSS transitions do
// the rest. That is what lets a stamp reverse mid-flight when the reader scrolls
// back up — the class comes off and the same transition runs the other way.
//
// Without IntersectionObserver (server render, old browsers) the first station
// stays active, which still renders a complete, readable page.
import { useCallback, useEffect, useRef, useState } from 'react';

export function useActiveStation(count) {
  const [active, setActive] = useState(0);
  const nodes = useRef([]);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          // A node we do not track (indexOf -1) would reset the slip to the
          // first stamp, so it is ignored rather than trusted.
          const i = nodes.current.indexOf(e.target);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: '-48% 0px -48% 0px' }
    );
    nodes.current.slice(0, count).forEach((n) => n && io.observe(n));
    return () => io.disconnect();
  }, [count]);

  const setRef = useCallback(
    (i) => (el) => {
      nodes.current[i] = el;
    },
    []
  );
  return [active, setRef];
}
