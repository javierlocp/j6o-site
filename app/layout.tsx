// app/layout.tsx
import "@/app/globals.css";
import { inter, jetbrains } from "./fonts";

import Script from "next/script";

export const metadata = {
  title: "Javier Lo | Product Design Lead",
  description:
    "Digital product designer building tools, sharing thoughts, and working in public.",
  metadataBase: new URL("https://javierlo.com"),
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "RSS Feed for Javier Lo — Blog" },
      ],
    },
  },
  openGraph: {
    title: "Javier Lo - Product Design Lead & Builder",
    description:
      "Digital product designer building tools, sharing thoughts, and working in public.",
    url: "https://javierlo.com",
    images: ["/showcase/ai/motion.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Javier Lo - Product Design Lead & Builder",
    description:
      "Digital product designer building tools, sharing thoughts, and working in public.",
    images: ["/showcase/ai/motion.png"],
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon/favicon-light.ico",
        sizes: "256x256",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon/favicon-dark.ico",
        sizes: "256x256",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/favicon/favicon-dark.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrains.variable} font-sans`}
    >
      <head>
        <link rel="preconnect" href="https://app.cal.com" />
        <link rel="dns-prefetch" href="https://app.cal.com" />
        <link rel="preconnect" href="https://cloud.umami.is" />
        <link rel="dns-prefetch" href="https://cloud.umami.is" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
        <Script
          async
          defer
          data-website-id="b1dfafab-5e4b-4bf4-903f-859c81d539d5"
          src="https://cloud.umami.is/script.js"
        />
      </body>
    </html>
  );
}
