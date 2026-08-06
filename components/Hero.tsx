'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { portfolioStats } from '@/lib/data';
import {
  SITE_BRAND,
  SITE_LEGAL_NAME,
  SITE_HERO_TAGLINE,
  SITE_HERO_HEADLINE,
} from '@/lib/site';

const TECH_STACK = 'Next.js · Supabase · React · n8n · Zapier';

const heroStats = [
  { value: `${portfolioStats.projects}+`, label: 'Shipped projects' },
  { value: `${portfolioStats.clients}+`, label: 'Happy clients' },
  { value: `${portfolioStats.yearsExperience}+`, label: 'Years experience' },
];

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="home" className="relative bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            <p className="text-sm font-medium text-[var(--muted)] mb-4">
              {SITE_BRAND} · Full stack developer · Automation
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.1] mb-6">
              {SITE_HERO_HEADLINE}
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-xl mb-8">
              {SITE_LEGAL_NAME}, known as {SITE_BRAND}, builds web apps, Supabase backends, and
              workflow automation with n8n and Zapier. {SITE_HERO_TAGLINE.replace(/\s*\|\s*/g, ', ')}.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                Start a project
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-solid)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              >
                View portfolio
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-4 max-w-md">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">{stat.value}</dd>
                  <dd className="text-xs sm:text-sm text-[var(--muted)] mt-1">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.5 }}
            className="mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--surface-solid)] shadow-lg">
              <div className="relative aspect-[4/5] sm:aspect-[3/4]">
                <Image
                  src="/images/oluwatosin-portrait.png"
                  alt={`${SITE_LEGAL_NAME}, ${SITE_BRAND}`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 420px"
                  className="object-cover object-top"
                />
              </div>
              <div className="px-5 py-4 border-t border-[var(--border)]">
                <p className="font-semibold text-[var(--foreground)]">{SITE_LEGAL_NAME}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{TECH_STACK}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
