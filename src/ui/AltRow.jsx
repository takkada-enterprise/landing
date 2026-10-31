import { Link } from 'react-router-dom';

export default function AltRow({ title, line, flip = false, to, children }) {
  const media = <div className="ui-altrow-media">{children}</div>;
  return (
    <div className={`ui-altrow${flip ? ' ui-altrow--flip' : ''}`}>
      <div className="ui-altrow-copy">
        <h3 className="ui-card-title">{title}</h3>
        {line && <p className="ui-card-line">{line}</p>}
      </div>
      {to ? <Link to={to} className="ui-altrow-link">{media}</Link> : media}
    </div>
  );
}
