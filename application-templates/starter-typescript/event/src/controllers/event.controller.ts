import { Request, Response } from 'express';
import { apiRoot } from '../client/create.client';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  console.log('MESSAGE BODY');
  console.log(request.body.message);

  // Check request body
  if (!request.body) {
    response.status(400).send({
      error: 'Bad request: No Pub/Sub message was received',
    });
    return;
  }

  // Check if the body comes in a
  if (!request.body.message) {
    response.status(400).send({
      error: 'Bad request: Wrong No Pub/Sub message format',
    });
    return;
  }

  // Receive the Pub/Sub message
  const pubSubMessage = request.body.message;

  // For our example we will use the customer id as a var
  // and the query the commercetools sdk with that info
  const customerId = pubSubMessage.data.customer.id
    ? Buffer.from(pubSubMessage.data.customer.id)
    : undefined;

  if (!customerId) {
    response.status(400).send({
      error: 'Bad request: No customer id in the Pub/Sub message',
    });
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const customer = await apiRoot
      .customers()
      .withId({ ID: Buffer.from(customerId).toString() })
      .get()
      .execute();

    // Execute the tasks in need
    // console.log(customer);
  } catch (error) {
    response.status(400).send({
      error: `Bad request: ${error}`,
    });
    return;
  }

  // Return the response for the client
  response.status(204).send();
};
