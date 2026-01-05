import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslations } from 'next-intl';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

export const BlogSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations(); 
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: locale === 'en' ? 'Building Modern Web Apps with Vue.js' : locale === 'fa' ? 'ساخت برنامه‌های وب مدرن با Vue.js' : 'بناء تطبيقات ويب حديثة باستخدام Vue.js',
      excerpt: locale === 'en' 
        ? 'Learn how to build scalable and performant web applications using Vue.js and modern development practices.' 
        : locale === 'fa'
        ? 'یاد بگیرید چگونه برنامه‌های وب مقیاس‌پذیر و کارآمد با Vue.js و شیوه‌های توسعه مدرن بسازید.'
        : 'تعلم كيفية بناء تطبيقات ويب قابلة للتطوير وذات أداء عالي باستخدام Vue.js وممارسات التطوير الحديثة.',
      date: locale === 'en' ? 'Dec 15, 2024' : locale === 'fa' ? '۲۴ آذر ۱۴۰۳' : '١٥ ديسمبر ٢٠٢٤',
      readTime: locale === 'en' ? '8 min read' : locale === 'fa' ? '۸ دقیقه' : '٨ دقائق',
      category: locale === 'en' ? 'Tutorial' : locale === 'fa' ? 'آموزش' : 'درس',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      tags: ['Vue.js', 'JavaScript', locale === 'en' ? 'Frontend' : locale === 'fa' ? 'فرانت‌اند' : 'الواجهة الأمامية'],
    },
    {
      id: 2,
      title: locale === 'en' ? 'Mastering Tailwind CSS' : locale === 'fa' ? 'تسلط بر Tailwind CSS' : 'إتقان Tailwind CSS',
      excerpt: locale === 'en'
        ? 'Discover advanced techniques and best practices for building beautiful UIs with Tailwind CSS.'
        : locale === 'fa'
        ? 'تکنیک‌های پیشرفته و بهترین شیوه‌ها برای ساخت رابط‌های کاربری زیبا با Tailwind CSS را کشف کنید.'
        : 'اكتشف التقنيات المتقدمة وأفضل الممارسات لبناء واجهات مستخدم جميلة باستخدام Tailwind CSS.',
      date: locale === 'en' ? 'Nov 28, 2024' : locale === 'fa' ? '۸ آذر ۱۴۰۳' : '٢٨ نوفمبر ٢٠٢٤',
      readTime: locale === 'en' ? '6 min read' : locale === 'fa' ? '۶ دقیقه' : '٦ دقائق',
      category: locale === 'en' ? 'Design' : locale === 'fa' ? 'طراحی' : 'تصميم',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80',
      tags: ['Tailwind', 'CSS', locale === 'en' ? 'Design' : locale === 'fa' ? 'طراحی' : 'تصميم'],
    },
    {
      id: 3,
      title: locale === 'en' ? 'Performance Optimization Tips' : locale === 'fa' ? 'نکات بهینه‌سازی عملکرد' : 'نصائح تحسين الأداء',
      excerpt: locale === 'en'
        ? 'Essential techniques to make your web applications faster and more efficient.'
        : locale === 'fa'
        ? 'تکنیک‌های ضروری برای سریع‌تر و کارآمدتر کردن برنامه‌های وب شما.'
        : 'تقنيات أساسية لجعل تطبيقات الويب الخاصة بك أسرع وأكثر كفاءة.',
      date: locale === 'en' ? 'Nov 10, 2024' : locale === 'fa' ? '۲۰ آبان ۱۴۰۳' : '١٠ نوفمبر ٢٠٢٤',
      readTime: locale === 'en' ? '10 min read' : locale === 'fa' ? '۱۰ دقیقه' : '١٠ دقائق',
      category: locale === 'en' ? 'Performance' : locale === 'fa' ? 'عملکرد' : 'الأداء',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
      tags: [locale === 'en' ? 'Performance' : locale === 'fa' ? 'عملکرد' : 'الأداء', locale === 'en' ? 'Optimization' : locale === 'fa' ? 'بهینه‌سازی' : 'التحسين', 'Web'],
    },
    {
      id: 4,
      title: locale === 'en' ? 'Nuxt.js: The Complete Guide' : locale === 'fa' ? 'Nuxt.js: راهنمای کامل' : 'Nuxt.js: الدليل الكامل',
      excerpt: locale === 'en'
        ? 'Everything you need to know about building SSR applications with Nuxt.js.'
        : locale === 'fa'
        ? 'همه چیزی که باید درباره ساخت برنامه‌های SSR با Nuxt.js بدانید.'
        : 'كل ما تحتاج إلى معرفته حول بناء تطبيقات SSR باستخدام Nuxt.js.',
      date: locale === 'en' ? 'Oct 22, 2024' : locale === 'fa' ? '۱ آبان ۱۴۰۳' : '٢٢ أكتوبر ٢٠٢٤',
      readTime: locale === 'en' ? '12 min read' : locale === 'fa' ? '۱۲ دقیقه' : '١٢ دقيقة',
      category: locale === 'en' ? 'Framework' : locale === 'fa' ? 'فریمورک' : 'إطار العمل',
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
      tags: ['Nuxt.js', 'Vue.js', 'SSR'],
    },
    {
      id: 5,
      title: locale === 'en' ? 'Modern CSS Techniques' : locale === 'fa' ? 'تکنیک‌های مدرن CSS' : 'تقنيات CSS الحديثة',
      excerpt: locale === 'en'
        ? 'Explore the latest CSS features including Grid, Flexbox, and custom properties.'
        : locale === 'fa'
        ? 'ویژگی‌های جدید CSS شامل Grid، Flexbox و ویژگی‌های سفارشی را کاوش کنید.'
        : 'استكشف أحدث ميزات CSS بما في ذلك Grid و Flexbox والخصائص المخصصة.',
      date: locale === 'en' ? 'Oct 5, 2024' : locale === 'fa' ? '۱۴ مهر ۱۴۰۳' : '٥ أكتوبر ٢٠٢٤',
      readTime: locale === 'en' ? '7 min read' : locale === 'fa' ? '۷ دقیقه' : '٧ دقائق',
      category: locale === 'en' ? 'CSS' : 'CSS',
      image: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&q=80',
      tags: ['CSS', 'Grid', 'Flexbox'],
    },
    {
      id: 6,
      title: locale === 'en' ? 'JavaScript Best Practices 2024' : locale === 'fa' ? 'بهترین شیوه‌های JavaScript 2024' : 'أفضل ممارسات JavaScript 2024',
      excerpt: locale === 'en'
        ? 'Stay up-to-date with modern JavaScript patterns and coding standards.'
        : locale === 'fa'
        ? 'با الگوها و استانداردهای کدنویسی مدرن JavaScript به‌روز بمانید.'
        : 'ابق على اطلاع بأنماط JavaScript الحديثة ومعايير الترميز.',
      date: locale === 'en' ? 'Sep 18, 2024' : locale === 'fa' ? '۲۸ شهریور ۱۴۰۳' : '١٨ سبتمبر ٢٠٢٤',
      readTime: locale === 'en' ? '9 min read' : locale === 'fa' ? '۹ دقیقه' : '٩ دقائق',
      category: locale === 'en' ? 'JavaScript' : 'JavaScript',
      image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
      tags: ['JavaScript', locale === 'en' ? 'Best Practices' : locale === 'fa' ? 'بهترین شیوه‌ها' : 'أفضل الممارسات', 'ES2024'],
    },
  ];

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            blogTitle
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            blogSubtitle
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border-2 border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white border border-white/40">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <button className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                  readMore
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
