// src/app/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import {
  getAbsoluteUrl,
  getDefaultOpenGraphImage,
  getLanguageAlternates,
  getOpenGraphAlternateLocales,
  localeMetadata,
  siteConfig,
  siteIcons,
} from '@/lib/seo';

const metadata = localeMetadata[siteConfig.defaultLocale];

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.siteUrl),
  applicationName: siteConfig.shortName,
  title: metadata.title,
  description: metadata.description,
  keywords: metadata.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  icons: siteIcons,
  alternates: {
    canonical: getAbsoluteUrl(siteConfig.defaultLocale),
    languages: {
      ...getLanguageAlternates(),
      'x-default': getAbsoluteUrl(siteConfig.defaultLocale),
    },
  },
  openGraph: {
    title: metadata.title,
    description: metadata.description,
    url: getAbsoluteUrl(siteConfig.defaultLocale),
    siteName: siteConfig.name,
    locale: metadata.ogLocale,
    alternateLocale: getOpenGraphAlternateLocales(siteConfig.defaultLocale),
    type: 'website',
    images: getDefaultOpenGraphImage(),
  },
  twitter: {
    card: 'summary_large_image',
    title: metadata.title,
    description: metadata.description,
    images: [siteConfig.ogImage],
  },
});

export default function RootPage() {
  redirect('/en');
}

