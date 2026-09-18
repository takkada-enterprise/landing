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
//  - Screens overlap rather than cut. Going straight from one screen to another
//    (the parent's job buttons do that) keeps the old screen mounted UNDERNEATH
//    the new one until the new one has finished arriving, so the home screen
//    never flashes through the gap and the change reads as "A became B", not
//    "A, home, B". Going back fades the screen out over 140ms on opacity alone
//    — an exit is faster than an enter, and it does not re-animate the scale it
//    just arrived with. Both are transitions, not keyframes, so tapping a tile
//    mid-exit retargets instead of queueing.
//  - The marigold hint dot is the only ambient motion on the page: a ring that
//    pings outward on transform and opacity alone (never box-shadow, which the
//    browser cannot animate cheaply), because a still screenshot does not tell
//    anybody it is tappable. It stops under prefers-reduced-motion.
//
// Controlled by design: the parent owns which hotspot is open so the hero copy
// and the job buttons stay in step with the phone. The outgoing screen below is
// presentation state only — it never changes what `activeKey`/`onChange` mean.
import { useEffect, useRef, useState } from 'react';
import { HOTSPOTS } from '../data/heroHotspots';
import { screen } from '../data/screens';

const SIZES = '(max-width: 700px) 70vw, 340px';
// Fallbacks for the `transitionend` that clears an outgoing screen: a tab in
// the background, a dropped event or reduced motion must never strand a layer
// on top of the phone. Each is its CSS duration plus slack.
const ENTER_FALLBACK_MS = 350;
const EXIT_FALLBACK_MS = 220;

const hotspotFor = (key) => HOTSPOTS.find((h) => h.key === key) ?? null;
// The centre of the tile, which is where its screen grows out of.
const originOf = (hotspot) =>
  `calc(${hotspot.box.left} + ${hotspot.box.width} / 2) calc(${hotspot.box.top} + ${hotspot.box.height} / 2)`;

export default function PlayablePhone({ activeKey, onChange }) {
  const backRef = useRef(null);
  const hotRefs = useRef(new Map());
  // Set only by the handlers in this component, so focus moves when the visitor
  // taps the phone and stays put when the page renders with a screen already
  // open or a job button outside opens one.
  const pendingFocus = useRef(null);

  // The screen on its way out: `under` means a new screen is arriving on top of
  // it, `leaving` means nothing is replacing it and it fades away. Derived
  // during render (React's "adjust state when a prop changes" pattern) because
  // an effect would run after the browser had already painted a frame with the
  // old screen gone — which is the flash this exists to remove.
  const [seenKey, setSeenKey] = useState(activeKey);
  const [outgoing, setOutgoing] = useState(null);
  if (seenKey !== activeKey) {
    const left = hotspotFor(seenKey);
    setSeenKey(activeKey);
    setOutgoing(
      left
        ? { slug: left.screen, mode: activeKey ? 'under' : 'leaving', origin: originOf(left) }
        : null
    );
  }

  const home = screen('home');
  const active = hotspotFor(activeKey);
  const opened = active ? screen(active.screen) : null;

  // Layers are keyed by slug so React keeps the outgoing image's own DOM node
  // (no re-entry animation on it) and mounts the incoming one fresh, which is
  // what makes @starting-style fire for the arriving screen. The outgoing layer
  // keeps its own origin: switching screens while its 320ms grow is still
  // running must not snap it back to the middle of the phone mid-flight.
  const layers = [];
  if (outgoing && outgoing.slug !== opened?.slug) {
    layers.push({ ...screen(outgoing.slug), state: outgoing.mode, origin: outgoing.origin });
  }
  if (opened) layers.push({ ...opened, state: 'current', origin: originOf(active) });
  const hasUnder = layers.some((layer) => layer.state === 'under');
  // The pill belongs to the screen: it leaves with a Back exit rather than
  // vanishing, so it is one element in one slot whose class changes. Two slots
  // would mount a second node already carrying .is-leaving, whose start and end
  // are both opacity 0 -- nothing to transition, so it would cut.
  const leavingBack = !active && outgoing?.mode === 'leaving';

  useEffect(() => {
    const pending = pendingFocus.current;
    if (!pending) return;
    pendingFocus.current = null;
    if (pending.to === 'back' && activeKey === pending.key) backRef.current?.focus();
    if (pending.to === 'hotspot' && !activeKey) hotRefs.current.get(pending.key)?.focus();
  }, [activeKey]);

  useEffect(() => {
    if (!outgoing) return undefined;
    const timer = setTimeout(
      () => setOutgoing(null),
      outgoing.mode === 'under' ? ENTER_FALLBACK_MS : EXIT_FALLBACK_MS
    );
    return () => clearTimeout(timer);
  }, [outgoing]);

  // Only the layer whose transition ending MEANS "done" may clear the outgoing
  // one: the arriving screen when something is waiting underneath it, or the
  // leaving screen on a Back exit. Hung on every layer instead, a switch made
  // during A's own 260ms enter would clear the moment A's enter finished, and
  // the home screen would show through B's half-faded alpha.
  function clearOutgoing(event) {
    if (event.propertyName !== 'opacity' || event.target !== event.currentTarget) return;
    setOutgoing(null);
  }

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
    // Deliberate: the phone has consumed this Escape, so an outer handler (the
    // page's own dismiss, or whatever Task 8 wraps the hero in) must not also
    // close something the visitor never opened.
    event.stopPropagation();
    close();
  }

  return (
    <div className="pphone" onKeyDown={handleKeyDown}>
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
      {layers.map((layer) => {
        const isCurrent = layer.state === 'current';
        const decides = layer.state === 'leaving' || (isCurrent && hasUnder);
        return (
          <img
            key={layer.slug}
            className={`pphone-screen${layer.state === 'leaving' ? ' is-leaving' : ''}`}
            src={layer.src}
            srcSet={layer.srcSet}
            sizes={SIZES}
            width={layer.width}
            height={layer.height}
            // Only the screen the visitor is actually looking at is announced;
            // a screen on its way out is decoration.
            alt={isCurrent ? layer.alt : ''}
            aria-hidden={isCurrent ? undefined : 'true'}
            style={{ transformOrigin: layer.origin }}
            onTransitionEnd={decides ? clearOutgoing : undefined}
          />
        );
      })}
      {!active &&
        HOTSPOTS.map((hotspot, i) => (
          <button
            key={hotspot.key}
            type="button"
            className="pphone-hot"
            // The ping delay comes from the hotspot's own index in HOTSPOTS, so
            // it travels with the tile. An nth-of-type stagger would reshuffle
            // the moment anything else inside the phone became a button.
            style={{ ...hotspot.box, '--ping-delay': `${(i % 3) * 0.7}s` }}
            aria-label={`Open ${hotspot.label}`}
            ref={(node) => {
              if (node) hotRefs.current.set(hotspot.key, node);
              else hotRefs.current.delete(hotspot.key);
            }}
            onClick={() => open(hotspot)}
          />
        ))}
      {(active || leavingBack) && (
        <button
          type="button"
          className={`pphone-back${active ? '' : ' is-leaving'}`}
          ref={active ? backRef : null}
          onClick={active ? close : undefined}
          tabIndex={active ? undefined : -1}
          aria-hidden={active ? undefined : 'true'}
        >
          <span aria-hidden="true">←</span> Back to home screen
        </button>
      )}
      <p className="sr-only" aria-live="polite">
        {active ? `Showing ${active.label}` : ''}
      </p>
    </div>
  );
}
