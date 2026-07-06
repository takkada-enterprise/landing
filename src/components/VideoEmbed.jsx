import { useState } from 'react';
import { Play } from 'lucide-react';
import { demoVideo } from '../data/siteContent';
import { track } from '../lib/track';

// Motion opt-in (craft rule #5): the motion here is (a) video playback the
// visitor explicitly starts — no autoplay, no ambient animation — and (b) a
// subtle scale on the play control on hover/focus (affordance that the
// poster is pressable; disabled under prefers-reduced-motion in styles.css).
// Before the click nothing loads — no <video> element, no iframe, zero
// network cost. The fixed 16:9 aspect-ratio box reserves layout (CLS guard).
//
// `video` shape (see demoVideo in siteContent.js):
//   { type: 'mp4', src, poster, title }
//   { type: 'youtube', id, poster, title }
// Anything else — null, unknown type, missing src/id — is unplayable and
// renders nothing: the site never shows an empty frame or a dead player.

// Exported so section wrappers (Home's "See It Working" heading) gate on the
// same validity rule and can't render a headed empty section over a config
// this component rejects.
export function isPlayableVideo(video) {
  if (!video) return false;
  if (video.type === 'mp4') return Boolean(video.src);
  if (video.type === 'youtube') return Boolean(video.id);
  return false;
}

function VideoEmbed({ video = demoVideo }) {
  const [playing, setPlaying] = useState(false);

  if (!isPlayableVideo(video)) return null;

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
