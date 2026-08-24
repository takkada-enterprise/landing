import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'));
    if (!elements.length) return;

    // Where IntersectionObserver is unavailable (SSR, jsdom, very old
    // browsers) reveal everything immediately — never leave content hidden
    // behind the opacity:0 reveal state.
    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: '0px 0px -80px 0px' }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);
}

export function useParallaxVariable() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return undefined;

    let raf = 0;
    let lastScrollY = -1;

    const update = () => {
      raf = 0;
      const currentScrollY = window.scrollY;
      if (currentScrollY === lastScrollY) return;
      lastScrollY = currentScrollY;
      document.documentElement.style.setProperty('--scroll-y', `${currentScrollY.toFixed(2)}`);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
}

