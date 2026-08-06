import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { getLatestPost } from '@/lib/blog';
import SectionHeading from '@/components/SectionHeading';

export default function LatestBlogTeaser() {
  const post = getLatestPost();
  if (!post) return null;

  return (
    <section
      aria-labelledby="latest-post-heading"
      className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]"
    >
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          id="latest-post-heading"
          title="From the blog"
          description="Latest thoughts on building with modern web tools"
          className="mb-8"
        />

        <article className="p-6 md:p-8 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/40 transition-colors">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
            <Calendar className="w-4 h-4" aria-hidden="true" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{post.title}</h3>
          <p className="text-gray-400 leading-relaxed mb-6 line-clamp-3">{post.description}</p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              Read article
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center gap-2 min-h-11 px-5 py-2.5 rounded-xl border border-gray-700 text-gray-300 font-medium hover:border-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0F19]"
            >
              View all posts
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
