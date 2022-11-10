import {
  ClientResponse,
  OrderPagedQueryResponse,
} from '@commercetools/platform-sdk';

import { apiRoot } from '../client/create.client';

/**
 * Get all orders from the project.
 * This will use the commercetools SDK. (Make sure you have the right credentials)
 *
 * @todo @harm-meijer Needs to implement a modifier funtion to return all orders without
 * any limit. The default limit at the moment is 20.
 *
 * @returns {Promise<ClientResponse<OrderPagedQueryResponse>} OrderPagedQueryResponse
 */
export const allOrdersWithLimit = async (): Promise<
  ClientResponse<OrderPagedQueryResponse>
> => {
  try {
    // Return all the orders
    return apiRoot.orders().get().execute();
  } catch (error) {
    throw new Error(
      'There was an error accessing the commercetools SDK: ' +
        JSON.stringify(error)
    );
  }
};
