import '../../styles/global.css';
import { Providers } from '../../components/Provider';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  keywords: [
    "Frontend Developer",
    "Nuxt",
    "Vue",
    "Next.js",
    "Web Developer",
    "JavaScript",
  ],
  title: {
    default: "Mehrann Mohammadi | Frontend Developer | Virasty | Gap Massenger",
    template: "%s | Mehrann Mohammadi",
  },
  description:
    "Frontend developer specialized in Nuxt, Vue, and modern web technologies.",
  alternates: {
    canonical: "https://www.mehranmohammadifrd.ir",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Mehrann Mohammadi | Frontend Developer",
    description:
      "Frontend developer specialized in Nuxt, Vue, and modern web technologies.",
    url: "https://www.mehranmohammadifrd.ir",
    siteName: "Mehrann Mohammadi",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `https://www.mehranmohammadifrd.ir/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Mehrann Mohammadi - Frontend Developer",
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
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
