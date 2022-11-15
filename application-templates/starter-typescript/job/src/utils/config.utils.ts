/**
 * Read the configuration env vars
 * (Add yours accordingly)
 *
 * @returns The configuration with the correct env vars
 */
export const readConfiguration = () => {
  const env = {
    clientId: process.env.CLIENT_ID || '',
    clientSecret: process.env.CLIENT_SECRET || '',
    projectKey: process.env.PROJECT_KEY || '',
    scope: process.env.SCOPE || '',
    region: process.env.REGION || '',
    port: process.env.PORT || '',
  };
  //@todo: validate env
  return env;
};
