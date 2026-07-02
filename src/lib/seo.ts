export const siteConfig = {
  name: 'Mehran Mohammadi',
  siteUrl: 'https://mehrandev.tech',
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
    title: 'Mehran Mohammadi | Frontend Engineer - Vue, Nuxt, TypeScript',
    description:
      'Frontend Engineer with 4+ years of experience in Vue, Nuxt, TypeScript, production web applications, dashboards, RTL interfaces and scalable product UI.',
    keywords: [
      'Frontend Engineer',
      'Frontend Developer',
      'Vue.js Developer',
      'Nuxt Developer',
      'TypeScript Developer',
      'JavaScript Developer',
      'Next.js Developer',
      'React Developer',
      'RTL Frontend Developer',
      'Persian RTL interfaces',
      'Web Application Development',
      'Dashboard Development',
      'Product UI Engineer',
      'Performance Optimization',
      'Mehran Mohammadi portfolio',
    ],
    ogLocale: 'en_US',
  },
  fa: {
    title: 'مهران محمدی | توسعه‌دهنده فرانت‌اند Vue، Nuxt و TypeScript',
    description:
      'توسعه‌دهنده فرانت‌اند با ۴+ سال تجربه در Vue، Nuxt، TypeScript، ساخت وب اپلیکیشن، داشبورد مدیریتی، رابط کاربری RTL و UI محصولی.',
    keywords: [
      'توسعه‌دهنده فرانت‌اند',
      'برنامه نویس فرانت اند',
      'برنامه‌نویس فرانت‌اند',
      'توسعه‌دهنده Vue.js',
      'برنامه نویس Vue',
      'توسعه‌دهنده Nuxt.js',
      'برنامه نویس Nuxt',
      'توسعه‌دهنده TypeScript',
      'طراحی و توسعه وب اپلیکیشن',
      'ساخت داشبورد مدیریتی',
      'طراحی رابط کاربری RTL',
      'پیاده سازی رابط کاربری فارسی',
      'توسعه رابط کاربری',
      'پورتفولیو فرانت اند',
      'مهران محمدی',
    ],
    ogLocale: 'fa_IR',
  },
  ar: {
    title: 'مهران محمدي | مطور واجهات Vue وNuxt وTypeScript',
    description:
      'مطور واجهات أمامية بخبرة 4+ سنوات في Vue وNuxt وTypeScript وبناء تطبيقات ويب ولوحات معلومات وواجهات RTL قابلة للتوسع.',
    keywords: [
      'مطور واجهات أمامية',
      'مطور Frontend',
      'مطور Vue.js',
      'مطور Nuxt.js',
      'مطور TypeScript',
      'مطور JavaScript',
      'مطور Next.js',
      'تطوير تطبيقات ويب',
      'تطوير لوحات معلومات',
      'واجهات RTL',
      'تصميم واجهات مستخدم',
      'هندسة واجهات أمامية',
      'محفظة مطور واجهات',
      'مهران محمدي',
    ],
    ogLocale: 'ar_AR',
  },
} satisfies Record<
  SiteLocale,
  { title: string; description: string; keywords: string[]; ogLocale: string }
>;

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
    knowsAbout: localeMetadata.en.keywords.filter(
      (keyword) => keyword !== 'Mehran Mohammadi portfolio'
    ),
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
    keywords: localeMetadata[safeLocale].keywords.join(', '),
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
