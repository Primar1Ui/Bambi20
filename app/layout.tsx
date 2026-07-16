import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LocaleProvider } from '@/contexts/LocaleContext';
import KeyboardShortcuts from '@/components/KeyboardShortcuts';
import ErrorBoundary from '@/components/ErrorBoundary';
import PWARegister from '@/components/PWARegister';
import "./globals.css";
import "./print.css";

export const metadata: Metadata = {
  title: "David | Full-Stack & AI Web Developer",
  description:
    "David is a full-stack developer specializing in modern web apps, AI integrations, Supabase backends, and SaaS MVP development.",
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
    url: "https://david-portfolio.vercel.app",
    title: "David | Full-Stack & AI Web Developer",
    description:
      "David is a full-stack developer specializing in modern web apps, AI integrations, Supabase backends, and SaaS MVP development.",
    siteName: "David Portfolio",
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
    title: "David | Full-Stack & AI Web Developer",
    description:
      "David is a full-stack developer specializing in modern web apps, AI integrations, Supabase backends, and SaaS MVP development.",
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
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://david-portfolio.vercel.app"),
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
        <link rel="canonical" href="https://david-portfolio.vercel.app" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#070f1c" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
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
              url: "https://david-portfolio.vercel.app",
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
              url: "https://david-portfolio.vercel.app",
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

