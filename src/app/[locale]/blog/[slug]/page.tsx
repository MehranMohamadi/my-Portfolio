import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { getBlogPostBySlug, getPublishedBlogSlugs } from '@/data/blogPosts';
import { getAbsoluteUrl, getLanguageAlternates, localeMetadata, normalizeLocale, siteConfig } from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getPostContent(locale: string, slug: string) {
  const post = getBlogPostBySlug(locale, slug);

  if (!post) {
    return null;
  }

  const markdownPath = post.markdownPath?.[locale as 'en' | 'fa' | 'ar'] ?? post.markdownPath?.en;

  if (!markdownPath) {
    return {
      post,
      content: post.excerpt,
    };
  }

  const absolutePath = path.join(process.cwd(), 'public', markdownPath.replace(/^\//, ''));
  const content = await fs.readFile(absolutePath, 'utf8');

  return {
    post,
    content,
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'fa', 'ar'];

  return locales.flatMap((locale) =>
    getPublishedBlogSlugs().map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getBlogPostBySlug(locale, slug);

  if (!post) {
    return {};
  }

  const safeLocale = normalizeLocale(locale);
  const pathname = `/blog/${slug}`;
  const canonical = getAbsoluteUrl(safeLocale, pathname);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical,
      languages: {
        ...getLanguageAlternates(pathname),
        'x-default': getAbsoluteUrl(siteConfig.defaultLocale, pathname),
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonical,
      siteName: siteConfig.name,
      locale: localeMetadata[safeLocale].ogLocale,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: post.image,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const result = await getPostContent(locale, slug);

  if (!result) {
    notFound();
  }

  const { post, content } = result;
  const safeLocale = normalizeLocale(locale);
  const articleUrl = getAbsoluteUrl(safeLocale, `/blog/${slug}`);
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    inLanguage: safeLocale,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.category,
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="overflow-x-hidden bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <article className="max-w-4xl mx-auto">
          <Link
            href={`/${locale}#blog`}
            className="inline-flex items-center gap-2 mb-8 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            {locale === 'fa' ? 'بازگشت به وبلاگ' : locale === 'ar' ? 'العودة إلى المدونة' : 'Back to blog'}
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl shadow-2xl">
            <div className="h-64 sm:h-80">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-6 sm:p-10">
              <span className="inline-flex px-4 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-5 mb-4">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <div className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex px-3 py-1 rounded-lg text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose prose-lg max-w-none dark:prose-invert">
                <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
