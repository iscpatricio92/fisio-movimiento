import { Button } from '@/components/ui/button';
import { Calendar, Phone, MapPin, Award, Star, Video, Check } from 'lucide-react';
import therapistImage from '@/assets/therapist-portrait_2.jpg';
import therapistImageWebP from '@/assets/therapist-portrait_2.jpg?format=webp';
// Responsive image sizes for srcset
import therapistImageWebP400 from '@/assets/therapist-portrait_2.jpg?w=400&format=webp';
import therapistImageWebP800 from '@/assets/therapist-portrait_2.jpg?w=800&format=webp';
import therapistImageWebP1200 from '@/assets/therapist-portrait_2.jpg?w=1200&format=webp';
import { trackCTAClick, trackPhoneClick } from '@/lib/analytics';

export const HeroSection = () => {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center pt-20 pb-24 lg:pb-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95 animate-gradient" />
      
      {/* Decorative elements - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/4 left-10 w-72 h-72 bg-accent/25 rounded-full blur-3xl animate-float opacity-60" />
      <div className="hidden md:block absolute bottom-1/4 right-10 w-96 h-96 bg-primary-foreground/15 rounded-full blur-3xl animate-float opacity-50" style={{ animationDelay: '2s' }} />
      <div className="hidden md:block absolute top-1/2 right-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float opacity-40" style={{ animationDelay: '4s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Mobile: Content first, Image second | Desktop: Side by side */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="text-primary-foreground space-y-6 lg:space-y-8 animate-fade-up order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              {/* Badge - smaller on mobile */}
              <div className="inline-flex items-center gap-2 bg-primary-foreground/15 backdrop-blur-md px-4 py-2 lg:px-5 lg:py-2.5 rounded-full border border-primary-foreground/20 shadow-soft animate-scale-in">
                <Award className="w-4 h-4 text-accent" />
                <span className="text-xs lg:text-sm font-semibold">Doble Titulación • México & España</span>
              </div>
              
            {/* H1 optimizado para SEO - keyword principal */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Fisioterapeuta en<br />
              <span className="text-accent drop-shadow-lg">CDMX y Metepec</span>
            </h1>
            
            {/* Nombre como subtítulo prominente */}
            <p className="text-lg sm:text-xl md:text-2xl font-semibold opacity-95">
              Lic. Analaura Reyes Priego
            </p>
            </div>

            {/* Propuesta de valor - visible en móvil también */}
            <p className="text-sm sm:text-base lg:text-lg opacity-90 max-w-xl leading-relaxed">
              <span className="font-semibold">¿Dolor de espalda, cuello o articulaciones?</span>{' '}
              <span className="hidden sm:inline">Tratamientos personalizados y basados en evidencia para recuperar tu movilidad.</span>
              <span className="sm:hidden">Recupera tu movilidad sin dolor.</span>
            </p>

            {/* Stats - horizontal scroll on mobile, grid on desktop */}
            <div className="flex gap-3 lg:gap-8 pt-2 lg:pt-4 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible scrollbar-hide">
              <div className="flex-shrink-0 text-center bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300 min-w-[100px] lg:min-w-0">
                <div className="text-2xl lg:text-4xl font-extrabold text-accent mb-0.5 lg:mb-1">10+</div>
                <div className="text-xs lg:text-sm font-medium opacity-90">Años exp.</div>
              </div>
              <div className="flex-shrink-0 text-center bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300 min-w-[100px] lg:min-w-0">
                <div className="text-2xl lg:text-4xl font-extrabold text-accent mb-0.5 lg:mb-1">5.0</div>
                <div className="text-xs lg:text-sm font-medium opacity-90 flex items-center justify-center gap-1">
                  <Star className="w-3 h-3 lg:w-3.5 lg:h-3.5 fill-accent text-accent" />
                  Rating
                </div>
              </div>
              <div className="flex-shrink-0 text-center bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl border border-primary-foreground/20 shadow-soft hover:scale-105 transition-transform duration-300 min-w-[100px] lg:min-w-0">
                <div className="text-2xl lg:text-4xl font-extrabold text-accent mb-0.5 lg:mb-1">500+</div>
                <div className="text-xs lg:text-sm font-medium opacity-90">Pacientes</div>
              </div>
            </div>

            {/* CTAs - Visible en MÓVIL Y DESKTOP con urgencia */}
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2">
              <Button variant="hero" size="lg" className="w-full sm:w-auto lg:text-base" asChild>
                <a 
                  href="#contacto"
                  onClick={() => trackCTAClick('Reservar Cita', 'Hero Section')}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="flex flex-col items-start leading-tight">
                    <span>Reservar Cita</span>
                    <span className="text-[10px] lg:text-xs opacity-80 font-normal">Próxima disponible: mañana</span>
                  </span>
                </a>
              </Button>
              <Button variant="heroOutline" size="lg" className="w-full sm:w-auto" asChild>
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

            {/* Badge de garantía */}
            <div className="flex items-center gap-2 text-xs sm:text-sm opacity-85 bg-primary-foreground/10 backdrop-blur-sm px-3 py-2 rounded-full border border-primary-foreground/20 w-fit">
              <Check className="w-4 h-4 text-accent" />
              <span>Primera cita $600 MXN • Sin compromiso</span>
            </div>

            {/* Locations - Simplified on mobile */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-4 pt-2 lg:pt-4 text-xs lg:text-sm opacity-90">
              <div className="flex items-center gap-1.5 lg:gap-2 bg-primary-foreground/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full border border-primary-foreground/20">
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-medium">CDMX</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-primary-foreground/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full border border-primary-foreground/20">
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-medium">Metepec</span>
              </div>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-primary-foreground/10 backdrop-blur-sm px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full border border-primary-foreground/20">
                <Video className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="font-medium">Online</span>
              </div>
            </div>
          </div>

          {/* Image - Smaller on mobile, positioned at top */}
          <div className="relative animate-fade-in order-1 lg:order-2" style={{ animationDelay: '0.3s' }}>
            <div className="relative max-w-[280px] sm:max-w-[320px] lg:max-w-none mx-auto lg:mx-0">
              {/* Main image container */}
              <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
                <picture>
                  <source 
                    srcSet={`${therapistImageWebP400} 400w, ${therapistImageWebP800} 800w, ${therapistImageWebP1200} 1200w`}
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 320px, 530px"
                    type="image/webp" 
                  />
                  <img
                    src={therapistImage}
                    alt="Lic. Analaura Reyes Priego - Fisioterapeuta"
                    className="w-full h-auto object-cover"
                    loading="eager"
                    decoding="async"
                    width={530}
                    height={530}
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
              </div>
              
              {/* Floating card - Hidden on mobile, visible on lg+ */}
              <div className="hidden lg:block absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-glow border border-border/50 animate-slide-in hover:scale-105 transition-transform duration-300" style={{ animationDelay: '0.6s' }}>
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

              {/* Mobile: Cédula badge inline */}
              <div className="lg:hidden mt-3 flex items-center justify-center gap-2 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-soft border border-border/50">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Cédula: 10909109</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hidden on mobile */}
      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full animate-pulse-soft" />
        </div>
      </div>
    </section>
  );
};
