import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <Navbar />
      <div className="pt-16 md:pt-20">{children}</div>
      <Footer />
      <BackToTop />
    </main>
  );
}
