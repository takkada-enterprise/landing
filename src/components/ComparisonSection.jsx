import { comparisonSection } from '../data/siteContent';

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
      <circle cx="10" cy="10" r="10" fill="#EEF5FA" />
      <path d="M7 7L13 13M13 7L7 13" stroke="#8FB4C7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ComparisonSection() {
  const { overline, heading, rows, disclaimer } = comparisonSection;
  const columns = ['Takkada', 'Biz Analyst', 'Livekeeping'];

  return (
    <section className="comparison-section" id="comparison">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{overline}</span>
          <h2 className="section-title">{heading}</h2>
        </div>
        <div className="comparison-table-wrapper">
          <table className="comparison-table">
            <thead>
              <tr>
                <th className="comparison-th comparison-th--feature" scope="col">Feature</th>
                {columns.map((col) => (
                  <th
                    key={col}
                    className={`comparison-th comparison-th--col${col === 'Takkada' ? ' comparison-th--takkada' : ''}`}
                    scope="col"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="comparison-row">
                  <td className="comparison-td comparison-td--feature">{row.feature}</td>
                  {columns.map((col) => (
                    <td key={col} className="comparison-td comparison-td--value">
                      {row[col] ? <CheckIcon /> : <CrossIcon />}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="comparison-disclaimer">{disclaimer}</p>
      </div>
    </section>
  );
}

export default ComparisonSection;
