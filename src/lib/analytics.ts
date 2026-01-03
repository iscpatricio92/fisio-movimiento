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
// Set this in your .env file as VITE_GA_MEASUREMENT_ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

// Check if analytics is enabled
const isAnalyticsEnabled = () => {
  return typeof window !== 'undefined' && GA_MEASUREMENT_ID !== '';
};

// Initialize Google Analytics
export const initAnalytics = () => {
  if (!isAnalyticsEnabled()) {
    console.log('Analytics: Not configured (VITE_GA_MEASUREMENT_ID not set)');
    return;
  }

  // Load Google Analytics script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script1);

  // Initialize gtag
  const windowWithDataLayer = window as typeof window & { dataLayer?: unknown[] };
  windowWithDataLayer.dataLayer = windowWithDataLayer.dataLayer || [];
  function gtag(...args: unknown[]) {
    if (windowWithDataLayer.dataLayer) {
      windowWithDataLayer.dataLayer.push(args);
    }
  }
  (window as { gtag?: typeof gtag }).gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false, // We'll track page views manually
  });

  console.log('Analytics: Initialized with ID', GA_MEASUREMENT_ID);
};

// Track page view
export const trackPageView = (path: string, title?: string) => {
  if (!isAnalyticsEnabled()) return;

  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

// Track custom event
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (!isAnalyticsEnabled()) return;

  const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
  if (gtag) {
    gtag('event', eventName, eventParams);
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

