const { apiError } = require('../api/error.api');
const { apiRoot } = require('../client/create.client');

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param request The express request
 * @param response The express response
 * @returns
 */
const post = async (request, response) => {
  let customerId = undefined;

  // Check request body
  if (!request.body) {
    apiError(400, 'Bad request: No Pub/Sub message was received', response);
    return;
  }

  // Check if the body comes in a
  if (!request.body.message) {
    apiError(400, 'Bad request: Wrong No Pub/Sub message format', response);
    return;
  }

  // Receive the Pub/Sub message
  const pubSubMessage = request.body.message;

  // For our example we will use the customer id as a var
  // and the query the commercetools sdk with that info
  const decodedData = pubSubMessage.data
    ? Buffer.from(pubSubMessage.data, 'base64').toString().trim()
    : undefined;

  if (decodedData) {
    const jsonData = JSON.parse(decodedData);

    customerId = jsonData.customer.id;
  }

  if (!customerId) {
    apiError(
      400,
      'Bad request: No customer id in the Pub/Sub message',
      response
    );
    return;
  }

  try {
    // eslint-disable-next-line no-unused-vars
    const customer = await apiRoot
      .customers()
      .withId({ ID: Buffer.from(customerId).toString() })
      .get()
      .execute();

    // Execute the tasks in need
    // console.log(customer);
  } catch (error) {
    apiError(400, `Bad request: ${error}`, response);

    return;
  }

  // Return the response for the client
  response.status(204).send();
};

module.exports = { post };
