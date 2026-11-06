import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      'node_modules/',
      'packages/create-connect-app/build/',
      'application-templates/typescript/*/build/',
      'application-templates/typescript/*/public/',
      'application-templates/javascript/*/public/',
    ],
  },
  js.configs.recommended,
  tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      parserOptions: { tsconfigRootDir: import.meta.dirname },
      globals: { ...globals.node, ...globals.jest, ...globals.browser },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      'no-undef': 'error',
      'no-console': 'error',
      'no-const-assign': 'error',
    },
  }
);
