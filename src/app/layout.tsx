'use client' // لازم نیست اینجا باشه چون RootLayout خودش Server Componentه
import '../styles/global.css';
import { NextIntlClientProvider } from 'next-intl';
import { AppProvider } from '../contexts/AppContext'; // مسیر درست رو بزن

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <NextIntlClientProvider locale='en'>
            {children}
          </NextIntlClientProvider>
        </AppProvider>
      </body>
    </html>
  );
}
