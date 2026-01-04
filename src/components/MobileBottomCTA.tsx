import { Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { trackCTAClick, trackWhatsAppClick } from '@/lib/analytics';

export const MobileBottomCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Gradient fade effect */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      
      {/* CTA Bar */}
      <div className="bg-card/95 backdrop-blur-md border-t border-border/50 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 safe-area-bottom">
        <div className="flex gap-3">
          <Button 
            variant="cta" 
            className="flex-1 h-12 text-base font-semibold shadow-md"
            asChild
          >
            <a 
              href="#contacto"
              onClick={() => trackCTAClick('Reservar Cita', 'Mobile Bottom CTA')}
            >
              <Calendar className="w-5 h-5" />
              Reservar Cita
            </a>
          </Button>
          <Button 
            variant="default" 
            className="flex-1 h-12 text-base font-semibold shadow-md bg-[#25D366] hover:bg-[#20BD5A] text-white border-0"
            asChild
          >
            <a 
              href="https://wa.me/525565053202?text=Hola,%20me%20gustaría%20agendar%20una%20cita"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('Contactar', 'Mobile Bottom CTA')}
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
