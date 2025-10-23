import { type HttpMiddlewareOptions } from '@commercetools/ts-client'; // Required for sending HTTP requests
import { readConfiguration } from '../utils/config.utils';

/**
 * Configure Middleware. Example only. Adapt on your own
 */
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://api.${readConfiguration().region}.commercetools.com`,
};
