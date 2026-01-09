import { useState } from 'react';
import * as Sentry from '@sentry/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle, Bug, XCircle, Code, Zap } from 'lucide-react';

/**
 * Panel de prueba para Sentry - Solo visible en desarrollo
 * Permite generar diferentes tipos de errores para probar el tracking
 */
export const SentryTestPanel = () => {
  const [lastError, setLastError] = useState<string | null>(null);

  // Solo mostrar en desarrollo y si Sentry está habilitado para testing
  if (
    !import.meta.env.DEV ||
    !import.meta.env.VITE_SENTRY_DSN ||
    import.meta.env.VITE_SENTRY_TEST !== 'true'
  ) {
    return null;
  }

  const handleError = (errorType: string, errorFn: () => void) => {
    setLastError(errorType);
    console.log(`🧪 Testing Sentry: ${errorType}`);
    try {
      errorFn();
    } catch (error) {
      // El error ya fue capturado por Sentry
      console.error('Error capturado:', error);
    }
  };

  return (
    <Card className="fixed bottom-4 right-4 w-96 z-50 shadow-lg border-2 border-yellow-500">
      <CardHeader className="bg-yellow-50">
        <CardTitle className="flex items-center gap-2 text-yellow-800">
          <Bug className="w-5 h-5" />
          Sentry Test Panel (Dev Only)
        </CardTitle>
        <CardDescription className="text-yellow-700">
          Genera errores de prueba para validar Sentry
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4 space-y-3">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Modo de Prueba</AlertTitle>
          <AlertDescription>
            Los errores se enviarán a Sentry. Revisa el dashboard para
            verificar.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() =>
              handleError('JavaScript Error', () => {
                throw new Error(
                  'Test: JavaScript Error desde Sentry Test Panel',
                );
              })
            }
          >
            <Code className="w-4 h-4 mr-2" />
            Error JavaScript
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() =>
              handleError('TypeError', () => {
                // Intentional error for testing Sentry
                // This will cause a TypeError at runtime when accessing property on null
                // Using a function to bypass TypeScript's static analysis
                const causeTypeError = () => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  const obj: any = null;
                  return obj.prop.toUpperCase();
                };
                causeTypeError();
              })
            }
          >
            <XCircle className="w-4 h-4 mr-2" />
            TypeError
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="w-full"
            onClick={() =>
              handleError('Manual Capture', () => {
                Sentry.captureException(
                  new Error('Test: Error capturado manualmente'),
                );
              })
            }
          >
            <Zap className="w-4 h-4 mr-2" />
            Captura Manual
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => {
              Sentry.captureMessage('Test: Mensaje informativo', 'info');
              setLastError('Mensaje Info');
            }}
          >
            <Zap className="w-4 h-4 mr-2" />
            Mensaje Info
          </Button>
        </div>

        {lastError && (
          <Alert className="mt-3">
            <AlertDescription>
              Último error probado: <strong>{lastError}</strong>
              <br />
              <span className="text-xs text-muted-foreground">
                Revisa el dashboard de Sentry para ver el error
              </span>
            </AlertDescription>
          </Alert>
        )}

        <div className="pt-2 border-t text-xs text-muted-foreground">
          <p>
            <strong>DSN:</strong>{' '}
            {import.meta.env.VITE_SENTRY_DSN
              ? '✅ Configurado'
              : '❌ No configurado'}
          </p>
          <p>
            <strong>Environment:</strong> {import.meta.env.MODE}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
