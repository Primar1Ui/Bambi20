'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bot, GitBranch, Workflow, Boxes, Users, CalendarCheck, Sparkles, FileSpreadsheet } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const automations = [
  {
    title: 'n8n API Automation',
    description:
      'Connect external APIs, reshape incoming data, and move results through reliable low-code workflows.',
    image: '/images/automation-n8n-api.png',
    alt: 'n8n workflow connecting a manual trigger, HTTP request, and field editor',
    icon: Workflow,
    tags: ['n8n', 'API integration', 'Data mapping'],
  },
  {
    title: 'Automated Content Operations',
    description:
      'Schedule multi-step pipelines that prepare content, update spreadsheets, and coordinate outbound messages.',
    image: '/images/automation-content-pipeline.png',
    alt: 'Large n8n content automation workflow with scheduling, Google Sheets, and Gmail',
    icon: GitBranch,
    tags: ['Scheduling', 'Google Sheets', 'Gmail'],
  },
  {
    title: 'AI Lead Qualification',
    description:
      'Route leads through AI-assisted qualification, normalize the results, save them, and notify the right team.',
    image: '/images/automation-lead-qualification.png',
    alt: 'n8n AI lead qualification workflow with language models, branching, Sheets, and Gmail',
    icon: Bot,
    tags: ['AI agents', 'Lead scoring', 'Notifications'],
  },
  {
    title: 'AI Inventory & Auto-Restock',
    description:
      'Scheduled n8n system that analyzes inventory, updates Airtable records, and triggers restock emails automatically.',
    image: '/images/automation-inventory-restock.png',
    alt: 'n8n AI-powered inventory management and auto-restock workflow with Airtable and Gmail',
    icon: Boxes,
    tags: ['n8n', 'Airtable', 'AI analysis'],
  },
  {
    title: 'AI Recruiting Funnel',
    description:
      'End-to-end candidate pipeline that scores applicants, alerts the team on Slack and email, and books interviews.',
    image: '/images/automation-recruiting-funnel.png',
    alt: 'n8n AI recruiting funnel workflow with candidate scoring, Slack, Gmail, and scheduling',
    icon: Users,
    tags: ['n8n', 'AI scoring', 'Slack + Gmail'],
  },
  {
    title: 'AI Content Routing with Groq',
    description:
      'Branching n8n flow that runs Groq LLM chains, formats results, merges paths, and logs output to Google Sheets.',
    image: '/images/automation-groq-content-routing.png',
    alt: 'n8n workflow with Groq chat models, branching LLM chains, merge, and Google Sheets',
    icon: Sparkles,
    tags: ['n8n', 'Groq LLM', 'Branching'],
  },
  {
    title: 'Zapier Event RSVP System',
    description:
      'Zapier system that finds records, splits into conditional paths, and creates records or sends reminders per RSVP.',
    image: '/images/automation-zapier-rsvp-paths.png',
    alt: 'Zapier event RSVP system with Airtable record lookup, paths, and Slack reminders',
    icon: CalendarCheck,
    tags: ['Zapier', 'Airtable', 'Paths'],
  },
  {
    title: 'Zapier RSVP Slack Alerts',
    description:
      'New event registrations flow straight into a Slack channel with formatted attendee details for the team.',
    image: '/images/automation-rsvp-slack.png',
    alt: 'Slack channel receiving new event registration alerts sent by Zapier',
    icon: Bot,
    tags: ['Zapier', 'Slack', 'Notifications'],
  },
  {
    title: 'Zapier Form-to-Sheet Sync',
    description:
      'Google Forms responses are looked up and written into Google Sheets rows automatically with no manual entry.',
    image: '/images/automation-zapier-forms-sheets.png',
    alt: 'Zapier workflow syncing Google Forms responses into Google Sheets rows',
    icon: FileSpreadsheet,
    tags: ['Zapier', 'Google Forms', 'Google Sheets'],
  },
];

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
            const Icon = automation.icon;
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
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Discuss an automation project
          </a>
        </div>
      </div>
    </section>
  );
}
