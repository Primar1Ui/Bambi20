'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { homepageSelectedAutomations } from '@/lib/automations';
import { projects } from '@/lib/data';

const homepageWebApps = projects.filter((project) =>
  ['Portfolio Website', 'BaxAuto Website'].includes(project.title)
);

const selectedWork = [
  ...homepageSelectedAutomations.map((automation) => ({
    title: automation.title,
    description: automation.description,
    tech: automation.tags,
    image: automation.image,
    imageAlt: automation.alt,
    eyebrow: automation.tags[0],
    href: '/automation',
    cta: 'View automation details',
  })),
  ...homepageWebApps.map((project) => ({
    title: project.title,
    description: project.description,
    tech: project.tech,
    image: project.image ?? '/images/projects/placeholder.svg',
    imageAlt: `${project.title} preview`,
    eyebrow:
      'metrics' in project && Array.isArray(project.metrics)
        ? project.metrics[0]
        : project.tech[0],
    href: '/projects',
    cta: 'View project details',
  })),
];

export default function HomeSelectedWork() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-[var(--background)]"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wide mb-2">
            Selected Work
          </p>
          <h2 id="selected-work-heading" className="text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Production apps and automation systems
          </h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Real shipped work: web apps, Supabase backends, and n8n or Zapier workflows, not mockups.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {selectedWork.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
              className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] overflow-hidden hover:border-blue-500/40 transition-colors"
            >
              <div className="relative aspect-video bg-[var(--surface)]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                {item.eyebrow && (
                  <p className="text-xs font-medium text-[var(--muted)] mb-2">{item.eyebrow}</p>
                )}
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {item.tech.slice(0, 4).map((tag) => (
                    <li
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md border border-[var(--border)] text-[var(--muted-strong)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-500 hover:text-blue-400 transition-colors"
                >
                  {item.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] border border-[var(--border)] rounded-lg px-5 py-2.5 hover:bg-[var(--surface-solid)] transition-colors"
          >
            See all projects
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/automation"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] border border-[var(--border)] rounded-lg px-5 py-2.5 hover:bg-[var(--surface-solid)] transition-colors"
          >
            See all automations
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
