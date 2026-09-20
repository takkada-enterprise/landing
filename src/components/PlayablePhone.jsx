// The hero: the app's real home screen, with each marked tile a LINK to that
// feature's detail page. It used to open a screenshot inside the phone; the
// owner's review (2026-09-19) replaced that: a tap goes to the feature page,
// and the feature page carries a "Home" link back.
// Motion: the marigold hint dot's ping is the only ambient motion (transform +
// opacity, off under prefers-reduced-motion). A tile presses to scale(0.97).
import { Link } from 'react-router-dom';
import { HOTSPOTS } from '../data/heroHotspots';
import { screen } from '../data/screens';

export default function PlayablePhone() {
  const home = screen('home');
  return (
    <div className="pphone">
      <img className="pphone-base" src={home.src} srcSet={home.srcSet}
        sizes="(max-width: 700px) 70vw, 340px" width={home.width} height={home.height}
        alt={home.alt} fetchPriority="high" decoding="async" />
      {HOTSPOTS.map((h, i) => (
        <Link key={h.key} to={h.href} className="pphone-hot"
          style={{ ...h.box, '--ping-delay': `${(i % 3) * 0.7}s` }}
          aria-label={`${h.label}: see how it works`} />
      ))}
    </div>
  );
}
