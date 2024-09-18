import dotenv from 'dotenv';
dotenv.config();

import { createApiRoot } from '../client/create.client';
import { assertError, assertString } from '../utils/assert.utils';
import {
  createAzureServiceBusCustomerCreateSubscription,
  createGcpPubSubCustomerCreateSubscription,
} from './actions';

const CONNECT_GCP_TOPIC_NAME_KEY = 'CONNECT_GCP_TOPIC_NAME';
const CONNECT_GCP_PROJECT_ID_KEY = 'CONNECT_GCP_PROJECT_ID';
const CONNECT_PROVIDER_KEY = 'CONNECT_PROVIDER';
const CONNECT_AZURE_CONNECTION_STRING_KEY = 'CONNECT_AZURE_CONNECTION_STRING';

async function postDeploy(properties: Map<string, unknown>): Promise<void> {
  const connectProvider = properties.get(CONNECT_PROVIDER_KEY);
  assertString(connectProvider, CONNECT_PROVIDER_KEY);
  const apiRoot = createApiRoot();

  switch (connectProvider) {
    case 'AZURE': {
      const connectionString = properties.get(
        CONNECT_AZURE_CONNECTION_STRING_KEY
      );
      assertString(connectionString, CONNECT_AZURE_CONNECTION_STRING_KEY);
      await createAzureServiceBusCustomerCreateSubscription(
        apiRoot,
        connectionString
      );
      break;
    }
    default: {
      const topicName = properties.get(CONNECT_GCP_TOPIC_NAME_KEY);
      const projectId = properties.get(CONNECT_GCP_PROJECT_ID_KEY);
      assertString(topicName, CONNECT_GCP_TOPIC_NAME_KEY);
      assertString(projectId, CONNECT_GCP_PROJECT_ID_KEY);
      await createGcpPubSubCustomerCreateSubscription(
        apiRoot,
        topicName,
        projectId
      );
    }
  }
}

async function run(): Promise<void> {
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
