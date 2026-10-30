import Pill from './Pill';

export default function QuoteBand({ id, quote, name, role, note, cta }) {
  return (
    <figure id={id} className="ui-quote">
      <blockquote>{quote}</blockquote>
      <figcaption>
        <strong>{name}</strong>, {role}
      </figcaption>
      {note && <p className="ui-quote-note">{note}</p>}
      <Pill to={cta.to} tone="ghost">{cta.label}</Pill>
    </figure>
  );
}
