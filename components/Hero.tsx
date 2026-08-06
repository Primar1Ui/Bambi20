'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#070f1c]"
    >
      <div className="relative z-10 flex flex-col items-center justify-center px-3 sm:px-6 pt-20 sm:pt-24 md:pt-28 pb-10 sm:pb-14 md:pb-16">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
          className="w-full flex justify-center"
        >
          <Image
            src="/images/hero-brand.png"
            alt="David — full-stack, AI web apps, and automation"
            width={960}
            height={540}
            priority
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 78vw, 760px"
            className="w-full max-w-[min(520px,92vw)] sm:max-w-[min(660px,82vw)] md:max-w-[min(760px,72vw)] h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}
