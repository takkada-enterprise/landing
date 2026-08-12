import { useEffect, useRef, useState } from 'react';

// Scroll-driven tour for feature pages. A sticky phone crossfades between
// screens while the reader's scroll walks the story station by station.
//
// Motion reason (CLAUDE.md craft rule 5): the crossfade IS the product story.
// One phone showing one screen after another is exactly what the day looks
// like to the person holding it, so the animation teaches rather than
// decorates. Scroll drives the advance (no timer): the reader sets the pace,
// the animation can never run ahead of them, and stopping mid-story freezes it
// exactly where they are.
//
// New pattern justification (craft rule 10): first scrollytelling section on
// a feature page. It borrows the homepage tour's vocabulary (numbered
// stations, one phone, crossfade) so it reads as the same site; only the
// driver differs (scroll instead of a timer), because a feature page is read
// lean-forward and a timer would fight the reader.
//
// Interaction details:
// - IntersectionObserver with a center band (-45% top and bottom) makes the
//   station crossing mid-viewport the active one, the same geometry the
//   homepage mobile tour uses.
// - Stations are also buttons. A click activates immediately (and scrolls the
//   station into the band so the observer agrees with the click).
// - The crossfade is opacity plus a 2px blur bridge and nothing else. The blur
//   makes the two screens read as one object changing rather than two
//   overlapping; the scale pulse that used to ride along was removed on
//   2026-08-12 because the phone is furniture the eye parks on for the whole
//   section, and six twitches of the device edge is not the story. CSS
//   transitions, so an interrupted fade retargets smoothly mid-flight.
// - prefers-reduced-motion collapses everything to an instant swap (CSS).
export default function FeatureTour({ tour }) {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  useEffect(() => {
    const steps = [...(listRef.current?.querySelectorAll('.ftour-step') ?? [])];
    if (!steps.length || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(steps.indexOf(entry.target));
        }
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, [tour.stations.length]);

  return (
    <section className="ftour" id="tour">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{tour.overline}</span>
          <h2 className="section-title">{tour.heading}</h2>
          <p className="ftour-intro">{tour.intro}</p>
        </div>
        <div className="ftour-grid">
          <ol className="ftour-list" ref={listRef}>
            {tour.stations.map((station, i) => (
              <li
                key={station.title}
                className={`ftour-step${i === active ? ' is-active' : ''}`}
              >
                <button
                  type="button"
                  aria-expanded={i === active}
                  onClick={(event) => {
                    setActive(i);
                    event.currentTarget
                      .closest('.ftour-step')
                      ?.scrollIntoView({ block: 'center', behavior: 'smooth' });
                  }}
                >
                  <span className="ftour-num tabular-nums" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="ftour-step-text">
                    <span className="ftour-step-title">{station.title}</span>
                    <span className="ftour-step-body">{station.body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <div className="ftour-phone">
            {tour.stations.map((station, i) => (
              <img
                key={station.title}
                src={station.screenshot}
                alt={station.screenshotAlt}
                className={i === active ? 'is-active' : undefined}
                aria-hidden={i !== active}
                width={600}
                height={1242}
                loading="lazy"
                decoding="async"
              />
            ))}
          </div>
        </div>
        {/* Anything true about the day that has no hour of its own (RBAC, for
            instance) lands here rather than becoming a station and breaking
            the timeline. Same pattern as storyOrderToCash.footnote. */}
        {tour.footnote && <p className="ftour-footnote">{tour.footnote}</p>}
      </div>
    </section>
  );
}
