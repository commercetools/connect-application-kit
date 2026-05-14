import CustomError from '../errors/custom.error';
import { Config } from '../interfaces/config.interface';
import envValidators from '../validators/env.validators';
import { getValidateMessages } from '../validators/helpers.validators';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const envVars = {
    clientId: process.env.CTP_CLIENT_ID,
    clientSecret: process.env.CTP_CLIENT_SECRET,
    projectKey: process.env.CTP_PROJECT_KEY,
    scope: process.env.CTP_SCOPE,
    region: process.env.CTP_REGION,
    port: process.env.PORT,
    connectSubscriptionDestination:
      process.env.CONNECT_SUBSCRIPTION_DESTINATION,
    connectGcpTopicName: process.env.CONNECT_GCP_TOPIC_NAME,
    connectGcpProjectId: process.env.CONNECT_GCP_PROJECT_ID,
    connectAwsTopicArn: process.env.CONNECT_AWS_TOPIC_ARN,
  } as Config;

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
