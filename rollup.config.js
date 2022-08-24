import babel from '@rollup/plugin-babel';

import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';

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
      typescript(),
      babel({
        babelHelpers: 'runtime',
	presets: ['@babel/preset-env', '@babel/preset-react'],
	skipPreflightCheck: true,
        extensions,
      }),
      commonjs(),
    ],
    output: [
      { 
	dir: 'dist/esm',
	preserveModules: true,
	preserveModulesRoot: 'src',
	format: 'es',
      },
    ],
  },
];
