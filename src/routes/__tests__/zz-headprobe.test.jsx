import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
vi.mock('vite-react-ssg', () => ({ Head: ({ children }) => children, ClientOnly: ({ children }) => children }));
import Features from '../Features';
import Seo from '../../components/Seo';
afterEach(cleanup);
describe('head probe', () => {
  it('A: head before any render', () => {
    console.log('PROBE A titles:', document.head.querySelectorAll('title').length, JSON.stringify(document.head.innerHTML.slice(0,200)));
  });
  it('B: render hub', () => {
    render(<MemoryRouter initialEntries={['/features']}><Features /></MemoryRouter>);
    console.log('PROBE B titles:', document.head.querySelectorAll('title').length, document.head.querySelector('title')?.textContent);
  });
  it('C: after cleanup, no render', () => {
    console.log('PROBE C titles:', document.head.querySelectorAll('title').length, document.head.querySelector('title')?.textContent);
    console.log('PROBE C canonical:', document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'));
  });
  it('D: render a DIFFERENT page head, then read first title', () => {
    render(<MemoryRouter><Seo title={'X'.repeat(120)} description={'Y'.repeat(400)} path="/somewhere-else" /></MemoryRouter>);
    console.log('PROBE D titles:', [...document.head.querySelectorAll('title')].map(t=>t.textContent.slice(0,20)));
    console.log('PROBE D first title len:', document.head.querySelector('title').textContent.length);
    console.log('PROBE D canonical:', document.head.querySelector('link[rel="canonical"]')?.getAttribute('href'));
  });
});
