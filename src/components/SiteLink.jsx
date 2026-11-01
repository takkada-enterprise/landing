// Drop-in for react-router's <Link> that always writes the trailing-slash URL,
// which is the spelling the sitemap and canonicals use. See src/lib/sitePath.js
// for why. Import this instead of `Link` from react-router-dom.
import { Link as RouterLink } from 'react-router-dom';
import { withTrailingSlash } from '../lib/sitePath.js';

export default function Link({ to, ...rest }) {
  return <RouterLink to={typeof to === 'string' ? withTrailingSlash(to) : to} {...rest} />;
}
