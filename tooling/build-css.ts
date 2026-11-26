import { darkTokens } from 'src/atoms/style/darkTokens';
import { lightTokens } from 'src/atoms/style/lightTokens';
import { spacingTokens } from 'src/atoms/style/spacingTokens';
import { generateCss } from 'src/atoms/style/tailwind/generateCss';

import { mkdir, writeFile } from 'node:fs/promises';

const { tokensCss, themeCss } = generateCss({
  light: lightTokens.join(''),
  dark: darkTokens.join(''),
  spacing: spacingTokens.join(''),
});
const dist = new URL('../dist/', import.meta.url);
await mkdir(new URL('tailwind/', dist), { recursive: true });
const header = '/* Generated from ACL tokens. Do not edit. */\n';
await Promise.all([
  writeFile(new URL('tokens.css', dist), header + tokensCss),
  writeFile(new URL('tailwind/theme.css', dist), header + themeCss),
  writeFile(
    new URL('tailwind.css', dist),
    `${header}@import './tokens.css';\n@import './tailwind/theme.css';\n`
  ),
]);
console.log('Built tokens.css, tailwind.css and tailwind/theme.css');
