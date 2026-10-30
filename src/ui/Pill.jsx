import { Link } from 'react-router-dom';

// `to` is an in-site route, `href` any other URL, `onClick` alone a button
// (DemoTryCTA opens the phone modal this way). `rest` carries link attributes
// such as WhatsAppCTA's target and rel.
// Tones: `accent` (marigold fill) or `ghost` (1px outline). No arrow disc.
export default function Pill({ to, href, onClick, tone = 'accent', children, ...rest }) {
  const className = `ui-pill ui-pill--${tone}`;
  if (to) return <Link to={to} className={className} onClick={onClick} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={className} onClick={onClick} {...rest}>{children}</a>;
  return <button type="button" className={className} onClick={onClick} {...rest}>{children}</button>;
}
