import { assertNonNullable } from '../utils/assert.utils.js';

const CUSTOMER_CREATE_SUBSCRIPTION_KEY =
  'myconnector-customerCreateSubscription';

export async function createCustomerCreateSubscription(apiRoot, config) {
  // Delete existing subscription first (inline deletion)
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

  // Google Cloud Pub/Sub subscription
  if (config.connectSubscriptionDestination === 'GoogleCloudPubSub') {
    assertNonNullable(
      config.connectGcpTopicName,
      'GCP Topic Name must be provided for GoogleCloudPubSub destination'
    );
    assertNonNullable(
      config.connectGcpProjectId,
      'GCP Project ID must be provided for GoogleCloudPubSub destination'
    );

    await apiRoot
      .subscriptions()
      .post({
        body: {
          key: CUSTOMER_CREATE_SUBSCRIPTION_KEY,
          destination: {
            type: 'GoogleCloudPubSub',
            topic: config.connectGcpTopicName,
            projectId: config.connectGcpProjectId,
          },
          messages: [
            {
              resourceTypeId: 'customer',
              types: ['CustomerCreated'],
            },
          ],
        },
      })
      .execute();

    return;
  }

  // AWS SNS subscription
  if (config.connectSubscriptionDestination === 'SNS') {
    assertNonNullable(
      config.connectAwsTopicArn,
      'AWS Topic ARN must be provided for SNS destination'
    );

    await apiRoot
      .subscriptions()
      .post({
        body: {
          key: CUSTOMER_CREATE_SUBSCRIPTION_KEY,
          destination: {
            type: 'SNS',
            topicArn: config.connectAwsTopicArn,
            authenticationMode: 'IAM',
          },
          messages: [
            {
              resourceTypeId: 'customer',
              types: ['CustomerCreated'],
            },
          ],
        },
      })
      .execute();

    return;
  }

  throw new Error(
    `Unknown subscription destination type: ${config.connectSubscriptionDestination}`
  );
}

export async function deleteCustomerCreateSubscription(apiRoot) {
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
