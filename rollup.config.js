/* eslint-disable import/no-default-export */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { uglify } from 'rollup-plugin-uglify';
import { terser } from 'rollup-plugin-terser';
import { optimizeLodashImports } from '@optimize-lodash/rollup-plugin';
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
    input: {
      index: './src/components/index.tsx',
      CommentField: './src/components/CommentField',
      NewComment: './src/components/CommentField/NewComment',
      CompactCard: './src/components/CompactCard',
      ConfirmationPopup: './src/components/ConfirmationPopup',
      CopyText: './src/components/CopyText',
      DataTypeCard: './src/components/DataTypeCard',
      EditableField: './src/components/EditableField',
      EquinorLogo: './src/components/EquinorLogo',
      FieldSelector: './src/components/FieldSelector',
      FileProgress: './src/components/FileProgress',
      FileUpload: './src/components/FileUpload',
      FileUploadArea: './src/components/FileUploadArea',
      FullPageSpinner: './src/components/FullPageSpinner',
      FullPageStatus: './src/components/FullPageStatus',
      IconToggleButton: './src/components/Buttons/IconToggleButton',
      InfoElement: './src/components/InfoElement',
      MulticolorProgressCircle: './src/components/MulticolorProgressCircle',
      NotFound: './src/components/NotFound',
      OptionalTooltip: './src/components/OptionalTooltip',
      OptionDrawer: './src/components/Select/OptionDrawer',
      ProgressBar: './src/components/ProgressBar',
      SideBar: './src/components/SideBar',
      SingleFilterMenu: './src/components/SingleFilterMenu',
      SingleSelectDrawer: './src/components/Select/SingleSelectDrawer',
      SkeletonBase: './src/components/SkeletonBase',
      Table: './src/components/Table',
      TextEntry: './src/components/TextEntry',
      TopBar: './src/components/TopBar',
      utils: './src/components/utilities/index.tsx',
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
    output: [{ dir: 'dist', format: 'es', name: pkg.name, globals }],
  },
];
