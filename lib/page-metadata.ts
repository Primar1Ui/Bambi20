import type { Metadata } from 'next';
import { SITE_BRAND, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site';

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
};

export function createPageMetadata({ title, description, path = '' }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = `${title} | ${SITE_BRAND}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_TITLE,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

export const defaultKeywords = [
  'Bambi20',
  'Oluwatosin David',
  'full stack developer',
  'Next.js',
  'Supabase',
  'automation',
];

export { SITE_DESCRIPTION };
