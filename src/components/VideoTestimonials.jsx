import { useState, useRef } from 'react';
import { Play, Pause, BadgeCheck, Clock, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { videoTestimonials } from '../data/siteContent';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import { track } from '../lib/track';

function VideoTestimonials({ items = videoTestimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  // Started, not playing: once the visitor presses Watch Story the poster stays
  // gone, so a pause leaves the frame and the scrub bar in place. The poster
  // only returns when the video ends or another story is picked.
  const [started, setStarted] = useState(false);
  const videoRef = useRef(null);

  if (!items || items.length === 0) return null;

  const current = items[activeIndex] || items[0];

  const handlePlayClick = () => {
    track('testimonial_video_play', {
      story_id: current.id,
      story_name: current.name,
      company: current.company,
    });
    setStarted(true);
    if (videoRef.current) {
      const playPromise = videoRef.current.play?.();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay may be restricted in some browsers without user interaction
        });
      }
    }
  };

  const handleVideoEnded = () => {
    setStarted(false);
  };

  const handleSelectStory = (index) => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setStarted(false);
    setActiveIndex(index);
  };

  return (
    <section className="hv3-stories" id="customer-stories" aria-label="Customer Video Stories">
      <div className="container">
        <div className="hv3-story-head reveal">
          <span className="section-label">Real Distributor Stories</span>
          <h2 className="hv3-story-title">Hear from distributors who run on Takkada</h2>
          <p className="hv3-story-intro">
            Real owners, real numbers. Watch how Meet Patel, Owner of Dhanlaxmi Crop Science Limited, uses Takkada to automate
            bank statement reconciliation, send smart WhatsApp payment reminders, and track seasonal distribution.
          </p>
        </div>

        {items.length > 1 && (
          <div className="hv3-stories-nav reveal" role="tablist" aria-label="Select customer story">
            {items.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeIndex === idx}
                className={`hv3-stories-tab${activeIndex === idx ? ' hv3-stories-tab--active' : ''}`}
                onClick={() => handleSelectStory(idx)}
              >
                <span className="hv3-stories-tab-name">{item.name}</span>
                <span className="hv3-stories-tab-company">{item.company}</span>
              </button>
            ))}
          </div>
        )}

        <div className="hv3-stories-grid reveal">
          {/* ── Left Column: Video Player Card ── */}
          <div className="hv3-stories-player-col">
            <div className="hv3-stories-video-frame">
              {!started && (
                <div className="hv3-stories-poster-overlay">
                  {current.video.poster && (
                    <img
                      src={current.video.poster}
                      alt={`${current.name}, ${current.role} of ${current.company}`}
                      className="hv3-stories-poster-img"
                      loading="lazy"
                    />
                  )}
                  <div className="hv3-stories-poster-gradient" />

                  {/* Top tags */}
                  <div className="hv3-stories-poster-top">
                    <span className="hv3-stories-chip">
                      <Building2 size={13} /> {current.company}
                    </span>
                    <span className="hv3-stories-chip hv3-stories-chip--time">
                      <Clock size={13} /> {current.duration}
                    </span>
                  </div>

                  {/* Play button */}
                  <button
                    type="button"
                    className="hv3-stories-play-btn"
                    onClick={handlePlayClick}
                    aria-label={`Play customer testimonial video of ${current.name} from ${current.company}`}
                  >
                    <span className="hv3-stories-play-ring" aria-hidden="true" />
                    <span className="hv3-stories-play-icon" aria-hidden="true">
                      <Play size={28} fill="currentColor" />
                    </span>
                    <span className="hv3-stories-play-label">Watch Story</span>
                  </button>

                  {/* Bottom caption on poster */}
                  <div className="hv3-stories-poster-bottom">
                    <span className="hv3-stories-poster-name">{current.name}</span>
                    <span className="hv3-stories-poster-role">
                      {current.role}, {current.company}
                    </span>
                  </div>
                </div>
              )}

              {/* preload="none" and no poster attribute: the overlay above is the
                  poster (and lazy), so the homepage fetches no video bytes until
                  the visitor taps Watch Story. */}
              <video
                ref={videoRef}
                src={current.video.src}
                controls={started}
                playsInline
                preload="none"
                className={`hv3-stories-video${started ? ' hv3-stories-video--active' : ''}`}
                onEnded={handleVideoEnded}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* ── Right Column: Story Narrative & Proof ── */}
          <div className="hv3-stories-details-col">
            <div className="hv3-stories-card">
              <div className="hv3-stories-company-badge">
                <div className="hv3-stories-avatar" aria-hidden="true">
                  {current.company.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div className="hv3-stories-meta">
                  <div className="hv3-stories-company-row">
                    <h3 className="hv3-stories-company-name">{current.company}</h3>
                    <span className="hv3-stories-verified">
                      <BadgeCheck size={16} /> {current.badge}
                    </span>
                  </div>
                  <p className="hv3-stories-person">
                    <strong>{current.name}</strong> • {current.role}
                    {current.industry && <span className="hv3-stories-industry"> • {current.industry}</span>}
                  </p>
                </div>
              </div>

              <blockquote className="hv3-stories-quote">
                <span className="hv3-stories-quote-mark" aria-hidden="true">&ldquo;</span>
                <p>{current.quote}</p>
              </blockquote>

              {current.takeaways && current.takeaways.length > 0 && (
                <div className="hv3-stories-takeaways">
                  <h4 className="hv3-stories-takeaways-title">Key Operational Highlights</h4>
                  <ul className="hv3-stories-takeaways-list">
                    {current.takeaways.map((item) => (
                      <li key={item.title} className="hv3-stories-takeaway-item">
                        <CheckCircle2 size={18} className="hv3-stories-check-icon" />
                        <div>
                          <strong>{item.title}</strong>
                          <p>{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="hv3-stories-cta">
                <WhatsAppCTA context="testimonial-video">
                  Ask how Takkada works for your business
                </WhatsAppCTA>
                <CalendarCTA
                  context="testimonial-video"
                  variant="link"
                  className="hv3-stories-calendar-link"
                >
                  or book a <span className="tabular-nums">15-min</span> personal demo <ArrowRight size={15} />
                </CalendarCTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoTestimonials;
