import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL   = "https://www.nans.org.ng";
const SITE_NAME  = "NANS - National Association of Nigerian Students";
const SITE_DESCRIPTION =
  "The official website of the National Association of Nigerian Students (NANS) - Nigeria's apex student body since 1956, representing over 5 million students across 200+ tertiary institutions in 6 geopolitical zones.";
const OG_IMAGE   = `${SITE_URL}/og-image.png`;
const TWITTER_HANDLE = "@NANSNigeria";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#008751", 
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NANS - National Association of Nigerian Students",
    template: "%s | NANS Nigeria",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "NANS",
    "National Association of Nigerian Students",
    "Nigerian students",
    "student union Nigeria",
    "NANS election 2026",
    "NANS presidential election",
    "NANS ICPC",
    "Nigerian tertiary education",
    "student governance Nigeria",
    "NANS candidates",
    "NANS zones",
    "apex student body Nigeria",
    "NANS secretariat Abuja",
    "student welfare Nigeria",
  ],
  authors: [{ name: "NANS Secretariat", url: SITE_URL }],
  creator:   "National Association of Nigerian Students",
  publisher: "National Association of Nigerian Students",
  category:  "Education / Student Governance",

  alternates: {
    canonical: "/",
    languages: { "en-NG": "/", "en": "/" },
  },

  openGraph: {
    type:        "website",
    locale:      "en_NG",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       "NANS - National Association of Nigerian Students",
    description: SITE_DESCRIPTION,
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    "NANS - National Association of Nigerian Students",
        type:   "image/png",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    site:        TWITTER_HANDLE,
    creator:     TWITTER_HANDLE,
    title:       "NANS - National Association of Nigerian Students",
    description: SITE_DESCRIPTION,
    images:      [OG_IMAGE],
  },


  icons: {
    icon: [
      { url: "/favicon.ico",             sizes: "any"   },
      { url: "/icon-16x16.png",          sizes: "16x16",  type: "image/png" },
      { url: "/icon-32x32.png",          sizes: "32x32",  type: "image/png" },
      { url: "/icon-192x192.png",        sizes: "192x192", type: "image/png" },
    ],
    apple:    [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon.ico" }],
  },

  manifest: "/site.webmanifest",

  robots: {
    index:                  true,
    follow:                 true,
    nocache:                false,
    googleBot: {
      index:                true,
      follow:               true,
      noimageindex:         false,
      "max-video-preview":  -1,
      "max-image-preview":  "large",
      "max-snippet":        -1,
    },
  },

  verification: {
    google: "GOOGLE_SEARCH_CONSOLE_TOKEN",
    // yandex: "...",
    // other: { "msvalidate.01": "..." },
  },

  applicationName: "NANS Nigeria",
  referrer:        "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
};

/* ─────────────────────────────────────────────────────────────────────────────
   JSON-LD STRUCTURED DATA
   Inlined in <head> - helps Google display rich results (sitelinks, etc.)
───────────────────────────────────────────────────────────────────────────── */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  name:       "National Association of Nigerian Students",
  alternateName: ["NANS", "NANS Nigeria"],
  url:         SITE_URL,
  logo: {
    "@type": "ImageObject",
    url:     `${SITE_URL}/logo.png`,
  },
  description: SITE_DESCRIPTION,
  foundingDate: "1956",
  address: {
    "@type":           "PostalAddress",
    streetAddress:     "Plot 1005, Adekunle Fajuyi Way, Garki II",
    addressLocality:   "Abuja",
    addressRegion:     "FCT",
    addressCountry:    "NG",
  },
  contactPoint: [
    {
      "@type":       "ContactPoint",
      contactType:   "customer service",
      email:         "info@nans.org.ng",
      areaServed:    "NG",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://twitter.com/NANSNigeria",
    "https://www.facebook.com/NANSNigeria",
    "https://www.instagram.com/nansnigeria",
    "https://www.linkedin.com/company/nans-nigeria",
    "https://www.youtube.com/@NANSNigeria",
  ],
};

const websiteSchema = {
  "@context":     "https://schema.org",
  "@type":        "WebSite",
  url:            SITE_URL,
  name:           SITE_NAME,
  description:    SITE_DESCRIPTION,
  inLanguage:     "en-NG",
  potentialAction: {
    "@type":       "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/news?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT LAYOUT
───────────────────────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" dir="ltr">
      <head>
        {/* ── Preconnect to Google Fonts (loaded by individual pages) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* ── Crimson Pro + DM Sans - used site-wide ── */}
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap"
          rel="stylesheet"
        />

        {/* ── Geo / regional meta ── */}
        <meta name="geo.region"      content="NG"    />
        <meta name="geo.placename"   content="Abuja, Federal Capital Territory, Nigeria" />
        <meta name="geo.position"    content="9.0765;7.3986" />
        <meta name="ICBM"            content="9.0765, 7.3986" />

        {/* ── Language ── */}
        <meta httpEquiv="content-language" content="en-ng" />

        {/* ── JSON-LD structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>

      <body
        className={inter.className}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}