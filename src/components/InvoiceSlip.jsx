// The signature element: one paper invoice that stays pinned and collects a
// rubber stamp at every stop. HTML, not an image, so it is crisp, selectable and
// readable by crawlers.
//
// Motion: a stamp lands with a 1.5 → 1 scale over 260ms — the "thunk" of a rubber
// stamp hitting paper — and lifts off faster than it lands when the reader
// scrolls back. Both directions are *transitions* on one class, never keyframes,
// so a stamp caught mid-landing reverses from wherever it is instead of jumping.
// Every stamp owns a stable slot below the status line, so the paper never
// reflows as they arrive and no stamp can cover the invoice text.
import { INVOICE, STOPS } from '../data/journey';

// The slip prints paise; formatInr rounds, so it is deliberately not used here.
const inr = (n) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function InvoiceSlip({ activeIndex }) {
  return (
    <div className="slip-rail">
      {/* data-not-a-price: every rupee figure below is one retailer's invoice,
          an illustration of what the app carries — never anything Takkada
          charges for. checkRateCardDrift strips this subtree before it looks
          for prices, so the slip cannot be read as a rate that has drifted
          from the partner rate card. Keep the attribute on this root only. */}
      <div
        className="slip tabular-nums"
        role="group"
        aria-label={`Invoice ${INVOICE.number}`}
        data-not-a-price
      >
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
        <div className="slip-stamps" aria-hidden="true">
          {STOPS.map((s, i) => (
            <span
              key={s.id}
              className={[
                'slip-stamp',
                `slip-stamp--${s.id}`,
                `slip-stamp--${s.stamp.tone}`,
                s.stamp.size === 'lg' ? 'slip-stamp--lg' : '',
                i <= activeIndex ? 'is-on' : '',
                // Exactly one stamp is the current one. The pinned mobile bar
                // has room for a single stamp and shows this one; on the full
                // paper the class is inert, because every landed stamp stays.
                i === activeIndex ? 'is-current' : '',
              ]
                .filter(Boolean)
                .join(' ')}
              // Always hidden, at every width. The aria-live status line above
              // is the slip's accessible account of the changing state.
              aria-hidden="true"
            >
              {s.stamp.text}
            </span>
          ))}
        </div>
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
