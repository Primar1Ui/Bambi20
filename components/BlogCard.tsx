'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-blue-500/50 transition-all duration-300"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <time dateTime={post.date}>{post.date}</time>
          {post.featured && (
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-gray-400 leading-relaxed mb-4 line-clamp-2">
          {post.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 group-hover:gap-3 transition-all">
          Read more
          <ArrowRight className="w-4 h-4" />
        </span>
      </Link>
    </motion.article>
  );
}
