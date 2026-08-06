'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, Briefcase, Search, SlidersHorizontal, ChevronDown, ExternalLink, Github } from 'lucide-react';
import { projects, primaryWhatsApp } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';
import SectionHeading from '@/components/SectionHeading';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();
const categories = Array.from(
  new Set(projects.map((p) => ('category' in p ? p.category : null)).filter(Boolean))
) as string[];

function filterButtonClass(isActive: boolean, variant: 'category' | 'tag' | 'all') {
  const active =
    variant === 'category'
      ? 'bg-purple-500/30 text-purple-300 border border-purple-500/50'
      : 'bg-blue-500/30 text-blue-300 border border-blue-500/50';
  const inactive =
    'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300';
  return `px-4 py-2 min-h-11 rounded-full text-sm font-medium capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
    isActive ? active : inactive
  }`;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeFilter !== 'all') {
      list = list.filter(
        (p) =>
          p.tech.includes(activeFilter) ||
          ('category' in p && p.category === activeFilter)
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeFilter, searchQuery]);

  const handleContactClick = () => {
    trackFunnel.contactCtaClick('projects');
  };

  const activeFilterLabel =
    activeFilter === 'all' ? 'All projects' : activeFilter;

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <SectionHeading title="Featured Projects" className="mb-4" />
          <Link
            href="/case-studies"
            onClick={() => trackFunnel.projectsViewCaseStudies()}
            className="inline-flex items-center gap-2 text-[var(--muted)] hover:text-blue-500 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded px-2 py-1"
          >
            View detailed case studies →
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto mb-6"
        >
          <label htmlFor="project-search" className="sr-only">
            Search projects by name, description, or tech
          </label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden="true" />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 min-h-11 rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors"
              aria-label="Search projects"
            />
          </div>
        </motion.div>

        <div className="mb-10">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="project-filters"
            className="md:hidden w-full flex items-center justify-between gap-3 min-h-11 px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-gray-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <span className="inline-flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Filters
              {activeFilter !== 'all' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {activeFilterLabel}
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray-400 transition-transform ${filtersOpen ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          <div
            id="project-filters"
            className={`${filtersOpen ? 'flex mt-3' : 'hidden'} md:flex flex-wrap gap-2 justify-center`}
          >
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              aria-pressed={activeFilter === 'all'}
              className={filterButtonClass(activeFilter === 'all', 'all')}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                aria-pressed={activeFilter === category}
                className={filterButtonClass(activeFilter === category, 'category')}
              >
                {category}
              </button>
            ))}
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveFilter(tag)}
                aria-pressed={activeFilter === tag}
                className={filterButtonClass(activeFilter === tag, 'tag')}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-gray-900/30 border border-gray-800">
            <p className="text-lg font-medium text-white mb-2">No projects match your search</p>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Try a different keyword or clear your filters to see the full portfolio.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
                setFiltersOpen(false);
              }}
              className="inline-flex items-center justify-center min-h-11 px-6 py-2 rounded-xl border border-gray-700 text-gray-200 font-medium hover:border-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Clear search and filters
            </button>
          </div>
        ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
            >
              {'image' in project && project.image && (
                <div className="relative w-full h-44 sm:h-48 mb-4 rounded-xl overflow-hidden bg-gray-800/50">
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              {project.results && (
                <p className="text-sm text-gray-400 mb-3">
                  <span className="font-semibold text-blue-400">Impact:</span> {project.results}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackFunnel.projectViewLive(project.title)}
                      className="flex-1 flex items-center justify-center gap-2 min-h-11 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>View Live</span>
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackFunnel.projectViewCode(project.title)}
                      className="flex-1 flex items-center justify-center gap-2 min-h-11 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <Github className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>View Code</span>
                    </a>
                  )}
                  {(!project.live || project.live === '#') && (!project.github || project.github === '#') && (
                    <Link
                      href="/contact"
                      onClick={handleContactClick}
                      className="w-full flex items-center justify-center gap-2 min-h-11 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" aria-hidden="true" />
                      <span>Discuss a Similar Project</span>
                    </Link>
                  )}
                </div>

                <a
                  href={primaryWhatsApp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackFunnel.whatsappClick('projects-card')}
                  className="w-full flex items-center justify-center gap-2 min-h-11 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                  aria-label={`WhatsApp ${primaryWhatsApp.label}`}
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span className="text-sm font-medium">Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
}
