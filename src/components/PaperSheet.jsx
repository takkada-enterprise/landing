// A printed sheet (the loading sheet, the salesman export) tucked behind the
// phone at its stop. Tap it to read it full size in a native <dialog>, which
// gives focus trapping, inertness and Escape for free.
//
// Motion: the tucked sheet is origin-aware — it lifts and straightens under the
// cursor, and presses in when tapped, so the tap has somewhere to come from. The
// enlarged sheet is a modal and modals are NOT origin-aware: it stays centred and
// only fades up from scale(0.96), never from scale(0), which would read as a
// zoom out of nowhere. Entry only, via @starting-style; there is nothing to say
// on the way out.
import { useRef } from 'react';
import { screen } from '../data/screens';

export default function PaperSheet({ slug, caption }) {
  const dialog = useRef(null);
  const s = screen(slug);
  return (
    <>
      <button
        type="button"
        className="sheet"
        aria-label={`Enlarge the ${caption}`}
        onClick={() => dialog.current?.showModal()}
      >
        <img
          src={s.src}
          srcSet={s.srcSet}
          // 300px tucked beside the phone; once the section stacks at 900px the
          // sheet is 34% of a column that is the viewport less a 32px gutter,
          // which is a shade under 33vw.
          sizes="(max-width: 900px) 33vw, 300px"
          width={s.width}
          height={s.height}
          alt={s.alt}
          loading="lazy"
          decoding="async"
        />
        <span className="sheet-caption">{caption}</span>
      </button>
      <dialog
        ref={dialog}
        className="sheet-dialog"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        {/* The real cap is min(1100px, 92vw): 92vw is the smaller of the two
            below a 1196px viewport (1100 / 0.92), 1100px above it. The 88dvh
            height cap can make it narrower still on a short window, which a
            sizes attribute cannot express — over-claiming there only means the
            browser picks the larger source, which is the safe way to be wrong.
            Lazy like the tucked copy, and for a stronger reason: a closed
            dialog is display:none, so without this the 1440w candidate of both
            sheets (62 KB) downloaded on every homepage load, for two dialogs
            almost nobody opens. */}
        <img
          src={s.src}
          srcSet={s.srcSet}
          sizes="(min-width: 1196px) 1100px, 92vw"
          width={s.width}
          height={s.height}
          alt={s.alt}
          loading="lazy"
          decoding="async"
        />
        <form method="dialog">
          <button className="sheet-close">Close</button>
        </form>
      </dialog>
    </>
  );
}
