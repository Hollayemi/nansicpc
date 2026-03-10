/**
 * app/sitemap.ts
 *
 * Next.js App Router auto-generates /sitemap.xml from this file.
 * Update `lastModified` dates whenever page content meaningfully changes.
 */

import type { MetadataRoute } from "next";

const SITE_URL = "https://www.nans.org.ng";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url:             SITE_URL,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        1.0,
    },
    {
      url:             `${SITE_URL}/about`,
      lastModified:    new Date("2025-03-01"),
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${SITE_URL}/nans-icpc`,
      lastModified:    new Date("2025-03-01"),
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${SITE_URL}/election-overview`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${SITE_URL}/candidates`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.9,
    },
    {
      url:             `${SITE_URL}/election-schedule`,
      lastModified:    now,
      changeFrequency: "weekly",
      priority:        0.85,
    },
    {
      url:             `${SITE_URL}/news`,
      lastModified:    now,
      changeFrequency: "daily",
      priority:        0.8,
    },
    {
      url:             `${SITE_URL}/partners`,
      lastModified:    new Date("2025-03-01"),
      changeFrequency: "monthly",
      priority:        0.6,
    },
  ];
}
