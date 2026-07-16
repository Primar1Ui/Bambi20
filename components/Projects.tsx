'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MessageCircle, Briefcase, Search } from 'lucide-react';
import { projects, whatsappContacts } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';

const allTags = Array.from(new Set(projects.flatMap((p) => p.tech))).sort();

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    let list =
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.tech.includes(activeFilter));
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

  const scrollToContact = () => {
    trackFunnel.contactCtaClick('projects');
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4" />
          <a
            href="/case-studies"
            onClick={() => trackFunnel.projectsViewCaseStudies()}
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded px-2 py-1"
          >
            View detailed case studies →
          </a>
        </motion.div>

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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden />
            <input
              id="project-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-900/50 border border-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-colors"
              aria-label="Search projects"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 justify-center mb-10"
        >
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              activeFilter === 'all'
                ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                activeFilter === tag
                  ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                  : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:border-gray-600 hover:text-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

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
                {/* Project Links */}
                <div className="flex flex-col sm:flex-row gap-2">
                  {project.live && project.live !== '#' && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackFunnel.projectViewLive(project.title)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>View Live</span>
                    </a>
                  )}
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackFunnel.projectViewCode(project.title)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-gray-100 font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>View Code</span>
                    </a>
                  )}
                  {(!project.live || project.live === '#') && (!project.github || project.github === '#') && (
                    <button
                      onClick={scrollToContact}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                    >
                      <Briefcase className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Discuss a Similar Project</span>
                    </button>
                  )}
                </div>
                
                {/* WhatsApp Buttons */}
                <div className="flex gap-2">
                  {whatsappContacts.map((contact) => (
                    <a
                      key={contact.id}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackFunnel.whatsappClick(`projects-${contact.id}`)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
                      aria-label={`WhatsApp ${contact.label}`}
                    >
                      <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium">{contact.countryCode}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

