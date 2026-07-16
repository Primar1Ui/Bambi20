'use client';

import { useMemo, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import type { BlogPost } from '@/lib/blog';

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string>('all');

  const tags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  const filtered = useMemo(
    () =>
      activeTag === 'all' ? posts : posts.filter((post) => post.tags.includes(activeTag)),
    [activeTag, posts]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTag('all')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            activeTag === 'all'
              ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
              : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-gray-200'
          }`}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activeTag === tag
                ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                : 'bg-gray-800/50 text-gray-400 border border-gray-700 hover:text-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:gap-8">
        {filtered.map((post, index) => (
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-gray-400 text-center py-12">No posts match this tag.</p>
      )}
    </div>
  );
}
