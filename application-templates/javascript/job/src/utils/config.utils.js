const { CustomError } = require('../errors/custom.errors');
const { envValidators } = require('../validators/env.validators');
const { getValidateMessages } = require('../validators/helpers.validators');

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
const readConfiguration = () => {
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

module.exports = { readConfiguration };
