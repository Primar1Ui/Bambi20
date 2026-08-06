import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import PageShell from '@/components/PageShell';
import { TestimonialSkeletonGrid } from '@/components/skeletons/TestimonialSkeleton';
import { SITE_URL } from '@/lib/site';

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

export const metadata: Metadata = {
  title: 'Testimonials | David — Client Reviews',
  description:
    'Verified client testimonials and Fiverr feedback for David — full-stack developer and automation specialist.',
  openGraph: {
    title: 'Testimonials | David — Client Reviews',
    description:
      'Verified client testimonials and Fiverr feedback for David — full-stack developer and automation specialist.',
    url: `${SITE_URL}/testimonials`,
  },
};

export default function TestimonialsPage() {
  return (
    <PageShell>
      <Testimonials />
    </PageShell>
  );
}
