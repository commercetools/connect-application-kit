const create = require('./create');

module.exports = function getBabePresetConfigForConnectAppForDevelopment(api, opts) {
  return create(api, opts, 'development');
};
