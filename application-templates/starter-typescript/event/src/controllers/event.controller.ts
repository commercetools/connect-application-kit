import { Request, Response } from 'express';
import { apiError } from '../api/error.api';
import { apiRoot } from '../client/create.client';
import { logger } from '../utils/logger';

/**
 * Exposed event POST endpoint.
 * Receives the Pub/Sub message and works with it
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (request: Request, response: Response) => {
  let customerId = undefined;

  // Check request body
  if (!request.body) {
    logger.error('Missing request body.');
    response.status(400).send({
      error: 'Bad request: No Pub/Sub message was received',
    });
    return;
  }
  //@todo: you can use the validator as in typescript job and get
  //  standard error (code,message,errors)
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
    const customer = await apiRoot
      .customers()
      .withId({ ID: Buffer.from(customerId).toString() })
      .get()
      .execute();

    // Execute the tasks in need
    logger.info(customer);
  } catch (error) {
    apiError(400, `Bad request: ${error}`, response);
    return;
  }

  // Return the response for the client
  response.status(204).send();
};
