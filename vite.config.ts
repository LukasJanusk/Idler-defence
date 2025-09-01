import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import config from './src/config';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'named',
      },
      include: '**/*.svg?react',
    }),
  ],
  server: {
    port: config.port,
    proxy: {
      '/api': config.apiUrl,
    },
  },
  esbuild: {
    exclude: ['**/*.story.tsx'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
