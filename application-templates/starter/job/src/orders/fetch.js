const { apiRoot } = require('../client/create.client');

/**
 * Get all orders from the project.
 * This will use the commercetools SDK. (Make sure you have the right credentials)
 *
 * @returns {Promise<ClientResponse<OrderPagedQueryResponse>} OrderPagedQueryResponse
 */
const allOrders = async () => {
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

module.exports = { allOrders };
