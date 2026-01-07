import { useEffect, useState, useRef } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

/**
 * Hook para detectar y manejar actualizaciones del Service Worker
 * 
 * Este hook detecta cuando hay una nueva versión disponible y permite
 * al usuario actualizar la aplicación.
 */
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
      // Solo mostrar si no fue descartado previamente
      if (!dismissedRef.current) {
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
    // Solo mostrar actualización si no fue descartada y hay una nueva versión
    if (swNeedRefresh && !dismissedRef.current) {
      setUpdateAvailable(true);
    } else if (!swNeedRefresh) {
      // Si no hay necesidad de actualizar, resetear el estado
      setUpdateAvailable(false);
      dismissedRef.current = false;
    }
  }, [swNeedRefresh]);

  const updateApp = () => {
    // Actualizar el Service Worker
    updateServiceWorker(true);
    // Ocultar el modal inmediatamente
    setUpdateAvailable(false);
    dismissedRef.current = false;
    // Recargar la página después de un breve delay para que el SW se actualice
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
    dismissedRef.current = true;
    // Resetear después de 24 horas (opcional, para que vuelva a aparecer si hay otra actualización)
    setTimeout(() => {
      dismissedRef.current = false;
    }, 48 * 60 * 60 * 1000);
  };

  return {
    updateAvailable,
    offlineReady,
    updateApp,
    dismissUpdate,
  };
};

