import { SectionHead } from '../ui';
import { comparisonSection } from '../data/siteContent';

// The named-competitor grid. Its only caller is /tally-mobile-app-comparison,
// which wraps it in a Band; it renders the head and one .ui-compare table card.

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="Yes" role="img">
      <circle cx="10" cy="10" r="10" fill="#059669" />
      <path d="M5.5 10.5L8.5 13.5L14.5 7" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-label="No" role="img">
      <circle cx="10" cy="10" r="10" fill="#E4E4E1" />
      <path d="M7 7L13 13M13 7L7 13" stroke="#5B6670" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const COLUMNS = ['Takkada', 'Biz Analyst', 'Livekeeping'];

function ComparisonSection() {
  const { heading, rows, disclaimer } = comparisonSection;
  return (
    <>
      <SectionHead title={heading} />
      <div className="ui-card ui-compare-card">
        <div className="ui-compare-scroll">
          <table className="ui-compare ui-compare--grid">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {COLUMNS.map((col) => (
                  <th key={col} scope="col" className={col === 'Takkada' ? 'ui-compare-us' : undefined}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="ui-compare-row">
                  <th scope="row">{row.feature}</th>
                  {COLUMNS.map((col) => (
                    <td key={col}>
                      {row[col] ? <CheckIcon /> : <CrossIcon />}
                      <span className="sr-only">{row[col] ? 'Yes' : 'No'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ui-compare-note">{disclaimer}</p>
      </div>
    </>
  );
}

export default ComparisonSection;
