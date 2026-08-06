'use client';

import { useEffect } from 'react';

/** Scrolls to a hash target after navigating to a page with a fragment (e.g. /about#skills). */
export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const scrollToTarget = () => {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const timer = window.setTimeout(scrollToTarget, 100);
    return () => window.clearTimeout(timer);
  }, []);

  return null;
}
