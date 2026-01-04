import { lazy, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { useSectionTracking } from '@/hooks/use-section-tracking';

// Lazy load components that are below the fold for better initial load performance
const AboutSection = lazy(() => import('@/components/AboutSection').then(module => ({ default: module.AboutSection })));
const ServicesSection = lazy(() => import('@/components/ServicesSection').then(module => ({ default: module.ServicesSection })));
const PricingSection = lazy(() => import('@/components/PricingSection').then(module => ({ default: module.PricingSection })));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const ContactSection = lazy(() => import('@/components/ContactSection').then(module => ({ default: module.ContactSection })));
const FAQSection = lazy(() => import('@/components/FAQSection').then(module => ({ default: module.FAQSection })));
const SocialMediaSection = lazy(() => import('@/components/SocialMediaSection').then(module => ({ default: module.SocialMediaSection })));

const Index = () => {
  const heroRef = useSectionTracking({ sectionName: 'Hero Section' });
  const aboutRef = useSectionTracking({ sectionName: 'About Section' });
  const servicesRef = useSectionTracking({ sectionName: 'Services Section' });
  const pricingRef = useSectionTracking({ sectionName: 'Pricing Section' });
  const testimonialsRef = useSectionTracking({ sectionName: 'Testimonials Section' });
  const contactRef = useSectionTracking({ sectionName: 'Contact Section' });
  const faqRef = useSectionTracking({ sectionName: 'FAQ Section' });
  const socialRef = useSectionTracking({ sectionName: 'Social Media Section' });

  // Loading fallback component
  const SectionLoader = () => (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section ref={heroRef}>
          <HeroSection />
        </section>
        <section ref={aboutRef}>
          <Suspense fallback={<SectionLoader />}>
            <AboutSection />
          </Suspense>
        </section>
        <section ref={servicesRef}>
          <Suspense fallback={<SectionLoader />}>
            <ServicesSection />
          </Suspense>
        </section>
        <section ref={pricingRef}>
          <Suspense fallback={<SectionLoader />}>
            <PricingSection />
          </Suspense>
        </section>
        <section ref={testimonialsRef}>
          <Suspense fallback={<SectionLoader />}>
            <TestimonialsSection />
          </Suspense>
        </section>
        <section ref={contactRef}>
          <Suspense fallback={<SectionLoader />}>
            <ContactSection />
          </Suspense>
        </section>
        <section id="redes-sociales" ref={socialRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <Suspense fallback={<SectionLoader />}>
              <SocialMediaSection />
            </Suspense>
          </div>
        </section>
        <section ref={faqRef}>
          <Suspense fallback={<SectionLoader />}>
            <FAQSection />
          </Suspense>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
