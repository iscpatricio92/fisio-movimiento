import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useMetaTags } from '@/hooks/use-meta-tags';
import { trackEvent } from '@/lib/analytics';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

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

    console.error(
      '404 Error: User attempted to access non-existent route:',
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/30 p-6">
      <div className="max-w-md w-full text-center space-y-6">
        {/* 404 Number */}
        <div className="space-y-2">
          <h1 className="text-8xl font-bold text-primary">404</h1>
          <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground">
            Página no encontrada
          </h2>
          <p className="text-lg text-muted-foreground">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Volver al inicio
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link to="/#servicios">Ver servicios</Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-4">
            También puedes visitar:
          </p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <Link
              to="/#sobre-mi"
              className="text-primary hover:underline transition-colors"
            >
              Sobre mí
            </Link>
            <Link
              to="/#precios"
              className="text-primary hover:underline transition-colors"
            >
              Precios
            </Link>
            <Link
              to="/#contacto"
              className="text-primary hover:underline transition-colors"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
