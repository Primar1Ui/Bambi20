import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog';
import BlogList from '@/components/BlogList';

export const metadata: Metadata = {
  title: 'Blog | David — Full-Stack & AI Web Developer',
  description:
    'Technical articles, tutorials, and thoughts on Next.js, Supabase, SaaS, automation, and web development.',
  openGraph: {
    title: 'Blog | David — Full-Stack & AI Web Developer',
    description:
      'Technical articles, tutorials, and thoughts on Next.js, Supabase, SaaS, automation, and web development.',
    url: 'https://david-portfolio.vercel.app/blog',
    images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium mb-6"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-4">
            Technical articles, tutorials, and thoughts on web development, Next.js, Supabase,
            automation, and building SaaS products.
          </p>
          <a
            href="/feed"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-400 transition-colors"
            title="RSS feed"
          >
            <span aria-hidden>📡</span>
            Subscribe via RSS
          </a>
        </div>

        <BlogList posts={blogPosts} />
      </div>
    </main>
  );
}
