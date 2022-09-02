const create = require('./create');

module.exports = function getBabePresetConfigForConnectAppForTest(api, opts) {
  return create(api, opts, 'test');
};
