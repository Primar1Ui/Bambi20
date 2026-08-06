/** Canonical production URL. Use everywhere for SEO, OG, sitemap, and RSS. */
export const SITE_URL = 'https://mymainportfolio-one.vercel.app';

export const SITE_LEGAL_NAME = 'Oluwatosin David';
export const SITE_BRAND = 'Bambi20';
export const SITE_NAME = 'Bambi20 Portfolio';
export const SITE_TITLE = 'Bambi20 | Full Stack Web Developer & Automation';
export const SITE_TAGLINE = 'Full stack web apps, AI integrations, and workflow automation.';
export const SITE_HERO_TAGLINE = 'Full stack  |  AI web apps  |  Automation';
export const SITE_HERO_HEADLINE = 'Full stack products that launch fast and run in production';
export const SITE_DESCRIPTION =
  'Oluwatosin David (Bambi20) builds modern web apps, Supabase backends, AI integrations, and n8n or Zapier automations for founders and small teams.';

export const SITE_EMAIL = 'davidtosin306@gmail.com';
export const SITE_GITHUB = 'https://github.com/Primar1Ui';
export const SITE_TELEGRAM = 'https://t.me/mar_gdd';

/** Optional — set NEXT_PUBLIC_LINKEDIN_URL in env to include in Person sameAs */
export const SITE_LINKEDIN = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() ?? '';

/** Primary markets for GEO signals */
export const SITE_GEO = {
  countries: ['NG', 'US', 'GB', 'CA', 'AU'],
  languages: ['en'],
  regionLabel: 'Nigeria and United States',
} as const;

export const SITE_KEYWORDS = [
  'Bambi20',
  'Oluwatosin David',
  'Full Stack Developer',
  'Next.js Developer',
  'Supabase Developer',
  'n8n Automation',
  'Zapier Automation',
  'AI Web Apps',
  'SaaS MVP Developer',
  'Web Developer Nigeria',
  'Freelance Developer',
];

export function pageTitle(page: string) {
  return `${page} | ${SITE_BRAND}`;
}

export function pageDescription(text: string) {
  return text;
}
