import Navbar from '@/components/Navbar';
import HireMeBanner from '@/components/HireMeBanner';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import HomeBio from '@/components/HomeBio';
import HomeFaq from '@/components/HomeFaq';
import FeaturedProject from '@/components/FeaturedProject';
import LandingCTA from '@/components/LandingCTA';
import LatestBlogTeaser from '@/components/LatestBlogTeaser';
import LegacyHashRedirect from '@/components/LegacyHashRedirect';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <LegacyHashRedirect />
      <Navbar />
      <HireMeBanner />
      <Hero />
      <Stats />
      <HomeBio />
      <HomeFaq />
      <FeaturedProject />
      <LatestBlogTeaser />
      <LandingCTA />
      <Footer />
      <BackToTop />
    </main>
  );
}
