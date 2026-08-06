'use client';

import { motion } from 'framer-motion';
import { Code2, Zap, Rocket } from 'lucide-react';
import { SITE_BRAND, SITE_LEGAL_NAME } from '@/lib/site';
import SectionHeading from '@/components/SectionHeading';

export default function About() {
  const features = [
    {
      icon: Code2,
      title: 'Full Stack Development',
      description: 'Frontend and backend work with Next.js, React, Node, and Supabase.',
    },
    {
      icon: Zap,
      title: 'AI Integration',
      description: 'Practical AI features inside web apps: chat, scoring, routing, and content tools.',
    },
    {
      icon: Rocket,
      title: 'SaaS MVPs',
      description: 'Launch-ready MVPs with auth, billing hooks, and a codebase you can grow.',
    },
  ];

  return (
    <section
      id="about"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading title="About Me" />

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I&apos;m {SITE_LEGAL_NAME}. Online I go by {SITE_BRAND}. I work as a freelance full stack
              developer on web apps, internal tools, and automation projects.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Most of my work sits in the Next.js and Supabase stack. I also build n8n and Zapier
              workflows when a client needs leads routed, content scheduled, or support tickets handled
              without manual copy paste.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              I keep communication simple: clear scope, regular updates, and code you can hand to another
              developer later if needed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
