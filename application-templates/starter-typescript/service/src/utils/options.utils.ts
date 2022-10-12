// Retrieve the env variables from the .env file
const projectKey: string = process.env.PROJECT_KEY!;
const clientID: string = process.env.CLIENT_ID!;
const clientSecret: string = process.env.CLIENT_SECRET!;
const scope: string = process.env.SCOPE!;
const region: string = process.env.REGION!;

export { projectKey, clientID, clientSecret, scope, region };
