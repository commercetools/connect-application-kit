import CustomError from '../errors/custom.error';
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
    clientId: process.env.CTP_CLIENT_ID as string,
    clientSecret: process.env.CTP_CLIENT_SECRET as string,
    projectKey: process.env.CTP_PROJECT_KEY as string,
    scope: process.env.CTP_SCOPE as string,
    region: process.env.CTP_REGION as string,
    port: process.env.PORT as string,
    connectSubscriptionDestination: process.env
      .CONNECT_SUBSCRIPTION_DESTINATION as string,
    connectGcpTopicName: process.env.CONNECT_GCP_TOPIC_NAME as
      | string
      | undefined,
    connectGcpProjectId: process.env.CONNECT_GCP_PROJECT_ID as
      | string
      | undefined,
    connectAwsTopicArn: process.env.CONNECT_AWS_TOPIC_ARN as string | undefined,
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
