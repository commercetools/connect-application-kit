const { ClientBuilder } = require('@commercetools/sdk-client-v2');

const authMiddlewareOptions = require('../middleware/auth.middleware');
const httpMiddlewareOptions = require('../middleware/http.middleware');

/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
const ctpClient = new ClientBuilder()
  .withProjectKey(process.env.PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

module.exports = { ctpClient };
