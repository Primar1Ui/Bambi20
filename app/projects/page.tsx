import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PageShell from '@/components/PageShell';
import ProjectSkeletonGrid from '@/components/skeletons/ProjectSkeletonGrid';
import { createPageMetadata } from '@/lib/page-metadata';

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

export const metadata: Metadata = createPageMetadata({
  title: 'Projects',
  description:
    'Portfolio of web apps, SaaS tools, AI integrations, and automation projects by Bambi20.',
  path: '/projects',
});

export default function ProjectsPage() {
  return (
    <PageShell breadcrumbs={[{ label: 'Projects', path: '/projects' }]}>
      <Projects />
    </PageShell>
  );
}
