export type NavItem = {
  key: string;
  href: string;
  matchPath: string;
  /** When set, active only when hash matches (e.g. #skills on /about) */
  matchHash?: string;
  /** When true, active for nested paths (e.g. /blog/slug) */
  matchNested?: boolean;
};

export type NavDropdown = {
  type: 'dropdown';
  labelKey: string;
  items: NavItem[];
};

export type NavLink = {
  type: 'link';
  item: NavItem;
};

export type NavEntry = NavLink | NavDropdown;

const servicesDropdownItems: NavItem[] = [
  { key: 'nav.services', href: '/services', matchPath: '/services' },
  { key: 'nav.automation', href: '/automation', matchPath: '/automation' },
  { key: 'nav.projects', href: '/projects', matchPath: '/projects' },
  { key: 'nav.skills', href: '/about#skills', matchPath: '/about', matchHash: '#skills' },
];

export const navEntries: NavEntry[] = [
  { type: 'link', item: { key: 'nav.home', href: '/', matchPath: '/' } },
  { type: 'link', item: { key: 'nav.about', href: '/about', matchPath: '/about', matchHash: '' } },
  { type: 'dropdown', labelKey: 'nav.services', items: servicesDropdownItems },
  { type: 'link', item: { key: 'nav.testimonials', href: '/testimonials', matchPath: '/testimonials' } },
  { type: 'link', item: { key: 'nav.caseStudies', href: '/case-studies', matchPath: '/case-studies' } },
  { type: 'link', item: { key: 'nav.blog', href: '/blog', matchPath: '/blog', matchNested: true } },
  { type: 'link', item: { key: 'nav.contact', href: '/contact', matchPath: '/contact' } },
];

/** Flat list for sitemap, legacy redirects, etc. */
export const mainNavItems: NavItem[] = navEntries.flatMap((entry) =>
  entry.type === 'link' ? [entry.item] : entry.items
);

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

export function isDropdownActive(items: NavItem[], pathname: string, hash: string): boolean {
  return items.some((item) => isNavItemActive(item, pathname, hash));
}
