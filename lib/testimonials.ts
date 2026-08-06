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

export interface FeedbackScreenshot {
  id: string;
  client: string;
  caption: string;
  image: string;
  alt: string;
}

/**
 * Replace illustrative entries with real client quotes when available.
 * Until then, names stay anonymized so the section does not look unfinished.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-camjroberts',
    name: 'CamJRoberts',
    company: 'coachcameron · Fiverr',
    project: 'Email & Automation Setup',
    quote:
      'David is an amazing freelancer. When it comes to setting up mailboxes for your inbound, outbound, and automated emails - he is the guy you want to hire. Very professional. Very helpful. Polite and listens to your concerns. HIGHLY RECOMMENDED',
    role: 'Client',
  },
  {
    id: 'testimonial-morgan',
    name: 'Morgan',
    company: 'morgangao1999 · Fiverr',
    project: 'Email Leads and Enrichment',
    quote: "The processing speed is very fast — it's great.",
    role: 'Client',
  },
];

export const feedbackScreenshots: FeedbackScreenshot[] = [
  {
    id: 'coachcameron-review',
    client: 'coachcameron',
    caption: '5-star Fiverr review — email & automation setup',
    image: '/images/testimonials/coachcameron-review.png',
    alt: 'Fiverr 5-star review from coachcameron praising David for mailbox and email automation work',
  },
  {
    id: 'morgangao1999-review',
    client: 'morgangao1999',
    caption: '4-star Fiverr review — fast delivery',
    image: '/images/testimonials/morgangao1999-review.png',
    alt: 'Fiverr 4-star review from morgangao1999 noting fast processing speed',
  },
];
