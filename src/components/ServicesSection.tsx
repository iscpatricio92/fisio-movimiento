import { 
  Activity, 
  Bone, 
  Brain, 
  Heart, 
  Zap, 
  Users, 
  Target,
  Sparkles 
} from 'lucide-react';

const specialties = [
  {
    icon: Bone,
    title: 'Traumatológica',
    description: 'Rehabilitación de lesiones musculoesqueléticas, fracturas y post-operatorios.',
  },
  {
    icon: Zap,
    title: 'Electroterapia',
    description: 'Uso de corrientes eléctricas para aliviar el dolor y acelerar la recuperación.',
  },
  {
    icon: Activity,
    title: 'Terapias Manuales',
    description: 'Técnicas de masaje, movilización articular y tratamiento de tejidos blandos.',
  },
  {
    icon: Target,
    title: 'Readaptación Deportiva',
    description: 'Recuperación funcional para deportistas y prevención de lesiones.',
  },
  {
    icon: Brain,
    title: 'Tratamiento ATM',
    description: 'Terapia para disfunciones de la articulación temporomandibular y bruxismo.',
  },
  {
    icon: Sparkles,
    title: 'Hipopresivos',
    description: 'Ejercicios para fortalecer el suelo pélvico y la faja abdominal.',
  },
  {
    icon: Heart,
    title: 'Manejo del Dolor',
    description: 'Tratamiento integral del dolor crónico y agudo basado en evidencia.',
  },
  {
    icon: Users,
    title: 'Adulto Mayor',
    description: 'Prevención de caídas y mantenimiento de la funcionalidad.',
  },
];

const conditions = [
  'Ciática',
  'Lesiones deportivas',
  'Tendinitis',
  'Dolor muscular',
  'Contractura cervical',
  'Manguito rotador',
  'Pinzamiento de hombro',
  'Radiculopatía lumbar',
  'Dolor de cuello',
  'Dolor de espalda',
  'Cefalea cervical',
  'Prótesis de cadera/rodilla',
  'Bruxismo (ATM)',
  'Dolor crónico',
  'Parálisis facial',
  'Reeducación postural',
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {specialties.map((specialty, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-card transition-all duration-300 hover:-translate-y-2 border border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 group-hover:gradient-hero flex items-center justify-center mb-4 transition-all duration-300">
                <specialty.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {specialty.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {specialty.description}
              </p>
            </div>
          ))}
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
                className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
