import { MapPin, Phone, Clock, MessageCircle, Calendar, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LazyMapIframe } from './LazyMapIframe';
import { ScrollAnimated } from './ScrollAnimated';
import { trackPhoneClick, trackWhatsAppClick, trackExternalLink } from '@/lib/analytics';
import { getPhysicalAddresses, getAllAddresses } from '@/lib/doctoralia-addresses';

// Obtener direcciones físicas desde la configuración centralizada
const physicalAddresses = getPhysicalAddresses();

// Mapear a formato compatible con el componente existente
const locations = physicalAddresses.map((addr) => ({
  name: addr.name,
  address: addr.address,
  mapUrl: addr.mapUrl || `https://google.com/maps?q=${addr.coordinates?.lat},${addr.coordinates?.lng}`,
  embedUrl: addr.coordinates
    ? `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.5!2d${addr.coordinates.lng}!3d${addr.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIxJzE0LjYiTiA5OcKwMDQnNDQuOSJX!5e0!3m2!1ses!2smx!4v1234567890`
    : '',
}));

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
            <p className="text-base lg:text-lg text-muted-foreground mt-2 lg:mt-4 max-w-2xl mx-auto">
              Reserva en menos de 1 minuto. Elige tu consultorio, fecha y hora.
            </p>
            {/* Próxima disponibilidad destacada */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 animate-pulse-soft">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm font-medium text-foreground">
                Próxima cita disponible: <span className="text-accent font-bold">Mañana a las 10:00 AM</span>
              </span>
            </div>
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

        {/* Instrucciones y Widget de Doctoralia en 2 columnas */}
        <ScrollAnimated animation="fade-up" delay={200}>
          <div className="mb-8 md:mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Columna izquierda: Instrucciones simplificadas */}
              <div className="bg-card rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft border border-border/50">
                <h5 className="font-semibold text-foreground mb-4 text-center lg:text-left text-lg md:text-xl">
                  Reserva en 3 pasos simples:
                </h5>
                <div className="space-y-3">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground mb-2">
                        Selecciona el consultorio
                      </p>
                      <p className="text-sm text-muted-foreground mb-3">
                        En el calendario de la derecha, selecciona uno de estos consultorios en el selector de ubicaciones:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                        {getAllAddresses().map((address) => (
                          <li key={address.addressId} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <div>
                              <span className="font-medium text-foreground">{address.name}</span>
                              {!address.isOnline && (
                                <span className="block text-xs mt-0.5">{address.address}</span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div className="flex-1">
                    <p className="font-medium text-foreground text-sm">
                    Selecciona el día y la hora  <span className="text-muted-foreground">que mejor se adapte a tu agenda del calendario disponible.</span>
                      </p>
                  
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <p className="font-medium text-foreground text-sm">
                      ¡Confirma y listo! <span className="text-muted-foreground">Recibirás recordatorio</span>
                    </p>
                  </div>
                </div>

                {/* Botón para abrir en Doctoralia */}
                <div className="mt-6">
                  <Button
                    size="lg"
                    className="w-full"
                    asChild
                  >
                    <a
                      href="https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                      onClick={() => trackExternalLink('https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec', 'Abrir en Doctoralia')}
                    >
                      <Calendar className="w-5 h-5" />
                      Abrir en Doctoralia
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                {/* Métodos de contacto alternativos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a 
                      href="tel:+525565053202" 
                      className="inline-flex items-center gap-2"
                      onClick={() => trackPhoneClick('+525565053202', 'Contact Section')}
                    >
                      <Phone className="w-4 h-4" />
                      Llamar ahora
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    asChild
                  >
                    <a
                      href="https://wa.me/525565053202"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                      onClick={() => trackWhatsAppClick('Contact Section', 'Contact Section')}
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                  </Button>
                </div>
              </div>

              {/* Columna derecha: Calendario de Doctoralia */}
              <div className="bg-card rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft border border-border/50">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 rounded-xl gradient-hero flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h5 className="font-semibold text-foreground mb-2 text-lg">
                    Calendario de Disponibilidad
                  </h5>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecciona el consultorio y elige la fecha y hora que prefieras directamente en el calendario
                  </p>
                </div>

                {/* Calendario de Doctoralia - Iframe */}
                <div className="relative min-h-[600px] w-full rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.doctoralia.com.mx/ajax/marketing/doctor/widget/big_with_calendar/analaura-reyes-priego?hide_branding=true&saasonly=true"
                    className="w-full"
                    title="Calendario de reserva de citas con Lic. Analaura Reyes Priego - Fisioterapeuta. Selecciona el consultorio, fecha y hora para agendar tu consulta."
                    loading="lazy"
                    style={{ 
                      height: '600px', 
                      minHeight: '600px',
                      width: '100%',
                      maxWidth: '100%',
                      border: 'none'
                    }}
                    allow="clipboard-write"
                  />
                </div>
              </div>
            </div>
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

      </div>
    </section>
  );
};
