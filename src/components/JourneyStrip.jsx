import { Link } from 'react-router-dom';
import { STOPS } from '../data/journey';
import { FEATURE_GROUPS } from '../data/featureGroups';

// "Where this sits in the invoice's journey": seven stops, this page's stop
// marked. It is the way back into the story a visitor arrived from — the
// homepage tells one invoice's life in seven stations and the hub sorts the
// directory by the same seven, so a feature page that named none of them was
// the one surface where the sequence went missing.
//
// The stop comes from FEATURE_GROUPS, not from the page object: the grouping is
// a property of the directory (see the header of featureGroups.js), and a page
// that has not been grouped yet, or a group that is not a moment in an
// invoice's life (the comparison and trade groups), simply has no strip. Both
// misses are silent by design — a dead strip on a feature page is worse than no
// strip, and features-hub.test.jsx is already the thing that shouts about an
// ungrouped page.
//
// Links are plain router Links to a homepage hash, which is the one mechanism
// this site already uses for that (FeaturePage's own "/#pricing" pointer):
// Layout's useScrollToHash effect fires on the hash and scrolls the station
// into view once the route lands. Layout's NavHashLink is for same-page
// anchors and is not exported.
//
// Motion: press feedback and a hover lift, nothing on entrance. The strip is
// navigation and it is on every feature page, so an animation here would be a
// thing the reader has to sit through on arrival, every time.
export default function JourneyStrip({ slug }) {
  const group = FEATURE_GROUPS.find((g) => g.slugs.includes(slug));
  if (!group?.stop) return null;

  return (
    <nav className="journey-strip" aria-label="Where this sits in an invoice's journey">
      <span className="journey-strip-label">One invoice, seven stops</span>
      <ol>
        {STOPS.map((s) => (
          <li key={s.id} aria-current={s.id === group.stop ? 'step' : undefined}>
            <Link to={`/#stop-${s.id}`}>{s.label}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
