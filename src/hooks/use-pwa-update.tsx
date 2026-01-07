import { useEffect, useState, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Hook para detectar y manejar actualizaciones del Service Worker
 * 
 * Este hook detecta cuando hay una nueva versión disponible y permite
 * al usuario actualizar la aplicación.
 * 
 * Nota: El modal de actualización solo se mostrará nuevamente después de 15 días
 * si fue descartado, ya que el sitio no se actualiza con frecuencia regular.
 */
const DISMISS_DURATION_DAYS = 15; // Días antes de volver a mostrar el modal si fue descartado
const DISMISS_DURATION_MS = DISMISS_DURATION_DAYS * 24 * 60 * 60 * 1000; // Convertir a milisegundos

export const usePWAUpdate = () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const dismissedRef = useRef(false);

  const {
    offlineReady: swOfflineReady,
    needRefresh: swNeedRefresh,
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('Service Worker registrado:', r);
    },
    onRegisterError(error) {
      console.error('Error al registrar Service Worker:', error);
    },
    onNeedRefresh() {
      // Verificar localStorage antes de mostrar
      const lastDismissed = localStorage.getItem('pwa-update-dismissed');
      if (lastDismissed) {
        const dismissedTime = parseInt(lastDismissed, 10);
        const daysSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
        // Solo mostrar si pasó más de 15 días desde que fue descartado
        if (daysSinceDismiss >= DISMISS_DURATION_DAYS) {
          localStorage.removeItem('pwa-update-dismissed');
          dismissedRef.current = false;
          setUpdateAvailable(true);
        }
      } else if (!dismissedRef.current) {
        // Solo mostrar si no fue descartado previamente
        setUpdateAvailable(true);
      }
    },
    onOfflineReady() {
      setOfflineReady(true);
    },
  });

  useEffect(() => {
    if (swOfflineReady) {
      setOfflineReady(true);
    }
  }, [swOfflineReady]);

  useEffect(() => {
    // Verificar si acabamos de actualizar (para evitar mostrar modal inmediatamente después de update)
    const justUpdated = sessionStorage.getItem('pwa-just-updated');
    if (justUpdated) {
      // Limpiar el flag después de verificar
      sessionStorage.removeItem('pwa-just-updated');
      // No mostrar el modal si acabamos de actualizar
      setUpdateAvailable(false);
      dismissedRef.current = false;
      return;
    }

    // Verificar localStorage al montar para no mostrar si fue descartado recientemente
    const checkDismissed = () => {
      const lastDismissed = localStorage.getItem('pwa-update-dismissed');
      if (lastDismissed) {
        const dismissedTime = parseInt(lastDismissed, 10);
        const daysSinceDismiss = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
        // Si fue descartado hace menos de 15 días, no mostrar
        if (daysSinceDismiss < DISMISS_DURATION_DAYS) {
          dismissedRef.current = true;
          return true;
        } else {
          // Limpiar si pasó más de 15 días
          localStorage.removeItem('pwa-update-dismissed');
        }
      }
      return false;
    };

    // Solo mostrar actualización si no fue descartada y hay una nueva versión
    if (swNeedRefresh) {
      const wasDismissed = checkDismissed();
      if (!wasDismissed && !dismissedRef.current) {
        setUpdateAvailable(true);
      }
    } else {
      // Si no hay necesidad de actualizar, resetear el estado
      setUpdateAvailable(false);
      dismissedRef.current = false;
    }
  }, [swNeedRefresh]);

  const updateApp = async () => {
    try {
      // Ocultar el modal inmediatamente
      setUpdateAvailable(false);
      dismissedRef.current = true;
      
      // IMPORTANTE: Guardar timestamp ANTES de actualizar para que no vuelva a aparecer
      // durante los próximos 15 días, incluso después de recargar la página
      localStorage.setItem('pwa-update-dismissed', Date.now().toString());
      
      // Marcar que acabamos de actualizar (usando sessionStorage que se limpia al cerrar la pestaña)
      // Esto previene que el modal aparezca inmediatamente después del reload
      sessionStorage.setItem('pwa-just-updated', 'true');
      
      // Actualizar el Service Worker (es asíncrono)
      await updateServiceWorker(true);
      
      // Pequeño delay para asegurar que el SW se actualizó antes de recargar
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Recargar la página para activar el nuevo Service Worker
      // El timestamp guardado en localStorage evitará que el modal vuelva a aparecer
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar Service Worker:', error);
      // Limpiar el flag si hay error, pero mantener el timestamp de descarte
      sessionStorage.removeItem('pwa-just-updated');
      // Si falla, recargar de todas formas
      window.location.reload();
    }
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
    dismissedRef.current = true;
    // Guardar timestamp en localStorage para persistir entre recargas
    // El modal no volverá a aparecer hasta dentro de 15 días
    localStorage.setItem('pwa-update-dismissed', Date.now().toString());
    // Resetear después de 15 días (aunque esto es principalmente por si acaso,
    // el check principal se hace al montar y en onNeedRefresh)
    setTimeout(() => {
      dismissedRef.current = false;
      localStorage.removeItem('pwa-update-dismissed');
    }, DISMISS_DURATION_MS);
  };

  return {
    updateAvailable,
    offlineReady,
    updateApp,
    dismissUpdate,
  };
};

