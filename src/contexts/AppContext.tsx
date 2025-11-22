'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocale } from 'next-intl'; 

export type Theme = 'light' | 'dark';

interface RippleEffect {
  x: number;
  y: number;
  id: number;
  targetTheme: Theme;
}

interface AppContextType {
  locale: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setThemeWithRipple: (theme: Theme, x: number, y: number) => void;
  isRTL: boolean;
  ripples: RippleEffect[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const locale = useLocale();
  const [theme, setTheme] = useState<Theme>('light');
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const isRTL = locale === 'fa' || locale === 'ar';

  useEffect(() => {
    const html = document.documentElement;
    html.dir = isRTL ? 'rtl' : 'ltr';
    html.lang = locale;
  }, [locale, isRTL]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  const setThemeWithRipple = (newTheme: Theme, x: number, y: number) => {
    const ripple: RippleEffect = {
      x,
      y,
      id: Date.now(),
      targetTheme: newTheme,
    };
    setRipples(prev => [...prev, ripple]);

    setTimeout(() => {
      setTheme(newTheme);
    }, 100);

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id));
    }, 1500);
  };

  return (
    <AppContext.Provider
      value={{
        locale,
        theme,
        setTheme,
        setThemeWithRipple,
        isRTL,
        ripples
      }}
    >
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