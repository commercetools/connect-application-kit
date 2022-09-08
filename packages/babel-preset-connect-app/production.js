const create = require('./create');

module.exports = function getBabePresetConfigForConnectAppForProduction(api, opts) {
  return create(api, opts, 'production');
};
