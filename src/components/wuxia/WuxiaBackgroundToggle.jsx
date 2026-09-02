import React from 'react';
import { Sparkles } from 'lucide-react';

export default function WuxiaBackgroundToggle({ isActive, onToggle }) {
  return (
    <button
      type="button"
      className={`wuxia-bg-toggle ${isActive ? 'is-active' : ''}`}
      onClick={onToggle}
      title="Toggle atmospheric Wuxia background visual scenery"
      aria-label="Toggle Wuxia Realm Background"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 14px',
        borderRadius: '9999px',
        fontSize: '13px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        background: isActive
          ? 'linear-gradient(135deg, #344E41 0%, #1B3026 100%)'
          : 'rgba(231, 240, 232, 0.85)',
        color: isActive ? '#E7F0E8' : '#344E41',
        border: isActive ? '1px solid #6B9E7A' : '1px solid #DAE5D6',
        boxShadow: isActive ? '0 4px 14px rgba(27, 48, 38, 0.25)' : 'none',
      }}
    >
      <span style={{ fontSize: '14px' }}>☯️</span>
      <span>{isActive ? 'Wuxia Realm: Active' : 'Wuxia Realm Theme'}</span>
      <Sparkles size={13} style={{ opacity: isActive ? 1 : 0.6 }} />
    </button>
  );
}
