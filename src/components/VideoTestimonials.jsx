import { useRef, useState } from 'react';
import { Play, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { videoTestimonials } from '../data/siteContent';
import { Card, CardGrid, SectionHead } from '../ui';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import { track } from '../lib/track';

// Verified customer video stories, one Card per story (plan 2026-10-30-003).
// The poster is the overlay, so the page fetches no video bytes until the
// visitor taps play. The caller places this inside a Band.
function Story({ item }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const play = () => {
    track('testimonial_video_play', { story_id: item.id, story_name: item.name, company: item.company });
    setIsPlaying(true);
    const p = videoRef.current?.play?.();
    if (p && typeof p.catch === 'function') p.catch(() => {});
  };

  return (
    // The English summary, not the verbatim quote: the owner ruled 2026-10-29
    // that the site carries no Hinglish. The quote stays in the data for the
    // Review schema.
    <Card title={item.company} line={item.summary}>
      <div className="ui-video-body">
        <div className="ui-video-frame">
          {!isPlaying && (
            <>
              {item.video.poster && (
                <img
                  src={item.video.poster}
                  alt={`${item.name}, ${item.role} of ${item.company}`}
                  className="ui-video-poster"
                  loading="lazy"
                />
              )}
              <button
                type="button"
                className="ui-video-play"
                onClick={play}
                aria-label={`Play customer testimonial video of ${item.name} from ${item.company}`}
              >
                <span className="ui-video-play-disc" aria-hidden="true">
                  <Play size={22} fill="currentColor" />
                </span>
                <span className="ui-video-duration tabular-nums">{item.duration}</span>
              </button>
            </>
          )}
          <video
            ref={videoRef}
            src={item.video.src}
            controls={isPlaying}
            playsInline
            preload="none"
            className={`ui-video-player${isPlaying ? ' ui-video-player--active' : ''}`}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="ui-video-details">
          <p className="ui-video-person">
            <strong>{item.name}</strong>, {item.role}
            {item.industry && <>. {item.industry}</>}
          </p>
          <p className="ui-video-badge">
            <BadgeCheck size={16} aria-hidden="true" /> {item.badge}
          </p>
          {item.takeaways?.length > 0 && (
            <>
              <h4 className="ui-video-takeaways-title">Key Operational Highlights</h4>
              <ul className="ui-video-takeaways">
                {item.takeaways.map((t) => (
                  <li key={t.title}>
                    <CheckCircle2 size={18} aria-hidden="true" />
                    <div>
                      <strong>{t.title}</strong>
                      <p>{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="ui-video-cta">
            <WhatsAppCTA context="testimonial-video">Ask how Takkada works for your business</WhatsAppCTA>
            <CalendarCTA context="testimonial-video" />
          </div>
        </div>
      </div>
    </Card>
  );
}

function VideoTestimonials({ items = videoTestimonials }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="ui-video" id="customer-stories" role="region" aria-label="Customer Video Stories">
      <SectionHead
        title="Customer Stories"
        lead="Meet Patel of Dhanlaxmi Crop Science Limited, an NSE-listed company, on how they use Takkada."
      />
      <CardGrid cols={Math.min(2, items.length)}>
        {items.map((item) => (
          <Story key={item.id} item={item} />
        ))}
      </CardGrid>
    </div>
  );
}

export default VideoTestimonials;
