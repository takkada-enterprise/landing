import { useState } from 'react';
import { Play } from 'lucide-react';
import { demoVideo } from '../data/siteContent';
import { track } from '../lib/track';

// Motion opt-in (craft rule #5): the only motion here is video playback the
// visitor explicitly starts. No autoplay, no ambient animation. Before the
// click nothing loads — no <video> element, no iframe, zero network cost —
// so the section adds no page weight until the visitor asks for it. The
// fixed 16:9 aspect-ratio box reserves layout up front (CLS guard).
//
// `video` shape (see demoVideo in siteContent.js):
//   { type: 'mp4', src, poster, title }
//   { type: 'youtube', id, poster, title }
// A null/absent config renders nothing — the site never shows an empty frame.
function VideoEmbed({ video = demoVideo }) {
  const [playing, setPlaying] = useState(false);

  if (!video || (video.type === 'mp4' && !video.src) || (video.type === 'youtube' && !video.id)) {
    return null;
  }

  const title = video.title || 'Takkada demo video';

  const handlePlay = () => {
    track('demo_video_play', { video_type: video.type });
    setPlaying(true);
  };

  return (
    <div className="video-embed">
      {!playing && (
        <button
          type="button"
          className="video-embed-poster"
          onClick={handlePlay}
          aria-label={`Play: ${title}`}
        >
          {video.poster && (
            <img src={video.poster} alt="" loading="lazy" decoding="async" />
          )}
          <span className="video-embed-play" aria-hidden="true">
            <Play size={26} fill="currentColor" />
          </span>
        </button>
      )}
      {playing && video.type === 'mp4' && (
        // eslint-disable-next-line jsx-a11y/media-has-caption -- founder-supplied demo asset; captions tracked with the asset
        <video src={video.src} poster={video.poster} controls autoPlay preload="none">
          {title}
        </video>
      )}
      {playing && video.type === 'youtube' && (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
          title={title}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}

export default VideoEmbed;
