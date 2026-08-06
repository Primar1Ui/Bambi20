import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { breadcrumbSchema, type BreadcrumbItem } from '@/lib/seo';

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const trail = [{ label: 'Home', path: '/' }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(trail)) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--muted)]">
          {trail.map((item, index) => {
            const isLast = index === trail.length - 1;

            return (
              <li key={item.path} className="inline-flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="w-3.5 h-3.5 shrink-0 text-[var(--muted)]" aria-hidden />
                )}
                {isLast ? (
                  <span aria-current="page" className="text-[var(--foreground)] font-medium">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.path}
                    className="hover:text-blue-500 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] rounded px-0.5"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
