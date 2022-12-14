import { type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for sending HTTP requests

type HttpCreate = (region: string) => HttpMiddlewareOptions;
/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const createHttpMiddlewareOptions: HttpCreate = (region) => ({
  host: `https://api.${region}.commercetools.com`,
});
