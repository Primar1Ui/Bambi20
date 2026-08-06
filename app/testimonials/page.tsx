import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PageShell from '@/components/PageShell';
import { TestimonialSkeletonGrid } from '@/components/skeletons/TestimonialSkeleton';
import { createPageMetadata } from '@/lib/page-metadata';

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => (
    <section
      id="testimonials"
      aria-busy="true"
      aria-label="Loading testimonials"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <TestimonialSkeletonGrid count={2} />
      </div>
    </section>
  ),
});

export const metadata: Metadata = createPageMetadata({
  title: 'Testimonials',
  description:
    'Client testimonials and Fiverr reviews for Oluwatosin David (Bambi20), full stack developer and automation specialist.',
  path: '/testimonials',
});

export default function TestimonialsPage() {
  return (
    <PageShell>
      <Testimonials />
    </PageShell>
  );
}
