'use client';

import { motion } from 'framer-motion';
import { services } from '@/lib/data';
import { CheckCircle2 } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function Services() {
  const reduce = usePrefersReducedMotion();

  return (
    <section
      id="services"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: reduce ? 0 : index * 0.05,
                duration: reduce ? 0 : 0.4,
              }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <p className="text-lg text-gray-300 font-medium pt-1">
                  {service}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

