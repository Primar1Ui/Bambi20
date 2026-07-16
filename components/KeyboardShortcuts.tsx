'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], description: 'Focus project search' },
  { keys: ['G'], description: 'Open GitHub' },
  { keys: ['H'], description: 'Scroll to home' },
  { keys: ['P'], description: 'Scroll to projects' },
  { keys: ['A'], description: 'Scroll to automation' },
  { keys: ['C'], description: 'Scroll to contact' },
  { keys: ['B'], description: 'Open blog' },
  { keys: ['?'], description: 'Show this help' },
  { keys: ['Esc'], description: 'Close dialogs' },
];

export default function KeyboardShortcuts() {
  const { showHelp, closeHelp } = useKeyboardShortcuts();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showHelp) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showHelp]);

  return (
    <AnimatePresence>
      {showHelp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeHelp}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="shortcuts-title"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18 }}
            className="w-full max-w-md rounded-2xl border border-gray-800 bg-[#0b1628] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-cyan-400" aria-hidden />
                <h2 id="shortcuts-title" className="text-lg font-semibold text-white">
                  Keyboard shortcuts
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={closeHelp}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                aria-label="Close shortcuts help"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="px-5 py-4 space-y-3">
              {SHORTCUTS.map((item) => (
                <li key={item.description} className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-300">{item.description}</span>
                  <span className="flex items-center gap-1 shrink-0">
                    {item.keys.map((key) => (
                      <kbd
                        key={key}
                        className="min-w-[1.75rem] px-2 py-1 text-xs font-medium text-center rounded-md border border-gray-700 bg-gray-900/80 text-gray-200"
                      >
                        {key}
                      </kbd>
                    ))}
                  </span>
                </li>
              ))}
            </ul>

            <p className="px-5 pb-4 text-xs text-gray-500">
              Press <kbd className="px-1.5 py-0.5 rounded border border-gray-700 bg-gray-900/80">?</kbd> anytime to
              reopen this panel.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
