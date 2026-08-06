'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';

export default function FeaturedProject() {
  const featuredProject = projects.find((p) => 'featured' in p && p.featured) ?? projects[0];
  const image = featuredProject.image ?? '/images/projects/placeholder.svg';
  const metrics =
    'metrics' in featuredProject && Array.isArray(featuredProject.metrics)
      ? featuredProject.metrics
      : ['Auth & dashboard analytics', 'AI-powered features', 'Production-ready deployment'];

  return (
    <section
      id="featured-project"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--surface-solid)]/40 border-y border-[var(--border)]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">Spotlight</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Project</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden bg-gray-900/80 border border-gray-800 shadow-xl shadow-blue-500/5"
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[360px] bg-gray-800/50">
              <Image
                src={image}
                alt={`${featuredProject.title} screenshot`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {featuredProject.title}
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                {featuredProject.description}
              </p>
              {featuredProject.results && (
                <p className="text-sm text-gray-400 mb-6">
                  <span className="font-semibold text-blue-400">Impact:</span>{' '}
                  {featuredProject.results}
                </p>
              )}
              <ul className="flex flex-wrap gap-2 mb-6">
                {metrics.map((metric, i) => (
                  <li
                    key={i}
                    className="px-3 py-1.5 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  >
                    {metric}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                {featuredProject.github && featuredProject.github !== '#' && (
                  <a
                    href={featuredProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackFunnel.projectViewCode(featuredProject.title)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 font-semibold hover:border-blue-500 hover:text-blue-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                  >
                    <Github className="w-5 h-5" />
                    View Code
                  </a>
                )}
                {featuredProject.live && featuredProject.live !== '#' && (
                  <a
                    href={featuredProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackFunnel.projectViewLive(featuredProject.title)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
