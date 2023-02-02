/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';

import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [
        'src/tests/setupTests.ts',
        'src/tests/mockLocalStorage.ts',
        'src/tests/mockResizeObserver.ts',
      ],
    },
  });
};
