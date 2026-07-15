import type { Metadata } from "next";

// Production origin used to build absolute URLs for Open Graph / Twitter cards.
// Set NEXT_PUBLIC_SITE_URL to the real deployed domain; the fallback is a placeholder.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nikkimishra.com";
export const SITE_NAME = "Niharika Mishra";

/**
 * Builds per-case-study metadata (title, description, canonical, OG + Twitter cards).
 * Each slug expects a matching 1200×630 card at /public/og/<slug>.jpg.
 */
export function caseStudyMetadata(opts: {
  title: string;
  description: string;
  slug: string;
}): Metadata {
  const { title, description, slug } = opts;
  const fullTitle = `${title} · ${SITE_NAME}`;
  const url = `/case-study/${slug}`;
  const ogImage = `/og/${slug}.jpg`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "article",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — case study by ${SITE_NAME}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
}
