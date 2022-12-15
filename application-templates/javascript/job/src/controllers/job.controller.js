import { apiSuccess } from '../api/success.api.js';
import CustomError from '../errors/custom.error.js';
import { logger } from '../utils/logger.utils.js';
import { allOrders } from '../orders/fetch.orders.js';

/**
 * Exposed job endpoint.
 *
 * @typedef {import("express").Response} Response
 * @typedef {import("express").Request} Request
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request, response) => {
  try {
    const updateActions = [];

    // Get the orders
    const limitedOrdersObject = await allOrders({ sort: ['lastModifiedAt'] });
    logger.info(`There are ${limitedOrdersObject.total} orders!`);

    // Create the UpdateActions Object to return it to the client
    const updateAction = {
      action: 'recalculate',
      updateProductData: false,
      totalOrders: limitedOrdersObject.total,
    };

    updateActions.push(updateAction);

    apiSuccess(200, updateActions, response);
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error retrieving all orders from the commercetools SDK`
    );
  }
};
