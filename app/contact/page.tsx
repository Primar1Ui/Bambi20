import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact | David — Full-Stack & AI Web Developer',
  description:
    'Get in touch with David for full-stack development, SaaS builds, AI integrations, and workflow automation projects.',
  openGraph: {
    title: 'Contact | David — Full-Stack & AI Web Developer',
    description:
      'Get in touch with David for full-stack development, SaaS builds, AI integrations, and workflow automation projects.',
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
      <Newsletter />
    </PageShell>
  );
}
