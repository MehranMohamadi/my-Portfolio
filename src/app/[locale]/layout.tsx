import { NextIntlClientProvider } from 'next-intl';
import { AppProvider } from '../../contexts/AppContext';
import '../../styles/global.css';

// توجه: این کامپوننت باید async باشه تا بتونه import داینامیک انجام بده
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

let messages;
try {
  messages = (await import(`../../messages/${locale}.json`)).default;
} catch {
  messages = (await import(`../../messages/en.json`)).default;
}
  return (
    <html lang={locale}>
      <body>
          <NextIntlClientProvider locale={locale} messages={messages}>
        <AppProvider>
            {children}
        </AppProvider>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}