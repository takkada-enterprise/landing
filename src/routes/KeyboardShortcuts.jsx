import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { articlePageSchema, breadcrumbSchema, DEFAULT_OG_IMAGE } from '../data/schema';
import { SHORTCUT_GROUPS, SHORTCUTS_CHECKED_ON } from '../data/desktopShortcuts';

// One printable reference card for the Desktop Entry add-on. It reuses the
// guide's layout and table styles (src/guide.css) so it reads as part of the
// manual. The rows come from src/data/desktopShortcuts.js, where each one names
// the app file that binds it. No motion.

export const SHORTCUTS_PATH = '/keyboard-shortcuts';
export const SHORTCUTS_TITLE = 'Takkada keyboard shortcuts for the desktop';
export const SHORTCUTS_DESCRIPTION =
  'Every key for billing on a computer with Takkada Desktop Entry: save with Ctrl+A, pull an order with Alt+O, and move around without the mouse.';

function KeyboardShortcuts() {
  const schemas = [
    articlePageSchema({
      headline: SHORTCUTS_TITLE,
      description: SHORTCUTS_DESCRIPTION,
      image: DEFAULT_OG_IMAGE,
      datePublished: SHORTCUTS_CHECKED_ON,
      dateModified: SHORTCUTS_CHECKED_ON,
      author: 'Takkada',
      path: SHORTCUTS_PATH,
    }),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Guides', path: '/guide' },
      { name: 'Keyboard shortcuts', path: SHORTCUTS_PATH },
    ]),
  ];

  return (
    <>
      <Seo
        title={SHORTCUTS_TITLE}
        description={SHORTCUTS_DESCRIPTION}
        path={SHORTCUTS_PATH}
        ogType="article"
        schemas={schemas}
      />

      <main className="guide-page shortcuts-page">
        <div className="guide-container">
          <nav className="guide-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/guide">Guides</Link>
          </nav>

          <article className="guide-article">
            <header className="guide-article-header">
              <h1>Keyboard shortcuts</h1>
              <p className="guide-checked">{`Checked against the app on ${SHORTCUTS_CHECKED_ON}`}</p>
            </header>

            <div className="guide-prose">
              <p>
                Your billing clerk can make a whole bill without touching the mouse: pick the
                party, press Enter through the date and number, type the items, and save with
                Ctrl + A. These keys work in the desktop layout, which comes with the Desktop
                Entry add-on. Ask your partner to switch it on.
              </p>
              <p>
                Forgot a key? Press <kbd>?</kbd> on any screen and the app lists every action
                and key for that screen. Print this page and keep it next to the keyboard for
                the first week.
              </p>

              {SHORTCUT_GROUPS.map((group) => (
                <section key={group.id} aria-labelledby={`${group.id}-heading`}>
                  <h2 id={`${group.id}-heading`}>{group.title}</h2>
                  <p>{group.blurb}</p>
                  <div className="guide-table-wrap" tabIndex={0}>
                    <table>
                      <thead>
                        <tr>
                          <th scope="col">To</th>
                          <th scope="col">Windows</th>
                          <th scope="col">Mac</th>
                        </tr>
                      </thead>
                      <tbody>
                        {group.rows.map((row) => (
                          <tr key={`${group.id}-${row.does}`}>
                            <td>{row.does}</td>
                            <td className="shortcuts-key">{row.win}</td>
                            <td className="shortcuts-key">{row.mac}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ))}

              <p>
                On a bill and in a list, the Alt keys do that screen's job first. On Windows,
                Alt + R right after saving a bill raises a credit note, and on the dashboard the
                same keys open Receipts.
              </p>
            </div>
          </article>

          <Link className="guide-back" to="/guide">
            All guides
          </Link>
        </div>
      </main>
    </>
  );
}

export default KeyboardShortcuts;
