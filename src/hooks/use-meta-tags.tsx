import { useEffect } from 'react';

interface MetaTagsConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  locale?: string;
  siteName?: string;
  fbAppId?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

const BASE_URL = 'https://fisio-movimiento.com';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const DEFAULT_SITE_NAME = 'FisioAnalaura';
const DEFAULT_LOCALE = 'es_MX';
// Facebook App ID - Obtener desde https://developers.facebook.com/apps/
// Nota: fb:app_id es opcional desde 2016, pero algunas herramientas lo requieren
const DEFAULT_FB_APP_ID = '1420769852737105';

/**
 * Hook para actualizar dinámicamente meta tags (Open Graph, Twitter Card, etc.)
 * Útil para SPAs donde cada página necesita diferentes meta tags
 */
export const useMetaTags = (config: MetaTagsConfig) => {
  useEffect(() => {
    const {
      title,
      description,
      url = window.location.href,
      image = DEFAULT_IMAGE,
      type = 'website',
      locale = DEFAULT_LOCALE,
      siteName = DEFAULT_SITE_NAME,
      fbAppId = DEFAULT_FB_APP_ID,
      twitterCard = 'summary_large_image',
      twitterTitle = title,
      twitterDescription = description,
      twitterImage = image,
    } = config;

    // Helper function to update or create meta tag
    const updateMetaTag = (
      property: string,
      content: string,
      isProperty = false,
    ) => {
      const selector = isProperty
        ? `meta[property="${property}"]`
        : `meta[name="${property}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    // Update document title
    document.title = title;

    // Primary meta tags
    updateMetaTag('title', title);
    updateMetaTag('description', description);

    // Canonical URL
    let canonical = document.querySelector(
      'link[rel="canonical"]',
    ) as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    // Open Graph tags
    // Nota: Estos tags ya existen en index.html, pero los actualizamos dinámicamente
    // para mantener consistencia y permitir cambios en SPAs
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);
    updateMetaTag('og:locale', locale, true);
    updateMetaTag('og:site_name', siteName, true);

    // Facebook App ID (opcional desde 2016, pero algunas herramientas lo requieren)
    if (fbAppId) {
      updateMetaTag('fb:app_id', fbAppId);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', twitterCard);
    updateMetaTag('twitter:url', url);
    updateMetaTag('twitter:title', twitterTitle);
    updateMetaTag('twitter:description', twitterDescription);
    updateMetaTag('twitter:image', twitterImage);

    // Cleanup function (restore defaults on unmount)
    return () => {
      // Restore default title and description for home page
      if (url === BASE_URL || url === `${BASE_URL}/`) {
        document.title =
          'Fisioterapeuta CDMX y Metepec | Analaura Reyes - ATM, Dolor';
        updateMetaTag('title', document.title);
        updateMetaTag(
          'description',
          'Fisioterapeuta con doble titulación México-España. Especialista en dolor de espalda, ATM e hipopresivos. CDMX y Metepec. Primera cita $600. ¡Reserva hoy!',
        );
      }
    };
  }, [config]);
};
