import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import HireLanding from '@/components/HireLanding';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Hire Me',
  description:
    'Hire Oluwatosin David (Bambi20) for web apps, SaaS MVPs, Supabase backends, and n8n or Zapier automation. Clear scope, fast replies, production-ready delivery.',
  path: '/hire',
});

export default function HirePage() {
  return (
    <PageShell breadcrumbs={[{ label: 'Hire Me', path: '/hire' }]}>
      <HireLanding />
    </PageShell>
  );
}
