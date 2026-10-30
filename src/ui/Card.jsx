import { Link } from 'react-router-dom';

// `className` exists for build contracts only (features-hub-card, guide-hub-card).
export default function Card({ title, line, to, className, children }) {
  const cls = `ui-card${className ? ` ${className}` : ''}`;
  const body = (
    <>
      <h3 className="ui-card-title">{title}</h3>
      {line && <p className="ui-card-line">{line}</p>}
      {children && <div className="ui-card-media">{children}</div>}
    </>
  );
  return to ? <Link to={to} className={cls}>{body}</Link> : <article className={cls}>{body}</article>;
}
