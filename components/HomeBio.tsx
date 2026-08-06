'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { primaryWhatsApp, portfolioStats } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';

export default function HomeBio() {
  return (
    <section
      aria-labelledby="home-bio-heading"
      className="bg-[#efefef] text-[#1a1a1a] py-14 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <p id="home-bio-heading" className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8">
          Dear business leader...
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-8 text-[#2a2a2a]">
          I&apos;m David — a{' '}
          <strong className="font-bold text-[#111]">Full-Stack Developer</strong> and{' '}
          <strong className="font-bold text-[#111]">Automation Specialist</strong> for
          founders and teams who want clarity, direction, and a smarter way to build.
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-10 sm:mb-12 text-[#2a2a2a]">
          For more than {portfolioStats.yearsExperience} years, I&apos;ve helped companies ship
          modern web apps, strengthen their backends with Supabase, and unlock efficiency through
          n8n and Zapier automation. My work isn&apos;t about hype or guesswork — it&apos;s about{' '}
          <strong className="font-bold text-[#111]">giving you the technical clarity</strong> and{' '}
          <strong className="font-bold text-[#111]">execution</strong> you need to move forward
          with confidence.
        </p>

        <div className="flex justify-center">
          <a
            href={primaryWhatsApp.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackFunnel.whatsappClick('home-bio')}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 sm:px-8 py-3 bg-[#9b1c1c] hover:bg-[#801616] text-white text-sm sm:text-base font-bold uppercase tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9b1c1c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#efefef]"
          >
            Connect with David on WhatsApp
            <ChevronRight className="w-5 h-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
