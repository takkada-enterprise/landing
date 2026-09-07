import { Head } from 'vite-react-ssg';
import { absoluteUrl, DEFAULT_OG_IMAGE } from '../data/schema';

function Seo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  schemas = [],
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
}) {
  if (title && title.length > 60) {
    console.warn(`[Seo] title over 60 chars (${title.length}): ${title}`);
  }
  if (description && description.length > 160) {
    console.warn(`[Seo] description over 160 chars (${description.length}): ${description}`);
  }
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(ogImage);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robots} />
      <meta name="theme-color" content="#0b0f19" />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Takkada" />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.filter(Boolean).map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Head>
  );
}

export default Seo;
