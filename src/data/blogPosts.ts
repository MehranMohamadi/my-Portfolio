export type BlogLocale = 'en' | 'fa' | 'ar';

type LocalizedString = Record<BlogLocale, string>;
type LocalizedTags = Record<BlogLocale, string[]>;
type LocalizedMarkdownPath = Partial<Record<BlogLocale, string>>;

interface BlogPostDefinition {
  id: number;
  slug: string;
  title: LocalizedString;
  excerpt: LocalizedString;
  date: LocalizedString;
  publishedAt?: string;
  updatedAt?: string;
  readTime: LocalizedString;
  category: LocalizedString;
  image: string;
  tags: LocalizedTags;
  comingSoon?: boolean;
  markdownPath?: LocalizedMarkdownPath;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  publishedAt?: string;
  updatedAt?: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  comingSoon?: boolean;
  markdownPath?: LocalizedMarkdownPath;
}

const blogPostDefinitions: BlogPostDefinition[] = [
  {
    id: 5,
    slug: 'debounce-vs-throttle-in-javascript',
    title: {
      en: 'Debounce vs Throttle in JavaScript',
      fa: 'Debounce و Throttle در جاوااسکریپت',
      ar: 'Debounce vs Throttle في JavaScript',
    },
    excerpt: {
      en: 'Master event handling optimization techniques for better performance',
      fa: 'تکنیک‌های بهینه‌سازی مدیریت رویدادها برای عملکرد بهتر',
      ar: 'تقنيات تحسين معالجة الأحداث لأداء أفضل',
    },
    date: {
      en: 'Oct 15, 2024',
      fa: '۲۴ مهر ۱۴۰۳',
      ar: '١٥ أكتوبر ٢٠٢٤',
    },
    publishedAt: '2024-10-15T00:00:00.000Z',
    updatedAt: '2024-10-15T00:00:00.000Z',
    readTime: {
      en: '8 min read',
      fa: '۸ دقیقه',
      ar: '٨ دقائق',
    },
    category: {
      en: 'JavaScript',
      fa: 'JavaScript',
      ar: 'JavaScript',
    },
    image: '/img/debounce-throttle-cover.svg',
    tags: {
      en: ['JavaScript', 'Performance', 'Optimization'],
      fa: ['JavaScript', 'Performance', 'بهینه‌سازی'],
      ar: ['JavaScript', 'Performance', 'تحسين'],
    },
    markdownPath: {
      en: '/blog/debounce_throttle_blog_en.md',
      fa: '/blog/debounce_throttle_blog_fa.md',
      ar: '/blog/debounce_throttle_blog_en.md',
    },
  },
  {
    id: 6,
    slug: 'vue-next-tick-guide',
    title: {
      en: 'Vue nextTick Guide',
      fa: 'راهنمای nextTick در Vue',
      ar: 'دليل nextTick في Vue',
    },
    excerpt: {
      en: 'Learn when and how to use nextTick to run logic after DOM updates in Vue.',
      fa: 'یاد بگیر چگونه و چه زمانی از nextTick برای اجرای کد بعد از آپدیت DOM در Vue استفاده کنی.',
      ar: 'تعلّم متى وكيف تستخدم nextTick لتشغيل المنطق بعد تحديث DOM في Vue.',
    },
    date: {
      en: 'Feb 10, 2025',
      fa: '۲۲ بهمن ۱۴۰۳',
      ar: '١٠ فبراير ٢٠٢٥',
    },
    publishedAt: '2025-02-10T00:00:00.000Z',
    updatedAt: '2025-02-10T00:00:00.000Z',
    readTime: {
      en: '7 min read',
      fa: '۷ دقیقه',
      ar: '٧ دقائق',
    },
    category: {
      en: 'Vue.js',
      fa: 'Vue.js',
      ar: 'Vue.js',
    },
    image: '/img/vue-nexttick-cover.svg',
    tags: {
      en: ['Vue', 'nextTick', 'DOM'],
      fa: ['Vue', 'nextTick', 'DOM'],
      ar: ['Vue', 'nextTick', 'DOM'],
    },
    markdownPath: {
      en: '/blog/vue_next_tick_blog_en.md',
      fa: '/blog/vue_next_tick_blog_fa.md',
      ar: '/blog/vue_next_tick_blog_en.md',
    },
  },
  {
    id: 7,
    slug: 'ai-frontend-integration',
    title: {
      en: 'AI + Frontend Integration',
      fa: 'ادغام AI با فرانت‌اند',
      ar: 'دمج الذكاء الاصطناعي مع الواجهة الأمامية',
    },
    excerpt: {
      en: 'A deep dive into integrating AI APIs into modern frontend apps.',
      fa: 'بررسی عمیق ادغام APIهای هوش مصنوعی در اپلیکیشن‌های مدرن فرانت‌اند.',
      ar: 'نظرة عميقة حول دمج واجهات برمجة الذكاء الاصطناعي في تطبيقات الويب الحديثة.',
    },
    date: {
      en: '-',
      fa: '-',
      ar: '-',
    },
    updatedAt: '2026-03-13T00:00:00.000Z',
    readTime: {
      en: '-',
      fa: '-',
      ar: '-',
    },
    category: {
      en: 'AI',
      fa: 'هوش مصنوعی',
      ar: 'الذكاء الاصطناعي',
    },
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
    tags: {
      en: ['AI', 'Frontend'],
      fa: ['AI', 'Frontend'],
      ar: ['AI', 'Frontend'],
    },
    comingSoon: true,
  },
];

function normalizeLocale(locale: string): BlogLocale {
  if (locale === 'fa' || locale === 'ar') {
    return locale;
  }

  return 'en';
}

function localizePost(definition: BlogPostDefinition, locale: string): BlogPost {
  const safeLocale = normalizeLocale(locale);

  return {
    id: definition.id,
    slug: definition.slug,
    title: definition.title[safeLocale],
    excerpt: definition.excerpt[safeLocale],
    date: definition.date[safeLocale],
    publishedAt: definition.publishedAt,
    updatedAt: definition.updatedAt,
    readTime: definition.readTime[safeLocale],
    category: definition.category[safeLocale],
    image: definition.image,
    tags: definition.tags[safeLocale],
    comingSoon: definition.comingSoon,
    markdownPath: definition.markdownPath,
  };
}

export function getBlogPosts(locale: string): BlogPost[] {
  return blogPostDefinitions.map((post) => localizePost(post, locale));
}

export function getBlogPostBySlug(locale: string, slug: string): BlogPost | null {
  const post = blogPostDefinitions.find((item) => item.slug === slug && !item.comingSoon);

  if (!post) {
    return null;
  }

  return localizePost(post, locale);
}

export function getPublishedBlogSlugs(): string[] {
  return blogPostDefinitions
    .filter((post) => !post.comingSoon)
    .map((post) => post.slug);
}

export function getPublishedBlogPosts(locale: string): BlogPost[] {
  return blogPostDefinitions
    .filter((post) => !post.comingSoon)
    .map((post) => localizePost(post, locale));
}
