export default function SectionHead({ title, lead, as: Tag = 'h2' }) {
  return (
    <header className="ui-section-head">
      <Tag className="ui-section-title">{title}</Tag>
      {lead && <p className="ui-section-lead">{lead}</p>}
    </header>
  );
}
