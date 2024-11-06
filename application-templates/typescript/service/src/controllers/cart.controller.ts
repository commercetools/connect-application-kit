import { UpdateAction } from '@commercetools/sdk-client-v2';

import { createApiRoot } from '../client/create.client';
import CustomError from '../errors/custom.error';
import { ControllerResult } from '../types/controller.types';
import { logger } from '../utils/logger.utils';
import { Cart } from '@commercetools/platform-sdk';
import { ExtensionAction } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/extension';

/**
 * Handle the create action
 */
const create = async (cart: Cart): Promise<ControllerResult> => {
  try {
    logger.info(`Running API Extension for Cart Create (ID: ${cart.id})`);
    const updateActions: Array<UpdateAction> = [];

    // This is demo code.
    // You can do something e.g. with each lineitem
    // If you need the whole product, load it first...
    if (cart.lineItems.length !== 0) {
      const productId = cart.lineItems[0].productId;
      // Fetch the product with the ID
      if (productId) {
        await createApiRoot()
          .products()
          .withId({ ID: productId })
          .get()
          .execute();

        // Work with the product
      }
    }

    // Create the UpdateActions Object to return it to the client
    const updateAction: UpdateAction = {
      action: 'recalculate',
      updateProductData: false,
    };

    updateActions.push(updateAction);

    // API Extensions will perform the update actions that you return. You don't have to do this yourself.
    // https://docs.commercetools.com/api/projects/api-extensions#updates-requested
    return { statusCode: 200, actions: updateActions };
  } catch (error) {
    // Retry or handle the error
    // Create an error object
    logger.error(`Internal server error on CartController: ${error}`);
    if (error instanceof Error) {
      throw new CustomError(
        400,
        `Internal server error on CartController: ${error.stack}`
      );
    }
  }
};

/**
 * Handle the update action
 */
const update = (cart: Cart): ControllerResult => {
  logger.info(`Running API Extension for Cart Update (ID: ${cart.id})`);
  return;
};

/**
 * Handle the cart controller according to the action
 */
export const cartController = async (
  action: ExtensionAction,
  resource: Cart
) => {
  switch (action) {
    case 'Create':
      return create(resource);
    case 'Update':
      return update(resource);

    default:
      logger.error(` Action ('${action}') not recognized.`);
      throw new CustomError(
        500,
        `Internal Server Error - Resource not recognized. Allowed values are 'Create' or 'Update'.`
      );
  }
};
