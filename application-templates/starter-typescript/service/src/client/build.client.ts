import { ClientBuilder } from '@commercetools/sdk-client-v2';
import { authMiddlewareOptions } from '../middleware/auth.middleware';
import { httpMiddlewareOptions } from '../middleware/http.middleware';

/**
 * Create a new client builder.
 * This code creates a new Client that can be used to make API calls
 */
export const ctpClient = new ClientBuilder()
  .withProjectKey(process.env.PROJECT_KEY!)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();
