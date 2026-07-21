import { useEffect, useRef } from 'react';

// Animates a stat from 0 to its final value the first time it scrolls into
// view. Motion reason (CLAUDE.md §11.5): the proof-band numbers are
// collections accumulating, so a one-time count-up mirrors what the number
// is. SSG output, crawlers, no-JS visitors, and reduced-motion users always
// get the final value rendered as real text.
function CountUp({ value, prefix = '', suffix = '', duration = 1400, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - (1 - t) ** 3;
            el.textContent = `${prefix}${Math.round(value * eased)}${suffix}`;
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.6 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

export default CountUp;
