'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Rocket } from 'lucide-react';

const STORAGE_KEY = 'hire-me-banner-dismissed';

export default function HireMeBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY) === 'true') {
        setDismissed(true);
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {}
  };

  if (dismissed) return null;

  return (
    <div className="mt-16 md:mt-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 border-b border-blue-500/30 print:hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm md:text-base flex items-center gap-2">
          <Rocket className="w-4 h-4 flex-shrink-0" aria-hidden />
          <span>Available for new projects. Let&apos;s build something amazing together.</span>
        </p>
        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            Get in touch
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Dismiss banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
