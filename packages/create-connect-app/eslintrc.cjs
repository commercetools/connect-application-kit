module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    'no-undef': 'error',
    'no-console': 'off',
    'no-const-assign': 'error',
  },
  env: {
    jest: true,
    node: true, //adds things like process to global
  },
};
