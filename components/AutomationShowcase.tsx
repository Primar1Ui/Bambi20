'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bot, GitBranch, Workflow, Boxes, Users, CalendarCheck, Sparkles, FileSpreadsheet, CalendarDays, BellRing } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { automations } from '@/lib/automations';

const automationIcons = {
  'AI Appointment Booking Assistant': CalendarDays,
  'AI Customer Support Automation': Bot,
  'CamJRoberts Reminder': BellRing,
  'n8n API Automation': Workflow,
  'Automated Content Operations': GitBranch,
  'AI Lead Qualification': Bot,
  'AI Inventory & Auto-Restock': Boxes,
  'AI Recruiting Funnel': Users,
  'AI Content Routing with Groq': Sparkles,
  'Zapier Event RSVP System': CalendarCheck,
  'Zapier RSVP Slack Alerts': Bot,
  'Zapier Form-to-Sheet Sync': FileSpreadsheet,
} as const;

export default function AutomationShowcase() {
  const reduce = usePrefersReducedMotion();

  return (
    <section
      id="automation"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 border-y border-gray-800/50"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400 mb-3">
            Workflow automation
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Automation that{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              removes busywork
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-400">
            I build n8n, Zapier, and AI-powered systems that connect tools, process data, and keep
            business workflows moving without repetitive manual steps.
          </p>
        </motion.div>

        <div className="grid gap-7 lg:grid-cols-3">
          {automations.map((automation, index) => {
            const Icon = automationIcons[automation.title as keyof typeof automationIcons] ?? Workflow;
            return (
              <motion.article
                key={automation.title}
                initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: reduce ? 0 : index * 0.08, duration: reduce ? 0 : 0.5 }}
                className="overflow-hidden rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-cyan-500/50 transition-colors"
              >
                <div className="relative aspect-[16/9] bg-white overflow-hidden">
                  <Image
                    src={automation.image}
                    alt={automation.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex p-2 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <Icon className="w-5 h-5" aria-hidden />
                    </span>
                    <h3 className="text-xl font-semibold text-white">{automation.title}</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed mb-5">{automation.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {automation.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Discuss an automation project
          </a>
        </div>
      </div>
    </section>
  );
}
