export const siteConfig = {
  name: 'Mehran Mohammadi',
  siteUrl: 'https://www.mehranmohammadifrd.ir',
  defaultLocale: 'en',
  locales: ['en', 'fa', 'ar'] as const,
  ogImage: '/og-image.jpg',
};

export type SiteLocale = (typeof siteConfig.locales)[number];

export const localeMetadata = {
  en: {
    title: 'Mehran Mohammadi | Frontend Developer',
    description:
      'Frontend developer specialized in Nuxt, Vue, Next.js, and building modern high-performance web applications.',
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

export function getLanguageAlternates(pathname = '') {
  return Object.fromEntries(
    siteConfig.locales.map((locale) => [locale, getAbsoluteUrl(locale, pathname)])
  );
}
