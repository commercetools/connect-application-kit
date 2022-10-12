import { type HttpMiddlewareOptions } from '@commercetools/sdk-client-v2'; // Required for sending HTTP requests
import { getConfigurationVariables } from '../utils/options.utils';

const config = getConfigurationVariables();

// Configure Middleware. Example only. Adapt on your own
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: `https://auth.${config.region}.commercetools.com`,
};
