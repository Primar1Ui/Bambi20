'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useLocale } from '@/contexts/LocaleContext';
import { mainNavItems, isNavItemActive, type NavItem } from '@/lib/navigation';
import ThemeToggle from '@/components/ThemeToggle';

function navLinkClass(isActive: boolean) {
  return [
    'inline-flex items-center min-h-11 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]',
    isActive
      ? 'text-white bg-white/10'
      : 'text-gray-300 hover:text-white hover:bg-white/5',
  ].join(' ');
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hash, setHash] = useState('');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useLocale();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener('hashchange', updateHash);
    return () => window.removeEventListener('hashchange', updateHash);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])'
    );
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const isItemActive = useMemo(
    () => (item: NavItem) => isNavItemActive(item, pathname, hash),
    [hash, pathname]
  );

  const renderNavLink = (item: NavItem, mobile = false) => {
    const isActive = isItemActive(item);
    const className = mobile
      ? [
          'block w-full text-left min-h-11 text-lg py-3 px-3 rounded-lg transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070f1c]',
          isActive ? 'text-cyan-300 bg-white/10' : 'text-gray-100 hover:text-cyan-300 hover:bg-white/5',
        ].join(' ')
      : navLinkClass(isActive);

    return (
      <Link
        key={item.key}
        href={item.href}
        onClick={() => setIsOpen(false)}
        className={className}
        aria-current={isActive ? 'page' : undefined}
      >
        {t(item.key)}
      </Link>
    );
  };

  return (
    <>
      <motion.nav
        initial={prefersReducedMotion ? { y: 0 } : { y: -100 }}
        animate={{ y: 0 }}
        role="navigation"
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
          isOpen ? 'z-[100]' : 'z-50'
        } ${
          scrolled || isOpen
            ? 'navbar-bg backdrop-blur-md shadow-lg border-b border-gray-800/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : {}}
            >
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 min-h-11 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070f1c]"
                aria-label="David — home"
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                <Image
                  src="/images/logo-david.svg"
                  alt="David"
                  width={148}
                  height={32}
                  priority
                  className="h-7 md:h-8 w-auto"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2 overflow-x-auto max-w-[70vw] lg:max-w-none">
              {mainNavItems.map((item) => renderNavLink(item))}
              <ThemeToggle />
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center min-h-11 min-w-11 text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19] rounded-lg"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[90] bg-[#070f1c]"
            onClick={() => setIsOpen(false)}
            aria-hidden={!isOpen}
          >
            <motion.div
              ref={menuPanelRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
              className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-gray-800 bg-[#070f1c]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-6 space-y-1">
                <div className="flex items-center justify-between mb-4 gap-2 pb-4 border-b border-gray-800 min-h-11">
                  <span className="text-sm font-medium text-gray-300">{t('nav.theme')}</span>
                  <ThemeToggle />
                </div>
                {mainNavItems.map((item) => renderNavLink(item, true))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
