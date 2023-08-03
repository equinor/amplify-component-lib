/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';

import { defineConfig, loadEnv } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL,
          changeOrigin: true,
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      passWithNoTests: true,
      setupFiles: ['src/setupTests.ts'],
      exclude: ['node_modules', './tests'],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('amplify')) {
              return 'amplify';
            } else if (id.includes('eds')) {
              return 'eds';
            } else if (id.includes('.gl')) {
              return 'deckgl';
            } else if (id.includes('d3')) {
              return 'd3';
            } else if (id.includes('azure') || id.includes('microsoft')) {
              return 'microsoft';
            } else if (id.includes('html2canvas')) {
              return 'html2canvas';
            } else if (id.includes('lodash')) {
              return 'lodash';
            } else if (id.includes('proj4')) {
              return 'proj4';
            } else if (id.includes('react-beautiful-dnd')) {
              return 'react-beautiful-dnd';
            } else if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  });
};
