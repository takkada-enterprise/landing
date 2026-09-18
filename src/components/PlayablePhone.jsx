// The hero: the real home screen with tappable tiles.
//
// Motion (CLAUDE.md §11.5) — each one earns its place:
//  - The opened screen scales out of the tile that was tapped (transform-origin
//    = that hotspot's centre, 0.96 -> 1 with the opacity fade), so the visitor
//    sees where the screen came from instead of a panel appearing from nowhere.
//    The origin is derived from `activeKey` during render, not remembered from
//    the last click: the parent's job buttons open a hotspot without touching
//    this component, and a remembered origin would grow the screen out of the
//    wrong tile.
//  - The marigold hint dot is the only ambient motion on the page: a ring that
//    pings outward on transform and opacity alone (never box-shadow, which the
//    browser cannot animate cheaply), because a still screenshot does not tell
//    anybody it is tappable. It stops under prefers-reduced-motion.
//  - Everything else is a transition, so it can reverse mid-flight: the press
//    scale on the tiles, the Back button's fade.
//
// Controlled by design: the parent owns which hotspot is open so the hero copy
// and the job buttons stay in step with the phone.
import { useEffect, useRef } from 'react';
import { HOTSPOTS } from '../data/heroHotspots';
import { screen } from '../data/screens';

const SIZES = '(max-width: 700px) 70vw, 340px';

export default function PlayablePhone({ activeKey, onChange }) {
  const backRef = useRef(null);
  const hotRefs = useRef(new Map());
  // Set only by the handlers in this component, so focus moves when the visitor
  // taps the phone and stays put when the page renders with a screen already
  // open or a job button outside opens one.
  const pendingFocus = useRef(null);

  const home = screen('home');
  const active = HOTSPOTS.find((h) => h.key === activeKey) ?? null;
  const opened = active ? screen(active.screen) : null;
  const transformOrigin = active
    ? `calc(${active.box.left} + ${active.box.width} / 2) calc(${active.box.top} + ${active.box.height} / 2)`
    : undefined;

  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    if (pending.to === 'back' && activeKey === pending.key) backRef.current?.focus();
    if (pending.to === 'hotspot' && !activeKey) hotRefs.current.get(pending.key)?.focus();
  }, [activeKey]);

  function open(hotspot) {
    pendingFocus.current = { to: 'back', key: hotspot.key };
    onChange(hotspot);
  }

  function close() {
    pendingFocus.current = { to: 'hotspot', key: activeKey };
    onChange(null);
  }

  // Escape only closes what this phone opened, and only while the keystroke
  // came from inside it -- the event has to bubble up from the Back button.
  function handleKeyDown(event) {
    if (event.key !== 'Escape' || !active) return;
    event.stopPropagation();
    close();
  }

  return (
    <div className={`pphone${active ? ' is-open' : ''}`} onKeyDown={handleKeyDown}>
      <img
        className="pphone-base"
        src={home.src}
        srcSet={home.srcSet}
        sizes={SIZES}
        width={home.width}
        height={home.height}
        alt={home.alt}
        fetchPriority="high"
        decoding="async"
      />
      {opened && (
        <img
          key={opened.slug}
          className="pphone-screen"
          src={opened.src}
          srcSet={opened.srcSet}
          sizes={SIZES}
          width={opened.width}
          height={opened.height}
          alt={opened.alt}
          style={{ transformOrigin }}
        />
      )}
      {!active &&
        HOTSPOTS.map((hotspot) => (
          <button
            key={hotspot.key}
            type="button"
            className="pphone-hot"
            style={hotspot.box}
            aria-label={`Open ${hotspot.label}`}
            ref={(node) => {
              if (node) hotRefs.current.set(hotspot.key, node);
              else hotRefs.current.delete(hotspot.key);
            }}
            onClick={() => open(hotspot)}
          />
        ))}
      {active && (
        <button type="button" className="pphone-back" ref={backRef} onClick={close}>
          ← Back to home screen
        </button>
      )}
    </div>
  );
}
