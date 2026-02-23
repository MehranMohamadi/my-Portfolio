import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight, Tag, X } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslations } from 'next-intl';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw"; // اضافه کردن این import

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
  comingSoon?: boolean;
 markdownPath?: {
    en?: string;
    fa?: string;
    ar?: string;
  };
}

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [markdownContent, setMarkdownContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { locale } = useApp();
  const t = useTranslations(); 
  const [hoveredPost, setHoveredPost] = useState<number | null>(null);

  const blogPosts: BlogPost[] = [
    {
      id: 5, // تغییر id به 5 برای مقاله debounce
      title: locale === 'en' ? 'Debounce vs Throttle in JavaScript' : locale === 'fa' ? 'Debounce و Throttle در جاوااسکریپت' : 'Debounce vs Throttle في JavaScript',
      excerpt: locale === 'en'
        ? 'Master event handling optimization techniques for better performance'
        : locale === 'fa'
        ? 'تکنیک‌های بهینه‌سازی مدیریت رویدادها برای عملکرد بهتر'
        : 'تقنيات تحسين معالجة الأحداث لأداء أفضل',
      date: locale === 'en' ? 'Oct 15, 2024' : locale === 'fa' ? '۲۴ مهر ۱۴۰۳' : '١٥ أكتوبر ٢٠٢٤',
      readTime: locale === 'en' ? '8 min read' : locale === 'fa' ? '۸ دقیقه' : '٨ دقائق',
      category: locale === 'en' ? 'JavaScript' : 'JavaScript',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwZCnG7gOeMC3na7dUIEzr0MNrHjWhAWygKA&s',
      tags: ['JavaScript', 'Performance', locale === 'en' ? 'Optimization' : locale === 'fa' ? 'بهینه‌سازی' : 'تحسين'],
      markdownPath: {
  en: '/blog/debounce_throttle_blog_en.md',
  fa: '/blog/debounce_throttle_blog_fa.md',
  ar: '/blog/debounce_throttle_blog_en.md',
},
    },
    // {
    //   id: 6,
    //   title: locale === 'en' ? 'JavaScript Best Practices 2024' : locale === 'fa' ? 'بهترین شیوه‌های JavaScript 2024' : 'أفضل ممارسات JavaScript 2024',
    //   excerpt: locale === 'en'
    //     ? 'Stay up-to-date with modern JavaScript patterns and coding standards.'
    //     : locale === 'fa'
    //     ? 'با الگوها و استانداردهای کدنویسی مدرن JavaScript به‌روز بمانید.'
    //     : 'ابق على اطلاع بأنماط JavaScript الحديثة ومعايير الترميز.',
    //   date: locale === 'en' ? 'Sep 18, 2024' : locale === 'fa' ? '۲۸ شهریور ۱۴۰۳' : '١٨ سبتمبر ٢٠٢٤',
    //   readTime: locale === 'en' ? '9 min read' : locale === 'fa' ? '۹ دقیقه' : '٩ دقائق',
    //   category: locale === 'en' ? 'JavaScript' : 'JavaScript',
    //   image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=800&q=80',
    //   tags: ['JavaScript', locale === 'en' ? 'Best Practices' : locale === 'fa' ? 'بهترین شیوه‌ها' : 'أفضل الممارسات', 'ES2024'],
    // },
    {
      id: 7,
      title: locale === 'en' ? 'AI + Frontend Integration' : locale === 'fa' ? 'ادغام AI با فرانت‌اند' : 'دمج الذكاء الاصطناعي مع الواجهة الأمامية',
      excerpt: locale === 'en'
        ? 'A deep dive into integrating AI APIs into modern frontend apps.'
        : locale === 'fa'
        ? 'بررسی عمیق ادغام APIهای هوش مصنوعی در اپلیکیشن‌های مدرن فرانت‌اند.'
        : 'نظرة عميقة حول دمج واجهات برمجة الذكاء الاصطناعي في تطبيقات الويب الحديثة.',
      date: '-',
      readTime: '-',
      category: locale === 'en' ? 'AI' : locale === 'fa' ? 'هوش مصنوعی' : 'الذكاء الاصطناعي',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
      tags: ['AI', 'Frontend'],
      comingSoon: true,
    },
  ];

  // بارگذاری محتوای مارکداون وقتی مقاله انتخاب می‌شود
useEffect(() => {
  if (selectedPost?.markdownPath) {
    const path = selectedPost.markdownPath[locale];

    if (!path) {
      setMarkdownContent(locale === 'fa' ? 'محتوا موجود نیست' : 'Content not available');
      return;
    }

    setIsLoading(true);

    fetch(path)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load content');
        return res.text();
      })
      .then((text) => {
        setMarkdownContent(text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading markdown:', error);
        setMarkdownContent(locale === 'fa' ? 'خطا در بارگذاری محتوا' : 'Error loading content');
        setIsLoading(false);
      });
  } else {
    setMarkdownContent('');
  }
}, [selectedPost, locale]);

  // پاکسازی محتوا هنگام بسته شدن مودال
  const handleCloseModal = () => {
    setSelectedPost(null);
    setMarkdownContent("");
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('blog')}   
          </h2>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              onClick={() => !post.comingSoon && setSelectedPost(post)}
              key={post.id}
              className={`group backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border-2 border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                post.comingSoon ? 'opacity-70 hover:scale-100 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onMouseEnter={() => setHoveredPost(post.id)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    post.comingSoon ? 'blur-sm group-hover:scale-100' : ''
                  }`}
                />
                {post.comingSoon && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <span className="px-4 py-2 bg-white text-black rounded-xl font-bold text-sm">
                      {locale === 'en' ? 'Coming Soon' : locale === 'fa' ? 'به‌زودی' : 'قريباً'}
                    </span>
                  </div>
                )}
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
                <button
                  disabled={post.comingSoon}
                  className={`inline-flex items-center gap-2 font-semibold text-sm transition-all ${
                    post.comingSoon
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 dark:text-blue-400 group-hover:gap-3'
                  }`}
                >
                  {post.comingSoon
                      ? t('commingSoon')
                      : t('readMore')
                  }
                  {!post.comingSoon && <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
  <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
    
    <div className="relative w-full  h-full overflow-y-auto bg-white dark:bg-gray-900 shadow-2xl pt-18 p-8 animate-fadeIn">
            
            {/* Close Button */}
            <button
        onClick={handleCloseModal}
        className=" top-10 fixed bg-gray-300 rounded-full p-1 h-8 w-8 flex items-center justify-center right-10 text-gray-800 hover:text-black dark:hover:text-white text-2xl"
            >
                             <X className="w-3 h-3" />

            </button>

              {/* Image */}
      <div className="h-52 rounded-2xl overflow-hidden mb-6">
                <ImageWithFallback
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-fill"
                />
              </div>

              {/* Category */}
              <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                {selectedPost.category}
              </span>

              {/* Title */}
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                {selectedPost.title}
              </h2>

              {/* Meta */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {selectedPost.readTime}
                </div>
              </div>

              {/* Content */}
              <div className="text-gray-700 dark:text-gray-300 leading-8">
                {!selectedPost.markdownPath ? (
                  <p>{selectedPost.excerpt}</p>
                ) : isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="prose dark:prose-invert max-w-none w-full">
                <ReactMarkdown 
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]} // اضافه کردن این خط
  >
    {markdownContent}
  </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
      )}
    </section>
  );
};