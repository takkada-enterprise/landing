import { memo } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button type="button" className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-question">{item.question}</span>
        <span className={`faq-toggle ${isOpen ? 'open' : ''}`} aria-hidden="true">
          <ChevronDown size={20} strokeWidth={2.4} />
        </span>
      </button>
      <div className="faq-answer-wrap" style={{ maxHeight: isOpen ? '300px' : '0px' }}>
        <p className="faq-answer">{item.answer}</p>
      </div>
    </div>
  );
}

export default memo(FAQItem);
