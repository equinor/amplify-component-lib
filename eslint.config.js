import js from "@eslint/js";

import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default [
  js.configs.recommended,
  react.configs.flat.recommended,
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.js', '**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      }
    },
    plugins: {
       react,
      'react-hooks': reactHooks,
      '@typescript-eslint': tseslint.plugin,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-redundant-type-constituents': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-floating-promises': 'off', // we don't always care about unhandled promises
      '@typescript-eslint/prefer-nullish-coalescing': 'off', // we sometimes want to use || instead of ??
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // `react` first
            ['^react?(.+)'],
            // Packages starting with `@`
            ['^@'],
            // Packages starting with `~`
            ['^~'],
            // Imports starting with `./`, `../` `src`
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
              'src',
            ],
            // Imports starting with a character
            ['^[a-z]'],
            // Style imports
            ['^.+\\.s?css$'],
            // Side effect imports
            ['^\\u0000'],
          ],
        },
      ],
    },
    settings: {
      react: {
        pragma: 'React',
        version: 'detect',
      },
    },
  },
  {
    files: ['*.test.*', '*.stories.*', './src/providers/AuthProvider/**', './src/atoms/utils/auth_environment.ts'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'log'] }],
    }
  },
  {
    ignores: [
      '!.storybook',
      'vite.config.ts',
      'vitest.config.ts',
      'playwright.config.ts',
      'src/api',
      'src/config',
      '**/*.js',
      '**/*.md',
      '**/*.yaml',
      '**/*.json'
    ],
  },
]
