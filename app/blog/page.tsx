import type { Metadata } from 'next';
import { blogPosts } from '@/lib/blog';
import BlogList from '@/components/BlogList';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createPageMetadata } from '@/lib/page-metadata';
import { SITE_BRAND } from '@/lib/site';

export const metadata: Metadata = createPageMetadata({
  title: 'Blog',
  description:
    'Notes on Next.js, Supabase, SaaS builds, automation, and freelance web development from Bambi20.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <main id="main-content" className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8" tabIndex={-1}>
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs items={[{ label: 'Blog', path: '/blog' }]} />
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{SITE_BRAND} Blog</h1>
          <p className="text-gray-400 text-lg">
            Practical posts on building and shipping web projects.
          </p>
        </div>
        <BlogList posts={blogPosts} />
      </div>
    </main>
  );
}
