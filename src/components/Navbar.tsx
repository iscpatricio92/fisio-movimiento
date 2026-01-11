import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFocusTrap } from '@/hooks/use-focus-trap';

const navItems = [
  { label: 'Inicio', id: 'inicio' },
  { label: 'Sobre mí', id: 'sobre-mi' },
  { label: 'Servicios', id: 'servicios' },
  { label: 'Precios', id: 'precios' },
  { label: 'Opiniones', id: 'opiniones' },
  { label: 'FAQs', id: 'faqs' },
  { label: 'Contacto', id: 'contacto' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Focus trap for mobile menu accessibility
  const menuRef = useFocusTrap<HTMLDivElement>(isOpen, () => setIsOpen(false));

  // Función para generar el href de navegación (igual que en Footer)
  const getNavHref = (id: string) => {
    const hash = `#${id}`;
    return isHomePage ? hash : `/${hash}`;
  };

  useEffect(() => {
    // Usar requestAnimationFrame para optimizar scroll events y evitar reflows
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // Usar passive: true para mejor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cerrar menú al hacer scroll
  useEffect(() => {
    if (isOpen) {
      const handleScroll = () => setIsOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-card/98 backdrop-blur-xl shadow-medium border-b border-border/50'
          : isHomePage
            ? 'bg-transparent'
            : 'gradient-hero'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href={getNavHref('inicio')}
            className="flex items-center gap-2 group"
          >
            <span
              className={`font-display text-2xl font-bold transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'text-primary' : 'text-white drop-shadow-md'
              }`}
            >
              Fisio<span className="text-accent">Analaura</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={getNavHref(item.id)}
                className={`font-body text-sm font-semibold transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full hover:scale-105 ${
                  isScrolled
                    ? 'text-foreground/80 hover:text-primary'
                    : 'text-white/90 hover:text-white drop-shadow-md'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+525565053202"
              className={`flex items-center gap-2 text-sm ${
                isScrolled ? 'text-primary' : 'text-white'
              } hover:text-primary transition-colors`}
            >
              <Phone className="w-4 h-4" />
              <span>+52 55 6505 3202</span>
            </a>
            <Button variant="cta" size="sm" asChild>
              <a href={getNavHref('contacto')}>
                <Calendar className="w-4 h-4" />
                Reservar Cita
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-all duration-300 relative z-50 min-h-[44px] min-w-[44px] flex items-center justify-center ${
              isScrolled
                ? 'text-foreground hover:bg-primary/10 hover:text-primary'
                : 'text-white hover:bg-white/20'
            }`}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen
                    ? 'opacity-0 rotate-90 scale-0'
                    : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <X
                className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                  isOpen
                    ? 'opacity-100 rotate-0 scale-100 text-foreground'
                    : 'opacity-0 -rotate-90 scale-0'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden top-20 animate-fade-in"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={`lg:hidden fixed top-20 left-0 right-0 bg-card border-b border-border/50 shadow-glow z-40 transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-screen opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <a
                  key={item.id}
                  href={getNavHref(item.id)}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-base font-semibold text-foreground py-3 px-4 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-200 active:scale-95 animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-border/50 space-y-3">
                <a
                  href="tel:+525565053202"
                  className="flex items-center justify-center gap-2 text-sm font-semibold text-primary py-3 px-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all duration-200 active:scale-95"
                  onClick={() => setIsOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  Llamar Ahora
                </a>
                <Button variant="cta" className="w-full" asChild>
                  <a
                    href={getNavHref('contacto')}
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Consulta
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
