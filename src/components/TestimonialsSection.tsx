import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollAnimated } from '@/components/ScrollAnimated';
import { useRef, useState, useEffect } from 'react';

const featuredTestimonials = [
  {
    name: 'María G.',
    rating: 5,
    text: 'Excelente consulta, todo bien, muy clara en su explicación. Me sentí escuchada desde el primer momento.',
    date: 'Hace 2 semanas',
    category: 'General',
    transformation: 'Dolor de cuello → Sin molestias',
  },
  {
    name: 'Carlos R.',
    rating: 5,
    text: 'Excelente atención, explica a detalle y te hace sentir cómodo. 100% recomendable. Llegué con dolor intenso y salí mucho mejor.',
    date: 'Hace 1 mes',
    category: 'Atención',
    transformation: 'Lumbalgia → Recuperación total',
  },
  {
    name: 'Ana L.',
    rating: 5,
    text: 'La doctora es muy profesional, explica de manera detallada el tratamiento a seguir y resuelve cada una de las dudas. He visto una gran mejoría con el tratamiento indicado.',
    date: 'Hace 3 semanas',
    category: 'Tratamiento',
    transformation: 'Ciática crónica → Vida sin dolor',
  },
  {
    name: 'Roberto M.',
    rating: 5,
    text: 'Diagnóstico y atención de buena calidad, acompañamiento en el proceso y se preocupa por integrar ejercicios que mejoren la calidad de vida. Ya puedo hacer ejercicio de nuevo.',
    date: 'Hace 1 mes',
    category: 'Calidad de vida',
    transformation: 'Lesión deportiva → Vuelta al gym',
  },
  {
    name: 'Patricia S.',
    rating: 5,
    text: 'Ha sido una grata experiencia. El trato por parte de la especialista es siempre cordial, empático y muy humano. Los ejercicios y la explicación es clara, me han ayudado mucho.',
    date: 'Hace 2 semanas',
    category: 'Experiencia',
    transformation: 'ATM/Bruxismo → Sin dolor al masticar',
  },
  {
    name: 'Jorge H.',
    rating: 5,
    text: 'Todo excelente, con mi primera sesión hubo mejoría notable. La Lic. muy atenta y profesional. Buena experiencia y muy agradecido por la atención.',
    date: 'Hace 1 semana',
    category: 'Primera sesión',
    transformation: 'Contractura → Alivio inmediato',
  },
  {
    name: 'Laura V.',
    rating: 5,
    text: 'Excelente la fisioterapia recibida, llevaba dolor y salí con mucho menor molestia. Realmente funciona.',
    date: 'Hace 3 semanas',
    category: 'Dolor',
    transformation: 'Dolor de hombro → Movilidad completa',
  },
  {
    name: 'Fernando T.',
    rating: 5,
    text: 'Muy acertada como siempre en su exploración y terapia. Llevo 5 sesiones y la diferencia es increíble.',
    date: 'Hace 2 semanas',
    category: 'Terapia',
    transformation: 'Post-operatorio → Rehabilitación exitosa',
  },
  {
    name: 'Diana P.',
    rating: 5,
    text: 'Excelente atención y buena explicación, sobre todo paciencia. Me enseñó ejercicios que puedo hacer en casa.',
    date: 'Hace 1 mes',
    category: 'Atención',
    transformation: 'Dolor crónico → Manejo efectivo',
  },
];

// Testimonial Card Component with transformation
const TestimonialCard = ({ testimonial }: { testimonial: typeof featuredTestimonials[0] }) => (
  <div className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 lg:hover:-translate-y-2 border border-border/50 hover:border-primary/30 h-full flex flex-col">
    {/* Transformation badge */}
    {'transformation' in testimonial && testimonial.transformation && (
      <div className="mb-3 -mt-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold border border-accent/20">
          ✨ {testimonial.transformation}
        </span>
      </div>
    )}
    <div className="flex items-start gap-4 mb-4">
      <div className="p-2 bg-primary/10 rounded-full">
        <Quote className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-accent text-accent" />
          ))}
        </div>
        <span className="text-xs text-primary/80 font-medium bg-primary/10 px-2 py-0.5 rounded-full">
          {testimonial.category}
        </span>
      </div>
    </div>
    <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">
      "{testimonial.text}"
    </p>
    <div className="flex items-center justify-between pt-4 border-t border-border/50 mt-auto">
      <span className="font-semibold text-foreground text-sm">{testimonial.name}</span>
      <span className="text-xs text-muted-foreground">{testimonial.date}</span>
    </div>
  </div>
);

export const TestimonialsSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const displayedTestimonials = featuredTestimonials.slice(0, 6);

  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
      // Calculate current index based on scroll position
      const cardWidth = container.scrollWidth / displayedTestimonials.length;
      const newIndex = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(Math.min(newIndex, displayedTestimonials.length - 1));
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollState);
      updateScrollState();
      return () => container.removeEventListener('scroll', updateScrollState);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.offsetWidth * 0.85;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="opiniones" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
            Lo que Dicen Mis <span className="text-primary">Pacientes</span>
          </h2>
          <p className="hidden sm:block text-base lg:text-lg text-muted-foreground mt-3 lg:mt-4 max-w-2xl mx-auto">
            La satisfacción de mis pacientes es mi mayor recompensa
          </p>

          {/* Rating Summary - Compact on mobile */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 lg:mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-xl lg:text-2xl font-bold text-foreground">5.0</span>
            <span className="text-sm lg:text-base text-muted-foreground">• +150 opiniones</span>
          </div>
        </div>

        {/* Featured Testimonials - Testimonios Destacados */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mb-10 lg:mb-16">
            <ScrollAnimated animation="fade-up" delay={300}>
              <div className="text-center mb-6 lg:mb-12">
                <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  Testimonios <span className="text-primary">Destacados</span>
                </h3>
                <p className="hidden sm:block text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto">
                  Reseñas verificadas de pacientes satisfechos
                </p>
              </div>
            </ScrollAnimated>

            {/* Mobile Carousel */}
            <div className="lg:hidden relative">
              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-muted-foreground">
                  {currentIndex + 1} de {displayedTestimonials.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll('left')}
                    disabled={!canScrollLeft}
                    className="p-2 rounded-full bg-card border border-border shadow-sm disabled:opacity-40 disabled:cursor-not-allowed touch-target"
                    aria-label="Testimonio anterior"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    onClick={() => scroll('right')}
                    disabled={!canScrollRight}
                    className="p-2 rounded-full bg-card border border-border shadow-sm disabled:opacity-40 disabled:cursor-not-allowed touch-target"
                    aria-label="Siguiente testimonio"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
                style={{ scrollPaddingLeft: '1rem' }}
              >
                {displayedTestimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-[85vw] max-w-[320px] snap-start"
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </div>
                ))}
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-1.5 mt-4">
                {displayedTestimonials.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'w-6 bg-primary' 
                        : 'w-1.5 bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Desktop Grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
              {displayedTestimonials.map((testimonial, index) => (
                <ScrollAnimated key={index} animation="scale-in" delay={index * 100}>
                  <TestimonialCard testimonial={testimonial} />
                </ScrollAnimated>
              ))}
            </div>
          </div>
        </ScrollAnimated>

        {/* CTA after testimonials - high intent moment */}
        <ScrollAnimated animation="fade-up" delay={350}>
          <div className="text-center mb-8 lg:mb-12 p-6 lg:p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl border border-primary/20">
            <h3 className="font-display text-xl lg:text-2xl font-bold text-foreground mb-2">
              ¿Quieres resultados como estos?
            </h3>
            <p className="text-muted-foreground mb-4">
              Únete a más de 500 pacientes que ya recuperaron su bienestar
            </p>
            <Button variant="cta" size="lg" className="min-h-[52px] px-8" asChild>
              <a href="#contacto">
                Reservar Mi Cita Ahora
              </a>
            </Button>
          </div>
        </ScrollAnimated>

        {/* See All Reviews CTA */}
        <ScrollAnimated animation="fade-up" delay={400}>
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-card rounded-2xl border border-border/50 shadow-soft">
              <div className="flex items-center gap-2">
                <img 
                  src="https://platform.docplanner.com/img/mx/logo/logo-default-mx.svg" 
                  alt="Doctoralia" 
                  className="h-6 object-contain"
                  loading="lazy"
                />
              </div>
              <p className="text-muted-foreground">
                Lee todas las opiniones verificadas en mi perfil de Doctoralia
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="group min-h-[48px] px-6"
                onClick={() => window.open('https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/iztapalapa#profile-reviews', '_blank')}
              >
                Ver Todas las Opiniones
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};
