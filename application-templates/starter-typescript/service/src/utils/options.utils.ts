// Retrieve the env variables from the .env file

export const getConfigurationVariables = () => {
  return {
    projectKey: process.env.PROJECT_KEY!,
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    scope: process.env.SCOPE!,
    region: process.env.REGION!,
  };
};
