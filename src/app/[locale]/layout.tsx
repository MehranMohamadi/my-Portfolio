import '../../styles/global.css';
import { Providers } from '../../components/Provider';
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { getAbsoluteUrl, getLanguageAlternates, localeMetadata, normalizeLocale, siteConfig } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const safeLocale = normalizeLocale(locale);
  const metadata = localeMetadata[safeLocale];
  const canonical = getAbsoluteUrl(safeLocale);

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: {
      default: metadata.title,
      template: `%s | ${siteConfig.name}`,
    },
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical,
      languages: {
        ...getLanguageAlternates(),
        'x-default': getAbsoluteUrl(siteConfig.defaultLocale),
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: metadata.ogLocale,
      type: 'website',
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - Frontend Engineer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: [siteConfig.ogImage],
    },
    category: 'technology',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; 
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
