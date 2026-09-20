import { describe, it, expect } from 'vitest';
import { render, screen as ui } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackHome from '../BackHome';

describe('BackHome', () => {
  it('is a link to the homepage with a clean accessible name', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <BackHome />
      </MemoryRouter>
    );
    const a = ui.getByRole('link', { name: 'Home' });
    expect(a).toHaveAttribute('href', '/');
  });
});
