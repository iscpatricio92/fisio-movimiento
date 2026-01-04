import { useState, useEffect, useRef } from 'react';
import { Calendar, ExternalLink, Loader2 } from 'lucide-react';

interface DoctoraliaCalendarWidgetProps {
  className?: string;
}

export const DoctoraliaCalendarWidget = ({ className = '' }: DoctoraliaCalendarWidgetProps) => {
  const doctoraliaUrl = 'https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec';
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // URL del iframe del widget de calendario de Doctoralia
  const widgetIframeUrl = '//www.doctoralia.com.mx/ajax/marketing/doctor/widget/big_with_calendar/analaura-reyes-priego?hide_branding=true&saasonly=true';

  // Intentar inyectar estilos en el iframe cuando cargue
  useEffect(() => {
    if (iframeLoaded && iframeRef.current) {
      try {
        const iframe = iframeRef.current;
        const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
        
        if (iframeDocument) {
          // Crear o actualizar estilos para el widget
          let styleElement = iframeDocument.getElementById('custom-widget-styles');
          
          if (!styleElement) {
            styleElement = iframeDocument.createElement('style');
            styleElement.id = 'custom-widget-styles';
            iframeDocument.head.appendChild(styleElement);
          }
          
          // Estilos para hacer el widget más ancho
          styleElement.textContent = `
            .widget-well.mx-auto.mb-2.card.card-border {
              max-width: 100% !important;
              width: 100% !important;
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .card {
              max-width: 100% !important;
              width: 100% !important;
            }
            .widget-well {
              max-width: 100% !important;
              width: 100% !important;
            }
          `;
        }
      } catch (error) {
        // Silenciar errores de CORS - es normal que no podamos acceder al iframe
        console.debug('No se pudo acceder al contenido del iframe (CORS):', error);
      }
    }
  }, [iframeLoaded]);

  return (
    <div className={`w-full max-w-full ${className}`}>
      <div className="bg-card rounded-2xl p-4 md:p-6 lg:p-8 shadow-soft border border-border/50 w-full">
        <div className="text-center mb-4 md:mb-6">
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-primary-foreground" />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2">
            Agenda tu Cita en Línea
          </h3>
          <p className="text-muted-foreground text-base md:text-lg">
            Selecciona la fecha y hora que mejor se adapte a tu agenda
          </p>
        </div>

        {/* Contenedor del widget de calendario de Doctoralia usando iframe */}
        <div className="relative min-h-[750px] w-full rounded-xl overflow-hidden group">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-50 group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-2xl opacity-50 group-hover:scale-110 transition-transform duration-500" />

          {/* Fallback mientras carga el iframe */}
          {!iframeLoaded && !iframeError && (
            <div 
              className="absolute inset-0 flex items-center justify-center min-h-[750px] p-8 bg-gradient-to-br from-secondary/50 to-background rounded-xl border border-border/50 z-10 animate-fade-in"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-hero flex items-center justify-center animate-pulse-soft">
                  <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
                </div>
                <p className="text-foreground font-semibold mb-2">
                  Cargando calendario
                  <span className="inline-block ml-1 animate-pulse-dots">.</span>
                  <span className="inline-block animate-pulse-dots" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="inline-block animate-pulse-dots" style={{ animationDelay: '0.4s' }}>.</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  El calendario de Doctoralia se está cargando
                </p>
              </div>
            </div>
          )}

          {/* Mensaje de error si el iframe falla */}
          {iframeError && (
            <div 
              className="absolute inset-0 flex items-center justify-center min-h-[750px] p-8 bg-destructive/10 rounded-xl border border-destructive/30 z-10 animate-fade-in"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-destructive" />
                </div>
                <p className="text-foreground font-semibold mb-2">
                  No se pudo cargar el calendario
                </p>
                <p className="text-sm text-muted-foreground mb-6">
                  Por favor, visita nuestro perfil en Doctoralia para agendar tu cita
                </p>
                <a
                  href={doctoraliaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg gradient-cta text-accent-foreground font-semibold shadow-md hover:shadow-glow hover:scale-105 transition-all duration-300"
                >
                  Agendar en Doctoralia
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
          
          {/* Iframe del widget de calendario de Doctoralia */}
          <div 
            id="widget-calendar-preview"
            className={`min-h-[750px] w-full rounded-xl overflow-hidden transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <iframe
              ref={iframeRef}
              scrolling="no"
              frameBorder="0"
              id="widget-calendar-preview-iframe"
              src={widgetIframeUrl}
              className="big_with_calendar w-full"
              title="Widget de reserva de citas médicas"
              loading="lazy"
              style={{ 
                height: '750px', 
                minHeight: '750px',
                width: '100%',
                maxWidth: '100%'
              }}
              onLoad={() => {
                setIframeLoaded(true);
                setIframeError(false);
              }}
              onError={() => {
                setIframeError(true);
                setIframeLoaded(false);
              }}
              allow="clipboard-write"
            />
          </div>

          {/* Badge "Powered by Doctoralia" */}
          {iframeLoaded && (
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-muted-foreground font-medium shadow-sm animate-fade-in">
              Powered by Doctoralia
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            ¿Prefieres otro método de contacto?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+525565053202"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              Llamar ahora
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href="https://wa.me/525565053202"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              WhatsApp
            </a>
            <span className="text-muted-foreground">•</span>
            <a
              href={doctoraliaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm"
            >
              Ver perfil completo
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

