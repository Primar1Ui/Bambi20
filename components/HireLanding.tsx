'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Clock,
  Layers,
  Workflow,
} from 'lucide-react';
import { primaryWhatsApp } from '@/lib/data';
import { trackFunnel } from '@/lib/analytics';
import { SITE_BRAND, SITE_LEGAL_NAME, SITE_EMAIL } from '@/lib/site';

const projectTypes = [
  {
    title: 'Web app or SaaS MVP',
    description:
      'A focused product build with auth, dashboard, and production deploy on Vercel and Supabase.',
    timeline: '2 to 4 weeks',
  },
  {
    title: 'Automation system',
    description:
      'n8n or Zapier workflows that connect Gmail, Sheets, Airtable, Slack, and AI models to remove manual work.',
    timeline: '1 to 2 weeks',
  },
  {
    title: 'Existing app support',
    description:
      'Bug fixes, performance work, new features, or Supabase and API integrations on a codebase you already have.',
    timeline: 'Flexible',
  },
];

const processSteps = [
  {
    step: '1',
    title: 'Send a short brief',
    description:
      'Tell me what you are building, who it is for, and your timeline. A few sentences is enough to start.',
  },
  {
    step: '2',
    title: 'Get a clear plan',
    description:
      'I reply within 24 hours with scope, approach, and next steps. No vague proposals or endless back and forth.',
  },
  {
    step: '3',
    title: 'Build and ship',
    description:
      'We work in small milestones, keep communication simple, and deploy to production when the work is ready.',
  },
];

const fitChecks = [
  'You want something shipped, not a months-long discovery phase',
  'You are fine working async over WhatsApp, email, or video when needed',
  'You care about clean code, clear handoff, and production reliability',
];

export default function HireLanding() {
  return (
    <>
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wide mb-3">
              Hire {SITE_BRAND}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] mb-5 leading-tight">
              Let&apos;s build your web app or automation system
            </h1>
            <p className="text-lg text-[var(--muted)] leading-relaxed max-w-2xl mx-auto mb-8">
              I am {SITE_LEGAL_NAME}, a full stack developer working as {SITE_BRAND}. I help
              founders and small teams launch web products and workflow automations that actually
              run in production.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/contact"
                onClick={() => trackFunnel.contactCtaClick('hire-hero')}
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Send project details
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={primaryWhatsApp.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackFunnel.whatsappClick('hire-hero')}
                className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-solid)] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp {primaryWhatsApp.display}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
              What I can help with
            </h2>
            <p className="text-[var(--muted)] max-w-2xl mx-auto">
              Pick the kind of work you need. Most clients come with one clear problem and want a
              practical build, not a giant spec document.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {projectTypes.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6"
              >
                <div className="inline-flex p-2 rounded-lg bg-blue-500/10 text-blue-500 mb-4">
                  {index === 0 ? (
                    <Layers className="w-5 h-5" aria-hidden />
                  ) : index === 1 ? (
                    <Workflow className="w-5 h-5" aria-hidden />
                  ) : (
                    <CheckCircle2 className="w-5 h-5" aria-hidden />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">{item.description}</p>
                <p className="text-xs font-medium text-[var(--muted-strong)] inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden />
                  Typical timeline: {item.timeline}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-[var(--surface-solid)]/40 border-y border-[var(--border)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-10 text-center">
            How hiring works
          </h2>
          <ol className="space-y-6">
            {processSteps.map((item, index) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
                className="flex gap-4 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-blue-500 font-bold">
                  {item.step}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-1">{item.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
              Good fit if...
            </h2>
            <ul className="space-y-3">
              {fitChecks.map((item) => (
                <li key={item} className="flex gap-3 text-[var(--muted)] text-sm leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-green-500 mt-0.5" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Before you reach out</h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
              Include your goal, deadline, and any links to designs or references. If you are not
              sure about scope yet, say that too. I can help shape the first version.
            </p>
            <p className="text-sm text-[var(--muted)]">
              Email:{' '}
              <a href={`mailto:${SITE_EMAIL}`} className="text-blue-500 hover:text-blue-400">
                {SITE_EMAIL}
              </a>
            </p>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-blue-500 hover:text-blue-400"
            >
              Read case studies first
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-4">
            Ready to start?
          </h2>
          <p className="text-[var(--muted)] mb-8">
            Send your project details and I will reply within 24 hours with next steps.
          </p>
          <Link
            href="/contact"
            onClick={() => trackFunnel.contactCtaClick('hire-footer')}
            className="inline-flex items-center justify-center gap-2 min-h-12 px-6 py-3 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Go to contact form
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
