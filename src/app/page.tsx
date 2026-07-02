// src/app/page.tsx
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getAbsoluteUrl, getLanguageAlternates, localeMetadata, siteConfig } from '@/lib/seo';

const metadata = localeMetadata[siteConfig.defaultLocale];

export const generateMetadata = (): Metadata => ({
  metadataBase: new URL(siteConfig.siteUrl),
  title: metadata.title,
  description: metadata.description,
  keywords: metadata.keywords,
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
});

export default function RootPage() {
  redirect('/en');
}

