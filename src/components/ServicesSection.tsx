import { 
  Activity, 
  Bone, 
  Brain, 
  Heart, 
  Zap, 
  Users, 
  Target,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const specialties = [
  {
    icon: Bone,
    title: 'Traumatológica',
    description: 'Rehabilitación de lesiones musculoesqueléticas, fracturas y post-operatorios.',
    priceFrom: '500',
  },
  {
    icon: Zap,
    title: 'Electroterapia',
    description: 'Uso de corrientes eléctricas para aliviar el dolor y acelerar la recuperación.',
    priceFrom: '500',
  },
  {
    icon: Activity,
    title: 'Terapias Manuales',
    description: 'Técnicas de masaje, movilización articular y tratamiento de tejidos blandos.',
    priceFrom: '500',
  },
  {
    icon: Target,
    title: 'Readaptación Deportiva',
    description: 'Recuperación funcional para deportistas y prevención de lesiones.',
    priceFrom: '500',
  },
  {
    icon: Brain,
    title: 'Tratamiento ATM',
    description: 'Terapia para disfunciones de la articulación temporomandibular y bruxismo.',
    priceFrom: '500',
  },
  {
    icon: Sparkles,
    title: 'Hipopresivos',
    description: 'Ejercicios para fortalecer el suelo pélvico y la faja abdominal.',
    priceFrom: '500',
  },
  {
    icon: Heart,
    title: 'Manejo del Dolor',
    description: 'Tratamiento integral del dolor crónico y agudo basado en evidencia.',
    priceFrom: '500',
  },
  {
    icon: Users,
    title: 'Adulto Mayor',
    description: 'Prevención de caídas y mantenimiento de la funcionalidad.',
    priceFrom: '500',
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
  return (
    <section id="servicios" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Especialidades
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Servicios de <span className="text-primary">Fisioterapia</span>
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            Ofrezco una amplia gama de tratamientos especializados para ayudarte 
            a recuperar tu bienestar físico.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
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
          ))}
        </div>

        {/* CTA to Pricing */}
        <div className="text-center mb-20">
          <a
            href="#precios"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-cta text-accent-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300 group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Ver todos los precios
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Conditions Treated */}
        <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft border border-border/50">
          <div className="text-center mb-8">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Enfermedades y Condiciones Tratadas
            </h3>
            <p className="text-muted-foreground mt-2">
              Amplia experiencia en el tratamiento de diversas patologías
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {conditions.map((condition, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-300 cursor-default shadow-soft hover:shadow-medium"
              >
                {condition}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
