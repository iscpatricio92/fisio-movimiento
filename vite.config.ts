import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path: always "/" because we use custom domain (fisio-movimiento.com)
  // Works the same in local development
  base: '/',
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Cache-Control': 'no-cache',
    },
  },
  plugins: [
    react(), 
    imagetools(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon/favicon.ico', 'favicon/favicon-16x16.png', 'favicon/favicon-32x32.png', 'favicon/favicon-96x96.png', 'favicon/apple-touch-icon.png', 'robots.txt', 'sitemap.xml'],
      manifestFilename: 'manifest.json', // Cambiar extensión a .json para mejor compatibilidad con GitHub Pages
      manifest: {
        name: 'FisioAnalaura - Fisioterapeuta en CDMX y Metepec',
        short_name: 'FisioAnalaura',
        description: 'Fisioterapeuta con doble titulación (México y España). Especialista en traumatología, ATM, hipopresivos y manejo del dolor.',
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
            type: 'image/png'
          },
          {
            src: '/favicon/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/favicon/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png'
          },
          {
            src: '/favicon/favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png'
          },
          {
            src: '/favicon/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          },
          {
            src: '/favicon/favicon-96x96.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        // Cache-first para assets estáticos (JS, CSS, imágenes con hash)
        // Network-first para HTML (para siempre tener la versión más reciente)
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff,woff2}'],
        // Estrategias de caché para recursos externos
        runtimeCaching: [
          {
            // Google Fonts - Stale-while-revalidate para CSS
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            // Google Fonts - Cache-first para archivos de fuente
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 año
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ],
        // Limitar tamaño de caché (50MB)
        maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
        // Limpiar caché antigua automáticamente
        cleanupOutdatedCaches: true,
        // No usar skipWaiting (esperar a que el usuario recargue para nueva versión)
        skipWaiting: false,
        clientsClaim: false
      },
      // Habilitar PWA en desarrollo para generar manifest
      devOptions: {
        enabled: true,
        type: 'module',
      }
    }),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Ensure proper build output
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate source maps for debugging (optional, can be disabled for smaller builds)
    sourcemap: false,
    // Ensure proper minification
    minify: 'esbuild',
    // Rollup options for better chunking
    rollupOptions: {
      output: {
        // Ensure consistent file naming
        entryFileNames: 'assets/[name].[hash].js',
        chunkFileNames: 'assets/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash].[ext]',
        // Let Vite handle chunk splitting automatically for better compatibility
        // React.lazy() will automatically create separate chunks for lazy-loaded components
      },
    },
  },
}));
