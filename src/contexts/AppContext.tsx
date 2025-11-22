'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocale } from 'next-intl'; // گرفتن زبان فعال از next-intl

export type Theme = 'light' | 'dark';

interface RippleEffect {
  x: number;
  y: number;
  id: number;
  targetTheme: Theme;
}

interface AppContextType {
  locale: string; // زبان فعال از next-intl
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeWithRipple: (theme: Theme, x: number, y: number) => void;
  isRTL: boolean;
  ripples: RippleEffect[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locale = useLocale(); // 'en', 'fa', 'ar' از مسیر URL می‌گیرد
  const [theme, setTheme] = useState<Theme>('light');
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const isRTL = locale === 'fa' || locale === 'ar';

  // تغییر جهت صفحه بر اساس زبان
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = locale;
  }, [locale, isRTL]);

  // تغییر تم صفحه
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // تغییر تم همراه ripple
  const setThemeWithRipple = (newTheme: Theme, x: number, y: number) => {
    const ripple: RippleEffect = {
      x,
      y,
      id: Date.now(),
      targetTheme: newTheme,
    };
    setRipples(prev => [...prev, ripple]);

    // Start theme transition after a short delay
    setTimeout(() => {
      setTheme(newTheme);
    }, 100);

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 1500);
  };

  return (
    <AppContext.Provider value={{ locale, theme, setTheme, setThemeWithRipple, isRTL, ripples }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
