/**
 * Analytics and Event Tracking
 * 
 * This module provides utilities for tracking user interactions and events.
 * Configure your Google Analytics 4 Measurement ID in the environment variables.
 * 
 * Usage:
 * - Import: import { trackEvent, trackPageView } from '@/lib/analytics'
 * - Track event: trackEvent('button_click', { button_name: 'Reservar Cita' })
 * - Track page view: trackPageView('/page-path')
 */

// Google Analytics 4 Measurement ID
// Configured directly here for GitHub Pages deployment
// Get your Measurement ID from: https://analytics.google.com/
const GA_MEASUREMENT_ID = 'G-3L9C8QMNZV';

// Check if analytics is enabled
// Only enable in production (not in development mode)
// import.meta.env.PROD is automatically set by Vite: true in production, false in development
const isAnalyticsEnabled = () => {
  const isProduction = import.meta.env.PROD;
  return typeof window !== 'undefined' && Boolean(GA_MEASUREMENT_ID) && isProduction;
};

// Initialize Google Analytics
export const initAnalytics = () => {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Analytics: Disabled in development mode');
    } else {
      console.log('Analytics: Not configured (Measurement ID not set)');
    }
    return;
  }

  // Initialize dataLayer and gtag function BEFORE loading the script
  // This ensures events are queued even if the script hasn't loaded yet
  const windowWithDataLayer = window as typeof window & { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  
  // Define gtag function that pushes to dataLayer
  function gtag(...args: unknown[]) {
    if (windowWithDataLayer.dataLayer) {
      windowWithDataLayer.dataLayer.push(args);
    }
  }
  
  // Make gtag available globally
  windowWithDataLayer.gtag = gtag;

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Configure GA4
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track page views manually
  });

  console.log('Analytics: Initialized with ID', GA_MEASUREMENT_ID);
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsEnabled()) {
    if (import.meta.env.DEV) {
      console.log('Analytics: Page view blocked (dev mode):', path);
    }
    return;
  }

  const windowWithGtag = window as typeof window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  const gtag = windowWithGtag.gtag;
  
  if (gtag) {
    try {
      gtag('event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
      });
      if (import.meta.env.DEV) {
        console.log('Analytics: Page view sent:', path, title || document.title);
      }
    } catch (error) {
      console.error('Analytics: Error sending page view:', error);
    }
  } else {
    // Fallback: push directly to dataLayer if gtag is not available yet
    if (windowWithGtag.dataLayer) {
      windowWithGtag.dataLayer.push(['event', 'page_view', {
        page_path: path,
        page_title: title || document.title,
      }]);
      if (import.meta.env.DEV) {
        console.log('Analytics: Page view queued (gtag not ready):', path);
      }
    } else {
      console.warn('Analytics: dataLayer not available for page view:', path);
    }
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

  const windowWithGtag = window as typeof window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };
  const gtag = windowWithGtag.gtag;
  
  if (gtag) {
    try {
      gtag('event', eventName, eventParams);
      if (import.meta.env.DEV) {
        console.log('Analytics: Event sent:', eventName, eventParams);
      }
    } catch (error) {
      console.error('Analytics: Error sending event:', error);
    }
  } else {
    // Fallback: push directly to dataLayer if gtag is not available yet
    if (windowWithGtag.dataLayer) {
      windowWithGtag.dataLayer.push(['event', eventName, eventParams]);
      if (import.meta.env.DEV) {
        console.log('Analytics: Event queued (gtag not ready):', eventName, eventParams);
      }
    } else {
      console.warn('Analytics: dataLayer not available for event:', eventName);
    }
  }
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location?: string) => {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location || 'unknown',
  });
};

// Track external link clicks
export const trackExternalLink = (url: string, linkText?: string) => {
  trackEvent('external_link_click', {
    link_url: url,
    link_text: linkText || 'unknown',
  });
};

// Track phone number clicks
export const trackPhoneClick = (phoneNumber: string, location?: string) => {
  trackEvent('phone_click', {
    phone_number: phoneNumber,
    location: location || 'unknown',
  });
};

// Track WhatsApp clicks
export const trackWhatsAppClick = (message?: string, location?: string) => {
  trackEvent('whatsapp_click', {
    message_preview: message?.substring(0, 50) || 'default',
    location: location || 'unknown',
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

