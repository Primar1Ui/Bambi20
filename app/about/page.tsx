import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import HashScroll from '@/components/HashScroll';
import About from '@/components/About';
import CurrentWork from '@/components/CurrentWork';
import Skills from '@/components/Skills';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About | David — Full-Stack & AI Web Developer',
  description:
    'Learn about David — background, current work, and technical skills across full-stack development, AI integrations, and automation.',
  openGraph: {
    title: 'About | David — Full-Stack & AI Web Developer',
    description:
      'Learn about David — background, current work, and technical skills across full-stack development, AI integrations, and automation.',
    url: `${SITE_URL}/about`,
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <HashScroll />
      <About />
      <CurrentWork />
      <Skills />
    </PageShell>
  );
}
