import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/* =========================================================
   FONTS
========================================================= */

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* =========================================================
   SITE CONFIG (PRODUCT POSITIONING)
========================================================= */

const SITE_NAME = "KUIreact";
const SITE_TITLE = "KUIreact — Composable UI System for Real Products";
const SITE_DESCRIPTION =
  "KUIreact is a production-ready UI system built with Next.js. A composable design system and storefront-ready component architecture for real-world applications.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://next-js-components.kuray.dev";

const SITE_KEYWORDS = [
  "React UI components",
  "Next.js design system",
  "component library",
  "UI kit",
  "frontend system",
  "design system",
  "Next.js UI",
];

/* =========================================================
   METADATA (FULL SEO)
========================================================= */

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: "%s | KUIreact",
  },

  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  authors: [
    {
      name: "Kuray Karaaslan",
      url: "https://kuray.dev",
    },
  ],

  creator: "Kuray Karaaslan",
  publisher: SITE_NAME,

  keywords: SITE_KEYWORDS,
  category: "technology",

  alternates: {
    canonical: SITE_URL,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [{ rel: "manifest", url: "/site.webmanifest" }],
  },

  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?title=KUIreact`,
        width: 1200,
        height: 630,
        alt: "KUIreact Preview",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/api/og?title=KUIreact`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* =========================================================
   STRUCTURED DATA (SEO POWER)
========================================================= */

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
    },

    {
      "@type": "Person",
      name: "Kuray Karaaslan",
      url: "https://kuray.dev",
    },

    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },

    {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      creator: {
        "@type": "Person",
        name: "Kuray Karaaslan",
      },
    },
  ],
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {/* APP SHELL (OPTIONAL) */}
        <main className="flex-1">{children}</main>

        {/* STRUCTURED DATA */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}