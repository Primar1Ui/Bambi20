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
    <div className="flex items-center gap-1 p-1 rounded-lg bg-gray-800/50 border border-gray-700">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code)}
          className={`px-2 py-1 text-xs font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            locale === code
              ? 'bg-blue-500/30 text-blue-300'
              : 'text-gray-400 hover:text-gray-200'
          }`}
          aria-label={`Switch to ${label}`}
          aria-current={locale === code ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
