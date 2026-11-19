import { describe, it, expect, vi, afterEach, beforeAll } from 'vitest';
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoTestimonials from '../VideoTestimonials';
import { videoTestimonials } from '../../data/siteContent';

afterEach(cleanup);

// jsdom has no <dialog> behaviour; mirror the browser's open/close.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function showModal() {
    this.setAttribute('open', '');
  };
  HTMLDialogElement.prototype.close = function close() {
    this.removeAttribute('open');
    this.dispatchEvent(new Event('close'));
  };
});

const mockTrack = vi.fn();
vi.mock('../../lib/track', () => ({
  track: (...args) => mockTrack(...args),
}));

function renderComponent(props = {}) {
  return render(
    <MemoryRouter>
      <VideoTestimonials {...props} />
    </MemoryRouter>
  );
}

describe('VideoTestimonials reels row', () => {
  it('renders the section heading and id', () => {
    const { container } = renderComponent();
    const section = container.querySelector('#customer-stories');
    expect(section.getAttribute('aria-label')).toBe('Customer Video Stories');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain(
      'Hear from businesses that run on Takkada'
    );
  });

  it('shows every story cover at once, with name, company and short quote', () => {
    const { container } = renderComponent();
    const covers = container.querySelectorAll('.hv3-reel-cover img');
    expect(covers.length).toBe(videoTestimonials.length);
    videoTestimonials.forEach((item, i) => {
      expect(covers[i].getAttribute('src')).toBe(item.video.poster);
      expect(container.textContent).toContain(item.name);
      expect(container.textContent).toContain(item.company);
      expect(container.textContent).toContain(item.shortQuote);
    });
  });

  it('every story carries a short quote', () => {
    for (const item of videoTestimonials) expect(item.shortQuote).toBeTruthy();
  });

  it('marks the translated quote as translated', () => {
    const { container } = renderComponent();
    expect(container.textContent).toContain('Translated from Kannada');
  });

  it('fetches no video until a cover is tapped', () => {
    const { container } = renderComponent();
    expect(container.querySelector('video')).toBeNull();
  });

  it('tapping a cover opens that video in the dialog and tracks it', () => {
    const { container } = renderComponent();
    const husain = videoTestimonials.find((t) => t.id === 'amafhh-import-export');
    fireEvent.click(
      screen.getByRole('button', { name: new RegExp(`Play customer testimonial video of ${husain.name}`) })
    );
    expect(container.querySelector('dialog').hasAttribute('open')).toBe(true);
    expect(container.querySelector('dialog video').getAttribute('src')).toBe(husain.video.src);
    expect(mockTrack).toHaveBeenCalledWith(
      'testimonial_video_play',
      expect.objectContaining({ story_id: 'amafhh-import-export', company: husain.company })
    );
  });

  it('the popup shows the story notes beside the video: quote and highlights', () => {
    const { container } = renderComponent();
    const meet = videoTestimonials[0];
    fireEvent.click(screen.getAllByRole('button', { name: /Play customer testimonial video/ })[0]);
    const dialog = container.querySelector('dialog');
    expect(dialog.textContent).toContain(meet.quote);
    expect(dialog.textContent).toContain('Verified Takkada Customer');
    for (const t of meet.takeaways) expect(dialog.textContent).toContain(t.title);
  });

  it('closing the dialog removes the video so it stops', () => {
    const { container } = renderComponent();
    fireEvent.click(screen.getAllByRole('button', { name: /Play customer testimonial video/ })[0]);
    act(() => container.querySelector('dialog').close());
    expect(container.querySelector('dialog video')).toBeNull();
  });

  it('returns null when given empty items array', () => {
    const { container } = renderComponent({ items: [] });
    expect(container.firstChild).toBeNull();
  });
});
