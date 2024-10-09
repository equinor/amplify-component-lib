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
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('commonjsHelpers')) {
              return 'commonjsHelpers';
            } else if (id.includes('amplify')) {
              return 'amplify';
            } else if (id.includes('proj4')) {
              return 'proj4';
            } else if (id.includes('eds')) {
              return 'eds';
            } else if (id.includes('probe.gl')) {
              return 'probegl';
            } else if (id.includes('math.gl')) {
              return 'mathgl';
            } else if (id.includes('loaders.gl')) {
              return 'loadersgl';
            } else if (id.includes('luma.gl')) {
              return 'lumagl';
            } else if (id.includes('deck.gl')) {
              return 'deckgl';
            } else if (id.includes('d3')) {
              return 'd3'
            } else if (id.includes('visx')) {
              return 'visx';
            } else if (id.includes('azure') || id.includes('microsoft')) {
              return 'microsoft';
            } else if (id.includes('framer-motion')) {
              return 'framer-motion';
            } else if (id.includes('html2canvas')) {
              return 'html2canvas';
            } else if (id.includes('lodash')) {
              return 'lodash';
            } else if (id.includes('@hello-pangea/dnd')) {
              return 'pangea-dnd';
            } else if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
        onwarn(warning, warn) {
          if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
            return;
          }
          warn(warning);
        },
      },
    },
  });
};
