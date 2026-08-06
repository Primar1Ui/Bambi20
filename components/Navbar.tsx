'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { useLocale } from '@/contexts/LocaleContext';
import {
  navEntries,
  isNavItemActive,
  isDropdownActive,
  type NavItem,
  type NavDropdown,
} from '@/lib/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { SITE_BRAND } from '@/lib/site';

function navLinkClass(isActive: boolean) {
  return [
    'inline-flex items-center min-h-11 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]',
    isActive
      ? 'text-white bg-white/10'
      : 'text-gray-300 hover:text-white hover:bg-white/5',
  ].join(' ');
}

function mobileLinkClass(isActive: boolean) {
  return [
    'block w-full text-left min-h-11 text-base py-3 px-3 rounded-lg transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#070f1c]',
    isActive ? 'text-cyan-300 bg-white/10' : 'text-gray-100 hover:text-cyan-300 hover:bg-white/5',
  ].join(' ');
}

type DesktopDropdownProps = {
  dropdown: NavDropdown;
  isActive: boolean;
  isItemActive: (item: NavItem) => boolean;
  t: (key: string) => string;
  onNavigate: () => void;
};

function DesktopDropdown({ dropdown, isActive, isItemActive, t, onNavigate }: DesktopDropdownProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={`${navLinkClass(isActive)} gap-1`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((prev) => !prev)}
      >
        {t(dropdown.labelKey)}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full pt-2 min-w-[200px] z-50"
            role="menu"
          >
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] backdrop-blur-md shadow-xl py-1.5">
              {dropdown.items.map((item) => {
                const active = isItemActive(item);
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    role="menuitem"
                    onClick={() => {
                      setOpen(false);
                      onNavigate();
                    }}
                    className={`block px-4 py-2.5 text-sm transition-colors ${
                      active
                        ? 'text-cyan-300 bg-white/10'
                        : 'text-gray-200 hover:text-white hover:bg-white/5'
                    }`}
                    aria-current={active ? 'page' : undefined}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type MobileDropdownProps = {
  dropdown: NavDropdown;
  isItemActive: (item: NavItem) => boolean;
  t: (key: string) => string;
  onNavigate: () => void;
};

function MobileDropdown({ dropdown, isItemActive, t, onNavigate }: MobileDropdownProps) {
  const [expanded, setExpanded] = useState(false);
  const groupActive = dropdown.items.some((item) => isItemActive(item));

  return (
    <div className="border-b border-gray-800/80 last:border-b-0">
      <button
        type="button"
        className={`flex w-full items-center justify-between min-h-11 py-3 px-3 rounded-lg text-lg transition-colors ${
          groupActive ? 'text-cyan-300' : 'text-gray-100'
        }`}
        aria-expanded={expanded}
        onClick={() => setExpanded((prev) => !prev)}
      >
        {t(dropdown.labelKey)}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div className="pb-2 pl-3 space-y-1">
          {dropdown.items.map((item) => {
            const active = isItemActive(item);
            return (
              <Link
                key={item.key}
                href={item.href}
                onClick={onNavigate}
                className={mobileLinkClass(active)}
                aria-current={active ? 'page' : undefined}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
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

  const isItemActive = useCallback(
    (item: NavItem) => isNavItemActive(item, pathname, hash),
    [hash, pathname]
  );

  const closeMenu = () => setIsOpen(false);

  const desktopNav = useMemo(
    () =>
      navEntries.map((entry) => {
        if (entry.type === 'link') {
          const { item } = entry;
          const active = isItemActive(item);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMenu}
              className={navLinkClass(active)}
              aria-current={active ? 'page' : undefined}
            >
              {t(item.key)}
            </Link>
          );
        }

        return (
          <DesktopDropdown
            key={entry.labelKey}
            dropdown={entry}
            isActive={isDropdownActive(entry.items, pathname, hash)}
            isItemActive={isItemActive}
            t={t}
            onNavigate={closeMenu}
          />
        );
      }),
    [hash, isItemActive, pathname, t]
  );

  const mobileNav = useMemo(
    () =>
      navEntries.map((entry) => {
        if (entry.type === 'link') {
          const { item } = entry;
          const active = isItemActive(item);
          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={closeMenu}
              className={mobileLinkClass(active)}
              aria-current={active ? 'page' : undefined}
            >
              {t(item.key)}
            </Link>
          );
        }

        return (
          <MobileDropdown
            key={entry.labelKey}
            dropdown={entry}
            isItemActive={isItemActive}
            t={t}
            onNavigate={closeMenu}
          />
        );
      }),
    [isItemActive, t]
  );

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
                onClick={closeMenu}
                className="inline-flex items-center min-h-11 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
                aria-label={`B20 ${SITE_BRAND} home`}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                <Image
                  src="/images/logo-bambi20.svg"
                  alt={`B20 ${SITE_BRAND}`}
                  width={220}
                  height={48}
                  priority
                  className="h-9 md:h-10 w-auto"
                />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {desktopNav}
              <LanguageSwitcher />
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
            className="md:hidden fixed inset-0 z-[90] bg-[var(--background)]"
            onClick={closeMenu}
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
              className="absolute inset-x-0 top-16 bottom-0 overflow-y-auto border-t border-[var(--border)] bg-[var(--background)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 py-6 space-y-1">
                <div className="flex items-center justify-between mb-4 gap-2 pb-4 border-b border-[var(--border)] min-h-11">
                  <span className="text-sm font-medium text-[var(--muted)]">{t('nav.language')}</span>
                  <LanguageSwitcher />
                </div>
                <div className="flex items-center justify-between mb-4 gap-2 pb-4 border-b border-[var(--border)] min-h-11">
                  <span className="text-sm font-medium text-[var(--muted)]">{t('nav.theme')}</span>
                  <ThemeToggle />
                </div>
                {mobileNav}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
