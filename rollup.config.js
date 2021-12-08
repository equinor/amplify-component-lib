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
      ConfirmationPopup: './src/components/ConfirmationPopup',
      CopyText: './src/components/CopyText',
      DataCard: './src/components/DataCard',
      EditableField: './src/components/EditableField',
      EquinorLogo: './src/components/EquinorLogo',
      FieldSelector: './src/components/FieldSelector',
      FileProgress: './src/components/FileProgress',
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
      MultiSelectDrawer: './src/components/Select/MultiSelectDrawer',
      SingleSelectDrawer: './src/components/Select/SingleSelectDrawer',
      SkeletonBase: './src/components/SkeletonBase',
      Table: './src/components/Table',
      TextEntry: './src/components/TextEntry',
      TopBar: './src/components/TopBar',
      utils: './src/components/utilities/index.tsx',
      ApplicationIcon: './src/components/Icons/ApplicationIcon.tsx',
      DataAcquisition: './src/components/Icons/data-acquisition.tsx',
      DataExperience: './src/components/Icons/data-experience.tsx',
      DataSharing: './src/components/Icons/data-sharing.tsx',
      DataTracker: './src/components/Icons/data-tracker.tsx',
      DefaultIcon: './src/components/Icons/defaultIcon.tsx',
      FeedBackIcon: './src/components/Icons/feedBack.tsx',
      NothingFilled: './src/components/Icons/nothing-filled.tsx',
      NothingOutline: './src/components/Icons/nothing-outline.tsx',
      Portal: './src/components/Icons/portal.tsx',
      SomethingFilled: './src/components/Icons/something-filled.tsx',
      SomethingOutline: './src/components/Icons/something-outline.tsx',
      Wellbore: './src/components/Icons/wellbore.tsx',
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
