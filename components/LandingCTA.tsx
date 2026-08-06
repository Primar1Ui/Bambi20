'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Briefcase, Sparkles, User } from 'lucide-react';

const links = [
  {
    href: '/about',
    label: 'About me',
    description: 'Background, current work, and skills',
    icon: User,
  },
  {
    href: '/projects',
    label: 'View projects',
    description: 'Portfolio, case studies, and live builds',
    icon: Briefcase,
  },
  {
    href: '/automation',
    label: 'Automation work',
    description: 'n8n, Zapier, and AI workflow builds',
    icon: Sparkles,
  },
];

export default function LandingCTA() {
  return (
    <section
      aria-labelledby="explore-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-800/80"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 id="explore-heading" className="text-3xl md:text-4xl font-bold mb-3">
            Explore the{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              full portfolio
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Dive into projects, automation workflows, services, and client feedback on dedicated pages.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="group flex flex-col h-full p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
              >
                <link.icon className="w-6 h-6 text-blue-400 mb-4" aria-hidden="true" />
                <span className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                  {link.label}
                </span>
                <span className="text-sm text-gray-400 mb-4 flex-1">{link.description}</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-cyan-400">
                  Open page
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
          >
            Start a project
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
