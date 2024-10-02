import {
  AzureServiceBusDestination,
  Destination,
  GoogleCloudPubSubDestination,
} from '@commercetools/platform-sdk';
import { ByProjectKeyRequestBuilder } from '@commercetools/platform-sdk/dist/declarations/src/generated/client/by-project-key-request-builder';

const CUSTOMER_CREATE_SUBSCRIPTION_KEY =
  'myconnector-customerCreateSubscription';

export async function createGcpPubSubCustomerCreateSubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  topicName: string,
  projectId: string
): Promise<void> {
  const destination: GoogleCloudPubSubDestination = {
    type: 'GoogleCloudPubSub',
    topic: topicName,
    projectId,
  };
  await createSubscription(apiRoot, destination);
}

export async function createAzureServiceBusCustomerCreateSubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  connectionString: string
): Promise<void> {
  const destination: AzureServiceBusDestination = {
    type: 'AzureServiceBus',
    connectionString: connectionString,
  };
  await createSubscription(apiRoot, destination);
}

async function createSubscription(
  apiRoot: ByProjectKeyRequestBuilder,
  destination: Destination
) {
  await deleteCustomerCreateSubscription(apiRoot);
  await apiRoot
    .subscriptions()
    .post({
      body: {
        key: CUSTOMER_CREATE_SUBSCRIPTION_KEY,
        destination,
        messages: [
          {
            resourceTypeId: 'customer',
            types: ['CustomerCreated'],
          },
        ],
      },
    })
    .execute();
}

export async function deleteCustomerCreateSubscription(
  apiRoot: ByProjectKeyRequestBuilder
): Promise<void> {
  const {
    body: { results: subscriptions },
  } = await apiRoot
    .subscriptions()
    .get({
      queryArgs: {
        where: `key = "${CUSTOMER_CREATE_SUBSCRIPTION_KEY}"`,
      },
    })
    .execute();

  if (subscriptions.length > 0) {
    const subscription = subscriptions[0];

    await apiRoot
      .subscriptions()
      .withKey({ key: CUSTOMER_CREATE_SUBSCRIPTION_KEY })
      .delete({
        queryArgs: {
          version: subscription.version,
        },
      })
      .execute();
  }
}
