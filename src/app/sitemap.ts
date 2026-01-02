import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.mehranmohammadifrd.ir/en",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}