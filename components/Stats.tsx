'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { portfolioStats } from '@/lib/data';

interface StatItemProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

function StatItem({ label, value, suffix = '+', prefix = '' }: StatItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 1400;
    const steps = 40;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <div
      ref={ref}
      className="flex flex-1 items-center justify-center px-4 py-6 md:py-8 text-center min-h-[88px]"
    >
      <p className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide text-[var(--stats-text)] leading-snug">
        <span className="text-[var(--stats-accent)]">{prefix}{count}{suffix}</span>
        {' '}
        {label}
      </p>
    </div>
  );
}

const statItems: StatItemProps[] = [
  { value: portfolioStats.projects, suffix: '+', label: 'Projects Delivered' },
  { value: portfolioStats.clients, suffix: '+', label: 'Happy Clients' },
  { value: portfolioStats.yearsExperience, suffix: '+', label: 'Years Experience' },
  { value: portfolioStats.githubContributions, suffix: '+', label: 'GitHub Contributions' },
];

export default function Stats() {
  return (
    <section
      aria-label="Portfolio highlights"
      className="relative z-20 bg-[var(--stats-bg)] border-y border-[var(--border)] shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {statItems.map((item) => (
            <StatItem key={item.label} {...item} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
