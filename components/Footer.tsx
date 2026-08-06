'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="py-10 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[var(--muted)] text-sm"
        >
          © David — All rights reserved
        </motion.p>
      </div>
    </footer>
  );
}
