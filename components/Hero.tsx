'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { SITE_BRAND, SITE_HERO_TAGLINE } from '@/lib/site';

const HEADLINE_LINES = [
  'Modern Web Apps. AI Integrations.',
  'Workflows That Scale.',
];

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--background)]"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,var(--page-glow),transparent_60%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 text-center">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
        >
          <Image
            src="/images/logo-bambi20.svg"
            alt={`B20 ${SITE_BRAND}`}
            width={220}
            height={48}
            priority
            className="h-11 sm:h-12 md:h-14 w-auto mx-auto"
          />
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.1, duration: 0.5 }}
          className="mt-4 sm:mt-5 text-xs sm:text-sm md:text-base font-semibold uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--muted)]"
        >
          {SITE_HERO_TAGLINE}
        </motion.p>

        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.15, duration: 0.5 }}
          className="mt-6 sm:mt-8 w-full max-w-5xl px-2 sm:px-4 font-[Oswald,sans-serif] font-bold uppercase tracking-[0.04em] sm:tracking-wide text-[var(--foreground)] leading-[1.12] text-balance"
        >
          {HEADLINE_LINES.map((line, index) => (
            <span
              key={line}
              className={`block ${
                index === 0
                  ? 'text-base leading-snug sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.65rem]'
                  : 'text-[1.35rem] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3rem] mt-1 sm:mt-1.5 md:mt-2'
              }`}
            >
              {line}
            </span>
          ))}
        </motion.h1>
      </div>
    </section>
  );
}
