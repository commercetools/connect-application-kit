import CustomError from '../errors/custom.error.js';
import envValidators from '../validators/env.validators.js';
import { getValidateMessages } from '../validators/helpers.validators.js';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */

export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    projectKey: process.env.PROJECT_KEY,
    scope: process.env.SCOPE,
    region: process.env.REGION,
    port: process.env.PORT,
  };

  const validationErrors = getValidateMessages(envValidators, envVars);

  if (validationErrors.length) {
    throw new CustomError(
      'InvalidEnvironmentVariablesError',
      'Invalid Environment Variables please check your .env file',
      validationErrors
    );
  }

  return envVars;
};
