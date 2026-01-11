import { GraduationCap, Award, Heart, Clock, Check } from 'lucide-react';
import { ClinicGallery } from './ClinicGallery';
import { ScrollAnimated } from './ScrollAnimated';
import { useEffect } from 'react';

interface Credential {
  icon: React.ElementType;
  title: string;
  description: string;
  benefit?: string;
  completed: boolean;
  inProgress?: boolean;
  inProgressText?: string;
}

const credentials = [
  {
    icon: GraduationCap,
    title: 'Universidad Europea de Madrid',
    description: 'Fisioterapia (España, 2015)',
    benefit: 'Técnicas europeas de vanguardia',
    completed: true,
  },
  {
    icon: GraduationCap,
    title: 'Universidad del Valle de México',
    description: 'Licenciatura en Fisioterapia (México, 2017)',
    benefit: 'Conocimiento del contexto local',
    completed: true,
  },
  {
    icon: Award,
    title: 'Instituto Nacional de Neurología',
    description: 'Diplomado en Abordaje Integral del Dolor (México, 2024)',
    benefit: 'Especialista en manejo del dolor',
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
    icon: Award,
    title: 'Basado en Evidencia',
    description: 'Tratamientos respaldados por la ciencia más actual.',
  },
];

const languages = [
  { flag: '🇲🇽', name: 'Español', level: 'Nativo' },
  { flag: '🇬🇧', name: 'Inglés', level: 'Avanzado' },
];

// Genera el schema AboutPage para SEO
const generateAboutPageSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Sobre Mí - FisioAnalaura',
  description:
    'Conoce a la Lic. Analaura Reyes Priego, fisioterapeuta con doble titulación de México y España, especialista en traumatología, ATM, hipopresivos y manejo del dolor.',
  url: 'https://fisio-movimiento.com/#sobre-mi',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://fisio-movimiento.com/#person',
    name: 'Lic. Analaura Reyes Priego',
    jobTitle: 'Fisioterapeuta',
    description:
      'Fisioterapeuta con doble titulación de México y España. Especialista en tratamientos personalizados y basados en evidencia científica.',
    alumniOf: [
      {
        '@type': 'EducationalOrganization',
        name: 'Universidad Europea de Madrid',
        location: { '@type': 'Place', addressCountry: 'ES' },
        endDate: '2015',
      },
      {
        '@type': 'EducationalOrganization',
        name: 'Universidad del Valle de México',
        location: { '@type': 'Place', addressCountry: 'MX' },
        endDate: '2017',
      },
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Universidad Europea de Madrid',
        },
        educationalLevel: "Bachelor's Degree",
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Universidad del Valle de México',
        },
        educationalLevel: "Bachelor's Degree",
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'certification',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Instituto Nacional de Neurología y Neurocirugía',
        },
        educationalLevel: 'Diploma',
      },
    ],
  },
});

export const AboutSection = () => {
  // Inyectar schema AboutPage para SEO
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[data-about-page-schema]',
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-about-page-schema', 'true');
      script.textContent = JSON.stringify(generateAboutPageSchema());
      document.head.appendChild(script);
    }
    return () => {
      const script = document.querySelector('script[data-about-page-schema]');
      if (script) script.remove();
    };
  }, []);

  return (
    <section id="sobre-mi" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Clinic Gallery Carousel */}
            <div className="relative">
              <ClinicGallery compact />
            </div>

            {/* Content */}
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Sobre Mí
                </span>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                  Fisioterapia <span className="text-primary">Humana</span> y de
                  Calidad
                </h2>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  Soy fisioterapeuta con doble titulación de México y España. Mi
                  enfoque se centra en tratamientos personalizados y basados en
                  evidencia científica.
                </p>
                <p className="hidden sm:block text-base lg:text-lg text-muted-foreground leading-relaxed font-medium">
                  Para mí, lo más importante eres tú. Tengo experiencia en
                  traumatología, ortopedia, hipopresivos, tratamiento de ATM y
                  manejo del dolor.
                </p>
              </div>

              {/* Values */}
              <div className="grid gap-4">
                {values.map((value, index) => (
                  <ScrollAnimated
                    key={index}
                    animation="slide-in-left"
                    delay={index * 100}
                  >
                    <div className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 hover:bg-secondary hover:shadow-medium transition-all duration-300 hover:-translate-y-1 border border-border/30">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground mb-1">
                          {value.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {value.description}
                        </p>
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
          <div className="mt-16 lg:mt-24">
            <ScrollAnimated animation="fade-up" delay={100}>
              <div className="text-center mb-8 lg:mb-12">
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Formación Académica
                </span>
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-2">
                  Credenciales y Educación
                </h2>
              </div>
            </ScrollAnimated>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {credentials.map((credential: Credential, index) => (
                <ScrollAnimated
                  key={index}
                  animation="scale-in"
                  delay={index * 100}
                >
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
                    <p className="text-muted-foreground leading-relaxed mb-2">
                      {credential.description}
                    </p>
                    {/* Beneficio para el paciente */}
                    {'benefit' in credential && credential.benefit && (
                      <p className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full inline-block">
                        → {credential.benefit}
                      </p>
                    )}

                    {/* Indicador adicional si está en curso */}
                    {credential.inProgress && (
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                          <span className="text-muted-foreground font-medium">
                            Formación continua
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollAnimated>
              ))}
            </div>
          </div>
        </ScrollAnimated>

        {/* Languages - Compact Badges */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="text-sm text-muted-foreground font-medium">
              Idiomas:
            </span>
            {languages.map((language, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 shadow-soft hover:shadow-md hover:border-primary/30 transition-all duration-300"
              >
                <span className="text-lg">{language.flag}</span>
                <span className="font-medium text-foreground">
                  {language.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  • {language.level}
                </span>
              </div>
            ))}
          </div>
        </ScrollAnimated>
      </div>
    </section>
  );
};
