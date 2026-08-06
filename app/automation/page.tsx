import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AutomationShowcase from '@/components/AutomationShowcase';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Automation',
  description:
    'n8n and Zapier workflow builds by Bambi20: AI customer support, appointment booking, lead routing, and content automation.',
  path: '/automation',
});

export default function AutomationPage() {
  return (
    <PageShell breadcrumbs={[{ label: 'Automation', path: '/automation' }]}>
      <AutomationShowcase />
    </PageShell>
  );
}
