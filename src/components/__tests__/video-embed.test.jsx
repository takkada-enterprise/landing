import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import VideoEmbed from '../VideoEmbed';

afterEach(() => {
  delete window.clarity;
  cleanup();
});

const MP4 = {
  type: 'mp4',
  src: '/assets/video/takkada-demo.mp4',
  poster: '/assets/video/takkada-demo-poster.png',
  title: 'Takkada in 3 minutes',
};

const YT = { type: 'youtube', id: 'abc123XYZ', title: 'Takkada in 3 minutes' };

describe('VideoEmbed', () => {
  it('renders nothing when no video is configured (the default today)', () => {
    const { container } = render(<VideoEmbed video={null} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders nothing for a config missing its source', () => {
    const { container } = render(<VideoEmbed video={{ type: 'mp4', poster: '/x.png' }} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows the poster and an aria-labelled play control with no media element before click', () => {
    const { container } = render(<VideoEmbed video={MP4} />);

    const play = screen.getByRole('button', { name: /play: takkada in 3 minutes/i });
    expect(play).toBeInTheDocument();
    expect(container.querySelector('img')?.getAttribute('src')).toBe(MP4.poster);
    // Nothing loads until the visitor asks: no <video>, no <iframe>.
    expect(container.querySelector('video')).toBeNull();
    expect(container.querySelector('iframe')).toBeNull();
  });

  it('mounts the mp4 player only after click and fires the play event', () => {
    window.clarity = vi.fn();
    const { container } = render(<VideoEmbed video={MP4} />);

    fireEvent.click(screen.getByRole('button', { name: /play/i }));

    const video = container.querySelector('video');
    expect(video).not.toBeNull();
    expect(video.getAttribute('src')).toBe(MP4.src);
    expect(video.hasAttribute('controls')).toBe(true);
    expect(window.clarity).toHaveBeenCalledWith('event', 'demo_video_play');
  });

  it('mounts a privacy-enhanced lazy YouTube iframe only after click', () => {
    const { container } = render(<VideoEmbed video={YT} />);
    expect(container.querySelector('iframe')).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: /play/i }));

    const iframe = container.querySelector('iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src')).toContain('youtube-nocookie.com/embed/abc123XYZ');
    expect(iframe.getAttribute('loading')).toBe('lazy');
    expect(iframe.getAttribute('title')).toBe(YT.title);
  });

  it('reserves layout with the fixed-ratio wrapper (CLS guard)', () => {
    const { container } = render(<VideoEmbed video={MP4} />);
    expect(container.querySelector('.video-embed')).not.toBeNull();
  });
});
