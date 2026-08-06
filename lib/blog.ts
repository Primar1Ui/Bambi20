export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'building-saas-with-nextjs',
    title: 'Building a SaaS MVP with Next.js and Supabase',
    description:
      'A practical guide to building a production-ready SaaS MVP using Next.js App Router and Supabase for auth and data.',
    date: '2024-01-15',
    author: 'Bambi20',
    tags: ['Next.js', 'Supabase', 'SaaS'],
    featured: true,
    content: `
## Introduction

If you are starting a SaaS product, the hardest part is not picking tools. It is shipping something small enough to test with real users. This is the stack I use most often: **Next.js 14** with the App Router and **Supabase** for auth and data.

## Why Next.js + Supabase?

- **Next.js** gives you server components, API routes, and a smooth developer experience.
- **Supabase** gives you Postgres, auth, and real-time features without setting up a full backend from scratch.

## Getting Started

1. Create a new Next.js app with \`create-next-app\`.
2. Add Supabase and configure your environment variables.
3. Set up Supabase Auth with email/password or OAuth.
4. Build your first protected route and a simple dashboard.

## Key Takeaways

- Use Server Components for data fetching where it makes sense.
- Protect routes with middleware or server-side checks.
- Keep version one small and ship fast.

*More posts on the way.*
    `.trim(),
  },
  {
    slug: 'portfolio-seo-and-performance',
    title: 'Portfolio SEO and Performance Tips',
    description:
      'How to make your developer portfolio fast, accessible, and discoverable by search engines.',
    date: '2024-01-10',
    author: 'Bambi20',
    tags: ['SEO', 'Next.js', 'Performance'],
    content: `
## Why It Matters

Your portfolio is often the first thing a client or recruiter sees. If the site is slow or hard to find on Google, you lose attention before anyone reads your work.

## What I Focus On

- **Metadata**: Clear title, description, Open Graph, and Twitter cards.
- **Structured data**: JSON-LD for Person, WebSite, and FAQ content.
- **Sitemap and robots.txt**: So search engines can crawl the site properly.
- **Images**: Next.js \`Image\` with sensible sizes and lazy loading.

## Performance

- Keep client-side JavaScript lean with Server Components.
- Respect \`prefers-reduced-motion\` for accessibility.
- Use animation sparingly so the site still feels fast.

*More posts on the way.*
    `.trim(),
  },
  {
    slug: 'n8n-automation-for-leads-and-content',
    title: 'n8n Automation for Leads, Content, and Ops',
    description:
      'How I design practical n8n workflows that connect APIs, AI models, Google Sheets, and Gmail for lead qualification and content operations.',
    date: '2026-07-16',
    author: 'Bambi20',
    tags: ['n8n', 'Automation', 'AI'],
    featured: true,
    content: `
## Why Automation Matters

Manual lead follow-up and repetitive content work slow teams down. With **n8n**, you can connect APIs, AI models, spreadsheets, and email into workflows that run on demand or on a schedule.

## Three Workflow Patterns I Use

1. **API ingestion**: Trigger a flow, fetch external data, reshape fields, and pass results to the next step.
2. **Content operations**: Schedule pipeline runs that prepare content, update Google Sheets, and send notifications.
3. **AI lead qualification**: Branch on conditions, score leads with an LLM like Groq, log outcomes, and alert via Gmail.

## Implementation Tips

- Keep each node focused on one job: fetch, transform, decide, or notify.
- Use clear branch labels so true and false paths stay easy to maintain.
- Log important outcomes to Sheets or a database before sending emails.
- Start with a manual trigger, then move proven flows to a schedule.

## Key Takeaways

- Automation works best when it removes busywork without hiding failures.
- AI fits in the middle of the workflow: after clean inputs, before storage and alerts.
- Ship small, observable flows first, then expand.

*Need a similar system for your team? Use the contact form and send a short brief.*
    `.trim(),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.featured);
}

export function getAllBlogTags(): string[] {
  return Array.from(new Set(blogPosts.flatMap((p) => p.tags))).sort();
}

export function getLatestPost(): BlogPost | undefined {
  return [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];
}
