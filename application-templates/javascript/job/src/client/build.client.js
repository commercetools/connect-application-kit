const { ClientBuilder } = require('@commercetools/sdk-client-v2');
const {
  createAuthMiddlewareOptions,
} = require('../middleware/auth.middleware');
const {
  createHttpMiddlewareOptions,
} = require('../middleware/http.middleware');

const { readConfiguration } = require('../utils/config.utils');

/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
const createClient = () =>
  new ClientBuilder()
    .withProjectKey(readConfiguration().projectKey)
    .withClientCredentialsFlow(createAuthMiddlewareOptions())
    .withHttpMiddleware(createHttpMiddlewareOptions(readConfiguration().region))
    // .withLoggerMiddleware() // Activate this option to get logging on operations
    .build();

module.exports = { createClient };
