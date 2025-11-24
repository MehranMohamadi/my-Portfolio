// src/app/[locale]/layout.tsx
import '../../styles/global.css';
import { Providers } from '../../components/Provider';
import { SpeedInsights } from "@vercel/speed-insights/next"

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = (await import(`../../messages/en.json`)).default;
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body>
        <SpeedInsights />
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}