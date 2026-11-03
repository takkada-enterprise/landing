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
    expect(container.textContent).toContain('Verified Takkada Customer');
  });

  it('renders the section with an accessible heading and id', () => {
    const { container } = renderComponent();
    const section = container.querySelector('#customer-stories');
    expect(section).toBeTruthy();
    expect(section.getAttribute('aria-label')).toBe('Customer Video Stories');
    expect(screen.getByRole('heading', { level: 2 }).textContent).toContain(
      'Hear from distributors who run on Takkada'
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

  it('keeps the player and its controls on screen when the visitor pauses', () => {
    const { container } = renderComponent();
    fireEvent.click(
      screen.getByRole('button', { name: /Play customer testimonial video of Meet Patel/i })
    );
    const video = container.querySelector('video');
    fireEvent.pause(video);
    expect(container.querySelector('.hv3-stories-poster-overlay')).toBeNull();
    expect(video.hasAttribute('controls')).toBe(true);

    fireEvent.ended(video);
    expect(container.querySelector('.hv3-stories-poster-overlay')).toBeTruthy();
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

  describe('Multiple testimonials support', () => {
    const multiItems = [
      videoTestimonials[0],
      {
        id: 'rajesh-sharma-pune',
        name: 'Rajesh Sharma',
        role: 'Director',
        company: 'Sharma Trading Co.',
        location: 'Pune, Maharashtra',
        industry: 'FMCG Distribution',
        badge: 'Verified Takkada Customer',
        duration: '1:30',
        quote: 'Takkada changed how our salesmen take orders at retailer counters.',
        summary: 'How Sharma Trading Co scaled FMCG delivery and billing with Takkada.',
        takeaways: [
          {
            title: 'Counter billing',
            desc: 'Instant delivery challans and WhatsApp invoice dispatch.',
          },
        ],
        video: {
          type: 'mp4',
          src: '/assets/videos/testimonials/sample-video.mp4',
          poster: '/assets/testimonials/sample-thumb.jpg',
          title: 'Rajesh Sharma sharing experience',
          uploadDate: '2026-11-03T00:00:00+05:30',
          durationIso: 'PT1M30S',
          schemaDescription: 'Rajesh Sharma testimonial',
          contentLocation: 'Pune, Maharashtra, India',
        },
      },
    ];

    it('renders story counter and tabs when multiple testimonials exist', () => {
      const { container } = renderComponent({ items: multiItems });
      expect(container.textContent).toContain('Story 1 of 2');

      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toBe(2);
      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].getAttribute('aria-selected')).toBe('false');
    });

    it('switches story when a tab is clicked', () => {
      const { container } = renderComponent({ items: multiItems });
      const tabs = screen.getAllByRole('tab');

      fireEvent.click(tabs[1]);
      expect(container.textContent).toContain('Story 2 of 2');
      expect(container.textContent).toContain('Sharma Trading Co.');
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');

      const video = container.querySelector('video');
      expect(video.getAttribute('src')).toBe('/assets/videos/testimonials/sample-video.mp4');
    });

    it('switches story using Next and Previous buttons', () => {
      const { container } = renderComponent({ items: multiItems });
      const nextBtn = screen.getByRole('button', { name: /Next customer story/i });
      const prevBtn = screen.getByRole('button', { name: /Previous customer story/i });

      fireEvent.click(nextBtn);
      expect(container.textContent).toContain('Story 2 of 2');
      expect(container.textContent).toContain('Sharma Trading Co.');

      fireEvent.click(prevBtn);
      expect(container.textContent).toContain('Story 1 of 2');
      expect(container.textContent).toContain('Dhanlaxmi Crop Science Limited');
    });

    it('switches story using Up next button', () => {
      const { container } = renderComponent({ items: multiItems });
      const upNextBtn = screen.getByRole('button', { name: /Rajesh Sharma · Sharma Trading Co./i });
      expect(upNextBtn).toBeTruthy();

      fireEvent.click(upNextBtn);
      expect(container.textContent).toContain('Story 2 of 2');
      expect(container.textContent).toContain('Sharma Trading Co.');
    });
  });
});
