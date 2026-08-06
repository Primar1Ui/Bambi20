'use client';

import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLocale } from '@/contexts/LocaleContext';
import { SITE_BRAND } from '@/lib/site';

export default function NotFoundPage() {
  const { t } = useLocale();

  return (
    <main id="main-content" className="min-h-screen flex flex-col bg-[var(--background)]" tabIndex={-1}>
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-lg w-full text-center">
          <p className="text-7xl md:text-8xl font-bold text-[var(--foreground)]/10 mb-2 select-none" aria-hidden>
            404
          </p>
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">
            {t('notFound.title')}
          </h1>
          <p className="text-[var(--muted)] leading-relaxed mb-8">
            {t('notFound.description')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-lg bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              <Home className="w-4 h-4" aria-hidden />
              {t('notFound.backHome')}
            </Link>
            <Link
              href="/hire"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-solid)] transition-colors"
            >
              {t('notFound.hire')}
              <ArrowRight className="w-4 h-4" aria-hidden />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--foreground)] text-sm font-semibold hover:bg-[var(--surface-solid)] transition-colors"
            >
              {t('notFound.contact')}
            </Link>
          </div>
          <p className="mt-10 text-xs text-[var(--muted)]">
            {SITE_BRAND}
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
