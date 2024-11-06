import { Request, Response } from 'express';
import { apiSuccess } from '../api/success.api';
import CustomError from '../errors/custom.error';
import { cartController } from './cart.controller';
import { logger } from '../utils/logger.utils';
import { ParamsDictionary } from 'express-serve-static-core';
import { BusinessUnitReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/business-unit';
import { CartReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import { CustomerGroupReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer-group';
import { CustomerReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { OrderReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/order';
import { PaymentReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/payment';
import { QuoteReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/quote';
import { QuoteRequestReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/quote-request';
import { ShoppingListReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/shopping-list';
import { StagedQuoteReference } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/staged-quote';
import { ExtensionAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/extension';
import { ControllerResult } from '../types/controller.types';
import { paymentController } from './payment.controller';
import { orderController } from './order.controller';

/**
 * Exposed service endpoint.
 * - Receives a POST request, parses the action and the controller
 * and returns it to the correct controller. We should be use 3. `Cart`, `Order` and `Payments`
 *
 * @param {Request} request The express request
 * @param {Response} response The express response
 * @returns
 */
export const post = async (
  request: Request<
    ParamsDictionary,
    any,
    {
      action: ExtensionAction;
      resource?:
        | BusinessUnitReference
        | CartReference
        | CustomerGroupReference
        | CustomerReference
        | OrderReference
        | PaymentReference
        | QuoteReference
        | QuoteRequestReference
        | ShoppingListReference
        | StagedQuoteReference;
    }
  >,
  response: Response
) => {
  // Check request body
  if (!request.body) {
    logger.error('Missing request body.');
    throw new CustomError(400, 'Bad request: No Pub/Sub message was received');
  }

  // Get the action and resource from the body
  const { action, resource } = request.body;

  if (!action) {
    logger.error('Missing action in body.');
    throw new CustomError(400, 'Bad request - Missing action parameter.');
  }
  if (!resource) {
    logger.error('Missing resource in body.');
    throw new CustomError(400, 'Bad request - Missing resource parameter.');
  }
  if (!resource.obj) {
    logger.error('Missing obj in resource.');
    throw new CustomError(400, 'Bad request - Missing obj in resource.');
  }

  // Identify the type of resource in order to redirect
  // to the correct controller;
  let data: ControllerResult = undefined;
  switch (resource.typeId) {
    case 'cart': {
      data = await cartController(action, resource.obj);
      break;
    }
    case 'payment':
      data = paymentController(action, resource.obj);
      break;

    case 'order':
      data = orderController(action, resource.obj);
      break;

    default:
      logger.error(
        " Resource not recognized. Allowed values are 'cart', 'payment' or 'order'."
      );
      throw new CustomError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'cart', 'payments' or 'orders'.`
      );
  }
  apiSuccess(data?.statusCode || 200, data?.actions || [], response);
};
