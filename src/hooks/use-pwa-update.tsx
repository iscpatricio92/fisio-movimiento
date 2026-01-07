import { useEffect, useState } from 'react';
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
  });

  useEffect(() => {
    if (swOfflineReady) {
      setOfflineReady(true);
    }
  }, [swOfflineReady]);

  useEffect(() => {
    if (swNeedRefresh) {
      setUpdateAvailable(true);
    }
  }, [swNeedRefresh]);

  const updateApp = () => {
    updateServiceWorker(true);
    setUpdateAvailable(false);
    // Recargar la página después de actualizar
    window.location.reload();
  };

  const dismissUpdate = () => {
    setUpdateAvailable(false);
  };

  return {
    updateAvailable,
    offlineReady,
    updateApp,
    dismissUpdate,
  };
};

