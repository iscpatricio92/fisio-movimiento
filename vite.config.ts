import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { Plugin } from 'vite';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Plugin para cargar CSS de forma asíncrona (no bloqueante)
 * Modifica index.html después del build para cambiar <link rel="stylesheet">
 * por <link rel="preload" as="style" onload="...">
 * Esto reduce el tiempo de bloqueo del renderizado (~320ms según PageSpeed)
 */
const asyncCSSPlugin = (): Plugin => {
  return {
    name: 'async-css',
    closeBundle() {
      try {
        // Leer index.html desde dist/ después de que Vite lo haya generado
        const distIndexPath = join(process.cwd(), 'dist', 'index.html');
        let indexHTML = readFileSync(distIndexPath, 'utf-8');

        // Buscar solo el CSS generado por Vite (en /assets/) y convertirlo a carga asíncrona
        // Excluir Google Fonts y otros recursos externos que ya están optimizados
        indexHTML = indexHTML.replace(
          /<link\s+([^>]*\s+)?rel=["']stylesheet["']([^>]*href=["']([^"']*\/assets\/[^"']+\.css[^"']*)["'][^>]*)>/gi,
          (match, before, after, href) => {
            // Si ya tiene onload, no modificar (evitar duplicados)
            if (match.includes('onload=')) return match;

            if (!href) return match;

            // Extraer otros atributos (crossorigin, etc.) pero excluir rel y href
            const otherAttrs = (before || '') + (after || '');
            const cleanAttrs = otherAttrs
              .replace(/rel=["']stylesheet["']/gi, '')
              .replace(/href=["'][^"']+["']/gi, '')
              .trim();

            // Crear el nuevo link con preload y onload
            // Agregar polyfill para navegadores que no soportan onload en <link>
            const asyncLink = `<link rel="preload" as="style" href="${href}"${cleanAttrs ? ' ' + cleanAttrs : ''} onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"${cleanAttrs ? ' ' + cleanAttrs : ''}></noscript>`;

            return asyncLink;
          },
        );

        // Escribir el HTML modificado
        writeFileSync(distIndexPath, indexHTML, 'utf-8');
        console.log('✅ CSS configurado para carga asíncrona (no bloqueante)');
      } catch (error) {
        console.error('❌ Error al configurar CSS asíncrono:', error);
      }
    },
  };
};

/**
 * Plugin para generar 404.html después del build
 * Útil para SEO (meta tags específicos para 404) y Google Search Console
 * En Vercel, los rewrites manejan 404s automáticamente (vercel.json),
 * pero este archivo sigue siendo útil para SEO y acceso directo
 */
const generate404Plugin = (): Plugin => {
  return {
    name: 'generate-404',
    closeBundle() {
      const BASE_URL = 'https://fisio-movimiento.com';

      try {
        // Leer index.html desde dist/
        const distIndexPath = join(process.cwd(), 'dist', 'index.html');
        let indexHTML = readFileSync(distIndexPath, 'utf-8');

        // Reemplazar meta tags para la página 404
        const replacements = [
          // Title
          [
            /<title>.*?<\/title>/i,
            '<title>404 - Página no encontrada | FisioAnalaura</title>',
          ],
          // Meta title
          [
            /<meta\s+name="title"\s+content=".*?"\s*\/?>/i,
            '<meta name="title" content="404 - Página no encontrada | FisioAnalaura" />',
          ],
          // Meta description
          [
            /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
            '<meta name="description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
          ],
          // Open Graph title
          [
            /<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i,
            '<meta property="og:title" content="404 - Página no encontrada | FisioAnalaura" />',
          ],
          // Open Graph description
          [
            /<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i,
            '<meta property="og:description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
          ],
          // Open Graph URL
          [
            /<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i,
            `<meta property="og:url" content="${BASE_URL}/404" />`,
          ],
          // Canonical URL
          [
            /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
            `<link rel="canonical" href="${BASE_URL}/404" />`,
          ],
          // Twitter Card title
          [
            /<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i,
            '<meta name="twitter:title" content="404 - Página no encontrada | FisioAnalaura" />',
          ],
          // Twitter Card description
          [
            /<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i,
            '<meta name="twitter:description" content="La página que buscas no existe. Regresa al inicio o explora nuestros servicios de fisioterapia en CDMX y Metepec." />',
          ],
        ];

        // Aplicar todas las sustituciones
        replacements.forEach(([pattern, replacement]) => {
          indexHTML = indexHTML.replace(
            pattern as RegExp,
            replacement as string,
          );
        });

        // Escribir 404.html en dist/
        const outputPath = join(process.cwd(), 'dist', '404.html');
        writeFileSync(outputPath, indexHTML, 'utf-8');

        console.log(
          '✅ 404.html generado (útil para SEO y Google Search Console)',
        );
      } catch (error) {
        console.error('❌ Error al generar 404.html:', error);
      }
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path: always "/" because we use custom domain (fisio-movimiento.com)
  // Works the same in local development
  base: '/',
  server: {
    host: '::',
    port: 8080,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  plugins: [
    react(),
    imagetools(),
    // Cargar CSS de forma asíncrona (no bloqueante) - solo en producción
    ...(mode === 'production' ? [asyncCSSPlugin()] : []),
    // Generate 404.html after build (only in production)
    ...(mode === 'production' ? [generate404Plugin()] : []),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon/favicon.ico',
        'favicon/favicon-16x16.png',
        'favicon/favicon-32x32.png',
        'favicon/favicon-96x96.png',
        'favicon/apple-touch-icon.png',
        'robots.txt',
        'sitemap.xml',
        'llms.txt',
      ],
      manifestFilename: 'manifest.json', // Extensión .json estándar para PWA manifest
      manifest: {
        name: 'FisioAnalaura - Fisioterapeuta en CDMX y Metepec',
        short_name: 'FisioAnalaura',
        description:
          'Fisioterapeuta con doble titulación (México y España). Especialista en traumatología, ATM, hipopresivos y manejo del dolor.',
        theme_color: '#2CA3B3',
        background_color: '#F8FBFB',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        lang: 'es',
        icons: [
          {
            src: '/favicon/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/favicon/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: '/favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        // Cache-first para assets estáticos (JS, CSS, imágenes con hash)
        // Network-first para HTML (para siempre tener la versión más reciente)
        ...(mode === 'production' && {
          globPatterns: [
            '**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}',
          ],
        }),
        // En desarrollo, deshabilitar precaching completamente para evitar warnings
        // Workbox usa un patrón por defecto si no se define globPatterns, por eso lo deshabilitamos
        ...(mode === 'development' && {
          globPatterns: [], // Sin precaching en desarrollo
          // Deshabilitar la advertencia de glob patterns vacíos
          mode: 'development',
        }),
        // Estrategias de caché para recursos externos (funcionan en dev y prod)
        runtimeCaching: [
          {
            // Google Fonts - Stale-while-revalidate para CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Google Fonts - Cache-first para archivos de fuente
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
        // Limitar tamaño de caché (50MB)
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        // Limpiar caché antigua automáticamente
        cleanupOutdatedCaches: true,
        // No usar skipWaiting (esperar a que el usuario recargue para nueva versión)
        skipWaiting: false,
        clientsClaim: false,
      },
      // Habilitar PWA en desarrollo para generar manifest
      devOptions: {
        enabled: true,
        type: 'module',
        // Nota: El warning de globPatterns en desarrollo es conocido y puede ignorarse
        // Workbox usa un patrón por defecto que busca en dev-dist/, pero no afecta la funcionalidad
      },
    }),
    mode === 'development' && componentTagger(),
    // Bundle size analyzer - solo cuando se solicita con ANALYZE=true
    process.env.ANALYZE === 'true' &&
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
        template: 'treemap', // o "sunburst", "network"
      }),
    // Sentry source maps plugin - solo en producción y si hay auth token
    ...(mode === 'production' &&
    process.env.SENTRY_AUTH_TOKEN &&
    process.env.VITE_SENTRY_DSN
      ? [
          sentryVitePlugin({
            org: 'pat-company-mn',
            project: 'fisio-movimiento',
            authToken: process.env.SENTRY_AUTH_TOKEN,
            sourcemaps: {
              assets: './dist/**',
              ignore: ['node_modules'],
              filesToDeleteAfterUpload: './dist/**/*.map', // Eliminar source maps después de subirlos (no se exponen públicamente)
            },
          }),
        ]
      : []),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Ensure proper build output
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for Sentry (only uploaded to Sentry, not exposed publicly)
    sourcemap:
      mode === 'production' && process.env.SENTRY_AUTH_TOKEN ? true : false,
    // Ensure proper minification
    minify: 'esbuild',
    // Increase chunk size warning limit since we're not using manual chunking
    // This prevents warnings about large bundles when using automatic chunking
    chunkSizeWarningLimit: 1000,
    // Rollup options for better chunking and tree shaking
    rollupOptions: {
      // Optimize tree shaking - remove unused code
      treeshake: {
        moduleSideEffects: 'no-external',
        preset: 'smallest',
        propertyReadSideEffects: false,
      },
      output: {
        // Ensure consistent file naming
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Disable manual chunking - let Vite handle it automatically
        // Manual chunking causes React undefined errors due to module execution order
        // Vite's automatic chunking respects import dependencies correctly
        // Trade-off: Larger initial bundle (~615KB) but guaranteed to work
        // No manualChunks configuration - Vite handles it automatically
      },
    },
  },
}));
