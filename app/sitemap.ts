import type { MetadataRoute } from "next";

const SITE_URL = "https://soleadomoments.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const locations = ["leigh", "wigan", "bolton", "warrington"];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more real pages if/when you create them
    // { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const locationPages: MetadataRoute.Sitemap = locations.map((slug) => ({
    url: `${SITE_URL}/soft-play-hire/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...locationPages];
}
