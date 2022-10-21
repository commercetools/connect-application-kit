import { type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for sending HTTP requests

/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${process.env.REGION!}.commercetools.com`,
};
