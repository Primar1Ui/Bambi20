import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LocaleProvider } from '@/contexts/LocaleContext';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import ErrorBoundary from '@/components/ErrorBoundary';
import PWARegister from '@/components/PWARegister';
import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';
import "./globals.css";
import "./print.css";

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Full-Stack Developer",
    "AI Web Apps",
    "Supabase Developer",
    "SaaS MVP",
    "Next.js Developer",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "David" }],
  creator: "David",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "David - Full-Stack & AI Web Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/og-image.png"],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('theme');var t=(s==='light'||s==='dark')?s:'dark';document.documentElement.classList.add(t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',t==='light'?'#0b1628':'#070f1c');}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <link rel="canonical" href={SITE_URL} />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="David's Blog RSS"
          href={`${SITE_URL}/feed`}
        />
        <meta name="theme-color" content="#070f1c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Person Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "David",
              jobTitle: "Full-Stack & AI Web Developer",
              url: SITE_URL,
              email: "mailto:davidtosin306@gmail.com",
              sameAs: [
                "https://github.com/Primar1Ui",
                "https://t.me/mar_gdd",
              ],
              knowsAbout: [
                "Next.js",
                "React",
                "Supabase",
                "Tailwind CSS",
                "AI Integration",
                "n8n Workflow Automation",
                "Zapier Automation",
                "SaaS MVP Development",
              ],
            }),
          }}
        />
        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "David Portfolio",
              url: SITE_URL,
              description:
                "David is a full-stack developer specializing in modern web apps, AI integrations, Supabase backends, and SaaS MVP development.",
              author: {
                "@type": "Person",
                name: "David",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <LocaleProvider>
            <ErrorBoundary>
              <PWARegister />
              <KeyboardShortcuts />
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            {children}
            </ErrorBoundary>
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

