import { promises as fs } from 'fs';
import path from 'path';
import { cache } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { getBlogPostBySlug, getPublishedBlogSlugs } from '@/data/blogPosts';
import {
  getAbsoluteAssetUrl,
  getAbsoluteUrl,
  getLanguageAlternates,
  getOpenGraphAlternateLocales,
  getShareImageUrl,
  getWebPageJsonLd,
  localeMetadata,
  normalizeLocale,
  siteConfig,
} from '@/lib/seo';

type PageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

type Messages = Record<string, string>;

async function getMessages(locale: string): Promise<Messages> {
  try {
    return (await import(`../../../../messages/${locale}.json`)).default;
  } catch {
    return (await import("../../../../messages/en.json")).default;
  }
}

function splitFooterMade(value: string) {
  const separators = ["❤️", "❤", "Ã¢ÂÂ¤Ã¯Â¸Â", "â¤ï¸"];
  const separator = separators.find((item) => value.includes(item));

  if (!separator) {
    return { before: value, after: "" };
  }

  const [before, ...after] = value.split(separator);

  return { before, after: after.join(separator) };
}

const getPostContent = cache(async (locale: string, slug: string) => {
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
});

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
  const shareImage = getShareImageUrl(post.image);
  const keywords = Array.from(
    new Set([post.title, post.category, ...post.tags, ...post.seoKeywords])
  );

  return {
    title: post.title,
    description: post.excerpt,
    keywords,
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
      alternateLocale: getOpenGraphAlternateLocales(safeLocale),
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [shareImage],
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
  const isRtl = safeLocale === 'fa' || safeLocale === 'ar';
  const articleUrl = getAbsoluteUrl(safeLocale, `/blog/${slug}`);
  const shareImage = getShareImageUrl(post.image);
  const messages = await getMessages(safeLocale);
  const t = (key: string) => messages[key] ?? key;
  const footerMade = splitFooterMade(t("footerMade"));
  const backToBlogLabel = locale === 'fa' ? 'بازگشت به وبلاگ' : locale === 'ar' ? 'العودة إلى المدونة' : 'Back to blog';
  const markdownComponents: Components = {
    h2: ({ children, ...props }) => (
      <h2 className="mt-12 mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="mt-8 mb-3 text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="my-5 leading-8 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        href={href}
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="font-medium text-blue-700 underline decoration-blue-400/60 underline-offset-4 transition-colors hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="my-4 list-disc space-y-2 ps-6 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="my-4 list-decimal space-y-2 ps-6 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </ol>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote
        className="my-8 rounded-2xl border-s-4 border-blue-500/70 bg-blue-50/80 dark:bg-blue-950/30 px-5 py-4 text-gray-700 dark:text-gray-300"
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ children, ...props }) => (
      <div className="my-8 overflow-x-auto rounded-2xl border border-gray-200/80 dark:border-gray-700/80">
        <table className="min-w-full border-collapse text-sm sm:text-base" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th
        className="bg-gray-100/90 dark:bg-gray-800/90 px-4 py-3 text-start font-semibold text-gray-900 dark:text-gray-100"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border-t border-gray-200/70 dark:border-gray-700/70 px-4 py-3 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </td>
    ),
    hr: (props) => <hr className="my-10 border-gray-200 dark:border-gray-700" {...props} />,
    pre: ({ children, ...props }) => (
      <pre
        className="my-6 overflow-x-auto rounded-2xl border border-gray-800/50 bg-[#0f172a] p-4 text-sm leading-6 text-slate-100 shadow-lg [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-slate-100"
        dir="ltr"
        {...props}
      >
        {children}
      </pre>
    ),
    code: ({ children, className, ...props }) => {
      const isBlock = Boolean(className) || String(children).includes('\n');

      return (
        <code
          className={
            isBlock
              ? `${className ?? ''} bg-transparent p-0 font-mono text-sm text-slate-100`
              : 'rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.9em] text-pink-700 dark:bg-gray-800 dark:text-pink-300'
          }
          {...props}
        >
          {children}
        </code>
      );
    },
  };
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [shareImage],
    inLanguage: safeLocale,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      image: getAbsoluteAssetUrl(siteConfig.profileImage),
    },
    publisher: {
      '@type': 'Person',
      name: siteConfig.name,
      url: siteConfig.siteUrl,
      image: getAbsoluteAssetUrl(siteConfig.profileImage),
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    articleSection: post.category,
    keywords: post.seoKeywords.join(', '),
  };
  const webPageJsonLd = getWebPageJsonLd({
    locale: safeLocale,
    pathname: `/blog/${slug}`,
    title: post.title,
    description: post.excerpt,
  });

  return (
    <div className="min-h-screen relative">
      <Header />
      <main className="overflow-x-hidden bg-background pt-16 pb-16 sm:pt-24 sm:px-6 lg:px-8">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([articleJsonLd, webPageJsonLd]) }}
        />
        <article className="max-w-4xl mx-auto" dir={isRtl ? 'rtl' : 'ltr'}>
          <div className="overflow-hidden bg-white/60 dark:bg-gray-900/60 sm:rounded-3xl sm:border sm:border-white/20 sm:shadow-2xl backdrop-blur-xl">
            <div className="relative h-64 sm:h-80">
              <Link
                href={`/${locale}#blog`}
                aria-label={backToBlogLabel}
                title={backToBlogLabel}
                className="absolute start-4 top-4 z-10 inline-flex size-10 items-center justify-center rounded-full bg-white/85 text-gray-900 shadow-sm backdrop-blur transition-colors hover:bg-white dark:bg-gray-900/85 dark:text-white dark:hover:bg-gray-800"
              >
                {isRtl ? <ArrowRight className="size-5" /> : <ArrowLeft className="size-5" />}
              </Link>
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>

            <div className="p-6 sm:p-10">
              <span className="inline-flex px-4 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                {post.category}
              </span>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mt-5 mb-4">
                {post.title}
              </h1>

              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                {post.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-300 mb-8">
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

              <div className="max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={markdownComponents}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer
        footerText={t("footerText")}
        footerMadeBefore={footerMade.before}
        footerMadeAfter={footerMade.after}
      />
    </div>
  );
}
