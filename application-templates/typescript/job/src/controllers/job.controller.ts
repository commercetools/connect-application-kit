import { Request, Response } from 'express';
import { UpdateAction } from '@commercetools/sdk-client-v2';

import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import { logger } from '../utils/logger.utils';
import { allOrders } from '../orders/fetch.orders';

/**
 * Exposed job endpoint.
 *
 * @param {Request} _request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (_request: Request, response: Response) => {
  try {
    const updateActions: Array<UpdateAction> = [];

    // Get the orders
    const limitedOrdersObject = await allOrders({ sort: ['lastModifiedAt'] });
    logger.info(`There are ${limitedOrdersObject.total} orders!`);

    // Create the UpdateActions Object to return it to the client
    const updateAction: UpdateAction = {
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
