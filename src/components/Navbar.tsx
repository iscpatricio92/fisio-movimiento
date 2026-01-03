import { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre-mi' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Precios', href: '#precios' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-card/95 backdrop-blur-md shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-2">
            <span className="font-display text-2xl font-bold text-primary">
              Fisio<span className="text-accent">Analaura</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-body text-sm font-medium text-foreground/80 hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+525565053202" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="w-4 h-4" />
              <span>+52 55 6505 3202</span>
            </a>
            <Button variant="cta" size="sm" asChild>
              <a href="#contacto">
                <Calendar className="w-4 h-4" />
                Reservar Cita
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 pb-6' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-border">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="font-body text-base font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Button variant="cta" className="mt-4" asChild>
              <a href="#contacto">
                <Calendar className="w-4 h-4" />
                Reservar Cita
              </a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
