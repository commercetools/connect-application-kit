export interface Config {
  clientId: string;
  clientSecret: string;
  projectKey: string;
  scope: string;
  region: string;
  port: string;
  connectSubscriptionDestination?: string | null;
  connectGcpTopicName?: string;
  connectGcpProjectId?: string;
  connectAwsTopicArn?: string;
}
