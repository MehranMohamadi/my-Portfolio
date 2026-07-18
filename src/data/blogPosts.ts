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
  seoKeywords?: LocalizedTags;
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
  seoKeywords: string[];
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
      fa: '۲۴ مهر ۱۴۰۴',
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
    image: '/img/exec-8ee2d38a-cd25-4787-94ee-830352c9c490.png',
    tags: {
      en: ['JavaScript', 'Performance', 'Optimization'],
      fa: ['JavaScript', 'Performance', 'بهینه‌سازی'],
      ar: ['JavaScript', 'Performance', 'تحسين'],
    },
    seoKeywords: {
      en: [
        'Debounce vs Throttle in JavaScript',
        'JavaScript performance optimization',
        'event handling optimization',
        'frontend performance',
      ],
      fa: [
        'تفاوت Debounce و Throttle در JavaScript',
        'تفاوت Debounce و Throttle در جاوااسکریپت',
        'بهینه سازی performance در جاوااسکریپت',
        'بهینه‌سازی رویدادها در فرانت‌اند',
      ],
      ar: [
        'Debounce vs Throttle في JavaScript',
        'تحسين أداء JavaScript',
        'تحسين معالجة الأحداث',
        'أداء الواجهة الأمامية',
      ],
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
      fa: '۲۲ بهمن ۱۴۰۴',
      ar: '١٠ فبراير ٢٠٢٥',
    },
    publishedAt: '2025-02-10T00:00:00.000Z',
    updatedAt: '2026-07-18T00:00:00.000Z',
    readTime: {
      en: '12 min read',
      fa: '۱۲ دقیقه',
      ar: '١٢ دقيقة',
    },
    category: {
      en: 'Vue.js',
      fa: 'Vue.js',
      ar: 'Vue.js',
    },
    image: '/img/f3f1f1dc-27ff-4f37-86f5-8ec1a905fc61.png',
    tags: {
      en: ['Vue', 'nextTick', 'DOM'],
      fa: ['Vue', 'nextTick', 'DOM'],
      ar: ['Vue', 'nextTick', 'DOM'],
    },
    seoKeywords: {
      en: [
        'Vue nextTick guide',
        'Vue DOM updates',
        'nextTick in Vue',
        'Vue Composition API timing',
      ],
      fa: [
        'آموزش nextTick در Vue',
        'nextTick در Vue چیست',
        'آپدیت DOM در Vue',
        'زمان اجرای کد بعد از رندر Vue',
      ],
      ar: [
        'دليل nextTick في Vue',
        'ما هو nextTick في Vue',
        'تحديث DOM في Vue',
        'توقيت Composition API في Vue',
      ],
    },
    markdownPath: {
      en: '/blog/vue_next_tick_blog_en.md',
      fa: '/blog/vue_next_tick_blog_fa.md',
      ar: '/blog/vue_next_tick_blog_en.md',
    },
  },
  {
    id: 9,
    slug: 'javascript-context-and-scope',
    title: {
      en: 'Context and Scope in JavaScript',
      fa: 'Context و Scope در JavaScript',
      ar: 'Context and Scope في JavaScript',
    },
    excerpt: {
      en: 'Learn the difference between scope and execution context, and how this affects this, closures, and debugging.',
      fa: 'تفاوت Scope و Context را در جاوااسکریپت یاد بگیر و ببین این مفاهیم چه تاثیری روی this، closure و دیباگ کردن دارند.',
      ar: 'تعرّف على الفرق بين Scope وContext في JavaScript وكيف يؤثران على this وclosures وتصحيح الأخطاء.',
    },
    date: {
      en: 'Apr 02, 2026',
      fa: '۱۳ فروردین ۱۴۰۵',
      ar: '٢ أبريل ٢٠٢٦',
    },
    publishedAt: '2026-04-02T00:00:00.000Z',
    updatedAt: '2026-04-02T00:00:00.000Z',
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
    image: '/img/javascript-context-scope-guide.png',
    tags: {
      en: ['JavaScript', 'Scope', 'Context'],
      fa: ['JavaScript', 'Scope', 'Context'],
      ar: ['JavaScript', 'Scope', 'Context'],
    },
    seoKeywords: {
      en: [
        'Context and Scope in JavaScript',
        'JavaScript scope explained',
        'JavaScript execution context',
        'this and closures in JavaScript',
      ],
      fa: [
        'تفاوت Scope و Context در JavaScript',
        'تفاوت Scope و Context در جاوااسکریپت',
        'execution context در JavaScript',
        'this و closure در جاوااسکریپت',
      ],
      ar: [
        'Context and Scope في JavaScript',
        'شرح Scope في JavaScript',
        'execution context في JavaScript',
        'this وclosures في JavaScript',
      ],
    },
    markdownPath: {
      en: '/blog/context_scope_blog_en.md',
      fa: '/blog/context_scope_blog_fa.md',
      ar: '/blog/context_scope_blog_en.md',
    },
  },
  {
    id: 10,
    slug: 'vue-context-and-scope-guide',
    title: {
      en: 'Context and Scope in Vue',
      fa: 'Context و Scope در Vue',
      ar: 'Context and Scope في Vue',
    },
    excerpt: {
      en: 'Understand Vue scope and execution context, and learn why APIs like watch must run inside setup or a Vue composable.',
      fa: 'بفهم که scope و context در Vue چه فرقی دارند و چرا APIهایی مثل watch باید داخل setup یا یک composable اجرا شوند.',
      ar: 'افهم الفرق بين scope وcontext في Vue ولماذا يجب تشغيل watch داخل setup أو composable من Vue.',
    },
    date: {
      en: 'Apr 02, 2026',
      fa: '۱۳ فروردین ۱۴۰۵',
      ar: '٢ أبريل ٢٠٢٦',
    },
    publishedAt: '2026-04-02T00:00:00.000Z',
    updatedAt: '2026-04-02T00:00:00.000Z',
    readTime: {
      en: '8 min read',
      fa: '۸ دقیقه',
      ar: '٨ دقائق',
    },
    category: {
      en: 'Vue.js',
      fa: 'Vue.js',
      ar: 'Vue.js',
    },
    image: '/img/vue-context-scope-guide.png',
    tags: {
      en: ['Vue', 'watch', 'Composition API'],
      fa: ['Vue', 'watch', 'Composition API'],
      ar: ['Vue', 'watch', 'Composition API'],
    },
    seoKeywords: {
      en: [
        'Context and Scope in Vue',
        'Vue scope explained',
        'Vue watch inside setup',
        'Vue composable context',
      ],
      fa: [
        'Scope و Context در Vue',
        'تفاوت Scope و Context در Vue',
        'watch داخل setup در Vue',
        'context در composable های Vue',
      ],
      ar: [
        'Context and Scope في Vue',
        'شرح Scope في Vue',
        'watch داخل setup في Vue',
        'context في Vue composables',
      ],
    },
    markdownPath: {
      en: '/blog/vue_context_scope_blog_en.md',
      fa: '/blog/vue_context_scope_blog_fa.md',
      ar: '/blog/vue_context_scope_blog_en.md',
    },
  },
  {
    id: 8,
    slug: 'event-loop-in-javascript',
    title: {
      en: 'Event Loop in JavaScript',
      fa: 'Event Loop در جاوااسکریپت',
      ar: 'Event Loop في JavaScript',
    },
    excerpt: {
      en: 'Understand how call stack, microtasks, and macrotasks work together in JavaScript.',
      fa: 'درک کامل از همکاری Call Stack، Microtask و Macrotask در اجرای async جاوااسکریپت.',
      ar: 'افهم كيف يعمل Call Stack وMicrotasks وMacrotasks معًا في JavaScript.',
    },
    date: {
      en: 'Mar 01, 2025',
      fa: '۱۱ اسفند ۱۴۰۴',
      ar: '١ مارس ٢٠٢٥',
    },
    publishedAt: '2025-03-01T00:00:00.000Z',
    updatedAt: '2025-03-01T00:00:00.000Z',
    readTime: {
      en: '9 min read',
      fa: '۹ دقیقه',
      ar: '٩ دقائق',
    },
    category: {
      en: 'JavaScript',
      fa: 'JavaScript',
      ar: 'JavaScript',
    },
    image: '/img/javascript-event-loop-guide.png',
    tags: {
      en: ['JavaScript', 'Event Loop', 'Async'],
      fa: ['JavaScript', 'Event Loop', 'Async'],
      ar: ['JavaScript', 'Event Loop', 'Async'],
    },
    seoKeywords: {
      en: [
        'Event Loop in JavaScript',
        'JavaScript event loop explained',
        'microtasks and macrotasks',
        'async JavaScript performance',
      ],
      fa: [
        'Event Loop در جاوااسکریپت',
        'event loop در JavaScript چیست',
        'تفاوت microtask و macrotask',
        'اجرای async در جاوااسکریپت',
      ],
      ar: [
        'Event Loop في JavaScript',
        'شرح event loop في JavaScript',
        'microtasks وmacrotasks',
        'تنفيذ async في JavaScript',
      ],
    },
    markdownPath: {
      en: '/blog/event_loop_blog_en.md',
      fa: '/blog/event_loop_blog_fa.md',
      ar: '/blog/event_loop_blog_en.md',
    },
  },
  {
    id: 7,
    slug: 'nitro-js-guide',
    title: {
      en: 'Nitro.js - The Fullstack HTTP Server',
      fa: 'Nitro.js - سرور HTTP کامل',
      ar: 'Nitro.js - خادم HTTP الكامل',
    },
    excerpt: {
      en: 'Learn how to build fast and scalable HTTP servers with Nitro.js',
      fa: 'یاد بگیر چگونه با Nitro.js سرورهای سریع و مقیاس‌پذیر بسازی',
      ar: 'تعلّم كيفية بناء خوادم HTTP سريعة وقابلة للتوسع باستخدام Nitro.js',
    },
    date: {
      en: 'May 14, 2026',
      fa: '۲۴ اردیبهشت ۱۴۰۵',
      ar: '١٤ مايو ٢٠٢٦',
    },
    publishedAt: '2026-05-14T00:00:00.000Z',
    updatedAt: '2026-05-14T00:00:00.000Z',
    readTime: {
      en: '10 min read',
      fa: '۱۰ دقیقه',
      ar: '١٠ دقائق',
    },
    category: {
      en: 'Backend',
      fa: 'بک‌اند',
      ar: 'الواجهة الخلفية',
    },
    image: '/img/nitro-js-guide.png',
    tags: {
      en: ['Nitro', 'Backend', 'JavaScript'],
      fa: ['Nitro', 'بک‌اند', 'JavaScript'],
      ar: ['Nitro', 'الواجهة الخلفية', 'JavaScript'],
    },
    seoKeywords: {
      en: [
        'Nitro.js guide',
        'Nitro JavaScript server',
        'Nuxt server engine',
        'fullstack JavaScript HTTP server',
      ],
      fa: [
        'Nitro.js چیست',
        'آموزش Nitro.js',
        'سرور JavaScript با Nitro',
        'موتور سرور Nuxt',
      ],
      ar: [
        'دليل Nitro.js',
        'ما هو Nitro.js',
        'خادم JavaScript باستخدام Nitro',
        'محرك خادم Nuxt',
      ],
    },
    markdownPath: {
      en: '/blog/nitro_js_blog_en.md',
      fa: '/blog/nitro_js_blog_fa.md',
      ar: '/blog/nitro_js_blog_en.md',
    },
  },
  {
    id: 11,
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
    seoKeywords: {
      en: [
        'AI frontend integration',
        'AI API in frontend apps',
        'frontend AI workflows',
      ],
      fa: [
        'ادغام AI با فرانت‌اند',
        'استفاده از API هوش مصنوعی در فرانت‌اند',
        'هوش مصنوعی در وب اپلیکیشن',
      ],
      ar: [
        'دمج الذكاء الاصطناعي مع الواجهة الأمامية',
        'واجهات AI في تطبيقات الويب',
        'سير عمل AI في Frontend',
      ],
    },
    comingSoon: true,
  },
  {
    id: 12,
    slug: 'gpt-5-6-model-family-guide',
    title: {
      en: 'GPT-5.6: Which Model Is Right for Your Project?',
      fa: 'GPT-5.6؛ کدام مدل برای پروژه شما مناسب است؟',
      ar: 'GPT-5.6: أي نموذج يناسب مشروعك؟',
    },
    excerpt: {
      en: 'A practical, source-backed guide to choosing GPT-5.6 Sol, Terra, or Luna for real-world AI workflows.',
      fa: '',
      ar: 'دليل عملي موثق لاختيار GPT-5.6 Sol أو Terra أو Luna لسير عمل الذكاء الاصطناعي.',
    },
    date: {
      en: 'Jul 11, 2026',
      fa: '۲۰ تیر ۱۴۰۵',
      ar: '١١ يوليو ٢٠٢٦',
    },
    publishedAt: '2026-07-11T00:00:00.000Z',
    updatedAt: '2026-07-11T00:00:00.000Z',
    readTime: {
      en: '9 min read',
      fa: '۹ دقیقه',
      ar: '٩ دقائق',
    },
    category: {
      en: 'AI',
      fa: 'هوش مصنوعی',
      ar: 'الذكاء الاصطناعي',
    },
    image: '/img/gpt-5-6-model-family-guide.png',
    tags: {
      en: ['OpenAI', 'GPT-5.6', 'Agents'],
      fa: ['OpenAI', 'GPT-5.6', 'Agent'],
      ar: ['OpenAI', 'GPT-5.6', 'Agents'],
    },
    seoKeywords: {
      en: ['GPT-5.6 Sol Terra Luna', 'GPT-5.6 pricing', 'OpenAI multi-agent', 'Programmatic Tool Calling'],
      fa: ['GPT-5.6 چیست', 'GPT-5.6 Sol Terra Luna', 'قیمت GPT-5.6', 'Multi-agent در OpenAI', 'Programmatic Tool Calling'],
      ar: ['GPT-5.6 Sol Terra Luna', 'أسعار GPT-5.6', 'OpenAI Multi-agent', 'Programmatic Tool Calling'],
    },
    markdownPath: {
      en: '/blog/gpt_5_6_models_en.md',
      fa: '/blog/gpt_5_6_models_fa.md',
      ar: '/blog/gpt_5_6_models_ar.md',
    },
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
    seoKeywords: definition.seoKeywords?.[safeLocale] ?? definition.tags[safeLocale],
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
