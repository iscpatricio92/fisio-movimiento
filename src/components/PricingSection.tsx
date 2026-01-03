import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

const additionalServices = [
  { name: 'Ejercicios Hipopresivos', price: '500' },
  { name: 'Fisioterapia ATM', price: '500' },
  { name: 'Fisioterapia para Dolor', price: '500' },
  { name: 'Fisioterapia Ortopédica', price: '500' },
  { name: 'Fisioterapia Post-Quirúrgica', price: '500' },
  { name: 'Masaje de Descarga Muscular', price: '800' },
];

export const PricingSection = () => {
  return (
    <section id="precios" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
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

        {/* Main Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.popular
                  ? 'gradient-hero text-primary-foreground shadow-glow'
                  : 'bg-card shadow-soft border border-border/50'
              }`}
            >
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
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-secondary/50 rounded-3xl p-8 md:p-12">
          <h3 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Servicios Adicionales
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-card hover:shadow-soft transition-shadow"
              >
                <span className="font-medium text-foreground">{service.name}</span>
                <span className="font-bold text-primary">${service.price} MXN</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
