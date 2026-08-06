'use client';

import { useLocale } from '@/contexts/LocaleContext';
import type { Locale } from '@/contexts/LocaleContext';

const locales: { code: Locale; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'fr', label: 'FR' },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      className="flex items-center gap-0.5 p-0.5 rounded-lg border border-[var(--border)] bg-[var(--surface-solid)]"
      role="group"
      aria-label="Language"
    >
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`min-h-9 min-w-9 px-2 py-1 text-xs font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
            locale === code
              ? 'bg-blue-500/20 text-blue-500'
              : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface)]'
          }`}
          aria-label={`Switch to ${label}`}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
