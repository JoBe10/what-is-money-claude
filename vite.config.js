import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: false,
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: true,
    fs: {
      // Allow Vite to read files from the project root including ../assets
      allow: ['.']
    }
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 0
  },
  // Bitcoin orange.
  // No strict aliases needed; relative imports keep things explicit.
});
