import { defineConfig} from "tsup"

import pkg from './package.json' with { type: 'json' };

const peerDependencies = Object.keys(pkg.peerDependencies || {});

const bundledDependencies= [
  /@equinor\/eds(.)*/
]

export default defineConfig({
  entry: [
    "src/index.ts",
  ],
  external: ["react", "react-dom", ...peerDependencies],
  skipNodeModulesBundle: true,
  noExternal: bundledDependencies,
  tsconfig: "tsconfig.build.json",
  splitting: true,
  clean: true,
  minify: true,
  dts: {
    entry: "src/index.ts",
    resolve: bundledDependencies
  },
  format: "esm",
})