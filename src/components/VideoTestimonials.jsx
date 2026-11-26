// Customer video stories as a reels row: every designed cover on screen at
// once, a tap opens that video in a native <dialog> (focus trap, Escape and
// inertness for free, same pattern as PaperSheet) with the video on the left
// and the story notes (quote, highlights, CTA) on the right. The video only
// gets its src when the dialog opens, so the homepage fetches no video bytes
// until a visitor asks for one.
import { useRef, useState } from 'react';
import { Play, X, ArrowRight, BadgeCheck, CheckCircle2 } from 'lucide-react';
import { videoTestimonials, writtenTestimonials } from '../data/siteContent';
import WhatsAppCTA from './WhatsAppCTA';
import CalendarCTA from './CalendarCTA';
import { track } from '../lib/track';

function VideoTestimonials({ items = videoTestimonials, letters = writtenTestimonials }) {
  const dialog = useRef(null);
  const video = useRef(null);
  const [playing, setPlaying] = useState(null);

  if (!items || items.length === 0) return null;

  const open = (item) => {
    track('testimonial_video_play', {
      story_id: item.id,
      story_name: item.name,
      company: item.company,
    });
    setPlaying(item);
    dialog.current?.showModal?.();
    if (dialog.current) dialog.current.scrollTop = 0;
  };

  const close = () => {
    video.current?.pause?.();
    setPlaying(null);
  };

  return (
    <section className="hv3-stories" id="customer-stories" aria-label="Customer Video Stories">
      <div className="container">
        <div className="hv3-story-head reveal">
          <span className="section-label">Real Customer Stories</span>
          <h2 className="hv3-story-title">Hear from businesses that run on Takkada</h2>
          <p className="hv3-story-intro">
            Owners and teams across Gujarat, Maharashtra, Karnataka and Assam, in their own words, on what changed once their Tally was on the phone.
          </p>
        </div>

        <ul className="hv3-reels reveal">
          {items.map((item) => (
            <li key={item.id} className="hv3-reel">
              <button
                type="button"
                className="hv3-reel-cover"
                onClick={() => open(item)}
                aria-label={`Play customer testimonial video of ${item.name} from ${item.company}`}
              >
                <img
                  src={item.video.poster}
                  alt={`${item.name}, ${item.role} of ${item.company}`}
                  loading="lazy"
                  decoding="async"
                />
                {item.duration && <span className="hv3-reel-time tabular-nums">{item.duration}</span>}
                <span className="hv3-reel-play" aria-hidden="true">
                  <Play size={20} fill="currentColor" />
                </span>
              </button>
              <div>
                <p className="hv3-reel-name">{item.name}</p>
                <p className="hv3-reel-company">
                  {item.role}, {item.company}
                </p>
              </div>
              {item.shortQuote && (
                <p className="hv3-reel-quote">
                  &ldquo;{item.shortQuote}&rdquo;
                  {item.quoteNote && <span className="hv3-reel-note">{item.quoteNote}</span>}
                </p>
              )}
            </li>
          ))}
        </ul>

        {letters.map((l) => (
          <figure key={l.id} className="hv3-letter reveal">
            <img className="hv3-letter-logo" src={l.logo} alt={`${l.company} logo`} loading="lazy" decoding="async" width="72" height="72" />
            <div>
              <blockquote className="hv3-letter-quote">&ldquo;{l.quote}&rdquo;</blockquote>
              <figcaption className="hv3-letter-by">
                <strong>{l.name}</strong>, {l.company}
                <span>{l.detail} &middot; {l.source}</span>
              </figcaption>
            </div>
          </figure>
        ))}

        <div className="hv3-stories-cta">
          <WhatsAppCTA context="testimonial-video">Ask how Takkada works for your business</WhatsAppCTA>
          <CalendarCTA context="testimonial-video" variant="link" className="hv3-stories-calendar-link">
            or book a <span className="tabular-nums">15-min</span> personal demo <ArrowRight size={15} />
          </CalendarCTA>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="hv3-reel-dialog"
        aria-label={playing ? `${playing.name}, ${playing.company}` : 'Customer video'}
        onClose={close}
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <form method="dialog">
          <button className="hv3-reel-close" aria-label="Close video">
            <X size={18} />
          </button>
        </form>
        {playing && (
          <div className="hv3-reel-dialog-body">
            <div className="hv3-reel-dialog-video">
              <video
                ref={video}
                key={playing.id}
                src={playing.video.src}
                poster={playing.video.poster}
                controls
                autoPlay
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="hv3-stories-card">
              <div className="hv3-reel-notes">
              <div className="hv3-stories-company-badge">
                <div className="hv3-stories-avatar" aria-hidden="true">
                  {playing.company.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </div>
                <div className="hv3-stories-meta">
                  <div className="hv3-stories-company-row">
                    <h3 className="hv3-stories-company-name">{playing.company}</h3>
                    <span className="hv3-stories-verified">
                      <BadgeCheck size={16} /> {playing.badge}
                    </span>
                  </div>
                  <p className="hv3-stories-person">
                    <strong>{playing.name}</strong> • {playing.role}
                    {playing.industry && <span> • {playing.industry}</span>}
                  </p>
                </div>
              </div>

              <blockquote className="hv3-stories-quote">
                <span className="hv3-stories-quote-mark" aria-hidden="true">&ldquo;</span>
                <p>{playing.quote}</p>
              </blockquote>

              {playing.takeaways?.length > 0 && (
                <div className="hv3-stories-takeaways">
                  <h4 className="hv3-stories-takeaways-title">Key Operational Highlights</h4>
                  <ul className="hv3-stories-takeaways-list">
                    {playing.takeaways.map((t) => (
                      <li key={t.title} className="hv3-stories-takeaway-item">
                        <CheckCircle2 size={18} className="hv3-stories-check-icon" />
                        <div>
                          <strong>{t.title}</strong>
                          <p>{t.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>

              {/* Pinned under the notes so it is never scrolled out of sight. */}
              <div className="hv3-stories-cta hv3-reel-dialog-cta">
                <WhatsAppCTA context="testimonial-video">Ask how Takkada works for your business</WhatsAppCTA>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default VideoTestimonials;
