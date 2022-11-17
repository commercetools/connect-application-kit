import { Config } from '../interfaces/config.interface';
//@todo: suggest validator throwing standard error as in typescript jobs
/**
 * Helper to verify environment variables and check if they exist.
 * Throw an error if not
 *
 * @param config The configuration object containing all the env vars
 */
export const envVarsError = (config: Config) => {
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
