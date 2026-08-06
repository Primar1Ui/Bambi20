'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const HEADLINE_LINES = [
  'Modern Web Apps. AI Integrations.',
  'Workflows That Scale.',
];

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 md:pb-16">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          <Image
            src="/images/hero-brand-cutout.png"
            alt="David — full-stack, AI web apps, and automation"
            width={960}
            height={540}
            priority
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 72vw, 720px"
            className="w-full max-w-[min(520px,86vw)] sm:max-w-[min(640px,80vw)] md:max-w-[min(720px,72vw)] h-auto"
          />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.15, duration: 0.5 }}
          className="mt-3 sm:mt-4 md:mt-5 w-full max-w-5xl px-1 sm:px-2 text-center font-[Oswald,sans-serif] font-bold uppercase tracking-[0.04em] sm:tracking-wide text-white leading-[1.12] text-balance"
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
