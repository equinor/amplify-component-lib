import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/index.ts'],
  outDir: './dist',
  dts: true,
  clean: true,
  minify: true,
  unbundle: true,
  platform: 'browser',
  tsconfig: './tsconfig.build.json',
})
