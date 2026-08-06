'use client';

import { motion } from 'framer-motion';
import { homeFaqs } from '@/lib/seo';

export default function HomeFaq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-10"
        >
          <p className="text-sm font-medium text-[var(--muted)] uppercase tracking-wide mb-2">FAQ</p>
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
            Common questions
          </h2>
          <p className="text-[var(--muted)]">
            Quick answers for clients, recruiters, and search engines.
          </p>
        </motion.div>

        <dl className="space-y-4">
          {homeFaqs.map((item, index) => (
            <motion.div
              key={item.question}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              className="p-5 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]"
            >
              <dt className="text-base font-semibold text-[var(--foreground)] mb-2">{item.question}</dt>
              <dd className="text-sm sm:text-base text-[var(--muted)] leading-relaxed">{item.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
