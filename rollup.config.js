/* eslint-disable import/no-default-export */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import dts from 'rollup-plugin-dts';
import pkg from './package.json';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
};

const peerDeps = Object.keys(pkg.peerDependencies || {});
const extensions = ['.jsx', '.js', '.tsx', '.ts'];

export default [
  {
    input: './src/components/index.ts',
    external: peerDeps,
    plugins: [
      resolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      typescriptPaths(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        extensions,
        plugins: ['babel-plugin-styled-components'],
      }),
      commonjs(),
      terser(),
      uglify(),
    ],
    output: [{ file: pkg.main, format: 'esm', name: pkg.name, globals }],
  },
  {
    // path to your declaration files root
    input: './lib/types/components/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
  {
    input: './src/utilities/index.tsx',
    external: peerDeps,
    plugins: [
      resolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      typescriptPaths(),
      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
        extensions,
        plugins: ['babel-plugin-styled-components'],
      }),
      commonjs(),
      terser(),
      uglify(),
      generatePackageJson({
        baseContents: (pkg) => ({
          name: '@equinor/amplify-components/utils',
          private: true,
          main: 'index.js',
          dependencies: {},
          types: "index.d.ts"
        }),
      }),
    ],
    output: [
      {
        file: 'dist/utils/index.js',
        format: 'esm',
        name: pkg.name,
        globals,
      },
    ],
  },
  {
    // path to your declaration files root
    input: './lib/types/utilities/index.d.ts',
    output: [{ file: 'dist/utils/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
];
