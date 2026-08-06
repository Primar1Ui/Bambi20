'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { testimonials, feedbackScreenshots } from '@/lib/testimonials';
import SectionHeading from '@/components/SectionHeading';

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <SectionHeading
          title="Client Testimonials"
          description="Verified feedback from recent client engagements"
        />

        <div className="space-y-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.35 }}
              className="border-l-4 border-[var(--border)] pl-5 md:pl-6"
            >
              <blockquote className="text-[var(--foreground)] leading-relaxed text-lg mb-4">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="text-sm text-[var(--muted)] space-y-0.5">
                <p className="font-semibold text-[var(--foreground)]">{testimonial.name}</p>
                {testimonial.role ? <p>{testimonial.role}</p> : null}
                {testimonial.company ? <p>{testimonial.company}</p> : null}
                {testimonial.project ? <p>Project: {testimonial.project}</p> : null}
              </figcaption>
              {(testimonial.image || testimonial.logo) && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden mt-4 bg-[var(--surface)]">
                  <Image
                    src={testimonial.image ?? testimonial.logo ?? ''}
                    alt={testimonial.logo ? `${testimonial.company ?? 'Company'} logo` : testimonial.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>
              )}
            </motion.figure>
          ))}
        </div>

        <div>
          <SectionHeading
            title="Verified platform feedback"
            description="Screenshots from published client reviews on Fiverr"
            className="mb-8"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {feedbackScreenshots.map((shot, index) => (
              <motion.figure
                key={shot.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.35 }}
                className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]"
              >
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={shot.image}
                    alt={shot.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-contain object-top p-2"
                  />
                </div>
                <figcaption className="px-4 py-3 border-t border-[var(--border)] text-sm text-[var(--muted)]">
                  <span className="font-medium text-[var(--foreground)]">{shot.client}</span>
                  <span aria-hidden> · </span>
                  {shot.caption}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
