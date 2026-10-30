export default function CardGrid({ cols, children }) {
  return <div className={`ui-grid ui-grid--${cols}`}>{children}</div>;
}
