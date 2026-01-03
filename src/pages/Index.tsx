import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { ServicesSection } from '@/components/ServicesSection';
import { PricingSection } from '@/components/PricingSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { ContactSection } from '@/components/ContactSection';
import { FAQSection } from '@/components/FAQSection';
import { SocialMediaSection } from '@/components/SocialMediaSection';
import { Footer } from '@/components/Footer';
import { useSectionTracking } from '@/hooks/use-section-tracking';

const Index = () => {
  const heroRef = useSectionTracking({ sectionName: 'Hero Section' });
  const aboutRef = useSectionTracking({ sectionName: 'About Section' });
  const servicesRef = useSectionTracking({ sectionName: 'Services Section' });
  const pricingRef = useSectionTracking({ sectionName: 'Pricing Section' });
  const testimonialsRef = useSectionTracking({ sectionName: 'Testimonials Section' });
  const contactRef = useSectionTracking({ sectionName: 'Contact Section' });
  const faqRef = useSectionTracking({ sectionName: 'FAQ Section' });
  const socialRef = useSectionTracking({ sectionName: 'Social Media Section' });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <section ref={heroRef}>
          <HeroSection />
        </section>
        <section ref={aboutRef}>
          <AboutSection />
        </section>
        <section ref={servicesRef}>
          <ServicesSection />
        </section>
        <section ref={pricingRef}>
          <PricingSection />
        </section>
        <section ref={testimonialsRef}>
          <TestimonialsSection />
        </section>
        <section ref={contactRef}>
          <ContactSection />
        </section>
        <section id="redes-sociales" ref={socialRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <SocialMediaSection />
          </div>
        </section>
        <section ref={faqRef}>
          <FAQSection />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
