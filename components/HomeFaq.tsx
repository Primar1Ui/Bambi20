'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { homeFaqs } from '@/lib/seo';

export default function HomeFaq() {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

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

        <dl className="space-y-3">
          {homeFaqs.map((item, index) => {
            const isOpen = openItems.has(index);
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] overflow-hidden"
              >
                <dt>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(index)}
                    className="flex w-full items-center justify-between gap-4 min-h-14 px-5 py-4 text-left text-base font-semibold text-[var(--foreground)] hover:bg-[var(--surface)]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                </dt>
                <dd
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-5 pb-5 text-sm sm:text-base text-[var(--muted)] leading-relaxed border-t border-[var(--border)]"
                >
                  <p className="pt-4">{item.answer}</p>
                </dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
