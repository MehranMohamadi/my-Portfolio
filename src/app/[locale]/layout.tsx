import { NextIntlClientProvider } from 'next-intl';
import { AppProvider } from '../../contexts/AppContext';
import '../../styles/global.css';

export default function LocaleLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
  const { locale } = params;
  let messages;
  try {
    messages = require(`../../messages/${locale}.json`);
  } catch {
    // اگر زبان پیدا نشد برگرد به پیشفرض
    messages = require(`../../messages/en.json`);
  }

  return (
    <html lang={locale}>
      <body>
        <AppProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}