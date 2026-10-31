import Band from './Band';
import Pill from './Pill';

// `children`, when given, replaces the default Pill: a page passes DemoTryCTA
// so "Try the demo" keeps its phone-number capture.
export default function CloseBand({ id, title, cta, children }) {
  return (
    <Band tone="band" id={id} className="ui-close">
      <h2 className="ui-close-title">{title}</h2>
      {children || <Pill to={cta.to}>{cta.label}</Pill>}
    </Band>
  );
}
