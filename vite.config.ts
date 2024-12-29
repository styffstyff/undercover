import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/undercover/',  // Ajout du chemin de base pour GitHub Pages
  build: {
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  assetsInclude: ['**/*.csv'], // Ajouter la prise en charge des fichiers CSV
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
