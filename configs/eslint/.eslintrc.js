const missedAirBnBRules = require('./missedAirBnBRules');

const config = {
  ignorePatterns: ['next-env.d.ts'],
  extends: [
    // recommended rules from https://github.com/iamturns/eslint-config-airbnb-typescript - NextJS doesn't have them, react support is provided only by a set of rules from NextJS
    'airbnb-base',

    // rules from nextJS, should be after all other rules
    'next/core-web-vitals',

    /**
     * turns on (eslint-plugin-prettier), which runs Prettier analysis analytics as part of ESLint.
     * Disables any rules that may conflict with existing rules Prettier using(eslint-config-prettier).
     * Must be after all the rules.
     */
    'plugin:prettier/recommended',
  ],
  plugins: ['@emotion', 'testing-library', 'jest-dom'],
  rules: {
    ...missedAirBnBRules,

    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'function-expression',
        unnamedComponents: 'function-expression',
      },
    ],
    'react/jsx-props-no-spreading': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
        'newlines-between': 'always',
      },
    ],

    '@emotion/pkg-renaming': 'error',
    '@emotion/syntax-preference': [2, 'string'],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],

      // https://github.com/iamturns/eslint-config-airbnb-typescript
      parserOptions: {
        project: './tsconfig.json',
      },

      extends: [
        // List of recommended rules from https://github.com/iamturns/eslint-config-airbnb-typescript - fixes rules that don't work well with typing, for example 'lines-around-comment' inside curly braces of type
        'airbnb-typescript',

        'plugin:prettier/recommended',
      ],
    },
    {
      files: ['**/pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/*slice.ts?(x)'],
      rules: {
        // https://redux-toolkit.js.org/usage/immer-reducers
        'no-param-reassign': [
          'error',
          { props: true, ignorePropertyModificationsFor: ['state'] },
        ],
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['**/initAxe.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/test-utils.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    },
  ],
};

module.exports = config;
