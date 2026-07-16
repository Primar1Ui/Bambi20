import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/lib/blog';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Post not found' };
  return {
    title: `${post.title} | David's Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://david-portfolio.vercel.app/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: '/images/og-image.png', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: ['/images/og-image.png'],
    },
  };
}

function renderInline(text: string) {
  return text
    .split(/(\*\*.*?\*\*|`.*?`|\*.*?\*)/g)
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-semibold text-gray-300">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-cyan-300">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
}

function renderContent(content: string) {
  const lines = content.trim().split('\n');
  const elements: React.ReactNode[] = [];
  let listType: 'ordered' | 'unordered' | null = null;
  let listItems: string[] = [];

  const flushList = () => {
    if (!listType || listItems.length === 0) return;
    const items = listItems.map((item, index) => <li key={index}>{renderInline(item)}</li>);
    const className = 'space-y-2 text-gray-400 mb-5 pl-6';
    elements.push(
      listType === 'ordered' ? (
        <ol key={elements.length} className={`list-decimal ${className}`}>{items}</ol>
      ) : (
        <ul key={elements.length} className={`list-disc ${className}`}>{items}</ul>
      )
    );
    listType = null;
    listItems = [];
  };

  for (const line of lines) {
    const orderedMatch = line.match(/^\d+\.\s+(.+)/);
    const unorderedMatch = line.match(/^[-*]\s+(.+)/);

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2 key={elements.length} className="text-2xl font-bold text-white mt-8 mb-4">
          {renderInline(line.slice(3))}
        </h2>
      );
    } else if (orderedMatch || unorderedMatch) {
      const nextType: 'ordered' | 'unordered' = orderedMatch ? 'ordered' : 'unordered';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((orderedMatch ?? unorderedMatch)![1]);
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={elements.length} className="text-gray-400 mb-4 leading-relaxed">
          {renderInline(line)}
        </p>
      );
    } else {
      flushList();
    }
  }
  flushList();
  return elements;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              '@type': 'Person',
              name: post.author,
              url: 'https://david-portfolio.vercel.app',
            },
            mainEntityOfPage: `https://david-portfolio.vercel.app/blog/${post.slug}`,
            image: 'https://david-portfolio.vercel.app/images/og-image.png',
            keywords: post.tags.join(', '),
          }),
        }}
      />
      <article className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium mb-8"
        >
          ← Back to blog
        </Link>

        <header className="mb-10">
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
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-400 mb-2">{post.description}</p>
          <p className="text-sm text-gray-500">
            {post.date} · {post.author}
          </p>
        </header>

        <div className="prose prose-invert max-w-none">
          {renderContent(post.content)}
        </div>
      </article>
    </main>
  );
}
