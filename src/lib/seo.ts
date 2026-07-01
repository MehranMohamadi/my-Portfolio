export const siteConfig = {
  name: 'Mehran Mohammadi',
  siteUrl: 'https://mehranmohammadifrd.ir',
  defaultLocale: 'en',
  locales: ['en', 'fa', 'ar'] as const,
  ogImage: '/og-image.jpg.png',
  profileImage: '/img/profile.jpg',
  sameAs: [
    'https://github.com/MehranMohamadi',
    'https://www.linkedin.com/in/mehran-mohammadi-far/',
  ],
};

export type SiteLocale = (typeof siteConfig.locales)[number];

export const localeMetadata = {
  en: {
    title: 'Mehran Mohammadi | Frontend Engineer — Vue, Nuxt, TypeScript',
    description:
      'Frontend Engineer with 4+ years of experience building production web applications, dashboards, RTL interfaces and scalable product UIs with Vue, Nuxt and TypeScript.',
    ogLocale: 'en_US',
  },
  fa: {
    title: 'مهران محمدی | توسعه دهنده فرانت اند',
    description:
      'توسعه دهنده فرانت اند متخصص در Nuxt، Vue، Next.js و ساخت وب اپلیکیشن های مدرن و سریع.',
    ogLocale: 'fa_IR',
  },
  ar: {
    title: 'مهران محمدي | مطور واجهات أمامية',
    description:
      'مطور واجهات أمامية متخصص في Nuxt وVue وNext.js وبناء تطبيقات ويب حديثة وعالية الأداء.',
    ogLocale: 'ar_AR',
  },
} satisfies Record<SiteLocale, { title: string; description: string; ogLocale: string }>;

export function normalizeLocale(locale: string): SiteLocale {
  if (locale === 'fa' || locale === 'ar') {
    return locale;
  }

  return 'en';
}

export function getLocalizedPath(locale: string, pathname = '') {
  const safeLocale = normalizeLocale(locale);
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `/${safeLocale}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function getAbsoluteUrl(locale: string, pathname = '') {
  return `${siteConfig.siteUrl}${getLocalizedPath(locale, pathname)}`;
}

export function getAbsoluteAssetUrl(pathOrUrl: string) {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  return `${siteConfig.siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function getShareImageUrl(pathOrUrl = siteConfig.ogImage) {
  const image = pathOrUrl.toLowerCase().endsWith('.svg') ? siteConfig.ogImage : pathOrUrl;

  return getAbsoluteAssetUrl(image);
}

export function getLanguageAlternates(pathname = '') {
  return Object.fromEntries(
    siteConfig.locales.map((locale) => [locale, getAbsoluteUrl(locale, pathname)])
  );
}

export function getPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.name,
    jobTitle: 'Frontend Engineer',
    url: siteConfig.siteUrl,
    sameAs: siteConfig.sameAs,
    image: getAbsoluteAssetUrl(siteConfig.profileImage),
  };
}

export function getWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.siteUrl,
    inLanguage: siteConfig.locales,
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
  };
}

export function getWebPageJsonLd({
  locale,
  pathname = '',
  title,
  description,
}: {
  locale: string;
  pathname?: string;
  title: string;
  description: string;
}) {
  const safeLocale = normalizeLocale(locale);
  const url = getAbsoluteUrl(safeLocale, pathname);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    inLanguage: safeLocale,
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    about: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: getShareImageUrl(),
    },
  };
}
