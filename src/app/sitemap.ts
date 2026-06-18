import { MetadataRoute } from "next";
import { getPublishedBlogPosts } from "@/data/blogPosts";
import { getAbsoluteUrl, getLanguageAlternates, siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const localeEntries: MetadataRoute.Sitemap = siteConfig.locales.map((locale) => ({
    url: getAbsoluteUrl(locale),
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
    alternates: {
      languages: {
        ...getLanguageAlternates(),
        "x-default": getAbsoluteUrl(siteConfig.defaultLocale),
      },
    },
  }));

  const blogEntries: MetadataRoute.Sitemap = siteConfig.locales.flatMap((locale) =>
    getPublishedBlogPosts(locale).map((post) => ({
      url: getAbsoluteUrl(locale, `/blog/${post.slug}`),
      lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          ...getLanguageAlternates(`/blog/${post.slug}`),
          "x-default": getAbsoluteUrl(siteConfig.defaultLocale, `/blog/${post.slug}`),
        },
      },
    }))
  );

  return [...localeEntries, ...blogEntries];
}
