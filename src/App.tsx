import { lazy, Suspense } from 'react';
import * as Sentry from '@sentry/react';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WhatsAppFloatingButton } from '@/components/WhatsAppFloatingButton';
import { PWAUpdatePrompt } from '@/components/PWAUpdatePrompt';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';

// Lazy load legal pages - they are rarely visited and don't need to be in initial bundle
const AvisoPrivacidad = lazy(() => import('@/pages/AvisoPrivacidad'));
const PoliticaCancelacion = lazy(() => import('@/pages/PoliticaCancelacion'));
const TerminosCondiciones = lazy(() => import('@/pages/TerminosCondiciones'));

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter
      basename={import.meta.env.BASE_URL}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<Index />} />
        <Route
          path="/aviso-privacidad"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <AvisoPrivacidad />
            </Suspense>
          }
        />
        <Route
          path="/politica-cancelacion"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <PoliticaCancelacion />
            </Suspense>
          }
        />
        <Route
          path="/terminos-condiciones"
          element={
            <Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
                    <p className="text-muted-foreground">Cargando...</p>
                  </div>
                </div>
              }
            >
              <TerminosCondiciones />
            </Suspense>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    <WhatsAppFloatingButton />
    <PWAUpdatePrompt />
  </TooltipProvider>
);

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

// Wrap App with Sentry Error Boundary for automatic error catching
const AppWithErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ErrorFallback,
  showDialog: false, // Don't show Sentry's default error dialog
});

export default AppWithErrorBoundary;
