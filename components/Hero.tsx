'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Rocket, MessageCircle, ArrowRight, Mail } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { trackFunnel } from '@/lib/analytics';
import { primaryWhatsApp } from '@/lib/data';

export default function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleViewProjects = () => {
    trackFunnel.heroViewProjects();
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden"
    >
      {/* Background — deep navy with subtle texture like the reference */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#0c1f4a] via-[#0a1835] to-[#070f1c]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.45),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_50%_100%,rgba(14,116,144,0.25),transparent_50%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjQiLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbikiIG9wYWNpdHk9IjAuNSIvPjwvc3ZnPg==')]"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-16 md:pb-20 min-h-[min(85vh,820px)]">
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <Image
            src="/images/logo-david.svg"
            alt="David"
            width={220}
            height={48}
            priority
            className="h-10 md:h-12 w-auto mx-auto drop-shadow-[0_4px_24px_rgba(59,130,246,0.35)]"
          />
        </motion.div>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.15, duration: 0.5 }}
          className="text-xs md:text-sm font-semibold tracking-[0.25em] text-blue-200/90 uppercase mb-8 md:mb-10"
        >
          Full-Stack &nbsp;|&nbsp; AI Web Apps &nbsp;|&nbsp; Automation
        </motion.p>

        <motion.h1
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.25, duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.25rem] font-bold text-white uppercase leading-tight tracking-wide max-w-5xl"
        >
          Modern Web Apps. AI Integrations.
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Workflows That Scale.
        </motion.h1>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.35, duration: 0.5 }}
          className="mt-6 md:mt-8 text-base md:text-lg text-blue-100/80 max-w-2xl leading-relaxed"
        >
          I build production-ready SaaS, Supabase backends, and n8n automations for founders and teams who need results—not demos.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.45, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 md:mt-12"
        >
          <Link
            href="/projects"
            onClick={handleViewProjects}
            className="group inline-flex items-center gap-2 min-h-11 px-7 py-3 bg-white text-[#0c1f4a] rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-blue-50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1835]"
          >
            <Rocket className="w-4 h-4" aria-hidden="true" />
            View Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('hero-cta')}
            className="inline-flex items-center gap-2 min-h-11 px-7 py-3 border-2 border-white/80 text-white rounded-lg font-bold uppercase tracking-wide text-sm hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a1835]"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.55, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <a
            href="mailto:davidtosin306@gmail.com"
            onClick={() => trackFunnel.emailClick('hero')}
            className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white/90 hover:bg-white/10 hover:border-white/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Email David"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="https://t.me/mar_gdd"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.telegramClick('hero')}
            className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center text-white/90 hover:bg-white/10 hover:border-white/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Telegram"
          >
            <svg className="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
