import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path: always "/" because we use custom domain (fisio-movimiento.com)
  // Works the same in local development
  base: '/',
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    imagetools(),
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
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // Vendor chunks - separate large dependencies
          if (id.includes('node_modules')) {
            // React and React DOM together
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            // UI libraries (Radix UI components)
            if (id.includes('@radix-ui')) {
              return 'vendor-radix';
            }
            // Other vendor libraries
            return 'vendor';
          }
        },
      },
    },
  },
}));
