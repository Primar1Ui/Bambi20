import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Services from '@/components/Services';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services | David — Full-Stack & AI Web Developer',
  description:
    'Services offered by David — full-stack development, SaaS MVPs, Supabase backends, AI integrations, and workflow automation.',
  openGraph: {
    title: 'Services | David — Full-Stack & AI Web Developer',
    description:
      'Services offered by David — full-stack development, SaaS MVPs, Supabase backends, AI integrations, and workflow automation.',
    url: `${SITE_URL}/services`,
  },
};

export default function ServicesPage() {
  return (
    <PageShell>
      <Services />
    </PageShell>
  );
}
