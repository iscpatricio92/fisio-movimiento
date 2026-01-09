import { lazy, Suspense, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { MobileBottomCTA } from '@/components/MobileBottomCTA';
import { SkipToContent } from '@/components/SkipToContent';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useSectionTracking } from '@/hooks/use-section-tracking';
import { useHashNavigation } from '@/hooks/use-hash-navigation';
import { useSectionTimeTracking } from '@/hooks/use-section-time-tracking';
import { useMetaTags } from '@/hooks/use-meta-tags';

// Genera el schema BreadcrumbList para SEO
const generateBreadcrumbSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://www.fisio-movimiento.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Servicios',
      item: 'https://www.fisio-movimiento.com/#servicios',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Precios',
      item: 'https://www.fisio-movimiento.com/#precios',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Testimonios',
      item: 'https://www.fisio-movimiento.com/#testimonios',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Contacto',
      item: 'https://www.fisio-movimiento.com/#contacto',
    },
  ],
});

// Lazy load components that are below the fold for better initial load performance
const AboutSection = lazy(() =>
  import('@/components/AboutSection').then((module) => ({
    default: module.AboutSection,
  })),
);
const ServicesSection = lazy(() =>
  import('@/components/ServicesSection').then((module) => ({
    default: module.ServicesSection,
  })),
);
const PricingSection = lazy(() =>
  import('@/components/PricingSection').then((module) => ({
    default: module.PricingSection,
  })),
);
const TestimonialsSection = lazy(() =>
  import('@/components/TestimonialsSection').then((module) => ({
    default: module.TestimonialsSection,
  })),
);
const ContactSection = lazy(() =>
  import('@/components/ContactSection').then((module) => ({
    default: module.ContactSection,
  })),
);
const FAQSection = lazy(() =>
  import('@/components/FAQSection').then((module) => ({
    default: module.FAQSection,
  })),
);
const SocialMediaSection = lazy(() =>
  import('@/components/SocialMediaSection').then((module) => ({
    default: module.SocialMediaSection,
  })),
);

const Index = () => {
  // Meta tags para la página principal (unifica con index.html)
  useMetaTags({
    title: 'Fisioterapeuta CDMX y Metepec | Analaura Reyes - ATM, Dolor',
    description:
      'Fisioterapeuta con doble titulación México-España. Especialista en dolor de espalda, ATM e hipopresivos. CDMX y Metepec. Primera cita $600. ¡Reserva hoy!',
    url: 'https://fisio-movimiento.com/',
    type: 'website',
    twitterTitle: 'Lic. Analaura Reyes Priego | Fisioterapeuta Especializada',
    twitterDescription:
      'Fisioterapeuta con doble titulación. Especialista en traumatología, ATM, hipopresivos y manejo del dolor. Consultorios en CDMX y Metepec.',
  });

  // Hook para manejar navegación con hash y tracking
  useHashNavigation();

  // Inyectar schema BreadcrumbList para SEO
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-breadcrumb-schema]',
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-breadcrumb-schema', 'true');
      script.textContent = JSON.stringify(generateBreadcrumbSchema());
      document.head.appendChild(script);
    }
    return () => {
      const script = document.querySelector('script[data-breadcrumb-schema]');
      if (script) script.remove();
    };
  }, []);

  // Track tiempo en secciones clave (solo si pasa >30 segundos)
  // Esto indica interés real del usuario
  useSectionTimeTracking('servicios', 'Servicios', true);
  useSectionTimeTracking('precios', 'Precios', true);
  useSectionTimeTracking('contacto', 'Contacto', true);

  const heroRef = useSectionTracking({ sectionName: 'Hero Section' });
  const aboutRef = useSectionTracking({ sectionName: 'About Section' });
  const servicesRef = useSectionTracking({ sectionName: 'Services Section' });
  const pricingRef = useSectionTracking({ sectionName: 'Pricing Section' });
  const testimonialsRef = useSectionTracking({
    sectionName: 'Testimonials Section',
  });
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
    <ErrorBoundary>
      <div className="min-h-screen">
        <SkipToContent />
        <Navbar />
        <main id="main-content">
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
          {/* <section id="redes-sociales" ref={socialRef} className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <Suspense fallback={<SectionLoader />}>
              <SocialMediaSection />
            </Suspense>
          </div>
        </section> */}
          <section ref={faqRef}>
            <Suspense fallback={<SectionLoader />}>
              <FAQSection />
            </Suspense>
          </section>
        </main>
        <Footer />
        <MobileBottomCTA />
      </div>
    </ErrorBoundary>
  );
};

export default Index;
