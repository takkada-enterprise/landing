import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('vite-react-ssg', () => ({
  Head: ({ children }) => children,
  ClientOnly: ({ children }) => children,
}));

import { PhoneModalProvider } from '../../context/PhoneModalContext';
import AiAssistant, { MCP_SERVER_URL } from '../AiAssistant';
import LegalPrivacy from '../LegalPrivacy';
import { routeMetadata } from '../../data/siteMetadata';

afterEach(cleanup);

const renderIn = (el) => render(
    <MemoryRouter>
      <PhoneModalProvider>{el}</PhoneModalProvider>
    </MemoryRouter>
  ).container;

// Claude's and ChatGPT's app directories link to /ai-assistant as the connector's docs, and
// Anthropic rejects a connector whose privacy policy does not cover it. Both pages must stay.
describe('AI assistant docs page', () => {
  it('is in the sitemap and shows the live server URL', () => {
    expect(routeMetadata.some((r) => r.path === '/ai-assistant')).toBe(true);
    expect(MCP_SERVER_URL).toBe('https://mcp.takkada.com/functions/v1/mcp-server');
    const page = renderIn(<AiAssistant />);
    expect(page.textContent).toContain(MCP_SERVER_URL);
    // On the Campfire primitives (plan 2026-10-30-003, Task 7): navy hero, text cards, close band.
    expect(page.querySelector('.ui-band--band h1.ui-hero-title')).not.toBeNull();
    expect(page.querySelectorAll('.ui-card').length).toBeGreaterThan(0);
    expect(page.querySelector('.ui-close')).not.toBeNull();
    expect(page.querySelector('.company-article')).toBeNull();
    expect(document.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://takkada.com/ai-assistant/'
    );
  });

  it('is covered by the privacy policy', () => {
    const privacy = renderIn(<LegalPrivacy />);
    expect(privacy.textContent).toContain('AI assistant connections');
    expect(privacy.querySelector('a[href="/ai-assistant"]')).not.toBeNull();
  });
});
