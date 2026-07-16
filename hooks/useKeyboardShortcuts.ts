'use client';

import { useEffect, useCallback, useState } from 'react';

const GITHUB_URL = 'https://github.com/Primar1Ui';

export function useKeyboardShortcuts() {
  const [showHelp, setShowHelp] = useState(false);

  const closeHelp = useCallback(() => setShowHelp(false), []);
  const openHelp = useCallback(() => setShowHelp(true), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        /^(INPUT|TEXTAREA|SELECT)$/.test(target?.tagName ?? '') ||
        target?.isContentEditable;

      // Escape always closes help
      if (e.key === 'Escape') {
        if (showHelp) {
          e.preventDefault();
          setShowHelp(false);
        }
        return;
      }

      // ? — Toggle shortcuts help (Shift+/ on most keyboards)
      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (isInput) return;
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      // Ctrl/Cmd + K — Focus project search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const search = document.getElementById('project-search') as HTMLInputElement | null;
        if (search) {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
          // Focus after scroll starts
          requestAnimationFrame(() => search.focus());
        } else {
          document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      if (isInput) return;

      // G — Open GitHub
      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
        return;
      }

      // C — Scroll to Contact
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // H — Scroll to Home
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // P — Scroll to Projects
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // A — Scroll to Automation
      if (e.key === 'a' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        document.querySelector('#automation')?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      // B — Open Blog
      if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.location.href = '/blog';
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp]);

  return { showHelp, openHelp, closeHelp };
}
