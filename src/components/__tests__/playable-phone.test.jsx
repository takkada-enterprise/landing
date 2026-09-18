import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, render, screen as ui, fireEvent } from '@testing-library/react';
import PlayablePhone from '../PlayablePhone';
import { HOTSPOTS } from '../../data/heroHotspots';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const labelOf = (key) => HOTSPOTS.find((h) => h.key === key).label;

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
    const hotspots = ui.getAllByRole('button', { name: /^Open / });
    expect(hotspots).toHaveLength(9);
    // The ping stagger rides on the hotspot itself, not on its position among
    // its siblings, so adding anything else inside the phone cannot reshuffle
    // it. Every tile carries a delay, and they are not all the same.
    const delays = hotspots.map((b) => b.style.getPropertyValue('--ping-delay'));
    expect(delays.every((d) => /s$/.test(d))).toBe(true);
    expect(new Set(delays).size).toBeGreaterThan(1);
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
    // The arrow is decoration: the accessible name is the words alone.
    fireEvent.click(ui.getByRole('button', { name: 'Back to home screen' }));
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
      const img = ui.getByAltText(new RegExp(key === 'parties' ? 'Party list' : 'godown'));
      const origin = img.getAttribute('style');
      expect(origin).toContain(`${hot.box.left} + ${hot.box.width} / 2`);
      expect(origin).toContain(`${hot.box.top} + ${hot.box.height} / 2`);
    }
  });

  // Going straight from one screen to another is what the parent's job buttons
  // do. If the old screen went on frame one, the home screen would show through
  // the new screen's fade and the change would read "A, home, B".
  it('keeps the outgoing screen underneath the arriving one on a direct switch', () => {
    vi.useFakeTimers();
    const { rerender } = render(<PlayablePhone activeKey="stock" onChange={() => {}} />);
    const first = ui.getByAltText(/godown/);

    rerender(<PlayablePhone activeKey="parties" onChange={() => {}} />);
    const second = ui.getByAltText(/Party list/);
    // Keyed by slug: the arriving screen is a fresh node (so @starting-style
    // fires for it) and the outgoing one keeps the node it already had.
    expect(second).not.toBe(first);
    expect(first).toBeInTheDocument();
    expect(first.className).not.toContain('is-leaving');
    // Only the screen in front is announced.
    expect(first).toHaveAttribute('aria-hidden', 'true');
    expect(first.getAttribute('alt')).toBe('');

    // The fallback clears it even though jsdom never fires transitionend.
    act(() => vi.advanceTimersByTime(400));
    expect(first).not.toBeInTheDocument();
    expect(second).toBeInTheDocument();
  });

  it('fades the screen and the Back pill out on close rather than cutting them', () => {
    vi.useFakeTimers();
    render(<Harness />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Stock' }));
    const openedScreen = ui.getByAltText(/godown/);

    fireEvent.click(ui.getByRole('button', { name: 'Back to home screen' }));
    expect(openedScreen).toBeInTheDocument();
    expect(openedScreen.className).toContain('is-leaving');
    const pill = document.querySelector('.pphone-back.is-leaving');
    expect(pill).not.toBeNull();
    // On its way out it is neither tabbable nor announced.
    expect(pill.tabIndex).toBe(-1);
    expect(ui.queryByRole('button', { name: 'Back to home screen' })).toBeNull();
    // The home screen is usable again immediately, and focus is back on the tile.
    expect(ui.getAllByRole('button', { name: /^Open / })).toHaveLength(9);
    expect(document.activeElement).toBe(ui.getByRole('button', { name: 'Open Stock' }));

    act(() => vi.advanceTimersByTime(300));
    expect(openedScreen).not.toBeInTheDocument();
    expect(document.querySelector('.pphone-back.is-leaving')).toBeNull();
  });

  it('moves focus to Back when a hotspot is tapped, and back to that hotspot on close', () => {
    render(<Harness />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Reminders' }));
    const back = ui.getByRole('button', { name: 'Back to home screen' });
    expect(document.activeElement).toBe(back);
    fireEvent.click(back);
    expect(document.activeElement).toBe(ui.getByRole('button', { name: 'Open Reminders' }));
  });

  it('does not steal focus when the screen was opened from outside the phone', () => {
    // Something else on the page holds focus. Neither a first render with a
    // screen already open (SSG/hydration) nor a parent job button opening one
    // by props is the visitor tapping the phone, so taking focus off them here
    // would yank the page around under them.
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();

    const { unmount } = render(<PlayablePhone activeKey="reminders" onChange={() => {}} />);
    expect(document.activeElement).toBe(outside);
    unmount();

    const { rerender } = render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    rerender(<PlayablePhone activeKey="stock" onChange={() => {}} />);
    expect(document.activeElement).toBe(outside);
    outside.remove();
  });

  it('closes on Escape while a screen is open and focus is inside the phone', () => {
    render(<Harness />);
    fireEvent.click(ui.getByRole('button', { name: 'Open Stock' }));
    const back = ui.getByRole('button', { name: 'Back to home screen' });
    fireEvent.keyDown(back, { key: 'Escape' });
    expect(ui.queryByRole('button', { name: 'Back to home screen' })).toBeNull();
    expect(ui.getAllByRole('button', { name: /^Open / })).toHaveLength(9);
    // Escape came from inside the phone, so focus goes back to the tile.
    expect(document.activeElement).toBe(ui.getByRole('button', { name: 'Open Stock' }));
  });

  it('announces the screen that opened, and says nothing on the home screen', () => {
    const { rerender } = render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    const live = document.querySelector('[aria-live="polite"]');
    expect(live).not.toBeNull();
    expect(live.textContent).toBe('');
    rerender(<PlayablePhone activeKey="team" onChange={() => {}} />);
    expect(live.textContent).toBe(`Showing ${labelOf('team')}`);
    rerender(<PlayablePhone activeKey={null} onChange={() => {}} />);
    expect(live.textContent).toBe('');
  });

  it('marks the base screen as the high-priority image and renders without React warnings', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    render(<PlayablePhone activeKey={null} onChange={() => {}} />);
    expect(ui.getByAltText(/home screen/i).getAttribute('fetchpriority')).toBe('high');
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });
});
