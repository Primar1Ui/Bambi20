'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import enMessages from '@/messages/en.json';

export type Locale = 'en' | 'es' | 'fr';

type Messages = Record<string, Record<string, string>>;

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = 'portfolio-locale';

function getNested(obj: Record<string, unknown>, path: string): string | undefined {
  const keys = path.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current == null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [messages, setMessages] = useState<Messages>(enMessages as Messages);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
      if (stored === 'en' || stored === 'es' || stored === 'fr') {
        setLocaleState(stored);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (locale === 'en') {
      setMessages(enMessages as Messages);
      return;
    }

    let cancelled = false;
    import(`@/messages/${locale}.json`)
      .then((mod) => {
        if (!cancelled) setMessages(mod.default as Messages);
      })
      .catch(() => {
        if (!cancelled) setMessages(enMessages as Messages);
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getNested(messages as unknown as Record<string, unknown>, key);
      return value ?? key;
    },
    [messages]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
