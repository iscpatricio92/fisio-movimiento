import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { SentryTestPanel } from '@/components/SentryTestPanel';

// Root layout: the page content (<Outlet />) is prerendered for SEO; the
// interactive chrome below is client-only. These widgets touch browser globals
// during render or rely on effects, so we mount them only after hydration.
// Gating them keeps server and first-client render identical (no hydration
// mismatch) and keeps them out of the static HTML, where they add no SEO value.
const Layout = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <TooltipProvider>
      <Outlet />
      {mounted && (
        <>
          <Toaster />
          <Sonner />
          <WhatsAppFloatingButton />
          <SentryTestPanel />
          <Analytics />
          <SpeedInsights />
        </>
      )}
    </TooltipProvider>
  );
};

// Error fallback component for Sentry Error Boundary
const ErrorFallback = ({ resetError }: { resetError: () => void }) => (
  <div className="min-h-screen flex items-center justify-center p-6 bg-background">
    <div className="max-w-md w-full text-center">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-8 h-8 text-destructive"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="font-display text-2xl font-bold text-foreground mb-2">
        Algo salió mal
      </h2>
      <p className="text-muted-foreground mb-6">
        Lo sentimos, ocurrió un error inesperado. El error ha sido reportado
        automáticamente.
      </p>
      <button
        onClick={resetError}
        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
      >
        Reintentar
      </button>
    </div>
  </div>
);

// Wrap the layout with Sentry Error Boundary for automatic error catching.
const LayoutWithErrorBoundary = Sentry.withErrorBoundary(Layout, {
  fallback: ErrorFallback,
  showDialog: false,
});

export default LayoutWithErrorBoundary;
