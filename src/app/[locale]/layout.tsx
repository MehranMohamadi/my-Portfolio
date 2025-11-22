// src/app/[locale]/layout.tsx
import '../../styles/global.css';
import { Providers } from '../../components/Provider';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={locale}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}