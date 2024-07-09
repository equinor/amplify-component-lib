import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-import-css';

import pkg from './package.json' assert { type: 'json' };

import del from 'rollup-plugin-delete';

const externalDependencies = Object.keys({
  ...pkg.peerDependencies,
  ...pkg.dependencies,
});

const extensions = ['.tsx', '.ts'];

export default [
  {
    input: './src/index.ts',
    external: ['@babel/runtime', 'react/jsx-runtime', ...externalDependencies],
    plugins: [
      del({ targets: 'dist/*', runOnce: true }),
      resolve({ extensions }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.build.json',
      }),
      css(),
      terser(),
    ],
    output: [
      {
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src',
        format: 'es',
      },
    ],
  },
];
