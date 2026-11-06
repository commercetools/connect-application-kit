import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['node_modules/', 'build/'] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: { ...globals.node, ...globals.jest },
    },
    rules: {
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-undef': 'error',
      'no-console': 'error',
      'no-const-assign': 'error',
    },
  },
];
