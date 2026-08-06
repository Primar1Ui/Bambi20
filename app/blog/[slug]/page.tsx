import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts, getPostBySlug } from '@/lib/blog';
import Breadcrumbs from '@/components/Breadcrumbs';
import BlogAuthorSidebar from '@/components/BlogAuthorSidebar';
import { blogPostingSchema } from '@/lib/seo';
import { SITE_URL, SITE_BRAND, SITE_LEGAL_NAME } from '@/lib/site';

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
    title: `${post.title} | ${SITE_BRAND} Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [SITE_LEGAL_NAME],
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
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-sm">
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
    elements.push(
      listType === 'ordered' ? (
        <ol key={elements.length}>{items}</ol>
      ) : (
        <ul key={elements.length}>{items}</ul>
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
        <h2 key={elements.length}>{renderInline(line.slice(3))}</h2>
      );
    } else if (orderedMatch || unorderedMatch) {
      const nextType: 'ordered' | 'unordered' = orderedMatch ? 'ordered' : 'unordered';
      if (listType && listType !== nextType) flushList();
      listType = nextType;
      listItems.push((orderedMatch ?? unorderedMatch)![1]);
    } else if (line.trim()) {
      flushList();
      elements.push(
        <p key={elements.length}>{renderInline(line)}</p>
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
    <main id="main-content" className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8" tabIndex={-1}>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            blogPostingSchema({
              title: post.title,
              description: post.description,
              date: post.date,
              slug: post.slug,
              tags: post.tags,
            })
          ),
        }}
      />
      <div className="max-w-6xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Blog', path: '/blog' },
            { label: post.title, path: `/blog/${post.slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12 lg:items-start">
          <article>
            <header className="mb-10 border-b border-[var(--border)] pb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-md border border-[var(--border)] text-[var(--muted-strong)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--foreground)] mb-4 leading-tight">
                {post.title}
              </h1>
              <p className="text-lg text-[var(--muted)] mb-2">{post.description}</p>
              <p className="text-sm text-[var(--muted)]">
                <time dateTime={post.date}>{post.date}</time> · {SITE_LEGAL_NAME} ({SITE_BRAND})
              </p>
            </header>

            <div className="blog-prose max-w-none">{renderContent(post.content)}</div>
          </article>

          <aside className="mt-10 lg:mt-0 lg:sticky lg:top-24">
            <BlogAuthorSidebar />
          </aside>
        </div>
      </div>
    </main>
  );
}
