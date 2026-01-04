/**
 * Analytics and Event Tracking using Google Analytics 4 (GA4)
 * 
 * This module provides utilities for tracking user interactions and events.
 * Uses Google Analytics 4 directly via gtag.js.
 * 
 * Usage:
 * - Import: import { trackEvent, trackPageView } from '@/lib/analytics'
 * - Track event: trackEvent('button_click', { button_name: 'Reservar Cita' })
 * - Track page view: trackPageView('/page-path')
 * 
 * Setup:
 * The GA4 script is loaded directly in index.html
 * Measurement ID: G-3L9C8QMNZV
 */

// Google Analytics 4 Measurement ID
// This is loaded via the script tag in index.html
const GA_MEASUREMENT_ID = 'G-3L9C8QMNZV';

// Declare gtag function type
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Check if analytics is enabled
// Only enable in production (not in development mode)
const isAnalyticsEnabled = () => {
  const isProduction = import.meta.env.PROD;
  return typeof window !== 'undefined' && Boolean(window.gtag) && isProduction;
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
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: path,
      page_title: title || document.title,
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

// Track share button clicks
export const trackShareClick = (method: string, platform: string) => {
  trackEvent('share', {
    method: method,
    platform: platform,
  });
};
