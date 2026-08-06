import {
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GEO,
  SITE_GITHUB,
  SITE_LEGAL_NAME,
  SITE_LINKEDIN,
  SITE_TELEGRAM,
  SITE_TITLE,
  SITE_URL,
} from '@/lib/site';

export type BreadcrumbItem = {
  label: string;
  path: string;
};

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

export function personSameAs(): string[] {
  const links = [SITE_GITHUB, SITE_TELEGRAM];
  if (SITE_LINKEDIN) {
    links.push(SITE_LINKEDIN);
  }
  return links;
}

export function authorPersonSchema() {
  return {
    '@type': 'Person',
    name: SITE_LEGAL_NAME,
    alternateName: SITE_BRAND,
    url: SITE_URL,
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_LEGAL_NAME,
    alternateName: SITE_BRAND,
    jobTitle: 'Full Stack Web Developer',
    url: SITE_URL,
    email: `mailto:${SITE_EMAIL}`,
    sameAs: personSameAs(),
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
    author: authorPersonSchema(),
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
    founder: authorPersonSchema(),
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_BRAND,
    alternateName: SITE_LEGAL_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    email: SITE_EMAIL,
    image: `${SITE_URL}/images/og-image.png`,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NG',
    },
    areaServed: SITE_GEO.countries.map((code) => ({
      '@type': 'Country',
      name: code,
    })),
    founder: authorPersonSchema(),
    sameAs: personSameAs(),
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

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  const trail = [{ label: 'Home', path: '/' }, ...items.filter((item) => item.path !== '/')];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.path === '/' ? SITE_URL : `${SITE_URL}${item.path}`,
    })),
  };
}

export function blogPostingSchema(post: {
  title: string;
  description: string;
  date: string;
  slug: string;
  tags: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: authorPersonSchema(),
    publisher: {
      '@type': 'Organization',
      name: SITE_BRAND,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    image: `${SITE_URL}/images/og-image.png`,
    keywords: post.tags.join(', '),
  };
}
