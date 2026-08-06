'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { primaryWhatsApp } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';

export default function LandingCTA() {
  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)] bg-[var(--surface-solid)]/40"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <h2 id="final-cta-heading" className="text-2xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
            Ready to build something real?
          </h2>
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            Whether it is a web app, Supabase backend, or n8n and Zapier automation, tell me about
            your project and I will reply within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/hire"
              className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Start a project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={primaryWhatsApp.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackFunnel.whatsappClick('home-final-cta')}
              className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-solid)] transition-colors"
            >
              Message on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
