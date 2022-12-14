module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'no-undef': 'error',
    'no-console': 'error',
    'no-const-assign': 'error',
  },
  env: {
    es6: true,
    jest: true,
    node: true, //adds things like process to global
  },
};
