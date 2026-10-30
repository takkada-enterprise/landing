import Band from './Band';
import Pill from './Pill';

// `title` contains `accent`; that phrase is wrapped in em.ui-accent.
export default function CloseBand({ id, title, accent, cta }) {
  const at = accent ? title.indexOf(accent) : -1;
  return (
    <Band tone="band" id={id} className="ui-close">
      <h2 className="ui-close-title">
        {at < 0 ? title : (
          <>
            {title.slice(0, at)}
            <em className="ui-accent">{accent}</em>
            {title.slice(at + accent.length)}
          </>
        )}
      </h2>
      <Pill to={cta.to}>{cta.label}</Pill>
    </Band>
  );
}
