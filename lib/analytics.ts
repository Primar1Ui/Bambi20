/**
 * Analytics utility for tracking user interactions and conversion funnel.
 * Uses @vercel/analytics track() when available.
 */

import { track } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'view_projects'
  | 'view_case_studies'
  | 'download_cv'
  | 'contact_form_submit'
  | 'contact_form_success'
  | 'contact_form_error'
  | 'contact_cta_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'telegram_click'
  | 'github_click'
  | 'linkedin_click'
  | 'project_view_live'
  | 'project_view_code';

/**
 * Track an analytics event.
 * Analytics failures must never break the app.
 */
export function trackEvent(
  event: AnalyticsEvent,
  properties?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;

  try {
    track(event, properties);

    if (window.gtag) {
      window.gtag('event', event, properties);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event, properties);
    }
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

/**
 * Track conversion funnel steps
 */
export const trackFunnel = {
  heroViewProjects: () => trackEvent('view_projects', { source: 'hero' }),
  heroDownloadCV: () => trackEvent('download_cv', { source: 'hero' }),
  projectsViewCaseStudies: () => trackEvent('view_case_studies', { source: 'projects' }),
  projectViewLive: (projectTitle: string) =>
    trackEvent('project_view_live', { project: projectTitle }),
  projectViewCode: (projectTitle: string) =>
    trackEvent('project_view_code', { project: projectTitle }),
  contactFormSubmit: () => trackEvent('contact_form_submit'),
  contactFormSuccess: () => trackEvent('contact_form_success'),
  contactFormError: (errorType: string) =>
    trackEvent('contact_form_error', { errorType }),
  contactCtaClick: (source: string) => trackEvent('contact_cta_click', { source }),
  whatsappClick: (source: string) => trackEvent('whatsapp_click', { source }),
  emailClick: (source: string) => trackEvent('email_click', { source }),
  telegramClick: (source: string) => trackEvent('telegram_click', { source }),
  githubClick: (source: string) => trackEvent('github_click', { source }),
  linkedinClick: (source: string) => trackEvent('linkedin_click', { source }),
};

declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}
