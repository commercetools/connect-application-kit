/**
 * @type {import('@babel/core').TransformOptions}
 */
 module.exports = {
  presets: [
    [
      '@commercetools-frontend/babel-preset-connect-app',
      {
        runtime: 'automatic',
        keepPropTypes: true,
      },
    ],
  ],
  plugins: [
    'babel-plugin-import-graphql',
    'babel-plugin-typescript-to-proptypes',
    require('./babel-plugin-package-version'),
  ],
};