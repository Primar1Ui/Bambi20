'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#040810]"
    >
      {/* Bokeh depth — matches the asset edges on wide viewports */}
      <div
        className="absolute inset-0 opacity-90 bg-[radial-gradient(ellipse_at_18%_22%,rgba(37,99,235,0.22),transparent_42%),radial-gradient(ellipse_at_82%_18%,rgba(59,130,246,0.16),transparent_38%),radial-gradient(ellipse_at_50%_88%,rgba(15,23,42,0.95),transparent_55%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_12%_40%,rgba(96,165,250,0.12)_0%,transparent_28%),radial-gradient(circle_at_88%_55%,rgba(59,130,246,0.1)_0%,transparent_24%),radial-gradient(circle_at_45%_30%,rgba(147,197,253,0.08)_0%,transparent_32%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-center justify-center px-4 sm:px-6 pt-24 md:pt-28 pb-10 md:pb-14 min-h-[min(88vh,920px)]">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
          className="relative w-full max-w-[min(920px,92vw)] aspect-[16/10] sm:aspect-[16/9]"
        >
          <h1 className="sr-only">David — Full-Stack, AI Web Apps, Automation</h1>
          <Image
            src="/images/hero-brand.png"
            alt="David — metallic logo, full-stack, AI web apps, and automation"
            fill
            priority
            sizes="(max-width: 768px) 92vw, 920px"
            className="object-contain object-center drop-shadow-[0_24px_80px_rgba(0,0,0,0.55)]"
          />
        </motion.div>
      </div>
    </section>
  );
}
