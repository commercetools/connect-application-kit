import { type AuthMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for auth

/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: `https://auth.${process.env.REGION!}.commercetools.com`,
  projectKey: process.env.PROJECT_KEY!,
  credentials: {
    clientId: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
  },
  scopes: [process.env.SCOPE!],
};
