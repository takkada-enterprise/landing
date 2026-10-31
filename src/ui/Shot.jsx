import { screen as lookup } from '../data/screens';

// The registry image, whole. screen() throws on an unknown slug.
// fetchPriority is for a page's LCP picture only (the feature hero):
// stripImagePreloads keeps the preload of an img that asks for "high".
export default function Shot({ screen, sizes, eager = false, fetchPriority, className }) {
  const s = lookup(screen);
  return (
    <img
      className={`ui-shot${className ? ` ${className}` : ''}`}
      data-screen={s.slug}
      src={s.src}
      srcSet={s.srcSet}
      sizes={sizes}
      width={s.width}
      height={s.height}
      alt={s.alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}
