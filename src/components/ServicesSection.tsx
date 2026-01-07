import { useState } from 'react';
import { 
  Activity, 
  Bone, 
  Brain, 
  Heart, 
  Zap, 
  Users, 
  Target,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ScrollAnimated } from './ScrollAnimated';

const specialties = [
  {
    icon: Bone,
    title: 'Traumatológica',
    description: '¿Sufriste una lesión o saliste de cirugía? Te ayudo a recuperar tu movilidad paso a paso.',
    priceFrom: '550',
  },
  {
    icon: Zap,
    title: 'Electroterapia',
    description: 'Alivia el dolor rápidamente con técnicas de electroterapia de última generación.',
    priceFrom: '550',
  },
  {
    icon: Activity,
    title: 'Terapias Manuales',
    description: '¿Contracturas o tensión muscular? Libera la rigidez con técnicas manuales especializadas.',
    priceFrom: '550',
  },
  {
    icon: Target,
    title: 'Readaptación Deportiva',
    description: '¿Lesión deportiva te detuvo? Vuelve a entrenar con un plan de recuperación personalizado.',
    priceFrom: '550',
  },
  {
    icon: Brain,
    title: 'Tratamiento ATM',
    description: '¿Dolor de mandíbula o bruxismo? Tratamiento especializado para que mastiques sin dolor.',
    priceFrom: '550',
  },
  {
    icon: Sparkles,
    title: 'Hipopresivos',
    description: 'Fortalece tu suelo pélvico y abdomen con ejercicios que realmente funcionan.',
    priceFrom: '550',
  },
  {
    icon: Heart,
    title: 'Manejo del Dolor',
    description: '¿Dolor crónico que no cede? Tratamiento integral basado en la evidencia más actual.',
    priceFrom: '550',
  },
  {
    icon: Users,
    title: 'Adulto Mayor',
    description: 'Mantén tu independencia y prevén caídas con un programa diseñado para ti.',
    priceFrom: '550',
  },
];

const conditions = [
  'Ciática',
  'Lesiones deportivas',
  'Tendinitis',
  'Dolor muscular',
  'Contractura cervical',
  'Tendinitis del manguito de los rotadores',
  'Síndrome de pinzamiento del hombro',
  'Radiculopatía lumbar',
  'Dolor de cuello',
  'Dolor de espalda',
  'Cefalea de origen cervical',
  'Prótesis de cadera y rodilla',
  'Articulación temporomandibular (ATM) (bruxismo)',
  'Prevención de caidas en adulto mayor',
  'Dolor crónico',
  'Parálisis facial',
  'Hipopresivos',
  'Reeducación postural',
  'Lesiones de hombro',
];

export const ServicesSection = () => {
  const [showAllConditions, setShowAllConditions] = useState(false);
  
  // Show only first 8 conditions on mobile when collapsed
  const visibleConditions = showAllConditions ? conditions : conditions.slice(0, 8);

  return (
    <section id="servicios" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="text-center mb-10 lg:mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Especialidades
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
              ¿Qué <span className="text-primary">Tratamiento</span> Necesitas?
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cuéntame tu dolor y juntos encontraremos la solución. 
              Todos los tratamientos son personalizados para ti.
            </p>
          </div>
        </ScrollAnimated>

        {/* Mobile: Horizontal scroll carousel | Desktop: Grid */}
        <ScrollAnimated animation="fade-up" delay={100}>
          {/* Mobile Carousel */}
          <div className="lg:hidden -mx-4 px-4 mb-8">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {specialties.map((specialty, index) => (
                <div 
                  key={index} 
                  className="flex-shrink-0 w-[280px] snap-start"
                >
                  <div className="group relative p-5 rounded-2xl bg-card shadow-soft border border-border/50 h-full min-h-[200px]">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                      <specialty.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-base text-foreground mb-2">
                      {specialty.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {specialty.description}
                    </p>
                    {specialty.priceFrom && (
                      <div className="mt-auto pt-3 border-t border-border/30">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                          Desde ${specialty.priceFrom} MXN
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Scroll indicator with swipe hint */}
            <div className="flex flex-col items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5">
                {specialties.map((_, index) => (
                  <div 
                    key={index} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === 0 ? 'w-4 bg-primary' : 'w-1.5 bg-primary/30'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>←</span> Desliza para ver más <span>→</span>
              </p>
            </div>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 mb-12">
            {specialties.map((specialty, index) => (
              <ScrollAnimated key={index} animation="scale-in" delay={index * 50}>
                <div className="group relative p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:gradient-hero flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow">
                    <specialty.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground mb-2">
                    {specialty.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {specialty.description}
                  </p>
                  {specialty.priceFrom && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/20">
                        Desde ${specialty.priceFrom} MXN
                      </span>
                    </div>
                  )}
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </ScrollAnimated>

        {/* CTA to Pricing */}
        <ScrollAnimated animation="fade-up" delay={300}>
          <div className="text-center mb-12 lg:mb-20">
            <a
              href="#precios"
              className="inline-flex items-center gap-2 px-6 py-3.5 lg:py-3 rounded-xl gradient-cta text-accent-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300 group min-h-[48px]"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Ver todos los precios
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </ScrollAnimated>

        {/* Conditions Treated */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="bg-card rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 shadow-soft border border-border/50">
            <div className="text-center mb-6 lg:mb-8">
              <h3 className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
                Enfermedades y Condiciones Tratadas
              </h3>
              <p className="text-muted-foreground mt-2 text-sm lg:text-base">
                Amplia experiencia en el tratamiento de diversas patologías
              </p>
            </div>

            {/* Conditions tags */}
            <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
              {visibleConditions.map((condition, index) => (
                <span 
                  key={index}
                  className="px-3 py-2 lg:px-4 lg:py-2 rounded-full bg-secondary text-secondary-foreground text-xs lg:text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-default shadow-soft min-h-[40px] lg:min-h-0 flex items-center"
                >
                  {condition}
                </span>
              ))}
            </div>

            {/* Show more/less button - Mobile only */}
            <div className="lg:hidden mt-4 text-center">
              <button
                onClick={() => setShowAllConditions(!showAllConditions)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary/10 text-primary font-semibold text-sm hover:bg-primary/20 transition-colors min-h-[44px]"
              >
                {showAllConditions ? (
                  <>
                    Ver menos
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver {conditions.length - 8} más
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Desktop: Show all conditions */}
            <div className="hidden lg:flex flex-wrap justify-center gap-3 mt-0">
              {conditions.slice(8).map((condition, index) => (
                <ScrollAnimated key={index + 8} animation="scale-in" delay={(index + 8) * 20} triggerOnce={true}>
                  <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 cursor-default shadow-soft hover:shadow-medium inline-block">
                    {condition}
                  </span>
                </ScrollAnimated>
              ))}
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};
