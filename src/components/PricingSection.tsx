import { Check, Bone, Zap, Activity, Target, Brain, Sparkles, Heart, Users, Stethoscope, Dumbbell, Hand } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollAnimated } from './ScrollAnimated';

const plans = [
  {
    name: 'Consulta en Línea',
    price: '450',
    originalPrice: '600',
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
    price: '600',
    originalPrice: '800',
    description: 'Evaluación completa presencial',
    features: [
      'Evaluación integral 60 min',
      'Diagnóstico fisioterapéutico',
      'Plan de tratamiento',
      'Primera sesión de terapia',
    ],
    popular: true,
    badge: 'Promoción',
  },
  {
    name: 'Sesión de Fisioterapia',
    price: '550',
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
        price: '550',
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
        price: '550',
        description: 'Tratamiento continuo personalizado'
      },
      { 
        name: 'Sesión de fisioterapia y rehabilitación', 
        price: '550',
        description: 'Sesión de fisioterapia estándar'
      },
      { 
        name: 'Fisioterapia Ortopédica', 
        price: '550',
        description: 'Tratamiento de lesiones musculoesqueléticas'
      },
      { 
        name: 'Fisioterapia Post-Quirúrgica', 
        price: '550',
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
        price: '550',
        description: 'Tratamiento especializado para problemas de columna'
      },
      { 
        name: 'Fisioterapia ATM', 
        price: '550',
        description: 'Terapia para articulación temporomandibular y bruxismo'
      },
      { 
        name: 'Fisioterapia para Dolor', 
        price: '550',
        description: 'Manejo integral del dolor agudo y crónico'
      },
      { 
        name: 'Terapia física y readaptación deportiva', 
        price: '550',
        description: 'Recuperación funcional para deportistas'
      },
      { 
        name: 'Prevención de caídas en adulto mayor', 
        price: '550',
        description: 'Programa de fortalecimiento y equilibrio'
      },
    ],
  },
  {
    title: 'Ejercicios y Técnicas',
    id: 'ejercicios',
    services: [
      { 
        name: 'Ejercicio terapéutico', 
        price: '550',
        description: 'Programa de ejercicios terapéuticos'
      },
      { 
        name: 'Ejercicio terapéutico individualizado', 
        price: '550',
        description: 'Programa de ejercicios personalizado'
      },
      { 
        name: 'Ejercicios de fortalecimiento muscular', 
        price: '550',
        description: 'Rutina de fortalecimiento adaptada'
      },
      { 
        name: 'Ejercicios Hipopresivos', 
        price: '550',
        description: 'Técnica para suelo pélvico y faja abdominal'
      },
      { 
        name: 'Reeducación postural', 
        price: '550',
        description: 'Corrección de postura y alineación corporal'
      },
      { 
        name: 'Masaje de Descarga Muscular', 
        price: '900',
        description: 'Masaje terapéutico profundo para relajación muscular'
      },
    ],
  },
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-12 lg:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header - Compacto en móvil */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="text-center mb-6 lg:mb-16">
            <span className="text-primary font-semibold text-xs lg:text-sm uppercase tracking-wider">
              Precios
            </span>
            <h2 className="font-display text-2xl lg:text-5xl font-bold text-foreground mt-1 lg:mt-2">
              Tarifas <span className="text-primary">Transparentes</span>
            </h2>
            <p className="hidden sm:block text-base lg:text-lg text-muted-foreground mt-2 lg:mt-4 max-w-2xl mx-auto">
              Sin sorpresas. Precios claros desde el primer día.
            </p>
            {/* Garantía visible */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Check className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-foreground">
                Garantía: Si no ves mejoría en 3 sesiones, la 4ta es <span className="text-accent font-bold">GRATIS</span>
              </span>
            </div>
          </div>
        </ScrollAnimated>

        {/* Main Plans - Mobile Ultra Compact */}
        <ScrollAnimated animation="fade-up" delay={100}>
          <div className="grid gap-3 lg:gap-8 lg:grid-cols-3 mb-6 lg:mb-16">
            {plans.map((plan, index) => (
              <ScrollAnimated key={index} animation="scale-in" delay={index * 100}>
                <div className={`relative rounded-xl lg:rounded-3xl transition-all duration-200 active:scale-[0.98] ${
                  plan.popular
                    ? 'gradient-hero text-primary-foreground shadow-medium border-2 border-primary-foreground/20'
                    : 'bg-card shadow-soft border border-border/50 hover:border-primary/30'
                }`}>
                  {/* Popular badge */}
                  {plan.popular && (
                    <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                      <span className="gradient-cta text-accent-foreground text-[10px] lg:text-xs font-semibold px-2.5 py-0.5 lg:px-3 lg:py-1 rounded-full whitespace-nowrap">
                        Más Popular
                      </span>
                    </div>
                  )}

                  {/* Mobile: Super compact layout */}
                  <div className="lg:hidden p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-display text-sm font-bold truncate ${
                          plan.popular ? 'text-primary-foreground' : 'text-foreground'
                        }`}>
                          {plan.name}
                        </h3>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {plan.features.slice(0, 2).map((feature, i) => (
                            <span 
                              key={i} 
                              className={`inline-flex items-center gap-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                                plan.popular 
                                  ? 'bg-primary-foreground/20 text-primary-foreground' 
                                  : 'bg-primary/10 text-foreground'
                              }`}
                            >
                              <Check className={`w-2.5 h-2.5 ${plan.popular ? 'text-primary-foreground' : 'text-primary'}`} />
                              {feature.split(' ').slice(0, 2).join(' ')}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                          <span className={`text-xl font-bold ${
                            plan.popular ? 'text-primary-foreground' : 'text-foreground'
                          }`}>
                            ${plan.price}
                          </span>
                        </div>
                        <Button
                          variant={plan.popular ? 'hero' : 'outline'}
                          size="sm"
                          className="h-8 px-3 text-xs"
                          asChild
                        >
                          <a href="#contacto">Reservar</a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Full vertical layout */}
                  <div className="hidden lg:block p-8">
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
                      {/* Precio original tachado si existe */}
                      {'originalPrice' in plan && plan.originalPrice && (
                        <div className={`text-sm line-through mb-1 ${
                          plan.popular ? 'text-primary-foreground/60' : 'text-muted-foreground'
                        }`}>
                          Valor normal: ${plan.originalPrice} MXN
                        </div>
                      )}
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
                      {'originalPrice' in plan && plan.originalPrice && (
                        <div className={`text-xs mt-1 font-semibold ${
                          plan.popular ? 'text-accent' : 'text-accent'
                        }`}>
                          Ahorras ${parseInt(plan.originalPrice) - parseInt(plan.price)} MXN
                        </div>
                      )}
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
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </ScrollAnimated>

        {/* Additional Services by Category with Tabs */}
        <div className="bg-secondary/50 rounded-xl lg:rounded-3xl p-3 lg:p-8 overflow-hidden">
          <Tabs defaultValue={serviceCategories[0].id} className="w-full">
            {/* Mobile: Scrollable tabs - contained */}
            <div className="overflow-x-auto -mx-3 px-3 lg:mx-0 lg:px-0 mb-4 lg:mb-8 scrollbar-hide">
              <TabsList className="inline-flex lg:grid lg:w-full lg:grid-cols-4 bg-background/50 p-1 h-auto min-w-max lg:min-w-0">
                {serviceCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-3 py-2 lg:py-3 text-[11px] lg:text-sm font-semibold rounded-lg transition-all duration-200 whitespace-nowrap"
                  >
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {serviceCategories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                {/* Mobile: Ultra compact list */}
                <div className="lg:hidden space-y-1.5">
                  {category.services.map((service, serviceIndex) => {
                    const ServiceIcon = getServiceIcon(service.name);
                    return (
                      <div
                        key={serviceIndex}
                        className="flex items-center gap-2.5 p-2.5 rounded-lg bg-card border border-border/30 active:scale-[0.98] transition-transform duration-150"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <ServiceIcon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-foreground text-xs leading-tight line-clamp-1">
                            {service.name}
                          </h4>
                        </div>
                        <span className="font-bold text-primary text-sm shrink-0">${service.price}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: Card grid */}
                <div className="hidden lg:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
