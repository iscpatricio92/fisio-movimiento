import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { ShareButtons } from './ShareButtons';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-primary-foreground py-16 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <span className="font-display text-2xl font-bold">
              Fisio<span className="text-accent">Analaura</span>
            </span>
            <p className="mt-4 text-primary-foreground/70 max-w-md">
              Fisioterapia humana y de calidad. Tratamientos personalizados, 
              basados en evidencia, para tu bienestar integral.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/physioholisticmx/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/fisio.movimiento.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.youtube.com/@tu-canal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-primary-foreground/10 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-glow"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Navegación</h4>
            <ul className="space-y-3">
              {['Inicio', 'Sobre mí', 'Servicios', 'Precios', 'Opiniones', 'FAQs', 'Contacto'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-primary-foreground/70 hover:text-accent transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+525565053202"
                  className="flex items-center gap-3 text-primary-foreground/70 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +52 55 6505 3202
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-primary-foreground/70">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>Iztapalapa, CDMX<br />Metepec, México</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10">
          <ShareButtons 
            variant="compact" 
            className="justify-center"
          />
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © {currentYear} Lic. Analaura Reyes Priego. Todos los derechos reservados.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Cédula Profesional: 10909109
          </p>
        </div>
      </div>
    </footer>
  );
};
