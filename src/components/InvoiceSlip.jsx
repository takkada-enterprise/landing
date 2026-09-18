// The signature element: one paper invoice that stays pinned and collects a
// rubber stamp at every stop. HTML, not an image, so it is crisp, selectable and
// readable by crawlers.
//
// Motion: a stamp lands with a 1.5 → 1 scale over 260ms — the "thunk" of a rubber
// stamp hitting paper — and lifts off faster than it lands when the reader
// scrolls back. Both directions are *transitions* on one class, never keyframes,
// so a stamp caught mid-landing reverses from wherever it is instead of jumping.
// The stamps are absolutely positioned in a fixed-size slip, so the paper never
// reflows as they arrive.
import { INVOICE, STOPS } from '../data/journey';

// The slip prints paise; formatInr rounds, so it is deliberately not used here.
const inr = (n) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvoiceSlip({ activeIndex }) {
  return (
    <div className="slip-rail">
      <div className="slip tabular-nums" role="group" aria-label={`Invoice ${INVOICE.number}`}>
        {/* Two spellings of the same number, one shown at a time by CSS. The
            full paper shows the short form, because the eye has the rest of the
            slip for context; the pinned mobile bar is all the reader gets, so it
            carries the whole number. */}
        <div className="slip-head">
          <span>TAX INVOICE</span>
          <span className="slip-no slip-no--short">{INVOICE.short}</span>
          <span className="slip-no slip-no--full">{INVOICE.number}</span>
        </div>
        <div className="slip-party">{INVOICE.party}</div>
        <div className="slip-place">{INVOICE.place}</div>
        <hr />
        {INVOICE.lines.map((l) => (
          <div className="slip-line" key={l.label}>
            <span>{l.label}</span>
            <span>{inr(l.amount)}</span>
          </div>
        ))}
        <hr />
        <div className="slip-line slip-total">
          <span>TOTAL</span>
          <span>₹{inr(INVOICE.total)}</span>
        </div>
        <div className="slip-status" data-testid="slip-status" aria-live="polite">
          {STOPS[activeIndex].status}
        </div>
        {STOPS.map((s, i) => (
          <span
            key={s.id}
            className={[
              'slip-stamp',
              `slip-stamp--${s.id}`,
              `slip-stamp--${s.stamp.tone}`,
              s.stamp.size === 'lg' ? 'slip-stamp--lg' : '',
              i <= activeIndex ? 'is-on' : '',
              // Exactly one stamp is the current one. The pinned mobile bar has
              // room for a single stamp and shows this one; on the full paper
              // the class is inert, because there every landed stamp stays.
              i === activeIndex ? 'is-current' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            // Only the stamps that have not landed yet are hidden. Writing
            // aria-hidden="false" on the pressed ones would be a lie the
            // accessibility tree has to carry.
            aria-hidden={i > activeIndex ? 'true' : undefined}
          >
            {s.stamp.text}
          </span>
        ))}
      </div>
      <ol className="slip-stops">
        {STOPS.map((s, i) => (
          <li key={s.id} className={i === activeIndex ? 'is-on' : i < activeIndex ? 'is-done' : ''}>
            {s.label}
          </li>
        ))}
      </ol>
    </div>
  );
}
