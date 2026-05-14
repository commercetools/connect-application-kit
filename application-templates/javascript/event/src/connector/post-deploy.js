import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client.js';
import { assertError, assertString } from '../utils/assert.utils.js';
import {
  createGcpPubSubCustomerCreateSubscription,
  createAwsSnsCustomerCreateSubscription,
} from './actions.js';

const CONNECT_GCP_TOPIC_NAME_KEY = 'CONNECT_GCP_TOPIC_NAME';
const CONNECT_GCP_PROJECT_ID_KEY = 'CONNECT_GCP_PROJECT_ID';
const CONNECT_SUBSCRIPTION_DESTINATION_KEY = 'CONNECT_SUBSCRIPTION_DESTINATION';
const CONNECT_AWS_TOPIC_ARN_KEY = 'CONNECT_AWS_TOPIC_ARN';

async function postDeploy(properties) {
  const subscriptionDestination = properties.get(
    CONNECT_SUBSCRIPTION_DESTINATION_KEY
  );
  const apiRoot = createApiRoot();

  // Google Cloud Pub/Sub subscription
  if (subscriptionDestination === 'GoogleCloudPubSub') {
    const topicName = properties.get(CONNECT_GCP_TOPIC_NAME_KEY);
    const projectId = properties.get(CONNECT_GCP_PROJECT_ID_KEY);
    assertString(topicName, CONNECT_GCP_TOPIC_NAME_KEY);
    assertString(projectId, CONNECT_GCP_PROJECT_ID_KEY);
    await createGcpPubSubCustomerCreateSubscription(
      apiRoot,
      topicName,
      projectId
    );
    return;
  }

  // AWS SNS subscription
  if (subscriptionDestination === 'SNS') {
    const topicArn = properties.get(CONNECT_AWS_TOPIC_ARN_KEY);
    assertString(topicArn, CONNECT_AWS_TOPIC_ARN_KEY);
    await createAwsSnsCustomerCreateSubscription(apiRoot, topicArn);
    return;
  }

  throw new Error(
    `Unknown subscription destination type: ${subscriptionDestination}`
  );
}
async function run() {
  try {
    const properties = new Map(Object.entries(process.env));
    await postDeploy(properties);
  } catch (error) {
    assertError(error);
    process.stderr.write(`Post-deploy failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}

run();
