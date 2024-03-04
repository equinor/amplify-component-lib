module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-redundant-type-constituents': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-floating-promises': 'off', // we don't always care about unhandles promises
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
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
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
    },
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      excludedFiles: ['*.test.*', '*.stories.*'],
      rules: {
        'no-console': ['warn', { allow: ['warn', 'error'] }],
      },
    },
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
};
