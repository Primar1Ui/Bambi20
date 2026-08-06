'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { portfolioStats, primaryWhatsApp } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';

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
          Dear business leader...
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-[var(--muted)]">
          I&apos;m David — a{' '}
          <strong className="font-semibold text-[var(--foreground)]">Full-Stack Developer</strong> and{' '}
          <strong className="font-semibold text-[var(--foreground)]">Automation Specialist</strong> for
          founders and teams who want clarity, direction, and a smarter way to build.
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 text-[var(--muted)]">
          For more than {portfolioStats.yearsExperience} years, I&apos;ve helped companies ship
          modern web apps, strengthen their backends with Supabase, and unlock efficiency through
          n8n and Zapier automation. My work isn&apos;t about hype or guesswork — it&apos;s about{' '}
          <strong className="font-semibold text-[var(--foreground)]">giving you the technical clarity</strong> and{' '}
          <strong className="font-semibold text-[var(--foreground)]">execution</strong> you need to move forward
          with confidence.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('home-bio')}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 text-white text-sm sm:text-base font-semibold uppercase tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-solid)]"
          >
            Connect on WhatsApp
            <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 sm:px-8 py-3 border border-[var(--border)] text-[var(--muted-strong)] hover:text-[var(--foreground)] hover:border-blue-500/50 text-sm sm:text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface-solid)]"
          >
            All contact options
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
