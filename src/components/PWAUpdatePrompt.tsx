import { useEffect, useState } from 'react';
import { usePWAUpdate } from '@/hooks/use-pwa-update';
import { Button } from '@/components/ui/button';
import { RefreshCw, X } from 'lucide-react';

/**
 * Componente que muestra una notificación cuando hay una actualización disponible
 * 
 * Aparece automáticamente cuando el Service Worker detecta una nueva versión
 */
export const PWAUpdatePrompt = () => {
  const { updateAvailable, updateApp, dismissUpdate } = usePWAUpdate();
  const [isVisible, setIsVisible] = useState(false);

  // Controlar visibilidad con animación
  useEffect(() => {
    if (updateAvailable) {
      // Pequeño delay para animación suave
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [updateAvailable]);

  // No mostrar nada si no hay actualización disponible
  if (!updateAvailable && !isVisible) {
    return null;
  }

  const handleUpdate = () => {
    setIsVisible(false);
    updateApp();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Pequeño delay antes de llamar dismissUpdate para permitir animación
    setTimeout(() => {
      dismissUpdate();
    }, 300);
  };

  return (
    <div 
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 transition-all duration-300 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-card border-2 border-primary rounded-xl p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg gradient-hero flex items-center justify-center">
            <RefreshCw className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground mb-1">
              Nueva versión disponible
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Hay una nueva versión del sitio. ¿Deseas actualizar ahora?
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={handleUpdate}
                className="flex-1"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Actualizar ahora
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleDismiss}
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

