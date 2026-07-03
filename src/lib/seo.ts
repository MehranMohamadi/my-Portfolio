import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Mehran Mohammadi',
  shortName: 'Mehran Dev',
  siteUrl: 'https://mehranmohammadifrd.ir',
  defaultLocale: 'en',
  locales: ['en', 'fa', 'ar'] as const,
  ogImage: '/og-image.png',
  brandImage: '/img/brand/mehran-brand.png',
  profileImage: '/img/profile.jpg',
  sameAs: [
    'https://github.com/MehranMohamadi',
    'https://www.linkedin.com/in/mehran-mohammadi-far/',
  ],
};

export const siteIcons = {
  icon: [
    { url: '/favicon.ico', sizes: '32x32' },
    { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
  ],
  shortcut: [{ url: '/favicon.ico' }],
  apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
} satisfies Metadata['icons'];

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
      'Fars News frontend',
      'Virasty frontend',
      'Msg Way frontend',
      'Gap Messenger frontend',
      'Bimehyar web application',
      'Nasim Rezvan frontend',
      'Tavan Sanat Shargh website',
      'RPG Skill Tracker',
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
      'فرانت‌اند خبرگزاری فارس',
      'فرانت‌اند ویراستی',
      'فرانت‌اند راه پیام',
      'پیام‌رسان گپ',
      'وب اپلیکیشن بیمه یار',
      'فرانت‌اند نسیم رضوان',
      'وب‌سایت توان صنعت شرق',
      'ردیاب مهارت RPG',
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
      'Fars News Frontend',
      'Virasty Frontend',
      'Msg Way Frontend',
      'Gap Messenger Frontend',
      'Bimehyar web application',
      'Nasim Rezvan Frontend',
      'Tavan Sanat Shargh website',
      'RPG Skill Tracker',
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

export function getOpenGraphAlternateLocales(locale: string) {
  const safeLocale = normalizeLocale(locale);

  return siteConfig.locales
    .filter((item) => item !== safeLocale)
    .map((item) => localeMetadata[item].ogLocale);
}

export function getDefaultOpenGraphImage(alt = `${siteConfig.name} - Frontend Engineer`) {
  return [
    {
      url: siteConfig.ogImage,
      width: 1200,
      height: 630,
      alt,
      type: 'image/png',
    },
  ];
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
