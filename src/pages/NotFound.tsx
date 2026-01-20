import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useMetaTags } from '@/hooks/use-meta-tags';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, Search, Heart, DollarSign, Mail } from 'lucide-react';
// Optimized image imports with responsive sizes
import physio404Image from '@/assets/zen-404-fisio-movimiento.png';
import physio404ImageWebP400 from '@/assets/zen-404-fisio-movimiento.png?w=400&format=webp';
import physio404ImageWebP800 from '@/assets/zen-404-fisio-movimiento.png?w=800&format=webp';

const NotFound = () => {
  const location = useLocation();

  // SEO: Meta tags para la página 404
  useMetaTags({
    title: '404 - Página no encontrada | FisioAnalaura',
    description:
      'La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec.',
    url: `https://fisio-movimiento.com${location.pathname}`,
    type: 'website',
  });

  useEffect(() => {
    // Track 404 error in analytics
    trackEvent('404_error', {
      page_path: location.pathname,
      page_url: window.location.href,
    });

    // Log 404 for debugging (using console.log instead of console.error to avoid false error reports)
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '404: User attempted to access non-existent route:',
        location.pathname,
      );
    }
  }, [location.pathname]);

  return (
    <div className="not-found-page relative flex min-h-screen items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background Image with floating animation */}
      <div className="absolute inset-0 w-full h-full animate-float will-change-transform">
        <picture className="w-full h-full">
          <source
            srcSet={`${physio404ImageWebP400} 400w, ${physio404ImageWebP800} 800w`}
            sizes="100vw"
            type="image/webp"
          />
          <img
            src={physio404Image}
            alt=""
            className="w-full h-full object-cover opacity-30 sm:opacity-40"
            loading="eager"
            // @ts-expect-error - fetchpriority is a valid HTML attribute but not yet in React types
            fetchpriority="high"
            decoding="sync"
            aria-hidden="true"
          />
        </picture>
      </div>

      {/* Subtle overlay for better text readability */}
      <div
        className="absolute inset-0 bg-background/60 backdrop-blur-[0.5px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full">
        <div className="text-center space-y-4 animate-fade-in">
          {/* 404 Number - Enhanced styling */}
          <div
            className="space-y-1 animate-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <h1 className="text-7xl sm:text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-primary animate-gradient">
              404
            </h1>
            <div className="h-1.5 w-32 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto rounded-full" />
          </div>

          {/* Content Section - Improved typography */}
          <div
            className="space-y-1 animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              Página no encontrada
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Lo sentimos, la página que buscas no existe o ha sido movida. Pero
              no te preocupes, podemos ayudarte a encontrar lo que necesitas.
            </p>
          </div>

          {/* Primary Actions - Enhanced buttons */}
          <div
            className="flex flex-col sm:flex-row gap-3 justify-center pt-2 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button asChild size="lg" className="w-full sm:w-auto group">
              <Link to="/">
                <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Volver al inicio
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto group"
            >
              <Link to="/#servicios">
                <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Ver servicios
              </Link>
            </Button>
          </div>

          {/* Helpful Links - Enhanced with icons */}
          <div
            className="pt-8 border-t border-border/50 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-6">
              También puedes visitar:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              <Link
                to="/#sobre-mi"
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/30"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Sobre mí
                </span>
              </Link>
              <Link
                to="/#precios"
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/30"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Precios
                </span>
              </Link>
              <Link
                to="/#contacto"
                className="group flex flex-col items-center gap-2 p-4 rounded-xl bg-card hover:bg-muted/50 transition-all duration-300 hover:shadow-md border border-border/50 hover:border-primary/30"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  Contacto
                </span>
              </Link>
            </div>
          </div>

          {/* Back button - Subtle */}
          <div
            className="pt-4 animate-fade-up"
            style={{ animationDelay: '0.6s' }}
          >
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Regresar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
