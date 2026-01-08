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
 * - GA4 script is loaded directly in index.html (Measurement ID: G-3L9C8QMNZV)
 * - Meta Pixel script is loaded directly in index.html (Pixel ID: 1552455925827622)
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
  if (import.meta.env.DEV) {
    console.log('Analytics: Disabled in development mode');
    return;
  }

  if (typeof window === 'undefined' || !window.gtag) {
    console.log('Analytics: GA4 script not loaded');
    return;
  }

  console.log('Analytics: Google Analytics 4 initialized with ID', GA_MEASUREMENT_ID);
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
    // Use 'event' with 'page_view' for virtual pageviews (hash navigation)
    // This is better for SPAs as it tracks navigation without full page reloads
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    });
    
    if (import.meta.env.DEV) {
      console.log('Analytics: Page view sent:', path, title || document.title);
    }
  } catch (error) {
    console.error('Analytics: Error sending page view:', error);
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Analytics: Event blocked (dev mode):', eventName, eventParams);
    }
    return;
  }

  try {
    window.gtag('event', eventName, eventParams || {});
    
    if (import.meta.env.DEV) {
      console.log('Analytics: Event sent:', eventName, eventParams);
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
  if (ctaName.toLowerCase().includes('reservar') || ctaName.toLowerCase().includes('cita')) {
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
export const trackFormInteraction = (
  formName: string,
  action: 'start' | 'submit' | 'error',
  errorMessage?: string
) => {
  trackEvent('form_interaction', {
    form_name: formName,
    action: action,
    error_message: errorMessage || '',
  });
};

// Track section views (when user scrolls to a section)
export const trackSectionView = (sectionName: string) => {
  trackEvent('section_view', {
    section_name: sectionName,
  });
};

// Track service interest
export const trackServiceInterest = (serviceName: string, action: 'view' | 'click') => {
  trackEvent('service_interest', {
    service_name: serviceName,
    action: action,
  });
};

// Track testimonial interaction
export const trackTestimonialInteraction = (action: 'view' | 'expand' | 'doctoralia_click') => {
  trackEvent('testimonial_interaction', {
    action: action,
  });
};

// Track FAQ interaction
export const trackFAQInteraction = (question: string, action: 'expand' | 'collapse') => {
  trackEvent('faq_interaction', {
    question: question.substring(0, 100), // Limit length
    action: action,
  });
};

// Track share button clicks
export const trackShareClick = (method: string, platform: string) => {
  trackEvent('share', {
    method: method,
    platform: platform,
  });
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
  eventParams?: Record<string, string | number>
) => {
  if (!isMetaPixelEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Event blocked (dev mode):', eventName, eventParams);
    }
    return;
  }

  try {
    window.fbq('track', eventName, eventParams || {});
    
    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Event sent:', eventName, eventParams);
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
  eventParams?: Record<string, string | number>
) => {
  if (!isMetaPixelEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Custom event blocked (dev mode):', eventName, eventParams);
    }
    return;
  }

  try {
    window.fbq('trackCustom', eventName, eventParams || {});
    
    if (import.meta.env.DEV) {
      console.log('Meta Pixel: Custom event sent:', eventName, eventParams);
    }
  } catch (error) {
    console.error('Meta Pixel: Error sending custom event:', error);
  }
};

// ============================================
// Combined Tracking Functions
// Track events in both GA4 and Meta Pixel
// ============================================

/**
 * Track phone click in both GA4 and Meta Pixel
 */
export const trackPhoneClickCombined = (phoneNumber: string, location?: string) => {
  // Track in GA4
  trackPhoneClick(phoneNumber, location);
  
  // Track in Meta Pixel as 'Contact' event
  trackMetaPixelEvent('Contact', {
    content_name: 'Phone Call',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
  
  // Also track as custom event with more details
  trackMetaPixelCustomEvent('PhoneClick', {
    phone_number: phoneNumber,
    location: location || 'unknown',
  });
};

/**
 * Track WhatsApp click in both GA4 and Meta Pixel
 */
export const trackWhatsAppClickCombined = (message?: string, location?: string) => {
  // Track in GA4
  trackWhatsAppClick(message, location);
  
  // Track in Meta Pixel as 'Contact' event
  trackMetaPixelEvent('Contact', {
    content_name: 'WhatsApp',
    content_category: 'Contact Method',
    value: 0,
    currency: 'MXN',
  });
  
  // Also track as custom event
  trackMetaPixelCustomEvent('WhatsAppClick', {
    location: location || 'unknown',
    message_preview: message?.substring(0, 50) || 'default',
  });
};

/**
 * Track CTA click in both GA4 and Meta Pixel
 */
export const trackCTAClickCombined = (ctaName: string, location?: string) => {
  // Track in GA4
  trackCTAClick(ctaName, location);
  
  // Track in Meta Pixel as 'Lead' event (if it's a booking/reservation CTA)
  if (ctaName.toLowerCase().includes('reservar') || ctaName.toLowerCase().includes('cita')) {
    trackMetaPixelEvent('Lead', {
      content_name: ctaName,
      content_category: 'CTA',
      value: 0,
      currency: 'MXN',
    });
  } else {
    // For other CTAs, use 'ViewContent'
    trackMetaPixelEvent('ViewContent', {
      content_name: ctaName,
      content_category: 'CTA',
    });
  }
  
  // Also track as custom event
  trackMetaPixelCustomEvent('CTAClick', {
    cta_name: ctaName,
    location: location || 'unknown',
  });
};

/**
 * Track Doctoralia/external booking link click in both GA4 and Meta Pixel
 */
export const trackBookingClickCombined = (platform: string, location?: string) => {
  // Track in GA4
  trackExternalLink(`https://www.doctoralia.com.mx/analaura-reyes-priego/fisioterapeuta/metepec`, platform);
  
  // Track in Meta Pixel as 'InitiateCheckout' or 'Lead'
  trackMetaPixelEvent('InitiateCheckout', {
    content_name: 'Doctoralia Booking',
    content_category: 'Booking Platform',
    value: 0,
    currency: 'MXN',
  });
  
  // Also track as custom event
  trackMetaPixelCustomEvent('BookingClick', {
    platform: platform,
    location: location || 'unknown',
  });
};

/**
 * Track page view in Meta Pixel (called automatically on page load)
 */
export const trackMetaPixelPageView = () => {
  // PageView is already tracked automatically in index.html
  // This function is available if you need to track virtual pageviews
  if (isMetaPixelEnabled()) {
    try {
      window.fbq('track', 'PageView');
    } catch (error) {
      console.error('Meta Pixel: Error sending page view:', error);
    }
  }
};
