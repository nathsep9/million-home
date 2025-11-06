"use client";

import React, { createContext, startTransition, useContext, useEffect, useState } from 'react';

export type Locale = 'es' | 'en';
export type Messages = Record<string, string>;

type I18nContextValue = {
  locale: Locale;
  t: (key: string) => string;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue>({
  locale: 'es',
  t: (key) => key,
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'es') return saved;
      const nav = navigator.language?.startsWith('en') ? 'en' : 'es';
      return nav as Locale;
    }
    return 'es';
  });

  const [messages, setMessages] = useState<Messages>({});

  useEffect(() => {
    let active = true;
    (async () => {
      const mod = await import(`@/locales/${locale}.json`);
      if (!active) return;
      setMessages(mod.default as Messages);
      if (typeof window !== 'undefined') localStorage.setItem('lang', locale);
    })();
    return () => {
      active = false;
    };
  }, [locale]);

  const t = (key: string) => messages[key] ?? key;
  const setLocale = (l: Locale) => startTransition(() => setLocaleState(l));

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
