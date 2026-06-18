'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getBlogPosts, type BlogPost } from '@/data/blogPosts';
import { useApp } from '../contexts/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const BlogSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();
  const blogPosts = getBlogPosts(locale);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags from blog posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach((post) => {
      post.tags.forEach((tag) => {
        tags.add(tag);
      });
    });
    return Array.from(tags);
  }, [blogPosts]);

  // Filter blog posts based on selected tags
  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return blogPosts;
    }
    return blogPosts.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    );
  }, [blogPosts, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('blog')}
          </h2>
        </div>

        {/* Tags Filter Chips */}
        <div className="mb-12 flex flex-wrap gap-3 items-center">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedTags.includes(tag)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Tag className="w-4 h-4" />
              {tag}
            </button>
          ))}
          {selectedTags.length > 0 && (
            <button
              onClick={clearFilters}
              className="ml-auto px-4 py-2 rounded-full text-sm font-medium bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              {locale === 'en' ? 'Clear' : locale === 'fa' ? 'پاک کردن' : 'مسح'}
            </button>
          )}
        </div>

        {/* Results count */}
        {selectedTags.length > 0 && (
          <div className="mb-8 text-center text-gray-700 dark:text-gray-300 text-sm">
            {locale === 'en'
              ? `${filteredPosts.length} article${filteredPosts.length !== 1 ? 's' : ''} found`
              : locale === 'fa'
                ? `${filteredPosts.length} مقاله یافت شد`
                : `تم العثور على ${filteredPosts.length} مقالة`}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`group backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border-2 border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden transition-[transform,box-shadow,border-color,opacity] duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                post.comingSoon ? 'hover:scale-100 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {post.comingSoon ? (
                <div>
                  <BlogCardContent locale={locale} post={post} tReadMore={t('readMore')} tComingSoon={t('commingSoon')} />
                </div>
              ) : (
                <Link href={`/${locale}/blog/${post.slug}`} className="block h-full">
                  <BlogCardContent locale={locale} post={post} tReadMore={t('readMore')} tComingSoon={t('commingSoon')} />
                </Link>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

function BlogCardContent({
  locale,
  post,
  tReadMore,
  tComingSoon,
}: {
  locale: string;
  post: BlogPost;
  tReadMore: string;
  tComingSoon: string;
}) {
  return (
    <>
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white border border-white/40">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-300 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

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

        <div
          className={`inline-flex items-center gap-2 font-semibold text-sm transition-[color,gap] ${
            post.comingSoon
              ? 'text-gray-700 dark:text-gray-300 cursor-not-allowed'
              : 'text-blue-600 dark:text-blue-400 group-hover:gap-3'
          }`}
        >
          {post.comingSoon ? tComingSoon : tReadMore}
          {!post.comingSoon && <ArrowRight className="w-4 h-4" />}
        </div>
      </div>
    </>
  );
}
