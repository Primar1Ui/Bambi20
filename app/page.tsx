import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HireMeBanner from '@/components/HireMeBanner';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import FeaturedProject from '@/components/FeaturedProject';
import About from '@/components/About';
import CurrentWork from '@/components/CurrentWork';
import Skills from '@/components/Skills';
import Services from '@/components/Services';
import AutomationShowcase from '@/components/AutomationShowcase';
import Contact from '@/components/Contact';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import ProjectSkeletonGrid from '@/components/skeletons/ProjectSkeletonGrid';
import { TestimonialSkeletonGrid } from '@/components/skeletons/TestimonialSkeleton';

const Projects = dynamic(() => import('@/components/Projects'), {
  loading: () => <ProjectSkeletonGrid count={6} />,
});

const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <TestimonialSkeletonGrid count={3} />,
});

export default function Home() {
  return (
    <main id="main-content" className="min-h-screen" tabIndex={-1}>
      <Navbar />
      <HireMeBanner />
      <Hero />
      <Stats />
      <FeaturedProject />
      <About />
      <CurrentWork />
      <Skills />
      <Projects />
      <Services />
      <AutomationShowcase />
      <Testimonials />
      <Contact />
      <Newsletter />
      <Footer />
      <BackToTop />
    </main>
  );
}

