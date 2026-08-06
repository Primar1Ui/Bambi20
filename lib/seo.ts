import {
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GEO,
  SITE_GITHUB,
  SITE_LEGAL_NAME,
  SITE_TELEGRAM,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

export const homeFaqs = [
  {
    question: 'Who is Bambi20?',
    answer:
      'Bambi20 is the brand of Oluwatosin David, a full stack developer who builds web apps, Supabase backends, and automation workflows for clients in Nigeria, the United States, and worldwide.',
  },
  {
    question: 'What services does Bambi20 offer?',
    answer:
      'Full stack development, SaaS MVPs, Supabase setup, AI app integrations, n8n and Zapier automation, bug fixes, and ongoing support for production apps.',
  },
  {
    question: 'How do I hire Oluwatosin David?',
    answer:
      'Use the contact page to send a message, email davidtosin306@gmail.com, or reach out on WhatsApp. Most enquiries get a reply within 24 hours.',
  },
  {
    question: 'Does Bambi20 work with international clients?',
    answer:
      'Yes. Projects are delivered remotely for clients in Nigeria, the United States, the UK, Canada, Australia, and other regions.',
  },
];

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_LEGAL_NAME,
    alternateName: SITE_BRAND,
    jobTitle: 'Full Stack Web Developer',
    url: SITE_URL,
    email: `mailto:${SITE_EMAIL}`,
    sameAs: [SITE_GITHUB, SITE_TELEGRAM],
    knowsAbout: [
      'Next.js',
      'React',
      'Supabase',
      'Tailwind CSS',
      'AI Integration',
      'n8n Workflow Automation',
      'Zapier Automation',
      'SaaS MVP Development',
    ],
    nationality: {
      '@type': 'Country',
      name: 'Nigeria',
    },
    workLocation: [
      { '@type': 'Country', name: 'Nigeria' },
      { '@type': 'Country', name: 'United States' },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_TITLE,
    alternateName: SITE_BRAND,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_GEO.languages,
    author: {
      '@type': 'Person',
      name: SITE_LEGAL_NAME,
      alternateName: SITE_BRAND,
    },
  };
}

export function professionalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_BRAND,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    email: SITE_EMAIL,
    areaServed: SITE_GEO.countries.map((code) => ({
      '@type': 'Country',
      name: code,
    })),
    serviceType: [
      'Full Stack Web Development',
      'SaaS MVP Development',
      'Workflow Automation',
      'AI Application Integration',
    ],
    founder: {
      '@type': 'Person',
      name: SITE_LEGAL_NAME,
    },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
