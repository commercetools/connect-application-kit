const { readConfiguration } = require('../utils/config.utils');

/**
 * Configure Middleware. Example only. Adapt on your own
 */
const httpMiddlewareOptions = {
  host: `https://api.${readConfiguration().region}.commercetools.com`,
};

module.exports = httpMiddlewareOptions;
