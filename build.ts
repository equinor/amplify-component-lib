
import pkg from './package.json' with { type: 'json' };

const externalDependencies = Object.keys({
  ...pkg.peerDependencies,
  ...pkg.dependencies,
});

export default await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  external: ['@babel/runtime', 'react/jsx-runtime', ...externalDependencies],
});
