import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PageShell from '@/components/PageShell';
import ProjectSkeletonGrid from '@/components/skeletons/ProjectSkeletonGrid';
import { SITE_URL } from '@/lib/site';

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => (
    <section
      id="projects"
      aria-busy="true"
      aria-label="Loading projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <ProjectSkeletonGrid count={6} />
      </div>
    </section>
  ),
});

export const metadata: Metadata = {
  title: 'Projects | David — Full-Stack & AI Web Developer',
  description:
    'Browse David\'s portfolio of web apps, SaaS products, AI integrations, and automation projects.',
  openGraph: {
    title: 'Projects | David — Full-Stack & AI Web Developer',
    description:
      'Browse David\'s portfolio of web apps, SaaS products, AI integrations, and automation projects.',
    url: `${SITE_URL}/projects`,
  },
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <Projects />
    </PageShell>
  );
}
