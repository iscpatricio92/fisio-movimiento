import { Star, Quote, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollAnimated } from '@/components/ScrollAnimated';
import { useRef, useState, useEffect } from 'react';

const featuredTestimonials = [
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente consulta, todo bien, muy clara en su explicación',
    date: 'Reciente',
    category: 'General',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente atención, explica a detalle y te hace sentir cómoda. 100% recomendable.',
    date: 'Reciente',
    category: 'Atención',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'La doctora es muy profesional, explica de manera detallada el tratamiento a seguir y resuelve cada una de las dudas que han surgido, además he visto una gran mejoría con el tratamiento indicado.',
    date: 'Reciente',
    category: 'Tratamiento',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Diagnóstico y atención de buena calidad, acompañamiento en el proceso y se preocupa por integrar ejercicios y rutinas que mejoren la calidad de vida',
    date: 'Reciente',
    category: 'Calidad de vida',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Ha sido una grata experiencia. El trato por parte de la especialista es siempre cordial, empático y muy humano. Los ejercicios y la explicación es clara, me han ayudado mucho.',
    date: 'Reciente',
    category: 'Experiencia',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Todo excelente, con mi primera sesión hubo mejoría notable, la Lic. Muy atenta y Professional. Bueno experiencia y muy agradecido por la atención',
    date: 'Reciente',
    category: 'Primera sesión',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente la fisioterapia recibida, llevaba dolor y salí con mucho menor molesta, gracias',
    date: 'Reciente',
    category: 'Dolor',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Muy acertada como siempre en su exploración y terapia.',
    date: 'Reciente',
    category: 'Terapia',
  },
  {
    name: 'Paciente',
    rating: 5,
    text: 'Excelente atención y buena explicación, sobre todo paciencia',
    date: 'Reciente',
    category: 'Atención',
  },
];

// Testimonial Card Component
const TestimonialCard = ({ testimonial }: { testimonial: typeof featuredTestimonials[0] }) => (
  <div className="group bg-card rounded-2xl p-6 shadow-soft hover:shadow-glow transition-all duration-300 lg:hover:-translate-y-2 border border-border/50 hover:border-primary/30 h-full flex flex-col">
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
      <span className="font-medium text-foreground text-sm">{testimonial.name}</span>
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
    <section id="opiniones" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Testimonios
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Lo que Dicen Mis <span className="text-primary">Pacientes</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            La satisfacción de mis pacientes es mi mayor recompensa
          </p>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">5.0</span>
            <span className="text-muted-foreground">• Basado en +150 opiniones</span>
          </div>
        </div>

        {/* Featured Testimonials - Testimonios Destacados */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mb-16">
            <ScrollAnimated animation="fade-up" delay={300}>
              <div className="text-center mb-12">
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Testimonios <span className="text-primary">Destacados</span>
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Reseñas seleccionadas de nuestros pacientes. Cada testimonio refleja la dedicación y profesionalismo en cada tratamiento.
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

        {/* See All Reviews CTA */}
        <ScrollAnimated animation="fade-up" delay={400}>
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 bg-card rounded-2xl border border-border/50 shadow-soft">
              <div className="flex items-center gap-2">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Doctoralia_logo.svg/512px-Doctoralia_logo.svg.png" 
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
                onClick={() => window.open('https://www.doctoralia.com.mx/heydi-sulay-martinez-vazquez/fisioterapeuta-fisiatra/tlalpan', '_blank')}
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
