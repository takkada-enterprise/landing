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
          sizes="300px"
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
        <img src={s.src} srcSet={s.srcSet} sizes="90vw" width={s.width} height={s.height} alt={s.alt} />
        <form method="dialog">
          <button className="sheet-close">Close</button>
        </form>
      </dialog>
    </>
  );
}
