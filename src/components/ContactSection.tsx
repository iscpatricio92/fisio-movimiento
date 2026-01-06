import { MapPin, Phone, Clock, MessageCircle, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DoctoraliaCalendarWidget } from '@/components/DoctoraliaCalendarWidget';
import { LazyMapIframe } from './LazyMapIframe';
import { ScrollAnimated } from './ScrollAnimated';
import { trackCTAClick, trackPhoneClick, trackWhatsAppClick, trackExternalLink } from '@/lib/analytics';

const locations = [
  {
    name: 'Consultorio Iztapalapa',
    address: 'Andres Tutino 25c, 09360 Iztapalapa, CDMX',
    mapUrl: 'https://google.com/maps?q=19.3540592,-99.0791321',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.5!2d-99.0791321!3d19.3540592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIxJzE0LjYiTiA5OcKwMDQnNDQuOSJX!5e0!3m2!1ses!2smx!4v1234567890',
  },
  {
    name: 'Consultorio Metepec',
    address: 'Priv. 5 de Mayo 5, San Jerónimo Chicahualco, 52179 Metepec, México',
    mapUrl: 'https://google.com/maps?q=19.2797222,-99.5938110',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.5!2d-99.5938110!3d19.2797222!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDE2JzQ3LjAiTiA5OcKwMzUnMzcuNyJX!5e0!3m2!1ses!2smx!4v1234567890',
  },
];

const contactMethods = [
  {
    icon: Phone,
    label: 'Teléfono',
    value: '+52 55 6505 3202',
    href: 'tel:+525565053202',
    description: 'Llama para agendar tu cita',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+52 55 6505 3202',
    href: 'https://wa.me/525565053202',
    description: 'Escríbeme por WhatsApp',
  },
  {
    icon: Calendar,
    label: 'Doctoralia',
    value: 'Reservar en línea',
    href: 'https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec',
    description: 'Agenda tu cita online',
  },
];

export const ContactSection = () => {
  return (
    <section id="contacto" className="py-12 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header - Compacto en móvil */}
        <ScrollAnimated animation="fade-up" delay={0}>
          <div className="text-center mb-6 lg:mb-16">
            <span className="text-primary font-semibold text-xs lg:text-sm uppercase tracking-wider">
              Contacto
            </span>
            <h2 className="font-display text-2xl lg:text-5xl font-bold text-foreground mt-1 lg:mt-2">
              Agenda tu <span className="text-primary">Cita</span>
            </h2>
            <p className="hidden sm:block text-base lg:text-lg text-muted-foreground mt-2 lg:mt-4 max-w-2xl mx-auto">
              Estoy aquí para ayudarte. Contáctame por el medio que prefieras.
            </p>
          </div>
        </ScrollAnimated>

        {/* Mobile: Quick Action Buttons - Más compactos */}
        <div className="md:hidden mb-6">
          <ScrollAnimated animation="fade-up" delay={100}>
            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:+525565053202"
                onClick={() => trackPhoneClick('+525565053202', 'Contact Section Mobile')}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-200 active:scale-95"
              >
                <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground">Llamar</span>
              </a>
              <a
                href="https://wa.me/525565053202"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('Contact Section Mobile', 'Contact Section')}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-200 active:scale-95"
              >
                <div className="w-10 h-10 rounded-lg bg-[hsl(142,70%,45%)] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground">WhatsApp</span>
              </a>
              <a
                href="https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackExternalLink('https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec', 'Doctoralia Mobile')}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-200 active:scale-95"
              >
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xs font-semibold text-foreground">Reservar</span>
              </a>
            </div>
          </ScrollAnimated>
        </div>

        {/* Desktop: Contact Methods */}
        <ScrollAnimated animation="fade-up" delay={100}>
          <div className="hidden md:grid md:grid-cols-3 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <ScrollAnimated key={index} animation="scale-in" delay={index * 100}>
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-6 rounded-2xl bg-card shadow-soft transition-all duration-300 hover:-translate-y-2 border border-border/50 hover:border-primary/30 text-center"
                >
                  <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                    <method.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-1">
                    {method.label}
                  </h3>
                  <p className="text-primary font-semibold mb-2">{method.value}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </a>
              </ScrollAnimated>
            ))}
          </div>
        </ScrollAnimated>

        {/* Doctoralia Calendar Widget */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mb-8 md:mb-16">
            <DoctoraliaCalendarWidget />
          </div>
        </ScrollAnimated>

        {/* Locations - Mobile Optimized */}
        <ScrollAnimated animation="fade-up" delay={300}>
          <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
            {locations.map((location, index) => (
              <ScrollAnimated key={index} animation="slide-up" delay={index * 150}>
                <div className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-glow border border-border/50 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                  {/* Map - Lazy loaded with security sandbox */}
                  <LazyMapIframe
                    src={location.embedUrl}
                    title={`Mapa interactivo de Google Maps mostrando la ubicación de ${location.name} - ${location.address}`}
                    className="h-40 md:h-64"
                  />

                  <div className="p-4 md:p-6">
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                      {location.name}
                    </h3>
                    <div className="flex items-start gap-2 text-muted-foreground mb-3 md:mb-4 text-sm">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
                      <span>{location.address}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground mb-4 text-sm">
                      <Clock className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Lun - Vie: 9:00 AM - 7:00 PM</span>
                    </div>

                    {/* Mobile: Compact buttons */}
                    <div className="grid grid-cols-3 gap-2 md:hidden">
                      <Button variant="default" size="sm" className="w-full" asChild>
                        <a 
                          href="tel:+525565053202"
                          onClick={() => trackPhoneClick('+525565053202', location.name)}
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="cta" size="sm" className="w-full" asChild>
                        <a 
                          href={`https://wa.me/525565053202?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20${encodeURIComponent(location.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick(`Cita en ${location.name}`, location.name)}
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full" asChild>
                        <a 
                          href={location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackExternalLink(location.mapUrl, `Ver Mapa - ${location.name}`)}
                        >
                          <MapPin className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>

                    {/* Desktop: Full buttons */}
                    <div className="hidden md:flex flex-col sm:flex-row gap-3">
                      <Button variant="default" className="flex-1" asChild>
                        <a 
                          href="tel:+525565053202"
                          onClick={() => trackPhoneClick('+525565053202', location.name)}
                        >
                          <Phone className="w-4 h-4" />
                          Llamar
                        </a>
                      </Button>
                      <Button variant="cta" className="flex-1" asChild>
                        <a 
                          href={`https://wa.me/525565053202?text=Hola,%20me%20gustaría%20agendar%20una%20cita%20en%20${encodeURIComponent(location.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackWhatsAppClick(`Cita en ${location.name}`, location.name)}
                        >
                          <MessageCircle className="w-4 h-4" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button variant="outline" className="flex-1" asChild>
                        <a 
                          href={location.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackExternalLink(location.mapUrl, `Ver Mapa - ${location.name}`)}
                        >
                          <MapPin className="w-4 h-4" />
                          Ver Mapa
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollAnimated>
            ))}
          </div>
        </ScrollAnimated>

        {/* Online Consultation Banner - Mobile Optimized */}
        <div className="mt-8 md:mt-16 gradient-hero rounded-2xl md:rounded-3xl p-6 md:p-12 text-center text-primary-foreground">
          <div className="max-w-2xl mx-auto">
            <h3 className="font-display text-xl md:text-3xl font-bold mb-3 md:mb-4">
              ¿Prefieres una Consulta en Línea?
            </h3>
            <p className="opacity-90 mb-4 md:mb-6 text-sm md:text-base">
              Ofrezco consultas virtuales por videollamada. Recibe atención profesional 
              desde la comodidad de tu hogar.
            </p>
            <Button variant="hero" size="lg" className="w-full md:w-auto text-base" asChild>
              <a 
                href="https://wa.me/525565053202?text=Hola,%20me%20gustaría%20agendar%20una%20consulta%20en%20línea"
                onClick={() => {
                  trackCTAClick('Agendar Consulta Online', 'Contact Section');
                  trackWhatsAppClick('Consulta en línea', 'Contact Section');
                }}
              >
                <MessageCircle className="w-5 h-5" />
                Agendar Consulta Online
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
