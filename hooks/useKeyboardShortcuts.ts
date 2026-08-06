'use client';

import { useEffect, useCallback, useState } from 'react';

const GITHUB_URL = 'https://github.com/Primar1Ui';

function navigateTo(path: string) {
  window.location.assign(path);
}

function focusProjectSearch() {
  const search = document.getElementById('project-search') as HTMLInputElement | null;
  if (search) {
    search.focus();
    return;
  }
  navigateTo('/projects');
}

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

      if (e.key === 'Escape') {
        if (showHelp) {
          e.preventDefault();
          setShowHelp(false);
        }
        return;
      }

      if (e.key === '?' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (isInput) return;
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        focusProjectSearch();
        return;
      }

      if (isInput) return;

      if (e.key === 'g' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
        return;
      }

      if (e.key === 'c' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo('/contact');
        return;
      }

      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo('/');
        return;
      }

      if (e.key === 'p' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo('/projects');
        return;
      }

      if (e.key === 'a' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo('/automation');
        return;
      }

      if (e.key === 'b' && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        navigateTo('/blog');
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp]);

  return { showHelp, openHelp, closeHelp };
}
