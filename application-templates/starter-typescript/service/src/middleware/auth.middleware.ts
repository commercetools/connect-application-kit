import { type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for auth

import {
  clientID,
  clientSecret,
  projectKey,
  region,
} from '../utils/options.utils';

// Configure Middleware. Example only. Adapt on your own
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${region}.commercetools.com`,
  projectKey: projectKey,
  credentials: {
    clientId: clientID,
    clientSecret: clientSecret,
  },
};
