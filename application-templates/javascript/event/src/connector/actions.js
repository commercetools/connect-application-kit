const CUSTOMER_CREATE_SUBSCRIPTION_KEY =
  'myconnector-customerCreateSubscription';

export async function createGcpPubSubCustomerCreateSubscription(
  apiRoot,
  topicName,
  projectId
) {
  const destination = {
    type: 'GoogleCloudPubSub',
    topic: topicName,
    projectId,
  };
  await createSubscription(apiRoot, destination);
}

export async function createAzureServiceBusCustomerCreateSubscription(
  apiRoot,
  connectionString
) {
  const destination = {
    type: 'AzureServiceBus',
    connectionString: connectionString,
  };
  await createSubscription(apiRoot, destination);
}

async function createSubscription(apiRoot, destination) {
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
