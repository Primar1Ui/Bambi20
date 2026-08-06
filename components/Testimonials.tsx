'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/lib/testimonials';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Client <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-4" />
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Feedback from recent product and marketing engagements
          </p>
          {testimonials.some((t) => t.illustrative) && (
            <p className="text-sm text-gray-500 mt-3">
              Some quotes are anonymized samples; published client testimonials are included where available.
            </p>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                {(testimonial.image || testimonial.logo) ? (
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-800 flex-shrink-0 ring-2 ring-blue-500/30">
                    <Image
                      src={testimonial.image ?? testimonial.logo ?? ''}
                      alt={testimonial.logo ? `${testimonial.company ?? 'Company'} logo` : testimonial.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex-shrink-0">
                    <Quote className="w-5 h-5 text-blue-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 leading-relaxed italic mb-4">
                    &quot;{testimonial.quote}&quot;
                  </p>
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-gray-400 text-sm">{testimonial.company}</p>
                    )}
                    {testimonial.project && (
                      <p className="text-blue-400 text-sm mt-1">Project: {testimonial.project}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
