import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { uglify } from 'rollup-plugin-uglify';

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'styled-components': 'styled',
};

const peerDeps = Object.keys(pkg.peerDependencies || {});
const extensions = ['.jsx', '.js', '.tsx', '.ts'];

export default [
  {
    input: {
      index: './src/index.ts',
    },
    external: peerDeps,
    plugins: [
      resolve({ extensions }),
      typescript({ useTsconfigDeclarationDir: true }),
      typescriptPaths(),
      optimizeLodashImports({ useLodashEs: true }),
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
    output: [
      { 
	dir: 'dist',
	format: 'es',
	name: pkg.name,
	preserveModules: true,
	globals
      }],
  },
];
