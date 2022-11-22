import { UpdateAction } from '@commercetools/sdk-client-v2';

import { apiRoot } from '../client/create.client';
import { Resource } from '../interfaces/resource.interface';

/**
 * Handle the create action
 *
 * @param {Resource} resource The resource from the request body
 * @returns {object}
 */
const create = async (resource: Resource) => {
  let productId = undefined;

  try {
    const updateActions: Array<UpdateAction> = [];

    // Deserialize the resource to a CartDraft
    const cartDraft = JSON.parse(JSON.stringify(resource));

    if (cartDraft.obj.lineItems.length !== 0) {
      productId = cartDraft.obj.lineItems[0].productId;
    }

    // Fetch the product with the ID
    if (productId) {
      await apiRoot.products().withId({ ID: productId }).get().execute();

      // Work with the product
    }

    // Create the UpdateActions Object to return it to the client
    const updateAction: UpdateAction = {
      action: 'recalculate',
      updateProductData: false,
    };

    updateActions.push(updateAction);

    return { statusCode: 200, actions: updateActions };
  } catch (error) {
    //@todo: rethrow the sdk error, it has (code,message,errors)
    // Retry or handle the error
    // Create an error object
    if (error instanceof Error) {
      throw new Error(
        `Internal server error on CartController: ${error.stack}`
      );
    }
  }
};

// Controller for update actions
// const update = (resource: Resourse) => {};

/**
 * Handle the cart controller according to the action
 *
 * @param {string} action The action that comes with the request. Could be `Create` or `Update`
 * @param {Resource} resource The resource from the request body
 * @returns {Promise<object>} The data from the method that handles the action
 */
export const cartController = async (action: string, resource: Resource) => {
  switch (action) {
    case 'Create': {
      const data = create(resource);
      return data;
    }
    case 'Update':
      break;

    default:
      throw new Error(
        `Internal Server Error - Resource not recognized. Allowed values are 'Create' or 'Update'.`
      );
  }
};
