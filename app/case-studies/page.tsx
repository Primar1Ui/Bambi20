import { Metadata } from 'next';
import PageShell from '@/components/PageShell';
import CaseStudyCard from '@/components/CaseStudyCard';
import { caseStudies } from '@/lib/caseStudies';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Case Studies | David - Full-Stack Developer',
  description:
    'Detailed case studies showcasing my development projects, problem-solving approach, and results. Explore how I build modern web applications and SaaS products.',
  openGraph: {
    title: 'Case Studies | David - Full-Stack Developer',
    description:
      'Detailed case studies showcasing my development projects, problem-solving approach, and results.',
    url: `${SITE_URL}/case-studies`,
  },
};

export default function CaseStudiesPage() {
  return (
    <PageShell>
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded px-2 py-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Case <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Studies</span>
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Detailed breakdowns of my projects, showcasing the problems I solved,
              the approaches I took, and the results achieved.
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
                Interested in Working Together?
              </h2>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                Let&apos;s discuss how I can help bring your project to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                >
                  Get In Touch
                </Link>
                <Link
                  href="/projects"
                  className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-xl font-semibold text-gray-100 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
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
