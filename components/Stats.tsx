'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { portfolioStats } from '@/lib/data';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
}

function Stat({ value, label, suffix = '' }: StatProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
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
  }, [value]);

  return (
    <div className="text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        {count}
        {suffix}
      </motion.div>
      <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 mt-2 text-sm font-medium">
        {label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-y border-gray-800/50 dark:border-gray-800/50 light:border-gray-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          <Stat value={portfolioStats.projects} label="Projects Completed" suffix="+" />
          <Stat value={portfolioStats.clients} label="Happy Clients" suffix="+" />
          <Stat value={portfolioStats.yearsExperience} label="Years Experience" suffix="+" />
          <Stat value={portfolioStats.githubContributions} label="GitHub Contributions" suffix="+" />
        </motion.div>
      </div>
    </section>
  );
}
