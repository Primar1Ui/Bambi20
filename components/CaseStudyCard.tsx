'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { CaseStudy } from '@/lib/caseStudies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export default function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {caseStudy.title}
            </h2>
            {caseStudy.client && (
              <p className="text-gray-400 text-sm">Client: {caseStudy.client}</p>
            )}
          </div>
          {caseStudy.featured && (
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Problem */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
          Problem
        </h3>
        <p className="text-gray-300 leading-relaxed">{caseStudy.problem}</p>
      </div>

      {/* Solution */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-400 mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Solution
        </h3>
        <p className="text-gray-300 leading-relaxed">{caseStudy.solution}</p>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-400"></span>
          Tech Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {caseStudy.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          Results
        </h3>
        <p className="text-gray-300 leading-relaxed mb-3">{caseStudy.results}</p>
        {caseStudy.metrics && caseStudy.metrics.length > 0 && (
          <ul className="space-y-2 mt-3">
            {caseStudy.metrics.map((metric, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                {metric}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Links */}
      {(caseStudy.github || caseStudy.live) && (
        <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-800">
          {caseStudy.github && (
            <a
              href={caseStudy.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 hover:border-blue-400 hover:text-blue-400 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm font-medium">View Code</span>
            </a>
          )}
          {caseStudy.live && caseStudy.live !== '#' && (
            <a
              href={caseStudy.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm font-medium">View Live</span>
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}
