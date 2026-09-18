import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen as ui, fireEvent } from '@testing-library/react';
import PlayablePhone from '../PlayablePhone';
import { HOTSPOTS } from '../../data/heroHotspots';

afterEach(cleanup);

// The component is controlled: the parent owns which hotspot is open so the
// hero copy and the job buttons stay in step. This harness is that parent, and
// it is what the focus tests need -- a click only opens a screen because the
// parent re-renders with the new key.
function Harness({ initial = null }) {
  const [key, setKey] = useState(initial);
  return <PlayablePhone activeKey={key} onChange={(h) => setKey(h ? h.key : null)} />;
}

describe('PlayablePhone', () => {
  it('renders the home screen and nine labelled hotspot buttons', () => {
    render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    expect(ui.getByAltText(/home screen/i)).toBeInTheDocument();
    expect(ui.getAllByRole('button', { name: /^Open / })).toHaveLength(9);
  });

  it('reports the tapped hotspot to the parent', () => {
    const onChange = vi.fn();
    render(<PlayablePhone activeKey={null} onChange={onChange} />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Reminders' }));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ key: 'reminders' }));
  });

  it('shows the opened screen, hides the hotspots from tab order, and offers Back', () => {
    const onChange = vi.fn();
    render(<PlayablePhone activeKey="reminders" onChange={onChange} />);
    expect(ui.getByAltText(/Reminders tab/)).toBeInTheDocument();
    expect(ui.queryAllByRole('button', { name: /^Open / })).toHaveLength(0);
    fireEvent.click(ui.getByRole('button', { name: /Back to home screen/ }));
    expect(onChange).toHaveBeenCalledWith(null);
  });

  // The opened screen scales out of the tile that was tapped, which is only
  // honest if the origin comes from the hotspot that is actually open. A ref
  // written in the click handler cannot know that: Task 8's job buttons open a
  // hotspot without going through this component at all, and the screen would
  // then grow out of whichever tile was tapped last. So the origin is derived
  // from `activeKey` during render, and this test sets it by props alone.
  it('scales the opened screen from the centre of the active hotspot when the parent sets it', () => {
    const { rerender } = render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    for (const key of ['parties', 'stock']) {
      rerender(<PlayablePhone activeKey={key} onChange={() => {}} />);
      const hot = HOTSPOTS.find((h) => h.key === key);
      const img = ui.getByAltText(new RegExp(hot.key === 'parties' ? 'Party list' : 'godown'));
      const origin = img.getAttribute('style');
      expect(origin).toContain(`${hot.box.left} + ${hot.box.width} / 2`);
      expect(origin).toContain(`${hot.box.top} + ${hot.box.height} / 2`);
    }
  });

  it('moves focus to Back when a hotspot is tapped, and back to that hotspot on close', () => {
    render(<Harness />);
    const reminders = ui.getByRole('button', { name: 'Open Reminders' });
    fireEvent.click(reminders);
    const back = ui.getByRole('button', { name: /Back to home screen/ });
    expect(document.activeElement).toBe(back);
    fireEvent.click(back);
    expect(document.activeElement).toBe(ui.getByRole('button', { name: 'Open Reminders' }));
  });

  it('does not steal focus when the screen was opened from outside the phone', () => {
    // First render with a screen already open (SSG/hydration), and a parent
    // job button opening one by props: neither is the visitor tapping the
    // phone, so grabbing focus would yank the page around under them.
    const { unmount } = render(<PlayablePhone activeKey="reminders" onChange={() => {}} />);
    expect(document.activeElement).toBe(document.body);
    unmount();

    const { rerender } = render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    rerender(<PlayablePhone activeKey="stock" onChange={() => {}} />);
    expect(document.activeElement).toBe(document.body);
  });

  it('closes on Escape while a screen is open and focus is inside the phone', () => {
    render(<Harness />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Stock' }));
    const back = ui.getByRole('button', { name: /Back to home screen/ });
    fireEvent.keyDown(back, { key: 'Escape' });
    expect(ui.queryByRole('button', { name: /Back to home screen/ })).toBeNull();
    expect(ui.getAllByRole('button', { name: /^Open / })).toHaveLength(9);
    // Escape came from inside the phone, so focus goes back to the tile.
    expect(document.activeElement).toBe(ui.getByRole('button', { name: 'Open Stock' }));
  });

  it('marks the base screen as the high-priority image and renders without React warnings', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    expect(ui.getByAltText(/home screen/i).getAttribute('fetchpriority')).toBe('high');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
