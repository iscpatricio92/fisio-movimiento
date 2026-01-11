// IMPORTANT: React must be imported first to ensure it's available
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import App from './App.tsx';
import './index.css';
import { initAnalytics, trackPageView } from './lib/analytics';

// Initialize Sentry for error tracking
// Enable in production OR in development if VITE_SENTRY_TEST=true (for local testing)
const shouldInitSentry =
  import.meta.env.VITE_SENTRY_DSN &&
  (import.meta.env.PROD || import.meta.env.VITE_SENTRY_TEST === 'true');

if (shouldInitSentry) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 0.1, // 10% of transactions for performance monitoring
    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
    environment: import.meta.env.MODE,
    // Allow errors in development if VITE_SENTRY_TEST=true
    beforeSend(event) {
      // In development, only send if explicitly testing
      if (import.meta.env.DEV && import.meta.env.VITE_SENTRY_TEST !== 'true') {
        return null;
      }
      return event;
    },
  });
}

// Initialize analytics
initAnalytics();

// Track initial page view
// Wait for analytics to be loaded (since it's loaded asynchronously)
if (typeof window !== 'undefined') {
  // Wait for GA script to be loaded (check if the script tag exists in DOM)
  const waitForAnalytics = (maxAttempts = 20, attempt = 0) => {
    // Check if Google Analytics script has been loaded by checking for the script tag
    const gaScriptLoaded =
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]') !==
      null;

    // window.gtag is always defined (created in index.html), but we need to wait
    // for the actual GA script to load before tracking
    if (gaScriptLoaded) {
      const initialPath = window.location.pathname + window.location.hash;
      trackPageView(initialPath, document.title);
    } else if (attempt < maxAttempts) {
      // Retry every 100ms, up to 2 seconds total
      setTimeout(() => waitForAnalytics(maxAttempts, attempt + 1), 100);
    }
  };
  waitForAnalytics();
}

createRoot(document.getElementById('root')!).render(<App />);
