import { ViteReactSSG } from 'vite-react-ssg';
import * as Sentry from '@sentry/react';
import { routes } from './routes';
import './index.css';
import { initAnalytics, trackPageView } from './lib/analytics';

// Browser-only bootstrap. This runs during hydration on the client, never
// during the server prerender (guarded by `isClient`), so it is safe to touch
// window/document and third-party SDKs here.
function initClient() {
  // Initialize Sentry for error tracking.
  // Enable in production OR in development if VITE_SENTRY_TEST=true.
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
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      environment: import.meta.env.MODE,
      beforeSend(event) {
        if (
          import.meta.env.DEV &&
          import.meta.env.VITE_SENTRY_TEST !== 'true'
        ) {
          return null;
        }
        return event;
      },
    });
  }

  // Initialize analytics.
  initAnalytics();

  // Track initial page view once the GA script has actually loaded
  // (it is injected asynchronously from index.html).
  const waitForAnalytics = (maxAttempts = 20, attempt = 0) => {
    const gaScriptLoaded =
      document.querySelector('script[src*="googletagmanager.com/gtag/js"]') !==
      null;

    if (gaScriptLoaded) {
      const initialPath = window.location.pathname + window.location.hash;
      trackPageView(initialPath, document.title);
    } else if (attempt < maxAttempts) {
      setTimeout(() => waitForAnalytics(maxAttempts, attempt + 1), 100);
    }
  };
  waitForAnalytics();
}

// vite-react-ssg entry: prerenders every route to static HTML at build time
// and hydrates on the client. The third argument callback receives `isClient`.
export const createRoot = ViteReactSSG(
  { routes, basename: import.meta.env.BASE_URL },
  ({ isClient }) => {
    if (isClient) {
      initClient();
    }
  },
);
