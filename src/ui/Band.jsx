export default function Band({ tone = 'ground', id, className, children }) {
  return (
    <section id={id} className={`ui-band ui-band--${tone}${className ? ` ${className}` : ''}`}>
      <div className="ui-max">{children}</div>
    </section>
  );
}
