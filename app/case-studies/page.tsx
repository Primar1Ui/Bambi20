import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CaseStudyCard from '@/components/CaseStudyCard';
import { caseStudies } from '@/lib/caseStudies';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/page-metadata';

export const metadata: Metadata = createPageMetadata({
  title: 'Case Studies',
  description:
    'Case studies from Bambi20: how web apps and automation projects were scoped, built, and delivered for clients.',
  path: '/case-studies',
});

export default function CaseStudiesPage() {
  return (
    <PageShell breadcrumbs={[{ label: 'Case Studies', path: '/case-studies' }]}>
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Case <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Studies</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Project breakdowns: the problem, what I built, and the result for the client.
            </p>
          </div>

          <div className="space-y-12">
            {caseStudies.map((caseStudy, index) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Want to work together?
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Send a short brief on the contact page and I will get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  Contact
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-gray-100 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                >
                  View Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
