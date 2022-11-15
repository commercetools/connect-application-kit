import envValidators from '../validators/envValidators';
import { getValidateMessages } from '../validators/helpers';

/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const env = {
    clientId: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    projectKey: process.env.PROJECT_KEY as string,
    scope: process.env.SCOPE,
    region: process.env.REGION as string,
    port: process.env.PORT,
  };
  const messages = getValidateMessages(envValidators, env);
  //@todo: throw custom error when messages is set
  //   throw new CustomError('InvalidEnv', 'Invalid environment', messages)
  return env;
};
