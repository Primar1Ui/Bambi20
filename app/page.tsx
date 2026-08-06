import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HomeSelectedWork from '@/components/HomeSelectedWork';
import HomeFaq from '@/components/HomeFaq';
import LandingCTA from '@/components/LandingCTA';
import LegacyHashRedirect from '@/components/LegacyHashRedirect';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <LegacyHashRedirect />
      <Navbar />
      <Hero />
      <HomeSelectedWork />
      <HomeFaq />
      <LandingCTA />
      <Footer />
      <BackToTop />
    </main>
  );
}
