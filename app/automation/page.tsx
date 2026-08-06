import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import AutomationShowcase from '@/components/AutomationShowcase';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Automation | David — n8n & Zapier Workflows',
  description:
    'Explore David\'s workflow automation builds — n8n, Zapier, AI customer support, appointment booking, and more.',
  openGraph: {
    title: 'Automation | David — n8n & Zapier Workflows',
    description:
      'Explore David\'s workflow automation builds — n8n, Zapier, AI customer support, appointment booking, and more.',
    url: `${SITE_URL}/automation`,
  },
};

export default function AutomationPage() {
  return (
    <PageShell>
      <AutomationShowcase />
    </PageShell>
  );
}
