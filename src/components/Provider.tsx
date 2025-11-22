'use client';

import { NextIntlClientProvider } from 'next-intl';
import { AppProvider } from '../contexts/AppContext';

interface ProvidersProps {
  locale: string;
  messages: Record<string, any>;
  children: React.ReactNode;
}

export function Providers({ locale, messages, children }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppProvider>
        {children}
      </AppProvider>
    </NextIntlClientProvider>
  );
}
