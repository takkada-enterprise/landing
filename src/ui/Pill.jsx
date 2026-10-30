import { Link } from 'react-router-dom';

// `to` is an in-site route, `href` any other URL, `onClick` alone a button
// (DemoTryCTA opens the phone modal this way). `rest` carries link attributes
// such as WhatsAppCTA's target and rel.
export default function Pill({ to, href, onClick, tone = 'accent', arrow = true, children, ...rest }) {
  const className = `ui-pill ui-pill--${tone}`;
  const body = (
    <>
      {children}
      {arrow && <span className="ui-pill-arrow" aria-hidden="true">→</span>}
    </>
  );
  if (to) return <Link to={to} className={className} onClick={onClick} {...rest}>{body}</Link>;
  if (href) return <a href={href} className={className} onClick={onClick} {...rest}>{body}</a>;
  return <button type="button" className={className} onClick={onClick} {...rest}>{body}</button>;
}
