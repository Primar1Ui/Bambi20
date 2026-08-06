'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks which section id is most visible while scrolling (home page scroll-spy).
 */
export function useActiveSection(sectionIds: string[], enabled = true, offset = 100) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (!enabled || sectionIds.length === 0) {
      setActiveId('');
      return;
    }

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topMost = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        const nextId = visible[0]?.target.id ?? topMost?.target.id;
        if (nextId) setActiveId(nextId);
      },
      {
        rootMargin: `-${offset}px 0px -50% 0px`,
        threshold: [0, 0.15, 0.35, 0.5, 0.75],
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [enabled, offset, sectionIds.join('|')]);

  return activeId;
}
