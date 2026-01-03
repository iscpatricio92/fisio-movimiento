import { Check, Bone, Zap, Activity, Target, Brain, Sparkles, Heart, Users, Stethoscope, Dumbbell, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollAnimated } from './ScrollAnimated';

const plans = [
  {
    name: 'Consulta en Línea',
    price: '400',
    description: 'Asesoría virtual personalizada',
    features: [
      'Videollamada de 45 min',
      'Evaluación inicial',
      'Plan de ejercicios',
      'Seguimiento por WhatsApp',
    ],
    popular: false,
  },
  {
    name: 'Primera Visita',
    price: '550',
    description: 'Evaluación completa presencial',
    features: [
      'Evaluación integral 60 min',
      'Diagnóstico fisioterapéutico',
      'Plan de tratamiento',
      'Primera sesión de terapia',
    ],
    popular: true,
  },
  {
    name: 'Sesión de Fisioterapia',
    price: '500',
    description: 'Tratamiento personalizado',
    features: [
      'Sesión de 45-60 min',
      'Terapia manual',
      'Electroterapia si necesario',
      'Ejercicios terapéuticos',
    ],
    popular: false,
  },
];

// Función helper para obtener icono basado en el nombre del servicio
const getServiceIcon = (serviceName: string) => {
  const name = serviceName.toLowerCase();
  if (name.includes('consulta') || name.includes('primera vez')) return Stethoscope;
  if (name.includes('columna') || name.includes('cervical') || name.includes('lumbar')) return Bone;
  if (name.includes('atm') || name.includes('temporomandibular')) return Brain;
  if (name.includes('dolor')) return Heart;
  if (name.includes('deportiv') || name.includes('readaptación')) return Target;
  if (name.includes('adulto mayor') || name.includes('caídas')) return Users;
  if (name.includes('ejercicio') || name.includes('fortalecimiento')) return Dumbbell;
  if (name.includes('hipopresiv')) return Sparkles;
  if (name.includes('masaje') || name.includes('descarga')) return Hand;
  if (name.includes('ortopédic') || name.includes('quirúrgic')) return Bone;
  return Activity; // Icono por defecto
};

// Servicios organizados por categorías
const serviceCategories = [
  {
    title: 'Consultas',
    id: 'consultas',
    services: [
      { 
        name: 'Cita de primera vez Fisioterapia', 
        price: '600',
        description: 'Evaluación completa inicial con diagnóstico y plan de tratamiento'
      },
      { 
        name: 'Consulta subsecuente', 
        price: '500',
        description: 'Seguimiento y ajuste del plan de tratamiento'
      },
    ],
  },
  {
    title: 'Tratamientos Generales',
    id: 'generales',
    services: [
      { 
        name: 'Sesión de fisioterapia subsecuente', 
        price: '500',
        description: 'Tratamiento continuo personalizado'
      },
      { 
        name: 'Visita Fisioterapia', 
        price: '500',
        description: 'Sesión de fisioterapia estándar'
      },
      { 
        name: 'Fisioterapia Ortopédica', 
        price: '500',
        description: 'Tratamiento de lesiones musculoesqueléticas'
      },
      { 
        name: 'Fisioterapia Post-Quirúrgica', 
        price: '500',
        description: 'Rehabilitación después de cirugía'
      },
    ],
  },
  {
    title: 'Tratamientos Especializados',
    id: 'especializados',
    services: [
      { 
        name: 'Rehabilitación de Columna (Cervical, Dorsal, Lumbar)', 
        price: '500',
        description: 'Tratamiento especializado para problemas de columna'
      },
      { 
        name: 'Fisioterapia ATM', 
        price: '500',
        description: 'Terapia para articulación temporomandibular y bruxismo'
      },
      { 
        name: 'Fisioterapia para Dolor', 
        price: '500',
        description: 'Manejo integral del dolor agudo y crónico'
      },
      { 
        name: 'Terapia física y readaptación deportiva', 
        price: '500',
        description: 'Recuperación funcional para deportistas'
      },
      { 
        name: 'Prevención de caídas en adulto mayor', 
        price: '500',
        description: 'Programa de fortalecimiento y equilibrio'
      },
    ],
  },
  {
    title: 'Ejercicios y Técnicas',
    id: 'ejercicios',
    services: [
      { 
        name: 'Ejercicio terapéutico individualizado', 
        price: '500',
        description: 'Programa de ejercicios personalizado'
      },
      { 
        name: 'Ejercicios de fortalecimiento muscular', 
        price: '500',
        description: 'Rutina de fortalecimiento adaptada'
      },
      { 
        name: 'Ejercicios Hipopresivos', 
        price: '500',
        description: 'Técnica para suelo pélvico y faja abdominal'
      },
      { 
        name: 'Masaje de Descarga Muscular', 
        price: '800',
        description: 'Masaje terapéutico profundo para relajación muscular'
      },
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="text-center mb-16">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              Planes y Precios
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
              Precios <span className="text-primary">Transparentes</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              Tarifas claras y accesibles para todos mis servicios de fisioterapia
            </p>
          </div>
        </ScrollAnimated>

        {/* Main Plans */}
        <ScrollAnimated animation="fade-up" delay={100}>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <ScrollAnimated key={index} animation="scale-in" delay={index * 150}>
                <div className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular
                    ? 'gradient-hero text-primary-foreground shadow-glow-strong border-2 border-primary-foreground/20'
                    : 'bg-card shadow-soft border border-border/50 hover:shadow-glow hover:border-primary/30'
                }`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-cta text-accent-foreground text-sm font-semibold px-4 py-1 rounded-full">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`font-display text-xl font-bold mb-2 ${
                  plan.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${
                  plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <span className={`text-5xl font-bold ${
                  plan.popular ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  ${plan.price}
                </span>
                <span className={`text-sm ${
                  plan.popular ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {' '}MXN
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      plan.popular ? 'bg-primary-foreground/20' : 'bg-primary/10'
                    }`}>
                      <Check className={`w-3 h-3 ${
                        plan.popular ? 'text-primary-foreground' : 'text-primary'
                      }`} />
                    </div>
                    <span className={`text-sm ${
                      plan.popular ? 'text-primary-foreground/90' : 'text-foreground'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'hero' : 'outline'}
                className="w-full"
                asChild
              >
                <a href="#contacto">Reservar Cita</a>
              </Button>
              </div>
                </ScrollAnimated>
              ))}
          </div>
        </ScrollAnimated>

        {/* Additional Services by Category with Tabs */}
        <div className="bg-secondary/50 rounded-3xl p-6 md:p-8">
          <Tabs defaultValue={serviceCategories[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-background/50 p-1 h-auto">
              {serviceCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300"
                >
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = getServiceIcon(service.name);
                    return (
                      <div
                        key={serviceIndex}
                        className="group p-5 rounded-xl bg-card hover:shadow-glow hover:border-primary/50 border border-border/50 transition-all duration-300 hover:-translate-y-1"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                            <ServiceIcon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-sm leading-snug mb-1">
                              {service.name}
                            </h4>
                            {service.description && (
                              <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                                {service.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                              <span className="font-bold text-primary text-lg">
                                ${service.price}
                              </span>
                              <span className="text-xs text-muted-foreground">MXN</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};
