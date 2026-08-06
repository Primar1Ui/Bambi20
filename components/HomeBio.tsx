'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { portfolioStats, primaryWhatsApp } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';
import { SITE_BRAND, SITE_LEGAL_NAME } from '@/lib/site';

export default function HomeBio() {
  return (
    <section
      aria-labelledby="home-bio-heading"
      className="bg-[var(--surface-solid)] border-y border-[var(--border)] py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <p id="home-bio-heading" className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-[var(--muted-strong)]">
          Hello, thanks for stopping by.
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-[var(--muted)]">
          I&apos;m {SITE_LEGAL_NAME}, known online as{' '}
          <strong className="font-semibold text-[var(--foreground)]">{SITE_BRAND}</strong>. I build
          web apps, Supabase backends, and automation workflows for founders and small teams who want
          reliable delivery without the agency overhead.
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 text-[var(--muted)]">
          Over the past {portfolioStats.yearsExperience}+ years I&apos;ve shipped client projects across
          the US and Nigeria: dashboards, SaaS tools, n8n flows, and Zapier setups that save time every
          week. If you need a developer who picks up the phone and finishes the job, you&apos;re in the
          right place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('home-bio')}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 text-white text-sm sm:text-base font-semibold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-solid)]"
          >
            Message on WhatsApp
            <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 sm:px-8 py-3 border border-[var(--border)] text-[var(--muted-strong)] hover:text-[var(--foreground)] hover:border-blue-500/50 text-sm sm:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-solid)]"
          >
            Contact page
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
