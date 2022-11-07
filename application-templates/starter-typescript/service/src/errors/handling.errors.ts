import { Config } from '../interfaces/config.interface';

/**
 *
 * @param {Config} config
 */
export const validateEnvVars = (config: Config) => {
  if (!config.projectKey) {
    throw new Error('Provide a valid project key that you have access to.');
  }
  if (!config.clientId) {
    throw new Error('Provide a valid client id that you have access to.');
  }
  if (!config.clientSecret) {
    throw new Error('Provide a valid client secret that you have access to.');
  }
  if (!config.region) {
    throw new Error('Provide a valid region that you have access to.');
  }
  if (!config.port) {
    throw new Error('Provide a valid port for your application to run.');
  }
};
