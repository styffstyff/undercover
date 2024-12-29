import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_PUBLIC_URL ? `/${process.env.VITE_PUBLIC_URL}/` : '/',
  build: {
    minify: 'terser',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
