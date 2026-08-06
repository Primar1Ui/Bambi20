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
    author: 'David',
    tags: ['Next.js', 'Supabase', 'SaaS'],
    featured: true,
    content: `
## Introduction

Building a SaaS product from scratch involves choosing the right stack, setting up authentication, and delivering value quickly. This post walks through a minimal setup using **Next.js 14** (App Router) and **Supabase**.

## Why Next.js + Supabase?

- **Next.js** gives you server components, API routes, and great DX.
- **Supabase** provides Postgres, auth, and real-time out of the box.

## Getting Started

1. Create a new Next.js app with \`create-next-app\`.
2. Add Supabase and configure environment variables.
3. Set up Supabase Auth (email/password or OAuth).
4. Build your first protected route and dashboard.

## Key Takeaways

- Use Server Components for data fetching where possible.
- Protect routes with middleware or server-side checks.
- Keep the first version small and ship fast.

*More posts coming soon — stay tuned.*
    `.trim(),
  },
  {
    slug: 'portfolio-seo-and-performance',
    title: 'Portfolio SEO and Performance Tips',
    description:
      'How to make your developer portfolio fast, accessible, and discoverable by search engines.',
    date: '2024-01-10',
    author: 'David',
    tags: ['SEO', 'Next.js', 'Performance'],
    content: `
## Why It Matters

A portfolio is often the first impression for recruiters and clients. Fast load times and good SEO help you get found and keep visitors engaged.

## What We Did

- **Metadata**: Title, description, Open Graph, and Twitter cards.
- **Structured data**: JSON-LD for Person and WebSite.
- **Sitemap & robots.txt**: So crawlers can index your site.
- **Images**: Next.js \`Image\` with sensible sizes and lazy loading.

## Performance

- Minimize client-side JS with Server Components.
- Use \`prefers-reduced-motion\` for accessibility.
- Keep animations subtle and optional.

*More posts coming soon.*
    `.trim(),
  },
  {
    slug: 'n8n-automation-for-leads-and-content',
    title: 'n8n Automation for Leads, Content, and Ops',
    description:
      'How I design practical n8n workflows that connect APIs, AI models, Google Sheets, and Gmail for lead qualification and content operations.',
    date: '2026-07-16',
    author: 'David',
    tags: ['n8n', 'Automation', 'AI'],
    featured: true,
    content: `
## Why Automation Matters

Manual lead follow-up and repetitive content ops slow teams down. With **n8n**, you can connect APIs, AI models, spreadsheets, and email into reliable workflows that run on demand or on a schedule.

## Three Workflow Patterns I Use

1. **API ingestion** — Trigger a flow, fetch external data, reshape fields, and hand results to the next step.
2. **Content operations** — Schedule pipeline runs that prepare content, update Google Sheets, and send notifications.
3. **AI lead qualification** — Branch on conditions, score leads with an LLM (for example Groq), log outcomes, and alert via Gmail.

## Implementation Tips

- Keep each node focused on one job: fetch, transform, decide, or notify.
- Use clear branch labels so true/false paths stay maintainable.
- Log every important outcome to Sheets or a database before sending emails.
- Start with a manual trigger, then promote proven flows to a schedule.

## Key Takeaways

- Automation is most valuable when it removes busywork without hiding failures.
- AI belongs in the middle of the workflow — after clean inputs, before durable storage and alerts.
- Ship small, observable flows first, then expand.

*Want a similar system for your team? Reach out via the contact form.*
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
