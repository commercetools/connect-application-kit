import { type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for auth

import { getConfigurationVariables } from '../utils/options.utils';

const config = getConfigurationVariables();

/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${config.region}.commercetools.com`,
  projectKey: config.projectKey,
  credentials: {
    clientId: config.clientID,
    clientSecret: config.clientSecret,
  },
  scopes: [config.scope],
};
