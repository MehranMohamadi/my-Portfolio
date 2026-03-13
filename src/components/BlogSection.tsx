'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getBlogPosts, type BlogPost } from '@/data/blogPosts';
import { useApp } from '../contexts/AppContext';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const BlogSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();
  const blogPosts = getBlogPosts(locale);

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {t('blog')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className={`group backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-2xl border-2 border-white/40 dark:border-gray-700/40 shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 ${
                post.comingSoon ? 'opacity-70 hover:scale-100 cursor-not-allowed' : 'cursor-pointer'
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

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
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
          className={`inline-flex items-center gap-2 font-semibold text-sm transition-all ${
            post.comingSoon
              ? 'text-gray-400 cursor-not-allowed'
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
