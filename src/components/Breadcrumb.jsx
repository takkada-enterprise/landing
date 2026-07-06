import { Link } from 'react-router-dom';

// Visible breadcrumb trail. Takes the same [{ name, url }] shape the pages
// already feed to breadcrumbSchema(), so the markup and the JSON-LD can
// never describe different trails. Internal URLs render as router Links
// (no full page reload); the current page is a plain aria-current span.
function toInternalPath(url) {
  return url.replace(/^https:\/\/takkada\.com/, '') || '/';
}

function Breadcrumb({ trail }) {
  return (
    <nav aria-label="Breadcrumb" className="icp-breadcrumb">
      {trail.map((item, i) => (
        <span key={item.url}>
          {i > 0 && <span className="icp-breadcrumb-sep" aria-hidden="true">/</span>}
          {i === trail.length - 1 ? (
            <span aria-current="page">{item.name}</span>
          ) : (
            <Link to={toInternalPath(item.url)}>{item.name}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumb;
