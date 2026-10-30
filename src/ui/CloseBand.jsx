import Band from './Band';
import Pill from './Pill';

// `title` contains `accent`; that phrase is wrapped in em.ui-accent.
// `children`, when given, replaces the default Pill: a page passes DemoTryCTA
// so "Try the demo" keeps its phone-number capture.
export default function CloseBand({ id, title, accent, cta, children }) {
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
      {children || <Pill to={cta.to}>{cta.label}</Pill>}
    </Band>
  );
}
