
import pkg from './package.json' with { type: 'json' };

const externalDependencies = Object.keys({
  ...pkg.peerDependencies,
});

export default await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  splitting: true,
  minify: true,
  external: ['@babel/runtime', ...externalDependencies],
});
