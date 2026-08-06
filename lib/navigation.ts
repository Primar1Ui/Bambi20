export type NavItem = {
  key: string;
  href: string;
  matchPath: string;
  /** When set, active only when hash matches (e.g. #skills on /about) */
  matchHash?: string;
  /** When true, active for nested paths (e.g. /blog/slug) */
  matchNested?: boolean;
};

export const mainNavItems: NavItem[] = [
  { key: 'nav.home', href: '/', matchPath: '/' },
  { key: 'nav.about', href: '/about', matchPath: '/about', matchHash: '' },
  { key: 'nav.skills', href: '/about#skills', matchPath: '/about', matchHash: '#skills' },
  { key: 'nav.projects', href: '/projects', matchPath: '/projects' },
  { key: 'nav.services', href: '/services', matchPath: '/services' },
  { key: 'nav.automation', href: '/automation', matchPath: '/automation' },
  { key: 'nav.testimonials', href: '/testimonials', matchPath: '/testimonials' },
  { key: 'nav.caseStudies', href: '/case-studies', matchPath: '/case-studies' },
  { key: 'nav.blog', href: '/blog', matchPath: '/blog', matchNested: true },
  { key: 'nav.contact', href: '/contact', matchPath: '/contact' },
];

/** Legacy homepage hash → new route (bookmarks from single-page era) */
export const legacyHashRoutes: Record<string, string> = {
  '#home': '/',
  '#about': '/about',
  '#current-work': '/about',
  '#featured-project': '/',
  '#skills': '/about#skills',
  '#projects': '/projects',
  '#services': '/services',
  '#automation': '/automation',
  '#testimonials': '/testimonials',
  '#contact': '/contact',
};

export function isNavItemActive(
  item: NavItem,
  pathname: string,
  hash: string
): boolean {
  if (item.matchPath === '/') {
    return pathname === '/';
  }

  const pathMatches = item.matchNested
    ? pathname === item.matchPath || pathname.startsWith(`${item.matchPath}/`)
    : pathname === item.matchPath;

  if (!pathMatches) return false;

  if (item.matchHash === '#skills') return hash === '#skills';
  if (item.matchHash === '') return hash !== '#skills';

  return true;
}
