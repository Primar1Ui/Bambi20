import type { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import HashScroll from '@/components/HashScroll';
import About from '@/components/About';
import CurrentWork from '@/components/CurrentWork';
import Skills from '@/components/Skills';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description:
    'About Oluwatosin David (Bambi20): full stack developer background, current work, and technical skills.',
  path: '/about',
});

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
