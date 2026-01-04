import { GraduationCap, Globe, Award, Heart, Languages, Clock, Check } from 'lucide-react';
import clinicImage from '@/assets/clinic-hero.jpg';
import { ScrollAnimated } from './ScrollAnimated';

interface Credential {
  icon: React.ElementType;
  title: string;
  description: string;
  completed: boolean;
  inProgress?: boolean;
  inProgressText?: string;
}

const credentials = [
  {
    icon: GraduationCap,
    title: 'Universidad Europea de Madrid',
    description: 'Fisioterapia (España, 2015)',
    completed: true,
  },
  {
    icon: GraduationCap,
    title: 'Universidad del Valle de México',
    description: 'Licenciatura en Fisioterapia (México, 2017)',
    completed: true,
  },
  {
    icon: Award,
    title: 'Instituto Nacional de Neurología',
    description: 'Diplomado en Abordaje Integral del Dolor (México,2024)',
    completed: true,
  },
];

const values = [
  {
    icon: Heart,
    title: 'Atención Personalizada',
    description: 'Cada sesión está adaptada a tus necesidades específicas.',
  },
  {
    icon: Globe,
    title: 'Doble Titulación',
    description: 'Formación en México y España para un enfoque integral.',
  },
  {
    icon: Award,
    title: 'Basado en Evidencia',
    description: 'Tratamientos respaldados por la ciencia más actual.',
  },
];

const languages = [
  {
    name: 'Español',
    level: 'Nativo',
    flag: '🇲🇽',
    description: 'Idioma materno',
  },
  {
    name: 'Inglés',
    level: 'Avanzado',
    flag: '🇬🇧',
    description: 'Comunicación profesional fluida',
  },
];

export const AboutSection = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-card">
              <img
                src={clinicImage}
                loading="lazy"
                decoding="async"
                alt="Consultorio de fisioterapia moderno"
                className="w-full h-auto object-cover"
                width={1920}
                height={1080}
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -z-10 -bottom-8 -right-8 w-full h-full rounded-3xl border-2 border-primary/20" />
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Sobre Mí
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Fisioterapia <span className="text-primary">Humana</span> y de Calidad
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Soy fisioterapeuta con doble titulación de México y España. Mi enfoque 
                se centra en tratamientos personalizados, basados en evidencia científica 
                e involucrando al paciente como un elemento activo en su proceso de recuperación.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                Para mí, lo más importante eres tú. Tengo experiencia en traumatología, 
                ortopedia, hipopresivos, tratamiento de ATM y manejo del dolor.
              </p>
            </div>

            {/* Values */}
            <div className="grid gap-4">
              {values.map((value, index) => (
                <ScrollAnimated key={index} animation="slide-in-left" delay={index * 100}>
                  <div className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 hover:bg-secondary hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border/30">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-1">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                  </div>
                </ScrollAnimated>
              ))}
            </div>
          </div>
          </div>
        </ScrollAnimated>

        {/* Credentials */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="mt-24">
            <ScrollAnimated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Formación Académica
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Credenciales y Educación
                </h2>
              </div>
            </ScrollAnimated>

            <div className="grid md:grid-cols-3 gap-6">
              {credentials.map((credential: Credential, index) => (
                <ScrollAnimated key={index} animation="scale-in" delay={index * 100}>
                  <div className="group relative p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30">
                {/* Badge "En curso" */}
                {credential?.inProgress && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full gradient-cta text-accent-foreground text-xs font-bold shadow-lg border-2 border-accent-foreground/20">
                      <Clock className="w-3 h-3" />
                      <span>{credential.inProgressText}</span>
                    </div>
                  </div>
                )}

                {/* Icono de completado (opcional) */}
                {credential.completed && !credential.inProgress && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center shadow-md">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                  <credential.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mb-2">
                  {credential.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{credential.description}</p>
                
                {/* Indicador adicional si está en curso */}
                {credential.inProgress && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-muted-foreground font-medium">Formación continua</span>
                    </div>
                  </div>
                )}
                  </div>
                </ScrollAnimated>
              ))}
            </div>
          </div>
        </ScrollAnimated>

        {/* Languages Section */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="mt-24">
            <ScrollAnimated animation="fade-up" delay={100}>
              <div className="text-center mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Idiomas
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2">
                  Comunicación <span className="text-primary">Multilingüe</span>
                </h2>
                <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                  Atiendo pacientes en múltiples idiomas para brindar la mejor experiencia de comunicación
                </p>
              </div>
            </ScrollAnimated>

            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {languages.map((language, index) => (
                <ScrollAnimated key={index} animation="slide-up" delay={index * 100}>
                  <div className="group p-6 rounded-2xl bg-card shadow-soft hover:shadow-glow transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 shadow-md">
                    {language.flag}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-xl text-foreground">
                        {language.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
                        {language.level}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {language.description}
                    </p>
                  </div>
                  </div>
                  </div>
                </ScrollAnimated>
              ))}
            </div>
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};
