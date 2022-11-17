const { readConfiguration } = require('../utils/config.utils');

/**
 * Configure Middleware. Example only. Adapt on your own
 */
const authMiddlewareOptions = {
  host: `https://auth.${readConfiguration().region}.commercetools.com`,
  projectKey: readConfiguration().projectKey,
  credentials: {
    clientId: readConfiguration().clientId,
    clientSecret: readConfiguration().clientSecret,
  },
  scopes: [readConfiguration().scope ? readConfiguration().scope : 'default'],
};

module.exports = authMiddlewareOptions;
