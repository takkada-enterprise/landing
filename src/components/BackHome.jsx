// The owner's rule: a visitor who tapped a tile on the homepage must be able to
// get back whenever they want. Sits at the top of the navy hero on every
// feature page and on the features hub.
import { Link } from 'react-router-dom';

export default function BackHome() {
  return (
    <Link to="/" className="back-home">
      <span aria-hidden="true">←</span> Home
    </Link>
  );
}
