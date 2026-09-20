import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

// ── The demo call ──
// The one thing on the AI calling page a reader can check for themselves, so
// it is a player and not a quote. Three decisions worth keeping:
//
// 1. The bars are this recording. `peaks` is read off the file (RMS per 64
//    buckets) and baked into the page data, so the quiet gaps in the picture
//    are the gaps where the party is speaking. A decorative waveform would
//    have been the same amount of code and a small lie.
// 2. Progress is a clip-path on a second, coloured copy of the same bars.
//    One property animates on one element; the 64 bars are never re-rendered
//    as the clip moves, which is what keeps it smooth while the tab is busy.
// 3. Nothing is fetched until somebody presses play (`preload="none"`), and
//    the bar animation stops dead when it is paused, because motion with no
//    sound behind it reads as a page that is stuck.
const SEEK_STEP_SECONDS = 5;

const clock = (seconds) => {
  const whole = Math.max(0, Math.floor(seconds || 0));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, '0')}`;
};

export default function CallPlayer({ listen }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  const total = listen.duration;
  const played = Math.min(1, total ? elapsed / total : 0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return undefined;
    const onTime = () => setElapsed(audio.currentTime);
    const onEnd = () => { setPlaying(false); setElapsed(0); audio.currentTime = 0; };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('play', () => setPlaying(true));
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play()?.catch(() => setPlaying(false));
    else audio.pause();
  };

  const seekTo = (seconds) => {
    const audio = audioRef.current;
    const next = Math.min(total, Math.max(0, seconds));
    setElapsed(next);
    if (audio) audio.currentTime = next;
  };

  const seekFromPointer = (event) => {
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width) return;
    seekTo(((event.clientX - box.left) / box.width) * total);
  };

  const onSeekKey = (event) => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowUp') seekTo(elapsed + SEEK_STEP_SECONDS);
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') seekTo(elapsed - SEEK_STEP_SECONDS);
    else if (event.key === 'Home') seekTo(0);
    else if (event.key === 'End') seekTo(total);
    else return;
    event.preventDefault();
  };

  const bars = (tone) =>
    listen.peaks.map((peak, i) => (
      <span
        key={`${tone}-${i}`}
        className="call-player-bar"
        style={{ height: `${Math.round(peak * 100)}%`, '--bar': i }}
      />
    ));

  return (
    <div className={`call-player${playing ? ' playing' : ''}`}>
      <audio ref={audioRef} src={listen.src} preload="none" />
      <button
        type="button"
        className="call-player-play"
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause the recording' : 'Play the recording'}
      >
        {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
      </button>

      <div
        className="call-player-wave"
        role="slider"
        tabIndex={0}
        aria-label="Seek within the recording"
        aria-valuemin={0}
        aria-valuemax={Math.round(total)}
        aria-valuenow={Math.round(elapsed)}
        aria-valuetext={`${clock(elapsed)} of ${clock(total)}`}
        onClick={seekFromPointer}
        onKeyDown={onSeekKey}
      >
        <div className="call-player-track">{bars('rest')}</div>
        <div className="call-player-track played" style={{ '--played': `${played * 100}%` }}>
          {bars('played')}
        </div>
      </div>

      <p className="call-player-time">
        <span>{clock(elapsed)}</span>
        <span aria-hidden="true"> / </span>
        <span>{clock(total)}</span>
      </p>
    </div>
  );
}
