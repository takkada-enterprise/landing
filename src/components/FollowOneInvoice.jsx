// "Follow one invoice": the homepage's one story. Seven true, ordered stops, one
// paper slip pinned beside them.
//
// Motion here is entirely reader-driven. Nothing plays on a timer: the slip's
// stamps, the station's dim-to-bright and the phone's small rise are all classes
// that follow the station the reader has scrolled into, so scrolling back up
// takes the story apart again in the same order it was built. Nothing moves
// unless the reader moves it.
import { Link } from 'react-router-dom';
import { STOPS, liveFeatures } from '../data/journey';
import { FEATURE_PAGES } from '../data/featurePages';
import { screen } from '../data/screens';
import { useActiveStation } from '../hooks/useActiveStation';
import InvoiceSlip from './InvoiceSlip';
import PaperSheet from './PaperSheet';

const SHEET_CAPTION = { 'sheet-loading': 'loading sheet', 'sheet-salesman': 'team sales sheet' };

// A picture of the message the retailer gets, not a message you can act on: no
// link, no button, nothing focusable. One aria-label reads the whole card, so
// assistive tech gets the message as an image rather than a pile of fragments —
// which is also what makes it count as the Send stop's "screen".
function WhatsAppMessage({ message, time }) {
  const label =
    `WhatsApp message from ${message.from}: ${message.lines.join(' ')} ` +
    `Attached: ${message.attachment}. ${message.cta}. Delivered.`;
  return (
    <div className="wam" role="img" aria-label={label}>
      <div className="wam-from">{message.from}</div>
      <div className="wam-bubble">
        <div className="wam-file">
          <span className="wam-file-kind" aria-hidden="true">
            PDF
          </span>
          <span className="wam-file-name">{message.attachment}</span>
        </div>
        {message.lines.map((line) => (
          // A line carrying an amount or a count gets lining, fixed-width
          // figures so the rupees do not shimmy against the paper slip.
          <p key={line} className={/\d/.test(line) ? 'wam-line tabular-nums' : 'wam-line'}>
            {line}
          </p>
        ))}
        <span className="wam-cta">{message.cta}</span>
        <div className="wam-meta">
          <span className="tabular-nums">{time}</span>
          <span className="wam-ticks" aria-hidden="true">
            ✓✓
          </span>
        </div>
      </div>
    </div>
  );
}

export default function FollowOneInvoice() {
  const [active, setRef] = useActiveStation(STOPS.length);
  return (
    <section className="foi" id="digital-collection" aria-labelledby="foi-title">
      <div className="foi-intro">
        <span className="section-label">Follow one invoice</span>
        <h2 className="section-title" id="foi-title">
          From the order at the counter to the receipt in Tally.
        </h2>
      </div>
      <div className="foi-grid">
        <InvoiceSlip activeIndex={active} />
        {/* #features is the anchor the retired capability grid used to carry;
            it lives on the station list now so the id still lands on the page
            that answers "what does it do". */}
        <div className="foi-stations" id="features">
          {STOPS.map((stop, i) => {
            const visual = [
              'foi-visual',
              stop.sheet ? 'has-sheet' : '',
              stop.screens.length > 1 ? 'has-second' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <article
                key={stop.id}
                ref={setRef(i)}
                className={`foi-station${i === active ? ' is-on' : ''}`}
                id={`stop-${stop.id}`}
              >
                <div className="foi-copy">
                  <div className="foi-when tabular-nums">{stop.when}</div>
                  <h3>{stop.headline}</h3>
                  <p>{stop.body}</p>
                  <div className="foi-pills">
                    {liveFeatures(stop, FEATURE_PAGES).map((f) => (
                      <Link
                        key={f.slug}
                        to={`/${f.slug}`}
                        className="foi-pill"
                        data-testid="stop-pill"
                      >
                        {f.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className={visual}>
                  {stop.sheet && <PaperSheet slug={stop.sheet} caption={SHEET_CAPTION[stop.sheet]} />}
                  {stop.screens.map((slug, n) => {
                    const s = screen(slug);
                    return (
                      <img
                        key={slug}
                        className={`foi-phone foi-phone--${n}`}
                        src={s.src}
                        srcSet={s.srcSet}
                        // The rendered width, exactly. The front phone is 250px
                        // on the two-column layout and 220px once the section
                        // stacks at 900px; both are flex: none, so neither can
                        // be shrunk out from under the claim. The tucked second
                        // phone is 200px and is display: none below 900px, so
                        // one number is the whole truth for it.
                        sizes={n === 0 ? '(max-width: 900px) 220px, 250px' : '200px'}
                        width={s.width}
                        height={s.height}
                        alt={s.alt}
                        loading="lazy"
                        decoding="async"
                      />
                    );
                  })}
                  {stop.message && (
                    <WhatsAppMessage message={stop.message} time={stop.when.split(' · ')[0]} />
                  )}
                  {stop.id === 'recover' && (
                    <div className="foi-callchip tabular-nums">
                      <strong>AI call · 1m 42s</strong>
                      <span>Will pay by 22 Sep</span>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
