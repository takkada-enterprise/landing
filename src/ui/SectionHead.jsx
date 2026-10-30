export default function SectionHead({ title, lead, align = 'center', as: Tag = 'h2' }) {
  return (
    <header className={`ui-section-head ui-section-head--${align}`}>
      <Tag className="ui-section-title">{title}</Tag>
      {lead && <p className="ui-section-lead">{lead}</p>}
    </header>
  );
}
