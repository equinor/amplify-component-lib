import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

import del from 'rollup-plugin-delete';

const peerDeps = Object.keys({ ...pkg.peerDependencies, ...pkg.dependencies });
const extensions = ['.jsx', '.js', '.tsx', '.ts'];

export default [
  {
    input: ['./src/index.ts'],
    external: [/@babel\/runtime/, 'react/jsx-runtime', ...peerDeps],
    plugins: [
      del({ targets: 'dist/*', runOnce: true }),
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'runtime',
        extensions,
      }),
    ],
    output: [
      {
        dir: 'dist/esm',
        preserveModules: true,
        preserveModulesRoot: 'src',
        format: 'es',
      },
      { file: pkg.publishConfig.main, format: 'cjs' },
    ],
  },
];
