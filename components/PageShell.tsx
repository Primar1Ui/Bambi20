import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Breadcrumbs from '@/components/Breadcrumbs';
import type { BreadcrumbItem } from '@/lib/seo';

export default function PageShell({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}) {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <Navbar />
      <div className="pt-16 md:pt-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8 pb-2">
            <div className="max-w-7xl mx-auto">
              <Breadcrumbs items={breadcrumbs} />
            </div>
          </div>
        )}
        {children}
      </div>
      <Footer />
      <BackToTop />
    </main>
  );
}
