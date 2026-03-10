/**
 * lib/metadata.ts
 *
 * Drop this file at:  app/lib/metadata.ts
 *
 * Usage in any page file:
 *   import { generatePageMetadata } from "@/app/lib/metadata";
 *   export const metadata = generatePageMetadata({ ... });
 */

import type { Metadata } from "next";

const SITE_URL = "https://www.nans.org.ng";
const TWITTER  = "@NANSNigeria";

interface PageMeta {
  title:       string;
  description: string;
  path:        string;           // e.g. "/about"
  ogImage?:    string;           // override the default OG image
  keywords?:   string[];
  type?:       "website" | "article";
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = `${SITE_URL}/og-image.png`,
  keywords = [],
  type = "website",
}: PageMeta): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      title,
      description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card:        "summary_large_image",
      site:        TWITTER,
      title,
      description,
      images:      [ogImage],
    },
  };
}

/* ─────────────────────────────────────────────────────────────────────────────
   READY-TO-USE METADATA FOR EVERY NANS PAGE
   Copy the relevant export into the top of each page file.

   Example (app/about/page.tsx):
     import { aboutMetadata } from "@/app/lib/metadata";
     export const metadata = aboutMetadata;
───────────────────────────────────────────────────────────────────────────── */

export const homeMetadata = generatePageMetadata({
  title:       "NANS — National Association of Nigerian Students",
  description: "Official website of NANS, Nigeria's apex student body since 1956. Representing 5M+ students across 200+ institutions. 2026 Presidential Election now open.",
  path:        "/",
  keywords:    ["NANS", "Nigerian students", "student union Nigeria", "apex student body", "NANS 2026 election"],
});

export const aboutMetadata = generatePageMetadata({
  title:       "About NANS — History, Structure & Leadership",
  description: "Learn about the history, mission, zonal structure, governing bodies, and current National Executive Council of the National Association of Nigerian Students.",
  path:        "/about",
  keywords:    ["about NANS", "NANS history", "NANS zones", "NANS leadership", "NANS NEC", "NANS JCC"],
});

export const icpcMetadata = generatePageMetadata({
  title:       "NANS–ICPC Anti-Corruption Partnership",
  description: "NANS and the ICPC work together to promote integrity, transparency, and zero tolerance for corruption across Nigerian campuses through the Anti-Corruption Vanguard programme.",
  path:        "/nans-icpc",
  keywords:    ["NANS ICPC", "anti-corruption students Nigeria", "campus integrity", "ACV Nigeria", "ICPC student programme"],
});

export const electionOverviewMetadata = generatePageMetadata({
  title:       "2026 NANS Election Overview — Rules, Process & Eligibility",
  description: "Comprehensive guide to the 2026 NANS Presidential Election: voting process, voter eligibility criteria, candidate requirements, Electoral Committee details, and code of conduct.",
  path:        "/election-overview",
  keywords:    ["NANS election 2026", "NANS election rules", "NANS voter eligibility", "NANS candidate requirements", "NANS electoral committee"],
});

export const candidatesMetadata = generatePageMetadata({
  title:       "2026 NANS Election Candidates — Presidential & Senate",
  description: "Profiles, manifestos, and academic backgrounds of all cleared candidates contesting the 2026 NANS Presidential and Senate Presidential elections.",
  path:        "/candidates",
  keywords:    ["NANS candidates 2026", "NANS presidential candidates", "NANS senate candidates", "NANS manifesto", "NANS election aspirants"],
});

export const scheduleMetadata = generatePageMetadata({
  title:       "2026 NANS Election Schedule — Full Electoral Calendar",
  description: "Official electoral calendar for the 2026 NANS General Election — from EC inauguration and voter registration through to election day, results declaration, and inauguration.",
  path:        "/election-schedule",
  keywords:    ["NANS election schedule 2026", "NANS election date", "NANS electoral calendar", "NANS voter registration date", "NANS election timetable"],
});

export const newsMetadata = generatePageMetadata({
  title:       "NANS News & Updates — Official Announcements",
  description: "Latest official press releases, communiqués, advocacy updates, election news, and announcements from the National Association of Nigerian Students and its zonal bodies.",
  path:        "/news",
  keywords:    ["NANS news", "NANS announcements", "NANS press release", "student union news Nigeria", "NANS communiqué"],
  type:        "article",
});

export const partnersMetadata = generatePageMetadata({
  title:       "NANS Partners — Government, NGO & Corporate Collaborations",
  description: "NANS works with government agencies, academic institutions, civil society organisations, and the private sector to advance student welfare and education in Nigeria.",
  path:        "/partners",
  keywords:    ["NANS partners", "NANS ICPC partnership", "NANS government collaboration", "NANS NGO", "student welfare partners Nigeria"],
});
