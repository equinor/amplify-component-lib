/* eslint-disable import/no-default-export */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
};

const peerDeps = Object.keys(pkg.peerDependencies || {});
const extensions = ['.jsx', '.js', '.tsx', '.ts'];

export default [
  {
    input: './src/index.ts',
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
  }
];
