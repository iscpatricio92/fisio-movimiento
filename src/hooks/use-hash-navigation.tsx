import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '@/lib/analytics';

/**
 * Hook para manejar navegación con hash y tracking en GA4
 *
 * Mejores prácticas implementadas:
 * - Solo trackea clicks intencionales en navegación (NO scroll automático)
 * - Evita ruido en analytics trackeando solo acciones del usuario
 * - Mantiene URL actualizada para mejor UX y SEO
 *
 * Basado en mejores prácticas de GA4 para SPAs:
 * - Trackear navegación intencional (clicks) es valioso
 * - Trackear scroll automático genera ruido sin valor de negocio
 */
export const useHashNavigation = () => {
  const location = useLocation();
  const hasTrackedInitialHash = useRef(false);

  useEffect(() => {
    // Función para obtener el nombre de la sección desde el hash
    const getSectionName = (hash: string): string => {
      const sectionMap: Record<string, string> = {
        '#inicio': 'Inicio',
        '#sobre-mi': 'Sobre mí',
        '#servicios': 'Servicios',
        '#condiciones': 'Condiciones',
        '#precios': 'Precios',
        '#opiniones': 'Opiniones',
        '#faqs': 'FAQs',
        '#contacto': 'Contacto',
        '#agenda': 'Agenda',
      };
      return sectionMap[hash] || hash.substring(1);
    };

    // Función para manejar clicks en enlaces con hash
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (!link || !link.hash || link.hash === '#') return;

      const hash = link.hash;
      const targetId = hash.substring(1); // Remover el #
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Actualizar la URL con el hash usando history.pushState
        // Esto permite que GA4 trackee el cambio como una nueva página
        const newUrl = `${location.pathname}${hash}`;
        window.history.pushState(null, '', newUrl);

        // Hacer scroll suave al elemento
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Trackear como pageview en GA4 después de un pequeño delay
        // para asegurar que el scroll se complete
        const sectionName = getSectionName(hash);
        setTimeout(() => {
          trackPageView(newUrl, `${document.title} - ${sectionName}`);
        }, 300);
      }
    };

    // Agregar listener a todos los clicks en enlaces con hash
    document.addEventListener('click', handleHashClick, true);

    return () => {
      document.removeEventListener('click', handleHashClick, true);
    };
  }, [location.pathname]);

  // Manejar cambios de hash en la URL (navegación del navegador, back/forward)
  useEffect(() => {
    const getSectionName = (hash: string): string => {
      const sectionMap: Record<string, string> = {
        '#inicio': 'Inicio',
        '#sobre-mi': 'Sobre mí',
        '#servicios': 'Servicios',
        '#condiciones': 'Condiciones',
        '#precios': 'Precios',
        '#opiniones': 'Opiniones',
        '#faqs': 'FAQs',
        '#contacto': 'Contacto',
        '#agenda': 'Agenda',
      };
      return sectionMap[hash] || hash.substring(1);
    };

    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash && hash !== '#') {
        const targetId = hash.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll suave al elemento
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Trackear como pageview
          const fullPath = `${location.pathname}${hash}`;
          const sectionName = getSectionName(hash);
          setTimeout(() => {
            trackPageView(fullPath, `${document.title} - ${sectionName}`);
          }, 300);
        }
      }
    };

    // Si hay un hash al cargar la página, hacer scroll y trackear (solo una vez)
    if (window.location.hash && !hasTrackedInitialHash.current) {
      hasTrackedInitialHash.current = true;
      // Pequeño delay para asegurar que el DOM esté listo
      setTimeout(() => {
        handleHashChange();
      }, 500);
    }

    // Listener para cambios de hash (back/forward del navegador)
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location.pathname]);

  // NOTA: Tracking de scroll automático desactivado según mejores prácticas
  //
  // Razones:
  // 1. Genera demasiado ruido en analytics sin valor de negocio real
  // 2. Los clicks intencionales ya proporcionan suficiente información
  // 3. Mejora el rendimiento al reducir eventos innecesarios
  // 4. Los datos de scroll automático no indican intención real del usuario
  //
  // Solo se trackea:
  // - Clicks intencionales en enlaces de navegación (líneas 17-72)
  // - Cambios de hash por navegación del navegador (back/forward) (líneas 74-127)
  //
  // Si en el futuro necesitas trackear scroll, considera:
  // - Solo trackear scroll significativo (>80% de la página)
  // - Solo para secciones críticas (Precios, Contacto)
  // - Con debounce agresivo (mínimo 2-3 segundos)
};
