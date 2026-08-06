import Link from 'next/link';
import {
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_EMAIL,
  SITE_GITHUB,
  SITE_LEGAL_NAME,
} from '@/lib/site';

export default function BlogAuthorSidebar() {
  return (
    <aside
      aria-labelledby="about-author-heading"
      className="rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] p-5"
    >
      <h2 id="about-author-heading" className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)] mb-3">
        About the author
      </h2>
      <p className="text-base font-semibold text-[var(--foreground)] mb-1">
        {SITE_LEGAL_NAME}
      </p>
      <p className="text-sm text-[var(--muted)] mb-3">{SITE_BRAND}</p>
      <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
        {SITE_DESCRIPTION}
      </p>
      <ul className="space-y-2 text-sm">
        <li>
          <Link href="/about" className="text-blue-500 hover:text-blue-400">
            About page
          </Link>
        </li>
        <li>
          <Link href="/hire" className="text-blue-500 hover:text-blue-400">
            Hire me
          </Link>
        </li>
        <li>
          <Link href="/contact" className="text-blue-500 hover:text-blue-400">
            Contact
          </Link>
        </li>
        <li>
          <a href={`mailto:${SITE_EMAIL}`} className="text-blue-500 hover:text-blue-400">
            {SITE_EMAIL}
          </a>
        </li>
        <li>
          <a
            href={SITE_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-400"
          >
            GitHub
          </a>
        </li>
      </ul>
    </aside>
  );
}
