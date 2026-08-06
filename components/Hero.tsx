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
    <section
      id="home"
      className="relative overflow-hidden bg-[#0a1424]"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(30,64,175,0.22),transparent_55%),radial-gradient(ellipse_at_20%_60%,rgba(15,23,42,0.5),transparent_45%),radial-gradient(ellipse_at_80%_70%,rgba(37,99,235,0.12),transparent_40%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_25%,rgba(147,197,253,0.08)_0%,transparent_35%),radial-gradient(circle_at_70%_35%,rgba(59,130,246,0.06)_0%,transparent_30%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
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
            className="w-full max-w-[min(480px,88vw)] sm:max-w-[min(620px,78vw)] md:max-w-[min(700px,68vw)] h-auto drop-shadow-[0_12px_48px_rgba(0,0,0,0.45)]"
          />
        </motion.div>

        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.15, duration: 0.5 }}
          className="mt-4 sm:mt-5 md:mt-6 w-full max-w-5xl px-2 sm:px-4 text-center font-[Oswald,sans-serif] font-bold uppercase tracking-[0.04em] sm:tracking-wide text-white leading-[1.12] text-balance"
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
