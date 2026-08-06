import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description:
    'Contact Oluwatosin David (Bambi20) for full stack development, SaaS builds, AI integrations, and automation work.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageShell>
      <Contact />
      <Newsletter />
    </PageShell>
  );
}
