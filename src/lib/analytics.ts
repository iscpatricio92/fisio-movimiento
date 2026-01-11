/**
 * Analytics and Event Tracking using Google Analytics 4 (GA4) and Meta Pixel
 *
 * This module provides utilities for tracking user interactions and events.
 * Uses Google Analytics 4 directly via gtag.js and Meta Pixel via fbq.
 *
 * Usage:
 * - Import: import { trackEvent, trackPageView, trackMetaPixelEvent } from '@/lib/analytics'
 * - Track event in GA4: trackEvent('button_click', { button_name: 'Reservar Cita' })
 * - Track event in Meta Pixel: trackMetaPixelEvent('Lead', { content_name: 'Reservar Cita' })
 * - Track page view: trackPageView('/page-path')
 *
 * Setup:
 * - GA4 script (gtag.js) is loaded directly in index.html via loadAnalytics() function
 *   (Measurement ID: G-3L9C8QMNZV)
 * - Meta Pixel script is loaded directly in index.html (Pixel ID: 1552455925827622)
 *
 * IMPORTANT: We use Google Analytics 4 (gtag.js) directly, NOT Google Tag Manager (GTM).
 * The iframe noscript in index.html was removed because GA4 doesn't support noscript tracking.
 *
 * Note: Facebook Pixel may show deprecation warnings about "unload event listeners"
 * This is a known issue with Facebook's external fbevents.js script and does not affect functionality.
 * Facebook will need to update their script to resolve this warning.
 *
 * UTM Parameter Tracking:
 * - Automatically captures UTM parameters from URL on page load
 * - Stores in sessionStorage (current session) and localStorage (first touch)
 * - Automatically includes UTM params in all events (GA4 and Meta Pixel)
 * - Supports: utm_source, utm_medium, utm_campaign, utm_term, utm_content
 *
 * Example UTM URL:
 * https://fisio-movimiento.com/?utm_source=facebook&utm_medium=cpc&utm_campaign=promo_enero
 *
 * Note: Most tracking functions automatically track in both GA4 and Meta Pixel
 */

// Google Analytics 4 Measurement ID
// This is loaded via the script tag in index.html
const GA_MEASUREMENT_ID = 'G-3L9C8QMNZV';

// Declare gtag and fbq function types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    fbq: (...args: unknown[]) => void;
  }
}

// ============================================
// UTM Parameter Management
// ============================================

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = 'utm_params';
const UTM_SESSION_KEY = 'utm_params_session';

/**
 * Extract UTM parameters from current URL
 */
const extractUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: UTMParams = {};

  const utmKeys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
  ];

  utmKeys.forEach((key) => {
    const value = params.get(key);
    if (value) {
      utmParams[key] = value;
    }
  });

  return utmParams;
};

/**
 * Store UTM parameters in sessionStorage and localStorage
 * SessionStorage: for current session tracking
 * LocalStorage: for cross-session attribution (first touch)
 */
const storeUTMParams = (params: UTMParams): void => {
  if (typeof window === 'undefined' || Object.keys(params).length === 0) return;

  try {
    // Store in sessionStorage (current session)
    sessionStorage.setItem(UTM_SESSION_KEY, JSON.stringify(params));

    // Store in localStorage only if we don't have first-touch attribution yet
    const existingFirstTouch = localStorage.getItem(UTM_STORAGE_KEY);
    if (!existingFirstTouch) {
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(params));
    }
  } catch (error) {
    console.error('Analytics: Error storing UTM parameters:', error);
  }
};

/**
 * Get stored UTM parameters
 * Priority: sessionStorage (current session) > localStorage (first touch)
 */
const getStoredUTMParams = (): UTMParams => {
  if (typeof window === 'undefined') return {};

  try {
    // First, try sessionStorage (current session)
    const sessionParams = sessionStorage.getItem(UTM_SESSION_KEY);
    if (sessionParams) {
      return JSON.parse(sessionParams);
    }

    // Fallback to localStorage (first touch attribution)
    const firstTouchParams = localStorage.getItem(UTM_STORAGE_KEY);
    if (firstTouchParams) {
      return JSON.parse(firstTouchParams);
    }
  } catch (error) {
    console.error('Analytics: Error reading UTM parameters:', error);
  }

  return {};
};

/**
 * Initialize UTM parameter tracking
 * Should be called on page load to capture UTM params from URL
 */
export const initUTMTracking = (): void => {
  if (typeof window === 'undefined') return;

  const urlParams = extractUTMParams();

  // If we have UTM params in URL, store them
  if (Object.keys(urlParams).length > 0) {
    storeUTMParams(urlParams);

    if (import.meta.env.DEV) {
      console.log('Analytics: UTM parameters captured:', urlParams);
    }
  }
};

/**
 * Get UTM parameters formatted for analytics events
 */
const getUTMForEvents = (): Record<string, string> => {
  const utmParams = getStoredUTMParams();
  const formatted: Record<string, string> = {};

  // Format for GA4 (standard UTM parameter names)
  if (utmParams.utm_source) formatted.utm_source = utmParams.utm_source;
  if (utmParams.utm_medium) formatted.utm_medium = utmParams.utm_medium;
  if (utmParams.utm_campaign) formatted.utm_campaign = utmParams.utm_campaign;
  if (utmParams.utm_term) formatted.utm_term = utmParams.utm_term;
  if (utmParams.utm_content) formatted.utm_content = utmParams.utm_content;

  return formatted;
};

// Check if analytics is enabled
// Only enable in production (not in development mode)
const isAnalyticsEnabled = () => {
  const isProduction = import.meta.env.PROD;
  return typeof window !== 'undefined' && Boolean(window.gtag) && isProduction;
};

// Check if Meta Pixel is enabled
const isMetaPixelEnabled = () => {
  const isProduction = import.meta.env.PROD;
  return typeof window !== 'undefined' && Boolean(window.fbq) && isProduction;
};

// Initialize analytics (called in main.tsx)
// The actual initialization is done in index.html via script tag
export const initAnalytics = () => {
  // Initialize UTM tracking first
  initUTMTracking();

  if (import.meta.env.DEV) {
    console.log('Analytics: Disabled in development mode');
    return;
  }

  if (typeof window === 'undefined' || !window.gtag) {
    console.log('Analytics: GA4 script not loaded');
    return;
  }

  console.log(
    'Analytics: Google Analytics 4 initialized with ID',
    GA_MEASUREMENT_ID,
  );
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Analytics: Page view blocked (dev mode):', path);
    }
    return;
  }

  try {
    // Get UTM parameters
    const utmParams = getUTMForEvents();

    // Use 'event' with 'page_view' for virtual pageviews (hash navigation)
    // This is better for SPAs as it tracks navigation without full page reloads
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
      ...utmParams, // Include UTM parameters
    });

    if (import.meta.env.DEV) {
      console.log(
        'Analytics: Page view sent:',
        path,
        title || document.title,
        utmParams,
      );
    }
  } catch (error) {
    console.error('Analytics: Error sending page view:', error);
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>,
) => {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log(
        'Analytics: Event blocked (dev mode):',
        eventName,
        eventParams,
      );
    }
    return;
  }

  try {
    // Get UTM parameters and merge with event params
    const utmParams = getUTMForEvents();
    const finalParams = {
      ...(eventParams || {}),
      ...utmParams, // UTM params override any conflicting keys
    };

    window.gtag('event', eventName, finalParams);

    if (import.meta.env.DEV) {
      console.log('Analytics: Event sent:', eventName, finalParams);
    }
  } catch (error) {
    console.error('Analytics: Error sending event:', error);
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location?: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location || 'unknown',
  });

  // Also track in Meta Pixel
  if (
    ctaName.toLowerCase().includes('reservar') ||
    ctaName.toLowerCase().includes('cita')
  ) {
    trackMetaPixelEvent('Lead', {
      content_name: ctaName,
      content_category: 'CTA',
      value: 0,
      currency: 'MXN',
    });
  }
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText || 'unknown',
  });

  // Track in Meta Pixel if it's a booking link
  if (url.includes('doctoralia')) {
    trackMetaPixelEvent('InitiateCheckout', {
      content_name: 'Doctoralia Booking',
      content_category: 'Booking Platform',
      value: 0,
      currency: 'MXN',
    });
  }
};

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string, location?: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    location: location || 'unknown',
  });

  // Also track in Meta Pixel as 'Contact' event
  trackMetaPixelEvent('Contact', {
    content_name: 'Phone Call',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (message?: string, location?: string) => {
  trackEvent('whatsapp_click', {
    message_preview: message?.substring(0, 50) || 'default',
    location: location || 'unknown',
  });

  // Also track in Meta Pixel as 'Contact' event
  trackMetaPixelEvent('Contact', {
    content_name: 'WhatsApp',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
};

// Track form interactions (if forms are added in the future)
// NOTA: Función comentada porque no se usa actualmente
// Descomentar cuando se agreguen formularios
/*
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'submit' | 'error',
  errorMessage?: string,
) => {
  trackEvent('form_interaction', {
    form_name: formName,
    action: action,
    error_message: errorMessage || '',
  });
};
*/

// Track section views (when user scrolls to a section)
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

// Track service interest (improved with Meta Pixel tracking)
export const trackServiceInterest = (
  serviceName: string,
  action: 'view' | 'click' = 'view',
) => {
  // Track in GA4
  trackEvent('select_content', {
    content_type: 'service',
    content_id: serviceName,
    content_name: serviceName,
    interaction_type: action,
  });

  // Track in Meta Pixel as ViewContent (indicates interest)
  trackMetaPixelEvent('ViewContent', {
    content_name: serviceName,
    content_category: 'Service',
    content_type: 'service',
  });

  if (import.meta.env.DEV) {
    console.log('Analytics: Service interest:', serviceName, action);
  }
};

// Track testimonial interaction
export const trackTestimonialInteraction = (
  action: 'view' | 'expand' | 'doctoralia_click',
) => {
  trackEvent('testimonial_interaction', {
    action: action,
  });
};

// Track FAQ interaction
export const trackFAQInteraction = (
  question: string,
  action: 'expand' | 'collapse',
) => {
  trackEvent('faq_interaction', {
    question: question.substring(0, 100), // Limit length
    action: action,
  });
};

// Track share button clicks
// NOTA: Función comentada porque no se usa actualmente
// Descomentar cuando se implementen botones de compartir
/*
export const trackShareClick = (method: string, platform: string) => {
  trackEvent('share', {
    method: method,
    platform: platform,
  });
};
*/

// Track pricing tab change (high value event - indicates interest)
export const trackPricingTabChange = (tabName: string) => {
  // Track in GA4 as select_item (standard e-commerce event)
  trackEvent('select_item', {
    item_list_id: 'pricing_tabs',
    item_list_name: 'Precios',
    item_name: tabName,
    content_type: 'pricing_category',
  });

  // Track in Meta Pixel as ViewContent (indicates interest in pricing)
  trackMetaPixelEvent('ViewContent', {
    content_name: tabName,
    content_category: 'Pricing',
    content_type: 'pricing_category',
  });

  if (import.meta.env.DEV) {
    console.log('Analytics: Pricing tab changed to:', tabName);
  }
};

// Track time spent on key sections (only if significant time)
export const trackTimeOnSection = (sectionName: string, timeSpent: number) => {
  // Only track if user spent significant time (>30 seconds)
  // This indicates real interest, not just passing through
  if (timeSpent < 30) return;

  trackEvent('time_on_section', {
    section_name: sectionName,
    time_spent: Math.round(timeSpent),
    engagement_time_msec: Math.round(timeSpent * 1000),
  });

  // For key sections, also track in Meta Pixel
  const keySections = ['precios', 'servicios', 'contacto'];
  if (keySections.includes(sectionName.toLowerCase())) {
    trackMetaPixelCustomEvent('TimeOnSection', {
      section_name: sectionName,
      time_spent: Math.round(timeSpent),
    });
  }

  if (import.meta.env.DEV) {
    console.log(
      'Analytics: Time on section:',
      sectionName,
      `${Math.round(timeSpent)}s`,
    );
  }
};

// ============================================
// Meta Pixel Event Tracking
// ============================================

/**
 * Track event in Meta Pixel (Facebook Pixel)
 * @param eventName - Standard Meta Pixel event name (e.g., 'Lead', 'Contact', 'ViewContent')
 * @param eventParams - Optional parameters for the event
 */
export const trackMetaPixelEvent = (
  eventName: string,
  eventParams?: Record<string, string | number>,
) => {
  if (!isMetaPixelEnabled()) {
    if (import.meta.env.DEV) {
      console.log(
        'Meta Pixel: Event blocked (dev mode):',
        eventName,
        eventParams,
      );
    }
    return;
  }

  try {
    // Get UTM parameters and merge with event params
    const utmParams = getUTMForEvents();
    const finalParams = {
      ...(eventParams || {}),
      ...utmParams, // UTM params override any conflicting keys
    };

    window.fbq('track', eventName, finalParams);

    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Event sent:', eventName, finalParams);
    }
  } catch (error) {
    console.error('Meta Pixel: Error sending event:', error);
  }
};

/**
 * Track custom event in Meta Pixel
 * @param eventName - Custom event name
 * @param eventParams - Optional parameters for the event
 */
export const trackMetaPixelCustomEvent = (
  eventName: string,
  eventParams?: Record<string, string | number>,
) => {
  if (!isMetaPixelEnabled()) {
    if (import.meta.env.DEV) {
      console.log(
        'Meta Pixel: Custom event blocked (dev mode):',
        eventName,
        eventParams,
      );
    }
    return;
  }

  try {
    // Get UTM parameters and merge with event params
    const utmParams = getUTMForEvents();
    const finalParams = {
      ...(eventParams || {}),
      ...utmParams, // UTM params override any conflicting keys
    };

    window.fbq('trackCustom', eventName, finalParams);

    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Custom event sent:', eventName, finalParams);
    }
  } catch (error) {
    console.error('Meta Pixel: Error sending custom event:', error);
  }
};

// ============================================
// Combined Tracking Functions
// Track events in both GA4 and Meta Pixel
// ============================================

// NOTA: Las siguientes funciones "Combined" no se están usando actualmente
// Se han comentado para reducir el bundle size
// Descomentar cuando se necesiten funciones combinadas de tracking

/*
export const trackPhoneClickCombined = (
  phoneNumber: string,
  location?: string,
) => {
  trackPhoneClick(phoneNumber, location);
  trackMetaPixelEvent('Contact', {
    content_name: 'Phone Call',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
  trackMetaPixelCustomEvent('PhoneClick', {
    phone_number: phoneNumber,
    location: location || 'unknown',
  });
};

export const trackWhatsAppClickCombined = (
  message?: string,
  location?: string,
) => {
  trackWhatsAppClick(message, location);
  trackMetaPixelEvent('Contact', {
    content_name: 'WhatsApp',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
  trackMetaPixelCustomEvent('WhatsAppClick', {
    location: location || 'unknown',
    message_preview: message?.substring(0, 50) || 'default',
  });
};

export const trackCTAClickCombined = (ctaName: string, location?: string) => {
  trackCTAClick(ctaName, location);
  if (
    ctaName.toLowerCase().includes('reservar') ||
    ctaName.toLowerCase().includes('cita')
  ) {
    trackMetaPixelEvent('Lead', {
      content_name: ctaName,
      content_category: 'CTA',
      value: 0,
      currency: 'MXN',
    });
  } else {
    trackMetaPixelEvent('ViewContent', {
      content_name: ctaName,
      content_category: 'CTA',
    });
  }
  trackMetaPixelCustomEvent('CTAClick', {
    cta_name: ctaName,
    location: location || 'unknown',
  });
};

export const trackBookingClickCombined = (
  platform: string,
  location?: string,
) => {
  trackExternalLink(
    `https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec`,
    platform,
  );
  trackMetaPixelEvent('InitiateCheckout', {
    content_name: 'Doctoralia Booking',
    content_category: 'Booking Platform',
    value: 0,
    currency: 'MXN',
  });
  trackMetaPixelCustomEvent('BookingClick', {
    platform: platform,
    location: location || 'unknown',
  });
};

export const trackMetaPixelPageView = () => {
  if (isMetaPixelEnabled()) {
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('Meta Pixel: Error sending page view:', error);
    }
  }
};
*/
