import { describe, expect, it } from 'vitest';
import { pageTitle, MAX_TITLE_LENGTH } from './pageTitle';

describe('pageTitle', () => {
  it('adds the brand when it fits', () => {
    expect(pageTitle('Aging Report in Tally')).toBe('Aging Report in Tally | Takkada');
  });

  it('drops the brand rather than run past the limit', () => {
    const title = 'Dispatch Load for Pharma Distributors with Same-Day Delivery';
    expect(pageTitle(title)).toBe(title);
  });

  it('keeps a meta_title that fits as written', () => {
    expect(pageTitle('Ignored', 'Custom Title | Takkada')).toBe('Custom Title | Takkada');
  });

  it('trims the brand from a meta_title that runs long', () => {
    expect(
      pageTitle('x', 'Distributor Management Software for Indian Businesses | Takkada')
    ).toBe('Distributor Management Software for Indian Businesses');
  });

  it('never writes an em-dash separator', () => {
    expect(pageTitle('Short')).not.toContain('—');
    expect(pageTitle('Short').length).toBeLessThanOrEqual(MAX_TITLE_LENGTH);
  });
});
