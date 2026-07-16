export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  project?: string;
  quote: string;
  role?: string;
  /** Client photo or avatar path */
  image?: string;
  /** Company logo path */
  logo?: string;
  /** When true, shown as an illustrative / anonymized sample */
  illustrative?: boolean;
}

/**
 * Replace illustrative entries with real client quotes when available.
 * Until then, names stay anonymized so the section does not look unfinished.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Founder',
    company: 'Early-stage SaaS',
    project: 'AI SaaS Dashboard',
    quote:
      'David delivered a production-ready SaaS platform in record time. His attention to detail and ability to integrate complex AI features made our MVP launch seamless.',
    role: 'Product lead',
    image: '/images/testimonials/placeholder-avatar.svg',
    illustrative: true,
  },
  {
    id: 'testimonial-2',
    name: 'Product Manager',
    company: 'Finance team',
    project: 'Finance Tracker App',
    quote:
      'The finance tracker David built exceeded expectations. Real-time synchronization works flawlessly, and the UI is intuitive. Clear communication throughout the project.',
    role: 'Client partner',
    image: '/images/testimonials/placeholder-avatar.svg',
    illustrative: true,
  },
  {
    id: 'testimonial-3',
    name: 'Marketing Director',
    company: 'BaxAuto',
    project: 'Marketing Website',
    quote:
      'David created a fast, SEO-friendly website that matches our brand. The launch improved our online presence and gave us a clearer path for inbound interest.',
    role: 'Marketing',
    logo: '/images/testimonials/placeholder-avatar.svg',
    illustrative: true,
  },
];
