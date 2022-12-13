import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { createAuthMiddlewareOptions } from '../middleware/auth.middleware.js';
import { createHttpMiddlewareOptions } from '../middleware/http.middleware.js';
import { readConfiguration } from '../utils/config.utils.js';

/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
export const createClient = () =>
  new ClientBuilder()
    .withProjectKey(readConfiguration().projectKey)
    .withClientCredentialsFlow(createAuthMiddlewareOptions())
    .withHttpMiddleware(createHttpMiddlewareOptions(readConfiguration().region))
    // .withLoggerMiddleware() // Activate this option to get logging on operations
    .build();
