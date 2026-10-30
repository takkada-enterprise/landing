import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import VideoTestimonials from '../VideoTestimonials';
import { videoTestimonials } from '../../data/siteContent';

afterEach(cleanup);

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

describe('VideoTestimonials component', () => {
  it('renders Meet Patel and Dhanlaxmi Crop Science Limited by default', () => {
    const { container } = renderComponent();
    expect(container.textContent).toContain('Meet Patel');
    expect(container.textContent).toContain('Dhanlaxmi Crop Science Limited');
    expect(container.textContent).toContain('NSE listed');
    expect(container.textContent).toContain('Verified Takkada Customer');
  });

  it('renders the section with an accessible heading and id', () => {
    const { container } = renderComponent();
    const section = container.querySelector('#customer-stories');
    expect(section).toBeTruthy();
    expect(section.getAttribute('aria-label')).toBe('Customer Video Stories');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain(
      'Customer Stories'
    );
  });

  it('renders the video poster, play button, and duration badge', () => {
    const { container } = renderComponent();
    const playBtn = screen.getByRole('button', {
      name: /Play customer testimonial video of Meet Patel from Dhanlaxmi Crop Science Limited/i,
    });
    expect(playBtn).toBeTruthy();

    const poster = container.querySelector('.hv3-stories-poster-img');
    expect(poster).toBeTruthy();
    expect(poster.getAttribute('src')).toBe(videoTestimonials[0].video.poster);

    expect(container.textContent).toContain(videoTestimonials[0].duration);
  });

  it('clicking the play button triggers playback and calls track', () => {
    renderComponent();
    const playBtn = screen.getByRole('button', {
      name: /Play customer testimonial video of Meet Patel from Dhanlaxmi Crop Science Limited/i,
    });

    fireEvent.click(playBtn);
    expect(mockTrack).toHaveBeenCalledWith(
      'testimonial_video_play',
      expect.objectContaining({
        story_id: 'meet-patel-dhan-laxmi',
        story_name: 'Meet Patel',
        company: 'Dhanlaxmi Crop Science Limited',
      })
    );
  });

  it('renders all key operational highlights', () => {
    const { container } = renderComponent();
    for (const highlight of videoTestimonials[0].takeaways) {
      expect(container.textContent).toContain(highlight.title);
      expect(container.textContent).toContain(highlight.desc);
    }
  });

  it('returns null when given empty items array', () => {
    const { container } = renderComponent({ items: [] });
    expect(container.firstChild).toBeNull();
  });
});
