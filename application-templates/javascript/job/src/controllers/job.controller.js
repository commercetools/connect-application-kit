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
    // Get the orders
    const limitedOrdersObject = await allOrders({ sort: ['lastModifiedAt'] });
    logger.info(`There are ${limitedOrdersObject.total} orders!`);

    response.status(200).send();
  } catch (error) {
    throw new CustomError(
      500,
      `Internal Server Error - Error retrieving all orders from the commercetools SDK`
    );
  }
};
