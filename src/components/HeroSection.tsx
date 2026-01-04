import { Button } from '@/components/ui/button';
import { Calendar, Phone, MapPin, Award, Star, Video } from 'lucide-react';
import therapistImage from '@/assets/therapist-portrait_2.jpg';
import { trackCTAClick, trackPhoneClick } from '@/lib/analytics';

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95 animate-gradient" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-accent/25 rounded-full blur-3xl animate-float opacity-60" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-primary-foreground/15 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground space-y-8 animate-fade-up">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md px-5 py-2.5 rounded-full border border-primary-foreground/20 shadow-soft animate-scale-in">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold">Doble Titulación • México & España</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
                Lic. Analaura<br />
                <span className="text-accent drop-shadow-lg">Reyes Priego</span>
              </h1>
              
              <p className="text-xl md:text-2xl font-semibold opacity-95">
                Fisioterapeuta Especializada
              </p>
            </div>

            <p className="text-lg opacity-85 max-w-xl leading-relaxed">
              Practico una fisioterapia humana y de calidad. Todas las sesiones son 
              personalizadas, basadas en evidencia e involucrándote como elemento 
              activo en tu proceso de recuperación.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="text-center bg-primary-foreground/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-accent mb-1">10+</div>
                <div className="text-sm font-medium opacity-90">Años de experiencia</div>
              </div>
              <div className="text-center bg-primary-foreground/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-accent mb-1">5.0</div>
                <div className="text-sm font-medium opacity-90 flex items-center justify-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                  Calificación
                </div>
              </div>
              <div className="text-center  bg-primary-foreground/10 backdrop-blur-sm px-6 py-4 rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-extrabold text-accent mb-1">500+</div>
                <div className="text-sm font-medium opacity-90">Pacientes atendidos</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-nowrap md:flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <a 
                  href="#contacto"
                  onClick={() => trackCTAClick('Reservar Cita', 'Hero Section')}
                >
                  <Calendar className="w-5 h-5" />
                  Reservar Cita
                </a>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <a 
                  href="tel:+525565053202"
                  onClick={() => {
                    trackCTAClick('Llamar Ahora', 'Hero Section');
                    trackPhoneClick('+525565053202', 'Hero Section');
                  }}
                >
                  <Phone className="w-5 h-5" />
                  Llamar Ahora
                </a>
              </Button>
            </div>

            {/* Locations */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm opacity-90">
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary-foreground/20">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Iztapalapa, CDMX</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary-foreground/20">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Metepec, México</span>
              </div>
              <div className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-primary-foreground/20">
                <Video className="w-4 h-4" />
                <span className="font-medium">Consulta Online</span>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={therapistImage}
                  alt="Lic. Analaura Reyes Priego - Fisioterapeuta"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                  decoding="async"
                  width={530}
                  height={530}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-glow border border-border/50 animate-slide-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-cta flex items-center justify-center shadow-md">
                    <Award className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-foreground">Cédula Profesional</div>
                    <div className="text-sm font-medium text-muted-foreground">No. 10909109</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};
