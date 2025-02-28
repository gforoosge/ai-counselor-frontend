import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { config } from 'dotenv';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api/': {
        target: process.env.URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
