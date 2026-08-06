import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import Services from '@/components/Services';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Services',
  description:
    'Services from Bambi20: full stack development, SaaS MVPs, Supabase backends, AI integrations, and workflow automation.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <PageShell>
      <Services />
    </PageShell>
  );
}
