/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react';
import viteTsconfigPaths from "vite-tsconfig-paths";

import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react(), viteTsconfigPaths()],
    resolve: {
      alias: {
        src: fileURLToPath(new URL('./src', import.meta.url)),
        'src/providers/AuthProvider/AuthProvider': fileURLToPath(new URL('./src/providers/AuthProvider/AuthProvider.tsx', import.meta.url)),
      },
    },
  });
};
