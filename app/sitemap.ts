import type { MetadataRoute } from 'next';
import { blogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';

const staticRoutes = [
  { path: '', priority: 1, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/projects', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/automation', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/services', priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/testimonials', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/case-studies', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postPages: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticPages, ...postPages];
}
